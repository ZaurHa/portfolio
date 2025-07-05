'use client';
import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const tracks = [
  {
    title: 'Wonder Where You Are',
    artist: 'HalalBeats',
    src: '/music/a.mp3',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=400&q=80',
  },
  {
    title: 'Lo-Fi Chill',
    artist: 'StreamBeats',
    src: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5c7.mp3',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=facearea&w=400&h=400&q=80',
  },
  {
    title: 'Focus Flow',
    artist: 'StreamBeats',
    src: 'https://cdn.pixabay.com/audio/2022/07/26/audio_124bfae5c7.mp3',
    cover: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=400&q=80',
  },
];

export default function MusicPlayerDemo() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ac, setAc] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const animRef = useRef<number>();

  // Audio Controls
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    playing ? audio.play() : audio.pause();
  }, [playing, current, volume]);

  // Progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const update = () => {
      setProgress(audio.currentTime);
      setDuration(audio.duration || 0);
    };
    audio.addEventListener('timeupdate', update);
    audio.addEventListener('loadedmetadata', update);
    return () => {
      audio.removeEventListener('timeupdate', update);
      audio.removeEventListener('loadedmetadata', update);
    };
  }, [current]);

  // Visualizer: Initialisierung erst beim Play-Button
  const startVisualizer = () => {
    if (ac || !audioRef.current || !canvasRef.current) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const newAc = new AudioContextClass();
    const src = newAc.createMediaElementSource(audioRef.current);
    const newAnalyser = newAc.createAnalyser();
    newAnalyser.fftSize = 64;
    src.connect(newAnalyser);
    newAnalyser.connect(newAc.destination);
    setAc(newAc);
    setAnalyser(newAnalyser);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = newAnalyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    function draw() {
      if (!canvas || !ctx) return;
      newAnalyser.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 1.5;
      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] * 0.7;
        ctx.fillStyle = `hsl(${180 + i * 3}, 80%, 60%)`;
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
      }
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
  };

  // Stoppe Visualizer bei Trackwechsel oder unmount
  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (ac) ac.close();
      setAc(null);
      setAnalyser(null);
    };
  }, [current]);

  // Track Controls
  const skip = (dir: number) => {
    setCurrent((c) => (c + dir + tracks.length) % tracks.length);
    setPlaying(false);
    setTimeout(() => setPlaying(true), 200);
  };

  // Scrub
  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const pct = Number(e.target.value);
    audio.currentTime = (pct / 100) * duration;
    setProgress(audio.currentTime);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0c] text-white px-4">
      <motion.div
        className="mx-auto flex flex-col items-center gap-8 p-8 rounded-3xl shadow-2xl"
        style={{ background: 'rgba(20,22,30,0.92)', maxWidth: 420 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Cover + Animation */}
        <motion.div
          className="w-48 h-48 rounded-full shadow-lg mb-2 flex items-center justify-center"
          style={{ background: 'radial-gradient(circle, #23232a 60%, #6ffcff22 100%)', boxShadow: '0 0 32px #6ffcff44' }}
          animate={{ rotate: playing ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
        >
          <img
            src={tracks[current].cover}
            alt={tracks[current].title}
            className="w-44 h-44 rounded-full object-cover"
            style={{ filter: playing ? 'drop-shadow(0 0 16px #6ffcff)' : 'none', transition: 'filter 0.3s' }}
          />
        </motion.div>
        {/* Titel + Artist */}
        <div className="text-center mb-2">
          <div className="text-lg font-bold tracking-wide mb-1">{tracks[current].title}</div>
          <div className="text-sm text-cyan-300 opacity-80">{tracks[current].artist}</div>
        </div>
        {/* Visualizer */}
        <canvas ref={canvasRef} width={320} height={60} className="w-full rounded-lg bg-[#18181b] mb-2" />
        {/* Controls */}
        <div className="flex items-center gap-6 mb-2">
          <button onClick={() => skip(-1)} className="hover:scale-110 transition"><span style={{fontSize:24}}>⏮️</span></button>
          <button
            onClick={() => {
              setPlaying((p) => !p);
              if (!ac) startVisualizer();
            }}
            className="bg-cyan-500 hover:bg-cyan-400 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all"
            style={{ fontSize: 32 }}
          >
            {playing ? '⏸️' : '▶️'}
          </button>
          <button onClick={() => skip(1)} className="hover:scale-110 transition"><span style={{fontSize:24}}>⏭️</span></button>
        </div>
        {/* Scrub Bar */}
        <input
          type="range"
          min={0}
          max={100}
          value={duration ? (progress / duration) * 100 : 0}
          onChange={onScrub}
          className="w-full accent-cyan-400 mb-2"
        />
        {/* Volume */}
        <div className="flex items-center gap-2 w-full">
          <span>🔉</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            className="flex-1 accent-cyan-400"
          />
          <span>🔊</span>
        </div>
        {/* Track Auswahl */}
        <div className="flex gap-2 mt-4">
          {tracks.map((t, i) => (
            <button
              key={t.title}
              onClick={() => { setCurrent(i); setPlaying(true); if (!ac) startVisualizer(); }}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${i === current ? 'bg-cyan-500 text-white' : 'bg-[#23232a] text-cyan-200 hover:bg-cyan-700'}`}
            >
              {t.title}
            </button>
          ))}
        </div>
        <audio ref={audioRef} src={tracks[current].src} preload="auto" />
      </motion.div>
      <div className="mt-10 text-center text-cyan-400 opacity-70 text-sm">
        <span>2025 – Minimalistischer 3D/Visualizer Audio Player für BrandWerkX</span>
      </div>
    </div>
  );
} 