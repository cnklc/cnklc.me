---
layout: post
lang: tr
translation_url: /en/blog/populer-stack-secmek/
title: "Popüler Teknoloji Yığını Seçmek: Neden Niş Değil?"
date: 2026-07-20
summary: "Yapay zekâ, eğitim verisinde en çok gördüğü teknolojilerde en iyi kodu üretir. Vibe coding yaparken stack seçiminin neden 'sıkıcı ve yaygın'dan yana yapılması gerektiği üzerine — serinin projesinden gerçek bir örnekle."
tags: [vibe-coding, teknoloji-secimi, yapay-zeka]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Popüler Teknoloji Yığını Seçmek: Neden Niş Değil?"
---

> "Vibe Coding Yolculuğu" serisinin altıncı yazısı. Planlama bölümünü bitirdik;
> şimdi kod ve standartlara geçiyoruz. İlk soru: hangi teknolojilerle
> çalışacaksın?

Kendi başına kod yazarken teknoloji seçimi büyük ölçüde zevk meselesidir.
Vibe coding yaparken ise denkleme yeni bir faktör girer: modelin o teknolojiyi
ne kadar iyi bildiği. Bu yüzden serinin bu durağındaki tavsiye kulağa sıkıcı
gelecek — popüler ve yaygın olanı seç, niş olandan uzak dur.

## Model neyi iyi bilir?

Büyük dil modelleri, herkese açık kod üzerinde eğitilir. Bir framework ne kadar
yaygınsa eğitim verisinde o kadar çok örneği vardır: resmî dokümanlar, açık
kaynak projeler, Stack Overflow cevapları, blog yazıları. React, Python,
PostgreSQL gibi teknolojilerde model milyonlarca örnek görmüştür; senin
istediğin şeyi daha önce binlerce kez yazılmış hâliyle üretir.

Niş ya da çok yeni bir framework'te ise bu örnek havuzu incecik kalır. Model
yine de cevap verir — ama boşlukları tahminle doldurur.

Serinin fatura takibi projesi de bu ilkenin sessiz bir örneği aslında: baştan
beri sade Node.js ve `node:test` gibi yerleşik, "sıkıcı" araçlarla ilerliyoruz.
Beş yazıdır ajanların ürettiği kodda uydurulmuş tek bir API çağrısına
rastlamadık — bu bir tesadüf değil, zemin seçiminin sonucu.

## Niş seçimin bedeli

Bu tahminler pratikte üç şekilde acıtır. Birincisi, model var olmayan API'ler
uydurur: fonksiyon adları, parametreler, konfigürasyon anahtarları makul
görünür ama gerçek değildir. İkincisi, sürümleri karıştırır: az örnek gördüğü
bir kütüphanenin eski ve yeni API'lerini aynı dosyada harmanlayabilir.
Üçüncüsü ve en sinsisi: üretilen kodu doğrulamak da zorlaşır. Popüler bir
stack'te hata mesajını aratınca onlarca çözüm bulursun; niş bir stack'te
çoğu zaman yalnızsın.

Bir önceki yazılarda [bahsettiğim araçlardan]({{ '/blog/vibe-coding-araclari/' | relative_url }})
app builder'ların varsayılan olarak hep aynı popüler teknolojileri kurması
tesadüf değil; bu araçları yapanlar da modelin en iyi bildiği zeminde
çalıştığını biliyor.

## Kararsızsan modele sor

Stack seçiminde yapay zekâdan yardım da alabilirsin — yeter ki soruyu doğru
sor. Fatura takibi projemizin planında sıradaki büyük adım bir web arayüzü;
soruyu gerçekten sordum:

```text
Fatura takibi projem bağımlılıksız bir Node.js REST servisi
(bellek-içi depo, node:test ile testler). Şimdi üzerine küçük bir
web arayüzü eklemek istiyorum: fatura listesi, ekleme formu, vade
özeti. Yaygın, iyi dokümante edilmiş ve eğitim verinde iyi temsil
edilen bir teknoloji yığını öner. Niş ya da çok yeni framework
önerme. Her seçim için bir cümlelik gerekçe yaz.
```

Dönen cevap:

```text
- React (Vite ile) — bileşen tabanlı arayüzler için fiili standart;
  devasa topluluk, örnek ve dokümantasyon var.
- Vite — sıfır yapılandırmaya yakın, hızlı geliştirme sunucusu ve
  build aracı; Create React App'in yerini almış olgun seçenek.
- React Router — fatura listesi/detay gibi sayfalar arası geçiş
  için standart yönlendirme kütüphanesi.
- Sade fetch API — REST servisine istek atmak için tarayıcıda
  yerleşik; ekstra bağımlılık gerektirmez.
- CSS Modules ya da düz CSS — küçük arayüz için yeterli; öğrenmesi
  kolay ve her yerde desteklenir.

İstersen React yerine daha da hafif kalmak için sade HTML + vanilla
JavaScript de bu ölçekte fazlasıyla iş görür; ama büyümeyi
düşünüyorsan React güvenli tercihtir.
```

Listede tek bir sürpriz yok — ve mesele de tam bu. "En havalı" değil "en iyi
bildiğin" teknolojiyi istemek, bu prompt'un bütün numarası. Cevabın sonundaki
uyarı da dikkate değer: bu ölçekte sade HTML + vanilla JavaScript da yeter.
Sıkıcı ve yaygın olanın en ucu, hiç framework kullanmamak.

## Niş stack şartsa

Bazen seçim şansın yoktur: ekip zaten niş bir framework kullanıyordur ya da
problem gerçekten özel bir araç gerektiriyordur. Bu, vibe coding yapamazsın
demek değil; sadece açığı kendin kapatman gerekir. Framework'ün güncel
dokümanını bağlama ver — ilgili sayfaları oturuma yapıştır ya da proje bağlam
dosyasına özet geçir. Kullandığın sürümü de açıkça yaz; model popüler
framework'lerde bile eski API kalıplarına kayabildiği için bu her durumda iyi
bir alışkanlık:

```text
## Stack
- Web framework: <adı ve sürümü>
- Veritabanı: <adı ve sürümü>
- Sürümü belirtilmeyen hiçbir API önerme; emin değilsen sor.
```

Ve niş stack'te üretilen kodu daha da dikkatli incele: modelin uydurma
ihtimalinin en yüksek olduğu yer burasıdır.

## Özet

Vibe coding'de stack seçimi artık sadece senin bildiklerinle ilgili değil,
modelin bildikleriyle de ilgili. Popüler ve "sıkıcı" teknolojiler modele daha
sağlam zemin verir; niş seçimler ise uydurma API ve karışık sürüm riskini
büyütür. Niş şartsa dokümanı bağlama taşı, sürümleri sabitle, incelemeyi
sıkılaştır.

---

*Sıradaki yazı: Standartları Erken Kurmak: İlk Çıktıları Dikkatle İncele*
