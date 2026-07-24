---
layout: project
lang: tr
translation_url: /en/projects/whoami/
title: "Ben Kimim — Dijital Kartvizit"
date: 2026-06-13
summary: "Basılı kartvizitlerin yerini alan, tek linkte tüm iletişim bilgilerini paylaşabileceğin sunucusuz dijital kartvizit uygulaması."
tech: [HTML, CSS, JavaScript, GitHub Pages]
repo: "https://github.com/cnklc/whoami"
demo: "https://whoami.cnklc.me"
---

## Proje Hakkında

**Ben Kimim**, klasik basılı kartvizitlerin yerini almak için geliştirdiğim bir
web uygulaması. Kişi formu doldurur; uygulama ona özel bir bağlantı ve QR kod
üretir. Bu QR'ı okutan herkes e-posta, telefon, WhatsApp, Instagram, LinkedIn ve
diğer bağlantılara tek sayfadan ulaşır.

Proje kendi ihtiyacımdan doğdu: tanıştığım kişilere bilgilerimi tek tek yazmak
yerine, telefonumdaki QR'ı okutarak saniyeler içinde tüm iletişim kanallarımı
paylaşmak istedim. Aynı ihtiyacı duyan herkesin kullanabilmesi için **çok
kullanıcılı** ve **hesap gerektirmeyen** bir yapıda tasarladım.

## Öne Çıkanlar

- **Hesapsız kullanım** — Kayıt ve giriş yok; formu doldur, linkin hazır.
- **Sınırsız bağlantı** — E-posta, telefon, WhatsApp, Instagram, LinkedIn, web
  sitesi, GitHub, X ve özel linkler.
- **QR kod** — Her kartvizit için otomatik üretilen, okutulunca sayfayı açan QR.
- **Kişilere kaydet (vCard)** — Tek tıkla `.vcf` indirip rehbere ekleme.
- **Tema seçenekleri** — 8 farklı vurgu rengiyle kişiselleştirme.
- **Mobil öncelikli ve gizlilik dostu** — Hiçbir veri sunucuda saklanmaz.

## Nasıl Çalışıyor? (Mimari)

En kritik tasarım kararı **backend ve veritabanı kullanmamak**. Form doldurulunca
tüm bilgiler bir JSON nesnesine dönüşür, URL-uyumlu **Base64** olarak kodlanır ve
doğrudan bağlantının içine (`#c=...`) gömülür:

```
https://whoami.cnklc.me/#c=eyJuIjoiQ2FuIEtJTEnDhyIsInQiOiJTb2Z0d2FyZSBEZXZlbG9wZXIiLCJiIjoiIiwiaW1nIjoiY25rbGMubWUiLCJjIjoiIzViOGNmZiIsImwiOlt7InR5cGUiOiJlbWFpbCIsInZhbHVlIjoiY25rbGNAeW1haWwuY29tIn0seyJ0eXBlIjoid2Vic2l0ZSIsInZhbHVlIjoiY25rbGMubWUifSx7InR5cGUiOiJpbnN0YWdyYW0iLCJ2YWx1ZSI6ImNuazFjIn0seyJ0eXBlIjoibGlua2VkaW4iLCJ2YWx1ZSI6ImNuazFjIn1dfQ
```

Sayfa açıldığında bu veri çözülüp kartvizit istemci tarafında oluşturulur.
Bunun getirdikleri: sıfır altyapı maliyeti (sadece statik barındırma),
gizlilik (veri hiçbir sunucuya gitmez), anında ölçeklenme ve link yaşadığı
sürece süren kalıcılık.

## Teknolojiler

Tüm uygulama **tek bir `index.html` dosyasında**, harici bir derleme adımı veya
framework olmadan çalışır: saf HTML, CSS (custom properties ile tema), vanilla
JavaScript; QR üretimi için qrcodejs, veri kodlamada `TextEncoder` + Base64,
kişi kartı için vCard 3.0, barındırma GitHub Pages + özel alan adı.
