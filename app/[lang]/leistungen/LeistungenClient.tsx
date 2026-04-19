"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeInSection } from "../../../components/HomeAnimations";
import type { Dictionary } from "../../../lib/i18n";

const svgIcons = {
  starter: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
    </svg>
  ),
  business: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  premium: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

const servicePackages = [
  {
    nameKey: "starterName" as const,
    price: "ab 490€",
    icon: svgIcons.starter,
    descKey: "starterDesc" as const,
    features: [
      "Fertiges Design — du wählst, ich passe an",
      "Dein Logo, deine Texte, deine Farben",
      "Kontaktformular",
      "SEO-Grundlagen inklusive",
      "Mobile-optimiert",
      "Fertig in 3–5 Werktagen",
      "30 Tage Support",
      "Hosting im ersten Jahr inklusive",
    ],
    popular: false,
    ctaKey: "starterCta" as const,
    ctaLink: "/muster",
  },
  {
    nameKey: "businessName" as const,
    price: "ab 990€",
    icon: svgIcons.business,
    descKey: "businessDesc" as const,
    features: [
      "Individuelles Design nach deinen Wünschen",
      "Bis zu 5 Seiten",
      "Kontaktformular + optional Terminbuchung",
      "SEO-Optimierung",
      "Mobile-first Entwicklung",
      "Fertig in 7–14 Tagen",
      "30 Tage Support",
      "Hosting + Domain im ersten Jahr",
    ],
    popular: true,
    ctaKey: "businessCta" as const,
    ctaLink: null,
  },
  {
    nameKey: "premiumName" as const,
    price: "ab 99€/Monat",
    icon: svgIcons.premium,
    descKey: "premiumDesc" as const,
    features: [
      "Technische SEO-Analyse",
      "Google-Ranking verbessern",
      "Ladezeit & Core Web Vitals",
      "Monatliche Updates & Änderungen",
      "Sicherheits-Checks",
      "Monatlicher Bericht",
      "Direkter Ansprechpartner",
    ],
    popular: false,
    ctaKey: "premiumCta" as const,
    ctaLink: null,
  },
];

const additionalServices = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    name: "Google My Business", price: "einmalig 149€", description: "Profil einrichten, optimieren und verifizieren — damit du bei lokalen Suchen sichtbar wirst."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    name: "Speed-Optimierung", price: "einmalig 199€", description: "Ladezeit halbieren, Lighthouse-Score verbessern, Core Web Vitals ins Grüne bringen."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    name: "Zusatzseiten", price: "ab 99€ / Seite", description: "Weitere Unterseiten für bestehende Websites — z.B. Leistungsseite, Galerie, Über uns."
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ffe7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    name: "Wartung & Updates", price: "ab 49€/Monat", description: "Texte ändern, Bilder aktualisieren, technische Wartung — ohne dass du dich darum kümmern musst."
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "faq-open" : ""}`} onClick={() => setOpen(!open)}>
      <div className="faq-question">
        <span>{q}</span>
        <span className={`faq-icon ${open ? "faq-icon-open" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 7.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      {open && <div className="faq-answer">{a}</div>}
    </div>
  );
}

export default function LeistungenClient({ lang, dict }: { lang: string; dict: Dictionary }) {
  const t = dict.services;

  const processSteps = [
    { num: "01", title: t.step1, desc: t.step1desc, icon: "💬" },
    { num: "02", title: t.step2, desc: t.step2desc, icon: "✏️" },
    { num: "03", title: t.step3, desc: t.step3desc, icon: "⚙️" },
    { num: "04", title: t.step4, desc: t.step4desc, icon: "🤝" },
  ];

  const faqs = [
    { q: t.faq1q, a: t.faq1a },
    { q: t.faq2q, a: t.faq2a },
    { q: t.faq3q, a: t.faq3a },
    { q: t.faq4q, a: t.faq4a },
  ];

  return (
    <div className="leistungen-page">
      <div className="page-hero">
        <FadeInSection>
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h1 className="page-hero-title">
            {t.heroTitle.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </h1>
          <p className="page-hero-desc">{t.heroDesc}</p>
          <div className="hero-badges">
            <span className="hero-badge">{t.badge1}</span>
            <span className="hero-badge">{t.badge2}</span>
            <span className="hero-badge">{t.badge3}</span>
          </div>
        </FadeInSection>
      </div>

      <section className="section-wrap">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.packagesEyebrow}</span>
            <h2 className="section-title">{t.packagesTitle}</h2>
          </div>
        </FadeInSection>
        <div className="pricing-grid">
          {servicePackages.map((pkg, i) => (
            <FadeInSection key={pkg.nameKey} delay={i * 100}>
              <div className={`pricing-card ${pkg.popular ? "pricing-card-popular" : ""}`}>
                {pkg.popular && <div className="pricing-popular-badge">{t.businessBadge}</div>}
              <div className="pricing-icon" style={{ display: 'flex', alignItems: 'center' }}>{pkg.icon}</div>
                <h3 className="pricing-name">{t[pkg.nameKey]}</h3>
                <div className="pricing-price">{pkg.price}</div>
                <p className="pricing-desc">{t[pkg.descKey]}</p>
                <ul className="pricing-features">
                  {pkg.features.map((f) => (
                    <li key={f}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7l4 4 6-7" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={pkg.ctaLink ?? `/${lang}/kontakt?package=${t[pkg.nameKey].toLowerCase()}`}
                  className={pkg.popular ? "cta-btn-primary w-full text-center justify-center" : "cta-btn-secondary w-full text-center justify-center"}
                >
                  {t[pkg.ctaKey]}
                </Link>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.addonsEyebrow}</span>
            <h2 className="section-title">{t.addonsTitle}</h2>
          </div>
        </FadeInSection>
        <div className="addons-grid">
          {additionalServices.map((s, i) => (
            <FadeInSection key={s.name} delay={i * 80}>
              <div className="addon-card">
                <span className="addon-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>{s.icon}</span>
                <div className="addon-info">
                  <div className="addon-top">
                    <h3 className="addon-name">{s.name}</h3>
                    <span className="addon-price">{s.price}</span>
                  </div>
                  <p className="addon-desc">{s.description}</p>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.processEyebrow}</span>
            <h2 className="section-title">{t.processTitle}</h2>
          </div>
        </FadeInSection>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <FadeInSection key={step.num} delay={i * 100}>
              <div className="process-step">
                <div className="process-num">{step.num}</div>
                <div className="process-icon">{step.icon}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
                {i < processSteps.length - 1 && <div className="process-connector" />}
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.faqEyebrow}</span>
            <h2 className="section-title">{t.faqTitle}</h2>
          </div>
        </FadeInSection>
        <div className="faq-list">
          {faqs.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      <section className="cta-section">
        <FadeInSection>
          <div className="cta-glow" />
          <span className="section-eyebrow">{t.ctaEyebrow}</span>
          <h2 className="cta-title">{t.ctaTitle}</h2>
          <p className="cta-desc">{t.ctaDesc}</p>
          <div className="cta-buttons">
            <Link href={`/${lang}/kontakt`} className="cta-btn-primary">
              {t.ctaPrimary}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href={`/${lang}/projekte/zaira-beauty`} className="cta-btn-secondary">
              {t.ctaSecondary}
            </Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
