---
layout: post
lang: tr
translation_url: /en/blog/headless-mode/
title: "Headless (Başsız) Mod"
date: 2026-06-23
summary: "Claude Code'u etkileşimli oturum olmadan, tek komutla çalıştırmak: -p bayrağı, çıktıyı pipe'lama, izinleri önceden verme ve konuşmayı sürdürme."
tags: [claude-code, headless, otomasyon]
draft_series: "Claude Code Yolculuğu"
roadmap_topic: "Headless (Başsız) Mod"
---

> "Claude Code Yolculuğu" serisinin bu durağında otomasyona doğru bir adım
> atıyoruz. Geçen yazıda [yaygın kullanım senaryolarına]({{ '/blog/yaygin-kullanim-senaryolari/' | relative_url }})
> bakmıştık; şimdi Claude'u hiç oturum açmadan, bir kabuk komutu gibi
> çalıştırmaya geçiyoruz.

Şimdiye kadar Claude'u çoğunlukla etkileşimli olarak kullandık: `claude` yazıp
açılan oturumda konuşuyorduk. Ama bazen oturuma ihtiyacın yoktur — bir betiğin
içinde, CI hattında ya da bir cron görevinde Claude'u tek seferlik çalıştırıp
çıktısını almak istersin. İşte başsız (headless) mod bunun için var.

## -p bayrağı: oturumsuz çalıştırma

Herhangi bir `claude` komutuna `-p` (ya da `--print`) eklediğinde Claude
etkileşimli oturumu atlar, prompt'u işler, sonucu `stdout`'a yazar ve çıkar:

```bash
claude -p "auth modülünün ne işe yaradığını özetle"
```

Tek fark bu: artık geri dönüp soru soramazsın, ama karşılığında Claude'u başka
araçlarla birleştirebilirsin.

## Veriyi pipe'la, çıktıyı yönlendir

Başsız mod `stdin`'i okuduğu için Claude'u sıradan bir komut satırı aracı gibi
kullanabilirsin. Örneğin bir derleme hatasını pipe (borulama) ile içeri verip
açıklamayı bir dosyaya yazdırmak:

```bash
cat build-error.txt | claude -p 'bu derleme hatasının asıl nedenini kısaca açıkla' > cikti.txt
```

Çıktıyı makinenin işleyebileceği biçimde de alabilirsin. `--output-format`
üç değer kabul eder: `text` (varsayılan), `json` ve `stream-json`. JSON
çıktıyı [jq](https://jqlang.github.io/jq/){:target="_blank" rel="noopener"} ile ayrıştırıp sadece metni almak:

```bash
claude -p "bu projeyi özetle" --output-format json | jq -r '.result'
```

JSON yanıtı ayrıca oturum kimliği ve `total_cost_usd` gibi maliyet bilgilerini
de taşır, böylece her çağrının ne kadara mal olduğunu betikten takip
edebilirsin.

## İzinleri önceden vermek

Etkileşimli modda Claude bir komut çalıştırmadan önce sana sorar. Başsız modda
soracak kimse olmadığı için izinleri baştan vermen gerekir. `--allowedTools` ile
hangi araçlara izin verdiğini açıkça yazarsın:

```bash
claude -p "test paketini çalıştır ve hataları düzelt" \
  --allowedTools "Bash,Read,Edit"
```

Tek tek araç saymak yerine bütün oturuma bir izin modu da verebilirsin.
`--permission-mode acceptEdits` Claude'un dosya yazmasına ve `mkdir`, `mv`, `cp`
gibi sık kullanılan dosya komutlarına sormadan izin verir; diğer kabuk
komutları yine de bir kural ister. CI gibi kısıtlı ortamlar için `dontAsk` modu
ise yalnızca izin verdiklerinin dışına çıkmaya çalışınca çalışmayı durdurur.

## Konuşmayı sürdürmek

Tek seferlik çalışsa da Claude'un önceki çağrıyı hatırlamasını isteyebilirsin.
`--continue` en son konuşmayı sürdürür:

```bash
claude -p "bu kod tabanını performans açısından gözden geçir"
claude -p "şimdi veritabanı sorgularına odaklan" --continue
```

Aynı anda birden fazla konuşma yürütüyorsan, oturum kimliğini yakalayıp
`--resume` ile belirli birini sürdürebilirsin. İkisini de aynı dizinden
çalıştırman gerekir, çünkü oturum araması proje dizinine göredir.

## Tekrarlanabilirlik için --bare

CI hatlarında her makinede aynı sonucu istersin. `--bare` bayrağı; hook'ların,
skill'lerin, eklentilerin, MCP sunucularının ve `CLAUDE.md` dosyalarının
otomatik keşfini atlar — yalnızca açıkça verdiğin bayraklar etkili olur:

```bash
claude --bare -p "bu dosyayı özetle" --allowedTools "Read"
```

Bunun bir bedeli var: bare modda kimlik doğrulama OAuth'tan değil
`ANTHROPIC_API_KEY` ortam değişkeninden gelmek zorunda. Dokümana göre `--bare`
ileride `-p` için varsayılan olacak.

Başsız mod, Claude'u "konuştuğun bir asistan"dan "betiğine taktığın bir araca"
çeviriyor. Bir sonraki yazıda bunu paralel çalışmayla birleştiriyoruz.

Sıradaki yazı: [Git Worktrees ile Çalışmak]({{ '/blog/git-worktrees/' | relative_url }})
