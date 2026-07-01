---
layout: post
lang: tr
translation_url: /en/blog/slash-komutlari/
title: "Slash Komutları Rehberi (/)"
date: 2026-06-30
summary: "Oturum içinde / ile çağırdığın yerleşik komutlar ne işe yarar, hepsini nasıl görürsün ve kendi komutlarını nereden eklersin?"
tags: [claude-code, slash-commands, komutlar]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Slash Komutları Rehberi (/)"
---

> "Claude Code Yolculuğu" serisinin bu durağı oturum içi komutlara ayrıldı.
> Önceki yazıda terminalden çağırdığın
> [claude CLI komutlarına]({{ '/blog/claude-cli-komutlari/' | relative_url }})
> bakmıştık; şimdi oturumun _içinde_ işe yarayan slash komutlarına geçiyoruz.

Geçen yazıdaki `-p`, `-c`, `-r` gibi bayraklar Claude'u başlatırken kabuğa
verdiğin argümanlardı. Slash komutları ise bambaşka bir şey: bunları Claude
çalışırken, yani prompt satırına `/` yazarak çağırırsın. Oturumu yönetmenin,
ayar değiştirmenin ve hızlı işleri halletmenin yolu bunlar.

## Slash komutu nedir?

Slash komutu, Claude'a gönderdiğin bir prompt değil; CLI'ın kendisine verdiğin
bir talimattır. "Bağlamı temizle", "modeli değiştir", "maliyeti göster" gibi
istekler modele yazılmaz — `/` ile çağrılan yerleşik komutlara karşılık gelir.

## Hepsini tek yerde görmek

En pratik başlangıç noktası: prompt satırına sadece `/` yaz. Mevcut tüm
komutlar listelenir; yazmaya devam ettikçe liste filtrelenir.

```text
/
```

Hangi komutların göründüğü platformuna ve planına göre değişebilir — örneğin
`/desktop` yalnızca macOS ve Windows'ta görünür. Komutları anlatmaya çalışan
yerleşik bir komut da var:

```text
/help
```

## Sık kullanacağın birkaçı

Bağlam yönetimiyle ilgili olanlar muhtemelen ilk öğreneceklerin: `/clear`
konuşma geçmişini temizleyip bağlamı boşaltır, `/compact` ise konuşmayı
özetleyerek sıkıştırır. Bu ikisine serinin
[bağlamı yönetmek]({{ '/blog/baglam-yonetimi-compact-clear/' | relative_url }})
yazısında ayrıca girmiştim. `/context` ise o anki bağlam kullanımını renkli bir
ızgara olarak gösterir — neyin yer kapladığını görmek için kullanışlı.

Oturum ve model tarafında işine yarayacaklar: `/model` ile kullandığın modeli
değiştirirsin, `/resume` ile önceki bir konuşmaya dönersin, `/cost` o oturumun
token kullanımını gösterir, `/config` ise tema, model ve diğer tercihleri
düzenlediğin ayar arayüzünü açar.

Projeyle ilgili olanlardan ikisi: `/init` projeye bir `CLAUDE.md` rehberi
oluşturur, `/agents` ise alt ajan yapılandırmalarını yönetir.

Tek tek ezberlemene gerek yok; mantığı şu: oturumun durumuyla ilgili bir şey
yapmak istediğinde önce `/` yazıp listeye bakman çoğu zaman en hızlısı.

## MCP komutları ve kendi komutların

Bağladığın MCP sunucuları kendi komutlarını oturuma ekleyebilir. Bunlar
`/mcp__<sunucu>__<prompt>` biçiminde görünür ve sunucudan otomatik keşfedilir.
Bağlı sunucuları ve yetkilendirmeyi yönetmek içinse `/mcp` komutu var.

Kendi komutlarını da ekleyebilirsin — Claude Code'da özel komutlar **skills**
(beceriler) üzerinden tanımlanır, yani yazdığın bir skill prompt satırında bir
slash komutu olarak belirir. Mevcut becerileri listelemek için:

```text
/skills
```

Skill yazmanın ayrıntılarına serinin ilerleyen yazılarında ayrıca gireceğim;
burada bilmen gereken tek şey, gördüğün her slash komutunun yerleşik olmak
zorunda olmadığı.

## Özet

Slash komutları, oturumun içinden CLI'a verdiğin talimatlardır: bağlamı
temizler, modeli değiştirir, maliyeti gösterir, projeyi başlatırlar. Hepsini
görmenin yolu `/` yazıp listeye bakmak; eksik kaldığın yerde `/help` var. MCP
sunucuları ve kendi skill'lerin bu listeyi genişletir.

---

_Sıradaki yazı: [Kısayollar ve Önekler (!, @, \, Shift+Tab)]({{ '/blog/kisayollar-ve-onekler/' | relative_url }})_
