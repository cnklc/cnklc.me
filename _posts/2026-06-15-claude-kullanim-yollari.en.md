---
layout: post
lang: en
permalink: /en/blog/claude-kullanim-yollari/
translation_url: /blog/claude-kullanim-yollari/
title: "Ways to Use Claude"
date: 2026-06-15
summary: "Claude Code doesn't only live in the terminal. Terminal, IDE extensions, a desktop app, the browser and more — same engine, different faces."
tags: [claude-code, setup, workflow]
draft_series: "Claude Code Journey"
roadmap_topic: "Ways to Use Claude"
---

> The fifth stop in the "Claude Code Journey" series. Last time we looked at the
> [subscription vs. API]({{ '/en/blog/subscription-vs-api/' | relative_url }})
> question. Now we step back and look at how many different places the same tool
> can be used from.

In the early posts we always pictured Claude Code in the terminal: you `cd` into
a directory, type `claude`, and the conversation starts. That's true, but it's
an incomplete picture. In the words of the official docs, Claude Code is a tool
available "in your terminal, IDE, desktop app, and browser." And underneath all
of them runs the **same engine**.

## Terminal: the full-featured base

The terminal is still the most capable face. Every CLI command, flag and feature
lands here first. Installing takes a single line:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

On Windows there's `irm https://claude.ai/install.ps1 | iex` for PowerShell;
on macOS you can use Homebrew (`brew install --cask claude-code`), and on Linux
package managers like apt/dnf/apk are options too. After installing, just `cd`
into your project and run `claude` — on first launch it prompts you to log in.

## IDE extensions: VS Code and JetBrains

If you don't want to leave your editor, there are two official extensions. The
**VS Code** extension (it also works in Cursor) brings inline diffs, `@`-mention
file references, plan review and conversation history right into the editor. You
can install it by searching "Claude Code" in the Extensions panel.

On the **JetBrains** side there's a plugin for IDEs like IntelliJ, PyCharm and
WebStorm. Here the plugin is a layer on top of the CLI: you install the CLI
separately, and the plugin adds features like visual diffs and selection-context
sharing.

## Desktop app

For people who want neither the terminal nor an IDE — just a standalone app —
there's a desktop version (macOS and Windows). You can review diffs visually,
run multiple sessions side by side, schedule recurring tasks, and kick off cloud
sessions. It requires a paid subscription.

## Web: no local setup

At `claude.ai/code` you can run it in your browser with no installation at all.
It's handy for kicking off long-running tasks and checking back later, working on
repos you don't have locally, or running several tasks in parallel. It's also
available in the iOS app.

## They all connect to the same place

Here's the nice part: these surfaces aren't separate products; they all connect
to the same underlying Claude Code engine. That means your `CLAUDE.md` files,
settings and MCP servers carry across all of them. You can start a session in one
environment and continue it in another:

| I want to... | Best option |
| --- | --- |
| Dispatch a task from my phone and open it on desktop | Mobile app + Desktop |
| Start locally, follow up on mobile | Web or the iOS app |
| Automate PR reviews and issue triage | GitHub Actions / GitLab CI/CD |
| Turn a Slack bug report into a PR | Slack integration |
| Run recurring tasks on a schedule | `/schedule` or desktop scheduled tasks |

Beyond all this, if you want to build a fully custom workflow, the **Agent SDK**
even lets you write your own agents powered by Claude Code's tools and
capabilities.

## So which one should you pick?

There's no single answer, because they all share the same engine — so the choice
comes down to habit. I still do most of my work in the terminal; when I'm
reviewing diffs, the desktop app or IDE extension sometimes feels more
comfortable. My suggestion: start with the terminal, since everything lands there
first. Then drift toward whichever surface fits your flow. Because they all read
the same `CLAUDE.md`, you lose nothing by switching.

## Summary

Claude Code isn't a single app but different faces of the same engine: the
terminal, the VS Code and JetBrains extensions, the desktop app, and the
browser. They all share your settings and `CLAUDE.md`, so switching environments
is free. In the next post we'll take a closer look at that shared brain — the
`CLAUDE.md` file itself.

---

*Next post: CLAUDE.md Basics*
