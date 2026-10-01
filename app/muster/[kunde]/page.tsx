import { notFound } from "next/navigation";
import type { Metadata } from "next";
import MusterShowcase from "../../../components/MusterShowcase";
import ErrorBoundary from "../../../components/ErrorBoundary";
import { kundenConfig } from "../kunden";

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
  const count = config.versions.length;
  return {
    title: { absolute: `Website-Designs für ${config.branche} — ${count} Versionen | BrandWerkX` },
    description: `${count} fertige Website-Designs für ${config.branche} im Vergleich. Favorit wählen, individuell angepasst, in 3–5 Werktagen online — ab 490 €.`,
    // Demo-Seiten mit fiktiven Firmeninhalten: nicht indexieren, Links aber verfolgen.
    robots: { index: false, follow: true },
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

  return (
    <ErrorBoundary label="Design-Showcase">
      {/* Sichtbare Überschrift würde das App-artige Viewer-UI stören → sr-only */}
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
        Website-Designs für {config.branche} — {config.versions.length} Versionen zum Vergleich
      </h1>
      <MusterShowcase
        kunde={kunde}
        clientName={config.clientName}
        versions={config.versions}
      />
    </ErrorBoundary>
  );
}
