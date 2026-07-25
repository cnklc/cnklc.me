---
layout: post
lang: en
permalink: /en/blog/spesifik-prompt-tek-gorev/
translation_url: /blog/spesifik-prompt-tek-gorev/
title: "Specific Prompt, Single Task"
date: 2026-07-25
summary: "The cheapest way to get consistent results from AI is to narrow the request: keep each prompt focused on one task, state the goal and constraints explicitly, and say how success is verified."
tags: [vibe-coding, prompting, code-quality]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Specific Prompt, Single Task"
---

> Part of the "Vibe Coding Journey" series. We're looking at a prompting habit
> that holds regardless of the tool: writing narrow, single-task requests
> instead of broad, vague ones.

In vibe coding, what determines the quality of the result is usually not the
model's intelligence but the clarity of your request. When you hand the model
a vague prompt, it fills in the missing pieces with its own best guess — and
that guess is rarely what you had in mind. The antidote is simple: keep each
prompt focused on a single task.

## The "build the whole page" trap

The most common mistake is trying to cram the entire project into one request.
Picture this prompt in an invoice-tracking project:

```text
Add validation, error handling, and notifications to invoices,
and also build a reporting page.
```

The model happily accepts and produces a huge change spread across many files.
The problem: when something comes out wrong, finding which step broke it is
nearly impossible. The diff is so large that instead of reviewing it carefully
you just hit "accept" and move on — which is the real risk of vibe coding.

Split the work instead. Validation first:

```text
Add input validation to the POST /api/invoices endpoint only.
Change only src/routes/invoices.ts and src/validators/.
Don't touch anything else. Propose your approach first and wait
for my approval.
```

One file pair, one responsibility, a reviewable diff. You move to the next task
only after verifying this one. It's like pair programming with the model step
by step; control stays with you on every turn.

## The three parts of a good request

A focused prompt carries three things: a **goal**, a list of **constraints**,
and **how success will be verified**. A concrete example from the invoice
project:

```text
Goal: Add input validation to the POST /api/invoices endpoint.

Constraints:
- Follow the project rules (CLAUDE.md)
- Only src/routes/invoices.ts and src/validators/ may change
- Do not touch src/auth/
- Add no new dependencies

Steps:
1. Propose your approach and list the files you'll edit
2. Wait for my approval
3. Implement
4. Run: npm run test
5. Summarize: what changed, the risk, how to revert
```

The "Constraints" section is the most valuable part of the request. A line like
`Do not touch src/auth/` stops the model from "helpfully" reaching into your
authentication code in the first place. The verification step (`npm run test`)
gives you concrete feedback from the code before you accept the result.

## Why smaller is always cheaper

A broad prompt looks like it saves time at first — a lot gets done in one shot.
But reviewing changes you never asked for, debugging them, and burning through
tokens more than eats that time back. The bill for narrow prompts is clear up
front: a small diff, a fast review, an easy revert.

This principle isn't tied to a tool. Claude Code, Cursor, Copilot, Codex, or
Gemini CLI — whichever you use, a narrow, constrained request consistently
beats a broad, vague one. Tools change; this habit stays.

In the previous series we touched on the more general form of this idea, the
principle of giving AI "verifiable work":
[Best Practices for Everyday Use]({{ '/en/blog/kullanim-en-iyi-pratikleri/' | relative_url }}).
The single-task rule here is that principle expressed at the prompt level.

Next post: [Say What It Shouldn't Do: Negative Instructions and Roles]({{ '/en/blog/negatif-talimatlar-ve-rol/' | relative_url }})
