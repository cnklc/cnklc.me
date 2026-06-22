---
layout: post
lang: en
permalink: /en/blog/yaygin-kullanim-senaryolari/
translation_url: /blog/yaygin-kullanim-senaryolari/
title: "Common Use Cases"
date: 2026-06-22
summary: "What do you actually open Claude Code for day to day? From getting to know a codebase to debugging, testing, and parallel sessions — a few core scenarios with concrete examples."
tags: [claude-code, workflow, use-cases]
draft_series: "Claude Code Journey"
roadmap_topic: "Common Use Cases"
---

> Continuing the "Claude Code Journey" series. Earlier posts looked at what the
> tool is and how it's configured; this one moves to what we actually open it
> for in everyday work — the common use cases.

You really get to know a tool by looking at what you open it for every day. The
scenarios below are pulled from the official "common workflows" recipes and are
the ones I keep coming back to. They all happen inside a session you start in the
terminal with `claude`.

## Getting to know a new codebase

One of the most frequent jobs: getting up to speed quickly on a project you just
cloned and have never seen. After moving to the project root and starting a
session, I begin with a broad question:

```text
give me an overview of this codebase
```

Once I have the big picture, I narrow down: "explain the main architecture
patterns used here", "what are the key data models?" and so on. When I'm hunting
for where a specific feature lives, I just describe it:

```text
find the files that handle user authentication
```

The trick is to start broad and narrow slowly — that's more productive than
asking it to "explain everything" in one shot.

## Debugging

The second classic scenario: finding and fixing a bug. Often, describing the
error as-is is enough:

```text
I'm seeing an error when I run npm test
```

Claude looks through the codebase, locates the problem, and suggests a fix. The
docs stress one thing: tell it how to reproduce the error, give a stack trace if
you can, and say whether the error is intermittent or consistent. That context
noticeably improves how on-target the suggested fix is.

## Pointing at files directly

Instead of waiting for Claude to find and read a file itself, you can point it
there with `@`; this pulls the file's full content into the conversation:

```text
Explain the logic in @src/utils/auth.js
```

If you give a directory like `@src/components`, it adds the file listing rather
than the contents. You can reference several files in the same message.

## Tests and refactoring

When asking for tests, being specific pays off; Claude examines your existing
test files and matches the project's framework and style. The typical flow goes:
find the uncovered code, generate the test scaffolding, then run and fix it:

```text
run the new tests and fix any failures
```

Refactoring follows the same logic: move in small, testable increments and
verify with tests at each step that behavior is preserved.

## Parallel sessions and plan mode

When I want to run two jobs at once, I use git worktrees — since each worktree is
a separate checkout on its own branch, the changes don't collide:

```bash
claude --worktree feature-auth
```

When I want to review changes before they touch disk, I switch to plan mode;
Claude reads files and proposes a plan but makes no edits until you approve:

```bash
claude --permission-mode plan
```

You can also toggle this mid-session with `Shift+Tab`. And when a task spans
multiple sittings, instead of re-explaining context you pick up where you left
off with `claude --continue`.

## Piping into scripts

Finally, you can use Claude non-interactively, like any Unix tool. The `-p` flag
runs a one-shot command, and stdin/stdout work as usual:

```bash
git log --oneline -20 | claude -p "summarize these recent commits"
```

That's handy for recurring jobs like CI steps or commit summaries.

## Summary

Getting to know a new codebase, debugging, pointing at files with `@`, tests and
refactoring, parallel sessions, plan mode, and piping into scripts — most of the
day with Claude Code revolves around these few patterns. The recipes are simple;
the real difference is knowing which one to reach for, when.

---

*Next post: Headless Mode*
