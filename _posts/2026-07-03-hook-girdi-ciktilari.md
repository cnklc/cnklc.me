---
layout: post
lang: tr
translation_url: /en/blog/hook-girdi-ciktilari/
title: "Hook Girdi ve Çıktıları"
date: 2026-07-03
summary: "Bir hook'a stdin'den tam olarak ne geliyor, exit code'lar ne anlama geliyor ve JSON çıktısıyla nasıl daha ince kontrol kuruyorsun — permissionDecision ve additionalContext dahil."
tags: [claude-code, hooks, json]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Hook Girdi ve Çıktıları"
---

> [Önceki yazıda]({{ '/blog/hooks-olaylar-matcherlar/' | relative_url }}) hook'ların ne olduğuna ve hangi olaylarda tetiklendiğine bakmıştık. Orada bir hook script'inin `stdin`'den JSON okuyup exit code ile karar bildirdiğini görmüştük — bu yazıda o girdi-çıktı sözleşmesinin tamamına bakıyorum.

## Hook'a giden JSON: ortak alanlar

Hangi olay tetiklenirse tetiklensin, her hook aşağıdaki alanları içeren bir JSON alır (olaya özel alanlar bunun üstüne eklenir):

- `session_id`: oturum kimliği
- `transcript_path`: konuşma geçmişinin JSON dosya yolu
- `cwd`: hook çalıştığında geçerli olan çalışma dizini
- `permission_mode`: `default`, `plan`, `acceptEdits`, `auto`, `dontAsk` veya `bypassPermissions`
- `hook_event_name`: tetiklenen olayın adı

Bir `PreToolUse` hook'u Bash aracı için tetiklendiğinde `stdin`'e şöyle bir şey düşer:

```json
{
  "session_id": "abc123",
  "cwd": "/Users/can/Project/cnklc.me",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": { "command": "npm test" }
}
```

`tool_name` ve `tool_input` olaya özel alanlar — her olay kendi ek alanlarını taşır.

## Exit code ne anlama geliyor

- **`exit 0`**: başarı. Claude Code `stdout`'u JSON çıktısı için ayrıştırır (JSON yalnızca exit 0'da işleniyor).
- **`exit 2`**: engelleyici hata. `stdout` ve içindeki JSON yok sayılır; bunun yerine `stderr`'a yazdığın metin Claude'a hata mesajı olarak gider. Etkisi olaya göre değişir: `PreToolUse`'da araç çağrısını engeller, `UserPromptSubmit`'te isteği reddeder.
- **Başka bir exit code**: çoğu olay için engelleyici olmayan bir hata sayılır; transkriptte kısa bir uyarı görünür, çalışma devam eder.

Dikkat: exit code `1` engellemez — Unix'in geleneksel hata kodu olmasına rağmen Claude Code onu engelleyici olmayan hata sayıyor. Bir kuralı zorlamak istiyorsan mutlaka `exit 2` kullanmalısın.

## JSON çıktısıyla ince kontrol

Sadece engellemek/engellememek yetmiyorsa, `exit 0` ile çık ve `stdout`'a bir JSON nesnesi yaz. En sık kullanılan evrensel alanlar:

| Alan | Varsayılan | Ne yapar |
|---|---|---|
| `continue` | `true` | `false` ise Claude tüm işlemeyi durdurur |
| `stopReason` | yok | `continue: false` olduğunda kullanıcıya gösterilen mesaj |
| `suppressOutput` | `false` | `true` ise hook çıktısı transkriptten gizlenir |
| `systemMessage` | yok | kullanıcıya gösterilen uyarı |

`PreToolUse` gibi olaylar bunun yerine `hookSpecificOutput` içinde `permissionDecision` (`allow`, `deny` veya `ask`) döndürüyor. Örneğin, veritabanına yazma komutlarını onaya düşürmek için:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "Prod veritabanına yazıyor, onayla"
  }
}
```

## Claude'a bağlam eklemek: `additionalContext`

Bir hook, kararın ötesinde Claude'un bağlamına metin de ekleyebilir. Diyelim ki `PostToolUse` ile bir dosya düzenlemesinden sonra Prettier çalıştırıyorsun ve dosyanın aslında otomatik üretildiğini Claude'a hatırlatmak istiyorsun:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Bu dosya otomatik üretiliyor. src/schema.ts'i düzenleyip `bun generate` çalıştır."
  }
}
```

Bu metin sohbette bir mesaj olarak görünmez; Claude'un bir sonraki model isteğinde okuduğu bir sistem hatırlatması olarak eklenir. Değişmeyen kurallar için CLAUDE.md'yi tercih et — `additionalContext` daha çok o anki ortam durumu veya bir işlemin sonucu gibi değişken bilgiler için.

## Özet

Her hook aynı ortak JSON zarfını (`session_id`, `cwd`, `hook_event_name`...) alır, üstüne olaya özel alanlar eklenir. `exit 0` + JSON en ince kontrolü verir; `exit 2` düz ve kesin bir engelleme sağlar; ikisini karıştırma. `permissionDecision` ve `additionalContext`, bir hook'u basit bir açma-kapama anahtarından Claude'la konuşan bir araca dönüştürüyor. Bir sonraki yazıda CLAUDE.md'nin tam konum tablosuna ve `.claude/rules/` ile modüler yapıya bakacağız.

---

*Sıradaki yazı: [CLAUDE.md: Yapı ve Konumlar (Derinlemesine)]({{ '/blog/claude-md-yapilandirma/' | relative_url }})*
