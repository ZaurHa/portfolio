/** @type {import('next').NextConfig} */
const nextConfig = {
  // Statischer Export für Cloudflare Pages (Ausgabe in ./out).
  // Das Kontaktformular läuft als Pages Function: functions/api/contact.ts
  output: 'export',
  images: {
    // Ohne Next-Server keine Laufzeit-Optimierung – Bilder liegen bereits als WebP vor
    unoptimized: true,
  },
  // ESLint läuft beim Build — Fehler blockieren den Deploy
};

module.exports = nextConfig;
