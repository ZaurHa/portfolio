"use client";

import { useEffect, useRef, useState } from "react";

/** true, wenn das Element beim Laden unterhalb des sichtbaren Bereichs liegt. */
function isBelowFold(el: Element | null) {
  if (!el) return false;
  return el.getBoundingClientRect().top > window.innerHeight * 0.95;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Animierte Zahlen (Counter). Server-HTML enthält den Endwert (für Nutzer ohne JS, Suchmaschinen, KI).
export function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(end);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // Nur zählen, wenn die Zahl erst durch Scrollen sichtbar wird — sonst kein Sprung 0 → Endwert
    if (prefersReducedMotion() || !isBelowFold(ref.current)) return;
    setCount(0);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// Fade-in bei Scroll. Inhalt ist im Server-HTML sichtbar; nur Abschnitte unterhalb des
// ersten Bildschirms werden nach der Hydration versteckt und beim Scrollen eingeblendet.
export function FadeInSection({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion() || !isBelowFold(ref.current)) return;
    setVisible(false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
