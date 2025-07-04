import { useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';

// Hilfsfunktion: Magnitude zu Punktgröße
function magToSize(mag: number) {
  // Helle Sterne groß, schwache klein
  return Math.max(0.012, 0.045 - 0.012 * (mag + 1.5));
}
// Hilfsfunktion: Magnitude zu Opazität
function magToOpacity(mag: number) {
  return Math.max(0.45, 1.1 - 0.25 * (mag + 1.5));
}

// Hilfsfunktion: RA/DEK (in Grad) auf Kugel (r=16) projizieren
function raDecToVec3(ra: number, dec: number, r = 16) {
  // RA: 0..360°, Dec: -90..+90°
  const raRad = (ra / 180) * Math.PI;
  const decRad = (dec / 180) * Math.PI;
  const x = r * Math.cos(decRad) * Math.cos(raRad);
  const y = r * Math.sin(decRad);
  const z = r * Math.cos(decRad) * Math.sin(raRad);
  return [x, y, z];
}

export default function RealStarfield() {
  const [stars, setStars] = useState<any[]>([]);
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    fetch('/stars100.json')
      .then(res => res.json())
      .then(setStars);
  }, []);

  // Attribute vorbereiten, wenn Daten geladen
  const { positions, sizes, opacities } = useMemo(() => {
    if (!stars.length) return { positions: new Float32Array(0), sizes: [], opacities: [] };
    const pos = new Float32Array(stars.length * 3);
    const sizes: number[] = [];
    const opacities: number[] = [];
    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      const [x, y, z] = raDecToVec3(s.ra, s.dec, 16);
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      sizes.push(magToSize(s.mag));
      opacities.push(magToOpacity(s.mag));
    }
    return { positions: pos, sizes, opacities };
  }, [stars]);

  // Custom ShaderMaterial für individuelle Größe/Opazität
  // (Alternativ: pointsMaterial mit mittlerer Größe/Opazität)
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#fff"
        size={0.045}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
} 