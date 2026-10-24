// Rendert die Beispielbilder für /projekte (nur erfundene Daten) als PNG nach /tmp/beispielbilder.
// Aufruf: node scripts/beispielbilder/shot.mjs, danach mit cwebp nach public/images/<name>-preview.webp
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(process.env.PLAYWRIGHT_FROM || "/Users/zaurhatuev/Projekte/MH Logistik Seite/website/package.json");
const { chromium } = require("playwright-core");
const hier = dirname(fileURLToPath(import.meta.url));
mkdirSync("/tmp/beispielbilder", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await (await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 })).newPage();
for (const name of ["vorfrist", "ki-assistent"]) {
  await page.goto(`file://${hier}/${name}.html`);
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `/tmp/beispielbilder/${name}.png` });
  console.log("ok", name);
}
await browser.close();
