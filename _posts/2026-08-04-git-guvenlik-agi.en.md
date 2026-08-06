---
layout: post
lang: en
permalink: /en/blog/git-guvenlik-agi/
translation_url: /blog/git-guvenlik-agi/
title: "Git: The Safety Net of Vibe Coding"
date: 2026-08-04
summary: "Giving a model broad permission is paid for by being able to go back. Frequent commits, a diff you actually read, and one branch per feature — the three habits that make vibe coding bold but reversible."
tags: [vibe-coding, git, version-control]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Git: The Safety Net of Vibe Coding"
---

> Part of the "Vibe Coding Journey" series. So far we've covered planning,
> prompting, context and debugging. This post is about what sits underneath all
> of them: what happens when it goes wrong?

The basic operation of vibe coding is telling a model "do this" and letting it
produce changes across several files. Some of those changes will be good, some
unnecessary, and some plainly wrong. That isn't the inevitable part; the
inevitable part is being able to undo it cheaply. That's exactly what git does —
it reduces the cost of a mistake to a single command.

Coding tools have their own undo mechanisms — in Claude Code, `/rewind` takes you
back to the file state before any prompt in the session, and Cursor and others
have checkpoint equivalents. These are fast but session-bound: their scope is
that conversation and their lifetime is limited. The durable layer is still git.

## A clean baseline before every prompt

The simplest and most useful rule: commit the working state before you hand the
model a task. In the invoice tracking project, before touching discount
calculation:

```bash
git status -s
git add -A && git commit -m "working state before discounts"
```

What this buys you: whatever the model does, there's a known point to return to.
The commit message doesn't need to be elegant; it just needs to be a baseline.

One caveat: this habit inflates your commit history. Squashing the related
commits before shipping, or merging the feature branch as a single commit, is a
reasonable middle ground.

## Don't accept a diff you haven't read

The only way to know what the model changed is to look. Start with the summary:

```bash
git diff --stat
```

```
 src/invoices/tax.js   | 2 +-
 src/invoices/total.js | 2 +-
 2 files changed, 2 insertions(+), 2 deletions(-)
```

The interesting entry here is `tax.js`. You asked for discount calculation; you
didn't ask for the VAT rate to be touched. The file list catches this kind of
scope creep before you read a single line. Watch especially for: deleted files,
changed function signatures, new dependencies, and schema or migration files.

If the unwanted change is confined to one file, you don't have to throw
everything away:

```bash
git restore src/invoices/tax.js
```

`git restore` brings back a file in the working tree; if you want to undo
something already committed, `git revert <commit>` does it by creating a new
commit. It's worth keeping the two apart — one discards a change that was never
recorded, the other records a new change that reverses one that was.

## One feature per branch

There's no reason to try risky work on your main branch:

```bash
git switch -c feat/discounts
```

If you don't like the result, you delete the branch and move on. This turns "that
approach didn't work, let's start over" from a disaster into a choice — and when
you're working with a model, that situation comes up more often than you'd think.

If you want to run several sessions at once, branches may not be enough; two
sessions touch files in the same directory. For that scenario, see the
[git worktrees]({{ '/en/blog/git-worktrees/' | relative_url }}) post.

## The limits

Git is a safety net, not quality control. Committing often doesn't make bad code
good; it only makes bad code cheap to undo. And it does nothing at all unless you
read the diff — wrong code that has been committed is more dangerous than wrong
code that hasn't, because it now looks accepted. The net isn't there to stop you
from falling; it's there so you can get back up when you do.

Next post: [Getting AI to Write Tests: TDD and the Test That Breaks the Bug]({{ '/en/blog/ai-a-test-yazdirmak/' | relative_url }})
