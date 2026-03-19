# Portfolio

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=flat&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white)

> A modern, animated portfolio website built with Next.js 14, Tailwind CSS, and Framer Motion — with Supabase backend and Netlify deployment.

## About

A personal portfolio site built with Next.js 14 (App Router), React 18, and TypeScript. Features smooth animations powered by Framer Motion, responsive styling with Tailwind CSS, and a Supabase backend for dynamic content. Configured for deployment on Netlify with middleware support.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **UI:** React 18, Tailwind CSS
- **Animations:** Framer Motion
- **Backend:** Supabase
- **Deployment:** Netlify
- **Linting:** ESLint

## Features

- **Server-side rendering** with Next.js App Router
- **Smooth animations** powered by Framer Motion
- **Responsive design** with Tailwind CSS
- **Dynamic content** via Supabase database
- **Middleware** for request handling
- **TypeScript** throughout for type safety
- **Netlify-ready** with `netlify.toml` configuration

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Supabase project (for backend)

### Installation

```bash
git clone https://github.com/iampreetdave-max/portfolio.git
cd portfolio
npm install
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials.

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
portfolio/
├── app/               # Next.js App Router pages
├── components/        # React UI components
├── lib/               # Utility functions & Supabase client
├── public/            # Static assets
├── middleware.ts      # Next.js middleware
├── supabase-setup.sql # Database schema
├── tailwind.config.ts
├── next.config.mjs
├── netlify.toml
├── package.json
├── tsconfig.json
└── README.md
```

## License

This project is open source.
