---
layout: post
lang: en
permalink: /en/blog/agentic-loop-nedir/
translation_url: /blog/agentic-loop-nedir/
title: "What Is the Agentic Loop?"
date: 2026-07-11
summary: "The loop at the heart of Claude Code: gather context, take action, verify results. A close look at how the three phases work and where you stand in the loop."
tags: [claude-code, agentic-loop, architecture]
draft_series: "Claude Code Journey"
roadmap_topic: "What Is the Agentic Loop?"
---

> This time in the "Claude Code Journey" series we go under the hood. Back
> when I explained
> [what a coding agent is]({{ '/en/blog/coding-agent-nedir/' | relative_url }}),
> I promised a dedicated post on this loop — here it is.

When you give Claude Code a task, what scrolls across your screen isn't a
random shower of commands; it's the repetition of a specific pattern. The
official docs call it the **agentic loop**, and it has three phases:
**gather context**, **take action**, and **verify results**. The trio keeps
turning until the task is done.

## Three phases, one loop

The phases look sequential on paper but blend together in practice. Let's
take a concrete example. You asked:

```text
fix the failing tests
```

Claude's typical path: first it runs the test suite to see what's broken,
reads the error output, searches for and reads the relevant source files
(gathering context), then makes the fix (taking action), and finally reruns
the tests to confirm they pass (verification). If the tests are still red,
the loop wraps back to the start — this time with more information than the
previous lap.

An important nuance: the loop's shape adapts to the task. A question about
your codebase often ends in the context-gathering phase alone; a refactor
leans heavily on verification. The model decides what each step requires
based on what it learned from the previous one.

## Engine and chassis: model + tools

Two components drive the loop. The **model** is the reasoning side: it
reads code, understands how the pieces connect, and decides what needs to
change. **Tools** are the acting side: reading and writing files, searching,
running commands, reaching the web. Without tools the model could only
answer in text; the output of every tool call feeds back into the loop and
shapes the next decision.

The docs have a nice name for the structure wrapping this pair: Claude Code
is the **agentic harness** around the model — it supplies the tools, the
context management, and the execution environment that turn a language
model into a capable coding agent. It's the whole of what we saw in pieces
in this series' [tools]({{ '/en/blog/tools-araclar/' | relative_url }}) and
[context management]({{ '/en/blog/context-baglam/' | relative_url }}) posts.

## You're in the loop too

The loop is autonomous but not a closed circuit. You have two ways to
intervene: pressing `Esc` stops Claude immediately and cancels the running
tool call; or you can type a correction while Claude works and press
`Enter` — it reads your message once the current action completes and
adjusts course. So your first prompt doesn't have to be perfect; if things
head the wrong way, you steer mid-loop.

There are two brakes on the safety side as well: a snapshot (checkpoint) is
taken before every file edit, and if something goes wrong you can rewind by
pressing `Esc` twice. The permission system decides what can happen without
asking. But note: checkpoints only cover file changes; actions that touch
external systems like databases or APIs can't be rewound.

## Summary

The agentic loop is the gather–act–verify trio repeated until the task is
done. The model thinks, the tools act, every output feeds the next decision
— and you can step in at any moment. Once you have this mental model,
Claude Code's behavior becomes much more predictable.

---

*Next post: [Best Practices for Everyday Use]({{ '/en/blog/kullanim-en-iyi-pratikleri/' | relative_url }})*
