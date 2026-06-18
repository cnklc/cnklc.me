---
layout: post
lang: en
permalink: /en/blog/tools-araclar/
translation_url: /blog/tools-araclar/
title: "Tools: Claude Code's Hands and Eyes"
date: 2026-06-18
summary: "What makes an agent an agent is its tools. How do Claude Code's file-reading, file-writing and command-running tools work, which ones ask permission, and why does that split matter?"
tags: [claude-code, tools, fundamentals]
draft_series: "Claude Code Journey"
roadmap_topic: "Tools"
---

> Continuing the Fundamentals chapter of the "Claude Code Journey" series. Last
> time we took an overview of [Skills]({{ '/en/blog/skills-genel-bakis/' | relative_url }});
> this time we go one level deeper, to the place where the agent actually touches
> the world — its **tools**.

Early in the series I said "a coding agent reads, writes, runs and fixes." But
*with what* does it do all that? The answer is tools. Without tools, Claude would
just be a model that produces text. With tools, it becomes an agent that can touch
your files and use your terminal.

## What exactly is a tool?

Claude Code ships with a built-in set of tools. Each tool has a name, and those
names aren't arbitrary — you use them verbatim in permission rules, hooks, and
subagent definitions. So names like `Read`, `Bash`, and `Edit` are both the
capabilities Claude uses and the configuration keys you reach for.

In day-to-day use you don't type these names yourself; Claude mostly decides
which tool to use when. But knowing what's spinning behind the curtain helps you
understand each tool's behavior and its limits.

## The core tools

A handful of them show up in almost every session:

- **Read:** Reads a file's contents with line numbers. It only reads files, not
  directories (to list a directory it calls `ls` through Bash). And it goes
  beyond plain text: it *sees* images, and can read PDFs and Jupyter notebooks.
- **Glob:** Finds files by name pattern — for example `src/**/*.ts`.
- **Grep:** Searches *inside* files for a pattern. It's built on ripgrep, not
  POSIX grep, so the regex syntax differs a bit (finding `interface{}` in Go
  takes the pattern `interface\{\}`).
- **Bash:** Runs terminal commands. Each command runs in its own process, the
  default timeout is two minutes, and variables you `export` don't carry over to
  the next command.
- **Edit:** Makes targeted edits to a file.
- **Write:** Creates a file or overwrites it from scratch.

Beyond these there are many more — connecting custom tools via MCP, the web-facing
`WebFetch`/`WebSearch`, the background-watching `Monitor`, and others. Your exact
tool set can vary with your provider, platform, and settings.

## The split that really matters: tools that ask permission

Look at the tool list and one column jumps out: "permission required?" That split
sits at the heart of working safely with an agent.

Tools that only *read* information — `Read`, `Glob`, `Grep` — run without asking.
At worst they've seen something; they don't change anything. But tools that *change*
the world — `Bash`, `Edit`, `Write`, `WebFetch` — ask you by default. The logic is
simple: get your approval before the agent deletes a file or runs a command.

Edit has one more safety rule, and it's both sensible and instructive: **before
editing a file, Claude must have read it in the current session.** It can't make
blind changes; it has to have seen what it's modifying.

## Restricting a tool

If you want to turn a tool off entirely, just add its name to the `deny` list in
your permission settings. Finer-grained control is possible too — you can allow
only certain commands or certain directories:

```text
Bash(npm run *)
Read(~/secrets/**)
Edit(/src/**)
```

And if you're curious which tools are loaded, the easiest path is to ask Claude
directly:

```text
What tools do you have access to?
```

## Summary

Tools are what turn a language model into an agent. Claude Code uses its reading
tools (Read, Glob, Grep) freely, and asks before using its changing tools (Bash,
Edit, Write). Understanding this read/write split is the key to knowing both why
you can trust the agent and where you should keep a hand on the brake. If tools
are the agent's hands, the next topic is its memory: context.

---

*Next post: Managing Context*
