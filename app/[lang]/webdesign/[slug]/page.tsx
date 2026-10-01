import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata, SITE_URL } from "../../../../lib/seo";
import { getLanding, landingPages, PHONE_DISPLAY, PHONE_TEL } from "../../../../lib/landing";

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

  return (
    <div className="leistungen-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="page-hero">
        <nav className="landing-crumbs" aria-label="Brotkrumen">
          <Link href="/de">BrandWerkX</Link> / <Link href="/de/webdesign">Webdesign</Link> / <span>{page.label}</span>
        </nav>
        <span className="section-eyebrow">{page.eyebrow}</span>
        <h1 className="page-hero-title">{page.h1}</h1>
        <p className="page-hero-desc landing-intro">{page.intro}</p>
        <div className="hero-badges">
          <Link href="/de/kontakt" className="cta-btn-primary">Kostenloses Erstgespräch</Link>
          <a href={`tel:${PHONE_TEL}`} className="cta-btn-secondary">{PHONE_DISPLAY}</a>
        </div>
      </div>

      {page.sections.map((s, i) => (
        <section key={s.title} className={`section-wrap${i % 2 === 1 ? " section-alt" : ""}`}>
          <div className="landing-prose">
            <h2 className="section-title">{s.title}</h2>
            {s.text && <p>{s.text}</p>}
            {s.bullets && (
              <ul className="landing-list">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="section-wrap section-alt">
        <div className="landing-prose">
          <h2 className="section-title">Häufige Fragen</h2>
          <div className="faq-list">
            {page.faqs.map((f) => (
              <details key={f.q} className="faq-item landing-faq">
                <summary className="faq-question">{f.q}</summary>
                <div className="faq-answer">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-wrap">
          <div className="section-header">
            <h2 className="section-title">Passende Themen</h2>
          </div>
          <div className="landing-grid">
            {related.map((p) => (
              <Link key={p.slug} href={`/de/webdesign/${p.slug}`} className="landing-card">
                <h3>{p.label}</h3>
                <p>{p.metaDescription}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="cta-section">
        <div className="cta-glow" />
        <span className="section-eyebrow">Starten wir</span>
        <h2 className="cta-title">Deine Website. In 5 Tagen live.</h2>
        <p className="cta-desc">
          Kostenloses Erstgespräch, kein Verkaufsdruck. Antwort in der Regel innerhalb von 24 Stunden.
        </p>
        <div className="cta-buttons">
          <Link href="/de/kontakt" className="cta-btn-primary">Projekt anfragen</Link>
          <Link href="/de/leistungen" className="cta-btn-secondary">Preise ansehen</Link>
        </div>
      </section>
    </div>
  );
}
