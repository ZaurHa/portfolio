import React from 'react';

export default function Footer() {
  return (
    <footer style={{ width: '100%', textAlign: 'center', padding: '1.5rem 0', background: '#0a0a0c', color: '#fff', fontSize: '1rem' }}>
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
        <a href="/impressum" style={{ color: '#fff', textDecoration: 'underline' }}>Impressum</a>
        <a href="/datenschutz" style={{ color: '#fff', textDecoration: 'underline' }}>Datenschutz</a>
        <a href="/agb" style={{ color: '#fff', textDecoration: 'underline' }}>AGB</a>
        <a href="/kontakt" style={{ color: '#fff', textDecoration: 'underline' }}>Kontakt</a>
      </nav>
      <div style={{ marginTop: '0.7rem', fontSize: '0.95em', opacity: 0.7 }}>
        © {new Date().getFullYear()} BrandWerkX. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
} 