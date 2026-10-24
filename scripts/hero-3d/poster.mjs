// Standbild der 3D-Bühne im Hero (public/images/hero-3d-poster.webp) aus der echten Szene erzeugen.
// Vorher: npm run build && python3 -m http.server 4324 --bind 127.0.0.1 --directory out
// Aufruf: node scripts/hero-3d/poster.mjs, danach: cwebp -q 80 /tmp/hero-3d-poster.png -o public/images/hero-3d-poster.webp
import { createRequire } from "node:module";
const require = createRequire(process.env.PLAYWRIGHT_FROM || "/Users/zaurhatuev/Projekte/MH Logistik Seite/website/package.json");
const { chromium } = require("playwright-core");
const basis = process.env.BASIS || "http://127.0.0.1:4324";
const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2, reducedMotion: "no-preference" });
const page = await ctx.newPage();
await page.goto(`${basis}/de.html`, { waitUntil: "load" });
// Stempel, Live-Hinweis und WhatsApp-Knopf gehören nicht ins Standbild
await page.addStyleTag({ content: ".v3-stage-zone .v3-stamp, .v3-stage3d-live { visibility: hidden !important; } .v3-wa { display: none !important; }" });
await page.waitForSelector(".v3-stage3d.is-ready", { timeout: 30000 });
await page.waitForTimeout(2500);
await (await page.$(".v3-stage3d")).screenshot({ path: "/tmp/hero-3d-poster.png" });
console.log("ok: /tmp/hero-3d-poster.png");
await browser.close();
