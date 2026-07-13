---
layout: post
lang: en
permalink: /en/blog/editor-eklentileri-desktop/
translation_url: /blog/editor-eklentileri-desktop/
title: "Editor Extensions and the Desktop App"
date: 2026-07-10
summary: "Claude Code isn't just a terminal tool: the VS Code extension, the JetBrains plugin, and the desktop app — which one makes sense when?"
tags: [claude-code, vs-code, ide]
draft_series: "Claude Code Journey"
roadmap_topic: "Editor Extensions and the Desktop App"
---

> The "Claude Code Journey" series continues. In the previous post we looked
> at [the plugin system]({{ '/en/blog/plugins-eklentiler/' | relative_url }}); in this one we explore the ways to use Claude Code
> outside the terminal: editor extensions and the desktop app.

Throughout this series we've lived in the terminal. But that's not the only
place Claude Code runs; it also works in VS Code, in JetBrains IDEs, and in
its own desktop application. Same engine, different faces — the difference
is where you do your work.

## The VS Code extension

The VS Code extension gives Claude Code a graphical panel. Installation is
the usual route: search for "Claude Code" in the Extensions view, install
it, then click the Spark icon in the top right to open the panel. No API key
needed; signing in with a paid Claude subscription is enough.

The most tangible wins over the terminal: when Claude wants to edit a file,
you see the change in the editor's side-by-side diff view; in plan mode the
plan opens as a Markdown document where you can leave inline comments as
feedback; and your selected code automatically enters the context. You can
also select a block in the editor and press `Option+K` (`Alt+K` on
Windows/Linux) to drop a reference like `@file.ts#5-10` into your prompt.
Say you're stuck on a function: select the relevant lines and type into the
panel:

```text
why does the selected function return an empty array on the second call?
```

The extension and the CLI share the same session history; a conversation you
start in the panel can be continued in the terminal with `claude --resume`.
One thing to know: the extension doesn't carry every CLI feature (e.g. no
`!` bash shortcut). When you need something CLI-only, running `claude` in
the integrated terminal is the practical answer — which requires the
standalone CLI to be installed as well.

## The JetBrains plugin

There's a separate plugin for JetBrains IDEs like IntelliJ, PyCharm, and
WebStorm (installed from the JetBrains Marketplace). Its approach differs:
it doesn't bundle its own CLI copy; it runs the `claude` command you
installed in the IDE's integrated terminal and connects to it. So the CLI
must be installed first.

Once connected, diffs open in the IDE's diff viewer, and your editor
selection plus lint/syntax diagnostics are automatically shared with Claude.
Quick launch with `Cmd+Esc` (`Ctrl+Esc` on Windows/Linux) and file
references with `Cmd+Option+K` work much like in VS Code. If you're working
from an external terminal, you can connect to the IDE with the `/ide`
command.

## The desktop app

The **Code** tab of the Claude desktop app is a middle ground: no IDE, but
more visual than the terminal. Its real strength is parallel sessions: each
session can run isolated in its own git worktree, so you can push several
tasks through the same repo without collisions. There's also an integrated
terminal, a file editor, and visual diff review. It essentially ships,
ready-made, the setup we built by hand in [this series' worktrees post]({{ '/en/blog/git-worktrees/' | relative_url }}).

## Which one to pick?

The honest answer: they're all the same Claude Code, so it's an ergonomics
question. If you live in an IDE all day, the editor extension wins on the
diff review experience. If your terminal habits run deep, the CLI is the
fully featured one anyway. The desktop app suits people who want to manage
parallel sessions visually. And since session history is shared, mixing is
fine: start in the panel in the morning, continue in the terminal in the
afternoon.

## Summary

The VS Code extension offers a graphical panel and diff review, the
JetBrains plugin an IDE-integrated CLI, and the desktop app parallel
sessions with git isolation. The engine is the same; wherever you work
comfortably is the right place. [In the next post]({{ '/en/blog/agentic-loop-nedir/' | relative_url }}) we'll pop the hood and look
at how that engine actually runs.

---

*Next post: [What Is the Agentic Loop?]({{ '/en/blog/agentic-loop-nedir/' | relative_url }})*
