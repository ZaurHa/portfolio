"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneHandle, Site } from "./hero3d/scene";

// Echte Kundenseiten (Schleifen aus public/videos, aufgenommen mit scripts/hero-videos)
const LAPTOP: Site[] = [
  { domain: "dpfkat.de", src: "/videos/dpfkat-hero.mp4" },
  { domain: "mrg-logistik.de", src: "/videos/mrg-hero.mp4" },
  { domain: "umzug-flott.de", src: "/videos/flott-umzug-hero.mp4" },
  { domain: "ip-logistikgmbh.de", src: "/videos/ip-logistik-hero.mp4" },
  { domain: "mogashal.com", src: "/videos/mogashal-hero.mp4" },
];
const PHONE: Site = { domain: "zairabeauty.de", src: "/videos/zaira-mobil.mp4" };

// Hat sich der Besucher schon gerührt (Maus, Tippen, Scrollen, Taste)? Bleibt bei Seitenwechseln erhalten.
let geruehrt = false;
const SIGNALE = ["pointermove", "pointerdown", "touchstart", "wheel", "scroll", "keydown"] as const;

/**
 * 3D-Bühne im Hero: zuerst ein Standbild (zählt für den ersten Eindruck und für Geräte ohne schnelle Grafik).
 * three.js lädt erst, wenn sich der Besucher rührt und die Bühne zu sehen ist („import on interaction“):
 * Das Laden der Seite bleibt so frei von schwerer Arbeit. Die lebende Szene blendet dann über das
 * deckungsgleiche Standbild. Läuft nur sichtbar, nie bei „Bewegung reduzieren“ oder Datensparmodus.
 */
export default function Hero3D({ alt, liveLabel }: { alt: string; liveLabel: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [site, setSite] = useState("");

  useEffect(() => {
    const el = stage.current;
    const h = host.current;
    if (!el || !h) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData || !("WebGL2RenderingContext" in window)) return;

    let handle: SceneHandle | null = null;
    let cancelled = false;
    let started = false;
    let visible = false;
    let stageBottom = 1;
    let idle = 0;
    const update = () => handle?.setActive(visible && document.visibilityState === "visible");
    const measure = () => {
      stageBottom = Math.max(1, el.getBoundingClientRect().bottom + window.scrollY);
    };
    // Scroll-Fortschritt durch den Hero: 0 oben, 1 wenn die Bühne aus dem Bild ist (Laptop klappt etwas zu, Geräte drehen mit)
    const onScroll = () => handle?.setScroll(window.scrollY / stageBottom);
    const onResize = () => {
      measure();
      onScroll();
    };

    const start = () => {
      idle = 0;
      if (started || cancelled || !geruehrt || !visible || document.visibilityState !== "visible") return;
      started = true;
      import("./hero3d/scene")
        .then(({ startScene }) =>
          startScene(h, { laptopSites: LAPTOP, phoneSite: PHONE, onReady: () => setReady(true), onSite: setSite, cancelled: () => cancelled }),
        )
        .then((hd) => {
          if (!hd) return; // keine schnelle Grafik: Standbild bleibt
          if (cancelled) return hd.dispose();
          handle = hd;
          measure();
          update();
          onScroll();
        })
        .catch(() => {});
    };
    // Im Leerlauf starten, damit die Eingabe, die den Start auslöst, nicht wartet (Safari kennt requestIdleCallback nicht)
    const hasIdle = typeof (window as { requestIdleCallback?: unknown }).requestIdleCallback === "function";
    const schedule = () => {
      if (started || idle || !geruehrt || !visible) return;
      idle = hasIdle ? window.requestIdleCallback(start, { timeout: 1500 }) : window.setTimeout(start, 200);
    };
    const onSignal = () => {
      SIGNALE.forEach((t) => window.removeEventListener(t, onSignal));
      geruehrt = true;
      schedule();
    };
    if (!geruehrt) SIGNALE.forEach((t) => window.addEventListener(t, onSignal, { passive: true }));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
      schedule();
    }, { threshold: 0.05 });
    io.observe(el);
    const onVisibility = () => {
      update();
      schedule();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelled = true;
      if (idle) {
        if (hasIdle) window.cancelIdleCallback(idle);
        else window.clearTimeout(idle);
      }
      SIGNALE.forEach((t) => window.removeEventListener(t, onSignal));
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={stage} className={`v3-stage3d${ready ? " is-ready" : ""}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- statischer Export ohne Bildoptimierung: zwei feste Größen, Handys laden die kleine */}
      <img
        src="/images/hero-3d-poster.webp"
        srcSet="/images/hero-3d-poster-720.webp 720w, /images/hero-3d-poster.webp 1144w"
        sizes="(max-width: 960px) 100vw, 48vw"
        width={1144}
        height={916}
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className="v3-stage3d-poster"
      />
      <div ref={host} className="v3-stage3d-canvas" aria-hidden="true" />
      {ready && site && (
        <span className="v3-stage3d-live v3-mono" aria-hidden="true"><span className="v3-dot" />{liveLabel} {site}</span>
      )}
    </div>
  );
}
