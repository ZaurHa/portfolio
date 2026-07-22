"use client";

// Interaktives WebGL-Wellenfeld hinter dem Hero: Wireframe-Terrain (Simplex-Noise)
// + driftende Partikel in Markenfarbe. Nur Desktop + pointer:fine + volle Motion —
// Mobile/Reduced-Motion rendern nichts (return null), LCP bleibt unberührt.
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";

const ACCENT = "#00ffe7";

function WaveField() {
  const mesh = useRef<THREE.Mesh>(null);
  const noise3D = useMemo(() => createNoise3D(), []);
  const geometry = useMemo(() => new THREE.PlaneGeometry(48, 26, 110, 55), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime * 0.22;
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      pos.setZ(i, noise3D(x * 0.13 + t, y * 0.16, t * 0.5) * 1.25);
    }
    pos.needsUpdate = true;
    if (mesh.current) {
      mesh.current.rotation.x = -Math.PI / 2.55 + pointer.y * 0.05;
      mesh.current.rotation.z = pointer.x * 0.07;
    }
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={[0, -2.1, 0]}>
      <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.14} />
    </mesh>
  );
}

function DriftParticles({ count = 320 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 42;
      arr[i * 3 + 1] = Math.random() * 12 - 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return arr;
  }, [count]);

  useFrame(({ clock, pointer }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.015 + pointer.x * 0.05;
    points.current.position.y = Math.sin(clock.elapsedTime * 0.24) * 0.35;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={ACCENT}
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.45}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene3D() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (min-width: 768px)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(fine.matches && motionOk.matches);
    update();
    fine.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        opacity: ready ? 1 : 0,
        transition: "opacity 1.4s ease",
        pointerEvents: "none",
        maskImage: "linear-gradient(to bottom, black 55%, transparent 97%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 97%)",
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 2.4, 9.5], fov: 50 }}
        onCreated={() => setReady(true)}
        style={{ pointerEvents: "none" }}
        eventSource={typeof document !== "undefined" ? document.body : undefined}
      >
        <WaveField />
        <DriftParticles />
      </Canvas>
    </div>
  );
}
