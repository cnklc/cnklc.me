---
layout: post
lang: tr
translation_url: /en/blog/vibe-coding-nedir/
title: "Vibe Coding Nedir?"
date: 2026-06-12
summary: "Kodu satır satır yazmak yerine niyeti tarif edip yapay zekâya bıraktığımız yeni geliştirme biçimi: vibe coding. Ne işe yarar, nerede sınırları var?"
tags: [claude-code, vibe-coding, yapay-zeka]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Vibe Coding Nedir?"
---

> Bu yazı, [roadmap.sh/claude-code](https://roadmap.sh/claude-code) müfredatını
> takip ettiğim "Claude Code Yolculuğu" serisinin ilk durağı.

Birkaç yıl önce kod yazmak demek, her satırı bizzat klavyeden geçirmek demekti.
Bugün giderek yaygınlaşan başka bir yaklaşım var: ne istediğini doğal dille
anlatıyorsun, yapay zekâ kodu yazıyor, sen sonucu çalıştırıp yönlendiriyorsun.
Buna **vibe coding** deniyor.

## Terim nereden geliyor?

Tabir, 2025 başında yapay zekâ destekli geliştirmenin "hisse göre ilerleyen"
doğasını anlatmak için popülerleşti. Fikir basit: kodun her detayını kafanda
kurmak yerine, genel niyeti ("şuna benzer bir giriş ekranı yap, e-postayı doğrula")
tarif ediyorsun ve modelin ürettiğini değerlendirip düzeltiyorsun. Odak, _nasıl_
yazıldığından _ne_ yapıldığına kayıyor.

## Geleneksel kodlamadan farkı

Klasik akışta döngü şöyle: düşün → yaz → çalıştır → hata ayıkla. Vibe coding'de
döngü şuna dönüşüyor: tarif et → değerlendir → yönlendir. Sen artık tek tek
satırların değil, sonucun ve yönün sorumlususun. Bu, özellikle:

- hızlı prototip çıkarırken,
- aşina olmadığın bir kütüphaneyle ilk adımı atarken,
- tekrarlayan, sıkıcı işleri (boilerplate, test iskeleti, dönüşüm scriptleri)
  hallederken

ciddi bir hız kazandırıyor.

## Peki tehlikesi yok mu?

Burada dürüst olmak lazım — var. Vibe coding'in cazibesi, üretilen kodu
**anlamadan** kabul etme riskini de beraberinde getiriyor. Çalışan kod her zaman
doğru, güvenli veya bakımı kolay kod demek değil. Üretilen şeyi okumadan
biriktirdiğinde, bir süre sonra kendi projende yabancıya dönüşürsün.

İşe yarayan denge şu: yapay zekâ taslağı üretsin, ama **anlama ve onay** sende
kalsın. Tıpkı bu blog serisini otomatik üretip incelemeden yayınlamamam gibi —
üretimi hızlandırmak başka, sorumluluğu devretmek başka.

## Claude Code bu resmin neresinde?

Claude Code, vibe coding'i terminalden yapmanı sağlayan bir araç. Tek tek
fonksiyon istemek yerine, ona bir hedef veriyorsun ("bu testleri geçir",
"şu bug'ı bul ve düzelt") ve dosyaları okuyup yazarak, komut çalıştırarak
hedefe gidiyor. Serinin sonraki yazılarında tam olarak bunun nasıl çalıştığına —
CLI'dan başlayıp komutlara, hooks'a ve subagent'lara kadar — gireceğiz.

## Özet

Vibe coding, kodu yazmaktan çok kodu yönetmeye geçiş. Doğru kullanıldığında
muazzam bir hızlandırıcı; körü körüne güvenildiğinde ise teknik borç makinesi.
Sır, hızı almak ama kontrolü bırakmamakta.

---

_Sıradaki yazı: Coding Agent (Kodlama Ajanı) Nedir?_
