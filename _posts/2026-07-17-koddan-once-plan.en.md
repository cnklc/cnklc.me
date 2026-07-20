---
layout: post
lang: en
permalink: /en/blog/koddan-once-plan/
translation_url: /blog/koddan-once-plan/
title: "Plan Before Code: MVP and Phases"
date: 2026-07-17
summary: "The most expensive mistake in vibe coding is building the wrong thing fast. Splitting a project into an MVP and phases that build on it keeps both the AI and you on track."
tags: [vibe-coding, planning, mvp]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Plan Before Code: MVP and Phases"
---

> The third post in the "Vibe Coding Journey" series. After
> [mindset]({{ '/en/blog/vibe-coder-zihniyeti/' | relative_url }}) and
> [tools]({{ '/en/blog/vibe-coding-araclari/' | relative_url }}), we arrive
> where the real work begins: planning. Our invoice-tracking project gains a
> new phase in this post.

The appeal of vibe coding is its speed: you describe an idea, and within
minutes something working appears. That's exactly where the trap is. AI builds
the wrong thing just as fast. In projects started without a plan, the model
makes a new architectural decision on every prompt, files multiply, and a few
sessions later you're left with a pile nobody understands. As code generation
gets cheaper, the truly valuable work moves upstream: deciding what to build.

## MVP first: describe the core, not the dream

The classic mistake is writing the whole product into the first prompt: "build
an invoice tracking app with due-date alerts, reports, charts, and accounting
integration." The model starts all of it at once and finishes none of it the
way you wanted.

Instead, define the MVP (minimum viable product) first: what is the narrowest
core that proves the product's reason to exist? For invoice tracking, that's
just "add an invoice, list invoices, mark as paid." That's exactly what we
built in the first two posts of this series — no reports, no persistence, no
notifications. The MVP's function isn't psychological but practical: it
narrows the scope you hand to the AI, so the output stays reviewable and
misunderstandings get caught while they're still small.

## Then phases: each one builds on the last

Split everything after the MVP into phases. Each phase starts only when the
previous one is finished and working; at the end of every phase you again have
a working product. Our invoice-tracking project's plan looks like this:

```text
Phase 1 (MVP): add invoice, list, mark as paid; in-memory data  ✓
Phase 2: due-date tracking — summary of upcoming and overdue invoices
Phase 3: persistent storage (JSON file)
Phase 4: monthly report — unpaid totals at month end
```

This split has a benefit specific to vibe coding: phases line up with session
boundaries. As roadmap.sh's best practices guide also suggests, starting each
separate piece of work with a clean context (a new session or a context reset)
prevents the model from carrying old assumptions into new work. The "one phase
= one session" rule solves context management by itself.

## Don't let it write code before you approve the plan

The same principle applies within a phase: ask the model to show its plan
before it starts coding. I kicked off Phase 2 with exactly this pattern — the
prompt, verbatim (translated from the actual run):

```text
We're starting Phase 2: due-date tracking. I want a summary endpoint
showing unpaid invoices that are due soon (within 7 days) and ones
that are overdue. Before writing code, produce a plan: which files
will you create or change, what changes in the data structure, what
are the edge cases? List your assumptions too. Wait for my approval.
```

Without writing a single line of code, the model showed its plan: which files
it would touch (it proposed on its own to put the summary calculation into a
separate pure function), that the data schema wouldn't change, and the edge
cases. The most valuable part was this assumptions list, which I'm quoting
as-is:

```text
Assumptions
1. "Within 7 days" = including today, 0-7 days remaining;
   day 7 included.
2. An invoice due today counts as "upcoming", not "overdue".
3. Paid invoices are entirely excluded from the summary.
4. Comparison is by calendar day (UTC); time of day is ignored.
5. The store schema doesn't change; kalanGun (days left) is only
   derived in the response.
6. For deterministic tests the endpoint accepts a ?bugun= override.
```

The "list your assumptions" sentence looks trivial but is the part that earns
its keep: I had never asked myself "which group does an invoice due today
belong to?" — the model surfaced it before starting the plan. I approved; when
the work was done, this was the summary that came back:

> Phase 2 due-date tracking is ready. `GET /faturalar/ozet` now returns unpaid
> invoices in two groups: overdue, and due within 7 days; each group with a
> count, a total amount, and days-remaining info. To make the date logic
> deterministically testable, the endpoint takes an optional
> `?bugun=YYYY-MM-DD`, and the core calculation moved into a pure function. I
> tested the boundary cases (due today = upcoming, day 7 included, paid
> excluded, malformed date); 11 existing + 10 new, 21 tests green in total.

I re-ran the tests independently: all 21 pass. Seeing what will happen before
any code is written is always cheaper than rolling back half an hour of work
headed in the wrong direction. Many tools have a dedicated mode supporting
this flow — I covered Claude Code's version in the
[Plan Mode post]({{ '/en/blog/plan-mode/' | relative_url }}); in Cursor and
similar tools you get the same effect with a "plan first, don't write code"
instruction.

## An honest limit

Not every task deserves this ceremony. Producing a phase plan for a
single-file script is a waste of time; there, a single "tell me your plan,
then write it" sentence is enough. A plan is also not a contract but a living
document: something you learn in Phase 2 may change Phase 3. The goal isn't
bureaucracy — it's keeping every prompt small, clear, and reviewable in scope.

Next post: Getting AI's Help with Planning: Explaining by Example
