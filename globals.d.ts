import type * as THREE from "three";

declare global {
  interface Window {
    /** GlobeHero: reference to the Three.js camera for click raycasting */
    __globeCamera?: THREE.Camera;
    /** GlobeHero: whether a drag gesture is currently active */
    __dragActive?: boolean;
    /** GlobeHero: last tap position for double-tap particle escape */
    __lastTap?: { x: number; y: number } | null;
    /** GlobeHero: trigger particle escape at a world-space point */
    __triggerParticleEscapeAt?: (point: THREE.Vector3) => void;
  }
}

export {};
