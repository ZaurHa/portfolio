import "../globals.css";
import "../design-v3.css";
import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { baseMetadata, jsonLd } from "../../lib/root";
import RevealOnScroll from "../../components/v3/RevealOnScroll";
import PointerFx from "../../components/v3/PointerFx";

export { viewport } from "../../lib/root";

export const metadata: Metadata = { ...baseMetadata };

// Dieselben Schriften wie auf /de und /en, hier zusätzlich mit kyrillischen Zeichen.
// Nur diese Seite lädt sie, die deutschen und englischen Seiten bleiben unverändert.
const inter = Inter({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const interTight = Inter_Tight({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700", "800"], variable: "--font-display", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin", "cyrillic"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const fontClassName = `${inter.variable} ${interTight.variable} ${jetbrainsMono.variable}`;

/** Eigenes Root-Layout für die russische Seite (/ru): <html lang="ru">, gleiche Gestaltung wie /de und /en. */
export default function RuLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={fontClassName}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-black text-white font-sans min-h-screen" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
        <RevealOnScroll />
        <PointerFx />
      </body>
    </html>
  );
}
