---
layout: post
lang: tr
translation_url: /en/blog/oturum-yonetimi-resume-rewind/
title: "Oturum Yönetimi: Resume ve Rewind"
summary: "Claude Code oturumları kaybolmaz: kaldığın yerden devam etmek, oturumlara isim vermek, dallandırmak ve rewind ile hatalı adımları geri almak."
tags: [claude-code, oturum-yonetimi, verimlilik]
draft_series: "Claude Code Yolculuğu"
date: 2026-07-08
roadmap_topic: "Oturum Yönetimi: Resume ve Rewind"
---

> "Claude Code Yolculuğu" serisine devam ediyoruz. Önceki yazıda
> [Output Styles ve Status Line özelleştirmesine]({{ '/blog/output-styles-status-line/' | relative_url }})
> bakmıştık; bu yazıda oturumların kendisini yönetmeyi ele alıyoruz: devam
> ettirme, dallandırma ve geri sarma.

Claude Code ile çalışırken her konuşma bir **oturum** olarak, çalıştığın proje
dizinine bağlı biçimde yerel diske kaydedilir. Terminali kapatman ya da `/clear`
çalıştırman konuşmayı silmez; hepsi durur ve geri çağrılabilir. Bu yazıda iki
şeyi ele alacağız: oturumlara geri dönmek (resume) ve bir oturumun *içinde*
zamanda geriye gitmek (rewind).

## Kaldığın yerden devam etmek

Sabah bıraktığın işe öğleden sonra dönmek istediğinde en kısa yol:

```bash
claude --continue
```

Bu, bulunduğun dizindeki en son oturumu açar. Kısaltması `-c`. Hangi oturuma
döneceğini seçmek istersen:

```bash
claude --resume
```

Bu komut (kısaltması `-r`) etkileşimli bir oturum seçici açar: her satırda
oturumun adı ya da ilk prompt'u, son aktivite zamanı ve git branch'i görünür.
`Space` ile içeriği önizleyebilir, `Ctrl+A` ile makinedeki tüm projelerin
oturumlarını listeleyebilirsin. Aktif bir oturumun içindeysen `/resume` ile de
aynı seçiciye ulaşırsın. Bu bayrakların genel ailesini
[claude CLI komutları]({{ '/blog/claude-cli-komutlari/' | relative_url }})
yazısında görmüştük.

## Oturumlara isim ver

Paralel birkaç iş yürütüyorsan oturumları isimlendirmek aramayı bitirir.
Başlarken `claude -n auth-refactor` de, ya da oturum içinde `/rename
auth-refactor` çalıştır. Sonrasında doğrudan ismiyle dönebilirsin:

```bash
claude --resume auth-refactor
```

## Dallandırma: aynı bağlam, farklı deneme

Bazen konuşmayı bozmadan "ya şöyle yapsaydık?" demek istersin. `/branch`
konuşmanın o ana kadarki bir kopyasını oluşturup seni ona geçirir; orijinal
oturum olduğu gibi kalır:

```text
/branch streaming-denemesi
```

Komut satırından aynı şey için `claude --continue --fork-session`
kullanılabilir. Dikkat: "bu oturum için izin ver" dediğin onaylar yeni dala
taşınmaz.

## Rewind: oturum içinde geri sarmak

Resume oturumlar *arasında* gezinmekti; rewind ise tek oturumun içinde zamanda
geriye gitmek. Claude Code, gönderdiğin her prompt'ta kodunun durumunu otomatik
olarak bir **checkpoint** (kontrol noktası) şeklinde kaydeder. Bu checkpoint'ler
oturumlar arasında da korunur.

Diyelim ki bir refactor istedin, Claude üç dosyayı değiştirdi ve sonuç hiç
hoşuna gitmedi. Prompt satırı boşken iki kez `Esc`'e bas ya da `/rewind` yaz;
açılan menü o oturumda gönderdiğin prompt'ları listeler. Birini seçtiğinde
seçenekler şunlar: hem kodu hem konuşmayı geri al, sadece konuşmayı geri al,
sadece kodu geri al — ya da konuşmanın bir bölümünü özetleyerek bağlam alanı
kazan. Bu özetleme, [/compact]({{ '/blog/baglam-yonetimi-compact-clear/' | relative_url }})'a
benzer ama hedeflidir: tüm konuşmayı değil, seçtiğin noktanın öncesini veya
sonrasını sıkıştırır.

## Rewind'in sınırları

Rewind güçlü ama her şeyi görmez. Yalnızca Claude'un dosya düzenleme araçlarıyla
yaptığı değişiklikleri izler; bir bash komutunun etkisini (`rm`, `mv`, `cp`
gibi) geri alamaz. Senin editörde elle yaptığın değişiklikler de kapsam dışı. Ve
en önemlisi: checkpoint'ler git'in yerini tutmaz. Doğru zihinsel model,
checkpoint'i "yerel geri al", git'i "kalıcı tarih" olarak düşünmek.

## Özet

Oturumlar kaybolmaz: `-c` ile son oturuma dön, `-r` ile seç, isim vererek düzen
kur, `/branch` ile riske girmeden dene, `/rewind` ile hatalı adımları geri sar.
Bu araçlar birleşince Claude Code'a daha iddialı işler vermek kolaylaşıyor —
çünkü geri dönüş yolun hep var.

---

*Sıradaki yazı: [MCP ile Araç Bağlama]({{ '/blog/mcp-ile-arac-baglama/' | relative_url }})*
