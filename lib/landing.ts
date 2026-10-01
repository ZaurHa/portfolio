/**
 * Inhalte der SEO-Landingpages unter /de/webdesign/<slug>.
 * Nur belegbare Aussagen verwenden (Preise/Fristen wie auf /leistungen).
 */
export type LandingKind = 'leistung' | 'branche' | 'ort';

export interface LandingFaq {
  q: string;
  a: string;
}

export interface LandingSection {
  title: string;
  text?: string;
  bullets?: string[];
}

export interface LandingPage {
  slug: string;
  kind: LandingKind;
  /** Kurzname für Listen und Verlinkung */
  label: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** Antwort-Absatz direkt unter der H1 (Wer, Was, Wo, Preis) */
  intro: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
  related: string[];
}

export const PHONE_DISPLAY = '0172 8471641';
export const PHONE_TEL = '+491728471641';

export const KIND_LABEL: Record<LandingKind, string> = {
  leistung: 'Leistungen',
  branche: 'Branchen',
  ort: 'Regionen',
};

export const landingPages: LandingPage[] = [
  // ---------------------------------------------------------------- Leistungen
  {
    slug: 'website-erstellen-lassen',
    kind: 'leistung',
    label: 'Website erstellen lassen',
    metaTitle: 'Website erstellen lassen – ab 490 € in 5 Tagen',
    metaDescription:
      'Website erstellen lassen ab 490 €: Muster-Website oder individuelle Lösung von BrandWerkX aus Geretsried. Festpreis, SEO inklusive, in 3–10 Tagen live.',
    eyebrow: 'Website erstellen lassen',
    h1: 'Website erstellen lassen — fertig in 5 Tagen, ab 490 €',
    intro:
      'BrandWerkX baut Websites für Handwerker, Selbstständige und kleine Unternehmen. Du wählst ein fertiges Design (ab 490 €) oder lässt dir eine individuelle Website bauen (ab 990 €). Mobil optimiert, SEO inklusive, meist in 3 bis 10 Werktagen online. Du hast einen festen Ansprechpartner: Zaur Hatuev aus Geretsried.',
    sections: [
      {
        title: 'Zwei Wege zur eigenen Website',
        bullets: [
          'Muster-Website ab 490 €: ein geprüftes Design wird mit deinem Logo, deinen Texten und Kontaktdaten angepasst. Fertig in 3–5 Werktagen.',
          'Custom-Website ab 990 €: Aufbau und Gestaltung nach deinen Vorstellungen, SEO-optimiert und mobile-first. Fertig in 7–14 Werktagen.',
          'Beides mit Kontaktformular, schneller Ladezeit und sauberer Grundlage für die Suche bei Google.',
        ],
      },
      {
        title: 'So läuft es ab',
        bullets: [
          'Design wählen oder kurz beschreiben, was du brauchst.',
          'Logo, Texte, Farben schicken — mehr brauche ich nicht von dir.',
          'Ich baue, du prüfst, wir gehen live.',
          'Übergabe mit Einführung und 30 Tagen Support.',
        ],
      },
      {
        title: 'Was im Preis steckt',
        text: 'Du zahlst einen festen Preis. Domain und Hosting sind im ersten Jahr enthalten, danach fallen je nach Anbieter etwa 10–15 € pro Monat an. Als Kleinunternehmer nach § 19 UStG weise ich keine Umsatzsteuer aus — die genannten Preise sind Endpreise.',
      },
    ],
    faqs: [
      { q: 'Was kostet es, eine Website erstellen zu lassen?', a: 'Eine Muster-Website startet bei 490 €, eine individuelle Custom-Website bei 990 €. SEO und Wartung gibt es ab 99 € pro Monat. Die Preise sind Festpreise und enthalten keine Umsatzsteuer (Kleinunternehmer nach § 19 UStG).' },
      { q: 'Wie lange dauert es, bis die Website online ist?', a: 'Eine Muster-Website ist in der Regel in 3–5 Werktagen fertig, eine Custom-Website in 7–14 Werktagen — sobald Logo, Texte und Bilder vorliegen.' },
      { q: 'Muss ich Texte und Bilder selbst liefern?', a: 'Du lieferst Logo, Kerninfos und vorhandene Fotos. Daraus entstehen die Seitentexte. Ich helfe dir, wenn noch etwas fehlt.' },
      { q: 'Gehört mir die Website nach der Übergabe?', a: 'Ja. Du bekommst die Zugangsdaten, eine kurze Einführung und 30 Tage Support. Danach kannst du selbst Änderungen vornehmen oder ein Wartungspaket buchen.' },
    ],
    related: ['website-kosten', 'seo-optimierung', 'handwerker', 'geretsried'],
  },
  {
    slug: 'website-kosten',
    kind: 'leistung',
    label: 'Was kostet eine Website?',
    metaTitle: 'Was kostet eine Website? Preise ab 490 € erklärt',
    metaDescription:
      'Was kostet eine Website für Selbstständige und kleine Unternehmen? Festpreise ab 490 €, laufende Kosten für Hosting und Wartung und was wirklich im Preis steckt.',
    eyebrow: 'Preise & Kosten',
    h1: 'Was kostet eine Website? Die Preise im Überblick',
    intro:
      'Eine Website für ein kleines Unternehmen kostet bei BrandWerkX ab 490 € (Muster-Website) oder ab 990 € (individuelle Custom-Website). Dazu kommen nur laufende Kosten für Hosting und Domain ab dem zweiten Jahr, etwa 10–15 € pro Monat, und optional Wartung ab 49 € pro Monat.',
    sections: [
      {
        title: 'Einmalige Kosten',
        bullets: [
          'Muster-Website: ab 490 €',
          'Custom-Website: ab 990 €',
          'Zusatzseiten: ab 99 € pro Seite',
          'Speed-Optimierung für bestehende Seiten: einmalig 199 €',
          'Google-Unternehmensprofil einrichten: einmalig 149 €',
        ],
      },
      {
        title: 'Laufende Kosten',
        bullets: [
          'Domain und Hosting: im ersten Jahr enthalten, danach etwa 10–15 € pro Monat je nach Anbieter.',
          'Wartung und Updates (optional): ab 49 € pro Monat.',
          'SEO und Wartung als Paket: ab 99 € pro Monat.',
        ],
      },
      {
        title: 'Worauf du beim Preisvergleich achten solltest',
        text: 'Frage immer nach Festpreis, Lieferzeit, mobiler Darstellung, Ladezeit und SEO-Grundlagen. Prüfe, ob Hosting und Domain im ersten Jahr enthalten sind und ob nach der Übergabe Support dabei ist. Bei BrandWerkX sind 30 Tage Support inklusive. Alle Preise sind Endpreise, weil ich als Kleinunternehmer nach § 19 UStG keine Umsatzsteuer ausweise.',
      },
    ],
    faqs: [
      { q: 'Warum sind Muster-Websites günstiger als individuelle Websites?', a: 'Bei der Muster-Website entfällt die Gestaltung von Grund auf. Du wählst ein fertiges, geprüftes Design und ich passe es an. Das spart Zeit und Kosten.' },
      { q: 'Gibt es versteckte Kosten?', a: 'Nein. Der Festpreis steht vorher fest. Laufende Kosten (Hosting nach dem ersten Jahr, optionale Wartung) nenne ich dir vor dem Start.' },
      { q: 'Wird Umsatzsteuer aufgeschlagen?', a: 'Nein. Als Kleinunternehmer nach § 19 UStG weise ich keine Umsatzsteuer aus. Die genannten Preise sind Endpreise.' },
    ],
    related: ['website-erstellen-lassen', 'seo-optimierung', 'landingpage-erstellen'],
  },
  {
    slug: 'seo-optimierung',
    kind: 'leistung',
    label: 'SEO-Optimierung',
    metaTitle: 'SEO für kleine Unternehmen – bei Google gefunden werden',
    metaDescription:
      'SEO-Optimierung für Handwerker und kleine Unternehmen: Technik, Inhalte, lokale Sichtbarkeit und Google-Unternehmensprofil. SEO & Wartung ab 99 € pro Monat.',
    eyebrow: 'SEO & Sichtbarkeit',
    h1: 'SEO-Optimierung für kleine Unternehmen',
    intro:
      'Bei BrandWerkX ist SEO kein Zusatz, sondern Teil jeder Website: saubere Technik, klare Seitentitel, schnelle Ladezeit und lokale Signale. Bestehende Websites optimiere ich im Paket „SEO & Wartung“ ab 99 € pro Monat. Ziel: Wer in deiner Region nach deiner Leistung sucht, soll dich finden.',
    sections: [
      {
        title: 'Was ich optimiere',
        bullets: [
          'Technik: Seitentitel, Beschreibungen, Überschriften, saubere URLs, Sitemap, mobile Darstellung.',
          'Geschwindigkeit: Ladezeit und Core Web Vitals, weil Google schnelle Seiten bevorzugt.',
          'Inhalte: Seiten, die zu echten Suchanfragen deiner Kunden passen, zum Beispiel „Heizungsbauer Geretsried“.',
          'Lokale Sichtbarkeit: einheitliche Angaben zu Name, Adresse und Telefon sowie ein Google-Unternehmensprofil, wo es möglich ist.',
          'Strukturierte Daten, damit Suchmaschinen und KI-Systeme dein Angebot eindeutig verstehen.',
        ],
      },
      {
        title: 'Einrichtung von Search Console',
        text: 'Ich richte die Google Search Console für deine Domain ein, reiche die Sitemap ein und zeige dir, welche Suchbegriffe Besucher zu dir bringen. Das braucht keinen Cookie-Banner.',
      },
      {
        title: 'Ehrlich gesagt',
        text: 'Niemand kann Platz 1 bei Google garantieren. Was ich garantiere, ist eine saubere technische Grundlage, passende Inhalte und messbare Daten, an denen wir die nächsten Schritte ausrichten.',
      },
    ],
    faqs: [
      { q: 'Was kostet SEO-Optimierung?', a: 'Das Paket SEO & Wartung beginnt bei 99 € pro Monat. Bei neuen Websites ist die SEO-Grundlage im Preis enthalten. Die Speed-Optimierung einer bestehenden Seite kostet einmalig 199 €.' },
      { q: 'Wie schnell sehe ich Ergebnisse?', a: 'Technische Verbesserungen wirken oft nach wenigen Wochen, neue Rankings brauchen meist zwei bis sechs Monate. Das hängt von Konkurrenz und Region ab.' },
      { q: 'Brauche ich ein Google-Unternehmensprofil?', a: 'Für lokale Suchen hilft es sehr. Google verlangt dafür einen echten Kundenkontakt. Ich prüfe mit dir, ob du die Voraussetzungen erfüllst, und richte das Profil dann ein.' },
      { q: 'Optimierst du auch für ChatGPT und KI-Suche?', a: 'Ja. Klare Antworten, strukturierte Daten, einheitliche Angaben und eine llms.txt machen deine Seite für KI-Systeme besser auffindbar und zitierfähig.' },
    ],
    related: ['website-kosten', 'handwerker', 'geretsried', 'muenchen'],
  },
  {
    slug: 'landingpage-erstellen',
    kind: 'leistung',
    label: 'Landingpage erstellen',
    metaTitle: 'Landingpage erstellen lassen – schnell, mobil, auf Anfragen ausgelegt',
    metaDescription:
      'Landingpage erstellen lassen: eine fokussierte Seite für ein Angebot, mit klarem Aufruf zur Anfrage. Schnell geladen, mobil optimiert, ab 490 €.',
    eyebrow: 'Landingpage',
    h1: 'Landingpage erstellen lassen',
    intro:
      'Eine Landingpage ist eine einzelne Seite mit einem Ziel: eine Anfrage, ein Anruf, ein Termin. BrandWerkX baut sie schnell, mobil optimiert und mit klarem Aufruf zur Aktion. Der Einstieg liegt bei 490 € als Muster-Seite, individuelle Lösungen ab 990 €.',
    sections: [
      {
        title: 'Wann sich eine Landingpage lohnt',
        bullets: [
          'Du bewirbst ein einzelnes Angebot oder eine Aktion.',
          'Du schaltest Anzeigen und brauchst ein klares Ziel für den Klick.',
          'Du startest und willst zuerst nur online sichtbar sein, bevor du eine große Website baust.',
        ],
      },
      {
        title: 'Was auf eine gute Landingpage gehört',
        bullets: [
          'Eine klare Überschrift, die das Angebot in einem Satz nennt.',
          'Nutzen statt Floskeln: was der Kunde davon hat.',
          'Vertrauenselemente wie Referenzen und Kontaktdaten.',
          'Ein deutlicher Kontakt-Button, am Handy mit einem Tipp erreichbar.',
        ],
      },
    ],
    faqs: [
      { q: 'Was ist der Unterschied zwischen Landingpage und Website?', a: 'Eine Website hat mehrere Seiten und bildet dein ganzes Angebot ab. Eine Landingpage ist eine einzelne, auf ein Ziel ausgerichtete Seite.' },
      { q: 'Wie lange dauert eine Landingpage?', a: 'Meist wenige Werktage, sobald Texte und Logo vorliegen.' },
      { q: 'Kann ich später zur vollen Website erweitern?', a: 'Ja. Zusatzseiten gibt es ab 99 € pro Seite, die Grundlage bleibt dieselbe.' },
    ],
    related: ['website-erstellen-lassen', 'website-kosten', 'kosmetikstudio'],
  },

  // ----------------------------------------------------------------- Branchen
  {
    slug: 'handwerker',
    kind: 'branche',
    label: 'Website für Handwerker',
    metaTitle: 'Website für Handwerker – Anfragen statt Visitenkarte',
    metaDescription:
      'Website für Handwerker ab 490 €: Klempner, Elektriker, Maler und mehr. Mobil optimiert, lokal bei Google auffindbar, Kontakt per Anruf oder WhatsApp.',
    eyebrow: 'Für Handwerker',
    h1: 'Website für Handwerker — gefunden werden, wenn der Kunde sucht',
    intro:
      'Wer einen Klempner, Elektriker oder Maler braucht, sucht auf dem Handy und ruft den ersten brauchbaren Betrieb an. BrandWerkX baut Handwerker-Websites ab 490 €, die schnell laden, deine Leistungen und dein Einzugsgebiet klar nennen und den Anruf oder die WhatsApp-Nachricht mit einem Tipp möglich machen.',
    sections: [
      {
        title: 'Was eine Handwerker-Website leisten muss',
        bullets: [
          'Leistungen und Einzugsgebiet auf einen Blick, zum Beispiel „Heizung, Sanitär und Notdienst in Geretsried, Wolfratshausen und München“.',
          'Telefonnummer und Kontaktformular auf jeder Seite, am Handy mit einem Tipp erreichbar.',
          'Referenzen mit Bildern und eine klare Übersicht der Leistungen.',
          'Schnelle Ladezeit, auch bei schlechtem Netz auf der Baustelle.',
          'Impressum und Datenschutz, damit dich niemand abmahnt.',
        ],
      },
      {
        title: 'Fertige Designs für dein Gewerk',
        text: 'Für Klempner und Elektriker gibt es fertige Muster-Designs in mehreren Varianten. Du suchst dir eines aus, ich passe es mit Logo, Farben und Texten an. So bist du in wenigen Tagen online. Die Designs findest du unter „Designs“ im Menü.',
      },
      {
        title: 'Lokal gefunden werden',
        text: 'Handwerk ist lokal. Deshalb bekommt jede Website Seiten und Titel mit Gewerk und Ort, einheitliche Angaben zu Name, Adresse und Telefon und auf Wunsch ein Google-Unternehmensprofil.',
      },
    ],
    faqs: [
      { q: 'Was kostet eine Website für Handwerker?', a: 'Ab 490 € als Muster-Website, ab 990 € als individuelle Website. Domain und Hosting sind im ersten Jahr enthalten.' },
      { q: 'Muss ich mich um Technik kümmern?', a: 'Nein. Ich richte Domain, Hosting, Kontaktformular und E-Mail-Weiterleitung ein und erkläre dir danach, wie du Texte selbst ändern kannst.' },
      { q: 'Kann ich meine Telefonnummer per WhatsApp erreichbar machen?', a: 'Ja. Ein Button für Anruf und WhatsApp gehört bei Handwerker-Websites zum Standard.' },
      { q: 'Hilft die Website bei der Suche in meinem Ort?', a: 'Ja, durch Seiten und Titel mit Gewerk und Ort sowie durch saubere lokale Angaben. Garantierte Platzierungen gibt es bei keinem seriösen Anbieter.' },
    ],
    related: ['website-erstellen-lassen', 'seo-optimierung', 'geretsried', 'muenchen'],
  },
  {
    slug: 'kosmetikstudio',
    kind: 'branche',
    label: 'Website für Kosmetikstudios',
    metaTitle: 'Website für Kosmetikstudios und Beauty-Betriebe',
    metaDescription:
      'Website für Kosmetikstudios und Beauty-Betriebe: elegantes Design, Preisübersicht, Behandlungen, Terminanfrage. Referenz: Zaira Beauty Face. Ab 490 €.',
    eyebrow: 'Für Beauty & Kosmetik',
    h1: 'Website für Kosmetikstudios und Beauty-Betriebe',
    intro:
      'Ein Beauty-Studio verkauft Vertrauen und Atmosphäre. BrandWerkX gestaltet Websites für Kosmetikstudios mit eleganter Optik, übersichtlicher Behandlungs- und Preisliste und einfacher Terminanfrage — ab 490 € als Muster-Design, individuell ab 990 €. Eine Referenz ist Zaira Beauty Face.',
    sections: [
      {
        title: 'Was ein Kosmetikstudio auf der Website braucht',
        bullets: [
          'Behandlungen und Preise übersichtlich, damit Kundinnen nicht erst anrufen müssen.',
          'Bilder, die Stimmung und Qualität des Studios zeigen.',
          'Terminanfrage per Formular, Telefon oder WhatsApp.',
          'Schnelle mobile Darstellung, denn die meisten Besucherinnen kommen vom Handy.',
        ],
      },
      {
        title: 'Referenz: Zaira Beauty Face',
        text: 'Für Zaira Beauty Face habe ich Rebranding und neue Website aus einer Hand umgesetzt: Strategie, Design und Entwicklung mit Next.js. Die Case Study zeigt Vorgehen und Ergebnis.',
      },
      {
        title: 'Passendes Design',
        text: 'Für Kosmetik gibt es fertige Muster-Designs in mehreren Varianten. Du wählst einen Stil, ich passe Farben, Texte und Bilder an dein Studio an.',
      },
    ],
    faqs: [
      { q: 'Was kostet eine Website für ein Kosmetikstudio?', a: 'Ab 490 € als Muster-Website, ab 990 € als individuelle Website. Zusatzseiten kosten ab 99 € pro Seite.' },
      { q: 'Wer ändert später meine Preise und Texte?', a: 'Nach der Übergabe kannst du Änderungen selbst vornehmen. Alternativ übernehme ich Änderungen im Wartungspaket ab 49 € pro Monat.' },
      { q: 'Ist die Website für Instagram verknüpfbar?', a: 'Ja. Social-Media-Profile lassen sich verlinken, ohne dass du Cookies oder Tracker einbinden musst.' },
    ],
    related: ['website-erstellen-lassen', 'landingpage-erstellen', 'muenchen'],
  },
  {
    slug: 'logistik-und-transport',
    kind: 'branche',
    label: 'Website für Logistik & Transport',
    metaTitle: 'Website für Logistik, Transport und Umzug',
    metaDescription:
      'Website für Logistik-, Transport- und Umzugsunternehmen: klare Leistungen, Anfrageformular, schnelle Ladezeit. Referenzen: MRG Trans & Logistik und Mobilwerk.',
    eyebrow: 'Für Logistik & Transport',
    h1: 'Website für Logistik, Transport und Umzug',
    intro:
      'Logistik- und Transportunternehmen gewinnen Kunden, wenn Leistungen, Fuhrpark und Einsatzgebiet schnell klar sind und eine Anfrage in zwei Minuten möglich ist. BrandWerkX baut solche Websites ab 990 €. Referenzen sind die Seite von MRG Trans & Logistik und Mobilwerk (Transport & Umzug).',
    sections: [
      {
        title: 'Was die Website zeigen sollte',
        bullets: [
          'Leistungen: Stückgut, Palettentransporte, Lagerung, Umzug und Einsatzgebiet.',
          'Ablauf einer Anfrage in wenigen Schritten.',
          'Ein Anfrageformular mit den wichtigsten Angaben (Strecke, Gut, Termin).',
          'Vertrauenselemente: Genehmigungen, Versicherungen und Referenzen, soweit du sie nachweisen kannst.',
        ],
      },
      {
        title: 'Referenzen',
        text: 'MRG Trans & Logistik GmbH hat eine neue Website erhalten, Mobilwerk ist mein eigenes Projekt für Transport & Umzug. Beide findest du unter „Projekte“.',
      },
      {
        title: 'Für Firmenkunden und Privatkunden',
        text: 'Firmenkunden suchen Zuverlässigkeit und Kapazität, Privatkunden suchen Preis und Termin. Die Website trennt beide Zielgruppen klar und führt zur passenden Anfrage.',
      },
    ],
    faqs: [
      { q: 'Was kostet eine Website für ein Logistikunternehmen?', a: 'Ab 990 € für eine individuelle Website mit mehreren Seiten, Formular und SEO-Grundlage. Der genaue Preis hängt vom Umfang ab.' },
      { q: 'Kann ich Anfragen direkt ins E-Mail-Postfach bekommen?', a: 'Ja. Das Formular schickt dir jede Anfrage per E-Mail und der Absender bekommt eine Bestätigung.' },
      { q: 'Kann die Website mehrsprachig sein?', a: 'Ja, mehrsprachige Websites sind möglich — diese Website gibt es zum Beispiel auf Deutsch und Englisch.' },
    ],
    related: ['website-erstellen-lassen', 'website-kosten', 'muenchen'],
  },

  // -------------------------------------------------------------------- Orte
  {
    slug: 'geretsried',
    kind: 'ort',
    label: 'Webdesign Geretsried',
    metaTitle: 'Webdesign Geretsried – Website vom Freelancer ab 490 €',
    metaDescription:
      'Webdesign in Geretsried: BrandWerkX, Zaur Hatuev. Websites für Handwerker und kleine Betriebe im Landkreis Bad Tölz-Wolfratshausen. Ab 490 €, SEO inklusive.',
    eyebrow: 'Webdesign Geretsried',
    h1: 'Webdesign aus Geretsried für Betriebe im Oberland',
    intro:
      'BrandWerkX sitzt in Geretsried (Steiner Ring 64, 82538 Geretsried). Ich baue Websites für Handwerker, Selbstständige und kleine Unternehmen aus Geretsried, Wolfratshausen, Bad Tölz und München — ab 490 €, fertig in 3 bis 10 Werktagen, SEO inklusive.',
    sections: [
      {
        title: 'Warum ein Webdesigner aus der Region',
        bullets: [
          'Ich kenne die Region und die Suchbegriffe, mit denen Kunden hier nach Betrieben suchen.',
          'Dein Ansprechpartner ist eine Person, erreichbar per Telefon (0172 8471641), E-Mail und WhatsApp.',
          'Antwort in der Regel innerhalb von 24 Stunden.',
        ],
      },
      {
        title: 'Für wen ich arbeite',
        text: 'Für Handwerksbetriebe, Dienstleister, Kosmetikstudios und kleine Unternehmen in Geretsried und im Landkreis Bad Tölz-Wolfratshausen. Die Zusammenarbeit läuft digital — das spart dir Zeit und hält den Preis niedrig.',
      },
      {
        title: 'Preise',
        text: 'Muster-Website ab 490 €, Custom-Website ab 990 €, SEO & Wartung ab 99 € pro Monat. Ich bin Kleinunternehmer nach § 19 UStG, alle Preise sind Endpreise.',
      },
    ],
    faqs: [
      { q: 'Arbeitest du auch mit Kunden außerhalb von Geretsried?', a: 'Ja, mit Kunden im Oberland, in München und deutschlandweit. Besprechungen laufen per Telefon, Video oder WhatsApp.' },
      { q: 'Wie komme ich in Kontakt?', a: 'Per Telefon unter 0172 8471641, per E-Mail an brandwerkx@gmail.com, über WhatsApp oder das Kontaktformular auf dieser Website.' },
      { q: 'Was kostet eine Website in Geretsried?', a: 'Ab 490 € für die Muster-Website, ab 990 € für eine individuelle Website. Die Preise sind überall gleich.' },
    ],
    related: ['oberland', 'muenchen', 'handwerker', 'website-erstellen-lassen'],
  },
  {
    slug: 'oberland',
    kind: 'ort',
    label: 'Webdesign Wolfratshausen & Bad Tölz',
    metaTitle: 'Webdesign Wolfratshausen, Bad Tölz und Oberland',
    metaDescription:
      'Webdesign für Wolfratshausen, Bad Tölz, Penzberg und das Oberland: Websites für Handwerker und kleine Betriebe ab 490 €. BrandWerkX aus Geretsried.',
    eyebrow: 'Webdesign Oberland',
    h1: 'Webdesign für Wolfratshausen, Bad Tölz und das Oberland',
    intro:
      'Betriebe in Wolfratshausen, Bad Tölz, Penzberg und dem restlichen Oberland brauchen eine Website, die bei Suchen vor Ort gefunden wird. BrandWerkX aus Geretsried baut sie ab 490 €: schnell, mobil optimiert, mit Gewerk und Ort in den Titeln und sauberen lokalen Angaben.',
    sections: [
      {
        title: 'Lokale Suchen im Oberland',
        bullets: [
          'Kunden suchen nach Gewerk plus Ort, zum Beispiel „Elektriker Wolfratshausen“ oder „Heizungsbauer Bad Tölz“.',
          'Deine Website sollte genau diese Kombination in Titel, Überschrift und Text nennen.',
          'Dazu gehören einheitliche Angaben zu Name, Adresse und Telefon.',
        ],
      },
      {
        title: 'Einzugsgebiet sichtbar machen',
        text: 'Ich zeige dein Einzugsgebiet auf der Website klar, ohne dass Texte künstlich aufgebläht werden. Ein sauberer Abschnitt „Wir sind tätig in …“ reicht und liest sich für Kunden und Suchmaschinen gleich gut.',
      },
    ],
    faqs: [
      { q: 'Für welche Orte baust du Websites?', a: 'Für alle Orte im Landkreis Bad Tölz-Wolfratshausen, im Münchner Umland und für Betriebe deutschlandweit.' },
      { q: 'Muss ich zu dir kommen?', a: 'Nein. Wir besprechen alles per Telefon, Video oder WhatsApp. Das spart Zeit.' },
      { q: 'Was kostet eine Website für meinen Betrieb im Oberland?', a: 'Ab 490 € (Muster-Website) oder ab 990 € (Custom-Website), Endpreise ohne Umsatzsteuer nach § 19 UStG.' },
    ],
    related: ['geretsried', 'handwerker', 'seo-optimierung'],
  },
  {
    slug: 'muenchen',
    kind: 'ort',
    label: 'Webdesign München',
    metaTitle: 'Webdesign München – Website für kleine Unternehmen ab 490 €',
    metaDescription:
      'Webdesign für München: Websites für Selbstständige, Handwerker und kleine Betriebe ab 490 €. BrandWerkX arbeitet digital und schnell, SEO inklusive.',
    eyebrow: 'Webdesign München',
    h1: 'Webdesign für München — Websites für kleine Unternehmen',
    intro:
      'BrandWerkX baut Websites für Selbstständige, Handwerker und kleine Unternehmen in München — ab 490 €. Die Zusammenarbeit läuft digital per Telefon, Video und WhatsApp, das hält Preis und Aufwand niedrig. Mein Sitz ist Geretsried, rund 30 Kilometer südlich von München.',
    sections: [
      {
        title: 'Warum nicht die große Agentur',
        bullets: [
          'Du sprichst direkt mit dem Menschen, der deine Website baut.',
          'Festpreis ab 490 € statt Stundensatz und Projektmanagement-Aufschlag.',
          'Fertig in 3 bis 10 Werktagen.',
        ],
      },
      {
        title: 'Für München besonders wichtig',
        text: 'In München ist die Konkurrenz um lokale Suchbegriffe groß. Deshalb zählen Stadtteil-Angaben, klare Leistungsseiten, schnelle Ladezeit und konsistente Daten. Ich baue die Grundlage dafür in jede Website ein.',
      },
    ],
    faqs: [
      { q: 'Wo sitzt BrandWerkX?', a: 'In Geretsried (82538), südlich von München. München gehört zu meinem Einzugsgebiet, Besprechungen laufen digital.' },
      { q: 'Was kostet Webdesign in München bei BrandWerkX?', a: 'Ab 490 € für eine Muster-Website, ab 990 € für eine individuelle Website. Der Preis ist unabhängig vom Standort.' },
      { q: 'Kann ich vor dem Start sprechen?', a: 'Ja. Das Erstgespräch ist kostenlos und unverbindlich — telefonisch unter 0172 8471641 oder per Formular.' },
    ],
    related: ['geretsried', 'handwerker', 'kosmetikstudio', 'seo-optimierung'],
  },
];

export function getLanding(slug: string): LandingPage | undefined {
  return landingPages.find((p) => p.slug === slug);
}
