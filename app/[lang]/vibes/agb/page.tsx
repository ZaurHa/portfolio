import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nutzungsbedingungen – Vibes App',
  description: 'Nutzungsbedingungen (AGB) der Vibes Social Video App.',
};

export default async function VibesAGB({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main style={{ background: '#07070d', minHeight: '100vh', color: '#e5e7eb', padding: '60px 20px 100px' }}>
      <div style={{ maxWidth: 740, margin: '0 auto' }}>

        <Link href={`/${lang}/vibes`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          color: '#A855F7', textDecoration: 'none', fontSize: '0.9rem',
          marginBottom: 40,
        }}>
          ← Zurück zu Vibes
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48,
            background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
            borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24,
          }}>🎵</div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>Vibes</div>
            <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>Social Video App</div>
          </div>
        </div>

        <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, marginBottom: 8 }}>
          Nutzungsbedingungen
        </h1>
        <p style={{ color: '#6b7280', marginBottom: 48, fontSize: '0.9rem' }}>
          Stand: März 2026
        </p>

        {sections.map((s) => (
          <div key={s.title}>
            <h2 style={{
              color: '#e5e7eb', fontSize: '1.05rem', fontWeight: 600,
              margin: '36px 0 12px', paddingBottom: 10,
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>{s.title}</h2>
            {s.content.map((line, i) => (
              <p key={i} style={{ color: '#9ca3af', fontSize: '0.93rem', lineHeight: 1.75, marginBottom: 10 }}>
                {line}
              </p>
            ))}
          </div>
        ))}

        <div style={{ marginTop: 60, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href={`/${lang}/vibes`} style={{ color: '#A855F7', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Zurück zur Vibes-Seite
          </Link>
        </div>
      </div>
    </main>
  );
}

const sections = [
  {
    title: '1. Geltungsbereich',
    content: [
      'Diese Nutzungsbedingungen gelten für die Nutzung der mobilen App "Vibes" (iOS und Android), bereitgestellt von Zaur Hatuev, Steiner Ring 64, 82538 Geretsried.',
      'Mit der Registrierung und Nutzung der App erklärst du dich mit diesen Bedingungen einverstanden.',
    ],
  },
  {
    title: '2. Registrierung und Konto',
    content: [
      'Zur Nutzung von Vibes ist eine Registrierung mit einer gültigen E-Mail-Adresse erforderlich.',
      'Du bist verpflichtet, deine Zugangsdaten sicher aufzubewahren und niemandem weiterzugeben.',
      'Pro Person ist nur ein Konto erlaubt. Mehrfachkonten können ohne Vorankündigung gesperrt werden.',
      'Du musst mindestens 13 Jahre alt sein, um Vibes zu nutzen.',
    ],
  },
  {
    title: '3. Nutzungsregeln und verbotene Inhalte',
    content: [
      'Folgende Inhalte sind auf Vibes verboten: pornografische oder sexuell explizite Inhalte, Hassreden, Diskriminierung, Belästigung und Mobbing, Gewaltdarstellungen, illegale Inhalte jeglicher Art, Spam und unerwünschte Werbung sowie Inhalte, die Rechte Dritter (z.B. Urheberrechte) verletzen.',
      'Wir behalten uns das Recht vor, Inhalte ohne Vorankündigung zu entfernen und Konten bei Verstößen zu sperren oder zu löschen.',
    ],
  },
  {
    title: '4. Deine Inhalte',
    content: [
      'Du behältst alle Rechte an den Inhalten, die du auf Vibes veröffentlichst.',
      'Mit der Veröffentlichung räumst du Vibes ein nicht-exklusives, weltweites Recht ein, die Inhalte im Rahmen der App-Funktionen anzuzeigen und zu verbreiten.',
      'Du garantierst, dass du das Recht hast, die veröffentlichten Inhalte zu teilen.',
    ],
  },
  {
    title: '5. Haftungsausschluss',
    content: [
      'Vibes wird "wie besehen" bereitgestellt. Wir übernehmen keine Garantie für ununterbrochene Verfügbarkeit oder Fehlerfreiheit.',
      'Für Inhalte, die von Nutzern veröffentlicht werden, übernehmen wir keine Haftung.',
      'Die Haftung für leichte Fahrlässigkeit ist — soweit gesetzlich zulässig — ausgeschlossen.',
    ],
  },
  {
    title: '6. Verfügbarkeit und Änderungen',
    content: [
      'Wir behalten uns vor, die App jederzeit zu ändern, zu erweitern oder den Betrieb einzustellen.',
      'Wesentliche Änderungen werden dir rechtzeitig mitgeteilt.',
    ],
  },
  {
    title: '7. Kündigung',
    content: [
      'Du kannst dein Konto jederzeit in den App-Einstellungen löschen.',
      'Wir behalten uns das Recht vor, Konten bei schwerwiegenden Verstößen gegen diese Nutzungsbedingungen fristlos zu sperren.',
    ],
  },
  {
    title: '8. Anwendbares Recht',
    content: [
      'Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.',
      'Gerichtsstand ist, soweit gesetzlich zulässig, Geretsried, Deutschland.',
    ],
  },
  {
    title: '9. Kontakt',
    content: [
      'Bei Fragen zu diesen Nutzungsbedingungen wende dich an: zaurhatu@gmail.com',
    ],
  },
];
