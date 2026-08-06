---
layout: post
lang: en
permalink: /en/blog/log-ve-mcp-ile-debug/
translation_url: /blog/log-ve-mcp-ile-debug/
title: "Adding Logs and Debugging with MCP"
date: 2026-08-03
summary: "The model can't see your runtime. There are two ways to close that gap: have it add temporary logs, and use MCP to let it read the browser console or your error tracker directly."
tags: [vibe-coding, debugging, mcp]
draft_series: "Vibe Coding Journey"
roadmap_topic: "Adding Logs and Debugging with MCP"
---

> Part of the "Vibe Coding Journey" series. Last time we covered the basic
> discipline of debugging: reproduce the bug, give evidence, ask for a cause
> before a patch. This post is about where that evidence comes from.

A coding agent can read your code but can't see what happens while it runs. The
gap between what static source looks like and what actually happens at runtime
is the whole of debugging. That's why "fix this bug" forces the model to guess.
There are two ways to close the gap: produce the evidence yourself and hand it
over, or open a path for the model to read it directly.

## Logs first, fix second

The cheapest method is to have it add temporary logs before asking for a fix. In
the invoice tracking project, one invoice's PDF was coming out blank; the line
items were disappearing somewhere, but it wasn't clear where.

```text
Add temporary logs to the PDF generation flow: after the invoice is fetched
from the database, after line items are calculated, and right before data is
passed to the template. Include the invoice id and item count on each line.
Don't fix anything yet.
```

The logs it produces look like this:

```js
console.log('[pdf] invoice=%s items=%d discount=%s',
  invoice.id, invoice.items.length, invoice.discount);
```

Then you run the scenario once and collect the output:

```bash
npm run dev 2>&1 | tee /tmp/pdf-debug.log
```

What you get is fact, not conjecture:

```
[pdf] invoice=1042 items=3 discount=null
[pdf] invoice=1042 items=0 discount=10
```

The item list empties out while the discount is applied. Those two lines do more
work than three rounds of guessing.

One caveat: these logs are temporary. The model won't clean them up on its own,
and you'll forget about them in a few days. Check when the fix lands:

```bash
grep -rn "\[pdf\]" src/
```

## MCP: giving the model its own eyes

Adding logs works, but the loop is slow: you run, you copy, you paste. **MCP**
(Model Context Protocol) takes you out of that loop — the model reads the browser
console, the network requests or the error tracker itself. For setup details see
[connecting tools with MCP]({{ '/en/blog/mcp-ile-arac-baglama/' | relative_url }});
here are two cases worth it for debugging.

For the browser side, Chrome DevTools has its own MCP server:

```bash
claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest
```

Once connected, the model lists console messages and network requests itself:

```text
Open http://localhost:3000/invoices/1042, click the "Download PDF" button,
then list the console messages and any failed network requests.
```

For production errors, your error tracker's server: Sentry's hosted MCP server
is one example.

```bash
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp
```

```text
List unresolved errors from the last 24 hours in the invoice tracking project.
Open the one affecting the most users and summarize its stack trace.
```

## Where it stops

MCP isn't magic. Use it knowing three things. First, every connected server
takes up context with its tool definitions; a server you connect for a bug hunt
is worth removing once the hunt is over. Second, a browser server exposes
everything in that browser to the model, including accounts you're signed into —
the DevTools team warns about this explicitly, so don't run it against a profile
holding sensitive data. Third, access to data is still just data: seeing more
doesn't make the model's hypotheses better. The rule from the last post still
holds — cause first, patch second.

Next post: [Git: The Safety Net of Vibe Coding]({{ '/en/blog/git-guvenlik-agi/' | relative_url }})
