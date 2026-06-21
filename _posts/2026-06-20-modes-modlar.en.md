---
layout: post
lang: en
permalink: /en/blog/modes-modlar/
translation_url: /blog/modes-modlar/
title: "Modes: When Does Claude Code Ask You?"
summary: "Permission modes set the balance between Claude Code pausing on every step and working uninterrupted for hours. Here's the Shift+Tab cycle, plan mode, acceptEdits, and auto mode in plain language."
tags: [claude-code, permissions, modes]
draft_series: "Claude Code Journey"
date: 2026-06-20
roadmap_topic: "Modes"
---

> This stop in the "Claude Code Journey" series is about permission modes.
> Last time I wrote about [managing context]({{ '/en/blog/context-baglam/' | relative_url }});
> now we get to the setting that controls how often Claude pauses to ask
> "should I do this?"

Whenever Claude Code wants to edit a file, run a command, or make a network
request, it stops and asks for your approval. **Permission modes** decide how
often that pause happens. Picking the right mode completely changes the flow
of a session: do you review each action one by one, or does Claude work for a
long stretch and report back at the end?

## Cycling with Shift+Tab

In the CLI, the handiest way to change modes is `Shift+Tab`. The shortcut
cycles you through:

```
default → acceptEdits → plan
```

The current mode shows in the status bar. I could also pick one at startup:

```bash
claude --permission-mode plan
```

Or make it a persistent default for a project by setting
`permissions.defaultMode` in `settings.json`.

## default: ask, then act

The default mode is the most cautious. Here Claude can **only read**; whenever
it wants to edit a file or run a command, it asks every time. This is my first
pick when touching a new codebase or doing sensitive work. Slow, but
transparent.

## acceptEdits: review the edits afterward

In `acceptEdits` mode, Claude can create and edit files in your working
directory without asking. You'll see `⏵⏵ accept edits on` in the status bar.
On top of file edits, it auto-approves common filesystem commands like
`mkdir`, `touch`, `mv`, and `cp` — but only inside the working directory. I
turn this on when I'd rather review changes in bulk with `git diff` later
than approve each one inline.

## plan: research first, don't touch

Plan mode is one of my favorites. Here Claude can read code and run commands
to explore, but it **won't touch your source** — it just writes a plan (you
enter it with `Shift+Tab`). When the plan is ready, Claude presents it and asks
how to proceed: approve and start, accept edits, or review each step manually.
It's a clean way to say "tell me what you're going to do first" before a big
change.

## auto: fewer prompts, safety checks in the background

`auto` mode removes permission prompts, but it isn't blind: a separate
classifier model reviews each action before it runs and blocks anything that
escalates beyond your request, touches unfamiliar infrastructure, or stems
from hostile content Claude read. Local file operations and edits in your
working directory flow freely; things like production deploys, `curl | bash`,
or pushing straight to `main` are blocked by default.

A few notes: auto mode is a research preview, so it doesn't guarantee safety.
It also has version and model requirements (a recent Sonnet or Opus, on the
Anthropic API). I use it for long tasks whose direction I trust, not for
sensitive work.

## dontAsk and bypassPermissions: the two extremes

There are two more, at opposite ends. `dontAsk` is strict the other way: it
auto-denies anything not pre-approved, so in environments like CI you define
up front exactly what Claude may do. `bypassPermissions`, by contrast, turns
off all checks — it should only be used in isolated containers or VMs where
Claude can't harm your host. Neither shows up in the cycle on its own; you
have to enable it with a startup flag:

```bash
# Allow only what's pre-approved (good for CI)
claude --permission-mode dontAsk

# Skip all checks — isolated containers/VMs only
claude --permission-mode bypassPermissions
# equivalent: claude --dangerously-skip-permissions
```

One important point: you can't switch into these mid-session. If you didn't
start Claude with one of these flags, you have to restart the session to
enter `bypassPermissions`.

## Protected paths

A nice detail: in every mode except `bypassPermissions`, writes to
**protected paths** like `.git`, `.claude`, or `.zshrc` are never
auto-approved. So whatever mode Claude is in, it's kept one step away from
accidentally corrupting your repo state or its own configuration.

## Summary

Modes really tune a single question: "should I ask before this action?"
`default` asks for everything, `acceptEdits` frees up edits, `plan` thinks
first, `auto` flows with safety checks behind it. In day-to-day work I mostly
start in `default`, switch to `plan` to clarify the approach, then speed up
with `acceptEdits` or `auto` once I trust where it's going. No magic — just a
deliberate dial between trust and speed.

---

*Next post: [Models: Opus, Sonnet, Haiku]({{ '/en/blog/modeller-opus-sonnet-haiku/' | relative_url }})*