import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "../../../lib/seo";
import ClosingCta from "../../../components/v3/ClosingCta";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "/ueber-mich", title: "About – Zaur Hatuev, Web Designer", description: "Zaur Hatuev, freelance web designer and developer from Geretsried: websites with Next.js, React and TypeScript for tradespeople, freelancers and small businesses." })
    : pageMetadata({ lang, path: "/ueber-mich", title: "Über mich – Zaur Hatuev, Webdesigner", description: "Zaur Hatuev, Freelance-Webdesigner und Entwickler aus Geretsried: Websites mit Next.js, React und TypeScript für Handwerker, Selbstständige und kleine Unternehmen." });
}

export default async function UeberMich({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const de = lang !== "en";

  const principles: [string, string][] = de
    ? [
        ["Festpreis vorab", "Du weißt vor dem Start, was es kostet. Kein Stundenzettel, keine Überraschung."],
        ["Direkter Draht", "Du sprichst immer mit mir – per Telefon, WhatsApp oder Mail. Kein Callcenter, kein Projektmanager dazwischen."],
        ["Schnell online", "Muster-Websites in 3–5 Werktagen. Weil ein Betrieb nicht monatelang auf seine Website warten sollte."],
        ["Gefunden werden", "Saubere Technik, klare Texte und lokale Signale – damit Kunden dich finden, wenn sie suchen."],
      ]
    : [
        ["Fixed price upfront", "You know the cost before we start. No timesheets, no surprises."],
        ["Direct line", "You always talk to me – by phone, WhatsApp or email. No call centre, no project manager in between."],
        ["Online fast", "Template websites in 3–5 working days. A business shouldn't wait months for its website."],
        ["Get found", "Clean tech, clear copy and local signals – so customers find you when they search."],
      ];

  const skills: [string, string][] = de
    ? [
        ["Webdesign", "Seitenaufbau, Gestaltung, Figma-Entwürfe"],
        ["Entwicklung", "Next.js, React, TypeScript, TailwindCSS"],
        ["SEO", "Technik, Inhalte, lokale Sichtbarkeit"],
        ["Betrieb", "Hosting, Domain, Wartung, Support"],
      ]
    : [
        ["Web design", "Page structure, visual design, Figma drafts"],
        ["Development", "Next.js, React, TypeScript, TailwindCSS"],
        ["SEO", "Tech, content, local visibility"],
        ["Operations", "Hosting, domain, maintenance, support"],
      ];

  const stack = ["Next.js", "React", "TypeScript", "TailwindCSS", "Figma", "Vercel", "Cloudflare", "Supabase", "React Native", "Git"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE_URL}/${lang}/ueber-mich`,
    mainEntity: { "@id": `${SITE_URL}/#zaur` },
    inLanguage: lang,
  };

  return (
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="v3-hero v3-page-hero">
        <div className="v3-wrap">
          <div className="v3-hero-top v3-rise">
            <span className="v3-mono"><span className="v3-dot" />{de ? "Über mich · Geretsried" : "About · Geretsried"}</span>
            <span className="v3-mono v3-hide-sm"><b>{de ? "Webdesigner & Entwickler" : "Web designer & developer"}</b></span>
          </div>
          <div className="v3-about-hero">
            <div>
              <h1 className="v3-h1 v3-h1-page v3-rise d1">
                <span className="l">Zaur</span>
                <span className="l"><span className="o">Hatuev.</span></span>
              </h1>
              <p className="v3-about-claim v3-rise d2">
                {de ? <>Kein Agentur-Pingpong. <em>Ein Ansprechpartner</em> – vom ersten Anruf bis zur fertigen Seite.</> : <>No agency ping-pong. <em>One point of contact</em> – from the first call to the finished site.</>}
              </p>
              <p className="v3-lead v3-rise d2">
                {de
                  ? "Ich bin Webdesigner und Entwickler aus Geretsried. Ich baue Websites für Handwerker, Selbstständige und kleine Betriebe, die keine Zeit für Webdesign haben – und betreibe mit Mobilwerk selbst einen. Ich weiß also, worauf es ankommt: schnell online, gut gefunden werden, Anfragen bekommen."
                  : "I'm a web designer and developer from Geretsried. I build websites for tradespeople, freelancers and small businesses with no time for web design – and run one myself, Mobilwerk. So I know what matters: online fast, easy to find, getting enquiries."}
              </p>
              <div className="v3-cta-row v3-rise d3">
                <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">{de ? "Schreib mir" : "Get in touch"} <span className="arr" aria-hidden="true">→</span></Link>
                <a href="https://www.linkedin.com/in/zaur-hatuev-8559b91a1/" target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">LinkedIn ↗</a>
                <a href="https://github.com/ZaurHa" target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">GitHub ↗</a>
              </div>
            </div>
            <figure className="v3-portrait v3-rise d2">
              <Image src="/images/zaur-portrait.webp" alt={de ? "Zaur Hatuev – Webdesigner aus Geretsried" : "Zaur Hatuev – web designer from Geretsried"} fill sizes="(max-width: 960px) 100vw, 40vw" priority />
              <figcaption><span>Zaur Hatuev</span><span>Geretsried</span></figcaption>
            </figure>
          </div>
          <div className="v3-facts v3-rise d3">
            <div><span className="v3-mono">{de ? "Standort" : "Based in"}</span><span className="v">Geretsried</span></div>
            <div><span className="v3-mono">{de ? "Servicegebiet" : "Service area"}</span><span className="v">{de ? "München & Oberland" : "Munich & Oberland"}</span></div>
            <div><span className="v3-mono">{de ? "Sprachen" : "Languages"}</span><span className="v">{de ? "Deutsch · Englisch · Russisch" : "German · English · Russian"}</span></div>
            <div><span className="v3-mono">{de ? "Zusammenarbeit" : "Working"}</span><span className="v">{de ? "Digital" : "Remote"}</span></div>
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-prinzip">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">01 / {de ? "Arbeitsweise" : "How I work"}</span>
            <h2 id="h-prinzip">{de ? <>Vier Regeln.<br /><span className="o">Keine</span> Ausnahmen.</> : <>Four rules.<br /><span className="o">No</span> exceptions.</>}</h2>
            <p>{de ? "So arbeite ich mit jedem Betrieb – egal ob Muster-Website oder individuelles Projekt." : "This is how I work with every business – template website or custom project."}</p>
          </div>
          <div className="v3-rules">
            {principles.map(([t, d], i) => (
              <div key={t}>
                <span className="v3-case-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-skills">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">02 / {de ? "Was ich mitbringe" : "What I bring"}</span>
            <h2 id="h-skills">{de ? <>Design, Code<br />und <span className="c">SEO.</span></> : <>Design, code<br />and <span className="c">SEO.</span></>}</h2>
            <p>{de ? "Alles, was eine Website braucht – aus einer Hand." : "Everything a website needs – from one source."}</p>
          </div>
          <div className="v3-extras v3-extras-top">
            <span className="v3-mono">{de ? "Schwerpunkte" : "Focus"}</span>
            <div>
              <table><tbody>{skills.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}</tbody></table>
              <div className="v3-stack-row">
                {stack.map((s) => <span key={s} className="v3-chip">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-proof">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">03 / {de ? "Eigene Projekte" : "Own projects"}</span>
            <h2 id="h-proof">{de ? <>Ich baue auch<br /><span className="o">für mich selbst.</span></> : <>I also build<br /><span className="o">for myself.</span></>}</h2>
            <p>{de ? "Mit Mobilwerk und der Social-App Serlo betreibe ich eigene Projekte – was dort funktioniert, kommt deinem Betrieb zugute." : "With Mobilwerk and the social app Serlo I run my own projects – what works there benefits your business."}</p>
          </div>
          <div className="v3-bento v3-bento-2">
            <a href="https://mobilwerk.vercel.app" target="_blank" rel="noopener noreferrer" className="v3-tile">
              <span className="tag">{de ? "Eigener Betrieb" : "Own business"}</span>
              <figure><Image src="/images/mobilwerk-preview.webp" alt={de ? "Website Mobilwerk" : "Mobilwerk website"} fill sizes="(max-width: 860px) 100vw, 50vw" /></figure>
              <div className="meta"><div><h3>Mobilwerk</h3><p>{de ? "Transport & Umzug" : "Moving & transport"}</p></div><span className="n">↗</span></div>
            </a>
            <a href="https://serlo.ch" target="_blank" rel="noopener noreferrer" className="v3-tile">
              <span className="tag live">{de ? "Im App Store" : "On the App Store"}</span>
              <figure><Image src="/images/serlo-preview.webp" alt={de ? "Social-App Serlo" : "Serlo social app"} fill sizes="(max-width: 860px) 100vw, 50vw" /></figure>
              <div className="meta"><div><h3>Serlo</h3><p>{de ? "Social-App: Live, Shop, Community" : "Social app: live, shop, community"}</p></div><span className="n">↗</span></div>
            </a>
          </div>
        </div>
      </section>

      <ClosingCta lang={lang} ask={de ? "Lass uns kennenlernen." : "Let's get to know each other."} />
    </div>
  );
}
