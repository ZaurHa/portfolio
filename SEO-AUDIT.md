# BrandWerkX – SEO-/GEO-Audit (Stand 2026-10-01)
Read-only Analyse des Repos. Live-Seite war per Proxy nicht abrufbar; Suchvolumina und Messwerte (Lighthouse) sind NICHT verifiziert. Siehe „Gegenprüfung“ am Ende.

## Technisches SEO

Technisches SEO, Stand Repo /home/user/portfolio (Next 14.1.0, App Router). Ich habe nichts im Repo verändert (git status clean). Zum Verifizieren habe ich eine Kopie im Scratchpad gebaut (`next build` + `next start`) und die Antworten mit curl geprüft. Aussagen mit "verifiziert" stammen aus diesen echten HTTP-Antworten, nicht nur aus dem Quelltext.

Gesamtbild: Die Seite ist grundsätzlich crawlbar und indexierbar. Das ist in Ordnung: robots.txt blockiert nur /muster/, die Sitemap enthält genau die 16 echten /de|/en-Routen, alle Hauptseiten haben genau einen h1, Hauptseiten haben eine selbstreferenzierende Canonical, interne Links sind normale <a href>-Anker, und 404-Seiten liefern echten Status 404. Es gibt keinen Fehler, der das Crawling komplett verhindert, deshalb vergebe ich kein "kritisch". Es gibt aber viele Metadaten- und Routing-Fehler, die Ranking-Signale verwässern und Social-Previews zerstören. Die wichtigsten sind:
1. Doppelte Marke im Title ("| BrandWerkX | BrandWerkX").
2. Kaputtes OG-Bild (HTTP 500, durch Middleware zusätzlich auf 404 umgeleitet).
3. Impressum/Datenschutz/Vibes erben Canonical, Title und hreflang der deutschen Startseite, auch auf /en/*.
4. hreflang fehlt auf allen Unterseiten, x-default fehlt überall.
5. Der [lang]-Catch-all liefert für jeden Pfad mit Punkt (/llms.txt, /apple-touch-icon.png, /wp-login.php) HTTP 200 mit der Startseite.
6. Der Widerspruch bei /muster zwischen robots.txt, noindex und Canonical/Metadaten.
7. Das hinterlegte Adressdatum München passt nicht zum Impressum (Geretsried). Das ist eine Schnittstelle zum Thema Google Business Profile.

Empfohlene Reihenfolge: (a) zentrale Metadaten-Hilfsfunktion `buildMetadata(lang, path)` für title/canonical/hreflang/og/twitter, (b) dynamicParams=false plus Middleware-Fix, (c) OG-Bild reparieren, (d) /muster- und Vibes-Entscheidung, (e) Sitemap und Redirects.

### [HOCH] Title-Tags enthalten die Marke doppelt und sind zu lang ("... | BrandWerkX | BrandWerkX")
- **Beleg:** app/layout.tsx:36-39 definiert title.template "%s | BrandWerkX". Die Seitentitel enthalten die Marke aber schon selbst: app/[lang]/page.tsx:18,36; app/[lang]/leistungen/page.tsx:10,24; app/[lang]/projekte/page.tsx:11,17; app/[lang]/projekte/zaira-beauty/page.tsx:11,22; app/[lang]/kontakt/page.tsx:9,15 (dort sogar "| BrandWerkX München" und danach nochmal die Marke). Verifiziert im gebauten HTML: /de liefert `<title>Webentwickler München – Website erstellen lassen | BrandWerkX | BrandWerkX</title>` (77 Zeichen), /de/kontakt `Kontakt – Website anfragen | BrandWerkX München | BrandWerkX`. Nur /muster nutzt korrekt `title: { absolute }` (app/muster/[kunde]/page.tsx:120). Zusätzlich mischen die EN-Titel "München" statt "Munich" (leistungen/page.tsx:24, projekte/page.tsx:17, kontakt/page.tsx:15, ueber-mich/page.tsx:17).
- **Lösung:** Marke aus allen Seitentiteln entfernen und das Template die Marke anhängen lassen, oder pro Seite `title: { absolute: ... }` setzen. Ziel: höchstens 60 Zeichen, Haupt-Keyword vorn, z. B. Start DE "Webentwickler München – Website erstellen lassen" (Template ergänzt die Marke, ca. 61 Zeichen). In EN-Titeln und -Descriptions durchgängig "Munich" verwenden. Mit zentraler Hilfsfunktion absichern, damit das nicht wieder passiert.

### [HOCH] OG-/Twitter-Vorschaubild ist auf drei Ebenen defekt (500-Fehler, Middleware-Redirect auf 404, fehlendes og:image auf Hauptseiten)
- **Beleg:** (1) app/opengraph-image.tsx:52-57: Der Default-Export gibt ein JSX-<div> ("Platzhalter für OpenGraph Image") zurück. Next nutzt bei dieser Dateikonvention den Default-Export; die Funktion `export async function GET` (Zeile 5-50) mit dem ImageResponse wird ignoriert. Verifiziert: Die Route (ohne Middleware getestet) antwortet HTTP 500 "No response is returned from route handler". (2) middleware.ts:18-28 nimmt /opengraph-image nicht aus (kein Punkt im Pfad) und leitet auf /de/opengraph-image um, das 404 liefert. Verifiziert: `/opengraph-image?cc500b2c34f9648b` ergibt 307, dann 404. (3) app/layout.tsx:81-88 und :94 setzen die absolute URL https://brandwerkx.de/opengraph-image, aber jede Seite mit eigenem `openGraph` (alle Hauptseiten) ersetzt das Root-Objekt. Verifiziert: /de, /en, /de/kontakt usw. haben gar kein og:image, og:type, og:site_name oder og:locale. Nur twitter:image zeigt auf die kaputte URL. og:image mit Hash haben nur Seiten ohne eigenes openGraph (Impressum, Datenschutz, Vibes). Inhalt des Bildes ist außerdem "Zaur's Portfolio – Webentwicklung & Projekte" statt BrandWerkX/Keyword; kein `alt`.
- **Lösung:** opengraph-image.tsx so umbauen, dass der Default-Export den ImageResponse zurückgibt (`export const alt`, `size = {width:1200,height:630}`, `contentType = 'image/png'`, `export default function Image(){ return new ImageResponse(...) }`) und GET löschen. Alternativ statisch: ein 1200x630-PNG nach public/og/brandwerkx.png legen. In middleware.ts `/opengraph-image`, `/twitter-image` und `/manifest` ausnehmen. Die manuellen images-Einträge in app/layout.tsx:81-88,94 entfernen (die Konvention ergänzt das Bild) bzw. in der Hilfsfunktion in jedes Seiten-openGraph aufnehmen. Danach per curl -I und im Facebook Sharing Debugger / LinkedIn Post Inspector prüfen.

### [HOCH] Impressum, Datenschutz, Vibes und Siraj erben Canonical, hreflang, Title und og:url der deutschen Startseite (auch /en/*)
- **Beleg:** Diese Seiten haben kein generateMetadata/metadata (app/[lang]/impressum/page.tsx, app/[lang]/datenschutz/page.tsx) bzw. nur title/description (app/[lang]/vibes/*.tsx:4-8, app/[lang]/datenschutz/siraj/page.tsx:3-7) und erben daher app/layout.tsx:66-72 (canonical https://brandwerkx.de/de, hreflang de/en auf die Startseiten) und :77 (og:url "https://brandwerkx.de/"). Verifiziert: /en/impressum liefert canonical=https://brandwerkx.de/de, hreflang de=/de und en=/en (also auf die Startseiten), og:url=https://brandwerkx.de/ und exakt Title und Description der Startseite. /de/datenschutz ebenso. /de/vibes und /de/datenschutz/siraj: canonical /de. Gleichzeitig listet app/sitemap.ts:13-14 /impressum und /datenschutz in beiden Sprachen: Sitemap-URL und Canonical widersprechen sich.
- **Lösung:** canonical und `languages` aus dem Root-Layout entfernen (nur metadataBase behalten). Für jede Seite per Hilfsfunktion `alternatesFor(lang, path)` selbstreferenzierende Canonical plus hreflang liefern. Impressum/Datenschutz: eigener Title und Description pro Sprache. Entweder `robots: { index: false, follow: true }` setzen und aus der Sitemap nehmen, oder sauber indexierbar machen. Vibes/Siraj siehe eigenes Finding.

### [HOCH] hreflang fehlt auf allen Unterseiten, x-default fehlt überall, Sitemap ohne Sprachalternativen
- **Beleg:** Seiten setzen `alternates: { canonical }` ohne `languages`: app/[lang]/leistungen/page.tsx:17,27; kontakt/page.tsx:12,18; projekte/page.tsx:14,20; ueber-mich/page.tsx:14,20; projekte/zaira-beauty/page.tsx:14,25. Next ersetzt `alternates` komplett, die Root-hreflang aus app/layout.tsx:68-71 fällt weg. Verifiziert: Nur /de und /en tragen <link rel="alternate" hreflang>, alle anderen Seiten keine. Ein x-default existiert nirgends (auch nicht in app/[lang]/page.tsx:20-23,38-41). app/sitemap.ts:19-28 enthält keine xhtml:link-Alternativen. Next 14.1.0 unterstützt `alternates` im Sitemap-Typ nicht (nicht in node_modules/next/dist/build/webpack/loaders/metadata/resolve-route-data.js; erst ab 14.2).
- **Lösung:** Hilfsfunktion `alternatesFor(lang, path)` liefern: `{ canonical: `/${lang}${path}`, languages: { de: `/de${path}`, en: `/en${path}`, 'x-default': `/de${path}` } }` (mit metadataBase relative URLs). In allen generateMetadata-Funktionen verwenden. Sitemap: auf Next >= 14.2 upgraden und `alternates.languages` je Eintrag setzen, oder eine eigene Route app/sitemap.xml/route.ts mit xhtml:link ausliefern.

### [HOCH] [lang]-Catch-all erzeugt Soft-404s: jeder Pfad mit Punkt liefert HTTP 200 mit der Startseite
- **Beleg:** middleware.ts:25 (`pathname.includes('.')`) lässt jeden Pfad mit Punkt unangetastet. app/[lang]/layout.tsx:4-6,16 hat kein `dynamicParams = false` und fällt bei unbekanntem Wert auf 'de' zurück. Verifiziert per curl: /llms.txt, /wp-login.php, /foo.bar, /sitemap-de.xml, /manifest.webmanifest, /ads.txt und /apple-touch-icon.png antworten alle 200 text/html mit dem Title der Startseite und Links wie href="/apple-touch-icon.png/kontakt". Besonders relevant: app/layout.tsx:119 verlinkt /apple-touch-icon.png, die Datei existiert aber nicht (nur app/favicon.ico), der "Icon" ist also eine HTML-Seite. Auch eine künftige /llms.txt wäre bis zum Anlegen der Datei eine HTML-Seite, was KI-Crawler verwirrt.
- **Lösung:** In app/[lang]/layout.tsx `export const dynamicParams = false;` setzen (zusätzlich `if (!['de','en'].includes(lang)) notFound()`), dann liefern unbekannte Segmente echtes 404. Middleware-Ausnahme enger fassen (nur echte Dateiendungen wie .ico/.png/.txt/.xml/.webmanifest). Echte Dateien anlegen: app/apple-icon.png (180x180), ggf. app/icon.png, public/llms.txt. Manuelle <link rel="icon"/"apple-touch-icon"> in app/layout.tsx:118-119 entfernen (Next erzeugt die Tags aus app/favicon.ico selbst, im HTML stehen aktuell zwei rel=icon-Tags).

### [HOCH] /muster: Widerspruch zwischen robots.txt, noindex, Canonical/Metadaten und interner Verlinkung
- **Beleg:** public/robots.txt:5 `Disallow: /muster/` sperrt /muster/klempner, /muster/elektriker, /muster/kosmetik und alle public/muster/**/*.html. Aber: (a) /muster ohne Slash ist nicht gesperrt (verifiziert: 200, `index, follow`, canonical /muster; app/muster/layout.tsx:5-12). (b) app/muster/[kunde]/page.tsx:113-127 pflegt Title/Description/Canonical und :146-160 einen sr-only-h1, also SEO-Aufwand für Seiten, die gesperrt sind (verifiziert: robots=`index, follow`). (c) Alle 12 Demo-HTMLs tragen `noindex, nofollow` (public/muster/*/*.html), Google kann das wegen des Disallow nie lesen. Gesperrte URLs können trotzdem ohne Snippet im Index auftauchen. (d) Intern stark verlinkt: components/LayoutClient.tsx:43 (Nav), :335 (Footer), app/[lang]/page.tsx:165 (Projektkarte /muster/klempner). (e) Nicht in der Sitemap (app/sitemap.ts). (f) /de/muster/klempner (app/[lang]/muster/[kunde]/page.tsx:12-19) ist ein redirect() in einer vorgerenderten Seite: verifiziert HTTP 200 mit Error-Shell, canonical /de, `index, follow`, kein h1, Weiterleitung nur per JS (NEXT_REDIRECT 307). /de/muster liefert 404.
- **Lösung:** Entscheidung treffen. Empfohlen für Auftragsgewinnung: /muster und /muster/[kunde] als indexierbare Landingpages ("Website für Klempner/Elektriker/Kosmetik München") mit echtem sichtbarem Text ausbauen, mit /de- und /en-Pfaden, in die Sitemap aufnehmen. Die Demo-HTMLs dagegen `noindex` lassen, aber crawlbar machen: Disallow aus robots.txt entfernen und stattdessen in next.config.js `headers()` für `/muster/:path*.html` den Header `X-Robots-Tag: noindex, nofollow` setzen. Alternative (nichts indexieren): app/muster/layout.tsx `robots: { index: false }`, Metadaten-Aufwand streichen. app/[lang]/muster/* löschen und stattdessen in next.config.js `redirects()` mit permanent: true (308) von /:lang/muster/:kunde nach /muster/:kunde.

### [HOCH] Hartkodierte Adresse München in strukturierten Daten vs. Impressum Geretsried (Schnittstelle zu Google Business Profile)
- **Beleg:** app/layout.tsx:146-150 und :151-154 (ProfessionalService: addressLocality "München", areaServed City München), :200 (Person jobTitle "... München"). Das Impressum nennt dagegen "Steiner Ring 64, 82538 Geretsried" (app/[lang]/impressum/page.tsx:25,38). Auch Preise widersprechen sich: JSON-LD Offers 490/990/99 (layout.tsx:173-191) und Startseite "ab 490€", aber Meta Leistungen/Kontakt "ab 790€" (app/[lang]/leistungen/page.tsx:10,19; kontakt/page.tsx:9). LinkedIn-URL uneinheitlich: layout.tsx:165-166,204-205 `.../zaur-hatuev-8559b91a1/` vs components/LayoutClient.tsx:356 `.../zaur-hatuev`. Das JSON-LD (layout.tsx:121-226) wird auf jeder Seite ausgeliefert, auch auf /en, ausschließlich auf Deutsch.
- **Lösung:** NAP (Name, Adresse, Telefon) überall identisch machen: Das Google Business Profile muss zur echten, im Impressum genannten Adresse passen (Geretsried). Wenn kein Kundenverkehr vor Ort stattfindet, als Dienstleister im Einzugsgebiet (Service-Area-Business) mit ausgeblendeter Adresse einrichten und München als Einzugsgebiet nennen, aber keine München-Adresse vortäuschen. ProfessionalService um `@id`, `image`/`logo`, `telephone`, `streetAddress`, `postalCode` und `founder` als Person-Objekt ergänzen. Das WebSite.potentialAction.SearchAction (layout.tsx:133-136) entfernen, es gibt keine Suche. Ein Preis (490 oder 790) verbindlich festlegen und überall gleich ausweisen. Ein LinkedIn-URL vereinheitlichen. JSON-LD nach Seitentyp (Home vs. Unterseiten, de vs. en) trennen.

### [MITTEL] Redirects: / läuft über 307 und anschließend 308 (Kette), Legacy-URLs nur 307 statt permanent
- **Beleg:** middleware.ts:37-39 baut `/${locale}${pathname}`; für `/` entsteht `/de/` mit Trailing Slash. Verifiziert: `/` ergibt 307 nach /de/, dann 308 nach /de, danach 200. `/kontakt`, `/impressum`, `/agb`, `/vibes` ergeben jeweils 307 (temporär) auf /de/*. NextResponse.redirect nutzt ohne Status 307. Die Weiterleitung hängt außerdem vom Accept-Language-Header ab (middleware.ts:5-12), ohne Vary-Header oder x-default. `/` ist aber die URL, die Backlinks, Google Business Profile und Social-Profile verwenden (app/layout.tsx:77,130 nutzen https://brandwerkx.de).
- **Lösung:** In der Middleware den Pfad ohne Doppel-Slash bauen (`pathname === '/' ? `/${locale}` : `/${locale}${pathname}``). Für Legacy-Pfade ohne Sprache `NextResponse.redirect(url, 308)`. Für `/` entweder fest 308 auf /de (Googlebot sendet kein Accept-Language, die Sprachweiche bringt SEO nichts) oder Deutsch ohne Präfix per rewrite ausliefern. Im Google Business Profile und in allen Profilen direkt https://brandwerkx.de/de als Website-URL eintragen.

### [MITTEL] <html lang="de"> auch auf allen englischen Seiten, Sprachmix auf /en/*
- **Beleg:** app/layout.tsx:112 hat `lang="de"` hart kodiert. Verifiziert: /en liefert `<html lang="de">`. app/[lang]/layout.tsx rendert nur den Client-Wrapper, kein <html>. og:locale ist nur im Root gesetzt (layout.tsx:75, de_DE) und fehlt auf /en (Seiten-openGraph überschreibt). /en/datenschutz ist komplett deutsch und hart kodiert (app/[lang]/datenschutz/page.tsx:6 ff.), und die Prozess-Schritte der EN-Fallstudie sind deutsch (app/[lang]/projekte/zaira-beauty/page.tsx:35-39). Dadurch sind hreflang-Paare nicht wirklich sprachlich getrennt.
- **Lösung:** Root-Layout aufteilen (Route-Groups): app/(site)/[lang]/layout.tsx mit eigenem <html lang={lang}> und app/(demo)/muster/layout.tsx mit lang="de"; die Fonts/Variablen in eine gemeinsame Komponente. og:locale je Sprache in der Hilfsfunktion setzen (de_DE / en_US). Deutsche Texte auf /en/* in die Wörterbücher (lib/i18n/en.ts) übernehmen oder diese Seiten bis dahin auf `noindex` setzen bzw. aus hreflang-Paaren nehmen.

### [MITTEL] OpenGraph wird je Seite überschrieben, Twitter-Karte erbt Startseitentitel auf allen Unterseiten
- **Beleg:** Unterseiten setzen nur `openGraph: { title, description, url }` (z. B. app/[lang]/kontakt/page.tsx:13,19), Next ersetzt das Root-Objekt, daher fehlen og:type, og:site_name, og:locale, og:image. `twitter` wird nie überschrieben, deshalb erben alle Unterseiten twitter:title und twitter:description der Startseite (app/layout.tsx:90-95). Verifiziert: /de/kontakt, /de/leistungen, /de/projekte, /de/ueber-mich und alle /en/*-Seiten tragen `twitter:title="Webentwickler München – Website erstellen lassen | BrandWerkX"` (auf EN-Seiten in deutscher Sprache). Fallstudie: app/[lang]/projekte/zaira-beauty/page.tsx:19,30 deklariert das Bild als 1200x800, die Datei public/images/beauty-praxis-mockup.webp ist 2548x1897 (4:3, ca. 200 KB) und wird von Plattformen zugeschnitten.
- **Lösung:** In der zentralen Hilfsfunktion pro Seite openGraph (type, siteName, locale, url, title, description, images) und twitter (card, title, description, images) vollständig setzen. Für die Fallstudie ein eigenes 1200x630-Bild erzeugen und die echten Maße angeben.

### [MITTEL] Sitemap: lastModified = new Date(), changefreq/priority-Rauschen, Seiten fehlen
- **Beleg:** app/sitemap.ts:24 `lastModified: new Date()` wird zur Build-Zeit ausgewertet. Verifiziert: alle 16 URLs tragen denselben Zeitstempel (2026-10-01T18:31:44.192Z), der sich bei jedem Deploy ändert, auch ohne Inhaltsänderung. Google ignoriert unzuverlässige lastmod-Werte. `changeFrequency`/`priority` (Zeilen 7-14, 25-26) wertet Google nicht aus. Die 16 URLs stimmen mit den echten Routen überein (positiv), aber: impressum/datenschutz (Z. 13-14) haben Canonical auf /de (siehe oben), und indexierbare Seiten /muster, /muster/{klempner,elektriker,kosmetik} fehlen. Keine hreflang-Alternativen (Next 14.1).
- **Lösung:** Pro Route ein festes `lastModified` (Datum der letzten inhaltlichen Änderung) pflegen, nicht new Date(). changeFrequency/priority streichen. Legal-Seiten mit noindex aus der Sitemap nehmen. /muster-Seiten aufnehmen, sobald sie indexierbar sein sollen. Sitemap mit xhtml:link-Alternativen ausliefern (Next >= 14.2 oder eigener Route-Handler).

### [MITTEL] Startseiten-H1 enthält kein Keyword; weitere Heading-Details
- **Beleg:** Positiv: Auf /de, /en, kontakt, leistungen, projekte, ueber-mich, zaira-beauty, muster, vibes ist genau ein h1 vorhanden (verifiziert im HTML). Aber der H1 der Startseite lautet "Dein nächster Kunde sucht dich gerade online." (lib/i18n/de.ts:11-13, gerendert in components/WorkHero.tsx:93-102). Das Keyword steht nur im Eyebrow-Element (de.ts:17 "Webentwickler · München"), nicht in einer Überschrift. /de/projekte springt von h1 (app/[lang]/projekte/page.tsx:92) direkt auf h3 (:123). Die Skill-Karten der Startseite sind <span>, keine Überschriften. /muster nutzt einen sr-only-h1 (app/muster/[kunde]/page.tsx:146-160), das einzige sichtbare Textgerüst der Seite ist ein iframe-Viewer.
- **Lösung:** H1 mit Keyword ergänzen, z. B. Eyebrow-Text als Teil des H1 ("Webentwickler München: Dein nächster Kunde sucht dich gerade online.") oder H1 sichtbar umformulieren. Auf /projekte einen h2 einziehen oder die Karten als h2 auszeichnen. Auf /muster/* sichtbaren Text mit h2-Struktur ergänzen (Branche, Leistungen, Ablauf, FAQ), statt nur sr-only-h1.

### [MITTEL] Vibes- und Siraj-Seiten (fremde App-Projekte) sind indexierbar, verwaist und teils doppelt als statisches HTML vorhanden
- **Beleg:** app/[lang]/vibes/page.tsx, vibes/agb/page.tsx, vibes/datenschutz/page.tsx und app/[lang]/datenschutz/siraj/page.tsx (explizit `robots: { index: true, follow: true }`, Zeile 6) sind nicht verlinkt (grep: keine internen Links) und nicht in der Sitemap, aber verifiziert indexierbar mit Canonical auf /de. Zusätzlich existieren public/vibes/index.html, privacy.html, terms.html, erreichbar unter /vibes/index.html (verifiziert 200) ohne noindex und ohne Canonical (grep in public/vibes/*.html: keine Treffer). Das sind Nicht-BrandWerkX-Themen (Social-Video-App, Quran-App), die den Themenfokus der Domain verwässern.
- **Lösung:** `robots: { index: false, follow: false }` für /[lang]/vibes*, /[lang]/datenschutz/siraj setzen und für public/vibes/*.html per next.config.js headers() `X-Robots-Tag: noindex`. Die Seiten bleiben für App-Store-Links erreichbar. Besser: auf eine eigene Domain oder Subdomain auslagern. Doppelte Varianten (statisch vs. App-Route) auf eine reduzieren.

### [MITTEL] Tote Legacy-Routen unter app/* und ungenutzte Footer-Komponente; /agb existiert faktisch nicht
- **Beleg:** app/page.tsx, app/kontakt/page.tsx, app/leistungen/page.tsx, app/ueber-mich/page.tsx, app/impressum/page.tsx, app/datenschutz/page.tsx, app/datenschutz/siraj/page.tsx, app/agb/page.tsx duplizieren die Seiten unter app/[lang]/*. Die Middleware (middleware.ts:30-39) leitet alle Pfade ohne Sprachpräfix um, bevor sie rendern (verifiziert: /kontakt, /impressum, /agb ergeben 307 auf /de/*), nur /muster ist ausgenommen. Sie werden trotzdem mitgebaut (Build-Ausgabe `○ /kontakt`, `○ /agb` usw.), driften inhaltlich (app/leistungen/page.tsx:10 "790€", Legacy-Texte) und verwirren Pflege. app/agb/page.tsx ist deshalb nie erreichbar: /agb ergibt 307, dann /de/agb ergibt 404 (kein app/[lang]/agb). components/Footer.tsx:7-10 (Links /impressum, /datenschutz, /agb, /kontakt) wird nirgends importiert (grep) und ist toter Code.
- **Lösung:** Legacy-Dateien löschen (außer app/muster). In next.config.js `redirects()` für die alten Pfade `/kontakt`, `/leistungen`, `/ueber-mich`, `/impressum`, `/datenschutz` nach `/de/...` mit permanent: true. AGB als app/[lang]/agb/page.tsx neu anlegen und im Footer verlinken (relevant für Auftragsvergabe), oder bewusst entfernen. components/Footer.tsx löschen.

### [NIEDRIG] 404-Seite: nur Deutsch, ohne Navigation/Metadaten, widersprüchliche robots-Meta, 2-Schritt-Redirect für unbekannte URLs
- **Beleg:** app/not-found.tsx:1-8: hart kodiert "Seite nicht gefunden", <a href="/"> statt <Link>/Sprachpräfix (löst 307+308-Kette aus), kein Layout mit Nav/Footer (kein app/[lang]/not-found.tsx), eigene Farbe #0d9488. Verifiziert: /de/xyz antwortet korrekt mit Status 404, enthält aber zwei robots-Tags (`noindex` von Next und `index, follow` aus dem Root) sowie Canonical und hreflang der Startseite. Google wertet noindex am strengsten, die Ausgabe ist aber unsauber. Unbekannte URLs ohne Präfix (/xyz) laufen 307 auf /de/xyz, dann 404.
- **Lösung:** app/[lang]/not-found.tsx mit lokalisierten Texten, Navigation und Links zu Leistungen/Projekte/Kontakt anlegen. Auf der 404-Seite keine Canonical/hreflang erben (eigene `metadata` mit `robots: { index: false }`). Link auf `/${lang}` setzen.

### [NIEDRIG] Interne Verlinkung und URL-Struktur: /muster ohne Sprachpräfix, Query-Varianten, deutsche Slugs unter /en
- **Beleg:** Positiv: Navigation, Footer und Karten sind echte <a href>-Anker via next/link, Sprachwechsler steht serverseitig im HTML (z. B. href="/en/leistungen", verifiziert). Probleme: (a) components/LayoutClient.tsx:43,335 verlinkt /muster ohne Sprache, auch aus der EN-Version; (b) app/[lang]/leistungen/LeistungenClient.tsx:200 erzeugt Links `/de/kontakt?package=seo & wartung` und `?package=custom website` (verifiziert im HTML; nicht URL-kodiert, Leerzeichen und &), Canonical auf /kontakt fängt das ab, die Links sind aber fehlerhaft; (c) EN-URLs verwenden deutsche Slugs (/en/leistungen, /en/ueber-mich, /en/projekte), ohne EN-Keywords in der URL; (d) keine Breadcrumbs; (e) verwaiste Seiten (Vibes, Siraj, /de/muster/*). Es gibt keinen internen Link auf die Sitemap-fremden Seiten.
- **Lösung:** Query-Werte mit encodeURIComponent und sauberen Slugs (`?package=seo-wartung`) bauen. Auf /muster sprachabhängig verlinken oder /muster zweisprachig machen. Für EN langfristig lokalisierte Slugs (/en/services, /en/about, /en/projects) mit Redirects prüfen. Breadcrumb-Navigation plus BreadcrumbList-JSON-LD auf Unterseiten ergänzen.

### [NIEDRIG] robots.txt: korrekt, aber ohne API-Ausschluss und ohne explizite KI-Crawler-Regeln; /llms.txt liefert Soft-404
- **Beleg:** public/robots.txt:1-7: `User-agent: *`, `Allow: /`, `Disallow: /muster/`, Sitemap-Zeile https://brandwerkx.de/sitemap.xml (stimmt mit app/sitemap.ts überein, verifiziert 200). Kein `Disallow: /api/` (app/api/contact/route.ts ist nur POST). Keine expliziten Regeln für KI-Crawler (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended). Durch `Allow: /` sind sie erlaubt, eine bewusste Regel fehlt. Verifiziert: /llms.txt liefert HTTP 200 text/html mit der Startseite (siehe Catch-all-Finding).
- **Lösung:** robots.txt ergänzen: `Disallow: /api/`; für gewollte KI-Suche explizite `Allow`-Gruppen (OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended) bzw. bewusste Sperre einzelner Trainings-Bots. Das /muster-Disallow gemäß Muster-Finding anpassen. public/llms.txt mit kurzer Beschreibung, Leistungen, Preisen und Kernlinks anlegen. Beides erst nach dem dynamicParams-Fix verlässlich testbar.

### [NIEDRIG] next.config.js ohne redirects()/headers(), Next.js 14.1.0 veraltet
- **Beleg:** next.config.js:1-18 enthält nur images.remotePatterns. Keine Redirects (Legacy, /muster), keine Header (X-Robots-Tag für statische Demos, Cache), keine www-Behandlung im Code (kann in den Vercel-Domain-Einstellungen liegen, im Repo nicht prüfbar). package.json: "next": "14.1.0" (Sitemap-Alternates erst ab 14.2, bekannte Sicherheitsupdates seit 14.1).
- **Lösung:** next.config.js um `redirects()` (permanente Legacy-Weiterleitungen) und `headers()` (X-Robots-Tag für /muster/**/*.html und /vibes/*.html) erweitern. Im Vercel-Dashboard www.brandwerkx.de auf brandwerkx.de mit 308 weiterleiten und die Apex-Domain als Primary setzen. Next auf die aktuelle 14.2.x oder 15.x anheben, danach Build prüfen (ESLint blockiert Deploys laut CLAUDE.md).

## Inhalt & Keywords

Dimension Onpage-Inhalt und Keywords, rein lesend aus dem Code abgeleitet. Live-Abruf von brandwerkx.de und ein Build waren in der Sandbox nicht möglich (Egress-Proxy blockiert). Titel-Doppelsuffix, Canonical-Vererbung und html-lang sind daher aus den Next.js-Metadata-Regeln abgeleitet und sollten im gerenderten HTML kurz gegengeprüft werden.

Gesamturteil: Technisch wird der Text serverseitig geliefert, er steckt also nicht im reinen Client-Render. Die Ausnahmen sind die FAQ-Antworten und die Zähler (Findings 8, 14). Inhaltlich ist die Seite eine Portfolio-Visitenkarte und keine Akquise-Seite: nur 6 indexierbare Inhaltsseiten pro Sprache, jeweils grob 150–400 Wörter. Es gibt keine einzige Seite, die auf eine Suchanfrage wie "Website erstellen lassen" oder "Webdesign Geretsried/München" zugeschnitten ist. Zusätzlich widersprechen sich Standort, Preise und Leistungsversprechen quer durch Metadaten, Seitentext, Schema.org und Impressum.

Keyword-Inventur (sichtbarer Text ohne Metadaten, DE, grob gezählt):
- "Website" kommt etwa 50-mal vor, überwiegend in Fließtext und Dictionary.
- "Webdesign" steht 1-mal auf der Startseite (Ticker, die zweite Ticker-Zeile ist aria-hidden) und 2-mal auf Über mich (Skill-Tag und Rollenzeile).
- "Webentwickler" steht nur im Hero-Eyebrow (de.ts:17) und auf Über mich.
- "Freelancer/Freelance" kommt im sichtbaren Text 0-mal vor, nur in Meta und Keywords.
- "erstellen lassen" kommt 0-mal vor, nur im Title der Startseite.
- "München" steht auf Leistungen und Kontakt im Body 0-mal, obwohl beide Titles es enthalten. Auf der Startseite kommt es etwa 5-mal vor, auf Über mich 2-mal.
- "Geretsried" (die tatsächliche Impressumsadresse) steht nur in den Rechtstexten, nie in Titel, H1 oder Fließtext. Dasselbe gilt für Oberbayern, Landkreis und Nachbarorte.
- "Handwerker" kommt 1-mal vor (Über mich), "Landingpage" 1–2-mal, "Online-Shop" nur im Ticker, "Kosten" 3-mal.
- "Next.js" ist mit rund 14 Treffern das häufigste Fachwort, obwohl Handwerker und kleine Betriebe nicht danach suchen.
- Der Text enthält weder "Google Unternehmensprofil" noch "Google Business Profile" noch "Maps" noch "KI-Suche". Ein Leistungspunkt heißt veraltet "Google My Business" (LeistungenClient.tsx:92).

Was fehlt für Rankings: Leistungs-Landingpages, Branchenseiten (aktuell durch robots gesperrt), Orts- und Umlandseiten, eine eigene Preis- und FAQ-Seite, Referenzseiten für Mobilwerk, MRG und Serlo, ein Ratgeber und eine /agb-Seite, die nicht in 404 läuft. Details und Seitenvorschläge stehen in den Findings 1, 2, 3, 5, 7 und 9.

Kurzfassung der Title/H1/Meta-Bewertung:
- Startseite: Title brauchbar (61 Zeichen, vor dem Doppelsuffix), H1 ohne jedes Keyword.
- Leistungen: Title und Meta nennen 790 €, der Body 490 €.
- Kontakt: H1 "Lass uns reden." ist ohne Keyword, Meta nennt 790 €.
- Projekte: H1 "Ausgewählte Projekte" ohne Keyword.
- Über mich: Meta behauptet "8+ Jahre", der Body nicht.
- Impressum, Datenschutz und Vibes haben keine eigenen Meta-Angaben und erben Home-Title und Home-Canonical.
- Englische Seiten verwenden in Meta teils "München" statt "Munich".
Konkrete Ersatztexte stehen in Finding 4.

Reihenfolge der Umsetzung: zuerst die Fakten klären (Standort, Preise, Laufzeiten, Kontaktdaten, Finding 1, 10, 11, 12), dann die Metadaten-Fehler beheben (Findings 3, 4, 6), dann Leistungs-, Branchen- und Ortsseiten bauen (2, 3, 5, 7), erst danach Ratgeber und Blog.

### [KRITISCH] Standort-Widerspruch: überall 'München', Impressum und AGB sagen Geretsried
- **Beleg:** Impressum app/[lang]/impressum/page.tsx:25,38 und Datenschutz app/[lang]/datenschutz/page.tsx:11: Steiner Ring 64, 82538 Geretsried; AGB app/agb/page.tsx:20: Gerichtsstand Geretsried. Dagegen München in: app/layout.tsx:37,141,149,152 (Schema.org address und areaServed, Title), de.ts:17 (Hero-Eyebrow 'Webentwickler · München'), de.ts:126, LayoutClient.tsx:325 ('München, Deutschland') und :377 ('Gebaut in München'), alle Metadaten (app/[lang]/page.tsx:18, leistungen:10, kontakt:9, projekte:11, ueber-mich:11). Geretsried kommt in Titel, H1 und Fließtext nirgends vor.
- **Lösung:** Standort-Entscheidung treffen, bevor das Google Unternehmensprofil angelegt wird. Der NAP-Eintrag (Name, Adresse, Telefon) muss bei Google, Impressum, Schema und Seitentext identisch sein. Empfehlung: Service-Area-Business mit Sitz Geretsried und Einsatzgebiet München/Oberbayern/deutschlandweit remote. Im Profil kann die Adresse ausgeblendet werden, wenn kein Kundenverkehr stattfindet. Im Text ehrlich formulieren, z. B. 'Webdesigner aus Geretsried bei München'. Schema.org (app/layout.tsx:146-153) auf die echte Adresse mit addressLocality 'Geretsried' und areaServed [München, Landkreis Bad Tölz-Wolfratshausen, Starnberg, Bayern] umstellen. 'Gebaut in München' (LayoutClient.tsx:377) und 'München, Deutschland' (:325) anpassen. Titles dürfen 'Raum München' behalten, wenn das Einsatzgebiet wirklich dort liegt.

### [KRITISCH] Keine Landingpages je Leistung: Suchbegriffe wie 'Website erstellen lassen' sind nicht abgedeckt
- **Beleg:** Sitemap app/sitemap.ts:6-15 enthält nur: Startseite, /leistungen, /projekte, /projekte/zaira-beauty, /ueber-mich, /kontakt, /impressum, /datenschutz (je de/en). Alle drei Angebote (Muster-Website, Custom Website, SEO & Wartung) und alle Add-ons (Google My Business 149 €, Speed-Optimierung 199 €, Zusatzseiten, Wartung) liegen als Karten auf einer einzigen Seite (LeistungenClient.tsx:26-118). Landingpage und Online-Shop stehen nur als Ticker-Wörter (app/[lang]/page.tsx:205-207), Webapp nur als Kontakt-Option (de.ts:164).
- **Lösung:** Pro Leistung eine eigene indexierbare Seite mit 500–800 Wörtern, eigenem H1, Preis, Ablauf, FAQ und CTA. Vorschläge: /leistungen/website-erstellen-lassen (Pillar), /leistungen/landingpage, /leistungen/online-shop, /leistungen/website-relaunch, /leistungen/seo-lokal (lokale SEO), /leistungen/google-unternehmensprofil (Einrichtung, bisher 'Google My Business'), /leistungen/website-wartung und /leistungen/webentwicklung (Next.js, Web-Apps). /leistungen wird zur Übersicht mit Links darauf. Alle in sitemap.ts aufnehmen und intern aus Nav, Footer, Home und Case Studies verlinken (Footer-Navigation LayoutClient.tsx:333-337 hat heute nur 5 Links).

### [HOCH] Keine Orts-, Umland- und Branchenseiten
- **Beleg:** Kein Treffer für Geretsried, Wolfratshausen, Bad Tölz, Starnberg oder Oberbayern im Content. Branchen (Handwerker, Klempner, Elektriker, Kosmetik) kommen nur als je einmaliges Wort vor (Über mich de.ts:127) bzw. in /muster (gesperrt, siehe Finding 7).
- **Lösung:** Wegen der starken Agentur-Konkurrenz auf 'Webdesign München' besser Nische und Ort kombinieren. Orte: /webdesign-geretsried, /webdesign-muenchen, /webdesign-wolfratshausen, /webdesign-bad-toelz, /webdesign-starnberg (maximal 4–5 Seiten, jede mit echtem, eigenem Inhalt: Referenzen, Region, Anfahrt, FAQ; keine Doorway-Pages). Branchen: /website-fuer-handwerker, /website-fuer-klempner, /website-fuer-elektriker, /website-fuer-kosmetikstudio, /website-fuer-friseur. Die Branchenseiten bündeln die Musterdesigns (Preis 490 €, 5 Tage) mit echtem Text, Screenshots und Schema 'Service'.

### [HOCH] Title/H1/Meta der Seiten: Bewertung und konkrete Ersatztexte
- **Beleg:** Startseite: H1 = 'Dein nächster Kunde sucht dich gerade online.' (de.ts:11-13, WorkHero.tsx:93-102) enthält kein Keyword. Leistungen: H1 '3 Wege zur professionellen Website.' (de.ts:77) ohne Ort oder Preis. Kontakt: H1 'Lass uns reden.' (de.ts:149). Projekte: H1 'Ausgewählte Projekte' (de.ts:45). Über mich: H1 = 'Zaur Hatuev' (de.ts:125). Zaira-Case: H1 = 'Zaira Beauty Face'. Die H2 der Startseite 'Echte Projekte. Echte Ergebnisse.', 'Mein Werkzeugkasten', 'Was Kunden sagen.' tragen keine Suchbegriffe. Länge der Meta-Descriptions DE: 150–178 Zeichen, mehrere werden abgeschnitten (leistungen/page.tsx:11 = 178, ueber-mich/page.tsx:12 = 174).
- **Lösung:** Neu (DE, Titel ohne Suffix, wenn das Template ' | BrandWerkX' angehängt wird, siehe Finding 6). Startseite: Title 'Website erstellen lassen ab 490 € | Webdesigner Raum München' (absolute), H1 'Website erstellen lassen – ab 490 €, live in 5 Tagen'. Den emotionalen Satz als Subline behalten, ebenso das Eyebrow 'Webdesigner · Geretsried bei München'. Meta: 'Freelance Webdesigner aus Geretsried bei München: Website erstellen lassen ab 490 € Festpreis, live in 5 Tagen. Für Handwerker & kleine Betriebe.' (145 Zeichen). Leistungen: Title 'Website-Preise: Festpreis ab 490 €', H1 'Website erstellen lassen: Pakete & Festpreise', Meta 'Muster-Website ab 490 €, Custom Website ab 990 €, SEO & Wartung ab 99 €/Monat. Festpreis, Hosting im 1. Jahr inklusive. Jetzt Angebot anfragen.' Kontakt: Title 'Website-Angebot anfragen – Antwort in 24 h', H1 'Website-Angebot anfragen', Meta 'Kostenloses Erstgespräch, Antwort in 24 Stunden – per Formular, E-Mail oder WhatsApp. Webdesigner Raum München.' Projekte: Title 'Referenzen: Websites für Kosmetik & Logistik', H1 'Referenzen: Websites, die Anfragen bringen'. Zaira: Title 'Kosmetikstudio-Website: +40 % Anfragen', H1 'Kosmetikstudio-Website: +40 % Kundenanfragen in 90 Tagen'. Über mich: Title 'Zaur Hatuev – Freelance Webdesigner', H1 'Zaur Hatuev – Freelance Webdesigner & Entwickler'. EN: Home 'Website Design from €490 | Freelance Web Developer, Munich Area', Leistungen 'Website Prices: Fixed Price from €490', Kontakt 'Request a Website Quote – Reply within 24h'. H2 der Startseite ersetzen, z. B. 'Referenzen: Websites für Kosmetik, Logistik und Transport', 'Technik hinter deiner Website: Next.js, SEO, Performance', 'Kundenstimmen zu BrandWerkX'.

### [HOCH] Hauptseite ohne Leistungskeyword im sichtbaren Text, kaum Fließtext, viel Floskel
- **Beleg:** Geschätzter sichtbarer Textumfang DE: Startseite ca. 300–380 Wörter, Leistungen ca. 350–400, Projekte ca. 200, Zaira-Case ca. 200, Über mich ca. 150, Kontakt ca. 130. 'Webdesign' auf der Startseite nur im Ticker (page.tsx:206, die zweite Ticker-Zeile ist aria-hidden, TickerMarquee.tsx:9). Die Skill-Karten liefern nur Fachchips: 'App Router, SSR, ISR', 'Lighthouse 100', 'Type-safe Code' (page.tsx:70-80). Zielgruppe (Handwerker, Selbstständige, kleine Betriebe) steht nur in der Bio (de.ts:127).
- **Lösung:** Pro Seite 500–800 Wörter nutzerzentrierter Text: Problem des Kunden, Leistung, Preis, Ablauf, Beweis, FAQ. Startseite um Abschnitte 'Für wen' (Handwerker, Praxen, Studios, lokale Betriebe), 'Was kostet eine Website' (Kurzfassung mit Link) und 'Warum regional' ergänzen. Entwicklerjargon (SSR, ISR, Type-safe) in Nutzenformulierungen übersetzen ('lädt in unter 2 Sekunden, bessere Google-Werte').

### [HOCH] Title-Template erzeugt vermutlich doppeltes ' | BrandWerkX'; Canonical und Meta werden fehlerhaft vererbt
- **Beleg:** app/layout.tsx:36-39 definiert title.template '%s | BrandWerkX', gleichzeitig enthalten alle Seitentitel das Suffix schon: app/[lang]/page.tsx:18, leistungen/page.tsx:10, kontakt/page.tsx:9, projekte/page.tsx:11, zaira-beauty/page.tsx:11, ueber-mich/page.tsx:11 (Next.js wendet das Template auf Kind-Segmente an; ohne Build nicht geprüft). Ergebnis: Titles von 60–74 Zeichen, z. B. 'Zaira Beauty Face – Webdesign Case Study München | BrandWerkX | BrandWerkX'. Impressum (app/[lang]/impressum/page.tsx), Datenschutz (app/[lang]/datenschutz/page.tsx) und Siraj-Datenschutz haben keine eigene Metadata und erben Root-Title, Root-Description und canonical 'https://brandwerkx.de/de' (app/layout.tsx:66-72). Dadurch zeigt auch /en/impressum auf /de. Alle Unterseiten überschreiben 'alternates' und liefern nur canonical, aber kein hreflang languages (z. B. leistungen/page.tsx:17); die Startseite hat languages ohne x-default.
- **Lösung:** Suffix aus den Seitentiteln entfernen und das Template behalten, oder Titles mit title:{absolute:...} setzen. Root-Canonical (app/layout.tsx:66-72) streichen und pro Seite self-canonical plus alternates.languages {de, en, x-default} setzen. Für Impressum, Datenschutz und Vibes eigene generateMetadata ergänzen (z. B. 'Impressum – BrandWerkX', robots noindex für Rechtsseiten ist üblich, dann aber nicht in die Sitemap).

### [HOCH] Branchen-Musterseiten sind für Google praktisch unsichtbar, obwohl sie das Kernprodukt zeigen
- **Beleg:** public/robots.txt:5 'Disallow: /muster/'. Alle Demo-HTMLs unter public/muster/** tragen robots noindex (z. B. klempner/final.html:11). Die Seite /muster/[kunde] rendert nur einen sr-only-H1 plus iframe-Viewer (app/muster/[kunde]/page.tsx:146-166), also kein indexierbarer Text. Das Hauptangebot 'Muster-Website ab 490 €' verlinkt genau dorthin (LeistungenClient.tsx:44, Nav LayoutClient.tsx:43). /muster fehlt in der Sitemap. Die Metadata in app/muster/layout.tsx:7-14 wird wegen der robots-Sperre nie gesehen.
- **Lösung:** Das Showcase intern lassen und stattdessen indexierbare Branchen-Landingpages (Finding 3) bauen: je 3–5 Screenshots (nicht iframes), Beschreibung der Versionen, Preis, Ablauf, FAQ. Demo-HTMLs weiter noindex. Hinweis: robots-Sperre und noindex im selben Pfad ist redundant. Wenn die Branchenseiten indexierbar sein sollen, liegen sie unter einem anderen Pfad als /muster/.

### [HOCH] FAQ-Antworten stehen nicht im HTML, kein FAQPage-Markup
- **Beleg:** LeistungenClient.tsx:122-133: '{open && <div className="faq-answer">{a}</div>}' rendert die Antwort erst nach Klick. Crawler und KI-Systeme sehen nur die 4 Fragen (de.ts:106-113), die Antworten nicht. In app/ gibt es keinen FAQPage-, Breadcrumb-, Service- oder Review-Block (einziges JSON-LD: app/layout.tsx:123-225). Die Fragen sind obendrein dünn: nichts zu Kosten, Rechtstexten, Hosting, Ablauf oder Google Unternehmensprofil.
- **Lösung:** Antworten immer im DOM rendern (<details>/<summary> oder CSS-Collapse statt bedingtem Rendering). 10–15 FAQs auf /leistungen und auf den Leistungsseiten ergänzen ('Was kostet eine Website für einen Handwerker?', 'Wie lange dauert es?', 'Ist Impressum/Datenschutz dabei?', 'Was ist ein Google Unternehmensprofil und richtest du es ein?', 'Gehört mir die Website?'). Dazu FAQPage-JSON-LD, das exakt dem sichtbaren Text entspricht.

### [HOCH] Kein Ratgeber/Blog, keine KI-taugliche Wissensschicht
- **Beleg:** Es gibt weder app/[lang]/blog noch Ratgeber-Routen; die Sitemap kennt keine Inhaltsseiten außer den 8 Basisrouten. Die Pläne im Repo (portfolio-plan.md) sehen nur Projekte, About, Contact vor.
- **Lösung:** Ein kleiner Ratgeber mit 6–8 Artikeln, die echte Suchanfragen von Handwerkern und kleinen Betrieben bedienen: 'Was kostet eine Website 2026? (Preisübersicht für Handwerker)', 'Google Unternehmensprofil einrichten – Schritt für Schritt', 'Website-Pflichtangaben: Impressum, Datenschutz, Cookie', 'Website-Relaunch: Checkliste', 'Next.js oder WordPress für kleine Betriebe', 'Lokale SEO für Handwerker im Raum München'. Jeder Artikel mit Autor (Zaur Hatuev), Datum, Stand, Quellen und Link auf die passende Leistungsseite. Klare Antwort im ersten Absatz, Tabellen und FAQ-Blöcke, das hilft auch bei KI-Zitaten.

### [HOCH] Preise und Leistungsversprechen widersprechen sich über Seiten, Meta, Schema und Formular
- **Beleg:** Einstiegspreis: Home/Hero/Badges 'ab 490€' (de.ts:14,79; LeistungenClient.tsx:29) und Schema price 490 (app/layout.tsx:176) gegenüber Meta '... ab 790€' in leistungen/page.tsx:10-11,19-20,24-25 und kontakt/page.tsx:10,13,16,19 sowie Kontaktformular-Budget ab '790 € – 1.500 €' (de.ts:170; die 490-€-Kunden haben keine passende Option). Der Meta-Text nennt 'Landingpage, Business-Website oder Premium-Lösung' (leistungen/page.tsx:11), die Seite zeigt 'Muster-Website, Custom Website, SEO & Wartung'. Wartung: Paket 'ab 99€/Monat' (LeistungenClient.tsx:67, Schema :190) gegenüber Add-on 'Wartung & Updates ab 49€/Monat' (:116). Laufzeit: 'In 5 Tagen live' in CTA und Hero (de.ts:14,29,92), 3–5 Werktage bei Muster (LeistungenClient.tsx:38; de.ts:107), Hero-Badge 5–10 Tage (de.ts:80), Custom 7–14 Tage (LeistungenClient.tsx:57). Die tote Legacy-Seite app/leistungen/page.tsx:10,27,45,66,67 enthält noch Preise 790/1.500/2.500 €, SEO ab 200 €, Wartung ab 50 €.
- **Lösung:** Eine einzige Preisquelle (z. B. lib/pricing.ts) für Seite, Meta, Schema und Formular anlegen. Preise vereinheitlichen: Muster ab 490 €, Custom ab 990 €, Wartung ab 99 €/Monat (oder 49 € als Basis klar benennen). Budget-Dropdown in de.ts:170-174 um '< 1.000 €' ergänzen. Zeitversprechen je Paket exakt nennen ('Muster: 3–5 Werktage, Custom: 7–14 Tage') und die Headline '5 Tage' nur für das Muster-Paket verwenden. Schema-Offer-Beschreibungen anpassen.

### [HOCH] Kontaktdaten: Gmail statt Domain-Mail, keine Telefonnummer im NAP, WhatsApp nur im Code
- **Beleg:** Öffentliche Adresse überall brandwerkx@gmail.com (LayoutClient.tsx:348, KontaktClient.tsx:139, Impressum :31, Schema app/layout.tsx:144,220, de.ts:178). Versand läuft aber über zaur@brandwerkx.de (app/api/contact/route.ts:146,155). Eine Telefonnummer existiert nur als WhatsApp-Link 0172 8471641 (LayoutClient.tsx:277,350). Sie steht weder im Impressum noch in Schema, Kontaktseite oder Footer als Text. app/layout.tsx:62-65 setzt formatDetection telephone:false. Der Kontaktseite fehlt jede Orts- oder Adressangabe (nur 'Mo–Fr 9–18 Uhr' de.ts:182). Die WhatsApp-Vorlage ist auch auf EN deutsch.
- **Lösung:** Eine Domain-Adresse (info@ oder zaur@brandwerkx.de) überall einsetzen und mit der Google-Business-Verifizierung abstimmen. Telefonnummer (die echte Rufnummer, die später im Unternehmensprofil steht) als Text im Footer, Impressum, Kontaktseite und Schema 'telephone' ausgeben. Kontaktseite um Region ('Webdesign Raum München, Landkreis Bad Tölz-Wolfratshausen'), Öffnungszeiten (openingHoursSpecification) und Karte/Einsatzgebiet ergänzen.

### [HOCH] Unbelegte, teils widersprüchliche Erfolgsbehauptungen
- **Beleg:** 'Top-3 bei Google' als Kennzahl (de.ts:18; page.tsx:90) ohne Suchbegriff und Zeitpunkt, 'Seite-1-Ranking auf Google' (de.ts:67), Case 'Top 3' (zaira-beauty/page.tsx:71,248), Ticker-Label 'TOP 3 · GOOGLE' (page.tsx:120), Hero-Badge 'Top 3 · Google' (WorkHero.tsx:27). Lighthouse einmal '100' (page.tsx:77), '97 / 100' (de.ts:212), 'über 95' (de.ts:145). '+40 %' und '+150 %' (zaira-beauty/page.tsx:69-71) ohne Messmethode, '100% Zufriedenheit' (projekte/page.tsx:84), '8+ Jahre Erfahrung' nur in Meta (ueber-mich/page.tsx:12,15,19) und nicht im Seitentext, dazu '2024–' als Startjahr (projekte/page.tsx:83). Die Kennzahl-Kachel 'Top-3 bei Google' zeigt den Wert 3 (page.tsx:90) und liest sich als '3 / Top-3 bei Google'.
- **Lösung:** Nur Zahlen nennen, die belegbar sind: Suchbegriff, Zeitraum und Quelle (z. B. Screenshot der Search Console) angeben, sonst streichen oder abschwächen. Kennzahlen auf eine einzige Version vereinheitlichen. 'Seit X Jahren' auf Seite und Meta gleich halten, wobei Seite und Meta dieselbe Aussage tragen. Irreführende Werbeaussagen sind abmahnrelevant (UWG).

### [HOCH] Englische Seiten: gemischte Sprache, html lang='de' und 'München' in englischen Metadaten
- **Beleg:** app/layout.tsx:112 setzt <html lang="de"> für alle Routen, also auch /en/*. Hartcodiert deutsch auf EN-Seiten: LeistungenClient.tsx:32-80 (Features) und :92-116 (Add-ons, Preise), zaira-beauty/page.tsx:35-60 (Prozess, Tech, Problem/Lösung), WorkHero.tsx:25-28 (Badges 'Im App Store', 'Top 3 · Google'), LayoutClient.tsx:43 ('Designs'), :217 und :280 (aria-labels), :277 (WhatsApp-Text), app/[lang]/datenschutz/page.tsx (kein lang-Parameter, nur deutsch). EN-Metadaten mit 'München' statt 'Munich': leistungen/page.tsx:24-26, kontakt/page.tsx:15-19, projekte/page.tsx:17-21, ueber-mich/page.tsx:17-21 (Home und Case-Study nutzen 'Munich').
- **Lösung:** lang-Attribut pro Locale setzen (Root-Layout nach app/[lang]/layout.tsx verschieben oder lang über params ableiten). Alle hartcodierten Texte in lib/i18n/{de,en}.ts auslagern. EN-Metadaten auf 'Munich' korrigieren, englische Keywords ('web designer Munich', 'website cost') einbauen. Entscheiden, ob EN-Seiten überhaupt indexiert werden sollen (Zielmarkt ist DE-Handwerk). Sonst Aufwand sparen und EN auf die Kernseiten beschränken.

### [MITTEL] Client-Render: Text im HTML vorhanden, aber Zähler zeigen 0 und alles startet mit opacity 0
- **Beleg:** Alle Seiten sind Server Components oder Client Components mit SSR, der Text steht also im HTML. Ausnahmen: (a) FAQ-Antworten (Finding 8). (b) AnimatedCounter startet bei useState(0) (HomeAnimations.tsx:7), im Roh-HTML stehen deshalb '0 Top-3 bei Google', '0€ Festpreis ab', '0 versteckte Kosten', '0 Tage bis Go-Live' (page.tsx:89-94). (c) FadeInSection setzt inline opacity:0 und translateY(32px), bis ein IntersectionObserver feuert (HomeAnimations.tsx:59-60). Fast jeder Abschnitt ist davon betroffen. (d) Der Hero-H1 startet mit opacity:0 und blur(5px) (WorkHero.tsx:93-98), das verzögert den LCP.
- **Lösung:** Zähler mit dem Endwert serverseitig rendern und nur die Animation clientseitig starten (SSR-Wert = end). FadeInSection per CSS/prefers-reduced-motion mit Fallback sichtbar machen (opacity:1 ohne JS, z. B. über noscript oder eine Klasse, die erst nach Hydration versteckt). Hero-H1 nicht mit opacity:0 starten, sondern sofort sichtbar rendern und nur dezent animieren.

### [MITTEL] Referenzen verlinken nach außen, nur Zaira hat eine Case-Study-Seite
- **Beleg:** Startseitenkarten (app/[lang]/page.tsx:96-173) führen für Serlo, Mobilwerk und MRG auf externe Domains (serlo.ch, mobilwerk.vercel.app, mrg-logistik.de), Link-Komponente Zeile 237. /projekte zeigt nur 3 Projekte (projekte/page.tsx:31-79; Stat '3' :82), die Startseite zeigt 5 (Serlo, Zaira, Mobilwerk, MRG, Klempner-Muster). Serlo und Klempner fehlen auf /projekte. Im Dictionary liegen tote Keys 'kleinanzeigenTitle', 'dashboardTitle', 'labelWip', 'labelDemo' (de.ts:59-73; 0 Verwendungen). Die Karten haben keine Ergebnis- oder Leistungsbeschreibung mit Suchbegriff und keine Kundenzitat-Verknüpfung.
- **Lösung:** Für Mobilwerk, MRG-Logistik und Serlo eigene Case-Study-Seiten (/projekte/mrg-logistik usw.) mit Ausgangslage, Leistung, Technik, Ergebnis und Zitat bauen, Kartenlink intern, externer Link nur als Zusatz. Projektanzahl und Liste auf Startseite und /projekte angleichen. Tote Dictionary-Keys entfernen.

### [MITTEL] Google-Unternehmensprofil-Leistung ist veraltet benannt und ohne eigene Seite
- **Beleg:** LeistungenClient.tsx:92: 'Google My Business', einmalig 149 €, Ein-Satz-Beschreibung. Der Begriff heißt seit Jahren 'Google Unternehmensprofil' (Business Profile). Weder 'Unternehmensprofil' noch 'Business Profile' kommt im Content vor. Die eigene Website verweist nicht auf ein Google-Profil, Bewertungen werden nur als Fließtext-Testimonials (page.tsx:310-335, de.ts:36-41) gezeigt.
- **Lösung:** Add-on umbenennen ('Google Unternehmensprofil einrichten & optimieren') und eine Leistungsseite plus Ratgeber dazu bauen. Eigenes Profil anlegen, Kategorie 'Webdesigner' (Zusatz 'Webentwickler', 'Internetagentur'), Beschreibung aus der Startseite ableiten, Leistungen und Preise 1:1 aus der Preisquelle (Finding 10) übernehmen. Auf der Website Link 'Bewertung auf Google schreiben' und das Profil im Schema 'sameAs' eintragen, Google-Bewertungen später als sichtbaren Bereich einbinden.

### [MITTEL] Rechtstexte: veraltet, nur deutsch, Markenname fehlt, Datenschutz passt nicht zu geplanten Google-Tools
- **Beleg:** de.ts:192,195: 'Angaben gemäß § 5 TMG' und '§ 55 Abs. 2 RStV' (inzwischen DDG bzw. MStV). Das Impressum nennt 'BrandWerkX' nirgends (app/[lang]/impressum/page.tsx:25,38), keine Telefonnummer und keine Angabe zur Steuernummer oder USt-IdNr./Kleinunternehmerregelung (bitte prüfen). Datenschutz (app/[lang]/datenschutz/page.tsx) ist nicht lokalisiert, hat 'Stand' per new Date() (Zeile 7), nennt den Hoster nicht, erwähnt weder Resend noch WhatsApp und sagt 'keine Analyse-Tools' (Zeile 17). AGB liegen nur unter app/agb/page.tsx; die Middleware leitet /agb nach /de/agb weiter, das nicht existiert (404). In de.ts:242 und LayoutClient.tsx:365-372 ist keine AGB verlinkt.
- **Lösung:** Impressum rechtlich prüfen lassen (DDG/MStV, Geschäftsbezeichnung 'BrandWerkX', Telefon, Umsatzsteuerhinweis). /de/agb und /en/terms unter app/[lang]/ anlegen und im Footer verlinken. Datenschutz um Hoster, Resend, WhatsApp und die später eingebundenen Google-Dienste (Search Console, Maps, ggf. Analytics) ergänzen und lokalisieren. 'Stand' fest eintragen. Hinweis: das ist keine Rechtsberatung.

### [MITTEL] Tote Legacy-Routen und ungenutzte Komponenten verwässern den Code
- **Beleg:** Die Middleware (middleware.ts:30-40) leitet jede Route ohne Locale auf /de bzw. /en um. Damit sind app/leistungen/page.tsx, app/kontakt/page.tsx, app/ueber-mich/page.tsx, app/impressum/page.tsx, app/datenschutz/page.tsx und app/agb/page.tsx nie erreichbar, tragen aber alte Preise (790/1.500/2.500 €, app/leistungen/page.tsx:7-61) und eigene H1. app/kontakt/page.tsx und app/leistungen/page.tsx sind 'use client' ohne Metadata. components/Footer.tsx (Links auf /impressum, /agb) und weitere Komponenten (NeumorphismDemo, GlobeHero u. a.) sind nirgends importiert. package.json heißt noch 'kosmetik-demo' mit Beschreibung 'Demo Beauty-Studio Website'. /datenschutz/siraj und /vibes/* (Quran-App, Social-App) sind indexierbar und thematisch fremd.
- **Lösung:** Legacy-Routen in app/ löschen (außer app/muster, app/api, app/layout, app/sitemap, app/opengraph-image), AGB nach app/[lang]/agb verschieben. Nicht genutzte Komponenten entfernen. Siraj- und Vibes-Rechtsseiten auf noindex setzen oder auf eine separate Domain verlegen, damit der Themenfokus Webdesign bleibt.

### [MITTEL] Markenbild uneinheitlich: OG-Bild 'Zaur's Portfolio', Serlo/Vibes, Klempner München/Berlin
- **Beleg:** app/opengraph-image.tsx:30-41 rendert 'Zaur's Portfolio – Webentwicklung & Projekte' in Cyan #06b6d4 statt BrandWerkX (#00ffe7). Die Datei exportiert zudem GET und eine Platzhalter-Komponente mit <h1>OpenGraph Image</h1> (Zeile 52-58). Die App heißt auf der Startseite 'Serlo' (serlo.ch, page.tsx:98), unter /vibes 'Vibes – Social Video App' (vibes/page.tsx:5). Startseite und Muster-Index behaupten 'Klempner München … SEO-optimiert für München' (page.tsx:158-160, app/muster/page.tsx:10), die Klempner-Demo ist aber komplett auf Berlin ausgelegt (public/muster/klempner/final.html:8-10,369-420; app/muster/[kunde]/page.tsx:50 'alle Berliner Bezirke').
- **Lösung:** OG-Bild-Text auf 'BrandWerkX – Websites für Handwerker & kleine Betriebe' mit Logo ändern und die Route auf die Next-Konvention prüfen. Entscheiden, ob Serlo und Vibes dasselbe Produkt sind, und konsistent benennen oder trennen. Klempner-Muster auf München/Geretsried umstellen oder die Beschreibung ehrlich auf 'Beispiel' setzen.

### [MITTEL] Interne Verlinkung und Navigation tragen keine Keywords
- **Beleg:** Nav-Labels: 'Home', 'Leistungen', 'Designs', 'Projekte', 'Über mich', 'Kontakt' (de.ts:2-9, LayoutClient.tsx:40-47). 'Designs' ist hartcodiert und geht an /muster ohne Locale. CTA-Texte sind generisch ('Projekt starten', 'Design auswählen', 'Mehr erfahren'). Der Link '/kontakt?package=...' (LeistungenClient.tsx:200) wird von KontaktClient nie ausgelesen (kein useSearchParams), die Paketwahl geht verloren.
- **Lösung:** Menü um Dropdown 'Leistungen' (Website erstellen, Landingpage, SEO, Google-Profil, Wartung) und 'Branchen' erweitern, Ankertexte mit Begriff ('Website erstellen lassen', 'Webdesign für Handwerker'). Paket-Parameter im Formular vorbelegen (de.ts:155-168). 'Designs' in der Nav in 'Muster-Websites' umbenennen und lokalisieren.

### [NIEDRIG] Strukturierte Daten und Meta-Keywords: Ballast, aber keine Kernlücke dieser Dimension
- **Beleg:** meta keywords in app/layout.tsx:41-57 und in jeder generateMetadata (Google ignoriert sie). WebSite-SearchAction zeigt auf /de/projekte, obwohl keine Suche existiert (app/layout.tsx:133-136). ProfessionalService hat keine Telefonnummer, keine Öffnungszeiten, kein aggregateRating.
- **Lösung:** Keywords-Arrays kürzen oder entfernen (kein Ranking-Effekt). SearchAction entfernen. Beim Schema-Ausbau (andere Dimension) NAP-Daten aus Finding 1 und 11 übernehmen.

### [NIEDRIG] Dictionary-Semantik und Texte: irreführende Schlüssel und Mikro-Inkonsistenzen
- **Beleg:** home.statsProjects = 'Top-3 bei Google' und home.statsYears = 'Festpreis ab' (de.ts:18-21) tragen falsche Schlüsselnamen (Wert = Anzahl bzw. Preis). Kontakt-Hero verspricht Antwort 'innerhalb von 24 Stunden' (de.ts:150), die Antwortzeit-Karte 'meist noch am selben Tag' (de.ts:181). Case-Study-Eyebrow 'Case Study · 2024' (de.ts:202) bei Projekten mit Jahr 2026 auf der Startseite. Skills-Block 'Womit ich arbeite' erscheint doppelt (home.skillsTitle und about.skillsTitle, de.ts:25,129).
- **Lösung:** Schlüssel umbenennen (statsTop3, statsPriceFrom). Antwortzeit-Versprechen vereinheitlichen. Doppelte Überschriften unterscheiden, z. B. 'Meine Technik' vs. 'Technik für deine Website'.

## Strukturierte Daten & Local-SEO

**Dimension: Strukturierte Daten & Local-SEO-Signale (nur gelesen, nichts geändert)**

**Bestand.** Es gibt genau einen JSON-LD-Block, global im `<head>` von `app/layout.tsx:121-226`, mit `WebSite`, `ProfessionalService` und `Person`. Er steht dadurch identisch auf jeder Seite, auch auf `/en/*`, `/vibes` und den Legal-Seiten. Es gibt kein `Service`, `FAQPage`, `BreadcrumbList`, `ContactPage`/`ProfilePage` und keine `@id`-Verknüpfung. Das Markup hat `address` ohne Straße und PLZ, kein `telephone`, keine Öffnungszeiten, kein `logo`/`image` und eine ungültige `SearchAction`. Name, Ort und Preise widersprechen dem sichtbaren Inhalt.

**NAP-Matrix (Ist)**

| Element | Fundstellen | Befund |
|---|---|---|
| Name | Footer `LayoutClient.tsx:367` "BrandWerkX"; Schema `layout.tsx:141` "BrandWerkX – Webentwicklung München"; Impressum nennt nur "Zaur Hatuev" (`[lang]/impressum/page.tsx:25`) | uneinheitlich, im Impressum fehlt "BrandWerkX" |
| Adresse | Steiner Ring 64, 82538 Geretsried: Impressum, Datenschutz, AGB, Vibes, siraj (12 Stellen, in sich konsistent). München: Schema `layout.tsx:148`, Footer `LayoutClient.tsx:325` und `:377`, rund 40 Titel/Descriptions | **Widerspruch** |
| Telefon | nirgends sichtbar, nicht im Schema. Nur WhatsApp-Link mit +49 172 8471641 (`LayoutClient.tsx:277`, `:350`) | fehlt |
| E-Mail | brandwerkx@gmail.com durchgängig. Versandadresse `zaur@brandwerkx.de` (`route.ts:146,155`) | zweigleisig |
| Social | GitHub und LinkedIn-Person (`-8559b91a1`) konsistent; Footer-LinkedIn weicht ab (`LayoutClient.tsx:356`) | LinkedIn-Link im Footer weicht ab |

**Vor der Anlage des Google-Unternehmensprofils musst du fünf Dinge entscheiden:**
1. Standortmodell (Geretsried als Service-Area-Business mit München im Einzugsgebiet, oder echte Münchner Adresse).
2. Ob die Telefonnummer öffentlich sein soll.
3. Geschäftsname exakt "BrandWerkX".
4. Domain-E-Mail statt Gmail.
5. Welche Preise gelten (490/990/99 oder 790/1.500/2.500).

**Reihenfolge der Umsetzung**
1. `lib/business.ts` als einzige NAP-Quelle anlegen (Finding 1).
2. Impressum angleichen (Finding 12).
3. JSON-LD ersetzen (Finding 4) und Preise vereinheitlichen (Finding 5).
4. FAQPage, BreadcrumbList und sameAs ergänzen (Findings 6-8).
5. Erst danach das Google-Profil anlegen und dessen Maps-Link zurück in `sameAs` eintragen.

Die Codeblöcke für `lib/business.ts`, `lib/schema.ts`, Service/FAQPage, BreadcrumbList, ContactPage/ProfilePage und sameAs stehen in den `fix`-Feldern der Findings.

**Hinweis zur Wirkung.** FAQ-Rich-Results zeigt Google seit 2023 nur noch für Behörden- und Gesundheitsseiten. `Service` und `FAQPage` bringen BrandWerkX also kein SERP-Snippet. Sie liefern aber saubere Entitäts-Signale für Google und KI-Systeme.

### [KRITISCH] NAP-Widerspruch: rechtliche Adresse Geretsried, Marketing und Schema sagen München
- **Beleg:** Impressum/Datenschutz/AGB/Vibes nennen durchgängig Steiner Ring 64, 82538 Geretsried: app/[lang]/impressum/page.tsx:25,38; app/[lang]/datenschutz/page.tsx:11; app/impressum/page.tsx:19,32; app/datenschutz/page.tsx:13-14; app/[lang]/datenschutz/siraj/page.tsx:146; app/[lang]/vibes/agb/page.tsx:73,127; app/agb/page.tsx:20. Dagegen: JSON-LD addressLocality 'München' ohne Straße/PLZ (app/layout.tsx:146-150), areaServed nur City München (:151-154), Footer 'München, Deutschland' (components/LayoutClient.tsx:325) und 'Gebaut in München' (:377), dazu Titel/Descriptions/Keywords auf allen Seiten (u.a. app/layout.tsx:37-57, app/[lang]/page.tsx:18-24). Die NAP-Daten stehen in mindestens 8 Dateien als Copy-Paste, ein Teil davon in toten Legacy-Routen: die Middleware (middleware.ts:25-32) leitet /impressum, /datenschutz, /agb, /kontakt, /leistungen, /ueber-mich auf /de/* um.
- **Lösung:** Entscheidung treffen. Wohnst und arbeitest du in Geretsried (Landkreis Bad Tölz-Wolfratshausen, rund 30 km südlich von München), ist das Google-Unternehmensprofil als Service-Area-Business anzulegen: Adresse Steiner Ring 64 für die Verifizierung eintragen, Adresse im Profil ausblenden, Einzugsgebiet München, Geretsried und Umland wählen. Die Website darf München dann als Einzugsgebiet nennen, nicht als Standort. Formulierungen wie 'Webentwickler aus München' (de.ts:126, en.ts:128, ueber-mich metadata) und 'Gebaut in München' (LayoutClient.tsx:377) wären dann irreführend und sollten durch 'Webentwicklung für München & Oberland' bzw. 'Geretsried bei München' ersetzt werden. Hast du dagegen eine echte Münchner Betriebsadresse (kein Postfach, kein Virtual Office), muss sie ins Impressum.

Eine einzige Quelle für alle Seiten, Footer, Impressum, Kontakt, Schema und die Mails in route.ts:

```ts
// lib/business.ts
export const SITE = 'https://brandwerkx.de';

export const BUSINESS = {
  name: 'BrandWerkX',            // exakt so in Google-Profil, Impressum, Footer, Schema
  owner: 'Zaur Hatuev',
  email: 'brandwerkx@gmail.com', // TODO: auf kontakt@brandwerkx.de umstellen
  telephone: '+491728471641',    // TODO: Zaur entscheidet, ob öffentlich
  telephoneDisplay: '0172 8471641',
  address: {
    streetAddress: 'Steiner Ring 64',
    postalCode: '82538',
    addressLocality: 'Geretsried',
    addressRegion: 'BY',
    addressCountry: 'DE',
  },
  hours: { days: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' }, // = de.ts:182
  profiles: {
    github: 'https://github.com/ZaurHa',
    linkedinPerson: 'https://www.linkedin.com/in/zaur-hatuev-8559b91a1/',
    // gbpMaps, linkedinCompany, xing, instagram ... nach Anlage ergänzen
  },
} as const;
```

Die Legacy-Routen app/impressum, app/datenschutz, app/agb, app/kontakt, app/leistungen, app/ueber-mich und components/Footer.tsx (wird nirgends importiert) löschen oder auf die Konstanten umstellen, damit keine Adress-Kopien mehr driften.

Checklist Google-Unternehmensprofil, daraus abgeleitet: Name exakt 'BrandWerkX', Telefon, Website-URL https://brandwerkx.de/de, Öffnungszeiten Mo-Fr 9-18 Uhr (de.ts:182), Leistungen aus LeistungenClient.tsx, Logo und Fotos, Verifizierung per Postkarte oder Video an Steiner Ring 64.

### [HOCH] Geschäftsname: Keyword-Name im Schema, im Impressum fehlt 'BrandWerkX'
- **Beleg:** JSON-LD name = 'BrandWerkX – Webentwicklung München' (app/layout.tsx:141) und Person.jobTitle 'Webentwickler & UI/UX Designer München' (:200), knowsAbout 'Webentwicklung München' (:208). Footer und Mails verwenden 'BrandWerkX' (LayoutClient.tsx:367, route.ts:157). Das Impressum nennt den Betrieb gar nicht, nur 'Zaur Hatuev' (app/[lang]/impressum/page.tsx:25).
- **Lösung:** Google-Richtlinien für Unternehmensprofile verbieten Ort und Leistungs-Keywords im Namen ('BrandWerkX – Webentwicklung München' riskiert eine Sperrung bzw. Namensänderung). Im Schema nur `name: 'BrandWerkX'` und die Beschreibung in `alternateName`/`description` ablegen (siehe Code in Finding 4). Das Impressum um den Betriebsnamen erweitern, z.B. 'BrandWerkX – Inhaber: Zaur Hatuev' bzw. 'Zaur Hatuev, handelnd unter BrandWerkX' (Formulierung nach deiner Gewerbeanmeldung). Orts-Keywords gehören in Title, H1 und Text, nicht in den Entitätsnamen.

### [HOCH] Telefonnummer fehlt in Impressum, Kontakt und Schema (nur im WhatsApp-Link)
- **Beleg:** Einzige Fundstelle: wa.me/491728471641 in components/LayoutClient.tsx:277 und :350. Kontaktseite zeigt nur E-Mail, GitHub, LinkedIn (app/[lang]/kontakt/KontaktClient.tsx:139-157), das Impressum nur E-Mail und Website (app/[lang]/impressum/page.tsx:30-33), der Schema-Block kein telephone (app/layout.tsx:138-195; ContactPoint :217-222 ohne Telefon). formatDetection.telephone ist false (:64).
- **Lösung:** Entscheide, ob 0172 8471641 die öffentliche Geschäftsnummer sein soll, denn dieselbe Nummer muss später im Google-Profil stehen. Wenn ja: in lib/business.ts (`telephone: '+491728471641'`), sichtbar auf /kontakt und im Impressum (E-Mail reicht rechtlich, eine Telefonnummer verbessert aber Vertrauen und Anrufe aus dem Profil), als `tel:`-Link im Footer und im Schema (`telephone` plus `contactPoint.telephone`). Wenn nein: eine separate Geschäftsnummer besorgen, nicht die private Mobilnummer. Format überall identisch halten (+49 172 8471641).

### [HOCH] JSON-LD ProfessionalService/WebSite/Person unvollständig, teils ungültig, nicht verknüpft
- **Beleg:** app/layout.tsx:121-226. WebSite.potentialAction.SearchAction hat als target nur eine normale URL, ohne {search_term_string} und ohne query-input (:133-136); es gibt keine Seitensuche. ProfessionalService: keine @id, kein logo/image, address ohne streetAddress/postalCode/addressRegion (:146-150), kein telephone, keine openingHoursSpecification, kein geo/hasMap, founder als bloßer String (:145), areaServed nur eine Stadt (:151-154), sameAs enthält nur persönliche Profile (:164-167). Person: worksFor ist ein Organization-Stub ohne Bezug zum Business-Knoten (:201), kein image, jobTitle mit 'München' (:200). Das Ganze steht in jedem Seiten-`<head>` (inkl. /en, /muster, /vibes) und hat nirgends eine Seiten-spezifische Ergänzung. `<html lang="de">` ist für /en/* ebenfalls fix (:112).
- **Lösung:** Block aus app/layout.tsx:121-226 entfernen und durch eine verknüpfte @graph-Struktur in app/[lang]/layout.tsx ersetzen (Next 14.1 hat keine Metadata-API für JSON-LD, daher Script-Tag im Server Component; `<` escapen):

```tsx
// components/JsonLd.tsx  (Server Component)
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
```

```ts
// lib/schema.ts
import { SITE, BUSINESS as B } from './business';

export const ORG_ID = `${SITE}/#organization`;
export const PERSON_ID = `${SITE}/#zaur-hatuev`;
export const WEBSITE_ID = `${SITE}/#website`;

export function siteGraph(lang: 'de' | 'en') {
  const de = lang === 'de';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': ORG_ID,
        name: B.name,                                   // NICHT 'BrandWerkX – Webentwicklung München'
        alternateName: 'BrandWerkX Webentwicklung & Webdesign',
        url: SITE,
        logo: { '@type': 'ImageObject', url: `${SITE}/images/brandwerkx-logo-512.png`, width: 512, height: 512 }, // TODO neue Datei
        image: `${SITE}/images/zaur-portrait.jpg`,
        description: de
          ? 'Webentwicklung, Webdesign und SEO für Handwerker, Selbstständige und kleine Unternehmen in München und Oberbayern.'
          : 'Web development, web design and SEO for tradespeople, freelancers and small businesses in Munich and Upper Bavaria.',
        email: B.email,
        telephone: B.telephone,
        address: { '@type': 'PostalAddress', ...B.address },
        // geo: { '@type': 'GeoCoordinates', latitude: <aus Google Maps>, longitude: <aus Google Maps> },
        areaServed: [
          { '@type': 'City', name: 'München' },
          { '@type': 'AdministrativeArea', name: 'Landkreis Bad Tölz-Wolfratshausen' },
          { '@type': 'AdministrativeArea', name: 'Oberbayern' },
          { '@type': 'Country', name: 'Deutschland' },
        ],
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: B.hours.days, opens: B.hours.opens, closes: B.hours.closes,
        }],
        priceRange: '€€',
        founder: { '@id': PERSON_ID },
        contactPoint: {
          '@type': 'ContactPoint', contactType: 'customer support',
          email: B.email, telephone: B.telephone,
          availableLanguage: ['de', 'en', 'ru'],
        },
        sameAs: [
          // nach Anlage ergänzen: Google-Maps-Profillink, LinkedIn-Unternehmensseite, Xing, Instagram ...
        ],
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE,
        name: B.name,
        inLanguage: ['de-DE', 'en'],
        publisher: { '@id': ORG_ID },
        // KEIN SearchAction: es gibt keine Seitensuche
      },
    ],
  };
}

export const personNode = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: B.owner,
  jobTitle: 'Webentwickler & UI/UX Designer',        // ohne Ortsnamen
  image: `${SITE}/images/zaur-portrait.jpg`,
  url: `${SITE}/de/ueber-mich`,
  worksFor: { '@id': ORG_ID },
  address: { '@type': 'PostalAddress', addressLocality: B.address.addressLocality, addressCountry: 'DE' },
  knowsLanguage: ['de', 'en', 'ru'],
  knowsAbout: ['Webentwicklung', 'Next.js', 'React', 'TypeScript', 'UI/UX Design', 'Suchmaschinenoptimierung', 'Lokale SEO', 'TailwindCSS', 'Figma'],
  sameAs: [B.profiles.github, B.profiles.linkedinPerson],
};
```

```tsx
// app/[lang]/layout.tsx (Zeilen 19-23)
return (
  <>
    <JsonLd data={siteGraph(locale)} />
    <LayoutClient lang={locale} dict={dict}>{children}</LayoutClient>
  </>
);
// app/[lang]/ueber-mich/page.tsx: <JsonLd data={personNode} />
```

Hinweis: Google löst @id-Verweise nicht seitenübergreifend auf. Auf Unterseiten deshalb `provider`/`publisher` immer mit @id plus name/url angeben (siehe Finding 5). Koordinaten nur aus Google Maps übernehmen, nicht schätzen.

### [HOCH] Preise widersprechen sich (Schema 490/990/99, Meta 790, Legacy 790/1.500/2.500); Service-Markup fehlt
- **Beleg:** Sichtbare Seite und Schema: ab 490 / ab 990 / ab 99 pro Monat (app/[lang]/leistungen/LeistungenClient.tsx:29,48,67; app/layout.tsx:176,184,191). Metadata derselben Seite sagt 'ab 790€' (app/[lang]/leistungen/page.tsx:10,11,19,20,24,25,29,30), ebenso Kontakt-Description (app/[lang]/kontakt/page.tsx:10, 'ab 790€') und Budget-Auswahl, die bei 790 € beginnt (lib/i18n/de.ts:170). Die tote Legacy-Seite app/leistungen/page.tsx:10,27,45 hat 790/1.500/2.500. Home-Meta sagt 490 (app/[lang]/page.tsx:19). Zusätzlich ist 'SEO & Wartung' im Schema als `price: "99"` ohne Abrechnungszeitraum codiert (app/layout.tsx:191), und die Zusatzleistung heißt noch 'Google My Business' (LeistungenClient.tsx:92, 149 €, seit 2022 'Google Unternehmensprofil'). Es gibt kein Service-Markup pro Leistung.
- **Lösung:** Preise zuerst inhaltlich festlegen und dann an einer Stelle pflegen (Pakete in einer gemeinsamen Datei, aus der UI, Metadata und JSON-LD lesen). Strukturierte Daten müssen zum sichtbaren Inhalt passen. Danach Service-Knoten in app/[lang]/leistungen/page.tsx (Server Component) ergänzen:

```tsx
import JsonLd from '../../../components/JsonLd';
import { SITE, BUSINESS } from '../../../lib/business';
import { ORG_ID } from '../../../lib/schema';

const t = dict.services;
const url = `${SITE}/${locale}/leistungen`;
const provider = { '@type': 'ProfessionalService', '@id': ORG_ID, name: BUSINESS.name, url: SITE };
const from = (min: number) => ({ '@type': 'PriceSpecification', minPrice: min, priceCurrency: 'EUR' });
const perMonth = (min: number) => ({
  '@type': 'UnitPriceSpecification', minPrice: min, priceCurrency: 'EUR',
  referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'MON' },
});
const service = (slug: string, name: string, description: string, spec: object) => ({
  '@type': 'Service',
  '@id': `${url}#${slug}`,
  name, description, provider, url,
  serviceType: 'Webentwicklung & Webdesign',
  areaServed: [{ '@type': 'City', name: 'München' }, { '@type': 'Country', name: 'Deutschland' }],
  offers: { '@type': 'Offer', url, priceCurrency: 'EUR', priceSpecification: spec },
});

const graph = {
  '@context': 'https://schema.org',
  '@graph': [
    service('muster-website', t.starterName, t.starterDesc, from(490)),
    service('custom-website', t.businessName, t.businessDesc, from(990)),
    service('seo-wartung', t.premiumName, t.premiumDesc, perMonth(99)),
    service('google-unternehmensprofil', 'Google Unternehmensprofil einrichten',
      'Profil einrichten, optimieren und verifizieren.', from(149)), // einmalig; Text in de/en-Dict auslagern
    // FAQPage: siehe Finding 6
  ],
};
// im JSX: <JsonLd data={graph} />
```

Die Preise im Beispiel entsprechen dem sichtbaren Stand (490/990/99/149). Wenn 790 gelten soll, müssen LeistungenClient.tsx, de.ts/en.ts, Home-Meta und die Mappings angepasst werden, nicht nur das Schema. 'Google My Business' in 'Google Unternehmensprofil' umbenennen.

### [MITTEL] FAQPage fehlt, und die FAQ-Antworten stehen nicht im HTML
- **Beleg:** Vier FAQ-Paare existieren in lib/i18n/de.ts:106-113 und en.ts, gerendert in app/[lang]/leistungen/LeistungenClient.tsx:147-151. Die Antwort wird nur bei Klick eingehängt: `{open && <div className="faq-answer">{a}</div>}` (LeistungenClient.tsx:132). Im Server-HTML (open=false) fehlen die Antworten, für Crawler und KI-Systeme sind sie unsichtbar. Kein FAQPage-Markup irgendwo im Repo. Die tote Legacy-Seite app/leistungen/page.tsx:77-82 enthält abweichende FAQ-Aussagen (Landingpage '1–2 Wochen' vs. '3–5 Werktage').
- **Lösung:** 1) Antworten immer im DOM halten, z.B. mit nativem `<details>`:

```tsx
function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq-item">
      <summary className="faq-question">{q}</summary>
      <div className="faq-answer">{a}</div>
    </details>
  );
}
```

2) FAQPage in denselben @graph wie die Services (Finding 5) aus dem Dictionary erzeugen:

```ts
{
  '@type': 'FAQPage',
  '@id': `${url}#faq`,
  mainEntity: [
    [t.faq1q, t.faq1a], [t.faq2q, t.faq2a], [t.faq3q, t.faq3a], [t.faq4q, t.faq4a],
  ].map(([q, a]) => ({
    '@type': 'Question', name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}
```

Erwartung realistisch halten: Google zeigt FAQ-Rich-Results seit 2023 nur für Behörden/Gesundheit. Nutzen hier ist die maschinenlesbare Zuordnung für Google und KI-Antworten. Ergänze lokale FAQs, die echte Suchanfragen abdecken (z.B. 'Was kostet eine Website für Handwerker in München?', 'Hilfst du bei Google Unternehmensprofil?'), im Dictionary für de und en. Legacy-FAQs löschen.

### [MITTEL] BreadcrumbList und Seitentyp-Markup (ContactPage, ProfilePage) fehlen
- **Beleg:** Kein BreadcrumbList im Repo (Grep nach '@type' findet nur app/layout.tsx und die Demo-HTMLs unter public/muster). Hierarchie existiert aber: /{lang}/projekte/zaira-beauty (app/[lang]/projekte/zaira-beauty/page.tsx). Dort gibt es nur einen Zurück-Link (de.ts:201 `caseStudy.back`), keine sichtbare Breadcrumb. /kontakt und /ueber-mich haben keinen Seitentyp-Hinweis.
- **Lösung:** ```ts
// lib/schema.ts
export function breadcrumbs(lang: 'de' | 'en', trail: { name: string; path: string }[]) {
  const home = { name: lang === 'de' ? 'Startseite' : 'Home', path: '' };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [home, ...trail].map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE}/${lang}${c.path}`,
    })),
  };
}

// app/[lang]/projekte/zaira-beauty/page.tsx
<JsonLd data={breadcrumbs(locale, [
  { name: d.nav.projects, path: '/projekte' },
  { name: 'Zaira Beauty Face', path: '/projekte/zaira-beauty' },
])} />
// Einzeiler für /leistungen, /ueber-mich, /kontakt, /projekte analog.
```

Idealerweise die Breadcrumb auf der Case-Study-Seite auch sichtbar rendern.

Optional, nur ein paar Zeilen:

```ts
// /kontakt
{ '@context': 'https://schema.org', '@type': 'ContactPage', '@id': `${SITE}/${lang}/kontakt#page`,
  url: `${SITE}/${lang}/kontakt`, inLanguage: lang, mainEntity: { '@id': ORG_ID } }
// /ueber-mich (zusätzlich zu personNode)
{ '@context': 'https://schema.org', '@type': 'ProfilePage', '@id': `${SITE}/${lang}/ueber-mich#page`,
  url: `${SITE}/${lang}/ueber-mich`, inLanguage: lang, mainEntity: { '@id': PERSON_ID } }
```

Da @id-Referenzen seitenübergreifend nicht aufgelöst werden, auf diesen Seiten `siteGraph()` mitrendern (liegt bereits im Locale-Layout).

### [MITTEL] sameAs/Social: dünn, persönlich, und der Footer-LinkedIn-Link weicht ab
- **Beleg:** Vorhanden: GitHub https://github.com/ZaurHa (app/layout.tsx:165,204; app/[lang]/ueber-mich/page.tsx:34; KontaktClient.tsx:148; route.ts:8) und LinkedIn-Person https://www.linkedin.com/in/zaur-hatuev-8559b91a1/ (app/layout.tsx:166,205; ueber-mich/page.tsx:43; KontaktClient.tsx:157). Der Footer verlinkt dagegen https://www.linkedin.com/in/zaur-hatuev (components/LayoutClient.tsx:356), also eine andere URL. Beide Persönlich-Profile stehen auch am Business-Knoten (app/layout.tsx:164-167). Es gibt keine Unternehmensprofile, keinen Google-Maps-/Profil-Link, kein Xing/Instagram/Facebook/Malt/Fiverr. Das eigene Produkt Serlo (serlo.ch, App Store) wird nur als Projekt verlinkt (app/[lang]/page.tsx:105).
- **Lösung:** Footer-Link auf die in Schema und Kontaktseite verwendete URL angleichen (LayoutClient.tsx:356), und prüfen, welche der beiden URLs wirklich dein Profil ist. Personen-Profile (GitHub, LinkedIn-Person) nur am Person-Knoten führen (Finding 4), am Business-Knoten nur Business-Profile:

```ts
// Organization.sameAs, jeweils nach Anlage ergänzen
sameAs: [
  'https://www.google.com/maps?cid=<CID aus dem Profil>',   // Google-Unternehmensprofil, nach Verifizierung
  'https://www.linkedin.com/company/brandwerkx',            // TODO Unternehmensseite anlegen
  'https://www.xing.com/pages/brandwerkx',                  // TODO optional
  'https://www.instagram.com/brandwerkx',                   // TODO optional
]
// Person.sameAs: GitHub, LinkedIn-Person (bleibt), optional Serlo-Entwicklerprofil
```

Nur Profile eintragen, die tatsächlich existieren und auf brandwerkx.de zurückverlinken. Das ist das Signal, mit dem Google und KI-Systeme Website, Google-Profil und Personen zu einer Entität verbinden. Konsistenz-Quelle ist lib/business.ts (`profiles`).

### [MITTEL] E-Mail zweigleisig: öffentlich Gmail, Versand von zaur@brandwerkx.de, kein replyTo in der Kundenbestätigung
- **Beleg:** Öffentlich überall brandwerkx@gmail.com (Impressum app/[lang]/impressum/page.tsx:31, Datenschutz, LayoutClient.tsx:348, KontaktClient.tsx:139, Schema app/layout.tsx:144,220, de.ts:178). Der Versand läuft über 'Zaur Hatuev <zaur@brandwerkx.de>' (app/api/contact/route.ts:146,155). Die Kunden-Bestätigung hat kein `replyTo` (route.ts:154-159), eine Antwort des Kunden geht also an zaur@brandwerkx.de, wahrscheinlich ein reiner Resend-Absender ohne Postfach. Der Button 'Direkt antworten' zeigt dagegen auf Gmail (route.ts:75). EMAIL_SETUP.md nennt wiederum kontakt@brandwerkx.de. CLAUDE.md erwähnt RESEND_DOMAIN/ADMIN_EMAIL, die route.ts nicht liest, alles ist hartkodiert.
- **Lösung:** Ein Domain-Postfach (kontakt@brandwerkx.de) einrichten, in lib/business.ts als `email` führen und überall verwenden: Schema, Impressum, Kontakt, Footer, Google-Profil. Gmail nur noch als Weiterleitung dahinter. In route.ts `from`/`to`/`replyTo` aus BUSINESS lesen und der Kundenbestätigung `replyTo: BUSINESS.email` mitgeben. Eine Domain-Adresse stärkt außerdem die Vertrauenssignale (E-E-A-T) gegenüber einer Gmail-Adresse.

### [MITTEL] Bewertungs-Markup: nicht für die eigene Seite ergänzen, Fake-Ratings in Demo-HTMLs entfernen
- **Beleg:** Kundenstimmen liegen als Text vor (lib/i18n/de.ts:36-41, Zaira K., MRG Trans & Logistik GmbH), aber ohne Review-Markup. Die Demo-Dateien unter public/muster/klempner enthalten dagegen erfundene `aggregateRating` (4.9 / 214 Bewertungen) und `Review`-Objekte mit Fake-Namen (public/muster/klempner/final.html:394-398, v1.html:207-211), Review-Microdata (final.html:629,639,649) mit Badge 'Google · verifiziert' sowie Fake-Telefon +4930123456789 (final.html:371). Die Dateien haben `noindex` (final.html:11), aber robots.txt blockiert /muster/ (public/robots.txt:5), sodass Google das noindex gar nicht lesen kann.
- **Lösung:** Auf brandwerkx.de kein AggregateRating/Review für BrandWerkX selbst markieren: Selbst-Bewertungen für LocalBusiness/Organization sind laut Google nicht rich-result-berechtigt und riskant. Stattdessen Bewertungen über das Google-Unternehmensprofil sammeln (Link zum Bewertungsformular nach Verifizierung an Kunden schicken, z.B. Zaira, MRG). In den Demo-Vorlagen Fake-Ratings und -Reviews aus dem JSON-LD entfernen oder klar als Platzhalter kennzeichnen. Sonst werden sie beim Klonen für echte Kunden mitkopiert und könnten für diese zu irreführendem Markup werden. In robots.txt `Disallow: /muster/` entfernen und auf das vorhandene noindex setzen, sonst bleibt es wirkungslos.

### [MITTEL] Geerbte Canonical-URL und fehlendes hreflang auf Unterseiten (Nebenbefund)
- **Beleg:** Das Root-Layout setzt `alternates.canonical = https://brandwerkx.de/de` mit hreflang-Block (app/layout.tsx:66-72). Seiten ohne eigenes `alternates` erben das: app/[lang]/impressum/page.tsx, app/[lang]/datenschutz/page.tsx, datenschutz/siraj und vibes exportieren keine Metadata. /de/impressum, /en/impressum usw. melden damit die Startseite /de als Canonical. Alle anderen Unterseiten setzen nur `canonical`, aber kein `languages`/hreflang (nur app/[lang]/page.tsx:26-29 hat es). sitemap.ts:6-15 listet de und en getrennt ohne alternates. `<html lang="de">` fest (layout.tsx:112) auch für /en/*.
- **Lösung:** Root-Canonical aus app/layout.tsx:66-72 entfernen (kein sinnvoller Default) und pro Seite setzen. Beispiel für das Impressum:

```ts
// app/[lang]/impressum/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const p = '/impressum';
  return {
    title: lang === 'en' ? 'Legal Notice' : 'Impressum',
    alternates: {
      canonical: `https://brandwerkx.de/${lang}${p}`,
      languages: { de: `https://brandwerkx.de/de${p}`, en: `https://brandwerkx.de/en${p}`, 'x-default': `https://brandwerkx.de/de${p}` },
    },
  };
}
```

Dasselbe `languages`-Muster in alle Unterseiten übernehmen. In sitemap.ts `alternates: { languages: {...} }` je Eintrag ergänzen. Das `lang`-Attribut des `<html>` aus dem Locale ableiten. Das gehört zu anderen Prüfdimensionen, ist hier aber nötig, damit die lokalen Entitätsseiten eindeutig zugeordnet werden.

### [MITTEL] Impressum: veraltete Rechtsgrundlagen, Betriebsname/Telefon fehlen, AGB nicht erreichbar
- **Beleg:** Impressum zitiert 'Angaben gemäß § 5 TMG' und 'nach § 55 Abs. 2 RStV' (lib/i18n/de.ts:192,195; en.ts:194,197; app/impressum/page.tsx:15,31). Seit dem 14.05.2024 gelten dafür DDG und MStV. Es fehlen Betriebsname 'BrandWerkX' und Telefon (app/[lang]/impressum/page.tsx:25-38). Keine USt-IdNr./Kleinunternehmer-Angabe im Code (Grep). AGB: app/agb/page.tsx wird per Middleware auf /de/agb umgeleitet (middleware.ts:25-32), diese Route existiert nicht, also 404. Der Footer verlinkt AGB nicht (LayoutClient.tsx:369-371), nur components/Footer.tsx:9 tut es, und die wird nirgends importiert. `footer.agb` in de.ts:242 ist ungenutzt.
- **Lösung:** Impressum aktualisieren (Wortlaut bitte juristisch prüfen lassen):

```
Angaben gemäß § 5 DDG
BrandWerkX – Inhaber: Zaur Hatuev        (Formulierung nach Gewerbeanmeldung)
Steiner Ring 64, 82538 Geretsried
Telefon: +49 172 8471641 · E-Mail: kontakt@brandwerkx.de
USt-IdNr.: ...  (falls vorhanden; ggf. Hinweis § 19 UStG nach Absprache mit Steuerberater)
Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: Zaur Hatuev, Anschrift wie oben
```

Dictionary-Einträge und die tote Legacy-Seite anpassen bzw. löschen. AGB entweder als /[lang]/agb neu anlegen (aus app/agb/page.tsx migrieren) und im Footer verlinken oder die Seite entfernen. Das Impressum muss exakt dieselben Werte wie lib/business.ts und das spätere Google-Profil enthalten, sonst fällt der Abgleich bei der Verifizierung auf.

### [NIEDRIG] Logo und Bild-Assets für Entität und Google-Profil unbrauchbar bzw. fehlen
- **Beleg:** Als Logo existiert nur public/images/brandwerkxweiss.webp (weiße Variante für dunklen Hintergrund, LayoutClient.tsx:315), im Schema ist kein `logo` gesetzt. Das OG-Image zeigt 'Zaur's Portfolio' statt BrandWerkX (app/opengraph-image.tsx:30). `/apple-touch-icon.png` wird referenziert (app/layout.tsx:119), die Datei fehlt in public/. Das Portrait public/images/zaur-portrait.jpg (1023x1537) ist vorhanden und nutzbar.
- **Lösung:** Quadratisches Logo (mindestens 512x512, PNG/WebP, mit Hintergrund statt weiß auf transparent) als /images/brandwerkx-logo-512.png anlegen und in `logo` (Finding 4) sowie als Logo im Google-Profil verwenden. Das Google-Profil braucht außerdem ein Titelbild (Cover) und Fotos. OG-Image auf 'BrandWerkX' umstellen (opengraph-image.tsx:30). apple-touch-icon.png (180x180) in public/ ablegen.

## Performance

Performance-Analyse (reine Code-Analyse, kein npm install und kein Build, daher sind alle KB-Angaben zum JS-Bundle Schätzungen und keine Messwerte). Die Startseite ist grundsätzlich solide aufgebaut: alle Seiten sind statisch (generateStaticParams in app/[lang]/layout.tsx:4), die Pages sind Server Components, Fonts laufen über next/font (kein render-blockierendes @import, app/layout.tsx:11-32), der Ticker ist reines CSS, Bilder haben feste Seitenverhältnisse (kaum CLS), und es gibt keine Third-Party-Skripte. Die schweren Bibliotheken, die du erwähnt hast, belasten die Live-Seite NICHT: three, @react-three/fiber, chart.js, react-chartjs-2, jspdf, html2canvas, react-datepicker, react-icons, lucide-react und weitere 12 Pakete werden nirgends importiert oder nur von totem Code (GlobeHero.tsx, RealStarfield.tsx). Autoplay-Audio gibt es nicht. public/music/a.mp3 (733.645 Byte) wird von keiner Datei referenziert. Die eigentlichen Core-Web-Vitals-Bremsen sind (1) der Hero, der per framer-motion mit opacity:0 serverseitig versteckt ausgeliefert wird und erst nach der Hydration sichtbar wird (LCP), (2) framer-motion im gemeinsamen Bundle jeder Seite wegen eines Logo-Effekts, (3) 23 FadeInSection-Client-Wrapper plus 4 Counter allein auf der Startseite, die den gesamten Seiteninhalt hydratisieren und im SSR-HTML unsichtbar bzw. als "0" ausliefern, (4) fehlende priority/sizes bei next/image, (5) dauerlaufende JS-Animationen und ein Vollbild-Film-Grain mit mix-blend-mode (INP/Scroll-Jank) sowie (6) fehlende Cache- und Format-Konfiguration in next.config.js. Geschätzter First-Load-JS der Startseite: ca. 130-145 KB gzip (Next/React-Basis plus framer-motion plus App-Code); framer-motion allein macht davon vermutlich 30-45 KB aus und lässt sich vollständig durch CSS ersetzen. Gemessene Werte: app/globals.css hat 60.730 Byte und 2.828 Zeilen (gzip -9: 11.598 Byte, zuzüglich Tailwind-Output), public/ insgesamt 3,0 MB. Davon sind 733 KB Audio ungenutzt und 1,52 MB sind PNG-Originale, die nur durch den next/image-Optimizer klein werden.

### [HOCH] Hero (H1, Text, CTAs, Showcase) wird per framer-motion mit opacity:0 serverseitig versteckt ausgeliefert, daher LCP erst nach der Hydration
- **Beleg:** components/WorkHero.tsx ist komplett 'use client' (Z.1). Eyebrow (Z.81-84), H1 (Z.93-98: initial opacity:0, y:22, filter:blur(5px)), Subline (Z.104-107), CTA-Reihe (Z.113-117), Trust-Row (Z.134-137) und alle vier Showcase-Bilder (Z.157-161) starten mit initial-Werten. framer-motion schreibt diese initial-Werte beim SSR als Inline-Style ins HTML, also sind H1 und CTAs im ersten Paint unsichtbar. Chrome zählt opacity:0-Elemente nicht als LCP-Kandidaten. Die H1 ist rechnerisch das größte Element (Desktop ca. 560x235 px gegen Serlo-Bild ca. 350x245 px), LCP entsteht also erst nach Download, Parse und Hydration von React, Next und framer-motion plus Animationsstart (Delays bis 0.5 s, Showcase-Delays 0.3+i*0.14 s, Dauer 0.6-0.8 s). Das ist vermutlich, nicht gemessen, auf Mobil/4G der größte einzelne LCP-Posten. app/[lang]/page.tsx:185-200 bindet den Hero zusätzlich über ErrorBoundary (Client-Klasse) ein.
- **Lösung:** Hero-Text als reine Server Component rendern und per CSS-@keyframes einblenden, wobei der LCP-Text bei opacity:1 startet (nur transform animieren) oder initial={false} nutzen. Nur den Showcase-Stack (Tilt) als kleine Client-Insel auslagern, oder die Maus-Neigung über CSS-Variablen lösen wie schon in LayoutClient.tsx:77-105. Das filter:blur()-Animieren der H1 streichen (Paint-teuer). Danach in Lighthouse/PageSpeed den LCP-Knoten prüfen.

### [HOCH] framer-motion steckt im gemeinsamen Bundle jeder Seite, nur für Logo-Effekt und Hero-Einblendung
- **Beleg:** components/LayoutClient.tsx:4 importiert { motion }; Z.145-169 animiert das Logo 'BrandWerkX' mit 10 einzelnen motion.span (Buchstaben mit blur-Filter, Delays bis 0.95 s plus 0.6 s Dauer). LayoutClient wird in app/[lang]/layout.tsx:20 für ALLE Locale-Seiten geladen. components/WorkHero.tsx:5 importiert zusätzlich motion, MotionConfig, useMotionValue und useSpring. Es gibt kein LazyMotion/m und kein dynamic(). Laut package.json:12 framer-motion ^10.18.0. Geschätzt 30-45 KB gzip (nicht gebaut). Zusätzlich ist das Logo im SSR-HTML unsichtbar (opacity:0) und ignoriert prefers-reduced-motion, weil dort kein MotionConfig sitzt (nur WorkHero.tsx:60 hat es).
- **Lösung:** Logo-Animation durch CSS-Keyframes mit animation-delay ersetzen (Buchstaben als normale Spans), Hero-Entrance ebenfalls per CSS (siehe vorheriger Punkt). Damit entfällt framer-motion komplett aus dem Bundle und aus package.json. Falls es bleiben soll: LazyMotion mit domAnimation und m.* statt motion.*. Nach der Änderung 'next build' ausführen und die First-Load-JS-Tabelle gegenprüfen.

### [MITTEL] 23 FadeInSection-Client-Wrapper plus 4 AnimatedCounter auf der Startseite: Inhalt im SSR unsichtbar, ganzer Seitenbaum wird hydratisiert, Zähler zeigen '0'
- **Beleg:** components/HomeAnimations.tsx:36-67: jede FadeInSection ist 'use client' mit useState plus eigenem IntersectionObserver und rendert serverseitig opacity:0 plus translateY(32px) (Z.59-60). app/[lang]/page.tsx: 4 Stats + 1 Projekt-Header + 5 Projektkarten + 1 Skills-Header + 8 Skill-Karten + 1 Testimonial-Header + 2 Testimonials + 1 CTA = 23 Instanzen, dazu 4 AnimatedCounter (Z.216) mit 27 Observern insgesamt. Da jeder Abschnitt in einem Client-Wrapper steckt, werden die Kinder mit hydratisiert und der Seiteninhalt zusätzlich im RSC-Flight-Payload dupliziert (HTML-Größe, TBT). AnimatedCounter (Z.6-33) rendert initial 0, also steht im HTML '0€' statt '490€' bzw. '0'. Das ist auch ein Inhalts- und Crawler-Problem. Die Counter ändern ihre Breite beim Hochzählen (kleiner CLS-Beitrag beim Scrollen). Gleiches Muster auf /projekte, /ueber-mich, /projekte/zaira-beauty, /leistungen und /kontakt.
- **Lösung:** Scroll-Reveal ohne React-State: ein einziges kleines Skript mit einem IntersectionObserver auf .reveal-Elemente (oder CSS animation-timeline: view() mit Fallback), Startzustand nur setzen, wenn JS aktiv ist (html.js-Klasse), damit der Inhalt ohne JS sichtbar bleibt. Counter: Endwert im HTML ausliefern und nur zum Hochzählen die Insel nutzen, plus font-variant-numeric: tabular-nums und min-width. Dadurch werden die Sektionen wieder reine Server-Markup-Teile.

### [MITTEL] next/image: kein priority im Hero, keine sizes bei den Projektkarten
- **Beleg:** components/WorkHero.tsx:176-177: vier Bilder mit fill und sizes, aber ohne priority und fetchPriority, also loading=lazy und kein Preload; zudem erst nach Hydration sichtbar (Delay 0.3-0.72 s). app/[lang]/page.tsx:239 (ebenso app/[lang]/projekte/page.tsx:114): <Image width={800} height={500}> ohne sizes. Next erzeugt dann nur ein 1x/2x-srcset (828w/1920w). Ein Handy mit DPR 2-3 lädt für eine ca. 350 px breite Karte die 1920w-Variante, obwohl die Quell-PNGs nur 1280x800 (serlo 532.383 B, klempner 494.972 B), 800x500 (mrg 331.999 B) und 1000x489 (mobilwerk 161.395 B) groß sind. Dieselben vier Bilder werden im Hero und in den Karten mit unterschiedlichen Breiten optimiert und somit doppelt erzeugt. components/LayoutClient.tsx:315: Footer-Logo mit width=150/height=30, die Quelle ist aber 1298x247 (74 KB, tatsächliches Seitenverhältnis 5,25:1 gegenüber 5:1).
- **Lösung:** Falls ein Bild LCP-Kandidat bleibt, dort priority setzen (sinnvoll nur für das erste Showcase-Bild). Bei den Karten sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw" ergänzen. Dasselbe Bild nur in einer Größenklasse wiederverwenden. Footer-Logo auf die tatsächliche Proportion korrigieren und Quelle verkleinern.

### [MITTEL] Dauerlaufende JS-Animationen im Hero und 3D-Tilt, die nie pausieren
- **Beleg:** components/WorkHero.tsx:163-165: vier Showcase-Karten mit animate={{ y: [0,-9,0] }} und repeat: Infinity (Dauer 5-8 s). In framer-motion 10 läuft die Einzelachse y über den Main-Thread (rAF) und nicht auf dem Compositor. Zusätzlich useSpring-Tilt (Z.40-57) auf einem Container mit transformStyle: preserve-3d und perspective (Z.152-155). Die Animationen laufen auch außerhalb des Viewports und in Hintergrund-Tabs weiter. Das erzeugt dauerhaft Main-Thread-Arbeit und belastet INP/TBT. Dazu kommen LayoutClient.tsx:60-61 (scrollHeight wird bei jedem Scroll-Frame gelesen, erzwingt Layout) und LayoutClient.tsx:77-105 (pointermove ohne rAF-Drosselung mit getBoundingClientRect), außerdem zwei getrennte Scroll-Listener (Z.49-53 und 65-66).
- **Lösung:** Floating per CSS (@keyframes mit transform: translateY, compositor-fähig, in globals.css; die vorhandene prefers-reduced-motion-Regel in globals.css:129-136 greift dann automatisch). Tilt nur auf Hover/Maus und über CSS-Variablen. max-Scrollwert in einem ResizeObserver cachen, pointermove per rAF drosseln, die zwei Scroll-Listener zusammenlegen.

### [MITTEL] Vollbild-Film-Grain mit mix-blend-mode über der ganzen Seite plus mehrere backdrop-filter
- **Beleg:** app/globals.css:511-523: .site-shell::after ist position:fixed; inset:0; mix-blend-mode:overlay mit einem feTurbulence-SVG als Data-URI, opacity nur 0.04. Ein blendendes Fixed-Overlay über allem erzwingt auf jedem Scroll-Frame ein Compositing der kompletten Seite (besonders auf Mobil-GPUs). Der visuelle Effekt bei 4 % Deckkraft ist kaum wahrnehmbar. Weitere teure Effekte: backdrop-filter blur(16px) auf der fixen Nav (components/LayoutClient.tsx:140), blur(10px) auf jedem .project-label (globals.css:799, 5 Karten), blur(4px) auf .section-eyebrow (globals.css:553), filter: blur(20px) auf .cta-glow (globals.css:1122).
- **Lösung:** Grain entfernen oder als vorgerendertes kleines PNG ohne mix-blend-mode auf body::before nutzen. Die blur-Effekte auf .project-label und .section-eyebrow durch eine halbtransparente Fläche ersetzen. Mit Chrome DevTools Performance und Layers auf einem Mittelklasse-Android gegenprüfen.

### [MITTEL] Fonts: drei Familien auf jeder Seite vorgeladen, globals.css nutzt die Familiennamen statt der next/font-Variablen
- **Beleg:** app/layout.tsx:11-32: Inter (4 Gewichte), Space Grotesk (3 Gewichte) und Instrument Serif (normal + italic) hängen alle an <html> (Z.114) und werden damit auf jeder Seite (auch Impressum, Datenschutz) vorgeladen, bis zu ca. 9 Font-Dateien. Inter und Space Grotesk sind variable Fonts, Gewichtslisten sind dafür unnötig. Instrument Serif wird nur für Highlight-Wörter genutzt (globals.css:1230-1235). globals.css:92 (body), 107 (h1-h6) und 363 (zweite body-Regel mit 'Rubik') referenzieren die Namen 'Inter'/'Space Grotesk'/'Rubik', während next/font eigene gehashte Familiennamen erzeugt. Folge: Alle Überschriften ohne Klassen-Override (u.a. der Hero-H1, WorkHero.tsx:93-98) fallen auf Segoe UI/Arial zurück, obwohl Space Grotesk geladen und vorgeladen wird. Das ist verschwendetes Preload und uneinheitliche Typografie. Nur der Inline-Style in app/layout.tsx:230 rettet den Body-Text. tailwind.config.js:50-52 definiert zusätzlich nicht geladene Familien (Playfair Display, Dancing Script).
- **Lösung:** In globals.css h1-h6 auf var(--font-space-grotesk) und body auf var(--font-inter) umstellen (und die doppelte body-Regel bei Z.362 entfernen). weight-Arrays für Inter und Space Grotesk weglassen (variable Fonts), Instrument Serif mit preload:false laden oder per display:'optional'. Nach dem Build prüfen, wie viele woff2 tatsächlich im <head> landen.

### [MITTEL] 16 ungenutzte Abhängigkeiten, plus drei, die nur von totem Code genutzt werden
- **Beleg:** package.json:10-31. Per Repo-weiter Import-Suche werden nur framer-motion (LayoutClient.tsx:4, WorkHero.tsx:5), resend (app/api/contact/route.ts:2), react/next und Tailwind/PostCSS genutzt. Nirgends importiert: @headlessui/react, @tailwindcss/typography (tailwind.config.js:plugins ist leer), chart.js, react-chartjs-2, date-fns, html2canvas, jspdf, lucide-react, next-themes (CLAUDE.md behauptet fälschlich 'light mode via next-themes'), react-datepicker, react-hook-form (das Kontaktformular nutzt useState, KontaktClient.tsx:9-11), react-hot-toast, react-icons, react-intersection-observer, simplex-noise, uuid. three und @react-three/fiber (plus @types/three) werden nur in components/GlobeHero.tsx und components/RealStarfield.tsx importiert, die selbst nirgends eingebunden sind. Wichtig: Das Runtime-Bundle ist davon NICHT betroffen, weil Next nur erreichbare Module bündelt. Betroffen sind Installationszeit, Build-Zeit, package-lock.json (249 KB) und Angriffsfläche (jspdf, html2canvas). Das Risiko ist, dass ein versehentlicher Import sofort mehrere hundert KB ins Bundle bringt. package.json:2-3,34-41 enthält zudem Template-Reste ('kosmetik-demo', Autor 'Zaira Beauty', Keywords beauty/lashes).
- **Lösung:** npm uninstall @headlessui/react @tailwindcss/typography chart.js react-chartjs-2 date-fns html2canvas jspdf lucide-react next-themes react-datepicker react-hook-form react-hot-toast react-icons react-intersection-observer simplex-noise uuid three @react-three/fiber @types/three (sowie framer-motion, falls der CSS-Umbau erfolgt). name, description, author und keywords in package.json auf BrandWerkX korrigieren.

### [MITTEL] next.config.js ohne Image-Cache-TTL, AVIF und Cache-Header
- **Beleg:** next.config.js:3-12 enthält nur remotePatterns für images.unsplash.com und images.pexels.com, die beide nirgends mehr genutzt werden (alle next/image-Quellen sind lokal). Es gibt kein images.minimumCacheTTL (Next-14-Default: 60 Sekunden), kein images.formats (Default nur WebP) und keine headers() für /images/*, /muster/*, /music/*. Dateien aus public/ werden in Next standardmäßig mit max-age=0 ausgeliefert, optimierte Bilder bekommen mit dem Default nur 60 s Browser-Cache. Wiederholte Besuche und Seitenwechsel revalidieren Bilder unnötig. Die PNG-Originale in public/images (serlo, klempner, mrg, mobilwerk = 1,52 MB) sind roh deutlich größer als nötig.
- **Lösung:** images: { minimumCacheTTL: 31536000, formats: ['image/avif','image/webp'] } setzen (Dateinamen bei Änderungen versionieren), headers() mit Cache-Control: public, max-age=31536000, immutable für /images/* ergänzen, unbenutzte remotePatterns entfernen und die PNG-Originale einmalig zu WebP/AVIF konvertieren (spart Repo-Größe und Optimizer-Last).

### [MITTEL] Middleware läuft auf jeder Anfrage, auch für bereits lokalisierte statische Seiten und Assets
- **Beleg:** middleware.ts:44-46: matcher ['/((?!_next/static|_next/image|favicon.ico).*)'] schließt nur drei Pfade aus. Der Early-Return für /api, /images, /music, /muster und Pfade mit '.' (Z.15-24) greift erst NACH dem Edge-Aufruf. Jeder Seitenabruf von /de/... (statisch generiert) läuft damit durch eine Edge-Function und erhöht TTFB und Aufrufe. Der Einstiegspfad / kostet immer einen zusätzlichen Redirect-Roundtrip (307 auf /de, die redirect('/de') in app/page.tsx:4 wird nie erreicht). Außerdem wird /opengraph-image (kein Punkt im Pfad) auf /de/opengraph-image umgeleitet (siehe Nebenbefund).
- **Lösung:** Matcher auf das Nötige verengen, z.B. ['/', '/((?!de|en|api|muster|images|music|_next|.*\\..*).*)'], damit lokalisierte Seiten direkt vom CDN kommen. Für den Root-Redirect optional 308 statt 307 verwenden.

### [MITTEL] Nebenbefund (nicht Performance, aber relevant): /agb führt ins 404, OG-Bild vermutlich defekt, lang-Attribut fest auf 'de'
- **Beleg:** (a) app/agb/page.tsx existiert, aber es gibt kein app/[lang]/agb. Die Middleware (middleware.ts:26-39) leitet /agb nach /de/agb um, das 404 liefert. (b) app/opengraph-image.tsx exportiert sowohl GET (Z.5) als auch einen Default-Export, der JSX statt ImageResponse liefert (Z.52-58). Die Metadaten in app/layout.tsx:81-88 und :94 verweisen auf https://brandwerkx.de/opengraph-image, und die Middleware leitet /opengraph-image (kein Punkt im Pfad) auf /de/opengraph-image um, also vermutlich 404 für Social-Previews. Nicht per Build verifiziert, bitte prüfen. (c) app/layout.tsx:112 setzt <html lang="de"> fest, auch für /en/*-Seiten.
- **Lösung:** AGB-Seite nach app/[lang]/agb verschieben (oder Redirect), opengraph-image entweder korrekt per Next-Dateikonvention mit Default-Export von ImageResponse umsetzen oder ein statisches PNG nach public/ legen und aus der Middleware ausnehmen, lang-Attribut pro Locale setzen (z.B. über [lang]-Root-Layout). Diese Punkte gehören zur SEO-Dimension und sollten dort mit aufgegriffen werden.

### [NIEDRIG] Toter Code und tote Assets im Repo: GlobeHero, RealStarfield, Neumorphism-Demos, a.mp3, Legacy-Routen
- **Beleg:** Nirgends importiert: components/GlobeHero.tsx (25.979 B, lädt zur Laufzeit ein 50m-TopoJSON von cdn.jsdelivr.net, Z.448, und eine eigene Montserrat-Font, Z.8), components/RealStarfield.tsx (fetcht /stars100.json), NeumorphismDemo.tsx, NeumorphismIntegrationGuide.tsx, NeumorphismShowcase.tsx, PortfolioWithDefaultNeumorphism.tsx, PortfolioWithNeumorphism.tsx, ThemeProvider.tsx, Footer.tsx. 31 der 226 CSS-Klassen in globals.css (u.a. der gesamte .neumorph-*-Block ab ca. Z.362, plus shadow-portfolio, glow-pro) kommen in live genutztem Code nicht vor. Audio: public/music/a.mp3 (733.645 B) wird von keiner Datei referenziert (nur die Allowlist in middleware.ts:22), also kein Autoplay und kein Netzwerk-Impact, aber toter Ballast. Die Legacy-Routen app/kontakt, app/leistungen, app/ueber-mich, app/impressum, app/datenschutz (+siraj) und app/agb sind durch die Middleware nie erreichbar. Diese Dateien werden trotzdem von tsc und ESLint beim Build geprüft und können den Build blockieren (CLAUDE.md: ESLint-Fehler blockieren den Deploy). LÖSCH-EMPFEHLUNG.md im Repo listet das bereits teilweise.
- **Lösung:** Alle genannten Komponenten, public/music/a.mp3, public/stars100.json und die Legacy-Routen löschen (git behält die Historie). Die toten .neumorph-*-Regeln aus globals.css entfernen. Die Allowlist /music/ in middleware.ts:22 streichen.

### [NIEDRIG] Ganzes Dictionary wird an den Client-Layout-Wrapper übergeben
- **Beleg:** app/[lang]/layout.tsx:17-20 übergibt das komplette dict an LayoutClient (components/LayoutClient.tsx:30), benötigt werden dort aber nur dict.nav und dict.footer. lib/i18n/de.ts hat 12.485 B, en.ts 11.911 B. Das Dictionary wird dadurch auf jeder Seite zusätzlich in den Flight-Payload serialisiert, auf /kontakt und /leistungen nochmals für die Client-Komponenten (KontaktClient.tsx:6, LeistungenClient.tsx). Außerdem ist LayoutClient (17.5 KB Quelle, mit Nav, Footer, WhatsApp-Button, 4 useEffects) ein einziger Client-Block für statisches Footer-Markup.
- **Lösung:** Nur { nav: dict.nav, footer: dict.footer } übergeben und Footer sowie WhatsApp-Button als Server-Komponente aus dem Client-Wrapper herausziehen. Nur Nav (Menü-State, Scroll) bleibt Client.

### [NIEDRIG] apple-touch-icon.png wird referenziert, existiert aber nicht
- **Beleg:** app/layout.tsx:119 verlinkt /apple-touch-icon.png, im Verzeichnis public/ gibt es die Datei nicht (ls bestätigt). Jede iOS-/Safari-Anfrage endet in einem 404 (die Middleware lässt Pfade mit '.' durch). Ebenfalls doppelt: app/layout.tsx:118 <link rel=icon> zusätzlich zu Nexts automatisch erzeugtem Link für app/favicon.ico (25.931 B).
- **Lösung:** 180x180 apple-touch-icon.png nach public/ legen (oder als app/apple-icon.png per Next-Konvention) und den manuellen <link rel=icon> entfernen.

## KI-Optimierung (GEO)

KI-OPTIMIERUNG (GEO/AEO) für brandwerkx.de, Stand: statische Analyse des Repos /home/user/portfolio. Die Live-Seite war nicht prüfbar (Egress-Proxy blockiert brandwerkx.de), es wurde kein Build ausgeführt und nichts verändert. Ob llms.txt oder andere Dateien live liegen, ist nicht verifiziert; im Repo existiert keine llms.txt.

IST-ZUSTAND KURZ
Gut: Der Text wird serverseitig ausgeliefert (Server Components, Client-Komponenten werden per SSR gerendert). Der Name "Zaur Hatuev" / "BrandWerkX" ist überall einheitlich geschrieben. robots.txt blockiert keinen KI-Crawler (nur `Disallow: /muster/`, public/robots.txt:4) und verweist auf die Sitemap (Zeile 7). Die Root-Metadaten setzen max-snippet:-1 und max-image-preview:large (app/layout.tsx:96-105), das ist die richtige Grundlage für Google AI Overviews. JSON-LD (ProfessionalService, Person, WebSite) ist vorhanden (app/layout.tsx:121-226). Pro Seite gibt es Title, Description und Canonical. Die Middleware lässt Dateien mit Punkt durch (middleware.ts:23), daher funktionieren public/llms.txt und public/robots.txt ohne Locale-Redirect.

Fehlt oder ist kaputt: KI-Systeme finden widersprüchliche Kernfakten (Preis 490 / 790 / 990 €, Lieferzeit 3–5 / 5 / 5–10 / 7–14 Tage, Standort München vs. Geretsried, Erfahrung "8+ Jahre" vs. "seit 2024"). Die Statistik-Zahlen stehen im HTML als "0". Die FAQ-Antworten stehen gar nicht im HTML. Es gibt weder llms.txt noch FAQPage-Markup noch Ratgeber- oder Preisinhalte, die Kundenfragen direkt beantworten. Die gesamte Schema-Ebene hängt im Root-Layout und ist für alle Seiten gleich.

EHRLICHE EINORDNUNG zu llms.txt und KI-Crawler-Regeln: llms.txt ist ein inoffizieller Vorschlag. Meines Wissens (Stand Juni 2026) wertet kein großer Anbieter sie nachweislich für Rankings oder Zitate aus, Google hat das ausdrücklich verneint. Sie ist in 10 Minuten gemacht und schadet nicht, gehört aber nicht an Platz 1. Platz 1 sind konsistente, serverseitig lesbare Fakten, eine saubere Entität (Schema + Google-Unternehmensprofil + Bing/Search Console) und Seiten, die konkrete Kundenfragen in den ersten zwei Sätzen beantworten. robots.txt-Regeln für KI-Bots steuern nur Zugriff, nicht Ranking. Für Google AI Overviews gilt allein Googlebot samt Snippet-Steuerung; Google-Extended betrifft nur Gemini-Training/Grounding und nicht die Suche.

TOP-5-PRIORITÄTEN
1. Eine Faktenbasis festlegen (Preise, Lieferzeit, Standort, Erfahrung) und überall angleichen (Finding 1 und 2).
2. AnimatedCounter-Werte und FAQ-Antworten in den serverseitigen HTML-Output bringen (Finding 3 und 4).
3. FAQ auf mindestens 14 Fragen erweitern, mit FAQPage-JSON-LD (Finding 5).
4. Schema pro Seite mit @id-Verknüpfung, Google-Unternehmensprofil-URL in sameAs (Finding 7 und 13).
5. llms.txt und KI-Bot-Gruppen in robots.txt ergänzen (Finding 8 und 9).

### [KRITISCH] Zitierfähige Kernfakten widersprechen sich: Preis, Lieferzeit, Erfahrung, Ergebnis-Zahlen
- **Beleg:** PREIS: Einstiegspreis 490 € in app/[lang]/page.tsx:19, app/[lang]/leistungen/LeistungenClient.tsx:29, app/layout.tsx:142/176. Dagegen 'Pakete ab 790€' in app/[lang]/leistungen/page.tsx:10,11,14,19,20,24,25 (Title/Description/OG, DE und EN), app/[lang]/kontakt/page.tsx:10,13,16,19 und Budget-Auswahl lib/i18n/de.ts:170 / en.ts:172 ('790 € – 1.500 €'). Der tote Legacy-Pfad app/leistungen/page.tsx nennt Starter 790 € / Business 1.500 €, weil app/leistungen/, app/ueber-mich/, app/kontakt/ usw. durch middleware.ts:36-38 nie erreichbar sind, aber im Build bleiben. Wartung: LeistungenClient.tsx:67 'ab 99€/Monat' (SEO & Wartung) vs. :116 'Wartung & Updates ab 49€/Monat'. LIEFERZEIT: lib/i18n/de.ts:14 und app/[lang]/page.tsx:197 'in 5 Tagen', LeistungenClient.tsx:38 '3–5 Werktage', :57 '7–14 Tage', de.ts:80/119 '5–10 Tagen'. ERFAHRUNG: app/[lang]/ueber-mich/page.tsx:12,15,18 '8+ Jahre Erfahrung' vs. app/[lang]/projekte/page.tsx:83 'Dabei seit 2024–' und lib/i18n/de.ts:202 'Case Study · 2024'. NETTO/BRUTTO wird nirgends genannt. Die Seite 'Google My Business' (LeistungenClient.tsx:92) heißt seit 2022 'Google Unternehmensprofil / Business Profile'.
- **Lösung:** 1) Eine Faktentabelle festlegen und als einzige Quelle nutzen, z. B. lib/facts.ts, die Metadaten, Dictionary, JSON-LD und llms.txt gemeinsam einbinden. Vorschlag auf Basis der Seiteninhalte (bitte bestätigen): Muster-Website ab 490 € (3–5 Werktage), Custom Website ab 990 € (bis 5 Seiten, 7–14 Tage), SEO & Wartung ab 99 €/Monat, Google-Unternehmensprofil 149 € einmalig, Speed-Optimierung 199 € einmalig, Zusatzseiten ab 99 €, Wartung & Updates ab 49 €/Monat, jeweils mit Angabe netto/brutto bzw. Kleinunternehmer-Hinweis. 2) Alle 790-€-Stellen in leistungen/page.tsx, kontakt/page.tsx und die Budgetstufen in de.ts:170 / en.ts:172 anpassen. 3) Hero 'in 5 Tagen' differenzieren ('Muster-Website in 3–5 Werktagen') oder die Pakete auf '5 Tage' vereinheitlichen. 4) Erfahrung eindeutig belegen (Startjahr nennen) und überall gleich schreiben. 5) 'Google My Business' in 'Google-Unternehmensprofil' umbenennen. 6) Tote Legacy-Routen app/leistungen, app/ueber-mich, app/kontakt, app/impressum, app/agb, app/datenschutz (und das ungenutzte components/Footer.tsx) löschen, damit keine alten Fakten im Build bleiben.

### [HOCH] Entität Ort/Person inkonsistent: München in Marketing und Schema, Geretsried im Impressum
- **Beleg:** Schema und Marketing: app/layout.tsx:146-150 (addressLocality 'München'), :141 'Webentwicklung München', :200 jobTitle '… München', LayoutClient.tsx:325 'München, Deutschland' und :377 'Gebaut in München', Title/H1/Keywords überall 'München'. Rechtliche Anbieterangabe: app/[lang]/impressum/page.tsx:25 und :38 ('Steiner Ring 64, 82538 Geretsried'), app/[lang]/datenschutz/page.tsx:11, app/agb/page.tsx:20 ('Gerichtsstand Geretsried'). Weitere Abweichungen: LinkedIn-URL im Footer LayoutClient.tsx:356 ('/in/zaur-hatuev') vs. app/layout.tsx:166,205 und ueber-mich/page.tsx:43 ('/in/zaur-hatuev-8559b91a1/'). Kontakt-Mail ist Gmail (layout.tsx:144, impressum:31), obwohl Resend mit zaur@brandwerkx.de versendet (app/api/contact/route.ts:146). Die WhatsApp-Nummer steht nur im Client-Footer (LayoutClient.tsx:277,350), nicht in Impressum, Kontakt-Seite oder Schema (kein telephone). Impressum-Text zitiert '§ 5 TMG' / 'RStV' (lib/i18n/de.ts:192,195), dort fehlen auch Telefon und USt-/Kleinunternehmer-Angabe.
- **Lösung:** Eine NAP-Definition (Name, Adresse/Einsatzgebiet, Telefon) festlegen und in Schema, Footer, Impressum, Kontakt-Seite und Google-Unternehmensprofil identisch verwenden. Ehrliche Formulierung: Sitz Geretsried, Einsatzgebiet 'Raum München / Oberbayern, remote deutschlandweit' (bitte bestätigen) statt 'München' als Standort; Marketing-Keywords 'München' können als Einsatzgebiet bleiben, 'Gebaut in München' und 'München, Deutschland' im Footer sollten angepasst werden. Aus Sicht von Google ist ein Service-Area-Business mit versteckter Wohnadresse der saubere Weg (siehe Finding 13). Rechtliche Passung des Impressums (DDG/MStV statt TMG/RStV, USt-/Kleinunternehmer-Hinweis, Telefon) bitte rechtlich prüfen lassen, das ist hier keine Rechtsberatung. LinkedIn-URL einheitlich setzen; eine Domain-Mail (z. B. zaur@brandwerkx.de) als öffentliche Kontaktadresse in Schema und Impressum verwenden.

### [HOCH] Statistik-Zahlen stehen im Server-HTML als '0' (AnimatedCounter) statt als Fakten
- **Beleg:** components/HomeAnimations.tsx:7 'useState(0)' und :32 rendert '{count}{suffix}'; der Wert wird erst nach IntersectionObserver per requestAnimationFrame hochgezählt. Genutzt in app/[lang]/page.tsx:89-94,216 mit den Werten 3 ('Top-3 bei Google'), 490 ('Festpreis ab'), 0 ('versteckte Kosten'), 5 ('Tage bis Go-Live'). Crawler ohne JavaScript-Ausführung (GPTBot, ClaudeBot, PerplexityBot lesen i. d. R. nur Roh-HTML) sehen also '0€ Festpreis ab' und '0 Tage bis Go-Live'. FadeInSection (HomeAnimations.tsx:36-66) setzt zusätzlich opacity:0 im SSR-Markup, was für Screenshot- und Agent-Browser sichtbar relevant ist.
- **Lösung:** AnimatedCounter mit dem Zielwert als Initialzustand rendern: 'useState(end)' für SSR und erst im Client-Effekt auf 0 zurücksetzen und hochzählen, oder die Zahl als statischen Text in einem <span> lassen und die Animation nur per CSS/Overlay machen. Besser noch: Die Fakten (Festpreis ab 490 €, 3–5 Werktage, Antwort in 24 h) zusätzlich als normalen Fließtext/Liste im Kurzprofil-Absatz (Finding 6) ausgeben. Für FadeInSection reicht eine 'noscript'-/prefers-reduced-motion-Variante oder 'opacity: 1' als SSR-Default mit Animation per CSS-Klasse nach Hydration.

### [HOCH] FAQ-Antworten sind nicht im HTML, nur 4 Fragen, kein FAQPage-Markup, EN-FAQ identisch dünn
- **Beleg:** app/[lang]/leistungen/LeistungenClient.tsx:120-135: 'FaqItem' rendert die Antwort nur bei 'open' ({open && <div className="faq-answer">…} Zeile 132), also steht im ausgelieferten HTML nur die Frage. Nur 4 FAQs (LeistungenClient.tsx:147-152, lib/i18n/de.ts:106-113). Kein JSON-LD FAQPage irgendwo (nur WebSite/ProfessionalService/Person in app/layout.tsx:121-226). Kontakt-, Home- und Über-mich-Seite haben keine FAQ. Antworten sind kurz und teilweise ungenau: de.ts:111 'danach kannst du selbst Änderungen vornehmen' (bei einer Next.js-Codebasis ohne CMS erklärungsbedürftig). Hinweis: Google zeigt FAQ-Rich-Results seit 2023 nur noch für staatliche/Gesundheitsseiten; FAQPage-Markup bleibt trotzdem als maschinenlesbare Frage/Antwort-Struktur für andere Systeme nützlich.
- **Lösung:** 1) FaqItem auf <details>/<summary> umstellen oder die Antwort immer rendern und nur per CSS (grid-template-rows 0fr/1fr) einklappen, damit der Text im HTML steht. 2) Eigene Seite /de/faq (und Auszug auf /de/leistungen) mit mindestens 14 Fragen (Liste unten), Antwort direkt im ersten Satz, 40–70 Wörter. 3) FAQPage-JSON-LD pro Seite aus denselben Dictionary-Daten erzeugen, damit Sichtbares und Markup identisch sind. 4) Englische Variante pflegen (de.ts/en.ts-Typen sind bereits gekoppelt, lib/i18n/en.ts:3).

FAQ-FRAGEN AUF DEUTSCH (Antwortentwurf aus Seiteninhalt, [TODO] = von dir zu bestätigen):
1. Was kostet eine Website für einen Handwerksbetrieb oder kleines Unternehmen? Muster-Website ab 490 €, Custom Website ab 990 € (bis 5 Seiten), SEO & Wartung ab 99 €/Monat; Festpreis, [TODO netto/brutto].
2. Wie lange dauert es, bis meine Website online ist? Muster-Website 3–5 Werktage, Custom Website 7–14 Tage, gerechnet ab Eingang von Logo, Texten und Bildern.
3. Was ist der Unterschied zwischen Muster-Website und individueller Website? Muster = fertiges Design wird mit Logo, Texten und Farben angepasst (schneller, günstiger); Custom = von Grund auf nach deinen Wünschen.
4. Was muss ich selbst liefern (Logo, Texte, Bilder)? Nur das Nötigste: Logo, Kerntexte, Farben, Kontaktdaten; [TODO: Hilfe bei Texten ja/nein].
5. Sind Hosting und Domain im Preis enthalten, was kostet es danach? Im ersten Jahr inklusive, danach ca. 10–15 €/Monat je nach Anbieter (de.ts:113).
6. Wem gehört die Website, bekomme ich den Quellcode und Zugang? [TODO festlegen und in AGB spiegeln].
7. Werde ich mit der neuen Website bei Google auf Seite 1 stehen? SEO-Grundlagen (Struktur, Meta-Daten, Ladezeit, mobile) sind enthalten, ein Ranking kann nicht garantiert werden; Google-Unternehmensprofil als Zusatz für lokale Suche.
8. Was bringt ein Google-Unternehmensprofil und kannst du es einrichten? Einrichtung, Optimierung und Verifizierung einmalig 149 € (LeistungenClient.tsx:92); macht dich in lokaler Suche und Maps sichtbar.
9. Ist meine Website schnell und für Smartphones optimiert? Mobile-first, Core Web Vitals; nachträgliche Speed-Optimierung 199 € einmalig.
10. Kann ich Texte und Bilder später selbst ändern? [TODO: CMS/Anleitung?]; sonst Wartung & Updates ab 49 €/Monat.
11. Was passiert nach dem Launch? Übergabe, kurze Einführung, 30 Tage Support inklusive, optional monatliche Betreuung.
12. Kannst du meine bestehende Website verbessern oder übernehmen? Ja, 'SEO & Wartung' ab 99 €/Monat: technische SEO-Analyse, Core Web Vitals, monatliche Updates, Monatsbericht.
13. Arbeitest du auch für Kunden außerhalb von München, remote? [TODO Einsatzgebiet bestätigen].
14. Ist die Website DSGVO-konform (Impressum, Datenschutz, Cookies)? [TODO Umfang bestätigen; keine Rechtsberatung].
15. Wie läuft Zusammenarbeit und Bezahlung ab (Anzahlung, Rechnung)? [TODO] plus Ablauf in 4 Schritten (de.ts:114-121).
16. Kann ich Online-Terminbuchung oder einen Online-Shop bekommen? Terminbuchung optional bei Custom (LeistungenClient.tsx:54); Online-Shops stehen im Ticker (page.tsx:206), haben aber kein Paket/keinen Preis, [TODO Angebot definieren].
17. Wie nutzt du KI beim Erstellen, und wer prüft das Ergebnis? Bio sagt 'KI-gestützte Entwicklungsmethoden' (de.ts:127); [TODO Qualitätssicherung beschreiben].
18. Wie schnell antwortest du auf Anfragen? Innerhalb von 24 Stunden, Mo–Fr 9–18 Uhr (de.ts:150,182).

### [HOCH] Strukturierte Daten: ein globaler Block für alle Seiten, ohne @id-Verknüpfung, mit Lücken und einer ungültigen SearchAction
- **Beleg:** Gesamtes JSON-LD in app/layout.tsx:121-226 und damit identisch auf jeder Seite (auch Impressum, /muster, EN). Mängel: kein @id und keine Referenzen zwischen ProfessionalService und Person, 'founder' ist ein String (Zeile 145) statt Person-Verweis; WebSite.potentialAction.SearchAction zeigt auf '/de/projekte' ohne Suchparameter (Zeilen 133-136), es gibt keine Seitensuche, der Eintrag ist ungültig und sollte weg; jobTitle enthält einen Ort (Zeile 200) und knowsAbout den String 'Webentwicklung München' (Zeile 208); kein telephone, logo, image, openingHoursSpecification (Zeiten stehen in de.ts:182), keine Service-Entitäten, kein BreadcrumbList, kein FAQPage, kein Article/CreativeWork für die Case Study; Offers (Zeilen 172-193) haben nur 'price' ohne 'ab' (priceSpecification minPrice) und ohne Monatsangabe beim 99-€-Paket, sameAs ohne Google-Unternehmensprofil; inLanguage nur beim WebSite-Knoten. Außerdem keinen aggregateRating oder Review-Markup erfinden, solange es keine echten, überprüfbaren Bewertungen (z. B. im Google-Profil) gibt.
- **Lösung:** JSON-LD pro Seite ausgeben (Komponente <JsonLd data={...}/> in den jeweiligen page.tsx), mit stabilen @ids und @graph. Skelett Startseite: {"@context":"https://schema.org","@graph":[{"@type":["ProfessionalService","LocalBusiness"],"@id":"https://brandwerkx.de/#org","name":"BrandWerkX","url":"https://brandwerkx.de","logo":"https://brandwerkx.de/images/brandwerkxweiss.webp","telephone":"+49…","email":"…@brandwerkx.de","founder":{"@id":"https://brandwerkx.de/#zaur"},"address":{"@type":"PostalAddress","addressLocality":"Geretsried","postalCode":"82538","addressCountry":"DE"},"areaServed":[{"@type":"City","name":"München"},{"@type":"AdministrativeArea","name":"Oberbayern"}],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday"],"opens":"09:00","closes":"18:00"}],"sameAs":[GitHub,LinkedIn einheitlich,Google-Unternehmensprofil-URL],"hasMap":"<Maps-URL des Profils>"},{"@type":"Person","@id":"https://brandwerkx.de/#zaur","name":"Zaur Hatuev","jobTitle":"Webentwickler und UI/UX-Designer","worksFor":{"@id":"https://brandwerkx.de/#org"},"knowsAbout":["Next.js","React","TypeScript","UI/UX Design","Lokale SEO"]}]}. Auf /leistungen: je Paket ein 'Service' mit 'offers' (priceSpecification: minPrice, priceCurrency EUR, bei Wartung unitText 'MON') plus FAQPage. Auf der Case Study: Article oder CreativeWork mit about/author (Verweis auf #zaur). BreadcrumbList überall. SearchAction entfernen. Hinweis: Die Straßenadresse im Schema nur angeben, wenn sie auch im Google-Unternehmensprofil/Impressum konsistent öffentlich ist; sonst weglassen und nur Ort/PLZ führen.

### [HOCH] Seitenstruktur: Es gibt keine Inhalte, die konkrete Kundenfragen beantworten (Preise, Handwerker, Google-Profil, Ablauf)
- **Beleg:** Sitemap und Routen (app/sitemap.ts:6-15, app/[lang]/*) umfassen nur Home, Leistungen, Projekte, 1 Case Study, Über mich, Kontakt, Impressum, Datenschutz. Alle drei Pakete, Zusatzleistungen, Ablauf und FAQ stecken auf einer einzigen Client-Seite (LeistungenClient.tsx, 293 Zeilen). Es gibt kein Blog/Ratgeber, keine Branchenseiten (obwohl Zielgruppe 'Handwerker' im Titel/Schema steht und Muster für Klempner, Elektriker, Kosmetik existieren, app/muster/page.tsx:5-33), keine Seite zu Google-Unternehmensprofil (eigene Zusatzleistung, LeistungenClient.tsx:92), nur eine Case Study (andere Projekte verlinken extern: app/[lang]/page.tsx:105,133,149).
- **Lösung:** Zielstruktur (DE zuerst, EN spiegelt):
/de (Home): Kurzprofil-Absatz, Fakten-Box, 3 Pakete mit Link, Top-5-FAQ.
/de/leistungen: Übersicht mit Preistabelle (HTML <table>), Verlinkung auf Detailseiten.
/de/leistungen/website-fuer-handwerker (Klempner, Elektriker; Preis, Ablauf, Beispielseiten, FAQ).
/de/leistungen/google-unternehmensprofil (149 €, Ablauf, was inklusive ist).
/de/leistungen/seo-wartung (99 €/Monat, Leistungen, Bericht).
/de/preise oder Abschnitt 'Was kostet eine Website 2026' mit Rechenbeispielen.
/de/faq (14+ Fragen, FAQPage).
/de/ratgeber/* (5 Startartikel zu echten Suchfragen): 'Was kostet eine Website für Handwerker', 'Google-Unternehmensprofil einrichten', 'Muster-Website oder individuell', 'Checkliste Website erstellen lassen', 'Lokale SEO für Handwerker im Raum München'. Je Artikel: Antwort in den ersten 2 Sätzen, Zwischenüberschriften als Fragen, Autor Zaur Hatuev mit Link auf /ueber-mich, 'Zuletzt aktualisiert'-Datum, Artikel-JSON-LD.
/de/projekte/<fall> je Referenz (Serlo, MRG-Logistik, Mobilwerk, Zaira) im festen Schema Ausgangslage, Maßnahme, Ergebnis (mit Messzeitraum), Technik.
/de/ueber-mich: Person mit nachprüfbaren Daten (Startjahr, Standort, Sprachen, Tech-Stack, Links), E-E-A-T.
Breadcrumbs und interne Links zwischen diesen Seiten; keine Doorway-Seiten pro Stadtteil/Keyword ohne eigenen Inhalt.

### [MITTEL] Keine Antwort-Absätze: Hero, H1 und Überschriften nennen weder Wer, Was noch Wo
- **Beleg:** H1 der Startseite = 'Dein nächster Kunde sucht dich gerade online.' (components/WorkHero.tsx:93-102, lib/i18n/de.ts:11-13); Anbieter, Leistung und Ort stehen nur im Eyebrow-<div> 'Webentwickler · München' (WorkHero.tsx:81-91, de.ts:17), das ist keine Überschrift. Home-H2s sind Marketing-Claims ('Echte Projekte. Echte Ergebnisse.', 'Mein Werkzeugkasten', 'Was Kunden sagen.', app/[lang]/page.tsx:229,285) statt Frage/Antwort-Überschriften. Preise/Pakete stehen nur auf /leistungen, dort als <div>-Karten (LeistungenClient.tsx:180-208) statt als Tabelle. Case-Study-Texte (app/[lang]/projekte/zaira-beauty/page.tsx:35-60) sind auch auf /en deutsch.
- **Lösung:** Direkt unter dem Hero einen sichtbaren, serverseitigen 'Kurzprofil'-Absatz (50–70 Wörter) ergänzen, nach dem Muster: 'BrandWerkX ist der Webentwickler-Service von Zaur Hatuev (Sitz Geretsried, Einsatzgebiet Raum München). Ich baue Websites für Handwerker, Selbstständige und kleine Unternehmen mit Next.js: Muster-Website ab 490 € in 3–5 Werktagen, individuelle Website ab 990 € in 7–14 Tagen, SEO & Wartung ab 99 €/Monat. Antwort auf Anfragen innerhalb von 24 Stunden.' Jede H2 auf Home, Leistungen und Über-mich mit einem ersten Satz beantworten, der ohne Kontext zitierbar ist. Preise als echte <table> (Paket | Preis | Lieferzeit | Enthalten) ausgeben. H1 für /de/leistungen und Home um 'Webentwickler/Website erstellen lassen' ergänzen oder zusätzlich zur kreativen Zeile als H1-Untertitel führen.

### [MITTEL] KI-Crawler-Regeln in robots.txt fehlen; /muster/ ist blockiert, obwohl die Viewer-Seiten SEO-Metadaten tragen
- **Beleg:** public/robots.txt:1-7 enthält nur 'User-agent: *', 'Allow: /', 'Disallow: /muster/' und die Sitemap. Keine Gruppen für GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended; /api/ ist nicht ausgenommen. Alle diese Bots dürfen aktuell crawlen (nur implizit, gut für Sichtbarkeit, aber nicht dokumentiert/steuerbar). Die Viewer-Seiten app/muster/[kunde]/page.tsx:113-133 und app/muster/layout.tsx:5-12 setzen Title, Description, Canonical und einen sr-only-H1, werden aber durch 'Disallow: /muster/' nie gelesen; die eigentlichen Demos (public/muster/**/*.html) tragen bereits 'noindex, nofollow' (z. B. public/muster/klempner/final.html:11). Der Verweis 'Muster-Website ab 490 €' (Hauptangebot) ist damit für KI nicht belegbar.
- **Lösung:** robots.txt (oder app/robots.ts, dann public/robots.txt löschen) so aufbauen. Wichtig: Eine spezifische User-agent-Gruppe überschreibt '*' komplett, deshalb die Disallow-Zeilen in jeder Gruppe wiederholen:

