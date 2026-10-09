# HANDOFF — BrandWerkX-Website (brandwerkx.de)

Repo `ZaurHa/portfolio` (**öffentlich**) · Next.js 14.1 als statischer Export · Cloudflare Pages · Stand **07.10.2026, abends**

Befehle, Architektur und Deploy stehen in `CLAUDE.md`. Hier stehen Stand, Stolperfallen und nächste Schritte. Weil das Repo öffentlich ist, gehören Kundennamen, Zahlungsstand, Bewertungsplan und andere private Notizen ins Brain (Pfade ganz unten), nicht in diese Datei.

> **Stand 07.10.2026 — PR #2 und PR #3 gemergt und live, Google-Profil angelegt (Claude-Sitzung, jeder Merge von Zaur freigegeben):**
> - **PR #2** (`9fc39b6`, gemergt 18:51): alle Kundenprojekte auf der Website (die Kunden erlauben die Nennung, laut Zaur am 07.10.), Video-Schleifen der Live-Seiten in den Startseiten-Kacheln und in der Projektliste, Serlo-Seite im V3-Design, BX-Favicon statt Vercel-Dreieck, Showreel-Fix.
> - **PR #3** (`bee9329`, gemergt 19:17): Klempner-Diashow mit allen 6 Varianten, Variantenzahl auf der Website auf 6 korrigiert.
> - Beide live geprüft: Inhalte, Favicon, Serlo-Rechtsseiten (HTTP 200), Videos per Range-Request (Safari), Abspieltests mit headless Chrome. Beim Seitenaufruf lädt kein Video, höchstens zwei laufen gleichzeitig, Pause-Knopf und „Bewegung reduzieren“ greifen.
> - **Google-Unternehmensprofil „BrandWerkX“ angelegt** (Dienstleistung im Einzugsgebiet, Kategorie Webdesigner, Geretsried bis München). Offen: Video-Bestätigung durch Zaur bis 10.10.
> - **iCloud-Schaden im `.git` behoben:** iCloud-Konfliktkopien (`refs/heads/claude/nifty-chebyshev-dddfae 2`, `refs/remotes/origin/main 2`, `worktrees/…/index 2`, dazu `node_modules 2` im Worktree) ließen `git fetch` abbrechen. Verschoben, nicht gelöscht, nach `/tmp/git-icloud-duplikate-20261007-204431/` (nach einem Neustart weg).

## Was auf der Website steht

| Bereich | Inhalt | Datei |
| --- | --- | --- |
| Startseite | Hero, Showreel (alle 10 Projekte), 5 Projekt-Kacheln mit Video-Schleife (nur Kundenprojekte: Zaira, MRG, IP Logistik, dpfkat, SM Umzug), Leistungen und Preise, Ablauf, Über mich, Stimmen, Branchen und Regionen, FAQ, Kontakt | `app/[lang]/page.tsx`, Inhalte in `lib/home.ts` (`featuredSlugs` = Kacheln, `projects` = Showreel) |
| Projekte | 11 Einträge: Zaira, MRG (mit Search-Console-Kennzahlen), IP Logistik, MH Logistik, SM Team DPF & Kat (dpfkat.de), SM Team Umzug (smdienstleistung.de), Flott Umzug & Transport (umzug-flott.de, live seit 09.10.), Mobilwerk, Serlo, Berkat (Beta, Standbild), Muster-Website Klempner (Diashow der 6 Varianten) | `app/[lang]/projekte/page.tsx` |
| Landingpages | Übersicht `/de/webdesign` und 10 Seiten: Website erstellen lassen, Website-Kosten, SEO, Landingpage, Handwerker, Kosmetikstudio, Logistik & Transport, Geretsried, Oberland, München (nur Deutsch) | `lib/landing.ts` |
| Über mich | u. a. „Eigene Projekte“: Mobilwerk, Serlo, Berkat | `app/[lang]/ueber-mich/page.tsx` |
| Serlo | `/[lang]/vibes` im V3-Design, noindex. `/[lang]/vibes/datenschutz` und `/[lang]/vibes/agb` sind in App Store Connect hinterlegt: **nie umbenennen oder löschen** (beide noch im alten lila Design) | `app/[lang]/vibes/` |
| Muster | `/muster/klempner` (6 Varianten, Version 6 „SEO Final“ = `final.html`), `/muster/elektriker` und `/muster/kosmetik` (je 3) | `app/muster/kunden.ts`, `public/muster/` |
| KI-Suche | Seitenüberblick und Referenzliste | `public/llms.txt` |

