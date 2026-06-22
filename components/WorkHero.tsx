"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, MotionConfig } from "framer-motion";

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
};

const ACCENT = "#00ffe7";

// Echte Projekte als Showcase-Stack (kann niemand kopieren = einzigartig + Proof)
const SHOWCASE = [
  { src: "/images/mrg-tlogistik-preview.png", label: "MRG-Logistik",
    top: "30%", left: "2%", rotate: -7, z: 1, w: "62%", badge: null as string | null },
  { src: "/images/beauty-praxis-mockup.webp", label: "Zaira Beauty Face",
    top: "4%", left: "20%", rotate: 4, z: 3, w: "66%", badge: "Top 3 · Google" },
  { src: "/images/mobilwerk-preview.png", label: "Mobilwerk",
    top: "58%", left: "44%", rotate: -3, z: 2, w: "46%", badge: null },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function WorkHero({
  eyebrow, line1, line2, line2Highlight, subline,
  ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref,
}: WorkHeroProps) {
  return (
    <MotionConfig reducedMotion="user">
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

      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto",
        padding: "clamp(5rem,11vh,8rem) clamp(1.25rem,5vw,4rem) clamp(3rem,7vh,5rem)",
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(2rem,5vw,4rem)" }}>

        {/* Text */}
        <div style={{ flex: "1 1 360px", minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease }}
            style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13,
              color: ACCENT, border: `1px solid ${ACCENT}4d`, borderRadius: 999,
              padding: "5px 13px", marginBottom: 22, letterSpacing: "0.02em" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT,
              boxShadow: `0 0 8px ${ACCENT}` }} />
            {eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            style={{ fontSize: "clamp(2.3rem,5.6vw,4.4rem)", fontWeight: 700, lineHeight: 1.05,
              letterSpacing: "-0.03em", color: "#fff", margin: 0 }}>
            {line1} {line2}{" "}
            <span style={{ color: ACCENT }}>{line2Highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.22 }}
            style={{ fontSize: "clamp(1rem,1.6vw,1.25rem)", color: "rgba(255,255,255,0.66)",
              lineHeight: 1.55, margin: "18px 0 0", maxWidth: 520 }}>
            {subline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.34 }}
            style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            <Link href={ctaPrimaryHref} style={{ background: ACCENT, color: "#04140f", fontWeight: 700,
              padding: "0.9rem 1.8rem", borderRadius: 11, textDecoration: "none",
              fontSize: "clamp(0.92rem,1.3vw,1.05rem)", display: "inline-flex", alignItems: "center",
              gap: 8, boxShadow: `0 10px 34px ${ACCENT}40` }}>
              {ctaPrimary} →
            </Link>
            <Link href={ctaSecondaryHref} style={{ background: "rgba(255,255,255,0.06)", color: "#fff",
              border: "1px solid rgba(255,255,255,0.18)", fontWeight: 600, padding: "0.9rem 1.8rem",
              borderRadius: 11, textDecoration: "none", fontSize: "clamp(0.92rem,1.3vw,1.05rem)" }}>
              {ctaSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Showcase-Stack: echte Projekte */}
        <div style={{ flex: "1 1 360px", minWidth: 300, position: "relative",
          height: "clamp(300px,42vw,440px)" }}>
          {SHOWCASE.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 40, scale: 0.92, rotate: p.rotate }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: p.rotate }}
              transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.14 }}
              style={{ position: "absolute", top: p.top, left: p.left, width: p.w, zIndex: p.z }}>
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #28332d",
                  boxShadow: "0 22px 50px rgba(0,0,0,0.6)", background: "#0c100e" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "7px 10px",
                  background: "#11161300", borderBottom: "1px solid #1a221e" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a322d" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a322d" }} />
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2a322d" }} />
                  <span style={{ marginLeft: "auto", fontSize: 10, color: "#5f6e66" }}>{p.label}</span>
                </div>
                <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
                  <Image src={p.src} alt={p.label} fill sizes="(max-width:768px) 70vw, 35vw"
                    style={{ objectFit: "cover" }} />
                  {p.badge && (
                    <span style={{ position: "absolute", top: 8, right: 8, fontSize: 10.5,
                      fontWeight: 700, color: "#04140f", background: "#84ff7d", borderRadius: 6,
                      padding: "3px 8px" }}>
                      {p.badge}
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </MotionConfig>
  );
}
