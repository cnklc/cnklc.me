---
layout: post
lang: tr
translation_url: /en/blog/spec-driven-development/
title: "Spec-Driven Development (SDD) Nedir?"
date: 2026-07-19
summary: "Kodun değil spesifikasyonun tek doğruluk kaynağı olduğu bir yaklaşım: SDD'nin plan modundan farkı, tipik akışı ve nerede abartı olduğu — serinin projesinde gerçek bir spec koşumuyla."
tags: [vibe-coding, spec-driven-development, planlama]
draft_series: "Vibe Coding Yolculuğu"
roadmap_topic: "Spec-Driven Development (SDD) Nedir?"
---

> "Vibe Coding Yolculuğu" serisinin beşinci yazısı. [Koddan önce plan]({{ '/blog/koddan-once-plan/' | relative_url }}) yapmanın neden önemli olduğunu görmüştük; bu yazıda o fikrin daha biçimsel hâline bakıyoruz: spec-driven development. Fatura takibi projemiz de bu akışla yeni bir özellik kazanıyor.

Vibe coding'in bilinen zaafı şu: ajana bir hedef tarif ediyorsun, makul görünen kod üretiyor, ama birkaç oturum sonra proje niyetinden sapmaya başlıyor. Her oturumda bağlam sıfırlanıyor, kararlar sohbet geçmişinde kayboluyor. **Spec-driven development** (SDD, spesifikasyon güdümlü geliştirme) buna bir cevap: tek doğruluk kaynağı kod ya da sohbet değil, sürüm kontrolünde tutulan yazılı bir spesifikasyon olsun.

## Plan yapmaktan farkı ne?

Plan zaten yapıyoruz; örneğin Claude Code'un plan modunu [ayrı bir yazıda]({{ '/blog/plan-mode/' | relative_url }}) anlatmıştım. Ama o plan tek oturumluk: onaylıyorsun, kod yazılıyor, plan buharlaşıyor. SDD'de spesifikasyon kalıcı bir dosya. Ne istediğini, başarı kriterlerini ve kısıtları yazıyorsun; ajan planı ve görev listesini bu dosyadan türetiyor. Bir sonraki oturumda, hatta başka bir araçla çalışırken bile aynı spec geçerli. Niyetin, sohbet geçmişi yerine repoda yaşıyor.

Bu yönüyle SDD, [bağlam dosyası]({{ '/blog/claude-md-temelleri/' | relative_url }}) fikrinin bir adım ötesi: CLAUDE.md projenin *nasıl* çalıştığını anlatır, spec ise sıradaki işin *ne* olduğunu ve *neden* yapıldığını.

## Akışı projede gerçekten koşalım

Araçtan bağımsız akış dört aşamadır: spec yaz → teknik plan çıkar → görevlere böl → uygula. Bunu düz Markdown dosyalarıyla, fatura takibi projemizin sıradaki özelliği için birebir uyguladım. Önce proje köküne `SPEC.md` koydum — özü şu:

```text
# Özellik: Aylık Rapor

Niyet: Ay sonunda hangi faturaların ödenmediğini ve aya ait
toplamları tek bakışta görmek.

Davranış:
- GET /faturalar/rapor?ay=YYYY-MM bir aylık rapor döndürür.
- Rapor, VADESİ o ay içinde olan faturaları kapsar (kesim değil).
- Alanlar: toplam / ödenen / ödenmemiş sayı ve tutarları;
  ödenmemiş faturaların listesi.

Başarı kriterleri:
- Geçersiz veya eksik ay parametresi 400 + alan bazlı hata.
- Faturasız ay: sıfır toplamlarla 200, hata değil.
- Mevcut endpoint'lerin davranışı değişmez; eski testler geçer.

Kapsam dışı: PDF/CSV dışa aktarma, grafik, muhasebe
entegrasyonu, tekrar eden faturalar.
```

Sonra ajana tek şey söyledim:

```text
SPEC.md'deki aylık rapor özelliğini uygula. Önce spec'ten bir teknik
plan ve görev listesi türet, bana göster; sonra uygula. Spec'te
belirsiz bir şey görürsen uydurma, belirsizlik olarak işaretle.
```

