---
layout: post
lang: en
permalink: /en/blog/claude-cli-komutlari/
translation_url: /blog/claude-cli-komutlari/
title: "claude CLI Commands: -p, -c and -r"
date: 2026-06-29
summary: "Running Claude as a one-shot command, picking up your last conversation where you left off, and returning to an old session — with three core CLI flags."
tags: [claude-code, cli, terminal]
draft_series: "Claude Code Journey"
roadmap_topic: "claude CLI Commands (-p, -c, -r)"
---

> A new stop in the "Claude Code Journey" series. Last time we talked about
> managing context by hand with
> [`/compact` and `/clear`]({{ '/en/blog/baglam-yonetimi-compact-clear/' | relative_url }}).
> Now let's step back to the terminal and look at the three most-used flags of
> the `claude` command: `-p`, `-c` and `-r`.

When you type `claude` and hit Enter, an interactive session opens. That's what
you want most of the time, but not for every job. Sometimes you just want a
single answer and out; sometimes you want to return to a conversation you
started earlier. These three flags are exactly for that.

## `-p`: ask and exit

The `-p` flag (long form `--print`) runs Claude without entering interactive
mode: it prints the answer and exits. It's ideal for a one-off question or for
use inside a script.

```bash
claude -p "explain this function"
```

The real power of `-p` shows up when you combine it with a Unix pipe. You can
feed content from standard input straight into Claude:

```bash
cat logs.txt | claude -p "summarize these logs"
```

Here the output of `cat logs.txt` flows directly into Claude, so you don't have
to paste the file separately. You can use the same pattern with `git log`, test
output, or the result of any command.

## `-c`: continue where you left off

When you want to resume the same conversation after closing a session, `-c`
(long form `--continue`) is the one. This flag loads **the most recent
conversation in your current directory** — so you don't have to specify which
session you mean.

```bash
claude -c
```

You can combine `-c` with `-p` too. The command below continues the last
conversation but returns a single answer without entering interactive mode:

```bash
claude -c -p "is there a type error in the function you just added?"
```

One caveat: `-c` is directory-bound. If you run it from another folder, it finds
the most recent conversation there, not the one at your project root.

## `-r`: return to a specific session

If you're running several conversations in parallel, "the most recent one" may
not be precise enough. `-r` (long form `--resume`) lets you open a specific
session **by its ID or name**:

```bash
claude -r "auth-refactor" "Finish this PR"
```

If you run just `claude -r` without arguments, you get an interactive list where
you can pick one of your sessions. If you want to give a session a meaningful
name, use the `--name` flag (short form `-n`) when you start it, then come back
with that same name.

A small note: if you want to branch off a session without disturbing its
history, you can use the `--fork-session` flag together with `-r` or `-c`; it
leaves the original intact and creates a new session ID.

## Summary

To put all three in one sentence: `-p` is for getting a one-off answer and
exiting, `-c` is for continuing the last conversation in your current directory,
and `-r` is for returning to a specific session by name or ID. Combining `-p`
with a pipe is the most practical way to drop Claude into small automations.

---

*Next post: [A Guide to Slash Commands (/)]({{ '/en/blog/slash-komutlari/' | relative_url }})*
