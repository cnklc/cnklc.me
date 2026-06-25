---
layout: post
lang: tr
translation_url: /en/blog/claude-fiyatlandirma/
title: "Claude Fiyatlandırmasını Anlamak"
date: 2026-06-25
summary: "Claude Code'un ayrı bir fiyat etiketi yok; ya aboneliğinden ya da API token tüketiminden ödüyorsun. Maliyet nereden geliyor, ne kadar tutuyor ve nasıl takip edip düşürürsün?"
tags: [claude-code, maliyet, fiyatlandirma]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Claude Fiyatlandırmasını Anlamak"
---

> "Claude Code Yolculuğu" serisinde yeni bir bölüm başlıyor: Maliyet. Önceki yazıda
> [Git worktrees ile paralel çalışmaya]({{ '/blog/git-worktrees/' | relative_url }})
> bakmıştık; şimdi her gün kullandığın bu aracın faturasını çıkaran şeye, yani
> fiyatlandırmaya geçiyoruz.

Claude Code'un kendine ait bir fiyat etiketi yok. Terminalinde çalışan bir araç
ve arka planda modeli çağırıyor; dolayısıyla maliyet de oradan, yani **işlenen
token'lardan** doğuyor. Bunu nasıl ödediğin ise iki şıktan birine bağlı.

## Maliyet nereden geliyor?

İki ödeme yolu var. İlki **abonelik**: Pro, Max, Team veya Enterprise planlarından
biriyle giriş yaparsan kullanımın aboneliğine dahil olur, ayrı token faturası
görmezsin. İkincisi **API kullanımı**: doğrudan Claude API hesabınla bağlanırsan
tükettiğin token kadar ödersin. Bu iki yaklaşımın artılarını ve eksilerini
serinin başında [abonelik mi API mı]({{ '/blog/subscription-vs-api/' | relative_url }})
yazısında ayrıntılı konuşmuştuk; burada odak, sayılarda ve harcamayı yönetmekte.

Aklında tutman gereken temel kural şu: maliyet bağlam (context) boyutuyla doğru
orantılı. Claude ne kadar çok context işlerse, o kadar çok token harcarsın. Bu
basit cümle, aşağıdaki tasarruf yöntemlerinin neredeyse tamamının arkasındaki
mantık.

## Ne kadar tutuyor?

Resmi dokümandaki kurumsal kullanım verilerine göre ortalama maliyet geliştirici
başına aktif günde **yaklaşık 13 dolar**, ayda **150–250 dolar** aralığında.
Kullanıcıların %90'ı için aktif gün maliyeti 30 doların altında kalıyor. Bunlar
ortalama; gerçek rakam seçtiğin modele, kod tabanının büyüklüğüne ve aynı anda kaç
oturum çalıştırdığına göre ciddi şekilde değişiyor. Doküman da bu yüzden, geniş
çapta yaymadan önce küçük bir pilot grupla başlayıp bir taban değer ölçmeyi
öneriyor.

## Harcamanı görmek: `/usage`

Tahmin yürütmek yerine doğrudan ölçebilirsin. Oturum içinde:

```text
/usage
```

verdiğinde mevcut oturumun token istatistiklerini görürsün. API kullanıcısıysan en
üstteki blok kabaca şöyle bir özet sunar:

```text
Total cost:            $0.55
Total duration (API):  6m 19.7s
Total code changes:    0 lines added, 0 lines removed
```

Buradaki dolar rakamı, token sayılarından yerel olarak hesaplanan bir **tahmin**;
kesin fatura için Console'daki kullanım sayfası esas alınır. Pro, Max, Team veya
Enterprise planındaysan aynı ekran ayrıca kullanımının plan limitlerine göre
dökümünü de gösterir — skill'lere, subagent'lara, plugin'lere ve MCP sunucularına
ne kadar harcadığını yüzdelerle ayırır. `d` ve `w` tuşlarıyla son 24 saat ile son
7 gün arasında geçiş yapabilirsin.

Pro ve Max planlarında aylık bir harcama tavanı da koyabilirsin:

```text
/usage-credits
```

Limite ulaşıp hâlâ kredin varsa Claude Code CLI'dan çıkmadan limiti yükseltmeni
veya kaldırmanı ister.

## Maliyeti düşürmenin yolları

Madem maliyet context'le orantılı, asıl iş context'i küçük tutmak. En pratik
birkaç alışkanlık:

İşler arası geçişte **`/clear`** ile temiz başla; eski context her mesajda boşuna
token yakar. Uzun oturumlarda **`/compact`** geçmişi özetler ve neye odaklanacağını
söyleyebilirsin:

```text
/compact kod örneklerine ve API kullanımına odaklan
```

**Model seçimi** belki de en büyük kaldıraç. Sonnet çoğu kodlama işini iyi
görür ve Opus'tan ucuzdur; Opus'u karmaşık mimari kararlara sakla. Oturum
ortasında değiştirmek için:

```text
/model
```

Karmaşık görevlerde **plan modu** (Shift+Tab) yanlış yöne gidip pahalı bir baştan
yazmayı önler. Basit işlerde derin düşünmeye ihtiyaç yoksa `/effort` ile düşünme
seviyesini düşürebilirsin; düşünme token'ları çıktı token'ı olarak faturalandığı
için bu fark eder. Neyin context yediğini görmek istersen `/context`, hangi MCP
sunucularının açık olduğunu görmek için `/mcp` işini görür.

## Özet

Claude Code'un ayrı bir ücreti yok: ya aboneliğinden ya da API token tüketiminden
ödüyorsun ve maliyet işlenen context'le doğru orantılı. `/usage` ile harcamanı
ölçer, `/clear`, `/compact`, doğru model seçimi ve plan modu gibi alışkanlıklarla
düşürürsün.

---

*Sıradaki yazı: Thinking Modes & Effort (Düşünme Modları)*
