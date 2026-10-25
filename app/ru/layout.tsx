import "../globals.css";
import "../design-v3.css";
import type { Metadata } from "next";
import { baseMetadata, fontClassName, jsonLd } from "../../lib/root";
import RevealOnScroll from "../../components/v3/RevealOnScroll";
import PointerFx from "../../components/v3/PointerFx";

export { viewport } from "../../lib/root";

export const metadata: Metadata = { ...baseMetadata };

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
