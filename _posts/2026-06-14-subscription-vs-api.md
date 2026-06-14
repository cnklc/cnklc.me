---
layout: post
lang: tr
translation_url: /en/blog/subscription-vs-api/
title: "Abonelik mi, API Kullanımı mı?"
date: 2026-06-14
summary: "Claude Code'u aylık abonelikle mi yoksa API anahtarıyla mı kullanmalı? İkisinin faturalama mantığı, farkları ve hangi durumda hangisinin daha mantıklı olduğu."
tags: [claude-code, pricing, baslangic]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Abonelik mi, API Kullanımı mı?"
---

> "Claude Code Yolculuğu" serisinin dördüncü durağı. Önceki yazıda
> [Claude CLI'a giriş]({{ '/blog/claude-cli-tanitim/' | relative_url }})
> yapmıştık; şimdi onu ilk kez açtığında karşına çıkan o pratik soruya
> geliyoruz: bunun parasını nasıl ödeyeceğim?

Claude Code'u kurup ilk kez `claude` yazdığında seni bir giriş ekranı
karşılıyor. Burada iki temel yol var: ya bir **Claude aboneliğiyle** giriş
yapıyorsun, ya da bir **API anahtarıyla** bağlanıyorsun. İkisi de aynı aracı
çalıştırıyor ama faturalama mantıkları tamamen farklı. Bu yazıda ikisini
sade bir dille karşılaştırmak istiyorum, çünkü ben de başta "hangisi bana
uygun?" diye epey düşünmüştüm.

## Abonelik: sabit aylık ücret

İlk yol, claude.ai üzerinden aldığın bir **Pro** ya da **Max** aboneliğiyle
giriş yapmak. Mantığı basit: sabit bir aylık ücret ödüyorsun ve karşılığında
belirli kullanım limitleri içinde Claude Code'u (ve aynı zamanda claude.ai
sohbetini) kullanıyorsun.

- **Pro** (aylık ~20 USD): bireysel, günlük kullanım için giriş seviyesi.
  Terminal, VS Code, JetBrains ve masaüstü uygulamasında çalışır.
- **Max** (aylık ~100 ve ~200 USD'lik iki kademe): Pro limitlerine sürekli
  takılanlar için. Daha geniş kullanım pencereleri sunar.

Buradaki kullanım, belirli zaman pencerelerine (örneğin beş saatlik oturumlar)
ve haftalık üst sınırlara göre ölçülüyor; tek tek token saymıyorsun. İşin
güzel yanı bu: faturanın ne geleceğini ay başında biliyorsun, sürpriz yok.

## API: kullandığın kadar öde

İkinci yol, [Anthropic Console](https://console.anthropic.com/) üzerinden bir
API anahtarı alıp Claude Code'a o anahtarı tanıtmak. Burada sabit ücret yok;
**token başına** ödüyorsun. Yani modele gönderdiğin metin (girdi) ve modelin
ürettiği metin (çıktı) milyon token üzerinden ücretlendiriliyor ve her model
için fiyat farklı (Opus en pahalı, Haiku en ucuz katman).

```bash
# API anahtarını ortam değişkeni olarak tanıtmak
export ANTHROPIC_API_KEY="sk-ant-..."
claude
```

Bu modelin avantajı esneklik: ayda bir kez kullansan bir kez, yoğun kullansan
yoğun ödüyorsun, aylık bir taban ücret yok. Dezavantajı ise öngörülebilirliğin
azalması — çok iş yaptırdığın bir günde fatura hızla büyüyebilir.

## Peki hangisi?

Kesin bir cevap yok, ama basit bir sezgi şu: **düzenli ve interaktif**
kullanıyorsan abonelik genelde daha hesaplı ve kafa rahatlatıcı oluyor. Her
gün birkaç saat terminalde Claude ile çalışıyorsan, sabit aylık ücret token
başına ödemekten çoğu zaman daha ucuza geliyor.

API ise şu durumlarda parlıyor: çok seyrek kullanıyorsan (aylık taban ücrete
değmiyorsa), ya da tam tersi, otomasyon/CI gibi **programatik** işler
yapıyorsan. Aslında yaygın bir kalıp ikisini birden kullanmak: günlük elle
çalışma için bir abonelik, arka planda dönen otomasyonlar için bir API
anahtarı.

Benim tavsiyem: küçük başla. Önce bir Pro aboneliğiyle dene, limitlere sürekli
takıldığını hissedersen Max'e ya da API'ye geç. Gerçek kullanımını görmeden
en pahalı planı almanın anlamı yok.

## Özet

Abonelik (Pro/Max) sabit aylık ücretle, belirli limitler içinde rahat
kullanım sunar; öngörülebilir ve interaktif iş için idealdir. API ise token
başına esnek ödeme sağlar; seyrek veya otomasyon ağırlıklı kullanımda mantıklı.
İkisi aynı aracı çalıştırır — fark sadece nasıl ödediğindedir. Bir sonraki
yazıda, parayı bir kenara bırakıp Claude'u kullanmanın farklı yollarına
bakacağız.

---

*Sıradaki yazı: Claude'u Kullanmanın Yolları*
