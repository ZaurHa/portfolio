import "../globals.css";
import "../design-v3.css";
import type { Metadata } from "next";
import { baseMetadata, fontClassName } from "../../lib/root";

export { viewport } from "../../lib/root";

// Server-Layout fürs /muster-Segment — die Overview-Page selbst ist eine
// Client-Komponente und kann keine Metadata exportieren.
export const metadata: Metadata = {
  ...baseMetadata,
  title: "Website-Designs für Handwerker & Studios",
  description:
    "Fertige Website-Designs zum Festpreis: Klempner, Elektriker, Kosmetikstudios. Mehrere Versionen vergleichen, Favorit wählen – in 3–5 Werktagen online, ab 490 €.",
  alternates: {
    canonical: "https://brandwerkx.de/muster",
  },
};

/** Eigenes Root-Layout für die Design-Vorschau (ohne Sprachpräfix). */
export default function MusterLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={fontClassName}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-black text-white font-sans min-h-screen" style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
