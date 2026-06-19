---
layout: post
lang: tr
translation_url: /en/blog/context-baglam/
title: "Context (Bağlam) Yönetimi"
date: 2026-06-19
summary: "Claude Code'un 'hafızası' olan context window aslında ne? Neyle dolar, dolduğunda ne olur ve /clear, /compact, /context komutlarıyla onu nasıl kontrol altında tutarsın?"
tags: [claude-code, context, baglam]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Context (Bağlam) Yönetimi"
---

> "Claude Code Yolculuğu" serisine devam. Önceki yazıda Claude'un kullandığı
> [araçlara]({{ '/blog/tools-araclar/' | relative_url }}) bakmıştık; bu sefer
> o araçların ürettiği her şeyin biriktiği yere — context'e — geliyoruz.

Claude Code'la bir süre çalıştıktan sonra fark ettiğim bir şey var: aracın
ne kadar iyi iş çıkardığı, çoğu zaman o anda *neyi hatırladığıyla* doğrudan
ilgili. İşte bu "hatırladığı şey"in teknik adı **context window** (bağlam
penceresi). Bence Claude Code'u verimli kullanmanın yarısı bunu anlamaktan
geçiyor.

## Context window nedir?

Context window, Claude'un o anki konuşmada görebildiği toplam metnin
sığdığı alan. Bir oturumda ne yazdıysan, Claude ne cevap verdiyse, hangi
dosyaları okuduysa, hangi komutları çalıştırıp ne çıktı aldıysa — hepsi bu
pencerenin içinde duruyor. Mevcut modellerde bu pencere yaklaşık **200.000
token** büyüklüğünde (kabaca birkaç yüz sayfalık metin).

Önemli nokta şu: pencerenin dışında kalan hiçbir şeyi Claude "bilmez". Yani
context, Claude'un kısa süreli hafızası gibi. Bu yüzden ne koyduğun kadar,
ne kadar yer kapladığı da önemli.

## Pencere neyle dolar?

Oturum daha ilk açıldığında pencere tamamen boş değildir. Otomatik olarak
şunlar yüklenir: sistem talimatları, varsa `CLAUDE.md` dosyaların, önceki
oturumlardan kalan otomatik hafıza (`MEMORY.md`), ortam bilgisi ve bağlı MCP
araçlarının isimleri. Sonra sen çalıştıkça pencere asıl o zaman dolar —
özellikle Claude büyük dosyalar okuduğunda veya uzun komut çıktıları geri
döndüğünde.

Tam da burada `/context` komutu işe yarıyor. Çalıştırınca pencereyi neyin ne
kadar doldurduğunu kategori kategori gösteriyor. Bir şeylerin neden yavaşladığını
ya da neden "unutulduğunu" anlamak için ilk bakacağım yer burası.

```bash
/context
```

## Pencere dolarsa ne olur?

İlk başta bunun oturumu bitireceğinden korkmuştum, ama öyle değil. Claude Code
limite yaklaştıkça bağlamı **otomatik olarak sıkıştırıyor** (auto-compaction):
önce en eski araç çıktılarını atıyor, gerekirse konuşmanın geri kalanını bir
özete indiriyor. Yani oturum kendini toparlayıp devam ediyor.

Otomatik olması iyi, ama her zaman istediğim şeyi tutacağının garantisi yok.
Bu yüzden işi ben elime almayı tercih ediyorum.

## Kontrolü ele almak: /clear ve /compact

Elimdeki iki temel komut şunlar:

- **`/clear`** — bağlamı tamamen sıfırlar, tertemiz bir sayfayla başlatır.
  Tamamen alakasız yeni bir işe geçtiğimde bunu kullanıyorum. Önceki işin
  kalıntılarının yeni işe karışmasını engelliyor.
- **`/compact`** — geçmişi silmek yerine bir özetle değiştirir. En sevdiğim
  tarafı, ona ne üzerine odaklanacağını söyleyebilmem:

```bash
/compact auth hatasının çözümüne odaklan
```

Pratikte benim alışkanlığım şu: uzun ve yeni bir göreve başlamadan önce
ilgisiz birikintiyi temizlemek için `/clear`, mevcut işin önemli kısmını
korurken yer açmak içinse odak talimatlı bir `/compact`.

Bir de `/memory` var; oturum açılırken hangi `CLAUDE.md` ve otomatik hafıza
dosyalarının yüklendiğini gösteriyor. Bağlamın "görünmez" kısmında ne
olduğunu merak ettiğimde ona bakıyorum.

## Neden bu kadar önemli?

Çünkü context yönetimi hem **kaliteyi** hem de **maliyeti** etkiliyor. Pencere
alakasız eski çıktılarla tıkandığında Claude'un dikkati dağılıyor, cevaplar
zayıflıyor. Üstelik her token işlenirken sayılıyor — yani dağınık bir bağlam
hem daha kötü sonuç hem daha yüksek maliyet demek. Pencereyi temiz ve konuya
odaklı tutmak, bana göre Claude Code'la çalışırken kazanılan en pratik
alışkanlıklardan biri. (Maliyet tarafına serinin ilerleyen yazılarında ayrıca
döneceğim.)

## Özet

Context window, Claude'un o anki kısa süreli hafızası: ne görüyorsa orada.
`/context` ile içini görüyorsun, dolunca Claude otomatik sıkıştırıyor, ama
gerçek kontrol `/clear` ve `/compact`'te. Bir sonraki yazıda bağlamla yakından
ilişkili bir konuya — Claude Code'un farklı **modlarına** — bakacağız.

---

*Sıradaki yazı: Modlar (Modes)*
