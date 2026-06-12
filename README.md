# cnklc.me

Can KILIÇ'in kişisel web sitesi — CV, projeler ve blog. [Jekyll](https://jekyllrb.com/) ile geliştirildi, GitHub Pages üzerinde yayınlanır.

## Yapı

```
.
├── _config.yml            # Site ayarları (isim, linkler, vb.)
├── index.html             # Ana sayfa / CV
├── blog.html              # Blog liste sayfası
├── projects.html          # Projeler liste sayfası
├── _posts/                # ✍️  Blog yazıları (buraya .md ekle)
├── _projects/             # 🛠  Projeler (buraya .md ekle)
├── _layouts/              # Sayfa şablonları
├── _includes/             # Header, footer, head parçaları
└── assets/css/style.css   # Tasarım
```

## ✍️ Yeni blog yazısı ekleme

`_posts/` klasörüne `YIL-AY-GÜN-baslik.md` formatında bir dosya oluştur:

```markdown
---
layout: post
title: "Yazının Başlığı"
date: 2026-06-15
summary: "Listede görünecek kısa açıklama."
tags: [react, ipucu]
---

İçerik buraya markdown ile yazılır.
```

Dosya adındaki tarih önemli — `2026-06-15-react-ipuclari.md` gibi.

## 🛠 Yeni proje ekleme

`_projects/` klasörüne herhangi bir isimde `.md` dosyası oluştur:

```markdown
---
layout: project
title: "Proje Adı"
date: 2026-06-10
summary: "Kısa açıklama."
tech: [React, TypeScript, .NET Core]
repo: "https://github.com/cnklc/proje"
demo: "https://demo-linki.com"
---

Proje detayları buraya markdown ile yazılır.
```

`demo` alanını boş bırakırsan demo butonu görünmez.

## Kişisel bilgileri güncelleme

İsim, ünvan, sosyal linkler gibi bilgiler `_config.yml` dosyasında. Hakkımda
metni, deneyim ve yetenekler ise `index.html` içinde düzenlenebilir.

## Yerelde çalıştırma (opsiyonel)

```bash
bundle install
bundle exec jekyll serve
# http://localhost:4000
```

## Yayınlama

`main` dalına push attığında GitHub Actions otomatik olarak siteyi derler ve
yayınlar. İlk kez kuruyorsan:

1. Bu klasörü bir GitHub deposuna (`cnklc/cnklc.me`) push et.
2. Depo ayarlarında **Settings → Pages → Source** kısmını **GitHub Actions** olarak seç.
3. Custom domain için `cnklc.me` zaten `CNAME` dosyasında tanımlı — alan adı
   DNS ayarlarını GitHub Pages'e yönlendir.
