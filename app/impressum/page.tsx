import React from 'react';

export default function Impressum() {
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        Zaur Hatuev<br />
        Steiner Ring 64<br />
        82538 Geretsried<br />
        Deutschland
      </p>
      <h2>Kontakt</h2>
      <p>
        E-Mail: <a href="mailto:zaur@brandwerkx.de">zaur@brandwerkx.de</a><br />
        Internet: <a href="https://brandwerkx.vercel.com" target="_blank" rel="noopener noreferrer">https://brandwerkx.vercel.com</a>
      </p>
      <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
      <p>
        Zaur Hatuev<br />
        Steiner Ring 64<br />
        82538 Geretsried
      </p>
    </main>
  );
} 