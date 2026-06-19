---
layout: post
lang: en
permalink: /en/blog/context-baglam/
translation_url: /blog/context-baglam/
title: "Managing Context"
date: 2026-06-19
summary: "What is the context window — Claude Code's 'memory' — really? What fills it, what happens when it's full, and how do you keep it under control with /clear, /compact, and /context?"
tags: [claude-code, context, memory]
draft_series: "Claude Code Journey"
roadmap_topic: "Managing Context"
---

> Continuing the "Claude Code Journey" series. Last time we looked at the
> [tools]({{ '/en/blog/tools-araclar/' | relative_url }}) Claude uses; this time
> we turn to where everything those tools produce piles up — the context.

After working with Claude Code for a while, I noticed something: how well it
does often depends directly on *what it remembers* at that moment. The technical
name for that "what it remembers" is the **context window**. I'd argue that half
of using Claude Code effectively comes down to understanding it.

## What is the context window?

The context window is the total amount of text Claude can see in the current
conversation. Everything you've typed, everything Claude replied, every file it
read, every command it ran and the output it got back — all of it lives inside
this window. On current models the window is roughly **200,000 tokens** (a few
hundred pages of text).

The key point: Claude doesn't "know" anything outside the window. So context is
like Claude's short-term memory. That means it matters not just what you put in,
but how much space it takes up.

## What fills the window?

The window isn't empty when a session opens. A few things load automatically:
the system instructions, any `CLAUDE.md` files you have, auto memory left over
from previous sessions (`MEMORY.md`), environment info, and the names of any
connected MCP tools. Then it really fills up as you work — especially when Claude
reads large files or long command outputs come back.

This is exactly where the `/context` command helps. Run it and it shows you,
category by category, what's filling the window. It's the first place I look when
I want to understand why something slowed down or got "forgotten."

```bash
/context
```

## What happens when it fills up?

At first I worried this would end the session, but it doesn't. As it nears the
limit, Claude Code **compacts the context automatically** (auto-compaction): it
drops the oldest tool outputs first, then summarizes the rest of the conversation
if needed. So the session tidies itself up and keeps going.

Automatic is nice, but there's no guarantee it keeps exactly what I want. That's
why I prefer to take the wheel myself.

## Taking control: /clear and /compact

The two core commands I rely on:

- **`/clear`** — wipes the context entirely and starts with a clean slate. I use
  it when I switch to completely unrelated work, so leftovers from the previous
  task don't bleed into the new one.
- **`/compact`** — instead of deleting history, it replaces it with a summary. My
  favorite part is that I can tell it what to focus on:

```bash
/compact focus on the auth bug fix
```

In practice my habit is: `/clear` to clear unrelated buildup before starting a
long new task, and a `/compact` with focus instructions when I want to free up
space while keeping the important part of the current work.

There's also `/memory`, which shows which `CLAUDE.md` and auto memory files
loaded at startup. I check it when I'm curious about what's in the "invisible"
part of the context.

## Why does this matter so much?

Because context management affects both **quality** and **cost**. When the window
is clogged with irrelevant old output, Claude's attention scatters and answers get
weaker. And every token is counted when processed — so a messy context means both
worse results and higher cost. Keeping the window clean and on-topic is, to me,
one of the most practical habits you pick up working with Claude Code. (I'll come
back to the cost side later in the series.)

## Summary

The context window is Claude's short-term memory: whatever it sees is in there.
`/context` shows you what's inside, Claude auto-compacts when it's full, but the
real control lives in `/clear` and `/compact`. In the next post we'll look at a
topic closely tied to context — Claude Code's different **modes**.

---

*Next post: Modes*
