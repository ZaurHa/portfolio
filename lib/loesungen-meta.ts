import type { Metadata } from "next";
import type { Loesung } from "./loesungen-typen";
import { pageMetadata } from "./seo";
import { LOESUNGEN_BASIS, LOESUNG_SLUGS, RU_PFAD, loesungPfad } from "./loesungen-pfade";
import { HUB_TEXT } from "../components/v3/LoesungenHub";

/** hreflang der Übersichten: DE, EN und die russische Seite gehören zusammen. */
export const HUB_SPRACHEN = {
  de: LOESUNGEN_BASIS.de,
  en: LOESUNGEN_BASIS.en,
  ru: RU_PFAD,
  "x-default": LOESUNGEN_BASIS.de,
};

export function hubMetadata(lang: "de" | "en"): Metadata {
  const t = HUB_TEXT[lang];
  return pageMetadata({
    lang,
    path: lang === "de" ? "/loesungen" : "/solutions",
    title: t.metaTitle,
    description: t.metaDescription,
    languages: HUB_SPRACHEN,
  });
}

export function loesungMetadata(l: Loesung): Metadata {
  const paar = LOESUNG_SLUGS[l.key];
  const eigen = loesungPfad(l.key, l.lang) as string;
  const languages: Record<string, string> = {};
  if (paar.de) languages.de = loesungPfad(l.key, "de") as string;
  if (paar.en) languages.en = loesungPfad(l.key, "en") as string;
  languages["x-default"] = languages.de ?? eigen;
  return pageMetadata({
    lang: l.lang,
    path: eigen.slice(3),
    title: l.metaTitle,
    description: l.metaDescription,
    languages,
  });
}
