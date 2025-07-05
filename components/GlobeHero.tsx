"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ReactNode, useRef, useMemo, useEffect, useState, useLayoutEffect } from 'react';
// @ts-ignore
import * as SimplexNoise from 'simplex-noise';
import { createNoise3D } from 'simplex-noise';
import { Space_Grotesk, Sora, Montserrat } from 'next/font/google';
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: '700' });
const sora = Sora({ subsets: ['latin'], weight: '700' });
const montserrat = Montserrat({ subsets: ['latin'], weight: '700' });

function GlobeColorLayer({ glow = false }: { glow?: boolean }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const baseRadius = isMobile ? 0.56 : 0.92;
  return (
    <mesh>
      <sphereGeometry args={[glow ? baseRadius * 1.1875 : baseRadius, 64, 64]} />
      <meshBasicMaterial 
        color={glow ? "#6ffcff" : "#0a5e53"} 
        transparent={true} 
        opacity={glow ? 0.05 : 0.53} 
        blending={THREE.AdditiveBlending} 
        side={THREE.FrontSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function ElegantGlobeLines() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const sphereRadius = isMobile ? 0.56 : 0.92;
  const lineCount = 32;
  const segments = 100;
  const tubeRadius = 0.0015; // Dünner und schärfer
  const lines = [];
  for (let i = 0; i < lineCount; i++) {
    const angle = (i / (lineCount - 1)) * Math.PI - Math.PI / 2; // -90° bis +90°
    const y = Math.sin(angle) * sphereRadius;
    const r = Math.cos(angle) * sphereRadius;
    // Erzeuge einen geschlossenen Kreis-Spline für die Tube
    const curvePoints = [];
    for (let j = 0; j <= segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      curvePoints.push(new THREE.Vector3(
        Math.cos(theta) * r,
        y,
        Math.sin(theta) * r
      ));
    }
    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    const geometry = new THREE.TubeGeometry(curve, segments, tubeRadius, 8, true);
    lines.push(
      <mesh key={"latitude-tube-"+i} geometry={geometry}>
        <meshBasicMaterial color="#0a5e53" transparent opacity={0.8} blending={THREE.NormalBlending} />
      </mesh>
    );
  }
  return <group>{lines}</group>;
}

function ParticleSphere({ setMarker, globeRef }: { setMarker: (v: THREE.Vector3) => void, globeRef: React.RefObject<THREE.Group | null> }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const count = 35000;
  const globeRadius = isMobile ? 0.56 : 0.92;
  const maxR = globeRadius + (isMobile ? 0.018 : 0.025);
  const { mouse, size, camera, gl } = useThree();

  // Für jeden Partikel: aktuelle Richtung, Zielrichtung, Geschwindigkeit, Offset, Stocken
  const directions = useRef<Float32Array>(new Float32Array(count * 3));
  const targetDirections = useRef<Float32Array>(new Float32Array(count * 3));
  const velocities = useRef<Float32Array>(new Float32Array(count));
  const timeOffsets = useRef<Float32Array>(new Float32Array(count));
  const stockTimers = useRef<Float32Array>(new Float32Array(count));
  const positions = useRef<Float32Array>(new Float32Array(count * 3));
  const pointsRef = useRef<THREE.Points>(null);
  const noise3D = useMemo(() => createNoise3D(), []);
  const rising = useRef<boolean[]>(new Array(count).fill(false));
  const riseProgress = useRef<Float32Array>(new Float32Array(count));
  const riseStart = useRef<Float32Array>(new Float32Array(count * 3));
  const fluchtTimers = useRef<Float32Array>(new Float32Array(count));
  const fluchtDirections = useRef<Float32Array>(new Float32Array(count * 3));
  
  // Erstelle Arrays mit korrekter Größe
  useMemo(() => {
    directions.current = new Float32Array(count * 3);
    targetDirections.current = new Float32Array(count * 3);
    velocities.current = new Float32Array(count);
    timeOffsets.current = new Float32Array(count);
    stockTimers.current = new Float32Array(count);
    positions.current = new Float32Array(count * 3);
    rising.current = new Array(count).fill(false);
    riseProgress.current = new Float32Array(count);
    riseStart.current = new Float32Array(count * 3);
    fluchtTimers.current = new Float32Array(count);
    fluchtDirections.current = new Float32Array(count * 3);
  }, [count]);

  // Farben: Nur lila und türkis
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // 50% lila, 50% türkis
      if (Math.random() < 0.5) {
        // Lila: Interpoliert zwischen #b36aff (179,106,255) und #7d26ff (125,38,255)
        const t = Math.random();
        const r = 179 * (1 - t) + 125 * t;
        const g = 106 * (1 - t) + 38 * t;
        const b = 255;
        arr[i * 3] = r / 255;
        arr[i * 3 + 1] = g / 255;
        arr[i * 3 + 2] = b / 255;
      } else {
        // Türkis: Interpoliert zwischen #6ffcff (111,252,255) und #00ffe7 (0,255,231)
        const t = Math.random();
        const r = 111 * (1 - t) + 0 * t;
        const g = 252 * (1 - t) + 255 * t;
        const b = 255 * (1 - t) + 231 * t;
        arr[i * 3] = r / 255;
        arr[i * 3 + 1] = g / 255;
        arr[i * 3 + 2] = b / 255;
      }
    }
    return arr;
  }, [count]);

  // Initialisiere Richtungen, Zielrichtungen, Geschwindigkeiten, Zeitoffsets, Stocken
  useMemo(() => {
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const dx = Math.sin(phi) * Math.cos(theta);
      const dy = Math.sin(phi) * Math.sin(theta);
      const dz = Math.cos(phi);
      directions.current[i * 3] = dx;
      directions.current[i * 3 + 1] = dy;
      directions.current[i * 3 + 2] = dz;
      targetDirections.current[i * 3] = dx;
      targetDirections.current[i * 3 + 1] = dy;
      targetDirections.current[i * 3 + 2] = dz;
      velocities.current[i] = Math.random() * 0.12 + 0.08;
      timeOffsets.current[i] = Math.random();
      stockTimers.current[i] = Math.random() * 2;
    }
  }, [count]);

  function dist3(ax: number, ay: number, az: number, bx: number, by: number, bz: number): number {
    return Math.sqrt((ax-bx)**2 + (ay-by)**2 + (az-bz)**2);
  }

  const mouse3D = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ clock }) => {
    // Maus auf Globe projizieren (ungefähr)
    const x = (mouse.x * 0.5 + 0.5) * size.width;
    const y = (mouse.y * -0.5 + 0.5) * size.height;
    const ndc = new THREE.Vector2((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1);
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(ndc, camera);
    const intersection = raycaster.ray.at(maxR, new THREE.Vector3());
    mouse3D.copy(intersection);

    const t = clock.getElapsedTime();
    const arr = positions.current;
    for (let i = 0; i < count; i++) {
      // Stocken: 5% Chance, dass ein Partikel für 0.5s stehen bleibt
      if (stockTimers.current[i] > 0) {
        stockTimers.current[i] -= 0.016;
        continue;
      } else if (Math.random() < 0.0005) {
        stockTimers.current[i] = 0.5 + Math.random() * 0.5;
        continue;
      }
      // --- AUFSTEIGENDE PARTIKEL ---
      if (!rising.current[i] && Math.random() < 0.00008) {
        rising.current[i] = true;
        riseProgress.current[i] = 0;
        // Startposition merken
        riseStart.current[i * 3] = arr[i * 3];
        riseStart.current[i * 3 + 1] = arr[i * 3 + 1];
        riseStart.current[i * 3 + 2] = arr[i * 3 + 2];
      }
      if (rising.current[i]) {
        // Richtung: schräg rechts oben (z.B. [0.5, 1, 0.5], normalisiert)
        const dirX = 0.5 / Math.sqrt(1.5);
        const dirY = 1 / Math.sqrt(1.5);
        const dirZ = 0.5 / Math.sqrt(1.5);
        
        // Berechne aktuelle Position und Distanz zur Globe
        const currentX = riseStart.current[i * 3] + dirX * riseProgress.current[i] * 6;
        const currentY = riseStart.current[i * 3 + 1] + dirY * riseProgress.current[i] * 6;
        const currentZ = riseStart.current[i * 3 + 2] + dirZ * riseProgress.current[i] * 6;
        const distanceFromGlobe = Math.sqrt(currentX*currentX + currentY*currentY + currentZ*currentZ) - globeRadius;
        
        // Geschwindigkeit basiert auf Distanz: sehr langsam am Anfang, dann exponentiell schneller
        const baseSpeed = 0.0003; // Sehr langsame Grundgeschwindigkeit
        const accelerationFactor = Math.pow(distanceFromGlobe * 0.5, 1.5); // Exponentieller Anstieg
        const currentSpeed = baseSpeed + accelerationFactor * 0.002;
        
        riseProgress.current[i] += currentSpeed;
        
        arr[i * 3] = riseStart.current[i * 3] + dirX * riseProgress.current[i] * 6;
        arr[i * 3 + 1] = riseStart.current[i * 3 + 1] + dirY * riseProgress.current[i] * 6;
        arr[i * 3 + 2] = riseStart.current[i * 3 + 2] + dirZ * riseProgress.current[i] * 6;
        // Farbe weiß
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
        // Wenn weit genug entfernt, zurücksetzen
        if (riseProgress.current[i] * 6 > 8) {
          rising.current[i] = false;
          riseProgress.current[i] = 0;
          // Respawn auf Kugel (wie Initialisierung)
          const phi = Math.acos(2 * Math.random() - 1);
          const theta = 2 * Math.PI * Math.random();
          const dx = Math.sin(phi) * Math.cos(theta);
          const dy = Math.sin(phi) * Math.sin(theta);
          const dz = Math.cos(phi);
          directions.current[i * 3] = dx;
          directions.current[i * 3 + 1] = dy;
          directions.current[i * 3 + 2] = dz;
          targetDirections.current[i * 3] = dx;
          targetDirections.current[i * 3 + 1] = dy;
          targetDirections.current[i * 3 + 2] = dz;
        }
        continue;
      }
      // --- PERLIN-NOISE-DRIFT ---
      const phase = timeOffsets.current[i] * 1000;
      const driftStrength = 0.001; // noch langsamer und träger
      const driftX = noise3D(i * 0.01, t * 0.012 + phase, 0) * driftStrength;
      const driftY = noise3D(i * 0.01, t * 0.014 + phase, 100) * driftStrength;
      const driftZ = noise3D(i * 0.01, t * 0.009 + phase, 200) * driftStrength;
      targetDirections.current[i * 3] += driftX;
      targetDirections.current[i * 3 + 1] += driftY;
      targetDirections.current[i * 3 + 2] += driftZ;
      // Normiere Zielrichtung
      const tx = targetDirections.current[i * 3];
      const ty = targetDirections.current[i * 3 + 1];
      const tz = targetDirections.current[i * 3 + 2];
      const tlen = Math.sqrt(tx*tx + ty*ty + tz*tz) || 1;
      targetDirections.current[i * 3] = tx / tlen;
      targetDirections.current[i * 3 + 1] = ty / tlen;
      targetDirections.current[i * 3 + 2] = tz / tlen;
      // Maus-Interaktion: Wenn Partikel nahe an Maus, Zielrichtung sanft verwischen
      if (mouse.x !== 0 || mouse.y !== 0) {
        const px = arr[i * 3], py = arr[i * 3 + 1], pz = arr[i * 3 + 2];
        const dist = dist3(px, py, pz, mouse3D.x, mouse3D.y, mouse3D.z);
        if (dist < 0.35 && !rising.current[i]) {
          // Attraction: Richtung zur Maus
          const force = Math.min(0.18 / (dist * dist + 0.01), 0.25); // capped, stärker
          const dirToMouse = [
            (mouse3D.x - px) / dist,
            (mouse3D.y - py) / dist,
            (mouse3D.z - pz) / dist
          ];
          targetDirections.current[i * 3] += dirToMouse[0] * force;
          targetDirections.current[i * 3 + 1] += dirToMouse[1] * force;
          targetDirections.current[i * 3 + 2] += dirToMouse[2] * force;
        }
      }
      // Lerp aktuelle Richtung zur Zielrichtung (Trägheit)
      const lerp = 0.03;
      directions.current[i * 3] += (targetDirections.current[i * 3] - directions.current[i * 3]) * lerp;
      directions.current[i * 3 + 1] += (targetDirections.current[i * 3 + 1] - directions.current[i * 3 + 1]) * lerp;
      directions.current[i * 3 + 2] += (targetDirections.current[i * 3 + 2] - directions.current[i * 3 + 2]) * lerp;
      // Normiere aktuelle Richtung
      const dx = directions.current[i * 3];
      const dy = directions.current[i * 3 + 1];
      const dz = directions.current[i * 3 + 2];
      const len = Math.sqrt(dx*dx + dy*dy + dz*dz) || 1;
      directions.current[i * 3] = dx / len;
      directions.current[i * 3 + 1] = dy / len;
      directions.current[i * 3 + 2] = dz / len;
      // Lebenszyklus: 0 ... 1
      const v = velocities.current[i];
      const life = ((t * v + timeOffsets.current[i]) % 1.0);
      // Radius interpoliert von globeRadius bis maxR
      const r = globeRadius + (maxR - globeRadius) * life;
      arr[i * 3] = r * directions.current[i * 3];
      arr[i * 3 + 1] = r * directions.current[i * 3 + 1];
      arr[i * 3 + 2] = r * directions.current[i * 3 + 2];
      // --- FARBE: sanfter Verlauf von Türkis zu Lila, abhängig von y-Position und Zeit ---
      const yNorm = (arr[i * 3 + 1] / globeRadius + 1) / 2; // -globeRadius..+globeRadius → 0..1
      // Türkis: #6ffcff (111,252,255), Lila: #b36fff (179,111,255)
      const tColor = 0.5 + 0.5 * Math.sin(t * 0.18 + yNorm * Math.PI); // animierter Verlauf
      const rColor = (111/255) * (1-tColor) + (179/255) * tColor;
      const gColor = (252/255) * (1-tColor) + (111/255) * tColor;
      const bColor = (255/255);
      colors[i * 3] = rColor;
      colors[i * 3 + 1] = gColor;
      colors[i * 3 + 2] = bColor;
      // --- Zufälliges Leuchten ---
      if (Math.random() < 0.002) {
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      }
      // Flucht-Animation
      if (fluchtTimers.current[i] > 0) {
        fluchtTimers.current[i] -= 0.016;
        arr[i * 3] += fluchtDirections.current[i * 3] * 0.09 * fluchtTimers.current[i];
        arr[i * 3 + 1] += fluchtDirections.current[i * 3 + 1] * 0.09 * fluchtTimers.current[i];
        arr[i * 3 + 2] += fluchtDirections.current[i * 3 + 2] * 0.09 * fluchtTimers.current[i];
        continue;
      }
    }
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  useEffect(() => {
    function handlePointerDown(e: PointerEvent) {
      // Nur bei Tap/Click, nicht bei Drag
      if (e.button !== 0 && e.button !== undefined) return;
      
      const rect = gl.domElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      const ndc = new THREE.Vector2(x, y);
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);
      const sphere = new THREE.Sphere(new THREE.Vector3(0,0,0), maxR);
      const intersection = raycaster.ray.intersectSphere(sphere, new THREE.Vector3());
      if (!intersection) {
        return;
      }
      setMarker(intersection.clone());
      // Transformiere Intersection in das lokale Koordinatensystem der Globe
      let intersectionLocal = intersection.clone();
      if (globeRef && globeRef.current) {
        globeRef.current.worldToLocal(intersectionLocal);
      }
      let particlesHit = 0;
      for (let i = 0; i < count; i++) {
        const px = positions.current[i * 3];
        const py = positions.current[i * 3 + 1];
        const pz = positions.current[i * 3 + 2];
        const dist = Math.sqrt((px - intersectionLocal.x) ** 2 + (py - intersectionLocal.y) ** 2 + (pz - intersectionLocal.z) ** 2);
        if (dist < 0.12) {
          particlesHit++;
          const dx = (px - intersectionLocal.x) / dist;
          const dy = (py - intersectionLocal.y) / dist;
          const dz = (pz - intersectionLocal.z) / dist;
          fluchtDirections.current[i * 3] = dx;
          fluchtDirections.current[i * 3 + 1] = dy;
          fluchtDirections.current[i * 3 + 2] = dz;
          fluchtTimers.current[i] = 1.0 + Math.random() * 0.5;
        }
      }
    }
    
    gl.domElement.addEventListener('pointerdown', handlePointerDown);
    return () => {
      gl.domElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [camera, gl, count, maxR, setMarker, globeRef]);

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          vertexColors
          size={0.004}
          sizeAttenuation
          transparent
          opacity={0.9}
          blending={THREE.NormalBlending}
          depthWrite={false}
          depthTest={false}
        />
      </points>
    </>
  );
}

function DepthMaskGlobe() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const baseRadius = isMobile ? 0.56 : 0.92;
  // Diese Kugel ist unsichtbar, aber undurchsichtig für den Depth-Buffer
  return (
    <mesh>
      <sphereGeometry args={[baseRadius, 64, 64]} />
      <meshBasicMaterial
        color="#fff"
        depthTest={true}
        depthWrite={true}
        colorWrite={false} // Nur Depth, kein Color
      />
    </mesh>
  );
}

