"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef, useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], weight: '700' });

// ── Globe radius constants ───────────────────────────────────────────────────
const R_DESK  = 1.12;   // larger on desktop
const R_MOB   = 0.56;

function useR() {
  return typeof window !== 'undefined' && window.innerWidth < 700 ? R_MOB : R_DESK;
}

// ── Geo helpers ──────────────────────────────────────────────────────────────
function ll2v(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -Math.sin(phi) * Math.cos(theta) * r,
     Math.cos(phi) * r,
     Math.sin(phi) * Math.sin(theta) * r,
  );
}

// Decode world-atlas TopoJSON → flat Float32Array of line-segment vertices
function decodeTopoLines(topo: any, r: number): Float32Array {
  const { scale, translate } = topo.transform as { scale: [number,number], translate: [number,number] };
  const decoded: [number,number][][] = (topo.arcs as number[][][]).map(arc => {
    let x = 0, y = 0;
    return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * scale[0] + translate[0], y * scale[1] + translate[1]] as [number,number]; });
  });

  const pts: number[] = [];
  const addArc = (idx: number) => {
    const arc = idx < 0 ? [...decoded[~idx]].reverse() : decoded[idx];
    for (let i = 0; i < arc.length - 1; i++) {
      const [lng0, lat0] = arc[i], [lng1, lat1] = arc[i + 1];
      const v0 = ll2v(lat0, lng0, r), v1 = ll2v(lat1, lng1, r);
      pts.push(v0.x, v0.y, v0.z, v1.x, v1.y, v1.z);
    }
  };

  for (const g of (topo.objects.countries?.geometries ?? topo.objects.land?.geometries ?? [])) {
    if (g.type === 'Polygon')      for (const ring of g.arcs) for (const idx of ring) addArc(idx);
    if (g.type === 'MultiPolygon') for (const poly of g.arcs) for (const ring of poly) for (const idx of ring) addArc(idx);
  }
  return new Float32Array(pts);
}

// ── City data ────────────────────────────────────────────────────────────────
const CITIES = [
  { name: 'München',   lat: 48.14, lng: 11.58,  home: true  },
  { name: 'London',    lat: 51.51, lng: -0.13,  home: false },
  { name: 'New York',  lat: 40.71, lng: -74.01, home: false },
  { name: 'Tokyo',     lat: 35.68, lng: 139.69, home: false },
  { name: 'Dubai',     lat: 25.20, lng: 55.27,  home: false },
  { name: 'Singapore', lat:  1.35, lng: 103.82, home: false },
  { name: 'São Paulo', lat:-23.55, lng: -46.63, home: false },
];

// ── Globe sphere ─────────────────────────────────────────────────────────────
function GlobeSphere({ r }: { r: number }) {
  const matRef = useRef<THREE.MeshLambertMaterial>(null);
  return (
    <>
      {/* Key light — warm from upper-left */}
      <pointLight position={[-r * 2.2, r * 2.0, r * 2.2]} intensity={1.8} color="#a0d4ff" />
      {/* Fill light — soft cyan from right */}
      <pointLight position={[r * 2.8, 0, r * 1.5]} intensity={0.9} color="#00ffe7" />
      {/* Rim light — deep blue from behind */}
      <pointLight position={[0, -r * 1.8, -r * 2.4]} intensity={0.6} color="#2255cc" />
      <mesh renderOrder={0}>
        <sphereGeometry args={[r, 64, 64]} />
        <meshLambertMaterial ref={matRef} color="#061a15" />
      </mesh>
    </>
  );
}

// ── Atmosphere glow ──────────────────────────────────────────────────────────
function Atmosphere({ r }: { r: number }) {
  const mat1 = useRef<THREE.MeshBasicMaterial>(null);
  const mat2 = useRef<THREE.MeshBasicMaterial>(null);
  const mat3 = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (mat1.current) mat1.current.opacity = 0.22 + Math.sin(t * 0.55) * 0.07;
    if (mat2.current) mat2.current.opacity = 0.10 + Math.sin(t * 0.38 + 1.0) * 0.04;
    if (mat3.current) mat3.current.opacity = 0.04 + Math.sin(t * 0.25 + 2.1) * 0.02;
  });
  return (
    <>
      {/* Inner halo */}
      <mesh renderOrder={1}>
        <sphereGeometry args={[r * 1.045, 64, 64]} />
        <meshBasicMaterial ref={mat1} color="#00ffe7" transparent opacity={0.22}
          blending={THREE.AdditiveBlending} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      {/* Mid blue layer */}
      <mesh renderOrder={1}>
        <sphereGeometry args={[r * 1.10, 64, 64]} />
        <meshBasicMaterial ref={mat2} color="#1a44cc" transparent opacity={0.10}
          blending={THREE.AdditiveBlending} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      {/* Outer corona */}
      <mesh renderOrder={1}>
        <sphereGeometry args={[r * 1.28, 64, 64]} />
        <meshBasicMaterial ref={mat3} color="#00ffe7" transparent opacity={0.04}
          blending={THREE.AdditiveBlending} side={THREE.BackSide} depthWrite={false} />
      </mesh>
      {/* Deep outer glow ring */}
      <mesh renderOrder={1}>
        <sphereGeometry args={[r * 1.55, 32, 32]} />
        <meshBasicMaterial color="#0033aa" transparent opacity={0.025}
          blending={THREE.AdditiveBlending} side={THREE.BackSide} depthWrite={false} />
      </mesh>
    </>
  );
}

