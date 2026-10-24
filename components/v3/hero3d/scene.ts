// 3D-Bühne im Hero der Startseite: Laptop und Handy mit echten Kundenseiten als Video auf den Bildschirmen.
// Reines three.js (keine Zusatzpakete), wird erst nach dem Laden der Seite nachgeladen (siehe Hero3D.tsx).
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Site = { domain: string; src: string };

export type SceneOptions = {
  laptopSites: Site[];
  phoneSite: Site;
  onReady?: () => void;
  onSite?: (domain: string) => void;
};

export type SceneHandle = { setActive: (on: boolean) => void; dispose: () => void };

const ACCENT = 0x00ffe7;

function makeVideo(src: string, loop: boolean) {
  const v = document.createElement("video");
  v.muted = true;
  v.defaultMuted = true;
  v.playsInline = true;
  v.setAttribute("playsinline", "");
  v.setAttribute("muted", "");
  v.loop = loop;
  v.preload = "auto";
  v.crossOrigin = "anonymous";
  v.src = src;
  return v;
}

function videoTexture(v: HTMLVideoElement) {
  const t = new THREE.VideoTexture(v);
  t.colorSpace = THREE.SRGBColorSpace;
  t.minFilter = THREE.LinearFilter;
  t.magFilter = THREE.LinearFilter;
  t.generateMipmaps = false;
  return t;
}

/** Tastatur als gezeichnete Textur: dunkles Deck mit Tastenreihen, gibt dem Laptop Maßstab und Echtheit. */
function keyboardTexture() {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 400;
  const g = c.getContext("2d")!;
  g.fillStyle = "#141516";
  g.fillRect(0, 0, c.width, c.height);
  const rows = [14, 14, 13, 12, 11];
  const keyH = 58;
  const gap = 12;
  rows.forEach((n, r) => {
    const keyW = (c.width - 40 - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      const x = 20 + i * (keyW + gap);
      const y = 20 + r * (keyH + gap);
      g.fillStyle = "#070808";
      g.beginPath();
      g.roundRect(x, y, keyW, keyH, 9);
      g.fill();
      g.fillStyle = "rgba(255,255,255,0.05)";
      g.fillRect(x + 4, y + 3, keyW - 8, 2);
    }
  });
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

/** Weicher Schatten unter den Geräten (statt teurer Echtzeit-Schatten). */
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.85)");
  grad.addColorStop(0.45, "rgba(0,0,0,0.45)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

/** Kleine Kapsel oben im Handy-Bildschirm (Kameraaussparung). */
function islandTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 72;
  const g = c.getContext("2d")!;
  g.fillStyle = "#000";
  g.beginPath();
  g.roundRect(0, 0, 256, 72, 36);
  g.fill();
  return new THREE.CanvasTexture(c);
}

