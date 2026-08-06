---
layout: post
lang: tr
translation_url: /en/blog/ai-a-test-yazdirmak/
title: "Yapay Zekâya Test Yazdırmak: TDD ve Bug'ı Kıran Test"
date: 2026-08-05
summary: "Test, modelin işini bitirdiğini kanıtlayan tek şey. Önce testi yazdırmak, hatayı üreten testle başlamak ve testi kimin yazdığına dikkat etmek — üç pratik."
tags: [vibe-coding, test, tdd]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Yapay Zekâya Test Yazdırmak: TDD ve Bug'ı Kıran Test"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Geçen yazıda git'in geri alma
> ağını konuştuk. Bu yazı bir adım öncesi: geri almaya gerek olup olmadığını
> nasıl anlıyorsun?

Model bir işi "bitti" sandığında durur. Elinde çalıştırabileceği bir kontrol
yoksa "bitmiş görünüyor" tek sinyaldir ve doğrulama işi tamamen sana kalır: her
hata, senin fark etmeni bekler. Test bu döngüyü kapatır. Model kodu yazar, testi
koşar, çıktıyı okur ve geçene kadar tekrar dener. Bu döngünün genel mantığını
[Claude Code'un en iyi pratikleri]({{ '/blog/kullanim-en-iyi-pratikleri/' | relative_url }})
yazısında anlatmıştım; burada özellikle testin kendisine bakıyorum.

## Sırayı ters çevir: önce test

Modele "şunu yap, sonra test de yaz" dersen genellikle yazdığı kodun yaptığı şeyi
doğrulayan testler alırsın. Yani kod yanlışsa test de yanlış olur. Sırayı ters
çevirmek bunu engelliyor: testi önce yazdır, davranışı önce sen onayla.

Fatura takibi projesinde indirim hesabı ekleyeceğim. İlk prompt:

```text
Fatura toplamına indirim hesabı ekleyeceğiz. TDD ile ilerle: önce testleri
yaz, çalıştır ve başarısız olduklarını göster. Bu aşamada implementasyon
kodu yazma, mock veya boş fonksiyon üretme.

Senaryolar:
- indirim yok: 1000 TL fatura, toplam 1000
- %10 indirim: 1000 TL fatura, toplam 900
- indirim oranı 100'den büyük: hata fırlat
- indirim oranı negatif: hata fırlat
```

"Implementasyon yazma" kısmı önemli. Aksi hâlde model testleri geçirmek için
hızlı bir iskelet üretiyor ve testin başarısız olduğunu hiç görmüyorsun —
başarısız olduğunu görmediğin test, aslında bir şey ölçtüğünü kanıtlamamıştır.

Testler kırmızıyken ikinci prompt:

```text
Şimdi bu testleri geçecek kodu yaz. Testleri değiştirme. Hepsi geçene kadar
devam et ve sonunda test çıktısını olduğu gibi göster.
```

"Testleri değiştirme" cümlesi olmadığında modelin en kısa yolu bulup testi
gevşetmesi sık görülen bir durum. Çıktıyı istemek de aynı sebeple: modelin
"hepsi geçti" demesi ile testin gerçekten geçmesi aynı şey değil.

## Bug'ı kıran testle başla

Bir hata bildirimi geldiğinde ilk istenecek şey düzeltme değil, hatayı üreten
test:

```text
%100 indirimli faturada toplam 0 yerine KDV kadar çıkıyor.
src/invoices/total.js dosyasına bak. Önce bu hatayı üreten başarısız bir
test yaz ve başarısız olduğunu göster; sonra düzelt.
```

Bunun iki faydası var. Birincisi, hatayı doğru anladığınızı kanıtlıyor —
başarısız olmayan bir test, ya hata başka yerdedir ya da senaryoyu yanlış tarif
etmişsindir. İkincisi, aynı hata geri döndüğünde bunu yakalayacak bir test
bırakıyor.

## Testi yazan, kodu yazan olmasın

Kendi yazdığı koda test yazan model, o kodun varsayımlarını da miras alır.
Anthropic'in kendi rehberinde önerilen ayrım şu: bir oturum testleri yazsın,
diğeri testleri geçecek kodu. Aynısını subagent'la da yapabilirsin — taze bağlam,
kodu üretirken kurulan varsayımları taşımıyor:

```text
Bir subagent kullan: src/invoices/discount.js için yazılmış testleri
yalnızca dış davranışa bakarak gözden geçir. Kapsanmayan uç durumları listele.
```

Bunun bir maliyeti var: iki oturum, daha fazla token, daha fazla senkronizasyon.
Her değişiklik için değmez; para, vergi, yetki gibi yerlerde değer.

## Sınırları

Test yazdırmak kaliteyi garanti etmiyor. Model, kapsama oranını yükseltip hiçbir
şey doğrulamayan testler üretebilir; aşırı mock kullanıp gerçek entegrasyonu
atlayabilir. Testleri okumadan kabul edersen, kodu okumadan kabul etmekle aynı
yere geliyorsun — sadece bir katman daha uzağa.

Kontrolü daha sıkı bir kapıya bağlamak istiyorsan araçların otomasyon
mekanizmaları var; Claude Code'da bir Stop hook, testler geçmedikçe turun
bitmesini engelliyor (üst üste 8 engelden sonra devreden çıkıyor). Ama kapının
sıkılığı, arkasındaki testin kalitesinden fazlasını veremez.

Sıradaki yazı: [Sırları Koda Gömme: Güvenlik Pratikleri]({{ '/blog/sir-yonetimi-ve-guvenlik/' | relative_url }})
