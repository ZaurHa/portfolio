import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum',
  robots: {
    index: false,
  },
}

export default function Impressum() {
  return (
    <section className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">Impressum</h1>
      <p className="mb-2">Beauty Studio</p>
      <p className="mb-2">Max Mustermann</p>
      <p className="mb-2">Musterstraße 1</p>
      <p className="mb-2">12345 Musterstadt</p>
      <p className="mb-2">Telefon: 01234 567890</p>
      <p className="mb-2">E-Mail: info@beauty-studio.de</p>
      <p className="mt-6 text-neutral-400 text-sm">Dies ist ein Platzhalter-Impressum. Bitte passen Sie die Angaben individuell an Ihr Unternehmen an.</p>
    </section>
  );
} 