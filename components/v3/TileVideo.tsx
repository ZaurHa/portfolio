'use client';
import { useEffect, useRef } from 'react';

/** Stummes Vorschau-Video über dem Standbild einer Projekt-Kachel: lädt erst im Sichtbereich, läuft nur dort und nicht, wenn der Bereich pausiert ist (TileVideoToggle). */
export default function TileVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const area = video?.closest<HTMLElement>('[data-tile-videos]');
    if (!video || !area) return;
    let visible = false;
    const sync = () => {
      if (visible && !area.classList.contains('is-paused')) video.play().catch(() => {});
      else video.pause();
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.25 });
    const mo = new MutationObserver(sync);
    io.observe(video);
    mo.observe(area, { attributes: true, attributeFilter: ['class'] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={(e) => e.currentTarget.classList.add('is-playing')}
    />
  );
}
