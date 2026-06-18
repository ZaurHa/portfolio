"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export interface MusterVersion {
  id: string;
  label: string;
  description: string;
  tag?: string;
  tagColor?: string;
  src: string;
}

interface MusterShowcaseProps {
  kunde: string;
  versions: MusterVersion[];
  clientName?: string;
}

export default function MusterShowcase({ kunde, versions, clientName }: MusterShowcaseProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSelectedSheet, setShowSelectedSheet] = useState(false);
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
    const activeBtn = tabsRef.current.querySelector("[data-active='true']") as HTMLElement;
    if (activeBtn) {
      activeBtn.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
    }
  }, [active, isMobile]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((p) => Math.min(p + 1, versions.length - 1));
      if (e.key === "ArrowLeft") setActive((p) => Math.max(p - 1, 0));
      if (e.key === "Escape") setFullscreen(false);
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

  // ─── MOBILE LAYOUT ─────────────────────────────────────────────────────────
  if (isMobile) {
    const TOPBAR_H = 52;
    const TABBAR_H = 56;
    const BOTTOMBAR_H = 72;
    const previewH = typeof window !== "undefined"
      ? Math.max(window.innerHeight - TOPBAR_H - TABBAR_H - BOTTOMBAR_H, 300)
      : 500;

    return (
      <div style={{ background: "#050505", minHeight: "100vh", fontFamily: "'Inter', sans-serif", color: "#f5f6fa" }}>
        {/* ── Top bar ── */}
        <div
          style={{
            height: TOPBAR_H,
            borderBottom: "1px solid #1a1a1a",
            padding: "0 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#0a0a0a",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link
              href="/muster"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 8,
                border: "1px solid #1e1e1e",
                background: "#111",
                color: "#888",
                textDecoration: "none",
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <Link href="/de" style={{ color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
                brandwerkx
              </Link>
              <span style={{ color: "#333", fontSize: 13 }}>/</span>
              <span style={{ color: "#666", fontSize: 13 }}>{clientName || kunde}</span>
            </div>
          </div>
          <span style={{ color: "#444", fontSize: 12 }}>{active + 1} / {versions.length}</span>
        </div>

        {/* ── Tab bar ── */}
        <div
          ref={tabsRef}
          data-tabscroll=""
          style={{
            height: TABBAR_H,
            background: "#080808",
            borderBottom: "1px solid #111",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 12px",
            overflowX: "auto",
            scrollbarWidth: "none" as const,
          }}
        >
          {/* hide scrollbar in webkit */}
          <style>{`[data-tabscroll]::-webkit-scrollbar { display: none; }`}</style>
          {versions.map((v, i) => (
            <button
              key={v.id}
              data-active={active === i ? "true" : "false"}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0,
                height: 36,
                padding: "0 14px",
                borderRadius: 20,
                border: `1.5px solid ${active === i ? "#00ffe7" : "#1e1e1e"}`,
                background: active === i ? "#00ffe712" : "#0f0f0f",
                color: active === i ? "#00ffe7" : "#555",
                fontSize: 13,
                fontWeight: active === i ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {selected === i && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 2.5" stroke="#00ffe7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {v.label}
              {v.tag && (
                <span style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: v.tagColor || "#00ffe7",
                  border: `1px solid ${v.tagColor || "#00ffe7"}`,
                  borderRadius: 3,
                  padding: "1px 4px",
                  letterSpacing: "0.06em",
                }}>
                  {v.tag}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Mobile iframe — full native width so responsive CSS activates ── */}
        <div
          style={{
            width: "100%",
            height: previewH,
            overflow: "hidden",
            position: "relative",
            background: "#fff",
          }}
        >
          {/* Loading / Error overlay */}
          {(loading || loadError) && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#050505",
                zIndex: 10,
              }}
            >
              {loadError ? (
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>⚠️</div>
                  <p style={{ color: "#666", fontSize: 13, marginBottom: 12 }}>Design konnte nicht geladen werden.</p>
                  <button
                    onClick={() => {
                      setLoadError(false);
                      setLoading(true);
                      const iframe = iframeRef.current;
                      if (iframe) iframe.src = versions[active].src;
                    }}
                    style={{
                      background: "#111",
                      border: "1px solid #333",
                      borderRadius: 8,
                      padding: "8px 18px",
                      color: "#aaa",
                      fontSize: 13,
                      cursor: "pointer",
                    }}
                  >
                    Nochmal versuchen
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      border: "2px solid #111",
                      borderTop: "2px solid #00ffe7",
                      borderRadius: "50%",
                      animation: "spin 0.8s linear infinite",
                      margin: "0 auto 10px",
                    }}
                  />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <p style={{ color: "#444", fontSize: 12 }}>Lade Design...</p>
                </div>
              )}
            </div>
          )}

          {/* Native-width iframe — HTML's responsive CSS activates properly */}
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
            style={{
              width: "100%",
              height: previewH,
              border: "none",
              display: "block",
              pointerEvents: "auto",
            }}
            title={current.label}
          />
        </div>

        {/* ── Bottom CTA bar ── */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            height: BOTTOMBAR_H,
            background: "#0a0a0a",
            borderTop: "1px solid #1a1a1a",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            zIndex: 40,
          }}
        >
          {/* Version info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#f5f6fa", fontFamily: "'Space Grotesk', sans-serif", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {current.label}
            </div>
            <div style={{ fontSize: 11, color: "#555", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {current.description}
            </div>
          </div>

          {/* Select button */}
          <button
            onClick={() => {
              setSelected(active);
              setShowSelectedSheet(true);
            }}
            style={{
              flexShrink: 0,
              height: 44,
              padding: "0 18px",
              borderRadius: 10,
              border: `1.5px solid ${selected === active ? "#00ffe7" : "#333"}`,
              background: selected === active ? "#00ffe7" : "transparent",
              color: selected === active ? "#000" : "#aaa",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
              whiteSpace: "nowrap",
            }}
          >
            {selected === active ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l3.5 3.5L12 3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Ausgewählt
              </>
            ) : "Wählen →"}
          </button>
        </div>

        {/* ── Selected bottom sheet ── */}
        {showSelectedSheet && selected !== null && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            {/* Backdrop */}
            <div
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
              onClick={() => setShowSelectedSheet(false)}
            />
            {/* Sheet */}
            <div
              style={{
                position: "relative",
                background: "#0f0f0f",
                borderTop: "1px solid #00ffe730",
                borderRadius: "20px 20px 0 0",
                padding: "24px 24px 40px",
              }}
            >
              {/* Drag handle */}
              <div style={{ width: 36, height: 4, background: "#222", borderRadius: 2, margin: "0 auto 20px" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: "#00ffe710", border: "1px solid #00ffe730",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M3 9l4.5 4.5L15 4" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#00ffe7", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {versions[selected].label} gewählt
                  </div>
                  <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
                    Bestätige deine Auswahl per E-Mail
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "#555", margin: "0 0 20px", lineHeight: 1.5 }}>
                Zaur setzt dein gewähltes Design für dich um. Schick ihm eine kurze Nachricht zur Bestätigung.
              </p>

              <a
                href={`mailto:brandwerkx@gmail.com?subject=Design-Auswahl%20${encodeURIComponent(clientName || kunde)}&body=Hallo%20Zaur%2C%0A%0Aich%20habe%20mich%20für%20${encodeURIComponent(versions[selected]?.label || "")}%20entschieden.`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  width: "100%",
                  height: 52,
                  background: "#00ffe7",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 12,
                  textDecoration: "none",
                  marginBottom: 12,
                }}
              >
                Auswahl per E-Mail bestätigen →
              </a>

              <button
                onClick={() => setShowSelectedSheet(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: 44,
                  background: "transparent",
                  border: "1px solid #1a1a1a",
                  borderRadius: 12,
                  color: "#555",
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Schließen
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ─── DESKTOP LAYOUT (unchanged) ────────────────────────────────────────────
  return (
    <div
      style={{
        background: "#050505",
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#f5f6fa",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          borderBottom: "1px solid #1a1a1a",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0a0a0a",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link
            href="/muster"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "1px solid #1e1e1e",
              background: "#111",
              color: "#888",
              textDecoration: "none",
              flexShrink: 0,
            }}
            title="Zurück zu Muster-Übersicht"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/de"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: "-0.5px",
              color: "#fff",
              textDecoration: "none",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00ffe7")}
            onMouseLeave={e => (e.currentTarget.style.color = "#fff")}
          >
            brandwerkx
          </Link>
          <span style={{ color: "#333", fontSize: 14 }}>/</span>
          <Link
            href="/muster"
            style={{ color: "#666", fontSize: 14, textDecoration: "none" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#aaa")}
            onMouseLeave={e => (e.currentTarget.style.color = "#666")}
          >
            Muster
          </Link>
          <span style={{ color: "#333", fontSize: 14 }}>/</span>
          <span style={{ color: "#888", fontSize: 14 }}>{clientName || kunde}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ color: "#555", fontSize: 13 }}>
            {active + 1} / {versions.length}
          </span>
          <button
            onClick={() => setFullscreen(!fullscreen)}
            style={{
              background: "#141414",
              border: "1px solid #222",
              borderRadius: 8,
              padding: "6px 14px",
              color: "#aaa",
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {fullscreen ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 1H1v4M9 1h4v4M1 9v4h4M13 9v4H9" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Verkleinern
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 5V1h4M9 1h4v4M5 13H1V9M13 9v4H9" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Vollbild
              </>
            )}
          </button>
        </div>
      </div>

      <div style={{ display: "flex", height: fullscreen ? "calc(100vh - 57px)" : "auto" }}>
        {/* Sidebar */}
        {!fullscreen && (
          <aside
            style={{
              width: 260,
              minWidth: 260,
              borderRight: "1px solid #111",
              background: "#080808",
              padding: "24px 0",
              height: "calc(100vh - 57px)",
              overflowY: "auto",
              position: "sticky",
              top: 57,
            }}
          >
            <div style={{ padding: "0 16px 16px", color: "#555", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 }}>
              Versionen
            </div>
            {versions.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActive(i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "12px 16px",
                  background: active === i ? "#0f1f1f" : "transparent",
                  borderLeft: `3px solid ${active === i ? "#00ffe7" : "transparent"}`,
                  border: "none",
                  borderRight: "none",
                  borderTop: "none",
                  borderBottom: "1px solid #0e0e0e",
                  cursor: "pointer",
                  transition: "background 0.15s",
                  display: "block",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: active === i ? "#00ffe7" : "#ccc",
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    {v.label}
                  </span>
                  {v.tag && (
                    <span
                      style={{
                        fontSize: 10,
                        padding: "2px 7px",
                        borderRadius: 4,
                        border: `1px solid ${v.tagColor || "#00ffe7"}`,
                        color: v.tagColor || "#00ffe7",
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {v.tag}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#555", margin: 0, lineHeight: 1.4 }}>
                  {v.description}
                </p>
                {selected === i && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: "4px 10px",
                      background: "#00ffe710",
                      borderRadius: 6,
                      fontSize: 11,
                      color: "#00ffe7",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#00ffe7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Ausgewählt
                  </div>
                )}
              </button>
            ))}

            {selected !== null && (
              <div
                style={{
                  margin: "16px",
                  padding: "16px",
                  background: "#00ffe708",
                  border: "1px solid #00ffe720",
                  borderRadius: 10,
                }}
              >
                <div style={{ fontSize: 12, color: "#00ffe7", fontWeight: 600, marginBottom: 6 }}>
                  ✓ {versions[selected].label} gewählt
                </div>
                <p style={{ fontSize: 11, color: "#555", margin: "0 0 12px" }}>
                  Deine Auswahl wurde gespeichert. Schreib mir und ich setze es um.
                </p>
                <a
                  href={`mailto:brandwerkx@gmail.com?subject=Design-Auswahl%20${encodeURIComponent(clientName || kunde)}&body=Ich%20habe%20mich%20für%20${encodeURIComponent(versions[selected]?.label || "")}%20entschieden.`}
                  style={{
                    display: "block",
                    background: "#00ffe7",
                    color: "#000",
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "8px 12px",
                    borderRadius: 7,
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Auswahl bestätigen →
                </a>
              </div>
            )}
          </aside>
        )}

        {/* Main preview area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {!fullscreen && (
            <div
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid #111",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#060606",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 18,
                      fontWeight: 700,
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#f5f6fa",
                    }}
                  >
                    {current.label}
                  </h2>
                  {current.tag && (
                    <span
                      style={{
                        fontSize: 11,
                        padding: "3px 9px",
                        borderRadius: 5,
                        border: `1px solid ${current.tagColor || "#00ffe7"}`,
                        color: current.tagColor || "#00ffe7",
                        fontWeight: 700,
                        letterSpacing: 0.5,
                      }}
                    >
                      {current.tag}
                    </span>
                  )}
                </div>
                <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555" }}>
                  {current.description}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button
                  onClick={() => setActive((p) => Math.max(p - 1, 0))}
                  disabled={active === 0}
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: 8,
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: active === 0 ? "not-allowed" : "pointer",
                    opacity: active === 0 ? 0.3 : 1,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setActive((p) => Math.min(p + 1, versions.length - 1))}
                  disabled={active === versions.length - 1}
                  style={{
                    background: "#111",
                    border: "1px solid #222",
                    borderRadius: 8,
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: active === versions.length - 1 ? "not-allowed" : "pointer",
                    opacity: active === versions.length - 1 ? 0.3 : 1,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={() => setSelected(active)}
                  style={{
                    background: selected === active ? "#00ffe7" : "transparent",
                    border: `1px solid ${selected === active ? "#00ffe7" : "#333"}`,
                    borderRadius: 8,
                    padding: "8px 20px",
                    color: selected === active ? "#000" : "#aaa",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {selected === active ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l3.5 3.5L12 3" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Ausgewählt
                    </>
                  ) : (
                    "Diese Version wählen"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* iframe preview */}
          <div style={{ flex: 1, position: "relative", background: "#000" }}>
            {(loading || loadError) && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#050505",
                  zIndex: 10,
                }}
              >
                {loadError ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
                    <p style={{ color: "#666", fontSize: 14, marginBottom: 12 }}>Design konnte nicht geladen werden.</p>
                    <button
                      onClick={() => {
                        setLoadError(false);
                        setLoading(true);
                        const iframe = iframeRef.current;
                        if (iframe) iframe.src = versions[active].src;
                      }}
                      style={{
                        background: "#111",
                        border: "1px solid #333",
                        borderRadius: 8,
                        padding: "8px 20px",
                        color: "#aaa",
                        fontSize: 13,
                        cursor: "pointer",
                      }}
                    >
                      Nochmal versuchen
                    </button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        border: "2px solid #111",
                        borderTop: "2px solid #00ffe7",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                        margin: "0 auto 12px",
                      }}
                    />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <p style={{ color: "#444", fontSize: 13 }}>Lade Design...</p>
                  </div>
                )}
              </div>
            )}

            {fullscreen && (
              <div
                style={{
                  position: "absolute",
                  bottom: 24,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(0,0,0,0.82)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid #222",
                  borderRadius: 12,
                  padding: "10px 16px",
                  boxShadow: "0 4px 32px rgba(0,0,0,0.6)",
                }}
              >
                <button
                  onClick={() => setActive((p) => Math.max(p - 1, 0))}
                  disabled={active === 0}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: active === 0 ? "not-allowed" : "pointer",
                    opacity: active === 0 ? 0.25 : 1,
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M10 3L5 8l5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div style={{ textAlign: "center", minWidth: 160 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#f5f6fa", fontFamily: "'Space Grotesk', sans-serif" }}>
                    {current.label}
                  </div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                    {active + 1} / {versions.length}
                    {current.tag && (
                      <span style={{ marginLeft: 8, color: current.tagColor || "#00ffe7", fontWeight: 700 }}>
                        ★ {current.tag}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActive((p) => Math.min(p + 1, versions.length - 1))}
                  disabled={active === versions.length - 1}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: active === versions.length - 1 ? "not-allowed" : "pointer",
                    opacity: active === versions.length - 1 ? 0.25 : 1,
                    padding: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                <div style={{ width: 1, background: "#222", height: 28, margin: "0 4px" }} />

                <button
                  onClick={() => setSelected(active)}
                  style={{
                    background: selected === active ? "#00ffe7" : "transparent",
                    border: `1px solid ${selected === active ? "#00ffe7" : "#333"}`,
                    borderRadius: 7,
                    padding: "5px 14px",
                    color: selected === active ? "#000" : "#aaa",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {selected === active ? "✓ Gewählt" : "Wählen"}
                </button>
              </div>
            )}

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
              style={{
                width: "100%",
                height: fullscreen ? "calc(100vh - 57px)" : "calc(100vh - 57px - 73px)",
                border: "none",
                display: "block",
              }}
              title={current.label}
            />
          </div>

          {!fullscreen && (
            <div
              style={{
                borderTop: "1px solid #111",
                padding: "12px 24px",
                background: "#080808",
                display: "flex",
                gap: 8,
                overflowX: "auto",
              }}
            >
              {versions.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActive(i)}
                  style={{
                    flexShrink: 0,
                    padding: "6px 16px",
                    borderRadius: 8,
                    border: `1px solid ${active === i ? "#00ffe7" : "#1a1a1a"}`,
                    background: active === i ? "#00ffe710" : "#0f0f0f",
                    color: active === i ? "#00ffe7" : "#666",
                    fontSize: 12,
                    fontWeight: active === i ? 700 : 400,
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    whiteSpace: "nowrap",
                  }}
                >
                  {selected === i && (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 2.5" stroke="#00ffe7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {v.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
