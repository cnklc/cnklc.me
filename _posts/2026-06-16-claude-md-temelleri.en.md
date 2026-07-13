---
layout: post
lang: en
permalink: /en/blog/claude-md-temelleri/
translation_url: /blog/claude-md-temelleri/
title: "CLAUDE.md Basics"
date: 2026-06-16
summary: "Claude Code starts every session from scratch. CLAUDE.md is the persistent memory file that saves you from re-explaining your project each time. Where it goes, what to put in it, and how it loads."
tags: [claude-code, claude-md, configuration]
draft_series: "Claude Code Journey"
roadmap_topic: "CLAUDE.md Basics"
---

> The sixth stop in the "Claude Code Journey" series. So far we've looked at what
> the tool is and how it's used. From this post on, we move to shaping it around
> our own project — first stop: CLAUDE.md.

If you've worked with Claude Code for a while, you've probably noticed something:
every session starts with a clean slate. If you said "we use pnpm, not npm" in a
previous conversation, the next session might suggest npm again. The reason is
simple — each session begins with a **fresh context window**. This is exactly the
gap `CLAUDE.md` fills: you write down the things you'd otherwise re-explain every
time, and Claude reads them at the start of every session.

## What CLAUDE.md is — and isn't

CLAUDE.md is a plain markdown file. You put your project's rules, commands, and
architectural decisions in it. But the official docs make one thing clear: this
file is **context**, not enforced configuration. Claude reads it and follows it
as best it can, but there's no "hard block" guarantee. If you need something to
run or be blocked no matter what, the right tool is [a *hook*]({{ '/en/blog/hooks-olaylar-matcherlar/' | relative_url }}). CLAUDE.md guides behavior; it doesn't enforce it.

On top of this, Claude now also keeps **auto memory**: it writes its own notes
based on your corrections and preferences. The two are complementary — you write
CLAUDE.md, Claude writes auto memory. In this post I'll focus on the part we
write by hand: CLAUDE.md.

## Where does it go?

CLAUDE.md can live in several places, each with a different scope. The main ones
(from broad to specific):

- **Managed policy (organization):** a file deployed by IT/DevOps that applies to
  everyone on the machine. Company standards, security rules.
- **User instructions** → `~/.claude/CLAUDE.md`. Personal preferences that apply
  across all your projects.
- **Project instructions** → `./CLAUDE.md` or `./.claude/CLAUDE.md`.
  Team-shared, version-controlled project rules.
- **Auto memory** → `~/.claude/projects/<project>/memory/`. Notes Claude writes
  itself from your corrections and preferences; managed by Claude, not by hand
  (a separate directory per project/repo).

For most people the starting point is `./CLAUDE.md` at the project root. And the
most practical way isn't to write it from scratch: run `/init` in a session.
Claude scans your codebase and generates a starter file with build commands, test
instructions, and the conventions it discovers. If a CLAUDE.md already exists, it
suggests improvements rather than overwriting it.

## What to put in it

A good rule of thumb: **anything you've had to type into chat a second time.**
The docs suggest adding to it when Claude makes the same mistake twice, when a
code review catches something Claude should have known, or when it's context a
new teammate would need to be productive.

The real question is *how* you write it. Because the file loads into the context
window, and vague instructions get followed less reliably. So be concrete:

- Instead of "format code properly" → "use 2-space indentation"
- Instead of "test your changes" → "run `npm test` before committing"
- Instead of "keep files organized" → "API handlers live in `src/api/handlers/`"

A few more practical rules: keep the file **short and focused** (a long file eats
context and reduces adherence), structure it with headers and bullets, and prune
conflicting rules — if two rules contradict, Claude may pick one arbitrarily.

## Imports

If you want to stay organized without bloating a single file, you can pull in
other files with `@path/to/file` syntax:

```text
See @README for the overview and @package.json for npm commands.

# Additional Instructions
- git workflow @docs/git-instructions.md
```

Imported files also load into context at launch — so imports help with
organization but don't save context. For actual savings you'd look at
path-scoped `.claude/rules/`, but that's a topic for another post.

## How it loads

Claude walks up the directory tree from your working directory, finds every
CLAUDE.md along the path, and concatenates them all — ordered from the root down,
so the instruction closest to where you launched is read last. CLAUDE.md files in
subdirectories don't load at launch; they kick in when Claude reads a file in
that directory. To see exactly which files are loaded, just run `/memory` in a
session.

## Summary

CLAUDE.md is the persistent memory file where you write, once, "the things you'd
otherwise re-explain every session." Start with `/init`, keep it concrete and
short, place it at the right scope (project/user/local), and remember it's
guidance, not enforcement. In the next post we'll look at Skills — the way to
package repeatable workflows.

---

*Next post: [Skills Overview]({{ '/en/blog/skills-genel-bakis/' | relative_url }})*