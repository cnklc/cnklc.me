---
layout: post
lang: tr
translation_url: /en/blog/skill-olusturma/
title: "Skill Oluşturma ve En İyi Pratikler"
date: 2026-07-04
summary: "Kendi skill'ini nasıl yazarsın? SKILL.md yapısı, frontmatter alanları, argümanlar ve dinamik bağlam ile işe yarayan skill'ler yazmanın pratikleri."
tags: [claude-code, skills, otomasyon]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Skill Oluşturma ve En İyi Pratikler"
---

> "Claude Code Yolculuğu" serisi devam ediyor. Önceki yazıda
> [CLAUDE.md'nin yapısına ve konumlarına]({{ '/blog/claude-md-yapilandirma/' | relative_url }})
> derinlemesine bakmıştık. Bu yazıda kendi skill'imizi yazıyoruz.

[Skills'e genel bakış]({{ '/blog/skills-genel-bakis/' | relative_url }}) yazısında
skill'lerin ne olduğundan bahsetmiştim. Şimdi sıra pratikte: sıfırdan bir skill
yazmak ve bunu iyi yapmanın kurallarını öğrenmek.

## Ne zaman skill yazmalı?

Ölçüt basit: aynı talimatları, kontrol listesini veya çok adımlı prosedürü
sohbete tekrar tekrar yapıştırıyorsan, o bir skill olmalı. CLAUDE.md'deki bir
bölüm "bilgi" olmaktan çıkıp "prosedüre" dönüşmüşse, o da skill adayı.
CLAUDE.md her oturumda bağlama yüklenir; skill gövdesi ise yalnızca
kullanıldığında yüklenir. Uzun referans malzemesi, ihtiyaç duyulana kadar
neredeyse hiç token maliyeti oluşturmaz.

## İlk skill: commit öncesi özet

Diyelim ki commit atmadan önce sık sık "neyi değiştirdim, riskli bir şey var
mı?" diye kontrol ediyorsun. Bunu bir skill'e çevirelim. Önce dizini oluştur:

```bash
mkdir -p ~/.claude/skills/degisiklik-ozeti
```

`~/.claude/skills/` altındaki kişisel skill'ler tüm projelerinde geçerli;
yalnızca tek projede istiyorsan `.claude/skills/` kullanıp repoya commit'lersin.
Sonra dizine bir `SKILL.md` koy:

```yaml
---
description: Commit'lenmemiş değişiklikleri özetler ve riskli noktaları işaretler. Kullanıcı ne değiştirdiğini sorduğunda veya diff incelemesi istediğinde kullan.
---

## Mevcut değişiklikler

!`git diff HEAD`

## Talimatlar

Yukarıdaki değişiklikleri iki üç maddede özetle, sonra eksik hata yönetimi,
sabitlenmiş değerler veya güncellenmesi gereken testler gibi fark ettiğin
riskleri listele. Diff boşsa, commit'lenmemiş değişiklik olmadığını söyle.
```

Buradaki `` !`git diff HEAD` `` satırı dinamik bağlam enjeksiyonu: Claude Code
komutu skill içeriği modele gönderilmeden *önce* çalıştırır ve çıktısını o
satırın yerine koyar. Yani Claude tahmin yürütmez; güncel diff'i hazır bulur.
Artık "ne değiştirdim?" diye sorduğunda skill kendiliğinden devreye girer, ya
da `/degisiklik-ozeti` yazarak doğrudan çağırırsın.

## Frontmatter ile davranışı ayarlamak

Birkaç alan skill'in karakterini belirler:

`description` en kritik olanı — Claude skill'i ne zaman kullanacağına buna
bakarak karar verir. Kullanıcının doğal olarak söyleyeceği anahtar kelimeleri
içermeli ve asıl kullanım senaryosu başta olmalı; listede metin 1.536 karakterde
kesilir.

`disable-model-invocation: true` skill'i yalnızca senin çağırabileceğin hale
getirir. Deploy, commit gibi yan etkili işlerde önemli: kod "hazır görünüyor"
diye Claude'un kendi kendine deploy'a karar vermesini istemezsin. Tersi olan
`user-invocable: false` ise skill'i `/` menüsünden gizler; komut olarak anlamı
olmayan arka plan bilgisi için uygundur.

`allowed-tools: Bash(git add *) Bash(git commit *)` gibi bir satır, skill
aktifken listelenen araçlara onay sormadan izin verir. `context: fork` skill'i
izole bir subagent'ta çalıştırır — buna bir sonraki yazıda döneceğiz.

Argüman da alabilirsin: gövdede `$ARGUMENTS` yazarsan, `/skill-adi 123`
çağrısındaki `123` o yere yerleşir. `$0`, `$1` ile tek tek konuma da erişilir.

## En iyi pratikler

Gövdeyi kısa tut: skill bir kez yüklendiğinde oturum boyunca bağlamda kalır,
her satır tekrarlayan token maliyetidir. Resmî öneri `SKILL.md`'yi 500 satırın
altında tutmak; ayrıntılı referansı ayrı dosyalara taşıyıp `SKILL.md`'den
linklemek. Nasıl ve nedenini anlatma, ne yapılacağını söyle.

Skill'in tetiklenmesi doğru çalıştığı anlamına gelmez; ikisini ayrı ölç. Resmî
`skill-creator` eklentisi bunun için var: `/plugin install
skill-creator@claude-plugins-official` ile kurup skill'ini test senaryolarıyla
değerlendirebilir, skill'li ve skill'siz çalışmaları karşılaştırabilirsin.

Skill beklediğinde tetiklenmiyorsa ilk bakılacak yer yine `description`:
anahtar kelimeleri güçlendir. Çok sık tetikleniyorsa daraltmak da aynı yerden.

Sıradaki yazı: Subagents ve Ajan Takımları
