import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Siraj Quran',
  description: 'Datenschutzerklärung für die App Siraj — Quran & Gebetszeiten',
  robots: { index: true, follow: true },
};

export default function SirajDatenschutz() {
  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] py-16 px-5">
      <div className="max-w-[720px] mx-auto">
        <h1 className="text-[#57c5b6] text-4xl font-bold mb-2">
          Datenschutzerklärung
        </h1>
        <p className="text-[#8b949e] text-sm mb-12">
          Siraj — Quran &amp; Gebetszeiten &nbsp;·&nbsp; Zuletzt aktualisiert: März 2026
        </p>

        <Section title="1. Überblick">
          <p>
            Diese Datenschutzerklärung erläutert, wie die App{' '}
            <strong className="text-[#e6edf3]">Siraj — Quran &amp; Gebetszeiten</strong>{' '}
            mit deinen Daten umgeht. Wir legen größten Wert auf den Schutz deiner Privatsphäre.
          </p>
        </Section>

        <Section title="2. Lokal gespeicherte Daten">
          <p>
            Die App sammelt keine persönlichen Daten auf unseren Servern. Alle Daten werden
            ausschließlich lokal auf deinem Gerät gespeichert:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Lesefortschritt &amp; besuchte Seiten</li>
            <li>Lesezeichen und Notizen</li>
            <li>App-Einstellungen (Schriftgröße, Sprache, Rezitator)</li>
            <li>Tagesvers-Verlauf</li>
          </ul>
        </Section>

        <Section title="3. Standortzugriff" badge="Optional">
          <p>
            Die App kann deinen Standort verwenden, um genaue Gebetszeiten zu berechnen. Der
            Standort wird nicht gespeichert, nicht weitergegeben und nur in dem Moment verwendet,
            wenn die Gebetszeiten berechnet werden. Du kannst die App ohne Standortzugriff nutzen
            (manuelle Stadtauswahl).
          </p>
        </Section>

        <Section title="4. Mikrofon & Spracherkennung" badge="Optional">
          <p>
            Der <strong className="text-[#e6edf3]">Hifz-Modus</strong> (Quran-Auswendiglernen)
            kann dein Mikrofon und Apples Spracherkennungs-Framework (SFSpeechRecognition)
            verwenden, um deine Rezitation Wort für Wort zu überprüfen:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Sprachaufnahmen werden nicht von uns gespeichert oder übertragen</li>
            <li>Die Spracherkennung wird von Apples SFSpeechRecognizer verarbeitet</li>
            <li>
              Apple verarbeitet Audio gemäß seiner eigenen Datenschutzrichtlinie (
              <a
                href="https://www.apple.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#57c5b6] hover:underline"
              >
                apple.com/privacy
              </a>
              )
            </li>
            <li>Der Hifz-Modus ist vollständig optional und kann jederzeit deaktiviert werden</li>
          </ul>
        </Section>

        <Section title="5. Audio-Wiedergabe" badge="Optional">
          <p>
            Für die Wiedergabe von Quran-Rezitationen benötigt die App Zugriff auf die
            Audio-Wiedergabe deines Geräts. Es werden keine Audioaufnahmen erstellt oder
            gespeichert.
          </p>
        </Section>

        <Section title="6. Foto-Bibliothek" badge="Optional">
          <p>
            Falls du Inhalte aus deiner Fotobibliothek verwenden möchtest, greift die App nur mit
            deiner ausdrücklichen Erlaubnis darauf zu. Es werden keine Fotos ohne deine Zustimmung
            gespeichert oder übertragen.
          </p>
        </Section>

        <Section title="7. Externe Dienste">
          <p>
            Die App nutzt folgende externe APIs ausschließlich zur Inhaltsbereitstellung:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong className="text-[#e6edf3]">api.quran.com</strong> – Quran-Text,
              Übersetzungen, Tajweed, Rezitationen
            </li>
            <li>
              <strong className="text-[#e6edf3]">api.alquran.cloud</strong> – Quran-Text &amp;
              Übersetzungen
            </li>
            <li>
              <strong className="text-[#e6edf3]">aladhan.com</strong> – Gebetszeitenberechnung
            </li>
          </ul>
          <p className="mt-3">
            Diese Dienste erhalten deine IP-Adresse durch normale Netzwerkanfragen, haben aber
            keinen Zugriff auf persönliche Identifikationsdaten.
          </p>
        </Section>

        <Section title="8. Datenweitergabe">
          <p>
            Wir geben keine persönlichen Daten an Dritte weiter. Es gibt kein Tracking, keine
            Werbung und keine Analyse-Tools in der App.
          </p>
        </Section>

        <Section title="9. Datenlöschung">
          <p>
            Alle lokal gespeicherten Daten können jederzeit gelöscht werden, indem die App vom
            Gerät deinstalliert wird.
          </p>
        </Section>

        <Section title="10. Änderungen dieser Erklärung">
          <p>
            Änderungen an dieser Datenschutzerklärung werden auf dieser Seite veröffentlicht. Wir
            empfehlen, diese Seite regelmäßig zu prüfen.
          </p>
        </Section>

        <Section title="11. Kontakt">
          <p>
            Bei Fragen zum Datenschutz:{' '}
            <a
              href="mailto:zaurhatu@gmail.com"
              className="text-[#57c5b6] hover:underline"
            >
              zaurhatu@gmail.com
            </a>
          </p>
          <p className="mt-2">
            Verantwortlicher: Zaur Hatuev &nbsp;·&nbsp; Steiner Ring 64, 82538 Geretsried
          </p>
        </Section>

        <footer className="mt-20 pt-5 border-t border-[#21262d] text-[#484f58] text-sm">
          <p>
            Siraj — Quran &amp; Gebetszeiten &nbsp;·&nbsp; © 2026 &nbsp;·&nbsp;{' '}
            <a href="mailto:zaurhatu@gmail.com" className="text-[#57c5b6] hover:underline">
              zaurhatu@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-[#e6edf3] text-lg font-semibold pb-2 border-b border-[#21262d] mb-3 flex items-center gap-2">
        {title}
        {badge && (
          <span className="text-xs border border-[rgba(87,197,182,0.3)] bg-[rgba(87,197,182,0.12)] text-[#57c5b6] rounded px-2 py-0.5 font-normal">
            {badge}
          </span>
        )}
      </h2>
      <div className="text-[#8b949e] leading-relaxed space-y-2">{children}</div>
    </section>
  );
}