## Technik, die nicht in CLAUDE.md steht

- **Video-Schleifen:** `public/videos/*.mp4` (10 Dateien, zusammen 2,8 MB, H.264 ohne Ton), eingetragen als `video` in `lib/home.ts` und `app/[lang]/projekte/page.tsx`. `components/v3/TileVideo.tsx` lädt erst im Sichtbereich (`preload="none"`) und spielt nur dort; der umgebende Bereich braucht `data-tile-videos` und eine `id`. `TileVideoToggle.tsx` ist der Pause-Knopf für diesen Bereich (WCAG 2.2.2) und startet pausiert bei „Bewegung reduzieren“ und im Datensparmodus. Neu aufnehmen: `scripts/hero-videos/README.md`.
- **Showreel:** Das Band kippt um −3°. Der Drehpunkt sitzt fest auf der Mitte von fünf Rahmen (`transform-origin: calc(5 * (clamp(290px, 46vw, 680px) + 28px)) 0`, mobil `+ 16px`), die Laufzeit beträgt 12,8 s pro Projekt (`animationDuration` in `app/[lang]/page.tsx`). Vorher (`transform-origin: 50% 0`, feste 64 s) sackte das Band mit 10 statt 5 Projekten so tief ab, dass nur noch die Kopfzeilen der Seiten zu sehen waren, und lief doppelt so schnell.
- **Favicon und App-Icons:** `app/favicon.ico` (16/32/48), `app/icon.png` (192), `app/apple-icon.png` (180). Monogramm „BX“ in Inter Tight 800 (variable WOFF2 aus dem Build, Achse `wght` = 800), Laufweite −0,03 em, B `#eeefee`, X `#00ffe7`, Grund `#0a0b0a`.
- **Vorschau und Deploy:** Jeder gepushte Branch bekommt bei Cloudflare eine Vorschau unter `https://<branch, gekürzt>.portfolio-dcp.pages.dev` (dieser hier: `claude-nifty-chebyshev-dddfa.portfolio-dcp.pages.dev`). Ein Merge nach `main` ist nach wenigen Minuten live. Vercel ist noch mit zwei Projekten (`portfolio`, `portfolio-1lqq`) verbunden und baut jeden PR mit. Das ist unnötig, schadet aber nicht, weil die Canonicals auf `https://brandwerkx.de` zeigen.

## Stolperfallen

- **Repo im iCloud-Schreibtisch** (`~/Desktop/portfolio-main`): iCloud lagert Dateien aus (am 07.10. rund 31.000 Dateien in `node_modules`) und legt Konfliktkopien mit „ 2“ an, auch im `.git`. Dann hängen `next dev` und `next lint`, und `git fetch` bricht ab. **Empfehlung: wie MH und IP am 03.10. nach `~/Projekte/` umziehen** und dort neu `npm ci`. Behelf am 07.10.: Pakete per `npm ci --prefer-offline` nach `/tmp/bwx-deps`, Worktree per rsync nach `/tmp/bwx-verify` gespiegelt und dort gebaut.
- **`next dev` liefert für `[lang]`-Seiten HTTP 500** („missing generateStaticParams“, Next 14.1 mit `output: 'export'`), auch auf `main`. Deshalb mit `npm run build` (inkl. ESLint) und `npm run preview` prüfen.
- **Lokaler Stand läuft nicht automatisch mit:** Gemergt wird auf GitHub, der Checkout `~/Desktop/portfolio-main` bleibt dabei stehen (am 07.10. 23 Commits zurück, dann auf `6f4eb16` nachgezogen). Auch Worktrees können alt sein: Dieser hier wurde am 17.07. angelegt und stand am 07.10. noch auf dem Juli-Stand. Vor neuer Arbeit `git fetch` und auf `origin/main` aufsetzen, nach einem Merge im lokalen Checkout `git pull`.
- **`.claude/launch.json`** im Worktree ist nicht versioniert. Die Einträge `brandwerkx-out`, `brandwerkx-verify` und `flott-dist` zeigen auf Hilfsskripte in `/tmp`, die nach einem Neustart fehlen.
- **Muster-Seite:** Varianten wechseln per `contentWindow.location.replace()`, das `src`-Attribut des Rahmens bleibt dabei auf `v1.html`. Zum Prüfen die URL im Rahmen lesen, nicht das Attribut. Cloudflare leitet `*.html` per 308 auf die Adresse ohne Endung um.

