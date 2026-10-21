// KI-Chancen: Wochenausgaben des KI-Kanals (BrandWerkX KI).
// Die Daten stammen aus dem Prüflauf des KI-Kanals (~/.gbrain/ki-kanal): Signale → Vorfilter → Stratege →
// zwei Kritiker → Freigabe durch Zaur. Nur belegte Angaben, keine erfundenen Zahlen, keine Gedankenstriche.

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
  nr: number;
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

// Telegram-Kanal, sobald er angelegt ist (z. B. "https://t.me/brandwerkx_ki"); leer = Hinweis „startet bald“
export const TELEGRAM_KANAL = "";

export const ausgaben: Ausgabe[] = [
  {
    nr: 43,
    datum: "21.10.2026",
    datumIso: "2026-10-21",
    signale: 162,
    kandidaten: 9,
    strategie: 5,
    bestanden: 2,
    einordnung:
      "Beide Chancen dieser Woche drehen sich um dasselbe Problem: Kleine Betriebe verlieren Kunden, weil niemand rechtzeitig antwortet. Termin- und Anrufannahme lässt sich jetzt ohne Programmieren automatisieren.",
    chancen: [
      {
        kategorie: "Neue Dienstleistung",
        titel: "WhatsApp-Terminbot",
        titelAkzent: "für Studios und Werkstätten",
        neu: "Mit dem Automatisierungswerkzeug n8n und der offiziellen WhatsApp-Schnittstelle von Meta nimmt ein Bot Buchungen per WhatsApp an, bestätigt sie und verhindert Doppelbuchungen.",
        geld: "Kosmetikstudios, Werkstätten und Praxen verlieren Termine, weil Nachrichten liegen bleiben. Du richtest den Bot einmal ein und berechnest Einrichtung plus monatliche Betreuung.",
        schritt: "Richte die WhatsApp-Schnittstelle mit der Testnummer von Meta ein und bau den Buchungsablauf in n8n nach.",
        punkte: 9,
        angebot: "Buchungsbot einrichten, monatlich betreuen",
        werZahlt: "Kosmetikstudios, Werkstätten, Praxen",
        werkzeuge: "n8n, WhatsApp-Schnittstelle von Meta",
        ersterEuro: "In Wochen",
        aufwand: "Mittel, ohne Programmieren",
        beachten: "Geschäftsprüfung bei Meta, Auftragsverarbeitung nach DSGVO, 24-Stunden-Antwortfenster",
        quelle: { name: "Reddit r/n8n", url: "https://www.reddit.com/r/n8n/" },
      },
      {
        kategorie: "Neue Dienstleistung",
        titel: "Telefon-Assistent",
        titelAkzent: "der Anrufe und Termine annimmt",
        neu: "ElevenLabs hat Eleven Realtime vorgestellt: Sprachmodelle, die in unter einer Sekunde antworten. Gespräche mit einem KI-Assistenten laufen damit ohne lange Pausen.",
        geld: "Handwerker und Praxen verpassen Anrufe, während sie arbeiten. Ein Telefon-Assistent nimmt an, beantwortet Standardfragen und vergibt Termine. Du verkaufst Einrichtung plus laufende Betreuung.",
        schritt: "Bau in ElevenLabs einen Test-Assistenten für einen Betrieb aus deinem Umfeld und prüf, wie gut er Deutsch spricht.",
        punkte: 8,
        angebot: "Telefon-Assistent einrichten und betreuen",
        werZahlt: "Handwerk, Praxen, Kanzleien",
        werkzeuge: "ElevenLabs",
        ersterEuro: "In Wochen",
        aufwand: "Mittel, Telefonanbindung einplanen",
        beachten: "Als KI kenntlich machen, deutsche Stimme vorher testen",
        quelle: {
          name: "The Decoder",
          url: "https://the-decoder.de/elevenlabs-stellt-eleven-realtime-vor-speech-to-speech-modelle-mit-unter-einer-sekunde-latenz/",
        },
      },
    ],
    aussortiert: [
      {
        idee: "Woven Video",
        quelle: "Product Hunt",
        url: "https://www.producthunt.com/products/woven-video",
        grund: "Reines Schnitt-Werkzeug ohne eigene Geldidee, nur für Mac und am Starttag ungetestet.",
      },
      {
        idee: "Notion Auto",
        quelle: "Product Hunt",
        url: "https://www.producthunt.com/products/notion-99",
        grund: "Vage Büro-Automatisierung ohne konkreten zahlenden Anwendungsfall, Zahlen nur vom Hersteller.",
      },
      {
        idee: "Intelli für ChatGPT und Claude",
        quelle: "Product Hunt",
        url: "https://www.producthunt.com/products/intelli",
        grund: "Abhängig von einem fremden Plugin, dünner Geldwert und Datenschutz-Risiko bei Kunden-Chats.",
      },
    ],
  },
];

export const PRUEFUNG: [string, string][] = [
  ["Signale sammeln", "KI-Blogs, neue Modelle mit Preis, gefragte Werkzeuge und Kanäle zu Geld mit KI. Über 15 Quellen, jeden Tag."],
  ["Wie ein Unternehmer rechnen", "Wer zahlt wofür? Was kostet es? Geht es ohne Programmieren? Wann kommt der erste Euro?"],
  ["Zwei Kritiker", "Zwei unabhängige Prüfungen suchen Hype, Rechtsrisiken und Wunschdenken. Beide müssen zustimmen."],
  ["Meine Freigabe", "Ich lese jede Chance selbst, bevor sie erscheint. Was ich nicht vertreten kann, fliegt raus."],
];
