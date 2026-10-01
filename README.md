# Zaur's Portfolio

Ein modernes, professionelles Portfolio für Webentwickler – gebaut mit Next.js, TailwindCSS und TypeScript.

## Features
- Responsive Design (Dark/Light-Mode)
- Projektübersicht & dynamische Detailseiten
- "Über mich"- und Kontaktseite
- Animierte UI-Elemente
- SEO & Social Preview (Open Graph)
- 404-Seite

## Tech-Stack
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- TypeScript

## Lokale Entwicklung
```bash
npm install
npm run dev
```
Die Seite läuft dann auf [http://localhost:3000](http://localhost:3000) (oder nächster freier Port).

## Deployment (Cloudflare Pages)
Die Seite wird als statischer Export gebaut und auf Cloudflare Pages gehostet (kommerzielle Nutzung im Free-Plan erlaubt).

1. Cloudflare-Dashboard → Workers & Pages → Erstellen → Pages → Mit Git verbinden → Repo wählen
2. Build-Befehl: `npm run build` · Ausgabeverzeichnis: `out` · Umgebungsvariable `NODE_VERSION=20`
3. Unter Einstellungen → Variablen und Geheimnisse: `RESEND_API_KEY` (verschlüsselt) setzen
4. Eigene Domain `brandwerkx.de` unter „Benutzerdefinierte Domains“ hinzufügen

Lokal wie live testen: `npm run build && npm run preview`

## Anpassung
- **Startseite:** `lib/home.ts` · **Landingpages:** `lib/landing.ts`
- **Projekte:** `app/[lang]/projekte/page.tsx`
- **Design:** `app/design-v3.css`
- **SEO:** `lib/seo.ts` (Metadaten je Seite), `lib/root.tsx` (strukturierte Daten)

## Kontakt
Fragen oder Feedback? Einfach eine Mail an [deine@email.de](mailto:deine@email.de)

---
Viel Erfolg beim Präsentieren deiner Projekte! 🚀
