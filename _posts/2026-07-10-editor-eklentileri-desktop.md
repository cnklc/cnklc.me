---
layout: post
lang: tr
translation_url: /en/blog/editor-eklentileri-desktop/
title: "Editör Eklentileri ve Masaüstü Uygulaması"
date: 2026-07-10
summary: "Claude Code terminalden ibaret değil: VS Code eklentisi, JetBrains plugin'i ve masaüstü uygulaması — hangisi ne zaman mantıklı?"
tags: [claude-code, vs-code, ide]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Editör Eklentileri ve Masaüstü Uygulaması"
---

> "Claude Code Yolculuğu" serisi devam ediyor. Önceki yazıda [plugin sistemini]({{ '/blog/plugins-eklentiler/' | relative_url }})
> görmüştük; bu yazıda Claude Code'u terminal dışında kullanmanın yollarına
> bakıyoruz: editör eklentileri ve masaüstü uygulaması.

Seri boyunca hep terminaldeydik. Ama Claude Code'un yaşadığı tek yer orası
değil; VS Code'da, JetBrains IDE'lerinde ve kendi masaüstü uygulamasında da
çalışıyor. Aynı motor, farklı yüzler — fark, işini nerede yaptığında.

## VS Code eklentisi

VS Code eklentisi, Claude Code'a grafiksel bir panel kazandırıyor. Kurulum
bildiğin yoldan: Extensions görünümünde "Claude Code" arayıp kuruyorsun,
sağ üstteki kıvılcım (Spark) simgesine tıklayıp paneli açıyorsun. API
anahtarına gerek yok; ücretli Claude aboneliğinle giriş yapman yeterli.

Terminale göre en somut kazanımlar şunlar: Claude bir dosyayı değiştirmek
istediğinde değişikliği editörün yan yana diff görünümünde görüyorsun; plan
modunda planı Markdown belgesi olarak açıp satır arası yorumla geri bildirim
verebiliyorsun; seçili kod otomatik olarak bağlama giriyor. Editörde bir blok
seçip `Option+K` (Windows/Linux'ta `Alt+K`) ile prompt'a `@dosya.ts#5-10`
gibi bir referans düşürmek de var. Diyelim ki bir fonksiyona takıldın:
ilgili satırları seçip panele şunu yazıyorsun:

```text
seçili fonksiyon neden ikinci çağrıda boş dizi döndürüyor?
```

Eklenti ve CLI aynı oturum geçmişini paylaşıyor; panelde başladığın
konuşmayı terminalde `claude --resume` ile sürdürebilirsin. Yalnız şunu
bil: eklenti CLI'ın her özelliğini taşımıyor (ör. `!` bash kısayolu yok).
CLI'a özgü bir şey gerektiğinde entegre terminalde `claude` çalıştırmak
en pratik çözüm — bunun için CLI'ın ayrıca kurulu olması gerekiyor.

## JetBrains plugin'i

IntelliJ, PyCharm, WebStorm gibi JetBrains IDE'leri için ayrı bir plugin var
(JetBrains Marketplace'ten kuruluyor). Yaklaşımı farklı: kendi CLI kopyasını
getirmiyor, IDE'nin entegre terminalinde senin kurduğun `claude` komutunu
çalıştırıp ona bağlanıyor. Yani önce CLI kurulu olmalı.

Bağlantı kurulunca diff'ler IDE'nin diff görüntüleyicisinde açılıyor,
editördeki seçim ve lint/sözdizimi hataları Claude'la otomatik paylaşılıyor.
`Cmd+Esc` (Windows/Linux'ta `Ctrl+Esc`) ile hızlı açma, `Cmd+Option+K` ile
dosya referansı ekleme de VS Code'dakine benzer. Dış bir terminalden
çalışıyorsan `/ide` komutuyla IDE'ye bağlanabilirsin.

## Masaüstü uygulaması

Claude masaüstü uygulamasının **Code** sekmesi, IDE'siz ama terminalden daha
görsel bir orta yol. Asıl güçlü yanı paralel oturumlar: her oturumu ayrı bir
git worktree'de izole çalıştırabiliyor, böylece aynı repoda birden fazla işi
çakışmadan yürütüyorsun. Entegre terminal, dosya editörü ve görsel diff
incelemesi de var. Serinin [worktree yazısında]({{ '/blog/git-worktrees/' | relative_url }}) elle kurduğumuz düzenin
hazır halini sunuyor diyebilirim.

## Hangisini seçmeli?

Dürüst cevap: hepsi aynı Claude Code, seçim ergonomi meselesi. Gün boyu
IDE'de yaşıyorsan editör eklentisi diff inceleme deneyimiyle öne geçiyor.
Terminal alışkanlığın güçlüyse CLI zaten tam özellikli olan. Masaüstü
uygulaması ise paralel oturumları görsel yönetmek isteyenlere uygun.
Oturum geçmişi paylaşıldığı için karışık kullanmak da mümkün: sabah
panelde başla, öğleden sonra terminalde devam et.

## Özet

VS Code eklentisi grafik panel ve diff incelemesi, JetBrains plugin'i IDE
entegrasyonlu CLI, masaüstü uygulaması git izolasyonlu paralel oturumlar
sunuyor. Motor aynı; nerede rahat çalışıyorsan orası doğru yer. [Sıradaki yazıda]({{ '/blog/agentic-loop-nedir/' | relative_url }}) kaportanın altına inip bu motorun çalışma prensibine bakacağız.

---

*Sıradaki yazı: [Agentic Loop (Ajan Döngüsü) Nedir?]({{ '/blog/agentic-loop-nedir/' | relative_url }})*
