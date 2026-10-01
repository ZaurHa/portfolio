import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";
import type { Locale } from "../../lib/i18n";
import { getHomeContent, PHONE_DISPLAY, PHONE_TEL, WHATSAPP, EMAIL } from "../../lib/home";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "", title: "Web Design Geretsried & Munich – Website from €490", description: "Websites that win clients: web design from Geretsried (near Munich) for tradespeople and small businesses. Fixed price from €490, online in 3–5 working days.", absoluteTitle: true })
    : pageMetadata({ lang, path: "", title: "Webdesign Geretsried & München – Website ab 490 €", description: "Websites, die Anfragen bringen: Webdesign aus Geretsried für Handwerker und kleine Betriebe in München und dem Oberland. Festpreis ab 490 €, in 3–5 Werktagen online.", absoluteTitle: true });
}

const Arrow = () => <span className="arr" aria-hidden="true">→</span>;

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = lang === "en" ? "en" : "de";
  const c = getHomeContent(locale);
  const reel = c.projects.items;

  return (
    <div className="v3">
      {/* HERO */}
      <section className="v3-hero" aria-labelledby="h-hero">
        <div className="v3-wrap">
          <div className="v3-hero-top v3-rise">
            <span className="v3-mono"><span className="v3-dot" />{c.hero.metaLeft}</span>
            <span className="v3-mono v3-hide-sm"><b>{c.hero.metaRight}</b></span>
          </div>

          <h1 id="h-hero" className="v3-h1">
            <span className="l v3-rise d1">{c.hero.l1}</span>
            <span className="l v3-rise d2"><span className="c">{c.hero.accent}</span> <span className="o">{c.hero.outline}</span></span>
            <span className="sub v3-rise d3">{c.hero.subPrice} <i aria-hidden="true" /> <em>{c.hero.subPlace}</em></span>
          </h1>

          <div className="v3-hero-grid">
            <div className="v3-rise d3">
              <p className="v3-lead">
                {c.hero.lead} <strong>{c.hero.leadStrong}</strong>{c.hero.leadTail}
              </p>
              <div className="v3-cta-row">
                <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">{c.hero.ctaPrimary} <Arrow /></Link>
                <a href={`tel:${PHONE_TEL}`} className="v3-btn v3-btn-ghost">{PHONE_DISPLAY}</a>
              </div>
            </div>

            {/* Arbeitsauftrag + Preisstempel */}
            <div className="v3-ticket-zone v3-rise d4">
              <div className="v3-stamp" role="img" aria-label={`${c.ticket.stampTop} ${c.ticket.stampFrom} 490 €`}>
                <div className="k"><span>{c.ticket.stampTop}</span><span>Nr. 490</span></div>
                <div className="p"><small>{c.ticket.stampFrom}</small><strong>490&nbsp;€</strong></div>
                <div className="f">{c.ticket.stampFoot}</div>
              </div>
              <aside className="v3-ticket" aria-label={c.ticket.title}>
                <div className="t-head"><b>{c.ticket.title}</b><span>BWX-0490</span></div>
                <dl className="t-rows">
                  {c.ticket.rows.map(([k, v]) => (
                    <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                  ))}
                  <div>
                    <dt>{c.ticket.contactLabel}</dt>
                    <dd><a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> · <a href={WHATSAPP} target="_blank" rel="noopener noreferrer">WhatsApp</a></dd>
                  </div>
                </dl>
                <div className="t-foot"><div className="barcode" aria-hidden="true" /><span>Zaur Hatuev</span></div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWREEL */}
      <div className="v3-reel" aria-label={c.reel.label}>
        <div className="v3-reel-light" aria-hidden="true" />
        <div className="v3-reel-stage">
          <div className="v3-reel-track">
            {[...reel, ...reel].map((p, i) => (
              <div className="v3-frame" key={`${p.slug}-${i}`} aria-hidden={i >= reel.length ? true : undefined}>
                <div className="bar"><i /><i /><i /><span>{p.bar}</span></div>
                <div className="img">
                  <Image src={p.image} alt={i >= reel.length ? "" : p.alt} fill sizes="(max-width: 560px) 80vw, 46vw" priority={i === 0} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="v3-reel-cap"><div className="v3-wrap">
          <span className="v3-mono"><span className="v3-dot" />{c.reel.label}</span>
          <span className="v3-mono v3-hide-sm">{c.reel.fields}</span>
        </div></div>
      </div>

      {/* 01 PROJEKTE */}
      <section className="v3-sec" id="projekte" aria-labelledby="h-proj">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">{c.projects.num}</span>
            <h2 id="h-proj">{c.projects.h1}<br /><span className="o">{c.projects.h2o}</span> {c.projects.h2}</h2>
            <p>{c.projects.text}</p>
          </div>
          <div className="v3-bento">
            {reel.map((p, i) => (
              <Link
                key={p.slug}
                href={p.href}
                className={`v3-tile t${i + 1}`}
                {...(p.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <span className={`tag${p.live ? " live" : ""}`}>{p.tag}</span>
                <figure>
                  <Image src={p.image} alt={p.alt} fill sizes="(max-width: 860px) 100vw, 58vw" />
                </figure>
                <div className="meta">
                  <div><h3>{p.title}</h3><p>{p.desc}</p></div>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="v3-more"><Link href={`/${lang}/projekte`} className="v3-btn v3-btn-ghost">{c.projects.all} <Arrow /></Link></div>
        </div>
      </section>

      {/* 02 LEISTUNGEN – Preistafel */}
      <section className="v3-sec" id="leistungen" aria-labelledby="h-leist">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">{c.pricing.num}</span>
            <h2 id="h-leist">{c.pricing.h1}<br /><span className="c">{c.pricing.hc}</span> {c.pricing.h2}</h2>
            <p>{c.pricing.text}</p>
          </div>
          <div className="v3-board">
            <div className="board-top"><b>{c.pricing.boardTitle}</b><span className="v3-mono">{c.pricing.boardMeta}</span></div>
            <div className="v3-prices">
              {c.pricing.plans.map((plan) => (
                <article key={plan.name} className={`v3-plan${plan.hot ? " hot" : ""}`}>
                  <div className="top"><span className="v3-mono">{plan.code}</span>{plan.hot && <span className="v3-badge">{c.pricing.popular}</span>}</div>
                  <h3>{plan.name}</h3>
                  <p className="desc">{plan.desc}</p>
                  <div className="v3-price"><small>{c.pricing.from}</small><span className="amt">{plan.amount}</span><span className="eur">€</span></div>
                  <div className="unit">{plan.unit}</div>
                  <ul>{plan.items.map((it) => <li key={it}>{it}</li>)}</ul>
                  <Link href={plan.href} className={`v3-btn ${plan.hot ? "v3-btn-accent" : "v3-btn-ghost"}`}>{plan.cta} <Arrow /></Link>
                </article>
              ))}
            </div>
            <div className="board-foot">{c.pricing.foot.map((f) => <span key={f}>{f}</span>)}</div>
          </div>
          <div className="v3-extras">
            <span className="v3-mono">{c.pricing.extrasLabel}</span>
            <div>
              <table>
                <tbody>
                  {c.pricing.extras.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
                </tbody>
              </table>
              <Link href={`/${lang}/leistungen`} className="v3-link">{c.pricing.details} <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 03 ABLAUF */}
      <section className="v3-sec" id="ablauf" aria-labelledby="h-ablauf">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">{c.process.num}</span>
            <h2 id="h-ablauf">{c.process.h1}<br />{c.process.h2} <span className="o">{c.process.h2o}</span></h2>
            <p>{c.process.text}</p>
          </div>
          <ol className="v3-steps">
            {c.process.steps.map(([t, d], i) => (
              <li key={t}>
                <span className="s-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="knot" aria-hidden="true" />
                <div><h3>{t}</h3><p>{d}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 ÜBER MICH */}
      <section className="v3-sec" id="ueber-mich" aria-labelledby="h-about">
        <div className="v3-wrap v3-about">
          <figure className="v3-portrait">
            <Image src="/images/zaur-portrait.jpg" alt="Zaur Hatuev" fill sizes="(max-width: 860px) 100vw, 40vw" />
            <figcaption><span>{c.about.caption[0]}</span><span>{c.about.caption[1]}</span></figcaption>
          </figure>
          <div>
            <span className="v3-mono v3-accent-txt">{c.about.num}</span>
            <h2 id="h-about" className="big">{c.about.big1} <em>{c.about.bigEm}</em>{c.about.big2}</h2>
            <p className="txt">{c.about.text}</p>
            <div className="v3-kv">
              {c.about.kv.map(([k, v]) => <div key={k} className="v3-mono">{k}<span>{v}</span></div>)}
            </div>
            <Link href={`/${lang}/ueber-mich`} className="v3-link">{c.about.more} <Arrow /></Link>
          </div>
        </div>
      </section>

      {/* 05 STIMMEN */}
      <section className="v3-sec" id="stimmen" aria-labelledby="h-stimmen">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">{c.quotes.num}</span>
            <h2 id="h-stimmen">{c.quotes.h1} <span className="o">{c.quotes.h2o}</span></h2>
            <p />
          </div>
          <div className="v3-quotes">
            {c.quotes.items.map((q) => (
              <figure className="v3-quote" key={q.who}>
                <div><span className="qm" aria-hidden="true">“</span><span className="v3-mono src">{q.src}</span></div>
                <div>
                  <blockquote lang="de">{q.before}<mark>{q.mark}</mark>{q.after}</blockquote>
                  <figcaption className="v3-mono"><span><b>{q.who}</b>{q.role ? ` · ${q.role}` : ""}</span></figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 06 FAQ */}
      <section className="v3-sec" id="faq" aria-labelledby="h-faq">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">{c.faq.num}</span>
            <h2 id="h-faq">{c.faq.h1} <span className="o">{c.faq.h2o}</span></h2>
            <p />
          </div>
          <div className="v3-faq">
            <span className="v3-mono">{c.faq.label}</span>
            <div>
              {c.faq.items.map(([q, a], i) => (
                <details key={q} open={i === 0}><summary>{q}</summary><p>{a}</p></details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 07 KONTAKT */}
      <section className="v3-final" id="kontakt" aria-labelledby="h-kontakt">
        <div className="v3-wrap">
          <div className="lbl"><span className="v3-mono v3-accent-txt">{c.final.num}</span><span className="v3-mono v3-hide-sm">{c.final.meta}</span></div>
          <h2 id="h-kontakt" className="ask">{c.final.ask}</h2>
          <a href={`tel:${PHONE_TEL}`} className="v3-tel" aria-label={`${PHONE_DISPLAY}`}>0172<span>/</span><br className="mbr" />8471641</a>
          <div className="final-row">
            <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent">{c.final.cta} <Arrow /></Link>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">WhatsApp</a>
            <a href={`mailto:${EMAIL}`} className="v3-btn v3-btn-ghost">{EMAIL}</a>
            <span className="v3-mono">{c.final.place}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
