import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "../../../../lib/seo";
import PageHero from "../../../../components/v3/PageHero";
import ClosingCta from "../../../../components/v3/ClosingCta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/projekte/flott-umzug", title: "Flott Umzug & Transport | Moving Company Website Case Study", description: "Case study: a new logo, a website with a page for every service, an enquiry form with photo upload and a repaired Google profile for a moving company in Bielefeld." })
    : pageMetadata({ lang, path: "/projekte/flott-umzug", title: "Flott Umzug & Transport | Case Study Umzugsfirma-Website", description: "Case Study: neues Logo, eine Website mit eigener Seite für jede Leistung, Anfrage mit Foto-Upload und ein repariertes Google-Profil für ein Umzugsunternehmen in Bielefeld." });
}

const LIVE_URL = "https://umzug-flott.de";

export default async function FlottUmzugCaseStudy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const de = lang !== "en";

  const goals = de
    ? ["Gefunden werden, wenn jemand in Bielefeld einen Umzug plant", "Jede Leistung klar erklären", "Anfragen mit allen Angaben, am besten mit Fotos", "Nur Aussagen, die der Betrieb belegen kann", "Ein Google-Profil, das in Bielefeld steht"]
    : ["Be found when someone in Bielefeld plans a move", "Explain every service clearly", "Enquiries with all the details, ideally with photos", "Only claims the business can back up", "A Google profile that is actually in Bielefeld"];
  const delivered = de
    ? ["Neues Logo und Erscheinungsbild", "Website auf eigener Domain umzug-flott.de", "Eine Seite für jede Leistung, dazu Umzugsplaner", "Anfrage in vier Schritten mit Foto-Upload", "Google-Profil repariert: Standort, Name, Kategorien", "Vorlagen für Kostenvoranschlag, Auftragsbestätigung und Rechnung"]
    : ["New logo and visual identity", "Website on its own domain umzug-flott.de", "A page for every service, plus a move planner", "Four-step enquiry with photo upload", "Google profile repaired: location, name, categories", "Templates for quotes, order confirmations and invoices"];
  const services: { path: string; name: string; note: string }[] = de
    ? [
        { path: "/fernumzug/", name: "Fernumzug", note: "Strecken aus echten Google-Bewertungen" },
        { path: "/firmenumzug/", name: "Firmenumzug", note: "Büro, Praxis oder Laden in Bielefeld" },
        { path: "/seniorenumzug/", name: "Seniorenumzug", note: "Ins Kleinere, ins betreute Wohnen oder ins Heim" },
        { path: "/moebeltransport/", name: "Möbeltransport", note: "Einzelne Möbel, Klavier oder Beiladung" },
        { path: "/moebelmontage/", name: "Möbelmontage", note: "Schränke, Betten und Küchen ab- und aufbauen" },
        { path: "/entruempelung/", name: "Entrümpelung", note: "Keller, Dachboden, Wohnung oder Haus" },
        { path: "/haushaltsaufloesung/", name: "Haushaltsauflösung", note: "Bis zur besenreinen Übergabe" },
        { path: "/halteverbotszone/", name: "Halteverbotszone", note: "Antrag, Gebühr und Schilder über einen Dienst" },
        { path: "/umzugskosten/", name: "Umzugskosten", note: "Wovon der Preis abhängt, mit Umzugsplaner" },
      ]
    : [
        { path: "/fernumzug/", name: "Long-distance moves", note: "Routes taken from real Google reviews" },
        { path: "/firmenumzug/", name: "Office moves", note: "Office, practice or shop in Bielefeld" },
        { path: "/seniorenumzug/", name: "Moves for seniors", note: "Downsizing, assisted living or a care home" },
        { path: "/moebeltransport/", name: "Furniture transport", note: "Single items, pianos or part loads" },
        { path: "/moebelmontage/", name: "Furniture assembly", note: "Wardrobes, beds and kitchens taken down and rebuilt" },
        { path: "/entruempelung/", name: "House clearance", note: "Basement, attic, flat or house" },
        { path: "/haushaltsaufloesung/", name: "Household dissolution", note: "Through to a broom-clean handover" },
        { path: "/halteverbotszone/", name: "Parking-ban zone", note: "Permit, fee and signs via a service" },
        { path: "/umzugskosten/", name: "Moving costs", note: "What drives the price, with a move planner" },
      ];
  const enquiry = de
    ? ["Vier Schritte, mit Zusammenfassung vor dem Absenden", "Bis zu zehn Fotos, schon im Browser verkleinert", "Kommt als E-Mail an, die Fotos im Anhang", "Alternativ Besichtigung per Video oder vor Ort", "Ohne Cookies und ohne Reichweitenmessung"]
    : ["Four steps, with a summary before sending", "Up to ten photos, resized in the browser", "Arrives as an email with the photos attached", "Alternatively a video call or an on-site visit", "No cookies and no tracking"];
  const steps: [string, string][] = de
    ? [
        ["Verstehen", "Fragebogen mit dem Inhaber, dazu alte Website, Google-Profil und Wettbewerb in Bielefeld geprüft."],
        ["Marke", "Neues Logo und Farben, die auf Website und Google-Profil gleich aussehen."],
        ["Website", "Seiten, Texte und Formular. Jede Aussage stammt vom Inhaber oder aus einer Quelle."],
        ["Launch", "Eigene Domain, Google-Profil und Search Console eingerichtet, live seit dem 9. Oktober 2026."],
      ]
    : [
        ["Understand", "Questionnaire with the owner, plus a review of the old website, the Google profile and the competition in Bielefeld."],
        ["Brand", "New logo and colours that look the same on the website and the Google profile."],
        ["Website", "Pages, copy and form. Every claim comes from the owner or from a source."],
        ["Launch", "Own domain, Google profile and Search Console set up, live since 9 October 2026."],
      ];
  const stack: [string, string][] = [
    ["Framework", de ? "Astro · statische Seiten" : "Astro · static pages"],
    ["Hosting", "Cloudflare"],
    [de ? "Formular" : "Form", de ? "Cloudflare Email · Fotos als Anhang" : "Cloudflare Email · photos as attachments"],
    [de ? "Fokus" : "Focus", de ? "Lokale SEO · ohne Cookies" : "Local SEO · no cookies"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: de ? "Case Study: Website für Flott Umzug & Transport" : "Case study: website for Flott Umzug & Transport",
    url: `${SITE_URL}/${lang}/projekte/flott-umzug`,
    creator: { "@id": `${SITE_URL}/#business` },
    about: { "@type": "MovingCompany", name: "Flott Umzug & Transport", url: LIVE_URL, address: { "@type": "PostalAddress", addressLocality: "Bielefeld", addressCountry: "DE" } },
    inLanguage: lang,
  };

  return (
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="v3-wrap v3-crumbs v3-mono">
        <Link href={`/${lang}/projekte`}>← {de ? "Alle Projekte" : "All projects"}</Link>
      </div>

      <PageHero
        meta={de ? "Case Study · Umzug · Bielefeld" : "Case study · Moving · Bielefeld"}
        metaRight={<b>2026</b>}
        title={<><span className="l">Flott</span>{" "}<span className="l"><span className="c">Umzug</span> <span className="o">&amp; Transport</span></span></>}
        lead={de
          ? "Neues Logo, neue Website auf eigener Domain und ein repariertes Google-Profil für ein Umzugs- und Entrümpelungsunternehmen aus Bielefeld."
          : "A new logo, a new website on its own domain and a repaired Google profile for a moving and house-clearance company in Bielefeld."}
        actions={
          <>
            <a href={LIVE_URL} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-accent">{de ? "Website ansehen" : "View website"} <span className="arr" aria-hidden="true">↗</span></a>
            <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-ghost">{de ? "Ähnliches Projekt anfragen" : "Request a similar project"}</Link>
          </>
        }
        facts={[
          { label: de ? "Kunde" : "Client", value: "Flott Umzug & Transport" },
          { label: de ? "Ort" : "Location", value: "Bielefeld" },
          { label: de ? "Leistung" : "Scope", value: de ? "Logo, Website, Google-Profil" : "Logo, website, Google profile" },
          { label: "Live", value: <a href={LIVE_URL} target="_blank" rel="noopener noreferrer">umzug-flott.de ↗</a> },
        ]}
      />

      <div className="v3-wrap v3-case-hero-img">
        <div className="v3-frame v3-frame-static">
          <div className="bar"><i /><i /><i /><span>umzug-flott.de</span></div>
          <div className="img img-wide">
            <Image src="/images/flott-umzug-preview.webp" alt={de ? "Startseite von umzug-flott.de" : "Homepage of umzug-flott.de"} fill sizes="100vw" priority />
          </div>
        </div>
      </div>

      <section className="v3-sec" aria-labelledby="h-f-ausgang">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">01 / {de ? "Ausgangslage" : "Starting point"}</span>
            <h2 id="h-f-ausgang">{de ? <>Zufriedene Kunden.<br /><span className="o">Falscher</span> Ort bei Google</> : <>Happy customers.<br /><span className="o">Wrong</span> place on Google</>}</h2>
            <p>{de
              ? "Gute Bewertungen, aber die Stecknadel im Google-Profil stand in Thüringen, und in den Portalen standen verschiedene Nummern und Zeiten."
              : "Good reviews, but the pin in the Google profile sat in Thuringia, and the directories listed different numbers and opening hours."}</p>
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

      <section className="v3-sec" aria-labelledby="h-f-leistungen">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">02 / {de ? "Leistungen" : "Services"}</span>
            <h2 id="h-f-leistungen">{de ? <>Eine Seite<br />für jede <span className="c">Leistung</span></> : <>A page<br />for every <span className="c">service</span></>}</h2>
            <p>{de
              ? "Jede Leistung hat eine eigene Seite mit Ablauf, Einsatzgebiet und direktem Weg zur Anfrage."
              : "Every service has its own page with the process, the service area and a direct path to the enquiry."}</p>
          </div>
          <nav className="v3-links v3-links-desc" aria-label={de ? "Leistungsseiten auf umzug-flott.de" : "Service pages on umzug-flott.de"}>
            {services.map((s) => (
              <a key={s.path} href={`${LIVE_URL}${s.path}`} target="_blank" rel="noopener noreferrer">
                <b>{s.name}</b>
                <small>{s.note}</small>
                <span>umzug-flott.de{s.path} ↗</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-f-anfrage">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">03 / {de ? "Anfrage" : "Enquiry"}</span>
            <h2 id="h-f-anfrage">{de ? <>Fotos statt<br /><span className="o">Besichtigung</span></> : <>Photos instead<br />of a <span className="o">site visit</span></>}</h2>
            <p>{de
              ? "Die meisten Umzüge schätzt der Betrieb anhand von Fotos. Deshalb fragt das Formular gleich danach."
              : "The business estimates most moves from photos. So the form asks for them right away."}</p>
          </div>
          <div className="v3-two">
            <div>
              <span className="v3-mono">{de ? "So läuft die Anfrage" : "How the enquiry works"}</span>
              <ul className="v3-plus v3-plus-lg">{enquiry.map((g) => <li key={g}>{g}</li>)}</ul>
            </div>
            <div>
              <span className="v3-mono">{de ? "Ausprobieren" : "Try it"}</span>
              <p className="v3-landing-text">
                {de ? "Das Formular steht auf jeder Seite und " : "The form is on every page and "}
                <a className="v3-link" href={`${LIVE_URL}/anfrage/`} target="_blank" rel="noopener noreferrer">{de ? "als eigene Anfrageseite" : "on its own enquiry page"} ↗</a>
                {de ? ". Wer sehen will, was andere über den Betrieb schreiben, findet die " : ". To see what others write about the business, read the "}
                <a className="v3-link" href={`${LIVE_URL}/bewertungen/`} target="_blank" rel="noopener noreferrer">{de ? "Bewertungen im Wortlaut" : "reviews word for word"} ↗</a>
                {de ? ", mit Hinweis, woher sie stammen." : ", with a note on where they come from."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-f-ablauf">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">04 / {de ? "Vorgehen" : "Process"}</span>
            <h2 id="h-f-ablauf">{de ? <>Vom Fragebogen<br />zum <span className="o">Launch</span></> : <>From questionnaire<br />to <span className="o">launch</span></>}</h2>
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

      <section className="v3-sec" aria-labelledby="h-f-tech">
        <div className="v3-wrap v3-extras v3-extras-top">
          <span className="v3-mono">05 / Tech</span>
          <div>
            <h2 id="h-f-tech" className="v3-sr">Tech-Stack</h2>
            <table><tbody>{stack.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table>
          </div>
        </div>
      </section>

      <ClosingCta lang={lang} ask={de ? "Dein Betrieb als nächstes Projekt?" : "Your business as the next project?"} />
    </div>
  );
}
