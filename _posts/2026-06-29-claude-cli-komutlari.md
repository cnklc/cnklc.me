---
layout: post
lang: tr
translation_url: /en/blog/claude-cli-komutlari/
title: "claude CLI Komutları: -p, -c ve -r"
date: 2026-06-29
summary: "Claude'u tek seferlik bir komut gibi çalıştırmak, son konuşmayı kaldığın yerden sürdürmek ve eski bir oturuma geri dönmek — üç temel CLI bayrağıyla."
tags: [claude-code, cli, terminal]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "claude CLI Komutları (-p, -c, -r)"
---

> "Claude Code Yolculuğu" serisinin yeni durağı. Geçen yazıda bağlamı elle
> [`/compact` ve `/clear` ile yönetmeyi]({{ '/blog/baglam-yonetimi-compact-clear/' | relative_url }})
> konuşmuştuk. Şimdi terminale bir adım geri çekilip `claude` komutunun en sık
> kullanılan üç bayrağına bakalım: `-p`, `-c` ve `-r`.

`claude` yazıp Enter'a bastığında interaktif bir oturum açılır. Bu çoğu zaman
istediğin şeydir, ama her iş için değil. Bazen tek bir cevap alıp çıkmak,
bazen de daha önce başladığın bir konuşmaya geri dönmek istersin. İşte bu üç
bayrak tam olarak bunun için var.

## `-p`: sor ve çık

`-p` (uzun hâli `--print`) bayrağı, Claude'u interaktif moda girmeden
çalıştırır: cevabı yazdırır ve çıkar. Tek seferlik bir soru ya da bir script
içinde kullanmak için idealdir.

```bash
claude -p "şu fonksiyonu açıkla"
```

`-p`'nin asıl gücü, onu Unix borusuyla (pipe) birleştirdiğinde ortaya çıkar.
Standart girdiden gelen içeriği Claude'a besleyebilirsin:

```bash
cat logs.txt | claude -p "bu logları özetle"
```

Burada `cat logs.txt` çıktısı doğrudan Claude'a akıyor; sen ayrıca dosyayı
yapıştırmak zorunda kalmıyorsun. Aynı kalıbı `git log`, test çıktısı ya da
herhangi bir komutun sonucuyla kullanabilirsin.

## `-c`: kaldığın yerden devam et

Bir oturumu kapattıktan sonra aynı konuşmayı sürdürmek istediğinde `-c`
(uzun hâli `--continue`) işe yarar. Bu bayrak, **bulunduğun dizindeki en son
konuşmayı** yükler — yani hangi oturumu istediğini ayrıca belirtmen gerekmez.

```bash
claude -c
```

`-c`'yi `-p` ile birleştirebilirsin de. Aşağıdaki komut, son konuşmayı
sürdürür ama interaktif moda girmeden tek bir cevap döndürür:

```bash
claude -c -p "az önce eklediğin fonksiyonda tip hatası var mı?"
```

Dikkat: `-c` dizine bağlıdır. Başka bir klasördeyken çalıştırırsan oradaki en
son konuşmayı bulur, projenin kökündeki konuşmayı değil.

## `-r`: belirli bir oturuma dön

Birden fazla konuşmayı paralel yürütüyorsan, "en sonuncusu" yeterince kesin
olmayabilir. `-r` (uzun hâli `--resume`) belirli bir oturumu **kimliğiyle ya da
adıyla** açmanı sağlar:

```bash
claude -r "auth-refactor" "PR'ı tamamla"
```

Argüman vermeden sadece `claude -r` çalıştırırsan, açık oturumlardan birini
seçebileceğin interaktif bir liste gelir. Oturuma anlamlı bir ad vermek istersen
başlatırken `--name` (kısa hâli `-n`) bayrağını kullanabilir, sonra aynı adla
geri dönebilirsin.

Küçük bir not: bir oturumu sürdürürken geçmişini bozmadan ayrı bir dala
ayırmak istersen `--fork-session` bayrağını `-r` ya da `-c` ile birlikte
kullanabilirsin; bu, orijinali olduğu gibi bırakıp yeni bir oturum kimliği
oluşturur.

## Özet

Üçünü tek cümlede toplarsak: `-p` tek seferlik bir cevap alıp çıkmak,
`-c` bulunduğun dizindeki son konuşmayı sürdürmek, `-r` ise belirli bir
oturuma adıyla veya kimliğiyle dönmek içindir. `-p`'yi pipe ile birleştirmek,
Claude'u küçük otomasyonların içine yerleştirmenin en pratik yoludur.

---

*Sıradaki yazı: [Slash Komutları Rehberi (/)]({{ '/blog/slash-komutlari/' | relative_url }})*
