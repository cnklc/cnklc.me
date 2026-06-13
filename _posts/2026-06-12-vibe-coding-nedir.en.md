---
layout: post
lang: en
permalink: /en/blog/vibe-coding-nedir/
translation_url: /blog/vibe-coding-nedir/
title: "What Is Vibe Coding?"
date: 2026-06-12
summary: "A new way of building software where you describe intent and let AI write the code, instead of typing every line. What's it good for, and where are its limits?"
tags: [claude-code, vibe-coding, ai]
draft_series: "Claude Code Journey"
roadmap_topic: "What is Vibe Coding?"
---

> The first stop in my "Claude Code Journey" series, following the
> [roadmap.sh/claude-code](https://roadmap.sh/claude-code) curriculum.

A few years ago, writing code meant typing every single line yourself. Today a
different approach is becoming common: you describe what you want in natural
language, the AI writes the code, and you run it and steer the result. This is
called **vibe coding**.

## Where does the term come from?

The phrase took off in early 2025 to describe the "go by feel" nature of
AI-assisted development. The idea is simple: instead of holding every detail of
the code in your head, you describe the overall intent ("make a login screen like
this, validate the email") and evaluate and correct what the model produces. The
focus shifts from *how* something is written to *what* it does.

## How it differs from traditional coding

In the classic flow the loop is: think → write → run → debug. In vibe coding the
loop becomes: describe → evaluate → steer. You're now responsible for the result
and the direction, not for each individual line. This is a real speed boost,
especially when:

- prototyping quickly,
- taking your first steps with an unfamiliar library,
- handling repetitive, tedious work (boilerplate, test scaffolding, conversion
  scripts).

## But isn't there a risk?

Let's be honest — yes. The appeal of vibe coding also brings the risk of
accepting generated code **without understanding it**. Code that runs isn't
always correct, secure or maintainable. If you keep piling up output without
reading it, your own project eventually turns into a stranger.

The balance that works: let the AI produce the draft, but keep **understanding
and approval** with you. Just like I don't auto-publish this blog series without
reviewing it — speeding up production is one thing, handing off responsibility is
another.

## Where does Claude Code fit in?

Claude Code is a tool that lets you do vibe coding from the terminal. Instead of
asking for individual functions, you give it a goal ("make these tests pass",
"find and fix this bug") and it works toward that goal by reading and writing
files and running commands. In the next posts of the series we'll get into
exactly how that works — starting from the CLI and moving on to commands, hooks
and subagents.

## Summary

Vibe coding is the shift from writing code to managing it. Used well, it's an
enormous accelerator; trusted blindly, it's a technical-debt machine. The secret
is to take the speed without giving up control.

---

*Next post: What Is a Coding Agent?*
