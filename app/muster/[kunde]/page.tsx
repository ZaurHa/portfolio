import { notFound } from "next/navigation";
import MusterShowcase, { MusterVersion } from "../../../components/MusterShowcase";
import ErrorBoundary from "../../../components/ErrorBoundary";

// Kunden-Konfiguration — für jeden neuen Kunden einfach einen neuen Eintrag hinzufügen
const kundenConfig: Record<string, { clientName: string; versions: MusterVersion[] }> = {
  klempner: {
    clientName: "Mustermann Klempner",
    versions: [
      {
        id: "v1",
        label: "Version 1 — Klassisch",
        description: "Sauber, hell, seriös. Blau & Weiß mit klarer Struktur.",
        src: "/muster/klempner/v1.html",
      },
      {
        id: "v2",
        label: "Version 2 — Modern Dark",
        description: "Dunkles Navy mit leuchtenden Akzenten. Stripe-inspiriert, auffällig.",
        src: "/muster/klempner/v2.html",
      },
      {
        id: "v3",
        label: "Version 3 — Minimal",
        description: "Reduziert auf das Wesentliche. Maximale Seriosität.",
        src: "/muster/klempner/v3.html",
      },
      {
        id: "v4",
        label: "Version 4 — Warm",
        description: "Warme Töne, Kupfer & Creme. Traditionell und vertrauenswürdig.",
        src: "/muster/klempner/v4.html",
      },
      {
        id: "v5",
        label: "Version 5 — Bold Blau",
        description: "Kräftiges Blau, fette Typografie. Direkt und selbstbewusst.",
        src: "/muster/klempner/v5.html",
      },
      {
        id: "final",
        label: "Version 6 — SEO Final",
        description: "Beste Version: SEO-optimiert, alle Berliner Bezirke, FAQ, Schema.org.",
        tag: "EMPFOHLEN",
        tagColor: "#00ffe7",
        src: "/muster/klempner/final.html",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(kundenConfig).map((kunde) => ({ kunde }));
}

export default async function MusterPage({
  params,
}: {
  params: Promise<{ kunde: string }>;
}) {
  const { kunde } = await params;
  const config = kundenConfig[kunde];

  if (!config) {
    notFound();
  }

  return (
    <ErrorBoundary label="Design-Showcase">
      <MusterShowcase
        kunde={kunde}
        clientName={config.clientName}
        versions={config.versions}
      />
    </ErrorBoundary>
  );
}
