import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";
import PageHero from "../../../components/v3/PageHero";
import ClosingCta from "../../../components/v3/ClosingCta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/projekte", title: "Web Design Projects & References", description: "BrandWerkX references: websites for a beauty studio in Geretsried, a logistics company, a moving business and trades – plus an own social app." })
    : pageMetadata({ lang, path: "/projekte", title: "Webdesign Referenzen & Projekte", description: "Referenzen von BrandWerkX: Websites für ein Kosmetikstudio in Geretsried, eine Spedition, einen Umzugsbetrieb und das Handwerk – plus eine eigene Social-App." });
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
  href: string;
  cta: string;
  external?: boolean;
  live?: boolean;
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
      image: "/images/mrg-tlogistik-preview.png",
      alt: de ? "Website MRG Trans & Logistik GmbH" : "MRG Trans & Logistik GmbH website",
      bar: "mrg-logistik.de",
      href: "https://mrg-logistik.de",
      cta: de ? "Website ansehen" : "View website",
      external: true,
      live: true,
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
      image: "/images/mobilwerk-preview.png",
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
      image: "/images/serlo-preview.png",
      alt: de ? "Social-App Serlo" : "Serlo social app",
      bar: "serlo.ch",
      href: "https://serlo.ch",
      cta: de ? "serlo.ch ansehen" : "View serlo.ch",
      external: true,
      live: true,
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
      image: "/images/klempner-preview.png",
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

  return (
    <div className="v3">
      <PageHero
        meta={de ? "Projekte · Referenzen" : "Projects · References"}
        metaRight={<b>{de ? "05 Projekte · seit 2024" : "05 projects · since 2024"}</b>}
        title={de
          ? <><span className="l">Gebaut.</span><span className="l"><span className="c">Live.</span> <span className="o">Im Einsatz.</span></span></>
          : <><span className="l">Built.</span><span className="l"><span className="c">Live.</span> <span className="o">In use.</span></span></>}
        lead={de
          ? "Vom Kosmetikstudio in Geretsried bis zur Spedition: Jede Website ist auf den Betrieb und seine Kunden zugeschnitten – und läuft im echten Alltag."
          : "From a beauty studio in Geretsried to a logistics company: every website is built around the business and its customers – and runs in real day-to-day use."}
        actions={<Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">{de ? "Eigenes Projekt starten" : "Start your project"} <span className="arr" aria-hidden="true">→</span></Link>}
        facts={[
          { label: de ? "Projekte" : "Projects", value: "05" },
          { label: de ? "Branchen" : "Industries", value: de ? "Kosmetik · Logistik · Transport · Handwerk" : "Beauty · Logistics · Transport · Trades" },
          { label: de ? "Dabei seit" : "Since", value: "2024" },
          { label: de ? "Ansprechpartner" : "Contact", value: de ? "Einer – von Anfang bis Ende" : "One – start to finish" },
        ]}
      />

      <section className="v3-sec v3-sec-tight" aria-label={de ? "Projektliste" : "Project list"}>
        <div className="v3-wrap">
          {projects.map((p, i) => (
            <article key={p.slug} className={`v3-case${i % 2 === 1 ? " is-flip" : ""}`} id={p.slug}>
              <Link
                href={p.href}
                className="v3-case-media"
                {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={`${p.title} – ${p.cta}`}
              >
                <div className="v3-frame v3-frame-static">
                  <div className="bar"><i /><i /><i /><span>{p.bar}</span></div>
                  <div className="img">
                    <Image src={p.image} alt={p.alt} fill sizes="(max-width: 960px) 100vw, 56vw" priority={i === 0} />
                  </div>
                </div>
              </Link>
              <div className="v3-case-body">
                <div className="v3-case-top">
                  <span className="v3-case-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="v3-mono">{p.year} · {p.place}</span>
                </div>
                <span className={`v3-chip${p.live ? " live" : ""}`}>{p.kind}</span>
                <h2 className="v3-case-title">{p.title}</h2>
                <p className="v3-case-desc">{p.desc}</p>
                <ul className="v3-plus">{p.done.map((d) => <li key={d}>{d}</li>)}</ul>
                <div className="v3-case-stack v3-mono">{p.stack.join(" · ")}</div>
                <Link
                  href={p.href}
                  className="v3-link"
                  {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {p.cta} <span className="arr" aria-hidden="true">{p.external ? "↗" : "→"}</span>
                </Link>
              </div>
            </article>
          ))}
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
