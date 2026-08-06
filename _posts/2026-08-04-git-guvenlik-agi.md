---
layout: post
lang: tr
translation_url: /en/blog/git-guvenlik-agi/
title: "Git: Vibe Coding'in Güvenlik Ağı"
date: 2026-08-04
summary: "Modele geniş yetki vermenin bedeli, geri dönebilmekle ödenir. Sık commit, okunan diff ve dal başına özellik — vibe coding'i cesur ama geri alınabilir kılan üç alışkanlık."
tags: [vibe-coding, git, surum-kontrolu]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Git: Vibe Coding'in Güvenlik Ağı"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Şimdiye kadar planlamayı,
> prompt yazmayı, bağlamı ve hata ayıklamayı konuştuk. Bu yazı hepsinin altında
> duran şeyle ilgili: yanlış giderse ne olacak?

Vibe coding'in temel işlemi, modele "şunu yap" deyip birden fazla dosyada
değişiklik üretmesine izin vermek. Bu değişikliklerin bir kısmı iyi, bir kısmı
gereksiz, bir kısmı da açıkça yanlış olacak. Kaçınılmaz olan bu değil; kaçınılmaz
olanı ucuza geri alabilmek. Git tam olarak bunu yapıyor: yanlışın maliyetini bir
komuta indiriyor.

Kodlama araçlarının kendi geri alma mekanizmaları var — Claude Code'da `/rewind`
oturum içindeki her prompt'tan önceki dosya durumuna dönmeni sağlıyor, Cursor ve
benzerlerinde de checkpoint karşılıkları mevcut. Bunlar hızlı ama oturuma bağlı:
kapsamı o sohbet, ömrü sınırlı. Kalıcı katman hâlâ git.

## Her prompt'tan önce temiz bir taban

En basit ve en çok işe yarayan kural: modele iş vermeden önce çalışan hâlini
commit'le. Fatura takibi projesinde indirim hesabına dokunmadan önce:

```bash
git status -s
git add -A && git commit -m "indirim öncesi çalışan hâl"
```

Bunun anlamı şu: model ne yaparsa yapsın, elinde geri dönülecek bilinen bir nokta
var. Commit mesajının şık olması gerekmiyor; taban noktası olması yeterli.

Bir uyarı: bu alışkanlık commit geçmişini şişiriyor. Yayına çıkmadan önce ilgili
commit'leri birleştirmek (squash) veya sadece özellik dalını tek commit olarak
almak makul bir orta yol.

## Diff'i okumadan kabul etme

Modelin ne değiştirdiğini bilmenin tek yolu bakmak. Özet olarak başla:

```bash
git diff --stat
```

```
 src/invoices/tax.js   | 2 +-
 src/invoices/total.js | 2 +-
 2 files changed, 2 insertions(+), 2 deletions(-)
```

Burada dikkat çeken şey `tax.js`. İndirim hesabı istemiştin; KDV oranına
dokunulmasını istememiştin. Dosya listesi, satır satır okumadan önce bu tür
kapsam taşmalarını yakalıyor. Özellikle şunlara bak: silinen dosyalar,
imzası değişen fonksiyonlar, yeni bağımlılıklar ve şema/migration dosyaları.

İstemediğin değişiklik tek bir dosyadaysa hepsini çöpe atman gerekmiyor:

```bash
git restore src/invoices/tax.js
```

`git restore` çalışma dizinindeki dosyayı geri alır; commit'lenmiş bir şeyi geri
almak istiyorsan `git revert <commit>` yeni bir commit üreterek bunu yapar.
İkisini karıştırmamak gerekiyor — biri henüz kaydedilmemiş değişikliği siler,
diğeri kayıtlı bir değişikliği tersine çeviren yeni bir kayıt oluşturur.

## Dal başına bir özellik

Riskli bir işi ana dalda denemenin sebebi yok:

```bash
git switch -c feat/indirim
```

Sonuç beğenilmezse dalı silip devam ediyorsun. Bu, "bu yaklaşım tutmadı, baştan
deneyelim" durumunu bir felaketten bir tercihe çeviriyor — ki modelle çalışırken
bu durum sandığından sık oluyor.

Aynı anda birden fazla oturum yürütmek istiyorsan dallar yetmeyebilir; iki oturum
aynı dizindeki dosyalara dokunur. O senaryo için
[git worktrees]({{ '/blog/git-worktrees/' | relative_url }}) yazısına bakabilirsin.

## Sınırları

Git bir güvenlik ağı, kalite kontrolü değil. Sık commit atmak kötü kodu iyi
yapmıyor; sadece kötü kodu geri almayı ucuzlatıyor. Diff'i okumadığın sürece de
hiçbir işe yaramıyor — commit edilmiş yanlış kod, commit edilmemiş yanlış koddan
daha tehlikeli, çünkü artık "kabul edilmiş" görünüyor. Ağ, düşmeyi engellemek
için değil; düştüğünde kalkabilmek için orada.

Sıradaki yazı: [Yapay Zekâya Test Yazdırmak: TDD ve Bug'ı Kıran Test]({{ '/blog/ai-a-test-yazdirmak/' | relative_url }})
