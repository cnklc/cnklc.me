---
layout: project
lang: en
permalink: /en/projects/sofra/
translation_url: /projects/sofra/
title: "Sofra — QR Menu & Table Ordering System"
date: 2026-08-26
summary: "A multi-tenant QR menu SaaS for cafés and restaurants: order from the table, split the bill per person, and run the floor from waiter / kitchen / cashier screens."
tech: [Next.js 16, React 19, TypeScript, Tailwind CSS 4, Prisma, PostgreSQL 16, SSE, Docker]
repo: ""
demo: "https://menu.ai-rezervasyon.com"
---

## About the Project

Sofra is a multi-tenant SaaS where cafés and restaurants run their menu, table
orders and bills from one place. A guest who scans the QR code on the table
sees the menu without installing anything, places an order, follows its
progress from the kitchen live, and splits the bill with the rest of the table
**line by line**.

The business side is not a single dashboard but four role-specific screens: the
waiter works the floor plan and the table's tab, the kitchen sees its own
station queue, the cashier splits the bill and closes the tab, and the owner
manages menu, tables/QR codes, staff, reservations and reports. Above all of
that sits a platform console for managing businesses, plans and usage.

The product was designed and built end to end by me, including infrastructure,
deployment and running it in production.

## Highlights

- 📱 Order from the table by QR — no app install, no signup, no password
- 🧾 Per-person bill splitting: share a single line across people, partial payments, discounts, comped items
- 👨‍🍳 Kitchen display (KDS): station queue, cards colored by waiting time, one-tap status advance
- 🧑‍💼 Waiter screen: floor plan, opening tabs, order entry, moving tables, cancellations and waiter calls
- 💳 Cashier screen: splitting, partial collection, closing the tab
- 📊 Owner panel: menu with variants/extras, table & QR generation, staff roles, reservations, end-of-day reports
- ⚡ Every operational screen is live over **SSE** — no refreshing
- 🏪 Public storefront per business (`/b/{slug}`) — menu, map and a reservation form
- 🥜 Allergen declaration and a regulation-compliant **price list** printout
- 🆓 A free, no-signup price list builder that runs entirely in the browser
- 🛡️ Platform admin console: businesses, plans/suspension, usage stats and an activity feed

## Technical Highlights

- **Money is integer kuruş everywhere; floats are banned.** Every division
  lives in one module: `splitEvenly` hands the leftover kuruş out from the
  front, `splitByBps` uses largest-remainder. The parts always add back up to
  the total **exactly** — that is not a comment but a contract held by property
  tests.
- **Bill arithmetic is kept away from the database.** The code that decides who
  owes what is a pure module (`bill-math.ts`): services load the data, the
  module does the math. A rule change is written as a test there first.
- **The database wins the race.** "One open tab per table" is a partial unique
  index on `status = 'OPEN'`; when two phones join the same table at once the
  app catches `P2002` and joins the existing tab — the losing request never
  sees an error.
- **Tenant isolation:** every table carries `tenantId`, data access goes
  through the service layer only, and the tenant context is a required
  argument. No raw Prisma query is written inside a route handler, and the rule
  is covered by an e2e scenario.
- **Prices are snapshotted at order time** (`unitPrice`, `nameSnapshot`), so a
  later menu price change cannot rewrite a past bill.
- **One state machine:** `PLACED → PREPARING → READY → SERVED`, with
  `CANCELLED` behind a permission. Legal transitions are declared in a pure
  module that services call into.
- **SSE instead of WebSockets for liveness:** an in-process event hub
  broadcasts on `venue:{id}` and `session:{id}` channels. On every reconnect
  the client refetches the full state once, so a missed event never leaves a
  screen permanently wrong. Scaling out swaps in a Postgres `LISTEN/NOTIFY`
  adapter behind the same interface.
- **Guest identity is a signed HttpOnly cookie:** guest id + table code + tab.
  It reaches only its own tab, cannot touch another participant's line, and
  becomes invalid the moment the tab is closed.
- **SEO on the server:** storefronts and city directory pages are SSR with 60s
  ISR, and the JSON-LD graph (`Organization` / `Restaurant` /
  `BreadcrumbList`) is built by pure functions and covered by tests.
- **Deployment:** Docker Compose runs migrate + app behind Traefik and a
  Cloudflare Tunnel, with no container publishing a port to the host.

## The Free Price List Tool

In front of the product sits a tool that asks for no account: a business pastes
its menu, the tool flags missing prices and undeclared allergens as "blockers"
and "warnings", and produces a printable price list that satisfies the local
price-labelling regulation. Nothing leaves the browser. It solves a real chore
and doubles as a natural entry point into the QR menu product.

## Tech Stack

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript** and
**Tailwind CSS 4**, on **Prisma** + **PostgreSQL 16**, with **zod** for
validation, **jose**-signed JWT cookies for sessions and **SSE** for liveness.
Tested with **Vitest** (unit) and **Playwright** (E2E), deployed with
**Docker Compose**.
