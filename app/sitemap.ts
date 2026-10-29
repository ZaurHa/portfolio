import { MetadataRoute } from "next";
import { landingPages } from "../lib/landing";
import { loesungen } from "../lib/loesungen";
import { LOESUNGEN_BASIS, RU_PFAD, loesungPfad } from "../lib/loesungen-pfade";
import { ausgaben } from "../lib/ki-chancen";
import { SITE_URL, SITEMAP_LAST_MODIFIED } from "../lib/seo";

const locales = ["de", "en"] as const;

// Rechtsseiten sind noindex und gehören nicht in die Sitemap.
const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/leistungen", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/projekte", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/projekte/zaira-beauty", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/projekte/flott-umzug", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/ueber-mich", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/kontakt", priority: 0.7, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(SITEMAP_LAST_MODIFIED);
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }
  }

  // Design-Vorlagen (ohne Sprachpräfix)
  entries.push({ url: `${SITE_URL}/muster`, lastModified, changeFrequency: "monthly", priority: 0.7 });

  // Nur deutsche Landingpages
  entries.push({ url: `${SITE_URL}/de/webdesign`, lastModified, changeFrequency: "monthly", priority: 0.8 });
  for (const p of landingPages) {
    entries.push({
      url: `${SITE_URL}/de/webdesign/${p.slug}`,
      lastModified,
      changeFrequency: "monthly",
      priority: p.kind === "leistung" ? 0.8 : 0.7,
    });
  }

  // Lösungen (KI, Apps, Automatisierung): Übersichten und Einzelseiten je Sprache, dazu die russische Seite
  for (const lang of ["de", "en"] as const) {
    entries.push({ url: `${SITE_URL}${LOESUNGEN_BASIS[lang]}`, lastModified, changeFrequency: "monthly", priority: 0.9 });
    for (const l of loesungen[lang]) {
      entries.push({ url: `${SITE_URL}${loesungPfad(l.key, lang)}`, lastModified, changeFrequency: "monthly", priority: 0.8 });
    }
  }
  entries.push({ url: `${SITE_URL}${RU_PFAD}`, lastModified, changeFrequency: "monthly", priority: 0.7 });

  // KI-Chancen (nur Deutsch): Übersicht mit der neuesten Ausgabe, frühere Ausgaben als eigene Seiten
  // (die neueste Ausgabe hat ihre Canonical auf der Übersicht und fehlt deshalb hier)
  entries.push({ url: `${SITE_URL}/de/ki-chancen`, lastModified: new Date(ausgaben[0].datumIso), changeFrequency: "weekly", priority: 0.8 });
  for (const a of ausgaben.slice(1)) {
    entries.push({ url: `${SITE_URL}/de/ki-chancen/${a.slug}`, lastModified: new Date(a.datumIso), changeFrequency: "yearly", priority: 0.5 });
  }

  return entries;
}
