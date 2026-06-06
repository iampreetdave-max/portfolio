# Preet Dave — Portfolio

![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

Personal portfolio site for Preet Dave (AI/ML Engineer), built with the Next.js App Router and backed by Supabase for dynamic project content.

## Overview

This is a server-rendered portfolio built on Next.js 14 with TypeScript and Tailwind CSS. Project entries are stored in Supabase and rendered on the site, so the showcase can be updated without redeploying. The app also includes a contact form and an automation-request form that send email via Nodemailer, plus a small admin area and a few interactive routes.

## Key Features

- **Dynamic project showcase** — projects are read from a Supabase `projects` table with fields for title, category, description, tech tags, demo/repo URLs, featured flag, and display order
- **Contact form** — submissions handled by the `/api/contact` route, delivered by email through Nodemailer
- **Automation request form** — separate intake handled by `/api/automation-request`
- **GitHub stats route** — `/api/github-stats` for surfacing GitHub activity
- **Admin section** — `/admin` pages plus an `/api/admin` route group
- **Animated, responsive UI** — Framer Motion animations, Lucide icons, Tailwind styling
- **Edge middleware** — `middleware.ts` for request handling

## Architecture

- **App Router** under `app/` defines pages (`page.tsx`, `layout.tsx`), the `admin`, `projects`, and `fun` routes, and API route handlers under `app/api/`.
- **Data layer** uses the Supabase JS client. Row Level Security is enabled on the `projects` table with a public read policy (see `supabase-setup.sql`).
- **Email** is sent server-side from the contact and automation-request API routes using Nodemailer.
- **Styling** is handled by Tailwind CSS (`tailwind.config.ts`, `postcss.config.js`, `app/globals.css`).
- **Deployment** configuration is present for Netlify (`netlify.toml`) and Cloudflare Wrangler (`wrangler.toml`).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | Lucide React |
| Database | Supabase (PostgreSQL) |
| Email | Nodemailer |
| Tooling | ESLint, PostCSS, Autoprefixer |

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project (for the `projects` table)
- SMTP credentials for outbound email via Nodemailer

### Install

```bash
git clone https://github.com/iampreetdave-max/portfolio.git
cd portfolio
npm install
```

### Database setup

Run `supabase-setup.sql` in the Supabase SQL editor to create the `projects` table, enable Row Level Security, add the public read policy, and seed sample rows.

### Develop

```bash
npm run dev      # start the dev server (http://localhost:3000)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run ESLint
```

## Configuration

Set the following environment variables (e.g. in `.env.local`). Never commit real values.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key |
| SMTP / email credentials | Used by Nodemailer in the contact and automation-request routes |

> Confirm the exact variable names against the Supabase client setup in `lib/` and the API route handlers before deploying.

## Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   ├── automation-request/
│   │   ├── contact/
│   │   ├── fun/
│   │   └── github-stats/
│   ├── admin/
│   ├── projects/
│   ├── fun/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
├── automations/
├── public/ · images/
├── middleware.ts
├── supabase-setup.sql
├── tailwind.config.ts
├── next.config.mjs
├── netlify.toml · wrangler.toml
└── package.json
```
