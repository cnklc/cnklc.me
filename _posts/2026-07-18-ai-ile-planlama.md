---
layout: post
lang: tr
translation_url: /en/blog/ai-ile-planlama/
title: "Planlamada Yapay Zekâdan Yardım Almak: Örnekle Anlatmak"
date: 2026-07-18
summary: "Plan yazarken de yapay zekâdan yardım alabilirsin — ama 'bana plan yap' diyerek değil. Önce soru sordur, kapsamı sınırla, sonra planı eleştirt. Serinin projesi üzerinden gerçek bir örnekle."
tags: [vibe-coding, planlama, prompting]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Planlamada Yapay Zekâdan Yardım Almak: Örnekle Anlatmak"
---

> "Vibe Coding Yolculuğu" serisinin dördüncü yazısı.
> [Önceki yazıda]({{ '/blog/koddan-once-plan/' | relative_url }}) projeyi
> MVP ve fazlara bölmeyi anlatmıştım. Bu yazıda o planı tek başına değil,
> yapay zekâyla birlikte çıkarıyoruz — hem de serinin projesinin kendi
> fikri üzerinde.

Önceki yazının kuralı netti: koddan önce plan. Ama planı tek başına yazmak
zorunda değilsin. Yapay zekâ kod yazarken olduğu gibi plan yazarken de iyi
bir ortak — doğru kullanırsan. Yanlış kullanmanın yolu da çok kısa:
"bana plan yap."

## "Bana plan yap" neden işe yaramıyor

Boş bir sohbete "fatura takip uygulaması için bir plan yap" yazarsan,
geriye genellikle on iki maddelik, kullanıcı yönetimli, bildirim servisli,
belki mikroservisli bir kurumsal yol haritası döner. Model senin hakkında
hiçbir şey bilmiyor; boşlukları en popüler varsayımlarla dolduruyor. Sorun
modelde değil, soruda: iyi bir plan bilgi gerektirir ve o bilginin çoğu
sende. Amaç, o bilgiyi modele aktarmanın en kısa yolunu bulmak.

Bunu göstermek için serinin projesinin fikrini alıp süreci baştan sona,
sıradan bir sohbet arayüzünde gerçekten koştum. Aşağıdaki soruların ve
planların tamamı o sohbetten, birebir.

## Önce soru sordur

En işe yarayan teknik, akışı ters çevirmek: plan isteme, modelin sana soru
sormasını iste.

```text
Sana bir ürün fikri anlatacağım. Hemen plan yazma; önce fikri
netleştirmek için bana en fazla beş soru sor.

Fikir: Serbest çalışan olarak kestiğim faturaları tek yerden takip
etmek istiyorum. Hangileri ödenmedi göreyim, vadesi yaklaşanları
kaçırmayayım.
```

Modelin sorduğu sorular:

```text
1. Bu araç sadece senin kullanımın için mi, yoksa başka kişiler de
   mi giriş yapacak?
2. Nasıl kullanmak istersin: web arayüzü mü, yoksa şimdilik bir
   API/komut satırı yeterli mi?
3. Faturaları elle mi gireceksin, yoksa bir yerden (e-posta,
   muhasebe programı) otomatik çekmek ister misin?
4. "Vadesi yaklaşanları kaçırmayayım" derken uyarı nasıl gelsin:
   e-posta/bildirim mi, yoksa uygulamayı açınca listede görünmesi
   yeter mi?
5. Tek para birimi (TL) mi, ve faturalar hep tek seferlik mi yoksa
   aylık tekrar edenler de var mı?
```

Bu beş cevap, planın hammaddesi. İtiraf edeyim: dördüncü soruyu kendime hiç
sormamıştım — kafamda "bildirim gönderen bir şey" vardı, oysa uygulamayı
açınca özette görmek bana yetiyor. Tekniğin değeri tam burada: model plana
başlamadan, senin bile netleştirmediğin kararları su yüzüne çıkarıyor. Bu,
yapay zekânın
[kod dışı kullanım senaryolarının]({{ '/blog/yaygin-kullanim-senaryolari/' | relative_url }})
en değerlilerinden biri.

## Kapsamı sınırlayıp planı iste

Cevapları verip planı isterken kısıtları da koy — kısıt koymazsan model
koymaz:

