import Link from "next/link";

export default function Impressum() {
  return (
    <div className="legal-page">
      <div className="legal-inner">
        <Link href="/" className="legal-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Zurück
        </Link>

        <h1 className="legal-title">Impressum</h1>
        <p className="legal-updated">Angaben gemäß § 5 TMG</p>

        <div className="legal-section">
          <h2>Verantwortlich</h2>
          <p>Zaur Hatuev<br />Steiner Ring 64<br />82538 Geretsried<br />Deutschland</p>
        </div>

        <div className="legal-section">
          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:zaur@brandwerkx.de">zaur@brandwerkx.de</a><br />
            Website: <a href="https://brandwerkx.de" target="_blank" rel="noopener noreferrer">https://brandwerkx.de</a>
          </p>
        </div>

        <div className="legal-section">
          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Zaur Hatuev<br />Steiner Ring 64<br />82538 Geretsried</p>
        </div>

        <div className="legal-section">
          <h2>Haftungsausschluss</h2>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte
            externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </div>

        <div className="legal-footer-links">
          <Link href="/datenschutz">Datenschutzerklärung</Link>
          <Link href="/agb">AGB</Link>
        </div>
      </div>
    </div>
  );
}
