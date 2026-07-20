---
layout: post
lang: en
permalink: /en/blog/subscription-vs-api/
translation_url: /blog/subscription-vs-api/
title: "Subscription or API?"
date: 2026-06-14
summary: "Should you use Claude Code with a monthly subscription or an API key? How each one is billed, how they differ, and when each makes more sense."
tags: [claude-code, pricing, getting-started]
draft_series: "Claude Code Journey"
roadmap_topic: "Subscription or API?"
---

> The fourth stop in the "Claude Code Journey" series. Last time we made our
> [intro to the Claude CLI]({{ '/en/blog/claude-cli-tanitim/' | relative_url }});
> now we get to the practical question you hit the moment you first open it: how
> do I pay for this?

After you install Claude Code and type `claude` for the first time, you're met
with a login screen. There are two main paths here: you either sign in with a
**Claude subscription**, or you connect with an **API key**. Both run the exact
same tool, but their billing models are completely different. In this post I want
to compare the two in plain terms, because I spent a while at the start wondering
"which one is right for me?"

## Subscription: a fixed monthly fee

The first path is signing in with a **Pro** or **Max** subscription bought
through claude.ai. The logic is simple: you pay a fixed monthly fee, and in
return you use Claude Code (and claude.ai chat at the same time) within certain
usage limits.

- **Pro** (~$20/month): the entry level for individual, day-to-day use. Works in
  the terminal, VS Code, JetBrains, and the desktop app.
- **Max** (two tiers, around $100 and $200/month): for people who keep hitting
  Pro's limits. It offers wider usage windows.

Usage here is measured against time windows (for example five-hour sessions) and
weekly caps; you're not counting individual tokens. That's the nice part: you
know roughly what the bill will be at the start of the month, no surprises.

## API: pay as you go

The second path is getting an API key from the
[Anthropic Console](https://console.anthropic.com/){:target="_blank" rel="noopener"} and pointing Claude Code at
it. There's no fixed fee here; you pay **per token**. That is, the text you send
the model (input) and the text the model produces (output) are billed per million
tokens, and the price differs by model (Opus is the most expensive tier, Haiku
the cheapest).

```bash
# Pointing Claude Code at an API key via an environment variable
export ANTHROPIC_API_KEY="sk-ant-..."
claude
```

The advantage of this model is flexibility: use it once a month and you pay
once; use it heavily and you pay heavily, with no monthly floor. The downside is
less predictability — on a day where you put it to heavy work, the bill can grow
quickly.

## So which one?

There's no single answer, but a simple intuition: if you use it **regularly and
interactively**, a subscription is usually cheaper and more relaxing. If you
work with Claude in the terminal a few hours every day, a fixed monthly fee
tends to beat per-token billing.

The API shines when: you use it very rarely (so a monthly floor isn't worth it),
or the opposite — you're doing **programmatic** work like automation or CI. In
fact, a common pattern is to use both: a subscription for daily hands-on work,
and an API key for automations running in the background.

My advice: start small. Try a Pro subscription first, and if you find yourself
constantly hitting limits, move up to Max or to the API. There's no point buying
the priciest plan before you've seen your real usage.

## Summary

A subscription (Pro/Max) gives you comfortable use within set limits for a fixed
monthly fee; it's ideal for predictable, interactive work. The API gives you
flexible per-token billing; it makes sense for rare or automation-heavy use.
Both run the same tool — the only difference is how you pay. In the next post,
we'll set money aside and look at the different ways to use Claude.

---

*Next post: [Ways to Use Claude]({{ '/en/blog/claude-kullanim-yollari/' | relative_url }})*