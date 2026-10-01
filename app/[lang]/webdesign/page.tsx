import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, SITE_URL } from "../../../lib/seo";
import { KIND_LABEL, landingPages, type LandingKind } from "../../../lib/landing";
import PageHero from "../../../components/v3/PageHero";
import ClosingCta from "../../../components/v3/ClosingCta";

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
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        meta="Webdesign · Themen"
        metaRight={<b>Leistungen · Branchen · Regionen</b>}
        title={<><span className="l">Webdesign</span><span className="l"><span className="c">von BrandWerkX.</span></span></>}
        lead="Websites für Handwerker, Selbstständige und kleine Unternehmen aus Geretsried – ab 490 €, SEO inklusive. Hier findest du Antworten zu Leistungen, Preisen, Branchen und Regionen."
        actions={<Link href="/de/kontakt" className="v3-btn v3-btn-accent">Kostenloses Erstgespräch <span className="arr" aria-hidden="true">→</span></Link>}
      />
      {kinds.map((kind, i) => (
        <section key={kind} className="v3-sec" aria-labelledby={`h-${kind}`}>
          <div className="v3-wrap">
            <div className="v3-sec-head v3-sec-head-sm">
              <span className="num">{String(i + 1).padStart(2, "0")} / {KIND_LABEL[kind]}</span>
              <h2 id={`h-${kind}`}>{KIND_LABEL[kind]}.</h2>
            </div>
            <nav className="v3-links v3-links-desc" aria-label={KIND_LABEL[kind]}>
              {landingPages.filter((p) => p.kind === kind).map((p) => (
                <Link key={p.slug} href={`/de/webdesign/${p.slug}`}>
                  <b>{p.label}</b>
                  <small>{p.metaDescription}</small>
                  <span>Lesen →</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      ))}
      <ClosingCta lang="de" />
    </div>
  );
}
