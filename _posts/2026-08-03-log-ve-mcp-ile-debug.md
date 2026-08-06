---
layout: post
lang: tr
translation_url: /en/blog/log-ve-mcp-ile-debug/
title: "Log Ekletmek ve MCP ile Debug"
date: 2026-08-03
summary: "Model senin çalışma zamanını görmüyor. Bu boşluğu kapatmanın iki yolu var: ona geçici log ekletmek ve MCP ile tarayıcı konsolu, hata takip aracı gibi kaynakları doğrudan okutmak."
tags: [vibe-coding, hata-ayiklama, mcp]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Log Ekletmek ve MCP ile Debug"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Geçen yazıda hata ayıklamanın
> temel disiplinini konuşmuştuk: hatayı tekrar üretmek, kanıt vermek, düzeltmeden
> önce sebep istemek. Bu yazı o kanıtı nereden bulacağınla ilgili.

Kodlama ajanı senin kodunu okuyabiliyor ama çalışırken ne olduğunu göremiyor.
Statik kaynak kodda görünen şey ile çalışma zamanında gerçekten olan şey
arasındaki fark, hata ayıklamanın tamamı. O yüzden "şu hatayı düzelt" dediğinde
model tahmin etmek zorunda kalıyor. Bu boşluğu kapatmanın iki yolu var: ya
kanıtı sen üretip verirsin, ya da modele kanıtı kendi okuyabileceği bir yol
açarsın.

## Önce log, sonra düzeltme

En ucuz yöntem, düzeltme istemeden önce geçici log ekletmek. Fatura takibi
projesinde bir faturanın PDF çıktısı boş geliyordu; kalem listesi bir yerde
kayboluyordu ama nerede olduğu belli değildi.

```text
PDF üretim akışına geçici log ekle: fatura veritabanından çekildikten sonra,
kalemler hesaplandıktan sonra ve şablona veri verilmeden hemen önce.
Her satırda fatura id'si ve kalem sayısı olsun. Henüz düzeltme yapma.
```

Modelin ürettiği loglar bu tarz oluyor:

```js
console.log('[pdf] invoice=%s items=%d discount=%s',
  invoice.id, invoice.items.length, invoice.discount);
```

Sonra senaryoyu bir kez çalıştırıp çıktıyı topluyorsun:

```bash
npm run dev 2>&1 | tee /tmp/pdf-debug.log
```

Elde ettiğin şey tahmin değil, olgu:

```
[pdf] invoice=1042 items=3 discount=null
[pdf] invoice=1042 items=0 discount=10
```

Kalem listesi indirim uygulanırken boşalıyor. Bu iki satır, üç tur tahmin
denemesinden daha fazla iş görüyor.

Bir uyarı: bu loglar geçici. Model bunları kendiliğinden temizlemez, sen de
birkaç gün sonra unutursun. Düzeltme bittiğinde kontrol et:

```bash
grep -rn "\[pdf\]" src/
```

## MCP: modele kendi gözünü vermek

Log ekletmek işe yarıyor ama döngüsü yavaş: sen çalıştır, sen kopyala, sen
yapıştır. **MCP** (Model Context Protocol) bu döngüden seni çıkarıyor — model
tarayıcı konsolunu, ağ isteklerini veya hata takip aracını doğrudan okuyor.
Kurulum ayrıntıları için
[MCP ile araç bağlama]({{ '/blog/mcp-ile-arac-baglama/' | relative_url }})
yazısına bakabilirsin; burada hata ayıklamaya değen iki örnek var.

Tarayıcı tarafı için Chrome DevTools'un kendi MCP sunucusu var:

```bash
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
```

Bağladıktan sonra model konsol mesajlarını ve ağ isteklerini kendisi listeliyor:

```text
http://localhost:3000/invoices/1042 sayfasını aç, "PDF indir" butonuna bas,
sonra konsol mesajlarını ve başarısız ağ isteklerini listele.
```

Üretimdeki hatalar içinse hata takip aracının sunucusu: Sentry'nin barındırılan
MCP sunucusu buna örnek.

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

```text
Fatura takibi projesindeki son 24 saatin çözülmemiş hatalarını listele.
En çok kullanıcıyı etkileyeni aç ve stack trace'i özetle.
```

## Sınırları

MCP sihir değil. Üç şeyi bilerek kullan. Birincisi, her bağlı sunucu araç
tanımlarıyla bağlam (context) yer kaplar; hata avı için bağladığın sunucuyu iş
bitince kaldırmak mantıklı. İkincisi, tarayıcı sunucusu tarayıcıdaki her şeyi
modele açar — oturum açtığın hesaplar dahil; DevTools ekibi de bu konuda açıkça
uyarıyor, hassas veri olan bir profille çalıştırma. Üçüncüsü, veri erişimi hâlâ
veri: model daha çok şey görüyor diye daha iyi hipotez kurmuyor. Önceki yazıdaki
kural geçerli — önce sebep, sonra yama.

Sıradaki yazı: [Git: Vibe Coding'in Güvenlik Ağı]({{ '/blog/git-guvenlik-agi/' | relative_url }})
