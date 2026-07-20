---
layout: post
lang: tr
translation_url: /en/blog/claude-code-yolculugu-tamamlandi/
title: "Claude Code Yolculuğu Tamamlandı: 36 Yazı, Bir Yol Haritası"
date: 2026-07-14
summary: "Bir ay boyunca her gün bir yazıyla ilerleyen seri tamamlandı. Bu yazıda serinin dayandığı kaynağı, roadmap.sh/claude-code yol haritasını ve nereden başlayacağını anlatıyorum."
tags: [claude-code, seri, roadmap]
draft_series: "Claude Code Yolculuğu"
---

> Bu yazı, "Claude Code Yolculuğu" serisinin kapanışı. Seri
> [vibe coding nedir]({{ '/blog/vibe-coding-nedir/' | relative_url }}) sorusuyla
> başladı, [mobil erişim ve zamanlanmış görevlerle]({{ '/blog/mobile-channels-scheduling/' | relative_url }})
> son buldu. Arada 36 durak var.

Yaklaşık bir ay önce bir seriye başladım: Claude Code'u sıfırdan ileri seviyeye,
Türkçe ve İngilizce olarak anlatmak. Her gün bir konu, her konu iki dilde bir
yazı. Bugün itibarıyla serinin 36 yazısının tamamı yayında. Bu kapanış
yazısında serinin nasıl kurgulandığını ve — en önemlisi — konu listesinin
nereden geldiğini anlatmak istiyorum.

## Konu listesi benim icadım değil: roadmap.sh

Baştan açık olayım: serinin konu başlıkları ve kapsamı bana ait değil. Liste,
[roadmap.sh](https://roadmap.sh){:target="_blank" rel="noopener"}'in topluluk tarafından geliştirilen
[Claude Code yol haritasına](https://roadmap.sh/claude-code){:target="_blank" rel="noopener"} dayanıyor.

roadmap.sh'i bilmeyenler için: geliştiriciler için ücretsiz, açık kaynak
öğrenme yol haritaları yayınlayan bir site. Backend, frontend, DevOps gibi
klasik alanların yanında Claude Code için de bir harita var. Ben bu haritadaki
konuları aldım, kendi öğrenme mantığıma göre yeniden sıraladım ve dokuz bölüme
ayırdım: Başlangıç, Giriş, Temeller, Kullanım, Maliyet, Komutlar, Otomasyon,
Yapılandırma ve İleri Seviye.

Yani iskelet roadmap.sh'ten; et ve kemik ise her yazı için ayrı ayrı yapılan
araştırmadan. Her konuyu yazmadan önce resmi Anthropic dokümanlarına gittim;
yazılardaki komutları, flag'leri ve ayar adlarını dokümanla teyit etmeden
kullanmadım. Doğrulayamadığım detayı yazmamayı, yanlış yazmaya tercih ettim.

## Seri neleri kapsıyor?

Kabaca bir harita çıkarmak gerekirse: seri
[coding agent kavramıyla]({{ '/blog/coding-agent-nedir/' | relative_url }})
ve [CLI'a girişle]({{ '/blog/claude-cli-tanitim/' | relative_url }}) başlıyor;
[CLAUDE.md]({{ '/blog/claude-md-temelleri/' | relative_url }}),
[skills]({{ '/blog/skills-genel-bakis/' | relative_url }}) ve
[bağlam yönetimi]({{ '/blog/context-baglam/' | relative_url }}) gibi temellerle
devam ediyor; [hooks]({{ '/blog/hooks-olaylar-matcherlar/' | relative_url }}),
[subagents]({{ '/blog/subagents-ajan-takimlari/' | relative_url }}) ve
[MCP]({{ '/blog/mcp-ile-arac-baglama/' | relative_url }}) gibi ileri seviye
konularla bitiyor.

Tamamına tek sayfadan bakmak istersen:
[Claude Code Rehberi]({{ '/claude-code-rehberi/' | relative_url }}) sayfasında
36 yazının hepsi, bölümlere ayrılmış ve öğrenme sırasına dizilmiş halde duruyor.
Seriyi baştan takip etmek isteyenler için önerdiğim giriş noktası orası.

## Sürece dair küçük bir itiraf

Serinin üretim akışının kendisi de bir Claude Code örneğiydi: yazıların ilk
taslaklarını her gün çalışan zamanlanmış bir görevle Claude'a ürettirdim,
sonra her taslağı elden geçirip yayınladım. Yani seri, anlattığı aracın
kendisiyle yazıldı. Bu akışın detayları başlı başına bir yazı konusu; ilgi
olursa yazarım.

## Sırada ne var?

Serinin konu listesi bitti ama Claude Code gelişmeye devam ediyor; önemli
değişiklikler oldukça mevcut yazıları güncelleyeceğim. Seriyle ilgili geri
bildirimin, düzeltmen veya "şu konu eksik" diyeceğin bir başlık varsa bana
ulaşabilirsin — en faydalı yazılar genelde bir sorudan çıkıyor.

Son olarak tekrar teşekkür: iskeleti kuran [roadmap.sh](https://roadmap.sh/claude-code){:target="_blank" rel="noopener"}
topluluğuna ve seriyi takip eden herkese.
