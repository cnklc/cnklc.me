---
layout: post
lang: en
permalink: /en/blog/mobile-channels-scheduling/
translation_url: /blog/mobile-channels-scheduling/
title: "Mobile, Channels, Scheduling, and Tunnels"
date: 2026-07-13
summary: "Claude Code while you're away from the terminal: continuing sessions from your phone with Remote Control, reacting to events with channels, and automating with /loop and scheduled tasks."
tags: [claude-code, remote-control, automation]
draft_series: "Claude Code Journey"
roadmap_topic: "Mobile, Channels, Scheduling, and Tunnels"
---

> We've reached the final post of the "Claude Code Journey" series. The
> previous post examined [the security model]({{ '/en/blog/claude-code-guvenlik/' | relative_url }}); we close with the features
> that take Claude Code beyond the terminal — and beyond your desk.

Everything so far assumed you were sitting at your keyboard. This post is
about the opposite scenarios: work continuing while you're on the couch, on
the road, or asleep.

## Remote Control: your session in your pocket

What the roadmap calls "tunnels" maps today to **Remote Control**: it lets
you continue a Claude Code session running on your machine from
claude.ai/code or the Claude mobile app. The critical detail: everything
keeps running locally — your filesystem, MCP servers, and project
configuration stay where they are; the phone is just a window into that
session.

Usage is simple. From inside an ongoing session:

```text
/remote-control
```

Or to start a remotely accessible session from scratch:

```bash
claude --remote-control
```

There's also a server mode: `claude remote-control` waits in your terminal
and serves multiple remote sessions; pressing spacebar shows a QR code you
can scan with your phone. The conversation stays in sync across all devices
— start at your desk, continue on the sofa. Mobile notifications tie into
this too: enable them via `/config` and Claude sends a push to your phone
when a long task finishes or it needs a decision from you. As of this
writing, the feature is in research preview.

## Channels: let events come to you

Rather than repeatedly asking "is CI done yet?", it's smarter to have the
event come to the session. **Channels** let an MCP server push messages
into your running session: CI results, monitoring alerts, Telegram/Discord
messages. Claude can react to incoming events while you're away — like
spotting a red CI run and starting to dig through the logs. You can install
ready-made channel plugins or build your own server.

## Scheduling: three tiers

There are three options for scheduled work, and the distinction is "where
does it run":

Within a session, **`/loop`** is the quickest: `/loop 5m check whether the
deploy finished` repeats the prompt every five minutes. Omit the interval
and Claude picks one itself based on what it observes. Natural-language
one-time reminders work too ("remind me at 3pm to push the release
branch"). Know the limits: tasks are session-scoped, stop when the terminal
closes, and expire on their own after seven days.

The desktop app's **scheduled tasks** run independently of any session,
with access to your local files — that's exactly the mechanism producing
this blog's drafts every morning. **Routines** run on Anthropic's cloud
infrastructure; your machine doesn't even need to be on, but they can't
reach your local files (they work on a fresh clone).

The selection rule is the same as in the docs: cloud for reliability
without your machine, desktop when you need local files, `/loop` for quick
in-session polling.

## Closing

With this post, the 36-topic series comes to an end. We started with a
definition of vibe coding; traveled through the agentic loop, hooks, MCP,
and the security model; and finished at the point where Claude Code now
also lives in your pocket and on your calendar. If you ask what the
series' most recurring lesson was: the value you get from this tool is
proportional to how clearly defined and verifiable the work you hand it is.
The rest is practice.

Thanks for reading — you can find every post in the series in the blog
archive.
