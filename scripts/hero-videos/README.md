# Hero-Videos für Projekt-Kacheln und Projektliste

Startseite (Kacheln) und `/projekte` (Browser-Rahmen) zeigen eine stumme Schleife der jeweiligen Live-Seite (`public/videos/*.mp4`, eingetragen als `video` in `lib/home.ts` bzw. `app/[lang]/projekte/page.tsx`). Neu aufnehmen, wenn sich eine Kundenseite sichtbar ändert.

Voraussetzungen: Google Chrome, `ffmpeg` mit libx264, Python 3 mit Pillow und `playwright-core` aus einem beliebigen lokalen Projekt (Pfad zu dessen `package.json` in `PLAYWRIGHT_FROM`, Standard: MH-Logistik-Website).

Hinweise:
- Das Skript verbirgt `navigator.webdriver`. Manche Seiten (z. B. MH Logistik) schalten ihre Animationen sonst in automatisierten Browsern ab.
- `HIDE_CSS` blendet nur für die Aufnahme Elemente aus, z. B. Cookie-Banner, ohne sie zu bedienen.
- Seiten ohne Bewegung liefern nach dem Laden keine neuen Bilder mehr (sichtbar an der Bilderzahl in der Ausgabe). Dann `SCROLL` nutzen oder ein Standbild behalten (Berkat).

## 1. Aufnehmen (12 s ab Seitenaufruf, 1280 × 800)

```bash
node scripts/hero-videos/record.mjs zaira https://zairabeauty.de 12
node scripts/hero-videos/record.mjs mrg https://mrg-logistik.de 12
node scripts/hero-videos/record.mjs ip https://ip-logistikgmbh.de 12
node scripts/hero-videos/record.mjs mh https://mh-logistikgmbh.de 12
node scripts/hero-videos/record.mjs dpfkat https://www.dpfkat.de 12
SCROLL=1600 SCROLL_AT=1.6 SCROLL_DUR=7 node scripts/hero-videos/record.mjs sm https://smdienstleistung.de 11.5
# Flott: steht nach der Einfahrt still, deshalb runter und wieder hoch scrollen (Schleife beginnt und endet oben)
SCROLL=900 SCROLL_AT=2.2 SCROLL_DUR=3.5 SCROLL_BACK=1.2 node scripts/hero-videos/record.mjs flott https://umzug-flott.de/ 12.5
node scripts/hero-videos/record.mjs mobilwerk https://mobilwerk.vercel.app 12
HIDE_CSS='div.fixed.z-50.rounded-2xl[role="dialog"]{display:none!important}' node scripts/hero-videos/record.mjs serlo https://serlo.ch 12
```

## 2. Schleifen bauen

`S` = Start in Sekunden, `L` = Länge der Schleife, `C` = Überblendung an der Naht.

```bash
python3 scripts/hero-videos/encode.py '[
 {"name":"zaira","out":"public/videos/zaira-hero.mp4","S":2.0,"L":8.0,"C":0.8,"w":1280,"h":800,"crf":27},
 {"name":"mrg","out":"public/videos/mrg-hero.mp4","S":1.2,"L":10.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"ip","out":"public/videos/ip-logistik-hero.mp4","S":2.0,"L":8.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"mh","out":"public/videos/mh-logistik-hero.mp4","S":2.0,"L":8.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"dpfkat","out":"public/videos/dpfkat-hero.mp4","S":2.0,"L":8.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"sm","out":"public/videos/sm-umzug-hero.mp4","S":1.0,"L":6.8,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"flott","out":"public/videos/flott-umzug-hero.mp4","S":1.6,"L":9.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"mobilwerk","out":"public/videos/mobilwerk-hero.mp4","S":1.6,"L":8.0,"C":0.8,"w":960,"h":600,"crf":28},
 {"name":"serlo","out":"public/videos/serlo-hero.mp4","S":2.5,"L":8.0,"C":0.8,"w":960,"h":600,"crf":28}
]'
```

## 3. Klempner-Vorlage: Diashow der 6 Varianten

Screenshots von `https://brandwerkx.de/muster/klempner/v1.html` bis `v5.html` sowie Version 6 unter `…/klempner/final` (1280 × 800, 1,8 s nach dem Laden) als `v1.png` … `v6.png`, dann:

```bash
ffmpeg -y $(for v in 1 2 3 4 5 6 1; do printf -- "-loop 1 -framerate 30 -t 2.2 -i v$v.png "; done) \
  -filter_complex "[0][1]xfade=transition=fade:duration=0.5:offset=1.7[a1];[a1][2]xfade=transition=fade:duration=0.5:offset=3.4[a2];[a2][3]xfade=transition=fade:duration=0.5:offset=5.1[a3];[a3][4]xfade=transition=fade:duration=0.5:offset=6.8[a4];[a4][5]xfade=transition=fade:duration=0.5:offset=8.5[a5];[a5][6]xfade=transition=fade:duration=0.5:offset=10.2[a6];[a6]trim=duration=10.7,setpts=PTS-STARTPTS,scale=960:600:flags=lanczos:out_range=tv,format=yuv420p[v]" \
  -map "[v]" -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -color_range tv -colorspace bt709 -color_primaries bt709 -color_trc bt709 -movflags +faststart -an -r 30 public/videos/klempner-varianten.mp4
```

Die große Kachel (Zaira) bekommt 1280 × 800, alle anderen 960 × 600. Ziel: unter 700 KB pro Video.
