---
layout: project
lang: en
permalink: /en/projects/oqloq/
translation_url: /projects/oqloq/
title: "Oqloq — 24-Hour Routine Clock"
date: 2026-06-14
summary: "A calm, minimal web app for planning your day on a circular 24-hour dial, with a built-in Pomodoro timer."
tech: [React 19, TypeScript, Vite, Zustand, Framer Motion, Vitest]
repo: "https://github.com/cnklc/oqloq"
demo: "https://oqloq.cnklc.me"
---

## About the Project

Oqloq is a daily routine planner that lets you design your day on a circular
24-hour clock instead of a flat to-do list. Drop colored time blocks for sleep,
deep work, meetings or personal time, attach titles and sub-tasks to each block.
A real-time clock hand shows where you are in the day, and the currently active
block is highlighted in the title.

It ships with presets (Student / Professional), the ability to save your own
layout as a template, customizable background and dial colors, light/dark
theming, and JSON backup/import. All data is stored locally in the browser — no
account, no server, no tracking.

## Highlights

- 🕛 Visual day planning on a circular 24-hour dial
- 🎨 Colored time blocks with titles and sub-tasks
- ⏱️ Built-in Pomodoro timer (focus mode based on the active block)
- 📋 Presets + save your own layout as a template
- 🌗 Light/dark theme, customizable background and dial color
- 💾 JSON export/import for backups
- 🔒 Fully browser-local data (localStorage), privacy-friendly
- 📱 Responsive design + PWA support

## Tech Stack

Built with **React 19**, **TypeScript** and **Vite**, using **Zustand** for
state management, **Framer Motion** for animations, **SVG** for the dial, and
**Vitest** for testing.
