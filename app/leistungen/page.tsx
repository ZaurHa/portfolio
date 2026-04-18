"use client";

import Link from "next/link";
import { useState } from "react";
import { FadeInSection } from "../../components/HomeAnimations";

const servicePackages = [
  {
    name: "Starter",
    price: "790€",
    icon: "🌱",
    description: "Perfekt für kleine Unternehmen und Startups",
    features: [
      "Responsive Landingpage",
      "Modernes Custom Design",
      "Kontaktformular",
      "SEO-Grundlagen",
      "Mobile-optimiert",
      "1 Monat Support",
      "Hosting inklusive",
    ],
    popular: false,
    cta: "Starter wählen",
  },
  {
    name: "Business",
    price: "1.500€",
    icon: "🚀",
    description: "Ideal für etablierte Unternehmen",
    features: [
      "Multi-Page Website (bis 5 Seiten)",
      "Custom Design & Branding",
      "Kontaktformular + Terminbuchung",
      "SEO-Optimierung",
      "Google Analytics",
      "3 Monate Support",
      "Hosting + Domain",
      "Content-Management",
    ],
    popular: true,
    cta: "Business wählen",
  },
  {
    name: "Premium",
    price: "2.500€",
    icon: "💎",
    description: "Für anspruchsvolle Projekte und Marken",
    features: [
      "Unbegrenzte Seiten",
      "Custom Branding & Styleguide",
      "3D-Animationen",
      "Erweiterte SEO-Strategie",
      "Performance-Optimierung",
      "6 Monate Support",
      "Premium Hosting",
      "Schulung inklusive",
    ],
    popular: false,
    cta: "Premium wählen",
  },
];

const additionalServices = [
  { icon: "🎨", name: "UI/UX Design", price: "ab 300€", description: "Professionelle Designs mit Figma – von Wireframes bis zum finalen Prototypen." },
  { icon: "🏷️", name: "Branding & Logo", price: "ab 500€", description: "Komplettes Branding: Logo, Farben, Typografie und fertig nutzbarer Styleguide." },
  { icon: "🔍", name: "SEO-Optimierung", price: "ab 200€", description: "Technische SEO, Content-Optimierung und messbare Google-Ranking-Verbesserung." },
  { icon: "🛡️", name: "Wartung & Support", price: "ab 50€/Monat", description: "Regelmäßige Updates, Sicherheits-Checks und kleine Änderungen ohne Aufwand." },
];

const processSteps = [
  { num: "01", title: "Beratung", desc: "Kostenloses Erstgespräch, Anforderungsanalyse, Projektplanung", icon: "💬" },
  { num: "02", title: "Design", desc: "Wireframes, Design-Konzept, Kunden-Feedback, Finalisierung", icon: "✏️" },
  { num: "03", title: "Entwicklung", desc: "Programmierung, Testing, Performance-Optimierung, Launch", icon: "⚙️" },
  { num: "04", title: "Support", desc: "Schulung, Wartung, Updates, kontinuierliche Betreuung", icon: "🤝" },
];

const faqs = [
  { q: "Wie lange dauert ein Projekt?", a: "Die Dauer hängt von der Komplexität ab. Eine Landingpage dauert 1–2 Wochen, eine Multi-Page Website 3–4 Wochen. Ich kommuniziere immer realistische Zeitpläne." },
  { q: "Kann ich mein Projekt anpassen?", a: "Ja, alle Pakete sind flexibel anpassbar. Wir können Features hinzufügen oder entfernen, um das perfekte Paket für Ihr Budget zu finden." },
  { q: "Was passiert nach dem Launch?", a: "Nach dem Launch erhalten Sie eine Schulung, Dokumentation und Support. Optional können Sie ein Wartungs-Paket buchen für regelmäßige Updates." },
  { q: "Ist Hosting und Domain inklusive?", a: "Ja, alle Pakete beinhalten Hosting und Domain für das erste Jahr. Danach können Sie diese selbst verwalten oder ich übernehme es weiterhin." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`faq-item ${open ? "faq-open" : ""}`}
      onClick={() => setOpen(!open)}
    >
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

export default function Leistungen() {
  return (
    <div className="leistungen-page">
      {/* Hero */}
      <div className="page-hero">
        <FadeInSection>
          <span className="section-eyebrow">Leistungen & Preise</span>
          <h1 className="page-hero-title">Transparente Preise.<br />Messbare Ergebnisse.</h1>
          <p className="page-hero-desc">
            Kein Kleingedrucktes. Wähle das Paket, das zu deinem Projekt passt —
            jederzeit flexibel anpassbar.
          </p>
          <div className="hero-badges">
            <span className="hero-badge">Transparente Preise</span>
            <span className="hero-badge">Keine versteckten Kosten</span>
            <span className="hero-badge">Flexible Anpassung</span>
          </div>
        </FadeInSection>
      </div>

      {/* Pakete */}
      <section className="section-wrap">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">Pakete</span>
            <h2 className="section-title">Service-Pakete</h2>
          </div>
        </FadeInSection>

        <div className="pricing-grid">
          {servicePackages.map((pkg, i) => (
            <FadeInSection key={pkg.name} delay={i * 100}>
              <div className={`pricing-card ${pkg.popular ? "pricing-card-popular" : ""}`}>
                {pkg.popular && <div className="pricing-popular-badge">EMPFOHLEN</div>}
                <div className="pricing-icon">{pkg.icon}</div>
                <h3 className="pricing-name">{pkg.name}</h3>
                <div className="pricing-price">{pkg.price}</div>
                <p className="pricing-desc">{pkg.description}</p>
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
                  href={`/kontakt?package=${pkg.name.toLowerCase()}`}
                  className={pkg.popular ? "cta-btn-primary w-full text-center justify-center" : "cta-btn-secondary w-full text-center justify-center"}
                >
                  {pkg.cta}
                </Link>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Zusätzliche Services */}
      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">Add-ons</span>
            <h2 className="section-title">Zusätzliche Services</h2>
          </div>
        </FadeInSection>
        <div className="addons-grid">
          {additionalServices.map((s, i) => (
            <FadeInSection key={s.name} delay={i * 80}>
              <div className="addon-card">
                <span className="addon-icon">{s.icon}</span>
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

      {/* Prozess */}
      <section className="section-wrap">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">Ablauf</span>
            <h2 className="section-title">Meine Arbeitsweise</h2>
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

      {/* FAQ */}
      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">FAQ</span>
            <h2 className="section-title">Häufige Fragen</h2>
          </div>
        </FadeInSection>
        <div className="faq-list">
          {faqs.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <FadeInSection>
          <div className="cta-glow" />
          <span className="section-eyebrow">Jetzt starten</span>
          <h2 className="cta-title">Bereit für dein Projekt?</h2>
          <p className="cta-desc">
            Kostenloses Erstgespräch — ich erkläre dir in 30 Minuten, was für dein Projekt Sinn macht.
          </p>
          <div className="cta-buttons">
            <Link href="/kontakt" className="cta-btn-primary">
              Kostenlose Beratung
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/projekte/zaira-beauty" className="cta-btn-secondary">
              Case Study ansehen
            </Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
