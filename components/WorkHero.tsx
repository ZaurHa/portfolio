"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type WorkHeroProps = {
  eyebrow: string;
  line1: string;
  line2: string;
  line2Highlight: string;
  subline: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
  trustItems?: string[];
};

const ACCENT = "#00ffe7";

// Echte Projekte als Showcase-Stack (kann niemand kopieren = einzigartig + Proof)
const SHOWCASE = [
  { src: "/images/serlo-preview.png", label: "Serlo — serlo.ch",
    top: "2%", left: "-2%", rotate: -3, z: 4, w: "62%", badge: "Im App Store" as string | null },
  { src: "/images/beauty-praxis-mockup.webp", label: "Zaira Beauty Face",
    top: "20%", left: "40%", rotate: 4, z: 3, w: "58%", badge: "Top 3 · Google" },
  { src: "/images/mrg-tlogistik-preview.png", label: "MRG-Logistik",
    top: "56%", left: "4%", rotate: -7, z: 2, w: "52%", badge: null },
  { src: "/images/mobilwerk-preview.png", label: "Mobilwerk",
    top: "64%", left: "50%", rotate: 3, z: 1, w: "46%", badge: null },
];

/**
 * Einblend-Animationen laufen rein per CSS (.hero-in / .hero-card in globals.css).
 * Der HTML-Text ist damit sofort sichtbar — keine JS-Hydration nötig für den LCP.
 */
export default function WorkHero({
  eyebrow, line1, line2, line2Highlight, subline,
  ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref, trustItems,
}: WorkHeroProps) {
  // Maus-Tilt für den Showcase-Stack: direkt per ref, kein React-State (nur echte Maus)
  const stackRef = useRef<HTMLDivElement>(null);

  const handleTiltMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !stackRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    stackRef.current.style.transform = `perspective(1100px) rotateX(${-py * 6}deg) rotateY(${px * 7}deg)`;
  };
  const handleTiltLeave = () => {
    if (stackRef.current) stackRef.current.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div style={{ position: "relative", width: "100%", background: "linear-gradient(180deg, #0a0d0c 0%, #070908 65%, #050505 100%)", overflow: "hidden" }}>
      {/* Grüner Glow + feines Raster */}
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: "55vw", height: "55vw",
        maxWidth: 760, maxHeight: 760, pointerEvents: "none",
        background: `radial-gradient(circle, ${ACCENT}1f, transparent 65%)` }} />
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(circle at 70% 30%, #000, transparent 75%)",
        WebkitMaskImage: "radial-gradient(circle at 70% 30%, #000, transparent 75%)" }} />

      <div
        onPointerMove={handleTiltMove}
        onPointerLeave={handleTiltLeave}
        style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto",
        padding: "clamp(5rem,11vh,8rem) clamp(1.25rem,5vw,4rem) clamp(3rem,7vh,5rem)",
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(2rem,5vw,4rem)" }}>

        {/* Text */}
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <div className="hero-in"
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13,
              color: ACCENT, border: `1px solid ${ACCENT}4d`, borderRadius: 999,
              padding: "5px 13px", marginBottom: 22, letterSpacing: "0.02em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT,
              boxShadow: `0 0 8px ${ACCENT}` }} />
            {eyebrow}
          </div>

          {/* H1 ohne Opacity-Animation: LCP-Element ist ab dem ersten Paint sichtbar */}
          <h1 className="hero-h1"
            style={{ fontSize: "clamp(2.4rem,5.8vw,4.7rem)", fontWeight: 700, lineHeight: 1.04,
              letterSpacing: "-0.04em", color: "#fff", margin: 0 }}>
            {line1} {line2}{" "}
            <span className="serif-accent" style={{ color: ACCENT, fontSize: "1.06em",
              textShadow: `0 0 40px ${ACCENT}40` }}>{line2Highlight}</span>
          </h1>

          <p className="hero-in"
            style={{ animationDelay: "0.2s", fontSize: "clamp(1rem,1.6vw,1.25rem)", color: "rgba(255,255,255,0.66)",
              lineHeight: 1.55, margin: "18px 0 0", maxWidth: 520 }}>
            {subline}
          </p>

          <div className="hero-in"
            style={{ animationDelay: "0.3s", display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            <Link href={ctaPrimaryHref} className="hero-cta-primary" style={{
              background: `linear-gradient(180deg, #4dffee, ${ACCENT} 55%)`, color: "#04140f", fontWeight: 700,
              padding: "0.95rem 1.9rem", borderRadius: 12, textDecoration: "none",
              fontSize: "clamp(0.92rem,1.3vw,1.05rem)", display: "inline-flex", alignItems: "center",
              gap: 8, boxShadow: `0 10px 34px ${ACCENT}55, inset 0 1px 0 rgba(255,255,255,0.4)` }}>
              {ctaPrimary} →
            </Link>
            <Link href={ctaSecondaryHref} className="hero-cta-secondary" style={{ background: "rgba(255,255,255,0.05)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.16)", fontWeight: 600, padding: "0.95rem 1.9rem",
              borderRadius: 12, textDecoration: "none", fontSize: "clamp(0.92rem,1.3vw,1.05rem)",
              display: "inline-flex", alignItems: "center", gap: 8, backdropFilter: "blur(6px)" }}>
              {ctaSecondary}
            </Link>
          </div>

          {trustItems && trustItems.length > 0 && (
            <div className="hero-trust-row hero-in" style={{ animationDelay: "0.4s" }}>
              {trustItems.map((item) => (
                <span key={item}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Showcase-Stack: echte Projekte — neigt sich in 3D zur Maus */}
        <div ref={stackRef} className="hero-stack" style={{ flex: "1 1 360px", minWidth: 300, position: "relative",
          height: "clamp(340px,46vw,500px)",
          transform: "perspective(1100px) rotateX(0deg) rotateY(0deg)", transformStyle: "preserve-3d" }}>
          {SHOWCASE.map((p, i) => (
            <div
              key={p.src}
              className="hero-card"
              style={{ position: "absolute", top: p.top, left: p.left, width: p.w, zIndex: p.z,
                ["--r" as string]: `${p.rotate}deg`, animationDelay: `${0.25 + i * 0.12}s` }}>
              <div
                className="hero-float"
                style={{ animationDuration: `${5 + i}s`, borderRadius: 14, overflow: "hidden", border: "1px solid #28332d",
                  boxShadow: "0 22px 50px rgba(0,0,0,0.6)", background: "#0c100e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 10px",
                  background: "#11161300", borderBottom: "1px solid #1a221e" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a322d" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a322d" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a322d" }} />
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "#5f6e66" }}>{p.label}</span>
                </div>
                <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
                  <Image src={p.src} alt={p.label} fill priority={i === 0} sizes="(max-width:768px) 70vw, 35vw"
                    style={{ objectFit: "cover" }} />
                  {p.badge && (
                    <span style={{ position: "absolute", top: 8, right: 8, fontSize: 10.5,
                      fontWeight: 700, color: "#04140f", background: "#84ff7d", borderRadius: 6,
                      padding: "3px 8px" }}>
                      {p.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
