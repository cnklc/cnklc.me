---
layout: post
lang: en
permalink: /en/blog/ai-ile-planlama/
translation_url: /blog/ai-ile-planlama/
title: "Getting AI to Help With Planning: Explaining by Example"
date: 2026-07-18
summary: "You can get AI to help you write the plan too — just not by saying 'make me a plan.' Have it ask questions first, constrain the scope, then have it critique the plan. A real example on the series project."
tags: [vibe-coding, planning, prompting]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Getting AI to Help With Planning: Explaining by Example"
---

> The fourth post in the "Vibe Coding Journey" series. In the
> [previous post]({{ '/en/blog/koddan-once-plan/' | relative_url }}) I covered
> splitting a project into an MVP and phases. In this one we produce that plan
> not alone but together with AI — on the series project's own idea.

The previous post's rule was clear: plan before code. But you don't have to
write the plan alone. AI is a good partner for writing plans just as it is for
writing code — if you use it right. The way to use it wrong is very short:
"make me a plan."

## Why "make me a plan" doesn't work

Write "make a plan for an invoice tracking app" into an empty chat, and what
usually comes back is a twelve-item enterprise roadmap with user management, a
notification service, maybe microservices. The model knows nothing about you;
it fills the gaps with the most popular assumptions. The problem isn't the
model, it's the question: a good plan requires information, and most of that
information is with you. The goal is to find the shortest path to hand that
information to the model.

To show this, I took the series project's idea and actually ran the process
end to end in a plain chat interface. All the questions and plans below come
from that conversation, verbatim (translated from the actual run).

## Have it ask questions first

The most effective technique is to reverse the flow: don't ask for a plan, ask
the model to ask you questions.

```text
I'm going to describe a product idea. Don't write a plan yet; first
ask me at most five questions to clarify the idea.

Idea: As a freelancer, I want to track the invoices I issue in one
place. I want to see which ones are unpaid and not miss the ones
whose due dates are approaching.
```

The questions the model asked:

```text
1. Is this tool just for your own use, or will other people log
   in too?
2. How do you want to use it: a web interface, or is an API /
   command line enough for now?
3. Will you enter invoices by hand, or do you expect them to be
   pulled automatically from somewhere (email, accounting software)?
4. When you say "not miss approaching due dates", how should the
   warning reach you: email/notification, or is seeing it in the
   list when you open the app enough?
5. A single currency (TL)? And are invoices always one-off, or are
   there monthly recurring ones too?
```

These five answers are the raw material of the plan. A confession: I had
never asked myself the fourth question — in my head there was "something that
sends notifications", when in fact seeing it in the summary when I open the
app is enough for me. That's exactly where the technique's value lies: before
starting the plan, the model surfaces decisions even you hadn't clarified.
This is one of the most valuable of AI's
[non-coding use cases]({{ '/en/blog/yaygin-kullanim-senaryolari/' | relative_url }}).

## Constrain the scope, then ask for the plan

When you give the answers and ask for the plan, set the constraints too — if
you don't, the model won't:

```text
Answers: single user (me), a REST API is enough (interface later),
I'll enter data by hand, the warning appearing in the summary when
I open the app is enough, amounts are in TL, there are both one-off
and monthly recurring invoices.

Now propose an MVP and at most three phases. Rules: every phase
must end with a working product, and the MVP must be small enough
to build in a single session. For each phase, also write a "NOT in
this phase" list.
```

The plan that came back:

```text
MVP — Invoice ledger (built in one session): add/list invoices by
hand; amount, customer, issue and due dates, status (paid/unpaid).
The list shows unpaid and overdue ones on top.
  NOT in this phase: recurring invoices, warning/summary screen,
  editing, authentication.
Phase 1 — Payment tracking and summary: mark an invoice "paid";
on open, return a summary of invoices due within 7 days and
overdue ones.
  NOT in this phase: recurring invoices, automatic email
  notifications.
Phase 2 — Monthly recurring invoices: define an invoice as
"repeats monthly"; the system generates the next period's invoice.
  NOT in this phase: variable-amount subscriptions, multiple
  currencies.
Phase 3 — Filters and basic reporting: filter by customer/status/
date; monthly issued and collected totals.
  NOT in this phase: charts/dashboard, export, multi-user.
```

The "NOT in this phase" list is the most valuable sentence in the prompt. A
good plan says not only what it will do but what it won't; this list is a
written fence against scope creep. One more thing stands out: this plan's MVP
and first phase line up almost exactly with the core we actually built in the
earlier posts of this series — a well-constrained question converges on a
similar, sensible plan even in an independent run.

## Have it critique the plan

Having the plan in hand doesn't end the job; have the same model critique it:

```text
What's the weakest part of this plan? Which assumption, if wrong,
breaks it? Don't propose new features; only state the risks.
```

The first sentence of the answer nailed the weakest spot: data entry is
manual — if you don't enter invoices regularly, the ledger goes stale and the
"unpaid" list stops reflecting reality; all the value depends on it. Then it
weighed the assumptions one by one: the "summary on open is enough" assumption
is risky (if you don't open the app for days, you still miss a due date; if
that turns out wrong, passive notifications are needed from the start and
change the architecture), the assumption that monthly invoices always have a
fixed amount can break Phase 2's recurrence logic, and the single-currency
assumption collapses with the first foreign client.

The subtlety here: it brought even my approved "summary is enough" answer
back up for questioning. The decision is still mine — but now I make it
knowing it's a decision, not an assumption made without noticing. Note the
"don't propose new features" instruction in the prompt — without that
sentence, the model counts features instead of risks.

## An honest limit

This entire conversation happens in an ordinary chat interface; the in-tool
plan approval (I covered Claude Code's version in the
[Plan Mode post]({{ '/en/blog/plan-mode/' | relative_url }})) is a separate
level. That one is the plan of a single code change; what we discussed here is
the plan of the product.

And the final say is always yours. The model is your planning partner, not
the decision maker: don't approve a phase you don't understand — a phase you
don't understand is the herald of code you won't understand. And as in the
previous post, the plan is not a contract but a living document; if what you
learned in the critique round changed it, it's already doing its job.

Next post: What Is Spec-Driven Development (SDD)?
