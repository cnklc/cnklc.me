---
layout: post
lang: en
permalink: /en/blog/claude-code-yolculugu-tamamlandi/
translation_url: /blog/claude-code-yolculugu-tamamlandi/
title: "The Claude Code Journey Is Complete: 36 Posts, One Roadmap"
date: 2026-07-14
summary: "The series that ran one post per day for about a month is complete. In this post I cover the source it was built on — the roadmap.sh/claude-code roadmap — and where to start."
tags: [claude-code, series, roadmap]
draft_series: "Claude Code Journey"
---

> This post is the wrap-up of the "Claude Code Journey" series. It started with
> [what vibe coding is]({{ '/en/blog/vibe-coding-nedir/' | relative_url }}) and
> ended with [mobile access and scheduled tasks]({{ '/en/blog/mobile-channels-scheduling/' | relative_url }}).
> There are 36 stops in between.

About a month ago I started a series: explaining Claude Code from zero to
advanced, in both Turkish and English. One topic per day, each topic as a post
in two languages. As of today, all 36 posts are live. In this wrap-up I want to
explain how the series was structured and — most importantly — where the topic
list came from.

## The topic list isn't my invention: roadmap.sh

Let me be upfront: the series' topics and scope are not mine. The list is based
on the community-driven [Claude Code roadmap](https://roadmap.sh/claude-code){:target="_blank" rel="noopener"}
from [roadmap.sh](https://roadmap.sh){:target="_blank" rel="noopener"}.

If you don't know roadmap.sh: it's a free, open-source site publishing learning
roadmaps for developers. Alongside the classics like backend, frontend, and
DevOps, there's a roadmap for Claude Code too. I took the topics from that
roadmap, reordered them according to my own learning logic, and grouped them
into nine sections: Getting Started, Introduction, Fundamentals, Usage, Cost,
Commands, Automation, Configuration, and Advanced.

So the skeleton comes from roadmap.sh; the flesh and bone come from research
done separately for each post. Before writing each topic I went to the official
Anthropic docs; I didn't use a command, flag, or setting name without verifying
it against the documentation. Whenever I couldn't verify a detail, I preferred
leaving it out over getting it wrong.

## What does the series cover?

Sketching a rough map: the series starts with
[the coding agent concept]({{ '/en/blog/coding-agent-nedir/' | relative_url }})
and [an intro to the CLI]({{ '/en/blog/claude-cli-tanitim/' | relative_url }});
continues through fundamentals like
[CLAUDE.md]({{ '/en/blog/claude-md-temelleri/' | relative_url }}),
[skills]({{ '/en/blog/skills-genel-bakis/' | relative_url }}), and
[context management]({{ '/en/blog/context-baglam/' | relative_url }}); and
finishes with advanced topics like
[hooks]({{ '/en/blog/hooks-olaylar-matcherlar/' | relative_url }}),
[subagents]({{ '/en/blog/subagents-ajan-takimlari/' | relative_url }}), and
[MCP]({{ '/en/blog/mcp-ile-arac-baglama/' | relative_url }}).

If you'd rather see it all on one page: the
[Claude Code Guide]({{ '/en/claude-code-guide/' | relative_url }}) lists all 36
posts, grouped by section and arranged in learning order. That's the entry
point I recommend for anyone who wants to follow the series from the start.

## A small confession about the process

The production flow of the series was itself a Claude Code example: I had
Claude generate the first drafts through a scheduled task that ran every day,
then reviewed and edited each draft before publishing. In other words, the
series was written with the very tool it describes. The details of that flow
deserve a post of their own; if there's interest, I'll write it.

## What's next?

The topic list is done, but Claude Code keeps evolving; I'll update the
existing posts as significant changes land. If you have feedback, corrections,
or a topic you think is missing, reach out — the most useful posts usually
start with a question.

One last thank-you: to the [roadmap.sh](https://roadmap.sh/claude-code){:target="_blank" rel="noopener"}
community that built the skeleton, and to everyone who followed the series.
