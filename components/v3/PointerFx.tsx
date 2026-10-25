"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Kleine Maus-Effekte (nur mit Maus oder Trackpad, nie bei „Bewegung reduzieren“):
 * - [data-glow]: Lichtschein folgt dem Mauszeiger (CSS-Variablen --mx/--my)
 * - [data-magnet]: Knopf zieht leicht zum Mauszeiger (eigene translate-Eigenschaft)
 * - [data-tilt]: Kachel kippt in 3D zum Mauszeiger, mit wanderndem Glanz; [data-tilt="glanz"]: nur der Glanz, ohne Kippen
 */
export default function PointerFx() {
  const pathname = usePathname();

  useEffect(() => {
    const fein = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fein || ruhig) return;
    const aufraeumen: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>("[data-glow]").forEach((el) => {
      let raf = 0;
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
          el.classList.add("is-glow");
        });
      };
      const leave = () => el.classList.remove("is-glow");
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      aufraeumen.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); });
    });

    document.querySelectorAll<HTMLElement>("[data-magnet], .v3-page-hero .v3-btn-accent").forEach((el) => {
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        el.style.translate = `${(dx * 7).toFixed(1)}px ${(dy * 5).toFixed(1)}px`;
      };
      const leave = () => { el.style.translate = ""; };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      aufraeumen.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); el.style.translate = ""; });
    });

    document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
      let raf = 0;
      const move = (e: PointerEvent) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          if (el.dataset.tilt !== "glanz") {
            el.style.setProperty("--tilt-x", `${((0.5 - py) * 7).toFixed(2)}deg`);
            el.style.setProperty("--tilt-y", `${((px - 0.5) * 9).toFixed(2)}deg`);
          }
          el.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
          el.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
          el.classList.add("is-tilt");
        });
      };
      const leave = () => {
        cancelAnimationFrame(raf);
        el.classList.remove("is-tilt");
        el.style.removeProperty("--tilt-x");
        el.style.removeProperty("--tilt-y");
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      aufraeumen.push(() => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerleave", leave); cancelAnimationFrame(raf); });
    });

    return () => aufraeumen.forEach((f) => f());
  }, [pathname]);

  return null;
}
