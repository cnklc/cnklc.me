---
layout: post
lang: tr
translation_url: /en/blog/koddan-once-plan/
title: "Koddan Önce Plan: MVP ve Fazlar"
date: 2026-07-17
summary: "Vibe coding'de en pahalı hata, yanlış şeyi hızlıca inşa etmek. Projeyi bir MVP ve üzerine binen fazlara bölmek, yapay zekâyı da seni de rayında tutuyor."
tags: [vibe-coding, planlama, mvp]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Koddan Önce Plan: MVP ve Fazlar"
---

> "Vibe Coding Yolculuğu" serisinin üçüncü yazısı.
> [Zihniyet]({{ '/blog/vibe-coder-zihniyeti/' | relative_url }}) ve
> [araçlardan]({{ '/blog/vibe-coding-araclari/' | relative_url }}) sonra
> sıra işin asıl başladığı yerde: planlamada.

Vibe coding'in cazibesi hızında: bir fikri tarif ediyorsun, dakikalar içinde
çalışan bir şey beliriyor. Tuzak da tam burada. Yapay zekâ yanlış şeyi de aynı
hızla inşa eder. Plansız başlanan projelerde model her prompt'ta yeni bir mimari
karar alır, dosyalar çoğalır ve birkaç oturum sonra elinde ne olduğunu kimsenin
bilmediği bir yığın kalır. Kod üretimi ucuzladıkça, asıl değerli iş üretimden
önceye kayıyor: ne inşa edeceğine karar vermek.

## Önce MVP: hayalin değil, çekirdeğin tarifi

Klasik hata, ilk prompt'a ürünün tamamını yazmak: "kullanıcı girişi olan,
grafikli, bildirim gönderen bir harcama takip uygulaması yap." Model bunların
hepsine birden başlar ve hiçbirini senin istediğin gibi bitirmez.

Bunun yerine önce MVP'yi (minimum viable product — çalışan en küçük ürün)
tanımla: ürünün var olma sebebini kanıtlayan en dar çekirdek ne? Harcama takibi
örneğinde bu, "harcama ekle ve listele"den ibaret olabilir. Giriş ekranı,
grafik, bildirim — hepsi sonra. MVP'nin işlevi psikolojik değil pratik:
yapay zekâya verdiğin kapsamı daraltıyor, böylece hem çıktı denetlenebilir
kalıyor hem de yanlış anlaşılmalar küçükken yakalanıyor.

## Sonra fazlar: her biri öncekinin üstüne biner

MVP'den sonrasını fazlara böl. Her faz, bir önceki bitmiş ve çalışır durumdayken
başlar; her fazın sonunda elinde yine çalışan bir ürün olur. Kâğıt üstünde şöyle
görünür:

```text
Faz 1 (MVP): harcama ekle, listele; veri yerel JSON dosyasında
Faz 2: kategori desteği ve aylık özet
Faz 3: CSV dışa aktarma
Faz 4: basit grafikler
```

Faz 1'i bu planla birebir inşa edip denedim; bittiğinde elimdeki ürün
gösterişsizdi ama gerçekti:

```text
$ node expense.js add "Market" 450
Eklendi: #1 Market — 450 TL
$ node expense.js add "Kahve" 45
Eklendi: #2 Kahve — 45 TL
$ node expense.js list
#1  Market  450 TL
#2  Kahve  45 TL
Toplam: 495 TL
```

Kategori yok, grafik yok — ama çalışan ve üzerine inşa edilebilecek bir
çekirdek var.

Bu bölümlemenin vibe coding'e özgü bir faydası var: fazlar, oturum sınırlarıyla
örtüşür. Roadmap.sh'in best practices rehberinin de önerdiği gibi, her ayrı iş
için temiz bir bağlamla başlamak (yeni oturum ya da bağlam sıfırlama) modelin
eski varsayımları yeni işe taşımasını önler. "Bir faz = bir oturum" kuralı,
bağlam yönetimini kendiliğinden çözer.

## Planı yapay zekâya onaylatmadan kod yazdırma

Faz içinde de aynı ilke geçerli: model koda başlamadan önce planını görmek iste.
Bu, araçtan bağımsız çalışan bir prompt kalıbı:

```text
Faz 2'ye başlıyoruz: kategori desteği ve aylık özet.
Kod yazmadan önce bir plan çıkar: hangi dosyaları oluşturacak
veya değiştireceksin, veri yapısında ne değişecek, hangi kenar
durumları var? Varsayımlarını da listele. Onayımı bekle.
```

"Varsayımlarını listele" kısmı önemsiz görünür ama en çok işe yarayan cümle o;
yanlış anlaşılmalar genellikle modelin sessizce yaptığı varsayımlarda saklıdır.
Birçok araçta bu akışı destekleyen özel bir mod da var — Claude Code'daki
halini [Plan Mode yazısında]({{ '/blog/plan-mode/' | relative_url }})
ayrıntılı anlatmıştım; Cursor ve benzeri araçlarda da aynı etkiyi "önce planla,
kod yazma" talimatıyla alırsın.

## Dürüst bir sınır

Her iş bu töreni hak etmiyor. Tek dosyalık bir script için faz planı çıkarmak
zaman kaybı; orada "planını söyle, sonra yaz" tek cümlesi yeter. Plan ayrıca
bir sözleşme değil, yaşayan bir belge: Faz 2'de öğrendiğin bir şey Faz 3'ü
değiştirebilir. Amaç bürokrasi değil, her prompt'un küçük, net ve denetlenebilir
bir kapsamda kalması.

Sıradaki yazı: Planlamada Yapay Zekâdan Yardım Almak: Örnekle Anlatmak
