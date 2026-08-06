---
layout: post
lang: tr
translation_url: /en/blog/sir-yonetimi-ve-guvenlik/
title: "Sırları Koda Gömme: Güvenlik Pratikleri"
date: 2026-08-06
summary: "API anahtarı koda girdiği anda sızmış sayılır. Ortam değişkeni, araca kapalı bölge tanımlamak, commit öncesi tarama ve sızıntı sonrası doğru refleks."
tags: [vibe-coding, guvenlik, sir-yonetimi]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Sırları Koda Gömme: Güvenlik Pratikleri"
---

> "Vibe Coding Yolculuğu" serisinin son yazısı. Geçen yazıda testi, yani kodun
> çalıştığını kanıtlayan mekanizmayı konuşmuştuk. Burada kodun çalışması yetmiyor:
> yanlış yere düşen tek bir satır geri alınamıyor.

Kodu hızlı üretmek, sırların koda sızma hızını da artırıyor. Model bir entegrasyon
yazarken en kısa yolu seçer: anahtarı doğrudan istemcinin yanına koyar, çünkü öyle
çalışır. Sen diff'i hızlı okuyup kabul edersen o satır repoya girer. Buradaki
mesele modelin kötü niyeti değil, kimsenin bakmadığı bir yolun açık kalması.

## Sır koda değil ortama girer

Temel kural değişmedi: kimlik bilgileri kaynak kodda değil, ortam değişkenlerinde
durur. Fatura takibi projesinde e-posta gönderimi eklerken kullandığım prompt:

```text
Fatura PDF'ini e-postayla gönderen bir servis ekle. API anahtarını koda
yazma; process.env üzerinden oku ve eksikse başlangıçta anlaşılır bir hata
ver. .env.example dosyasına anahtarın adını, gerçek değerini koymadan ekle.
.env dosyasını açma veya okuma.
```

Üç ayrıntı önemli. `.env.example` ekibin hangi değişkenlerin gerektiğini
görmesini sağlıyor — değerler olmadan. Eksik değişkende açılışta hata vermek,
anahtarın sessizce boş kalıp `undefined` olarak gitmesini engelliyor. Ve
`.env`'in `.gitignore`'da olduğunu bir kez teyit etmek gerekiyor:

```bash
git check-ignore -v .env
```

Çıktı bir kural gösteriyorsa dosya git'in gözünden uzaktadır. Hiçbir şey
yazmıyorsa `.env` takip edilmeye aday demektir.

## Araca kapalı bölgeleri söyle

İkinci katman, aracın bu dosyalara hiç dokunamaması. Claude Code'da bunu
`settings.json` içindeki `deny` kurallarıyla yapıyorsun; deny kuralları izin
akışında en önce değerlendirilir ve eşleşme olduğunda araç engellenir:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  }
}
```

Bunun yanında bağlam dosyanda (CLAUDE.md, AGENTS.md, `.cursor/rules/` — araca
göre değişiyor) kapalı bölgeleri yazılı hâle getirmek yaygın bir pratik. Ama
aradaki farkı görmek gerekiyor: `deny` teknik bir engel, bağlam dosyasındaki
"buraya dokunma" satırı ise bir talimat. Talimatların uyulmama ihtimali her zaman
var, o yüzden o bölgelerin yakınında çalışırken aynı sınırı prompt'ta tekrar
söyle. Bağlam dosyasının nasıl yazıldığını
[CLAUDE.md temelleri]({{ '/blog/claude-md-temelleri/' | relative_url }})
yazısında anlatmıştım.

## Commit'ten önce tarayan bir kapı koy

İnsan gözü diff'te 40 karakterlik bir dizeyi kaçırır. Bunu otomatik bir kontrole
bağlamak daha güvenli. Gitleaks, repoda ve dosyalarda sır arayan yaygın bir açık
kaynak araç; pre-commit ile bağlanıyor:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.24.2
    hooks:
      - id: gitleaks
```

`pre-commit install` sonrası her commit denemesi taramadan geçiyor. Mevcut
geçmişi bir kez taramak için:

```bash
gitleaks git -v
```

Bir kapı daha var: GitHub'ın push protection özelliği, desteklediği sır tiplerini
push sırasında yakalayıp engelliyor. Sunucu tarafında çalıştığı için yerel hook'un
atlandığı durumları da kapsıyor.

## Sızdıysa: önce iptal et

Burada refleks yanlış kurulmaya çok müsait. GitHub'ın dokümanı net söylüyor:
sızmış bir sır anında ele geçmiş sayılmalı; sırrı koddan silmek, yeni bir commit
atmak ya da repoyu silip yeniden oluşturmak onun kullanılmasını engellemiyor.

Doğru sıra şu: sırrı sağlayıcısında iptal et, yerine yenisini üret, bağlı
servisleri güncelle, sonra erişim loglarında yetkisiz kullanım olup olmadığına bak.
Kesinti riski varsa önce yeni anahtarı devreye alıp eskisini sonra iptal etmek
makul bir sıralama. Git geçmişini temizlemek en son ve en tartışmalı adım — force
push gerektirdiği için yıkıcı olabiliyor ve zaten iptal edilmiş bir anahtar için
aciliyeti yok.

## Sınırları

Modele "güvenlik açıklarını incele" demek işe yarıyor ama bir garanti değil.
Modeller büyük ölçüde halka açık kodla eğitildi ve o kodun bir kısmı güvensiz
kalıplar içeriyor; üretilen kod da aynı kalıpları taşıyabiliyor. Kullanıcı girdisi
işleyen, yetki kontrolü yapan ve anahtar yöneten kodu — kim yazmış olursa olsun —
elle okumaya devam etmek gerekiyor. Aracın kendi güvenlik modeli de bunun yerine
geçmiyor; o tarafı
[Claude Code güvenliği]({{ '/blog/claude-code-guvenlik/' | relative_url }})
yazısında ayrıca ele almıştım.

Sırlar konusunda tek sağlam kural şu: bir anahtar repoya girdiyse, artık senin
anahtarın değil.

---

*Bu yazıyla "Vibe Coding Yolculuğu" serisi tamamlanıyor.*
