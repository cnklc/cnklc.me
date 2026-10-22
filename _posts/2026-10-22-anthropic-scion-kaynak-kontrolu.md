---
layout: post
lang: tr
translation_url: /en/blog/anthropic-scion-kaynak-kontrolu/
title: "Kod Yazmak Darboğaz Olmayınca: Anthropic Neden Git'in Yerine Scion'ı Yazdı?"
date: 2026-10-22
summary: "Günde 30 binden fazla merge'e ulaşan Anthropic, git'i bırakıp kendi sürüm kontrol sistemini yazdı. Hikâyenin asıl dersi Scion değil: ajanlar kodu hızlandırınca darboğaz bir sonraki katmana kayıyor."
tags: [git, surum-kontrolu, ai-ajanlari, anthropic]
---

> Bu yazı, Anthropic mühendislik ekibinin 13 Ekim 2026'da yayımladığı
> [Redesigning source control at Anthropic](https://www.anthropic.com/research/redesigning-source-control)
> yazısından yola çıkıyor. Çeviri değil; yazıdaki fikirleri özetleyip bir
> geliştirici olarak benim için ne anlama geldiğini tartışıyorum. Rakamların
> hepsi Anthropic'in kendi aktardıkları.

Yıllarca "yazılım geliştirmenin en yavaş kısmı kodu yazmak" diye düşündük. Yapay
zekâ ajanları bu varsayımı hızla yıktı ve Anthropic'in yazısı, bunun ardından ne
olduğunu görmek için iyi bir örnek: kod yazımı hızlandığında yük ortadan kalkmıyor,
bir sonraki katmana taşınıyor. Bu durumda o katman, hepimizin hiç düşünmeden
kullandığı git oldu.

## Rakamlar ne söylüyor?

Anthropic'in aktardığına göre monorepo'larına (tek depo) günlük merge sayısı Mayıs
2026'da yaklaşık 2.500 iken Eylül'de 30 binin üzerine çıkmış. Yani dört ayda on
kattan fazla artış. Bu değişikliklerin büyük kısmını insanlar değil, Claude ile
çalışan ajanlar üretiyor.

Ölçeğin geri kalanı da benzer:

- `main` dalının geçmişi 100 GB'a yakın, sıkıştırılmış bir çalışma kopyası 25 GB'ın üzerinde.
- CI (sürekli entegrasyon) sistemleri günde yaklaşık 25 milyon checkout yapıyor.
- Her biri depoyu düz `git clone` ile çekseydi günlük trafik 600 petabaytı aşacaktı.

Shallow clone, sparse checkout ve yüzlerce iç git aynası bir süre idare etmiş; ama
merge hızı arttıkça bu yamaları ayakta tutmak başlı başına bir iş hâline gelmiş.

## Git'in tasarım varsayımı ile gerçek kullanım arasındaki uçurum

Yazının bence en öğretici cümlesi şu tespit: git dağıtık bir sistem olarak
tasarlandı, ama Anthropic onu merkezi bir sistem gibi kullanıyordu.

Git her istemcinin tüm geçmişi yanında taşıyabileceğini, çevrimdışı çalışabileceğini
varsayar. Bu, Linus Torvalds'ın çözdüğü problem için harika bir varsayım: dünyanın
dört bir yanında, birbirinden bağımsız çalışan insanlar. Ama bir CI işi ya da bir
ajan için geçerli değil. Ajan her zaman çevrimiçi; tüm geçmişe değil, birkaç
dosyaya ihtiyacı var; işini bitirip kayboluyor. Böyle bir istemciye 25 GB'lık
çalışma kopyası taşıtmak, bir mektup için kütüphane taşımaya benziyor.

## Scion: istemciyi küçült, sunucuyu akıllandır

Anthropic bu yüzden kendi sürüm kontrol sistemi Scion'ı yazmış ve monorepo'yu beş
ayda git'ten taşımış. Aynı dönemde bir kod inceleme aracı (Antique), kod arama ve
erişim yetkilendirme sistemleri de çıkmış. Fikir tamamen yeni değil; Google'ın
Piper'ı ve Meta'nın Sapling'i (özellikle sunucu bileşeni Mononoke) benzer yoldan
gitmiş.

Tasarımın özünü birkaç maddede toplamak mümkün:

- **İstemci hep çevrimiçi kabul ediliyor.** Veri, ihtiyaç anında sunucudan çekiliyor.
- **Ağır iş sunucuda.** Geçmiş, blame, commit, merge ve rebase sunucu tarafında
  yapılıyor; istemcide sınırlı bir önbellek ve çalışma kopyası kalıyor.
- **Her şey API.** Otomatik bisect ya da revert gibi birçok CI işi için yerel bir
  depoya hiç gerek kalmıyor.
- **Tam kopya yok.** Veri dağıtık; packfile, `git gc` benzeri depo bakımı yok.
- **Commit ucuz.** Commit sunucuda oluşuyor, maliyeti değişikliğin boyutuyla
  orantılı ve kilit gerektirmiyor.
- **Çalışma kopyası isteğe bağlı.** Gerekirse sanal ve seyrek; sadece okunan
  dosya yükleniyor.

İstemci protokolündeki bir ayrıntı özellikle hoşuma gitti: git'te istemci
sunucuya "bende şunlar var" diye anlatır, sunucu da farkı paketleyip yollar.
Scion'da istemci kök ağaçtan başlayıp yalnızca ihtiyaç duyduğu ağaçları ve
dosyaları istiyor. İstek kesilirse kaldığı yerden devam edebiliyor; dev bir
paketin hazırlanmasını beklemiyor.

İçerik adresli veri hiç değişmediği için her sunucu bunu güvenle önbellekleyebiliyor.
Mimari üç katmanlı: her makinede bir daemon, bölgesel bir bellek içi önbellek ve
asıl kaynak olan sunucu. Anthropic her katmanda yüzde 99'un üzerinde önbellek
isabeti, eski git aynalama düzenine göre CPU ve bellekte yaklaşık 200 kat daha
küçük bir altyapı ve dakikalardan saniyelere inen checkout süreleri bildiriyor.

## Bence asıl hikâye: yedi kişi, beş ay

Teknik detaylardan çok, yazının "öğrendiklerimiz" kısmı ilgimi çekti. Scion,
Antique ve ilgili sistemleri yedi kişilik bir ekip yazıp taşımış; hem de bu sırada
merge hacmi on katına çıkarken. Bunu mümkün kılan, ekibin Claude ile çalışma
biçimi. Birkaç gözlem:

**Mühendisin işi "hayır" demek.** Ekip, Claude'un sistem kısıtlarını ihlal ettiği
ya da gereğinden karmaşık çözümler ürettiği yerlerde sık sık durdurmak zorunda
kaldığını söylüyor. Kodu yazmak ucuzladıkça, neyin yazılmaması gerektiğine karar
vermek mühendisin asıl katkısı hâline geliyor.

**İnceleme satırdan niyete kayıyor.** İnceleyenler artık her satıra değil,
değişikliğin ne yapmaya çalıştığına bakıyor. Bu ancak güçlü bir güvenlik ağıyla
mümkün: yoğun test, hermetik simülasyonlar, fuzzing.

**Optimizasyonun maliyeti düştü.** Git'ten Scion'a veri aktarım hattını Claude
Mythos Preview'un yeniden yazdığı ve sonucun 20 kat daha az bellekle, 4 kat daha
hızlı çalıştığı aktarılıyor. Bir uzmanın günler harcayacağı optimizasyonlar artık
denenebilir hâle gelmiş.

**İzleme de ajanlaşıyor.** Her bileşeni telemetri ve log üzerinden izleyen
Claude "süper hayranları" kurmuşlar; klasik alarmların kaçırdığı ince sorunları
yakalıyorlar.

**Merge kuyruğu artık uygun değil.** Klasik merge kuyruğu ajan hızına yetişmiyor.
Anthropic yatırımı merge sonrası ve deploy öncesi testlere kaydırmış; çakışmaları
da Claude çoğu zaman insanların fark etmesinden önce çözüyor.

## Peki git'i bırakmalı mıyız?

Hayır, ve Anthropic de bunu söylemiyor. Scion, on binlerce mühendisi ya da büyük
ajan sürüleri olan devasa monorepo'lar için tasarlanmış ve dışarıya açılmayacak
kadar Anthropic'e özel. Yazının önerisi daha mütevazı: git platformları ve
istemcileri, git'in modelini bozmadan sunucu taraflı işlemler ve daha iyi
birleştirilebilir sparse/shallow özellikleri benimseyebilir.

Benim gibi tek başına ya da küçük ekiplerle çalışanlar için bu ölçeğin
problemleri uzak görünüyor. Ama Anthropic bu tür ölçek sorunlarının 6–12 ay içinde
yaygınlaşacağını tahmin ediyor ve ben de yönün doğru olduğunu düşünüyorum.
Bugünden alınabilecek üç pratik ders var:

**1. Ajana tüm depoyu verme.** Git'in kendi araçları, Scion'ın fikirlerinin küçük
ölçekli karşılığını zaten sunuyor. Büyük bir depoda yalnızca ilgilendiğin klasörle
çalışmak için:

```bash
git clone --filter=blob:none --sparse https://github.com/kullanici/depo.git
cd depo
git sparse-checkout set apps/mobile packages/shared
```

`--filter=blob:none` dosya içeriklerini ihtiyaç anında indirir (partial clone),
`sparse-checkout` da çalışma kopyasını seçtiğin klasörlerle sınırlar. CI'da
geçmişe ihtiyacın yoksa `--depth=1` yeterli.

**2. Paralel ajanları ayrı çalışma alanlarına koy.** Aynı depoda birden fazla ajan
çalıştırıyorsan her birine ayrı bir worktree vermek, çakışmaları en baştan azaltır:

```bash
git worktree add ../depo-fatura-indirim -b feature/fatura-indirim
```

**3. Darboğazın nereye kaydığını izle.** Kod üretimi hızlandığında yavaşlayan
şey genelde inceleme, test ve entegrasyon oluyor. [Git'i güvenlik ağı olarak
kullanmak]({{ '/blog/git-guvenlik-agi/' | relative_url }}) ve [testi önce
yazdırmak]({{ '/blog/ai-a-test-yazdirmak/' | relative_url }}) bu yüzden
önemli: ajan ne kadar hızlı üretirse, doğrulama da o kadar otomatik olmalı.

## Son söz

Bu yazıyı okurken aklımda kalan şey Scion'ın kendisi değil, şu soru oldu: yıllardır
"altyapı" diye üzerinde düşünmediğimiz araçlar insan hızına göre tasarlanmıştı.
Ajanlar bu hızı değiştirdikçe, git'ten CI'a, kod incelemeden deploy'a kadar her
katman benzer bir yeniden düşünmeden geçecek. Anthropic bunu erken yaşadı;
çoğumuz için mesele "olur mu" değil, "ne zaman" sorusu.

*Kaynak: [Redesigning source control at Anthropic](https://www.anthropic.com/research/redesigning-source-control), Anthropic Engineering, 13 Ekim 2026.*
