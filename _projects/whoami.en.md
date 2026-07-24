---
layout: project
lang: en
permalink: /en/projects/whoami/
translation_url: /projects/whoami/
title: "Who Am I — Digital Business Card"
date: 2026-06-13
summary: "A serverless digital business card app that replaces printed cards — share all your contact details from a single link."
tech: [HTML, CSS, JavaScript, GitHub Pages]
repo: "https://github.com/cnklc/whoami"
demo: "https://whoami.cnklc.me"
---

## About the Project

**Who Am I** is a web app I built to replace classic printed business cards. You
fill in a form; the app generates a personal link and a QR code for you. Anyone
who scans that QR reaches your email, phone, WhatsApp, Instagram, LinkedIn and
other links from a single page.

The project grew out of my own need: instead of typing my details out one by one
for people I meet, I wanted to share all my contact channels in seconds by
letting them scan a QR on my phone. I designed it to be **multi-user** and
**account-free** so anyone with the same need can use it.

## Highlights

- **No account needed** — No sign-up, no login; fill the form and your link is ready.
- **Unlimited links** — Email, phone, WhatsApp, Instagram, LinkedIn, website,
  GitHub, X and custom links.
- **QR code** — Auto-generated per card; scanning it opens the page.
- **Save to contacts (vCard)** — One-click `.vcf` download into the phonebook.
- **Theme options** — Personalize with 8 accent colors.
- **Mobile-first and privacy-friendly** — No data is stored on any server.

## How It Works (Architecture)

The most critical design decision is to use **no backend and no database**. When
the form is filled, all the data becomes a JSON object, gets encoded as URL-safe
**Base64**, and is embedded directly in the link (`#c=...`):

```
https://whoami.cnklc.me/#c=eyJuIjoiQ2FuIEtJTEnDhyIsInQiOiJTb2Z0d2FyZSBEZXZlbG9wZXIiLCJiIjoiIiwiaW1nIjoiY25rbGMubWUiLCJjIjoiIzViOGNmZiIsImwiOlt7InR5cGUiOiJlbWFpbCIsInZhbHVlIjoiY25rbGNAeW1haWwuY29tIn0seyJ0eXBlIjoid2Vic2l0ZSIsInZhbHVlIjoiY25rbGMubWUifSx7InR5cGUiOiJpbnN0YWdyYW0iLCJ2YWx1ZSI6ImNuazFjIn0seyJ0eXBlIjoibGlua2VkaW4iLCJ2YWx1ZSI6ImNuazFjIn1dfQ
```

When the page opens, this data is decoded and the card is rendered on the client.
The upshot: zero infrastructure cost (just static hosting), privacy (data never
hits a server), instant scalability, and durability — the card lives as long as
the link does.

## Tech Stack

The whole app runs from **a single `index.html` file**, with no build step or
framework: plain HTML, CSS (theming via custom properties), vanilla JavaScript;
qrcodejs for QR generation, `TextEncoder` + Base64 for data encoding, vCard 3.0
for the contact card, hosted on GitHub Pages with a custom domain.
