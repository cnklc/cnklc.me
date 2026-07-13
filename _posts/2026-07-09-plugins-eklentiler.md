---
layout: post
lang: tr
translation_url: /en/blog/plugins-eklentiler/
title: "Plugins (Eklentiler): Claude Code'u Paket Paket Genişletmek"
date: 2026-07-09
summary: "Skill, agent, hook ve MCP sunucularını tek pakette toplayan plugin sistemi: marketplace'ten kurulum, günlük yönetim ve kendi plugin'ini yazmanın temelleri."
tags: [claude-code, plugins, marketplace]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Plugins (Eklentiler)"
---

> "Claude Code Yolculuğu" serisi İleri Seviye bölümüyle devam ediyor. Önceki
> yazıda [MCP ile Claude'a harici araçlar bağlamayı]({{ '/blog/mcp-ile-arac-baglama/' | relative_url }}) görmüştük; bu yazıda o tür
> yapılandırmaları paketleyip paylaşmanın yolu olan plugin'lere bakıyoruz.

Serinin buraya kadarki yazılarında Claude Code'u özelleştirmenin birçok parçasını
gördük: skill'ler, hook'lar, subagent'lar, MCP sunucuları. Hepsi işe yarıyor ama
bir sorun var — bunları tek tek kuruyorsun ve bir başkasıyla paylaşmak istediğinde
elle kopyalamak gerekiyor. **Plugin** (eklenti), tam bu sorunu çözüyor: skill,
agent, hook ve MCP sunucularını tek bir isim altında toplayan, tek komutla
kurulabilen bir paket.

## Marketplace: eklentilerin kataloğu

Plugin'ler **marketplace** (eklenti pazarı) denen kataloglardan kurulur. Mantık
bir uygulama mağazasına benziyor: önce mağazayı ekliyorsun, sonra içinden
istediğin uygulamayı seçiyorsun. Anthropic'in resmî marketplace'i
(`claude-plugins-official`) Claude Code'u başlattığında otomatik olarak hazır;
ekstra bir şey yapmana gerek yok.

Ne var ne yok görmek için `/plugin` komutunu çalıştırıp **Discover** sekmesine
bakabilirsin. Diyelim ki GitHub entegrasyonunu kurmak istiyorsun:

```shell
/plugin install github@claude-plugins-official
```

Topluluk eklentileri ise ayrı bir katalogda duruyor; onu elle eklemen gerekiyor:

```shell
/plugin marketplace add anthropics/claude-plugins-community
```

Kurulum sırasında kapsam da seçebiliyorsun: sadece kendin için (user), depodaki
tüm ekip arkadaşların için (project) veya yalnızca bu depoda kendin için (local).

## Kurulunca ne değişiyor?

Plugin'in getirdiği skill'ler, çakışmayı önlemek için plugin adıyla önekleniyor.
Örneğin `commit-commands` plugin'ini kurduysan, commit skill'ini şöyle çağırırsın:

```shell
/commit-commands:commit
```

Oturum içinde plugin kurup kaldırdığında, yeniden başlatmak yerine
`/reload-plugins` çalıştırman yeterli. Günlük yönetim için de kısa komutlar var:
`/plugin list` kurulu eklentileri listeler, `/plugin disable` kaldırmadan devre
dışı bırakır, `/plugin uninstall` tamamen siler.

## Kendi plugin'ini yazmak

Bir plugin aslında belli bir dizin yapısına sahip bir klasör. Kimliğini
`.claude-plugin/plugin.json` manifest dosyası tanımlar; skill'ler `skills/`,
agent'lar `agents/`, hook'lar `hooks/` dizininde, MCP sunucuları da kök dizindeki
`.mcp.json` dosyasında durur. Sık yapılan hata: bu dizinleri `.claude-plugin/`
içine koymak — oraya yalnızca `plugin.json` girer, geri kalan her şey plugin
kökünde olmalı.

Geliştirirken kurulum yapmadan test edebilirsin:

```bash
claude --plugin-dir ./benim-plugin
```

Elindeki `.claude/` yapılandırmasını plugin'e dönüştürmek de mümkün; dosyaları
yeni dizin yapısına taşıyıp bir manifest eklemek çoğunlukla yetiyor. Paylaşmaya
hazır olduğunda kendi marketplace'ini oluşturabilir veya topluluk marketplace'ine
gönderim yapabilirsin.

## Bir güvenlik notu

Plugin'ler makinende senin kullanıcı yetkilerinle kod çalıştırabilen, yüksek
güvenilirlik gerektiren bileşenler. Anthropic, üçüncü taraf plugin'lerin içindeki
MCP sunucularını veya dosyaları denetlemiyor. Bu yüzden yalnızca güvendiğin
kaynaklardan kurulum yap; kurmadan önce detay ekranındaki "Will install" listesine
bakıp neler ekleneceğini görmek iyi bir alışkanlık.

Plugin'ler, seride bugüne kadar tek tek öğrendiğimiz parçaları birleştiren bir
dağıtım katmanı. Ekipçe aynı skill setiyle çalışmak istiyorsan doğru araç bu.

Sıradaki yazı: [Editör Eklentileri ve Masaüstü Uygulaması]({{ '/blog/editor-eklentileri-desktop/' | relative_url }})
