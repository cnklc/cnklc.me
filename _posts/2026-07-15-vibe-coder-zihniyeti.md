---
layout: post
lang: tr
translation_url: /en/blog/vibe-coder-zihniyeti/
title: "Vibe Coder Zihniyeti: Kod Yazan Değil, Yöneten Olmak"
date: 2026-07-15
summary: "Vibe coding'de asıl değişen şey araçlar değil, senin rolün. Kodu satır satır yazan kişiden, niyeti tarif edip çıktıyı denetleyen kişiye geçiş nasıl bir zihniyet gerektiriyor? Gerçek bir proje üzerinden."
tags: [vibe-coding, zihniyet, yapay-zeka]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Vibe Coder Zihniyeti"
---

> Bu yazıyla "Vibe Coding Yolculuğu" serisine başlıyoruz. Önceki seride Claude
> Code özelinde ilerlemiştik; bu seri araç-bağımsız — hangi aracı kullanırsan
> kullan geçerli olan pratiklere odaklanacağız. [Vibe coding nedir]({{ '/blog/vibe-coding-nedir/' | relative_url }})
> ve [coding agent nedir]({{ '/blog/coding-agent-nedir/' | relative_url }})
> yazıları bu serinin ön okuması sayılabilir.
>
> Bir de söz: bu serideki örnekler masa başında yazılmadı. Seri boyunca tek bir
> gerçek proje üzerinde çalışacağız — küçük, bağımlılıksız bir Node.js **fatura
> takibi** servisi (bellek-içi fatura kayıtları ve bir `GET /faturalar`
> endpoint'i ile başlıyor). Her yazı projeyi biraz daha büyütecek; gördüğün her
> prompt ve çıktı, yayın öncesi bu proje üzerinde fiilen çalıştırıldı.

Vibe coding'e başlarken öğrenilmesi gereken ilk şey bir komut ya da araç değil,
bir rol değişikliği. Kodu satır satır yazan kişi olmaktan çıkıp, ne istediğini
net tarif eden ve çıktıyı denetleyen kişi oluyorsun. Yapay zekâ kodu yazıyor;
mimari yön, kalite çıtası ve son karar sende kalıyor. Bu ayrım kulağa basit
geliyor ama pratikte çoğu hayal kırıklığının kaynağı tam burası: aracı suçladığımız
durumların önemli kısmı, aslında rolü yanlış üstlenmemizden kaynaklanıyor.

## Kabul et tuşu bir onay değil, bir imza

En yaygın tuzak şu: prompt yaz, üretilen her şeyi kabul et, çalışıyorsa devam et.
Kısa vadede hızlı hissettiriyor; birkaç oturum sonra elinde gözden geçirmesi zor,
stili tutarsız, yer yer güvenlik açığı barındıran bir kod yığını kalıyor. Roadmap.sh'in
best practices rehberindeki benzetme yerinde: yapay zekânın çıktısına, junior bir
geliştiricinin pull request'i gibi davran. Oku, test et, ne değiştiğini ve nedenini
anlamadan birleştirme. "Kabul et" tuşuna basmak pasif bir onay değil; o kodun
sorumluluğunu üstlendiğine dair bir imza.

Bunun doğal sonucu: anlamadığın kodu kabul etme. Üretilen çözüm çalışıyor ama
neden çalıştığını bilmiyorsan, bir sonraki hatada çaresizsin demektir. Açıklama
istemek bu işin ayıbı değil, ta kendisi.

## Tarif etme becerisi yazma becerisinin yerini alıyor

Vibe coding'de kalite, büyük ölçüde niyetini ne kadar iyi tarif ettiğine bağlı.
"Uygulamaya hata yönetimi ekle" gibi açık uçlu bir istek, modelin boşlukları kendi
yorumuyla doldurmasına ve projenin her yerine dokunmasına davetiye çıkarır. Bunun
yerine hedef, kapsam ve sınır belirtmek gerekiyor. Fatura takibi projemizin
sıradaki ihtiyacı üzerinden göstereyim — sisteme yeni fatura ekleyebilmek
istiyoruz. Ajana verdiğim prompt buydu:

```text
Hedef: POST /faturalar endpoint'i ekle — yeni fatura kaydı oluştursun.
Kısıtlar:
- Sadece src/app.js, src/validators/ ve test/ klasörüne dokun
- no, musteri, tutar, vade alanları zorunlu; tutar pozitif sayı olmalı
- Geçerli istek 201 ve oluşan kaydı, geçersiz istek 400 ve alan bazlı
  hata listesi döndürsün
- Mevcut endpoint'lere dokunma
Önce yaklaşımını ve düzenleyeceğin dosyaları listele, onayımı bekle.
```

Model kod yazmadan önce planını gösterdi — birebir şu:

```text
Yaklaşım: POST /faturalar için bağımsız bir validator modülü + app.js'te
yeni bir route. Body'yi JSON okuyup doğrulayacağım; geçerliyse yeni id ile
kaydı depoya ekleyip 201, geçersizse alan bazlı hata listesiyle 400
döneceğim. Mevcut GET/health/404 akışına dokunmayacağım.

Dokunulacak dosyalar:
- src/validators/faturaValidator.js   (YENİ) — no/musteri/tutar/vade
  zorunlu, tutar > 0 kontrolü
- src/app.js                          (POST /faturalar route + JSON body okuma)
- test/faturalar.test.js              (201 geçerli + 400 geçersiz senaryoları)

Onayını bekliyorum.
```

Onayladım; iş bittiğinde dönen özet de şuydu:

> POST /faturalar endpoint'i hazır. Zorunlu alan kontrolünü (no, musteri,
> tutar, vade) ve "tutar pozitif olmalı" kuralını ayrı bir validator modülüne
> aldım; böylece route ince kaldı, doğrulama mantığı tek yerde ve tek başına
> test edilebilir. Geçerli istek 201 ve oluşan kaydı (otomatik id ile),
> geçersiz istek 400 ve hangi alanın neden düştüğünü söyleyen hata listesini
> dönüyor. Mevcut GET ve health uçlarına dokunmadım; `npm test` ile 7 testin
> tamamı yeşil.

