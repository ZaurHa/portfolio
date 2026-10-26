/**
 * Deutsche Inhalte der Lösungsseiten unter /de/loesungen/<slug> und der Katalog aller Angebote.
 * Faktenbasis: Recherche „Neue Angebote für BrandWerkX“ (Stand Oktober 2026).
 * Regeln: nur belegbare Aussagen, Preise nur wie freigegeben (Vorschläge, Zaur bestätigt sie in der Vorschau),
 * keine Gedankenstriche, Überschriften ohne Schlusspunkt, keine Kundennamen, keine Lieferzeit-Versprechen,
 * Technik statt Rechts- oder Steuerberatung.
 */
import type { Loesung, KatalogFamilie } from "./loesungen-typen";

export const loesungenDe: Loesung[] = [
  // ------------------------------------------------------------ Erreichbarkeit
  {
    key: "ki-telefon",
    lang: "de",
    slug: "ki-telefonassistent",
    label: "KI-Telefonassistent",
    familie: "Erreichbarkeit",
    metaTitle: "KI-Telefonassistent für Betriebe | ab 490 €",
    metaDescription:
      "KI-Telefonassistent für Handwerk, Werkstatt und Umzug: nimmt Anrufe an, fragt das Wichtige ab und schickt dir eine Notiz. Ab 490 €, Betrieb ab 99 € im Monat.",
    eyebrow: "KI · Erreichbarkeit",
    h1: "KI-Telefonassistent für Betriebe, die nicht immer rangehen können",
    intro:
      "Ein KI-Telefonassistent nimmt Anrufe an, wenn du auf der Baustelle, unter dem Auto oder mitten im Umzug bist. Er fragt ab, was du für den Auftrag brauchst, und schickt dir eine Notiz per E-Mail oder, wenn du willst, per Telegram. Die Einrichtung kostet ab 490 €, Betrieb und Betreuung ab 99 € im Monat.",
    preise: [
      { betrag: "ab 490 €", wofuer: "Einrichtung, einmalig" },
      { betrag: "ab 99 € im Monat", wofuer: "Betrieb und Betreuung, Minutenkontingent nach Absprache" },
    ],
    fuer: ["Handwerksbetriebe", "Kfz-Werkstätten", "Umzugsunternehmen", "Hausverwaltungen", "Bestatter", "Tierarztpraxen"],
    sections: [
      {
        title: "Was der Assistent am Telefon erledigt",
        bullets: [
          "Er meldet sich mit deinem Firmennamen und sagt gleich zu Beginn, dass hier eine KI spricht.",
          "Er fragt ab, was in deiner Branche zählt: beim Umzug Etage, Volumen und Wunschtermin, in der Werkstatt Fahrzeug und Fehlerbild.",
          "Nach dem Gespräch bekommst du eine kurze Zusammenfassung per E-Mail oder, wenn du willst, per Telegram. Für Kundendaten ist E-Mail die sicherere Wahl.",
          "Auf Wunsch trägt er Termine direkt in deinen Kalender ein.",
          "Dringende Anrufe leitet er auf dein Handy weiter. Wer lieber mit einem Menschen spricht, kann das jederzeit sagen.",
        ],
      },
      {
        title: "Wie ich das umsetze",
        text: "Ich baue keine eigene Sprachplattform. Ich richte den Assistenten auf einer Plattform mit Servern in der EU ein, schreibe die Gesprächsführung für deinen Betrieb und betreue ihn danach. In den ersten Wochen lese ich die Gesprächszusammenfassungen mit und bessere nach, wo der Assistent falsch abbiegt. Für Störungen am Tag ist zusätzlich der Support der Plattform da, und die Rufumleitung auf dein Handy gehört zu jedem Paket.",
      },
      {
        title: "Was er nicht tut",
        bullets: [
          "Er ruft niemanden an. Ich richte nur Assistenten für eingehende Anrufe ein.",
          "Er nennt nur Preise und Angaben, die du vorher freigegeben hast.",
          "Er berät nicht im Einzelfall. Fachfragen landen als Notiz bei dir.",
        ],
      },
      {
        title: "Recht und Datenschutz",
        bullets: [
          "Seit dem 2. August 2026 muss sich ein Telefonbot zu Beginn des Gesprächs als KI zu erkennen geben (Art. 50 KI-Verordnung). Ein Hinweis im Impressum reicht nicht.",
          "Gespräche werden nur aufgezeichnet, wenn der Anrufer vorher zustimmt. Ohne Einwilligung ist eine Aufzeichnung strafbar (§ 201 StGB).",
          "Die Plattform läuft auf Servern in der EU. Wir schließen einen Auftragsverarbeitungsvertrag (AVV), der auch die Plattform einschließt.",
          "Für deine Datenschutzerklärung bekommst du die technischen Angaben von mir. Die rechtliche Prüfung im Einzelfall übernimmt dein Anwalt oder Datenschutzbeauftragter.",
        ],
      },
    ],
    ablauf: [
      "Erstgespräch: Wir klären, welche Anrufe reinkommen, was der Assistent fragen soll und wohin die Notizen gehen.",
      "Einrichtung: Ich richte den Assistenten ein, schreibe die Gesprächsführung und teste ihn mit dir am Telefon.",
      "Start mit Kontrolle: In den ersten Wochen lese ich die Zusammenfassungen mit und bessere nach.",
      "Betreuung: Ändern sich Preise, Leistungen oder Öffnungszeiten, passe ich den Assistenten an.",
    ],
    faqs: [
      {
        q: "Was kostet ein KI-Telefonassistent?",
        a: "Bei mir kostet die Einrichtung ab 490 € einmalig, Betrieb und Betreuung ab 99 € im Monat. Wie viele Gesprächsminuten im Monat enthalten sind, legen wir vorher fest. Als Kleinunternehmer nach § 19 UStG weise ich keine Umsatzsteuer aus, die Preise sind Endpreise.",
      },
      {
        q: "Ist ein KI-Telefonassistent DSGVO-konform?",
        a: "Er lässt sich datenschutzkonform betreiben, wenn Server, Verträge und Hinweise stimmen. Ich nutze eine Plattform mit Servern in der EU und schließe mit dir einen Auftragsverarbeitungsvertrag (AVV), der auch die Plattform einschließt. Gespräche werden nur mit vorheriger Einwilligung aufgezeichnet. Ob dein Betrieb darüber hinaus etwas beachten muss, klärt dein Anwalt oder Datenschutzbeauftragter.",
      },
      {
        q: "Muss der Anrufer wissen, dass er mit einer KI spricht?",
        a: "Ja. Seit dem 2. August 2026 muss sich ein Telefonbot zu Beginn des Gesprächs als KI zu erkennen geben (Art. 50 KI-Verordnung). Ein Hinweis im Impressum reicht dafür nicht. Mein Assistent sagt es deshalb gleich im ersten Satz.",
      },
      {
        q: "Kann ein KI-Telefonassistent Termine vereinbaren?",
        a: "Ja, wenn dein Kalender angebunden ist. Der Assistent schlägt freie Zeiten vor und trägt den Termin ein, oder er notiert nur den Wunschtermin und du bestätigst selbst. Was besser zu deinem Betrieb passt, entscheiden wir im Erstgespräch.",
      },
      {
        q: "Was passiert bei einem dringenden Anruf?",
        a: "Dringende Anrufe leitet der Assistent auf dein Handy weiter. Welche Anliegen als dringend gelten, legen wir vorher fest, zum Beispiel ein Wasserschaden oder ein liegengebliebenes Fahrzeug. Alles andere kommt als Notiz zu dir.",
      },
      {
        q: "Was macht der Assistent, wenn er eine Frage nicht beantworten kann?",
        a: "Er sagt das offen und nimmt einen Rückrufwunsch auf. Er nennt nur Angaben, die du vorher freigegeben hast, und erfindet keine Preise. Die Frage kommt als Notiz zu dir, und du rufst selbst zurück.",
      },
      {
        q: "Kann der KI-Telefonassistent auch Kunden anrufen?",
        a: "Nein. Ich richte nur Assistenten für eingehende Anrufe ein. Ausgehende Anrufe mit KI-Stimme biete ich nicht an.",
      },
      {
        q: "Wer hilft, wenn tagsüber etwas nicht funktioniert?",
        a: "Für Störungen am Tag ist der Support der Plattform da, und die Rufumleitung auf dein Handy greift weiter. Änderungen am Assistenten erledige ich meist am selben Abend oder am nächsten Werktag. Die Reaktionszeit halten wir im Angebot schriftlich fest.",
      },
    ],
    related: ["ki-chatbot", "buero-automatisierung", "google-profil"],
    thema: "KI-Telefonassistent",
  },
  {
    key: "ki-chatbot",
    lang: "de",
    slug: "ki-chatbot",
    label: "KI-Chatbot für die Website",
    familie: "Erreichbarkeit",
    metaTitle: "KI-Chatbot für die Website | ab 500 €",
    metaDescription:
      "KI-Chatbot für deine Website: beantwortet Kundenfragen aus geprüften Inhalten, nimmt Anfragen auf und leitet sie weiter. Ab 500 €, Pflege ab 29 € im Monat.",
    eyebrow: "KI · Erreichbarkeit",
    h1: "KI-Chatbot für die Website, der aus deinen eigenen Inhalten antwortet",
    intro:
      "Ein KI-Chatbot beantwortet auf deiner Website die Fragen, die Kunden immer wieder stellen: Leistungen, Ablauf, Einzugsgebiet, Öffnungszeiten. Er antwortet aus Inhalten, die du geprüft hast, nimmt Anfragen auf und schickt sie dir per E-Mail oder, wenn du willst, per Telegram. Die Einrichtung kostet ab 500 €, Betrieb und Pflege der Wissensbasis ab 29 € im Monat.",
    preise: [
      { betrag: "ab 500 €", wofuer: "Einrichtung, einmalig" },
      { betrag: "ab 29 € im Monat", wofuer: "Betrieb und Pflege der Wissensbasis" },
    ],
    fuer: ["Handwerksbetriebe", "Kosmetik- und Beautystudios", "Umzugsunternehmen", "Kfz-Werkstätten", "Dienstleister mit vielen Standardfragen"],
    sections: [
      {
        title: "Was im Preis enthalten ist",
        bullets: [
          "Eine Wissensbasis aus deiner Website und weiteren Unterlagen, die du freigibst, zum Beispiel Preisliste oder Ablauf.",
          "Der Einbau auf deiner Website, passend zum Design.",
          "Der Hinweis in der ersten Nachricht, dass hier eine KI antwortet.",
          "Anfragen mit Name, Kontakt und Anliegen kommen per E-Mail zu dir, auf Wunsch auch per Telegram.",
          "Die Pflege der Wissensbasis im Monatspreis, in einem Umfang, den wir vorher festlegen.",
        ],
      },
      {
        title: "So bleiben die Antworten richtig",
        text: "Der Chatbot antwortet aus einer geprüften Wissensbasis. Steht etwas nicht drin, sagt er das und bietet an, die Frage an dich weiterzugeben. Preise und Termine nennt er nur, wenn sie in der Wissensbasis stehen. Ändert sich ein Preis oder eine Öffnungszeit, passe ich die Wissensbasis an. Betreue ich auch deine Website, nutzt der Bot dieselben Inhalte wie die Seite.",
      },
      {
        title: "Recht und Datenschutz",
        bullets: [
          "Seit dem 2. August 2026 muss sich ein Chatbot zu Beginn des Gesprächs als KI zu erkennen geben (Art. 50 KI-Verordnung). Das baue ich in jeden Bot ein.",
          "Anfragen enthalten personenbezogene Daten. Ich setze auf Anbieter mit Hosting in der EU.",
          "Wir schließen einen Auftragsverarbeitungsvertrag (AVV), der den Modell- und den Hosting-Anbieter einschließt.",
          "Für deine Datenschutzerklärung bekommst du die technischen Angaben von mir. Die rechtliche Prüfung übernimmt dein Anwalt oder Datenschutzbeauftragter.",
        ],
      },
      {
        title: "Auch auf WhatsApp, mit klaren Regeln",
        text: "Seit dem 15. Januar 2026 verbietet WhatsApp allgemeine KI-Assistenten. Firmeneigene Service-Bots bleiben erlaubt, etwa für Terminbestätigungen, Statusmeldungen wie „Dein Auto ist fertig“ oder die Erinnerung an den Umzugstermin. Meta berechnet für solche Nachrichten Gebühren, die ich zum Einkaufspreis weitergebe. Ein WhatsApp-Bot lohnt sich, wenn dein Betrieb wirklich viele Nachrichten verschickt. Meta kann Preise und Regeln jederzeit ändern.",
      },
    ],
    ablauf: [
      "Erstgespräch: Wir klären, welche Fragen deine Kunden stellen und wohin Anfragen gehen sollen.",
      "Wissensbasis: Ich sammle die Inhalte, du prüfst sie und gibst sie frei.",
      "Einbau und Test: Der Bot kommt auf deine Website, wir testen ihn mit echten Kundenfragen.",
      "Betrieb und Pflege: Ich halte die Wissensbasis aktuell und schaue, welche Fragen offen bleiben.",
    ],
    faqs: [
      {
        q: "Was kostet ein KI-Chatbot für die Website?",
        a: "Bei mir kostet die Einrichtung ab 500 € einmalig, Betrieb und Pflege der Wissensbasis ab 29 € im Monat. Der genaue Preis hängt davon ab, wie viele Inhalte der Bot kennen soll und wohin die Anfragen gehen. Die Preise sind Endpreise nach § 19 UStG.",
      },
      {
        q: "Ist ein Chatbot auf der Website DSGVO-konform?",
        a: "Er lässt sich datenschutzkonform betreiben, wenn Hosting, Verträge und Hinweise stimmen. Ich setze auf Anbieter mit Hosting in der EU und schließe einen Auftragsverarbeitungsvertrag (AVV), der Modell- und Hosting-Anbieter einschließt. Die rechtliche Prüfung im Einzelfall übernimmt dein Anwalt oder Datenschutzbeauftragter.",
      },
      {
        q: "Muss ein Chatbot als KI gekennzeichnet sein?",
        a: "Ja. Seit dem 2. August 2026 muss sich ein Chatbot zu Beginn des Gesprächs als KI zu erkennen geben (Art. 50 KI-Verordnung). Ein Hinweis im Impressum reicht nicht. Mein Chatbot sagt es deshalb in der ersten Nachricht.",
      },
      {
        q: "Kann ein KI-Chatbot falsche Antworten geben?",
        a: "Ganz ausschließen kann das niemand, aber das Risiko lässt sich klein halten. Mein Chatbot antwortet aus einer Wissensbasis, die du geprüft hast, und gibt Fragen, die er nicht beantworten kann, an dich weiter. Preise und Termine nennt er nur, wenn sie dort stehen.",
      },
      {
        q: "Was ist der Unterschied zwischen Chatbot und Kontaktformular?",
        a: "Beim Kontaktformular wartet der Kunde, bis du antwortest. Der Chatbot beantwortet Standardfragen sofort und nimmt trotzdem eine Anfrage auf, wenn der Kunde mehr will. Das Formular bleibt auf der Seite, für alle, die lieber ohne Chat anfragen.",
      },
      {
        q: "Kann der Chatbot auch auf WhatsApp antworten?",
        a: "Ja, als Service-Bot für deinen Betrieb. Seit dem 15. Januar 2026 verbietet WhatsApp allgemeine KI-Assistenten, firmeneigene Service-Bots für Termine, Status und Fragen zu deinem Angebot bleiben aber erlaubt. Dazu kommen die Nachrichtengebühren von Meta, die ich zum Einkaufspreis weitergebe.",
      },
      {
        q: "Wie viel Pflege braucht ein Chatbot?",
        a: "Wenig, wenn die Inhalte sauber sind. Die Pflege der Wissensbasis steckt im Monatspreis, in einem Umfang, den wir vorher festlegen. Neue Preise, Leistungen oder Öffnungszeiten schickst du mir, ich trage sie ein.",
      },
    ],
    related: ["ki-telefon", "website-betreuung", "buero-automatisierung"],
    thema: "KI-Chatbot",
  },

  // ------------------------------------------------------------------ Personal
  {
    key: "recruiting",
    lang: "de",
    slug: "mitarbeiter-finden",
    label: "Recruiting-Paket",
    familie: "Personal",
    metaTitle: "Mitarbeiter finden: Recruiting-Paket | ab 990 €",
    metaDescription:
      "Mitarbeiter finden mit eigener Karriereseite und Kurzbewerbung in 60 Sekunden, ohne Lebenslauf. Recruiting-Paket für kleine Betriebe zum Festpreis ab 990 €.",
    eyebrow: "Personal · Recruiting",
    h1: "Mitarbeiter finden mit Karriereseite und Kurzbewerbung",
    intro:
      "Das Recruiting-Paket bringt deine offenen Stellen auf eine eigene Karriereseite, mit Kurzbewerbung in 60 Sekunden und ohne Lebenslauf. Jede Bewerbung kommt sofort per E-Mail bei dir an, auf Wunsch auch per Telegram, der Bewerber bekommt automatisch eine Antwort. Das Paket gibt es zum Festpreis ab 990 €, die Pflege der Stellen optional ab 49 € im Monat.",
    preise: [
      { betrag: "ab 990 €", wofuer: "Recruiting-Paket, einmalig" },
      { betrag: "ab 49 € im Monat", wofuer: "Pflege der Stellen, optional" },
    ],
    fuer: ["Logistik und Transport", "Zeitarbeit und Personaldienstleister", "Handwerksbetriebe", "Ambulante Pflegedienste", "Praxis- und Kanzleiteams"],
    sections: [
      {
        title: "Was im Recruiting-Paket steckt",
        text: "Vorlage ist die Jobseite, die ich für einen Personaldienstleister in der Logistik gebaut habe, mit eigenen Seiten für Staplerfahrer und Saisonpersonal.",
        bullets: [
          "Eine Karriereseite je Beruf, zum Beispiel für Fahrer mit passender Führerscheinklasse und Code 95, für Pflegekräfte, zahnmedizinische Fachangestellte oder Azubis.",
          "Kurzbewerbung in 60 Sekunden: Name, Kontakt und ein paar Fragen zum Beruf, kein Lebenslauf nötig.",
          "Stellendaten für Google for Jobs, damit deine Stelle in der Google-Jobsuche erscheinen kann.",
          "Eine Meldung per E-Mail, auf Wunsch auch per Telegram, sobald eine Bewerbung eingeht. Bewerberdaten schicke ich lieber per E-Mail.",
          "Eine automatische Antwort an den Bewerber, damit niemand ohne Rückmeldung bleibt.",
        ],
      },
      {
        title: "Optional: Pflege der Stellen",
        text: "Ab 49 € im Monat halte ich deine Stellen aktuell, stelle sie als Gratisanzeige bei Indeed und in der Jobbörse der Bundesagentur für Arbeit ein und schicke dir einmal im Monat einen kurzen Bericht zu den Bewerbungen. Das Werbebudget für bezahlte Anzeigen läuft immer über dein eigenes Konto.",
      },
      {
        title: "Daten und Regeln",
        bullets: [
          "Bewerberdaten sind personenbezogen. Sie liegen auf Servern in der EU, wir schließen einen Auftragsverarbeitungsvertrag (AVV) und legen Löschfristen fest.",
          "Das Formular bekommt einen Datenschutzhinweis. Die rechtliche Prüfung übernimmt dein Anwalt oder Datenschutzbeauftragter.",
          "Google for Jobs verlangt Pflichtangaben wie Titel, Ort und Datum und lässt keine Anzeigen zu, bei denen Bewerber zahlen müssen.",
          "Indeed nimmt Agenturen von den Gratisanzeigen aus. Ob das deinen Betrieb betrifft, prüfen wir vorab.",
        ],
      },
      {
        title: "Was das Paket nicht ist",
        text: "Keine Agentur mit laufender Kampagnenbetreuung und kein Versprechen, dass sich eine bestimmte Zahl an Leuten bewirbt. Das Paket sorgt dafür, dass eine Bewerbung leicht ist und schnell bei dir ankommt. Für eine dringende Stelle kann eine Kampagne bei Meta helfen, das Werbebudget läuft dann über dein eigenes Werbekonto.",
      },
    ],
    ablauf: [
      "Erstgespräch: Wir klären, welche Stellen offen sind und was Bewerber wissen müssen.",
      "Aufbau: Ich baue Karriereseite und Kurzbewerbung, du prüfst die Texte.",
      "Start: Die Stellen gehen online, jede Bewerbung kommt sofort bei dir an.",
      "Pflege, wenn du willst: Ich halte die Stellen aktuell und berichte einmal im Monat.",
    ],
    faqs: [
      {
        q: "Was kostet ein Recruiting-Paket?",
        a: "Bei mir kostet das Recruiting-Paket ab 990 € einmalig zum Festpreis. Die Pflege der Stellen ist optional und kostet ab 49 € im Monat. Schaltest du bezahlte Anzeigen, kommt das Werbebudget dazu, und es läuft über dein eigenes Konto.",
      },
      {
        q: "Wie finde ich als kleiner Betrieb Mitarbeiter?",
        a: "Indem du es Bewerbern so leicht wie möglich machst. Eine klare Stellenseite, eine Bewerbung ohne Lebenslauf und eine schnelle Antwort senken die Hürde. Dazu kommen kostenlose Wege wie die Jobbörse der Bundesagentur für Arbeit und die Google-Jobsuche.",
      },
      {
        q: "Was ist eine Kurzbewerbung?",
        a: "Eine Bewerbung in etwa 60 Sekunden, ohne Lebenslauf und Anschreiben. Der Bewerber gibt Name und Kontakt an und beantwortet ein paar Fragen zum Beruf, etwa zur Führerscheinklasse. Den Rest klärst du im Gespräch.",
      },
      {
        q: "Erscheint meine Stelle bei Google for Jobs?",
        a: "Sie kann dort erscheinen, wenn die Pflichtangaben stimmen. Die Karriereseite bekommt die Stellendaten, die Google verlangt, zum Beispiel Titel, Ort und Datum. Ob und wo Google die Stelle anzeigt, entscheidet Google selbst.",
      },
      {
        q: "Wie läuft der Datenschutz bei Bewerbungen?",
        a: "Bewerberdaten liegen auf Servern in der EU, und wir schließen einen Auftragsverarbeitungsvertrag (AVV). Wir legen fest, wann Bewerbungen gelöscht werden, und das Formular bekommt einen Datenschutzhinweis. Die rechtliche Prüfung übernimmt dein Anwalt oder Datenschutzbeauftragter.",
      },
      {
        q: "Funktioniert das Recruiting-Paket auch für Azubis?",
        a: "Ja, mit einer eigenen Seite für die Ausbildung. Die Kurzbewerbung funktioniert auf dem Handy und braucht keinen Lebenslauf. Was Azubis bei dir lernen und wie die Ausbildung abläuft, steht klar auf der Seite.",
      },
      {
        q: "Brauche ich für das Recruiting eine neue Website?",
        a: "Nein. Die Karriereseite kann Teil deiner bestehenden Website werden oder als eigene Seite laufen. Habe ich deine Website gebaut, passt die Karriereseite direkt ins Design.",
      },
    ],
    related: ["web-apps", "google-profil", "ki-chatbot"],
    thema: "Recruiting-Paket",
  },

  // ------------------------------------------------------------------- Abläufe
  {
    key: "web-apps",
    lang: "de",
    slug: "web-app-entwickeln-lassen",
    label: "Web-App für deinen Betrieb",
    familie: "Abläufe",
    metaTitle: "Web-App entwickeln lassen | Festpreis, Förderung möglich",
    metaDescription:
      "Web-App entwickeln lassen: Auftragsmappe, Fahrer-App oder Kundenportal statt Zettel und Excel. Festpreis nach Erstgespräch, in Bayern bis 50 % Zuschuss möglich.",
    eyebrow: "Apps · Abläufe",
    h1: "Web-App entwickeln lassen: Abläufe statt Zettel und Excel",
    intro:
      "Eine Web-App ersetzt Zettel, Excel-Listen und Messenger-Gruppen durch einen klaren Ablauf, der auf jedem Handy läuft. Ich baue sie für kleine Betriebe, bei denen Standardsoftware nicht passt, zum schriftlichen Festpreis nach einem kostenlosen Erstgespräch. In Bayern kann der Digitalbonus bis zur Hälfte der Kosten übernehmen, wenn die Voraussetzungen erfüllt sind.",
    preise: [
      { betrag: "Festpreis nach Erstgespräch", wofuer: "schriftlich vereinbart, bevor es losgeht; der Umfang bestimmt den Preis" },
      { betrag: "bis 50 % Zuschuss", wofuer: "über den Digitalbonus Bayern, wenn die Voraussetzungen erfüllt sind" },
    ],
    fuer: ["Umzug und Logistik", "Handwerksbetriebe", "Reinigung und Hausmeisterdienste", "Zeitarbeitsfirmen", "Reparatur- und Aufbereitungsbetriebe", "Studios und lokale Händler"],
    sections: [
      {
        title: "Beispiele, die ich baue",
        text: "Ich betreibe auch eigene Web-Apps, darunter ein Fachnetzwerk mit Daten in Frankfurt und eine Social-App für iOS und Web.",
        bullets: [
          "Digitale Auftragsmappe: Aufträge, Fotos und Unterschrift auf dem Handy, Übergabe- oder Schadensprotokoll als PDF, Export in eine Tabelle.",
          "Fahrer-App: Abfahrtskontrolle mit Mängelfoto, Ablieferbeleg mit Unterschrift und Erinnerung an Fristen wie Hauptuntersuchung, Tacho und Führerscheinkontrolle.",
          "Stundenzettel mit Freigabe: Mitarbeiter erfassen Zeiten, der Einsatzkunde bestätigt per Link, der Export geht an die Lohnabrechnung.",
          "Auftrags- und Statusportal: Geschäftskunden legen Aufträge mit Fotos an, sehen den Status und bekommen Protokolle als PDF.",
          "Bewerber- und Einsatzportal: Kurzbewerbung, Upload von Dokumenten und Checkliste für die Einarbeitung.",
          "Kunden-App als Web-App (PWA): Buchen, Bestellen und Treuepunkte, ohne Umweg über den App Store.",
        ],
      },
      {
        title: "Was eine Web-App kostet",
        text: "Den Preis bestimmt der Umfang: wie viele Abläufe, Nutzer und Schnittstellen die App braucht. Nach einem kostenlosen Erstgespräch bekommst du einen schriftlichen Festpreis, bevor irgendetwas beginnt. Darin stehen auch die laufenden Kosten für Hosting, Updates und Sicherheitsprüfungen. Spätere Änderungen vereinbaren wir einzeln. Bei größeren Projekten rechnen wir in Abschlägen für fertige Teile ab.",
      },
      {
        title: "Digitalbonus Bayern: So klappt die Förderung",
        bullets: [
          "Der Digitalbonus übernimmt 50 % der förderfähigen Kosten, höchstens 7.500 €, bei Projekten ab 4.000 € (Stand Oktober 2026).",
          "Antragsberechtigt sind gewerbliche Firmen mit weniger als 50 Beschäftigten und Betriebsstätte in Bayern. Freie Berufe und Arztpraxen sind ausgeschlossen.",
          "Den Antrag stellt dein Betrieb selbst über das ELSTER-Unternehmenskonto, bevor etwas beauftragt wird. Schon ein mündlicher Auftrag gilt als Projektbeginn.",
          "Die Mittel werden in monatlichen Runden freigegeben. Normale Websites ohne tiefe Einbindung in deine Abläufe fördert das Programm nicht.",
          "Mein Angebot listet Entwicklung, Einführung, Schulung und Betrieb getrennt auf. Ob dein Projekt gefördert wird, entscheidet die Förderstelle.",
        ],
      },
      {
        title: "Was du bekommst und was nicht",
        bullets: [
          "Nach Bezahlung der Schlussrechnung darfst du den Code uneingeschränkt nutzen, und es gibt keine Plattformgebühr pro Nutzer. Die Übergabe des Quellcodes steht im Vertrag. Allgemeine Bausteine, die ich auch für andere Kunden einsetze, bleiben davon unberührt.",
          "Code, Hosting und Konten laufen auf deinen Namen, dazu bekommst du eine Übergabe-Doku.",
          "Verarbeitet die App personenbezogene Daten, liegen sie auf Servern in der EU, und wir schließen einen Auftragsverarbeitungsvertrag (AVV).",
          "Vor dem Start prüfe ich Login, Rechte und Zugriffsregeln und lasse automatische Prüfprogramme über Code und Bibliotheken laufen.",
          "Erinnerungen an Fristen sind ein Hinweis, keine Garantie. Die Verantwortung für Fristen bleibt bei dir.",
          "Ich trete nicht gegen große Branchenpakete an, sondern baue ergänzende Bausteine dort, wo Branchensoftware nicht passt.",
        ],
      },
    ],
    ablauf: [
      "Ablauf aufnehmen: Wir schauen, was heute auf Zetteln, in Excel oder in Messenger-Gruppen läuft.",
      "Angebot zum Festpreis: Du bekommst Umfang und Preis schriftlich. Bei Förderung stellst du zuerst den Antrag, beauftragt wird erst danach.",
      "Bau und Abnahme: Ich baue die erste Version, du testest im Alltag, dann nimmst du sie förmlich ab.",
      "Betrieb: Hosting, Updates und Sicherheit laufen weiter, Änderungen vereinbaren wir einzeln.",
    ],
    faqs: [
      {
        q: "Was kostet es, eine Web-App entwickeln zu lassen?",
        a: "Das hängt vom Umfang ab, also davon, wie viele Abläufe, Nutzer und Schnittstellen die App braucht. Nach einem kostenlosen Erstgespräch bekommst du einen schriftlichen Festpreis, bevor irgendetwas beginnt, einschließlich der laufenden Kosten für Betrieb und Sicherheit. In Bayern kann der Digitalbonus 50 % der förderfähigen Kosten übernehmen, höchstens 7.500 €.",
      },
      {
        q: "Was ist der Unterschied zwischen Web-App und App aus dem App Store?",
        a: "Eine Web-App läuft im Browser und lässt sich wie eine App auf den Startbildschirm legen (PWA). Sie braucht keine Prüfung durch einen App Store. Für eine App im App Store braucht es ein Entwicklerkonto bei Apple für 99 USD im Jahr. Mit einem persönlichen Konto erscheint dein eigener Name als Anbieter, ein Firmenkonto setzt eine juristische Person mit D-U-N-S-Nummer voraus. Für viele Einzelunternehmer ist eine Web-App deshalb der einfachere Weg.",
      },
      {
        q: "Wird eine Web-App über den Digitalbonus Bayern gefördert?",
        a: "Ja, wenn Betrieb und Projekt die Voraussetzungen erfüllen. Antragsberechtigt sind gewerbliche Firmen mit weniger als 50 Beschäftigten und Betriebsstätte in Bayern. Der Zuschuss beträgt 50 % der förderfähigen Kosten, höchstens 7.500 €, bei Projekten ab 4.000 € (Stand Oktober 2026). Den Antrag stellst du selbst über dein ELSTER-Unternehmenskonto, bevor du etwas beauftragst.",
      },
      {
        q: "Gehört mir der Code der Web-App?",
        a: "Ja, nach Bezahlung der Schlussrechnung darfst du den Code uneingeschränkt nutzen. Das regeln wir ausdrücklich im Vertrag, denn ohne eine solche Regel hast du oft keinen Anspruch auf den Quellcode. Code, Hosting und Konten laufen auf deinen Namen, und du bekommst eine Übergabe-Doku.",
      },
      {
        q: "Warum keine No-Code-Lösung?",
        a: "Weil du dort oft pro Nutzer Plattformgebühren zahlst und die App an die Plattform gebunden bleibt. Bei mir gehört der Code dir. Für sehr einfache Abläufe kann No-Code trotzdem reichen, das sage ich dir im Erstgespräch ehrlich.",
      },
      {
        q: "Wie sicher ist eine Web-App für meinen Betrieb?",
        a: "So sicher, wie sie geprüft und gepflegt wird. Vor dem Start teste ich Login, Rechte und Zugriffsregeln und lasse Prüfprogramme über Code und Bibliotheken laufen. Im Betrieb spiele ich Updates ein, und die Daten liegen in der EU.",
      },
      {
        q: "Wie lange dauert die Entwicklung einer Web-App?",
        a: "Das hängt vom Umfang ab und steht im Angebot. Bei geförderten Projekten wartest du zuerst die Eingangsbestätigung ab, denn vorher darf nichts beauftragt werden. Wir planen in Abschnitten, und du testest jeden fertigen Teil.",
      },
    ],
    related: ["buero-automatisierung", "recruiting", "it-grundschutz"],
    thema: "Web-App",
  },

  // ---------------------------------------------------------------------- Büro
  {
    key: "buero-automatisierung",
    lang: "de",
    slug: "buero-automatisierung",
    label: "Büro-Automatisierung",
    familie: "Büro",
    metaTitle: "Büro-Automatisierung für kleine Betriebe | Festpreis",
    metaDescription:
      "Büro-Automatisierung: Rechnungen aus dem Postfach erkennen, an Fristen erinnern, Briefe per Foto zur Aufgabe machen. Festpreis nach kostenlosem Erstgespräch.",
    eyebrow: "Automatisierung · Büro",
    h1: "Büro-Automatisierung für Betriebe ohne Bürokraft",
    intro:
      "Büro-Automatisierung nimmt dir wiederkehrende Arbeit ab: Rechnungen aus dem Postfach erkennen, an Fälligkeiten erinnern, Briefe und Sprachnachrichten in Aufgaben verwandeln. Nach einem kostenlosen Erstgespräch bekommst du einen schriftlichen Festpreis, auch für die laufende Betreuung. Bevor etwas rausgeht, gibst du es frei.",
    preise: [
      { betrag: "Festpreis nach Erstgespräch", wofuer: "Rechnungseingang, Zahlungserinnerung oder Büro-Assistent, je nach Umfang" },
      { betrag: "Betreuung im Monat", wofuer: "Überwachung und Reparatur der Abläufe, der Preis steht im Angebot" },
    ],
    fuer: ["Handwerksbetriebe", "Umzugsunternehmen", "Kfz-Werkstätten", "Kosmetikstudios", "Firmen mit vielen Eingangsrechnungen"],
    sections: [
      {
        title: "Rechnungseingang und Zahlungserinnerung",
        text: "Für einen Betrieb mit vielen Eingangsrechnungen läuft bereits ein System von mir: Es holt täglich die neuen Rechnungen aus dem Postfach, erkennt die Zahlungsfristen und schickt jeden Morgen eine Liste mit allem, was bald fällig ist.",
        bullets: [
          "E-Rechnungen im Postfach erkennen und lesbar machen.",
          "Fälligkeit und Skonto auslesen und rechtzeitig daran erinnern.",
          "Weiterleitung an deine Buchhaltungssoftware oder deinen Steuerberater.",
          "Zahlungserinnerungen an deine Kunden, die du vor dem Versand freigibst.",
        ],
      },
      {
        title: "Büro-Assistent per Telegram",
        text: "Du schickst eine Sprachnachricht oder ein Foto von einem Brief an einen Telegram-Bot. Er macht daraus eine Aufgabe, eine Frist oder einen Beleg und schickt dir morgens eine Übersicht für den Tag. Ich nutze so einen Assistenten selbst jeden Tag. Für deinen Betrieb passe ich ihn an, und Belege gehen an die Buchhaltung oder in eine Tabelle.",
      },
      {
        title: "Grenzen, die ich einhalte",
        bullets: [
          "Ich kontiere und buche nicht. Das dürfen nur Fachleute mit der nötigen Qualifikation (§ 6 StBerG), dafür bleibt dein Steuerberater zuständig.",
          "Ich mache keine Aussagen zur Vorsteuer oder zu anderen Steuerfragen. Die klärt dein Steuerberater.",
          "Die Originaldatei jeder Rechnung bleibt unverändert und wird in einem Archiv aufbewahrt, das du mit deinem Steuerberater abstimmst, etwa in deinem Buchhaltungsprogramm.",
          "Telegram ist als interner Kanal für dich gedacht. Für Kundendaten ist Telegram rechtlich umstritten, deshalb legen wir vorab fest, was darüber läuft.",
          "Gespeichert wird auf Servern in der EU, mit Auftragsverarbeitungsvertrag (AVV) für alle beteiligten Dienste.",
          "Alles, was rausgeht, gibt vorher ein Mensch frei.",
        ],
      },
      {
        title: "Betrieb und Überwachung",
        text: "Automationen fallen meist dann aus, wenn ein Anbieter seine Schnittstelle ändert. Deshalb überwache ich jeden Ablauf und bekomme bei einem Fehler sofort eine Meldung. Mit der monatlichen Betreuung halte ich die Abläufe in Gang und repariere sie, wenn etwas nicht mehr funktioniert. Um Fehler kümmere ich mich meist am selben Abend oder am nächsten Werktag.",
      },
    ],
    ablauf: [
      "Bestandsaufnahme: Wir schauen, welche Büroarbeit jede Woche gleich abläuft.",
      "Vorschlag zum Festpreis: Du bekommst einen klaren Ablauf und den Preis schriftlich.",
      "Einrichtung und Test: Ich richte den Ablauf ein, wir testen ihn mit echten Belegen.",
      "Betrieb: Ich überwache die Abläufe und repariere sie, wenn ein Anbieter etwas ändert.",
    ],
    faqs: [
      {
        q: "Was kostet Büro-Automatisierung?",
        a: "Das hängt davon ab, welche Abläufe automatisiert werden und welche Programme du schon nutzt. Nach einem kostenlosen Erstgespräch bekommst du einen schriftlichen Festpreis, auch für die monatliche Betreuung. Lizenzen für Buchhaltungsprogramme zahlst du direkt beim Anbieter.",
      },
      {
        q: "Bucht das System meine Belege?",
        a: "Nein. Kontieren und Buchen dürfen nur Fachleute mit der nötigen Qualifikation (§ 6 StBerG). Das System erkennt, sortiert und leitet weiter, gebucht wird bei dir oder deinem Steuerberater.",
      },
      {
        q: "Ist Büro-Automatisierung DSGVO-konform?",
        a: "Sie lässt sich datenschutzkonform betreiben, wenn Hosting und Verträge stimmen. Ich setze auf Server in der EU, möglichst ohne US-Dienste, und schließe Auftragsverarbeitungsverträge (AVV) für alle beteiligten Dienste. Die rechtliche Prüfung im Einzelfall übernimmt dein Anwalt oder Datenschutzbeauftragter.",
      },
      {
        q: "Liest eine KI meine Rechnungen?",
        a: "Nicht unbedingt. Das System, das bei einem Betrieb schon läuft, liest Rechnungen ganz ohne KI aus. Wo KI hilft, etwa bei Sprachnachrichten oder Fotos von Briefen, sage ich dir vorher, welcher Dienst die Daten verarbeitet.",
      },
      {
        q: "Welche Programme lassen sich anbinden?",
        a: "Meist sind es dein E-Mail-Postfach, deine Buchhaltungssoftware und eine Tabelle, dazu die Weitergabe an deinen Steuerberater. Was genau passt, klären wir im Erstgespräch. Hat ein Programm keine passende Schnittstelle, sage ich dir das vorher.",
      },
      {
        q: "Was passiert, wenn eine Automation ausfällt?",
        a: "Dann bekomme ich eine Fehlermeldung und kümmere mich meist am selben Abend oder am nächsten Werktag darum. Automationen fallen meist dann aus, wenn ein Anbieter seine Schnittstelle ändert. Deshalb gehört die Überwachung zum Monatspreis.",
      },
      {
        q: "Brauche ich Telegram für den Büro-Assistenten?",
        a: "Ja, der Büro-Assistent läuft über Telegram, weil Sprachnachrichten und Fotos dort einfach gehen. Telegram ist dabei als interner Kanal für dich gedacht. Für Kundendaten ist es rechtlich umstritten, deshalb legen wir vorab fest, was darüber läuft.",
      },
    ],
    related: ["e-rechnung", "web-apps", "ki-telefon"],
    thema: "Büro-Automatisierung",
  },
  {
    key: "e-rechnung",
    lang: "de",
    slug: "e-rechnung-einrichten",
    label: "E-Rechnung einrichten",
    familie: "Büro",
    metaTitle: "E-Rechnung einrichten lassen | ab 300 € pauschal",
    metaDescription:
      "E-Rechnung einrichten lassen: passendes Programm, Vorlagen, Stammdaten, Testversand und Einweisung. Ab 300 € pauschal, damit du für 2027 und 2028 bereit bist.",
    eyebrow: "Büro · E-Rechnung",
    h1: "E-Rechnung einrichten, bevor die Pflicht greift",
    intro:
      "Ab 2027 müssen größere Betriebe E-Rechnungen ausstellen, ab 2028 alle übrigen außer Kleinunternehmern. Ich richte dir das passende Programm ein, lege Vorlagen und Stammdaten an und teste den Versand an deinen Steuerberater und an Kunden. Die Einrichtung kostet ab 300 € pauschal.",
    preise: [{ betrag: "ab 300 €", wofuer: "Einrichtung pauschal" }],
    fuer: ["Firmen mit Geschäftskunden", "Handwerksbetriebe", "Logistik und Transport", "Dienstleister", "Büros und Agenturen"],
    sections: [
      {
        title: "Die Fristen im Überblick",
        bullets: [
          "Seit 1. Januar 2025: Alle Firmen müssen E-Rechnungen empfangen können. Ein E-Mail-Postfach reicht dafür.",
          "Ab 1. Januar 2027: E-Rechnungen ausstellen müssen Firmen mit mehr als 800.000 € Umsatz im Vorjahr.",
          "Ab 1. Januar 2028: Die Pflicht gilt für alle übrigen Firmen, Kleinunternehmer sind ausgenommen.",
          "Es geht um Rechnungen an Firmenkunden. Ob und ab wann dein Betrieb betroffen ist, klärt dein Steuerberater.",
        ],
      },
      {
        title: "Was im Paket steckt",
        bullets: [
          "Ein passendes Programm oder einen passenden Tarif auswählen, abgestimmt mit deinem Steuerberater.",
          "Rechnungsvorlagen und Stammdaten anlegen: Firma, Kunden, Leistungen.",
          "Testversand an dich selbst und an deinen Steuerberater.",
          "Eine kurze Einweisung, damit du Rechnungen selbst erstellen kannst.",
        ],
      },
      {
        title: "Was ich nicht mache",
        text: "Ich beurteile nicht, ob dein Umsatz über 800.000 € liegt oder ab wann die Pflicht für dich gilt, und ich mache keine Aussage zur Vorsteuer. Das klärt dein Steuerberater. Ich kümmere mich um die Technik, damit der Versand klappt, wenn es so weit ist. Über den Digitalbonus Bayern ist die reine Umstellung nicht förderbar, weil das Programm gesetzlich vorgeschriebene Maßnahmen ausschließt.",
      },
    ],
    ablauf: [
      "Kurzes Gespräch: Wir klären, wie du heute Rechnungen schreibst und was dein Steuerberater nutzt.",
      "Einrichtung: Ich richte Programm, Vorlagen und Stammdaten ein.",
      "Testversand: Eine Probe-Rechnung geht an dich selbst und an deinen Steuerberater.",
      "Einweisung: Ich zeige dir, wie du Rechnungen selbst erstellst.",
    ],
    faqs: [
      {
        q: "Was kostet es, die E-Rechnung einrichten zu lassen?",
        a: "Bei mir kostet die Einrichtung ab 300 € pauschal. Dazu kommt das Rechnungsprogramm, das je nach Anbieter rund 8 bis 35 € im Monat kostet und das du direkt beim Anbieter zahlst. Meine Preise sind Endpreise nach § 19 UStG.",
      },
      {
        q: "Ab wann ist die E-Rechnung Pflicht?",
        a: "Seit dem 1. Januar 2025 müssen alle Firmen E-Rechnungen empfangen können. Ab dem 1. Januar 2027 müssen Firmen mit mehr als 800.000 € Vorjahresumsatz sie auch ausstellen, ab dem 1. Januar 2028 alle übrigen außer Kleinunternehmern. Was genau für deinen Betrieb gilt, klärt dein Steuerberater.",
      },
      {
        q: "Reicht ein E-Mail-Postfach für den Empfang von E-Rechnungen?",
        a: "Ja, für den Empfang reicht ein E-Mail-Postfach, das hat die Bundesregierung bestätigt. Wichtig ist, dass die Rechnungen danach lesbar gemacht und richtig archiviert werden. Dabei hilft der Rechnungseingang aus der Büro-Automatisierung.",
      },
      {
        q: "Muss ich als Kleinunternehmer E-Rechnungen schreiben?",
        a: "Nein, Kleinunternehmer sind von der Pflicht zum Ausstellen ausgenommen. Empfangen müssen sie E-Rechnungen trotzdem können, ein E-Mail-Postfach reicht dafür. Ob du als Kleinunternehmer giltst, klärt dein Steuerberater.",
      },
      {
        q: "Welches Programm brauche ich für die E-Rechnung?",
        a: "Das hängt davon ab, wie viele Rechnungen du schreibst und womit dein Steuerberater arbeitet. Ich wähle mit dir einen passenden Tarif und stimme ihn mit deinem Steuerberater ab. Viele Programme kosten rund 8 bis 35 € im Monat.",
      },
      {
        q: "Wird die Umstellung auf die E-Rechnung gefördert?",
        a: "Über den Digitalbonus Bayern nicht. Das Programm schließt gesetzlich vorgeschriebene Maßnahmen aus, und die reine Umstellung auf die E-Rechnung gehört dazu.",
      },
    ],
    related: ["buero-automatisierung", "website-betreuung", "it-grundschutz"],
    thema: "E-Rechnung einrichten",
  },

  // -------------------------------------------------------------- Sichtbarkeit
  {
    key: "google-profil",
    lang: "de",
    slug: "google-unternehmensprofil",
    label: "Google-Profil und Bewertungen",
    familie: "Sichtbarkeit",
    metaTitle: "Google-Unternehmensprofil einrichten | 149 €",
    metaDescription:
      "Google-Unternehmensprofil einrichten für 149 €, Pflege von Profil und Bewertungen ab 49 € im Monat, Bewertungs-Kit mit NFC- und QR-Aufsteller ab 99 €.",
    eyebrow: "Sichtbarkeit · Google",
    h1: "Google-Unternehmensprofil einrichten und Bewertungen pflegen",
    intro:
      "Dein Google-Unternehmensprofil zeigt Kunden in der Google-Suche und in Google Maps Adresse, Öffnungszeiten, Fotos und Bewertungen. Ich richte es für 149 € ein, pflege Profil und Bewertungen ab 49 € im Monat und liefere dir ein Bewertungs-Kit mit NFC- und QR-Aufsteller ab 99 €. Alles nach den Regeln von Google.",
    preise: [
      { betrag: "149 €", wofuer: "Google-Unternehmensprofil einrichten, einmalig" },
      { betrag: "ab 49 € im Monat", wofuer: "Profil- und Bewertungspflege" },
      { betrag: "ab 99 €", wofuer: "Bewertungs-Kit mit NFC- und QR-Aufsteller" },
    ],
    fuer: ["Umzugsunternehmen", "Kosmetik- und Beautystudios", "Kfz-Werkstätten", "Handwerksbetriebe", "Lokale Dienstleister"],
    sections: [
      {
        title: "Einrichtung für 149 €",
        text: "Ich lege das Profil an oder räume ein bestehendes auf, trage Leistungen, Fotos und Öffnungszeiten ein und helfe bei der Verifizierung. Google verlangt für ein Profil einen echten Kundenkontakt, das prüfen wir vorab. Für mehrere Betriebe habe ich das schon gemacht.",
      },
      {
        title: "Pflege ab 49 € im Monat",
        bullets: [
          "2 bis 4 Beiträge im Monat zu Leistungen, Aktionen oder Einsätzen.",
          "Antworten auf alle Bewertungen, in der Regel innerhalb von 1 bis 2 Werktagen, persönlich statt aus der Schablone.",
          "Neue Fotos jedes Quartal, aus deinen Bildern oder bei einem Termin vor Ort.",
          "Öffnungszeiten und Leistungen immer aktuell, auch an Feiertagen.",
        ],
      },
      {
        title: "Bewertungs-Kit ab 99 €",
        text: "Ein Aufsteller mit NFC-Chip und QR-Code für den Tresen, die Werkstatt oder das Auto, dazu Karten, ein kurzer Link und ein Text für die Bitte um eine Bewertung. Kunden halten das Handy daran oder scannen den Code und landen direkt bei deinem Google-Profil. Der Ablauf ist für alle Kunden gleich, ohne Vorauswahl.",
      },
      {
        title: "Die Regeln von Google",
        bullets: [
          "Bitte alle Kunden um eine Bewertung, nicht nur die zufriedenen. Google verbietet diese Auswahl.",
          "Keine Belohnung für Bewertungen, also kein Rabatt und kein Geschenk.",
          "Kein Druck vor Ort. Die Bitte bleibt freundlich und freiwillig.",
          "Bewertungsanfragen per E-Mail, SMS oder WhatsApp lässt du vorher rechtlich prüfen (§ 7 UWG).",
        ],
      },
    ],
    ablauf: [
      "Check: Ich schaue mir dein Profil an oder prüfe, ob du die Voraussetzungen für ein neues erfüllst.",
      "Einrichtung: Profil anlegen oder aufräumen, Leistungen, Fotos und Öffnungszeiten eintragen.",
      "Bewertungen: Das Kit aufstellen und allen Kunden den Link geben.",
      "Pflege, wenn du willst: Beiträge und Antworten laufen jeden Monat weiter, neue Fotos kommen jedes Quartal.",
    ],
    faqs: [
      {
        q: "Was kostet es, ein Google-Unternehmensprofil einrichten zu lassen?",
        a: "Bei mir kostet die Einrichtung 149 € einmalig. Die laufende Pflege von Profil und Bewertungen gibt es ab 49 € im Monat, das Bewertungs-Kit ab 99 €. Das Profil selbst ist bei Google kostenlos.",
      },
      {
        q: "Darf ich Kunden um Google-Bewertungen bitten?",
        a: "Ja, aber alle Kunden und ohne Gegenleistung. Google verbietet, nur zufriedene Kunden zu fragen, Anreize zu bieten oder Kunden vor Ort unter Druck zu setzen. Anfragen per E-Mail, SMS oder WhatsApp lässt du vorher rechtlich prüfen (§ 7 UWG).",
      },
      {
        q: "Was ist ein Bewertungs-Kit mit NFC?",
        a: "Ein Aufsteller mit NFC-Chip und QR-Code, der direkt zu deiner Bewertungsseite bei Google führt. Kunden halten das Handy daran oder scannen den Code. Dazu bekommst du Karten, einen kurzen Link und einen Text für die Bitte. Das Kit gibt es ab 99 €.",
      },
      {
        q: "Soll ich auf jede Google-Bewertung antworten?",
        a: "Ja, auf jede, auch auf die kritischen. In einer US-Umfrage von BrightLocal gaben 80 % der Verbraucher an, eher Firmen zu wählen, die auf alle Bewertungen antworten. Die Antworten sollten persönlich sein, denn laut derselben Umfrage schrecken generische Antworten die Hälfte der Leser ab.",
      },
      {
        q: "Wie oft sollte ich mein Google-Profil aktualisieren?",
        a: "Regelmäßig, damit Kunden aktuelle Angaben sehen. Im Pflegepaket kommen 2 bis 4 Beiträge im Monat und jedes Quartal neue Fotos dazu. Öffnungszeiten und Leistungen halte ich aktuell, auch an Feiertagen.",
      },
      {
        q: "Bekomme ich ein Google-Profil, wenn ich keinen Laden habe?",
        a: "Das kommt auf deinen Betrieb an. Google verlangt einen echten Kundenkontakt, also dass du Kunden persönlich bedienst, bei dir oder bei ihnen vor Ort. Ob du die Voraussetzungen erfüllst, prüfe ich vor der Einrichtung.",
      },
    ],
    related: ["website-betreuung", "ki-chatbot", "recruiting"],
    thema: "Google-Profil und Bewertungen",
  },
  {
    key: "website-betreuung",
    lang: "de",
    slug: "website-wartung",
    label: "Website-Wartung und Betreuung",
    familie: "Sichtbarkeit",
    metaTitle: "Website-Wartung und Betreuung | ab 49 € im Monat",
    metaDescription:
      "Website-Wartung für kleine Betriebe: Updates, Backups, Sicherheit und Änderungen ab 49 € im Monat, SEO und Wartung ab 99 € im Monat. Fester Ansprechpartner.",
    eyebrow: "Sichtbarkeit · Wartung",
    h1: "Website-Wartung und Betreuung mit festem Ansprechpartner",
    intro:
      "Eine Website braucht nach dem Start Pflege: Updates, Backups, Sicherheit und hin und wieder neue Texte oder Bilder. Ich übernehme das ab 49 € im Monat, mit laufender Suchmaschinen-Optimierung ab 99 € im Monat. Du hast einen festen Ansprechpartner und musst dich um keine Technik kümmern.",
    preise: [
      { betrag: "ab 49 € im Monat", wofuer: "Wartung und Updates" },
      { betrag: "ab 99 € im Monat", wofuer: "SEO und Wartung" },
    ],
    fuer: ["Handwerksbetriebe", "Kosmetikstudios", "Logistik und Transport", "Selbstständige", "Kleine Unternehmen mit bestehender Website"],
    sections: [
      {
        title: "Wartung und Updates ab 49 € im Monat",
        bullets: [
          "Technische Updates, SSL-Zertifikat und Backups.",
          "Überwachung, ob deine Seite erreichbar ist.",
          "Kleine Änderungen an Texten und Bildern in einem festen Umfang, den wir vorher vereinbaren.",
          "Ein Blick auf die Technik hinter den Rechtsthemen: lokal eingebundene Schriften, Cookies und Tracker auf der Seite, ein erreichbares Impressum.",
        ],
      },
      {
        title: "SEO und Wartung ab 99 € im Monat",
        text: "Alles aus der Wartung, dazu laufende Suchmaschinen-Optimierung: Seitentitel und Inhalte an echte Suchanfragen anpassen, die Ladezeit im Blick behalten und die Daten aus der Google Search Console auswerten. Du bekommst einen kurzen Bericht, was sich getan hat. Platz 1 bei Google kann niemand garantieren, eine saubere Grundlage und messbare Daten schon.",
      },
      {
        title: "Was nicht dazugehört",
        bullets: [
          "Domain und Hosting sind nicht im Wartungspreis enthalten. Bei Websites von BrandWerkX sind sie im ersten Jahr im Website-Preis drin, danach kosten sie je nach Anbieter etwa 10 bis 15 € im Monat.",
          "Neue Seiten und größere Umbauten sprechen wir vorher ab, sie werden getrennt berechnet.",
          "Kein Notdienst rund um die Uhr. Ich reagiere meist am selben Abend oder am nächsten Werktag.",
          "Die Rechtstexte selbst prüfe ich nicht. Die verantwortest du, mit einem Anwalt oder einem Generator für Rechtstexte.",
        ],
      },
      {
        title: "Auch für bestehende Websites",
        text: "Bestehende Websites schaue ich mir vorher an: Technik, Ladezeit, Hosting und Zugänge. Danach sage ich dir ehrlich, ob sich Wartung lohnt oder ein Neubau günstiger kommt. Zugänge, Domain und Hosting laufen weiter auf deinen Namen.",
      },
    ],
    ablauf: [
      "Check: Ich prüfe Technik, Ladezeit, Zugänge und Hosting deiner Website.",
      "Übernahme: Ich richte Zugänge, Backups und Überwachung ein.",
      "Laufende Pflege: Updates und Änderungen erledige ich jeden Monat, im Paket SEO und Wartung auch die Optimierung.",
      "Rückmeldung: Du siehst, was gemacht wurde, und sagst mir, was als Nächstes dran ist.",
    ],
    faqs: [
      {
        q: "Was kostet Website-Wartung im Monat?",
        a: "Bei mir kostet das Paket Wartung und Updates ab 49 € im Monat, SEO und Wartung ab 99 € im Monat. Domain und Hosting sind nicht enthalten. Bei Websites von BrandWerkX sind sie im ersten Jahr im Website-Preis drin, danach kosten sie je nach Anbieter etwa 10 bis 15 € im Monat. Die Preise sind Endpreise nach § 19 UStG.",
      },
      {
        q: "Was gehört zur Website-Wartung?",
        a: "Technische Updates, SSL-Zertifikat, Backups und die Überwachung, ob die Seite erreichbar ist. Dazu kommen kleine Änderungen an Texten und Bildern in einem vorher vereinbarten Umfang. Im Paket SEO und Wartung ist außerdem die laufende Suchmaschinen-Optimierung enthalten.",
      },
      {
        q: "Brauche ich Website-Wartung überhaupt?",
        a: "Nicht unbedingt. Bei einer statischen Website, wie ich sie baue, fällt wenig Technik an. Die Betreuung lohnt sich, wenn du Änderungen, Updates und Suchmaschinen-Optimierung nicht selbst machen willst.",
      },
      {
        q: "Wie schnell reagierst du bei Problemen mit der Website?",
        a: "Am selben Abend oder am nächsten Werktag. Einen Notdienst rund um die Uhr biete ich nicht an. Die Überwachung meldet mir, wenn deine Seite nicht erreichbar ist.",
      },
      {
        q: "Übernimmst du auch Websites, die jemand anderes gebaut hat?",
        a: "Ja, nach einem Check. Ich schaue mir Technik, Hosting und Zugänge an und sage dir ehrlich, ob Wartung sinnvoll ist oder ein Neubau günstiger kommt. Die Zugänge laufen weiter auf deinen Namen.",
      },
      {
        q: "Ist SEO in der Website-Wartung enthalten?",
        a: "Im Paket SEO und Wartung ab 99 € im Monat ja, in der reinen Wartung ab 49 € nicht. Dort halte ich die Seite technisch sauber, und die SEO-Grundlage aus dem Bau bleibt erhalten. Platzierungen bei Google kann kein seriöser Anbieter garantieren.",
      },
      {
        q: "Prüfst du auch Impressum und Datenschutzerklärung?",
        a: "Ich prüfe nur die Technik dahinter, etwa lokal eingebundene Schriften, Cookies und Tracker auf der Website und ob das Impressum erreichbar ist. Die Rechtstexte selbst prüfe ich nicht. Die verantwortest du, mit einem Anwalt oder einem Generator für Rechtstexte.",
      },
    ],
    related: ["google-profil", "it-grundschutz", "ki-chatbot"],
    thema: "Website-Wartung",
  },

  // --------------------------------------------------- Sicherheit und Schulung
  {
    key: "it-grundschutz",
    lang: "de",
    slug: "it-sicherheit-kleine-firmen",
    label: "IT-Grundschutz",
    familie: "Sicherheit und Schulung",
    metaTitle: "IT-Sicherheit für kleine Firmen | Festpreis",
    metaDescription:
      "IT-Sicherheit für kleine Firmen ohne IT-Abteilung: Zwei-Faktor-Anmeldung, Passwortmanager, getestete Backups. Festpreis nach kostenlosem Erstgespräch.",
    eyebrow: "Sicherheit · IT-Grundschutz",
    h1: "IT-Sicherheit für kleine Firmen ohne eigene IT",
    intro:
      "Viele kleine Firmen haben keine IT-Abteilung, aber Konten, Postfächer und Kundendaten, die geschützt sein müssen. Mit dem IT-Grundschutz-Paket sichere ich Konten und Passwörter ab, richte Backups ein und dokumentiere alles. Auf Wunsch kümmere ich mich danach als digitaler Hausmeister jeden Monat um Domain, E-Mail und Konten. Den Festpreis bekommst du nach einem kostenlosen Erstgespräch.",
    preise: [
      { betrag: "Festpreis nach Erstgespräch", wofuer: "IT-Grundschutz-Paket, je nach Zahl der Geräte und Konten" },
      { betrag: "Pauschale im Monat", wofuer: "Digitaler Hausmeister, je nach Zahl der Postfächer" },
    ],
    fuer: ["Firmen mit 1 bis 10 Personen", "Logistik und Transport", "Zeitarbeitsfirmen", "Büros ohne IT-Abteilung", "Zulieferer großer Firmen"],
    sections: [
      {
        title: "Was im IT-Grundschutz-Paket steckt",
        text: "Laut einer Cyberstudie des Versicherers HDI wurden 35 % der befragten kleinen und mittleren Firmen und Selbstständigen in den vergangenen fünf Jahren mindestens einmal angegriffen. Das Paket deckt die Grundlagen ab:",
        bullets: [
          "Zwei-Faktor-Anmeldung für alle wichtigen Konten.",
          "Ein Passwortmanager für dich und dein Team.",
          "Ein Backup mit dokumentiertem Test, ob die Wiederherstellung klappt.",
          "Eine Liste aller Geräte und ihrer Updates.",
          "Absicherung deiner Website oder Web-App, wenn ich sie betreue.",
          "Eine kurze Schulung für das Team und ein Notfallblatt: Wen rufe ich bei einem Hackerangriff an?",
          "Ein Antwort-Baukasten für Sicherheitsfragebögen großer Kunden.",
        ],
      },
      {
        title: "Digitaler Hausmeister im Monatsabo",
        text: "Für Firmen mit bis zu 5 Postfächern übernehme ich die laufende Pflege. Lizenzen, etwa für Microsoft 365 oder Google Workspace, schließt du direkt beim Anbieter ab.",
        bullets: [
          "Domain und DNS, sichere E-Mail-Zustellung mit SPF, DKIM und DMARC.",
          "Microsoft 365 oder Google Workspace einrichten und pflegen.",
          "Konten anlegen und sperren, wenn jemand kommt oder geht.",
          "Passwortmanager, Zwei-Faktor-Anmeldung und Backups im Blick.",
          "Ein kurzer Bericht jedes Quartal.",
        ],
      },
      {
        title: "Fragebögen von Auftraggebern und NIS2",
        text: "Die NIS2-Regeln gelten direkt nur für bestimmte Firmen, zum Beispiel für Post- und Kurierdienste ab 50 Beschäftigten. Kleine Firmen merken sie oft über Sicherheitsfragebögen ihrer Auftraggeber. Ich helfe dir, diese Fragen ehrlich und vollständig zu beantworten. Eine NIS2-Konformität bescheinige ich nicht, und ob dein Betrieb direkt betroffen ist, klärt dein Anwalt.",
      },
      {
        title: "Was ich nicht mache",
        bullets: [
          "Keine Einsätze vor Ort und keine Hardware. Ich arbeite per Fernzugriff, dafür schließen wir einen Auftragsverarbeitungsvertrag (AVV).",
          "Kein Notdienst rund um die Uhr. Für den Ernstfall bekommst du das Notfallblatt mit den richtigen Ansprechpartnern.",
          "Keine Bescheinigung, dass dein Betrieb rechtlich konform ist. Ich liefere Technik, Einrichtung und Schulung.",
        ],
      },
    ],
    ablauf: [
      "Bestandsaufnahme: Wir gehen Konten, Geräte, Postfächer und Backups gemeinsam durch.",
      "Absicherung: Ich richte Zwei-Faktor-Anmeldung, Passwortmanager und Backups ein.",
      "Test und Schulung: Wir testen gemeinsam die Wiederherstellung, danach schule ich dein Team kurz.",
      "Laufende Pflege, wenn du willst: Als digitaler Hausmeister halte ich alles aktuell.",
    ],
    faqs: [
      {
        q: "Was kostet IT-Sicherheit für eine kleine Firma?",
        a: "Das hängt davon ab, wie viele Geräte, Konten und Postfächer es gibt und was schon eingerichtet ist. Nach einem kostenlosen Erstgespräch bekommst du einen schriftlichen Festpreis für das IT-Grundschutz-Paket und die Monatspauschale für den digitalen Hausmeister. Lizenzen wie Microsoft 365 schließt du direkt beim Anbieter ab.",
      },
      {
        q: "Welche Maßnahmen gehören zum IT-Grundschutz?",
        a: "Die Grundlage bilden Zwei-Faktor-Anmeldung, ein Passwortmanager und ein Backup, dessen Wiederherstellung getestet ist. Dazu kommen eine Liste aller Geräte und Updates, eine kurze Schulung und ein Notfallblatt. Alles wird dokumentiert, damit du es bei Fragen von Kunden vorzeigen kannst.",
      },
      {
        q: "Betrifft NIS2 meine kleine Firma?",
        a: "Direkt nur, wenn dein Betrieb zu bestimmten Sektoren gehört und eine bestimmte Größe hat, zum Beispiel bei Post- und Kurierdiensten ab 50 Beschäftigten. Viele kleine Firmen merken NIS2 aber über Sicherheitsfragebögen großer Auftraggeber. Ob dein Betrieb direkt betroffen ist, klärt dein Anwalt. Bei den Fragebögen helfe ich dir.",
      },
      {
        q: "Was macht ein digitaler Hausmeister?",
        a: "Als digitaler Hausmeister kümmere ich mich um die laufende IT deiner Firma: Domain, E-Mail, Konten, Passwortmanager, Zwei-Faktor-Anmeldung und Backups. Kommt jemand neu dazu oder geht, richte ich Konten ein oder sperre sie. Dafür gibt es eine feste Monatspauschale, die sich nach der Zahl der Postfächer richtet.",
      },
      {
        q: "Was bedeuten SPF, DKIM und DMARC?",
        a: "Das sind Einträge für deine Domain, mit denen Empfänger prüfen können, ob eine E-Mail wirklich von dir kommt. Sie helfen dabei, dass deine Mails nicht im Spam landen und niemand so leicht in deinem Namen schreibt. Als digitaler Hausmeister richte ich sie mit ein.",
      },
      {
        q: "Kommst du auch vor Ort, wenn etwas kaputt ist?",
        a: "Nein. Ich arbeite per Fernzugriff und kümmere mich nicht um Hardware oder Notfälle rund um die Uhr. Für den Ernstfall bekommst du ein Notfallblatt mit den richtigen Ansprechpartnern.",
      },
      {
        q: "Wird IT-Sicherheit in Bayern gefördert?",
        a: "Ja, ein größeres Sicherheitsprojekt kann über den Digitalbonus Bayern gefördert werden, mit einem eigenen Antrag für IT-Sicherheit. Der Zuschuss beträgt 50 % der förderfähigen Kosten, höchstens 7.500 €, bei Projekten ab 4.000 € (Stand Oktober 2026). Antragsberechtigt sind gewerbliche Firmen mit weniger als 50 Beschäftigten. Den Antrag stellt dein Betrieb selbst über das ELSTER-Unternehmenskonto, bevor etwas beauftragt wird.",
      },
    ],
    related: ["website-betreuung", "ki-workshop", "web-apps"],
    thema: "IT-Grundschutz",
  },
  {
    key: "ki-workshop",
    lang: "de",
    slug: "ki-schulung",
    label: "KI-Workshop für Teams",
    familie: "Sicherheit und Schulung",
    metaTitle: "KI-Schulung für Mitarbeiter | Workshop ab 490 €",
    metaDescription:
      "KI-Schulung für dein Team: ChatGPT und Co. sicher im Betrieb nutzen, mit Teilnahmeliste, Inhaltsnachweis und einfacher KI-Regel. Ab 490 € pauschal je Betrieb.",
    eyebrow: "KI · Schulung",
    h1: "KI-Schulung für dein Team: ChatGPT und Co. sicher im Betrieb",
    intro:
      "Im KI-Workshop lernt dein Team in 2 bis 4 Stunden, ChatGPT und andere KI-Werkzeuge sinnvoll und sicher im Betrieb einzusetzen. Wir arbeiten mit euren echten Aufgaben, und am Ende hast du eine einfache KI-Regel für den Betrieb und einen Nachweis der Schulung. Der Workshop kostet ab 490 € pauschal je Betrieb.",
    preise: [{ betrag: "ab 490 €", wofuer: "pauschal je Betrieb, 2 bis 4 Stunden" }],
    fuer: ["Inhaber und Büro", "Handwerksbetriebe", "Logistik und Transport", "Kosmetikstudios", "Teams, die schon mit KI arbeiten"],
    sections: [
      {
        title: "Was im Workshop passiert",
        bullets: [
          "Vorab eine kurze Bedarfsliste: Wofür nutzt ihr KI schon, wofür könntet ihr sie nutzen?",
          "Praxis mit euren Aufgaben: Angebote formulieren, E-Mails beantworten, Texte prüfen.",
          "Was nicht in eine KI gehört: Kundendaten, Passwörter, Geschäftsgeheimnisse.",
          "Wie ihr Antworten prüft, denn KI kann sich irren.",
          "Eine einfache interne KI-Regel, die ihr direkt übernehmen könnt.",
        ],
      },
      {
        title: "Was du danach in der Hand hast",
        bullets: [
          "Teilnahmeliste und Inhaltsnachweis der Schulung.",
          "Die KI-Regel für deinen Betrieb als Dokument.",
          "Die Bedarfsliste mit den nächsten sinnvollen Schritten.",
        ],
      },
      {
        title: "Die Pflicht zur KI-Kompetenz, sachlich erklärt",
        text: "Seit Februar 2025 verlangt die KI-Verordnung, dass Firmen, deren Leute KI nutzen, Maßnahmen zur KI-Kompetenz ergreifen (Art. 4). Für diese Pflicht gibt es kein eigenes Bußgeld, und ein Zertifikat ist nicht vorgeschrieben. Ein Workshop mit Nachweis ist eine Maßnahme, die du belegen kannst. Ob das für deinen Betrieb ausreicht, ist eine Rechtsfrage, die ich nicht beurteile.",
      },
      {
        title: "Wie der Workshop läuft",
        text: "Online oder bei euch im Betrieb, auch abends oder samstags. Den Termin legen wir nach Absprache fest. Ich arbeite mit euren Beispielen statt mit Folien voller Theorie. Wer nur Grundwissen sucht, findet günstige E-Learnings, etwa bei der IHK. Mein Workshop lohnt sich, wenn ihr mit euren eigenen Aufgaben üben wollt.",
      },
    ],
    ablauf: [
      "Vorgespräch: Wir klären, wer teilnimmt und wofür ihr KI nutzen wollt.",
      "Bedarfsliste: Dein Team nennt vorab Aufgaben, die im Workshop drankommen.",
      "Workshop: 2 bis 4 Stunden Praxis mit euren Beispielen, online oder bei euch im Betrieb.",
      "Nachweis: Du bekommst Teilnahmeliste, Inhaltsnachweis und die KI-Regel.",
    ],
    faqs: [
      {
        q: "Was kostet eine KI-Schulung für Mitarbeiter?",
        a: "Bei mir kostet der KI-Workshop ab 490 € pauschal je Betrieb, für 2 bis 4 Stunden. Der Preis gilt für das Team, nicht pro Person. Teilnahmeliste, Inhaltsnachweis und KI-Regel sind enthalten.",
      },
      {
        q: "Ist eine KI-Schulung für Mitarbeiter Pflicht?",
        a: "Eine bestimmte Schulung ist nicht vorgeschrieben, Maßnahmen zur KI-Kompetenz aber schon. Das verlangt Art. 4 der KI-Verordnung von Firmen, deren Leute KI nutzen. Ein Zertifikat braucht es nicht, und ein eigenes Bußgeld gibt es für diese Pflicht nicht. Ein Workshop mit Nachweis ist eine Maßnahme, die du belegen kannst.",
      },
      {
        q: "Brauche ich ein Zertifikat für KI-Kompetenz?",
        a: "Nein, ein Zertifikat ist nicht vorgeschrieben. Wichtig ist, dass du Maßnahmen ergreifst und sie belegen kannst. Dafür bekommst du nach dem Workshop eine Teilnahmeliste und einen Inhaltsnachweis.",
      },
      {
        q: "Was lernt mein Team im KI-Workshop?",
        a: "Wie ihr ChatGPT und andere Werkzeuge für eure echten Aufgaben nutzt, etwa für Angebote, E-Mails und Texte. Dazu kommt, was nicht in eine KI gehört und wie ihr Antworten prüft. Am Ende steht eine einfache KI-Regel für euren Betrieb.",
      },
      {
        q: "Findet der KI-Workshop online oder vor Ort statt?",
        a: "Beides geht: online oder bei euch im Betrieb. Im Oberland und in München ist die Anfahrt im Preis enthalten, weiter weg berechne ich die Fahrtkosten nach Absprache. Den Termin legen wir nach Absprache fest, auch abends oder samstags, damit niemand den Arbeitstag unterbrechen muss.",
      },
      {
        q: "Dürfen Mitarbeiter Kundendaten in ChatGPT eingeben?",
        a: "Das solltet ihr vorher klar regeln, und genau dafür ist die KI-Regel da. Im Workshop zeige ich, welche Daten nicht in ein KI-Werkzeug gehören und wie ihr Aufgaben ohne Personenbezug löst. Ob eine bestimmte Nutzung datenschutzrechtlich erlaubt ist, klärt dein Datenschutzbeauftragter.",
      },
      {
        q: "Für wen lohnt sich ein KI-Workshop?",
        a: "Für Betriebe, in denen schon jemand mit KI arbeitet oder bald damit arbeiten soll, vor allem für Inhaber und Büro. Für reines Grundwissen reichen günstige E-Learnings, etwa bei der IHK. Mein Workshop lohnt sich, wenn ihr mit euren eigenen Aufgaben üben wollt.",
      },
    ],
    related: ["it-grundschutz", "buero-automatisierung", "ki-chatbot"],
    thema: "KI-Workshop",
  },
];

