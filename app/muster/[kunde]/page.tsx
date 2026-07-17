import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MusterShowcase, { MusterVersion } from "../../../components/MusterShowcase";
import ErrorBoundary from "../../../components/ErrorBoundary";

const brancheLabels: Record<string, string> = {
  klempner: "Klempner & Sanitär",
  elektriker: "Elektriker",
  kosmetik: "Kosmetikstudios",
};

// Kunden-Konfiguration — für jeden neuen Kunden einfach einen neuen Eintrag hinzufügen
const kundenConfig: Record<string, { clientName: string; versions: MusterVersion[] }> = {
  klempner: {
    clientName: "Mustermann Klempner",
    versions: [
      {
        id: "v1",
        label: "Version 1 — Warm & Serif",
        description: "Warme Creme- und Kupfertöne mit eleganter Serifen-Typografie. Traditionell und vertrauenswürdig.",
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
        label: "Version 3 — Editorial Grün",
        description: "Dunkelgrün mit klassischer Serif — ruhig, edel, maximal seriös.",
        src: "/muster/klempner/v3.html",
      },
      {
        id: "v4",
        label: "Version 4 — Brutalist",
        description: "Weiß mit Signal-Orange und Mono-Typografie. Direkt, technisch, unverwechselbar.",
        src: "/muster/klempner/v4.html",
      },
      {
        id: "v5",
        label: "Version 5 — Bold Dark",
        description: "Dunkel mit kräftigem Orange, fette Condensed-Typografie. Maximal auffällig.",
        src: "/muster/klempner/v5.html",
      },
      {
        id: "final",
        label: "Version 6 — SEO Final",
        description: "Beste Version: Klassisch in Blau & Weiß, SEO-optimiert, alle Berliner Bezirke, FAQ, Schema.org.",
        tag: "EMPFOHLEN",
        tagColor: "#00ffe7",
        src: "/muster/klempner/final.html",
      },
    ],
  },
  elektriker: {
    clientName: "Mustermann Elektro",
    versions: [
      {
        id: "v1",
        label: "Version 1 — Bold Gelb",
        description: "Schwarz mit gelben Akzenten und riesiger Typografie. Auffällig und selbstbewusst.",
        src: "/muster/elektriker/v1.html",
      },
      {
        id: "v2",
        label: "Version 2 — Klassisch Blau",
        description: "Hell und seriös mit blauem Leistungs-Panel. Vertrauen auf den ersten Blick.",
        src: "/muster/elektriker/v2.html",
      },
      {
        id: "v3",
        label: "Version 3 — Poster Orange",
        description: "Dunkel mit Signal-Orange und Plakat-Typografie. Modern und markant.",
        tag: "EMPFOHLEN",
        tagColor: "#FF6B00",
        src: "/muster/elektriker/v3.html",
      },
    ],
  },
  kosmetik: {
    clientName: "Bella Beauté Studio",
    versions: [
      {
        id: "v1",
        label: "Version 1 — Rose & Cream",
        description: "Warm, feminin, einladend. Rosa Akzente auf cremefarbenem Hintergrund.",
        src: "/muster/kosmetik/v1.html",
      },
      {
        id: "v2",
        label: "Version 2 — Luxury Dark",
        description: "Schwarz mit Goldakzenten — premium und exklusiv.",
        src: "/muster/kosmetik/v2.html",
      },
      {
        id: "v3",
        label: "Version 3 — Modern Minimal",
        description: "Sauber, hell, modern. Mit Bewertungen und vollständiger Preisliste.",
        tag: "EMPFOHLEN",
        tagColor: "#D4877A",
        src: "/muster/kosmetik/v3.html",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(kundenConfig).map((kunde) => ({ kunde }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kunde: string }>;
}): Promise<Metadata> {
  const { kunde } = await params;
  const config = kundenConfig[kunde];
  if (!config) return {};
  const branche = brancheLabels[kunde] ?? config.clientName;
  return {
    title: { absolute: `Website-Designs für ${branche} — ${config.versions.length} Versionen | BrandWerkX` },
    description: `${config.versions.length} fertige Website-Designs für ${branche} im Vergleich. Favorit wählen, individuell angepasst, live in 5 Tagen — ab 490€.`,
    alternates: { canonical: `https://brandwerkx.de/muster/${kunde}` },
  };
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

  const branche = brancheLabels[kunde] ?? config.clientName;

  return (
    <ErrorBoundary label="Design-Showcase">
      {/* SEO: sichtbare Überschrift würde das App-artige Viewer-UI stören → sr-only */}
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Website-Designs für {branche} — {config.versions.length} Versionen zum Vergleich
      </h1>
      <MusterShowcase
        kunde={kunde}
        clientName={config.clientName}
        versions={config.versions}
      />
    </ErrorBoundary>
  );
}
