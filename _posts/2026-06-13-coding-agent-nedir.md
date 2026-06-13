---
layout: post
title: "Coding Agent (Kodlama Ajanı) Nedir?"
date: 2026-06-13
summary: "Otomatik tamamlama ile kodlama ajanı arasındaki fark ne? Bir aracın 'ajan' sayılması için neye ihtiyaç var ve Claude Code bunu nasıl yapıyor?"
tags: [claude-code, coding-agent, yapay-zeka]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Coding Agent (Kodlama Ajanı) Nedir?"
---

> "Claude Code Yolculuğu" serisinin ikinci durağı. Önceki yazıda
> [vibe coding]({{ '/blog/vibe-coding-nedir/' | relative_url }})'in ne olduğuna
> bakmıştık; şimdi onu mümkün kılan asıl şeye, kodlama ajanına geliyoruz.

Geçen yazıda vibe coding'den, yani niyeti tarif edip kodu yapay zekâya
bırakmaktan bahsettim. Peki o "yapay zekâ" tarafında tam olarak ne var?
Cevap: bir **coding agent** (kodlama ajanı).

## Otomatik tamamlama bir ajan değildir

Çoğumuz yapay zekâ destekli kodlamayı önce otomatik tamamlama araçlarıyla
tanıdık. Yazmaya başlıyorsun, araç satırın geri kalanını öneriyor. Faydalı,
ama pasif: sadece imlecin olduğu yere, o anki bağlama bakarak bir tahmin
yapıyor. Senin yerine bir şey *yapmıyor*, sadece bir sonraki tuşu tahmin ediyor.

Kodlama ajanı bambaşka bir kategori. Ona bir satır değil, bir **hedef**
veriyorsun: "auth modülü için testleri yaz, çalıştır ve hataları düzelt".
Sonra ajan bu hedefe ulaşmak için kendi adımlarını planlıyor ve uyguluyor.

## Bir aracı "ajan" yapan nedir?

Resmi tanımıyla Claude Code "kod tabanını okuyan, dosyaları düzenleyen,
komutları çalıştıran ve geliştirme araçlarınla entegre olan ajansal bir
kodlama aracı". Bu cümledeki fiiller önemli, çünkü bir ajanı tamamlayıcıdan
ayıran şey tam olarak bunlar:

- **Okur:** Tek bir dosyaya değil, projenin bütününe bakabilir; ilgili
  yerleri kendi bulur.
- **Yazar:** Birden fazla dosyada değişiklik yapar.
- **Çalıştırır:** Terminal komutları çalıştırır — testleri koşar, linter'ı
  çağırır, build alır.
- **Gözlemler ve düzeltir:** Çıktıyı görür, hata varsa geri dönüp düzeltir.

İşte bu döngü — planla, uygula, sonucu gözlemle, gerekiyorsa tekrar dene —
ajansal davranışın kalbi. (Serinin ileri yazılarında bu "agentic loop"
konusuna ayrı bir başlık ayıracağım.)

## Küçük bir örnek

Diyelim ki şöyle bir komut veriyorsun:

```bash
claude "auth modülü için testleri yaz, çalıştır ve hataları düzelt"
```

Bir ajan burada tek seferde kod üretip durmaz. Tipik olarak: önce auth
modülünün dosyalarını okur, ne yaptığını anlar, testleri yazar, test
komutunu çalıştırır, çıkan hataları okur, kodu veya testi düzeltir ve
testler geçene kadar bu döngüyü sürdürür. Yani senin elle yapacağın
"yaz–çalıştır–hata ayıkla" turunu kendisi çeviriyor.

## Neden bu önemli?

Çünkü çözebileceği problemlerin türünü değiştiriyor. Tamamlayıcı, "bu satırı
nasıl bitiririm?" sorusuna iyidir. Ajan ise "bu bug'ı bul ve düzelt",
"bağımlılıkları güncelle", "şu lint hatalarını proje genelinde temizle" gibi
**çok adımlı ve yan etkili** işlerin altından kalkabilir. Resmi dokümanın
deyişiyle, "sürekli ertelediğin sıkıcı işleri" devralabilir.

Ama —ilk yazıda da söylediğim gibi— bu güç, gözden geçirme sorumluluğunu
ortadan kaldırmıyor. Ajan komut çalıştırıp dosya değiştirebildiği için,
ne yaptığını anlamak ve onaylamak hâlâ senin işin. Güçlü bir asistan,
patron değil.

## Özet

Otomatik tamamlama bir sonraki tuşu tahmin eder; kodlama ajanı bir hedefe
ulaşmak için okur, yazar, çalıştırır ve kendini düzeltir. Claude Code da tam
olarak böyle bir araç. Bir sonraki yazıda bu aracın somut yüzüne —
terminaldeki Claude CLI'a — bakacağız.

---

*Sıradaki yazı: Claude CLI'a Giriş*
