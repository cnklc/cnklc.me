---
layout: post
lang: tr
translation_url: /en/blog/ai-ile-hata-ayiklama/
title: "Yapay Zekâ ile Hata Ayıklama: Anlamadan Kabul Etme"
date: 2026-08-02
summary: "Kod üretmek vibe coding'in kolay kısmı; zor kısmı çalışmadığında ne yaptığınız. Hatayı tekrar üretmek, kanıt vermek, düzeltmeden önce sebep istemek ve tıkandığında geri sarmak üzerine."
tags: [vibe-coding, hata-ayiklama, prompting]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Yapay Zekâ ile Hata Ayıklama: Anlamadan Kabul Etme"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Geçen yazıda oturum içinde
> biriken bağlamı temiz tutmayı konuşmuştuk. Bu sefer konu, işler bozulduğunda
> ne yaptığınız: hata ayıklama.

Kod üretmek vibe coding'in kolay kısmı. Zor kısmı, üretilen kod çalışmadığında
ne yaptığınız. En yaygın başarısızlık kalıbı şöyle işliyor: hatayı yapıştırırsınız,
model bir düzeltme önerir, kabul edersiniz; hata biçim değiştirir ama kaybolmaz.
Üçüncü turda ne siz ne model kodun neden o hâle geldiğini biliyordur. Hata
ayıklama, kodlama ajanlarının en çok kullanıldığı işlerden biri
([yaygın kullanım senaryoları]({{ '/blog/yaygin-kullanim-senaryolari/' | relative_url }})
yazısında değinmiştik) — ama en çok da burada kontrolü elden bırakıyoruz.

## Hatayı önce siz üretin

Tekrar üretemediğiniz hatayı düzeltemezsiniz; model de düzeltemez. "PDF bazen
boş çıkıyor" cümlesi modele hiçbir şey söylemez, o da boşluğu tahminle doldurur.
Önce hatayı tetikleyen kesin adımı bulun, sonra prompt'u yazın:

```text
Hata: Fatura #1042'nin PDF çıktısı boş geliyor. #1041 ve #1043 sorunsuz.
Tekrar üretme: /invoices/1042 sayfasında "PDF indir" butonu.
Gözlem: #1042'de kalem listesi boş, sadece bir indirim satırı var.
Önce sebebi açıkla; henüz kod yazma.
```

Bu prompt'u yazma eyleminin kendisi de işe yarıyor: farkı bulmak için
gerekli düşünceyi zaten yapmış oluyorsunuz.

## Semptomu değil, kanıtı verin

Model sizin terminalinizi görmüyor. "Hata veriyor" yerine gerçek çıktıyı verin:
stack trace, ilgili log satırları, başarısız testin çıktısı.

```bash
npm test -- invoices/pdf 2>&1 | tail -40
```

Çıktıyı olduğu gibi yapıştırın, özetlemeyin. Özetlerken önemsiz sandığınız
satır çoğu zaman asıl ipucudur — sizin göz ardı ettiğiniz uyarı, modelin doğru
dosyaya gitmesini sağlayan şey olabilir.

## Düzeltmeden önce sebep isteyin

Kural basit: önce açıklama, sonra yama. Bir düzeltmeyi, neyin neden bozulduğunu
kendi cümlelerinizle anlatamıyorsanız kabul etmeyin. Anlamadan kabul edilen her
düzeltme, sonraki hatanın zeminini hazırlıyor.

```text
Bu hata için üç olası sebep listele. Her biri için hangi dosyaya bakıp
nasıl doğrulayacağını yaz. Düzeltme önerme.
```

Dürüst olmak gerekirse modelin ilk hipotezi genellikle makul görünür ve sıklıkla
yanlıştır. Doğrulama adımını istemenin sebebi bu. Ayrıca dar bir düzeltme
isteyin: yaygın bir refleks, hatayı bir `try/catch` içine alıp yutmaktır. Bu,
hatayı çözmez; sadece görünmez yapar.

## İki denemede olmuyorsa geri sarın

Aynı hatayı üç kez düzeltmeye çalıştıysanız, artık bağlamınız başarısız
denemelerle kirlenmiş demektir. Model kendi eski önerilerini referans almaya
devam eder. Doğru hamle, üstüne bir yama daha koymak değil, temiz duruma dönmek.

Önce ne değiştiğini görün, sonra geri alın:

```bash
git diff
git checkout -- .
```

Araçların kendi geri alma mekanizmaları da var; Claude Code'da `/rewind`
komutu (ya da girdi kutusu boşken `Esc` tuşuna iki kez basmak) oturumdaki her
prompt'u listeleyip kodu, konuşmayı veya ikisini birden o noktaya döndürüyor.
Sınırını bilmekte fayda var: bu mekanizma yalnızca aracın dosya düzenleme
araçlarıyla yaptığı değişiklikleri izliyor; bir bash komutunun (`rm`, `mv` gibi)
yaptıklarını geri almıyor. Asıl güvenlik ağı hâlâ git — o yüzden hata avına
çıkmadan önce çalışan hâli commit'lemek en ucuz sigorta.

Temiz duruma döndükten sonra sıfırdan başlamıyorsunuz: elinizde artık işe
yaramayan üç yol var. Bunu bir sonraki prompt'a yazın.

## Kapatmadan önce

Düzeltme geldiğinde bir soru daha sorun: bu hatayı yakalayan bir test var mı?
Yoksa, önce hatayı gösteren testi yazdırın — düzeltmeden önce kırmızı, sonra
yeşil olmalı. Yoksa aynı hatayı birkaç hafta sonra yeniden keşfedersiniz.

Sıradaki yazı: [Log Ekletmek ve MCP ile Debug]({{ '/blog/log-ve-mcp-ile-debug/' | relative_url }})
