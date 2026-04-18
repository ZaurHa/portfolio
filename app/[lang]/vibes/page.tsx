import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vibes – Social Video App',
  description: 'Die Social Video App. Teile kurze Videos, folge Creators und entdecke neue Inhalte. Jetzt kostenlos herunterladen.',
};

const features = [
  { icon: '🎥', title: 'Videos & Fotos teilen', desc: 'Teile kurze Videos und Fotos mit deinen Followern. Mit Captions, Tags und mehr.' },
  { icon: '🔴', title: 'Live-Streaming', desc: 'Gehe live und interagiere in Echtzeit mit deiner Community. Kommentare und Reaktionen live.' },
  { icon: '✨', title: 'Personalisierter Feed', desc: 'Dein Feed zeigt dir Inhalte von Creators denen du folgst — keine Algorithmus-Manipulationen.' },
  { icon: '💬', title: 'Kommentare & Reaktionen', desc: 'Kommentiere direkt unter Posts, antworte auf Kommentare und reagiere mit Likes.' },
  { icon: '🔔', title: 'Push-Benachrichtigungen', desc: 'Erfahre sofort wenn jemand dein Video liked, kommentiert oder dir folgt.' },
  { icon: '🔒', title: 'Datenschutz first', desc: 'Keine Werbung, kein Tracking. Deine Daten gehören dir. DSGVO-konform.' },
];

export default async function VibesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main style={{ background: '#07070d', minHeight: '100vh', color: '#e5e7eb' }}>

      {/* HERO */}
      <section style={{
        textAlign: 'center',
        padding: '100px 20px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 600, height: 400,
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* App icon */}
        <div style={{
          width: 80, height: 80,
          background: 'linear-gradient(135deg, #7C3AED, #A855F7)',
          borderRadius: 22,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40, margin: '0 auto 28px',
          boxShadow: '0 8px 40px rgba(124,58,237,0.5)',
        }}>
          🎵
        </div>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(124,58,237,0.15)',
          border: '1px solid rgba(124,58,237,0.35)',
          color: '#c4b5fd',
          borderRadius: 99, padding: '6px 16px',
          fontSize: '0.82rem', fontWeight: 500,
          marginBottom: 24,
        }}>
          🚀 Jetzt im App Store & Google Play
        </div>

        <h1 style={{
          fontSize: 'clamp(2.4rem, 6vw, 4rem)',
          fontWeight: 800, lineHeight: 1.12,
          color: '#fff', marginBottom: 20,
          letterSpacing: '-0.02em',
        }}>
          Teile deine{' '}
          <span style={{
            background: 'linear-gradient(135deg, #A855F7, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Vibes
          </span>
          {' '}mit der Welt
        </h1>

        <p style={{
          fontSize: '1.15rem', color: '#9ca3af',
          maxWidth: 480, margin: '0 auto 40px',
          lineHeight: 1.65,
        }}>
          Die Social Video App für kurze Videos, Live-Streams und echte Verbindungen.
          Entdecke Creators, teile Momente und sei dabei.
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://apps.apple.com/app/vibes/id6760790424" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#000', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', textDecoration: 'none',
            padding: '14px 24px', borderRadius: 14,
            fontWeight: 600, fontSize: '0.95rem',
          }}>
            <span style={{ fontSize: '1.5rem' }}>🍎</span>
            <span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af' }}>Laden im</span>
              <span style={{ display: 'block', fontWeight: 700 }}>App Store</span>
            </span>
          </a>
          <Link href={`/${lang}/vibes/datenschutz`} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#e5e7eb', textDecoration: 'none',
            padding: '14px 24px', borderRadius: 14,
            fontWeight: 600, fontSize: '0.95rem',
          }}>
            🔒 Datenschutz
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '80px 20px', maxWidth: 1000, margin: '0 auto' }}>
        <p style={{
          textAlign: 'center', color: '#A855F7',
          fontSize: '0.82rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Features
        </p>
        <h2 style={{
          textAlign: 'center', color: '#fff',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 700, marginBottom: 56,
          letterSpacing: '-0.01em',
        }}>
          Alles was du brauchst
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {features.map((f) => (
            <div key={f.title} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 16, padding: 28,
            }}>
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section style={{ textAlign: 'center', padding: '80px 20px 100px' }}>
        <h2 style={{
          color: '#fff',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 700, marginBottom: 12,
        }}>
          Jetzt kostenlos herunterladen
        </h2>
        <p style={{ color: '#9ca3af', marginBottom: 36, fontSize: '1rem' }}>
          Verfügbar für iPhone und Android
        </p>

        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <a href="https://apps.apple.com/app/vibes/id6760790424" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: '#000', border: '1px solid rgba(255,255,255,0.2)',
            color: '#fff', textDecoration: 'none',
            padding: '14px 24px', borderRadius: 14, fontSize: '0.9rem',
          }}>
            <span style={{ fontSize: '1.6rem' }}>🍎</span>
            <span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af' }}>Laden im</span>
              <span style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem' }}>App Store</span>
            </span>
          </a>
          <a href="https://play.google.com/store/apps/details?id=com.vibesapp.vibes" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff', textDecoration: 'none',
            padding: '14px 24px', borderRadius: 14, fontSize: '0.9rem',
          }}>
            <span style={{ fontSize: '1.6rem' }}>▶️</span>
            <span>
              <span style={{ display: 'block', fontSize: '0.72rem', color: '#9ca3af' }}>Jetzt bei</span>
              <span style={{ display: 'block', fontWeight: 600, fontSize: '0.95rem' }}>Google Play</span>
            </span>
          </a>
        </div>

        <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href={`/${lang}/vibes/datenschutz`} style={{ color: '#6b7280', fontSize: '0.9rem', textDecoration: 'none' }}>
            Datenschutzerklärung
          </Link>
          <Link href={`/${lang}/vibes/agb`} style={{ color: '#6b7280', fontSize: '0.9rem', textDecoration: 'none' }}>
            Nutzungsbedingungen
          </Link>
          <a href="mailto:zaurhatu@gmail.com" style={{ color: '#6b7280', fontSize: '0.9rem', textDecoration: 'none' }}>
            Kontakt
          </a>
        </div>
      </section>

    </main>
  );
}
