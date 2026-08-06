---
layout: post
lang: en
permalink: /en/blog/baglami-temiz-tutmak/
translation_url: /blog/baglami-temiz-tutmak/
title: "Keeping Context Clean: New Sessions, Subagents, Long Context"
date: 2026-08-01
summary: "The context window is the real constraint in vibe coding. Quality drops as it fills. There are three ways to manage it: reset, summarize, or move the exploration into a separate window."
tags: [vibe-coding, context, sessions]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Keeping Context Clean: New Sessions, Subagents, Long Context"
---

> Part of the "Vibe Coding Journey" series. Last time we looked at keeping the
> project's context document current. This time the subject is the context that
> accumulates inside a session: when to reset it, when to summarize it, and when
> to move it into a different window.

Claude Code's official best practices guide traces most of its advice back to a
single constraint: the context window fills up fast, and performance degrades as
it fills. Every message, every file read, and every command's output sits in the
same window. As it grows, the model starts "forgetting" instructions you gave
earlier and making more mistakes. We covered what context is in
[Managing Context]({{ '/en/blog/context-baglam/' | relative_url }}); the question
here is how to keep it clean across a session.

## One session, one job

The most common mistake is doing unrelated work in a single long session. In the
invoice tracking project, if you're working on PDF export and then slip in "let's
also look at that date formatting bug", every request afterwards still carries
traces of the PDF conversation. The model references the earlier files and
repeats the earlier patterns; the output looks right at first glance but carries
wrong assumptions.

The practical rule: when a task is done, reset the context. `/clear` in Claude
Code, or a new chat in editor-based tools like Cursor and Windsurf, does the same
job. After resetting, assume the model remembers nothing and restate the goal:

```text
Goal: Add a date range filter to the invoice list.
Constraints: Follow CLAUDE.md. Only src/components/InvoiceList.tsx and
src/lib/filters.ts may change. No new dependencies.
Propose a plan first; don't write code yet.
```

The same guide has a second rule that pays off in practice: if you've corrected
the model more than twice on the same issue, the context is now polluted with
failed approaches. Instead of correcting again, reset and write a better prompt
that incorporates what you learned.

## Resetting and summarizing are not the same thing

Sometimes you need continuity. That's when you summarize instead of resetting.
Claude Code compacts the conversation automatically as it approaches the context
limit; if you want to trigger it yourself, you can also tell `/compact` what to
focus on:

```text
/compact Focus on the changes to the invoice PDF output
```

The Gemini CLI equivalent is `/compress`, which replaces the chat context with a
summary. Watch the command names across tools, though — in Gemini CLI, `/clear`
clears the terminal screen rather than the context, so the same name doesn't mean
the same thing in both tools. We went into the details in
[Managing Context: /compact and /clear]({{ '/en/blog/baglam-yonetimi-compact-clear/' | relative_url }}).

Summarizing has an honest cost: a summary is lossy. Read the text that comes out
of compaction; if a decision is missing or misstated, fix it before continuing.

## Keep exploration out of the main session

Nothing fills context faster than research. Ask "how does this flow work" and the
agent reads dozens of files, all of which stay in your window. This is exactly
what subagents are for: they run in a separate context window and return only a
summary to the main conversation.

```text
Use a subagent to investigate where invoice status transitions are handled.
Summarize only the relevant file paths and the current transition rules.
```

The same logic applies to verification: rather than having the session that wrote
the code grade its own output, a separate subagent reviewing the diff in fresh
context is more impartial. We covered this in
[Subagents and Agent Teams]({{ '/en/blog/subagents-ajan-takimlari/' | relative_url }}).

## A bigger window doesn't solve it

As context windows grow, it's tempting to think housekeeping no longer matters.
The constraint isn't the window's size — it's the quality that drops as the
window fills. A larger window gives you more room; it doesn't take on the
responsibility of not filling that room with noise.

The reverse is also true: resetting constantly has its own cost. If you're deep
inside one complex problem, the conversation history is valuable and letting
context accumulate is the right call. The rule isn't "clear often" — it's that
everything sitting in the session should have a reason to be there for the work
at hand.

Next post: [Debugging with AI: Don't Accept What You Don't Understand]({{ '/en/blog/ai-ile-hata-ayiklama/' | relative_url }})
