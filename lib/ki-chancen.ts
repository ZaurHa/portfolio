// KI-Chancen: Wochenausgaben des KI-Kanals (BrandWerkX KI).
// Die Inhalte liegen in content/ki-chancen.json (neueste Ausgabe zuerst). Sonntags schreibt der KI-Kanal
// (~/.gbrain/ki-kanal, kanal.py --woche) dort eine neue Ausgabe hinein und legt einen PR an; live geht sie erst,
// wenn Zaur in Telegram auf „Veröffentlichen“ tippt. Nur belegte Angaben, keine Gedankenstriche.
import daten from "../content/ki-chancen.json";

export type Chance = {
  kategorie: string;
  titel: string;
  titelAkzent: string;
  neu: string;
  geld: string;
  schritt: string;
  punkte: number;
  angebot: string;
  werZahlt: string;
  werkzeuge: string;
  ersterEuro: string;
  aufwand: string;
  beachten: string;
  quelle: { name: string; url: string };
};

export type Ausgabe = {
  slug: string;
  nr: number;
  jahr: number;
  datum: string;
  datumIso: string;
  signale: number;
  kandidaten: number;
  strategie: number;
  bestanden: number;
  einordnung: string;
  chancen: Chance[];
  aussortiert: { idee: string; quelle: string; url: string; grund: string }[];
};

export const ausgaben: Ausgabe[] = daten.ausgaben;

/** Öffentlicher Telegram-Kanal, z. B. "https://t.me/brandwerkx_ki". Leer = Telegram-Hinweise ausblenden. */
export const TELEGRAM_KANAL: string = daten.telegram;

export const neuesteAusgabe = (): Ausgabe => ausgaben[0];

export const ausgabeZuSlug = (slug: string): Ausgabe | undefined => ausgaben.find((a) => a.slug === slug);

export const PRUEFUNG: [string, string][] = [
  ["Signale sammeln", "KI-Blogs, neue Modelle mit Preis, gefragte Werkzeuge und Kanäle zu Geld mit KI. Über 15 Quellen, jeden Tag."],
  ["Wie ein Unternehmer rechnen", "Wer zahlt wofür? Was kostet es? Geht es ohne Programmieren? Wann kommt der erste Euro?"],
  ["Zwei Kritiker", "Zwei unabhängige Prüfungen suchen Hype, Rechtsrisiken und Wunschdenken. Beide müssen zustimmen."],
  ["Meine Freigabe", "Ich lese jede Chance selbst, bevor sie erscheint. Was ich nicht vertreten kann, fliegt raus."],
];
