import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, SITE_URL } from "../../../../lib/seo";
import { getLanding, landingPages, PHONE_DISPLAY, PHONE_TEL } from "../../../../lib/landing";
import PageHero from "../../../../components/v3/PageHero";
import Faq from "../../../../components/v3/Faq";
import ClosingCta from "../../../../components/v3/ClosingCta";

export const dynamicParams = false;

export function generateStaticParams() {
  return landingPages.map((p) => ({ lang: "de", slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const page = getLanding(slug);
  if (!page) return {};
  return pageMetadata({
    lang,
    path: `/webdesign/${slug}`,
    title: page.metaTitle,
    description: page.metaDescription,
    onlyDe: true,
  });
}

export default async function LandingPageRoute({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const page = getLanding(slug);
  if (!page || lang !== "de") notFound();

  const url = `${SITE_URL}/de/webdesign/${page.slug}`;
  const related = page.related
    .map((s) => getLanding(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: page.metaTitle,
        description: page.metaDescription,
        inLanguage: "de",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#business` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "BrandWerkX", item: `${SITE_URL}/de` },
          { "@type": "ListItem", position: 2, name: "Webdesign", item: `${SITE_URL}/de/webdesign` },
          { "@type": "ListItem", position: 3, name: page.label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const kindLabel = page.kind === "leistung" ? "Leistung" : page.kind === "branche" ? "Branche" : "Region";

  return (
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="v3-wrap v3-crumbs v3-mono" aria-label="Brotkrumen">
        <Link href="/de">BrandWerkX</Link> / <Link href="/de/webdesign">Webdesign</Link> / <span>{page.label}</span>
      </nav>

      <PageHero
        meta={`${kindLabel} · ${page.eyebrow}`}
        metaRight={<b>ab 490 € · Geretsried</b>}
        title={<span className="l v3-h1-long">{page.h1}</span>}
        lead={page.intro}
        actions={
          <>
            <a href={`tel:${PHONE_TEL}`} className="v3-btn v3-btn-ghost">{PHONE_DISPLAY}</a>
            <Link href="/de/kontakt" className="v3-btn v3-btn-accent">Kostenloses Erstgespräch <span className="arr" aria-hidden="true">→</span></Link>
          </>
        }
      />

      {page.sections.map((s, i) => (
        <section key={s.title} className="v3-sec" aria-labelledby={`h-s${i}`}>
          <div className="v3-wrap">
            <div className="v3-sec-head v3-sec-head-sm">
              <span className="num">{String(i + 1).padStart(2, "0")} / {kindLabel}</span>
              <h2 id={`h-s${i}`}>{s.title}</h2>
            </div>
            <div className="v3-landing-body">
              {s.text && <p className="v3-landing-text">{s.text}</p>}
              {s.bullets && <ul className="v3-plus v3-plus-lg">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          </div>
        </section>
      ))}

      <section className="v3-sec" aria-labelledby="h-faq">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">FAQ</span>
            <h2 id="h-faq">Häufige Fragen.</h2>
          </div>
          <Faq label={page.label} items={page.faqs.map((f) => [f.q, f.a] as [string, string])} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="v3-sec" aria-labelledby="h-related">
          <div className="v3-wrap">
            <div className="v3-sec-head v3-sec-head-sm">
              <span className="num">Weiterlesen</span>
              <h2 id="h-related">Passende Themen.</h2>
            </div>
            <nav className="v3-links" aria-label="Passende Themen">
              {related.map((p) => (
                <Link key={p.slug} href={`/de/webdesign/${p.slug}`}>{p.label}<span>{p.kind === "ort" ? "Region" : p.kind === "branche" ? "Branche" : "Ratgeber"} →</span></Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      <ClosingCta lang="de" ask="Lass uns über deine Website reden." />
    </div>
  );
}
