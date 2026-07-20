---
layout: post
lang: tr
translation_url: /en/blog/tools-araclar/
title: "Tools (Araçlar): Claude Code'un Elleri ve Gözleri"
date: 2026-06-18
summary: "Bir ajanı 'ajan' yapan şey araçları. Claude Code'un dosya okuyan, yazan ve komut çalıştıran araçları nasıl çalışıyor, hangileri izin istiyor ve neden bu ayrım önemli?"
tags: [claude-code, tools, temeller]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Tools (Araçlar)"
---

> "Claude Code Yolculuğu" serisinin Temeller bölümünden devam ediyoruz. Geçen
> yazıda [Skills]({{ '/blog/skills-genel-bakis/' | relative_url }})'e genel bir
> bakış atmıştık; bu sefer daha da temele iniyoruz: ajanın dünyayla temas ettiği
> yere, yani **araçlara**.

Serinin başında "bir kodlama ajanı okur, yazar, çalıştırır ve düzeltir" demiştim.
Peki bunu *neyle* yapıyor? Cevap: tools, yani araçlar. Araçlar olmadan Claude
sadece metin üreten bir model olurdu. Araçlarla birlikte dosyana dokunabilen,
terminalini kullanabilen bir ajana dönüşüyor.

## Araç tam olarak ne?

Claude Code'un yerleşik bir araç seti var. Her aracın bir adı var ve bu adlar
gelişigüzel değil — izin kurallarında, hook'larda ve subagent tanımlarında
birebir bu isimleri kullanıyorsun. Yani `Read`, `Bash`, `Edit` gibi isimler
hem Claude'un kullandığı yetenekler hem de senin yapılandırma anahtarların.

Günlük kullanımda bu isimleri elle yazman gerekmiyor; ne zaman hangi aracı
kullanacağına çoğunlukla Claude karar veriyor. Ama perde arkasında ne döndüğünü
bilmek, aracın davranışını ve sınırlarını anlamana yardımcı oluyor.

## Temel araçlar

Birkaç tanesi neredeyse her oturumda devreye giriyor:

- **Read:** Dosya içeriğini satır numaralarıyla okur. Sadece dosya okur,
  klasör değil (klasör listelemek için `ls` komutunu Bash üzerinden çağırır).
  Üstelik düz metnin ötesine geçer: görselleri *görür*, PDF'leri ve Jupyter
  defterlerini okuyabilir.
- **Glob:** İsim kalıbına göre dosya bulur — örneğin `src/**/*.ts`.
- **Grep:** Dosya *içinde* desen arar. POSIX grep değil, ripgrep tabanlıdır;
  yani regex söz dizimi biraz farklı (Go'da `interface{}` aramak için kalıp
  `interface\{\}` olur).
- **Bash:** Terminal komutlarını çalıştırır. Her komut ayrı bir süreçte koşar
  — yani bir komutta `export` ettiğin değişken sonraki komuta *taşınmaz*
  (`cd` ile değiştirdiğin çalışma dizini ise, proje dizini içinde kaldığın
  sürece taşınır). Uzun işler için zaman aşımı ayarlanabilir ve komutları
  arka planda çalıştırabilirsin.
- **Edit:** Dosyada hedefli değişiklik yapar.
- **Write:** Dosya oluşturur veya baştan yazar.

Bunların dışında MCP ile bağlanan araçlar, web'e erişen `WebFetch`/`WebSearch`,
alt görevleri yürüten `Task` (subagent) ve Jupyter defterlerini düzenleyen
`NotebookEdit` gibi pek çok araç daha var. Araç setin sağlayıcına, platformuna
ve ayarlarına göre değişebiliyor.

## Asıl önemli ayrım: izin gerektiren araçlar

Araçlara baktığında göze çarpan bir sütun var: "izin gerekli mi?". Bu, ajanla
güvenli çalışmanın kalbinde duran ayrım.

Bilgiyi sadece *okuyan* araçlar — `Read`, `Glob`, `Grep` — izin istemeden çalışır.
Çünkü en kötü ihtimalle bir şeyi görmüş olurlar, değiştirmezler. Ama dünyayı
*değiştiren* araçlar — `Bash`, `Edit`, `Write`, `WebFetch` — varsayılan olarak
sana sorar. Mantık basit: ajan dosyanı silmeden ya da komut çalıştırmadan önce
onayını alsın.

Edit'in ek bir güvenlik kuralı daha var ve bu hem mantıklı hem öğretici:
**bir dosyayı düzenlemeden önce Claude onu o oturumda okumuş olmalı.** Yani
körlemesine değişiklik yapamaz; neyi değiştirdiğini görmüş olması gerekir.

## Aracı kısıtlamak

Bir aracı tamamen kapatmak istersen, izin ayarlarındaki `deny` listesine adını
eklemen yeterli. Daha ince ayar da mümkün; örneğin sadece belirli komutlara
ya da belirli klasörlere izin verebilirsin:

```text
Bash(npm run *)
Read(~/secrets/**)
Edit(/src/**)
```

Hangi araçların yüklü olduğunu merak ediyorsan, en kolay yol Claude'a
doğrudan sormak:

```text
Hangi araçlara erişimin var?
```

## Özet

Araçlar, bir dil modelini ajana dönüştüren şey. Claude Code okuyan araçları
(Read, Glob, Grep) serbestçe kullanır; değiştiren araçları (Bash, Edit, Write)
ise sana sorarak. Bu okuma/yazma ayrımını anlamak, hem ajana neden güvenebildiğini
hem de nerede frene basman gerektiğini anlamanın anahtarı. Araçlar ajanın elleriyse,
bir sonraki konu onun hafızası: bağlam.

---

*Sıradaki yazı: [Context (Bağlam) Yönetimi]({{ '/blog/context-baglam/' | relative_url }})*