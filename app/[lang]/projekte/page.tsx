import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";
import PageHero from "../../../components/v3/PageHero";
import ClosingCta from "../../../components/v3/ClosingCta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/projekte", title: "Web Design Projects & References", description: "BrandWerkX references: websites for logistics (MRG, IP Logistik, MH Logistik), moving companies, a DPF workshop and a beauty studio – plus own apps." })
    : pageMetadata({ lang, path: "/projekte", title: "Webdesign Referenzen & Projekte", description: "Referenzen von BrandWerkX: Websites für Logistik (MRG, IP Logistik, MH Logistik), Umzugsbetriebe, eine DPF-Werkstatt und ein Kosmetikstudio – plus eigene Apps." });
}

type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  place: string;
  desc: string;
  done: string[];
  stack: string[];
  image: string;
  alt: string;
  bar: string;
  /** Ohne href (z. B. Projekt noch nicht live): Bild ohne Link, kein Button */
  href?: string;
  cta?: string;
  external?: boolean;
  live?: boolean;
  /** Belegte Kennzahlen (Quelle in resultsSource) */
  results?: { value: string; label: string; delta?: string }[];
  resultsSource?: string;
};

function getProjects(de: boolean, lang: string): Project[] {
  return [
    {
      slug: "zaira",
      title: "Zaira Beauty Face",
      kind: de ? "Kosmetikstudio · Rebranding + Website" : "Beauty studio · Rebrand + website",
      year: "2024",
      place: "Geretsried",
      desc: de
        ? "Komplettes Rebranding und neue Website für ein Kosmetikstudio in Geretsried. Strategie, Design und Entwicklung aus einer Hand – mit klarer Übersicht über Behandlungen wie Aquafacial, Microneedling und Lashlifting."
        : "Complete rebrand and new website for a beauty studio in Geretsried. Strategy, design and development from one source – with a clear overview of treatments such as Aquafacial, microneedling and lash lifting.",
      done: de ? ["Logo, Farben, Typografie", "Website mit Leistungen & Preisen", "Lokale SEO-Grundlagen"] : ["Logo, colours, typography", "Website with services & prices", "Local SEO basics"],
      stack: ["Next.js", "TailwindCSS", "Figma"],
      image: "/images/beauty-praxis-mockup.webp",
      alt: de ? "Website Zaira Beauty Face" : "Zaira Beauty Face website",
      bar: "zairabeauty.de",
      href: `/${lang}/projekte/zaira-beauty`,
      cta: de ? "Case Study lesen" : "Read case study",
      live: true,
    },
    {
      slug: "mrg",
      title: "MRG Trans & Logistik",
      kind: de ? "Logistik · B2B-Website" : "Logistics · B2B website",
      year: "2026",
      place: "B2B",
      desc: de
        ? "Professionelle B2B-Website für einen Logistik-Dienstleister: Lager, Kommissionierung und Werkvertrag klar strukturiert, dunkles Design mit 3D-Illustration."
        : "Professional B2B website for a logistics provider: warehousing, picking and contract logistics clearly structured, dark design with 3D illustration.",
      done: de ? ["B2B-Branding", "3D-Illustration", "Leistungsstruktur & Kontakt"] : ["B2B branding", "3D illustration", "Service structure & contact"],
      stack: ["Cloudflare Workers", "TypeScript", "TailwindCSS"],
      image: "/images/mrg-tlogistik-preview.webp",
      alt: de ? "Website MRG Trans & Logistik GmbH" : "MRG Trans & Logistik GmbH website",
      bar: "mrg-logistik.de",
      href: "https://mrg-logistik.de",
      cta: de ? "Website ansehen" : "View website",
      results: [
        { value: "224", label: de ? "Klicks aus Google" : "clicks from Google", delta: "+918 %" },
        { value: de ? "8.223" : "8,223", label: de ? "Impressionen in Google" : "impressions in Google", delta: "+1.374 %" },
      ],
      resultsSource: de
        ? "Quelle: Google Search Console, 29.06.–27.09.2026 im Vergleich zu den 3 Monaten davor"
        : "Source: Google Search Console, 29 Jun – 27 Sep 2026 compared with the previous 3 months",
      external: true,
      live: true,
    },
    {
      slug: "ip-logistik",
      title: "IP Logistik",
      kind: de ? "Logistik · B2B-Website" : "Logistics · B2B website",
      year: "2026",
      place: "Gütersloh",
      desc: de
        ? "B2B-Website für einen Inhouse-Logistik-Dienstleister, der ausschließlich im Werkvertrag arbeitet: sieben Leistungsseiten, ein Container-Rechner zum Ausprobieren, eine Einsatzkarte und der TÜV-Nachweis direkt auf der Startseite."
        : "B2B website for an in-house logistics provider that works exclusively under service contracts: seven service pages, a container calculator to try out, a deployment map and the TÜV certificate right on the homepage.",
      done: de ? ["Sieben Leistungsseiten + Werkvertrag erklärt", "Container-Rechner & Einsatzkarte", "TÜV-Nachweis auf der Startseite"] : ["Seven service pages + service contract explained", "Container calculator & deployment map", "TÜV certificate on the homepage"],
      stack: ["Astro", "TailwindCSS", "SEO"],
      image: "/images/ip-logistik-preview.webp",
      alt: de ? "Website IP Logistik GmbH" : "IP Logistik GmbH website",
      bar: "ip-logistikgmbh.de",
      href: "https://ip-logistikgmbh.de",
      cta: de ? "Website ansehen" : "View website",
      external: true,
      live: true,
    },
    {
      slug: "mh-logistik",
      title: "MH Logistik",
      kind: de ? "Personaldienstleister · Relaunch" : "Staffing agency · Relaunch",
      year: "2026",
      place: "Herford",
      desc: de
        ? "Relaunch für einen Personaldienstleister in der Arbeitnehmerüberlassung für Lager und Logistik: eigene Seiten für Staplerfahrer und Saisonpersonal, Nachweise wie die Erlaubnis nach § 1 AÜG und eine Jobseite für Bewerber."
        : "Relaunch for a staffing agency supplying temporary staff for warehousing and logistics: dedicated pages for forklift drivers and seasonal staff, proof such as the § 1 AÜG licence, and a jobs page for applicants.",
      done: de ? ["Seiten für Staplerfahrer & Saisonpersonal", "Nachweise: AÜ-Erlaubnis, GVP-Mitglied", "Jobseite für Bewerber"] : ["Pages for forklift drivers & seasonal staff", "Proof: AÜ licence, GVP member", "Jobs page for applicants"],
      stack: ["Astro", "TailwindCSS", "Cloudflare"],
      image: "/images/mh-logistik-preview.webp",
      alt: de ? "Website MH Logistik GmbH" : "MH Logistik GmbH website",
      bar: "mh-logistikgmbh.de",
      href: "https://mh-logistikgmbh.de",
      cta: de ? "Website ansehen" : "View website",
      external: true,
      live: true,
    },
    {
      slug: "dpfkat",
      title: "SM Team · DPF & Kat Service",
      kind: de ? "Kfz-Werkstatt · Website" : "Car workshop · Website",
      year: "2026",
      place: "Geretsried",
      desc: de
        ? "Website für die DPF- und Katalysator-Reinigung von SM Team in Geretsried: Festpreis auf den ersten Blick, echte Aufnahmen aus der eigenen Anlage und ein klarer Ablauf von der Prüfung bis zum Messprotokoll."
        : "Website for SM Team's DPF and catalytic converter cleaning in Geretsried: fixed price at first glance, real footage from their own cleaning unit and a clear process from inspection to measurement report.",
      done: de ? ["Festpreis & Ablauf auf einen Blick", "Echte Werkstatt-Videos statt Stockfotos", "Lighthouse mobil 4 × 100 zum Start"] : ["Fixed price & process at a glance", "Real workshop videos instead of stock photos", "Lighthouse mobile 4 × 100 at launch"],
      stack: ["Astro", "TailwindCSS", "Cloudflare"],
      image: "/images/dpfkat-preview.webp",
      alt: de ? "Website DPF & Kat Service von SM Team" : "SM Team DPF & catalytic converter service website",
      bar: "dpfkat.de",
      href: "https://www.dpfkat.de",
      cta: de ? "Website ansehen" : "View website",
      external: true,
      live: true,
    },
    {
      slug: "sm-umzug",
      title: "SM Team · Umzug & Transport",
      kind: de ? "Umzug · Website" : "Moving · Website",
      year: "2026",
      place: "Geretsried",
      desc: de
        ? "Website für den Umzugs- und Transportbetrieb von SM Team aus Geretsried: echte Fotos von echten Einsätzen, Google-Bewertungen direkt sichtbar und der Anruf mit einem Fingertipp."
        : "Website for SM Team's moving and transport business in Geretsried: real photos from real jobs, Google reviews in plain sight and a call just one tap away.",
      done: de ? ["Echte Einsatzfotos statt Stockbilder", "Google-Bewertungen sichtbar", "Anrufen mit einem Fingertipp"] : ["Real job photos instead of stock images", "Google reviews visible", "Call with a single tap"],
      stack: ["Astro", "TailwindCSS", "Cloudflare"],
      image: "/images/sm-umzug-preview.webp",
      alt: de ? "Website SM Team Umzug & Transport" : "SM Team moving & transport website",
      bar: "smdienstleistung.de",
      href: "https://smdienstleistung.de",
      cta: de ? "Website ansehen" : "View website",
      external: true,
      live: true,
    },
    {
      slug: "flott-umzug",
      title: "Flott Umzug",
      kind: de ? "Umzug · In Arbeit" : "Moving · In progress",
      year: "2026",
      place: "Bielefeld",
      desc: de
        ? "Neue Website für ein Umzugs- und Entrümpelungsunternehmen in Bielefeld – mit Anfrage in fünf Schritten und eigenen Seiten für jede Leistung. Die Seite ist gebaut und geht nach der Abstimmung mit dem Inhaber online."
        : "New website for a moving and house-clearance company in Bielefeld – with a five-step enquiry and a page for every service. The site is built and goes online once the owner has signed off.",
      done: de ? ["Anfrage-Formular in fünf Schritten", "Eigene Seiten pro Leistung", "Start nach Freigabe durch den Inhaber"] : ["Five-step enquiry form", "A page for every service", "Launch after owner sign-off"],
      stack: ["Astro", "TailwindCSS", "Cloudflare"],
      image: "/images/flott-umzug-preview.webp",
      alt: de ? "Vorschau der neuen Website von Flott Umzug" : "Preview of the new Flott Umzug website",
      bar: de ? "Vorschau" : "Preview",
    },
    {
      slug: "mobilwerk",
      title: "Mobilwerk",
      kind: de ? "Transport & Umzug · Eigener Betrieb" : "Moving & transport · Own business",
      year: "2026",
      place: de ? "München" : "Munich",
      desc: de
        ? "Firmen-Website für meinen eigenen Transport- und Umzugsbetrieb – Branding, Leistungen, Ablauf und Kontakt. Hier teste ich selbst, was für Handwerks- und Dienstleistungsbetriebe funktioniert."
        : "Company website for my own moving and transport business – branding, services, process and contact. This is where I test what works for trade and service businesses.",
      done: de ? ["Eigenes Branding & Logo", "Mobil-optimiert", "Anfrage per Telefon & WhatsApp"] : ["Own branding & logo", "Mobile-optimised", "Enquiries by phone & WhatsApp"],
      stack: ["Next.js", "TypeScript", "TailwindCSS"],
      image: "/images/mobilwerk-preview.webp",
      alt: de ? "Website Mobilwerk Transport & Umzug" : "Mobilwerk moving & transport website",
      bar: "mobilwerk",
      href: "https://mobilwerk.vercel.app",
      cta: de ? "Website ansehen" : "View website",
      external: true,
      live: true,
    },
    {
      slug: "serlo",
      title: "Serlo",
      kind: de ? "Eigene Social-App · iOS + Web" : "Own social app · iOS + web",
      year: "2026",
      place: "App Store",
      desc: de
        ? "Eigene Social-Media-Plattform mit Video-Feed, Live-Streaming, Geschenken und integriertem Shop – als iOS-App im App Store und als Web-App. Design, Entwicklung und Betrieb komplett aus einer Hand."
        : "Own social platform with video feed, live streaming, gifts and an integrated shop – as an iOS app on the App Store and as a web app. Design, development and operation in one hand.",
      done: de ? ["Live im App Store", "Live-Streaming, Gifts & Shop", "Web-App auf serlo.ch"] : ["Live on the App Store", "Live streaming, gifts & shop", "Web app on serlo.ch"],
      stack: ["React Native", "Next.js", "Supabase", "LiveKit"],
      image: "/images/serlo-preview.webp",
      alt: de ? "Social-App Serlo" : "Serlo social app",
      bar: "serlo.ch",
      href: "https://serlo.ch",
      cta: de ? "serlo.ch ansehen" : "View serlo.ch",
      external: true,
      live: true,
    },
    {
      slug: "berkat",
      title: "Berkat",
      kind: de ? "Eigene App · Live-Auktionen" : "Own app · Live auctions",
      year: "2026",
      place: "Beta",
      desc: de
        ? "Eigene App für Live-Auktionen: Verkäufer gehen live, das Publikum bietet in Echtzeit – der Preis entsteht vor Publikum. Mit Bezahlung über Stripe und eigenen Räumen nur für Frauen. Aktuell im geschlossenen Test."
        : "Own app for live auctions: sellers go live and the audience bids in real time – the price is set in front of an audience. With payment via Stripe and rooms just for women. Currently in closed beta.",
      done: de ? ["Live-Video mit Bieten in Echtzeit", "Bezahlung über Stripe Connect", "Im geschlossenen Test (TestFlight)"] : ["Live video with real-time bidding", "Payment via Stripe Connect", "In closed beta (TestFlight)"],
      stack: ["React Native", "Expo", "Supabase", "Stripe"],
      image: "/images/berkat-preview.webp",
      alt: de ? "Website der Live-Auktions-App Berkat" : "Website of the live auction app Berkat",
      bar: "berkat-live.pages.dev",
      href: "https://berkat-live.pages.dev",
      cta: de ? "Website ansehen" : "View website",
      external: true,
    },
    {
      slug: "klempner",
      title: de ? "Muster-Website Klempner" : "Template website: plumber",
      kind: de ? "Handwerk · Muster-Designs" : "Trades · template designs",
      year: "2025",
      place: de ? "Vorlage" : "Template",
      desc: de
        ? "Fertige Website-Designs für Klempner und Sanitärbetriebe in fünf Varianten. Du wählst ein Design, ich passe Logo, Farben und Texte an – ab 490 €, in 3–5 Werktagen online."
        : "Ready-made website designs for plumbing businesses in five variants. You pick one, I adapt logo, colours and copy – from €490, online in 3–5 working days.",
      done: de ? ["5 Designvarianten", "Mobil zuerst gebaut", "Ab 490 € Festpreis"] : ["5 design variants", "Built mobile-first", "From €490 fixed price"],
      stack: ["HTML", "CSS", "SEO"],
      image: "/images/klempner-preview.webp",
      alt: de ? "Muster-Website für einen Klempnerbetrieb" : "Template website for a plumbing business",
      bar: "muster/klempner",
      href: "/muster/klempner",
      cta: de ? "Designs ansehen" : "View designs",
    },
  ];
}

