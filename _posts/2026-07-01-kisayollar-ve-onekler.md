---
layout: post
lang: tr
translation_url: /en/blog/kisayollar-ve-onekler/
title: 'Kısayollar ve Önekler (!, @, \, Shift+Tab)'
date: 2026-07-01
summary: "Girdi kutusunun başına konan dört karakter — !, @, \\ ve Shift+Tab — günlük Claude Code kullanımını nasıl hızlandırıyor?"
tags: [claude-code, klavye-kisayollari, komutlar]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: 'Kısayollar ve Önekler (!, @, \, Shift+Tab)'
---

> "Claude Code Yolculuğu" serisinde bugün küçük ama günlük kullanımı hızlandıran
> bir konuya bakıyoruz: girdi kutusunun başına koyduğun birkaç karakterin nasıl
> farklı davranışlar tetiklediği. Önceki yazıda slash komutlarına bakmıştık; bu
> yazıda `/`'un yanındaki diğer öneklere — `!`, `@`, `\` — ve mod değiştirmek
> için kullanılan `Shift+Tab`'a bakıyoruz.

## `!`: Claude'u atlayıp doğrudan kabuğa in

Girdinin başına `!` koyarsan, o satır Claude'a değil doğrudan kabuğa gider.
Komut çalışır, çıktısı sohbet bağlamına eklenir ama Claude komutu yorumlamaz
ya da çalıştırmadan önce onay istemez.

```text
> ! npm test
```

Bu satırı çalıştırdığında testler doğrudan terminalde koşar, çıktıyı canlı
görürsün. Güncel sürümlerde (v2.1.186 ve sonrası) çıktı bağlama eklendikten
sonra Claude otomatik olarak bir yanıt da veriyor — yani `! npm test`
çalıştırıp hangi testin neden kırıldığını ayrıca sormana gerek kalmıyor,
Claude çıktıyı görüp kendiliğinden yorumluyor. Bu davranışı eskisi gibi
(yanıtsız, sadece bağlama ekleme) istiyorsan `settings.json`'da
`respondToBashCommands`'ı `false` yapman yeterli.

İki küçük ayrıntı: kısmi bir komut yazıp **Tab**'a basarsan önceki `!`
komutlarından otomatik tamamlama alırsın; boş girdide `Escape`, `Backspace`
ya da `Ctrl+U` ile shell modundan çıkarsın. Ayrıca bash'in kendi `!` geçmiş
genişletmesi (history expansion) Claude Code'da varsayılan olarak kapalı —
yani `!!` gibi bash kısayolları burada işlemez, bu `!` tamamen Claude Code'un
kendi öneki.

## `@`: dosya yolu referansı

`@` yazdığın anda dosya yolu otomatik tamamlaması açılır. Örneğin auth
modülündeki bir hatayı işaret etmek istiyorsan:

```text
> @src/auth/login.ts dosyasındaki token süresi kontrolünü düzelt
```

`@`'dan sonra yazmaya başladıkça eşleşen dosyalar listelenir, birini
seçtiğinde tam yol girdiye eklenir. Elle yol yazıp yanlış klasöre işaret
etmek yerine, Claude'un hangi dosyadan bahsettiğini tam olarak bilmesini
sağlarsın.

## `\`: satırı bitirmeden devam et

Girdinin sonuna `\` koyup Enter'a basarsan mesaj gönderilmez, yeni bir
satıra geçersin. Bu, hangi terminalde olursan ol çalışan tek yöntem —
`Shift+Enter` bazı terminallerde native çalışırken (iTerm2, WezTerm, Ghostty,
Kitty, Warp, Apple Terminal, Windows Terminal), bazılarında `/terminal-setup`
gerektiriyor; `Ctrl+J` de her terminalde çalışıyor ama `\` + Enter en tanıdık
gelen yöntem.

```text
> bu fonksiyonu refactor et:\
  async/await kullan, hata yönetimini try/catch ile ekle
```

## `Shift+Tab`: izin modları arasında geçiş

`Shift+Tab`'a bastığında `default` → `acceptEdits` → `plan` arasında
döngüsel geçiş yaparsın; hesabın uygunsa ve etkinleştirdiysen `auto` ve
`bypassPermissions` da bu döngüye eklenir. Mevcut mod her zaman durum
çubuğunda görünür. `default` modda Claude sadece okur, her düzenleme ve
komut için onay ister; `acceptEdits`'te dosya düzenlemeleri ve `mkdir`,
`mv`, `cp` gibi yaygın dosya sistemi komutları otomatik onaylanır; `plan`
modunda ise Claude hiçbir şeyi değiştirmeden araştırıp bir plan sunar.

Bu döngüyü elle her seferinde geçmek yerine `claude --permission-mode
acceptEdits` gibi bir bayrakla başlangıç modunu da belirleyebilirsin.

## Özet

Dört küçük karakter — `!`, `@`, `\`, `Shift+Tab` — günlük akışı büyük ölçüde
hızlandırıyor: biri kabuğa iniyor, biri dosya referansı veriyor, biri satırı
bitirmeden devam ettiriyor, sonuncusu ise Claude'un ne kadar serbest
çalışacağını belirliyor. Sıradaki yazıda otomasyon tarafına geçip hook'ların
olaylara nasıl bağlandığına bakacağız.

---

*Sıradaki yazı: [Hooks: Olaylar ve Matcher'lar]({{ '/blog/hooks-olaylar-matcherlar/' | relative_url }})*
