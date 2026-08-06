---
layout: post
lang: tr
translation_url: /en/blog/baglam-dokumani-guncel-tutmak/
title: "Bağlam Dokümanını Güncel Tutmak"
date: 2026-07-31
summary: "Proje yapılandırma dosyası bir kez yazılıp unutulduğunda sessizce eskir. Yapay zekâ onu her oturumda okuduğu için eski bilgi, yeni hatalara dönüşür."
tags: [vibe-coding, baglam, claude-md]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Bağlam Dokümanını Güncel Tutmak"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Bu bölümde araçtan bağımsız
> bir bakım işine bakıyoruz: projenin bağlam dokümanını yalın ve güncel tutmak.

Geçen yazıda tekrar eden kuralların projenin yapılandırma dosyasına ait
olduğunu söylemiştim:
[Ne Yapmamasını da Söyle]({{ '/blog/negatif-talimatlar-ve-rol/' | relative_url }})
yazısında `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursor/rules/` gibi
dosyaların hepsinin aynı fikrin farklı isimleri olduğuna değinmiştik. O
dosyanın nasıl kurulacağı çözülmüş bir problem. Çözülmemiş olan, aylar sonra
onun hâlâ doğru olması.

## Eskiyen doküman, sessiz bir yalandır

Bu dosya her oturumun başında okunuyor. Yani içindeki her cümle, ajanın
projeye dair "bildiği" şey. Fatura takibi projesinde bir dönem depo katmanı
bellek-içiydi ve dokümanda şöyle bir satır vardı:

```text
Veri bellek-içi bir Map'te tutulur; kalıcı depolama yoktur.
```

Kalıcı depolamaya geçtikten sonra bu satır silinmezse, ajan yeni bir endpoint
yazarken hâlâ o dünyada yaşar: veriyi belleğe yazar, testleri bunun üzerine
kurar. Ortaya çıkan kod bir yerde hata vermez bile — sadece yanlış varsayımla
doğrudur. Bu tür hataları yakalamak, sözdizimi hatalarından çok daha zordur.

## Yalnızca her oturumda gereken şey kalsın

Yapılandırma dosyası bir dokümantasyon deposu değil. İçinde her oturumda
geçerli olan şeyler durmalı: kurulum ve test komutları, klasör yapısı,
isimlendirme kuralları, dokunulmaması gereken alanlar. Şunlar durmamalı: geçen
haftaki bir bug'ın hikâyesi, birazdan sileceğin bir denemenin notu, sprint
tarihleri ve sonradan vazgeçilmiş kararların gerekçeleri.

Bir cümlelik ölçüt: bu satırı yazmasam, aynı şeyi bir sonraki oturumda tekrar
anlatmak zorunda kalır mıydım? Cevap hayırsa satır oraya ait değil.

Boyut da bir kısıt. Claude Code dokümanı, dosya başına 200 satırın altını
hedeflemeyi öneriyor; daha uzun dosyaların hem daha çok bağlam tükettiği hem
de talimatlara uyumu düşürdüğü belirtiliyor. Dosyayı `@` ile parçalara bölmek
düzeni iyileştirir ama bağlamı azaltmaz, çünkü içe aktarılan dosyalar da
başlangıçta yükleniyor. Bunun ayrıntısını
[CLAUDE.md Yapılandırma]({{ '/blog/claude-md-yapilandirma/' | relative_url }})
yazısında ele almıştım.

## En pahalı hata: çelişki

Eskimenin en kötü hâli, eski kuralın silinmeyip yeninin yanına eklenmesidir.
Dokümanda "tarihler ISO 8601 string olarak saklanır" ve "tarihler epoch
milisaniye olarak saklanır" satırları yan yana durursa, resmi doküman açıkça
söylüyor: çelişen talimatlarda model birini gelişigüzel seçebilir. Bu yüzden
bir kural değiştiğinde eskisini güncellemek değil, **silmek** gerekir.

## Bakımı bir işe bağlayın

Dokümanı ayrı bir "bakım günü"ne bırakmak işe yaramıyor; kimse o günü
yapmıyor. Daha iyisi, davranışı değiştiren commit'in içine almak: depo
katmanını değiştiren commit, dokümandaki depo satırını da düzeltir.

İkinci alışkanlık, dosyanın gerçekten yüklendiğini doğrulamak. Claude Code'da
oturum içinde `/context` çalıştırıp **Memory files** listesine bakabilirsin;
`/memory` komutu ise bu dosyaları açıp düzenlemeni sağlar. Dosya listede
yoksa, içindeki hiçbir kural işlemiyordur — ve bunu fark etmeden haftalarca
"kurallarıma uymuyor" diye düşünebilirsin.

Son olarak dürüst bir sınır: bu dosya bir yapılandırma değil, bağlam. Resmi
doküman bunu net söylüyor — talimatlar sistem prompt'unun parçası değil,
sonrasında gelen bir mesaj olarak iletiliyor ve kesin uyum garantisi yok. Bir
kuralın her seferinde uygulanması şartsa, onu dokümana değil hook ya da izin
ayarları gibi teknik bir katmana yazmak gerekiyor. Bağlam dokümanı yön verir;
zorlamaz.

Sıradaki yazı: [Bağlamı Temiz Tutmak: Yeni Oturum, Subagent, Uzun Bağlam]({{ '/blog/baglami-temiz-tutmak/' | relative_url }})
