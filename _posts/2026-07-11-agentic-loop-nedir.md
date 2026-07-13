---
layout: post
lang: tr
translation_url: /en/blog/agentic-loop-nedir/
title: "Agentic Loop (Ajan Döngüsü) Nedir?"
date: 2026-07-11
summary: "Claude Code'un kalbindeki döngü: bağlam topla, harekete geç, sonucu doğrula. Bu üç fazın nasıl işlediğine ve döngünün neresinde durduğuna yakından bakış."
tags: [claude-code, agentic-loop, mimari]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Agentic Loop (Ajan Döngüsü) Nedir?"
---

> "Claude Code Yolculuğu" serisinde bu kez kaportanın altına iniyoruz.
> Serinin başında [kodlama ajanının ne olduğunu]({{ '/blog/coding-agent-nedir/' | relative_url }})
> anlatırken "bu döngüye ileride ayrı bir başlık ayıracağım" demiştim —
> işte o yazı.

Claude Code'a bir görev verdiğinde ekranda akan şey rastgele bir komut
yağmuru değil; belirli bir düzenin tekrarı. Resmî dokümanın **agentic loop**
(ajan döngüsü) dediği bu düzen üç fazdan oluşuyor: **bağlam toplama**,
**harekete geçme** ve **sonucu doğrulama**. Görev bitene kadar bu üçlü
döner durur.

## Üç faz, tek döngü

Fazlar kağıt üzerinde sıralı görünse de pratikte iç içe geçiyor. Somut bir
örnekle bakalım. Şunu istedin:

```text
başarısız olan testleri düzelt
```

Claude'un tipik izleği şöyle: önce test paketini çalıştırıp neyin
kırıldığını görür, hata çıktısını okur, ilgili kaynak dosyaları arar ve
okur (bağlam toplama), sonra düzeltmeyi yapar (harekete geçme), en sonunda
testleri yeniden koşup geçtiklerini teyit eder (doğrulama). Testler hâlâ
kırmızıysa döngü başa sarar — bu kez elinde bir tur öncesinden daha fazla
bilgi vardır.

Önemli nüans: döngünün şekli göreve uyum sağlar. Kod tabanı hakkında bir
soru çoğu zaman yalnızca bağlam toplama fazında biter; bir refactor ise
doğrulama ağırlıklı ilerler. Hangi adımın gerekli olduğuna model, bir önceki
adımdan öğrendiklerine bakarak karar verir.

## Motor ve kaporta: model + araçlar

Döngüyü iki bileşen çalıştırıyor. **Model** akıl yürüten taraf: kodu okur,
parçaların nasıl bağlandığını anlar, ne değişmesi gerektiğine karar verir.
**Araçlar** (tools) ise eyleme geçen taraf: dosya okuma/yazma, arama, komut
çalıştırma, web erişimi. Araçlar olmasa model yalnızca metinle cevap
verebilirdi; her araç çağrısının çıktısı döngüye geri beslenir ve bir
sonraki kararı şekillendirir.

Dokümanın bu ikiliyi saran yapıya verdiği isim güzel: Claude Code, modelin
etrafındaki **agentic harness** — araçları, bağlam yönetimini ve çalışma
ortamını sağlayarak bir dil modelini yetkin bir kodlama ajanına çeviren
koşum takımı. Serinin [araçlar]({{ '/blog/tools-araclar/' | relative_url }})
ve [bağlam yönetimi]({{ '/blog/context-baglam/' | relative_url }})
yazılarında parçalarını gördüğümüz şeyin bütünü bu.

## Sen de döngünün içindesin

Döngü otonom ama kapalı devre değil. İki müdahale yolun var: `Esc` tuşu
Claude'u anında durdurur, çalışan araç çağrısı iptal edilir; ya da Claude
çalışırken düzeltmeni yazıp `Enter`'a basarsın — mevcut eylem bitince
mesajını okur ve rotasını ona göre ayarlar. Yani ilk prompt'un mükemmel
olması gerekmiyor; yanlış yöne saparsa döngünün ortasında yön verirsin.

Güvenlik tarafında da iki fren var: her dosya düzenlemesinden önce anlık
görüntü alınır (checkpoint), bir şey ters giderse `Esc`'e iki kez basarak
geri sarabilirsin. İzin sistemi de neyin sormadan yapılabileceğini belirler.
Ama dikkat: checkpoint'ler yalnızca dosya değişikliklerini kapsar; veritabanı
veya API gibi dış sistemlere dokunan eylemler geri sarılamaz.

## Özet

Agentic loop; bağlam topla, harekete geç, doğrula üçlüsünün görev bitene
kadar tekrarı. Model düşünür, araçlar yapar, her çıktı bir sonraki kararı
besler — ve sen istediğin an araya girebilirsin. Bu zihinsel modeli
edindikten sonra Claude Code'un davranışları çok daha tahmin edilebilir
hale geliyor.

---

*Sıradaki yazı: [Kullanım İçin En İyi Pratikler]({{ '/blog/kullanim-en-iyi-pratikleri/' | relative_url }})*