Ajan spec'ten dört maddelik bir görev listesi türetti (saf bir `aylikRapor`
fonksiyonu + route + testler + doğrulama) ve asıl kıymetlisi, iki noktayı
uydurmak yerine **belirsizlik olarak işaretledi**: spec yanıttaki JSON alan
adlarını vermiyordu ve bozuk vade değerli faturaların ne olacağını hiç
konuşmuyordu. İkisini de kod tabanının konvansiyonuna göre çözüp kararını
raporladı — spec'in boşluğu sessiz bir varsayıma değil, görünür bir karara
dönüştü. Kapanış özeti şuydu:

> Aylık rapor özelliğini SPEC.md'ye göre uyguladım: `GET
> /faturalar/rapor?ay=YYYY-MM` artık vadesi (kesim değil) o aya düşen
> faturaların toplam/ödenen/ödenmemiş sayı ve tutarlarını, bir de ödenmemiş
> listesini döndürüyor. Geçersiz veya eksik `ay` için 400 + alan bazlı hata,
> faturası olmayan ay için sıfır toplamlarla 200 dönüyor. Mevcut
> endpoint'lere dokunmadım; 10 yeni testle birlikte toplam 30 testin hepsi
> geçiyor. İki noktayı uydurmadım, belirsizlik olarak işaretledim: yanıt
> JSON'undaki alan adları ve bozuk vade değerlerinin nasıl ele alınacağı.

Doğrulama faslında serinin ilk yazısındaki ilke yine karşılığını verdi:
testleri bağımsız çalıştırdım — 30 testin 30'u geçiyor ve spec'in "eski
testler geçmeye devam eder" kriteri sağlanıyor. Ama özetteki "10 yeni test"
ifadesi yanlıştı: yeni dosyada 9 test var (eski 21 + yeni 9 = 30). Ajana
söyledim, sayıyı doğrulayıp düzeltti. Küçük bir hata — ama çıktıya körü
körüne imza atmamanın neden zihniyetin parçası olduğunu bundan iyi anlatan
örnek az bulunur.

## Hazır iskelet isteyenlere

Aynı akışı elle Markdown yerine hazır araçlarla da yürütebilirsin. GitHub'ın
açık kaynak [Spec Kit](https://github.com/github/spec-kit){:target="_blank" rel="noopener"} aracı spec → plan →
görev → uygulama aşamalarını slash komutlarıyla yapılandırıyor ve Claude Code,
Copilot, Cursor, Gemini CLI gibi pek çok ajanla çalışıyor; Amazon'un Kiro'su
da benzer bir akışı IDE'ye gömen bir örnek. AWS ve GitHub, bu yaklaşımla
ajanların ilk denemede doğru sonuç verme oranının belirgin arttığını
raporluyor — paylaşılan rakamlar iddialı, ama yönü yukarıdaki koşumla tutarlı:
ajan tahmin etmek yerine yazılı kriterlere karşı çalışıyor.

## Dürüst olalım: her işe değmez

SDD'nin maliyeti var. Küçük bir bug düzeltmesi veya tek dosyalık bir değişiklik için spec yazmak bürokrasi olur; orada [koddan önce kısa bir plan]({{ '/blog/koddan-once-plan/' | relative_url }}) yeterli. SDD, kapsamı büyük ve birden çok oturuma yayılacak işlerde parlıyor: yeni bir modül, sıfırdan bir MVP, birden fazla ajanın çalışacağı bir proje.

İkinci risk spec çürümesi: kod ilerler, spec güncellenmezse elinde yanıltıcı bir doküman kalır. Spec'i canlı tutamayacaksan hiç başlamamak daha dürüst bir tercih.

Özet: SDD, "önce düşün, sonra yazdır" prensibinin disipline edilmiş hâli. Prensip kalıcı; araçlar (Spec Kit, Kiro ve diğerleri) değişebilir. Büyük işlerde spec'e yatırım yap, küçük işlerde hızını koru.

Sıradaki yazı: [Popüler Teknoloji Yığını Seçmek: Neden Niş Değil?]({{ '/blog/populer-stack-secmek/' | relative_url }})
