---
layout: post
lang: en
permalink: /en/blog/ai-ile-hata-ayiklama/
translation_url: /blog/ai-ile-hata-ayiklama/
title: "Debugging with AI: Don't Accept What You Don't Understand"
date: 2026-08-02
summary: "Generating code is the easy part of vibe coding; the hard part is what you do when it doesn't work. On reproducing the bug, giving evidence, asking for a cause before a patch, and rewinding when you're stuck."
tags: [vibe-coding, debugging, prompting]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Debugging with AI: Don't Accept What You Don't Understand"
---

> Part of the "Vibe Coding Journey" series. Last time we talked about keeping
> the context that builds up inside a session clean. This time the topic is what
> you do when things break: debugging.

Generating code is the easy part of vibe coding. The hard part is what you do
when the generated code doesn't work. The most common failure pattern goes like
this: you paste the error, the model proposes a fix, you accept it; the error
changes shape but doesn't go away. By the third round neither you nor the model
knows why the code ended up the way it did. Debugging is one of the most common
uses for coding agents (we touched on this in
[common use cases]({{ '/en/blog/yaygin-kullanim-senaryolari/' | relative_url }})) —
and it's also where we most often let go of control.

## Reproduce the bug yourself first

You can't fix a bug you can't reproduce, and neither can the model. "The PDF
sometimes comes out blank" tells it nothing, so it fills the gap with guesses.
Find the exact step that triggers the failure, then write the prompt:

```text
Bug: The PDF for invoice #1042 comes out blank. #1041 and #1043 are fine.
Repro: the "Download PDF" button on /invoices/1042.
Observation: #1042 has no line items, only a single discount row.
Explain the cause first; don't write code yet.
```

Writing that prompt is useful in itself: to spot the difference, you've already
done the thinking the diagnosis required.

## Give evidence, not symptoms

The model can't see your terminal. Instead of "it throws an error", give it the
actual output: the stack trace, the relevant log lines, the failing test output.

```bash
npm test -- invoices/pdf 2>&1 | tail -40
```

Paste the output as-is; don't summarize it. The line you dismiss as irrelevant
while summarizing is often the real clue — the warning you skipped past may be
exactly what sends the model to the right file.

## Ask for a cause before a patch

The rule is simple: explanation first, patch second. Don't accept a fix you
can't describe in your own words — what broke, and why. Every fix accepted
without understanding lays the groundwork for the next bug.

```text
List three possible causes for this bug. For each one, say which file you'd
read and how you'd confirm it. Don't propose a fix.
```

Honestly, the model's first hypothesis usually looks plausible and is often
wrong. That's why the verification step matters. Ask for a narrow fix, too: a
common reflex is to wrap the failure in a `try/catch` and swallow it. That
doesn't solve the bug; it just makes it invisible.

## If two attempts don't do it, rewind

If you've tried to fix the same bug three times, your context is now polluted
with failed attempts, and the model keeps referencing its own earlier proposals.
The right move isn't another patch on top — it's getting back to a clean state.

See what changed, then revert:

```bash
git diff
git checkout -- .
```

Tools have their own undo mechanisms as well. In Claude Code, `/rewind` (or
pressing `Esc` twice when the input box is empty) lists every prompt from the
session and can restore the code, the conversation, or both to that point. It's
worth knowing the limit: it only tracks changes made through the tool's file
editing tools, not what a bash command (`rm`, `mv`) did. Git is still the real
safety net — which is why committing a working state before a bug hunt is the
cheapest insurance available.

Getting back to a clean state isn't starting over: you now know three approaches
that don't work. Put that in the next prompt.

## Before you close it out

When the fix arrives, ask one more question: is there a test that catches this
bug? If not, have the model write the failing test first — red before the fix,
green after. Otherwise you'll rediscover the same bug in a few weeks.

Next post: [Adding Logs and Debugging with MCP]({{ '/en/blog/log-ve-mcp-ile-debug/' | relative_url }})
