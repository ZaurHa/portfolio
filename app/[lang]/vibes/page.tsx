import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { pageMetadata } from "../../../lib/seo";
import PageHero from "../../../components/v3/PageHero";

const SERLO_URL = "https://serlo.ch";
const APP_STORE_URL = "https://apps.apple.com/app/vibes/id6760790424";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata({
    lang,
    path: "/vibes",
    title: "Serlo – Social Video App",
    description:
      "Serlo ist die Social-Video-Plattform mit Video-Feed, Live-Streaming, Geschenken und Coins, Shop, Guilds und Women-Only-Bereich. Im Browser auf serlo.ch oder als App fürs iPhone.",
    noindex: true,
    onlyDe: true,
  });
}

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const features = [
  {
    title: "Video-Feed",
    desc: "Dein Feed mit kurzen Videos von Creators, denen du folgst – ohne Ablenkung, ohne Ballast.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M10 9.5v5l4.5-2.5L10 9.5z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Live-Streaming",
    desc: "Geh live, sprich in Echtzeit mit deiner Community und bau dir eine treue Zuschauerschaft auf.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
        <path d="M7.7 16.3a6 6 0 0 1 0-8.6M16.3 7.7a6 6 0 0 1 0 8.6" />
        <path d="M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2" />
      </svg>
    ),
  },
  {
    title: "Geschenke & Coins",
    desc: "Unterstütze Creator direkt im Stream: Coins kaufen, Geschenke senden – und als Creator daran verdienen.",
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8M12 8v13" />
        <path d="M12 8c-1.5 0-4.5-.5-4.5-2.75S10.5 3 12 8zM12 8c1.5 0 4.5-.5 4.5-2.75S13.5 3 12 8z" />
      </svg>
    ),
  },
  {
    title: "Shop",
    desc: "Produkte entdecken und direkt in der App kaufen – der Shop verbindet Inhalte und Einkauf.",
    icon: (
      <svg {...iconProps}>
        <path d="M5 8h14l-1 12a2 2 0 0 1-2 1.8H8A2 2 0 0 1 6 20L5 8z" />
        <path d="M9 11V6a3 3 0 0 1 6 0v5" />
      </svg>
    ),
  },
  {
    title: "Guilds",
    desc: "Schließ dich einer Guild an: gemeinsam streamen, Events bestreiten und als Team in den Rankings aufsteigen.",
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8.5" r="3" />
        <path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <circle cx="16.5" cy="9.5" r="2.4" />
        <path d="M16.5 14.6c2.5.2 4.2 2 4.2 4.4" />
      </svg>
    ),
  },
  {
    title: "Women-Only-Bereich",
    desc: "Ein geschützter Bereich nur für Frauen – mit eigenem Feed und eigenen Live-Streams, moderiert und sicher.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" />
        <path d="M12 14.6s-3-1.9-3-4a1.7 1.7 0 0 1 3-1.1 1.7 1.7 0 0 1 3 1.1c0 2.1-3 4-3 4z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

export default async function SerloPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <div className="v3">
      <PageHero
        meta="Eigene App · Social Video"
        metaRight={<b>serlo.ch · iPhone</b>}
        title={
          <>
            <span className="l">Serlo<span className="c">.</span></span>
            <span className="sub">Deine Bühne. <i /> <em>Deine Community.</em></span>
          </>
        }
        lead="Serlo ist die Social-Video-Plattform für kurze Videos und Live-Streams – mit Geschenken, Coins, Shop und Guilds. Direkt im Browser auf serlo.ch oder als App fürs iPhone."
        actions={
          <>
            <a href={SERLO_URL} {...external} className="v3-btn v3-btn-accent">
              serlo.ch öffnen <span className="arr" aria-hidden="true">→</span>
            </a>
            <a href={APP_STORE_URL} {...external} className="v3-btn v3-btn-ghost">
              Im App Store laden
            </a>
          </>
        }
        facts={[
          { label: "Web-App", value: <a href={SERLO_URL} {...external}>serlo.ch</a> },
          { label: "iPhone", value: <a href={APP_STORE_URL} {...external}>App Store</a> },
          { label: "Preis", value: "Kostenlos" },
          { label: "Entwickelt von", value: "BrandWerkX" },
        ]}
      />

      <section className="v3-sec" aria-labelledby="h-app">
        <div className="v3-wrap">
          <div className="v3-sec-head v3-sec-head-sm">
            <span className="num">01 / App</span>
            <h2 id="h-app">Im Browser. <span className="o">Oder als App.</span></h2>
          </div>
          <article className="v3-case">
            <a href={SERLO_URL} {...external} className="v3-case-media" aria-label="Serlo – serlo.ch öffnen">
              <div className="v3-frame v3-frame-static">
                <div className="bar"><i /><i /><i /><span>serlo.ch</span></div>
                <div className="img">
                  <Image src="/images/serlo-preview.webp" alt="Startseite der Social-App Serlo" fill sizes="(max-width: 960px) 100vw, 56vw" priority />
                </div>
              </div>
            </a>
            <div className="v3-case-body">
              <div className="v3-case-top">
                <span className="v3-chip live">Live</span>
                <span className="v3-mono">Web · iOS</span>
              </div>
              <h3 className="v3-case-title">Kein Download nötig.</h3>
              <p className="v3-case-desc">
                Serlo läuft als vollwertige Web-App direkt im Browser – auf Handy, Tablet und Desktop.
                Wer lieber eine App nutzt, lädt Serlo aus dem App Store aufs iPhone.
              </p>
              <ul className="v3-plus">
                <li>Sofort loslegen auf serlo.ch</li>
                <li>App fürs iPhone im App Store</li>
                <li>Kostenlos</li>
              </ul>
              <a href={SERLO_URL} {...external} className="v3-link">
                serlo.ch öffnen <span className="arr" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-features">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">02 / Funktionen</span>
            <h2 id="h-features">Alles drin für deine <span className="c">Community.</span></h2>
            <p>Von kurzen Videos bis zum Live-Stream mit Geschenken – Serlo bringt Creator und Community zusammen.</p>
          </div>
          <div className="v3-rules v3-rules-3">
            {features.map((f) => (
              <div key={f.title}>
                <span className="ico">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="h-start">
        <div className="v3-wrap">
          <div className="v3-sec-head">
            <span className="num">03 / Start</span>
            <h2 id="h-start">Sei dabei auf <span className="c">Serlo.</span></h2>
            <p>Kostenlos im Browser oder auf dem iPhone.</p>
          </div>
          <div className="v3-cta-row">
            <a href={SERLO_URL} {...external} className="v3-btn v3-btn-accent">
              serlo.ch öffnen <span className="arr" aria-hidden="true">→</span>
            </a>
            <a href={APP_STORE_URL} {...external} className="v3-btn v3-btn-ghost">
              Im App Store laden
            </a>
          </div>
          <nav className="v3-links" aria-label="Rechtliches und Kontakt" style={{ marginTop: "clamp(48px, 6vw, 88px)" }}>
            <Link href={`/${lang}/vibes/datenschutz`}>Datenschutzerklärung<span>Serlo →</span></Link>
            <Link href={`/${lang}/vibes/agb`}>Nutzungsbedingungen<span>Serlo →</span></Link>
            <a href="mailto:zaurhatu@gmail.com">Kontakt<span>E-Mail →</span></a>
          </nav>
        </div>
      </section>
    </div>
  );
}
