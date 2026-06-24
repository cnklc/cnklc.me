---
layout: post
lang: en
permalink: /en/blog/headless-mode/
translation_url: /blog/headless-mode/
title: "Headless Mode"
date: 2026-06-23
summary: "Running Claude Code without an interactive session, as a single command: the -p flag, piping output, pre-approving tools, and continuing conversations."
tags: [claude-code, headless, automation]
draft_series: "Claude Code Journey"
roadmap_topic: "Headless Mode"
---

> This stop in the "Claude Code Journey" series takes a step toward automation.
> Last time we looked at [common use cases]({{ '/en/blog/yaygin-kullanim-senaryolari/' | relative_url }});
> now we move to running Claude with no session at all, like a shell command.

So far we've mostly used Claude interactively: you type `claude` and chat inside
the session that opens. But sometimes you don't need a session — inside a
script, a CI pipeline, or a cron job you want to run Claude once and grab its
output. That's what headless mode is for.

## The -p flag: running without a session

Add `-p` (or `--print`) to any `claude` command and Claude skips the
interactive session, processes the prompt, writes the result to `stdout`, and
exits:

```bash
claude -p "what does the auth module do?"
```

That's the only difference: you can no longer go back and ask follow-ups, but in
exchange you can compose Claude with other tools.

## Pipe data in, redirect output out

Because headless mode reads `stdin`, you can use Claude like any ordinary
command-line tool. For example, pipe a build error in and write the explanation
to a file:

```bash
cat build-error.txt | claude -p 'concisely explain the root cause of this build error' > output.txt
```

You can also get output in a machine-readable form. `--output-format` accepts
three values: `text` (default), `json`, and `stream-json`. To parse the JSON
output with [jq](https://jqlang.github.io/jq/) and pull out just the text:

```bash
claude -p "summarize this project" --output-format json | jq -r '.result'
```

The JSON response also carries the session ID and cost info such as
`total_cost_usd`, so you can track what each call costs straight from a script.

## Pre-approving tools

In interactive mode Claude asks before running a command. In headless mode
there's no one to ask, so you grant permissions up front. With `--allowedTools`
you spell out exactly which tools are allowed:

```bash
claude -p "run the test suite and fix any failures" \
  --allowedTools "Bash,Read,Edit"
```

Instead of listing tools one by one, you can set a permission mode for the whole
session. `--permission-mode acceptEdits` lets Claude write files and auto-approves
common filesystem commands like `mkdir`, `mv`, and `cp`; other shell commands
still need a rule. For locked-down environments like CI, `dontAsk` stops the run
the moment Claude tries to step outside what you've allowed.

## Continuing conversations

Even though each call is one-off, you can have Claude remember the previous one.
`--continue` resumes the most recent conversation:

```bash
claude -p "review this codebase for performance issues"
claude -p "now focus on the database queries" --continue
```

If you're running several conversations at once, capture the session ID and
resume a specific one with `--resume`. Run both from the same directory, since
session lookup is scoped to the project directory.

## --bare for reproducibility

In CI you want the same result on every machine. The `--bare` flag skips
auto-discovery of hooks, skills, plugins, MCP servers, and `CLAUDE.md` files —
only the flags you pass explicitly take effect:

```bash
claude --bare -p "summarize this file" --allowedTools "Read"
```

There's a tradeoff: in bare mode authentication must come from the
`ANTHROPIC_API_KEY` environment variable rather than OAuth. Per the docs,
`--bare` will become the default for `-p` in a future release.

Headless mode turns Claude from "an assistant you talk to" into "a tool you wire
into your scripts." In the next post we combine that with working in parallel.

Next post: [Working with Git Worktrees]({{ '/en/blog/git-worktrees/' | relative_url }})
