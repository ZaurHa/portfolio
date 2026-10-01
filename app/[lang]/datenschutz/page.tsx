import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '../../../lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === 'en'
    ? pageMetadata({ lang, path: '/datenschutz', title: 'Privacy Policy', description: 'Privacy policy of BrandWerkX.', noindex: true })
    : pageMetadata({ lang, path: '/datenschutz', title: 'Datenschutzerklärung', description: 'Datenschutzerklärung von BrandWerkX.', noindex: true });
}

/** Fester Stand – bei Änderungen an Diensten (Hosting, Mail, Tracking) anpassen. */
const STAND = 'Oktober 2026';

export default async function Datenschutz({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <div className="v3">
      <div className="v3-wrap v3-legal" lang="de">
        <span className="v3-mono"><span className="v3-dot" />DSGVO</span>
        <h1>Datenschutz&shy;erklärung</h1>
        <p className="v3-mono stand">Stand: {STAND}</p>
        {lang === 'en' && (
          <p className="v3-lead" lang="en">This privacy policy is provided in German. In short: no cookies, no tracking; data you send via the contact form is only used to answer your request.</p>
        )}

        <section>
          <h2>1. Verantwortlicher</h2>
          <div>
            <p>BrandWerkX – Inhaber Zaur Hatuev<br />Steiner Ring 64, 82538 Geretsried<br />Telefon: <a href="tel:+491728471641">0172 8471641</a><br />E-Mail: <a href="mailto:brandwerkx@gmail.com">brandwerkx@gmail.com</a></p>
          </div>
        </section>

        <section>
          <h2>2. Das Wichtigste in Kürze</h2>
          <div>
            <ul>
              <li>Diese Website setzt <strong>keine Cookies</strong> und verwendet <strong>kein Tracking</strong> und keine Analyse-Tools.</li>
              <li>Schriftarten werden <strong>lokal</strong> von diesem Server geladen – es besteht keine Verbindung zu Google Fonts.</li>
              <li>Personenbezogene Daten verarbeite ich nur, wenn du mich kontaktierst, und nur, um deine Anfrage zu bearbeiten.</li>
            </ul>
          </div>
        </section>

        <section>
          <h2>3. Hosting und Server-Logfiles</h2>
          <div>
            <p>Diese Website wird über <strong>Cloudflare Pages</strong> der Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA, ausgeliefert. Beim Aufruf werden technisch notwendige Daten verarbeitet: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer, Browser und Betriebssystem. Das dient der sicheren, schnellen und stabilen Auslieferung der Website, auch zum Schutz vor Angriffen.</p>
            <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren Betrieb). Mit Cloudflare besteht ein Vertrag zur Auftragsverarbeitung (Cloudflare Data Processing Addendum). Eine Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. der EU-Standardvertragsklauseln.</p>
            <p>Das Kontaktformular wird ebenfalls über Cloudflare (Cloudflare Pages Functions) verarbeitet, bevor die Nachricht per E-Mail versendet wird (siehe Punkt 4).</p>
          </div>
        </section>

        <section>
          <h2>4. Kontaktformular</h2>
          <div>
            <p>Wenn du das Kontaktformular nutzt, verarbeite ich die Angaben, die du eingibst: Name, E-Mail-Adresse, optional Telefonnummer und gewünschtes Paket sowie deine Nachricht. Die Daten werden ausschließlich zur Bearbeitung deiner Anfrage und für eventuelle Anschlussfragen genutzt.</p>
            <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Vertrags) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).</p>
            <p>Für den Versand der Formular-E-Mails nutze ich den Dienst <strong>Resend</strong> (Plus Five Five, Inc., USA). Die Anfrage wird an mein E-Mail-Postfach bei <strong>Google</strong> (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) zugestellt. Mit beiden Anbietern bestehen Verträge zur Auftragsverarbeitung; Übermittlungen in die USA erfolgen auf Grundlage der EU-Standardvertragsklauseln bzw. des EU-US Data Privacy Framework.</p>
            <p>Deine Daten werden gelöscht, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen. Kommt ein Auftrag zustande, gelten die handels- und steuerrechtlichen Aufbewahrungsfristen (bis zu 10 Jahre).</p>
          </div>
        </section>

        <section>
          <h2>5. Kontakt per E-Mail, Telefon oder WhatsApp</h2>
          <div>
            <p>Wenn du mich per E-Mail oder Telefon kontaktierst, verarbeite ich deine Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO).</p>
            <p>Der WhatsApp-Button ist ein einfacher Link. Erst wenn du ihn anklickst, wirst du zu WhatsApp (WhatsApp Ireland Limited, Merrion Road, Dublin 4, Irland) weitergeleitet; ab dann gilt deren Datenschutzerklärung. Vorher werden keine Daten an WhatsApp übertragen.</p>
          </div>
        </section>

        <section>
          <h2>6. Externe Links</h2>
          <div>
            <p>Diese Website enthält Links zu anderen Websites, z. B. LinkedIn, GitHub und Referenzprojekten. Beim bloßen Besuch dieser Website werden keine Daten an diese Anbieter übertragen. Erst wenn du einen Link anklickst, gelten die Datenschutzbestimmungen des jeweiligen Anbieters.</p>
          </div>
        </section>

        <section>
          <h2>7. Deine Rechte</h2>
          <div>
            <p>Du hast jederzeit das Recht auf:</p>
            <ul>
              <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung (Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            </ul>
            <p>Eine formlose Nachricht an die oben genannten Kontaktdaten genügt. Außerdem kannst du dich bei einer Datenschutz-Aufsichtsbehörde beschweren, zum Beispiel beim Bayerischen Landesamt für Datenschutzaufsicht (BayLDA), Promenade 18, 91522 Ansbach.</p>
          </div>
        </section>

        <section>
          <h2>8. Verschlüsselung</h2>
          <div>
            <p>Diese Website nutzt eine SSL- bzw. TLS-Verschlüsselung. Du erkennst sie am „https://“ in der Adresszeile.</p>
          </div>
        </section>

        <section>
          <h2>Weitere Angaben</h2>
          <div><p><Link href={`/${lang}/impressum`}>Impressum →</Link></p></div>
        </section>
      </div>
    </div>
  );
}
