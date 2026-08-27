---
layout: project
lang: tr
translation_url: /en/projects/randevum/
title: "Randevum — Kuaför & Berber Randevu Sistemi"
date: 2026-08-27
summary: "Kuaför, berber ve güzellik salonları için çok kiracılı randevu SaaS'ı: işletmenin kendi tanıtım sayfası, linkten online rezervasyon ve yönetim paneli."
tech: [.NET 10, Minimal API, PostgreSQL, EF Core, Next.js 15, TypeScript, Tailwind CSS, Docker]
repo: ""
demo: "https://ai-rezervasyon.com"
---

## Proje Hakkında

Randevum, kuaför / berber / güzellik salonlarının randevularını tek bir yerden
yönettiği çok kiracılı (multi-tenant) bir SaaS uygulamasıdır. Her işletme kayıt
olduğunda üç şeye birden sahip olur: kendi adresinde yayınlanan bir **tanıtım
sayfası** (hizmetler, ekip, çalışma saatleri, harita), müşterisine
paylaşabileceği bir **online rezervasyon linki** ve günlük işi yürüttüğü
**yönetim paneli**.

Müşteri tarafında kayıt/parola yoktur: telefon numarasıyla randevu alınır, kısa
bir müşteri numarasıyla da kendi randevusunu görüntüleyip iptal edebilir veya
saatini değiştirebilir. İşletme tarafı ise takvim, müşteri kartları, hizmet ve
personel yönetiminden oluşur.

Ürün uçtan uca tek başıma tasarlandı ve geliştirildi; altyapı, dağıtım ve canlı
işletim de dahil.

## Öne Çıkan Özellikler

- 🏪 İşletmeye özel tanıtım sayfası (`/i/{isletme}`) — hizmet, ekip, harita, yol tarifi
- 📅 Haftalık ve günlük takvim; çakışan randevuları yan yana paylaştıran ızgara
- 🔗 Linkten online rezervasyon — müşterinin hesap açmasına gerek yok
- 👤 Müşteri self-servisi: telefon + müşteri numarasıyla randevusunu görüntüleme, iptal, erteleme
- 🔔 İşletmeciye anlık **web push** bildirimi (yeni talep / iptal / erteleme)
- 🚫 Kapalı gün ve izin girişi; kapanışlar müşteriye açık saatlerden otomatik düşer
- 🗂️ Müşteri CRM'i — geçmiş randevular, "gelmedi" takibi, işletmeye özel notlar
- ⏰ Randevu hatırlatma ve otomatik "tamamlandı" işaretleme arka plan servisleri
- 📈 İlk-taraf ürün analitiği + süper-admin paneli (işletme, kullanım, huni takibi)
- 🔍 Sunucu tarafı render, JSON-LD yapısal veri ve şehir kırılımlı işletme dizini

## Teknik Öne Çıkanlar

- **Modüler monolit:** `Api / Application / Domain / Infrastructure` ayrımı,
  controller yerine Minimal API endpoint grupları.
- **Çift rezervasyon koruması veritabanındadır:** `btree_gist` + `tstzrange`
  üzerine kurulu bir `EXCLUDE` kısıtı aynı personele çakışan iki randevu
  yazılmasını engeller. Uygulamadaki ön kontrol yalnızca güzel hata mesajı
  içindir — yarışı her koşulda veritabanı kazanır.
- **Kiracı izolasyonu:** her tabloda `TenantId` ve EF Core global query filter;
  JWT'den okunan tenant bağlamı isteğin tamamı boyunca taşınır.
- **Saf çekirdek, test edilebilir mantık:** slot hesaplama, hatırlatma kararı,
  izin aralığı çevirimi, telefon/slug normalizasyonu gibi kurallar bağımlılıksız
  sınıflarda toplandı ve birim testleriyle korunuyor.
- **Zaman dilimi disiplini:** tüm `DateTimeOffset` değerleri UTC'ye normalize
  edilir; "20 Ağustos kapalıyım" gibi girdiler işletmenin saat dilimine göre
  mutlak aralığa çevrilir.
- **Arka plan servisleri:** hatırlatma, otomatik tamamlama, push gönderimi ve
  veri temizliği hafif `BackgroundService`'lerle yürür (harici zamanlayıcı yok).
- **Web Push (VAPID):** aracı servis olmadan, doğrudan tarayıcı push
  sağlayıcılarına gönderim; istek yolunu bloklamamak için bellek içi kuyruk.
- **Google Analytics yerine ilk-taraf olay tablosu:** huninin alt ucu zaten aynı
  veritabanında olduğu için olaylar Postgres'e yazılır; kişisel veri saklanmaz,
  olay adları kapalı listedir ve veri saklama süresi sonunda silinir.
- **Özellik bayrakları:** mesajlaşma kanalları ve AI asistanı koddan silinmeden
  kapatılabiliyor; kapalıyken uçlar hiç haritalanmıyor.
- **Dağıtım:** Docker Compose; hiçbir konteyner dışa port açmaz, dışa açılış
  Traefik + Cloudflare Tunnel üzerindendir.

## AI Asistanı (bayrakla kapalı)

Projede tool-calling tabanlı bir randevu asistanı da yazıldı: müsait saatleri
sorgulama, randevu oluşturma/iptal ve işletmeciye devretme araçlarıyla mesajlaşma
üzerinden randevu alabiliyor. Sağlayıcı bağımsız bir arayüzün arkasında duruyor
(Anthropic / OpenRouter). İlk sürümde satılan şey "işletmenin randevu sayfası"
olduğu için asistan ve mesajlaşma kanalları bilinçli olarak özellik bayrağıyla
kapatıldı; kod yerinde duruyor.

## Kullanılan Teknolojiler

Arka uç **.NET 10** ve **Minimal API**, veri katmanı **EF Core** ile
**PostgreSQL 16**. Ön yüz **Next.js 15 (App Router)**, **TypeScript** ve
**Tailwind CSS 4** — müşteriye açık sayfalar SEO için sunucuda render ediliyor.
Dağıtım **Docker Compose**, **Traefik** ve **Cloudflare Tunnel** ile yapılıyor.
