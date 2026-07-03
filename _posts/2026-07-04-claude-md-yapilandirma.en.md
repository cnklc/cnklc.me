---
layout: post
lang: en
permalink: /en/blog/claude-md-yapilandirma/
translation_url: /blog/claude-md-yapilandirma/
title: "CLAUDE.md: Structure and Locations (In Depth)"
date: 2026-07-04
summary: "The full location table for CLAUDE.md, modular rules with .claude/rules/, path-specific rules, excluding files in monorepos, and AGENTS.md compatibility."
tags: [claude-code, claude-md, configuration]
draft_series: "Claude Code Journey"
roadmap_topic: "CLAUDE.md: Structure and Locations (In Depth)"
---

> Earlier in the "Claude Code Journey" series, [CLAUDE.md Basics]({{ '/en/blog/claude-md-temelleri/' | relative_url }}) covered what the file does and where it can live. This post goes deeper into the same topic: the full location table, ways to organize instructions without one file growing out of control, and the issues that show up in large repos.

## The full location table

The earlier post touched on user, project, and auto-memory locations. The official docs add one more layer: the **managed policy** file, looked up at an OS-specific path:

- macOS: `/Library/Application Support/ClaudeCode/CLAUDE.md`
- Linux and WSL: `/etc/claude-code/CLAUDE.md`
- Windows: `C:\Program Files\ClaudeCode\CLAUDE.md`

This file is deployed by IT/DevOps through MDM, Group Policy, or Ansible, and no individual user can turn it off — its scope is everyone on the machine, every repo. Alternatively, the text can be written directly into the `claudeMd` key inside `managed-settings.json`, without a separate file.

There's also `./CLAUDE.local.md`: at the project root, added to `.gitignore`, for preferences that belong to you alone (sandbox URLs, test data, and the like). Running `/init` and picking the personal option adds it to `.gitignore` automatically.

## Load order, in a bit more detail

The earlier post said Claude climbs the directory tree from root down to the working directory. One detail worth adding: at each directory level, `CLAUDE.local.md` is appended **after** that level's `CLAUDE.md` — so your personal notes are guaranteed to be the last thing Claude reads at that layer. Also, block-level HTML comments inside CLAUDE.md (`<!-- maintainer note -->`) are stripped before the content is injected into context; if you want to leave notes for human maintainers without spending context tokens, this is how (comments inside code blocks are exempt from this rule).

## Modular structure with `.claude/rules/`

As a file grows, you can move from a single CLAUDE.md to topic files under `.claude/rules/`:

```text
your-project/
├── .claude/
│   ├── CLAUDE.md
│   └── rules/
│       ├── code-style.md
│       ├── testing.md
│       └── security.md
```

Rules without a `paths` field carry the same priority as `.claude/CLAUDE.md` and load every session. The real difference starts here: if you want a rule to load only when Claude is working with certain file types, you add `paths` to the YAML front matter:

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API Development Rules

- All API endpoints must include input validation
- Use the standard error response format
```

This rule kicks in when Claude reads a `.ts` file under `src/api/` — not on every tool call, only when a file matches. That way backend rules don't bloat the context while you're working on the frontend. Rules placed under `~/.claude/rules/` apply to every project on your machine and load before project rules.

## Excluding files in large repos

In a monorepo, other teams' CLAUDE.md files can end up irrelevant to your work. The `claudeMdExcludes` setting lets you skip specific files by path or glob pattern:

```json
{
  "claudeMdExcludes": [
    "**/monorepo/CLAUDE.md",
    "/home/user/monorepo/other-team/.claude/rules/**"
  ]
}
```

Put this in `.claude/settings.local.json` and the exclusion only applies on your own machine. The one exception: a managed policy CLAUDE.md can never be excluded.

## Compatibility with AGENTS.md

If a repo already uses `AGENTS.md` for other agents, Claude Code doesn't read it directly — it looks for `CLAUDE.md`. The fix is to import it:

```markdown
@AGENTS.md

## Claude Code
Use plan mode for changes under `src/billing/`.
```

If you don't need Claude-specific content, a symlink also works (`ln -s AGENTS.md CLAUDE.md`), though on Windows symlinks need admin rights, so the import path is more practical there.

## Summary

CLAUDE.md's location hierarchy has four layers — managed policy, user, project, local — each with an exact file path. As a file grows, `.claude/rules/` lets you modularize it and load rules by path with `paths`; in a monorepo, `claudeMdExcludes` cuts the noise. Next up: creating skills, the way to package repeatable workflows.

---

*Next post: Creating Skills and Best Practices*
