---
layout: post
lang: en
permalink: /en/blog/plugins-eklentiler/
translation_url: /blog/plugins-eklentiler/
title: "Plugins: Extending Claude Code, One Package at a Time"
date: 2026-07-09
summary: "The plugin system bundles skills, agents, hooks, and MCP servers into a single package: installing from marketplaces, day-to-day management, and the basics of writing your own."
tags: [claude-code, plugins, marketplace]
draft_series: "Claude Code Journey"
roadmap_topic: "Plugins"
---

> The "Claude Code Journey" series continues with the Advanced section. In the
> previous post we looked at [connecting external tools to Claude with MCP]({{ '/en/blog/mcp-ile-arac-baglama/' | relative_url }}); this
> time we cover plugins — the way to package and share that kind of setup.

Throughout this series we've covered many pieces of customizing Claude Code:
skills, hooks, subagents, MCP servers. They all work, but there's a catch — you
set each one up by hand, and sharing them with someone else means copying files
around. A **plugin** solves exactly that: it's a package that bundles skills,
agents, hooks, and MCP servers under a single name, installable with one command.

## Marketplaces: catalogs of plugins

Plugins are installed from catalogs called **marketplaces**. The logic resembles
an app store: first you add the store, then you pick the apps you want from it.
Anthropic's official marketplace (`claude-plugins-official`) is automatically
available when you start Claude Code — no extra setup needed.

To browse what's out there, run the `/plugin` command and open the **Discover**
tab. Say you want to set up the GitHub integration:

```shell
/plugin install github@claude-plugins-official
```

Community plugins live in a separate catalog that you add manually:

```shell
/plugin marketplace add anthropics/claude-plugins-community
```

During installation you can also pick a scope: just for yourself (user), for
every collaborator on the repository (project), or for yourself in this
repository only (local).

## What changes once it's installed?

Skills that come from a plugin are prefixed with the plugin name to prevent
conflicts. For example, if you installed `commit-commands`, you'd invoke its
commit skill like this:

```shell
/commit-commands:commit
```

When you install or remove plugins mid-session, running `/reload-plugins` is
enough — no restart required. There are short commands for day-to-day management
too: `/plugin list` shows what's installed, `/plugin disable` turns a plugin off
without removing it, and `/plugin uninstall` deletes it entirely.

## Writing your own plugin

A plugin is really just a folder with a particular directory layout. Its identity
is defined by the `.claude-plugin/plugin.json` manifest; skills live in
`skills/`, agents in `agents/`, hooks in `hooks/`, and MCP servers in an
`.mcp.json` file at the root. A common mistake: putting those directories inside
`.claude-plugin/` — only `plugin.json` goes there; everything else belongs at the
plugin root.

While developing, you can test without installing anything:

```bash
claude --plugin-dir ./my-plugin
```

Converting an existing `.claude/` setup into a plugin is also possible; moving
the files into the new layout and adding a manifest is usually all it takes. When
you're ready to share, you can create your own marketplace or submit to the
community one.

## A note on security

Plugins are highly trusted components that can run code on your machine with
your user privileges. Anthropic doesn't audit the MCP servers or files inside
third-party plugins. So only install from sources you trust — and checking the
"Will install" list on the details screen before installing is a good habit.

Plugins are the distribution layer that ties together the pieces we've learned
one by one throughout this series. If you want your whole team working with the
same set of skills, this is the right tool.

Next post: [Editor Extensions and the Desktop App]({{ '/en/blog/editor-eklentileri-desktop/' | relative_url }})
