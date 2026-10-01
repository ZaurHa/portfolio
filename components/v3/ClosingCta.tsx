import Link from "next/link";
import { PHONE_DISPLAY, PHONE_TEL, WHATSAPP, EMAIL } from "../../lib/home";

/** Abschluss mit monumentaler Telefonnummer – identisch zur Startseite. */
export default function ClosingCta({ lang, num, ask }: { lang: string; num?: string; ask?: string }) {
  const de = lang !== "en";
  return (
    <section className="v3-final" aria-labelledby="h-closing">
      <div className="v3-wrap">
        <div className="lbl">
          <span className="v3-mono v3-accent-txt">{num ?? (de ? "Kontakt" : "Contact")}</span>
          <span className="v3-mono v3-hide-sm">{de ? "Antwort meist innerhalb 24 h" : "Reply usually within 24 h"}</span>
        </div>
        <h2 id="h-closing" className="ask">{ask ?? (de ? "Lass uns über deine Website reden." : "Let's talk about your website.")}</h2>
        <a href={`tel:${PHONE_TEL}`} className="v3-tel" aria-label={PHONE_DISPLAY}>0172<span>/</span><br className="mbr" />8471641</a>
        <div className="final-row">
          <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">
            {de ? "Erstgespräch anfragen" : "Request a call"} <span className="arr" aria-hidden="true">→</span>
          </Link>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">WhatsApp</a>
          <a href={`mailto:${EMAIL}`} className="v3-btn v3-btn-ghost">{EMAIL}</a>
          <span className="v3-mono">{de ? "Geretsried · München & Oberland" : "Geretsried · Munich & Oberland"}</span>
        </div>
      </div>
    </section>
  );
}
