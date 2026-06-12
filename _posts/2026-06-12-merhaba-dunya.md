---
layout: post
title: "Merhaba Dünya: Bu Siteyi Neden Yaptım"
date: 2026-06-12
summary: "Kişisel web sitemi açtım. İşte burada neler paylaşacağım ve bu siteyi nasıl kurduğum."
tags: [genel, jekyll]
---

Bu, blogumun ilk yazısı. Uzun süredir öğrendiklerimi ve geliştirdiğim projeleri
paylaşacağım bir alan istiyordum; işte burası.

## Burada ne bulacaksın?

Bu sitede üç şey paylaşacağım:

- **Hakkımda** sayfasında kim olduğum ve neler yaptığım
- **Projeler** bölümünde geliştirdiğim uygulamalar
- **Blog**'da ise yazılım üzerine notlarım ve öğrendiklerim

## Yeni yazı nasıl eklenir?

Bu siteyi Jekyll ile kurdum, yani yeni yazı eklemek çok basit. `_posts/`
klasörüne `YYYY-AA-GG-baslik.md` formatında bir dosya eklemen yeterli:

```markdown
---
layout: post
title: "Yazının Başlığı"
date: 2026-06-15
summary: "Kısa açıklama."
tags: [react, ipucu]
---

Yazının içeriği buraya markdown ile yazılır.
```

Kod blokları, **kalın metin**, listeler ve [bağlantılar](https://cnklc.me)
otomatik olarak güzel görünüyor.

> Sade tutmaya çalıştım — içerik ön planda olsun istedim.

Okuduğun için teşekkürler!
