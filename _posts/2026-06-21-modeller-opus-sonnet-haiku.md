---
layout: post
lang: tr
translation_url: /en/blog/modeller-opus-sonnet-haiku/
title: "Modeller: Opus, Sonnet, Haiku"
date: 2026-06-21
summary: "Claude Code'un üç ana modeli arasındaki fark ne? Hangi işe hangisi uygun, /model nasıl çalışır ve opusplan ne işe yarar?"
tags: [claude-code, modeller, maliyet]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Modeller: Opus, Sonnet, Haiku"
---

> "Claude Code Yolculuğu" serisinin bu durağında "hangi beyni kullanıyorum?"
> sorusuna geliyoruz. Önceki yazılarda modlardan, bağlamdan ve araçlardan
> bahsettim; şimdi sıra bunların arkasındaki modellerde.

Claude Code'u bir süredir kullanıyorsan muhtemelen "Opus", "Sonnet" ve
"Haiku" isimlerini görmüşsündür. Bunlar üç ayrı ürün değil, aynı model
ailesinin farklı boyutları. Tıpkı aynı arabanın farklı motor seçenekleri
gibi: kimi daha güçlü, kimi daha hızlı ve ekonomik. Doğru işi doğru motora
vermek, hem sonucu hem faturayı ciddi biçimde etkiliyor.

## Üç model, üç denge noktası

Kabaca şöyle düşünebilirsin:

- **Opus** — en yetenekli model. Karmaşık mimari kararlar, zorlu hata ayıklama,
  çok adımlı planlama gibi gerçekten "düşünmesi" gereken işler için. En güçlüsü,
  ama aynı zamanda en pahalısı ve en yavaşı.
- **Sonnet** — dengeli orta seçenek ve çoğu durumda varsayılan. Günlük kodlama,
  dosya düzenleme, test yazma gibi işlerin büyük kısmını gayet iyi götürür.
  Güç ile maliyet arasında iyi bir orta yol.
- **Haiku** — en hızlı ve en ekonomik model. Basit, hacimli ya da arka planda
  koşan işler için ideal: küçük düzenlemeler, sınıflandırma, özetleme.

Buradaki anahtar fikir şu: her işi Opus'a yaptırmak gerekmiyor. Aslında çoğu
zaman gerekmiyor. Maliyet bilinci olan bir kullanım, işin ağırlığına göre
modeli seçmekten geçiyor.

## Takma adlar ve sürümler

Claude Code'da modelleri çoğunlukla `opus`, `sonnet`, `haiku` gibi takma
adlarla seçersin. Bu takma adlar, platformuna göre güncel bir model sürümüne
çözümlenir. Örneğin Anthropic API üzerinde `opus`, Opus 4.8'e; `sonnet`,
Sonnet 4.6'ya karşılık geliyor. Yani sen "opus" dersin, sistem o anki en güncel
Opus sürümünü kullanır.

Belirli bir sürüme sabitlenmek istersen tam model adını da verebilirsin:

```bash
claude --model claude-opus-4-8
```

Hangi sağlayıcıyı kullandığına göre (Anthropic API, Bedrock, Vertex vb.)
takma adın çözümlendiği sürüm değişebilir; bu yüzden tekrarlanabilirlik önemliyse
tam adı yazmak daha güvenli.

## Oturum içinde model değiştirmek: /model

En pratik komutlardan biri `/model`. Bir oturumun ortasında modeli
değiştirmeni sağlar:

```
/model sonnet
```

Bu işin akışını çok rahatlatıyor. Mesela mimariyi konuşurken Opus'a geçip
kafa yorduruyorsun, sonra rutin uygulamaya geçince Sonnet'e düşürüp hem
hızlanıyor hem tasarruf ediyorsun.

## opusplan: ikisinin en iyisi

Tam da bu "planla Opus, uygula Sonnet" alışkanlığını otomatikleştiren bir
takma ad var: **opusplan**. Plan modundayken karmaşık akıl yürütme için Opus'u,
uygulama (kod üretme) aşamasına geçtiğinde otomatik olarak Sonnet'i kullanıyor.
Yani sen sürekli `/model` ile gidip gelmeden, planlamada en güçlü beyni,
uygulamada dengeli ve ekonomik olanı elde ediyorsun.

## Subagent'ler için ayrı seçim

Bir başka güzel detay: subagent'ler (yardımcı ajanlar) için ayrı model
belirleyebiliyorsun. Belirtmezsen subagent'ler kendi varsayılanını
(Sonnet) kullanıyor; istersen `opus`, `haiku` ya da ana oturumla aynı kalsın
diye `inherit` diyebiliyorsun. Hacimli ama basit bir tarama işini bir subagent'e
Haiku ile yaptırmak, hem hızlı hem ucuz bir kalıp.

## Pratik bir kural

Benim oturduğum sezgi şöyle: varsayılan olarak Sonnet'te kal. Gerçekten zor
bir mimari ya da inatçı bir bug'la karşılaşınca Opus'a (veya opusplan'a) çık.
Çok sayıda küçük, mekanik iş varsa Haiku'yu düşün. Model seçimi, kalite ile
maliyet arasında sürekli yaptığın küçük bir ayar — ve Claude Code bu ayarı
yapmayı oldukça kolaylaştırıyor.

## Özet

Opus en güçlü, Sonnet dengeli varsayılan, Haiku en hızlı ve ekonomik.
Takma adlarla seçersin, `/model` ile oturum içinde değiştirirsin, opusplan ile
planlama-uygulama geçişini otomatikleştirirsin ve subagent'lere ayrı model
verebilirsin. İşin ağırlığına göre modeli seçmek, hem daha iyi sonuç hem daha
makul bir fatura demek.

---

*Sıradaki yazı: Yaygın Kullanım Senaryoları*