// ── Country border lines ─────────────────────────────────────────────────────
function CountryLines({ positions }: { positions: Float32Array | null }) {
  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#00ffe7', transparent: true, opacity: 0.28,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }), []);

  const obj = useMemo(() => {
    if (!positions) return null;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return new THREE.LineSegments(geo, mat);
  }, [positions, mat]);

  useFrame(({ clock }) => {
    mat.opacity = 0.22 + Math.sin(clock.getElapsedTime() * 0.22) * 0.06;
  });

  return obj ? <primitive object={obj} renderOrder={2} /> : null;
}

// ── City dots with pulse ──────────────────────────────────────────────────────
function CityDots({ r }: { r: number }) {
  const dotMats   = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const ringMesh  = useRef<THREE.Mesh | null>(null);
  const ringMat   = useRef<THREE.MeshBasicMaterial | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // Munich dot brightness pulse
    if (dotMats.current[0]) dotMats.current[0].opacity = 0.85 + Math.sin(t * 2.8) * 0.15;
    // Other cities gentle pulse
    for (let i = 1; i < CITIES.length; i++) {
      if (dotMats.current[i]) dotMats.current[i]!.opacity = 0.55 + Math.sin(t * 1.4 + i * 0.9) * 0.25;
    }
    // Expanding ring
    if (ringMesh.current && ringMat.current) {
      const phase = (t * 0.85) % 1;
      ringMesh.current.scale.setScalar(1 + phase * 3.5);
      ringMat.current.opacity = Math.max(0, 0.65 * (1 - phase));
    }
  });

  return (
    <>
      {CITIES.map((city, i) => {
        const pos  = ll2v(city.lat, city.lng, r + 0.006);
        const size = city.home ? 0.020 : 0.013;
        return (
          <group key={city.name} position={pos} renderOrder={4}>
            {/* Core */}
            <mesh>
              <sphereGeometry args={[size, 12, 12]} />
              <meshBasicMaterial
                ref={m => { dotMats.current[i] = m; }}
                color={city.home ? '#00ffe7' : '#aaeeff'}
                transparent opacity={city.home ? 0.98 : 0.75}
                blending={THREE.AdditiveBlending} depthWrite={false}
              />
            </mesh>
            {/* Inner glow halo */}
            <mesh>
              <sphereGeometry args={[size * 2.2, 10, 10]} />
              <meshBasicMaterial color={city.home ? '#00ffe7' : '#44bbff'}
                transparent opacity={city.home ? 0.18 : 0.10}
                blending={THREE.AdditiveBlending} depthWrite={false}
              />
            </mesh>
            {/* Outer soft halo */}
            <mesh>
              <sphereGeometry args={[size * 4.5, 10, 10]} />
              <meshBasicMaterial color={city.home ? '#00ffe7' : '#2299cc'}
                transparent opacity={city.home ? 0.07 : 0.04}
                blending={THREE.AdditiveBlending} depthWrite={false}
              />
            </mesh>
            {/* Expanding pulse ring (Munich only) */}
            {city.home && (
              <mesh
                ref={m => { ringMesh.current = m; }}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[size * 1.3, size * 2.0, 32]} />
                <meshBasicMaterial
                  ref={m => { ringMat.current = m; }}
                  color="#00ffe7" transparent opacity={0.4}
                  blending={THREE.AdditiveBlending} side={THREE.DoubleSide} depthWrite={false}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </>
  );
}

// ── Connection arcs ───────────────────────────────────────────────────────────
function ConnectionArcs({ r }: { r: number }) {
  const munich = CITIES[0];

  const { lines, mats } = useMemo(() => {
    const mats: THREE.LineBasicMaterial[] = [];
    const lines = CITIES.slice(1).map((city, i) => {
      const from = ll2v(munich.lat, munich.lng, r);
      const to   = ll2v(city.lat,  city.lng,   r);
      const lift = r * (1.30 + i * 0.02);
      const mid  = from.clone().add(to).normalize().multiplyScalar(lift);
      const geo  = new THREE.BufferGeometry().setFromPoints(
        new THREE.QuadraticBezierCurve3(from, mid, to).getPoints(90)
      );
      const mat  = new THREE.LineBasicMaterial({
        color: '#00ffe7', transparent: true, opacity: 0.18,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      mats.push(mat);
      return new THREE.Line(geo, mat);
    });
    return { lines, mats };
  }, [r]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mats.forEach((mat, i) => { mat.opacity = 0.18 + Math.sin(t * 0.55 + i * 1.05) * 0.12; });
  });

  return <>{lines.map((l, i) => <primitive key={i} object={l} renderOrder={3} />)}</>;
}

// ── Traveler dots on arcs ─────────────────────────────────────────────────────
function ArcTravelers({ r }: { r: number }) {
  const munich = CITIES[0];
  const curves = useMemo(() =>
    CITIES.slice(1).map(city => {
      const from = ll2v(munich.lat, munich.lng, r);
      const to   = ll2v(city.lat,  city.lng,   r);
      const mid  = from.clone().add(to).normalize().multiplyScalar(r * 1.32);
      return new THREE.QuadraticBezierCurve3(from, mid, to);
    }), [r]);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const offsets  = useMemo(() => curves.map((_, i) => i / curves.length), [curves]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.28;
    curves.forEach((curve, i) => {
      const m = meshRefs.current[i];
      if (!m) return;
      const phase = (t + offsets[i]) % 1;
      const pt = curve.getPoint(phase);
      m.position.set(pt.x, pt.y, pt.z);
      (m.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(phase * Math.PI) * 0.5;
    });
  });

  return (
    <>
      {curves.map((_, i) => (
        <mesh key={i} ref={m => { meshRefs.current[i] = m; }} renderOrder={5}>
          <sphereGeometry args={[0.008, 6, 6]} />
          <meshBasicMaterial color="#00ffe7" transparent opacity={0.6}
            blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </>
  );
}

// ── City label projector (inside Canvas, writes to DOM directly) ──────────────
function CityLabelUpdater({ globeRef, r }: { globeRef: React.MutableRefObject<THREE.Group | null>; r: number }) {
  const { camera, size } = useThree();

  useFrame(() => {
    if (!globeRef.current) return;
    CITIES.forEach((city, i) => {
      const el = document.getElementById(`glbl-${i}`);
      if (!el) return;
      const local = ll2v(city.lat, city.lng, r + 0.03);
      const world = local.clone().applyMatrix4(globeRef.current!.matrixWorld);
      const toCam = camera.position.clone().sub(world).normalize();
      const norm  = world.clone().normalize();
      const front = norm.dot(toCam) > 0.05;
      const proj  = world.clone().project(camera);
      const x = (proj.x * 0.5 + 0.5) * size.width;
      const y = (-proj.y * 0.5 + 0.5) * size.height;
      el.style.transform = `translate(${x}px, ${y}px)`;
      el.style.opacity   = front ? (city.home ? '1' : '0.72') : '0';
    });
  });

  return null;
}

// ── Background stars ──────────────────────────────────────────────────────────
function Stars() {
  const pos = useMemo(() => {
    const arr = new Float32Array(2800 * 3);
    for (let i = 0; i < 2800; i++) {
      const r = 14 + Math.random() * 8;
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      arr[i*3]   = Math.sin(phi) * Math.cos(theta) * r;
      arr[i*3+1] = Math.sin(phi) * Math.sin(theta) * r;
      arr[i*3+2] = Math.cos(phi) * r;
    }
    return arr;
  }, []);
  const gRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => { if (gRef.current) gRef.current.rotation.y = clock.getElapsedTime() * 0.004; });
  return (
    <group ref={gRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#ddf0ff" size={0.026} sizeAttenuation transparent opacity={0.72}
          depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </group>
  );
}

// ── Globe group (rotation + drag + inertia) ───────────────────────────────────
function GlobeGroup({ r, geoLines, globeRef }: {
  r: number;
  geoLines: Float32Array | null;
  globeRef: React.MutableRefObject<THREE.Group | null>;
}) {
  const isDragging = useRef(false);
  const lastPt     = useRef({ x: 0, y: 0 });
  const inertia    = useRef({ x: 0, y: 0 });
  const rotRef     = useRef({ x: 0.18, y: -1.42 }); // initial: Europe facing front

  useEffect(() => {
    const down = (e: PointerEvent) => {
      if (e.button !== 0 && e.button !== undefined) return;
      isDragging.current = true;
      lastPt.current = { x: e.clientX, y: e.clientY };
      inertia.current = { x: 0, y: 0 };
    };
    const move = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastPt.current.x;
      const dy = e.clientY - lastPt.current.y;
      // Touch is less precise → use higher sensitivity on mobile
      const sens = e.pointerType === 'touch' ? 0.008 : 0.005;
      inertia.current = { x: dx * sens, y: dy * (sens * 0.7) };
      rotRef.current.y += dx * sens;
      rotRef.current.x += dy * (sens * 0.7);
      rotRef.current.x = Math.max(-1.1, Math.min(1.1, rotRef.current.x));
      lastPt.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => {
      isDragging.current = false;
      inertia.current.x *= 0.15;
      inertia.current.y *= 0.15;
    };
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup',   up);
    return () => {
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup',   up);
    };
  }, []);

  useFrame((_, delta) => {
    if (!globeRef.current) return;
    if (!isDragging.current) {
      // Decay inertia
      if (Math.abs(inertia.current.x) > 0.0002) {
        rotRef.current.y  += inertia.current.x;
        rotRef.current.x  += inertia.current.y;
        inertia.current.x *= 0.90;
        inertia.current.y *= 0.90;
      }
      // Always auto-rotate (continues through inertia phase too)
      rotRef.current.y += delta * 0.07;
    }
    globeRef.current.rotation.x = rotRef.current.x;
    globeRef.current.rotation.y = rotRef.current.y;
  });

  const yOff = r === R_MOB ? -0.28 : -0.18;

  return (
    <group ref={globeRef as React.Ref<THREE.Group>} position={[0, yOff, 0]}>
      <GlobeSphere r={r} />
      <Atmosphere r={r} />
      <CountryLines positions={geoLines} />
      <CityDots r={r} />
      <ConnectionArcs r={r} />
      <ArcTravelers r={r} />
    </group>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
type GlobeHeroProps = {
  line1: string;
  line2: string;
  line2Highlight: string;
  subline: string;
  ctaPrimary: string;
  ctaPrimaryHref: string;
  ctaSecondary: string;
  ctaSecondaryHref: string;
};

export default function GlobeHero({
  line1, line2, line2Highlight, subline,
  ctaPrimary, ctaPrimaryHref, ctaSecondary, ctaSecondaryHref,
}: GlobeHeroProps) {
  const [isMobile,        setIsMobile]        = useState<boolean | null>(null);
  const [geoLines,        setGeoLines]        = useState<Float32Array | null>(null);
  const globeRef         = useRef<THREE.Group | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 700);
    // Fetch TopoJSON from CDN — browser-side only, not sandboxed
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json')
      .then(r => r.json())
      .then(topo => {
        const r = window.innerWidth < 700 ? R_MOB : R_DESK;
        setGeoLines(decodeTopoLines(topo, r));
      })
      .catch(() => {/* Globe still works without borders */});
  }, []);


  if (isMobile === null) return null;

  const r           = isMobile ? R_MOB : R_DESK;
  const canvasH     = isMobile ? '65dvh' : '96vh';
  const camZ        = isMobile ? 2.55 : 2.35;   // closer on desktop → globe fills more
  const fov         = isMobile ? 52 : 46;         // narrower FOV on desktop → larger globe


  return (
    <div style={{ position: 'relative', width: '100vw', overflow: 'hidden', background: '#000' }}>

      {/* ── Three.js canvas ───────────────────────────────────────────── */}
      <Canvas
        camera={{ position: [0, 0, camZ], fov }}
        style={{
          width: '100vw',
          height: canvasH,
          display: 'block',
          // pan-y: browser handles vertical scroll, JS captures horizontal → globe rotates
          touchAction: isMobile ? 'pan-y' : 'none',
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <Stars />
        <GlobeGroup r={r} geoLines={geoLines} globeRef={globeRef} />
        <CityLabelUpdater globeRef={globeRef} r={r} />
      </Canvas>

      {/* ── City labels (DOM, updated by CityLabelUpdater) ─────────────── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 6 }}>
        {CITIES.map((city, i) => (
          <div
            key={city.name}
            id={`glbl-${i}`}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              transform: 'translate(-50px,-50px)',
              opacity: 0,
              transition: 'opacity 0.3s',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span style={{
              width:  city.home ? 7 : 5,
              height: city.home ? 7 : 5,
              borderRadius: '50%',
              background: city.home ? '#00ffe7' : '#88ddff',
              boxShadow: city.home ? '0 0 8px #00ffe7' : '0 0 5px #88ddff',
              display: 'inline-block',
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: '"Inter", "Helvetica Neue", sans-serif',
              fontSize: city.home ? '0.78rem' : '0.70rem',
              fontWeight: city.home ? 700 : 400,
              color: city.home ? '#00ffe7' : 'rgba(180,235,255,0.85)',
              letterSpacing: city.home ? '0.10em' : '0.06em',
              textShadow: '0 1px 8px rgba(0,0,0,0.9)',
            }}>
              {city.name.toUpperCase()}
            </span>
          </div>
        ))}
      </div>

      {/* ── Desktop text + UI ──────────────────────────────────────────── */}
      {!isMobile && (
        <>
          {/* Hero headline */}
          <div style={{
            position: 'absolute', top: '22vh', left: 0, width: '100vw', zIndex: 2,
            pointerEvents: 'none', padding: '0 5vw',
          }}>
            <div className={montserrat.className} style={{ fontSize: 'clamp(2.4rem,5.8vw,4.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.06 }}>
              {line1}
            </div>
            <div className={montserrat.className} style={{ fontSize: 'clamp(2.4rem,5.8vw,4.8rem)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.06 }}>
              {line2}{' '}
              <span style={{ color: '#6cfcff' }}>{line2Highlight}</span>
            </div>
            <div style={{ marginTop: '1.1rem', height: 2, width: 'clamp(60px,8vw,120px)', background: 'rgba(108,252,255,0.5)', borderRadius: 2 }} />
            <div style={{ marginTop: '1rem', fontSize: 'clamp(0.95rem,1.5vw,1.2rem)', color: 'rgba(255,255,255,0.72)', fontFamily: 'inherit', letterSpacing: '0.01em', lineHeight: 1.5 }}>
              {subline}
            </div>
            <div style={{ marginTop: '1.6rem', display: 'flex', gap: '0.9rem', flexWrap: 'wrap', pointerEvents: 'auto' }}>
              <Link href={ctaPrimaryHref} style={{ background: '#00ffe7', color: '#001a17', fontWeight: 700, padding: '0.85rem 1.7rem', borderRadius: 10, textDecoration: 'none', fontSize: 'clamp(0.9rem,1.3vw,1.05rem)', display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 30px rgba(0,255,231,0.28)' }}>
                {ctaPrimary} →
              </Link>
              <Link href={ctaSecondaryHref} style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, padding: '0.85rem 1.7rem', borderRadius: 10, textDecoration: 'none', fontSize: 'clamp(0.9rem,1.3vw,1.05rem)' }}>
                {ctaSecondary}
              </Link>
            </div>
          </div>

        </>
      )}

      {/* ── Mobile overlay ─────────────────────────────────────────────── */}
      {isMobile && (
        <>
          <div style={{ position: 'absolute', top: '18vw', left: 0, width: '100vw', padding: '0 5vw', zIndex: 2, pointerEvents: 'none' }}>
            <div className={montserrat.className} style={{ fontSize: 'clamp(1.5rem,6.5vw,2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              {line1}
            </div>
            <div className={montserrat.className} style={{ fontSize: 'clamp(1.5rem,6.5vw,2.4rem)', fontWeight: 700, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              {line2} <span style={{ color: '#6cfcff' }}>{line2Highlight}</span>
            </div>
            <div style={{ marginTop: '0.7rem', height: 2, width: 60, background: 'rgba(108,252,255,0.5)', borderRadius: 2 }} />
            <div style={{ marginTop: '0.6rem', fontSize: 'clamp(0.8rem,3.5vw,1rem)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.45 }}>
              {subline}
            </div>
            <div style={{ marginTop: '1.1rem', display: 'flex', gap: '0.6rem', flexWrap: 'wrap', pointerEvents: 'auto' }}>
              <Link href={ctaPrimaryHref} style={{ background: '#00ffe7', color: '#001a17', fontWeight: 700, padding: '0.7rem 1.2rem', borderRadius: 9, textDecoration: 'none', fontSize: 'clamp(0.8rem,3.6vw,0.95rem)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {ctaPrimary} →
              </Link>
              <Link href={ctaSecondaryHref} style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', fontWeight: 600, padding: '0.7rem 1.2rem', borderRadius: 9, textDecoration: 'none', fontSize: 'clamp(0.8rem,3.6vw,0.95rem)' }}>
                {ctaSecondary}
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Bottom spacer */}
      <div style={{ width: '100%', height: isMobile ? '1rem' : '5vw' }} />
    </div>
  );
}
