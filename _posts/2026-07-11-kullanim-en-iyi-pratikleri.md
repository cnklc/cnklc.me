---
layout: post
lang: tr
translation_url: /en/blog/kullanim-en-iyi-pratikleri/
title: "Kullanım İçin En İyi Pratikler"
date: 2026-07-11
summary: "Claude Code'dan iyi sonuç almanın özü: doğrulanabilir işler ver, önce keşfet sonra kodla, bağlamı agresif yönet ve sık yapılan hatalardan kaçın."
tags: [claude-code, best-practices, verimlilik]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Kullanım İçin En İyi Pratikler"
---

> "Claude Code Yolculuğu" serisinin sondan bir önceki durağındayız. Önceki
> yazıda [agentic loop'u]({{ '/blog/agentic-loop-nedir/' | relative_url }}) anlattım; bu yazıda o döngüden en iyi sonucu almak
> için biriken pratikleri topluyorum.

Resmî en iyi pratikler rehberinin neredeyse tamamı tek bir kısıta dayanıyor:
**bağlam penceresi hızla dolar ve doldukça performans düşer.** Aşağıdaki
pratiklerin çoğu, bu gerçeğin etrafında dönen alışkanlıklar.

## Doğrulayabileceği bir iş ver

Claude, iş "bitmiş göründüğünde" durur. Ona koşturabileceği bir kontrol
vermezsen doğrulama döngüsü sen olursun; her hata senin fark etmeni bekler.
Test, build çıkış kodu, linter, bir ekran görüntüsü karşılaştırması — sinyal
üreten her şey olur. Fark şuraya kadar iniyor:

```text
e-posta doğrulayan bir fonksiyon yaz
```

yerine:

```text
validateEmail fonksiyonunu yaz. Test senaryoları: user@example.com → true,
invalid → false, user@.com → false. Yazdıktan sonra testleri çalıştır.
```

İkincisinde döngü kendi kendine kapanır: Claude yazar, testi koşar, sonucu
okur, geçene kadar yineler. Ayrıca "başardım" demesi yerine kanıt göstermesini
iste — test çıktısı, çalıştırdığı komut, ekran görüntüsü.

## Önce keşfet, sonra planla, sonra kodla

Doğrudan kodlamaya atlayan Claude, bazen yanlış problemi çözer. Önerilen
akış dört fazlı: keşif ([plan modunda]({{ '/blog/plan-mode/' | relative_url }})
dosyaları okut), plan (değişecek dosyaları çıkarttır; planı `Ctrl+G` ile
editöründe açıp elle düzeltebilirsin), uygulama ve commit. Ama dürüst olmak
gerekirse bu her iş için şart değil: değişikliği tek cümleyle tarif
edebiliyorsan (yazım hatası, log satırı) planı atla, doğrudan yaptır.

## Net iste, kaynak göster

"Login bug'ını düzelt" yerine: "Kullanıcılar oturum zaman aşımından sonra
girişin başarısız olduğunu bildiriyor; `src/auth/` içindeki akışa, özellikle
token yenilemeye bak. Önce hatayı üreten başarısız bir test yaz, sonra
düzelt." Dosyaları `@` ile referansla, ekran görüntüsü yapıştır, örnek
pattern göster. Belirsiz prompt'lar keşif için iyidir; iş teslimi içinse
netlik, düzeltme turlarından ucuzdur.

## Bağlamı agresif yönet

Serinin [/compact ve /clear yazısında]({{ '/blog/baglam-yonetimi-compact-clear/' | relative_url }})
mekanikleri görmüştük; pratikteki kural basit: alakasız işler arasında
`/clear` çalıştır. Rehberin altını çizdiği bir eşik var: aynı konuda iki
kereden fazla düzeltme yaptıysan bağlam başarısız denemelerle kirlenmiştir —
`/clear` de ve öğrendiklerini içeren daha iyi bir prompt'la baştan başla.
Temiz oturum + iyi prompt, düzeltme yığılmış uzun oturumu neredeyse her
zaman yener. Araştırma işlerini de
[subagent'lara]({{ '/blog/subagents-ajan-takimlari/' | relative_url }})
devret; onlar kendi bağlamlarında okur, sana özet döner.

## CLAUDE.md'yi budamaktan korkma

Uzun CLAUDE.md, kuralların gürültüde kaybolması demek. Rehberin testi
acımasız: her satır için "bunu silsem Claude hata yapar mı?" diye sor;
cevap hayırsa sil. Claude, dosyada yazan bir kurala rağmen aynı hatayı
yapıyorsa sorun genellikle dosyanın uzunluğudur.

## Sık yapılan hatalar

Rehberdeki isimlendirmeler tanıdık gelecek: her şeyin konuşulduğu "kitchen
sink" oturumu (çare: işler arası `/clear`), üst üste düzeltme sarmalı
(çare: iki denemeden sonra sıfırla), şişmiş CLAUDE.md, doğrulamasız güven
("test edemiyorsan gönderme") ve kapsamsız "araştır" komutuyla yüzlerce
dosya okutup bağlamı doldurmak.

## Özet

Tek cümlelik versiyon: Claude'a kendini doğrulayabileceği, net tarif edilmiş
işler ver ve bağlamı temiz tut. Gerisi bu üçünün türevleri. Rehberin kendi
kapanışı da güzel: bunlar başlangıç noktaları — neyin işe yaradığına dikkat
ettikçe hiçbir rehberin veremeyeceği bir sezgi geliştiriyorsun.

---

*Sıradaki yazı: [Claude Code Güvenliği]({{ '/blog/claude-code-guvenlik/' | relative_url }})*
