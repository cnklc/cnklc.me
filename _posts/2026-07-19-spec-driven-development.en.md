---
layout: post
lang: en
permalink: /en/blog/spec-driven-development/
translation_url: /blog/spec-driven-development/
title: "What Is Spec-Driven Development (SDD)?"
date: 2026-07-19
summary: "An approach where the specification, not the code, is the single source of truth: how SDD differs from plan mode, what the typical workflow looks like, and where the hype ends — with a real spec run on the series project."
tags: [vibe-coding, spec-driven-development, planning]
draft_series: "Vibe Coding Journey"
roadmap_topic: "What Is Spec-Driven Development (SDD)?"
---

> The fifth post in the "Vibe Coding Journey" series. We saw why
> [planning before code]({{ '/en/blog/koddan-once-plan/' | relative_url }})
> matters; in this post we look at the more formal version of that idea:
> spec-driven development. Our invoice-tracking project gains a new feature
> through this workflow.

The known weakness of vibe coding: you describe a goal to the agent, it
produces plausible-looking code, but a few sessions later the project starts
drifting from its intent. Context resets every session; decisions get lost in
chat history. **Spec-driven development** (SDD) is an answer to that: let the
single source of truth be neither the code nor the chat, but a written
specification kept in version control.

## How is it different from planning?

We already plan; I covered Claude Code's plan mode in a
[separate post]({{ '/en/blog/plan-mode/' | relative_url }}). But that plan
lives for one session: you approve, code gets written, the plan evaporates. In
SDD the specification is a persistent file. You write down what you want, the
success criteria and the constraints; the agent derives the plan and the task
list from that file. In the next session — even when working with a different
tool — the same spec holds. Your intent lives in the repo, not in chat history.

In that sense SDD is one step beyond the
[context file]({{ '/en/blog/claude-md-temelleri/' | relative_url }}) idea:
CLAUDE.md describes *how* the project works, while the spec describes *what*
the next piece of work is and *why* it's being done.

## Let's actually run the workflow on the project

The tool-agnostic workflow has four stages: write the spec → derive a
technical plan → split into tasks → implement. I applied it with plain
Markdown files for our invoice-tracking project's next feature. First I put a
`SPEC.md` at the project root — the gist:

```text
# Feature: Monthly Report

Intent: See at a glance, at month end, which invoices are unpaid
and the month's totals.

Behavior:
- GET /faturalar/rapor?ay=YYYY-MM returns a monthly report.
- The report covers invoices whose DUE DATE falls in that month
  (not the issue date).
- Fields: total / paid / unpaid counts and amounts; the list of
  unpaid invoices.

Success criteria:
- Invalid or missing month parameter: 400 + per-field error.
- A month with no invoices: 200 with zero totals, not an error.
- Existing endpoints don't change behavior; old tests keep passing.

Out of scope: PDF/CSV export, charts, accounting integration,
recurring invoices.
```

Then I told the agent one thing:

```text
Implement the monthly report feature in SPEC.md. First derive a
technical plan and task list from the spec and show me; then
implement. If you see anything ambiguous in the spec, don't make
it up — flag it as an ambiguity.
```

The agent derived a four-item task list from the spec (a pure `aylikRapor`
function + route + tests + verification), and — the most valuable part —
instead of making up two things, it **flagged them as ambiguities**: the spec
didn't give the JSON field names for the response, and it never discussed what
happens to invoices with malformed due dates. It resolved both according to
the codebase's conventions and reported the decision — the spec's gap became a
visible decision instead of a silent assumption. Its closing summary
(translated from the actual run):

> I implemented the monthly report feature according to SPEC.md:
> `GET /faturalar/rapor?ay=YYYY-MM` now returns the total/paid/unpaid counts
> and amounts of invoices whose due date (not issue date) falls in that month,
> plus the list of unpaid ones. Invalid or missing `ay` returns 400 with a
> per-field error; a month with no invoices returns 200 with zero totals. I
> didn't touch the existing endpoints; together with 10 new tests, all 30
> tests pass. Two things I didn't make up but flagged as ambiguities: the
> response JSON field names and the handling of malformed due dates.

In the verification round, the principle from this series' first post paid
off again: I ran the tests independently — 30 out of 30 pass, and the spec's
"old tests keep passing" criterion holds. But the summary's "10 new tests"
claim was wrong: the new file contains 9 tests (21 old + 9 new = 30). I told
the agent; it recounted and corrected itself. A small error — but few examples
show better why not signing off blindly on output is part of the mindset.

## If you want ready-made scaffolding

You can run the same workflow with ready-made tools instead of hand-written
Markdown. GitHub's open-source [Spec Kit](https://github.com/github/spec-kit){:target="_blank" rel="noopener"}
structures the spec → plan → tasks → implement stages with slash commands and
works with many agents including Claude Code, Copilot, Cursor and Gemini CLI;
Amazon's Kiro is an example that embeds a similar workflow into the IDE. AWS
and GitHub report that this approach noticeably increases agents' first-try
success rates — the published numbers are bold, but the direction is
consistent with the run above: the agent works against written criteria
instead of guessing.

## Let's be honest: not every task deserves it

SDD has a cost. Writing a spec for a small bug fix or a single-file change is
bureaucracy; there, a
[short plan before code]({{ '/en/blog/koddan-once-plan/' | relative_url }}) is
enough. SDD shines in work that is large in scope and will span multiple
sessions: a new module, an MVP from scratch, a project where multiple agents
will work.

The second risk is spec rot: the code moves on, and if the spec isn't updated
you're left with a misleading document. If you can't keep the spec alive, not
starting is the more honest choice.

In short: SDD is the disciplined version of the "think first, then have it
written" principle. The principle is durable; the tools (Spec Kit, Kiro and
the rest) may change. Invest in specs for big work; keep your speed for small
work.

Next post: [Choosing a Popular Tech Stack: Why Not Niche?]({{ '/en/blog/populer-stack-secmek/' | relative_url }})
