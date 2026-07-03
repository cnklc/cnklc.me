---
layout: post
lang: en
permalink: /en/blog/hooks-olaylar-matcherlar/
translation_url: /blog/hooks-olaylar-matcherlar/
title: "Hooks: Events and Matchers"
date: 2026-07-02
summary: "What are hooks — the shell commands Claude Code runs automatically at specific points in its lifecycle — which events trigger them, and how do matchers filter them?"
tags: [claude-code, hooks, automation]
draft_series: "Claude Code Journey"
roadmap_topic: "Hooks: Events and Matchers"
---

> This stop in the "Claude Code Journey" series follows [shortcuts and prefixes]({{ '/en/blog/kisayollar-ve-onekler/' | relative_url }}) and moves into automation: hooks.

So far we've always told Claude Code what to do through a prompt. Hooks are the opposite: instead of waiting for Claude to decide, you define a shell command that runs *every time* a specific event happens. Auto-formatting a file after it's edited, blocking a dangerous command before it runs, sending a desktop notification when Claude is waiting for your input — these run deterministically, without the model needing to decide whether to do them.

## Defining a hook

A hook is defined under the `hooks` key in `~/.claude/settings.json` (applies to all your projects) or in a project's `.claude/settings.json` (single project, can be committed to the repo). For example, to send a desktop notification on macOS whenever Claude is waiting for your input:

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code needs your attention\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

After saving this, typing `/hooks` inside Claude Code opens a read-only list of every configured hook, grouped by event. Selecting `Notification` shows its event, matcher, command, and which settings file it came from.

## Events

Hooks fire at specific points in Claude Code's lifecycle. Some of the most commonly used: `PreToolUse` (before a tool call executes, can block it), `PostToolUse` (after a tool call succeeds), `SessionStart` (when a session begins or resumes), `UserPromptSubmit` (when you submit a prompt, before Claude processes it), and `Stop` (when Claude finishes responding). The full list is also visible in the `/hooks` menu.

To run Prettier automatically after every file edit:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write" }
        ]
      }
    ]
  }
}
```

## Matchers: when it should fire

The `matcher` field narrows down *when* the event matches. If it's empty, `"*"`, or omitted, the hook fires every time. If it contains only letters, digits, `_`, `-`, spaces, `,`, and `|`, it's treated as an exact match: `Edit|Write` fires only for the `Edit` or `Write` tools, `Bash` only for the `Bash` tool. Any other character (like `.` or `^`) makes it a JavaScript regular expression; a pattern like `mcp__memory__.*` matches every tool from the `memory` MCP server.

Each event matches against a different field: tool events (`PreToolUse`, `PostToolUse`, etc.) filter on the tool name, `SessionStart` on how the session started (`startup`, `resume`, `clear`, `compact`), and `Notification` on the notification type (`permission_prompt`, `idle_prompt`, and so on). Some events, like `UserPromptSubmit` and `Stop`, don't support matchers at all and always fire.

## The simplest form of blocking: exit codes

A command hook reads the event's JSON data from stdin and reports its result through the exit code. `exit 0` means "no objection"; `exit 2` is a blocking error — whatever you write to stderr is fed back to Claude as feedback. A simple example that blocks dangerous commands:

```bash
#!/bin/bash
COMMAND=$(jq -r '.tool_input.command' < /dev/stdin)

if [[ "$COMMAND" == rm* ]]; then
  echo "Blocked: rm commands are not allowed" >&2
  exit 2
fi

exit 0
```

I'll cover how to extend this with richer JSON output, which fields apply to which events, and the full input schema for hooks in the next post.

---

*Next post: [Hook Input and Outputs]({{ '/en/blog/hook-girdi-ciktilari/' | relative_url }})*
