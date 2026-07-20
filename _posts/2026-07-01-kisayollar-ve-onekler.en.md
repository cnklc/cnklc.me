---
layout: post
lang: en
permalink: /en/blog/kisayollar-ve-onekler/
translation_url: /blog/kisayollar-ve-onekler/
title: 'Shortcuts and Prefixes (!, @, \, Shift+Tab)'
date: 2026-07-01
summary: "How four characters typed at the start of the input box — !, @, \\, and Shift+Tab — speed up everyday Claude Code use."
tags: [claude-code, keyboard-shortcuts, commands]
draft_series: "Claude Code Journey"
roadmap_topic: 'Shortcuts and Prefixes (!, @, \, Shift+Tab)'
---

> Today's stop in the "Claude Code Journey" series is small but useful for
> daily work: how a handful of characters typed at the start of the input box
> trigger different behaviors. Last time we looked at slash commands; this
> time we look at the other prefixes next to `/` — `!`, `@`, `\` — and at
> `Shift+Tab`, which switches modes.

## `!`: skip Claude and drop straight into the shell

Put `!` at the start of your input and that line goes straight to the shell,
not to Claude. The command runs, its output is added to the conversation
context, but Claude doesn't interpret the command or ask for approval before
running it.

```text
> ! npm test
```

Run this and the tests execute directly in your terminal, with live output.
In current versions (v2.1.186 and later), once the output lands in context
Claude also sends a response automatically — so running `! npm test` no
longer requires a follow-up question about which test broke and why; Claude
reads the output and comments on it on its own. To keep the earlier behavior
(output added to context, no response), set `respondToBashCommands` to
`false` in `settings.json`.

Two smaller details: type a partial command and press **Tab** to
autocomplete from previous `!` commands; exit shell mode from an empty
prompt with `Escape`, `Backspace`, or `Ctrl+U`. Also, bash's own `!` history
expansion is disabled by default in Claude Code — so bash shortcuts like
`!!` don't work here; this `!` is entirely Claude Code's own prefix.

## `@`: reference a file path

Type `@` and file path autocomplete opens. Say you want to point at a bug in
the auth module:

```text
> fix the token expiry check in @src/auth/login.ts
```

As you keep typing after `@`, matching files are listed, and picking one
inserts the full path into your input. Instead of typing a path by hand and
risking the wrong folder, you make sure Claude knows exactly which file
you mean.

## `\`: continue a line without submitting

Put `\` at the end of your input and press Enter, and the message isn't
sent — you move to a new line instead. This is the one method that works in
every terminal: `Shift+Enter` works natively in some terminals (iTerm2,
WezTerm, Ghostty, Kitty, Warp, Apple Terminal, Windows Terminal) but needs
`/terminal-setup` in others; `Ctrl+J` also works everywhere, but `\` +
Enter is the most familiar of the three.

```text
> refactor this function:\
  use async/await, add error handling with try/catch
```

## `Shift+Tab`: cycle permission modes

Press `Shift+Tab` to cycle through `default` → `acceptEdits` → `plan`; if
your account qualifies and you've enabled them, `auto` and
`bypassPermissions` join the cycle too. The current mode always shows in the
status bar. In `default` mode Claude only reads and asks for approval on
every edit and command; in `acceptEdits`, file edits and common filesystem
commands like `mkdir`, `mv`, and `cp` are auto-approved; in `plan` mode
Claude researches and proposes a plan without changing anything.

Instead of cycling through manually every time, you can also set the
starting mode with a flag like `claude --permission-mode acceptEdits`.

## Summary

Four small characters — `!`, `@`, `\`, `Shift+Tab` — speed up the daily flow
quite a bit: one drops into the shell, one references a file, one continues
a line without submitting, and the last controls how freely Claude gets to
work. Next time we move into automation and look at how hooks attach to
events.

---

*Next post: [Hooks: Events and Matchers]({{ '/en/blog/hooks-olaylar-matcherlar/' | relative_url }})*