# BrandWerkX robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /muster/*/*.html$

# KI-Suche und Assistenten (Quellenverweise, Nutzer-Anfragen)
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: Claude-SearchBot
User-agent: Claude-User
User-agent: PerplexityBot
User-agent: Perplexity-User
Allow: /
Disallow: /api/
Disallow: /muster/*/*.html$

# KI-Training / Wissensbasis (erlaubt, damit die Marke in Modellantworten vorkommt)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: CCBot
Allow: /
Disallow: /api/
Disallow: /muster/*/*.html$

Sitemap: https://brandwerkx.de/sitemap.xml

Erläuterung: Für einen Anbieter, der Aufträge über Sichtbarkeit gewinnen will, ist Erlauben der sinnvolle Default. Wer Training ausschließen will, setzt 'Disallow: /' nur bei GPTBot/ClaudeBot/CCBot/Google-Extended, die Such-/User-Bots bleiben offen. Google AI Overviews hängen an Googlebot, nicht an Google-Extended. Bei user-initiierten Abrufen (ChatGPT-User, Perplexity-User) geben Anbieter teils an, robots.txt nicht zwingend anzuwenden. Die Viewer-Seiten /muster/klempner usw. werden dadurch wieder crawlbar; sie sollten dann echte Texte statt nur iframe + sr-only-H1 bekommen oder bewusst 'noindex' erhalten (robots-Metadata in generateMetadata), sonst sind sie dünner Content.

