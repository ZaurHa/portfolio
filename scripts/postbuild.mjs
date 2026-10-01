// Nach `next build` (statischer Export): gestaltete 404 als out/404.html bereitstellen.
import { copyFileSync, existsSync } from 'node:fs';

const src = 'out/de/seite-nicht-gefunden.html';
if (!existsSync(src)) {
  console.error(`postbuild: ${src} fehlt`);
  process.exit(1);
}
copyFileSync(src, 'out/404.html');
console.log('postbuild: out/404.html aus der gestalteten 404-Seite erzeugt');
