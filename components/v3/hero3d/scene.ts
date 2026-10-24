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

export type SceneHandle = {
  setActive: (on: boolean) => void;
  /** 0 = Hero ganz oben, 1 = Hero aus dem Bild gescrollt */
  setScroll: (p: number) => void;
  dispose: () => void;
};

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
  if (src) v.src = src;
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

function canvasTexture(w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, srgb = true) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  draw(c.getContext("2d")!);
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Tastaturdeck: dunkel mit feiner Körnung, darauf sitzen echte 3D-Tasten. */
const deckTexture = () =>
  canvasTexture(512, 200, (g) => {
    g.fillStyle = "#121314";
    g.fillRect(0, 0, 512, 200);
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`;
      g.fillRect(Math.random() * 512, Math.random() * 200, 1, 1);
    }
  });

/** Gebürstetes Aluminium: feine waagerechte Streifen als Rauheit, wirkt weniger nach Plastik. */
const brushedRoughness = () =>
  canvasTexture(256, 256, (g) => {
    g.fillStyle = "#5a5a5a";
    g.fillRect(0, 0, 256, 256);
    for (let y = 0; y < 256; y++) {
      const v = 80 + Math.random() * 40;
      g.fillStyle = `rgba(${v},${v},${v},0.55)`;
      g.fillRect(0, y, 256, 1);
    }
  }, false);

/** Weicher Schatten (radial), als Fläche statt teurer Echtzeit-Schatten. */
const shadowTexture = (inner: number) =>
  canvasTexture(256, 256, (g) => {
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, `rgba(0,0,0,${inner})`);
    grad.addColorStop(0.5, `rgba(0,0,0,${inner * 0.5})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
  }, false);

/** Lichtreflex auf dem Glas: schräges, weiches Band, wandert beim Drehen mit. */
const glareTexture = () => {
  const t = canvasTexture(512, 256, (g) => {
    const grad = g.createLinearGradient(0, 0, 512, 256);
    grad.addColorStop(0.0, "rgba(255,255,255,0)");
    grad.addColorStop(0.42, "rgba(255,255,255,0)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.9)");
    grad.addColorStop(0.58, "rgba(255,255,255,0)");
    grad.addColorStop(1.0, "rgba(255,255,255,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 512, 256);
  }, false);
  t.repeat.set(0.5, 1);
  return t;
};

/** Kapsel oben im Handy-Bildschirm (Kameraaussparung). */
const islandTexture = () =>
  canvasTexture(256, 72, (g) => {
    g.fillStyle = "#000";
    g.beginPath();
    g.roundRect(0, 0, 256, 72, 36);
    g.fill();
  });

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return new THREE.ShapeGeometry(s, 8);
}

