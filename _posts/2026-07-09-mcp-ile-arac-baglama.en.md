---
layout: post
lang: en
permalink: /en/blog/mcp-ile-arac-baglama/
translation_url: /blog/mcp-ile-arac-baglama/
title: "Connecting Tools with MCP"
date: 2026-07-09
summary: "Connecting Claude Code to external tools like issue trackers, databases, and APIs via the Model Context Protocol (MCP): adding servers, choosing scopes, and the /mcp command."
tags: [claude-code, mcp, integrations]
draft_series: "Claude Code Journey"
roadmap_topic: "Connecting Tools with MCP"
---

> We're entering the Advanced section of the "Claude Code Journey" series. In
> the previous post we covered
> [session management]({{ '/en/blog/oturum-yonetimi-resume-rewind/' | relative_url }});
> now we look at the mechanism that connects Claude Code to the world outside
> your terminal: MCP.

Claude Code can read your files and run commands — but part of your work
usually lives elsewhere: in an issue tracker, a database, a monitoring
dashboard. **MCP** (Model Context Protocol) is an open standard for AI–tool
integrations; through it, Claude Code can connect to hundreds of external
tools and data sources. The practical litmus test: if you keep copy-pasting
data out of some tool, it's time to connect that tool's MCP server.

## Adding a remote server

Most popular services now offer hosted MCP servers. For example, connecting
your Notion workspace takes a single command:

```bash
claude mcp add --transport http notion https://mcp.notion.com/mcp
```

From then on you can hand Claude work in plain language:

```text
Read the "Blog ideas" page in Notion and summarize the three oldest ideas
```

Besides HTTP, there's also the SSE transport used by some older servers
(`--transport sse`); the command shape is the same.

## Local (stdio) servers

Not every server runs in the cloud. Servers that run as a local process are
added with the stdio transport. The general form is:

```bash
claude mcp add [options] <name> -- <command> [args...]
```

Everything after `--` is the command Claude Code will run to start the
server. If it needs an API key, pass it with `--env`:

```bash
claude mcp add --env AIRTABLE_API_KEY=YOUR_KEY --transport stdio airtable -- npx -y airtable-mcp-server
```

Three commands manage what you've added: `claude mcp list` lists all servers,
`claude mcp get <name>` shows the details of one, and `claude mcp remove
<name>` deletes it.

## Scope: where does a server apply?

When adding a server you pick its scope with `--scope`; there are three
options:

**local** is the default: the server is visible only in the project where you
added it, and only to you. **project** scope writes the configuration into a
`.mcp.json` file at the project root; that file is meant to be checked into
version control, so the whole team gets the same tools. **user** scope makes
the server available across all projects on your machine — a good fit for
personal utilities that aren't tied to one project.

```bash
claude mcp add --transport http paypal --scope project https://mcp.paypal.com/mcp
```

A security note: since `.mcp.json` ships with the repo, Claude Code asks for
your approval before using servers defined in it. Be careful granting that
approval in a repository you don't know — an MCP server is a process that
runs tools on your behalf, and you shouldn't connect one you don't trust.

## Inside a session: /mcp

You can check server status inside a session with the `/mcp` command: which
servers are connected and how many tools each provides. For remote servers
that require OAuth (e.g. corporate services), you also authenticate through
`/mcp`; it sends you to the browser, and once you log in the server is ready
to use.

Let me close with an honest caveat: every connected server adds its tool
definitions to your context. The "connect everything" approach both bloats
the context and widens your attack surface. The two or three servers you
actually use this week beat ten that just sit there.

## Summary

MCP frees Claude Code from copy-paste mediation and connects it directly to
your tools. You add servers with `claude mcp add`, decide who sees them with
`--scope`, and manage status and authentication with `/mcp`. [In the next post]({{ '/en/blog/plugins-eklentiler/' | relative_url }}) we'll look at how to package and share these integrations.

---

*Next post: [Plugins]({{ '/en/blog/plugins-eklentiler/' | relative_url }})*
