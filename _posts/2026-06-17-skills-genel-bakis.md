---
layout: post
lang: tr
translation_url: /en/blog/skills-genel-bakis/
title: "Skills'e Genel Bakış"
date: 2026-06-17
summary: "Skill nedir, CLAUDE.md'den farkı ne ve neden tekrar eden işleri bir SKILL.md dosyasına taşımak işe yarıyor? Claude Code'da skill'lere ilk bakış."
tags: [claude-code, skills, otomasyon]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Skills'e Genel Bakış"
---

> "Claude Code Yolculuğu" serisinin altıncı durağı. Önceki yazıda
> [CLAUDE.md temellerine]({{ '/blog/claude-md-temelleri/' | relative_url }})
> bakmıştık. Şimdi bir adım öteye geçip, tekrar eden işleri paketlemenin
> yolu olan **skill'lere** geliyoruz.

CLAUDE.md'yi konuştuğumuzda şunu söylemiştim: orası kalıcı *gerçekler* için —
projenin nasıl çalıştığı, hangi kütüphaneleri kullandığın, kod standartların.
Peki ya bir *prosedür* tekrar tekrar lazım oluyorsa? "Şu adımları sırayla yap"
diye her seferinde aynı talimatı yapıştırıyorsan, o şey artık bir gerçek değil,
bir iş akışı. İşte tam burada skill'ler devreye giriyor.

## Skill nedir?

Resmi tanımıyla skill'ler "Claude'un yapabildiklerini genişletir". Pratikte bir
skill, içine talimat yazdığın bir `SKILL.md` dosyasından ibaret. Bu dosyayı
oluşturduğunda Claude onu kendi araç çantasına ekliyor. İki şekilde
çalışıyor: ya konuyla alakalı olduğunda Claude onu kendiliğinden yüklüyor, ya da
sen `/skill-adı` yazarak doğrudan çağırıyorsun.

Dokümanın koyduğu pratik kural net: aynı talimatı, kontrol listesini ya da çok
adımlı prosedürü sohbete tekrar tekrar yapıştırıyorsan, ya da CLAUDE.md'deki bir
bölüm artık bir gerçek değil de bir prosedüre dönüşmüşse — bir skill yaz.

## En küçük örnek

Bir skill için tek zorunlu dosya `SKILL.md`. En sade hali şöyle görünüyor:

```yaml
---
description: Commit'lenmemiş değişiklikleri özetler ve riskli olanları işaretler. Kullanıcı ne değiştiğini sorduğunda veya diff'i gözden geçirmek istediğinde kullan.
---

## Talimatlar

Yukarıdaki değişiklikleri iki-üç maddede özetle, sonra fark
ettiğin riskleri (eksik hata yönetimi, sabit kodlanmış değerler,
güncellenmesi gereken testler) listele.
```

Frontmatter'daki `description` alanı kritik: Claude'un bu skill'i *ne zaman*
kendiliğinden devreye sokacağına bu açıklamaya bakarak karar veriyor. O yüzden
açıklamayı "ne yapar ve hangi durumda kullanılır" diye net yazmak gerekiyor.

## CLAUDE.md'den farkı: ne zaman yüklenir?

Buradaki asıl güzellik bağlam (context) ekonomisinde. CLAUDE.md'nin tamamı her
oturumun başında belleğe yükleniyor. Bir skill'de ise sadece *açıklaması*
bağlamda duruyor; asıl gövdesi yalnızca skill çağrıldığında yükleniyor.
Yani uzun bir referans metnini skill olarak tutmak, ihtiyaç duyulana kadar
neredeyse hiç maliyet çıkarmıyor. Dokümanın deyişiyle: "bir skill'in gövdesi
sadece kullanıldığında yüklenir."

## Skill'ler nerede yaşar?

Bir skill'i nereye koyduğun, kimin kullanacağını belirliyor:

- **Kişisel:** `~/.claude/skills/<isim>/SKILL.md` — bütün projelerinde geçerli.
- **Proje:** `.claude/skills/<isim>/SKILL.md` — sadece o projede, git ile
  takımla paylaşılır.
- **Plugin:** bir eklentinin içinde gelir, `plugin-adı:skill-adı` ad alanıyla.

Aynı isim birden çok seviyede varsa öncelik sırası var: kurumsal > kişisel >
proje. Güzel tarafı, Claude Code skill klasörlerindeki değişiklikleri canlı
izliyor; çoğu durumda yeni bir skill eklediğinde oturumu yeniden başlatmana bile
gerek kalmıyor.

## Kim çağırabilir?

Varsayılan olarak bir skill'i hem sen `/isim` yazarak hem de Claude
kendiliğinden çağırabilir. Ama iki frontmatter alanıyla bunu kısıtlayabilirsin:

- `disable-model-invocation: true` → sadece sen çağırabilirsin. Yan etkisi olan
  işler için ideal: `/deploy`, `/commit` gibi. Claude "kod hazır görünüyor"
  diye kendi kafasına göre deploy etmesin.
- `user-invocable: false` → sadece Claude çağırabilir. Aksiyon olmayan, ama
  Claude'un bilmesi gereken arka plan bilgisi için: örneğin eski bir sistemin
  nasıl çalıştığını anlatan bir bağlam skill'i.

## Özet

Skill, tekrar eden bir iş akışını `SKILL.md` dosyasına paketlemenin yolu.
CLAUDE.md gerçekleri tutar; skill ise prosedürleri — ve akıllıca, sadece
gerektiğinde yüklenerek bağlamı boşa harcamaz. Açıklamayı net yaz, doğru yere
koy, kimin çağıracağına karar ver. Bir sonraki yazıda Claude'un bu işleri fiilen
yaparken kullandığı şeye — **araçlara (tools)** — bakacağız.

---

*Sıradaki yazı: Tools (Araçlar)*