### [MITTEL] llms.txt fehlt
- **Beleg:** Keine Datei public/llms.txt oder llms-full.txt (Verzeichnis public/ enthält nur images, music, muster, vibes, robots.txt, stars100.json). Kein Route-Handler dafür in app/. middleware.ts:23 ('pathname.includes(".")') lässt /llms.txt ohne Locale-Redirect durch, die Datei würde also direkt unter https://brandwerkx.de/llms.txt ausgeliefert. Die Domain-Root selbst (/) liefert nur 307 auf /de bzw. /en (middleware.ts:36-38, app/page.tsx:3-5), wodurch ein Crawler dort keinen Inhalt findet.
- **Lösung:** public/llms.txt anlegen (Preise/Zeiten erst nach Finding 1 final bestätigen; [TODO] ersetzen). Vorschlag:

# BrandWerkX

> BrandWerkX ist der Webentwickler-Service von Zaur Hatuev (freiberuflich, Sitz Geretsried, Einsatzgebiet Raum München [TODO bestätigen]). Websites für Handwerker, Selbstständige und kleine Unternehmen zum Festpreis: Muster-Website ab 490 € (3–5 Werktage), Custom Website ab 990 € (bis 5 Seiten, 7–14 Tage), SEO & Wartung ab 99 €/Monat. Technik: Next.js, React, TypeScript, TailwindCSS. Antwort auf Anfragen innerhalb von 24 Stunden (Mo–Fr 9–18 Uhr). [TODO netto/brutto]

