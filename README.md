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

## Deployment
Empfohlen: [Vercel](https://vercel.com/) (1-Klick-Deploy für Next.js)

1. Repository auf GitHub pushen
2. Auf [vercel.com/import](https://vercel.com/import) das Repo auswählen
3. Deploy klicken – fertig!

Alternativ: [Netlify](https://www.netlify.com/), [Render](https://render.com/)

## Anpassung
- **Projekte:** In `app/page.tsx` und `app/projekte/[slug]/page.tsx` anpassen/ergänzen
- **Social Links:** In `app/ueber-mich/page.tsx` ändern
- **Farben/Design:** In `app/globals.css` (`--accent` für Akzentfarbe)
- **SEO:** In `app/layout.tsx` (Meta-Tags)

## Kontakt
Fragen oder Feedback? Einfach eine Mail an [deine@email.de](mailto:deine@email.de)

---
Viel Erfolg beim Präsentieren deiner Projekte! 🚀
