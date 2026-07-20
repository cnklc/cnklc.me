---
layout: post
lang: tr
translation_url: /en/blog/modes-modlar/
title: "Modlar (Modes): Claude Code Sana Ne Zaman Sorar?"
summary: "İzin modları, Claude Code'un her adımda durup sormasıyla saatlerce kesintisiz çalışması arasındaki dengeyi belirler. Shift+Tab ile döngü, plan modu, acceptEdits ve auto modunu sade bir dille anlatıyorum."
tags: [claude-code, izinler, modlar]
draft_series: "Claude Code Yolculuğu"
date: 2026-06-20
roadmap_topic: "Modlar (Modes)"
---

> "Claude Code Yolculuğu" serisinin bu durağında izin modlarına bakıyoruz.
> Geçen yazıda [bağlam yönetiminden]({{ '/blog/context-baglam/' | relative_url }})
> bahsetmiştim; şimdi de Claude'un sana ne sıklıkta "yapayım mı?" diye
> sorduğunu kontrol eden ayara geliyoruz.

Claude Code bir dosyayı düzenlemek, bir komut çalıştırmak ya da ağ isteği
yapmak istediğinde durup onayını ister. **İzin modları** (permission modes)
işte bu duraklamanın ne sıklıkta olacağını belirliyor. Doğru modu seçmek,
bir seansın akışını tamamen değiştiriyor: her adımı tek tek gözden mi
geçireceksin, yoksa Claude uzun bir süre kesintisiz çalışıp sonunda mı
rapor verecek?

## Shift+Tab ile döngü

CLI'da modları değiştirmenin en pratik yolu `Shift+Tab`. Bu kısayol seni
şu döngüde gezdirir:

```
default → acceptEdits → plan
```

Hangi modda olduğun durum çubuğunda görünür. İsteseydim baştan da
seçebilirdim:

```bash
claude --permission-mode plan
```

Ya da bir projede kalıcı varsayılan yapmak için `settings.json` içine
`permissions.defaultMode` yazabilirim.

## default: sor, sonra yap

Varsayılan mod en temkinlisi. Claude bu modda **sadece okuma** yapabilir;
dosya düzenlemek ya da komut çalıştırmak istediğinde her seferinde sorar.
Yeni bir kod tabanına dokunurken ya da hassas bir işte çalışırken ilk
tercihim bu. Yavaş ama şeffaf.

## acceptEdits: düzenlemeleri sonra gözden geçir

`acceptEdits` modunda Claude çalışma klasöründeki dosyaları sormadan
oluşturup düzenleyebilir. Durum çubuğunda `⏵⏵ accept edits on` yazısını
görürsün. Dosya düzenlemelerine ek olarak `mkdir`, `touch`, `mv`, `cp`
gibi yaygın dosya sistemi komutlarını da otomatik onaylar — ama yalnızca
çalışma klasörünün içinde. Ben bunu, değişiklikleri tek tek değil de
sonradan `git diff` ile topluca incelemek istediğimde açıyorum.

## plan: önce araştır, dokunma

Plan modu favorilerimden. Claude bu modda kodu okuyabilir, keşif için
komut çalıştırabilir ama **kaynağına dokunmaz**; sadece bir plan yazar
(`Shift+Tab` ile girersin). Plan hazır olduğunda onu sunar ve nasıl devam
edeceğini sorar: onaylayıp başlasın, düzenlemeleri kabul etsin ya da her
adımı tek tek onaylatsın. Büyük bir değişikliğe girişmeden önce "önce ne
yapacağını anlat" demenin temiz bir yolu.

## auto: az sor, arkada güvenlik kontrolü

`auto` modu izin sorularını ortadan kaldırır ama gözü kapalı değil: ayrı
bir sınıflandırıcı model, her eylemi çalışmadan önce inceler ve isteğinin
ötesine geçen, tanımadığı altyapıya dokunan ya da Claude'un okuduğu
düşmanca içerikten kaynaklanan davranışları engeller. Yerel dosya
işlemleri ve çalışma klasöründeki düzenlemeler serbest; üretime deploy ya
da `curl | bash` gibi şeyler varsayılan olarak bloklanır. Çalıştığın
reponun branch'lerine push ise (`main` dâhil) artık varsayılan serbest —
push'un içeriği yine denetleniyor ve `production` gibi deploy adı taşıyan
branch'ler ayrıca değerlendiriliyor.

Birkaç not: auto modu izin sorularını azaltır ama güvenliği garanti
etmez. Ayrıca güncel bir model gerektiriyor (Sonnet 4.6, Opus 4.6 ve
sonrası); Anthropic API dışındaki sağlayıcılarda da çalışıyor. Uzun ve
yönüne güvendiğim işlerde kullanıyorum, hassas işlerde değil.

## dontAsk ve bypassPermissions: uçlardaki iki mod

İki uç daha var. `dontAsk` tam tersi yönde sıkı: önceden izin verilmemiş
her şeyi otomatik reddeder, yani CI gibi ortamlarda Claude'un ne
yapabileceğini baştan tanımlarsın. `bypassPermissions` ise tüm kontrolleri
kapatır — sadece izole konteyner ya da VM gibi ortamlarda, Claude host
sistemine zarar veremeyeceği yerlerde kullanılmalı. İkisi de döngüde
kendiliğinden çıkmaz; başlangıç bayrağıyla açman gerekir:

```bash
# Sadece önceden izin verilenlere izin ver (CI için)
claude --permission-mode dontAsk

# Tüm kontrolleri atla — yalnızca izole konteyner/VM'de
claude --permission-mode bypassPermissions
# eşdeğeri: claude --dangerously-skip-permissions
```

Önemli bir nokta: bu modlara seans ortasında geçemezsin. Claude'u bu
bayraklardan biriyle başlatmadıysan, `bypassPermissions`'a geçmek için
oturumu yeniden başlatman gerekir.

## Korunan yollar

Güzel bir ayrıntı: `bypassPermissions` dışındaki her modda `.git`,
`.claude`, `.zshrc` gibi **korunan yollara** yazmak asla otomatik
onaylanmaz. Yani Claude hangi modda olursa olsun, repo durumunu ya da
kendi yapılandırmasını yanlışlıkla bozmaktan bir adım uzakta tutuluyor.

## Özet

Modlar aslında tek bir soruyu ayarlıyor: "Bu eylem için bana sor mu?"
`default` her şeyi sorar, `acceptEdits` düzenlemeleri serbest bırakır,
`plan` önce düşünür, `auto` arkada güvenlik kontrolüyle akar. Ben günlük
işte çoğunlukla `default` ile başlıyor, ne yapacağını netleştirmek için
`plan`'a geçiyor, sonra güvendiğim noktada `acceptEdits` veya `auto` ile
hızlanıyorum. Sihir yok — sadece güven ile hız arasında bilinçli bir
ayar.

---

*Sıradaki yazı: [Modeller: Opus, Sonnet, Haiku]({{ '/blog/modeller-opus-sonnet-haiku/' | relative_url }})*