Sprachen: Deutsch (Hauptsprache), Englisch. Kontakt: [TODO Domain-Mail], WhatsApp und Formular auf der Kontaktseite.

## Leistungen und Preise
- [Leistungen & Preise](https://brandwerkx.de/de/leistungen): Pakete, Zusatzleistungen (Google-Unternehmensprofil 149 € einmalig, Speed-Optimierung 199 € einmalig, Zusatzseiten ab 99 €, Wartung & Updates ab 49 €/Monat), Ablauf in 4 Schritten, FAQ
- [Website-Designs für Handwerker und Studios](https://brandwerkx.de/muster): Muster-Designs für Klempner, Elektriker, Kosmetikstudios
- [FAQ](https://brandwerkx.de/de/faq): Antworten zu Preis, Dauer, Hosting, Support [nach Anlage der Seite]

## Referenzen
- [Projekte](https://brandwerkx.de/de/projekte): ausgewählte Projekte
- [Case Study Zaira Beauty Face](https://brandwerkx.de/de/projekte/zaira-beauty): Website und Rebranding eines Kosmetikstudios; Kennzahlen mit Messzeitraum [nach Finding 10]

## Über
- [Über Zaur Hatuev](https://brandwerkx.de/de/ueber-mich): Hintergrund, Tech-Stack, Arbeitsweise
- [Kontakt](https://brandwerkx.de/de/kontakt): Projektanfrage

## English
- [Services and prices](https://brandwerkx.de/en/leistungen)
- [About](https://brandwerkx.de/en/ueber-mich)

## Optional
- [Impressum](https://brandwerkx.de/de/impressum)
- [Datenschutz](https://brandwerkx.de/de/datenschutz)

Zusätzlich optional /llms-full.txt mit den vollständigen FAQ-Texten und der Preistabelle als reinem Markdown. Fakten in llms.txt/llms-full.txt aus derselben Faktenquelle wie die Seiten speisen (Finding 1), sonst entsteht ein weiterer Widerspruch.

### [MITTEL] EN-Seiten sind nicht gleichwertig: <html lang="de"> überall, deutsche Hardcode-Strings, kein hreflang auf Unterseiten
- **Beleg:** app/layout.tsx:112 'lang="de"' fix für alle Locales, auch /en/*. LeistungenClient.tsx:26-118 (Paket-Features, Preise, Zusatzleistungen) und app/[lang]/projekte/zaira-beauty/page.tsx:35-60 (Prozess, Problem/Lösung) sind deutsch und unabhängig von lang. hreflang-Paare (alternates.languages) gibt es nur im Root-Layout (app/layout.tsx:66-72) und der Startseite (app/[lang]/page.tsx:26-29,39-42); alle anderen Seiten setzen nur 'canonical' (z. B. leistungen/page.tsx:17,27), kein languages und kein x-default. Seiten ohne eigene generateMetadata (app/[lang]/impressum, datenschutz, datenschutz/siraj hat eigene Metadaten ohne alternates) erben das Root-Canonical 'https://brandwerkx.de/de' (layout.tsx:67), also zeigt auch /en/impressum auf /de. app/sitemap.ts:22-27 liefert keine alternates.languages.
- **Lösung:** Locale-abhängiges lang-Attribut setzen (z. B. 'lang' per Root-Layout aus dem Segment ableiten oder das <html>-Element in app/[lang]/layout.tsx rendern). LeistungenClient-Features/Zusatzleistungen und Case-Study-Texte in lib/i18n/de.ts / en.ts verschieben. Auf allen Seiten alternates.languages (de, en, x-default) und ein eigenes Canonical pro Seite setzen; für Seiten ohne eigene Metadaten ein generateMetadata mit Canonical ergänzen. In app/sitemap.ts pro Eintrag 'alternates: { languages: { de, en } }' ausgeben.

### [MITTEL] Ergebnis-Claims ohne Beleg, Messzeitraum und Quelle; teils widersprüchlich
- **Beleg:** app/[lang]/projekte/zaira-beauty/page.tsx:68-73 und :245-249: '+40% Kundenanfragen', '+150% organische Besucher', 'Top 3' (ohne Suchbegriff/Datum), '0.8s' Ladezeit, daneben lib/i18n/de.ts:212 'Lighthouse Score 97 / 100' (Ladezeit und Score sind verschiedene Metriken ohne Messmethode). Startseite: 'Top-3 bei Google' als Stat (app/[lang]/page.tsx:90, de.ts:18) und Label 'TOP 3 · GOOGLE' (page.tsx:120) sowie Hero-Badge (WorkHero.tsx:27-28) pauschal für das Portfolio. app/[lang]/projekte/page.tsx:84 '100% Zufriedenheit'. de.ts:36 und :229 'Testimonial'-Texte ohne Datum; MRG-Zitat (de.ts:39-41) nur mit Firmenname, ohne Ansprechperson. Es gibt kein Review- oder AggregateRating-Markup, was korrekt ist, solange keine echten Bewertungen vorliegen.
- **Lösung:** Pro Kennzahl Messzeitraum, Quelle und Definition nennen, z. B. 'Anfragen über Kontaktformular/Telefon: Q1 2024 vs. Q1 2025, laut Auftraggeberin' und 'Google-Ranking Top 3 für "Kosmetikstudio [Stadtteil]", Stand 03/2025, Search Console'. Ladezeit und Lighthouse getrennt ausweisen (z. B. 'LCP 0,8 s, Lighthouse 97, gemessen am [Datum] mit PageSpeed Insights'). Pauschale Claims ('Top-3 bei Google', '100% Zufriedenheit') streichen oder einschränken, da KI-Systeme unbelegte Superlative eher abwerten und sie rechtlich (Werbeaussagen) angreifbar sind. Zitate mit Namen, Datum und Link zum Projekt/Google-Bewertung versehen; sobald im Google-Unternehmensprofil echte Bewertungen vorhanden sind, diese als Beleg verlinken.

### [MITTEL] Entitäts-Rauschen: Repo, OG-Bild und Nebenprojekte verwässern 'BrandWerkX = Webentwicklung'
- **Beleg:** package.json: name 'kosmetik-demo', description 'Demo Beauty-Studio Website', author 'Zaira Beauty', keywords beauty/makeup/lashes, license MIT; README.md 'Zaur's Portfolio' mit Platzhalter-Mail 'deine@email.de'; app/opengraph-image.tsx:30,41 zeigt 'Zaur's Portfolio / Webentwicklung & Projekte' statt Marke 'BrandWerkX' und exportiert zusätzlich eine JSX-Default-Komponente (Zeilen 52-59), deshalb ist unklar, welche Variante tatsächlich als OG-Bild ausgeliefert wird. Das Repo ist öffentlich unter github.com/ZaurHa/portfolio (git remote), und GitHub steht in sameAs (app/layout.tsx:165,204). Fremde Entitäten auf derselben Domain: /de/vibes, /de/vibes/agb, /de/vibes/datenschutz, /de/datenschutz/siraj (index:true, app/[lang]/datenschutz/siraj/page.tsx:6) und public/vibes/*.html; Mobilwerk wird als 'mein eigener Transport- & Umzugsbetrieb' beschrieben (app/[lang]/page.tsx:128, projekte/page.tsx:50). Das kann ein KI-System zu 'Webentwickler und Umzugsunternehmer und App-Publisher' vermischen.
- **Lösung:** package.json auf name 'brandwerkx', passende description/keywords/author 'Zaur Hatuev' setzen; README mit 2–3 Sätzen Entitäts-Statement (BrandWerkX, Zaur Hatuev, Leistung, Website). OG-Bild auf 'BrandWerkX – Websites für Handwerker und kleine Unternehmen' umstellen und die doppelte Export-Struktur in opengraph-image.tsx bereinigen. Nebenprodukte (Vibes, Siraj) entweder klar als 'Eigene Apps von Zaur Hatuev' beschreiben und vom Dienstleistungsangebot trennen oder auf 'noindex' setzen, falls sie nur Store-Pflichtseiten sind. Bei Mobilwerk im Projekttext klarstellen, dass es ein eigenes Nebenprojekt ist, nicht der Hauptdienst.

### [MITTEL] Sitemap und Frische-Signale: lastModified immer 'jetzt', fehlende URLs, keine Bing-Anbindung
- **Beleg:** app/sitemap.ts:26 'lastModified: new Date()' für alle 16 URLs bei jedem Build/Request, daher wertlose Frische-Signale (Google und Bing ignorieren das, wenn es nie stimmt). Nicht enthalten: /muster (indexierbar, Canonical gesetzt, app/muster/layout.tsx:5-12), /de/vibes. Keine alternates.languages (sitemap.ts:22-27). Nirgends Verifizierungs-Metatags (grep nach 'verification' im Repo ohne Treffer), d. h. Search Console/Bing Webmaster sind aus dem Code nicht erkennbar. ChatGPT-Suche und Microsoft Copilot greifen u. a. auf den Bing-Index zu.
- **Lösung:** lastModified pro Route mit echtem Änderungsdatum pflegen (feste ISO-Daten in der Route-Liste oder aus Git/Datei-mtime beim Build). /muster und die künftigen Seiten (/de/faq, /de/ratgeber/*, Case Studies) aufnehmen. hreflang-alternates in die Sitemap. In Next.js metadata.verification.google (Search Console) und other: { 'msvalidate.01': '…' } (Bing Webmaster Tools) setzen; Sitemap in beiden einreichen. Optional IndexNow (Bing/Yandex) beim Deploy pingen, damit Preis-/FAQ-Änderungen in Bing-basierten KI-Antworten schneller ankommen.

### [MITTEL] Verknüpfung mit Google-Unternehmensprofil und weiteren Entitäts-Quellen fehlt im Code
- **Beleg:** sameAs enthält nur GitHub und LinkedIn (app/layout.tsx:164-167,203-206); kein Maps-/Google-Profil, kein hasMap, kein telephone, keine Search-Console/Bing-Verifizierung im Code. Das Google-Unternehmensprofil (laut Vorhaben des Owners noch einzurichten) ist neben der Website die wichtigste Entitätsquelle für Gemini/Google-KI-Modus bei lokalen Anfragen; ChatGPT und Perplexity ziehen zusätzlich aus Bing, Branchenverzeichnissen und Bewertungsportalen.
- **Lösung:** Nach der Profilanlage: Profil-URL (g.page/…) in sameAs und hasMap eintragen, Name, Telefon, Kategorie (z. B. Webdesigner/Webentwickler), Einsatzgebiet und Öffnungszeiten (Mo–Fr 9–18, de.ts:182) exakt wie auf der Website und im Impressum führen (NAP-Konsistenz, Finding 2). Da die Wohnadresse im Impressum öffentlich ist, als Service-Area-Business mit Einsatzgebiet München/Umland und ohne öffentliche Straße im Profil anlegen, wenn die Geschäftsadresse nicht angezeigt werden soll. Gleiche Firmen-Beschreibung (1–2 Sätze) in Profil, LinkedIn, GitHub-README, ggf. Branchenverzeichnissen (Gelbe Seiten, 11880, Bing Places, Apple Business Connect) verwenden. Echte Kundenbewertungen im Google-Profil einholen und die Profil-URL von den Referenzseiten aus verlinken.

## Vertrauen, Recht & Konversion

Dimension Vertrauen, Recht und Konversion, analysiert im Code (Repo /home/user/portfolio). Die Live-Website konnte nicht abgerufen werden (Proxy 403), deshalb sind Aussagen zum Live-Verhalten aus dem Code abgeleitet und als solche markiert. Keine Rechtsberatung: Datenschutz, Impressum und AGB sollten vor dem Livegang einmal von einer IT-Recht-Kanzlei oder einem Generator mit Schutzbrief geprüft werden.

Kernbefund in einem Satz: Das Fundament für Aufträge (Rechtstexte, Preise, Standort, Belege) ist aktuell nicht belastbar, und genau diese Punkte würde eine Google-Business-Profil-Verifizierung und jede Abmahnung zuerst treffen.

Was bereits gut ist: Die Live-Seiten setzen keine Cookies und kein localStorage (components/ThemeProvider.tsx und next-themes sind nirgends eingebunden, PortfolioWithDefaultNeumorphism.tsx ebenfalls nicht). Die Schriften kommen per next/font selbst gehostet (app/layout.tsx:11-32). Die GlobeHero-Komponente mit jsDelivr-Abruf (components/GlobeHero.tsx:448) ist aktuell nicht eingebunden. Damit ist heute kein Cookie-Banner nötig. Die Search Console braucht ebenfalls keinen Banner: Verifizierung per DNS-TXT oder Meta-Tag, kein Script, keine Einwilligung.

Top-Prioritäten in dieser Reihenfolge: (1) Datenschutzerklärung neu schreiben, (2) AGB erreichbar machen und die unwirksamen Klauseln ersetzen, (3) Impressum aktualisieren und Firmenname, Steuerstatus und Standort klären, (4) Preise und Fristen vereinheitlichen, (5) Zahlen und Referenzen belegbar machen oder entschärfen, (6) Kontaktformular absichern und die Rückmeldung sichtbar machen, (7) Tracking-Konzept und Danke-Seite für Search Console und Analytics vorbereiten.

### [KRITISCH] Live-Datenschutzerklärung ist lückenhaft und teils falsch (Abmahn- und Bußgeldrisiko)
- **Beleg:** Ausgeliefert wird /home/user/portfolio/app/[lang]/datenschutz/page.tsx (22 Zeilen). Es fehlen: Empfänger und Auftragsverarbeiter (Resend, Hosting, Gmail als Postfach, siehe /home/user/portfolio/app/api/contact/route.ts:145-159), Drittlandübertragung USA, Rechtsgrundlagen (Art. 6 DSGVO), Speicherdauer, Widerspruchs- und Übertragbarkeitsrecht, Beschwerderecht bei der Aufsichtsbehörde (BayLDA), Hinweis auf die Bestätigungs-Mail, WhatsApp, LinkedIn, GitHub und App-Store-Links. Zeile 13 sagt, Logfile-Daten seien 'nicht bestimmten Personen zuordenbar', obwohl der Hoster IP-Adressen verarbeitet. Zeile 15 sagt, Daten würden 'nicht ohne Einwilligung weitergegeben', der Formularinhalt geht aber an Resend (USA). Zeile 7: 'Stand' ist {new Date()}, also das Build-Datum und kein Änderungsdatum. Die Seite ist auf /en/ nur Deutsch (lang wird nicht ausgewertet) und hat anders als das Impressum keinen Zurück-Link und keine legal-page-Gestaltung. Die ausführlichere Altversion /home/user/portfolio/app/datenschutz/page.tsx (mit Abschnitt 'Externe Dienste', Rechte, TLS) wird nie ausgeliefert, weil middleware.ts:30-39 /datenschutz auf /de/datenschutz umleitet.
- **Lösung:** Eine vollständige Erklärung in app/[lang]/datenschutz/page.tsx schreiben und die Altversion löschen. Pflichtabschnitte: Verantwortlicher; Hosting mit tatsächlichem Anbieter (laut CLAUDE.md Vercel; im Vercel-Dashboard prüfen) inklusive Logfiles mit IP, Zweck und Löschfrist; Kontaktformular und Bestätigungs-Mail mit Art. 6 Abs. 1 lit. b/f, Resend als Auftragsverarbeiter mit AVV und Standardvertragsklauseln oder EU-US Data Privacy Framework, Speicherdauer (z. B. 6 Monate nach Abschluss, bei Auftrag gesetzliche Fristen); E-Mail, WhatsApp und Social-Links (Datenfluss erst beim Klick); alle Betroffenenrechte plus Beschwerderecht bei BayLDA. 'Stand' als festes Datum eintragen. Englische Fassung unter /en/datenschutz anbieten. Die Erklärung später für Search Console und Analytics erweitern, denn der Satz 'keine Cookies, kein Tracking, keine Analyse-Tools' (Zeile 17) wird mit dem ersten Analytics-Einsatz falsch.

### [HOCH] AGB sind für Besucher nicht erreichbar (404) und nirgends verlinkt
- **Beleg:** Die AGB existieren nur als /home/user/portfolio/app/agb/page.tsx. Es gibt kein app/[lang]/agb. middleware.ts:30-39 leitet /agb auf /de/agb um, und das ergibt 404. Im sichtbaren Footer (/home/user/portfolio/components/LayoutClient.tsx:365-372) stehen nur Impressum und Datenschutz, obwohl dict.footer.agb in lib/i18n/de.ts:242 und en.ts existiert. Der einzige AGB-Link steckt in der toten Datei /home/user/portfolio/components/Footer.tsx:9 (nirgends importiert) und im toten /home/user/portfolio/app/impressum/page.tsx:45. app/sitemap.ts listet /agb ebenfalls nicht. Folge: Die AGB lassen sich beim Vertragsschluss nicht wirksam einbeziehen (§ 305 Abs. 2 BGB bzw. im B2B Hinweis und Zugänglichkeit).
- **Lösung:** app/[lang]/agb/page.tsx anlegen (Layout wie das Impressum, mit legal-page-Klassen), im Footer (LayoutClient.tsx:369-371) mit dict.footer.agb verlinken, in app/sitemap.ts aufnehmen und im Kontaktformular sowie in jedem Angebot verlinken. app/agb, app/impressum, app/datenschutz, app/kontakt, app/leistungen, app/ueber-mich und components/Footer.tsx löschen (tote Dubletten).

### [HOCH] AGB-Inhalt: Haftungsklausel unwirksam, Gerichtsstand unzulässig, zentrale Regelungen fehlen
- **Beleg:** /home/user/portfolio/app/agb/page.tsx:17-18: 'Der Anbieter haftet nur für grobe Fahrlässigkeit und Vorsatz' ist nach § 309 Nr. 7 und § 307 BGB unwirksam (Leben, Körper, Gesundheit und Kardinalpflichten lassen sich nicht ausschließen) und für Verbraucher abmahnfähig. Zeile 20: 'Gerichtsstand ist Geretsried' gilt nur gegenüber Kaufleuten (§ 38 ZPO). Der Abschnitt 'Urheberrecht' (Zeile 15-16) regelt Eigentumsvorbehalt und Nutzungsrechte unklar. Es fehlen: Stand-Datum, Leistungsbeschreibung (Muster-Website, Custom, SEO und Wartung aus lib/i18n/de.ts:96-121), Abnahme und Mängelrechte, Mitwirkungspflichten (Kunde liefert Texte und Bildrechte), Recht, den Kunden als Referenz zu nennen (die Seite nutzt Namen, Zitate und das MRG-Logo, public/images/mrg-logo.svg), Laufzeit und Kündigung der Monatspakete ('ab 99€/Monat', 'ab 49€/Monat' in LeistungenClient.tsx:68 und :116), Hosting und Domain (Auftragsverarbeitung bei Kundenseiten), Umgang mit KI-generierten Inhalten (de.ts:127 wirbt mit KI-gestützter Entwicklung), Preise netto oder brutto, Widerruf bei Verbrauchern.
- **Lösung:** AGB neu fassen: Haftung nach dem Muster 'unbeschränkt bei Vorsatz, grober Fahrlässigkeit, Verletzung von Leben, Körper, Gesundheit, Kardinalpflichten (dann vorhersehbarer Schaden)'. Gerichtsstand nur 'soweit gesetzlich zulässig, für Kaufleute'. Zusätzliche Klauseln: Angebot richtet sich nur an Unternehmer (§ 14 BGB), das schließt die Widerrufsbelehrung für Verbraucher aus (Verbraucherkunden brauchen sonst eine Belehrung nach Art. 246a EGBGB), Referenzrecht, Abnahme, Wartungsvertrag mit Kündigungsfrist, Hosting und AVV-Verweis, KI-Hinweis. Verbraucherschlichtung (VSBG) ist bei weniger als 10 Mitarbeitern nicht verpflichtend, der OS-Plattform-Link entfällt seit Juli 2025.

### [HOCH] Impressum: veraltete Rechtsnormen, kein Firmenname BrandWerkX, keine Steuerangabe, Telefon fehlt
- **Beleg:** /home/user/portfolio/app/[lang]/impressum/page.tsx:25 und :38 nennen nur 'Zaur Hatuev'. Die Marke BrandWerkX kommt nirgends im Impressum vor, steht aber überall sonst (Logo, Footer, E-Mails, Domain). Die Texte stammen aus /home/user/portfolio/lib/i18n/de.ts:192 und :195 ('§ 5 TMG', '§ 55 Abs. 2 RStV') und en.ts:194 und :197. Das TMG wurde im Mai 2024 durch das DDG ersetzt (§ 5 DDG), der RStV durch den MStV (§ 18 Abs. 2 MStV). Es gibt weder eine USt-IdNr oder Wirtschafts-IdNr (falls vorhanden) noch einen Hinweis zur Kleinunternehmerregelung. Als Kontakt steht nur E-Mail. WhatsApp +49 172 8471641 ist im Footer, aber nicht im Impressum (LayoutClient.tsx:277). Der Haftungsausschluss (Zeile 43) deckt nur externe Links ab. Das EN-Impressum zitiert ebenfalls TMG und RStV.
- **Lösung:** Untertitel auf '§ 5 DDG' und 'Verantwortlich nach § 18 Abs. 2 MStV' ändern (de.ts:192, :195, en.ts:194, :197). 'Zaur Hatuev, Inhaber BrandWerkX (Einzelunternehmen)' bzw. die tatsächliche Form ergänzen. Falls vorhanden USt-IdNr oder W-IdNr angeben. Telefonnummer ergänzen (derselbe Wert wie bei WhatsApp), mindestens aber das Kontaktformular als zweiten schnellen Kanal im Impressum benennen. Die gleiche Absenderangabe in der Bestätigungs-Mail verwenden (route.ts:57-85).

### [HOCH] Kein Steuer- und Preishinweis (netto, brutto, § 19 UStG, B2B oder B2C)
- **Beleg:** Die Preise 'ab 490€', 'ab 990€', 'ab 99€/Monat', '149€', '199€' stehen in /home/user/portfolio/app/[lang]/leistungen/LeistungenClient.tsx:29,49,68,92,100,108,116 sowie in lib/i18n/de.ts:14,79 und app/layout.tsx:176-190, ohne Hinweis zur Umsatzsteuer. Eine Suche nach Kleinunternehmer, USt, brutto, netto, zzgl, inkl und § 19 findet im gesamten Quellcode keinen Treffer. Die Zielgruppe ist gemischt (Handwerker, Kosmetikstudios, Selbstständige, de.ts:127). Gegenüber Verbrauchern sind Endpreise nach PAngV Pflicht.
- **Lösung:** Steuerstatus klären. Als Kleinunternehmer unter jeden Preis und in die Schema-Offers 'Kein Umsatzsteuerausweis gemäß § 19 UStG'. Sonst 'zzgl. USt.' (B2B) oder 'inkl. USt.' ausweisen und USt-IdNr im Impressum nennen. Zusätzlich 'Angebot richtet sich an Unternehmer und Selbstständige' auf der Leistungsseite und in den AGB ergänzen.

### [HOCH] Standort-Angabe 'München' passt nicht zur Impressum-Adresse Geretsried (Abmahnrisiko und Problem für Google Business Profile)
- **Beleg:** Impressum-Anschrift: Steiner Ring 64, 82538 Geretsried (/home/user/portfolio/app/[lang]/impressum/page.tsx:25), dieselbe Adresse in den App-Pages. Dagegen überall 'München': Titel und Meta in app/layout.tsx:37 und :40, alle Seiten-Metadaten (z. B. app/[lang]/kontakt/page.tsx:9), Hero-Eyebrow 'Webentwickler · München' (de.ts:16), About-Rolle 'aus München' (de.ts:126), Footer 'München, Deutschland' (LayoutClient.tsx:325), Schema-Name 'BrandWerkX – Webentwicklung München' (app/layout.tsx:141) mit address nur addressLocality 'München' (Zeile 146-150, ohne Straße, PLZ, Telefon). Geretsried liegt rund 30 km südlich von München. Eine nicht vorhandene Niederlassung ist als Irreführung über den Standort (§ 5 UWG) abmahnbar. Außerdem lehnt Google Business Profile Einträge ab, bei denen Name und Adresse nicht zur Website (NAP) passen oder der Name mit Stadt und Keywords aufgebläht ist.
- **Lösung:** Entscheiden: Wenn der Betrieb in Geretsried sitzt, als Service-Area-Business führen ('Webentwicklung für München und Umgebung', Adresse im Profil ausblenden) und auf der Seite 'Raum München' sowie 'Geretsried bei München' formulieren statt 'aus München'. Schema auf Namen 'BrandWerkX', vollständige PostalAddress (82538 Geretsried), telephone und areaServed [Geretsried, München, Landkreis] umstellen. Name, Adresse und Telefon in Impressum, Kontaktseite, Schema und Google-Profil identisch halten.

### [HOCH] Preise und Fristen widersprechen sich über die ganze Seite (irreführende Werbung, SERP-Snippet weicht von der Seite ab)
- **Beleg:** Einstiegspreis: 490€ (de.ts:14,79; app/layout.tsx:176; app/muster/layout.tsx:9), aber 790€ in /home/user/portfolio/app/[lang]/leistungen/page.tsx:10-11 (Titel 'Pakete ab 790€'), app/[lang]/kontakt/page.tsx:10, im Budget-Dropdown (KontaktClient.tsx:108, de.ts:170) und 990€ für Custom. Das Leistungs-Snippet in Google sagt also 790€, die Seite 490€. Fristen: 'Live in 5 Tagen' (Hero, CTA, de.ts:14,29,92), 'Fertig in 5–10 Tagen' (de.ts:80), 'Muster 3–5 Werktage' (LeistungenClient.tsx:38, de.ts:107), 'Custom 7–14 Tage' (LeistungenClient.tsx:57). 'Kein Abo' (de.ts:78) neben Monatspaketen 'ab 99€/Monat' und 'ab 49€/Monat'. '0 versteckte Kosten' (de.ts:20, Home-Stat) neben 'danach ca. 10–15€/Monat' Hosting (de.ts:113). Wartung doppelt: 'SEO & Wartung ab 99€' (LeistungenClient.tsx:68) und 'Wartung & Updates ab 49€' (:116). Designanzahl: Home-Karte '5 Designs' (app/[lang]/page.tsx:160,169), Muster-Index und Showcase 6 (app/muster/page.tsx:11, app/muster/[kunde]/page.tsx:15-55). Hosting: Starter 'Hosting im ersten Jahr' (LeistungenClient.tsx:40), Custom 'Hosting + Domain', FAQ 'Hosting und Domain' (de.ts:112-113).
- **Lösung:** Eine Preistabelle als Single Source of Truth (z. B. lib/pricing.ts) anlegen und daraus Leistungsseite, Meta, Schema, Budget-Dropdown und Home-Stats erzeugen. Hero auf 'in 5 Tagen' nur für das Muster-Paket, Custom mit 7–14 Tagen. 'Kein Abo' ersetzen (z. B. 'Einmalpreis, Betreuung optional monatlich kündbar'). '0 versteckte Kosten' durch 'Folgekosten transparent: Hosting ca. 10–15€/Monat ab Jahr 2' auf den Preiskarten ersetzen. Das Budget-Dropdown um 'unter 790 €' bzw. 490–790 € ergänzen. Anzahl Designs vereinheitlichen.

### [HOCH] Erfolgszahlen und Referenzen sind nicht belegt und teils widersprüchlich
- **Beleg:** Zaira-Fallstudie: '+40% Kundenanfragen in 90 Tagen', '+150%' organische Besucher, 'Top 3', '0.8s', Lighthouse 97 (/home/user/portfolio/app/[lang]/projekte/zaira-beauty/page.tsx:68-73, :246-249; lib/i18n/de.ts:64-67, :205-212). Weder eine Quelle (Search-Console- oder Analytics-Screenshot, Zeitraum, Ausgangswert) noch ein Link auf die Live-Seite sind vorhanden. In dict.projects steht 'Seite-1-Ranking' (de.ts:67), in der Fallstudie und im Hero-Badge 'Top 3' (page.tsx:120, WorkHero.tsx:27); für welches Keyword, ist nicht genannt. Home-Stat 'Top-3 bei Google' mit Zähler 3 (de.ts:18, page.tsx:90) liest sich als drei Top-3-Platzierungen. '100% Zufriedenheit' auf /projekte (app/[lang]/projekte/page.tsx:84). 'Dabei seit 2024–' (projekte/page.tsx:83) widerspricht '8+ Jahre Erfahrung' (app/[lang]/ueber-mich/page.tsx:12,15). package.json:4 beschreibt das Projekt als 'Demo Beauty-Studio Website - Beispielprojekt'. 'Lighthouse 100' (page.tsx:77) steht gegen 'über 95' (de.ts:145) und '97' (de.ts:212). Zwei weitere Referenzen sind eigene Betriebe oder Produkte (Mobilwerk 'mein eigener Transportbetrieb', Serlo 'mein eigenes Produkt'), die unter 'Referenzen' und 'Echte Projekte. Echte Ergebnisse.' (de.ts:22-23) mitgezählt werden. Wer das nicht nachweisen kann, trägt im Streitfall die Beweislast (§ 5 UWG).
- **Lösung:** Nur Zahlen veröffentlichen, die Zaur mit Screenshots belegen kann (aufbewahren), mit Zeitraum und Quelle ('laut Google Search Console, Jan–Mrz 2025, Keyword X'). Wenn nicht belegbar: qualitative Aussagen. Link zur Live-Seite von Zaira Beauty einfügen und schriftliche Freigabe für Name, Zitat und Logo (MRG, Zaira) einholen und archivieren. 'Top-3', 'Seite 1' und die Stats vereinheitlichen und den Counter '3' entfernen. '100% Zufriedenheit' streichen. Erfahrung ('2024–' oder '8+ Jahre') und Lighthouse-Wert angleichen. Eigene Produkte klar als 'Eigenprojekte' von Kundenreferenzen trennen.

### [HOCH] Kontaktformular sammelt Daten ohne Datenschutzhinweis, ohne Honeypot, mit unverknüpften Labels
- **Beleg:** /home/user/portfolio/app/[lang]/kontakt/KontaktClient.tsx:74-130: kein Link auf die Datenschutzerklärung, kein Hinweis zur Verarbeitung durch Resend, keine Einwilligung oder Bestätigung der Kenntnisnahme (Art. 13 DSGVO verlangt die Information zum Zeitpunkt der Erhebung). Es gibt kein Honeypot-Feld und kein CAPTCHA. Alle <label> (Zeilen 77, 81, 87, 93, 105, 118) haben weder htmlFor noch ids an den Feldern, es fehlen autoComplete-Attribute (name, email, organization).
- **Lösung:** Unter dem Absende-Button: 'Mit dem Absenden stimmst du der Verarbeitung deiner Angaben zur Bearbeitung der Anfrage zu, siehe Datenschutzerklärung' mit Link auf /{lang}/datenschutz (Hinweis reicht nach Art. 6 Abs. 1 lit. b, eine Checkbox ist nur bei Newsletter oder Werbung nötig). Verstecktes Honeypot-Feld und Zeitprüfung (Absendezeit unter 3 Sekunden ablehnen) ergänzen. Labels mit id und htmlFor, autoComplete setzen.

### [HOCH] Kontaktformular: Erfolgs- und Fehlermeldung außerhalb des Sichtbereichs, API-Fehlertext wird verworfen, mögliche Doppel-Anfragen
- **Beleg:** KontaktClient.tsx:57-72: Die Status-Box steht über dem Formular, der Button ganz unten (Zeile 122). Nach dem Absenden wird das Formular geleert (Zeile 25), die Meldung erscheint aber oben, auf dem Handy außerhalb des Sichtbereichs, und es gibt kein Scrollen und kein aria-live. Die API-Fehlermeldung (Zeile 27) wird nur geloggt, der Nutzer sieht immer dasselbe errorMsg (de.ts:178), auch bei 429 'Zu viele Anfragen' (app/api/contact/route.ts:117-121) oder Validierungsfehlern (:135-142). In route.ts:145-159 wird erst die Admin-Mail gesendet, dann die Bestätigungsmail; scheitert die zweite (z. B. ungültige Adresse), gibt der Catch 500 zurück (:169-176): Der Lead kam an, der Nutzer sieht aber 'Senden fehlgeschlagen' und schickt erneut. Es gibt keine Danke-Seite oder URL, die man später als Conversion messen könnte.
- **Lösung:** Nach dem Absenden zur Status-Box scrollen (scrollIntoView, role='status' und aria-live) oder besser per router.push auf /{lang}/kontakt/danke (noindex) weiterleiten, die auch als Conversion-Ziel für Search Console und spätere Analytics dient. result.error im UI anzeigen. In route.ts die Bestätigungsmail in ein eigenes try/catch legen, damit der Lead nicht als Fehler gemeldet wird. Mit setSubmitStatus('idle') beim Erneut-Absenden die alte Meldung zurücksetzen.

### [HOCH] /api/contact: unmaskiertes HTML in beiden Mails, Bestätigungsmail an beliebige Empfänger, schwaches In-Memory-Rate-Limit
- **Beleg:** /home/user/portfolio/app/api/contact/route.ts:33-42 und :64-72 setzen name, email, company, project, budget, message ungeprüft in HTML (sanitize() in :90-92 trimmt nur und kürzt auf 2000 Zeichen). Die Bestätigungsmail (:154-159) geht an jede eingegebene Adresse, mit frei wählbarem Text und Absender 'Zaur Hatuev <zaur@brandwerkx.de>', ohne CAPTCHA oder Double-Opt-in. Das Rate-Limit (:94-109) lebt in einer Map pro Serverless-Instanz (ineffektiv auf Vercel), und die IP kommt aus x-forwarded-for (:113). Folge: Phishing und Spam über die Absender-Domain brandwerkx.de, HTML-Injection in die eigene Admin-Mail, Resend-Sperre oder verschlechterte Zustellbarkeit der Antworten an Leads. Zeile 123: new Resend(process.env.RESEND_API_KEY) steht außerhalb des try-Blocks. EMAIL_SETUP.md behauptet 'Rate Limiting durch Resend', das stimmt nicht.
- **Lösung:** Alle Felder HTML-escapen (kleine escapeHtml-Funktion) und Zeilenumbrüche in Betreff und Namen entfernen. Bestätigungsmail nur nach Honeypot und Zeitprüfung oder Turnstile (Cloudflare, ohne Cookie-Banner nutzbar) und ohne den freien Nachrichtentext zurückspiegeln. Rate-Limit mit Upstash oder Vercel KV. Resend-Konstruktor in den Try-Block, EMAIL_SETUP.md korrigieren.

### [HOCH] Externe Ressourcen in den Muster-Demos widersprechen der Datenschutzerklärung (IP-Weitergabe an Drittanbieter)
- **Beleg:** Alle Demos laden Schriften von fonts.bunny.net (z. B. /home/user/portfolio/public/muster/klempner/final.html:27-28, public/muster/elektriker/v1.html:9-10) und Bilder direkt von images.pexels.com (final.html:469, :585; klempner/v1.html:276, :351; v2.html:178, :283). Sie werden per iframe in /muster/[kunde] eingebunden (components/MusterShowcase.tsx:29, :74-92). Die Altversion der Datenschutzerklärung behauptet 'keine externen Schriftarten, keine Drittanbieter-Widgets' (/home/user/portfolio/app/datenschutz/page.tsx:31), die Live-Version erwähnt diese Abrufe gar nicht. Das IP-Übermittlungsproblem ist durch das LG-München-I-Urteil zu Google Fonts (3 O 17493/20) bekannt und wird abgemahnt.
- **Lösung:** Schriften und Bilder in public/muster/** selbst hosten (woff2 und webp lokal, Bilder via next/image) oder auf Systemschriften wechseln. Bis dahin den Abschnitt 'Externe Inhalte (Demo-Seiten)' mit bunny.net und Pexels in die Datenschutzerklärung aufnehmen. Die dormant GlobeHero-Komponente (components/GlobeHero.tsx:448, jsDelivr-Abruf) löschen, damit sie nicht versehentlich wieder eingebaut wird.

### [MITTEL] Konversionspfad Leistungen und Designs: CTA-Labels passen nicht zum Ziel, ?package wird ignoriert, Designs-Funnel nur per mailto
- **Beleg:** CTA 'Design auswählen' führt auf Home (/home/user/portfolio/app/[lang]/page.tsx:354) und Leistungen (LeistungenClient.tsx:279) auf /kontakt statt auf /muster. Die Paket-Buttons hängen ?package=custom%20website bzw. 'seo & wartung' an (LeistungenClient.tsx:200), das Formular liest searchParams nicht (KontaktClient.tsx), das Projekt-Dropdown bleibt leer und der Parameter erscheint in keiner Mail. Der Starter-Button nutzt '/muster' ohne Sprachpräfix (Zeile 44), englische Nutzer verlieren die Sprache. Der Designs-Funnel (/muster, /muster/[kunde]) endet in mailto:-Links (components/MusterShowcase.tsx:430, :694), also ohne Formular, ohne Rate-Limit, ohne Messbarkeit, mit Text 'Deine Auswahl wurde gespeichert' (Zeile 691), obwohl nichts gespeichert wird. Das Budget-Dropdown beginnt bei 790€, obwohl der Einstieg 490€ kostet (de.ts:170).
- **Lösung:** 'Design auswählen' auf /muster verlinken oder umbenennen in 'Erstgespräch anfragen'. ?package und ?design in KontaktClient auslesen (useSearchParams), das Projekt-Dropdown vorbelegen und das Feld in die Mail aufnehmen. Alle mailto-CTAs im Showcase durch Link auf /{lang}/kontakt?design=klempner-v3 ersetzen. Den Satz 'Deine Auswahl wurde gespeichert' streichen oder wahr machen. Budgetstufe '490–790 €' ergänzen.

### [MITTEL] Cookie- und Tracking-Konzept: heute keine Banner-Pflicht, aber nichts für Search Console, Analytics und Konversionsmessung vorbereitet
- **Beleg:** Live-Pfade setzen weder Cookies noch localStorage (components/ThemeProvider.tsx, next-themes aus package.json:24 und components/PortfolioWithDefaultNeumorphism.tsx:47-55 sind nirgends eingebunden). Schriften self-hosted (app/layout.tsx:11-32). Nicht vorbereitet: kein metadata.verification.google in app/layout.tsx:34-107, keine Danke-Seite, in der Datenschutzerklärung nur der Satz 'Diese Website verwendet keine Cookies, kein Tracking und keine Analyse-Tools' (app/[lang]/datenschutz/page.tsx:17). Das sind rund 20 ungenutzte Abhängigkeiten (three, chart.js, jspdf, html2canvas u. a.), die unbemerkt Tracking oder Speicher nachziehen könnten.
- **Lösung:** Search Console: Domain-Property per DNS-TXT-Eintrag verifizieren (kein Code, kein Banner, kein Datenschutz-Text nötig). Alternativ metadata.verification.google in app/layout.tsx eintragen. Für Analytics ein cookieloses, EU-gehostetes Tool (Plausible, Umami oder Matomo ohne Cookies) mit AVV und Datenschutz-Abschnitt nehmen; GA4 würde einen Consent-Banner nach § 25 TDDDG erfordern und Conversions kosten. Danke-Seite als messbares Ziel bauen. Ungenutzte Komponenten (ThemeProvider.tsx, Neumorphism*.tsx, GlobeHero.tsx, RealStarfield.tsx) und Abhängigkeiten löschen, damit kein versehentlicher Speicherzugriff entsteht.

### [MITTEL] Kein Impressum- und Datenschutz-Link auf /muster, /muster/[kunde] und den Demo-Seiten
- **Beleg:** /home/user/portfolio/app/muster/page.tsx (Footer Zeile 235-242) und /home/user/portfolio/components/MusterShowcase.tsx (Links nur zu /muster und /de, Zeilen 129-152, 500-544) enthalten keinen Impressum- oder Datenschutz-Link. /muster liegt außerhalb von app/[lang]/layout.tsx und damit ohne LayoutClient-Footer (middleware.ts:23-24). Die Seiten zeigen aber Preise ('ab 490€') und Bestell-CTAs, sind also kommerzielle Angebotsseiten. Die Hauptnavigation hebt 'Designs' prominent hervor (LayoutClient.tsx:43). Die Demo-HTMLs haben Impressum und Datenschutz nur als href='#'.
- **Lösung:** In app/muster/page.tsx und MusterShowcase.tsx einen Footer mit Links auf /de/impressum und /de/datenschutz ergänzen (oder /muster unter app/[lang] verschieben). In den Demo-HTMLs ein gut sichtbares Banner 'Beispiel-Inhalt, kein echter Betrieb' setzen.

### [MITTEL] Template-Demos enthalten erfundene Bewertungen und Zertifikate, die Kunden unverändert übernehmen könnten
- **Beleg:** /home/user/portfolio/public/muster/klempner/final.html:464 ('4,9 / 5 aus 214 Google-Bewertungen'), :630-650 (Review-Blöcke mit Badge 'Google · verifiziert', itemtype schema.org/Review), :600 ('Zertifiziert durch die Berliner Handwerkskammer', 'Meisterbetrieb seit 2009'), :368-379 (Schema 'Mustermann Klempner GmbH' mit Adresse und Telefon in Berlin). public/muster/elektriker/v3.html:181-182 ('4,9★ 180+ Google-Bewertungen'). public/muster/kosmetik/v3.html:173 ('220+ Bewertungen'). Das Klempner-Muster ist komplett für Berlin gebaut (Title 'Klempner Berlin', final.html:8), während app/muster/page.tsx:10 es als 'SEO-optimiert für München' bewirbt. Fake-Bewertungen sind nach Anhang zu § 3 UWG Nr. 23b irreführend, wenn ein Kunde sie live stellt.
- **Lösung:** In den Templates Bewertungs-Blöcke, Review-Schema, Zertifikate und Zahlen durch klar erkennbare Platzhalter ersetzen ('[Eigene Google-Bewertungen einfügen]'). In den Übergabe-Prozess und die AGB eine Klausel aufnehmen, dass der Kunde Inhalte auf Richtigkeit prüft. Klempner-Muster auf München umstellen oder die Beschreibung ändern.

### [MITTEL] Tote Legacy-Routen und doppelte Rechtstexte (app/* gegen app/[lang]/*, public/vibes gegen app/[lang]/vibes)
- **Beleg:** Wegen middleware.ts:30-39 sind app/page.tsx, app/impressum, app/datenschutz, app/datenschutz/siraj, app/agb, app/kontakt, app/leistungen und app/ueber-mich nie erreichbar; nur app/muster/** läuft (middleware.ts:23-24). app/datenschutz/siraj/page.tsx ist identisch mit app/[lang]/datenschutz/siraj/page.tsx. Die Legacy-Datenschutz hat mehr Inhalt als die Live-Version, die Legacy-Impressum enthält den AGB-Link, den die Live-Version nicht hat. public/vibes/{index,privacy,terms}.html (statisch, ohne Impressum-Link) sind Dubletten von app/[lang]/vibes/** mit abweichendem Text (privacy.html:160 nennt LiveKit, die Next-Version app/[lang]/vibes/datenschutz/page.tsx:104-110 nicht). Zusätzlich wird die Mail zaurhatu@gmail.com für die App-Seiten verwendet, brandwerkx@gmail.com für die Agentur.
- **Lösung:** Alle toten Dateien löschen. Eine einzige Quelle pro Rechtstext behalten, die statischen Vibes-HTMLs entfernen oder per Redirect auf die Next-Version legen, und LiveKit im Text ergänzen. Eine Kontaktadresse (brandwerkx@gmail.com oder besser info@brandwerkx.de) für alles verwenden. Die App-Datenschutzseiten mit noindex versehen, wenn sie nicht ranken sollen (Siraj hat explizit index:true, app/[lang]/datenschutz/siraj/page.tsx:6).

### [MITTEL] Vertrauenselemente sind dünn und schwer überprüfbar
- **Beleg:** Nur zwei Kundenstimmen (/home/user/portfolio/lib/i18n/de.ts:36-41) ohne Foto, ohne Link, mit festen '★★★★★' (app/[lang]/page.tsx:327) ohne Bewertungsquelle. Das Zitat in der Fallstudie hat einen Platzhalter-Avatar 'Z' (zaira-beauty/page.tsx:286). Externe Projektlinks öffnen im selben Tab (app/[lang]/page.tsx:237, projekte/page.tsx:112) und tragen bei Mobilwerk und MRG das Label 'Case Study lesen' (projekte/page.tsx:144), obwohl sie auf externe Seiten führen. Mobilwerk wird als Referenz mit mobilwerk.vercel.app gezeigt (Subdomain statt eigener Domain). /projekte zeigt 3 Projekte und Stat '3' (projekte/page.tsx:82), die Startseite 5; Serlo fehlt auf /projekte. Es gibt keine Telefonnummer auf der Seite (nur WhatsApp-Button), keinen Terminlink für das 'kostenlose 30-Minuten-Erstgespräch' (de.ts:53) und keine Datenschutz- und Preisgarantie-Hinweise nahe dem CTA.
- **Lösung:** Nach der Einrichtung des Google-Profils einen Link 'Auf Google bewerten' und die Rezensionen verlinken (nicht als AggregateRating in das eigene Schema kopieren, Self-Serving-Reviews sind ausgeschlossen). Testimonials mit Foto oder Logo, Ort und Branche, Link zur Kundenseite und Freigabevermerk. Externe Links mit target='_blank' rel='noopener' und Label 'Website ansehen'. Projektliste vereinheitlichen. Telefonnummer plus Terminbuchung (Cal.com) in die Kontaktseite und den Hero aufnehmen. Wo möglich eigene Domain für die Mobilwerk-Referenz.

### [MITTEL] Kontaktkanäle: WhatsApp und Mail ohne Telefon-Link, Texte nicht lokalisiert, Nummer nicht in Rechtstexten
- **Beleg:** /home/user/portfolio/components/LayoutClient.tsx:276-308: WhatsApp-Button mit fest deutschem aria-label und vorbefülltem deutschem Text auch auf /en. Es gibt nirgends einen tel:-Link. Die Nummer +49 172 8471641 steht nur im Quelltext (Zeilen 277, 350), nicht im Impressum oder der Datenschutzerklärung. Kontaktseite: Öffnungszeiten 'Mo–Fr 9–18' (de.ts:182) und 'Antwort in 24h' (Hero, Meta) ohne Telefon oder Adresse. Für Google Business Profile werden Telefon und Öffnungszeiten als Pflicht-Angaben benötigt und müssen mit der Website übereinstimmen.
- **Lösung:** tel:-Link und Telefonnummer auf der Kontaktseite und im Impressum ergänzen, aria-label und Vorlagentext je Sprache. WhatsApp in der Datenschutzerklärung erwähnen. Öffnungszeiten und Telefon in das Schema (LocalBusiness) übernehmen und mit dem Google-Profil abgleichen.

### [MITTEL] Social-Preview und Favicons vermutlich defekt, Bild-Text nicht markenkonform
- **Beleg:** app/layout.tsx:82-84 und :94 verweisen auf https://brandwerkx.de/opengraph-image. middleware.ts:18-28 nimmt Pfade ohne Punkt nicht aus, daher leitet es /opengraph-image auf /de/opengraph-image um, das nicht existiert (Live-Test wegen Proxy nicht möglich, bitte mit curl -I prüfen). /home/user/portfolio/app/opengraph-image.tsx hat zusätzlich einen Default-Export mit Platzhalter-JSX (Zeilen 52-58) neben GET und zeigt 'Zaur's Portfolio' in #06b6d4 statt BrandWerkX. app/layout.tsx:119 verweist auf /apple-touch-icon.png, die Datei existiert nicht (nur app/favicon.ico). Links, die Zaur per WhatsApp oder LinkedIn teilt, zeigen dann kein oder ein falsches Vorschaubild.
- **Lösung:** /opengraph-image in die Ausnahmen der Middleware aufnehmen oder das Bild als statische Datei in /public/og.png (1200x630) ablegen und eintragen. Dem Bild Marke, Claim und Region geben. apple-touch-icon.png ergänzen.

### [MITTEL] Hosting und Domain für Kunden: AVV und Zuständigkeit ungeklärt
- **Beleg:** Leistungen versprechen 'Hosting im ersten Jahr inklusive' und 'Hosting + Domain' (/home/user/portfolio/app/[lang]/leistungen/LeistungenClient.tsx:40, :59), FAQ 'Danach ca. 10–15€/Monat je nach Anbieter' (de.ts:113). Es ist nirgends erklärt, bei welchem Anbieter und auf wessen Vertrag gehostet wird; der Kunde ist möglicherweise nur Endnutzer, Zaur dann Auftragsverarbeiter (Art. 28 DSGVO). Weder AGB noch Datenschutz regeln das.
- **Lösung:** Entscheiden und festhalten: Hosting und Domain auf den Kunden registrieren (empfohlen, dann entfällt AVV-Last) oder AVV-Vorlage im Angebotsprozess und AGB-Passus. Im FAQ benennen, ab wann und wie das Hosting übergeben wird.

### [NIEDRIG] Englische Version: Mischsprache, falsches lang-Attribut, Datenschutz nur Deutsch
- **Beleg:** /home/user/portfolio/app/layout.tsx:112 setzt <html lang='de'> für alle Seiten, auch /en. LeistungenClient.tsx:26-118 (Features, Add-ons, Preise) und zaira-beauty/page.tsx:35-60 (Prozess, Tech, Problem, Lösung) sind fest deutsch. Navigationspunkt 'Designs' (LayoutClient.tsx:43, :335) ist nicht übersetzt. /en/datenschutz ist reiner deutscher Text (app/[lang]/datenschutz/page.tsx). en.ts:194 zitiert deutsches Recht ('§ 5 TMG (German law)').
- **Lösung:** lang-Attribut pro Locale setzen (z. B. [lang]/layout.tsx mit html-Tag oder generateMetadata plus Script), Texte in die Dictionaries verschieben. Wenn EN nicht gepflegt wird, /en bis zur Fertigstellung auf noindex setzen oder den Wechsel entfernen.

### [NIEDRIG] Textfehler und Tonwechsel (Du gegen Sie)
- **Beleg:** lib/i18n/de.ts:139 'vom ersten Pixelbis zur fertigen Seite' (Tippfehler, 'Pixel bis'). Stats-Zeile 'Top-3 bei Google' mit Zähler 3 (de.ts:18). app/[lang]/page.tsx:166 hat den Ternary locale === 'de' ? 'LIVE DEMO' : 'LIVE DEMO'. Tonwechsel: Website durchgehend Du, aber app/muster/page.tsx:89 ('Wählen Sie'), app/api/contact/route.ts:164 und :173 ('Sie erhalten', 'versuchen Sie'), Datenschutz und AGB neutral. Kontakt-Meta behauptet 'Antwort innerhalb 24 Stunden' (kontakt/page.tsx:10), die Seite sagt teils 'meist am selben Tag' (de.ts:181). Not-Found-Seite (app/not-found.tsx) liegt außerhalb des Layouts: ohne Navigation und Footer, in einem Türkis (#0d9488), das nicht zur Marke (#00ffe7) passt.
- **Lösung:** Tippfehler beheben, Ternary bereinigen, Tonalität einheitlich auf Du (oder Sie für Rechtstexte bewusst abgrenzen). Antwortzeit überall gleich formulieren. 404-Seite in das Layout ziehen (app/[lang]/not-found.tsx) mit Link auf Leistungen und Kontakt.

### [NIEDRIG] Repository-Metadaten wirken wie ein Demo-Projekt (relevant, weil GitHub überall verlinkt ist)
- **Beleg:** /home/user/portfolio/package.json:2-4 und :40-43: name 'kosmetik-demo', description 'Demo Beauty-Studio Website - Beispielprojekt', author 'Zaira Beauty', Keywords beauty, makeup, lashes. README.md ist 'Zaur's Portfolio'. LÖSCH-EMPFEHLUNG.md, generalization-plan.md und portfolio-plan.md liegen im Root. Die Kontaktseite, About-Seite und die Mails verlinken github.com/ZaurHa (KontaktClient.tsx:148, route.ts:8). Falls das Repo öffentlich ist, wirkt das auf Kunden und Prüfer unprofessionell und stützt den Verdacht, die Referenz Zaira Beauty sei ein Demo-Projekt.
- **Lösung:** package.json auf 'brandwerkx-website' und passende Beschreibung und Autor ändern, README auf Projektbeschreibung kürzen, Plan- und Löschdateien aus dem Repo entfernen oder das Repo privat stellen.

## Keyword- & Einrichtungs-Recherche

KEYWORD-RECHERCHE BRANDWERKX (read-only, nichts im Repo verändert)

QUELLENLAGE VORAB: developers.google.com, support.google.com, searchengineland.com, experte.de und kopfundstift.de waren per Egress-Proxy blockiert. Google-Regeln stammen daher aus Suchtreffer-Auszügen der Google-Richtlinien und aus Drittquellen (BrightLocal, Whitespark, SEroundtable). Es gab keinen Zugriff auf Keyword-Planner, Ahrefs oder Sistrix. Suchvolumina sind daher NICHT verifiziert. Die Priorisierung folgt Kaufabsicht, Konkurrenzlogik und echtem Standort. Die Zahlen sollten im Google Keyword Planner (kostenlos mit Ads-Konto) und später in der Search Console geprüft werden. Preisquellen sind teils Anbieter-Blogs, teils US-lastig, also nur Orientierung.

WICHTIGSTER BEFUND ZUERST: Die Website behauptet überall München, die echte Adresse im Impressum ist aber Steiner Ring 64, 82538 Geretsried (app/[lang]/impressum/page.tsx:25 und :38). München steht in app/layout.tsx:37 (Default-Title), :141/:148/:153 (JSON-LD), de.ts:17 (Hero-Eyebrow), de.ts:64 (Zaira-Studio) und de.ts:126 (Über mich). Für ein Google-Unternehmensprofil ist das ein Suspendierungs- und Verifizierungsrisiko. Der Standort ist Geretsried, München kann nur Servicegebiet sein.

1) KEYWORDS, PRIORISIERT (Keyword, Suchintention, Zielseite)

Haupt-Keywords, kaufnah, zuerst bauen:
- Lokal Isartal/Oberland: "webdesigner geretsried", "website erstellen lassen geretsried", "webdesign wolfratshausen", "webdesign bad tölz", "webdesigner landkreis bad tölz-wolfratshausen". Intention lokal-transaktional. Ziel: neue Seite /de/webdesign-geretsried, weitere Ortsseiten nur mit echtem Unterschied (Referenzen, Orts-Fakten), sonst droht Doorway-Optik. Das ist der realistischste Quick Win. In der Recherche tauchten für die Region nur Branchenbuch-Einträge und ein lokaler Anbieter (XINUM Webdesign, Geretsried) auf. Ein Preissignal der Region (Fixando): Ø Festpreis ca. 650 €, Stundensatz ca. 40 €.
- Zielgruppe Handwerker: "homepage für handwerker", "website für handwerker erstellen lassen", "handwerker website kosten", "webdesign handwerker münchen/oberbayern". Intention kommerziell. Ziel: NEU /de/webdesign-handwerker. Das Wort "Handwerker" steht bisher nur in den ignorierten Meta-Keywords (app/layout.tsx:49) und im Fließtext (de.ts:127), nirgends als eigene Seite. Gefundene Preisanker: Agenturen 1.800–5.500 €, Baukästen ab ca. 9 €/Monat.
- Zielgruppe Beauty: "website kosmetikstudio erstellen lassen", "homepage kosmetikstudio", "website friseur/nagelstudio", "online terminbuchung website kosmetikstudio". Intention kommerziell. Ziel: NEU /de/webdesign-beauty, belegt durch die Zaira-Case-Study (/de/projekte/zaira-beauty).
- Zielgruppe Logistik: "website spedition erstellen lassen", "webseite logistikunternehmen", "webdesign transport lager". Intention kommerziell, Nische mit wenig deutschsprachiger Konkurrenz. Ziel: NEU /de/webdesign-logistik. Dafür ist eine Case Study zu MRG Trans & Logistik GmbH (nur Testimonial, de.ts:39-41) der Hebel.
- SEO-Dienst: "seo optimierung website", "lokale seo", "seo für handwerker", "google unternehmensprofil einrichten lassen". Intention transaktional. Ziel: NEU /de/seo-optimierung für das Paket "SEO & Wartung" (de.ts:103-105). Der Marktpreis für lokales SEO liegt laut Recherche bei 300–1.200 €/Monat. Die 99 €/Monat im JSON-LD (app/layout.tsx:190) sind weit darunter.
- München als Reichweitenziel (schwer): "website erstellen lassen münchen", "webdesigner münchen", "freelance webdesigner münchen", "webentwickler münchen freelance". Hier ranken Agenturen und Verzeichnisse (OMR-Reviews, business-on.de, goodfirms, Das Örtliche). Ziel: Startseite und /de/leistungen. Das ist mittelfristig und über Inhalte machbar, über das Local Pack mit Geretsrieder Adresse kaum.

Nebenkeywords (Preis und Vergleich, kommerzielle Recherche): "website erstellen lassen kosten", "was kostet eine homepage", "webdesign preise freelancer", "website kosten kleinunternehmen", "günstige website erstellen lassen", "website festpreis", "wartungsvertrag website kosten". Ziel: /de/leistungen plus ein Ratgeber "Was kostet eine Website 2026" mit echter Preistabelle. Hier ranken Ratgeber und Vergleichsportale, daher braucht es eigene, konkrete Zahlen statt Floskeln.

Longtail und Fragen (informativ, gut für AI-Antworten): "wie lange dauert es, eine website erstellen zu lassen", "brauche ich als handwerker eine website", "muster-website oder individuelle website", "was gehört ins impressum für freelancer", "google unternehmensprofil ohne ladengeschäft einrichten", "mehr kunden über google handwerker". Ziel: FAQ-Blöcke auf den Landingpages (Basis sind die 4 FAQs in de.ts:106-113) plus 3–5 Ratgeber-Artikel.

Brand (navigational): "brandwerkx", "zaur hatuev". Ziel: Startseite, Über mich, später das Unternehmensprofil. Sollte in wenigen Wochen Platz 1 sein.

Tech-Keywords nur sekundär: "next.js entwickler freelance", "react entwickler freelancer". Das sind Startups, Recruiter oder Agenturen, nicht die Handwerker-Zielgruppe. Raus aus dem Fokus von Title und Startseite, ggf. eine eigene Seite oder Über mich.

Optionale Hypothese ohne Volumen-Beleg: Das JSON-LD nennt Russisch als Sprache (app/layout.tsx:221). Eine russischsprachige Landingpage für Selbstständige im Raum München könnte eine Nische mit wenig Konkurrenz sein. Das ist nicht validiert.

Den Bundes-Head-Term "website erstellen lassen" nicht direkt angreifen. Dort dominieren Baukästen/Hoster (Wix, Jimdo, IONOS, Strato) und deren Blogs, Ratgeber/Vergleichsportale (experte.de, trusted.de, selbststaendigkeit.de, Heise Solutions) und Agenturen mit Kostenratgebern (kopfundstift.de, alloq.digital, studiomeyer). Die konkreten SERPs konnte ich nicht live einsehen, bitte einmal im Inkognito-Fenster gegenprüfen.

2) PREISSPANNEN (Orientierung aus der Recherche)
Business-Website mit 5–10 Seiten: Freelancer 800–3.000 €, Agentur 2.000–8.000 €. Onepager/Landingpage: Freelancer 500–1.500 €, Agentur 1.000–3.000 €. Individuelle/komplexe Site: Freelancer 5.000–20.000 €. Handwerker-Website laut Ratgeber: Agenturen 1.800–5.500 €. Wartung: 39–200 €/Monat (Agentur). Lokale SEO: 300–1.200 €/Monat bei einem Standort, kleine Unternehmen 500–1.500 €/Monat. BrandWerkX liegt mit 490 € (Muster) und 990 € (Custom) klar unter dem Freelancer-Markt. Das passt zur Positionierung "Festpreis, schnell", signalisiert aber Vorlagen-Qualität. Entscheidend ist, dass die Preise überall gleich sind (siehe Finding Preisinkonsistenz).

3) CHECKLISTE GOOGLE UNTERNEHMENSPROFIL
Zuerst Berechtigung klären. Laut Google-Richtlinien (Auszüge) muss ein Unternehmen persönlichen Kundenkontakt haben, entweder am Standort oder durch Besuche beim Kunden. Reine Online-Anbieter sind nicht berechtigt. Die Website stellt BrandWerkX bisher als Remote-Dienst dar (Formular, "Erstgespräch", de.ts:150 und :30). Ein Service-Area-Business ist nur zulässig, wenn Zaur tatsächlich Vor-Ort-Termine bei Kunden anbietet, z. B. Beratung im Betrieb, Foto-Termine oder Übergabe. Das muss wahr sein und auf Kontakt- und Leistungsseite stehen. Sonst ist ein Profil nicht legitim.
Dann: Name exakt "BrandWerkX", ohne Keywords im Namen (kein "BrandWerkX Webdesign München", das gilt als Stuffing und führt zu Sperrungen). Er muss mit Impressum, Gewerbeanmeldung und Website übereinstimmen. Das Impressum nennt bisher nur "Zaur Hatuev". Adresse: die echte Arbeitsadresse in Geretsried, nicht München, kein Postfach, keine Briefkasten-/Virtual-Office-Adresse. Im Profil "Adresse für Kunden anzeigen" ausschalten, sonst Servicegebiete eintragen (laut Recherche bis zu 20): Geretsried, Wolfratshausen, Bad Tölz, Penzberg, Holzkirchen, München und Umland, nur Orte, die er wirklich anfährt. Ein Profil, das eine nicht besuchbare Adresse anzeigt, ist ein typischer Suspendierungsgrund. Hauptkategorie "Webdesigner" (exakte deutsche Bezeichnung im Dropdown prüfen), Zusatzkategorien wie Webentwickler oder Internet-Marketing-Service je nach Angebot.
Verifizierung 2026: Video ist für die meisten neuen Profile der Standard, Postkarte wird seltener angeboten, Service-Area-Businesses sind von der Massenverifizierung ausgeschlossen, und je nach Konto kann auch Telefon, E-Mail oder Search Console angeboten werden. Du kannst die Methode nicht frei wählen. Das Video muss ein ungeschnittener Durchgang von mindestens ca. 30 Sekunden sein: Straße/Hausnummer, Zugang mit Schlüssel, Arbeitsplatz mit Laptop und laufender Website, Visitenkarten oder Firmenschild/Klingel "BrandWerkX". Beim ersten Versuch scheitern laut Branchenangaben viele Videos (Quelle: Anbieter-Blog, unsicher). Vorher Impressum und Website angleichen.
Nach der Verifizierung: Telefonnummer eintragen (fehlt bisher komplett im Impressum und auf der Website), Öffnungszeiten (Mo–Fr 9–18, de.ts:182), Website-URL https://brandwerkx.de/de, Beschreibung mit Dienst und Region in den ersten 250 Zeichen ohne Keyword-Liste, Leistungen mit denselben Preisen wie auf der Website, eigene Fotos statt Stock (Arbeitsplatz, Projekte, Zaur). Bewertungen: Zaira (Beauty Face) und MRG Logistik um ein Google-Review bitten, per direktem Review-Link, nicht selbst bewerten, nichts kaufen, keine Bewertungen nur von zufriedenen Kunden filtern. Konsistente Einträge (Name, Adresse, Telefon, URL identisch) auch bei Bing Places, Apple Business Connect, Das Örtliche, Gelbe Seiten, LinkedIn, GitHub und Freelancer-Plattformen.

4) CHECKLISTE SEARCH CONSOLE
In der Search Console eine Property vom Typ "Domain" mit brandwerkx.de anlegen, sie deckt http/https, www und Subdomains ab. Verifizierung per DNS-TXT-Eintrag (google-site-verification=...) auf dem Hauptdomain-Host. Wo der DNS liegt (Vercel-DNS oder Registrar) ist im Repo nicht erkennbar, das muss Zaur nachsehen. Propagation Minuten bis 48 Stunden. Den TXT-Eintrag dauerhaft stehen lassen. Alternativ zusätzlich URL-Präfix-Property https://brandwerkx.de/ per Meta-Tag (in Next.js über metadata.verification.google). Danach unter Indexierung > Sitemaps "sitemap.xml" einreichen (sie wird von app/sitemap.ts erzeugt, robots.txt verweist in public/robots.txt:7 darauf). Erwartet werden 16 URLs (8 Routen mal 2 Sprachen) mit Status "Erfolgreich". Mit der URL-Prüfung Indexierung für /de, /de/leistungen, /de/kontakt und die Case Study anfordern. Prüfen, ob die von Google gewählte Canonical der gesetzten entspricht. Berichte Seitenindexierung und Core Web Vitals ansehen, E-Mail-Benachrichtigungen aktivieren, Leistung nach Land Deutschland filtern. Auftritte in AI Overviews und AI Mode werden laut Google im normalen Web-Suchtraffic mitgezählt, einen separaten Bericht gibt es nicht. Bing Webmaster Tools lässt sich meines Wissens per Import aus der Search Console einrichten (in dieser Recherche nicht verifiziert), sinnvoll für Bing-gestützte KI-Suche.

5) KI-SICHTBARKEIT, STAND OKTOBER 2026
llms.txt: Nicht priorisieren. Google (John Mueller) sagt, dass aktuell kein KI-System llms.txt nutzt, und vergleicht es mit dem abgeschafften Keywords-Meta-Tag. Server-Log-Studien stützen das: Ahrefs über 137.000 Domains, 97 % der llms.txt-Dateien ohne eine einzige Anfrage im Mai 2026. OtterlyAI: 0,1 % der KI-Crawler-Anfragen. SE Ranking, rund 300.000 Domains: kein Zitier-Effekt. Es gibt aktuell keine public/llms.txt im Repo. Das ist kein Mangel mit Wirkung. Wenn überhaupt, ein 10-Minuten-Job ohne Erwartung.
Google AI Overviews und AI Mode: Laut Google "AI features and your website" braucht es keine Sonder-Optimierung, sondern normale SEO-Grundlagen: Crawling in robots.txt und beim Hoster/CDN erlaubt, Indexierung und Snippet-Fähigkeit, interne Verlinkung, gute Page Experience, wichtige Inhalte als Text, strukturierte Daten müssen zum sichtbaren Text passen. max-snippet:-1 ist bereits gesetzt (app/layout.tsx:104), und die Seiten sind Server Components, das ist gut.
Andere Assistenten (ChatGPT-Suche, Claude, Perplexity): robots.txt hat nur "User-agent: * Allow: /" plus Disallow /muster/, damit sind alle Crawler erlaubt. Gut so. Nur im Vercel-Dashboard prüfen, dass keine Firewall-/Bot-Regel Such-Bots wie OAI-SearchBot, Claude-SearchBot, PerplexityBot blockt. Training-Bots (GPTBot, ClaudeBot, Google-Extended) sind eine Geschäftsentscheidung. Google-Extended beeinflusst Search und AI Overviews nicht. Was KI-Antworten für lokale Dienstleister tatsächlich beeinflusst: ein sauber verifiziertes Unternehmensprofil, Bewertungen, konsistente Fakten (Name, Ort, Leistungen, Preise) überall, direkt beantwortende Textblöcke mit Preis- und Ablaufangaben, Erwähnungen auf Drittseiten (Verzeichnisse, Kundenseiten mit Footer-Link "Website von BrandWerkX"). Behauptungen wie "4x mehr Zitierungen durch Schema" stammen aus Anbieter-Blogs und sind schwach belegt. Schema bleibt trotzdem sinnvoll, wenn es zum sichtbaren Text passt.

6) EMPFOHLENE REIHENFOLGE
Woche 0: Standort/Impressum/Preise vereinheitlichen, Telefon ergänzen, Vor-Ort-Angebot klären. Woche 1: Search Console (Domain, Sitemap), Unternehmensprofil anlegen und per Video verifizieren, Bing Places. Woche 2–4: Landingpages Geretsried/Handwerker/Beauty/Logistik/SEO plus MRG-Case-Study, Review-Anfragen, Verzeichniseinträge. Ab Woche 4: Search-Console-Daten und Keyword Planner nutzen, um Ratgeber-Themen und Ortsseiten nachzuschärfen.

### [KRITISCH] Standort-Widerspruch: Website sagt München, Impressum sagt Geretsried
- **Beleg:** app/[lang]/impressum/page.tsx:25 und :38 (Steiner Ring 64, 82538 Geretsried) gegen app/layout.tsx:37 (Title), :141/:148/:153 (JSON-LD address und areaServed nur München), de.ts:17, :64, :126 sowie app/[lang]/leistungen/page.tsx:10.
- **Lösung:** München nicht als Standort ausgeben. JSON-LD address auf Geretsried (addressLocality, postalCode, addressCountry) setzen, areaServed als Liste der real bedienten Orte inklusive München. Texte in de.ts/en.ts auf 'Webentwickler aus Geretsried, für Oberbayern und München' umstellen. Das Google-Unternehmensprofil mit Geretsried-Adresse als Service-Area-Business anlegen (Adresse verborgen), München nur als Servicegebiet.

### [KRITISCH] Unternehmensprofil-Berechtigung: Website wirkt wie reiner Online-Dienst
- **Beleg:** Google verlangt persönlichen Kundenkontakt (Standort oder Kundenbesuch), reine Online-Anbieter sind nicht berechtigt. Auf der Seite fehlt jeder Hinweis auf Vor-Ort-Termine: de.ts:30 und :150 (Erstgespräch, Formular), de.ts:182 (nur Zeiten), Kontaktseite ohne Vor-Ort-Option.
- **Lösung:** Nur wenn es stimmt: Vor-Ort-Termine bei Kunden (Beratung im Betrieb, Foto-Termin, Übergabe) real anbieten und auf Kontakt-/Leistungsseite benennen, inklusive Einsatzgebiet. Wenn Zaur ausschließlich remote arbeitet, ist ein Unternehmensprofil nicht zulässig. Dann stattdessen Verzeichnisse, Bing Places-Alternativen prüfen, Plattformprofile und Backlinks nutzen. Keine falschen Angaben im Profil.

### [HOCH] Keine Landingpages für Zielgruppen, Branchen und Orte
- **Beleg:** app/sitemap.ts:7-16 hat nur 8 Routen (Start, Leistungen, Projekte, 1 Case Study, Über mich, Kontakt, Impressum, Datenschutz). 'Website für Handwerker' steht nur in Meta-Keywords (app/layout.tsx:49, app/[lang]/page.tsx:23), die Google ignoriert. Kein Ort außer München, keine Branchenseite für Beauty oder Logistik.
- **Lösung:** Neue Seiten: /de/webdesign-geretsried, /de/webdesign-handwerker, /de/webdesign-beauty, /de/webdesign-logistik, /de/seo-optimierung, plus Ratgeber 'Was kostet eine Website 2026'. Jede Seite mit eigenem H1, Preisen, Referenz, 4–6 FAQs, internen Links. Keine Ortsseiten als Textkopien. Danach in app/sitemap.ts aufnehmen.

### [HOCH] Preise widersprechen sich über Seite, Meta und Schema
- **Beleg:** de.ts:14 und :79 'ab 490€'; app/[lang]/leistungen/page.tsx:10-11 'Pakete ab 790€' und 'Premium-Lösung'; app/layout.tsx:176/:183/:190 (490/990/99 €); de.ts:170 Budget beginnt bei 790 €. Paketnamen in Meta (Landingpage/Business/Premium) passen nicht zu de.ts:96-105 (Muster/Custom/SEO & Wartung).
- **Lösung:** Ein Preismodell festlegen und in de.ts, en.ts, Meta-Descriptions, JSON-LD, Kontaktformular und Unternehmensprofil identisch führen. Meta der Leistungsseite an die echten Paketnamen anpassen. Hinweis zum Markt: Freelancer-Business-Sites liegen laut Recherche bei 800–3.000 €.

### [HOCH] Unbelegte Ranking-Behauptungen als Vertrauensanker
- **Beleg:** de.ts:18 'Top-3 bei Google', de.ts:67 'Seite-1-Ranking auf Google', de.ts:209-210 'Google-Ranking für lokale Suchanfragen', de.ts:64-65 '+40% Kundenanfragen'. Search Console und Unternehmensprofil existieren noch nicht, Belege sind nicht auf der Seite.
- **Lösung:** Belegen (Search-Console-Screenshot oder Kundenfreigabe mit Datum und Suchbegriff) oder umformulieren. Konkrete Suchbegriffe nennen statt pauschal 'Top-3'. Irreführungsrisiko nach UWG und E-E-A-T-Schwäche vermeiden. Keine Rechtsberatung.

### [HOCH] Technische Sprach- und Canonical-Fehler
- **Beleg:** app/layout.tsx:112 hat festes lang="de", auch für /en-Seiten. Root-Metadata setzt canonical https://brandwerkx.de/de (app/layout.tsx:67), das erben alle Seiten ohne eigene generateMetadata (Impressum, Datenschutz, vibes). hreflang languages nur auf der Startseite (app/[lang]/page.tsx:28, :41), nicht in leistungen/page.tsx:17,27, projekte, kontakt, ueber-mich. app/sitemap.ts hat keine alternates.
- **Lösung:** lang dynamisch aus dem Locale setzen (Root-Layout nach app/[lang]/layout.tsx verlagern oder lang pro Segment setzen). Canonical und alternates.languages (inklusive x-default) pro Seite per generateMetadata setzen. Root-Canonical entfernen. In app/sitemap.ts alternates.languages je URL ergänzen.

### [MITTEL] Doppeltes Title-Suffix und falsche englische Ortsnamen im Title
- **Beleg:** Root-Template '%s | BrandWerkX' (app/layout.tsx:38) trifft auf Seiten-Titles, die selbst auf '| BrandWerkX' enden (app/[lang]/leistungen/page.tsx:10, app/[lang]/page.tsx:18), wahrscheinlich 'X | BrandWerkX | BrandWerkX'. EN-Titles enthalten 'München' statt 'Munich' (leistungen/page.tsx:24-26). Im gerenderten HTML nicht geprüft, da read-only.
- **Lösung:** Im gerenderten HTML prüfen. Suffix aus den Page-Titles entfernen oder title.absolute nutzen. EN-Texte auf 'Munich' umstellen. Title je Seite mit Hauptkeyword vorne, rund 55–60 Zeichen.

### [MITTEL] JSON-LD: ungültige SearchAction, fehlende Felder, falsche Region
- **Beleg:** app/layout.tsx:133-136 SearchAction zeigt auf /de/projekte, das ist kein Such-Endpunkt. Es fehlen telephone, logo/image, openingHours, @id, url der Person. Person.jobTitle enthält 'München' (:200). Schema steht im Root-Layout und damit auf allen Seiten inklusive Rechtstexten.
- **Lösung:** SearchAction entfernen. ProfessionalService um telephone, logo, openingHoursSpecification, sameAs (Unternehmensprofil, LinkedIn, GitHub) und @id ergänzen, Adresse und areaServed korrigieren (siehe Standort-Finding). Schema auf Startseite, Leistungen und Landingpages beschränken. FAQ-Rich-Results sind bei Google für die meisten Seiten eingeschränkt, FAQ-Schema daher nur als Zusatz, nicht als Ziel.

### [MITTEL] Impressum veraltet und unvollständig für Unternehmensprofil und NAP-Konsistenz
- **Beleg:** de.ts:192 'Angaben gemäß § 5 TMG' und de.ts:195 'nach § 55 Abs. 2 RStV'. Das TMG gilt seit 14.05.2024 nicht mehr (jetzt DDG § 5, laut IHK/Kanzlei-Quellen), der RStV ist durch den MStV ersetzt (letzteres aus eigenem Wissen). app/[lang]/impressum/page.tsx:25 nennt nur 'Zaur Hatuev', nicht 'BrandWerkX'. Keine Telefonnummer, nur Gmail-Adresse (:31).
- **Lösung:** Rechtsgrundlagen auf DDG und MStV aktualisieren (juristisch prüfen lassen). Firmenbezeichnung 'BrandWerkX, Inh. Zaur Hatuev' aufnehmen, passend zur Gewerbeanmeldung. Telefonnummer und möglichst eine Domain-Mailadresse (info@brandwerkx.de) ergänzen. Name, Adresse und Telefon überall identisch (Footer, Kontakt, JSON-LD, Unternehmensprofil).

### [MITTEL] Keyword-Fokus passt nicht zur Zielgruppe (Tech-Begriffe statt Kundenbegriffe)
- **Beleg:** app/layout.tsx:47 'Next.js Entwickler München', :55 'React Entwickler', app/[lang]/page.tsx:22; keywords-Meta wird von Google nicht ausgewertet (app/layout.tsx:41-57, leistungen/page.tsx:12-16). Zielgruppe laut de.ts:127 sind Handwerker, Selbstständige, Kleinunternehmen.
- **Lösung:** Keywords-Meta streichen (kein Ranking-Effekt). Begriffe der Zielgruppe in H1, Title, Fließtext und Zwischenüberschriften der Landingpages verwenden. Next.js nur als Qualitätsargument ('schnell, Core Web Vitals'), nicht als Suchziel.

### [MITTEL] Sitemap: lastModified immer 'jetzt', Priorität und changeFrequency wirkungslos
- **Beleg:** app/sitemap.ts:26 lastModified: new Date() bei jedem Build für alle URLs; priority/changeFrequency (:7-14) werden von Google ignoriert. Neue Landingpages fehlen (siehe Finding Landingpages).
- **Lösung:** Echte Änderungsdaten pro Route pflegen (oder weglassen). Neue Seiten aufnehmen. Nach Einreichung in der Search Console Status prüfen.

### [MITTEL] Chance: MRG Logistik nur als Testimonial, keine Case Study
- **Beleg:** de.ts:39-41 enthält das Zitat; es gibt nur eine Case-Study-Seite (app/[lang]/projekte/zaira-beauty). Sitemap enthält nur diese (app/sitemap.ts:10).
- **Lösung:** Case Study /de/projekte/mrg-logistik mit Ausgangslage, Umfang, Ergebnis und Link zur Kundenseite. Kunden bitten, im Footer 'Website von BrandWerkX' zu verlinken (Backlink und Entity-Signal).

### [NIEDRIG] /muster/* per robots.txt gesperrt, Produktkatalog nicht auffindbar
- **Beleg:** public/robots.txt:4 Disallow: /muster/. Die Muster-Website ist das Hauptprodukt (de.ts:96-98), die Demos sind aber für Suche unsichtbar.
- **Lösung:** Disallow beibehalten, wenn die Demos Kundenlinks sind. Stattdessen auf den Branchen-Landingpages Screenshots und Beschreibungen der passenden Muster einbinden, damit Begriffe wie 'Website Vorlage Friseur/Handwerker' auf indexierbaren Seiten stehen.

### [NIEDRIG] Chance: Eigene Einrichtung als Dienstleistung und Referenz nutzen
- **Beleg:** Paket 'SEO & Wartung' (de.ts:103-105) nennt kein Unternehmensprofil, keine Search Console, keine lokale SEO. Laut Recherche kostet lokale SEO 300–1.200 €/Monat, das Paket steht bei 99 €.
- **Lösung:** Einmalpaket 'Google-Unternehmensprofil + Search Console + lokale SEO-Basis' für Handwerker und Beauty anbieten, später als Case Study dokumentieren. Preis mit dem übrigen Modell abstimmen.

### [NIEDRIG] Chance: llms.txt ohne Effekt, Sichtbarkeit in KI über Inhalte und Erwähnungen
- **Beleg:** Kein public/llms.txt im Repo. Mueller und mehrere Log-Studien 2026 (Ahrefs, OtterlyAI, SE Ranking, laut Sekundärberichten) sehen keine Nutzung durch KI-Systeme.
- **Lösung:** Keine Zeit investieren. Stattdessen: Q&A-Blöcke mit konkreten Preisen und Abläufen, konsistente Fakten auf allen Profilen, Bewertungen, Erwähnungen auf Drittseiten. Im Vercel-Dashboard prüfen, dass Such-Bots (OAI-SearchBot, Claude-SearchBot, PerplexityBot, Googlebot) nicht blockiert werden.

## Gegenprüfung

### Korrekturen / übertrieben
- Titel-Länge: Audit 1 nennt 77 Zeichen für den DE-Startseiten-Title, nachgerechnet sind es 74 (ohne Doppelsuffix 61). Audit 2 (60-74) stimmt. Der Befund selbst (doppeltes '| BrandWerkX') ist richtig.
- Schweregrad-Streuung beim Standort-Befund München vs. Geretsried: Audit 1 und 6 sagen 'hoch', Audit 2, 3 und 7 'kritisch'. Das ist kein Code-Fehler, sondern eine Geschäftsentscheidung (Impressum Geretsried, Marketing/JSON-LD München). Als Blocker für das Google-Unternehmensprofil gerechtfertigt, für das reine Seiten-SEO eher 'hoch'. Vereinheitlichen.
- Widerspruch zwischen den Audits zum Google-Unternehmensprofil: Audit 1, 2, 3, 5 und 6 empfehlen selbstverständlich ein Service-Area-Business (Geretsried, Adresse ausgeblendet, München als Einzugsgebiet). Nur Audit 7 nennt die Voraussetzung, dass Google persönlichen Kundenkontakt (Vor-Ort-Termine) verlangt und reine Remote-Anbieter nicht berechtigt sind. Die Seite zeigt nur Formular und Erstgespräch. Ohne diese Klärung ist die SAB-Empfehlung der anderen Audits zu optimistisch. Google-Richtlinien waren in der Sandbox nicht abrufbar, die Regel ist aus Drittquellen übernommen.
- Demo-Fonts/DSGVO (Audit 6, 'hoch'): Stimmt nur teilweise. fonts.bunny.net steht zwar in 12 von 12 Demo-HTMLs, ist aber der bewusste EU-CDN-Ersatz für Google Fonts (Commit 15c7977 'DSGVO: Google Fonts → Bunny Fonts'). Das LG-München-I-Urteil betrifft Google Fonts, nicht Bunny. images.pexels.com steht nur in 6 von 12 Demos, nicht 'in allen'. Berechtigt bleibt: Datenschutzerklärung erwähnt weder Bunny noch Pexels. Schweregrad eher mittel.
- Catch-all-Soft-404 (Audit 1, 'hoch'): technisch bestätigt (200 text/html mit Startseiten-Title), aber das Ranking-Risiko ist geringer als dargestellt, weil Google solche URLs nur über Links findet. Einzig /apple-touch-icon.png wird auf jeder Seite verlinkt. Realistisch 'mittel'. Die Behebung (dynamicParams=false, echte Dateien anlegen) bleibt sinnvoll.
- /muster-Widerspruch (Audit 1, 'hoch'): Fakten stimmen, aber die Einordnung ist zu streng. Disallow /muster/ und noindex auf den 12 Demo-HTMLs sind laut Commit 15c7977 bewusst ('Fake-Firmen-Content gehört nicht in den Google-Index'). Tatsächlicher Fehler ist nur, dass Disallow das noindex unlesbar macht und /muster sowie /muster/[kunde] trotz gepflegter Metadaten 'index, follow' tragen und gesperrt sind. Das ist eine Strategie-Entscheidung, 'mittel'.
- Hero-LCP und framer-motion-Größe (Audit 8, 'hoch'): Der Mechanismus ist bestätigt (H1, Eyebrow und CTAs stehen im SSR-HTML mit opacity:0 und blur, 43x 'opacity:0' auf /de). Die Wirkung auf LCP ist aber nirgends gemessen, die 30-45 KB gzip und 130-145 KB First-Load sind Schätzungen. Als 'plausibel, ungemessen' kennzeichnen.
- Impressum (Audit 6, 'hoch'): Veraltete Normen (§ 5 TMG, § 55 RStV in de.ts:192,195 und en.ts:194,197) und fehlender Name 'BrandWerkX' sind bestätigt. Die Aussage, die Telefonnummer fehle, ist als Pflichtverstoß überzogen: E-Mail plus Kontaktformular genügen nach üblicher Auslegung (EuGH C-298/07) als zweiter schneller Kommunikationsweg. Telefon ist für Vertrauen und Google-Profil nützlich, nicht zwingend. Kein Rechtsrat.
- Nicht belegt, aber als Fakt formuliert: (a) Audit 4, Google löse @id-Verweise 'nicht seitenübergreifend' auf. (b) Audit 5/7, Ahrefs-Studie mit 137.000 Domains, OtterlyAI 0,1 %, SE-Ranking-Zahlen und Mueller-Aussage zu llms.txt. (c) Audit 7, Video-Verifizierung als 2026er Standard, Fixando-Preise 650 €, Marktpreise. Diese Quellen waren nicht abrufbar, als 'Sekundärquelle, nicht verifiziert' markieren. Suchvolumina fehlen komplett (Audit 7 räumt das selbst ein).
- Nicht gegengeprüft, daher nicht als Fakt übernehmen: Audit 1 sagt, das Zaira-OG-Bild sei 2548x1897 statt der deklarierten 1200x800 (Datei ist WebP, Maße nicht ermittelt). Ebenso die Zähl-Aussagen zu ungenutzten CSS-Klassen (31 von 226) und Wortzahlen aus Audit 2.

### Nicht geprüft / offene Entscheidungen
- Die Live-Seite brandwerkx.de hat kein Audit abgerufen (Egress-Proxy). Ungeprüft: ob das Deployment dem Repo entspricht, www→Apex-Redirect, HTTPS/HSTS, Security-Header, Vercel-Bot-Firewall, DNS. Nebenbei verifiziert: HEAD 9400c2d == origin/main, letzter Push 2026-07-22, GitHub-Repo ZaurHa/portfolio ist öffentlich (gh api: private=false). Das macht package.json ('kosmetik-demo', Autor 'Zaira Beauty'), Plan-Dateien und README sichtbar.
- Keine Messwerte: kein Lighthouse/PageSpeed/CrUX, keine Core-Web-Vitals-Messung. Alle Performance-Zahlen (KB, LCP, TBT) sind Schätzungen.
- Strukturierte Daten wurden nicht mit Rich-Results-Test oder Schema-Validator geprüft. Search Console und Bing Webmaster standen nicht zur Verfügung (kein Konto), daher keine Index-, Abdeckungs- oder Query-Daten.
- Englische Seiten nur stichprobenartig geprüft (/en/impressum, /en/datenschutz, /en/projekte/zaira-beauty). Nicht systematisch: /en/xyz-404-Verhalten, EN-Texte gegen DE, hreflang-Paare je EN-Unterseite, EN-JSON-LD.
- Nicht auditiert: Bild-SEO jenseits vorhandener alt-Texte (Dateinamen, Dimensionen, Zaira-Bild), Barrierefreiheit (Kontrast, Tastatur, Fokus, ARIA über Formular-Labels hinaus), Mobile Usability auf echten Geräten, Security-Header/CSP, Cookie-Header der Live-Antworten.
- Kaum oder gar nicht geprüft: public/vibes/*.html im Detail, MusterShowcase.tsx-Client-Logik, Kontakt-Sidebar, der Fließtext von /ueber-mich, die Legacy-Datenschutzseite app/datenschutz/page.tsx (Audit 6 zitiert daraus, ich habe sie nicht gegengelesen).
- Off-Page und Wettbewerb nirgends live geprüft: Backlinks, bestehende Branchenbucheinträge, Bing Places, Apple Business Connect, echte SERPs für 'webdesigner geretsried' bzw. 'website erstellen lassen münchen', Konkurrenten im Isartal. Die Konkurrenzaussagen in Audit 7 beruhen auf einzelnen Suchtreffern.
- Offene Entscheidungen, von denen die Umsetzungsreihenfolge abhängt und die kein Audit beantworten kann: (1) Gibt es echte Vor-Ort-Termine (GBP-Berechtigung)? (2) Standortmodell Geretsried vs. München. (3) Steuerstatus (Kleinunternehmer § 19 UStG ja/nein, netto/brutto). (4) Welche Telefonnummer ist öffentlich. (5) Verbindliches Preismodell (490/990/99 vs. 790/1.500/2.500). (6) Sollen /en und /muster überhaupt indexiert werden. (7) Gehören Vibes/Siraj auf die Domain.
- Nicht geprüft, ob das Kontaktformular live funktioniert: RESEND_API_KEY in Vercel gesetzt, Domain brandwerkx.de bei Resend verifiziert, Zustellbarkeit (SPF/DKIM/DMARC). CLAUDE.md nennt RESEND_DOMAIN/ADMIN_EMAIL, route.ts liest nur RESEND_API_KEY und hat Absender und Empfänger hartkodiert. Fehlend ist außerdem eine Konversionsmessung (keine Danke-Seite, kein Analytics), nur in Audit 6 gestreift.
- Kein Audit hat die Textqualität und Wortzahl pro Seite gegen echte Wettbewerber-Seiten verglichen. Die Seitenvorschläge (Orts-, Branchen-, Ratgeberseiten) sind Hypothesen ohne Keyword-Planner-Daten.
