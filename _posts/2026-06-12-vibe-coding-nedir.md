---
layout: post
lang: tr
translation_url: /en/blog/vibe-coding-nedir/
title: "Vibe Coding Nedir?"
date: 2026-06-12
summary: "Kodu satır satır yazmak yerine niyeti tarif edip yapay zekâya bıraktığımız geliştirme biçimi: vibe coding. Ne işe yarar, nerede sınırları var?"
tags: [claude-code, vibe-coding, yapay-zeka]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Vibe Coding Nedir?"
---

> Bu yazı, [roadmap.sh/claude-code](https://roadmap.sh/claude-code){:target="_blank" rel="noopener"} müfredatını
> takip ettiğim "Claude Code Yolculuğu" serisinin ilk durağı.

Birkaç yıl önce kod yazmak, her satırı bizzat klavyeden geçirmek demekti. Bugün
yaygınlaşan başka bir yaklaşım var: ne istediğini doğal dille anlatıyorsun, model
kodu yazıyor, sen sonucu çalıştırıp yönlendiriyorsun. Buna **vibe coding** deniyor.

## Terim nereden geliyor?

Tabir, 2025 başında yapay zekâ destekli geliştirmenin "hisse göre ilerleyen"
doğasını anlatmak için yaygınlaştı. Fikir basit: kodun her detayını kafanda
kurmak yerine genel niyeti tarif ediyorsun ("şuna benzer bir giriş ekranı yap,
e-postayı doğrula") ve modelin ürettiğini değerlendirip düzeltiyorsun. Odak,
_nasıl_ yazıldığından _ne_ yapıldığına kayıyor.

## Geleneksel kodlamadan farkı

Klasik akışta döngü şudur: düşün → yaz → çalıştır → hata ayıkla. Vibe coding'de
döngü tarif et → değerlendir → yönlendir'e dönüşür. Artık tek tek satırların
değil, sonucun ve yönün sorumlususun. Bu özellikle hızlı prototip çıkarırken,
aşina olmadığın bir kütüphaneyle ilk adımı atarken ve tekrarlayan işleri
(boilerplate, test iskeleti, dönüşüm scriptleri) hallederken ciddi hız kazandırır.

Pratikte şuna benzer: terminalde bir hedef tarif edersin,

```bash
claude "kullanıcı profili için bir REST endpoint ekle ve testlerini yaz"
```

model ilgili dosyaları açar, endpoint'i ve testleri yazar, testleri çalıştırır.
Sen kod satırlarını değil, çıkan sonucu inceleyip "şu alanı da ekle" diye
yönlendirirsin.

## Peki tehlikesi yok mu?

Dürüst olmak gerekirse var. Vibe coding'in cazibesi, üretilen kodu **anlamadan**
kabul etme riskini de getiriyor. Çalışan kod her zaman doğru, güvenli veya bakımı
kolay kod demek değil. Üretileni okumadan biriktirdiğinde, bir süre sonra kendi
projende yabancıya dönüşürsün.

İşe yarayan denge şu: model taslağı üretsin, ama **anlama ve onay** sende kalsın.
Tıpkı bu blog serisini otomatik üretip incelemeden yayınlamamam gibi — üretimi
hızlandırmak başka, sorumluluğu devretmek başka.

## Claude Code bu resmin neresinde?

Claude Code, vibe coding'i terminalden yapmanı sağlayan bir araç. Tek tek
fonksiyon istemek yerine ona bir hedef veriyorsun ("bu testleri geçir", "şu bug'ı
bul ve düzelt"); o da dosyaları okuyup yazarak ve komut çalıştırarak hedefe
gidiyor. Serinin sonraki yazılarında bunun nasıl çalıştığına — CLI'dan başlayıp
komutlara, hooks'a ve subagent'lara kadar — gireceğiz.

## Özet

Vibe coding, kodu yazmaktan çok kodu yönetmeye geçiş. Doğru kullanıldığında güçlü
bir hızlandırıcı; körü körüne güvenildiğinde teknik borç makinesi. İş, hızı alıp
kontrolü bırakmamakta.

---

*Sıradaki yazı: [Coding Agent (Kodlama Ajanı) Nedir?]({{ '/blog/coding-agent-nedir/' | relative_url }})*