---
layout: post
lang: tr
translation_url: /en/blog/spesifik-prompt-tek-gorev/
title: "Spesifik Prompt, Tek Görev"
date: 2026-07-25
summary: "Yapay zekâdan tutarlı sonuç almanın en ucuz yolu, isteği daraltmak: her prompt tek bir işe odaklansın, hedefi ve sınırları açıkça yazsın, başarının nasıl doğrulanacağını söylesin."
tags: [vibe-coding, prompting, kod-kalitesi]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Spesifik Prompt, Tek Görev"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Araç fark etmeksizin geçerli
> bir prompting alışkanlığına bakıyoruz: geniş, muğlak istekler yerine dar,
> tek görevli istekler yazmak.

Vibe coding'de sonucun kalitesini belirleyen şey çoğu zaman modelin zekâsı
değil, isteğin netliğidir. Muğlak bir prompt verdiğinizde model eksik kalan
kısımları kendi tahminiyle doldurur — ve o tahmin genelde sizin istediğiniz
şey değildir. Bunun panzehiri basit: her prompt tek bir işe odaklansın.

## "Tüm sayfayı yap" tuzağı

En yaygın hata, projenin tamamını tek bir isteğe sığdırmaya çalışmaktır.
Fatura takibi projesinde şöyle bir prompt düşünün:

```text
Faturalara doğrulama, hata yönetimi ve bildirim ekle,
bir de raporlama sayfası yap.
```

Model bunu memnuniyetle kabul eder ve birçok dosyaya yayılan kocaman bir
değişiklik üretir. Sorun şu: içinden bir şey yanlış çıktığında hangi adımın
bozduğunu bulmak neredeyse imkânsızdır. Diff o kadar büyüktür ki dikkatlice
incelemek yerine "kabul et" deyip geçersiniz — ki bu da vibe coding'in asıl
riskidir.

Bunun yerine işi bölün. Önce sadece doğrulama:

```text
Sadece POST /api/invoices ucuna girdi doğrulaması ekle.
Yalnızca src/routes/invoices.ts ve src/validators/ altını değiştir.
Başka bir şeye dokunma. Önce yaklaşımını anlat, onay bekle.
```

Tek bir dosya çifti, tek bir sorumluluk, incelenebilir bir diff. Bir sonraki
işe ancak bu adımı doğruladıktan sonra geçersiniz. Bu, modelle adım adım
eşli programlama (pair programming) yapmaya benzer; her turda kontrol sizde
kalır.

## İyi bir isteğin üç parçası

Odaklı bir prompt üç şeyi barındırır: bir **hedef**, bir **sınırlar** listesi
ve **başarının nasıl doğrulanacağı**. Fatura projesinden somut bir örnek:

```text
Hedef: POST /api/invoices ucuna girdi doğrulaması ekle.

Sınırlar:
- Proje kurallarına (CLAUDE.md) uy
- Sadece src/routes/invoices.ts ve src/validators/ değişsin
- src/auth/ altına dokunma
- Yeni bağımlılık ekleme

Adımlar:
1. Yaklaşımını anlat ve düzenleyeceğin dosyaları listele
2. Onayımı bekle
3. Uygula
4. Şunu çalıştır: npm run test
5. Özetle: ne değişti, riski ne, nasıl geri alınır
```

"Sınırlar" bölümü, isteğin en değerli kısmıdır. `src/auth/ altına dokunma`
gibi bir satır, modelin kimlik doğrulama koduna "iyi niyetle" el atmasını
baştan engeller. Doğrulama adımı ise (`npm run test`) sonucu kabul etmeden
önce koddan somut bir geri bildirim almanızı sağlar.

## Neden daha küçük her zaman daha ucuz?

Geniş prompt ilk bakışta zaman kazandırıyormuş gibi durur — tek seferde çok
iş biter. Ama istemediğiniz değişiklikleri incelemek, hataları ayıklamak ve
token yakmak, kazandığınız zamanı fazlasıyla geri alır. Dar prompt'ların
faturası ise baştan bellidir: küçük diff, hızlı inceleme, kolay geri alma.

Bu prensip araca bağlı değil. Claude Code, Cursor, Copilot, Codex ya da
Gemini CLI — hangisini kullanırsanız kullanın, dar ve sınırlı bir istek her
zaman geniş ve muğlak bir istekten daha tutarlı sonuç verir. Araçlar
değişir, bu alışkanlık kalır.

Eski seride bu fikrin daha genel hâline, yapay zekâya "doğrulanabilir iş"
verme prensibine değinmiştik:
[Kullanım İçin En İyi Pratikler]({{ '/blog/kullanim-en-iyi-pratikleri/' | relative_url }}).
Buradaki tek görev kuralı, o prensibin prompt seviyesindeki karşılığı.

Sıradaki yazı: [Ne Yapmamasını da Söyle: Negatif Talimatlar ve Rol Verme]({{ '/blog/negatif-talimatlar-ve-rol/' | relative_url }})
