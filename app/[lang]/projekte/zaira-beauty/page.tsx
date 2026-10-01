import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "../../../../lib/seo";
import PageHero from "../../../../components/v3/PageHero";
import ClosingCta from "../../../../components/v3/ClosingCta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/projekte/zaira-beauty", title: "Zaira Beauty Face – Beauty Studio Website Case Study", description: "Case study: rebrand and new website for Zaira Beauty Face, a beauty studio in Geretsried – strategy, design and development from one source." })
    : pageMetadata({ lang, path: "/projekte/zaira-beauty", title: "Zaira Beauty Face – Case Study Kosmetikstudio-Website", description: "Case Study: Rebranding und neue Website für Zaira Beauty Face, ein Kosmetikstudio in Geretsried – Strategie, Design und Entwicklung aus einer Hand." });
}

const LIVE_URL = "https://zairabeauty.de";

export default async function ZairaBeautyCaseStudy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const de = lang !== "en";

  const goals = de
    ? ["Eine moderne, vertrauenswürdige Website", "Ein einheitliches Erscheinungsbild", "Mehr Sichtbarkeit in der Region", "Behandlungen klar und verständlich zeigen", "Einfacher Weg zur Terminanfrage"]
    : ["A modern, trustworthy website", "A consistent brand identity", "More visibility in the region", "Show treatments clearly", "An easy path to booking enquiries"];
  const delivered = de
    ? ["Rebranding: Logo, Farben, Typografie", "Responsive Website, mobil zuerst gebaut", "Behandlungsübersicht mit Preisen", "Lokale SEO-Grundlagen für Geretsried", "Kontaktweg für Terminanfragen"]
    : ["Rebrand: logo, colours, typography", "Responsive website, built mobile-first", "Treatment overview with prices", "Local SEO basics for Geretsried", "Contact path for appointment requests"];
  const treatments = de
    ? ["Aquafacial", "Anti-Aging", "Microneedling", "Lashlifting", "Dauerhafte Haarentfernung"]
    : ["Aquafacial", "Anti-ageing", "Microneedling", "Lash lifting", "Permanent hair removal"];
  const steps: [string, string][] = de
    ? [
        ["Verstehen", "Studio, Zielgruppe und Wettbewerb in Geretsried kennenlernen."],
        ["Marke", "Logo, Farben und Typografie als einheitliches Erscheinungsbild."],
        ["Design", "Seitenaufbau und Gestaltung – abgestimmt im direkten Austausch."],
        ["Launch", "Entwicklung, Test auf allen Geräten, Livegang und Übergabe."],
      ]
    : [
        ["Understand", "Get to know the studio, audience and competition in Geretsried."],
        ["Brand", "Logo, colours and typography as one consistent identity."],
        ["Design", "Page structure and design – agreed in direct exchange."],
        ["Launch", "Development, testing on all devices, go-live and handover."],
      ];
  const stack: [string, string][] = [
    ["Framework", "Next.js · React"],
    ["Styling", "TailwindCSS"],
    ["Design", "Figma"],
    [de ? "Fokus" : "Focus", de ? "Mobil zuerst · lokale SEO" : "Mobile-first · local SEO"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: de ? "Case Study: Website für Zaira Beauty Face" : "Case study: website for Zaira Beauty Face",
    url: `${SITE_URL}/${lang}/projekte/zaira-beauty`,
    creator: { "@id": `${SITE_URL}/#business` },
    about: { "@type": "BeautySalon", name: "Zaira Beauty Face", url: LIVE_URL, address: { "@type": "PostalAddress", addressLocality: "Geretsried", addressCountry: "DE" } },
    inLanguage: lang,
  };

  return (
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="v3-wrap v3-crumbs v3-mono">
        <Link href={`/${lang}/projekte`}>← {de ? "Alle Projekte" : "All projects"}</Link>
      </div>

      <PageHero
        meta={de ? "Case Study · Kosmetik · Geretsried" : "Case study · Beauty · Geretsried"}
        metaRight={<b>2024</b>}
        title={<><span className="l">Zaira</span><span className="l"><span className="c">Beauty</span> <span className="o">Face.</span></span></>}
        lead={de
          ? "Rebranding und neue Website für ein Kosmetikstudio in Geretsried – Strategie, Design und Entwicklung aus einer Hand."
          : "Rebrand and new website for a beauty studio in Geretsried – strategy, design and development from one source."}
        actions={
          <>
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-accent">{de ? "Website ansehen" : "View website"} <span className="arr" aria-hidden="true">↗</span></a>
            <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-ghost">{de ? "Ähnliches Projekt anfragen" : "Request a similar project"}</Link>
          </>
        }
        facts={[
          { label: de ? "Kunde" : "Client", value: "Zaira Beauty Face" },
          { label: de ? "Ort" : "Location", value: "Geretsried" },
          { label: de ? "Leistung" : "Scope", value: de ? "Rebranding + Website" : "Rebrand + website" },
          { label: "Live", value: <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">zairabeauty.de ↗</a> },
        ]}
      />

      <div className="v3-wrap v3-case-hero-img">
        <div className="v3-frame v3-frame-static">
          <div className="bar"><i /><i /><i /><span>zairabeauty.de</span></div>
          <div className="img img-wide">
            <Image src="/images/beauty-praxis-mockup.webp" alt={de ? "Website Zaira Beauty Face" : "Zaira Beauty Face website"} fill sizes="100vw" priority />
          </div>
        </div>
      </div>

      <section className="v3-sec" aria-labelledby="h-z-ausgang">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">01 / {de ? "Ausgangslage" : "Starting point"}</span>
            <h2 id="h-z-ausgang">{de ? <>Treue Kundinnen.<br /><span className="o">Keine</span> Online-Präsenz.</> : <>Loyal clients.<br /><span className="o">No</span> online presence.</>}</h2>
            <p>{de ? "Das Studio hatte treue Stammkundinnen – aber keinen professionellen Auftritt im Netz." : "The studio had loyal regulars – but no professional presence online."}</p>
          </div>
          <div className="v3-two">
            <div>
              <span className="v3-mono">{de ? "Ziele" : "Goals"}</span>
              <ul className="v3-plus v3-plus-lg">{goals.map((g) => <li key={g}>{g}</li>)}</ul>
            </div>
            <div>
              <span className="v3-mono">{de ? "Umgesetzt" : "Delivered"}</span>
              <ul className="v3-plus v3-plus-lg">{delivered.map((g) => <li key={g}>{g}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-z-studio">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">02 / {de ? "Das Studio" : "The studio"}</span>
            <h2 id="h-z-studio">{de ? <>Behandlungen,<br />die <span className="c">man versteht.</span></> : <>Treatments<br />people <span className="c">understand.</span></>}</h2>
            <p>{de ? "Die Website zeigt das Angebot so, dass Kundinnen sofort wissen, was sie erwartet." : "The website presents the offer so clients know straight away what to expect."}</p>
          </div>
          <div className="v3-treatments">
            {treatments.map((t, i) => (
              <div key={t}><span className="v3-mono">{String(i + 1).padStart(2, "0")}</span><b>{t}</b></div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-z-ablauf">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">03 / {de ? "Vorgehen" : "Process"}</span>
            <h2 id="h-z-ablauf">{de ? <>Vom Gespräch<br />zum <span className="o">Launch.</span></> : <>From first call<br />to <span className="o">launch.</span></>}</h2>
            <p />
          </div>
          <ol className="v3-steps">
            {steps.map(([t, d], i) => (
              <li key={t}>
                <span className="s-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="knot" aria-hidden="true" />
                <div><h3>{t}</h3><p>{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-z-tech">
        <div className="v3-wrap v3-extras v3-extras-top">
          <span className="v3-mono">04 / Tech</span>
          <div>
            <h2 id="h-z-tech" className="v3-sr">Tech-Stack</h2>
            <table><tbody>{stack.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table>
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-z-quote">
        <div className="v3-wrap">
          <h2 id="h-z-quote" className="v3-sr">{de ? "Kundenstimme" : "Testimonial"}</h2>
          <figure className="v3-quote">
            <div><span className="qm" aria-hidden="true">“</span><span className="v3-mono src">05 / {de ? "Kundin" : "Client"}</span></div>
            <div>
              <blockquote lang="de">Zaur hat in <mark>5 Tagen</mark> genau das geliefert, was ich wollte — und noch mehr. Die Website sieht professionell aus und kommt bei meinen Kunden super an.</blockquote>
              <figcaption className="v3-mono"><span><b>Zaira K.</b> · Inhaberin Zaira Beauty Face</span></figcaption>
            </div>
          </figure>
        </div>
      </section>

      <ClosingCta lang={lang} ask={de ? "Dein Studio als nächstes Projekt?" : "Your studio as the next project?"} />
    </div>
  );
}