export function startScene(host: HTMLElement, opts: SceneOptions): SceneHandle {
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0.15, 2.3, 8.3);
  camera.lookAt(0.15, 0.95, 0);

  // Licht: Studio-Key von oben rechts, kühles Gegenlicht in der Markenfarbe, etwas Grundhelligkeit
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 5);
  scene.add(key);
  const rim = new THREE.PointLight(ACCENT, 26, 14, 2);
  rim.position.set(-3.6, 2.4, -2.2);
  scene.add(rim);
  const rim2 = new THREE.PointLight(ACCENT, 4, 10, 2);
  rim2.position.set(3.8, 1.4, 0.6);
  scene.add(rim2);
  scene.add(new THREE.AmbientLight(0xffffff, 0.25));

  // Materialien
  const alu = new THREE.MeshPhysicalMaterial({ color: 0x7b8086, metalness: 1, roughness: 0.34, clearcoat: 0.25, clearcoatRoughness: 0.35 });
  const titan = new THREE.MeshPhysicalMaterial({ color: 0x9aa0a6, metalness: 1, roughness: 0.26, clearcoat: 0.4, clearcoatRoughness: 0.2 });
  const blackGlass = new THREE.MeshPhysicalMaterial({ color: 0x050607, metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.04 });
  const glassOver = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: 0.04, transparent: true, opacity: 0.07, envMapIntensity: 1.6, depthWrite: false });
  const deck = new THREE.MeshStandardMaterial({ map: keyboardTexture(), roughness: 0.92, metalness: 0, envMapIntensity: 0.35 });
  const pad = new THREE.MeshPhysicalMaterial({ color: 0x6d7278, metalness: 0.9, roughness: 0.22, clearcoat: 0.6 });

  const root = new THREE.Group();
  scene.add(root);

  // --- Laptop
  const laptop = new THREE.Group();
  root.add(laptop);
  const W = 3.4;
  const D = 2.3;
  const base = new THREE.Mesh(new RoundedBoxGeometry(W, 0.11, D, 4, 0.05), alu);
  base.position.y = 0.055;
  laptop.add(base);
  const keys = new THREE.Mesh(new THREE.PlaneGeometry(2.92, 1.14), deck);
  keys.rotation.x = -Math.PI / 2;
  keys.position.set(0, 0.1115, -0.36);
  laptop.add(keys);
  // Trackpad als flache Fläche mit runden Ecken (eine hauchdünne Box flimmert an den Kanten)
  const padShape = new THREE.Shape();
  const pw = 1.16, pd = 0.72, pr = 0.06;
  padShape.moveTo(-pw / 2 + pr, -pd / 2);
  padShape.lineTo(pw / 2 - pr, -pd / 2);
  padShape.quadraticCurveTo(pw / 2, -pd / 2, pw / 2, -pd / 2 + pr);
  padShape.lineTo(pw / 2, pd / 2 - pr);
  padShape.quadraticCurveTo(pw / 2, pd / 2, pw / 2 - pr, pd / 2);
  padShape.lineTo(-pw / 2 + pr, pd / 2);
  padShape.quadraticCurveTo(-pw / 2, pd / 2, -pw / 2, pd / 2 - pr);
  padShape.lineTo(-pw / 2, -pd / 2 + pr);
  padShape.quadraticCurveTo(-pw / 2, -pd / 2, -pw / 2 + pr, -pd / 2);
  const track = new THREE.Mesh(new THREE.ShapeGeometry(padShape, 8), pad);
  track.rotation.x = -Math.PI / 2;
  track.position.set(0, 0.1112, 0.6);
  laptop.add(track);

  const lid = new THREE.Group();
  lid.position.set(0, 0.11, -D / 2 + 0.02);
  lid.rotation.x = -0.3; // gut 107° geöffnet
  laptop.add(lid);
  const lidBody = new THREE.Mesh(new RoundedBoxGeometry(W, 2.16, 0.07, 4, 0.045), alu);
  lidBody.position.y = 1.08;
  lid.add(lidBody);
  const bezel = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.1, 2.06), blackGlass);
  bezel.position.set(0, 1.08, 0.0362);
  lid.add(bezel);

  const lapVideo = makeVideo(opts.laptopSites[0].src, false);
  const lapTex = videoTexture(lapVideo);
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.12, 1.95), new THREE.MeshBasicMaterial({ map: lapTex, toneMapped: false }));
  screen.position.set(0, 1.1, 0.0372);
  lid.add(screen);
  const lapGlass = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.1, 2.06), glassOver);
  lapGlass.position.set(0, 1.08, 0.0385);
  lid.add(lapGlass);

  // --- Handy
  const phone = new THREE.Group();
  root.add(phone);
  const PW = 0.9;
  const PH = 1.86;
  phone.add(new THREE.Mesh(new RoundedBoxGeometry(PW, PH, 0.09, 6, 0.13), titan));
  const front = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.05, PH - 0.05), blackGlass);
  front.position.z = 0.0455;
  phone.add(front);
  const phVideo = makeVideo(opts.phoneSite.src, true);
  const phTex = videoTexture(phVideo);
  const phScreen = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8 * (844 / 390)), new THREE.MeshBasicMaterial({ map: phTex, toneMapped: false }));
  phScreen.position.z = 0.0462;
  phone.add(phScreen);
  const island = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.068), new THREE.MeshBasicMaterial({ map: islandTexture(), transparent: true }));
  island.position.set(0, PH / 2 - 0.13, 0.047);
  phone.add(island);
  const phGlass = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.05, PH - 0.05), glassOver);
  phGlass.position.z = 0.0475;
  phone.add(phGlass);

  // Aufstellung
  laptop.position.set(-0.5, 0, 0);
  laptop.rotation.y = 0.32;
  phone.position.set(1.7, 1.3, 1.2);
  phone.rotation.set(-0.08, -0.42, -0.06);

  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.2), new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false, opacity: 0.75 }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0.15, -0.002, 0.15);
  root.add(shadow);

  // Größe
  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // schmale Bühne: etwas weiter weg, damit beide Geräte ganz zu sehen sind
    camera.position.z = w / h < 1.05 ? 10.2 : 8.3;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // Maus: leichte Drehung der Bühne
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    const r = host.getBoundingClientRect();
    pointer.tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
    pointer.ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  // Kundenseiten auf dem Laptop nacheinander zeigen
  let siteIndex = 0;
  const nextSite = () => {
    siteIndex = (siteIndex + 1) % opts.laptopSites.length;
    lapVideo.src = opts.laptopSites[siteIndex].src;
    lapVideo.load();
    if (active) lapVideo.play().catch(() => {});
    opts.onSite?.(opts.laptopSites[siteIndex].domain);
  };
  lapVideo.addEventListener("ended", nextSite);
  opts.onSite?.(opts.laptopSites[0].domain);

  let active = false;
  let raf = 0;
  let readySent = false;
  const clock = new THREE.Clock();
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    root.rotation.y = Math.sin(t * 0.22) * 0.07 + pointer.x * 0.16;
    root.rotation.x = pointer.y * 0.05;
    root.position.y = Math.sin(t * 0.5) * 0.03;
    phone.position.y = 1.3 + Math.sin(t * 1.05) * 0.05; // schwebt leicht
    phone.rotation.z = -0.06 + Math.sin(t * 0.8) * 0.015;
    renderer.render(scene, camera);
    if (!readySent && lapVideo.readyState >= 2 && phVideo.readyState >= 2) {
      readySent = true;
      opts.onReady?.();
    }
  };

  const setActive = (on: boolean) => {
    if (on === active) return;
    active = on;
    if (on) {
      clock.start();
      lapVideo.play().catch(() => {});
      phVideo.play().catch(() => {});
      tick();
    } else {
      cancelAnimationFrame(raf);
      lapVideo.pause();
      phVideo.pause();
    }
  };

  const dispose = () => {
    setActive(false);
    window.removeEventListener("pointermove", onMove);
    lapVideo.removeEventListener("ended", nextSite);
    ro.disconnect();
    [lapVideo, phVideo].forEach((v) => {
      v.pause();
      v.removeAttribute("src");
      v.load();
    });
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const mats = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
      mats.forEach((mat) => {
        const mm = mat as THREE.MeshBasicMaterial;
        mm.map?.dispose();
        mm.dispose();
      });
    });
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { setActive, dispose };
}
