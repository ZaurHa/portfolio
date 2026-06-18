import React from 'react';

export default function Datenschutz() {
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Datenschutzerklärung</h1>
      <p><strong>Stand:</strong> {new Date().toLocaleDateString('de-DE')}</p>
      <h2>1. Allgemeine Hinweise</h2>
      <p>Der Schutz Ihrer Daten ist uns wichtig. Diese Website verarbeitet personenbezogene Daten nur im technisch notwendigen Umfang.</p>
      <h2>2. Verantwortlicher</h2>
      <p>Zaur Hatuev<br />Steiner Ring 64<br />82538 Geretsried<br />E-Mail: <a href="mailto:brandwerkx@gmail.com">brandwerkx@gmail.com</a></p>
      <h2>3. Zugriffsdaten und Hosting</h2>
      <p>Beim Besuch dieser Website werden automatisch Informationen in Server-Logfiles gespeichert. Diese Daten sind nicht bestimmten Personen zuordenbar und dienen ausschließlich der Betriebssicherheit.</p>
      <h2>4. Kontaktformular</h2>
      <p>Wenn Sie uns per Kontaktformular Anfragen senden, werden Ihre Angaben gespeichert, um die Anfrage zu bearbeiten. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
      <h2>5. Cookies und Tracking</h2>
      <p>Diese Website verwendet keine Cookies, kein Tracking und keine Analyse-Tools.</p>
      <h2>6. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Sperrung oder Löschung Ihrer gespeicherten Daten. Hierzu können Sie sich jederzeit an die im Impressum angegebene Adresse wenden.</p>
    </main>
  );
}
