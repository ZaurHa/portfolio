"use client";

import Link from "next/link";

const berufe = [
  {
    slug: "klempner",
    title: "Klempner",
    emoji: "🔧",
    description: "6 Designs · SEO-optimiert für Berlin",
    versionen: 6,
    tag: "Demo verfügbar",
    tagColor: "#00ffe7",
  },
  // Weitere Berufe können hier ergänzt werden:
  // { slug: "elektriker", title: "Elektriker", emoji: "⚡", description: "Demnächst", versionen: 0 },
];

export default function MusterIndex() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fff",
        fontFamily: "'Inter', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "60px 24px",
      }}
    >
      {/* Back to main site */}
      <div style={{ width: "100%", maxWidth: 900, marginBottom: 32 }}>
        <Link
          href="/de"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: "#555",
            fontSize: 13,
            fontWeight: 500,
            textDecoration: "none",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#00ffe7")}
          onMouseLeave={e => (e.currentTarget.style.color = "#555")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Zurück zu brandwerkx.de
        </Link>
      </div>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ color: "#00ffe7", fontSize: 13, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
          brandwerkx.de · Website-Muster
        </p>
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 800,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          Design-Muster
        </h1>
        <p style={{ color: "#888", fontSize: 16, marginTop: 16, maxWidth: 420, lineHeight: 1.6 }}>
          Wählen Sie eine Branche, um die fertigen Website-Designs zu vergleichen und die beste Version auszuwählen.
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
          width: "100%",
          maxWidth: 900,
        }}
      >
        {berufe.map((beruf) => (
          <Link
            key={beruf.slug}
            href={`/muster/${beruf.slug}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: "#111",
                border: "1px solid #222",
                borderRadius: 16,
                padding: "32px 28px",
                cursor: "pointer",
                transition: "border-color 0.2s, transform 0.2s",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#00ffe7";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#222";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              {/* Tag */}
              {beruf.tag && (
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: beruf.tagColor + "22",
                    color: beruf.tagColor,
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    padding: "3px 8px",
                    borderRadius: 4,
                    border: `1px solid ${beruf.tagColor}44`,
                  }}
                >
                  {beruf.tag}
                </span>
              )}

              {/* Emoji */}
              <div style={{ fontSize: 36, marginBottom: 16 }}>{beruf.emoji}</div>

              {/* Title */}
              <h2
                style={{
                  margin: "0 0 8px",
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  color: "#fff",
                }}
              >
                {beruf.title}
              </h2>

              {/* Description */}
              <p style={{ color: "#888", fontSize: 14, margin: "0 0 20px", lineHeight: 1.5 }}>
                {beruf.description}
              </p>

              {/* Versions count */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 13,
                  color: "#555",
                }}
              >
                {Array.from({ length: beruf.versionen }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: i === beruf.versionen - 1 ? "#00ffe7" : "#333",
                    }}
                  />
                ))}
                <span style={{ marginLeft: 4 }}>{beruf.versionen} Versionen</span>
              </div>

              {/* Arrow */}
              <div
                style={{
                  marginTop: 24,
                  color: "#00ffe7",
                  fontSize: 13,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Designs anzeigen →
              </div>
            </div>
          </Link>
        ))}

        {/* Placeholder card for coming soon */}
        <div
          style={{
            background: "#0d0d0d",
            border: "1px dashed #1e1e1e",
            borderRadius: 16,
            padding: "32px 28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 220,
            color: "#333",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>＋</div>
          <p style={{ margin: 0, fontSize: 14 }}>Neue Branche<br />demnächst</p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: 64, display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: "#333" }}>
        <Link href="/de" style={{ color: "#444", textDecoration: "none" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#00ffe7")}
          onMouseLeave={e => (e.currentTarget.style.color = "#444")}
        >brandwerkx.de</Link>
        <span>·</span>
        <span>Webdesign für Handwerksbetriebe</span>
      </div>
    </div>
  );
}
