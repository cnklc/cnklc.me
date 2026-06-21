---
layout: post
lang: en
permalink: /en/blog/coding-agent-nedir/
translation_url: /blog/coding-agent-nedir/
title: "What Is a Coding Agent?"
date: 2026-06-13
summary: "What's the difference between autocomplete and a coding agent? What does a tool need to count as an 'agent', and how does Claude Code do it?"
tags: [claude-code, coding-agent, ai]
draft_series: "Claude Code Journey"
roadmap_topic: "What is a Coding Agent?"
---

> The second stop in the "Claude Code Journey" series. Last time we looked at what
> [vibe coding]({{ '/en/blog/vibe-coding-nedir/' | relative_url }}) is; now we turn
> to the thing that makes it possible — the coding agent.

In the last post I talked about vibe coding: describing intent and leaving the
code to the model. But what exactly is on that "model" side? The answer: a
**coding agent**.

## Autocomplete is not an agent

Most of us first met AI-assisted coding through autocomplete tools. You start
typing and the tool suggests the rest of the line. Useful but passive: it only
looks at where your cursor is and makes a guess based on the immediate context.
It doesn't *do* anything for you — it just predicts the next keystroke.

A coding agent is a completely different category. You give it not a line but a
**goal**: "write tests for the auth module, run them, and fix the failures." The
agent then plans and carries out its own steps to reach that goal.

## What makes a tool an "agent"?

The official docs describe Claude Code as an agentic coding tool that lives in
your terminal, noting that it can directly edit files, run commands, and create
commits. Those verbs are exactly what separates an agent from autocomplete:

- **Reads:** It looks at the whole project, not just one file, and finds the
  relevant places itself.
- **Writes:** It makes changes across multiple files.
- **Runs:** It executes terminal commands — runs tests, calls the linter, builds.
- **Observes and fixes:** It sees the output and, if there's an error, goes back
  and fixes it.

That loop — plan, act, observe the result, retry if needed — is the heart of
agentic behavior. (I'll devote a separate post to this "agentic loop" later.)

## A small example

Say you give a command like this:

```bash
claude "write tests for the auth module, run them, and fix any failures"
```

The agent won't just generate code once and stop. Typically it reads the auth
module's files, understands them, writes the tests, runs the test command, reads
any errors, fixes the code or the tests, and keeps cycling until the tests pass.
In the terminal it roughly looks like this:

```text
● Created auth.test.ts
● Running npm test… 1 test failing
● Read the error, fixed token expiry
● Running npm test… all passing
```

In other words, it runs the "write–run–debug" loop you'd otherwise do by hand.

## Why does this matter?

Because it changes the kind of problems you can solve. Autocomplete is good at
"how do I finish this line?" An agent can take on **multi-step, side-effecting**
work like "find and fix this bug," "update the dependencies," or "clean up these
lint errors across the project" — the tedious tasks you keep putting off.

But — as I said in the first post — this power doesn't remove the responsibility
to review. Because the agent can run commands and change files, understanding and
approving what it does is still your job. A powerful assistant, not a boss.

## Summary

Autocomplete predicts the next keystroke; a coding agent reads, writes, runs and
fixes itself to reach a goal. Claude Code is exactly that kind of tool. In the
next post we'll look at its concrete face — the Claude CLI in the terminal.

---

*Next post: Getting Started with the Claude CLI*
