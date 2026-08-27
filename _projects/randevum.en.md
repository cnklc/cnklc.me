---
layout: project
lang: en
permalink: /en/projects/randevum/
translation_url: /projects/randevum/
title: "Randevum — Booking System for Salons & Barbershops"
date: 2026-08-27
summary: "A multi-tenant booking SaaS for hair salons, barbershops and beauty studios: a public page for the business, online booking through a shareable link, and an admin panel."
tech: [.NET 10, Minimal API, PostgreSQL, EF Core, Next.js 15, TypeScript, Tailwind CSS, Docker]
repo: ""
demo: "https://ai-rezervasyon.com"
---

## About the Project

Randevum is a multi-tenant SaaS that lets hair salons, barbershops and beauty
studios run their appointments from one place. Signing up gives a business three
things at once: a published **public page** of its own (services, team, opening
hours, map), a **booking link** it can share with customers, and an **admin
panel** for day-to-day work.

Customers never create an account: they book with a phone number, and a short
customer code lets them come back to view, cancel or reschedule their own
appointment. The business side is a calendar plus customer records, services and
staff management.

The product was designed and built end to end by me — infrastructure, deployment
and live operation included.

## Highlights

- 🏪 A public page per business (`/i/{business}`) — services, team, map, directions
- 📅 Weekly and daily calendar with a grid that lays out overlapping bookings side by side
- 🔗 Online booking through a link — no customer account required
- 👤 Customer self-service: view, cancel or reschedule with phone number + customer code
- 🔔 Instant **web push** notifications to the owner (new request / cancellation / reschedule)
- 🚫 Closed days and time off; closures are automatically removed from customer-facing slots
- 🗂️ Customer CRM — past appointments, no-show tracking, private notes
- ⏰ Background services for appointment reminders and automatic "completed" marking
- 📈 First-party product analytics plus a super-admin panel (tenants, usage, funnels)
- 🔍 Server-side rendering, JSON-LD structured data and a city-segmented business directory

## Technical Highlights

- **Modular monolith:** an `Api / Application / Domain / Infrastructure` split,
  with Minimal API endpoint groups instead of controllers.
- **Double-booking protection lives in the database:** an `EXCLUDE` constraint
  built on `btree_gist` and `tstzrange` makes overlapping bookings for the same
  staff member impossible to write. The application-level check exists only to
  produce a friendly error message — the database always wins the race.
- **Tenant isolation:** every table carries a `TenantId` and an EF Core global
  query filter; the tenant context read from the JWT flows through the request.
- **A pure, testable core:** slot calculation, reminder decisions, time-off range
  conversion, phone and slug normalization live in dependency-free classes
  covered by unit tests.
- **Time-zone discipline:** every `DateTimeOffset` is normalized to UTC, and
  input like "I'm closed on August 20th" is converted to an absolute range using
  the business's own time zone.
- **Background services:** reminders, auto-completion, push delivery and data
  cleanup run as lightweight `BackgroundService`s — no external scheduler.
- **Web Push (VAPID):** delivered straight to browser push providers with no
  third-party service in between, behind an in-memory queue so the request path
  is never blocked.
- **A first-party event table instead of Google Analytics:** the bottom of the
  funnel already lives in the same database, so events are written to Postgres.
  No personal data is stored, event names are a closed list, and rows are deleted
  when the retention window ends.
- **Feature flags:** messaging channels and the AI assistant can be switched off
  without deleting code — when off, their endpoints are never mapped.
- **Deployment:** Docker Compose, with no container exposing a port; everything
  reaches the outside through Traefik and a Cloudflare Tunnel.

## AI Assistant (behind a feature flag)

The project also includes a tool-calling booking assistant that can check
availability, create or cancel appointments and hand the conversation over to the
owner — so a customer can book over chat. It sits behind a provider-agnostic
interface (Anthropic / OpenRouter). Since the first release sells "the booking
page for your business", the assistant and the messaging channels were
deliberately turned off with a feature flag; the code is still in place.

## Tech Stack

The backend is **.NET 10** with **Minimal API**, and **EF Core** over
**PostgreSQL 16**. The frontend is **Next.js 15 (App Router)**, **TypeScript**
and **Tailwind CSS 4** — customer-facing pages are server-rendered for SEO.
Deployment runs on **Docker Compose**, **Traefik** and **Cloudflare Tunnel**.