const smooth = (x: number) => x * x * (3 - 2 * x);

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
  let baseZ = 8.3;
  camera.position.set(0.15, 2.3, baseZ);
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
  const brushed = brushedRoughness();
  const alu = new THREE.MeshPhysicalMaterial({ color: 0x7b8086, metalness: 1, roughness: 0.36, roughnessMap: brushed, clearcoat: 0.25, clearcoatRoughness: 0.35 });
  const titan = new THREE.MeshPhysicalMaterial({ color: 0x9aa0a6, metalness: 1, roughness: 0.26, clearcoat: 0.4, clearcoatRoughness: 0.2 });
  const blackGlass = new THREE.MeshPhysicalMaterial({ color: 0x050607, metalness: 0, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.04 });
  const deck = new THREE.MeshStandardMaterial({ map: deckTexture(), roughness: 0.92, metalness: 0, envMapIntensity: 0.35 });
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x0b0c0d, roughness: 0.55, metalness: 0.05, envMapIntensity: 0.6 });
  const pad = new THREE.MeshPhysicalMaterial({ color: 0x6d7278, metalness: 0.9, roughness: 0.22, clearcoat: 0.6 });
  const glareTex = glareTexture();
  const glare = new THREE.MeshBasicMaterial({ map: glareTex, transparent: true, opacity: 0.13, blending: THREE.AdditiveBlending, depthWrite: false });

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
  const deckPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.92, 1.14), deck);
  deckPlane.rotation.x = -Math.PI / 2;
  deckPlane.position.set(0, 0.1112, -0.36);
  laptop.add(deckPlane);

  // Echte Tasten (eine Instanz-Geometrie, ein Draw-Call): 5 Reihen, untere Reihen mit breiteren Tasten, dazu Leertaste
  const rows = [14, 14, 13, 12, 11];
  const gap = 0.026;
  const rowW = 2.8;
  const keyGeo = new RoundedBoxGeometry(0.176, 0.02, 0.165, 2, 0.007);
  const keyCount = rows.reduce((a, b) => a + b, 0) + 7;
  const keyMesh = new THREE.InstancedMesh(keyGeo, keyMat, keyCount);
  const dummy = new THREE.Object3D();
  let k = 0;
  const zTop = -0.36 - 0.57 + 0.11;
  rows.forEach((n, r) => {
    const keyW = (rowW - gap * (n - 1)) / n;
    for (let i = 0; i < n; i++) {
      dummy.position.set(-rowW / 2 + keyW / 2 + i * (keyW + gap), 0.122, zTop + r * 0.192);
      dummy.scale.set(keyW / 0.176, 1, 1);
      dummy.updateMatrix();
      keyMesh.setMatrixAt(k++, dummy.matrix);
    }
  });
  const lastRow = [0.3, 0.24, 0.24, 1.18, 0.24, 0.24, 0.3];
  let x = -rowW / 2;
  const totalLast = lastRow.reduce((a, b) => a + b, 0) + gap * (lastRow.length - 1);
  x += (rowW - totalLast) / 2;
  lastRow.forEach((w) => {
    dummy.position.set(x + w / 2, 0.122, zTop + 5 * 0.192);
    dummy.scale.set(w / 0.176, 1, 1);
    dummy.updateMatrix();
    keyMesh.setMatrixAt(k++, dummy.matrix);
    x += w + gap;
  });
  keyMesh.instanceMatrix.needsUpdate = true;
  laptop.add(keyMesh);

  const track = new THREE.Mesh(roundedRect(1.16, 0.62, 0.06), pad);
  track.rotation.x = -Math.PI / 2;
  track.position.set(0, 0.1114, 0.66);
  laptop.add(track);

  // Kontaktschatten direkt unter dem Laptop: Er liegt sichtbar auf
  const contact = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 2.7), new THREE.MeshBasicMaterial({ map: shadowTexture(0.9), transparent: true, depthWrite: false, opacity: 0.7 }));
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = 0.001;
  laptop.add(contact);

  const lid = new THREE.Group();
  lid.position.set(0, 0.11, -D / 2 + 0.02);
  const LID_OPEN = -0.3; // gut 107° geöffnet
  lid.rotation.x = LID_OPEN;
  laptop.add(lid);
  const lidBody = new THREE.Mesh(new RoundedBoxGeometry(W, 2.16, 0.07, 4, 0.045), alu);
  lidBody.position.y = 1.08;
  lid.add(lidBody);
  const bezel = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.1, 2.06), blackGlass);
  bezel.position.set(0, 1.08, 0.0362);
  lid.add(bezel);

  // Zwei Bildschirm-Ebenen für weiches Überblenden zwischen den Kundenseiten
  const sites = opts.laptopSites;
  const vids = [makeVideo(sites[0].src, false), makeVideo("", false)];
  const texs = vids.map(videoTexture);
  const mats = texs.map((t, i) => new THREE.MeshBasicMaterial({ map: t, toneMapped: false, transparent: true, opacity: i === 0 ? 1 : 0, depthWrite: false }));
  mats.forEach((m, i) => {
    const s = new THREE.Mesh(new THREE.PlaneGeometry(3.12, 1.95), m);
    s.position.set(0, 1.1, 0.0372 + i * 0.0003);
    s.renderOrder = 1 + i;
    lid.add(s);
  });
  const lapGlare = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.1, 2.06), glare);
  lapGlare.position.set(0, 1.08, 0.0392);
  lapGlare.renderOrder = 5;
  lid.add(lapGlare);

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
  const phGlare = new THREE.Mesh(new THREE.PlaneGeometry(PW - 0.05, PH - 0.05), glare);
  phGlare.position.z = 0.0478;
  phone.add(phGlare);

  // Aufstellung
  laptop.position.set(-0.5, 0, 0);
  laptop.rotation.y = 0.32;
  const PHONE_Y = 1.3;
  phone.position.set(1.7, PHONE_Y, 1.2);
  phone.rotation.set(-0.08, -0.42, -0.06);

  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 4.2), new THREE.MeshBasicMaterial({ map: shadowTexture(0.8), transparent: true, depthWrite: false, opacity: 0.6 }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0.15, -0.002, 0.15);
  root.add(shadow);

  // Größe
  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    baseZ = w / h < 1.05 ? 10.2 : 8.3; // schmale Bühne: weiter weg, damit beide Geräte ganz zu sehen sind
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

  // Kundenseiten auf dem Laptop nacheinander zeigen, mit weicher Überblendung
  let cur = 0;
  let siteIndex = 0;
  let fadeTo = -1;
  let fadeStart = 0;
  const clock = new THREE.Clock();
  const nextSite = () => {
    if (fadeTo >= 0) return;
    const nxt = 1 - cur;
    siteIndex = (siteIndex + 1) % sites.length;
    const v = vids[nxt];
    v.src = sites[siteIndex].src;
    v.load();
    v.play().catch(() => {});
    const go = () => {
      v.removeEventListener("playing", go);
      fadeTo = nxt;
      fadeStart = clock.getElapsedTime();
      opts.onSite?.(sites[siteIndex].domain);
    };
    v.addEventListener("playing", go);
  };
  vids.forEach((v) => v.addEventListener("ended", nextSite));
  opts.onSite?.(sites[0].domain);

  let active = false;
  let raf = 0;
  let readySent = false;
  let scrollTarget = 0;
  let scroll = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const t = clock.getElapsedTime();
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    scroll += (scrollTarget - scroll) * 0.12;
    const s = smooth(Math.min(1, scroll));

    root.rotation.y = Math.sin(t * 0.22) * 0.07 + pointer.x * 0.16 + s * 0.55;
    root.rotation.x = pointer.y * 0.05;
    root.position.y = Math.sin(t * 0.5) * 0.03;
    lid.rotation.x = LID_OPEN + s * 0.5; // beim Herausscrollen klappt der Laptop etwas zu
    phone.position.y = PHONE_Y + Math.sin(t * 1.05) * 0.05 + s * 0.35;
    phone.rotation.y = -0.42 + s * 0.5;
    phone.rotation.z = -0.06 + Math.sin(t * 0.8) * 0.015;
    camera.position.z = baseZ - s * 0.6;
    glareTex.offset.x = 0.22 - root.rotation.y * 0.45; // Reflex wandert mit

    if (fadeTo >= 0) {
      const f = Math.min(1, (t - fadeStart) / 0.7);
      mats[fadeTo].opacity = f;
      mats[1 - fadeTo].opacity = 1 - f;
      if (f >= 1) {
        vids[1 - fadeTo].pause();
        cur = fadeTo;
        fadeTo = -1;
      }
    }

    renderer.render(scene, camera);
    if (!readySent && vids[0].readyState >= 2 && phVideo.readyState >= 2) {
      readySent = true;
      opts.onReady?.();
    }
  };

  const setActive = (on: boolean) => {
    if (on === active) return;
    active = on;
    if (on) {
      clock.start();
      vids[cur].play().catch(() => {});
      phVideo.play().catch(() => {});
      tick();
    } else {
      cancelAnimationFrame(raf);
      vids.forEach((v) => v.pause());
      phVideo.pause();
    }
  };

  const setScroll = (p: number) => {
    scrollTarget = Math.max(0, Math.min(1, p));
  };

  const dispose = () => {
    setActive(false);
    window.removeEventListener("pointermove", onMove);
    vids.forEach((v) => v.removeEventListener("ended", nextSite));
    ro.disconnect();
    [...vids, phVideo].forEach((v) => {
      v.pause();
      v.removeAttribute("src");
      v.load();
    });
    scene.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.geometry) m.geometry.dispose();
      const list = Array.isArray(m.material) ? m.material : m.material ? [m.material] : [];
      list.forEach((mat) => {
        const mm = mat as THREE.MeshStandardMaterial;
        mm.map?.dispose();
        mm.roughnessMap?.dispose();
        mm.dispose();
      });
    });
    envTex.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };

  return { setActive, setScroll, dispose };
}
