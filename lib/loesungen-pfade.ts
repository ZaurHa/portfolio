import type { LoesungKey } from "./loesungen-typen";

/**
 * Pfade der Lösungsseiten je Sprache. Klein gehalten, weil auch die Navigation (Client) sie braucht:
 * Sprachwechsel DE ↔ EN, hreflang und Sitemap. Muss zu den Slugs in loesungen-de.ts und loesungen-en.ts passen.
 */
export const LOESUNG_SLUGS: Record<LoesungKey, { de?: string; en?: string }> = {
  "ki-telefon": { de: "ki-telefonassistent", en: "ai-phone-assistant" },
  "ki-chatbot": { de: "ki-chatbot", en: "ai-chatbot" },
  recruiting: { de: "mitarbeiter-finden" },
  "web-apps": { de: "web-app-entwickeln-lassen", en: "custom-web-apps" },
  "buero-automatisierung": { de: "buero-automatisierung", en: "business-automation" },
  "e-rechnung": { de: "e-rechnung-einrichten" },
  "google-profil": { de: "google-unternehmensprofil" },
  "website-betreuung": { de: "website-wartung" },
  "it-grundschutz": { de: "it-sicherheit-kleine-firmen" },
  "ki-workshop": { de: "ki-schulung" },
  "mehrsprachige-websites": { en: "multilingual-websites" },
  "white-label": { en: "white-label-development" },
};

export const LOESUNGEN_BASIS = { de: "/de/loesungen", en: "/en/solutions" } as const;
export const RU_PFAD = "/ru";

export function loesungPfad(key: LoesungKey, lang: "de" | "en"): string | null {
  const slug = LOESUNG_SLUGS[key][lang];
  return slug ? `${LOESUNGEN_BASIS[lang]}/${slug}` : null;
}

/** Gegenstück einer Lösungs-URL in der anderen Sprache; ohne passende Seite die Übersicht. Null, wenn keine Lösungsseite. */
export function loesungGegenstueck(pathname: string, ziel: "de" | "en"): string | null {
  const quelle = ziel === "de" ? "en" : "de";
  const basis = LOESUNGEN_BASIS[quelle];
  if (pathname !== basis && !pathname.startsWith(`${basis}/`)) return null;
  const slug = pathname.slice(basis.length + 1).replace(/\/$/, "");
  if (!slug) return LOESUNGEN_BASIS[ziel];
  const eintrag = Object.values(LOESUNG_SLUGS).find((s) => s[quelle] === slug);
  return eintrag?.[ziel] ? `${LOESUNGEN_BASIS[ziel]}/${eintrag[ziel]}` : LOESUNGEN_BASIS[ziel];
}
