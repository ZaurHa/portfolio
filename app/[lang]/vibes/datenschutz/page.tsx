import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung – Vibes App',
  description: 'Datenschutzerklärung der Vibes Social Video App. DSGVO-konform.',
};

export default async function VibesDatenschutz({ params }: { params: Promise<{ lang: string }> }) {
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
          Datenschutzerklärung
        </h1>
        <p style={{ color: '#6b7280', marginBottom: 48, fontSize: '0.9rem' }}>
          Stand: März 2026 · DSGVO-konform
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
    title: '1. Verantwortlicher',
    content: [
      'Verantwortlich für die Datenverarbeitung in der Vibes-App ist:',
      'Zaur Hatuev · Steiner Ring 64 · 82538 Geretsried · Deutschland',
      'E-Mail: zaurhatu@gmail.com · Website: brandwerkx.de',
    ],
  },
  {
    title: '2. Welche Daten wir erheben',
    content: [
      'Registrierungsdaten: E-Mail-Adresse und Passwort (verschlüsselt gespeichert).',
      'Profildaten: Benutzername, Profilbild und Biografie (freiwillig).',
      'Inhalte: Videos, Fotos und Kommentare, die du in der App veröffentlichst.',
      'Nutzungsdaten: Zeitstempel, Geräteinformationen (iOS/Android) und App-Version — ausschließlich für technischen Betrieb.',
      'Push-Tokens: Geräte-Token für Push-Benachrichtigungen (nur mit deiner Zustimmung).',
    ],
  },
  {
    title: '3. Zweck der Datenverarbeitung',
    content: [
      'Wir verarbeiten deine Daten ausschließlich zum Betrieb der App: Authentifizierung, Darstellung von Inhalten, Benachrichtigungen und Unterstützung bei Anfragen.',
      'Es findet keine Weitergabe an Werbetreibende statt. Es wird kein Tracking oder Profiling zu Werbezwecken durchgeführt.',
    ],
  },
  {
    title: '4. Rechtsgrundlagen',
    content: [
      'Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO): Verarbeitung zur Bereitstellung der App-Funktionen.',
      'Einwilligung (Art. 6 Abs. 1 lit. a DSGVO): Push-Benachrichtigungen.',
      'Berechtigte Interessen (Art. 6 Abs. 1 lit. f DSGVO): Technische Sicherheit und Betrieb.',
    ],
  },
  {
    title: '5. Dienste von Drittanbietern',
    content: [
      'Supabase (supabase.com): Datenbankdienst und Authentifizierung. Daten werden in der EU gespeichert. Datenschutzerklärung: supabase.com/privacy',
      'Apple / Google: Push-Benachrichtigungen über APNs (Apple) bzw. FCM (Google). Es werden nur anonymisierte Geräte-Tokens übertragen.',
      'Expo (expo.dev): App-Infrastruktur für Updates und Telemetrie. Datenschutzerklärung: expo.dev/privacy',
    ],
  },
  {
    title: '6. Datenspeicherung und Löschung',
    content: [
      'Deine Daten werden so lange gespeichert, wie du ein Konto bei Vibes hast.',
      'Du kannst dein Konto jederzeit in den App-Einstellungen löschen. Alle Profildaten, Posts und Kommentare werden dann dauerhaft gelöscht.',
      'Logs werden nach spätestens 30 Tagen automatisch gelöscht.',
    ],
  },
  {
    title: '7. Deine Rechte',
    content: [
      'Du hast folgende Rechte gemäß DSGVO: Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21).',
      'Zur Ausübung deiner Rechte wende dich per E-Mail an: zaurhatu@gmail.com',
      'Du hast außerdem das Recht, eine Beschwerde bei einer Datenschutzaufsichtsbehörde einzureichen.',
    ],
  },
  {
    title: '8. Datensicherheit',
    content: [
      'Alle Übertragungen erfolgen verschlüsselt über HTTPS/TLS. Passwörter werden ausschließlich als Hash gespeichert — nie im Klartext.',
      'Der Zugriff auf die Datenbank ist auf autorisierte Systeme beschränkt.',
    ],
  },
  {
    title: '9. Kinder',
    content: [
      'Vibes richtet sich nicht an Kinder unter 13 Jahren. Falls wir erfahren, dass ein Kind unter 13 Jahren ein Konto erstellt hat, werden die Daten unverzüglich gelöscht.',
    ],
  },
  {
    title: '10. Änderungen dieser Datenschutzerklärung',
    content: [
      'Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen. Wesentliche Änderungen werden in der App kommuniziert.',
    ],
  },
];
