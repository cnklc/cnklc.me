---
layout: post
lang: en
permalink: /en/blog/standartlari-erken-kurmak/
translation_url: /blog/standartlari-erken-kurmak/
title: "Set Standards Early: Review the First Outputs Carefully"
date: 2026-07-23
summary: "AI writes new code by looking at your existing code. A project's first few outputs become the template for everything after — so take them seriously."
tags: [vibe-coding, standards, code-review]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Set Standards Early: Review the First Outputs Carefully"
---

> Part of the "Vibe Coding Journey" series. This one is about a habit that
> holds regardless of tool: treating the AI's first outputs as decisions that
> will shape the entire project.

In vibe coding the most expensive mistakes usually happen on day one. When you
have the model produce "something that works" and accept it quickly, that
"something" quietly becomes the project's standard. Fixing it later costs far
more than getting it right the first time.

## The first output is the template for every output after it

When AI models write new code, the strongest reference they use is your own
existing code. In an invoice-tracking project, once you have the model write
the first API route — say `src/routes/invoices.ts` — that file is now an
example. Ask for the payments route and the model will most likely imitate it:
it copies the error handling, the naming, the response format.

The practical consequence is that sloppiness in the first file isn't a bug,
it's a **standard**, and it multiplies silently. So instead of rushing with
"it works, move on," getting that first route exactly the way you want is much
cheaper than fixing the next twenty files one by one.

## Read the diff like a junior developer's PR

After every generation, review the output like a pull request from a new team
member: read it, run it, and don't accept it until you understand what changed.
Tools assume their changes are safe and apply them broadly; they may delete a
file they deem redundant or silently rename an endpoint. In invoice tracking,
if `GET /api/invoices/:id` gets renamed without asking you, everything that
depends on it breaks.

In the diff, watch especially for: deleted files, functions whose signatures
changed, new dependencies added to `package.json`, and hard-coded keys in the
source. Asking the model for an explicit risk summary before accepting catches
what a quick scan misses:

```text
Before I accept this: summarize the changes you made, list the
files you deleted, note any new dependencies you added, and flag
anything that could break existing functionality I haven't tested yet.
```

I covered the habit of giving verifiable work and tying output to evidence in
more detail in
[Best Practices for Everyday Use]({{ '/en/blog/kullanim-en-iyi-pratikleri/' | relative_url }}).

## Write the standard down first, then show an example file

Keeping the standard in your head isn't enough; it has to live somewhere the
model can see. There are two ways. First, the context document — CLAUDE.md in
Claude Code (see
[CLAUDE.md Basics]({{ '/en/blog/claude-md-temelleri/' | relative_url }})),
`GEMINI.md` in Gemini CLI, `.cursor/rules/` in Cursor, `AGENTS.md` in Codex.
That's where you write the durable rules: naming, error handling, and areas
that must not be touched.

The second is often stronger: showing the model an example file to imitate. A
good reference file says it more clearly than a hundred words of style notes:

```text
Before writing any code, read src/routes/invoices.ts. It shows
the pattern I use for all routes: error handling, validation,
response format. Match that pattern exactly when building the
payments route.
```

One honest caveat: setting standards early adds time up front, and you won't
know every rule on day one. So lock down only the decisions you're sure of and
refine the rest as the project grows. The goal isn't a perfect rule set — it's
one clean first example for the model to imitate.

Next post: [Getting the AI to Refactor Regularly]({{ '/en/blog/duzenli-refactoring/' | relative_url }}).
