---
layout: post
lang: tr
translation_url: /en/blog/prompt-caching/
title: "Prompt Caching (Önbellekleme)"
date: 2026-06-27
summary: "Claude Code her turda tüm geçmişi yeniden işlemez; değişmeyen kısmı önbellekten okur. Önbelleği neyin bozduğunu, neyin koruduğunu ve TTL'i nasıl ayarlayacağını görelim."
tags: [claude-code, prompt-caching, maliyet]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Prompt Caching (Önbellekleme)"
---

> "Claude Code Yolculuğu" serisinin Maliyet bölümünde devam ediyoruz. Bir önceki
> yazıda [düşünme modları ve effort]({{ '/blog/thinking-modes-effort/' | relative_url }})
> ile modelin ne kadar düşüneceğini ayarlamıştık; bu sefer maliyetin daha sessiz
> ama belki daha etkili tarafına, **prompt caching**'e (istem önbellekleme)
> bakıyoruz.

Model her istek arasında hiçbir şey hatırlamaz. Bu yüzden Claude Code, her
turda bağlamın tamamını tekrar gönderir: sistem istemi, projenin bağlamı, önceki
tüm mesajlar ve araç çıktıları, bir de senin yeni mesajın. Önbellekleme olmasaydı
API bu yığını her seferinde baştan işlerdi. Prompt caching tam da bunu engeller:
değişmeyen kısmı yeniden işlemek yerine, daha önce işlediği halinden okur.

İyi haber şu: Claude Code bunu sen kapatmadıkça otomatik yönetir. Yine de nasıl
çalıştığını bilmek işe yarıyor, çünkü bazı eylemler önbelleği geçersiz kılıp bir
sonraki turu yavaşlatıyor ve pahalılaştırıyor.

## Önbellek nasıl düzenlenir

API, her isteğin **başını** (prefix, ön ek) yakın zamanda işlediği içerikle
eşleştirir. Eşleşme birebirdir: ön ekte herhangi bir yerde bir değişiklik olursa,
o noktadan sonrası baştan hesaplanır. Dosya başına ya da parça başına önbellek
yoktur. Bu yüzden Claude Code, nadiren değişen içeriği başa koyar:

- **Sistem istemi** — çekirdek talimatlar, araç tanımları, output style. Bir MCP
  sunucusu bağlanıp koptuğunda ya da Claude Code güncellendiğinde değişir.
- **Proje bağlamı** — CLAUDE.md, otomatik bellek. Oturum başında veya `/clear`,
  `/compact` sonrası yenilenir.
- **Konuşma** — senin mesajların, Claude'un yanıtları, araç çıktıları. Her tur
  değişir.

Konuşma katmanındaki bir değişiklik üstteki iki katmanı önbellekte bırakır. Ama
sistem istemindeki bir değişiklik her şeyi geçersiz kılar, çünkü sonraki her şey
artık farklı bir ön ekin arkasına düşer.

## Önbelleği bozan şeyler

Birkaçı tek seferlik yavaş bir tura mal olur, sonra yeni ön ek önbelleğe alınır.
Çoğu, bilince iş ortasında kaçınılabilir şeyler:

- **Model değiştirmek** — `/model` ile model değiştirince, içerik aynı olsa bile
  tüm geçmiş önbelleksiz okunur; her modelin kendi önbelleği vardır.
- **MCP sunucusu bağlanıp kopması** — araç tanımları sistem istemindedir, bu yüzden
  araç kümesi değişince önbellek bozulur.
- **`/compact`** — mesaj geçmişini bir özetle değiştirir, yani konuşma katmanını
  bilerek geçersiz kılar.
- **Claude Code'u güncellemek** — yeni sürüm genelde sistem istemini değiştirir.

Bir ayrıntı: effort seviyesi önbellek anahtarının parçası değildir, dolayısıyla
onu iş ortasında değiştirmenin önbelleğe etkisi yoktur. Yani önceki yazıdaki
düşünme ayarını gönül rahatlığıyla değiştirebilirsin.

## Önbelleği koruyan şeyler

Bunlar ya konuşmanın sonuna eklenir ya da isteğe hiç dokunmaz: dosya düzenlemek,
skill ve komut çağırmak (talimatlarını mesaj olarak ekler), `/recap`, `/rewind`
ve bir subagent (alt ajan) başlatmak. Dikkat çekici olan: CLAUDE.md'yi veya output
style'ı iş ortasında düzenlemek önbelleği bozmaz — ama değişiklik de uygulanmaz.
Yeni içerik bir sonraki `/clear`, `/compact` ya da yeniden başlatmada yüklenir.

## Ne kadar yaşıyor: TTL

Önbellek, bir süre işlem olmazsa silinir. İki seçenek var: beş dakikalık ve bir
saatlik TTL (time-to-live, yaşam süresi). Claude Code seçimi kimliğine göre yapar.
Claude aboneliğindeysen bir saatliği otomatik ister; kullanım planına dahil olduğu
için ekstra maliyeti yoktur. API anahtarı kullanıyorsan varsayılan beş dakikadır,
bir saatliğe geçmek için:

```bash
export ENABLE_PROMPT_CACHING_1H=1
```

Hata ayıklarken beş dakikaya zorlamak istersen `FORCE_PROMPT_CACHING_5M=1`,
önbelleği tamamen kapatmak istersen `DISABLE_PROMPT_CACHING=1` kullanabilirsin.

## Performansı görmek

API her yanıtta iki sayı döndürür: bu turda önbelleğe yazılan token'lar
(`cache_creation_input_tokens`) ve önbellekten okunan token'lar
(`cache_read_input_tokens`). Okumalar standart girdi ücretinin kabaca %10'una
gelir, yani okuma oranı yüksekse iyi gidiyorsun demektir. Bunları canlı izlemenin
en pratik yolu, `current_usage` nesnesini okuyan bir statusline betiğidir. Tur
tur "creation" yüksek kalıyorsa, ön ekinde bir şey sürekli değişiyordur.

## Özet

Pratik kural basit: modelini seç ve MCP sunucularını oturumun başında bağla,
`/compact`'i ise işler arası doğal molalara sakla. İş ortasında ne kadar az şey
değiştirirsen önbellek o kadar sıcak kalır — bu da hem hız hem maliyet demek.

---

*Sıradaki yazı: Bağlamı Yönetmek: /compact ve /clear*
