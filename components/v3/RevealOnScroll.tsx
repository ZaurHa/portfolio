"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Blöcke, die beim Scrollen sanft hereingleiten. Was beim Laden schon zu sehen ist, bleibt unangetastet
// (kein Einfluss auf den ersten Eindruck und auf LCP). Ohne JavaScript oder bei „Bewegung reduzieren“
// passiert gar nichts: Die Klassen setzt nur dieses Skript.
const ZIELE = [
  ".v3-sec-head", ".v3-case", ".v3-tile", ".v3-board", ".v3-extras", ".v3-steps > *", ".v3-about",
  ".v3-quote", ".v3-faq", ".v3-links > *", ".v3-ki-card", ".v3-rules > *", ".v3-chance", ".v3-compare-wrap",
  ".v3-chance-band", ".v3-final .v3-wrap > *",
].join(", ");

export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>(ZIELE)).filter(
      (el) => !el.classList.contains("rv") && el.getBoundingClientRect().top > vh * 0.92,
    );
    if (!els.length) return;
    els.forEach((el) => {
      const nr = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.setProperty("--rv-d", `${Math.min(nr, 5) * 70}ms`); // Geschwister leicht versetzt
      el.classList.add("rv");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("rv-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