## Nächste Schritte

1. **Google-Profil per Video bestätigen** (Zaur, bis 10.10.; Anleitung im Brain-Dokument, Abschnitt 6). Solange Google prüft, nichts am Profil ändern.
2. **Nach der Freischaltung, auf der Website:** Profil-Link ins JSON-LD in `lib/root.tsx` (`sameAs`, dazu `hasMap`) und Bewertungslink auf die Kontaktseite (`app/[lang]/kontakt/`). Keine Sterne-Bewertung per Schema auf der eigenen Seite, denn bei eigenen Bewertungen zeigt Google keine Sterne. Beschreibung, Leistungen und Fotos fürs Profil liegen fertig im Brain-Dokument und in `~/Desktop/BrandWerkX-Google-Profil/`.
3. **Footer-Hinweis „Website: BrandWerkX“ auf den fünf Kundenseiten** (mrg-logistik.de, ip-logistikgmbh.de, mh-logistikgmbh.de, dpfkat.de, smdienstleistung.de), sobald die Kunden zustimmen. Nur der Markenname als Linktext. Ziel ist die passende Branchenseite: Logistik → `/de/webdesign/logistik-und-transport`, SM Team → `/de/webdesign/geretsried`. Bisher verlinkt keine Kundenseite auf BrandWerkX.
4. **brandwerkx.com** zeigt nur eine Hostinger-Parkseite → im hPanel per 301 auf https://brandwerkx.de weiterleiten.
5. **Aufräumen:** Repo aus iCloud holen (siehe Stolperfallen). Optional Vercel abklemmen und die Serlo-Rechtsseiten ins V3-Design bringen, ohne die Routen zu ändern.

## Grenzen

- `/[lang]/vibes/datenschutz` und `/[lang]/vibes/agb` nie umbenennen oder löschen (App Store Connect).
- Ein Merge nach `main` geht sofort live, deshalb nur nach Zaurs ausdrücklichem Ja.
- Das Repo ist öffentlich: keine Kundennamen, Zahlungen, Bewertungspläne oder privaten Notizen in versionierte Dateien.
- Logos und Zitate von Kunden erst nach deren Zustimmung.
- Ins Google-Konto meldet sich Zaur selbst an. Bedingungen und Bestätigungen klickt er selbst.

## Private Notizen (Brain, nur lokal)

- Google-Profil, Top-10-Plan, Bewertungen, Verzeichnis-Einträge: `~/brain/outputs/2026-10-07-brandwerkx-google-unternehmensprofil-setup.md`
- Offene Punkte mit Fristen (Video-Bestätigung, Domain-Mails bei Hostinger, Backlinks, Verzeichnisse): `~/brain/ops/open-loops.md`, Zeilen „BrandWerkX: …“
- Projektseite: `~/brain/projects/brandwerkx.md`
- Bildpaket, Nachrichtenvorlagen und Spickzettel für Verzeichnisse: `~/Desktop/BrandWerkX-Google-Profil/`
