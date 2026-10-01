"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import Link from "next/link";

export interface MusterVersion {
  id: string;
  label: string;
  description: string;
  /** Optionaler Mono-Chip, z. B. „Empfohlen“ */
  tag?: string;
  src: string;
}

interface MusterShowcaseProps {
  kunde: string;
  versions: MusterVersion[];
  clientName?: string;
}

// ─── Kontakt / Conversion ───────────────────────────────────────────────────

export const MUSTER_PHONE_HREF = "tel:+491728471641";
export const MUSTER_PHONE_LABEL = "0172 8471641";

/** Kontakt-Link mit Paket + optionalem Design (z. B. „klempner-v3“). */
export function musterKontaktHref(design?: string) {
  const params = new URLSearchParams({ package: "muster" });
  if (design) params.set("design", design);
  return `/de/kontakt?${params.toString()}`;
}

// ─── Design-Tokens (V3) & gemeinsame Styles ─────────────────────────────────

const MUSTER_CSS = `
:root{
  --mx-bg:#0a0b0a;
  --mx-surface:#101211;
  --mx-text:#eeefee;
  --mx-muted:#a3a8a5;
  --mx-line:rgba(255,255,255,.09);
  --mx-line-strong:rgba(255,255,255,.16);
  --mx-accent:#00ffe7;
  --mx-on-accent:#021412;
  --mx-cta-h:64px;
  --mx-safe:env(safe-area-inset-bottom,0px);
}
@media (max-width:767px){ :root{ --mx-cta-h:76px; } }
html,body{ background:var(--mx-bg); }
body{ padding-bottom:calc(var(--mx-cta-h) + var(--mx-safe)); }

.mx-root{ background:var(--mx-bg); color:var(--mx-text); font-family:var(--font-inter),system-ui,sans-serif; -webkit-font-smoothing:antialiased; }
.mx-display{ font-family:var(--font-display),system-ui,sans-serif; font-weight:800; letter-spacing:-0.04em; }
.mx-label{ font-family:var(--font-mono),ui-monospace,monospace; font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--mx-muted); }

.mx-header{ position:sticky; top:0; z-index:50; height:60px; flex-shrink:0; display:flex; align-items:center; justify-content:space-between; gap:16px; padding:0 24px; background:rgba(10,11,10,.88); backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px); border-bottom:1px solid var(--mx-line); }
.mx-header-left,.mx-header-right{ display:flex; align-items:center; gap:12px; min-width:0; }
.mx-wordmark{ font-family:var(--font-display),system-ui,sans-serif; font-weight:800; letter-spacing:-0.04em; font-size:19px; color:var(--mx-text); text-decoration:none; white-space:nowrap; }
.mx-wordmark span{ color:var(--mx-accent); }
.mx-crumbs{ display:flex; align-items:center; gap:10px; min-width:0; }
.mx-crumb{ font-family:var(--font-mono),ui-monospace,monospace; font-size:12px; text-transform:uppercase; letter-spacing:.06em; color:var(--mx-muted); text-decoration:none; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
a.mx-crumb:hover{ color:var(--mx-text); }
.mx-sep{ color:rgba(255,255,255,.22); font-size:12px; }
.mx-link{ font-size:14px; color:var(--mx-muted); text-decoration:none; display:inline-flex; align-items:center; gap:6px; white-space:nowrap; transition:color .15s; }
.mx-link:hover{ color:var(--mx-accent); }

.mx-btn{ display:inline-flex; align-items:center; justify-content:center; gap:8px; height:44px; padding:0 22px; border-radius:999px; background:var(--mx-accent); color:var(--mx-on-accent); border:1px solid var(--mx-accent); font-family:inherit; font-weight:700; font-size:14px; text-decoration:none; white-space:nowrap; cursor:pointer; transition:box-shadow .15s, transform .15s; }
.mx-btn:hover{ box-shadow:0 0 0 4px rgba(0,255,231,.16); }
.mx-btn-sm{ height:36px; padding:0 16px; font-size:13px; }
.mx-btn-ghost{ background:transparent; color:var(--mx-text); border-color:var(--mx-line-strong); }
.mx-btn-ghost:hover{ border-color:var(--mx-accent); color:var(--mx-accent); box-shadow:none; }
.mx-icon-btn{ width:36px; height:36px; flex-shrink:0; border-radius:999px; border:1px solid var(--mx-line-strong); background:transparent; color:var(--mx-text); display:inline-flex; align-items:center; justify-content:center; cursor:pointer; text-decoration:none; transition:border-color .15s, color .15s; }
.mx-icon-btn:hover:not(:disabled){ border-color:var(--mx-accent); color:var(--mx-accent); }
.mx-icon-btn:disabled{ opacity:.3; cursor:not-allowed; }

.mx-chip{ display:inline-flex; align-items:center; font-family:var(--font-mono),ui-monospace,monospace; font-size:11px; line-height:1.4; text-transform:uppercase; letter-spacing:.06em; color:var(--mx-text); border:1px solid var(--mx-line-strong); border-radius:999px; padding:3px 9px; white-space:nowrap; }
.mx-chip-accent{ color:var(--mx-accent); border-color:rgba(0,255,231,.4); }

/* Conversion-Leiste */
.mx-cta{ position:fixed; left:0; right:0; bottom:0; z-index:60; box-sizing:border-box; height:calc(var(--mx-cta-h) + var(--mx-safe)); padding:0 24px var(--mx-safe); background:rgba(10,11,10,.92); backdrop-filter:blur(14px); -webkit-backdrop-filter:blur(14px); border-top:1px solid var(--mx-line); display:flex; align-items:center; justify-content:center; font-family:var(--font-inter),system-ui,sans-serif; color:var(--mx-text); }
.mx-cta-inner{ width:100%; max-width:1200px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
.mx-cta-text{ font-size:15px; line-height:1.35; min-width:0; }
.mx-cta-text strong{ color:var(--mx-accent); font-weight:700; }
.mx-cta-l2{ color:var(--mx-muted); }
.mx-cta-actions{ display:flex; align-items:center; gap:10px; flex-shrink:0; }
@media (max-width:767px){
  .mx-header{ height:52px; padding:0 12px; gap:10px; }
  .mx-hide-sm{ display:none !important; }
  .mx-cta{ padding:0 12px var(--mx-safe); }
  .mx-cta-inner{ gap:10px; }
  .mx-cta-text{ font-size:13px; }
  .mx-cta-l2{ display:block; }
  .mx-cta-dash{ display:none; }
  .mx-cta .mx-btn{ padding:0 16px; }
  .mx-tel-num{ display:none; }
  .mx-cta .mx-tel{ width:44px; padding:0; }
}

/* Showcase-App: füllt genau den Viewport über der Conversion-Leiste */
.mx-app{ height:calc(100vh - var(--mx-cta-h) - var(--mx-safe)); height:calc(100dvh - var(--mx-cta-h) - var(--mx-safe)); display:flex; flex-direction:column; overflow:hidden; }
.mx-side-item{ width:100%; text-align:left; padding:14px 20px; background:transparent; border:none; border-left:2px solid transparent; border-bottom:1px solid var(--mx-line); cursor:pointer; display:block; color:inherit; font-family:inherit; transition:background .15s; }
.mx-side-item:hover{ background:rgba(255,255,255,.03); }
.mx-side-item[data-active="true"]{ background:rgba(0,255,231,.05); border-left-color:var(--mx-accent); }
.mx-tab{ flex-shrink:0; height:36px; padding:0 14px; border-radius:999px; border:1px solid var(--mx-line-strong); background:transparent; color:var(--mx-muted); font-family:inherit; font-size:13px; font-weight:500; cursor:pointer; white-space:nowrap; display:inline-flex; align-items:center; gap:6px; transition:all .15s; }
.mx-tab[data-active="true"]{ border-color:var(--mx-accent); color:var(--mx-accent); background:rgba(0,255,231,.06); font-weight:700; }
[data-tabscroll]{ scrollbar-width:none; }
[data-tabscroll]::-webkit-scrollbar{ display:none; }
@keyframes mx-spin{ to{ transform:rotate(360deg); } }
`;

