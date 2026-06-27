---
layout: post
lang: en
permalink: /en/blog/prompt-caching/
translation_url: /blog/prompt-caching/
title: "Prompt Caching"
date: 2026-06-27
summary: "Claude Code doesn't reprocess your whole history on every turn; it reads the unchanged part from cache. Let's see what breaks the cache, what keeps it, and how to set the TTL."
tags: [claude-code, prompt-caching, cost]
draft_series: "Claude Code Journey"
roadmap_topic: "Prompt Caching"
---

> Continuing the Cost section of the "Claude Code Journey" series. Last time we
> used [thinking modes and effort]({{ '/en/blog/thinking-modes-effort/' | relative_url }})
> to control how much the model thinks; this time we look at the quieter — but
> maybe more impactful — side of cost: **prompt caching**.

The model remembers nothing between requests. So on every turn Claude Code
re-sends the full context: the system prompt, the project context, every prior
message and tool result, plus your new message. Without caching, the API would
reprocess that whole pile each time. Prompt caching prevents exactly that: instead
of reprocessing the unchanged part, it reads it from what it already processed.

The good news: Claude Code manages this automatically unless you disable it.
Still, it pays to know how it works, because some actions invalidate the cache and
make the next turn slower and more expensive.

## How the cache is organized

The API matches the **prefix** — the start of each request — against content it
recently processed. The match is exact: a change anywhere in the prefix recomputes
everything after it. There's no per-file or per-segment caching. So Claude Code
puts the content that rarely changes first:

- **System prompt** — core instructions, tool definitions, output style. Changes
  when an MCP server connects or disconnects, or Claude Code is upgraded.
- **Project context** — CLAUDE.md, auto memory. Refreshes at session start, or
  after `/clear` or `/compact`.
- **Conversation** — your messages, Claude's responses, tool results. Changes
  every turn.

A change in the conversation layer leaves the top two cached. But a change to the
system prompt invalidates everything, because everything after it now sits behind
a different prefix.

## What breaks the cache

A few of these cost a one-time slow turn, after which the new prefix is cached.
Most are avoidable mid-task once you know they have a cost:

- **Switching models** — with `/model`, the next request reads the whole history
  uncached even if the content is identical; each model has its own cache.
- **An MCP server connecting or disconnecting** — tool definitions sit in the
  system prompt, so the cache breaks when the tool set changes.
- **`/compact`** — replaces your message history with a summary, deliberately
  invalidating the conversation layer.
- **Upgrading Claude Code** — a new version usually changes the system prompt.

One detail: the effort level is not part of the cache key, so changing it
mid-session has no effect on the cache. In other words, you can adjust the
thinking setting from the previous post without a second thought.

## What keeps the cache

These either append to the end of the conversation or don't touch the request at
all: editing files, invoking skills and commands (they inject instructions as
messages), `/recap`, `/rewind`, and spawning a subagent. The notable one: editing
CLAUDE.md or the output style mid-session doesn't break the cache — but the change
doesn't apply either. The new content loads on the next `/clear`, `/compact`, or
restart.

## How long it lives: TTL

The cache expires after a period of inactivity. There are two options: a
five-minute and a one-hour TTL (time-to-live). Claude Code picks for you based on
how you authenticate. On a Claude subscription it requests the one-hour TTL
automatically; since usage is part of your plan, it costs nothing extra. On an API
key the default is five minutes, and to opt into the one hour:

```bash
export ENABLE_PROMPT_CACHING_1H=1
```

To force five minutes while debugging use `FORCE_PROMPT_CACHING_5M=1`, and to turn
caching off entirely use `DISABLE_PROMPT_CACHING=1`.

## Seeing performance

The API returns two numbers on every response: tokens written to the cache this
turn (`cache_creation_input_tokens`) and tokens served from cache
(`cache_read_input_tokens`). Reads bill at roughly 10% of the standard input rate,
so a high read ratio means things are going well. The most practical way to watch
them live is a statusline script that reads the `current_usage` object. If
"creation" stays high turn after turn, something in your prefix keeps changing.

## Summary

The practical rule is simple: pick your model and connect your MCP servers at the
start of a session, and save `/compact` for natural breaks between tasks. The
fewer things you change mid-task, the warmer your cache stays — which means both
speed and cost.

---

*Next post: Managing Context: /compact and /clear*
