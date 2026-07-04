---
layout: post
lang: tr
translation_url: /en/blog/claude-md-yapilandirma/
title: "CLAUDE.md: Yapı ve Konumlar (Derinlemesine)"
date: 2026-07-04
summary: "CLAUDE.md'nin tam konum tablosu, .claude/rules/ ile modüler kurallar, yola göre yüklenen path-specific rule'lar, monorepo'larda hariç tutma ve AGENTS.md uyumluluğu."
tags: [claude-code, claude-md, yapilandirma]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "CLAUDE.md: Yapı ve Konumlar (Derinlemesine)"
---

> "Claude Code Yolculuğu" serisinde daha önce [CLAUDE.md Temelleri]({{ '/blog/claude-md-temelleri/' | relative_url }})'nde dosyanın ne işe yaradığına ve nereye konabileceğine bakmıştık. Bu yazıda aynı konuya daha derinden giriyorum: tam konum tablosu, tek dosyayı büyütmeden organize olma yolları ve büyük repo'larda karşılaşılan sorunlar.

## Tam konum tablosu

Önceki yazıda kullanıcı, proje ve otomatik hafıza konumlarına değinmiştim. Resmi doküman bunlara bir katman daha ekliyor: **yönetilen politika** (managed policy) dosyası, işletim sistemine göre şu yollarda aranıyor:

- macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`
- Linux ve WSL: `/etc/claude-code/CLAUDE.md`
- Windows: `C:\Program Files\ClaudeCode\CLAUDE.md`

Bu dosya IT/DevOps tarafından MDM, Group Policy ya da Ansible gibi araçlarla dağıtılıyor ve tek bir kullanıcı tarafından devre dışı bırakılamıyor — kapsamı makinedeki herkes, her repo. Alternatif olarak `managed-settings.json` içindeki `claudeMd` anahtarına doğrudan metin de yazılabiliyor, ayrı bir dosyaya gerek kalmadan.

Bir de `./CLAUDE.local.md` var: proje kökünde, `.gitignore`'a eklenen, sadece sana ait yerel tercihler için (sandbox URL'leri, test verisi gibi). `/init` çalıştırıp kişisel seçeneği seçtiğinde bu dosyayı otomatik olarak `.gitignore`'a ekliyor.

## Yüklenme sırası, biraz daha detaylı

Önceki yazıda dizin ağacını kökten çalışma dizinine doğru tırmandığını söylemiştim. Eklenmesi gereken bir ayrıntı var: her dizin seviyesinde `CLAUDE.local.md`, o seviyedeki `CLAUDE.md`'den **sonra** ekleniyor — yani kişisel notların Claude'un o katmanda okuduğu son şey olması garanti ediliyor. Ayrıca CLAUDE.md içindeki blok seviyesi HTML yorumları (`<!-- bakım notu -->`) bağlama enjekte edilmeden önce siliniyor; yani insan bakımcılar için not bırakmak istiyorsan context'ten tasarruf ederek bunu kullanabilirsin (kod bloğu içindeki yorumlar bu kuraldan muaf).

## `.claude/rules/` ile modüler yapı

Dosya büyüdükçe tek bir CLAUDE.md yerine `.claude/rules/` altına konu başına dosyalar koyabiliyorsun:

```text
your-project/
├── .claude/
│   ├── CLAUDE.md
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       └── security.md
```

`paths` alanı olmayan kurallar `.claude/CLAUDE.md` ile aynı önceliğe sahip ve her oturumda yükleniyor. Asıl fark burada başlıyor: bir kuralı sadece belirli dosya türleriyle çalışırken yüklemek istersen, YAML front matter'a `paths` ekliyorsun:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Geliştirme Kuralları

- Her API endpoint'i girdi doğrulaması içermeli
- Standart hata yanıt formatını kullan
```

Bu kural, Claude `src/api/` altında bir `.ts` dosyası okuduğunda devreye giriyor — her tool çağrısında değil, dosya eşleştiğinde. Böylece frontend çalışırken backend kuralları bağlamı şişirmiyor. `~/.claude/rules/` altına koyduğun kurallar ise makinendeki tüm projelere uygulanıyor ve proje kurallarından önce yükleniyor.

## Büyük repo'larda hariç tutma

Monorepo'da başka takımların CLAUDE.md'leri alakasız gelebiliyor. `claudeMdExcludes` ayarı, yol veya glob deseniyle belirli dosyaları atlamana izin veriyor:

```json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

Bunu `.claude/settings.local.json`'a koyarsan hariç tutma sadece senin makinende geçerli olur. Tek istisna: yönetilen politika CLAUDE.md'si hiçbir zaman hariç tutulamaz.

## AGENTS.md ile uyumluluk

Repo zaten başka ajanlar için `AGENTS.md` kullanıyorsa, Claude Code onu doğrudan okumuyor — `CLAUDE.md` arıyor. Çözüm, onu içe aktarmak:

```markdown
@AGENTS.md

## Claude Code
`src/billing/` altındaki değişiklikler için plan modunu kullan.
```

Claude'a özel içerik eklemene gerek yoksa bir symlink de yeterli (`ln -s AGENTS.md CLAUDE.md`), ama Windows'ta symlink için yönetici izni gerektiğinden import yolu daha pratik.

## Özet

CLAUDE.md'nin konum hiyerarşisi dört katmanlı: yönetilen politika, kullanıcı, proje, yerel — ve her katmanın kesin dosya yolu var. Dosya büyüdükçe `.claude/rules/` ile modüler hale getirip `paths` ile yola göre yükletebiliyorsun; monorepo'da `claudeMdExcludes` ile gürültüyü kesebiliyorsun. Bir sonraki yazıda tekrar eden iş akışlarını paketlemenin yolu olan skill oluşturmaya bakacağız.

---

*Sıradaki yazı: [Skill Oluşturma ve En İyi Pratikler]({{ '/blog/skill-olusturma/' | relative_url }})*
