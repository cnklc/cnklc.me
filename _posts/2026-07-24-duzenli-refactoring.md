---
layout: post
lang: tr
translation_url: /en/blog/duzenli-refactoring/
title: "Yapay Zekâya Düzenli Refactoring Yaptırmak"
date: 2026-07-24
summary: "Vibe coding'de kod hızlı birikir, teknik borç da öyle. Refactoring'i küçük ve sık turlar hâline getirmek, tek seferlik büyük temizliklerden hem ucuz hem güvenli."
tags: [vibe-coding, refactoring, kod-kalitesi]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Yapay Zekâya Düzenli Refactoring Yaptırmak"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Araç fark etmeksizin geçerli
> bir alışkanlığa bakıyoruz: yapay zekânın ürettiği koddaki düzensizliği
> biriktirmek yerine, onu küçük ve düzenli turlarla temizlemek.

Vibe coding'de kod hızlı birikir. Model her istekte çalışan bir şey üretir,
sen kabul edersin, bir sonrakine geçersin. Birkaç gün sonra fatura takibi
projesinde `createInvoice` fonksiyonu hem doğrulama hem kayıt hem yanıt
biçimlendirme yapıyor, aynı tarih formatlama mantığı üç dosyaya kopyalanmış
oluyor. Bu teknik borç sessizce faiz işletir: her yeni özellik biraz daha
zorlaşır, model de dağınık kodu örnek alıp dağınıklığı çoğaltır.

## Refactoring nedir, neden yapay zekâ çağında daha kritik

Refactoring, kodun **davranışını değiştirmeden** iç yapısını düzeltmektir —
aynı girdi, aynı çıktı, ama daha temiz düzen. Yapay zekâ kod üretimini
hızlandırdığı için borç da eskisinden hızlı birikir. Bu yüzden refactoring
artık ara sıra yapılan bir lüks değil, üretim döngüsünün doğal bir parçası.

## Küçük ve sık, tek seferlik büyük temizlik değil

En pahalı senaryo, düzeltmeyi haftalarca erteleyip sonunda modele "her şeyi
temizle" demektir. Böyle geniş bir istek, kontrol edemeyeceğin kadar büyük bir
diff üretir ve neyin bozulduğunu anlamak imkânsızlaşır. Bunun yerine her
özellikten sonra kısa bir düzeltme turu daha güvenli: küçük, tek amaçlı,
gözden geçirilebilir bir değişiklik.

```text
Fatura takibi projesinde src/routes/invoices.ts içindeki createInvoice
fonksiyonu hem doğrulama hem kayıt hem yanıt biçimlendirme yapıyor.
Sadece doğrulama mantığını src/validators/invoice.ts altına ayrı bir
fonksiyona taşı. Endpoint ve yanıt formatı birebir aynı kalsın; başka
dosyaya dokunma.
```

## Kuralı baştan koy: davranışı koru, kapsamı daralt

İyi bir refactoring isteğinin üç şartı var: dışa açık davranışı (public API,
endpoint, yanıt formatı) koru, çağıran yerleri de birlikte güncelle ve
dokunulmayacak alanları açıkça belirt. Model, yeniden adlandırdığı bir
fonksiyonun tüm kullanımlarını güncellemeyi unutabilir ya da "daha iyi" diye
imzayı sessizce değiştirebilir. Kapsamı daraltmak bunu baştan engeller.

## Güvenlik ağı: davranışı kanıtlayan testtir

Refactoring'in tanımı gereği çıktı değişmez — ama bunu senin adına garanti
eden tek şey testtir. Bu yüzden düzen: refactor'dan önce testler yeşilse,
refactor'dan sonra da yeşil olmalı.

```
npm test
```

Yeşilden yeşile bir refactor güvenlidir; test yoksa aslında davranışı
değiştirmediğini yalnızca umuyorsundur. Değişikliği kabul etmeden önce diff'i
dikkatle okuma alışkanlığını
[Kullanım İçin En İyi Pratikler]({{ '/blog/kullanim-en-iyi-pratikleri/' | relative_url }})
yazısında ele almıştım; refactoring'de en çok silinen dosyalara ve değişen
fonksiyon imzalarına bakmak gerekir.

Dürüst bir uyarı: refactoring bedava değil. Amaç kodu sürekli parlatmak değil,
yalnızca yükü artan yerleri sadeleştirmek. Her tekrarı hemen soyutlamaya
çalışmak da bir borçtur — bazen iki benzer fonksiyon, erken kurulmuş yanlış
bir soyutlamadan daha iyidir. Ölçü: bir yer üçüncü kez seni yavaşlatıyorsa,
düzeltme zamanı gelmiştir.

Sıradaki yazı: [Spesifik Prompt, Tek Görev]({{ '/blog/spesifik-prompt-tek-gorev/' | relative_url }}).
