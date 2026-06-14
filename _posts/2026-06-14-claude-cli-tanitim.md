---
layout: post
lang: tr
translation_url: /en/blog/claude-cli-tanitim/
title: "Claude CLI'a Giriş"
date: 2026-06-14
summary: "Claude Code'un terminaldeki yüzü: nasıl kurulur, ilk oturum nasıl başlar ve neden 'sadece bir komut satırı aracı'ndan daha fazlası?"
tags: [claude-code, cli, terminal]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Claude CLI'a Giriş"
---

> "Claude Code Yolculuğu" serisinin üçüncü durağı. Önceki yazıda
> [kodlama ajanının]({{ '/blog/coding-agent-nedir/' | relative_url }}) ne
> olduğuna soyut olarak bakmıştık; bu yazıda o ajanın somut yüzüne, yani
> terminaldeki Claude CLI'a iniyoruz.

İki yazıdır kavramlardan konuşuyordum: vibe coding, kodlama ajanı. Artık
parmakları klavyeye koyma zamanı. Claude Code'un en tam donanımlı hâli
terminalde yaşıyor ve adı **Claude CLI**. Bu yazıda kurulumdan ilk oturuma
kadar olan yolu gezeceğiz.

> 🔴 **Canlı demo:** Anlatılanları çalışırken görmek istersen
> [webex.cnklc.me](https://webex.cnklc.me) adresinden takip edebilirsin.

## Claude CLI tam olarak ne?

Resmi tanımıyla Claude Code; kod tabanını okuyan, dosyaları düzenleyen,
komutları çalıştıran ve geliştirme araçlarınla entegre olan ajansal bir
kodlama aracı. CLI ise onun terminal sürümü: doğrudan komut satırından
proje yönetip kod yazdığın, dosya düzenlettiğin tam özellikli arayüz.

Önemli bir nokta: Claude Code tek bir yerde yaşamıyor. Terminal, VS Code,
JetBrains, masaüstü uygulaması ve tarayıcı — hepsi aynı motora bağlanıyor.
Yani `CLAUDE.md` dosyaların, ayarların ve bağladığın araçlar her yüzeyde
çalışıyor. Ben seriye terminalden başlıyorum çünkü en şeffaf ve en
kontrol edilebilir yüzey orası.

## Kurulum

Dokümanın şu an önerdiği yöntem **native install**. macOS, Linux ve WSL'de:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell tarafında:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Native kurulumun güzel yanı, arka planda kendini güncel tutması — sürüm
takibiyle uğraşmıyorsun. macOS'ta Homebrew'i tercih edersen:

```bash
brew install --cask claude-code
```

(Homebrew kurulumları otomatik güncellenmiyor; ara ara `brew upgrade
claude-code` çalıştırman gerekiyor.) Eskiden yaygın olan npm yöntemi de
hâlâ duruyor (`npm install -g @anthropic-ai/claude-code`, Node 18+ ister),
ama dokümanın bugün öne çıkardığı yol native install. Yeni başlıyorsan
önerileni izlemek en az sürprizli seçenek.

## İlk oturum

Kurulum bittikten sonrası şaşırtıcı derecede sade. Bir projeye girip
`claude` yazıyorsun:

```bash
cd projem
claude
```

İlk çalıştırmada seni giriş yapmaya yönlendiriyor. Yüzeylerin çoğu bir
Claude aboneliği ya da Anthropic Console hesabı istiyor — abonelik mi API
mi sorusu başlı başına bir konu, ona bir sonraki yazıda gireceğim. Giriş
tamamlandıktan sonra interaktif bir oturum açılıyor ve artık Claude ile
sohbet eder gibi konuşabiliyorsun: "şu modülün ne yaptığını açıkla",
"bu testi düzelt" gibi.

## Tek seferlik komutlar

İnteraktif oturum her şey değil. Bazen tek bir iş için Claude'u çağırıp
çıktısını almak istersin. Bunun için komutu doğrudan tırnak içinde
verebiliyorsun:

```bash
claude "auth modülü için testleri yaz, çalıştır ve hataları düzelt"
```

Bir adım ötesi, CLI'ı Unix felsefesine uygun şekilde başka araçlara
bağlamak. `-p` bayrağı (print/headless) ile Claude'u bir boru hattının
parçası yapabiliyorsun:

```bash
tail -200 app.log | claude -p "bir anomali görürsen özetle"
```

Burada Claude artık ekranda oturum açan bir sohbet değil; girdiyi alıp
sonucu basan, script'lerin ve CI'ın içine gömülebilen bir araç. Bu
"headless" tarafı serinin ilerisinde ayrı bir yazıyı hak ediyor, şimdilik
böyle bir kapının olduğunu bilmen yeterli.

## Küçük bir uyarı

Önceki yazılarda söylediğimi burada da tekrar edeyim: CLI komut çalıştırıp
dosya değiştirebildiği için, ne yaptığını anlamak ve onaylamak senin işin.
Özellikle internetten gelen kurulum script'lerini `bash`'e borularken ne
çalıştırdığını bilmekte fayda var. Güçlü bir araç, ama kontrol hâlâ sende.

## Özet

Claude CLI, kodlama ajanının terminaldeki tam donanımlı yüzü. Kurulumu
tek satır, ilk oturumu `claude` yazıp giriş yapmak kadar basit. İnteraktif
modda sohbet edip iş yaptırabiliyor, tek seferlik komutlar veya `-p` ile
script'lere gömebiliyorsun. Hepsi aynı Claude Code motoruna bağlı olduğu
için terminalde kurduğun her şey diğer yüzeylerde de geçerli.

---

*Sıradaki yazı: Abonelik mi, API Kullanımı mı?*
