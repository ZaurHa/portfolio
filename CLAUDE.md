# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrandWerkX portfolio — a multilingual (German/English) Next.js website for freelance web development services. Custom neumorphic dark theme with cyan accents (#00ffe7).

**Tech Stack**: Next.js 14.1 (App Router), React 18, TypeScript 5.5, TailwindCSS 3.4, Framer Motion animations, Resend for transactional email.

## Development Commands

```bash
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build (runs ESLint — errors block deploy)
npm run start    # Run production server
npm run lint     # Run ESLint
```

**No test framework is configured** — this project has no tests.

## Architecture

### Locale Routing
- Middleware (`middleware.ts`) intercepts all requests except `/api/*`, `/muster/*`, and static files
- Detects locale from `Accept-Language` header (defaults to `de`, prefers `en` only if explicit)
- Redirects to `/de/*` or `/en/*` while preserving query params
- **Exception**: `/muster/*` routes (template showcase) have no locale prefix

### i18n System
- Custom type-safe dictionaries in `lib/i18n/` (`de.ts`, `en.ts`)
- `getDictionary(locale)` loads translations at page level
- Server components receive `dict` prop; client components (like `LayoutClient`) receive it too
- Language switcher in nav uses `switchLangPath()` to toggle between `/de/*` and `/en/*`

### Server vs Client Components
- **Server Components** (default): All pages and layouts in `app/[lang]/*` are server components
- **Client Components** (`'use client'`): Interactive elements like forms, animations, theme toggle
- `LayoutClient.tsx` wraps the locale layout to provide client-side interactivity (nav, menu, scroll effects)

### Styling System
- **Primary**: `app/globals.css` (~2246 lines) — neumorphic design system with CSS variables
- Accent color: `--accent: #00ffe7` (cyan)
- Dark theme default; light mode via `next-themes`
- Extensive mobile overrides — responsive-first with breakpoint-specific styles
- Glassmorphism cards, soft shadows, subtle borders

### Contact Form Flow
1. Client form in `app/[lang]/kontakt/page.tsx` submits to `/api/contact`
2. Rate limiting: in-memory, 5 req/10min per IP
3. Validation → Resend API (`resend.emails.send()`)
4. Sends HTML email to admin + confirmation to customer
5. Environment variables: `RESEND_API_KEY`, `RESEND_DOMAIN`, `ADMIN_EMAIL`

### Path Aliases
- `@/*` maps to project root (configured in `tsconfig.json`)

### Static Generation
- Pages generate static params for locales: `de` and `en`
- Optimized for Vercel deployment

## Key Files

- `middleware.ts` — Locale detection & routing (bypasses `/muster/*`)
- `components/LayoutClient.tsx` — Main nav, menu, scroll effects, language switcher
- `lib/i18n/index.ts` — Dictionary loader, locale types
- `app/globals.css` — Entire design system (neumorphism, responsive overrides)
- `app/api/contact/route.ts` — Contact form handler with Resend
- `next.config.js` — Image domains (Unsplash, Pexels), ESLint on builds

## Design Tokens

Edit globals.css for theme changes:
- `--accent` — Primary accent (cyan #00ffe7)
- `--bg-primary`, `--bg-secondary` — Background colors
- Neumorphic shadows: `--shadow-light`, `--shadow-dark`
- Glassmorphism: `--glass-bg`, `--glass-border`

## Deployment

Optimized for Vercel. Push to GitHub → connect repo → deploy. ESLint runs on build; errors block deployment.
