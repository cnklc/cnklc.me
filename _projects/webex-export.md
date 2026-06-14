---
layout: project
lang: tr
translation_url: /en/projects/webex-export/
title: "Webex Export — Mesaj Arşivleme Aracı"
date: 2026-06-14
summary: "Webex konuşmalarını ve eklerini tarayıcı üzerinden indirip ZIP olarak arşivleyen, modern arayüzlü bir web uygulaması."
tech: [React, TypeScript, Vite, Framer Motion, JSZip, Lucide]
repo: "https://github.com/cnklc/Webex-export"
demo: ""
---

## Proje Hakkında

Webex Export, Webex konuşmalarını yedeklemek ve arşivlemek için geliştirilmiş,
sunucusuz (client-side) çalışan bir React uygulamasıdır. Kullanıcı, Webex
Kişisel Erişim Token'ı ile bağlanır; uygulama Webex REST API'sini kullanarak
alanları (rooms) listeler, seçilen konuşmanın tüm mesajlarını ve dosya eklerini
sayfalı olarak çeker ve düzenli bir ZIP arşivi oluşturur.

API hız sınırlarına (429) karşı otomatik bekleme/yeniden deneme mantığı, büyük
arşivler için kademeli ilerleme takibi ve dosya adı çakışmalarına karşı koruma
içerir. Ayrıca daha önce dışa aktarılmış JSON arşivleri içe aktarılarak tarih
gruplamalı, aramalı ve "kendi mesajını vurgulama" özellikli bir sohbet
görüntüleyicide yeniden incelenebilir.

Gizlilik öncelikli tasarımı sayesinde token ve veriler yalnızca tarayıcıda
işlenir, hiçbir aracı sunucuya gönderilmez.

## Öne Çıkan Özellikler

- 🔑 Token ile doğrudan Webex API entegrasyonu
- 📦 Mesaj + ek dosyaların yapılandırılmış ZIP olarak indirilmesi
- ⏳ Otomatik hız-sınırı (429) yönetimi ve yeniden deneme
- 💬 JSON arşiv içe aktarma ve sohbet benzeri görüntüleyici
- 🔍 Tarihe göre gruplama, arama ve kendi mesajını vurgulama
- ✨ Glassmorphism arayüz ve Framer Motion animasyonları
- 🔒 %100 istemci tarafı — gizlilik odaklı

## Kullanılan Teknolojiler

**React**, **TypeScript** ve **Vite** üzerine kurulu; animasyonlar için
**Framer Motion**, ZIP arşivleme için **JSZip**, ikonlar için **Lucide**
kullanıldı.
