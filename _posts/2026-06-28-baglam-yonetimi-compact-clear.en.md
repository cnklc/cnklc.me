---
layout: post
lang: en
permalink: /en/blog/baglam-yonetimi-compact-clear/
translation_url: /blog/baglam-yonetimi-compact-clear/
title: "Managing Context: /compact and /clear"
date: 2026-06-28
summary: "In long sessions the context window fills up and every message gets pricier. Here's the difference between starting fresh with /clear and summarizing-and-continuing with /compact, and when to reach for each."
tags: [claude-code, context, cost]
draft_series: "Claude Code Journey"
roadmap_topic: "Managing Context: /compact and /clear"
---

> Continuing on the cost side of the "Claude Code Journey" series. In the
> [previous post on prompt caching]({{ '/en/blog/prompt-caching/' | relative_url }})
> we looked at how to lower the cost of repeated context; now we turn to
> keeping the context itself small, with the `/compact` and `/clear` commands.

On every message Claude Code sends the conversation so far, the files it has
read, and command output along to the model. The longer a session runs, the
bigger that pile gets; as the context window fills up, each new message spends
more tokens. The good news is there are two simple commands for managing this,
and the line between them is clear.

## /clear: a clean slate

When you switch to unrelated work, the right move is to reset the conversation
entirely. If the files and discussion from your previous task no longer help,
carrying them in context is just waste.

```text
/clear
```

This command clears conversation history and frees up context (aliases:
`/reset`, `/new`). You fixed a bug in the morning and in the afternoon you're
moving to a completely different module — a `/clear` in between keeps the model
from filling its head with details of the old job.

One thing to note: if you want to label the session before clearing it, you can
use `/rename`, then come back later with `/resume`. So "a clean slate" doesn't
mean losing the old session for good.

## /compact: summarize and continue

Sometimes you're not abandoning the work, but the conversation has still grown
longer than it needs to be. That's where `/compact` comes in: it boils the
conversation down to a summary, so the context shrinks without disappearing
altogether.

Optionally you can tell it what to focus on:

```text
/compact focus on code samples and API usage
```

This tells the model what to preserve during summarization — for instance, in a
long integration session where what you actually care about is code snippets
and API calls, you can ask it to drop the chatter and keep those.

If you don't want to type the same preference every time, you can also put a
standing instruction in your `CLAUDE.md`:

```markdown
# Compact instructions

When you are using compact, please focus on test output and code changes
```

## There's automatic compaction too

Even if you do nothing, Claude Code summarizes conversation history on its own
as it approaches the context limit (auto-compaction). So `/compact` is really
the manual, steerable version of that automatic behavior. Leaving it to the
automatic path is often enough; but when what gets preserved matters to you,
calling it by hand gives better results.

## Which one, when?

The distinction is simple: **if the topic changes, `/clear`; if the topic is
the same but the conversation has bloated, `/compact`.** The first throws the
history away, the second summarizes and keeps it.

To see where you stand, two helper commands are useful. `/context` shows how
much of your context is full as a colored grid; `/cost` reports how many tokens
you've spent in the session:

```text
/context
```

Running these now and then lets you base the "should I compact?" question on
data rather than a guess.

It's a small but real win: managing context deliberately lowers cost and also
improves answer quality, by clearing out stale details that distract the model.
Two commands, one habit.

---

*Next post: claude CLI Commands (-p, -c, -r)*
