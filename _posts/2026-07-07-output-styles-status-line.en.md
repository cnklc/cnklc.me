---
layout: post
lang: en
date: 2026-07-07
permalink: /en/blog/output-styles-status-line/
translation_url: /blog/output-styles-status-line/
title: "Customizing Output Styles and the Status Line"
summary: "How to shape the way Claude Code talks with output styles, and the bottom row of the interface with status line scripts. Two small settings that change daily use."
tags: [claude-code, output-styles, status-line]
draft_series: "Claude Code Journey"
roadmap_topic: "Customizing Output Styles and the Status Line"
---

> Continuing the "Claude Code Journey" series. In the previous post we looked
> at [Plan Mode]({{ '/en/blog/plan-mode/' | relative_url }}); this time we
> turn to two features that shape the tool itself around you: output styles
> and the status line.

After using Claude Code for a while, two kinds of wishes emerge: "always answer
in this tone" and "keep this piece of information visible at the bottom of the
screen." Output styles handle the first, the status line handles the second.

## What is an output style?

An output style modifies Claude Code's system prompt — not what Claude knows,
but how it responds. If you keep re-prompting for the same tone or format every
turn, it's time to move that instruction into a style.

Besides the default, there are three built-in styles: **Proactive** (executes
immediately and makes routine decisions on its own), **Explanatory** (adds
educational "Insights" while coding) and **Learning** (a learn-by-doing mode
that leaves `TODO(human)` markers in the code for you to implement small
pieces yourself).

To switch styles, run `/config` and pick **Output style**. Your choice is
saved to `.claude/settings.local.json`. There's also a menu-free route — edit
the setting directly:

```json
{
  "outputStyle": "Explanatory"
}
```

Two notes: there used to be a standalone `/output-style` command for this; it
was removed, and `/config` is the way now. And since the style is part of the
system prompt, changes only take effect after `/clear` or in a new session.

## Writing your own style

A custom style is just a Markdown file with frontmatter. Put it in
`~/.claude/output-styles/` for user-wide use, or `.claude/output-styles/` for
a single project. For example, a style that leads every explanation with a
diagram:

```markdown
---
name: Diagrams first
description: Lead every explanation with a diagram
keep-coding-instructions: true
---

When explaining code, architecture, or data flow, start with a Mermaid
diagram showing the structure, then explain in prose.
```

The critical field is `keep-coding-instructions`: it defaults to `false`, and
when it stays `false`, Claude Code's built-in software engineering instructions
are dropped from the system prompt. Set it to `true` if you still want Claude
coding; leave it off if you're putting Claude in an entirely different role
(say, a writing assistant). For project rules and codebase knowledge, the right
place isn't an output style but [CLAUDE.md]({{ '/en/blog/claude-md-temelleri/' | relative_url }}).

## The status line: the bottom row is yours

The status line is a customizable row at the bottom of the interface: it runs
a shell script you write, feeds it session data as JSON on stdin, and displays
whatever the script prints. Context window usage, session cost, git branch —
whatever you want.

The easiest start is telling the `/statusline` command what you want in plain
language; it generates the script for you and updates your settings:

```text
/statusline show model name and context percentage with a progress bar
```

If you'd rather set it up manually, add this to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "~/.claude/statusline.sh"
  }
}
```

The script side is simple too. Here's one that shows the model, folder, and
context percentage (don't forget `chmod +x`):

```bash
#!/bin/bash
input=$(cat)
MODEL=$(echo "$input" | jq -r '.model.display_name')
DIR=$(echo "$input" | jq -r '.workspace.current_dir')
PCT=$(echo "$input" | jq -r '.context_window.used_percentage // 0' | cut -d. -f1)
echo "[$MODEL] ${DIR##*/} | ${PCT}% context"
```

The JSON carries much more than this: session cost via `cost.total_cost_usd`,
subscription limit percentages via `rate_limits`, even the currently active
style via `output_style.name`. The script runs locally and consumes no tokens.
You can test it with mock input:

```bash
echo '{"model":{"display_name":"Opus"},"workspace":{"current_dir":"/tmp/project"},"context_window":{"used_percentage":25}}' | ~/.claude/statusline.sh
```

Both are small touches with lasting effects: output styles tune Claude's
voice, the status line tunes your field of view. Set them up once and forget
about them.

---

*Next post: Session Management: Resume and Rewind*
