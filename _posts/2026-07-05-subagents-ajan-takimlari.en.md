---
layout: post
lang: en
permalink: /en/blog/subagents-ajan-takimlari/
translation_url: /blog/subagents-ajan-takimlari/
title: "Subagents and Agent Teams"
date: 2026-07-05
summary: "What is a subagent, what is it good for, and how do you define your own? We look at the built-in agents, definition files, and the difference from 'agent teams'."
tags: [claude-code, subagents, agents]
draft_series: "Claude Code Journey"
roadmap_topic: "Subagents and Agent Teams"
---

> Continuing the "Claude Code Journey" series. Last time we covered
> [creating a skill]({{ '/en/blog/skill-olusturma/' | relative_url }}); this time
> we look at subagents — the way to hand work off to another agent.

In a long session the main conversation's context fills up fast. Chasing a bug,
you read dozens of files, log lines pile up, and output you'll never look at
again bloats the context. That's exactly what a subagent is for: a specialist
helper that does the side work in its own separate context and returns only the
summary.

## What is a subagent?

A subagent is a separate assistant that runs in its own context window, with its
own system prompt and its own tool permissions. When Claude matches a task to a
subagent's description, it delegates the work; the subagent runs independently
and returns the result. The main benefit is preserving context: the noise of the
research never enters your main conversation. On top of that, you can restrict
its tools to limit what it can do, reuse the same definition across projects, and
specialize its behavior with a focused system prompt.

## Built-in subagents

Claude Code ships with a few agents and uses them itself when appropriate:

- **Explore** — a fast, read-only search agent. It roams the codebase and finds
  the relevant places; `Write` and `Edit` are denied to it.
- **Plan** — a research agent used in plan mode to gather context before
  presenting a plan. It's read-only too.
- **general-purpose** — a general agent with access to all tools, for
  multi-step work that needs both exploration and changes.

## Defining your own subagent

Subagents are Markdown files with YAML frontmatter followed by a system prompt.
Put them in `.claude/agents/` for a project, or `~/.claude/agents/` for all your
projects. The easiest route is to ask Claude to write one, but the file looks
roughly like this:

```markdown
---
name: code-reviewer
description: Reviews code for quality and best practices
tools: Read, Glob, Grep
model: sonnet
---

You are a code reviewer. When invoked, analyze the code and provide
specific, actionable feedback on quality, security, and best practices.
```

Only `name` and `description` are required. If you omit `tools`, the agent
inherits all of them; restricting it to `Read, Glob, Grep` as above gives you a
read-only reviewer. `model` can take a value like `sonnet`, `opus`, or `haiku`.
When you save the file, Claude Code picks it up within a few seconds — no restart
needed.

## How do you invoke one?

The simplest way is to name the agent in your prompt — Claude decides whether to
delegate:

```text
Use the code-reviewer subagent to look at my auth changes
```

If you want a specific agent to run for sure, type `@` and pick it from the list;
that guarantees the task goes to that agent. To start a whole session with a
single agent's prompt and tool restrictions, use the `--agent <name>` flag.

A small note: `/agents` used to open a wizard. In current versions that wizard is
gone; `/agents` now just reminds you to ask Claude or edit the `.claude/agents/`
file yourself.

## So what about "agent teams"?

Subagents work within a single session. When you want to send several agents at
different parts of a task at once and have a lead agent split up the work and
merge the results, you've moved into **agent teams** territory. In practice a
subagent is a single helper you delegate to in order to keep context clean; an
agent team is the coordination of multiple agents talking to each other. The
latter is more powerful but more complex; for most everyday work a single
subagent is plenty.

## Summary

A subagent is a separate assistant that does a side task in its own context and
returns you the summary, with its tools and model restrictable. The built-in
ones come ready to use, and you add your own with a few lines of Markdown. For
complex, many-armed work, you can step up to teams that coordinate multiple
agents.

---

*Next post: [Plan Mode]({{ '/en/blog/plan-mode/' | relative_url }})*
