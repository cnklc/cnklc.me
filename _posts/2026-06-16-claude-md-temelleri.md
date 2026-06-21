---
layout: post
lang: tr
translation_url: /en/blog/claude-md-temelleri/
title: "CLAUDE.md Temelleri"
date: 2026-06-16
summary: "Claude Code her oturuma sıfırdan başlar. CLAUDE.md, projeyi her seferinde yeniden anlatmaktan seni kurtaran kalıcı hafıza dosyasıdır. Nereye konur, içine ne yazılır, nasıl yüklenir?"
tags: [claude-code, claude-md, yapilandirma]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "CLAUDE.md Temelleri"
---

> "Claude Code Yolculuğu" serisinin altıncı durağı. Şimdiye kadar aracın ne
> olduğuna ve nasıl kullanıldığına baktık. Bu yazıdan itibaren onu kendi
> projemize göre nasıl şekillendireceğimize geçiyoruz — ilk durak: CLAUDE.md.

Claude Code'la biraz çalıştıysan şunu fark etmişsindir: her oturum temiz bir
sayfayla başlıyor. Önceki konuşmada "biz pnpm kullanıyoruz, npm değil" dediysen,
bir sonraki oturumda yine npm önerebiliyor. Bunun sebebi basit — her oturum
**sıfırdan bir bağlam penceresiyle** başlıyor. İşte `CLAUDE.md` tam da bu boşluğu
doldurmak için var: her seferinde tekrar anlatmak zorunda kaldığın şeyleri bir
kez yazıyorsun, Claude her oturumun başında okuyor.

## CLAUDE.md nedir, ne değildir?

CLAUDE.md düz bir markdown dosyası. İçine projenin kurallarını, komutlarını ve
mimari kararlarını yazıyorsun. Resmi dokümanın net bir uyarısı var ama: bu dosya
**bağlam**dır, zorlayıcı bir yapılandırma değil. Yani Claude onu okuyup elinden
geldiğince uyar, ama "kesinlikle engelle" garantisi vermez. Bir şeyin ne olursa
olsun çalışmasını ya da engellenmesini istiyorsan, doğru araç bir _hook_'tur
(serinin ilerleyen yazılarında değineceğim). CLAUDE.md davranışı yönlendirir,
dayatmaz.

Buna ek olarak Claude artık **otomatik hafıza** da tutuyor: senin
düzeltmelerinden ve tercihlerinden öğrendiklerini kendisi not alıyor. İkisi
tamamlayıcı — CLAUDE.md sen yazarsın, otomatik hafızayı Claude yazar. Bu yazıda
ben elle yazdığımız kısma, yani CLAUDE.md'ye odaklanacağım.

## Nereye konur?

CLAUDE.md birkaç farklı yerde yaşayabilir ve her konum farklı bir kapsama
karşılık gelir. Başlıcaları (geniş kapsamdan dara):

- **Yönetilen politika (kurumsal):** Tüm makinedeki herkese uygulanan,
  IT/DevOps tarafından dağıtılan dosya. Şirket standartları, güvenlik kuralları.
- **Kullanıcı talimatları** → `~/.claude/CLAUDE.md`. Tüm projelerinde geçerli
  kişisel tercihlerin.
- **Proje talimatları** → `./CLAUDE.md` ya da `./.claude/CLAUDE.md`. Takımla
  paylaşılan, sürüm kontrolüne giren proje kuralları.
- **Otomatik hafıza** → `~/.claude/projects/<proje>/memory/`. Claude'un senin
  düzeltmelerinden öğrenip kendi tuttuğu notlar; elle değil, Claude tarafından
  yönetilir (her proje/repo için ayrı klasör).

Çoğu insan için başlangıç noktası proje kökündeki `./CLAUDE.md`. En pratik
yol da onu sıfırdan yazmak değil: bir oturumda `/init` komutunu çalıştır.
Claude kod tabanını tarayıp build komutları, test talimatları ve keşfettiği
kuralları içeren bir başlangıç dosyası oluşturuyor. Zaten bir CLAUDE.md varsa
üzerine yazmıyor, iyileştirme öneriyor.

## İçine ne yazmalı?

İyi bir kıstas şu: **chat'e ikinci kez yazmak zorunda kaldığın her şey.**
Doküman şunları öneriyor: Claude aynı hatayı ikinci kez yaptıysa, kod
incelemesinde Claude'un bilmesi gereken bir şey çıktıysa, ya da yeni bir takım
arkadaşının verimli olması için ihtiyaç duyacağı bağlamsa — CLAUDE.md'ye yaz.

Asıl mesele _nasıl_ yazdığın. Çünkü dosya bağlam penceresine yükleniyor ve
muğlak talimatlara daha az uyuluyor. Bu yüzden somut ol:

- "Kodu düzgün biçimlendir" yerine → "2 boşluk girinti kullan"
- "Değişiklikleri test et" yerine → "Commit'ten önce `npm test` çalıştır"
- "Dosyaları düzenli tut" yerine → "API handler'ları `src/api/handlers/` altında"

Birkaç pratik kural daha: dosyayı **kısa ve odaklı** tut (uzun dosya hem bağlam
yer, hem uyumu düşürür), başlık ve maddelerle yapılandır, ve çelişen kuralları
ayıkla — iki kural çakışırsa Claude birini rastgele seçebilir.

## İçe aktarma (import)

Tek dosyayı şişirmeden organize olmak istersen `@yol/dosya` söz dizimiyle başka
dosyaları içe aktarabilirsin:

```text
Proje genel bakışı için @README, npm komutları için @package.json.

# Ek Talimatlar
- git akışı @docs/git-instructions.md
```

İçe aktarılan dosyalar da oturum başında bağlama yükleniyor — yani import
düzeni sağlar ama bağlam tasarrufu yapmaz. Tasarruf için yola göre yüklenen
`.claude/rules/` kurallarına bakmak gerek, ama o ayrı bir yazının konusu.

## Nasıl yüklenir?

Claude, çalışma dizininden köke doğru ağacı tırmanarak yol üstündeki tüm
CLAUDE.md dosyalarını bulur ve hepsini birleştirir — kökten aşağı doğru
sıralanır, yani çalıştığın yere en yakın talimat en sonda okunur. Alt
dizinlerdeki CLAUDE.md'ler ise başta değil, Claude o dizindeki dosyaları
okuduğunda devreye girer. Hangi dosyaların yüklendiğini görmek istersen oturum
içinde `/memory` komutunu çalıştırman yeterli.

## Özet

CLAUDE.md, "her oturumda yeniden anlatmak zorunda kaldığın şeyleri" bir kez
yazdığın kalıcı hafıza dosyası. `/init` ile başla, somut ve kısa tut, doğru
kapsama (proje/kullanıcı/yerel) yerleştir ve bunun bir dayatma değil yönlendirme
olduğunu unutma. Bir sonraki yazıda, tekrar eden iş akışlarını paketlemenin
yolu olan Skills'e bakacağız.

---

*Sıradaki yazı: [Skills'e Genel Bakış]({{ '/blog/skills-genel-bakis/' | relative_url }})*