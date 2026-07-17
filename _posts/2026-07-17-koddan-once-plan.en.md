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
> where the real work starts: planning.

The appeal of vibe coding is its speed: you describe an idea and something
working appears within minutes. That's also the trap. AI builds the wrong thing
just as fast. In projects started without a plan, the model makes a fresh
architectural decision on every prompt, files multiply, and a few sessions
later you're left with a pile nobody can explain. As code generation gets
cheaper, the valuable work shifts to before generation: deciding what to build.

## MVP first: describe the core, not the dream

The classic mistake is writing the whole product into the first prompt: "build
an expense tracker with user accounts, charts, and notifications." The model
starts on all of it at once and finishes none of it the way you wanted.

Instead, define the MVP (minimum viable product) first: what is the narrowest
core that proves the product's reason to exist? For the expense tracker, that
might be nothing more than "add an expense and list expenses." Login screens,
charts, notifications — all later. The MVP's job here is practical, not
psychological: it narrows the scope you hand to the AI, so the output stays
reviewable and misunderstandings get caught while they're still small.

## Then phases: each one builds on the last

Split everything after the MVP into phases. Each phase starts only when the
previous one is finished and working; at the end of every phase you again have
a working product. On paper it looks like this:

```text
Phase 1 (MVP): add expense, list expenses; data in a local JSON file
Phase 2: category support and monthly summary
Phase 3: CSV export
Phase 4: simple charts
```

I built Phase 1 exactly to this plan and tried it; what I had at the end was
unglamorous but real:

```text
$ node expense.js add "Groceries" 450
Added: #1 Groceries — 450
$ node expense.js add "Coffee" 45
Added: #2 Coffee — 45
$ node expense.js list
#1  Groceries  450
#2  Coffee  45
Total: 495
```

No categories, no charts — but a working core you can build on.

This split has a benefit specific to vibe coding: phases map neatly onto
session boundaries. As roadmap.sh's best practices guide also recommends,
starting each discrete piece of work with a clean context (a new session or a
context reset) keeps the model from dragging stale assumptions into the new
task. A "one phase = one session" rule solves context management as a side
effect.

## Don't let the AI write code before you approve the plan

The same principle applies within a phase: ask the model to show its plan
before it touches any code. This is a prompt pattern that works regardless of
the tool:

```text
We're starting Phase 2: category support and monthly summary.
Before writing any code, produce a plan: which files will you
create or modify, what changes in the data structure, and what
edge cases are there? List your assumptions too. Wait for my
approval.
```

The "list your assumptions" part looks trivial, but it's the sentence that
earns its keep; misunderstandings usually hide in the assumptions the model
makes silently. Many tools also have a dedicated mode supporting this flow — I
covered the Claude Code version in detail in the
[Plan Mode post]({{ '/en/blog/plan-mode/' | relative_url }}); in Cursor and
similar tools you get the same effect with a "plan first, don't write code yet"
instruction.

## An honest limit

Not every task deserves this ceremony. Producing a phase plan for a one-file
script is a waste of time; there, a single "tell me your plan, then write it"
sentence is enough. The plan is also a living document, not a contract:
something you learn in Phase 2 may reshape Phase 3. The goal isn't bureaucracy
— it's keeping every prompt small, clear, and reviewable in scope.

Next post: Getting AI to Help With Planning: Explaining by Example