function GlobeGroup({ position = [0, 0, 0], setMarker }: { position?: [number, number, number], setMarker: (v: THREE.Vector3) => void }) {
  const globeRef = useRef<THREE.Group | null>(null);
  // Maussteuerung mit Drag-Erkennung
  const mouse = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPointerPos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      // Nur bei linker Maustaste oder Touch starten
      if (e.button !== 0 && e.button !== undefined) return;
      
      isDragging.current = false;
      dragStart.current = { x: e.clientX, y: e.clientY };
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Prüfe ob es ein Drag ist (horizontale Bewegung > 10px oder vertikale Bewegung < 20px)
      const deltaX = Math.abs(e.clientX - dragStart.current.x);
      const deltaY = Math.abs(e.clientY - dragStart.current.y);
      
      // Wenn horizontale Bewegung größer als vertikale und mindestens 10px, ist es ein Drag
      if (deltaX > 10 && deltaX > deltaY * 1.5) {
        isDragging.current = true;
      }
      
      // Nur bei Drag die Mausposition für Globe-Rotation verwenden
      if (isDragging.current) {
        mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      }
      
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
    };

    // Pointer Events für Touch und Maus
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      const t = clock.getElapsedTime();
      
      // Nur bei Drag die Mausposition verwenden, sonst sanft zur Ruhe
      let targetX, targetY, targetZ;
      
      if (isDragging.current) {
        // Bei Drag: Mausposition verwenden
        targetX = 0.18 + mouse.current.y * 0.09;
        targetY = t * 0.045 + mouse.current.x * 0.13;
      } else {
        // Ohne Drag: Sanft zur Ruhe kommen
        targetX = 0.18;
        targetY = t * 0.045;
      }
      
      // Größere, langsamere Kippung um Z-Achse (unabhängig von Drag)
      targetZ = Math.sin(t * 0.035) * 0.38;
      
      // Sanfte Interpolation
      globeRef.current.rotation.x += (targetX - globeRef.current.rotation.x) * 0.025;
      globeRef.current.rotation.y += (targetY - globeRef.current.rotation.y) * 0.025;
      globeRef.current.rotation.z += (targetZ - globeRef.current.rotation.z) * 0.025;
    }
  });

  return (
    <group ref={globeRef} position={position}>
      <DepthMaskGlobe />
      <ElegantGlobeLines />
      <GlobeColorLayer />
      <ParticleSphere setMarker={setMarker} globeRef={globeRef} />
    </group>
  );
}

