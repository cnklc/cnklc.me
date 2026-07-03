---
layout: post
lang: en
permalink: /en/blog/hook-girdi-ciktilari/
translation_url: /blog/hook-girdi-ciktilari/
title: "Hook Input and Outputs"
date: 2026-07-03
summary: "What exactly arrives on stdin for a hook, what the exit codes mean, and how to get finer-grained control with JSON output — including permissionDecision and additionalContext."
tags: [claude-code, hooks, json]
draft_series: "Claude Code Journey"
roadmap_topic: "Hook Input and Outputs"
---

> [Last time]({{ '/en/blog/hooks-olaylar-matcherlar/' | relative_url }}) we looked at what hooks are and which events trigger them. We saw a hook script read JSON from `stdin` and report a decision through its exit code — this post covers that full input/output contract.

## The JSON sent to a hook: common fields

Whatever event fires, every hook receives a JSON payload with these fields (event-specific fields are added on top):

- `session_id`: the session identifier
- `transcript_path`: path to the conversation's JSON transcript
- `cwd`: the working directory when the hook runs
- `permission_mode`: `default`, `plan`, `acceptEdits`, `auto`, `dontAsk`, or `bypassPermissions`
- `hook_event_name`: name of the event that fired

When a `PreToolUse` hook fires for a Bash call, this lands on `stdin`:

```json
{
  "session_id": "abc123",
  "cwd": "/Users/can/Project/cnklc.me",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": { "command": "npm test" }
}
```

`tool_name` and `tool_input` are event-specific — each event carries its own extra fields.

## What the exit code means

- **`exit 0`**: success. Claude Code parses `stdout` for JSON output (JSON is only processed on exit 0).
- **`exit 2`**: a blocking error. `stdout` and any JSON in it are ignored; instead, whatever you write to `stderr` is fed back to Claude as an error message. The effect depends on the event: it blocks the tool call on `PreToolUse`, rejects the prompt on `UserPromptSubmit`.
- **Any other exit code**: for most events, a non-blocking error; the transcript shows a short warning notice and execution continues.

One catch: exit code `1` does not block — despite being the conventional Unix failure code, Claude Code treats it as non-blocking. If you want to enforce a rule, use `exit 2`.

## Finer control with JSON output

When "block or don't" isn't enough, exit 0 and print a JSON object to `stdout`. The most commonly used universal fields:

| Field | Default | What it does |
|---|---|---|
| `continue` | `true` | if `false`, Claude stops processing entirely |
| `stopReason` | none | message shown to the user when `continue: false` |
| `suppressOutput` | `false` | if `true`, hides the hook's output from the transcript |
| `systemMessage` | none | a warning shown to the user |

Events like `PreToolUse` instead return `permissionDecision` (`allow`, `deny`, or `ask`) inside `hookSpecificOutput`. For example, to escalate database write commands for approval:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "ask",
    "permissionDecisionReason": "Writing to the prod database, please confirm"
  }
}
```

## Adding context for Claude: `additionalContext`

Beyond a decision, a hook can also add text to Claude's context. Say a `PostToolUse` hook runs Prettier after a file edit, and you want to remind Claude the file is actually generated:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "This file is generated. Edit src/schema.ts and run `bun generate` instead."
  }
}
```

This text doesn't appear as a chat message; it's added as a system reminder Claude reads on its next model request. For instructions that never change, prefer CLAUDE.md — `additionalContext` is better suited to things that vary, like current environment state or the result of an operation that just ran.

## Summary

Every hook receives the same common JSON envelope (`session_id`, `cwd`, `hook_event_name`, and so on), with event-specific fields added on top. `exit 0` plus JSON gives the finest control; `exit 2` gives a plain, hard block — don't mix the two. `permissionDecision` and `additionalContext` turn a hook from a simple on/off switch into something that actually talks to Claude. Next up: the full location table for CLAUDE.md and modular structure with `.claude/rules/`.

---

*Next post: [CLAUDE.md: Structure and Locations (In Depth)]({{ '/en/blog/claude-md-yapilandirma/' | relative_url }})*
