# Beispielbilder für /projekte

Vorfrist und der KI-Assistent haben keine öffentliche Seite. Ihre Vorschaubilder sind Nachbauten mit **erfundenen
Daten** (sichtbar markiert als „Beispieldaten“). Für Vorfrist gilt der Datenschutzvertrag mit dem Kunden: keine echten
Belege, Lieferanten oder Beträge, auch nicht als Bildschirmfoto für eine KI.

```bash
node scripts/beispielbilder/shot.mjs
cwebp -q 82 /tmp/beispielbilder/vorfrist.png -o public/images/vorfrist-preview.webp
cwebp -q 82 /tmp/beispielbilder/ki-assistent.png -o public/images/ki-assistent-preview.webp
```
