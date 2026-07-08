---
layout: post
lang: en
permalink: /en/blog/oturum-yonetimi-resume-rewind/
translation_url: /blog/oturum-yonetimi-resume-rewind/
title: "Session Management: Resume and Rewind"
summary: "Claude Code sessions don't disappear: picking up where you left off, naming sessions, branching them, and undoing bad steps with rewind."
tags: [claude-code, session-management, productivity]
draft_series: "Claude Code Journey"
date: 2026-07-08
roadmap_topic: "Session Management: Resume and Rewind"
---

> Continuing the "Claude Code Journey" series. In the previous post we looked at
> [Output Styles and Status Line customization]({{ '/en/blog/output-styles-status-line/' | relative_url }});
> this time we cover managing sessions themselves: resuming, branching, and
> rewinding.

When you work with Claude Code, every conversation is saved locally as a
**session**, tied to the project directory you're working in. Closing the
terminal or running `/clear` doesn't delete anything; it all persists and can be
recalled. This post covers two things: returning to sessions (resume) and going
back in time *within* a session (rewind).

## Picking up where you left off

When you want to return in the afternoon to the work you left in the morning,
the shortest path is:

```bash
claude --continue
```

This opens the most recent session in the current directory. Its short form is
`-c`. If you'd rather choose which session to return to:

```bash
claude --resume
```

This command (short form `-r`) opens an interactive session picker: each row
shows the session's name or its first prompt, time since last activity, and the
git branch. Press `Space` to preview the content, or `Ctrl+A` to list sessions
from all projects on the machine. Inside an active session, `/resume` opens the
same picker. We covered the broader family of these flags in the
[claude CLI commands]({{ '/en/blog/claude-cli-komutlari/' | relative_url }}) post.

## Name your sessions

If you're running several tasks in parallel, naming sessions ends the
searching. Start with `claude -n auth-refactor`, or run `/rename auth-refactor`
inside the session. After that you can return to it directly by name:

```bash
claude --resume auth-refactor
```

## Branching: same context, different attempt

Sometimes you want to say "what if we did it this way?" without disturbing the
conversation. `/branch` creates a copy of the conversation so far and switches
you into it; the original session stays intact:

```text
/branch streaming-attempt
```

From the command line, `claude --continue --fork-session` does the same thing.
One caveat: approvals you granted with "allow for this session" don't carry
over to the new branch.

## Rewind: going back in time within a session

Resume was about moving *between* sessions; rewind is about going back in time
inside a single one. Claude Code automatically saves the state of your code as
a **checkpoint** with every prompt you send. These checkpoints also persist
across sessions.

Say you asked for a refactor, Claude changed three files, and you don't like
the result at all. Press `Esc` twice while the prompt input is empty, or type
`/rewind`; the menu that opens lists the prompts you sent during the session.
When you select one, your options are: restore both code and conversation,
restore only the conversation, restore only the code — or summarize part of the
conversation to free up context space. That summarization is similar to
[/compact]({{ '/en/blog/baglam-yonetimi-compact-clear/' | relative_url }}), but
targeted: instead of the whole conversation, it compresses only what comes
before or after the point you selected.

## The limits of rewind

Rewind is powerful, but it doesn't see everything. It only tracks changes made
through Claude's file editing tools; it can't undo the effect of a bash command
(like `rm`, `mv`, or `cp`). Manual changes you make in your editor are also out
of scope. And most importantly: checkpoints are not a replacement for git. The
right mental model is to think of checkpoints as "local undo" and git as
"permanent history."

## Summary

Sessions don't get lost: return to the last one with `-c`, pick one with `-r`,
keep things organized by naming them, experiment safely with `/branch`, and
undo bad steps with `/rewind`. Together, these tools make it easier to hand
Claude Code more ambitious work — because there's always a way back.

---

*Next post: Connecting Tools with MCP*