export function MusterStyles() {
  return <style dangerouslySetInnerHTML={{ __html: MUSTER_CSS }} />;
}

// ─── Icons (Linien, currentColor) ───────────────────────────────────────────

type IconProps = { size?: number };
const svgBase = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
});

export const IconChevronLeft = ({ size = 16 }: IconProps) => (
  <svg {...svgBase(size)}><path d="M15 5l-7 7 7 7" /></svg>
);
export const IconChevronRight = ({ size = 16 }: IconProps) => (
  <svg {...svgBase(size)}><path d="M9 5l7 7-7 7" /></svg>
);
export const IconPhone = ({ size = 16 }: IconProps) => (
  <svg {...svgBase(size)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
  </svg>
);
const IconExpand = ({ size = 14 }: IconProps) => (
  <svg {...svgBase(size)}><path d="M4 9V4h5M15 4h5v5M4 15v5h5M20 15v5h-5" /></svg>
);
const IconCollapse = ({ size = 14 }: IconProps) => (
  <svg {...svgBase(size)}><path d="M9 4v5H4M20 9h-5V4M4 15h5v5M15 20v-5h5" /></svg>
);
const IconAlert = ({ size = 24 }: IconProps) => (
  <svg {...svgBase(size)}><path d="M12 3l9.5 17h-19L12 3z" /><path d="M12 10v4M12 17.5v.01" /></svg>
);
export const IconWrench = ({ size = 28 }: IconProps) => (
  <svg {...svgBase(size)}>
    <path d="M14.7 6.3a4 4 0 005.2 5.2L11 20.4a2.1 2.1 0 01-3-3l8.9-8.9a4 4 0 01-2.2-2.2z" />
    <path d="M14.7 6.3L17.5 3.5a4 4 0 012.9 5.3" />
  </svg>
);
export const IconBolt = ({ size = 28 }: IconProps) => (
  <svg {...svgBase(size)}><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></svg>
);
export const IconSparkle = ({ size = 28 }: IconProps) => (
  <svg {...svgBase(size)}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
    <path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
  </svg>
);
export const IconPlus = ({ size = 24 }: IconProps) => (
  <svg {...svgBase(size)}><path d="M12 5v14M5 12h14" /></svg>
);

// ─── Kopfleiste ─────────────────────────────────────────────────────────────

export function MusterHeader({
  crumbs = [],
  children,
}: {
  crumbs?: { label: string; href?: string }[];
  /** Zusätzliche Elemente rechts (vor „Zur Hauptseite“) */
  children?: ReactNode;
}) {
  return (
    <header className="mx-header">
      <div className="mx-header-left">
        <Link href="/de" className="mx-wordmark" aria-label="BrandWerkX – Startseite">
          BrandWerk<span>X</span>
        </Link>
        {crumbs.length > 0 && (
          <nav className="mx-crumbs mx-hide-sm" aria-label="Brotkrumen">
            {crumbs.map((c) => (
              <span key={c.label} style={{ display: "contents" }}>
                <span className="mx-sep">/</span>
                {c.href ? (
                  <Link href={c.href} className="mx-crumb">{c.label}</Link>
                ) : (
                  <span className="mx-crumb" style={{ color: "var(--mx-text)" }}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
      <div className="mx-header-right">
        {children}
        <Link href="/de" className="mx-link">
          <IconChevronLeft size={14} />
          Zur Hauptseite
        </Link>
      </div>
    </header>
  );
}

// ─── Conversion-Leiste (fixiert unten) ──────────────────────────────────────

export function MusterCtaBar({ design }: { design?: string }) {
  return (
    <aside className="mx-cta" aria-label="Design anfragen">
      <div className="mx-cta-inner">
        <p className="mx-cta-text" style={{ margin: 0 }}>
          Dieses Design ab <strong>490 €</strong>
          <span className="mx-cta-dash"> – </span>
          <span className="mx-cta-l2">in 3–5 Werktagen online</span>
        </p>
        <div className="mx-cta-actions">
          <a href={MUSTER_PHONE_HREF} className="mx-btn mx-btn-ghost mx-tel" aria-label={`Anrufen: ${MUSTER_PHONE_LABEL}`}>
            <IconPhone size={16} />
            <span className="mx-tel-num">{MUSTER_PHONE_LABEL}</span>
          </a>
          <Link href={musterKontaktHref(design)} className="mx-btn">
            Design anfragen →
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ─── Lade-/Fehlerzustand ────────────────────────────────────────────────────

function LoadOverlay({ error, onRetry }: { error: boolean; onRetry: () => void }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--mx-bg)",
        zIndex: 10,
      }}
    >
      {error ? (
        <div style={{ textAlign: "center", color: "var(--mx-accent)" }}>
          <IconAlert size={28} />
          <p style={{ color: "var(--mx-muted)", fontSize: 14, margin: "12px 0 16px" }}>Design konnte nicht geladen werden.</p>
          <button type="button" onClick={onRetry} className="mx-btn mx-btn-ghost mx-btn-sm">
            Nochmal versuchen
          </button>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 28,
              height: 28,
              border: "2px solid var(--mx-line-strong)",
              borderTopColor: "var(--mx-accent)",
              borderRadius: "50%",
              animation: "mx-spin 0.8s linear infinite",
              margin: "0 auto 12px",
            }}
          />
          <p className="mx-label" style={{ margin: 0 }}>Lade Design …</p>
        </div>
      )}
    </div>
  );
}

// ─── Showcase ───────────────────────────────────────────────────────────────

export default function MusterShowcase({ kunde, versions, clientName }: MusterShowcaseProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Detect mobile — window.matchMedia is reliable on Android Chrome;
  // window.innerWidth can fire before the viewport meta tag is applied.
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Auto-scroll active tab into view
  useEffect(() => {
    if (!isMobile || !tabsRef.current) return;
    const activeBtn = tabsRef.current.querySelector("[data-active='true']") as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }, [active, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((p) => Math.min(p + 1, versions.length - 1));
      if (e.key === "ArrowLeft") setActive((p) => Math.max(p - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [versions.length]);

  // Load iframe
  useEffect(() => {
    setLoading(true);
    setLoadError(false);

    if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    loadTimeoutRef.current = setTimeout(() => {
      setLoading(false);
      setLoadError(true);
    }, 12000);

    const iframe = iframeRef.current;
    if (!iframe) return;

    const loadVersion = () => {
      try {
        if (iframe.contentWindow) {
          iframe.contentWindow.location.replace(versions[active].src);
        } else {
          iframe.src = versions[active].src;
        }
      } catch {
        iframe.src = versions[active].src;
      }
    };

    if (iframe.src && iframe.src !== "about:blank" && iframe.src !== window.location.href) {
      loadVersion();
    } else {
      iframe.src = versions[active].src;
    }

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
    };
  }, [active, versions, isMobile]);

  const current = versions[active];
  const designId = `${kunde}-${current.id}`;
  const kontaktHref = musterKontaktHref(designId);
  const prev = () => setActive((p) => Math.max(p - 1, 0));
  const next = () => setActive((p) => Math.min(p + 1, versions.length - 1));

  const retry = () => {
    setLoadError(false);
    setLoading(true);
    const iframe = iframeRef.current;
    if (iframe) iframe.src = versions[active].src;
  };

  const iframeEl = (
    <iframe
      ref={iframeRef}
      onLoad={() => {
        if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
        setLoading(false);
        setLoadError(false);
      }}
      onError={() => {
        if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
        setLoading(false);
        setLoadError(true);
      }}
      style={{ width: "100%", height: "100%", border: "none", display: "block", background: "#fff" }}
      title={current.label}
    />
  );

  // ─── MOBILE LAYOUT ─────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <MusterStyles />
        <div className="mx-root mx-app">
          <MusterHeader crumbs={[{ label: "Muster", href: "/muster" }, { label: clientName || kunde }]} />

          {/* Tab bar */}
          <div
            ref={tabsRef}
            data-tabscroll=""
            style={{
              height: 56,
              flexShrink: 0,
              borderBottom: "1px solid var(--mx-line)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 12px",
              overflowX: "auto",
            }}
          >
            <Link href="/muster" className="mx-icon-btn" aria-label="Zurück zur Muster-Übersicht">
              <IconChevronLeft size={14} />
            </Link>
            {versions.map((v, i) => (
              <button
                key={v.id}
                type="button"
                className="mx-tab"
                data-active={active === i ? "true" : "false"}
                onClick={() => setActive(i)}
              >
                {v.label}
                {v.tag && <span className="mx-chip mx-chip-accent" style={{ fontSize: 10, padding: "1px 6px" }}>{v.tag}</span>}
              </button>
            ))}
          </div>

          {/* Preview — native Breite, damit das responsive CSS der Demo greift */}
          <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
            {(loading || loadError) && <LoadOverlay error={loadError} onRetry={retry} />}
            {iframeEl}
          </div>
        </div>
        <MusterCtaBar design={designId} />
      </>
    );
  }

  // ─── DESKTOP LAYOUT ────────────────────────────────────────────────────────
  return (
    <>
      <MusterStyles />
      <div className="mx-root mx-app">
        <MusterHeader crumbs={[{ label: "Muster", href: "/muster" }, { label: clientName || kunde }]}>
          <span className="mx-label">
            {active + 1} / {versions.length}
          </span>
          <button type="button" onClick={() => setFullscreen(!fullscreen)} className="mx-btn mx-btn-ghost mx-btn-sm">
            {fullscreen ? <IconCollapse /> : <IconExpand />}
            {fullscreen ? "Verkleinern" : "Vollbild"}
          </button>
        </MusterHeader>

        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          {/* Sidebar */}
          {!fullscreen && (
            <aside
              style={{
                width: 280,
                minWidth: 280,
                borderRight: "1px solid var(--mx-line)",
                overflowY: "auto",
                paddingBottom: 16,
              }}
            >
              <div className="mx-label" style={{ padding: "20px 20px 12px" }}>
                Versionen · {versions.length}
              </div>
              {versions.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  className="mx-side-item"
                  data-active={active === i ? "true" : "false"}
                  onClick={() => setActive(i)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: active === i ? "var(--mx-accent)" : "var(--mx-text)",
                      }}
                    >
                      {v.label}
                    </span>
                    {v.tag && <span className="mx-chip mx-chip-accent" style={{ fontSize: 10, padding: "2px 7px" }}>{v.tag}</span>}
                  </div>
                  <p style={{ fontSize: 12, color: "var(--mx-muted)", margin: 0, lineHeight: 1.45 }}>
                    {v.description}
                  </p>
                </button>
              ))}
            </aside>
          )}

          {/* Main preview area */}
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            {!fullscreen && (
              <div
                style={{
                  padding: "14px 24px",
                  borderBottom: "1px solid var(--mx-line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexShrink: 0,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <h2 className="mx-display" style={{ margin: 0, fontSize: 20, lineHeight: 1.2 }}>
                      {current.label}
                    </h2>
                    {current.tag && <span className="mx-chip mx-chip-accent">{current.tag}</span>}
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--mx-muted)" }}>
                    {current.description}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                  <button type="button" onClick={prev} disabled={active === 0} className="mx-icon-btn" aria-label="Vorherige Version">
                    <IconChevronLeft />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={active === versions.length - 1}
                    className="mx-icon-btn"
                    aria-label="Nächste Version"
                  >
                    <IconChevronRight />
                  </button>
                  <Link href={kontaktHref} className="mx-btn mx-btn-ghost mx-btn-sm">
                    Diese Version wählen
                  </Link>
                </div>
              </div>
            )}

            {/* iframe preview */}
            <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
              {(loading || loadError) && <LoadOverlay error={loadError} onRetry={retry} />}

              {fullscreen && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 20,
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "rgba(10,11,10,.88)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--mx-line-strong)",
                    borderRadius: 999,
                    padding: "6px 6px 6px 10px",
                    boxShadow: "0 8px 32px rgba(0,0,0,.5)",
                  }}
                >
                  <button type="button" onClick={prev} disabled={active === 0} className="mx-icon-btn" aria-label="Vorherige Version">
                    <IconChevronLeft />
                  </button>
                  <div style={{ textAlign: "center", minWidth: 170 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{current.label}</div>
                    <div className="mx-label" style={{ fontSize: 11, marginTop: 2 }}>
                      {active + 1} / {versions.length}
                      {current.tag && <span style={{ marginLeft: 8, color: "var(--mx-accent)" }}>{current.tag}</span>}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={next}
                    disabled={active === versions.length - 1}
                    className="mx-icon-btn"
                    aria-label="Nächste Version"
                  >
                    <IconChevronRight />
                  </button>
                  <Link href={kontaktHref} className="mx-btn mx-btn-sm">
                    Wählen
                  </Link>
                </div>
              )}

              {iframeEl}
            </div>
          </div>
        </div>
      </div>
      <MusterCtaBar design={designId} />
    </>
  );
}
