import type { Metadata } from "next";

// Server-Layout fürs /muster-Segment — die Overview-Page selbst ist eine
// Client-Komponente und kann keine Metadata exportieren.
export const metadata: Metadata = {
  title: "Website-Designs für Handwerker & Studios",
  description:
    "Fertige Website-Designs zum Festpreis: Klempner, Elektriker, Kosmetikstudios. Mehrere Versionen vergleichen, Favorit wählen — live in 5 Tagen, ab 490€.",
  alternates: {
    canonical: "https://brandwerkx.de/muster",
  },
};

export default function MusterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
