---
layout: post
lang: tr
translation_url: /en/blog/yaygin-kullanim-senaryolari/
title: "Yaygın Kullanım Senaryoları"
date: 2026-06-22
summary: "Claude Code'u günlük işte en çok ne için kullanırsın? Kod tabanını tanımaktan hata ayıklamaya, teste ve paralel oturumlara kadar somut örneklerle birkaç temel senaryo."
tags: [claude-code, workflow, kullanim]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Yaygın Kullanım Senaryoları"
---

> "Claude Code Yolculuğu" serisine devam. Önceki yazılarda aracın ne olduğuna ve
> nasıl yapılandırıldığına baktık; bu yazıda gündelik işte onu en çok hangi
> işler için açtığımıza, yani yaygın kullanım senaryolarına geçiyoruz.

Bir aracı asıl tanıman, onu her gün ne için açtığına bakınca olur. Aşağıdakiler
resmi dokümandaki "common workflows" reçetelerinden derlediğim, gerçekten sık
döndüğüm birkaç senaryo. Hepsi terminalde `claude` komutuyla başlattığın bir
oturum içinde geçiyor.

## Yeni bir kod tabanını tanımak

En sık işlerden biri: az önce klonladığın, hiç bilmediğin bir projeye hızlıca
hâkim olmak. Proje köküne gidip oturumu başlattıktan sonra geniş bir soruyla
başlarım:

```text
bu kod tabanına genel bir bakış ver
```

Genel resmi aldıktan sonra daralırım: "buradaki temel mimari kalıpları açıkla",
"ana veri modelleri neler?" gibi. Belirli bir özelliğin nerede durduğunu ararken
de doğrudan tarif ederim:

```text
kullanıcı kimlik doğrulamasını yöneten dosyaları bul
```

Püf noktası geniş soruyla başlayıp yavaşça daralmak — tek seferde "her şeyi
anlat" demekten daha verimli oluyor.

## Hata ayıklamak

İkinci klasik senaryo: bir hatayı bulup düzeltmek. Hatayı olduğu gibi anlatmak
çoğu zaman yeterli:

```text
npm test çalıştırınca bir hata alıyorum
```

Claude kod tabanına bakıp sorunu bulur ve düzeltme önerir. Dokümanın altını
çizdiği nokta: hatayı nasıl tekrar üreteceğini söyle, mümkünse stack trace ver,
ve hatanın aralıklı mı yoksa her seferinde mi çıktığını belirt. Bu bağlam,
önerilen düzeltmenin isabetini ciddi şekilde artırıyor.

## Dosyaları doğrudan göstermek

Claude'un bir dosyayı kendi bulup okumasını beklemek yerine `@` ile doğrudan
gösterebilirsin; bu dosyanın tüm içeriğini konuşmaya katar:

```text
@src/utils/auth.js içindeki mantığı açıkla
```

`@src/components` gibi bir klasör verirsen içeriği değil, dosya listesini ekler.
Aynı mesajda birden fazla dosyaya da değinebilirsin.

## Test ve refactor

Test yazdırırken belirgin olmak işe yarıyor; Claude mevcut test dosyalarına
bakıp projenin çatısına ve yazım tarzına uyar. Tipik akış şöyle ilerler:
önce kapsanmayan kodu bulması, sonra test iskeletini üretmesi, ardından
çalıştırıp düzeltmesi:

```text
yeni testleri çalıştır ve başarısız olanları düzelt
```

Refactor'da da aynı mantık: küçük, test edilebilir adımlarla ilerle ve her
adımda davranışın korunduğunu testlerle doğrula.

## Paralel oturum ve plan modu

İki işi aynı anda yürütmek istediğimde git worktree kullanırım — her worktree
ayrı bir dalda, ayrı bir checkout olduğu için değişiklikler birbirine
karışmaz:

```bash
claude --worktree feature-auth
```

Diske dokunmadan önce değişiklikleri görmek istediğimde plan moduna geçerim;
Claude dosyaları okur ve bir plan sunar ama sen onaylayana kadar düzenleme
yapmaz:

```bash
claude --permission-mode plan
```

Aynı şeyi oturum içinde `Shift+Tab` ile de açıp kapatabilirsin. Bir görev birden
fazla oturuma yayıldığındaysa bağlamı baştan anlatmak yerine `claude --continue`
ile kaldığın yerden devam edersin.

## Betiğe bağlamak

Son olarak, Claude'u etkileşimsiz biçimde bir Unix aracı gibi kullanabilirsin.
`-p` bayrağı tek seferlik bir komut çalıştırır ve stdin/stdout normal şekilde
işler:

```bash
git log --oneline -20 | claude -p "şu son commit'leri özetle"
```

Bu, CI adımları veya commit özetleri gibi tekrar eden işler için pratik.

## Özet

Yeni kod tabanını tanımak, hata ayıklamak, `@` ile dosya göstermek, test ve
refactor, paralel oturumlar, plan modu ve betiğe bağlama — Claude Code'la günün
büyük kısmı bu birkaç kalıbın etrafında dönüyor. Reçeteler basit; asıl fark,
hangi işte hangisine uzanacağını bilmekte.

---

*Sıradaki yazı: [Headless (Başsız) Mod]({{ '/blog/headless-mode/' | relative_url }})*