/**
 * Katalog aller Angebote aus den sieben Tabellen der Recherche.
 * Preise: Seiten-Angebote wie freigegeben, alle übrigen mit der Untergrenze des Vorschlags aus der Recherche.
 * hinweis „Förderung möglich“ = in der Recherche als Digitalbonus-Projekt genannt, „neu“ = getrieben von einer neuen Pflicht.
 */
export const katalogDe: KatalogFamilie[] = [
  {
    titel: "Erreichbarkeit",
    warum: "Wer bei der Arbeit nicht ans Telefon kann, verpasst Anrufe und Anfragen, aus denen Aufträge werden könnten.",
    angebote: [
      {
        name: "Betreuter KI-Telefonassistent",
        was: "Nimmt Anrufe an, fragt die wichtigen Angaben ab und schickt dir eine Notiz per E-Mail oder, wenn du willst, per Telegram.",
        preis: "ab 490 € + ab 99 €/Monat",
        seite: "ki-telefon",
      },
      {
        name: "SMS-Antwort auf verpasste Anrufe",
        was: "Nach einem verpassten Anruf bekommt der Anrufer eine SMS mit Link zu deinem Anfrageformular, in dem er auch Fotos hochladen kann. Den Text der SMS stimmen wir vorher ab und lassen ihn rechtlich prüfen.",
        preis: "ab 29 €/Monat + kleine Einrichtung",
      },
      {
        name: "Website-Chatbot",
        was: "Beantwortet Fragen aus geprüften Website-Inhalten, nimmt Anfragen auf und leitet sie an dich weiter.",
        preis: "ab 500 € + ab 29 €/Monat",
        seite: "ki-chatbot",
      },
      {
        name: "WhatsApp-Service-Bot",
        was: "Verschickt Terminbestätigungen, Statusmeldungen und Erinnerungen über WhatsApp, als firmeneigener Service-Bot.",
        preis: "Pauschale + Nachrichtengebühren zum Einkaufspreis",
        seite: "ki-chatbot",
      },
      {
        name: "Direktanfrage-Funnel mit Preisrechner",
        was: "Anfrage mit Foto- und Video-Upload, Volumen- oder Preisrechner, sofortiger Preisspanne und Erinnerung zum Nachfassen.",
        preis: "ab 790 € + ab 49 €/Monat",
      },
    ],
  },
  {
    titel: "Personal",
    warum: "Zwischen Gratisanzeige und teurer Agentur fehlt kleinen Betrieben oft ein bezahlbarer Weg zu Bewerbern.",
    angebote: [
      {
        name: "Recruiting-Paket zum Festpreis",
        was: "Karriereseite je Beruf, Kurzbewerbung in 60 Sekunden ohne Lebenslauf und Meldung an dich per E-Mail oder Telegram.",
        preis: "ab 990 €",
        seite: "recruiting",
      },
      {
        name: "Recruiting-Pflege",
        was: "Stellen aktuell halten, als Gratisanzeige bei Indeed und in der Jobbörse der Bundesagentur für Arbeit einstellen, Monatsbericht zu den Bewerbungen.",
        preis: "ab 49 €/Monat",
        seite: "recruiting",
      },
      {
        name: "Meta-Kampagne als Einmalpaket",
        was: "Anzeige, Zielgruppe und Kurzbewerbung für eine dringende Stelle, 30 Tage lang, im Werbekonto deines Betriebs.",
        preis: "nach Absprache, Werbebudget über dein Konto",
      },
      {
        name: "Bewerber- und Einsatzportal",
        was: "Kurzbewerbung, Upload von Dokumenten, Checkliste für die Einarbeitung und Schichtinfos per Bot.",
        preis: "Festpreis nach Erstgespräch",
        seite: "web-apps",
        hinweis: "Förderung möglich",
      },
    ],
  },
  {
    titel: "Abläufe",
    warum: "Zettel, Excel-Listen und Messenger-Gruppen werden unübersichtlich, sobald mehrere Leute an einem Auftrag arbeiten.",
    angebote: [
      {
        name: "Digitale Auftragsmappe als Web-App",
        was: "Auftragsliste, Fotos und Unterschrift auf dem Handy, Protokoll als PDF, Versand an den Endkunden und Export in eine Tabelle.",
        preis: "Festpreis nach Erstgespräch",
        seite: "web-apps",
        hinweis: "Förderung möglich",
      },
      {
        name: "Fahrer-App mit Fristen-Mail",
        was: "Abfahrtskontrolle mit Mängelfoto, Ablieferbeleg mit Unterschrift und eine Erinnerung am Morgen an Fristen für Fahrzeug und Fahrer.",
        preis: "Festpreis nach Erstgespräch",
        seite: "web-apps",
      },
      {
        name: "Stundenzettel mit Kundenfreigabe und Fristen-Ampel",
        was: "Zeiterfassung mit Freigabe durch den Einsatzkunden, Hinweis auf Equal-Pay-Fristen und Export für die Lohnabrechnung.",
        preis: "Festpreis nach Erstgespräch",
        seite: "web-apps",
      },
      {
        name: "Auftrags- und Statusportal für Geschäftskunden",
        was: "Geschäftskunden legen Aufträge mit Fotos an, sehen den Status und bekommen Protokolle als PDF und eine Sammelrechnung.",
        preis: "Festpreis nach Erstgespräch",
        seite: "web-apps",
        hinweis: "Förderung möglich",
      },
      {
        name: "Kunden-App oder PWA",
        was: "Bestellen, Buchen, Treuepunkte und Push-Nachrichten, als Web-App oder im App Store.",
        preis: "Festpreis nach Erstgespräch",
        seite: "web-apps",
      },
    ],
  },
  {
    titel: "Büro",
    warum: "In Betrieben ohne Bürokraft bleiben Rechnungen, Fristen und Belege am Inhaber hängen.",
    angebote: [
      {
        name: "Büro-Assistent per Telegram",
        was: "Sprachnachricht oder Foto vom Brief wird zur Aufgabe, zur Frist oder zum Beleg, mit einer Tagesübersicht am Morgen.",
        preis: "Festpreis nach Erstgespräch",
        seite: "buero-automatisierung",
      },
      {
        name: "Rechnungseingang und Zahlungserinnerung als Dienst",
        was: "E-Rechnungen im Postfach erkennen, Fälligkeit und Skonto auslesen, weiterleiten und Zahlungserinnerungen nach deiner Freigabe verschicken.",
        preis: "Festpreis nach Erstgespräch",
        seite: "buero-automatisierung",
        hinweis: "neu",
      },
      {
        name: "E-Rechnungs-Startpaket",
        was: "Passenden Tarif wählen, Vorlagen und Stammdaten anlegen, Testversand an dich und deinen Steuerberater, kurze Einweisung.",
        preis: "ab 300 €",
        seite: "e-rechnung",
        hinweis: "neu",
      },
      {
        name: "Zeiterfassung einrichten",
        was: "App auswählen und einrichten, Stammdaten anlegen, Export ans Lohnbüro und Einweisung. Die Lizenzen zahlst du direkt beim Anbieter.",
        preis: "ab 290 €",
        hinweis: "neu",
      },
      {
        name: "Automations-Betreuung",
        was: "Bestehende Abläufe in n8n oder Make überwachen, bei Änderungen der Anbieter reparieren und kleine Anpassungen im vereinbarten Umfang übernehmen.",
        preis: "ab 49 €/Monat",
      },
      {
        name: "KI-Assistent für Firmenwissen",
        was: "Interner Chat auf Basis von Handbüchern, Preislisten und Abläufen oder KI-Erfassung von Lieferscheinen, mit Schulung.",
        preis: "ab 12.000 €",
        hinweis: "Förderung möglich",
      },
    ],
  },
  {
    titel: "Sichtbarkeit",
    warum: "Ein gepflegtes Google-Profil, echte Bewertungen und eine aktuelle Website helfen dabei, dass Kunden dich vor Ort finden und dir vertrauen.",
    angebote: [
      {
        name: "Google-Profil- und Bewertungspflege",
        was: "2 bis 4 Beiträge im Monat, Antworten auf alle Bewertungen, neue Fotos jedes Quartal und aktuelle Öffnungszeiten.",
        preis: "ab 49 €/Monat",
        seite: "google-profil",
      },
      {
        name: "Bewertungs-Kit",
        was: "NFC- und QR-Aufsteller, Karten, Link und Anfragetext, mit einem Ablauf für alle Kunden ohne Vorauswahl.",
        preis: "ab 99 €",
        seite: "google-profil",
      },
      {
        name: "Website-Wartung und Updates",
        was: "Updates, Backups, Überwachung, kleine Änderungen und ein fester Ansprechpartner für deine Website.",
        preis: "ab 49 €/Monat",
        seite: "website-betreuung",
      },
      {
        name: "„Termine ohne Ausfall“",
        was: "Buchungstool auswählen und einbinden, Anzahlung oder Ausfallgebühr per Checkbox, Erinnerung und, wenn der Kunde zugestimmt hat, eine Bewertungsanfrage nach dem Termin.",
        preis: "ab 290 € + ab 15 €/Monat",
      },
      {
        name: "Lokale Seiten und KI-Sichtbarkeits-Check",
        was: "Eine Seite je Leistung und Ort, einheitliche Einträge in Verzeichnissen und ein monatlicher Test mit festen Fragen an ChatGPT und Perplexity.",
        preis: "ab 490 € oder ab 49 €/Monat",
      },
      {
        name: "Anzeigenbetreuung in ausgewählten Fällen",
        was: "Google-Anzeigen in der Saison oder Meta-Anzeigen fürs Recruiting, sinnvoll ab 500 € Werbebudget, das über dein eigenes Werbekonto läuft.",
        preis: "ab 199 € + ab 149 €/Monat",
      },
      {
        name: "Kurzvideos aus Kundenmaterial",
        was: "Du filmst mit dem Handy, ich schneide daraus 4 bis 8 Kurzvideos im Monat.",
        preis: "ab 199 €/Monat",
      },
    ],
  },
  {
    titel: "Sicherheit und Schulung",
    warum: "Kleine Firmen haben selten eine IT-Abteilung, aber Konten, Kundendaten und Teams, die schon mit KI arbeiten.",
    angebote: [
      {
        name: "Digitaler Hausmeister",
        was: "Domain, sichere E-Mail-Zustellung, Microsoft 365 oder Google Workspace, Konten, Passwortmanager und Backups für bis zu 5 Postfächer.",
        preis: "Festpreis nach Erstgespräch",
        seite: "it-grundschutz",
      },
      {
        name: "IT-Grundschutz-Paket",
        was: "Zwei-Faktor-Anmeldung, Passwortmanager, Backup mit Wiederherstellungstest, Geräteliste, kurze Schulung und Hilfe bei Sicherheitsfragebögen.",
        preis: "Festpreis nach Erstgespräch",
        seite: "it-grundschutz",
      },
      {
        name: "KI-Praxis-Workshop mit Schulungsnachweis",
        was: "2 bis 4 Stunden „ChatGPT und Co. sicher im Betrieb“ mit Bedarfsliste, Teilnahmeliste, Inhaltsnachweis und einfacher KI-Regel.",
        preis: "ab 490 €",
        seite: "ki-workshop",
        hinweis: "neu",
      },
      {
        name: "BFSG-Schnellcheck und barrierearme Umbauten",
        was: "Prüfung festgelegter Seiten gegen WCAG 2.1 AA mit Bericht und Korrekturen, für Online-Shops und Buchungsstrecken.",
        preis: "ab 190 €, Korrekturen nach Aufwand",
        hinweis: "neu",
      },
    ],
  },
  {
    titel: "Wachstum",
    warum: "Neue Sprachen, neue Regionen oder neue Kunden kosten viel, wenn jede Lösung von vorne entwickelt wird.",
    angebote: [
      {
        name: "Mehrsprachige Website mit KI-Assistent (Deutsch, Englisch, Russisch)",
        was: "Website, Chatbot, Telegram-Anbindung und Pflege in drei Sprachen, für Firmen in Deutschland, in der übrigen EU und in Israel.",
        preis: "Festpreis nach Umfang",
      },
      {
        name: "White-Label für Agenturen",
        was: "Ich baue, deine Agentur verkauft unter eigenem Namen, etwa KI-Automationen, Apps oder deutschsprachige Projekte mit DSGVO-Anforderungen.",
        preis: "Festpreis je Projekt",
      },
      {
        name: "Branchen-Abo aus einer bewährten Kundenlösung",
        was: "Eine Lösung, die sich bei einem Betrieb bewährt hat, etwa ein Anfrage-Funnel für Umzugsunternehmen, als Abo für weitere Betriebe derselben Branche.",
        preis: "ab 49 €/Monat je Betrieb",
      },
    ],
  },
];
