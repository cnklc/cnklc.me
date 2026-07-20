---
layout: post
lang: tr
translation_url: /en/blog/vibe-coding-araclari/
title: "Vibe Coding Araçları: App Builder'lar ve Kodlama Ajanları"
date: 2026-07-16
summary: "Vibe coding araçları iki ana kategoriye ayrılıyor: fikirden çalışan uygulamaya götüren app builder'lar ve geliştiricinin ortamında çalışan kodlama ajanları. Hangisi sana uygun?"
tags: [vibe-coding, araclar, yapay-zeka]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Vibe Coding Araçları: App Builder'lar ve Kodlama Ajanları"
---

> "Vibe Coding Yolculuğu" serisinin ikinci yazısı. İlk yazıda
> [vibe coder zihniyetinden]({{ '/blog/vibe-coder-zihniyeti/' | relative_url }})
> bahsetmiş ve serinin projesi fatura takibini tanıtmıştık; şimdi bu zihniyeti
> uygulayacağın araçların haritasını çıkarıyoruz.

Vibe coding araçlarının sayısı hızla artıyor ve her yeni araç kendini
"devrim" olarak tanıtıyor. Neyse ki karmaşa görünenden küçük: bu araçların
neredeyse tamamı iki kategoriden birine giriyor. Kategoriyi anlarsan, yeni
çıkan her aracı da nereye koyacağını bilirsin.

## Birinci kategori: App builder'lar

Lovable, Bolt ve v0 gibi araçlar tarayıcıda çalışır ve fikri doğrudan çalışan
bir uygulamaya çevirmeye odaklanır. Bir proje tarifi yazarsın; araç arayüzü,
veritabanını, kullanıcı girişini ve çoğu zaman barındırmayı (hosting) da
kendisi halleder. Replit de benzer bir "her şey tek yerde" yaklaşımı sunar:
editör, ajan ve yayınlama aynı tarayıcı sekmesinde.

Bu kategorinin hedef kitlesi kod yazmayan ya da az yazan kişiler: fikrini
test etmek isteyen bir girişimci, dahili bir araç isteyen bir ürün yöneticisi.
Güçlü yanı hız ve sıfır kurulum; zayıf yanı ise derinlik. Karmaşık backend
ihtiyaçlarında zorlanırlar ve üretilen kodu platform dışına taşımak her zaman
kolay değildir. Uygulaman büyüdükçe "kodum aslında kimin elinde?" sorusu
önem kazanır — kodunu GitHub'a aktarmana izin veren araçları tercih etmek
bu yüzden akıllıca.

## İkinci kategori: Kodlama ajanları

Claude Code, Cursor, GitHub Copilot, Gemini CLI ve OpenAI Codex gibi araçlar
ise senin geliştirme ortamının içinde yaşar: kimi terminalde, kimi editörde,
kimi ikisinde birden. Sana bitmiş bir uygulama vermek yerine, kendi
projende dosya okur, kod yazar, komut çalıştırır ve testleri koşturur.
Bu kategorinin ne olduğunu daha önce
[coding agent nedir]({{ '/blog/coding-agent-nedir/' | relative_url }})
yazısında ayrıntılı anlatmıştım; Claude Code özelinde bir tanışma için
[Claude CLI tanıtımı]({{ '/blog/claude-cli-tanitim/' | relative_url }})
yazısına bakabilirsin.

Buradaki hedef kitle, kod okuyabilen geliştiriciler. Kod senin makinende ve
senin repo'nda durur; nereye deploy edeceğine sen karar verirsin. Karşılığında
kurulum, terminal aşinalığı ve üretilen kodu değerlendirme sorumluluğu sende.

## Aynı istek, iki farklı dünya

Farkı, serinin projesi üzerinden görelim. İhtiyaç şu: bir faturayı "ödendi"
olarak işaretleyebilmek. Bunu bir app builder'a sıfırdan tarif etseydin şuna
benzer bir şey yazardın:

```text
Faturaları listeleyebildiğim, yeni fatura ekleyebildiğim ve
ödendi olarak işaretleyebildiğim bir fatura takip uygulaması yap.
```

Dakikalar içinde arayüzü ve veritabanı hazır, yayında bir prototip alırsın —
ama kod platformun içindedir ve mimari kararların çoğu senin yerine verilmiştir.

Aynı ihtiyacı kendi projemizde bir kodlama ajanına verdim. Prompt'u bilerek
kısa bıraktım; buradaki beklenti, ajanın mevcut projeyi inceleyip kalıplarına
uymasıydı:

```text
bir faturayı ödendi olarak işaretleyebilmek istiyorum
```

Ajan önce projeyi okudu ve çözümü var olan yapıya yerleştirdi: id doğrulamasını
önceki yazıda kurdurduğumuz ayrı validator kalıbına ekledi, hata gövdelerini
mevcut endpoint'lerle aynı biçimde tuttu, testleri de projenin test stiliyle
yazdı. Kapanış özeti şuydu:

> Faturaları artık "ödendi" olarak işaretleyebilirsin. `POST /faturalar/2/ode`
> dediğinde ilgili faturanın `odendi` alanı `true` olur ve güncel kayıt geri
> döner. Olmayan bir fatura numarası verirsen 404, sayı olmayan bir id verirsen
> (ör. `/faturalar/abc/ode`) 400 alırsın; zaten ödenmiş bir faturayı tekrar
> işaretlemek sorun çıkarmaz, yine 200 döner. Id doğrulamasını projenin mevcut
> kalıbına uyacak şekilde ayrı validator'a koydum ve dört yeni testle birlikte
> hepsi geçiyor (toplam 11 test yeşil).

Testleri bağımsız çalıştırıp doğruladım: 11'i de geçiyor. Sonuç senin repo'nda
bir commit olarak durur — ama yayına almak, veritabanını kurmak senin işindir.
İki dünyanın özeti bu: app builder sana bitmiş bir ürün taslağı verir; ajan,
senin projenin diline uyan bir katkı.

## Nasıl seçmeli?

Seçimi üç soru netleştiriyor. Birincisi beceri seviyesi: kod okuyamıyorsan
app builder ile başla; okuyabiliyorsan ajanlar sana daha fazla kontrol verir.
İkincisi kod sahipliği: prototip sonrası projeyi büyütmeyi planlıyorsan,
kodu dışarı aktarabildiğinden emin ol. Üçüncüsü hedef: hızlı prototip ve MVP
için app builder'lar biçilmiş kaftan; üretim ortamına gidecek kodda ise
insan denetimi şart — hangi aracı kullanırsan kullan.

Bir uyarı: fiyatlar, modeller ve "en iyi araç" sıralamaları aylar içinde
eskiyor. Bu yüzden araç seçerken güncel duruma bakmak, ama kategorilerin
mantığını kalıcı bilgi olarak cebe koymak en sağlıklısı. İki kategoriyi
birlikte kullanmak da mümkün: arayüzü bir app builder'da çıkarıp projeyi
bir ajanla büyüten çok kişi var.

Sıradaki yazı: [Koddan Önce Plan: MVP ve Fazlar]({{ '/blog/koddan-once-plan/' | relative_url }})
