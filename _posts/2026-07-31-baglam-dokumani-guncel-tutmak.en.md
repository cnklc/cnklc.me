---
layout: post
lang: en
permalink: /en/blog/baglam-dokumani-guncel-tutmak/
translation_url: /blog/baglam-dokumani-guncel-tutmak/
title: "Keeping the Context Document Current"
date: 2026-07-31
summary: "A project config file written once and forgotten goes stale quietly. Since the AI reads it at the start of every session, outdated facts turn into new bugs."
tags: [vibe-coding, context, claude-md]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Keeping the Context Document Current"
---

> Part of the "Vibe Coding Journey" series. This time we look at a
> tool-agnostic maintenance job: keeping your project's context document lean
> and current.

In the last post I said recurring rules belong in the project config file. In
[Say What It Shouldn't Do]({{ '/en/blog/negatif-talimatlar-ve-rol/' | relative_url }})
we noted that `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` and `.cursor/rules/` are
all different names for the same idea. Setting that file up is a solved
problem. What isn't solved is whether it's still true six months later.

## A stale document is a quiet lie

This file is read at the start of every session. Every sentence in it is
something the agent "knows" about your project. In the invoice tracking
project the storage layer was in-memory for a while, and the document had a
line like this:

```text
Data is held in an in-memory Map; there is no persistent storage.
```

If that line survives the move to real persistence, the agent keeps living in
the old world when it writes a new endpoint: it writes to memory and builds
its tests on that. The resulting code may not even fail anywhere — it's just
correct under a wrong assumption. Those bugs are much harder to catch than
syntax errors.

## Keep only what every session needs

The config file is not a documentation store. What belongs there is what holds
in every session: setup and test commands, folder layout, naming conventions,
off-limits areas. What doesn't belong: the story of last week's bug, a note
about an experiment you're about to delete, sprint dates, and the reasoning
behind decisions you later reversed.

A one-sentence test: if I removed this line, would I have to explain the same
thing again next session? If not, it doesn't belong there.

Size is a constraint too. The Claude Code docs suggest targeting under 200
lines per file, noting that longer files consume more context and reduce
adherence. Splitting the file with `@` imports improves organization but
doesn't reduce context, because imported files are also loaded at launch. I
went into that detail in
[CLAUDE.md: Structure and Locations]({{ '/en/blog/claude-md-yapilandirma/' | relative_url }}).

## The most expensive failure: contradiction

The worst form of staleness is leaving the old rule in place and adding the
new one next to it. If "dates are stored as ISO 8601 strings" and "dates are
stored as epoch milliseconds" sit side by side, the official docs are explicit:
with conflicting instructions the model may pick one arbitrarily. So when a
rule changes, the old one doesn't get updated — it gets **deleted**.

## Attach maintenance to real work

Leaving the document to a separate "cleanup day" doesn't work; nobody has that
day. Better to fold it into the commit that changes the behavior: the commit
that replaces the storage layer also fixes the storage line in the document.

The second habit is verifying the file actually loads. In Claude Code you can
run `/context` in a session and check the **Memory files** list; `/memory`
lets you open and edit those files. If the file isn't listed, none of its
rules are in effect — and you can spend weeks thinking "it ignores my rules"
without noticing.

One honest limit to close on: this file is context, not configuration. The
docs say it plainly — the instructions arrive as a message after the system
prompt, and strict compliance isn't guaranteed. If a rule must hold every
single time, it belongs in a technical layer such as a hook or a permission
setting, not in the document. A context document steers; it doesn't enforce.

Next post: [Keeping Context Clean: New Sessions, Subagents, Long Context]({{ '/en/blog/baglami-temiz-tutmak/' | relative_url }})
