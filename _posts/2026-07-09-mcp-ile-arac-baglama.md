---
layout: post
lang: tr
translation_url: /en/blog/mcp-ile-arac-baglama/
title: "MCP ile Araç Bağlama"
date: 2026-07-09
summary: "Model Context Protocol (MCP) ile Claude Code'u issue tracker, veritabanı ve API gibi dış araçlara bağlamak: sunucu ekleme, scope seçimi ve /mcp komutu."
tags: [claude-code, mcp, entegrasyon]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "MCP ile Araç Bağlama"
---

> "Claude Code Yolculuğu" serisinde İleri Seviye bölümüne geçiyoruz. Önceki
> yazıda [oturum yönetimini]({{ '/blog/oturum-yonetimi-resume-rewind/' | relative_url }})
> ele almıştık; şimdi Claude Code'u terminalin dışındaki dünyaya bağlayan
> mekanizmaya bakıyoruz: MCP.

Claude Code, dosyalarını okuyup komut çalıştırabiliyor — ama işin bir kısmı
çoğu zaman başka yerlerde duruyor: issue tracker'da, veritabanında, monitoring
panelinde. **MCP** (Model Context Protocol), yapay zekâ–araç entegrasyonları
için açık bir standart; Claude Code bu protokol üzerinden yüzlerce dış araca ve
veri kaynağına bağlanabiliyor. Pratik ölçüt şu: bir araçtan sürekli kopyala-yapıştır
ile veri taşıyorsan, o aracın MCP sunucusunu bağlamanın vakti gelmiş demektir.

## Uzak sunucu eklemek

Bugün yaygın servislerin çoğu barındırılan (hosted) MCP sunucuları sunuyor.
Örneğin Notion çalışma alanını bağlamak istediğinde tek komut yetiyor:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

Bundan sonra Claude'a doğal dille iş verebilirsin:

```text
Notion'daki "Blog fikirleri" sayfasını oku ve en eski üç fikri özetle
```

HTTP dışında daha eski sunucuların kullandığı SSE taşıması da var
(`--transport sse`); komutun biçimi aynı.

## Yerel (stdio) sunucular

Her sunucu bulutta çalışmak zorunda değil. Yerel bir süreç olarak çalışan
sunucular stdio taşımasıyla eklenir. Genel biçim şöyle:

```bash
claude mcp add [seçenekler] <isim> -- <komut> [argümanlar...]
```

`--` işaretinden sonrası, Claude Code'un sunucuyu başlatmak için çalıştıracağı
komuttur. API anahtarı gerekiyorsa `--env` ile verirsin:

```bash
claude mcp add --env AIRTABLE_API_KEY=ANAHTARIN --transport stdio airtable -- npx -y airtable-mcp-server
```

Eklediklerini görmek ve yönetmek için üç komut var: `claude mcp list` tüm
sunucuları listeler, `claude mcp get <isim>` tek sunucunun ayrıntısını
gösterir, `claude mcp remove <isim>` kaldırır.

## Scope: sunucu nerede geçerli?

Bir sunucu eklerken `--scope` ile kapsamını seçersin; üç seçenek var:

**local** varsayılandır: sunucu yalnızca eklediğin projede ve yalnızca sana
görünür. **project** kapsamı yapılandırmayı projenin kökündeki `.mcp.json`
dosyasına yazar; bu dosya sürüm kontrolüne girer, böylece tüm ekip aynı
araçları kullanır. **user** kapsamı ise sunucuyu makinendeki bütün projelerde
kullanılabilir yapar — projeden bağımsız kişisel araçlar için uygun.

```bash
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp
```

Güvenlik notu: `.mcp.json` repo ile geldiği için Claude Code, dosyadan gelen
sunucuları çalıştırmadan önce senin onayını ister. Tanımadığın bir repoda bu
onayı verirken dikkatli ol — MCP sunucusu senin adına araç çalıştıran bir
süreçtir ve güvenmediğin sunucuyu bağlamamak gerekir.

## Oturum içinde: /mcp

Sunucuların durumunu oturum içinde `/mcp` komutuyla görürsün: hangi sunucu
bağlı, kaç araç sunuyor. OAuth isteyen uzak sunucularda (ör. kurumsal
servisler) kimlik doğrulamayı da `/mcp` üzerinden yaparsın; komut seni
tarayıcıya yönlendirir, giriş yapınca sunucu kullanıma hazır olur.

Dürüst bir uyarıyla bitireyim: her bağlı sunucu, araç tanımlarıyla bağlama
(context) yük bindirir. "Ne varsa bağlayayım" yaklaşımı hem bağlamı şişirir hem
de saldırı yüzeyini büyütür. O hafta gerçekten kullandığın iki üç sunucu,
sembolik olarak duran on sunucudan iyidir.

## Özet

MCP, Claude Code'u kopyala-yapıştır aracılığından kurtarıp araçlarına doğrudan
bağlar. `claude mcp add` ile sunucu eklersin, `--scope` ile kimin göreceğini
seçersin, `/mcp` ile durum ve kimlik doğrulamayı yönetirsin. [Bir sonraki yazıda]({{ '/blog/plugins-eklentiler/' | relative_url }}) bu entegrasyonları paketleyip paylaşmanın yoluna bakacağız.

---

*Sıradaki yazı: [Plugins (Eklentiler)]({{ '/blog/plugins-eklentiler/' | relative_url }})*
