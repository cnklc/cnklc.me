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
> sıra işin asıl başladığı yerde: planlamada. Fatura takibi projemiz de
> bu yazıda yeni bir faz kazanıyor.

Vibe coding'in cazibesi hızında: bir fikri tarif ediyorsun, dakikalar içinde
çalışan bir şey beliriyor. Tuzak da tam burada. Yapay zekâ yanlış şeyi de aynı
hızla inşa eder. Plansız başlanan projelerde model her prompt'ta yeni bir mimari
karar alır, dosyalar çoğalır ve birkaç oturum sonra elinde ne olduğunu kimsenin
bilmediği bir yığın kalır. Kod üretimi ucuzladıkça, asıl değerli iş üretimden
önceye kayıyor: ne inşa edeceğine karar vermek.

## Önce MVP: hayalin değil, çekirdeğin tarifi

Klasik hata, ilk prompt'a ürünün tamamını yazmak: "vade uyarıları gönderen,
raporlu, grafikli, muhasebe entegrasyonlu bir fatura takip uygulaması yap."
Model bunların hepsine birden başlar ve hiçbirini senin istediğin gibi bitirmez.

Bunun yerine önce MVP'yi (minimum viable product — çalışan en küçük ürün)
tanımla: ürünün var olma sebebini kanıtlayan en dar çekirdek ne? Fatura
takibinde bu, "fatura ekle, listele, ödendi işaretle"den ibaret. Serinin ilk
iki yazısında tam olarak bunu inşa ettik — rapor yok, kalıcı depolama yok,
bildirim yok. MVP'nin işlevi psikolojik değil pratik: yapay zekâya verdiğin
kapsamı daraltıyor, böylece hem çıktı denetlenebilir kalıyor hem de yanlış
anlaşılmalar küçükken yakalanıyor.

## Sonra fazlar: her biri öncekinin üstüne biner

MVP'den sonrasını fazlara böl. Her faz, bir önceki bitmiş ve çalışır durumdayken
başlar; her fazın sonunda elinde yine çalışan bir ürün olur. Fatura takibi
projemizin planı şöyle:

```text
Faz 1 (MVP): fatura ekle, listele, ödendi işaretle; veri bellek-içi  ✓
Faz 2: vade takibi — vadesi yaklaşan ve geçmiş faturaların özeti
Faz 3: kalıcı depolama (JSON dosyası)
Faz 4: aylık rapor — ay sonu ödenmemiş toplamlar
```

Bu bölümlemenin vibe coding'e özgü bir faydası var: fazlar, oturum sınırlarıyla
örtüşür. Roadmap.sh'in best practices rehberinin de önerdiği gibi, her ayrı iş
için temiz bir bağlamla başlamak (yeni oturum ya da bağlam sıfırlama) modelin
eski varsayımları yeni işe taşımasını önler. "Bir faz = bir oturum" kuralı,
bağlam yönetimini kendiliğinden çözer.

## Planı yapay zekâya onaylatmadan kod yazdırma

Faz içinde de aynı ilke geçerli: model koda başlamadan önce planını görmek iste.
Faz 2'yi tam olarak bu kalıpla başlattım — prompt birebir şu:

```text
Faz 2'ye başlıyoruz: vade takibi. Ödenmemiş faturalardan vadesi
yaklaşanları (7 gün içinde) ve vadesi geçmişleri gösteren bir özet
endpoint'i istiyorum. Kod yazmadan önce bir plan çıkar: hangi dosyaları
oluşturacak veya değiştireceksin, veri yapısında ne değişecek, hangi
kenar durumları var? Varsayımlarını da listele. Onayımı bekle.
```

Model tek satır kod yazmadan planını gösterdi: hangi dosyalara dokunacağı
(özet hesabını ayrı, saf bir fonksiyona koymayı kendisi önerdi), veri
şemasının değişmeyeceği ve kenar durumları. Asıl kıymetli kısım, birebir
aktardığım şu varsayım listesiydi:

```text
Varsayımlar
1. "7 gün içinde" = bugün dahil, bugünden itibaren 0-7 gün kalan;
   7. gün dahil.
2. Bugün vadeli fatura "yaklaşan" kabul edilir, "geçmiş" değil.
3. Ödenmiş faturalar özetin tamamen dışında.
4. Karşılaştırma takvim günü bazında (UTC), saat/dilim yok sayılır.
5. Depo şeması değişmez; kalanGun yalnızca yanıtta türetilir.
6. Deterministik test için endpoint ?bugun= override kabul eder.
```

"Varsayımlarını listele" cümlesi önemsiz görünür ama en çok işe yarayan kısım
o: "bugün vadeli fatura hangi gruba girer?" sorusunu ben kendime hiç
sormamıştım — model plana başlamadan su yüzüne çıkardı. Onayladım; iş
bittiğinde dönen özet şuydu:

> Faz 2 vade takibi hazır. `GET /faturalar/ozet` artık ödenmemiş faturaları
> iki grupta veriyor: vadesi geçmiş ve 7 gün içinde vadesi dolacaklar; her
> grup için adet, toplam tutar ve kalan gün bilgisiyle. Tarih mantığını
> deterministik test edebilmek için endpoint opsiyonel `?bugun=YYYY-MM-DD`
> alıyor, çekirdek hesap ise saf bir fonksiyona taşındı. Sınır durumlarını
> (bugün vadeli = yaklaşan, tam 7. gün dahil, ödenmişler hariç, bozuk tarih)
> test ettim; 11 mevcut + 10 yeni, toplam 21 test yeşil.

Testleri ben de bağımsız çalıştırdım: 21'i de geçiyor. Kod yazılmadan önce ne
yapılacağını görmek, yanlış yöne gidilmiş yarım saatlik bir üretimi geri
almaktan her zaman ucuz. Birçok araçta bu akışı destekleyen özel bir mod da
var — Claude Code'daki halini
[Plan Mode yazısında]({{ '/blog/plan-mode/' | relative_url }})
ayrıntılı anlatmıştım; Cursor ve benzeri araçlarda da aynı etkiyi "önce planla,
kod yazma" talimatıyla alırsın.

## Dürüst bir sınır

Her iş bu töreni hak etmiyor. Tek dosyalık bir script için faz planı çıkarmak
zaman kaybı; orada "planını söyle, sonra yaz" tek cümlesi yeter. Plan ayrıca
bir sözleşme değil, yaşayan bir belge: Faz 2'de öğrendiğin bir şey Faz 3'ü
değiştirebilir. Amaç bürokrasi değil, her prompt'un küçük, net ve denetlenebilir
bir kapsamda kalması.

Sıradaki yazı: [Planlamada Yapay Zekâdan Yardım Almak: Örnekle Anlatmak]({{ '/blog/ai-ile-planlama/' | relative_url }})
