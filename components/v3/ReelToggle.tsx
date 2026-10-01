'use client';
import { useEffect, useState } from 'react';

/** Pause/Play für das Showreel (WCAG 2.2.2) + automatische Pause außerhalb des Sichtbereichs. */
export default function ReelToggle({ target, pauseLabel, playLabel }: { target: string; pauseLabel: string; playLabel: string }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    el.classList.toggle('is-paused', paused);
  }, [paused, target]);

  useEffect(() => {
    const el = document.getElementById(target);
    const track = el?.querySelector<HTMLElement>('.v3-reel-track');
    if (!el || !track) return;
    const io = new IntersectionObserver(([entry]) => {
      track.style.animationPlayState = entry.isIntersecting ? '' : 'paused';
    });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <button type="button" className="v3-reel-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
      {paused ? `▶ ${playLabel}` : `❚❚ ${pauseLabel}`}
    </button>
  );
}
