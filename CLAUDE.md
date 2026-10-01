# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

BrandWerkX — multilingual (German/English) Next.js website for the freelance web design business of Zaur Hatuev (Geretsried, service area Munich & Oberland). Design system "V3": near-black (#0a0b0a), cyan accent (#00ffe7), Inter Tight headlines, JetBrains Mono labels.

**Tech Stack**: Next.js 14.1 (App Router, **static export**), React 18, TypeScript 5.5, TailwindCSS 3.4. Hosted on **Cloudflare Pages**; the contact form runs as a Cloudflare Pages Function that sends mail via the Resend REST API.

## Development Commands

```bash
npm run dev      # Dev server on http://localhost:3000 (no /api/contact, no _redirects)
npm run build    # Static export to ./out (+ scripts/postbuild.mjs → out/404.html); runs ESLint
npm run preview  # Serve ./out with Wrangler like Cloudflare Pages (incl. functions, _redirects, _headers)
npm run lint     # ESLint
```

**No test framework is configured.** Verify changes with `npm run build` and `npm run preview`.

## Architecture

### Static export (important)
- `next.config.js` sets `output: 'export'` and `images.unoptimized: true`. No Node server at runtime:
  no middleware, no route handlers, no `headers()`/`cookies()`, no runtime image optimisation.
- Every dynamic segment needs `generateStaticParams` (+ `dynamicParams = false`).
- Images in `public/images` are pre-optimised WebP — keep new images small (≤ 1600 px wide, WebP).
- Redirects (`/` → `/de`, legacy paths) live in `public/_redirects`; security/cache headers in `public/_headers`.
- 404: `app/[lang]/seite-nicht-gefunden` is copied to `out/404.html` by `scripts/postbuild.mjs`.

### Root layouts & locales
- Two root layouts: `app/[lang]/layout.tsx` (sets `<html lang>` per locale) and `app/muster/layout.tsx`.
  Shared fonts, base metadata and JSON-LD live in `lib/root.tsx`.
- Locales: `de`, `en`. Landing pages under `/de/webdesign/*` are German-only.

### Content sources
- Home page content: `lib/home.ts` (DE/EN); landing pages: `lib/landing.ts`; per-page metadata via `pageMetadata()` in `lib/seo.ts`.
- `lib/i18n/{de,en}.ts` only holds the remaining shared UI strings (nav, contact, impressum, footer).
- Only use verifiable facts (prices, delivery times, Search Console numbers with source). No invented rankings or percentages.

### Contact form
1. `app/[lang]/kontakt/KontaktClient.tsx` posts JSON (or a plain form POST without JS) to `/api/contact`
2. `functions/api/contact.ts` (Cloudflare Pages Function): honeypot + min fill time, validation, HTML escaping, best-effort rate limit
3. Sends admin mail + confirmation via Resend REST API; secret `RESEND_API_KEY` is set in the Cloudflare dashboard

### Styling
- `app/design-v3.css` — the design system (tokens under `.site-shell`, `v3-*` components)
- `app/globals.css` — remaining base styles still used by contact/legal pages
- Reusable V3 components: `components/v3/*` (PageHero, PriceBoard, Steps, Faq, ClosingCta, NotFoundView, ReelToggle)

## Deployment

Cloudflare Pages, connected to the GitHub repo: build command `npm run build`, output directory `out`,
Node 20. `functions/` is picked up automatically. Set `RESEND_API_KEY` as an encrypted variable.
