---
layout: post
lang: en
permalink: /en/blog/git-worktrees/
translation_url: /blog/git-worktrees/
title: "Working with Git Worktrees"
date: 2026-06-25
summary: "Run two Claude sessions at once and their files collide. Git worktrees fix that by giving each session its own working directory and branch."
tags: [claude-code, git-worktrees, parallel-work]
draft_series: "Claude Code Journey"
roadmap_topic: "Working with Git Worktrees"
---

> Continuing the "Claude Code Journey" series. Last time we looked at
> [headless mode]({{ '/en/blog/headless-mode/' | relative_url }}) — running Claude
> non-interactively in the terminal. This time we move to parallelism: running
> several sessions at once without them stepping on each other.

At some point you want this: Claude writing a new feature in one terminal while a
second Claude session fixes an urgent bug in another. Open both sessions in the
same working directory and they'll touch the same files, and the changes collide.
**Git worktrees** solve exactly this.

## What is a worktree?

A git worktree is a separate working directory with its own files and its own
branch, while sharing the same repository history and remote. It's like checking
out the same repo into a second folder on a different branch. Edits in one
worktree never touch the files in another.

## Starting in a worktree

Claude Code handles this with a single flag. `--worktree` (short form `-w`)
creates an isolated worktree and starts Claude inside it:

```bash
claude --worktree feature-auth
```

By default the worktree is created under `.claude/worktrees/feature-auth/` at your
repository root, on a new branch named `worktree-feature-auth`. Run the same
command with a different name in a second terminal to start a separate, isolated
session:

```bash
claude --worktree bugfix-123
```

If you omit the name, Claude generates one like `bright-running-fox`. You can also
just tell Claude in natural language to "work in a worktree" during a session, and
it creates one with its `EnterWorktree` tool.

One small note: add `.claude/worktrees/` to your `.gitignore` so worktree contents
don't show up as untracked files in your main checkout.

## Copying gitignored files in

A worktree is a fresh checkout, so untracked files like `.env` from your main
repository aren't there. To copy them automatically when Claude creates a
worktree, add a `.worktreeinclude` file to your project root. It uses
`.gitignore` syntax:

```text
.env
.env.local
config/secrets.json
```

Only files that both match a pattern and are gitignored get copied, so tracked
files are never duplicated.

## How cleanup works

When you exit a worktree session, what happens depends on whether you made
changes:

- **No changes:** the worktree and its branch are removed automatically.
- **Changes or commits exist:** Claude asks you — keep it and the directory and
  branch stay, remove it and all uncommitted work is discarded.
- **Non-interactive runs:** combine `--worktree` with `-p` and there's no exit
  prompt, so the worktree isn't cleaned up automatically. Remove it yourself with
  `git worktree remove`.

Keep that last point in mind when you combine worktrees with last post's
[headless mode]({{ '/en/blog/headless-mode/' | relative_url }}): worktrees you
open inside a script are yours to clean up.

## Managing them by hand

If you want full control over location or branch, you can create worktrees with
git directly:

```bash
git worktree add ../project-feature-a -b feature-a
git worktree list
git worktree remove ../project-feature-a
```

One honest caveat: since each worktree is a checkout from scratch, you have to set
up your dev environment in each one — install dependencies, create the virtual
environment, run whatever your project's setup needs. Worktrees isolate files;
they don't set up the environment for you.

## Summary

Git worktrees are the cleanest way to run multiple Claude sessions at once without
collisions. `claude --worktree <name>` gives a command its own isolated workspace;
`.worktreeinclude` carries over the secret files it needs; and when you're done,
Claude usually handles cleanup itself. It's not complicated, but it pays off the
moment you go parallel.

---

*Next post: Understanding Claude Pricing*
