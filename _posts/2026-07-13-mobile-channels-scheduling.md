---
layout: post
lang: tr
translation_url: /en/blog/mobile-channels-scheduling/
title: "Mobil, Channels, Scheduling ve Tunnels"
date: 2026-07-13
summary: "Terminalden uzaktayken Claude Code: Remote Control ile telefondan oturum sürdürme, channels ile olaylara tepki, /loop ve zamanlanmış görevlerle otomasyon."
tags: [claude-code, remote-control, otomasyon]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Mobil, Channels, Scheduling ve Tunnels"
---

> "Claude Code Yolculuğu" serisinin son yazısına geldik. Önceki yazıda
> [güvenlik modelini]({{ '/blog/claude-code-guvenlik/' | relative_url }}) incelemiştik; kapanışı, Claude Code'u terminalin —
> hatta masanın — dışına taşıyan özelliklerle yapıyoruz.

Şimdiye kadarki her şey, senin klavyenin başında olduğunu varsayıyordu. Bu
yazının konusu tam tersi senaryolar: kanepedeyken, yoldayken veya uyurken
işlerin dönmeye devam etmesi.

## Remote Control: oturumun cebinde

Roadmap'in "tunnels" dediği ihtiyacın bugünkü karşılığı **Remote Control**:
makinende çalışan bir Claude Code oturumunu claude.ai/code'dan veya Claude
mobil uygulamasından sürdürmeni sağlıyor. Kritik ayrıntı şu: her şey yerelde
çalışmaya devam eder — dosya sistemin, MCP sunucuların, proje yapılandırman
olduğu yerde durur; telefon yalnızca o oturuma açılan bir pencere.

Kullanımı basit. Devam eden bir oturumun içinden:

```text
/remote-control
```

Ya da baştan uzaktan erişilebilir bir oturum açmak için:

```bash
claude --remote-control
```

Sunucu modu da var: `claude remote-control` terminalde bekleyip birden çok
uzak oturuma hizmet eder; boşluk tuşuyla telefonla okutabileceğin bir QR kod
gösterir. Konuşma tüm cihazlarda eşzamanlı akar — masada başlarsın, koltukta
devam edersin. Mobil bildirimler de buna bağlı: `/config` üzerinden açarsan
Claude uzun bir iş bittiğinde veya senden karar beklediğinde telefonuna
push gönderir. Yazılırken bu özelliğin araştırma önizlemesinde olduğunu
not edeyim.

## Channels: olaylar sana gelsin

Sürekli "CI bitti mi?" diye sormak yerine olayın oturuma gelmesi daha akıllı.
**Channels**, bir MCP sunucusunun çalışan oturumuna mesaj itebilmesini
sağlıyor: CI sonuçları, monitoring uyarıları, Telegram/Discord mesajları.
Sen uzaktayken Claude gelen olaya tepki verebiliyor — kırmızı CI'ı görüp
logu incelemeye başlamak gibi. Hazır channel plugin'leri kurabilir ya da
kendi sunucunu yazabilirsin.

## Scheduling: üç seviye

Zamanlanmış iş için üç seçenek var, ayrım "nerede çalışıyor"da:

Oturum içinde **`/loop`** en hızlısı: `/loop 5m deploy bitti mi kontrol et`
dersen prompt beş dakikada bir tekrarlanır. Aralık vermezsen Claude duruma
göre kendisi seçer. Doğal dille tek seferlik hatırlatma da olur ("15.00'te
release branch'ini push etmemi hatırlat"). Sınırlarını bil: görevler oturuma
bağlıdır, terminal kapanınca durur ve yedi gün sonra kendiliğinden sona erer.

Masaüstü uygulamasının **zamanlanmış görevleri** oturumdan bağımsız, yerel
dosyalarına erişerek çalışır — bu blogun taslaklarını her sabah üreten
mekanizma tam olarak bu. **Routines** ise Anthropic'in bulut altyapısında
koşar; makinenin açık olması bile gerekmez, ama yerel dosyalarına erişemez
(taze bir klon üzerinde çalışır).

Seçim kuralı dokümandakiyle aynı: makinesiz güvenilirlik istiyorsan bulut,
yerel dosya gerekiyorsa masaüstü, oturum içi hızlı takip için `/loop`.

## Kapanış

Bu yazıyla 36 konuluk serinin sonuna geldik. Vibe coding tanımından
başladık; ajan döngüsünden hook'lara, MCP'den güvenlik modeline uzandık ve
Claude Code'un artık cebinde ve takviminde de yaşadığı noktada bitirdik.
Serinin en tekrar eden dersi neydi diye sorarsan: bu araçtan alacağın verim,
ona verdiğin işin ne kadar net tanımlı ve doğrulanabilir olduğuyla doğru
orantılı. Gerisi pratik.

Okuduğun için teşekkürler — serinin tüm yazılarına blog arşivinden
ulaşabilirsin.
