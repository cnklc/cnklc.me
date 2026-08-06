---
layout: post
lang: en
permalink: /en/blog/ai-a-test-yazdirmak/
translation_url: /blog/ai-a-test-yazdirmak/
title: "Getting AI to Write Tests: TDD and the Test That Breaks the Bug"
date: 2026-08-05
summary: "A test is the only thing that proves the model actually finished. Writing the test first, starting from the test that reproduces the bug, and watching who wrote the test — three practices."
tags: [vibe-coding, testing, tdd]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Getting AI to Write Tests: TDD and the Test That Breaks the Bug"
---

> Part of the "Vibe Coding Journey" series. Last post was about git's undo net.
> This one is a step earlier: how do you know whether you need to undo anything?

A model stops when the work looks done. Without a check it can run, "looks done"
is the only signal available, and verification falls entirely to you — every
mistake waits for you to notice it. Tests close that loop. The model writes the
code, runs the tests, reads the output, and iterates until they pass. I covered
the general shape of this loop in the
[Claude Code best practices]({{ '/en/blog/kullanim-en-iyi-pratikleri/' | relative_url }})
post; here I want to look at the test itself.

## Reverse the order: test first

If you say "build this, then write tests too", you usually get tests that confirm
whatever the code happens to do. If the code is wrong, the test is wrong with it.
Reversing the order prevents that: have the tests written first, and approve the
behaviour yourself before any implementation exists.

In the invoice tracking project I'm adding discount calculation. First prompt:

```text
We're adding discount calculation to the invoice total. Use TDD: write the
tests first, run them, and show me that they fail. Do not write implementation
code at this stage, and do not create mocks or empty stub functions.

Cases:
- no discount: 1000 TL invoice, total 1000
- 10% discount: 1000 TL invoice, total 900
- discount rate above 100: throw an error
- negative discount rate: throw an error
```

The "no implementation" part matters. Otherwise the model produces a quick
skeleton to get the tests green and you never see them fail — and a test you
haven't seen fail hasn't proven that it measures anything.

With the tests red, the second prompt:

```text
Now write the code that makes these tests pass. Do not modify the tests. Keep
going until all of them pass, then show me the raw test output.
```

Without "do not modify the tests", the model taking the shortest path and
loosening a test is a common outcome. Asking for the output is for the same
reason: the model saying "all green" and the tests actually being green are not
the same claim.

## Start with the test that breaks the bug

When a bug report arrives, the first thing to ask for isn't the fix — it's the
test that reproduces it:

```text
On an invoice with a 100% discount, the total comes out as the VAT amount
instead of 0. Look at src/invoices/total.js. First write a failing test that
reproduces this and show me it failing; then fix it.
```

This buys you two things. It proves you understood the bug — a test that refuses
to fail means either the bug is somewhere else or you described the scenario
wrong. And it leaves behind a test that will catch the same bug if it comes back.

## Whoever writes the code shouldn't write the tests

A model testing its own code inherits that code's assumptions along with it. The
split Anthropic's own guide suggests: have one session write the tests and
another write the code that passes them. A subagent works the same way — a fresh
context doesn't carry the assumptions made while producing the code:

```text
Use a subagent to review the tests written for src/invoices/discount.js,
looking only at external behaviour. List the edge cases that aren't covered.
```

This has a cost: two sessions, more tokens, more coordination. It isn't worth it
for every change; it is worth it around money, tax and permissions.

## The limits

Getting tests written doesn't guarantee quality. A model can produce tests that
lift the coverage number while verifying nothing, or lean on mocks so heavily
that the real integration is never exercised. Accepting tests without reading
them lands you in the same place as accepting code without reading it — just one
layer further away.

If you want the check tied to a harder gate, tools have automation for it; in
Claude Code a Stop hook can block the turn from ending until the tests pass (it
steps aside after 8 consecutive blocks). But the gate can't be worth more than
the tests behind it.

Next post: [Hardcoding Secrets: Security Practices]({{ '/en/blog/sir-yonetimi-ve-guvenlik/' | relative_url }})
