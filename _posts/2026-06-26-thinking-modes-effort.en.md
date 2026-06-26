---
layout: post
lang: en
permalink: /en/blog/thinking-modes-effort/
translation_url: /blog/thinking-modes-effort/
title: "Thinking Modes & Effort"
date: 2026-06-26
summary: "The more Claude 'thinks', the more tokens it spends. Effort levels, ultrathink, and turning thinking on or off — the settings that hit your bill directly."
tags: [claude-code, thinking, cost]
draft_series: "Claude Code Journey"
roadmap_topic: "Thinking Modes & Effort"
---

> We're in the Cost section of the "Claude Code Journey" series. Last time we tried
> to make sense of [Claude pricing]({{ '/en/blog/claude-fiyatlandirma/' | relative_url }});
> now we turn to a setting that hits your bill directly — how much the model
> "thinks."

## Thinking is a cost line item

Extended thinking is the reasoning Claude emits before it answers. Those steps
meaningfully improve performance on complex planning and logic tasks, but they
aren't free: thinking tokens are billed as output tokens, and the default budget
can run to tens of thousands of tokens depending on the model. So "how much
should it think?" is also the question "how much do I want to pay?"

## Effort: tuning how much it thinks

On modern models the main lever for how much thinking happens is the effort
level. It drives adaptive reasoning: the model looks at each step's difficulty and
decides for itself whether to think. The available levels depend on the model —
on Opus 4.8, for example, you get `low`, `medium`, `high`, `xhigh`, and `max`,
with `high` as the default.

To change the level mid-session, use the `/effort` command. Called with no
arguments it opens an interactive slider; you can also set it directly:

```text
/effort low
```

For short, routine work `low` is faster and cheaper; for an architectural
decision or a multi-step debugging session, `high` or above makes more sense. The
active level is shown next to the logo and spinner (for example "with low
effort"), so you can see which setting you're on.

To set it just for one session at launch, use the flag:

```bash
claude --effort low
```

If you want a persistent default, the `CLAUDE_CODE_EFFORT_LEVEL` environment
variable or the `effortLevel` setting in your settings file does the job. (`max`
is session-only and isn't accepted in the settings file.)

## One-off deep reasoning: ultrathink

If you want deeper thinking on a single message without changing the whole
session's level, just include `ultrathink` anywhere in your prompt:

```text
get to the root of this race condition and fix it, ultrathink
```

One thing worth noting: phrases like "think", "think hard", and "think more" —
contrary to what's often claimed — are not special keywords; they're passed
through as ordinary text. Only `ultrathink` is recognized, and it adds an
in-context instruction; the effort level sent to the API doesn't change.

## Seeing and disabling thinking

Thinking output is collapsed by default. Press `Ctrl+O` to switch to verbose mode
and see the reasoning as gray italic text. To toggle thinking for the current
session, use `Option+T` on macOS or `Alt+T` on Windows and Linux. You can change
the global default through `/config` (it's stored as `alwaysThinkingEnabled` in
your settings file).

For simple work where you want to cut costs, you can turn thinking off entirely:

```bash
MAX_THINKING_TOKENS=0
```

An important caveat: thinking tokens are billed even while they're collapsed. Not
seeing the output doesn't mean you aren't paying for it — what dials the cost down
is the effort level and the thinking setting, not whether the output is visible on
screen.

## Summary

Thinking is a lever that makes Claude better at hard problems but spends tokens.
The effort level is its main control: pick somewhere between `low` and `max` based
on the weight of the task, use `ultrathink` for one-off depth, and turn it off
when it's unnecessary. Choosing the right level is one of the most practical ways
to save on both speed and your bill.

---

*Next post: Prompt Caching*