export default async function Projekte({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const de = lang !== "en";
  const projects = getProjects(de, lang);
  const count = String(projects.length).padStart(2, "0");

  return (
    <div className="v3">
      <PageHero
        meta={de ? "Projekte · Referenzen" : "Projects · References"}
        metaRight={<b>{de ? `${count} Projekte · seit 2024` : `${count} projects · since 2024`}</b>}
        title={de
          ? <><span className="l">Gebaut.</span><span className="l"><span className="c">Live.</span> <span className="o">Im Einsatz.</span></span></>
          : <><span className="l">Built.</span><span className="l"><span className="c">Live.</span> <span className="o">In use.</span></span></>}
        lead={de
          ? "Vom Kosmetikstudio und der DPF-Werkstatt in Geretsried bis zur Logistik in Hamburg und Ostwestfalen: Jede Website ist auf den Betrieb und seine Kunden zugeschnitten – und läuft im echten Alltag."
          : "From a beauty studio and a DPF workshop in Geretsried to logistics in Hamburg and East Westphalia: every website is built around the business and its customers – and runs in real day-to-day use."}
        actions={<Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">{de ? "Eigenes Projekt starten" : "Start your project"} <span className="arr" aria-hidden="true">→</span></Link>}
        facts={[
          { label: de ? "Projekte" : "Projects", value: count },
          { label: de ? "Branchen" : "Industries", value: de ? "Logistik · Umzug · Werkstatt · Kosmetik · Apps" : "Logistics · Moving · Workshop · Beauty · Apps" },
          { label: de ? "Dabei seit" : "Since", value: "2024" },
          { label: de ? "Ansprechpartner" : "Contact", value: de ? "Einer – von Anfang bis Ende" : "One – start to finish" },
        ]}
      />

      <section className="v3-sec v3-sec-tight" aria-label={de ? "Projektliste" : "Project list"}>
        <div className="v3-wrap">
          {projects.map((p, i) => {
            const frame = (
              <div className="v3-frame v3-frame-static">
                <div className="bar"><i /><i /><i /><span>{p.bar}</span></div>
                <div className="img">
                  <Image src={p.image} alt={p.alt} fill sizes="(max-width: 960px) 100vw, 56vw" priority={i === 0} />
                </div>
              </div>
            );
            return (
            <article key={p.slug} className={`v3-case${i % 2 === 1 ? " is-flip" : ""}`} id={p.slug}>
              {p.href ? (
                <Link
                  href={p.href}
                  className="v3-case-media"
                  {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={`${p.title} – ${p.cta}`}
                >
                  {frame}
                </Link>
              ) : (
                <div className="v3-case-media">{frame}</div>
              )}
              <div className="v3-case-body">
                <div className="v3-case-top">
                  <span className="v3-case-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v3-mono">{p.year} · {p.place}</span>
                </div>
                <span className={`v3-chip${p.live ? " live" : ""}`}>{p.kind}</span>
                <h2 className="v3-case-title">{p.title}</h2>
                <p className="v3-case-desc">{p.desc}</p>
                {p.results && (
                  <div className="v3-results">
                    <div className="v3-results-row">
                      {p.results.map((r) => (
                        <div key={r.label}>
                          <span className="v">{r.value}</span>
                          <span className="l">{r.label}</span>
                          {r.delta && <span className="d">{r.delta}</span>}
                        </div>
                      ))}
                    </div>
                    {p.resultsSource && <p className="v3-results-src">{p.resultsSource}</p>}
                  </div>
                )}
                <ul className="v3-plus">{p.done.map((d) => <li key={d}>{d}</li>)}</ul>
                <div className="v3-case-stack v3-mono">{p.stack.join(" · ")}</div>
                {p.href && (
                  <Link
                    href={p.href}
                    className="v3-link"
                    {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {p.cta} <span className="arr" aria-hidden="true">{p.external ? "↗" : "→"}</span>
                  </Link>
                )}
              </div>
            </article>
            );
          })}
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-proj-quote">
        <div className="v3-wrap">
          <h2 id="h-proj-quote" className="v3-sr">{de ? "Kundenstimme" : "Testimonial"}</h2>
          <figure className="v3-quote">
            <div><span className="qm" aria-hidden="true">“</span><span className="v3-mono src">MRG · {de ? "Logistik" : "Logistics"}</span></div>
            <div>
              <blockquote lang="de">Wir sind mit unserer neuen Website rundum zufrieden. BrandWerkX hat von der ersten Idee bis zum fertigen Ergebnis mitgedacht, war schnell erreichbar und alles zuverlässig umgesetzt. <mark>Absolute Empfehlung.</mark></blockquote>
              <figcaption className="v3-mono"><span><b>MRG Trans &amp; Logistik GmbH</b></span></figcaption>
            </div>
          </figure>
        </div>
      </section>

      <ClosingCta lang={lang} ask={de ? "Dein Betrieb als nächstes Projekt?" : "Your business as the next project?"} />
    </div>
  );
}
