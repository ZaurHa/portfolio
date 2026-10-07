// Nimmt den sichtbaren Bereich (Hero) einer Seite als Bildfolge auf.
// Aufruf: node record.mjs <name> <url> [sekunden] [breite] [hoehe]
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";

// playwright-core aus einem beliebigen lokalen Projekt (Standard: MH-Logistik-Website)
const require = createRequire(process.env.PLAYWRIGHT_FROM || "/Users/zaurhatuev/Projekte/MH Logistik Seite/website/package.json");
const { chromium } = require("playwright-core");

const [, , name, url, seconds = "12", w = "1280", h = "800"] = process.argv;
const dir = `${process.env.REC_DIR || "/tmp/rec"}/${name}`;
rmSync(dir, { recursive: true, force: true });
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome", headless: true, args: ["--autoplay-policy=no-user-gesture-required", "--hide-scrollbars"] });
const ctx = await browser.newContext({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1, reducedMotion: "no-preference", locale: "de-DE" });
const page = await ctx.newPage();
const cdp = await ctx.newCDPSession(page);

const frames = [];
const events = {};
cdp.on("Page.screencastFrame", async (f) => {
  frames.push({ data: f.data, t: f.metadata.timestamp });
  try { await cdp.send("Page.screencastFrameAck", { sessionId: f.sessionId }); } catch {}
});
await cdp.send("Page.enable");
cdp.on("Page.loadEventFired", (e) => { events.load = e.timestamp; });
cdp.on("Page.domContentEventFired", (e) => { events.dcl = e.timestamp; });

await cdp.send("Page.startScreencast", { format: "jpeg", quality: 88, maxWidth: +w, maxHeight: +h, everyNthFrame: 1 });
const t0 = Date.now() / 1000;
await page.goto(url, { waitUntil: "commit" });
// Optional: weicher Scroll durch die Seite (SCROLL=px, SCROLL_AT=s, SCROLL_DUR=s)
const scrollPx = +(process.env.SCROLL || 0);
if (scrollPx) {
  await page.waitForTimeout(+(process.env.SCROLL_AT || 1.6) * 1000);
  const dur = +(process.env.SCROLL_DUR || 7) * 1000;
  await page.evaluate(([px, ms]) => new Promise((done) => {
    const start = performance.now();
    const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
    const step = (now) => {
      const p = Math.min((now - start) / ms, 1);
      window.scrollTo(0, px * ease(p));
      if (p < 1) requestAnimationFrame(step); else done();
    };
    requestAnimationFrame(step);
  }), [scrollPx, dur]);
}
await page.waitForTimeout(Math.max(0, +seconds * 1000 - (Date.now() / 1000 - t0) * 1000));
await cdp.send("Page.stopScreencast");
await browser.close();

frames.forEach((f, i) => writeFileSync(`${dir}/f${String(i).padStart(5, "0")}.jpg`, Buffer.from(f.data, "base64")));
const meta = { url, frames: frames.map((f, i) => ({ i, t: f.t })), events, t0 };
writeFileSync(`${dir}/meta.json`, JSON.stringify(meta));
const span = frames.length ? frames.at(-1).t - frames[0].t : 0;
console.log(`${name}: ${frames.length} Bilder über ${span.toFixed(1)} s (≈ ${(frames.length / Math.max(span, 0.01)).toFixed(0)} fps)`);
