import Link from "next/link";
import PageHero from "./PageHero";
import ClosingCta from "./ClosingCta";
import { SITE_URL } from "../../lib/seo";
import { PRUEFUNG, TELEGRAM_KANAL, TELEGRAM_KANAL_RU, type Ausgabe } from "../../lib/ki-chancen";

/** Eine Wochenausgabe der KI-Chancen (neueste unter /de/ki-chancen, frühere unter /de/ki-chancen/<slug>). */
export default function KiAusgabe({ ausgabe: a, archiv, url }: { ausgabe: Ausgabe; archiv: Ausgabe[]; url: string }) {
  const n = (x: number) => String(x).padStart(2, "0");
  const telegram = TELEGRAM_KANAL;
  const telegramRu = TELEGRAM_KANAL_RU;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `KI-Chancen der Woche, Ausgabe ${a.nr}/${a.jahr}`,
    description: a.einordnung,
    datePublished: a.datumIso,
    inLanguage: "de-DE",
    author: { "@type": "Person", name: "Zaur Hatuev", url: `${SITE_URL}/de/ueber-mich` },
    publisher: { "@type": "Organization", name: "BrandWerkX", url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}${url}`,
  };
  // Abschnittsnummern lückenlos, auch wenn „Aussortiert“ oder „Archiv“ fehlen
  let zaehler = a.chancen.length;
  const nrAussortiert = a.aussortiert.length > 0 ? n(++zaehler) : "";
  const nrPruefung = n(++zaehler);
  const nrArchiv = archiv.length > 0 ? n(++zaehler) : "";
  const nrUmsetzen = n(++zaehler);

  return (
    <div className="v3">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        meta={`KI-Chancen · Ausgabe ${a.nr}/${a.jahr}`}
        metaRight={<b>{a.datum} · jeden Sonntag neu</b>}
        title={<><span className="l">Mit KI</span><span className="l"><span className="c">Geld verdienen</span></span></>}
        lead={<>Jede Woche prüfe ich hunderte KI-Neuheiten wie ein Unternehmer: <strong>Wer zahlt wofür, was kostet es, wann kommt der erste Euro?</strong> Hier steht nur, was zwei unabhängige Prüfungen und meine Freigabe besteht.</>}
        actions={telegram ? (
          <>
            <a href={telegram} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-accent">Im Telegram-Kanal lesen <span className="arr" aria-hidden="true">→</span></a>
            <Link href="/de/kontakt" className="v3-btn v3-btn-ghost">Chance umsetzen lassen</Link>
          </>
        ) : (
          <>
            <Link href="/de/kontakt" className="v3-btn v3-btn-accent">Chance umsetzen lassen <span className="arr" aria-hidden="true">→</span></Link>
            <a href="#h-pruefung" className="v3-btn v3-btn-ghost">So prüfe ich</a>
          </>
        )}
      >
        <ol className="v3-funnel v3-rise d3" aria-label="So viel wurde für diese Ausgabe geprüft">
          <li><b>{a.signale}</b><span className="v3-mono">Signale geprüft</span></li>
          <li><b>{a.kandidaten}</b><span className="v3-mono">Kandidaten</span></li>
          <li><b>{a.strategie}</b><span className="v3-mono">Beim Strategen</span></li>
          <li className="is-win"><b>{a.bestanden}</b><span className="v3-mono">Bestanden</span></li>
        </ol>
      </PageHero>

      {a.chancen.map((c, i) => {
        const nr = n(i + 1);
        return (
          <section key={c.titel} className="v3-sec" aria-labelledby={`h-chance-${nr}`}>
            <div className="v3-wrap">
              <div className="v3-sec-head v3-chance-head">
                <span className="num">{nr} / {i === 0 ? "Chance der Woche" : "Chance"}</span>
                <h2 id={`h-chance-${nr}`}>{c.titel}<br /><span className="c">{c.titelAkzent}</span></h2>
                <p>{c.neu}</p>
              </div>
              <div className={`v3-chance${i % 2 ? " is-flip" : ""}`}>
                <div className="v3-chance-text">
                  <div className="v3-chance-block">
                    <span className="v3-mono v3-accent-txt">So verdienst du damit Geld</span>
                    <p>{c.geld}</p>
                  </div>
                  <div className="v3-chance-block is-step">
                    <span className="v3-mono">Erster Schritt, noch heute</span>
                    <p><span className="arr" aria-hidden="true">→</span> {c.schritt}</p>
                  </div>
                  <div className="v3-cta-row">
                    <Link href="/de/kontakt" className="v3-btn v3-btn-accent">Für meinen Betrieb umsetzen <span className="arr" aria-hidden="true">→</span></Link>
                    <a href={c.quelle.url} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">Quelle: {c.quelle.name}</a>
                  </div>
                </div>
                <div className="v3-ticket-zone v3-chance-ticket">
                  <div className="v3-stamp" role="img" aria-label={`Bewertung ${c.punkte} von 10, zwei Kritiker bestanden`}>
                    <div className="k"><span>Geprüft</span><span>KW {a.nr}</span></div>
                    <div className="p"><small>Bewertung</small><strong>{c.punkte}/10</strong></div>
                    <div className="f">2 Kritiker bestanden</div>
                  </div>
                  <aside className="v3-ticket" aria-label={`Chance ${nr}: ${c.titel}`}>
                    <div className="t-head"><b>Chance {nr}</b><span>KW{a.nr}-{nr}</span></div>
                    <dl className="t-rows">
                      <div><dt>Art</dt><dd>{c.kategorie}</dd></div>
                      <div><dt>Angebot</dt><dd>{c.angebot}</dd></div>
                      <div><dt>Wer zahlt</dt><dd>{c.werZahlt}</dd></div>
                      <div><dt>Werkzeuge</dt><dd>{c.werkzeuge}</dd></div>
                      <div><dt>Erster Euro</dt><dd>{c.ersterEuro}</dd></div>
                      <div><dt>Aufwand</dt><dd>{c.aufwand}</dd></div>
                      <div><dt>Beachten</dt><dd>{c.beachten}</dd></div>
                    </dl>
                    <div className="t-foot"><div className="barcode" aria-hidden="true" /><span>Freigabe: Zaur Hatuev</span></div>
                  </aside>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="v3-sec" aria-labelledby="h-einordnung">
        <div className="v3-wrap">
          <figure className="v3-quote v3-chance-quote">
            <span className="qm" aria-hidden="true">“</span>
            <div>
              <span className="v3-mono v3-accent-txt" id="h-einordnung">Einordnung der Woche</span>
              <blockquote>{a.einordnung}</blockquote>
              <figcaption><span className="v3-mono">Zaur Hatuev · BrandWerkX</span></figcaption>
            </div>
          </figure>
        </div>
      </section>

      {a.aussortiert.length > 0 && (
        <section className="v3-sec" aria-labelledby="h-aussortiert">
          <div className="v3-wrap">
            <div className="v3-sec-head">
              <span className="num">{nrAussortiert} / Aussortiert</span>
              <h2 id="h-aussortiert">Durchgefallen<br /><span className="o">und warum</span></h2>
              <p>Die meisten KI-Neuheiten bringen kein Geld. Diese hier haben die Prüfung diese Woche nicht bestanden.</p>
            </div>
            <div className="v3-compare-wrap">
              <table className="v3-compare v3-compare-out">
                <thead>
                  <tr><th scope="col">Idee</th><th scope="col">Urteil</th><th scope="col">Warum</th></tr>
                </thead>
                <tbody>
                  {a.aussortiert.map((x) => (
                    <tr key={x.idee}>
                      <th scope="row"><a href={x.url} target="_blank" rel="noopener noreferrer">{x.idee}</a><small>{x.quelle}</small></th>
                      <td className="no">✕ Aussortiert</td>
                      <td>{x.grund}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      <section className="v3-sec" aria-labelledby="h-pruefung">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">{nrPruefung} / So prüfe ich</span>
            <h2 id="h-pruefung">Geprüft<br /><span className="c">statt gehypt</span></h2>
            <p>Hinter jeder Ausgabe steht ein festes Verfahren. Hunderte Signale gehen rein, wenige Chancen kommen raus.</p>
          </div>
          <div className="v3-rules">
            {PRUEFUNG.map(([t, d], i) => (
              <div key={t}>
                <span className="v3-case-n">{n(i + 1)}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {archiv.length > 0 && (
        <section className="v3-sec" aria-labelledby="h-archiv">
          <div className="v3-wrap">
            <div className="v3-sec-head v3-sec-head-sm">
              <span className="num">{nrArchiv} / Archiv</span>
              <h2 id="h-archiv">Frühere Ausgaben</h2>
            </div>
            <nav className="v3-links v3-links-desc" aria-label="Frühere Ausgaben">
              {archiv.map((x) => (
                <Link key={x.slug} href={`/de/ki-chancen/${x.slug}`}>
                  <b>Ausgabe {x.nr}/{x.jahr} · {x.datum}</b>
                  <small>{x.chancen.map((c) => `${c.titel} ${c.titelAkzent}`).join(" · ")}</small>
                  <span>Lesen →</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>
      )}

      {telegram && (
        <section className="v3-sec" aria-labelledby="h-kanal">
          <div className="v3-wrap">
            <div className="v3-chance-band">
              <div>
                <span className="v3-mono v3-accent-txt">{telegramRu ? "Kostenlos · Deutsch und Russisch" : "Kostenlos · auf Deutsch"}</span>
                <h2 id="h-kanal">Die Chancen zuerst lesen</h2>
                <p>Auf Telegram kommen die geprüften Chancen, sobald sie freigegeben sind. Höchstens drei am Tag, kein Spam.</p>
              </div>
              <div className="v3-cta-row">
                <a href={telegram} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-accent">Kanal beitreten <span className="arr" aria-hidden="true">→</span></a>
                {telegramRu && (
                  <a href={telegramRu} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost" lang="ru">Канал на русском</a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <ClosingCta lang="de" num={`${nrUmsetzen} / Umsetzen`} ask="Welche Chance setzen wir für dich um?" />
    </div>
  );
}
