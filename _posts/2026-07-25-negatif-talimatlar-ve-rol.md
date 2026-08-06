---
layout: post
lang: tr
translation_url: /en/blog/negatif-talimatlar-ve-rol/
title: "Ne Yapmamasını da Söyle: Negatif Talimatlar ve Rol Verme"
date: 2026-07-25
summary: "Bir isteği daraltmanın iki tamamlayıcı yolu: modelin dokunmayacağı yerleri açıkça yazmak ve ona bir rol vererek önceliklerini belirlemek. İkisinin de işe yaradığı ve tersine döndüğü yerler var."
tags: [vibe-coding, prompting, kod-kalitesi]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Ne Yapmamasını da Söyle: Negatif Talimatlar ve Rol Verme"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Geçen yazıda isteği tek bir
> göreve daraltmayı konuşmuştuk; şimdi o isteğin iki tamamlayıcı parçasına
> bakıyoruz: neyin yapılmayacağını söylemek ve modele bir rol vermek.

[Spesifik prompt, tek görev]({{ '/blog/spesifik-prompt-tek-gorev/' | relative_url }})
kuralı isteğin *ne* olduğunu netleştiriyor. Ama pratikte sorun çoğu zaman
istediğiniz şeyde değil, modelin yanına eklediği şeylerde çıkar: dokunmaması
gereken bir dosyayı "iyileştirir", istemediğiniz bir bağımlılığı ekler,
istemediğiniz bir üslupla yazar. Bunun için isteğe iki şey daha eklemek gerekir.

## Yasak bölgeler: "dokunma" demek gerçekten işe yarar

Negatif talimatın en güçlü kullanımı kapsam sınırıdır. Modelin hangi dosyalara,
dizinlere ve kararlara el süremeyeceğini yazmak, muğlak bırakılan her şeyden
daha etkilidir. Fatura takibi projesinden:

```text
Fatura listesine "son güncelleme" sütunu ekle.
Sadece src/models/invoice.ts ve src/components/InvoiceList.tsx değişsin.
src/auth/ altına dokunma — kimlik doğrulama akışı kapsam dışı.
Yeni bağımlılık ekleme.
```

Bu üç yasak satırı, "sadece şunu yap" demenin tek başına kapatamadığı boşluğu
kapatır. roadmap.sh'in vibe coding en iyi pratikler rehberi de aynı şeyi
söylüyor: yasak bölgeleri proje yapılandırma dosyanızda tanımlamak gerekli ama
yeterli değil; o dosyaların yakınında çalışırken prompt'ta tekrar etmek gerekiyor.

## Ama biçim için "yapma" demek zayıf bir talimattır

Aynı yaklaşım üslup ve biçim için çalışmıyor. Anthropic'in prompting rehberi
bunu doğrudan bir kural olarak veriyor: modele ne yapmamasını değil, ne
yapmasını söyleyin. Rehberdeki örnek şu: "Yanıtında markdown kullanma" yerine
"Yanıtın akıcı düz yazı paragraflarından oluşsun".

Sebebi basit. Bir yasak, geriye kalan devasa olasılık kümesini olduğu gibi açık
bırakır. "Kodu karmaşıklaştırma" dediğinizde model karmaşıklığın sizin için ne
demek olduğunu tahmin etmek zorunda kalır. Onun yerine hedefi tarif edin:

```text
Tutarı biçimlendiren tek bir saf fonksiyon yaz.
src/utils/date.ts dosyasındaki fonksiyonların biçimini birebir izle.
```

Pratik ayrım şu: **sınırlar** için yasak yaz (dosya, dizin, bağımlılık, kapsam),
**biçim ve yaklaşım** için olumlu tarif ver. İkisini karıştırmak, uzun ama etkisiz
prompt'lar üretir.

## Rol vermek: ton ve öncelik ayarı

Modele bir rol vermek, resmi dokümanda da geçen bir teknik: sistem prompt'unda
rol tanımlamak modelin davranışını ve tonunu kullanım senaryonuza odaklıyor, ve
tek bir cümle bile fark yaratıyor. Kodlama ajanlarında bunun karşılığı sistem
prompt'u ya da proje yapılandırma dosyasıdır:

```text
Bu depoda kod incelemesi yapan kıdemli bir backend geliştiricisi gibi davran.
Önceliğin doğruluk ve değişikliğin geri alınabilirliği; hız değil.
```

Dürüst olmak gerekirse rolün sınırı da var. Rol vermek modele yeni bilgi
eklemez; sadece hangi önceliklerle davranacağını ayarlar. "Sen bir güvenlik
uzmanısın" cümlesi tek başına açık bulmaz — bunu somut bir kontrol listesi
yapar. Bir başka ayrıntı: dokümanda, yeni modellerde talimatları bağırarak
yazmanın (`ÇOK ÖNEMLİ: MUTLAKA şunu yapmalısın...`) gereksiz olduğu, normal bir
dille yazmanın yettiği belirtiliyor. Büyük harf, talimatı güçlendirmiyor;
netlik güçlendiriyor.

## Tekrar edenleri kalıcı hâle getirin

Her prompt'ta aynı yasakları yazmak zamanla yorucu olur. Tekrar eden kurallar
projenin yapılandırma dosyasına ait: Claude Code'da `CLAUDE.md`, Codex'te
`AGENTS.md`, Gemini CLI'da `GEMINI.md`, Cursor'da `.cursor/rules/` altındaki
`.mdc` dosyaları, Windsurf'te `.windsurfrules`. Dosya adı değişiyor, fikir
aynı. Bu dosyaların nasıl kurulacağına
[Standartları Erken Kurmak]({{ '/blog/standartlari-erken-kurmak/' | relative_url }})
yazısında değinmiştik.

Yine de bir uyarı: yapılandırma dosyasına yazmak, o kuralın her oturumda
uygulanacağını garanti etmez. Kritik bir sınır varsa prompt'ta tekrar edin ve
—en önemlisi— diff'i inceleyin. Yasak, denetimin yerini tutmaz.

Sıradaki yazı: [Bağlam Dokümanını Güncel Tutmak]({{ '/blog/baglam-dokumani-guncel-tutmak/' | relative_url }})
