---
layout: post
lang: tr
translation_url: /en/blog/baglam-yonetimi-compact-clear/
title: "Bağlamı Yönetmek: /compact ve /clear"
date: 2026-06-28
summary: "Uzun oturumlarda bağlam penceresi dolar ve her mesaj pahalılaşır. /clear ile temiz sayfa açmak, /compact ile özetleyip devam etmek arasındaki farkı ve ne zaman hangisini kullanacağını anlatıyorum."
tags: [claude-code, baglam, maliyet]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Bağlamı Yönetmek: /compact ve /clear"
---

> "Claude Code Yolculuğu" serisinde maliyet tarafına devam ediyoruz.
> [Önceki yazıda prompt caching]({{ '/blog/prompt-caching/' | relative_url }})
> ile tekrar eden bağlamın maliyetini nasıl düşürdüğümüze bakmıştık; şimdi
> bağlamın kendisini küçük tutmaya, yani `/compact` ve `/clear` komutlarına
> geliyoruz.

Claude Code her mesajda o ana kadarki konuşmayı, okuduğu dosyaları ve komut
çıktılarını birlikte modele yollar. Oturum uzadıkça bu yığın büyür; bağlam
penceresi dolmaya yaklaştıkça her yeni mesaj daha çok token harcar. İyi haber
şu: bunu yönetmek için iki basit komut var ve aralarındaki fark net.

## /clear: temiz sayfa

İlgisiz bir işe geçtiğinde en doğru hamle konuşmayı tamamen sıfırlamak. Önceki
görevin dosyaları ve tartışması artık işine yaramıyorsa, onları bağlamda
taşımak sadece israf.

```text
/clear
```

Bu komut konuşma geçmişini siler ve bağlamı boşaltır (takma adları: `/reset`,
`/new`). Sabah bir bug'ı çözdün, öğleden sonra bambaşka bir modüle
geçeceksin — arada `/clear` demek, modelin kafasını eski işin ayrıntılarıyla
doldurmamasını sağlar.

Tek dikkat noktası: silmeden önce oturuma bir isim vermek istersen `/rename`
kullanabilir, sonra `/resume` ile geri dönebilirsin. Böylece "temiz sayfa"
açmak, geçmiş oturumu büsbütün kaybetmek anlamına gelmez.

## /compact: özetleyip devam et

Bazen işi tamamen bırakmıyorsun ama konuşma da gereğinden uzamış oluyor.
İşte burada `/compact` devreye giriyor: konuşmayı bir özete indirir, böylece
bağlam küçülür ama bağlam tümden kaybolmaz.

İsteğe bağlı olarak neye odaklanacağını da söyleyebilirsin:

```text
/compact kod örneklerine ve API kullanımına odaklan
```

Bu, özetleme sırasında nelerin korunacağını modele bildirir — örneğin uzun
bir entegrasyon oturumunda asıl önemsediğin şey kod parçaları ve API
çağrılarıysa, gevezeliği atıp bunları tutmasını isteyebilirsin.

Aynı tercihi her seferinde yazmak istemiyorsan, `CLAUDE.md` dosyana sabit bir
yönerge de koyabilirsin:

```markdown
# Compact instructions

Sıkıştırma yaparken lütfen test çıktısına ve kod değişikliklerine odaklan
```

## Otomatik sıkıştırma da var

Hiçbir şey yapmasan bile Claude Code, bağlam sınırına yaklaşınca konuşma
geçmişini kendiliğinden özetler (auto-compaction). Yani `/compact` aslında bu
otomatik davranışın elle ve yönlendirilebilir hâli. Otomatiğe bırakmak
çoğu zaman yeterli; ama neyin korunacağı senin için kritikse, elle çağırmak
daha iyi sonuç verir.

## Hangisini ne zaman?

Basit bir ayrım var: **konu değişiyorsa `/clear`, konu aynı ama konuşma
şişmişse `/compact`.** Birincisi geçmişi atar, ikincisi özetleyip saklar.

Durumu görmek için iki yardımcı komut işine yarar. `/context` bağlamının ne
kadarının dolduğunu renkli bir ızgarayla gösterir; `/usage` (eski `/cost`
artık bunun takma adı) ise oturumun token istatistiklerini ve plan
kullanımını verir:

```text
/context
```

Bunları ara sıra çalıştırmak, "acaba sıkıştırsam mı" sorusunu tahmine değil
veriye dayandırmanı sağlar.

Küçük ama gerçek bir kazanç bu: bağlamı bilinçli yönetmek hem maliyeti
düşürür hem de modelin dikkatini dağıtan eski ayrıntıları temizleyerek
yanıt kalitesini artırır. İki komut, tek alışkanlık.

---

*Sıradaki yazı: [claude CLI Komutları (-p, -c, -r)]({{ '/blog/claude-cli-komutlari/' | relative_url }})*
