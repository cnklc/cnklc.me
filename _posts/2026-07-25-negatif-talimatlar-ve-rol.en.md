---
layout: post
lang: en
permalink: /en/blog/negatif-talimatlar-ve-rol/
translation_url: /blog/negatif-talimatlar-ve-rol/
title: "Say What It Shouldn't Do: Negative Instructions and Roles"
date: 2026-07-25
summary: "Two complementary ways to narrow a request: spelling out what the model must not touch, and giving it a role that sets its priorities. Both have places where they work and places where they backfire."
tags: [vibe-coding, prompting, code-quality]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Say What It Shouldn't Do: Negative Instructions and Roles"
---

> Part of the "Vibe Coding Journey" series. Last time we looked at narrowing a
> request to a single task; now we turn to two complementary parts of that
> request: saying what must not be done, and giving the model a role.

The [specific prompt, single task]({{ '/en/blog/spesifik-prompt-tek-gorev/' | relative_url }})
rule clarifies *what* you want. In practice, though, the trouble usually isn't
what you asked for — it's what the model adds alongside it: it "improves" a file
it shouldn't have touched, pulls in a dependency you didn't want, writes in a
style you didn't ask for. That's what these two additions are for.

## Off-limits zones: saying "don't touch" really does work

The strongest use of a negative instruction is a scope boundary. Naming the
files, directories, and decisions the model may not touch is more effective than
anything you leave implicit. From the invoice tracking project:

```text
Add a "last updated" column to the invoice list.
Only src/models/invoice.ts and src/components/InvoiceList.tsx may change.
Do not touch src/auth/ — the authentication flow is out of scope.
Do not add new dependencies.
```

Those three prohibitions close the gap that "just do this one thing" leaves open
on its own. roadmap.sh's vibe coding best practices guide makes the same point:
declaring off-limits zones in your project config file is necessary but not
sufficient — you need to repeat them in the prompt when you're working near
those files.

## But "don't" is a weak instruction for form

The same approach doesn't hold for style and formatting. Anthropic's prompting
guide states it as a rule: tell the model what to do instead of what not to do.
Their example is exactly this — instead of "Do not use markdown in your
response", try "Your response should be composed of smoothly flowing prose
paragraphs."

The reason is simple. A prohibition leaves the entire remaining space of
possibilities wide open. Say "don't overcomplicate the code" and the model has
to guess what complexity means to you. Describe the target instead:

```text
Write a single pure function that formats the amount.
Match the shape of the functions in src/utils/date.ts exactly.
```

The practical split: use prohibitions for **boundaries** (files, directories,
dependencies, scope) and positive descriptions for **form and approach**. Mixing
the two produces prompts that are long but ineffective.

## Roles: a tone and priority dial

Giving the model a role is a documented technique: setting a role in the system
prompt focuses the model's behavior and tone for your use case, and even a
single sentence makes a difference. In coding agents, the equivalent place is
the system prompt or the project config file:

```text
Act as a senior backend developer reviewing code in this repository.
Your priorities are correctness and reversibility of changes, not speed.
```

To be honest about its limits: a role adds no new knowledge to the model; it
only adjusts which priorities it acts on. "You are a security expert" does not
by itself find vulnerabilities — a concrete checklist does. One more detail:
the docs note that with newer models there's no need to shout your instructions
(`CRITICAL: You MUST do this...`); normal phrasing works. Capital letters don't
strengthen an instruction. Clarity does.

## Make the repeats permanent

Retyping the same prohibitions in every prompt gets tiring. Recurring rules
belong in the project config file: `CLAUDE.md` in Claude Code, `AGENTS.md` in
Codex, `GEMINI.md` in Gemini CLI, `.mdc` rule files under `.cursor/rules/` in
Cursor, `.windsurfrules` in Windsurf. The filename changes; the idea doesn't. We
covered how to set these up in
[Setting Standards Early]({{ '/en/blog/standartlari-erken-kurmak/' | relative_url }}).

One caveat, though: writing a rule into the config file doesn't guarantee it will
be honored in every session. If a boundary really matters, repeat it in the
prompt and — above all — read the diff. A prohibition is no substitute for
review.

Next post: [Keeping the Context Document Current]({{ '/en/blog/baglam-dokumani-guncel-tutmak/' | relative_url }})
