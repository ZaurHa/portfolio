import Link from "next/link";
import type { Loesung } from "../../lib/loesungen-typen";
import { loesungByKey, preisZahl } from "../../lib/loesungen";
import { LOESUNGEN_BASIS, loesungPfad } from "../../lib/loesungen-pfade";
import { SITE_URL } from "../../lib/seo";
import { PHONE_DISPLAY, PHONE_TEL } from "../../lib/home";
import PageHero from "./PageHero";
import Faq from "./Faq";
import Steps from "./Steps";
import ClosingCta from "./ClosingCta";
import { kurzPreis } from "./LoesungenHub";

const T = {
  de: {
    hub: "Lösungen",
    crumbs: "Brotkrumen",
    preise: "Preise",
    preiseTitel: "Was es kostet",
    steuer: "Endpreise: Als Kleinunternehmer nach § 19 UStG weise ich keine Umsatzsteuer aus. Kosten für Plattformen und Lizenzen von Drittanbietern nenne ich dir vorab.",
    fuer: "Passt für",
    ablauf: "Ablauf",
    ablaufTitel: "So läuft es ab",
    faq: "Häufige Fragen",
    related: "Passende Lösungen",
    alle: "Alle Lösungen und Preise",
    cta: "Kostenloses Erstgespräch",
    ask: "Lass uns über deinen Betrieb reden",
    schritt: "Schritt",
    area: "Deutschland",
  },
  en: {
    hub: "Solutions",
    crumbs: "Breadcrumb",
    preise: "Pricing",
    preiseTitel: "What it costs",
    steuer: "No German VAT is charged (small business rule, § 19 UStG). Third-party platform or licence costs are shown upfront.",
    fuer: "A good fit for",
    ablauf: "Process",
    ablaufTitel: "How it works",
    faq: "Frequently asked questions",
    related: "Related solutions",
    alle: "All solutions and prices",
    cta: "Book a free call",
    ask: "Let's talk about your business",
    schritt: "Step",
    area: "Worldwide",
  },
} as const;

/** Ablauf-Schritt „Titel: Text“ in Überschrift und Beschreibung teilen. */
function schritt(text: string, i: number, wort: string): [string, string] {
  const k = text.indexOf(": ");
  return k > 0 && k < 48 ? [text.slice(0, k), text.slice(k + 2)] : [`${wort} ${i + 1}`, text];
}

