---
layout: project
lang: en
permalink: /en/projects/webex-export/
translation_url: /projects/webex-export/
title: "Webex Export — Conversation Archiver"
date: 2026-06-14
summary: "A client-side React app that downloads and archives Webex conversations and attachments straight from the browser, packaged into a structured ZIP."
tech: [React, TypeScript, Vite, Framer Motion, JSZip, Lucide]
repo: "https://github.com/cnklc/Webex-export"
demo: "https://webex.cnklc.me"
---

## About the Project

Webex Export is a serverless (client-side) React app for backing up and
archiving Webex conversations. Connect with a Webex Personal Access Token and
the app uses the Webex REST API to list your rooms, fetch every message and file
attachment of the selected conversation page by page, and build a tidy ZIP
archive.

It handles rate limits (429) with automatic wait/retry logic, tracks
incremental progress for large archives, and guards against filename
collisions. Previously exported JSON archives can also be re-imported into a
chat-like viewer with date grouping, search, and "highlight your own messages."

Thanks to its privacy-first design, the token and data are processed only in the
browser and never sent to any intermediary server.

## Highlights

- 🔑 Direct Webex API integration via personal access token
- 📦 Messages + attachments downloaded as a structured ZIP
- ⏳ Automatic rate-limit (429) handling and retry
- 💬 JSON archive import with a chat-like viewer
- 🔍 Date grouping, search, and own-message highlighting
- ✨ Glassmorphism UI with Framer Motion animations
- 🔒 100% client-side — privacy-focused

## Tech Stack

Built with **React**, **TypeScript** and **Vite**, using **Framer Motion** for
animations, **JSZip** for ZIP archiving, and **Lucide** for icons.
