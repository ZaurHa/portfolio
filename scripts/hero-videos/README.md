# Hero-Videos für die Projekt-Kacheln

Die Kacheln auf der Startseite zeigen eine stumme Schleife des Heros der jeweiligen Live-Seite (`public/videos/*-hero.mp4`, eingetragen in `lib/home.ts` als `video`). Neu aufnehmen, wenn sich eine Kundenseite sichtbar ändert.

Voraussetzungen: Google Chrome, `ffmpeg` mit libx264, Python 3 mit Pillow und `playwright-core` aus einem beliebigen lokalen Projekt (Pfad zu dessen `package.json` in `PLAYWRIGHT_FROM`, Standard: MH-Logistik-Website).

## 1. Aufnehmen (12 s ab Seitenaufruf, 1280 × 800)

```bash
node scripts/hero-videos/record.mjs zaira https://zairabeauty.de 12
node scripts/hero-videos/record.mjs mrg https://mrg-logistik.de 12
node scripts/hero-videos/record.mjs ip https://ip-logistikgmbh.de 12
node scripts/hero-videos/record.mjs dpfkat https://www.dpfkat.de 12
SCROLL=1600 SCROLL_AT=1.6 SCROLL_DUR=7 node scripts/hero-videos/record.mjs sm https://smdienstleistung.de 11.5
```

SM Team hat keinen bewegten Hero, deshalb der weiche Scroll durch die Seite. Seiten ohne Bewegung liefern nach dem Laden keine neuen Bilder mehr (sichtbar an der Bilderzahl in der Ausgabe).

## 2. Schleifen bauen

`S` = Start in Sekunden, `L` = Länge der Schleife, `C` = Überblendung an der Naht.

```bash
python3 scripts/hero-videos/encode.py '[
 {"name":"zaira","out":"public/videos/zaira-hero.mp4","S":2.0,"L":8.0,"C":0.8,"w":1280,"h":800,"crf":27},
 {"name":"mrg","out":"public/videos/mrg-hero.mp4","S":1.2,"L":10.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"ip","out":"public/videos/ip-logistik-hero.mp4","S":2.0,"L":8.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"dpfkat","out":"public/videos/dpfkat-hero.mp4","S":2.0,"L":8.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"sm","out":"public/videos/sm-umzug-hero.mp4","S":1.0,"L":6.8,"C":0.8,"w":960,"h":600,"crf":28}
]'
```

Die große Kachel (t1) bekommt 1280 × 800, die übrigen 960 × 600. Ziel: unter 700 KB pro Video.