/** Lösungsseite (KI, Apps, Automatisierung) für /de/loesungen/<slug> und /en/solutions/<slug>. */
export default function LoesungView({ l }: { l: Loesung }) {
  const t = T[l.lang];
  const lang = l.lang;
  const url = `${SITE_URL}${loesungPfad(l.key, lang)}`;
  const hubUrl = `${SITE_URL}${LOESUNGEN_BASIS[lang]}`;
  const kontakt = `/${lang}/kontakt?thema=${encodeURIComponent(l.thema)}`;
  const related = l.related
    .map((k) => loesungByKey(lang, k))
    .filter((r): r is Loesung => Boolean(r));
  // Für strukturierte Daten einmalige und monatliche Preise trennen (sonst wäre „ab 99 € im Monat“ der niedrigste Preis)
  const monatlich = (b: string) => /monat|month|mtl/i.test(b);
  const einmalig = l.preise.filter((p) => !monatlich(p.betrag)).map((p) => preisZahl(p.betrag)).filter((n): n is number => n !== null);
  const proMonat = l.preise.filter((p) => monatlich(p.betrag)).map((p) => preisZahl(p.betrag)).filter((n): n is number => n !== null);
  const offers = einmalig.length
    ? { "@type": "AggregateOffer", priceCurrency: "EUR", lowPrice: Math.min(...einmalig) }
    : proMonat.length
      ? { "@type": "Offer", priceCurrency: "EUR", priceSpecification: { "@type": "UnitPriceSpecification", minPrice: Math.min(...proMonat), priceCurrency: "EUR", unitText: "MON" } }
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: l.metaTitle,
        description: l.metaDescription,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: l.label,
        serviceType: l.label,
        description: l.metaDescription,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: t.area,
        url,
        ...(offers ? { offers } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "BrandWerkX", item: `${SITE_URL}/${lang}` },
          { "@type": "ListItem", position: 2, name: t.hub, item: hubUrl },
          { "@type": "ListItem", position: 3, name: l.label, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: l.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };

  return (
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="v3-wrap v3-crumbs v3-mono" aria-label={t.crumbs}>
        <Link href={`/${lang}`}>BrandWerkX</Link> / <Link href={LOESUNGEN_BASIS[lang]}>{t.hub}</Link> / <span>{l.label}</span>
      </nav>

      <PageHero
        meta={l.eyebrow}
        metaRight={<b>{l.preise[0]?.betrag}</b>}
        title={<span className="l v3-h1-long">{l.h1}</span>}
        lead={l.intro}
        actions={
          <>
            {lang === "de" && <a href={`tel:${PHONE_TEL}`} className="v3-btn v3-btn-ghost">{PHONE_DISPLAY}</a>}
            <Link href={kontakt} className="v3-btn v3-btn-accent">{t.cta} <span className="arr" aria-hidden="true">→</span></Link>
          </>
        }
      />

      <section className="v3-sec" aria-labelledby="h-preise">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">01 / {t.preise}</span>
            <h2 id="h-preise">{t.preiseTitel}</h2>
          </div>
          <div className="v3-preise">
            {l.preise.map((p) => (
              <div key={p.betrag + p.wofuer} className="v3-preis" data-tilt="glanz">
                <b>{p.betrag}</b>
                <span>{p.wofuer}</span>
              </div>
            ))}
          </div>
          <p className="v3-preis-note">{t.steuer}</p>
          <div className="v3-fuer">
            <span className="v3-mono">{t.fuer}</span>
            <ul>{l.fuer.map((f) => <li key={f} className="v3-chip">{f}</li>)}</ul>
          </div>
        </div>
      </section>

      {l.sections.map((s, i) => (
        <section key={s.title} className="v3-sec" aria-labelledby={`h-s${i}`}>
          <div className="v3-wrap">
            <div className="v3-sec-head v3-sec-head-sm">
              <span className="num">{String(i + 2).padStart(2, "0")} / {l.label}</span>
              <h2 id={`h-s${i}`}>{s.title}</h2>
            </div>
            <div className="v3-landing-body">
              {s.text && <p className="v3-landing-text">{s.text}</p>}
              {s.bullets && <ul className="v3-plus v3-plus-lg">{s.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          </div>
        </section>
      ))}

      <section className="v3-sec" aria-labelledby="h-ablauf">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">{String(l.sections.length + 2).padStart(2, "0")} / {t.ablauf}</span>
            <h2 id="h-ablauf">{t.ablaufTitel}</h2>
          </div>
          <Steps steps={l.ablauf.map((a, i) => schritt(a, i, t.schritt))} />
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-faq">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">FAQ</span>
            <h2 id="h-faq">{t.faq}</h2>
          </div>
          <Faq label={l.label} items={l.faqs.map((f) => [f.q, f.a] as [string, string])} />
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-related">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">{t.hub}</span>
            <h2 id="h-related">{t.related}</h2>
          </div>
          <nav className="v3-links" aria-label={t.related}>
            {related.map((r) => (
              <Link key={r.key} href={loesungPfad(r.key, lang) ?? LOESUNGEN_BASIS[lang]}>{r.label}<span>{kurzPreis(r.preise[0]?.betrag, lang)} →</span></Link>
            ))}
            <Link href={LOESUNGEN_BASIS[lang]}>{t.alle}<span>→</span></Link>
          </nav>
        </div>
      </section>

      <ClosingCta lang={lang} ask={t.ask} />
    </div>
  );
}
