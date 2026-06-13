---
layout: post
lang: en
permalink: /en/blog/claude-cli-tanitim/
translation_url: /blog/claude-cli-tanitim/
title: "Getting Started with the Claude CLI"
date: 2026-06-14
summary: "Claude Code's face in the terminal: how to install it, how the first session starts, and why it's more than 'just a command-line tool'."
tags: [claude-code, cli, terminal]
draft_series: "Claude Code Journey"
roadmap_topic: "Getting Started with the Claude CLI"
---

> The third stop in the "Claude Code Journey" series. Last time we looked at what
> a [coding agent]({{ '/en/blog/coding-agent-nedir/' | relative_url }}) is in the
> abstract; in this post we come down to that agent's concrete face — the Claude
> CLI in the terminal.

For two posts I've been talking about concepts: vibe coding, the coding agent.
Now it's time to put fingers on the keyboard. Claude Code's most fully featured
form lives in the terminal, and it's called the **Claude CLI**. In this post
we'll walk the path from installation to the first session.

## What exactly is the Claude CLI?

By its official definition, Claude Code is an agentic coding tool that reads your
codebase, edits files, runs commands, and integrates with your development tools.
The CLI is its terminal version: a fully featured interface where you manage
projects, write code, and have files edited straight from the command line.

One important point: Claude Code doesn't live in a single place. Terminal,
VS Code, JetBrains, the desktop app, and the browser — they all connect to the
same engine. So your `CLAUDE.md` files, your settings, and the tools you connect
work across every surface. I'm starting the series from the terminal because
that's the most transparent and most controllable surface.

## Installation

The method the docs currently recommend is a **native install**. On macOS, Linux
and WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

On Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

The nice thing about the native install is that it keeps itself up to date in
the background — you don't have to track versions. If you prefer Homebrew on
macOS:

```bash
brew install --cask claude-code
```

(Homebrew installs don't auto-update; you'll need to run `brew upgrade
claude-code` from time to time.) The npm method that used to be common is still
around too (`npm install -g @anthropic-ai/claude-code`, needs Node 18+), but the
path the docs highlight today is the native install. If you're just starting
out, following the recommended one is the least surprising option.

## The first session

Once installation is done, the rest is surprisingly minimal. You go into a
project and type `claude`:

```bash
cd my-project
claude
```

On the first run it directs you to log in. Most surfaces want either a Claude
subscription or an Anthropic Console account — subscription vs. API is a topic in
its own right, and I'll get into it in the next post. Once you're logged in, an
interactive session opens and you can talk to Claude as if you were chatting:
"explain what this module does," "fix this test," and so on.

## One-off commands

The interactive session isn't everything. Sometimes you want to call Claude for a
single job and get its output. For that you can pass the command directly in
quotes:

```bash
claude "write tests for the auth module, run them, and fix any failures"
```

A step further is wiring the CLI into other tools in the Unix philosophy. With
the `-p` flag (print/headless) you can make Claude part of a pipeline:

```bash
tail -200 app.log | claude -p "summarize anything that looks anomalous"
```

Here Claude is no longer a chat session on screen; it's a tool that takes input
and prints a result, one you can embed inside scripts and CI. This "headless"
side deserves its own post later in the series; for now it's enough to know the
door exists.

## A small warning

Let me repeat here what I said in the earlier posts: because the CLI can run
commands and change files, understanding and approving what it does is your job.
Especially when piping installation scripts from the internet into `bash`, it's
worth knowing what you're running. A powerful tool, but control still rests with
you.

## Summary

The Claude CLI is the coding agent's fully featured face in the terminal. Its
installation is a single line, and its first session is as simple as typing
`claude` and logging in. In interactive mode you can chat and get work done, and
with one-off commands or `-p` you can embed it into scripts. Because it all
connects to the same Claude Code engine, everything you set up in the terminal
also applies on the other surfaces.

---

_Next post: Subscription or API Usage?_