Testleri ben de bağımsız çalıştırdım: yedisi de geçiyor ve değişiklik yalnızca
izin verdiğim üç dosya yoluna dokunmuş. Kapsam ne kadar netse, denetleyeceğin
diff o kadar küçük kalıyor — buradaki diff'i okumak beş dakikamı aldı.

Prompt'taki "önce planını göster" kısmı ayrı bir alışkanlık olarak yerleşmeli:
kod yazılmadan önce ne yapılacağını görmek, yanlış yöne gidilmiş yarım saatlik
bir üretimi geri almaktan her zaman ucuz. Planlama konusunu
[serinin ilerleyen yazılarında]({{ '/blog/koddan-once-plan/' | relative_url }})
derinlemesine ele alacağız.

## Şüphe bir özellik, engel değil

İyi bir vibe coder, çıktıya varsayılan olarak güvenmez. Model kendinden emin bir
dille yanlış bir şey söyleyebilir; çalışan ama kenar durumlarda kırılan kod
üretebilir; istemediğin bir dosyayı "gereksiz" diye silebilir. Yukarıdaki özet
kulağa güven verici geliyor — ama "7 test yeşil" cümlesine imza atmadan önce
testlerin gerçekten anlamlı şeyleri sınadığına baktım: negatif tutar gerçekten
reddediliyor mu, eksik alan hatası doğru alanı mı gösteriyor? Diff'i okumak,
testleri kendin koşturmak ve kritik bölgeleri (auth, ödeme, şema değişiklikleri)
ayrıca korumak zihniyetin parçası. Şüphecilik burada kötümserlik değil, hız
kaybetmeden güvenle ilerlemenin yolu.

Bir sınırı da dürüstçe söylemek lazım: bu zihniyet, yazılım bilgisinin gereksiz
hale geldiği anlamına gelmiyor. Tam tersine — neyin makul bir mimari olduğunu,
hangi çıktının koktuğunu bilen biri, aynı araçlardan çok daha iyi sonuç alıyor.
Vibe coding bilgiyi değersizleştirmiyor; bilginin kullanıldığı yeri kod yazmaktan
kod değerlendirmeye taşıyor.

## Araç değişir, zihniyet kalır

Claude Code, Cursor, Copilot, Codex, Lovable... Araçların arayüzü, komutları ve
yetenekleri farklı, üstelik hızla değişiyor. Ama yukarıdaki ilkeler — net tarif,
önce plan, diff'i oku, anlamadığını kabul etme, kritik bölgeyi koru — hepsinde
aynı. Bu seride de bu yüzden araca değil pratiğe odaklanacağız; araçlar örnek
olarak geçecek, kural olarak değil. Fatura takibi projemiz de artık fatura kabul
ediyor; sonraki yazılarda üzerine koymaya devam edeceğiz.

Sıradaki yazı: [Vibe Coding Araçları: App Builder'lar ve Kodlama Ajanları]({{ '/blog/vibe-coding-araclari/' | relative_url }})
