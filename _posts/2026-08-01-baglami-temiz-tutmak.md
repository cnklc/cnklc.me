---
layout: post
lang: tr
translation_url: /en/blog/baglami-temiz-tutmak/
title: "Bağlamı Temiz Tutmak: Yeni Oturum, Subagent, Uzun Bağlam"
date: 2026-08-01
summary: "Bağlam penceresi vibe coding'in asıl kısıtı. Doldukça kalite düşüyor. Bunu yönetmenin üç yolu var: sıfırlamak, özetlemek ve keşfi başka bir pencereye taşımak."
tags: [vibe-coding, baglam, oturum-yonetimi]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Bağlamı Temiz Tutmak: Yeni Oturum, Subagent, Uzun Bağlam"
---

> "Vibe Coding Yolculuğu" serisinin bir parçası. Geçen yazıda projenin bağlam
> dokümanını güncel tutmayı konuşmuştuk. Bu sefer konu oturum içinde biriken
> bağlam: onu ne zaman sıfırlamak, ne zaman özetlemek, ne zaman başka bir
> pencereye taşımak gerekiyor.

Claude Code'un resmi en iyi pratikler rehberi, kendi tavsiyelerinin çoğunu tek
bir kısıta bağlıyor: bağlam penceresi hızla dolar ve doldukça performans düşer.
Konuşmadaki her mesaj, okunan her dosya, çalıştırılan her komutun çıktısı aynı
pencerede duruyor. Pencere şiştikçe model erken verdiğiniz talimatları
"unutmaya" ve daha çok hata yapmaya başlıyor. Bağlamın ne olduğuna
[Context (Bağlam) Yönetimi]({{ '/blog/context-baglam/' | relative_url }})
yazısında değinmiştik; buradaki soru onu oturum boyunca nasıl temiz tutacağınız.

## Bir oturum, bir iş

En sık görülen hata, tek bir uzun oturumda birbiriyle ilgisiz işler yapmak.
Fatura takibi projesinde PDF çıktısı üzerinde çalışırken araya "şu tarih
biçimlendirme hatasına da bakalım" diye girdiğinizde, sonraki isteklerinizin
hepsi PDF konuşmasının izlerini taşımaya devam eder. Model önceki dosyalara
referans verir, önceki kalıpları tekrarlar; çıktı ilk bakışta doğru görünür ama
yanlış varsayımlar taşır.

Pratik kural: bir iş bitti mi bağlamı sıfırlayın. Claude Code'da `/clear`,
Cursor ve Windsurf gibi editör tabanlı araçlarda yeni bir sohbet açmak aynı işi
görüyor. Sıfırladıktan sonra modelin hiçbir şey hatırlamadığını varsayın ve
hedefi yeniden verin:

```text
Hedef: Fatura listesine tarih aralığı filtresi ekle.
Kısıtlar: CLAUDE.md'ye uy. Sadece src/components/InvoiceList.tsx ve
src/lib/filters.ts değişsin. Yeni bağımlılık yok.
Önce planı öner, kod yazma.
```

Aynı rehberde geçen ikinci bir kural daha var ve pratikte çok işe yarıyor: aynı
konuda modeli ikiden fazla düzelttiyseniz bağlam artık başarısız denemelerle
kirlenmiştir. Düzeltmeye devam etmek yerine sıfırlayın ve öğrendiklerinizi
içeren daha iyi bir prompt yazın.

## Sıfırlamak ile özetlemek aynı şey değil

Bazen devamlılığa ihtiyacınız vardır. O zaman sıfırlamak yerine özetlemek
gerekir. Claude Code bağlam sınırına yaklaşınca konuşmayı otomatik olarak
sıkıştırıyor; elle tetiklemek isterseniz `/compact` komutuna neye odaklanacağını
da söyleyebilirsiniz:

```text
/compact Fatura PDF çıktısındaki değişikliklere odaklan
```

Gemini CLI'da karşılığı `/compress`: sohbet bağlamını bir özetle değiştiriyor.
Burada araç isimlerine dikkat etmek gerekiyor — Gemini CLI'da `/clear` bağlamı
değil terminal ekranını temizler, bu iki araçta aynı komut adı aynı şeyi
yapmıyor. Komutların ayrıntısına
[Bağlamı Yönetmek: /compact ve /clear]({{ '/blog/baglam-yonetimi-compact-clear/' | relative_url }})
yazısında girmiştik.

Özetlemenin dürüst bir maliyeti var: özet kayıplıdır. Sıkıştırma sonrası çıkan
metni okuyun; eksik ya da yanlış aktarılmış bir karar varsa devam etmeden önce
düzeltin.

## Keşfi ana oturuma sokmayın

Bağlamı en hızlı dolduran şey araştırmadır. "Şu akış nasıl çalışıyor" diye
sorduğunuzda ajan onlarca dosya okur ve hepsi pencerenizde kalır. Subagent'lar
tam da bunun için: ayrı bir bağlam penceresinde çalışıp yalnızca özeti ana
konuşmaya döndürüyorlar.

```text
Fatura durum geçişlerinin nerede yönetildiğini bir subagent ile araştır.
Sadece ilgili dosya yollarını ve mevcut geçiş kurallarını özetle.
```

Aynı mantık doğrulama için de geçerli: kodu yazan oturumun kendi çıktısını
denetlemesi yerine, diff'i taze bir bağlamda inceleyen ayrı bir subagent daha
tarafsız çalışır. Bu konuya
[Subagents ve Ajan Takımları]({{ '/blog/subagents-ajan-takimlari/' | relative_url }})
yazısında girmiştik.

## Büyük pencere, sorunu çözmüyor

Bağlam pencereleri büyüdükçe "artık temizliğe gerek yok" hissi oluşuyor. Kısıt
pencerenin boyutu değil, doluluk oranıyla birlikte düşen kalite. Büyük pencere
size daha çok alan verir; alanı gürültüyle doldurmama sorumluluğunu almaz.

Bunun tersi de doğru: her şeyi sürekli sıfırlamak da bir maliyet. Tek bir
karmaşık problemin derinindeyseniz geçmiş konuşma değerlidir ve orada bağlamı
biriktirmek doğru karardır. Kural şu değil: "sık sık temizle". Kural şu: oturumda
duran her şeyin şu anki iş için bir sebebi olsun.

Sıradaki yazı: [Yapay Zekâ ile Hata Ayıklama: Anlamadan Kabul Etme]({{ '/blog/ai-ile-hata-ayiklama/' | relative_url }})