function BackgroundStars({ count = 1200, spread = 16 }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Zufällige Position in einer großen Kugel
      const r = Math.cbrt(Math.random()) * spread + 6; // immer weit weg
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      arr[i * 3 + 2] = Math.cos(phi) * r;
    }
    return arr;
  }, [count, spread]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#fff"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function GlobeHero({ children, backgroundText }: { children?: ReactNode, backgroundText?: string }) {
  const [marker, setMarker] = useState<THREE.Vector3 | null>(null);
  // Responsive Werte
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;
  const textBlockRef = useRef<HTMLDivElement | null>(null);
  const [textBlockHeight, setTextBlockHeight] = useState<number | null>(null);
  const [lineY, setLineY] = useState<number | null>(null);
  const [transmissionOpen, setTransmissionOpen] = useState(false);
  useLayoutEffect(() => {
    if (textBlockRef.current) {
      setTextBlockHeight(textBlockRef.current.getBoundingClientRect().height);
      const rect = textBlockRef.current.getBoundingClientRect();
      setLineY(rect.top + rect.height / 2);
    }
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        background: 'radial-gradient(ellipse at center, #070708 0%, #0a0a0c 40%, #050506 80%, #000 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* MOBILE: Headline-Block oben, Globe darunter */}
      {isMobile ? (
        <>
          <div style={{ width: '100vw', paddingTop: '2.5rem', boxSizing: 'border-box' }}>
            {/* DIGITALISIEREN links */}
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'flex-start' }}>
              <span
                className={montserrat.className}
                style={{
                  display: 'block',
                  fontSize: 'clamp(1.1rem, 7vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 4px 32px #0008, 0 1px 8px #0006',
                  letterSpacing: '0em',
                  lineHeight: 1.08,
                  margin: 0,
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                  maxWidth: '98vw',
                  textAlign: 'left',
                  transition: 'all 0.3s',
                }}
              >
                DIGITALISIEREN
              </span>
            </div>
            {/* BEGEISTERN mit Linie links/rechts */}
            <div style={{ width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 0, padding: 0 }}>
              <div style={{ flex: 1, height: '2px', background: '#fff', opacity: 1, marginRight: '5vw' }} />
              <span
                className={montserrat.className}
                style={{
                  display: 'block',
                  fontSize: 'clamp(1.1rem, 7vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 4px 32px #0008, 0 1px 8px #0006',
                  letterSpacing: '0em',
                  lineHeight: 1.08,
                  margin: 0,
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                  maxWidth: '98vw',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                }}
              >
                BEGEISTERN
              </span>
              <div style={{ flex: 1, height: '2px', background: '#fff', opacity: 1, marginLeft: '5vw' }} />
            </div>
            {/* BEWEGEN rechts */}
            <div style={{ width: '100vw', display: 'flex', justifyContent: 'flex-end' }}>
              <span
                className={montserrat.className}
                style={{
                  display: 'block',
                  fontSize: 'clamp(1.1rem, 7vw, 2.1rem)',
                  fontWeight: 700,
                  color: '#fff',
                  textShadow: '0 4px 32px #0008, 0 1px 8px #0006',
                  letterSpacing: '0em',
                  lineHeight: 1.08,
                  margin: 0,
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                  maxWidth: '98vw',
                  textAlign: 'right',
                  transition: 'all 0.3s',
                }}
              >
                BEWEGEN
              </span>
            </div>
          </div>
          {/* Globe darunter, maximal groß */}
          <div style={{ width: '100vw', height: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Canvas 
              camera={{ position: [0, 0, 3], fov: 60 }} 
              style={{ width: '100vw', height: '100vw', zIndex: 10, pointerEvents: 'auto', touchAction: 'pan-y' }}
            >
              <BackgroundStars count={1000} spread={16} />
              <ambientLight intensity={0.7} />
              <pointLight position={[5, 5, 5]} intensity={1.2} color="#00ffe7" />
              <GlobeGroup position={[0, -0.38, 0]} setMarker={setMarker} />
            </Canvas>
          </div>
        </>
      ) : (
        // ... Desktop-Layout wie gehabt ...
        <>
          {/* Desktop Headline und Linien */}
          {children && (
            <div
              ref={textBlockRef}
              style={{
                position: 'absolute',
                top: '5.5rem',
                left: 0,
                width: '100vw',
                height: 'auto',
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                pointerEvents: 'none',
                paddingTop: '0.5rem',
              }}
            >
              <div
                style={{
                  marginTop: '0.7rem',
                  display: 'block',
                  textAlign: 'left',
                  maxWidth: '80vw',
                  fontFamily: 'Montserrat, Sora, Inter, system-ui, Arial, sans-serif',
                  transition: 'all 0.3s',
                }}
              >
                <span
                  className={montserrat.className}
                  style={{
                    display: 'block',
                    fontSize: 'clamp(3.2rem, 10vw, 5.2rem)',
                    fontWeight: 700,
                    color: '#fff',
                    textShadow: '0 4px 32px #0008, 0 1px 8px #0006',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.04,
                    margin: 0,
                    whiteSpace: 'nowrap',
                    transition: 'all 0.3s',
                  }}
                >
                  DIGITALISIEREN
                </span>
                <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
                  <span
                    className={montserrat.className}
                    style={{
                      display: 'block',
                      fontSize: 'clamp(3.2rem, 10vw, 5.2rem)',
                      fontWeight: 700,
                      color: '#fff',
                      textShadow: '0 4px 32px #0008, 0 1px 8px #0006',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.04,
                      margin: 0,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s',
                    }}
                  >
                    BEGEISTERN
                  </span>
                </div>
                <div style={{ width: '100vw', display: 'flex', justifyContent: 'flex-end' }}>
                  <span
                    className={montserrat.className}
                    style={{
                      display: 'block',
                      fontSize: 'clamp(3.2rem, 10vw, 5.2rem)',
                      fontWeight: 700,
                      color: '#fff',
                      textShadow: '0 4px 32px #0008, 0 1px 8px #0006',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.04,
                      margin: 0,
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s',
                    }}
                  >
                    BEWEGEN
                  </span>
                </div>
              </div>
            </div>
          )}
          {/* Desktop-Linien wie gehabt */}
          {lineY !== null && (
            <>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  width: '27.5vw',
                  height: '2px',
                  background: '#fff',
                  top: lineY ?? 0,
                  zIndex: 100,
                  opacity: 1,
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  width: '27.5vw',
                  height: '2px',
                  background: '#fff',
                  top: lineY ?? 0,
                  zIndex: 100,
                  opacity: 1,
                  pointerEvents: 'none',
                }}
              />
            </>
          )}
          {/* Desktop-Globe wie gehabt */}
          <Canvas 
            camera={{ position: [0, 0, 3], fov: 50 }} 
            style={{ width: '100vw', height: '90vh', zIndex: 10, pointerEvents: 'auto', touchAction: 'pan-y' }}
          >
            <BackgroundStars count={2000} spread={16} />
            <ambientLight intensity={0.7} />
            <pointLight position={[5, 5, 5]} intensity={1.2} color="#00ffe7" />
            <GlobeGroup position={[0, -0.28, 0]} setMarker={setMarker} />
          </Canvas>
        </>
      )}
      {/* Abstand unter dem Globe, responsive */}
      <div style={{ width: '100%', height: isMobile ? '3.5rem' : '7vw' }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
      {backgroundText && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}>
          <span style={{
              fontSize: isMobile ? 'clamp(1.2rem, 6vw, 2.2rem)' : 'clamp(3rem, 10vw, 8rem)',
            fontWeight: 900,
            color: 'white',
            opacity: 0.13,
            textTransform: 'uppercase',
              letterSpacing: isMobile ? '0em' : '-0.04em',
              marginTop: isMobile ? '2vw' : '2.5rem',
            filter: 'blur(0.5px)',
            userSelect: 'none',
            whiteSpace: 'pre-line',
            textAlign: isMobile ? 'center' : undefined,
            lineHeight: 1.05,
              maxWidth: isMobile ? '98vw' : 'none',
          }}>{backgroundText}</span>
        </div>
      )}
      {/* Textblock unten links */}
      <div
        style={{
          position: 'absolute',
          left: isMobile ? '4vw' : '2.5rem',
          bottom: isMobile ? '2rem' : '2.5rem',
          zIndex: 110,
          color: '#fff',
          fontSize: isMobile ? '0.82rem' : '0.95rem',
          fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
          opacity: 0.88,
          lineHeight: 1.4,
          maxWidth: isMobile ? '80vw' : '28vw',
          pointerEvents: 'none',
          letterSpacing: '0.01em',
          textShadow: '0 2px 8px #0007',
        }}
      >
        <div style={{ fontWeight: 600 }}>
          „Zaur Hatuev – Design mit Substanz und Wirkung.“
        </div>
        <div style={{ fontWeight: 400, fontSize: isMobile ? '0.76rem' : '0.89rem', opacity: 0.85 }}>
          Freiberuflicher Webdesigner & Markenstratege
        </div>
      </div>
      </div>
    </div>
  );
} 