'use client';
import { useEffect, useState } from 'react';

/** Pause/Play für die Kachel-Videos (WCAG 2.2.2). Startet pausiert bei „Bewegung reduzieren“ oder Datensparmodus. */
export default function TileVideoToggle({ target, pauseLabel, playLabel }: { target: string; pauseLabel: string; playLabel: string }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    document.getElementById(target)?.classList.toggle('is-paused', paused);
  }, [paused, target]);

  // Muss nach dem Effekt oben laufen, damit die Klasse schon steht, bevor die Videos ihren Sichtbereich prüfen.
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      document.getElementById(target)?.classList.add('is-paused');
      setPaused(true);
    }
  }, [target]);

  return (
    <button type="button" className="v3-reel-toggle" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>
      {paused ? `▶ ${playLabel}` : `❚❚ ${pauseLabel}`}
    </button>
  );
}
