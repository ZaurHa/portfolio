/**
 * Datenformat der Lösungsseiten (KI, Apps, Automatisierung) unter
 * /de/loesungen/<slug> und /en/solutions/<slug>.
 * Regeln für alle Texte: nur belegbare Aussagen, Preise nur wie freigegeben,
 * keine Gedankenstriche (– —), Überschriften ohne Schlusspunkt, keine Kundennamen.
 */

export type LoesungSprache = "de" | "en";

/** Gemeinsamer Schlüssel einer Lösung über alle Sprachen (verknüpft DE und EN für hreflang und Sprachwechsel). */
export type LoesungKey =
  | "ki-telefon"
  | "ki-chatbot"
  | "recruiting"
  | "web-apps"
  | "buero-automatisierung"
  | "e-rechnung"
  | "google-profil"
  | "website-betreuung"
  | "it-grundschutz"
  | "ki-workshop"
  | "mehrsprachige-websites"
  | "white-label";

export interface LoesungPreis {
  /** z. B. "ab 490 €" oder "from €490" */
  betrag: string;
  /** z. B. "Einrichtung, einmalig" oder "im Monat, Betrieb und Betreuung" */
  wofuer: string;
}

export interface LoesungFaq {
  /** Frage so, wie Kunden sie bei Google oder ChatGPT stellen */
  q: string;
  /** Antwort in 2 bis 5 Sätzen, erster Satz beantwortet die Frage direkt */
  a: string;
}

export interface LoesungAbschnitt {
  title: string;
  text?: string;
  bullets?: string[];
}

export interface Loesung {
  key: LoesungKey;
  lang: LoesungSprache;
  /** URL-Teil ohne Sprache, z. B. "ki-telefonassistent" (DE) oder "ai-phone-assistant" (EN) */
  slug: string;
  /** Kurzname für Listen, Brotkrumen und Links, z. B. "KI-Telefonassistent" */
  label: string;
  /** Gruppe im Katalog, z. B. "Erreichbarkeit" */
  familie: string;
  /** Seitentitel ohne Marke, höchstens etwa 60 Zeichen, Haupt-Suchbegriff vorne */
  metaTitle: string;
  /** 140 bis 160 Zeichen, mit Preis und Nutzen */
  metaDescription: string;
  /** kurze Zeile über der H1, z. B. "KI · Erreichbarkeit" */
  eyebrow: string;
  /** Hauptüberschrift mit dem Suchbegriff, ohne Schlusspunkt */
  h1: string;
  /** Antwort-Absatz direkt unter der H1: Was, für wen, Preis, Nutzen (2 bis 3 Sätze) */
  intro: string;
  /** 1 bis 3 Preiszeilen */
  preise: LoesungPreis[];
  /** Für wen: 3 bis 6 Branchen oder Betriebsarten */
  fuer: string[];
  /** 3 bis 4 Inhaltsabschnitte */
  sections: LoesungAbschnitt[];
  /** 3 bis 4 Schritte vom Erstgespräch bis zum Betrieb */
  ablauf: string[];
  /** 6 bis 8 typische Kundenfragen */
  faqs: LoesungFaq[];
  /** 2 bis 4 verwandte Lösungen derselben Sprache */
  related: LoesungKey[];
  /** Thema für das Kontaktformular (?thema=…): nur A-Z, a-z, 0-9, Umlaute, ß, Leerzeichen und . , & + / ( ) -, 2 bis 80 Zeichen */
  thema: string;
}

/** Ein Eintrag im Katalog aller Angebote (Übersichtsseite). */
export interface KatalogAngebot {
  name: string;
  /** ein Satz, was es ist */
  was: string;
  /** Preis wie freigegeben, z. B. "ab 490 € + ab 99 €/Monat" */
  preis: string;
  /** Verweis auf eine eigene Lösungsseite derselben Sprache, falls vorhanden */
  seite?: LoesungKey;
  /** Hinweis wie "Förderung möglich" oder "neu" */
  hinweis?: string;
}

export interface KatalogFamilie {
  titel: string;
  /** ein Satz zum Problem, das die Familie löst */
  warum: string;
  angebote: KatalogAngebot[];
}
