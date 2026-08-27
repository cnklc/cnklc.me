---
layout: project
lang: tr
translation_url: /en/projects/sofra/
title: "Sofra — QR Menü ve Masa Sipariş Sistemi"
date: 2026-08-26
summary: "Kafe ve restoranlar için çok kiracılı QR menü SaaS'ı: masadan sipariş, kişi bazlı hesap bölüşme ve garson / mutfak / kasa ekranları."
tech: [Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma, PostgreSQL 16, SSE, Docker]
repo: ""
demo: "https://menu.ai-rezervasyon.com"
---

## Proje Hakkında

Sofra, kafe ve restoranların menüsünü, masa siparişlerini ve hesabını tek bir
yerden yürüttüğü çok kiracılı (multi-tenant) bir SaaS uygulamasıdır. Masadaki
QR kodu okutan misafir uygulama indirmeden menüyü görür, sipariş verir,
siparişinin mutfaktaki durumunu canlı izler ve hesabını masadaki diğer
kişilerle **kalem kalem** bölüşür.

İşletme tarafı tek bir panel değil, rolüne göre ayrışan dört ekrandır: garson
masa planı ve adisyonu yönetir, mutfak kendi istasyonunun kuyruğunu görür, kasa
hesabı böler ve tahsilatı kapatır, yönetim ise menü, masa/QR, personel,
rezervasyon ve raporlarla ilgilenir. Bunların üzerinde işletmeleri, planları ve
platform istatistiklerini yöneten bir süper-admin konsolu var.

Ürün uçtan uca tek başıma tasarlandı ve geliştirildi; altyapı, dağıtım ve canlı
işletim de dahil.

## Öne Çıkan Özellikler

- 📱 QR ile masadan sipariş — uygulama indirme, üyelik, parola yok
- 🧾 Kişi bazlı hesap bölüşme: bir kalemi birden fazla kişiye paylaştırma, kısmi tahsilat, indirim, ikram
- 👨‍🍳 Mutfak ekranı (KDS): istasyon kuyruğu, bekleme süresine göre renklenen kartlar, tek dokunuşla durum ilerletme
- 🧑‍💼 Garson ekranı: masa planı, adisyon açma, sipariş girişi, masa taşıma, iptal ve garson çağrıları
- 💳 Kasa ekranı: bölüşme, kısmi ödeme, adisyon kapatma
- 📊 Yönetim paneli: menü ve varyant/ekstra yönetimi, masa & QR üretimi, personel rolleri, rezervasyon, gün sonu raporları
- ⚡ Tüm operasyon ekranları **SSE** ile canlı — sayfa yenilemeye gerek yok
- 🏪 İşletmeye özel vitrin sayfası (`/b/{slug}`) — menü, harita ve rezervasyon formu
- 🥜 Alerjen beyanı ve mevzuata uygun **fiyat listesi** çıktısı
- 🆓 Üyeliksiz, ücretsiz fiyat listesi oluşturucu (tarayıcıda çalışan pazarlama aracı)
- 🛡️ Platform süper-admin konsolu: işletmeler, plan/askıya alma, kullanım istatistikleri ve hareket akışı

## Teknik Öne Çıkanlar

- **Para her yerde kuruş (tam sayı), float yasak.** Tüm bölme işlemleri tek bir
  modülde: `splitEvenly` artan kuruşu baştan dağıtır, `splitByBps`
  largest-remainder kullanır. Parçaların toplamı her koşulda tutara **birebir**
  eşittir; bu bir yorum değil, özellik testiyle korunan bir sözleşmedir.
- **Hesap matematiği veritabanından ayrı.** Kimin ne borçlu olduğuna karar
  veren kod saf bir modülde durur (`bill-math.ts`): servis veriyi yükler,
  hesabı bu modül yapar. Kural değişikliği önce buradaki teste yazılır.
- **Yarışı veritabanı kazanır.** "Masa başına tek açık adisyon" kuralı
  `status = 'OPEN'` üzerine kurulu partial unique index'tir; aynı masaya
  eşzamanlı iki katılım olduğunda uygulama `P2002` hatasını yakalayıp mevcut
  adisyona katılır — kaybeden istek hata görmez.
- **Kiracı izolasyonu:** her tabloda `tenantId`, veri erişimi yalnız servis
  katmanından ve tenant bağlamı zorunlu argüman. Route handler içinde ham
  Prisma sorgusu yazılmaz; kural bir e2e senaryosuyla da doğrulanır.
- **Fiyat sipariş anında kopyalanır** (`unitPrice`, `nameSnapshot`) — menü
  fiyatı sonradan değişse geçmiş adisyon bozulmaz.
- **Durum makinesi tek yerde:** `PLACED → PREPARING → READY → SERVED`, yetkiyle
  `CANCELLED`. Geçerli geçişler saf bir modülde tanımlı, servis onu çağırır.
- **Canlılık için WebSocket yerine SSE:** süreç içi bir olay hub'ı
  `venue:{id}` ve `session:{id}` kanallarına yayın yapar. İstemci her yeniden
  bağlanışta veriyi bir kez baştan çeker; böylece kaçan olay kalıcı bir hata
  bırakmaz. Yatay ölçekte Postgres `LISTEN/NOTIFY` adaptörüne arayüz
  değişmeden geçilebilir.
- **Misafir kimliği imzalı HttpOnly cookie:** guestId + masa kodu + adisyon.
  Yalnız kendi adisyonuna erişir, başka katılımcının kalemini değiştiremez,
  adisyon kapanınca geçersizleşir.
- **SEO sunucuda:** vitrin ve şehir kırılımlı dizin sayfaları SSR + 60 sn ISR
  ile üretiliyor, JSON-LD grafiği (`Organization` / `Restaurant` /
  `BreadcrumbList`) saf fonksiyonlarla kuruluyor ve testleniyor.
- **Dağıtım:** Docker Compose ile migrate + app; Traefik ve Cloudflare Tunnel
  arkasında, hiçbir konteyner dışa port açmadan yayında.

## Ücretsiz Fiyat Listesi Aracı

Ürünün önüne, üyelik istemeyen bir araç kondu: işletme menüsünü yapıştırıyor,
araç fiyat ve alerjen eksiklerini "engel" ve "uyarı" olarak işaretliyor,
sonunda mevzuata uygun, yazdırılabilir bir fiyat listesi çıkarıyor. Veri
tarayıcıdan çıkmıyor. Amaç hem gerçek bir işi çözmek hem de QR menü ürününe
doğal bir giriş noktası oluşturmak.

## Kullanılan Teknolojiler

**Next.js 16 (App Router)**, **React 19**, **TypeScript** ve
**Tailwind CSS 4** üzerine kurulu; veri katmanı **Prisma** +
**PostgreSQL 16**, doğrulama **zod**, oturumlar **jose** ile imzalı JWT
cookie, canlılık **SSE**. Testler **Vitest** (birim) ve **Playwright** (E2E),
dağıtım **Docker Compose** ile yapılıyor.
