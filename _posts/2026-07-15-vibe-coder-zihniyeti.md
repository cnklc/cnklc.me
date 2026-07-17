---
layout: post
lang: tr
translation_url: /en/blog/vibe-coder-zihniyeti/
title: "Vibe Coder Zihniyeti: Kod Yazan Değil, Yöneten Olmak"
date: 2026-07-15
summary: "Vibe coding'de asıl değişen şey araçlar değil, senin rolün. Kodu satır satır yazan kişiden, niyeti tarif edip çıktıyı denetleyen kişiye geçiş nasıl bir zihniyet gerektiriyor?"
tags: [vibe-coding, zihniyet, yapay-zeka]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Vibe Coder Zihniyeti"
---

> Bu yazıyla "Vibe Coding Yolculuğu" serisine başlıyoruz. Önceki seride Claude
> Code özelinde ilerlemiştik; bu seri araç-bağımsız — hangi aracı kullanırsan
> kullan geçerli olan pratiklere odaklanacağız. [Vibe coding nedir]({{ '/blog/vibe-coding-nedir/' | relative_url }})
> ve [coding agent nedir]({{ '/blog/coding-agent-nedir/' | relative_url }})
> yazıları bu serinin ön okuması sayılabilir.

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
yerine hedef, kapsam ve sınır belirtmek gerekiyor:

```text
Hedef: POST /api/tasks endpoint'ine girdi doğrulaması ekle.
Kısıtlar:
- Sadece src/routes/tasks.ts ve src/validators/ klasörüne dokun
- Şemada değişiklik yok
Önce yaklaşımını ve düzenleyeceğin dosyaları listele, onayımı bekle.
```

Bu isteği küçük bir deneme projesinde birebir uyguladım: değişiklik yalnızca
o iki dosya yoluna dokundu; geçerli istek 201, geçersiz istek 400 döndü.
Kapsam ne kadar netse, denetleyeceğin diff o kadar küçük kalıyor.

Buradaki "önce planını göster" kısmı ayrı bir alışkanlık olarak yerleşmeli:
kod yazılmadan önce ne yapılacağını görmek, yanlış yöne gidilmiş yarım saatlik
bir üretimi geri almaktan her zaman ucuz. Planlama konusunu
[serinin ilerleyen yazılarında]({{ '/blog/koddan-once-plan/' | relative_url }})
derinlemesine ele alacağız.

## Şüphe bir özellik, engel değil

İyi bir vibe coder, çıktıya varsayılan olarak güvenmez. Model kendinden emin bir
dille yanlış bir şey söyleyebilir; çalışan ama kenar durumlarda kırılan kod
üretebilir; istemediğin bir dosyayı "gereksiz" diye silebilir. Bu yüzden diff'i
okumak, testleri koşturmak ve kritik bölgeleri (auth, ödeme, şema değişiklikleri)
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
olarak geçecek, kural olarak değil.

Sıradaki yazı: [Vibe Coding Araçları: App Builder'lar ve Kodlama Ajanları]({{ '/blog/vibe-coding-araclari/' | relative_url }})
