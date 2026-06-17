---
layout: post
lang: en
permalink: /en/blog/skills-genel-bakis/
translation_url: /blog/skills-genel-bakis/
title: "Skills Overview"
date: 2026-06-17
summary: "What is a skill, how is it different from CLAUDE.md, and why does moving repeated work into a SKILL.md file pay off? A first look at skills in Claude Code."
tags: [claude-code, skills, automation]
draft_series: "Claude Code Journey"
roadmap_topic: "Skills Overview"
---

> The sixth stop in the "Claude Code Journey" series. Last time we looked at the
> [basics of CLAUDE.md]({{ '/en/blog/claude-md-temelleri/' | relative_url }}).
> Now we take a step further into **skills** — the way to package up repeated
> work.

When we talked about CLAUDE.md I said this: it's for persistent *facts* — how the
project works, which libraries you use, your coding standards. But what if you
need a *procedure* over and over again? If you keep pasting the same "do these
steps in order" instructions, that thing is no longer a fact, it's a workflow.
This is exactly where skills come in.

## What is a skill?

By its official definition, skills "extend what Claude can do." In practice a
skill is just a `SKILL.md` file you write instructions into. Once you create it,
Claude adds it to its toolkit. It works two ways: either Claude loads it
automatically when it's relevant, or you invoke it directly by typing
`/skill-name`.

The practical rule the docs give is clear: create a skill when you keep pasting
the same instructions, checklist, or multi-step procedure into chat, or when a
section of CLAUDE.md has grown from a fact into a procedure.

## The smallest example

The only required file for a skill is `SKILL.md`. Its barest form looks like
this:

```yaml
---
description: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed or wants to review their diff.
---

## Instructions

Summarize the changes above in two or three bullet points, then
list any risks you notice such as missing error handling, hardcoded
values, or tests that need updating.
```

The `description` field in the frontmatter is critical: Claude decides *when* to
load the skill automatically by reading that description. So it pays to write it
clearly — what it does and in which situation to use it.

## The difference from CLAUDE.md: when does it load?

The real beauty here is context economy. All of CLAUDE.md is loaded into memory
at the start of every session. With a skill, only its *description* sits in
context; the body itself loads only when the skill is invoked. So keeping a long
reference text as a skill costs almost nothing until you actually need it. In the
words of the docs: "a skill's body loads only when it's used."

## Where skills live

Where you put a skill determines who can use it:

- **Personal:** `~/.claude/skills/<name>/SKILL.md` — applies across all your
  projects.
- **Project:** `.claude/skills/<name>/SKILL.md` — this project only, shared with
  your team via git.
- **Plugin:** ships inside a plugin, under a `plugin-name:skill-name` namespace.

When the same name exists at multiple levels there's a precedence order:
enterprise > personal > project. Nicely, Claude Code watches skill directories
for live changes; in most cases adding a new skill takes effect without even
restarting the session.

## Who can invoke it?

By default both you (by typing `/name`) and Claude (automatically) can invoke a
skill. But two frontmatter fields let you restrict that:

- `disable-model-invocation: true` → only you can invoke it. Ideal for work with
  side effects: `/deploy`, `/commit`. You don't want Claude deciding to deploy
  just because the code "looks ready."
- `user-invocable: false` → only Claude can invoke it. For background knowledge
  that isn't an action but Claude should know — for example a context skill that
  explains how a legacy system works.

## Summary

A skill is the way to package a repeated workflow into a `SKILL.md` file.
CLAUDE.md holds facts; a skill holds procedures — and smartly, it doesn't waste
context because it only loads when needed. Write the description clearly, put it
in the right place, decide who can invoke it. In the next post we'll look at what
Claude actually uses to get this work done — **tools**.

---

*Next post: Tools*
