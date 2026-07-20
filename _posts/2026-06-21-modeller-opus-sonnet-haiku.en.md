---
layout: post
lang: en
permalink: /en/blog/modeller-opus-sonnet-haiku/
translation_url: /blog/modeller-opus-sonnet-haiku/
title: "Models: Opus, Sonnet, Haiku"
date: 2026-06-21
summary: "What's the difference between Claude Code's three main models? Which one fits which job, how does /model work, and what is opusplan for?"
tags: [claude-code, models, cost]
draft_series: "Claude Code Journey"
roadmap_topic: "Models: Opus, Sonnet, Haiku"
---

> This stop in the "Claude Code Journey" series tackles the question "which brain
> am I using?" Earlier posts covered
> [modes]({{ '/en/blog/modes-modlar/' | relative_url }}),
> [context]({{ '/en/blog/context-baglam/' | relative_url }}), and
> [tools]({{ '/en/blog/tools-araclar/' | relative_url }}); now it's the turn of
> the models behind them.

If you've used Claude Code for a while, you've probably seen the names "Opus,"
"Sonnet," and "Haiku." These aren't three separate products — they're different
sizes of the same model family. Think of them like different engine options for
the same car: some more powerful, some faster and more economical. Giving the
right job to the right engine has a real effect on both the result and the bill.

## Three models, three balance points

Roughly, you can think of it like this:

- **Opus** — the most capable model. For work that genuinely needs to "think":
  complex architectural decisions, hard debugging, multi-step planning. The most
  powerful, but also the most expensive and slowest.
- **Sonnet** — the balanced middle option and the default in most cases. It
  handles the bulk of everyday work — coding, editing files, writing tests —
  very well. A good middle ground between power and cost.
- **Haiku** — the fastest and most economical model. Ideal for simple,
  high-volume, or background work: small edits, classification, summarizing.

The key idea: you don't need to run everything on Opus. Most of the time you
actually don't. Cost-aware usage comes down to choosing the model based on the
weight of the task.

## Aliases and versions

In Claude Code you mostly pick models with aliases like `opus`, `sonnet`, and
`haiku`. These aliases resolve to a current model version depending on your
platform. As of this update, on the Anthropic API `opus` maps to Opus 4.8 and
`sonnet` maps to Sonnet 5. So you say "opus" and the system uses the latest
Opus version available.

If you want to pin a specific version, you can give the full model name:

```bash
claude --model claude-opus-4-8
```

Depending on the provider you use (Anthropic API, Bedrock, Vertex, etc.), the
version an alias resolves to can differ — so if reproducibility matters, writing
the full name is safer.

## Switching models mid-session: /model

One of the handiest commands is `/model`. It lets you switch models in the
middle of a session:

```
/model sonnet
```

This makes the workflow much smoother. For instance, you switch to Opus while
discussing architecture to get some real thinking, then drop to Sonnet for the
routine implementation — faster and cheaper.

## opusplan: the best of both

There's an alias that automates exactly this "plan with Opus, build with Sonnet"
habit: **opusplan**. In plan mode it uses Opus for complex reasoning, and when it
moves to execution (code generation) it automatically switches to Sonnet. So
without constantly toggling with `/model`, you get the strongest brain for
planning and the balanced, economical one for implementation.

## A separate choice for subagents

Another nice detail: you can set a separate model for subagents (helper agents).
If you don't specify one, subagents use the same model as the main session
(the default is `inherit`); you can set `sonnet`, `opus`, or `haiku` to pick a
different one. Handing a
high-volume but simple scanning job to a subagent on Haiku is a fast and cheap
pattern.

## A practical rule

The intuition I've settled on: stay on Sonnet by default. When you hit genuinely
hard architecture or a stubborn bug, step up to Opus (or opusplan). When there's
a lot of small, mechanical work, consider Haiku. Model choice is a small dial you
keep turning between quality and cost — and Claude Code makes turning that dial
quite easy.

## Summary

Opus is the most powerful, Sonnet the balanced default, Haiku the fastest and
most economical. You pick with aliases, switch mid-session with `/model`,
automate the plan-to-build handoff with opusplan, and give subagents their own
model. Choosing the model by the weight of the task means both better results and
a more reasonable bill.

---

*Next post: [Common Use Cases]({{ '/en/blog/yaygin-kullanim-senaryolari/' | relative_url }})*
