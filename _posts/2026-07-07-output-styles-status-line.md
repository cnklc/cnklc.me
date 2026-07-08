---
layout: post
lang: tr
date: 2026-07-07
translation_url: /en/blog/output-styles-status-line/
title: "Output Styles ve Status Line Özelleştirme"
summary: "Claude Code'un konuşma tarzını output style'larla, arayüzün alt satırını ise status line script'leriyle nasıl özelleştirirsin? İkisi de küçük ama günlük kullanımı değiştiren ayarlar."
tags: [claude-code, output-styles, status-line]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Output Styles ve Status Line Özelleştirme"
---

> "Claude Code Yolculuğu" serisine devam ediyoruz. Önceki yazıda
> [Plan Mode]({{ '/blog/plan-mode/' | relative_url }})'a
> bakmıştık; bu yazıda aracın kendisini sana göre şekillendiren iki özelliğe
> geçiyoruz: output styles (çıktı stilleri) ve status line (durum satırı).

Claude Code'u bir süre kullanınca iki tür istek doğuyor: "cevaplarını hep şu
tonda ver" ve "ekranın altında şu bilgiyi sürekli göreyim." İlki için output
styles, ikincisi için status line var.

## Output style nedir?

Output style, Claude Code'un system prompt'unu (sistem istemi) değiştirir —
Claude'un ne bildiğini değil, nasıl cevap verdiğini. Her turda aynı ton ya da
format için tekrar tekrar prompt yazıyorsan, o talimatı bir stile taşımanın
vakti gelmiş demektir.

Varsayılan stilin yanında üç yerleşik stil var: **Proactive** (beklemeden
harekete geçer, rutin kararları kendi verir), **Explanatory** (kod yazarken
araya eğitici "Insight" notları ekler) ve **Learning** (öğrenme odaklı;
kodda `TODO(human)` işaretleri bırakıp küçük parçaları sana yazdırır).

Stil değiştirmek için `/config` çalıştırıp **Output style** seçeneğine gir.
Seçimin `.claude/settings.local.json` dosyasına yazılır. Menüsüz yol da var —
ayar dosyasına doğrudan yazabilirsin:

```json
{
  "outputStyle": "Explanatory"
}
```

İki not: eskiden bu iş için ayrı bir `/output-style` komutu vardı, kaldırıldı;
artık yol `/config`. Ve stil system prompt'un parçası olduğu için değişiklik
ancak `/clear` sonrasında ya da yeni oturumda etkinleşir.

## Kendi stilini yazmak

Özel bir stil, frontmatter'lı bir Markdown dosyasından ibaret. Kullanıcı
genelinde `~/.claude/output-styles/`, proje özelinde `.claude/output-styles/`
klasörüne koyarsın. Örneğin her açıklamaya diyagramla başlayan bir stil:

```markdown
---
name: Önce diyagram
description: Her açıklamaya diyagramla başla
keep-coding-instructions: true
---

Kod, mimari veya veri akışı açıklarken önce yapıyı gösteren bir Mermaid
diyagramı çiz, sonra düzyazıyla açıkla.
```

Kritik alan `keep-coding-instructions`: varsayılanı `false` ve `false`
kaldığında Claude Code'un yerleşik yazılım mühendisliği talimatları system
prompt'tan çıkarılır. Hâlâ kod yazdırıyorsan `true` yap; Claude'u bambaşka bir
role sokuyorsan (ör. yazı asistanı) kapalı bırak. Proje kuralları ve kod tabanı
bilgisi içinse doğru yer output style değil, [CLAUDE.md]({{ '/blog/claude-md-temelleri/' | relative_url }}).

## Status line: alt satır senin

Status line, arayüzün altında çalışan özelleştirilebilir bir satır: senin
yazdığın bir shell script'i çalıştırır, oturum verisini stdin'den JSON olarak
verir, script ne yazdırırsa onu gösterir. Bağlam penceresi doluluğu, oturum
maliyeti, git branch'i — ne istersen.

En kolay başlangıç, `/statusline` komutuna doğal dille ne istediğini söylemek;
script'i senin için üretip ayarlara ekliyor:

```text
/statusline model adını ve bağlam yüzdesini ilerleme çubuğuyla göster
```

Elle kurmak istersen `~/.claude/settings.json` içine:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

Script tarafı da basit. Modeli, klasörü ve bağlam yüzdesini gösteren bir örnek
(`chmod +x` yapmayı unutma):

```bash
#!/bin/bash
input=$(cat)
MODEL=$(echo "$input" | jq -r '.model.display_name')
DIR=$(echo "$input" | jq -r '.workspace.current_dir')
PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
echo "[$MODEL] ${DIR##*/} | %${PCT} bağlam"
```

JSON'da bundan çok daha fazlası var: `cost.total_cost_usd` ile oturum maliyeti,
`rate_limits` ile abonelik limit yüzdeleri, `output_style.name` ile o an aktif
stil bile. Script yerelde çalışır, token harcamaz. Denemek için sahte girdiyle
test edebilirsin:

```bash
echo '{"model":{"display_name":"Opus"},"workspace":{"current_dir":"/tmp/proje"},"context_window":{"used_percentage":25}}' | ~/.claude/statusline.sh
```

İkisi de küçük dokunuşlar ama etkileri kalıcı: output style Claude'un sesini,
status line senin görüş alanını ayarlıyor. Bir kere kurup unutuyorsun.

---

*Sıradaki yazı: [Oturum Yönetimi: Resume ve Rewind]({{ '/blog/oturum-yonetimi-resume-rewind/' | relative_url }})*
