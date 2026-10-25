// Vorschaubild für WhatsApp, LinkedIn & Co. (public/og.jpg, 1200 × 630) aus scripts/og/og.html erzeugen.
// Vorher: npm run build && python3 -m http.server 4324 --bind 127.0.0.1 --directory out
// Aufruf: node scripts/og/render.mjs, danach: python3 scripts/og/jpg.py
// Schriften und Farben kommen aus dem gebauten Export, das Gerätebild ist das Standbild der 3D-Bühne.
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(process.env.PLAYWRIGHT_FROM || "/Users/zaurhatuev/Projekte/MH Logistik Seite/website/package.json");
const { chromium } = require("playwright-core");
const basis = process.env.BASIS || "http://127.0.0.1:4324";

const start = fs.readFileSync("out/de.html", "utf8");
const klassen = start.match(/<html[^>]*class="([^"]+)"/)[1];
const css = [...start.matchAll(/<link rel="stylesheet" href="([^"]+)"[^>]*>/g)].map((m) => `<link rel="stylesheet" href="${m[1]}">`).join("\n");
fs.writeFileSync("out/_og.html", fs.readFileSync("scripts/og/og.html", "utf8").replace("__FONTKLASSEN__", klassen).replace("__CSS__", css));

const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(`${basis}/_og.html`, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
await (await page.$(".og")).screenshot({ path: "/tmp/og.png" });
await browser.close();
fs.rmSync("out/_og.html");
console.log("ok: /tmp/og.png");
