import Link from "next/link";

export const metadata = { title: "404 – Seite nicht gefunden", robots: { index: false, follow: true } };

/** Gestaltete 404 im V3-Stil (zweisprachig, da not-found keine Parameter erhält). */
export default function NotFound() {
  return (
    <div className="v3">
      <section className="v3-hero v3-page-hero v3-404">
        <div className="v3-wrap">
          <div className="v3-hero-top">
            <span className="v3-mono"><span className="v3-dot" />Fehler 404 · Error 404</span>
          </div>
          <h1 className="v3-h1 v3-h1-page">
            <span className="l">Seite</span>
            <span className="l"><span className="c">nicht</span> gefunden.</span>
          </h1>
          <div className="v3-page-hero-grid">
            <p className="v3-lead">
              Diese Adresse gibt es nicht (mehr). Vielleicht hilft dir einer dieser Wege weiter.
              <br />
              <span lang="en">This page doesn&apos;t exist. Try one of these instead.</span>
            </p>
            <div className="v3-cta-row v3-cta-end">
              <Link href="/de" className="v3-btn v3-btn-accent">Zur Startseite <span className="arr" aria-hidden="true">→</span></Link>
              <a href="tel:+491728471641" className="v3-btn v3-btn-ghost">0172 8471641</a>
            </div>
          </div>
          <nav className="v3-facts" aria-label="Wichtige Seiten">
            <div><span className="v3-mono">Leistungen</span><Link className="v" href="/de/leistungen">Preise ab 490 € →</Link></div>
            <div><span className="v3-mono">Designs</span><Link className="v" href="/muster">Vorlagen ansehen →</Link></div>
            <div><span className="v3-mono">Projekte</span><Link className="v" href="/de/projekte">Referenzen →</Link></div>
            <div><span className="v3-mono">Kontakt</span><Link className="v" href="/de/kontakt">Anfrage senden →</Link></div>
          </nav>
        </div>
      </section>
    </div>
  );
}
