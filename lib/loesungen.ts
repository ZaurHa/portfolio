import type { Loesung, LoesungKey, LoesungSprache, KatalogFamilie } from "./loesungen-typen";
import { loesungenDe, katalogDe } from "./loesungen-de";
import { loesungenEn, katalogEn } from "./loesungen-en";

export const loesungen: Record<LoesungSprache, Loesung[]> = { de: loesungenDe, en: loesungenEn };
export const katalog: Record<LoesungSprache, KatalogFamilie[]> = { de: katalogDe, en: katalogEn };

export function getLoesung(lang: LoesungSprache, slug: string): Loesung | undefined {
  return loesungen[lang].find((l) => l.slug === slug);
}

export function loesungByKey(lang: LoesungSprache, key: LoesungKey): Loesung | undefined {
  return loesungen[lang].find((l) => l.key === key);
}

/** Erste Zahl aus einem Preis wie „ab 1.500 €“ oder „from €3,000“ (für strukturierte Daten). */
export function preisZahl(betrag: string): number | null {
  const m = betrag.replace(/(\d)[.,](\d{3})/g, "$1$2").match(/\d+/);
  return m && !/%/.test(betrag) ? Number(m[0]) : null;
}
