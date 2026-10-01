import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, SITE_URL } from "../../../lib/seo";
import { KIND_LABEL, landingPages, type LandingKind } from "../../../lib/landing";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "de" }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata({
    lang,
    path: "/webdesign",
    title: "Webdesign Themen – Leistungen, Branchen, Regionen",
    description:
      "Webdesign von BrandWerkX im Überblick: Website erstellen lassen, Kosten, SEO, Branchen wie Handwerk und Kosmetik sowie Regionen Geretsried, Oberland und München.",
    onlyDe: true,
  });
}

const kinds: LandingKind[] = ["leistung", "branche", "ort"];

export default async function WebdesignHub({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (lang !== "de") notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "BrandWerkX", item: `${SITE_URL}/de` },
      { "@type": "ListItem", position: 2, name: "Webdesign", item: `${SITE_URL}/de/webdesign` },
    ],
  };

  return (
    <div className="leistungen-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="page-hero">
        <span className="section-eyebrow">Webdesign</span>
        <h1 className="page-hero-title">Webdesign von BrandWerkX</h1>
        <p className="page-hero-desc">
          Websites für Handwerker, Selbstständige und kleine Unternehmen aus Geretsried — ab 490 €, SEO inklusive.
          Hier findest du Antworten zu Leistungen, Preisen, Branchen und Regionen.
        </p>
      </div>

      {kinds.map((kind) => (
        <section key={kind} className="section-wrap">
          <div className="section-header">
            <h2 className="section-title">{KIND_LABEL[kind]}</h2>
          </div>
          <div className="landing-grid">
            {landingPages
              .filter((p) => p.kind === kind)
              .map((p) => (
                <Link key={p.slug} href={`/de/webdesign/${p.slug}`} className="landing-card">
                  <h3>{p.label}</h3>
                  <p>{p.metaDescription}</p>
                </Link>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
