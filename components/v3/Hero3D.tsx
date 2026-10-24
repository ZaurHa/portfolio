"use client";

import Image from "next/image";
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

function webglOk() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * 3D-Bühne im Hero: zuerst ein Standbild (zählt für den ersten Eindruck und für Geräte ohne WebGL),
 * danach lädt three.js im Leerlauf nach und blendet die lebende Szene darüber. Läuft nur sichtbar,
 * nie bei „Bewegung reduzieren“ oder Datensparmodus.
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
    if (reduced || saveData || !webglOk()) return;

    let handle: SceneHandle | null = null;
    let cancelled = false;
    let visible = false;
    const update = () => handle?.setActive(visible && document.visibilityState === "visible");
    // Scroll-Fortschritt durch den Hero: 0 oben, 1 wenn die Bühne aus dem Bild ist (Laptop klappt etwas zu, Geräte drehen mit)
    const onScroll = () => {
      if (!handle) return;
      const r = el.getBoundingClientRect();
      handle.setScroll(window.scrollY / Math.max(1, r.bottom + window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    }, { threshold: 0.05 });
    io.observe(el);
    document.addEventListener("visibilitychange", update);

    const start = () => {
      import("./hero3d/scene")
        .then(({ startScene }) => {
          if (cancelled) return;
          handle = startScene(h, { laptopSites: LAPTOP, phoneSite: PHONE, onReady: () => setReady(true), onSite: setSite });
          update();
          onScroll();
        })
        .catch(() => {});
    };
    // Safari kennt requestIdleCallback nicht: dann kurz nach dem Laden starten
    const hasIdle = typeof (window as { requestIdleCallback?: unknown }).requestIdleCallback === "function";
    const idle = hasIdle ? window.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("scroll", onScroll);
      handle?.dispose();
    };
  }, []);

  return (
    <div ref={stage} className={`v3-stage3d${ready ? " is-ready" : ""}`}>
      <Image src="/images/hero-3d-poster.webp" alt={alt} fill sizes="(max-width: 960px) 100vw, 48vw" priority className="v3-stage3d-poster" />
      <div ref={host} className="v3-stage3d-canvas" aria-hidden="true" />
      {ready && site && (
        <span className="v3-stage3d-live v3-mono" aria-hidden="true"><span className="v3-dot" />{liveLabel} {site}</span>
      )}
    </div>
  );
}