```text
Cevaplar: tek kullanıcı benim, REST API yeterli (arayüz sonra),
veriyi elle gireceğim, uyarının uygulamayı açınca özette görünmesi
yeter, tutarlar TL, hem tek seferlik hem aylık düzenli faturalar var.

Şimdi bir MVP ve en fazla üç faz öner. Kurallar: her faz çalışan
bir ürünle bitmeli, MVP tek oturumda inşa edilebilecek kadar
küçük olmalı. Her faz için bir de "bu fazda YOK" listesi yaz.
```

Dönen plan:

```text
MVP — Fatura defteri (tek oturumda kurulur): elle fatura ekle/
listele; tutar, müşteri, kesim ve vade tarihi, durum (ödendi/
ödenmedi). Liste ödenmemişleri ve vadesi geçmişleri üstte göstersin.
  Bu fazda YOK: tekrar eden faturalar, uyarı/özet ekranı,
  düzenleme, kimlik doğrulama.
Faz 1 — Ödeme takibi ve özet: faturayı "ödendi" işaretle; açınca
vadesi 7 gün içinde olan ve geçmiş faturaların özeti dönsün.
  Bu fazda YOK: tekrar eden faturalar, otomatik e-posta bildirimi.
Faz 2 — Aylık düzenli faturalar: "her ay tekrar" tanımı; sıradaki
dönemin faturası otomatik üretilsin.
  Bu fazda YOK: değişken tutarlı abonelikler, para birimi çeşitliliği.
Faz 3 — Filtre ve basit raporlama: müşteri/durum/tarih filtresi;
aylık kesilen ve tahsil edilen toplamlar.
  Bu fazda YOK: grafik/dashboard, dışa aktarma, çoklu kullanıcı.
```

"Bu fazda YOK" listesi, prompt'taki en kıymetli cümle. İyi bir plan neyi
yapacağını değil, neyi yapmayacağını da söyler; bu liste scope creep'e
(kapsamın sessizce şişmesi) karşı yazılı bir çit. Dikkat çeken bir şey daha
var: bu planın MVP'si ve ilk fazı, serinin önceki yazılarında fiilen inşa
ettiğimiz çekirdekle neredeyse birebir örtüşüyor — iyi sınırlanmış bir soru,
bağımsız koşumda bile benzer makul plana çıkıyor.

## Planı eleştirt

Plan elinde diye iş bitmiyor; aynı modele planı bir de eleştirt:

```text
Bu planın en zayıf yeri neresi? Hangi varsayım yanlış çıkarsa
planı bozar? Yeni özellik önerme; sadece riskleri söyle.
```

Cevabın ilk cümlesi planın en zayıf yerini net koydu: veri girişi elle —
düzenli girmezsen defter eksik kalır ve "ödenmedi" listesi gerçeği
yansıtmaz; tüm değer buna bağlı. Sonra da varsayımları tek tek tartıya
vurdu: "uyarı açınca özette görünsün yeter" varsayımı riskli (uygulamayı
günlerce açmazsan vade yine kaçar; bu doğru değilse pasif bildirim baştan
gerekir ve mimariyi değiştirir), aylık faturaların hep sabit tutarlı olduğu
varsayımı Faz 2'nin tekrar mantığını bozabilir, tek para birimi varsayımı
yurt dışı müşteriyle çöker.

Buradaki incelik: benim onayladığım "özet yeter" cevabını bile sorgulamaya
geri getirdi. Kararı yine ben veririm — ama artık bunun bir karar olduğunu
bilerek veririm, farkında olmadan yapılmış bir varsayım olarak değil.
Prompt'taki "yeni özellik önerme" talimatına dikkat — o cümle olmazsa model
risk sayacağına özellik sayar.

## Dürüst bir sınır

Bu konuşmanın tamamı sıradan bir sohbet arayüzünde geçiyor; araç içindeki
plan onayı (Claude Code'daki halini
[Plan Mode yazısında]({{ '/blog/plan-mode/' | relative_url }}) anlatmıştım)
bundan ayrı bir seviye. O, tek bir kod değişikliğinin planı; burada
konuştuğumuz, ürünün planı.

Ve son söz hep sende. Model planlama ortağın, karar verici değil:
anlamadığın bir fazı onaylama — anlamadığın faz, anlamadığın kodun
habercisi. Plan da önceki yazıdaki gibi sözleşme değil, yaşayan bir belge;
eleştiri turunda öğrendiklerin onu değiştirebildiyse zaten işini yapıyor
demektir.

Sıradaki yazı: [Spec-Driven Development (SDD) Nedir?]({{ '/blog/spec-driven-development/' | relative_url }})
