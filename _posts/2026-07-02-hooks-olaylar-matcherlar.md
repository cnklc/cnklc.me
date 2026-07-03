---
layout: post
lang: tr
translation_url: /en/blog/hooks-olaylar-matcherlar/
title: "Hooks: Olaylar ve Matcher'lar"
date: 2026-07-02
summary: "Claude Code'un yaşam döngüsündeki belirli anlarda otomatik olarak kabuk komutu çalıştırmanı sağlayan hook'lar nedir, hangi olaylarda tetiklenir ve matcher ile nasıl filtrelenir?"
tags: [claude-code, hooks, otomasyon]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Hooks: Olaylar ve Matcher'lar"
---

> "Claude Code Yolculuğu" serisinin bu durağında [kısayollar ve öneklerden]({{ '/blog/kisayollar-ve-onekler/' | relative_url }}) sonra otomasyon bölümüne geçiyoruz: hook'lar.

Şimdiye kadar Claude Code'a ne yapacağını hep bir istekle söyledik. Hook'lar bunun tersi: Claude'un karar vermesini beklemeden, belirli bir olay gerçekleştiğinde *her seferinde* çalışacak bir kabuk komutu tanımlıyorsun. Dosya düzenlendiğinde otomatik formatlamak, tehlikeli bir komutu çalışmadan engellemek, Claude senden girdi beklerken masaüstü bildirimi göndermek gibi işler için kullanılır — modelin "bunu yapayım mı" diye karar vermesine gerek kalmadan, deterministik olarak çalışır.

## Hook nasıl tanımlanır

Bir hook, `~/.claude/settings.json` (tüm projeler için) veya proje kökündeki `.claude/settings.json` (tek proje için, repoya commit'lenebilir) dosyasında `hooks` anahtarı altında tanımlanır. Örneğin, Claude senden girdi beklediğinde macOS'ta masaüstü bildirimi göndermek için:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code dikkatini bekliyor\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

Bunu kaydettikten sonra Claude Code içinde `/hooks` yazarsan, tüm tanımlı hook'ları olaylarına göre gruplanmış şekilde gösteren salt okunur bir liste açılır. `Notification`'ı seçtiğinde olayı, matcher'ı, komutu ve hangi ayar dosyasından geldiğini görebilirsin.

## Olaylar (events)

Hook'lar Claude Code'un yaşam döngüsündeki belirli noktalarda tetiklenir. En sık kullanılanlardan birkaçı: `PreToolUse` (bir araç çağrılmadan önce, engelleyebilir), `PostToolUse` (bir araç çağrısı başarıyla bittikten sonra), `SessionStart` (oturum başladığında veya devam ettirildiğinde), `UserPromptSubmit` (sen bir istek gönderdiğinde, Claude işlemeden önce) ve `Stop` (Claude yanıtını bitirdiğinde). Tam liste `/hooks` menüsünde de görülebilir.

Bir dosya düzenlemesinden sonra otomatik olarak Prettier çalıştırmak istersen:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" }
        ]
      }
    ]
  }
}
```

## Matcher: hangi durumda tetiklensin

`matcher` alanı, olayın *ne zaman* eşleşeceğini daraltır. Değeri boş, `"*"` ya da hiç yazılmamışsa hook her seferinde tetiklenir. Sadece harf, rakam, `_`, `-`, boşluk, `,` ve `|` içeriyorsa tam eşleşme olarak değerlendirilir: `Edit|Write` yalnızca `Edit` veya `Write` araçlarında, `Bash` yalnızca `Bash` aracında tetiklenir. Başka herhangi bir karakter içeriyorsa (örneğin `.` veya `^`) JavaScript regex olarak değerlendirilir; `mcp__memory__.*` gibi bir desen, `memory` MCP sunucusundan gelen tüm araçları eşler.

Her olay farklı bir alanı eşler: araç olayları (`PreToolUse`, `PostToolUse` vb.) araç adını, `SessionStart` oturumun nasıl başladığını (`startup`, `resume`, `clear`, `compact`), `Notification` ise bildirim tipini (`permission_prompt`, `idle_prompt` vb.) filtreler. `UserPromptSubmit` ve `Stop` gibi bazı olaylar matcher desteklemez, her seferinde tetiklenir.

## Engellemenin en basit hâli: exit code

Bir komut hook'u, `stdin`'den olayla ilgili JSON verisini okur ve sonucu exit code ile bildirir. `exit 0` "itirazım yok" demektir; `exit 2` ise engelleyici bir hata — `stderr`'a yazdığın metin Claude'a geri bildirim olarak gider. Tehlikeli komutları engelleyen basit bir örnek:

```bash
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command' < /dev/stdin)

if [[ "$COMMAND" == rm* ]]; then
  echo "Engellendi: rm komutlarına izin verilmiyor" >&2
  exit 2
fi

exit 0
```

Bunu daha zengin bir JSON çıktısıyla nasıl genişletebileceğini, hangi alanların hangi olaylarda geçerli olduğunu ve hook'un tam girdi şemasını sıradaki yazıda ele alacağım.

---

*Sıradaki yazı: [Hook Girdi ve Çıktıları]({{ '/blog/hook-girdi-ciktilari/' | relative_url }})*
