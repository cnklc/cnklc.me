---
layout: post
lang: tr
translation_url: /en/blog/standartlari-erken-kurmak/
title: "Standartları Erken Kurmak: İlk Çıktıları Dikkatle İncele"
date: 2026-07-23
summary: "Yapay zekâ yeni kodu mevcut koduna bakarak yazar. Projenin ilk birkaç çıktısı, sonraki her şeyin şablonu olur — bu yüzden onları ciddiye al."
tags: [vibe-coding, standartlar, kod-inceleme]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Standartları Erken Kurmak: İlk Çıktıları Dikkatle İncele"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Bu bölümde araç fark
> etmeksizin geçerli bir alışkanlığa bakıyoruz: yapay zekânın ürettiği
> ilk çıktıları, projenin tamamını şekillendirecek kararlar gibi görmek.

Vibe coding'de en pahalı hatalar genelde ilk gün atılıyor. Modele "çalışan
bir şey" ürettirip hızla kabul ettiğinde, o "çalışan şey" farkında olmadan
projenin standardı hâline geliyor. Sonra düzeltmek, baştan doğru yapmaktan
çok daha zahmetli oluyor.

## İlk çıktı, sonraki her çıktının şablonudur

Yapay zekâ modelleri yeni kod yazarken en güçlü referans olarak senin mevcut
kodunu alır. Fatura takibi projesinde ilk API route'unu — diyelim
`src/routes/invoices.ts` — modele yazdırdığında, o dosya artık bir örnek.
Ödemeler route'unu istediğinde model büyük ihtimalle onu taklit eder: hata
yönetimini, isimlendirmeyi, yanıt formatını oradan kopyalar.

Bunun pratik sonucu şu: ilk dosyadaki özensizlik bir bug değil, bir
**standart** olur ve sessizce çoğalır. Bu yüzden acele edip "çalışıyor, geç"
demek yerine o ilk route'u tam istediğin gibi oturtmak, sonraki yirmi dosyayı
tek tek düzeltmekten çok daha ucuz.

## Diff'i genç bir geliştiricinin PR'ı gibi oku

Her üretimden sonra çıktıyı, ekibe yeni katılmış bir geliştiricinin pull
request'i gibi incele: oku, çalıştır, ne değiştiğini anlamadan kabul etme.
Araçlar değişikliklerin güvenli olduğunu varsayıp geniş uygular; gereksiz
gördüğü bir dosyayı silebilir ya da bir endpoint'in adını sessizce
değiştirebilir. Fatura takibinde `GET /api/invoices/:id` ucunun adı sana
sormadan değişirse, ona bağlı her şey kırılır.

Diff'te özellikle şunlara bak: silinen dosyalar, imzası değişen fonksiyonlar,
`package.json`'a eklenen yeni bağımlılıklar ve koda gömülmüş anahtarlar.
Kabul etmeden önce modelden açık bir risk özeti istemek, hızlı bir taramanın
kaçırdığı şeyleri yakalar:

```text
Kabul etmeden önce: yaptığın değişiklikleri özetle, sildiğin
dosyaları listele, eklediğin yeni bağımlılıkları belirt ve henüz
test etmediğim mevcut işlevi bozabilecek her şeyi işaretle.
```

Doğrulanabilir bir iş verip çıktıyı kanıta bağlama alışkanlığını
[Kullanım İçin En İyi Pratikler]({{ '/blog/kullanim-en-iyi-pratikleri/' | relative_url }})
yazısında daha ayrıntılı ele almıştım.

## Standardı önce yaz, sonra bir örnek dosya göster

Standardı kafanda tutmak yetmez; modelin görebileceği bir yere koymak gerekir.
İki yol var. Birincisi, bağlam dokümanı — Claude Code'da
[CLAUDE.md]({{ '/blog/claude-md-temelleri/' | relative_url }}), Gemini CLI'da
`GEMINI.md`, Cursor'da `.cursor/rules/`, Codex'te `AGENTS.md`. Buraya
isimlendirme, hata yönetimi ve dokunulmaması gereken alanlar gibi kalıcı
kuralları yazarsın.

İkincisi çoğu zaman daha güçlü: modele taklit edeceği bir örnek dosya
göstermek. İyi bir örnek dosya, yüz kelimelik stil açıklamasından daha net
anlatır:

```text
Kod yazmadan önce src/routes/invoices.ts dosyasını oku. Tüm
route'larda kullandığım deseni gösteriyor: hata yönetimi,
doğrulama, yanıt formatı. Ödemeler route'unu yazarken aynı
deseni birebir uygula.
```

Dürüst bir uyarı: standardı erken kurmak öndeki zamanı artırır ve ilk günden
her kuralı bilemezsin. Bu yüzden yalnızca emin olduğun kararları sabitle,
gerisini proje ilerledikçe rafine et. Amaç mükemmel bir kural seti değil,
modelin taklit edeceği temiz bir ilk örnek.

Sıradaki yazı: [Yapay Zekâya Düzenli Refactoring Yaptırmak]({{ '/blog/duzenli-refactoring/' | relative_url }}).
