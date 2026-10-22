---
layout: post
lang: en
permalink: /en/blog/anthropic-scion-kaynak-kontrolu/
translation_url: /blog/anthropic-scion-kaynak-kontrolu/
title: "When Writing Code Stops Being the Bottleneck: Why Anthropic Replaced Git with Scion"
date: 2026-10-22
summary: "After passing 30,000 merges a day, Anthropic left git and built its own version control system. The real lesson isn't Scion: when agents speed up coding, the bottleneck moves to the next layer."
tags: [git, version-control, ai-agents, anthropic]
---

> This post builds on
> [Redesigning source control at Anthropic](https://www.anthropic.com/research/redesigning-source-control),
> published by Anthropic's engineering team on October 13, 2026. It's not a
> translation; I summarize the ideas and discuss what they mean to me as a
> developer. All figures are as reported by Anthropic.

For years we assumed the slowest part of building software was writing the code.
AI agents broke that assumption quickly, and Anthropic's post is a good look at
what comes next: when coding gets faster, the load doesn't disappear, it moves to
the next layer. Here, that layer was git, the tool most of us use without a
second thought.

## What the numbers say

According to Anthropic, daily merges into their monorepo went from about 2,500 in
May 2026 to over 30,000 in September — more than tenfold in four months. Most of
those changes come from agents working with Claude, not from people.

The rest of the scale matches:

- The history of `main` is close to 100 GB; a compressed working copy is over 25 GB.
- CI runs about 25 million checkouts a day.
- If each did a plain `git clone`, daily traffic would exceed 600 petabytes.

Shallow clones, sparse checkouts and hundreds of internal git mirrors held things
together for a while, but as merge rates climbed, keeping those patches alive
became a job of its own.

## The gap between git's assumptions and real use

The most instructive line in the post, for me: git was designed as a distributed
system, but Anthropic was using it as a centralized one.

Git assumes every client can carry the full history and work offline. That's a
great assumption for the problem Linus Torvalds was solving — independent people
working all over the world. It doesn't fit a CI job or an agent. An agent is
always online, needs a handful of files rather than the whole history, does its
work and disappears. Making that client carry a 25 GB working copy is like moving
a library to deliver a letter.

## Scion: shrink the client, make the server smart

So Anthropic built its own version control system, Scion, and migrated the
monorepo off git in five months. In the same period they also shipped a code
review tool (Antique), code search and an access control system. The idea isn't
entirely new: Google's Piper and Meta's Sapling (especially its Mononoke server)
went down a similar road.

The core of the design fits in a few points:

- **The client is assumed to be online.** Data is fetched from the server on demand.
- **Heavy lifting happens on the server.** History, blame, commits, merges and
  rebases run server-side; the client keeps a bounded cache and working copy.
- **Everything is an API.** Many CI jobs, like automated bisect or revert, don't
  need a local repo at all.
- **No full copy anywhere.** Data is distributed; no packfiles, no `git gc`-style
  repo maintenance.
- **Commits are cheap.** They're created on the server, cost scales with the size
  of the change, and they don't need locks.
- **The working copy is optional.** When needed, it's sparse and virtualized;
  only files that are read get loaded.

One protocol detail I particularly liked: in git, the client tells the server
"here's what I have" and the server packs up the difference. In Scion, the client
starts at the root tree and requests only the trees and files it needs. If the
request is interrupted, it resumes where it left off instead of waiting for a
huge pack to be built.

Because content-addressed data never changes, any server can cache it safely. The
architecture has three tiers: a daemon on each machine, a regional in-memory
cache, and the authoritative server. Anthropic reports a cache hit rate above 99%
at every tier, an infrastructure footprint roughly 200x smaller in CPU and memory
than the old git mirroring setup, and checkouts that went from minutes to seconds.

## The real story: seven people, five months

More than the technical details, the "lessons learned" section caught my
attention. A team of seven built Scion, Antique and the related systems and ran
the migration — while merge volume grew tenfold. What made that possible was how
the team worked with Claude. A few observations:

**The engineer's job is to say "no."** The team says they often had to stop
Claude when it violated system constraints or over-engineered a solution. As
writing code gets cheaper, deciding what shouldn't be written becomes the
engineer's main contribution.

**Review moves from lines to intent.** Reviewers now look at what a change is
trying to do rather than every line. That only works with a strong safety net:
heavy testing, hermetic simulations, fuzzing.

**Optimization got cheaper.** Claude Mythos Preview reportedly rewrote the
git-to-Scion ingestion pipeline, and the result used 20x less memory and ran 4x
faster. Optimizations an expert might spend days on are now worth trying.

**Monitoring is going agentic too.** They set up Claude "superfans" that watch
each component through telemetry and logs, catching subtle issues traditional
alerts miss.

**The merge queue no longer fits.** A classic merge queue can't keep up with
agent speed. Anthropic shifted investment to post-merge and pre-deploy testing,
and Claude usually resolves conflicts before humans would even notice them.

## So should we leave git?

No, and Anthropic doesn't say so either. Scion is built for enormous monorepos
with tens of thousands of engineers or large agent swarms, and it's too specific
to Anthropic to be released. The post's suggestion is more modest: git platforms
and clients can adopt server-side operations and more composable sparse/shallow
features without breaking git's model.

For those of us working solo or in small teams, problems at this scale feel far
away. But Anthropic expects this kind of scaling problem to become common within
6–12 months, and I think the direction is right. Three practical lessons apply
today:

**1. Don't hand the agent the whole repo.** Git's own tools already offer a
small-scale version of Scion's ideas. To work only with the folders you care
about in a large repo:

```bash
git clone --filter=blob:none --sparse https://github.com/user/repo.git
cd repo
git sparse-checkout set apps/mobile packages/shared
```

`--filter=blob:none` downloads file contents on demand (partial clone), and
`sparse-checkout` limits the working copy to the folders you choose. In CI, if
you don't need history, `--depth=1` is enough.

**2. Give parallel agents separate workspaces.** If you run several agents on the
same repo, giving each its own worktree cuts conflicts at the source:

```bash
git worktree add ../repo-invoice-discount -b feature/invoice-discount
```

**3. Watch where the bottleneck moves.** When code generation speeds up, what
slows down is usually review, testing and integration. That's why [using git as
a safety net]({{ '/en/blog/git-guvenlik-agi/' | relative_url }}) and [writing the
test first]({{ '/en/blog/ai-a-test-yazdirmak/' | relative_url }}) matter: the
faster the agent produces, the more automated verification has to be.

## Closing thought

What stayed with me after reading this wasn't Scion itself but a question: the
tools we've treated as "infrastructure" for years were designed for human speed.
As agents change that speed, every layer — from git to CI, from code review to
deploys — will go through a similar rethink. Anthropic got there early; for most
of us, the question isn't "if" but "when."

*Source: [Redesigning source control at Anthropic](https://www.anthropic.com/research/redesigning-source-control), Anthropic Engineering, October 13, 2026.*
