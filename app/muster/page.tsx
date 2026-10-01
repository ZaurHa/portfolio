import Link from "next/link";
import {
  MusterStyles,
  MusterHeader,
  MusterCtaBar,
  IconWrench,
  IconBolt,
  IconSparkle,
  IconPlus,
} from "../../components/MusterShowcase";
import { kundenConfig } from "./kunden";

// Metadaten für /muster kommen aus app/muster/layout.tsx.

const icons = { wrench: IconWrench, bolt: IconBolt, sparkle: IconSparkle };

const PAGE_CSS = `
.mx-card{ display:block; position:relative; height:100%; box-sizing:border-box; padding:28px; border-radius:20px; background:var(--mx-surface); border:1px solid var(--mx-line); text-decoration:none; color:var(--mx-text); transition:border-color .2s, transform .2s; }
.mx-card:hover{ border-color:rgba(0,255,231,.5); transform:translateY(-2px); }
.mx-card:hover .mx-card-cta{ color:var(--mx-accent); }
.mx-card-cta{ margin-top:24px; font-size:14px; font-weight:600; color:var(--mx-text); transition:color .2s; }
.mx-dots{ display:flex; align-items:center; gap:6px; }
.mx-dot{ width:6px; height:6px; border-radius:50%; background:rgba(255,255,255,.18); }
.mx-dot-on{ background:var(--mx-accent); }
.mx-foot a{ color:var(--mx-muted); text-decoration:none; }
.mx-foot a:hover{ color:var(--mx-accent); }
`;

export default function MusterIndex() {
  const berufe = Object.entries(kundenConfig);

  return (
    <div className="mx-root" style={{ minHeight: "100vh" }}>
      <MusterStyles />
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />

      <MusterHeader crumbs={[{ label: "Muster" }]} />

      <main style={{ maxWidth: 1040, margin: "0 auto", padding: "72px 16px 64px" }}>
        {/* Intro */}
        <div style={{ maxWidth: 640, marginBottom: 48 }}>
          <p className="mx-label" style={{ margin: "0 0 16px", color: "var(--mx-accent)" }}>
            Website-Muster · ab 490 €
          </p>
          <h1
            className="mx-display"
            style={{ fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1.02, margin: 0 }}
          >
            Fertige Designs für Handwerk &amp; Studios.
          </h1>
          <p style={{ color: "var(--mx-muted)", fontSize: 17, lineHeight: 1.6, margin: "20px 0 0" }}>
            Wähl deine Branche, vergleich die Versionen und such dir deinen Favoriten aus. Ich passe ihn an
            dein Unternehmen an — in 3–5 Werktagen ist deine Website online.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
            gap: 16,
          }}
        >
          {berufe.map(([slug, b]) => {
            const Icon = icons[b.icon];
            const count = b.versions.length;
            return (
              <Link key={slug} href={`/muster/${slug}`} className="mx-card">
                {b.tag && (
                  <span className="mx-chip" style={{ position: "absolute", top: 20, right: 20 }}>
                    {b.tag}
                  </span>
                )}
                <div style={{ color: "var(--mx-accent)", marginBottom: 20 }}>
                  <Icon size={28} />
                </div>
                <h2 className="mx-display" style={{ margin: "0 0 8px", fontSize: 26, lineHeight: 1.1 }}>
                  {b.title}
                </h2>
                <p style={{ color: "var(--mx-muted)", fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>
                  {count} Designs · {b.teaser}
                </p>
                <div className="mx-dots">
                  {Array.from({ length: count }).map((_, i) => (
                    <span key={i} className={i === count - 1 ? "mx-dot mx-dot-on" : "mx-dot"} />
                  ))}
                  <span className="mx-label" style={{ marginLeft: 6 }}>
                    {count} Versionen
                  </span>
                </div>
                <div className="mx-card-cta">Designs ansehen →</div>
              </Link>
            );
          })}

          {/* Platzhalter */}
          <div
            style={{
              border: "1px dashed var(--mx-line-strong)",
              borderRadius: 20,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 220,
              color: "var(--mx-muted)",
              textAlign: "center",
            }}
          >
            <IconPlus size={24} />
            <p style={{ margin: "12px 0 0", fontSize: 14, lineHeight: 1.5 }}>
              Deine Branche fehlt?
              <br />
              Ich baue dir ein passendes Design.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mx-foot mx-label"
          style={{ marginTop: 64, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}
        >
          <Link href="/de">brandwerkx.de</Link>
          <span>·</span>
          <span>Webdesign aus Geretsried für München &amp; Oberland</span>
        </div>
      </main>

      <MusterCtaBar />
    </div>
  );
}
