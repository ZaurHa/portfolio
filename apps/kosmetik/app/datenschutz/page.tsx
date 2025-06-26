import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  robots: {
    index: false,
  },
}

export default function Datenschutz() {
  return (
    <section className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Datenschutzerklärung</h1>
      <p className="mb-4">
        Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TMG).
      </p>
      <p className="mb-4">
        Diese Website verwendet Platzhalter-Texte für die Datenschutzerklärung. Bitte passen Sie diesen Text individuell an Ihr Unternehmen und Ihre tatsächlichen Datenverarbeitungsprozesse an.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Kontakt mit uns</h2>
      <p className="mb-4">
        Wenn Sie per Formular auf der Website oder per E-Mail Kontakt mit uns aufnehmen, werden Ihre angegebenen Daten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
      </p>
      <h2 className="text-xl font-semibold mt-8 mb-2">Ihre Rechte</h2>
      <p className="mb-4">
        Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt, können Sie sich bei der Aufsichtsbehörde beschweren.
      </p>
      <p className="mt-8 text-neutral-400 text-sm">Dies ist ein Platzhalter für die Datenschutzerklärung. Bitte passen Sie die Angaben individuell an Ihr Unternehmen an.</p>
    </section>
  );
} 