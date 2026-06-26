---
layout: post
lang: tr
translation_url: /en/blog/thinking-modes-effort/
title: "Thinking Modes & Effort (Düşünme Modları)"
date: 2026-06-26
summary: "Claude ne kadar 'düşünürse' o kadar token harcar. Effort seviyesi, ultrathink ve düşünmeyi açıp kapatmak — faturayı doğrudan etkileyen ayarlar."
tags: [claude-code, thinking, maliyet]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Thinking Modes & Effort (Düşünme Modları)"
---

> "Claude Code Yolculuğu" serisinde Maliyet bölümündeyiz. Önceki yazıda
> [Claude fiyatlandırmasını]({{ '/blog/claude-fiyatlandirma/' | relative_url }})
> anlamaya çalışmıştık; şimdi faturayı doğrudan etkileyen bir ayara, modelin ne
> kadar "düşündüğüne" bakıyoruz.

## Düşünme bir maliyet kalemidir

Extended thinking (uzatılmış düşünme), Claude'un cevabı vermeden önce ürettiği
akıl yürütme adımlarıdır. Bu adımlar karmaşık planlama ve mantık işlerinde
performansı belirgin biçimde artırır, ama bedava değildir: düşünme token'ları
çıktı (output) token'ı olarak faturalanır ve varsayılan bütçe modele göre on
binlerce token'ı bulabilir. Yani "ne kadar düşünsün?" sorusu aynı zamanda "ne
kadar ödeyeyim?" sorusudur.

## Effort: düşünme miktarını ayarlamak

Modern modellerde düşünme miktarını belirleyen ana kol effort (çaba) seviyesidir.
Bu seviye adaptive reasoning'i (uyarlanır akıl yürütme) yönlendirir: model her
adımda görevin zorluğuna bakıp düşünüp düşünmeyeceğine kendi karar verir.
Seviyeler modele göre değişir; örneğin Opus 4.8'de `low`, `medium`, `high`,
`xhigh` ve `max` vardır, varsayılan `high`'tır.

Seviyeyi oturum içinde değiştirmek için `/effort` komutunu kullanırsın.
Argümansız çağırırsan kayan bir seçici açılır; seviyeyi doğrudan da verebilirsin:

```text
/effort low
```

Kısa, sıradan bir iş için `low` daha hızlı ve daha ucuzdur; mimari bir karar ya
da çok adımlı bir hata ayıklama için `high` veya üstü daha mantıklıdır. Seçili
seviye, logonun ve dönen göstergenin yanında (örneğin "with low effort") yazar,
böylece hangi ayarda olduğunu görürsün.

Oturum açılışında tek seferlik ayarlamak için bayrağı kullanabilirsin:

```bash
claude --effort low
```

Kalıcı bir varsayılan istiyorsan ortam değişkeni `CLAUDE_CODE_EFFORT_LEVEL` ya da
ayar dosyasındaki `effortLevel` işini görür. (`max` yalnızca açıldığı oturuma
özeldir ve ayar dosyasında kabul edilmez.)

## Tek seferlik derin düşünme: ultrathink

Bütün oturumun seviyesini değiştirmeden yalnızca o mesajda daha derin düşünme
istiyorsan, prompt'un herhangi bir yerine `ultrathink` yazman yeterli:

```text
bu yarış koşulunu (race condition) kökünden bul ve çöz, ultrathink
```

Burada dikkat edilecek bir nokta var: "think", "think hard", "think more" gibi
ifadeler — sıkça anlatılanın aksine — özel bir anahtar kelime değildir; sıradan
metin olarak geçer. Yalnızca `ultrathink` tanınır ve bağlama ek bir talimat
ekler; API'ye gönderilen effort seviyesi değişmez.

## Düşünmeyi görmek ve kapatmak

Düşünme çıktısı varsayılan olarak gizlidir. `Ctrl+O` ile ayrıntılı moda geçip
akıl yürütmeyi gri italik metin olarak görebilirsin. O anki oturumda düşünmeyi
açıp kapatmak için macOS'ta `Option+T`, Windows/Linux'ta `Alt+T` kısayolu var.
Genel varsayılanı `/config` üzerinden değiştirebilirsin (ayar dosyasında
`alwaysThinkingEnabled` olarak saklanır).

Basit işlerde maliyeti kısmak için düşünmeyi tamamen kapatabilirsin:

```bash
MAX_THINKING_TOKENS=0
```

Önemli bir uyarı: düşünme token'ları gizliyken bile faturalanır. Yani çıktıyı
görmemen ödememen anlamına gelmez — kolu kısan şey effort seviyesi ve thinking
ayarıdır, çıktının ekrandaki görünürlüğü değil.

## Özet

Düşünme, Claude'u zor işlerde daha iyi yapan ama token harcayan bir koldur.
Effort seviyesi bu kolun ana ayarıdır: işin ağırlığına göre `low`–`max` arası
seç, tek seferlik derinlik için `ultrathink` kullan, gereksiz olduğunda kapat.
Doğru seviyeyi seçmek, hem hızdan hem de faturadan tasarruf etmenin en pratik
yollarından biridir.

---

*Sıradaki yazı: Prompt Caching (Önbellekleme)*
