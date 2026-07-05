---
layout: post
lang: tr
translation_url: /en/blog/subagents-ajan-takimlari/
title: "Subagents ve Ajan Takımları"
date: 2026-07-05
summary: "Subagent nedir, ne işe yarar ve kendi subagent'ını nasıl tanımlarsın? Yerleşik ajanlar, tanım dosyaları ve 'ajan takımları' arasındaki farka bakıyoruz."
tags: [claude-code, subagents, agents]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Subagents ve Ajan Takımları"
---

> "Claude Code Yolculuğu" serisine devam. Önceki yazıda
> [skill oluşturmayı]({{ '/blog/skill-olusturma/' | relative_url }}) ele almıştık;
> bu sefer işi başka bir ajana devretmenin yolu olan subagent'lara bakıyoruz.

Uzun bir oturumda ana sohbetin bağlamı hızla dolar. Bir hata ararken onlarca
dosya okursun, log satırları birikir, bir daha bakmayacağın çıktı bağlamı
şişirir. İşte subagent tam da bunun için var: yan işi kendi ayrı bağlamında
yapan, sana yalnızca özeti dönen uzman bir yardımcı.

## Subagent nedir?

Bir subagent, kendi bağlam penceresinde, kendi sistem promptuyla ve kendi araç
izinleriyle çalışan ayrı bir asistandır. Claude bir görevi subagent'ın
tanımıyla eşleştirdiğinde işi ona devreder; subagent bağımsız çalışır ve sonucu
geri döner. Ana faydası bağlamı korumak: araştırmanın gürültüsü ana sohbete hiç
girmez. Bunun yanında araçlarını kısıtlayarak ne yapabileceğini sınırlar,
tanımı birden fazla projede tekrar kullanır ve odaklı bir sistem promptuyla
davranışını uzmanlaştırırsın.

## Yerleşik subagent'lar

Claude Code birkaç ajanı hazır getirir ve uygun olduğunda kendisi kullanır:

- **Explore** — hızlı, salt-okunur bir arama ajanı. Kod tabanında gezinip
  ilgili yerleri bulur; `Write` ve `Edit` ona kapalıdır.
- **Plan** — plan modunda, bir plan sunmadan önce bağlam toplayan araştırma
  ajanı. O da salt-okunurdur.
- **general-purpose** — hem keşif hem değişiklik gereken, çok adımlı işler için
  tüm araçlara erişebilen genel ajan.

## Kendi subagent'ını tanımlamak

Subagent'lar, YAML front matter ve ardından bir sistem promptu içeren Markdown
dosyalarıdır. Proje için `.claude/agents/`, tüm projelerin için
`~/.claude/agents/` dizinine koyarsın. En kolay yol Claude'dan yazmasını
istemektir; ama dosya kabaca şöyle görünür:

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

Zorunlu olan yalnızca `name` ve `description`. `tools` alanını yazmazsan ajan
tüm araçları devralır; burada olduğu gibi `Read, Glob, Grep` ile sınırlarsan
salt-okunur bir gözden geçirici elde edersin. `model` ise `sonnet`, `opus`,
`haiku` gibi bir değer alabilir. Dosyayı kaydettiğinde Claude Code birkaç
saniye içinde fark eder; yeniden başlatmaya gerek yoktur.

## Nasıl çağrılır?

En basiti, promptunda ajanın adını anmaktır — Claude devredip devretmeyeceğine
kendi karar verir:

```text
code-reviewer subagent'ını kullanıp auth değişikliklerime bak
```

Belirli bir ajanın kesin çalışmasını istiyorsan `@` yazıp listeden seçersin;
bu, o görevin o ajana gitmesini garantiler. Tüm oturumu tek bir ajanın
promptu ve araç kısıtlarıyla başlatmak içinse `--agent <ad>` bayrağını
kullanırsın.

Küçük bir not: eskiden `/agents` komutu bir sihirbaz açıyordu. Güncel
sürümlerde bu sihirbaz kaldırıldı; `/agents` artık sadece "Claude'dan iste ya
da `.claude/agents/` dosyasını kendin düzenle" diye hatırlatıyor.

## Peki "ajan takımları"?

Subagent'lar tek bir oturumun içinde çalışır. Aynı anda birden çok ajanı bir
görevin farklı parçalarına salıp bir lider ajanın işi paylaştırıp sonuçları
birleştirmesini istediğinde ise konu **ajan takımlarına** kayar. Pratikte
subagent, bağlamı temiz tutmak için devrettiğin tekil bir yardımcı; ajan
takımı ise birbirleriyle konuşan birden çok ajanın koordinasyonu. İkincisi
daha güçlü ama daha karmaşık; çoğu günlük iş için tek bir subagent fazlasıyla
yeter.

## Özet

Subagent, bir yan işi kendi bağlamında yapıp sana özeti dönen, araçları ve
modeli kısıtlanabilen ayrı bir asistandır. Yerleşik olanları hazır gelir, kendi
tanımını birkaç satırlık bir Markdown dosyasıyla eklersin. Karmaşık, çok
kollu işler içinse birden çok ajanı koordine eden takımlara geçebilirsin.

---

*Sıradaki yazı: Plan Mode (Plan Modu)*
