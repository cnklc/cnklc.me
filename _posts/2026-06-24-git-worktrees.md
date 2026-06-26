---
layout: post
lang: tr
translation_url: /en/blog/git-worktrees/
title: "Git Worktrees ile Çalışmak"
date: 2026-06-24
summary: "Aynı anda iki Claude oturumu çalıştırmak istediğinde dosyalar birbirine girer. Git worktrees bunu çözüyor: her oturuma kendi çalışma dizinini ve dalını veriyor."
tags: [claude-code, git-worktrees, paralel-calisma]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Git Worktrees ile Çalışmak"
---

> "Claude Code Yolculuğu" serisine devam ediyoruz. Geçen yazıda
> [headless modu]({{ '/blog/headless-mode/' | relative_url }}), yani Claude'u
> terminalde etkileşimsiz çalıştırmayı görmüştük. Bu kez paralelliğe geçiyoruz:
> aynı anda birden fazla oturumu birbirine karıştırmadan yürütmek.

Bir noktada şuna ihtiyaç duyuyorsun: bir terminalde Claude yeni bir özellik
yazsın, diğerinde başka bir Claude oturumu acil bir hatayı düzeltsin. İki oturumu
aynı çalışma dizininde açarsan ikisi de aynı dosyalara dokunur ve değişiklikler
birbirine girer. **Git worktree** tam da bunu çözüyor.

## Worktree nedir?

Bir git worktree, kendi dosyaları ve kendi dalı olan ayrı bir çalışma dizinidir;
ama aynı deponun geçmişini ve uzak (remote) sunucusunu paylaşır. Yani aynı repoyu
ikinci bir klasöre, farklı bir dalda checkout etmiş gibi olursun. Bir
worktree'deki düzenlemeler diğerindeki dosyalara hiç dokunmaz.

## `--worktree` ile başlamak

Claude Code bunu tek bayrakla halleder. `--worktree` (kısası `-w`) izole bir
worktree oluşturup Claude'u onun içinde başlatır:

```bash
claude --worktree feature-auth
```

Worktree varsayılan olarak repo kökünde `.claude/worktrees/feature-auth/` altında,
`worktree-feature-auth` adlı yeni bir dalda oluşturulur. İkinci bir terminalde
farklı bir isimle aynı komutu verince ayrı bir izole oturum açılır:

```bash
claude --worktree bugfix-123
```

İsmi boş bırakırsan Claude `bright-running-fox` gibi bir isim üretir. Oturum
içindeyken Claude'a doğal dille "bir worktree içinde çalış" da diyebilirsin;
bunu kendi `EnterWorktree` aracıyla yapar.

Küçük bir not: `.claude/worktrees/` dizinini `.gitignore`'a ekle ki worktree
içerikleri ana checkout'unda takip edilmeyen dosyalar olarak görünmesin.

## Gitignore'lanan dosyaları taşımak

Bir worktree tertemiz bir checkout olduğu için, ana deponda duran `.env` gibi
takip edilmeyen dosyalar orada yoktur. Bunları Claude worktree oluştururken
otomatik kopyalamak için repo köküne bir `.worktreeinclude` dosyası koyarsın.
Dosya `.gitignore` sözdizimini kullanır:

```text
.env
.env.local
config/secrets.json
```

Yalnızca hem bu desenlere uyan hem de gitignore'lanmış dosyalar kopyalanır;
yani takip edilen dosyalar asla iki kez oluşturulmaz.

## Temizlik nasıl işliyor?

Worktree oturumundan çıkınca ne olacağı, değişiklik yapıp yapmadığına bağlı:

- **Değişiklik yoksa:** worktree ve dalı otomatik silinir.
- **Değişiklik veya commit varsa:** Claude sana sorar — tutmak istersen dizin ve
  dal kalır, kaldırırsan kaydedilmemiş her şey silinir.
- **Etkileşimsiz çalıştırmalarda:** `--worktree` ile `-p`'yi birlikte
  kullandığında çıkış sorusu olmadığı için worktree otomatik temizlenmez. Bunu
  `git worktree remove` ile elle kaldırırsın.

Bu son madde, geçen yazıdaki [headless modla]({{ '/blog/headless-mode/' | relative_url }})
worktree'leri birleştirdiğinde aklında olsun: script içinde açtığın worktree'leri
kendin toplaman gerekir.

## Elle yönetmek

Konumu veya dalı tam kontrol etmek istersen worktree'leri doğrudan git ile de
açabilirsin:

```bash
git worktree add ../proje-feature-a -b feature-a
git worktree list
git worktree remove ../proje-feature-a
```

Tek dürüst uyarı: her worktree sıfırdan bir checkout olduğu için, her birinde
geliştirme ortamını yeniden kurman gerekir — bağımlılıkları yükle, sanal ortamı
hazırla, projenin setup adımlarını çalıştır. Worktree dosyaları izole eder, ortamı
senin yerine kurmaz.

## Özet

Git worktrees, birden fazla Claude oturumunu aynı anda, çakışma olmadan
çalıştırmanın en temiz yolu. `claude --worktree <isim>` ile bir komuta izole bir
çalışma alanı açarsın; `.worktreeinclude` ile gerekli gizli dosyaları taşırsın;
işin bitince Claude çoğu zaman temizliği kendi yapar. Karmaşık değil, ama paralel
çalışmaya geçtiğin an çok işe yarıyor.

---

*Sıradaki yazı: [Claude Fiyatlandırmasını Anlamak]({{ '/blog/claude-fiyatlandirma/' | relative_url }})*
