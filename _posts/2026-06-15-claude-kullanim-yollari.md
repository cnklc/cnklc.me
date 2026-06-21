---
layout: post
lang: tr
translation_url: /en/blog/claude-kullanim-yollari/
title: "Claude'u Kullanmanın Yolları"
date: 2026-06-15
summary: "Claude Code sadece terminalde yaşamıyor. Terminal, IDE eklentileri, masaüstü uygulaması, tarayıcı ve daha fazlası — aynı motor, farklı yüzler."
tags: [claude-code, kurulum, is-akisi]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Claude'u Kullanmanın Yolları"
---

> "Claude Code Yolculuğu" serisinin beşinci durağı. Önceki yazıda
> [abonelik mi yoksa API mı]({{ '/blog/subscription-vs-api/' | relative_url }})
> sorusuna bakmıştık. Şimdi bir adım geri çekilip aynı aracın kaç farklı
> yerden kullanılabildiğine bakıyoruz.

İlk yazılarda Claude Code'u hep terminalde hayal ettik: bir dizine girip
`claude` yazıyorsun ve sohbet başlıyor. Bu doğru ama eksik bir resim.
Çünkü resmî dokümanın deyişiyle Claude Code "terminalinde, IDE'nde,
masaüstü uygulamasında ve tarayıcında" kullanılabilen bir araç. Üstelik
hepsinin altında **aynı motor** çalışıyor.

## Terminal: tam donanımlı temel

Terminal hâlâ en yetenekli yüz. Tüm CLI komutları, flag'ler ve özellikler
önce burada oluyor. Kurmak için tek satır yetiyor:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows tarafında PowerShell için `irm https://claude.ai/install.ps1 | iex`
var; macOS'ta Homebrew (`brew install --cask claude-code`) ya da Linux'ta
apt/dnf/apk gibi paket yöneticileri de seçenek. Kurulumdan sonra projeye
girip `claude` demek yeterli — ilk açılışta seni giriş yapmaya yönlendiriyor.

## IDE eklentileri: VS Code ve JetBrains

Editörden çıkmak istemiyorsan iki resmî eklenti var. **VS Code** eklentisi
(Cursor'da da çalışıyor) satır içi diff'ler, `@` ile dosya etiketleme, plan
inceleme ve sohbet geçmişini doğrudan editöre getiriyor. Eklentiyi
Extensions panelinden "Claude Code" diye aratıp kurabilirsin.

**JetBrains** tarafında ise IntelliJ, PyCharm, WebStorm gibi IDE'ler için
bir plugin var. Burada plugin, CLI'ın üzerine bir katman: CLI'ı ayrıca
kurman gerekiyor, plugin ona görsel diff ve seçim bağlamı paylaşımı gibi
özellikler ekliyor.

## Masaüstü uygulaması

Ne terminal ne de IDE — sadece kendi başına bir uygulama isteyenler için
masaüstü sürümü var (macOS ve Windows). Diff'leri görsel olarak inceleyeb
ilir, birden fazla oturumu yan yana çalıştırabilir, tekrarlayan görevleri
zamanlayabilir ve bulut oturumları başlatabilirsin. Ücretli bir abonelik
gerektiriyor.

## Tarayıcı: yerel kurulum yok

`claude.ai/code` adresinden tarayıcıda hiçbir kurulum olmadan
çalıştırabilirsin. Uzun süren görevleri başlatıp sonra dönüp kontrol etmek,
lokalinde olmayan repolarda çalışmak ya da birden fazla görevi paralel
yürütmek için pratik. iOS uygulamasında da mevcut.

## Hepsi aynı yere bağlanıyor

İşin güzel tarafı şu: bu yüzeyler ayrı ürünler değil; hepsi aynı temel
Claude Code motoruna bağlanıyor. Yani `CLAUDE.md` dosyaların, ayarların ve
MCP sunucuların hepsinde geçerli oluyor. Bir oturumu bir ortamda başlatıp
başka birinde devam ettirebiliyorsun:

| İstediğim şey | En iyi seçenek |
| --- | --- |
| Telefondan görev başlatıp masaüstünde açmak | Mobil uygulama + Masaüstü |
| Lokalde başlat, mobilde takip et | Web veya iOS uygulaması |
| PR inceleme ve issue triyajını otomatikleştirmek | GitHub Actions / GitLab CI/CD |
| Slack'ten gelen hatayı PR'a çevirmek | Slack entegrasyonu |
| Tekrarlayan görevleri zamanlamak | `/schedule` ya da masaüstü zamanlanmış görevler |

Bunların ötesinde, tamamen kendi iş akışını kurmak istersen **Agent SDK**
ile Claude Code'un araçlarını ve yeteneklerini kullanan özel ajanlar bile
yazabiliyorsun.

## Peki hangisini seçmeli?

Net bir cevap yok, çünkü hepsi aynı motoru paylaşıyor — bu yüzden seçim
alışkanlığına kalmış. Ben hâlâ çoğu işi terminalde yapıyorum; diff'leri
gözden geçirirken bazen masaüstü ya da IDE eklentisi daha rahat geliyor.
Önerim: terminalle başla, çünkü her şey önce orada oluyor. Sonra hangi yüzey
senin akışına oturuyorsa ona kay. Hepsi aynı `CLAUDE.md`'yi okuduğu için
hiçbir şeyi kaybetmiyorsun.

## Özet

Claude Code tek bir uygulama değil, aynı motorun farklı yüzleri: terminal,
VS Code ve JetBrains eklentileri, masaüstü uygulaması ve tarayıcı. Hepsi
ayarlarını ve `CLAUDE.md` dosyanı paylaşıyor, bu yüzden ortam değiştirmek
ücretsiz. Bir sonraki yazıda bu paylaşılan beyne — yani `CLAUDE.md`'ye —
daha yakından bakacağız.

---

*Sıradaki yazı: CLAUDE.md Temelleri*
