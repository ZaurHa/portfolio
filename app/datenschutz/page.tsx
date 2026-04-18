import React from 'react';

export default function Datenschutz() {
  return (
    <main style={{ maxWidth: 700, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1>Datenschutzerklärung</h1>
      <p><strong>Stand:</strong> {new Date().toLocaleDateString('de-DE')}</p>
      <h2>1. Allgemeine Hinweise</h2>
      <p>Der Schutz Ihrer Daten ist uns wichtig. Diese Website verarbeitet personenbezogene Daten nur im technisch notwendigen Umfang. Die nachfolgende Erklärung gibt Ihnen einen Überblick, welche Daten auf dieser Website erhoben werden.</p>
      <h2>2. Verantwortlicher</h2>
      <p>
        Zaur Hatuev<br />
        Steiner Ring 64<br />
        82538 Geretsried<br />
        E-Mail: <a href="mailto:zaur@brandwerkx.de">zaur@brandwerkx.de</a>
      </p>
      <h2>3. Zugriffsdaten und Hosting</h2>
      <p>Beim Besuch dieser Website werden automatisch Informationen in sogenannten Server-Logfiles gespeichert. Dies sind u. a.:<br />
        - Browsertyp und Browserversion<br />
        - Betriebssystem<br />
        - Referrer-URL<br />
        - Hostname des zugreifenden Rechners<br />
        - Uhrzeit der Serveranfrage<br />
        Diese Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Daten dienen ausschließlich der Betriebssicherheit.
      </p>
      <h2>4. Kontaktformular</h2>
      <p>Wenn Sie uns per Kontaktformular Anfragen senden, werden Ihre Angaben inklusive der angegebenen Kontaktdaten gespeichert, um die Anfrage zu bearbeiten. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
      <h2>5. Cookies und Tracking</h2>
      <p>Diese Website verwendet keine Cookies, kein Tracking und keine Analyse-Tools.</p>
      <h2>6. Externe Dienste / Inhalte</h2>
      <p>Diese Website bindet keine externen Schriftarten (z. B. Google Fonts), keine YouTube-Videos und keine Drittanbieter-Widgets ein.</p>
      <h2>7. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Zweck der Verarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu können Sie sich jederzeit an die im Impressum angegebene Adresse wenden.</p>
      <h2>8. SSL-/TLS-Verschlüsselung</h2>
      <p>Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.</p>
    </main>
  );
} 