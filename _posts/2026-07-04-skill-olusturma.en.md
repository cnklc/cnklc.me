---
layout: post
lang: en
permalink: /en/blog/skill-olusturma/
translation_url: /blog/skill-olusturma/
title: "Creating Skills and Best Practices"
date: 2026-07-04
summary: "How do you write your own skill? SKILL.md structure, frontmatter fields, arguments, and dynamic context — the practices behind skills that actually work."
tags: [claude-code, skills, automation]
draft_series: "Claude Code Journey"
roadmap_topic: "Creating Skills and Best Practices"
---

> The "Claude Code Journey" series continues. In the previous post we took a
> [deep dive into CLAUDE.md structure and locations]({{ '/en/blog/claude-md-yapilandirma/' | relative_url }}).
> In this one, we write our own skill.

In the [skills overview]({{ '/en/blog/skills-genel-bakis/' | relative_url }})
post I covered what skills are. Now for the practical part: writing a skill
from scratch, and learning the rules for doing it well.

## When should you write a skill?

The test is simple: if you keep pasting the same instructions, checklist, or
multi-step procedure into chat, that's a skill. If a section of your CLAUDE.md
has grown from a "fact" into a "procedure", that's a skill candidate too.
CLAUDE.md loads into context every session; a skill's body loads only when
it's used. Long reference material costs almost nothing in tokens until you
actually need it.

## A first skill: pre-commit summary

Say that before committing you often check "what did I change, is anything
risky?". Let's turn that into a skill. First create the directory:

```bash
mkdir -p ~/.claude/skills/change-summary
```

Personal skills under `~/.claude/skills/` apply across all your projects; if
you want it in a single project only, use `.claude/skills/` and commit it to
the repo. Then put a `SKILL.md` in the directory:

```yaml
---
description: Summarizes uncommitted changes and flags anything risky. Use when the user asks what changed or wants their diff reviewed.
---

## Current changes

!`git diff HEAD`

## Instructions

Summarize the changes above in two or three bullet points, then list any risks
you notice such as missing error handling, hardcoded values, or tests that
need updating. If the diff is empty, say there are no uncommitted changes.
```

The `` !`git diff HEAD` `` line is dynamic context injection: Claude Code runs
the command *before* the skill content is sent to the model and replaces the
line with its output. Claude doesn't guess; it gets the live diff handed to
it. From now on, asking "what did I change?" triggers the skill automatically,
or you invoke it directly with `/change-summary`.

## Tuning behavior with frontmatter

A few fields define a skill's character:

`description` is the most critical one — Claude decides when to use the skill
based on it. It should contain the keywords users would naturally say, with
the key use case first; in the listing the text is truncated at 1,536
characters.

`disable-model-invocation: true` makes the skill invocable only by you. This
matters for side-effect workflows like deploy or commit: you don't want Claude
deciding to deploy because your code looks ready. Its counterpart,
`user-invocable: false`, hides the skill from the `/` menu; it suits
background knowledge that isn't meaningful as a command.

A line like `allowed-tools: Bash(git add *) Bash(git commit *)` lets Claude
use the listed tools without asking for approval while the skill is active.
`context: fork` runs the skill in an isolated subagent — we'll come back to
that in the next post.

Skills also take arguments: put `$ARGUMENTS` in the body and the `123` in a
`/skill-name 123` call lands there. `$0`, `$1` access individual positions.

## Best practices

Keep the body short: once a skill loads, it stays in context for the rest of
the session, so every line is a recurring token cost. The official
recommendation is to keep `SKILL.md` under 500 lines and move detailed
reference material into separate files linked from `SKILL.md`. State what to
do rather than narrating how or why.

A skill triggering doesn't mean it works correctly; measure the two
separately. The official `skill-creator` plugin exists for this: install it
with `/plugin install skill-creator@claude-plugins-official`, then evaluate
your skill against test cases and compare runs with and without the skill.

If a skill doesn't trigger when you expect, the first place to look is the
`description`: strengthen the keywords. If it triggers too often, narrowing it
happens in the same place.

Next post: Subagents and Agent Teams
