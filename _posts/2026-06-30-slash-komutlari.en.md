---
layout: post
lang: en
permalink: /en/blog/slash-komutlari/
translation_url: /blog/slash-komutlari/
title: "A Guide to Slash Commands (/)"
date: 2026-06-30
summary: "What the built-in commands you call with / inside a session do, how to see all of them, and where to add your own."
tags: [claude-code, slash-commands, commands]
draft_series: "Claude Code Journey"
roadmap_topic: "A Guide to Slash Commands (/)"
---

> This stop in the "Claude Code Journey" series is about in-session commands.
> Last time we looked at the
> [claude CLI commands]({{ '/en/blog/claude-cli-komutlari/' | relative_url }})
> you pass from the terminal; now we move to the slash commands that work
> *inside* a session.

The `-p`, `-c`, and `-r` flags from the last post were arguments you handed the
shell when launching Claude. Slash commands are a different thing entirely: you
call them while Claude is running, by typing `/` at the prompt. They're how you
manage the session, change settings, and get quick things done.

## What is a slash command?

A slash command isn't a prompt you send to Claude; it's an instruction you give
the CLI itself. Requests like "clear the context", "switch the model", or "show
the cost" aren't written to the model — they map to built-in commands invoked
with `/`.

## Seeing them all in one place

The most practical starting point: just type `/` at the prompt. Every available
command is listed, and the list filters as you keep typing.

```text
/
```

Which commands show up can vary by your platform and plan — for example,
`/desktop` only appears on macOS and Windows. There's also a built-in command
whose job is to explain the others:

```text
/help
```

## A few you'll reach for often

The context-related ones are probably the first you'll learn: `/clear` wipes the
conversation history and frees up context, while `/compact` compresses the
conversation by summarizing it. I covered those two separately in the
[managing context]({{ '/en/blog/baglam-yonetimi-compact-clear/' | relative_url }})
post. `/context` shows your current context usage as a colored grid — handy for
seeing what's taking up room.

On the session and model side: `/model` switches the model you're using,
`/resume` returns you to an earlier conversation, `/cost` shows the token usage
for that session, and `/config` opens the settings interface where you adjust
the theme, model, and other preferences.

Two project-related ones: `/init` creates a `CLAUDE.md` guide for the project,
and `/agents` manages subagent configurations.

You don't need to memorize them one by one; the logic is simple — when you want
to do something about the state of the session, typing `/` and scanning the
list is usually the fastest path.

## MCP commands and your own

MCP servers you connect can add their own commands to the session. These appear
in the form `/mcp__<server>__<prompt>` and are discovered automatically from the
server. To manage connected servers and authorization, there's the `/mcp`
command.

You can add your own commands too — in Claude Code, custom commands are defined
through **skills**, meaning a skill you write shows up as a slash command at the
prompt. To list the available skills:

```text
/skills
```

I'll get into the details of writing a skill later in the series; the only thing
you need here is that not every slash command you see has to be a built-in one.

## Summary

Slash commands are instructions you give the CLI from inside a session: they
clear the context, switch the model, show the cost, initialize the project. The
way to see them all is to type `/` and scan the list; when you're stuck, `/help`
is there. MCP servers and your own skills extend that list.

---

*Next post: Shortcuts and Prefixes (!, @, \, Shift+Tab)*
