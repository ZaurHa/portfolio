"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Blöcke, die beim Scrollen sanft hereingleiten. Was beim Laden schon zu sehen ist, bleibt unangetastet
// (kein Einfluss auf den ersten Eindruck und auf LCP). Ohne JavaScript oder bei „Bewegung reduzieren“
// passiert gar nichts: Die Klassen setzt nur dieses Skript.
const ZIELE = [
  ".v3-sec-head", ".v3-case", ".v3-tile", ".v3-board", ".v3-extras", ".v3-about",
  ".v3-quote", ".v3-faq", ".v3-links > *", ".v3-ki-card", ".v3-rules > *", ".v3-chance", ".v3-compare-wrap",
  ".v3-chance-band", ".v3-final .v3-wrap > *", ".v3-preise > *", ".v3-katalog-fam", ".v3-foerder", ".v3-ru-vorteile > *",
].join(", ");
// Ablauf: Die Linie zieht sich durch, die Schritte gehen nacheinander an (Choreografie im CSS)
const LINIEN = ".v3-steps";

/** Ist das Element samt Eltern gerade wirklich zu sehen (nicht noch unsichtbar am Einblenden)? */
function schonZuSehen(el: HTMLElement) {
  let o = 1;
  for (let n: HTMLElement | null = el; n && n !== document.body; n = n.parentElement) o *= Number(getComputedStyle(n).opacity);
  return o > 0.05;
}

/** Zahl von 0 hochzählen. Ändert nur den Inhalt des vorhandenen Textknotens (ein neuer Knoten würde als neues LCP-Element zählen). */
function hochzaehlen(el: HTMLElement) {
  const node = el.firstChild;
  const ziel = Number(el.dataset.countTo);
  const stellen = el.dataset.countPad ? Number(el.dataset.countPad) : 0;
  if (!node || !Number.isFinite(ziel)) return;
  const t0 = performance.now();
  const schritt = (now: number) => {
    const p = Math.min(1, (now - t0) / 1300);
    node.nodeValue = String(Math.round(ziel * (1 - Math.pow(1 - p, 3)))).padStart(stellen, "0");
    if (p < 1) requestAnimationFrame(schritt);
  };
  requestAnimationFrame(schritt);
}

export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const vh = window.innerHeight;
    const unterhalb = (el: HTMLElement) => el.getBoundingClientRect().top > vh * 0.92;
    const els = Array.from(document.querySelectorAll<HTMLElement>(ZIELE)).filter((el) => !el.classList.contains("rv") && unterhalb(el));
    const linien = Array.from(document.querySelectorAll<HTMLElement>(LINIEN)).filter((el) => !el.classList.contains("rv-line") && unterhalb(el));
    // Zahlen mit data-count: nur, solange sie noch nicht zu sehen waren (sonst würde eine fertige Zahl auf 0 springen)
    const zahlen = Array.from(document.querySelectorAll<HTMLElement>("[data-count]")).filter((el) => {
      const text = el.textContent?.trim() ?? "";
      if (el.dataset.countTo || !/^\d{1,5}$/.test(text) || el.childNodes.length !== 1 || el.firstChild!.nodeType !== Node.TEXT_NODE) return false;
      if (!unterhalb(el) && schonZuSehen(el)) return false;
      el.dataset.countTo = text;
      if (text.length > 1 && text.startsWith("0")) el.dataset.countPad = String(text.length);
      el.firstChild!.nodeValue = "0".padStart(text.length > 1 && text.startsWith("0") ? text.length : 1, "0");
      return true;
    });
    if (!els.length && !linien.length && !zahlen.length) return;
    els.forEach((el) => {
      const nr = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.setProperty("--rv-d", `${Math.min(nr, 5) * 70}ms`); // Geschwister leicht versetzt
      el.classList.add("rv");
    });
    linien.forEach((el) => el.classList.add("rv-line"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          if (el.dataset.countTo) hochzaehlen(el);
          else el.classList.add("rv-in");
          // Nach dem Hereingleiten die Hilfsklassen entfernen, damit eigene Übergänge (Hover, Kippen) wieder gelten
          if (el.classList.contains("rv")) {
            const verzug = parseFloat(el.style.getPropertyValue("--rv-d")) || 0;
            window.setTimeout(() => el.classList.remove("rv", "rv-in"), verzug + 900);
          }
          io.unobserve(el);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    [...els, ...linien, ...zahlen].forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      // Seitenwechsel mitten im Zählen: Endwert stehen lassen
      zahlen.forEach((el) => {
        if (el.firstChild && el.dataset.countTo) el.firstChild.nodeValue = el.dataset.countTo.padStart(Number(el.dataset.countPad ?? 0), "0");
      });
    };
  }, [pathname]);

  return null;
}
