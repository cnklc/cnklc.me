---
layout: post
lang: en
permalink: /en/blog/sir-yonetimi-ve-guvenlik/
translation_url: /blog/sir-yonetimi-ve-guvenlik/
title: "Don't Bury Secrets in Code: Security Practices"
date: 2026-08-06
summary: "The moment an API key lands in code, treat it as leaked. Environment variables, off-limits zones for the tool, pre-commit scanning, and the right reflex after a leak."
tags: [vibe-coding, security, secrets]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Don't Bury Secrets in Code: Security Practices"
---

> The final post in the "Vibe Coding Journey" series. Last time we looked at tests —
> the mechanism that proves code works. Here, working code isn't enough: a single
> line landing in the wrong place can't be taken back.

Generating code faster also speeds up how quickly secrets slip into it. When a
model writes an integration it takes the shortest path: it drops the key right
next to the client, because that works. If you skim the diff and accept, that line
enters the repository. The problem isn't the model's intent — it's that a path
nobody is watching stays open.

## Secrets go into the environment, not the code

The basic rule hasn't changed: credentials live in environment variables, not in
source code. Here's the prompt I used when adding email delivery to the invoice
tracking project:

```text
Add a service that emails the invoice PDF. Do not write the API key into the
code; read it from process.env and fail at startup with a clear error if it's
missing. Add the variable name to .env.example without its real value. Do not
open or read the .env file.
```

Three details matter. `.env.example` lets the team see which variables are
required — without the values. Failing at startup on a missing variable stops the
key from silently ending up as `undefined`. And it's worth confirming once that
`.env` is actually ignored:

```bash
git check-ignore -v .env
```

If the output shows a matching rule, the file is out of git's sight. If it prints
nothing, `.env` is a candidate for being tracked.

## Declare off-limits zones to the tool

The second layer is making sure the tool can't touch those files at all. In Claude
Code you do this with `deny` rules in `settings.json`; deny rules are evaluated
first in the permission flow and block the tool when they match:

```json
{
  "permissions": {
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./secrets/**)"
    ]
  }
}
```

Alongside that, writing off-limits zones into your context file (CLAUDE.md,
AGENTS.md, `.cursor/rules/` — it varies by tool) is a common practice. But the
difference matters: `deny` is a technical barrier, while "don't touch this" in a
context file is an instruction. Instructions can always be missed, so repeat the
same boundary in the prompt when you're working near those areas. I covered how
context files are written in
[CLAUDE.md basics]({{ '/en/blog/claude-md-temelleri/' | relative_url }}).

## Put a scanner in front of the commit

Human eyes miss a 40-character string in a diff. Tying this to an automated check
is safer. Gitleaks is a widely used open-source tool that looks for secrets in
repositories and files, and it hooks into pre-commit:

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.24.2
    hooks:
      - id: gitleaks
```

After `pre-commit install`, every commit attempt goes through the scan. To scan
existing history once:

```bash
gitleaks git -v
```

There's one more gate: GitHub's push protection catches and blocks supported
secret types during a push. Because it runs server-side, it also covers the cases
where a local hook was skipped.

## If it leaked: revoke first

This is where the reflex is easiest to get wrong. GitHub's documentation is
explicit: a leaked secret should be considered immediately compromised, and
removing it from the codebase, pushing a new commit, or deleting and recreating
the repository does not prevent it from being exploited.

The right order is: revoke the secret with its provider, generate a replacement,
update dependent services, then check access logs for unauthorized use. If
downtime is a concern, rolling out the new key before revoking the old one is a
reasonable sequence. Cleaning git history is the last and most debatable step — it
generally requires a force push, which can be disruptive, and it isn't urgent for
a key that has already been revoked.

## The limits

Asking the model to "review this for security issues" helps, but it isn't a
guarantee. Models are largely trained on public code, some of which contains
insecure patterns, and generated code can carry those same patterns. Code that
handles user input, enforces access control, or manages keys still needs to be
read by a human — no matter who wrote it. The tool's own security model doesn't
replace this either; I covered that side separately in
[Claude Code security]({{ '/en/blog/claude-code-guvenlik/' | relative_url }}).

There's one solid rule about secrets: once a key has entered the repository, it
isn't your key anymore.

---

*This post concludes the "Vibe Coding Journey" series.*
