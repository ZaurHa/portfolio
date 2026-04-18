import Image from "next/image";
import Link from "next/link";
import { FadeInSection } from "../../../../components/HomeAnimations";
import { getDictionary, type Locale } from "../../../../lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isDE = lang !== "en";
  return isDE ? {
    title: "Zaira Beauty Studio – Webdesign Case Study München | BrandWerkX",
    description: "Case Study: Kosmetikstudio-Website in München mit Next.js und TailwindCSS. Ergebnis: 40% mehr Kundenkontakte, Top-3 Google-Ranking, Lighthouse 97/100 in 3 Monaten.",
    keywords: ["Webdesign Kosmetikstudio", "Case Study Webentwicklung München", "Zaira Beauty Studio", "Website Kosmetik München", "Next.js Case Study", "SEO Ergebnisse München"],
    alternates: { canonical: "https://brandwerkx.de/de/projekte/zaira-beauty" },
    openGraph: {
      title: "Zaira Beauty Studio – Webdesign Case Study | BrandWerkX",
      description: "40% mehr Kundenkontakte nach Website-Relaunch. Case Study: Webdesign & SEO für Kosmetikstudio München.",
      url: "https://brandwerkx.de/de/projekte/zaira-beauty",
      images: [{ url: "/images/beauty-praxis-mockup.webp", width: 1200, height: 800 }],
    },
  } : {
    title: "Zaira Beauty Studio – Web Design Case Study Munich | BrandWerkX",
    description: "Case Study: Beauty studio website in Munich with Next.js and TailwindCSS. Result: 40% more client contacts, top-3 Google ranking, Lighthouse 97/100 within 3 months.",
    keywords: ["web design beauty studio", "case study web development Munich", "Zaira Beauty Studio", "Next.js case study"],
    alternates: { canonical: "https://brandwerkx.de/en/projekte/zaira-beauty" },
    openGraph: {
      title: "Zaira Beauty Studio – Web Design Case Study | BrandWerkX",
      description: "40% more client contacts after website relaunch. Case study: web design & SEO for beauty studio Munich.",
      url: "https://brandwerkx.de/en/projekte/zaira-beauty",
      images: [{ url: "/images/beauty-praxis-mockup.webp", width: 1200, height: 800 }],
    },
  };
}

const processSteps = [
  { num: "01", title: "Research", desc: "Marktanalyse, Zielgruppen-Research, Wettbewerbsanalyse" },
  { num: "02", title: "Konzept", desc: "Branding-Konzept, Wireframes, Design-System" },
  { num: "03", title: "Design", desc: "UI/UX Design, Prototyping, Kunden-Feedback" },
  { num: "04", title: "Umsetzung", desc: "Entwicklung, Testing, Launch, Support" },
];

const frontend = ["Next.js 14", "React 18", "TailwindCSS", "Framer Motion", "Responsive Design"];
const features = ["SEO-Optimierung", "Kontaktformular", "Service-Galerie", "Preisübersicht", "Mobile-First"];

const problemItems = [
  "Eine moderne, vertrauensvolle Website",
  "Ein einheitliches Branding",
  "Mehr Online-Sichtbarkeit",
  "Einfache Terminbuchung",
  "Professionelle Darstellung der Services",
];

const solutionItems = [
  "Responsive Website mit modernem Design",
  "Komplettes Branding (Logo, Farben, Typografie)",
  "SEO-Optimierung für lokale Suche",
  "Kontaktformular mit Terminbuchung",
  "Service-Übersicht mit Preisen",
  "Galerie mit Vorher-Nachher-Bildern",
];

export default async function ZairaBeautyCaseStudy({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const d = await getDictionary(locale);
  const t = d.caseStudy;

  const kpis = [
    { value: "+40%", label: t.kpi1label, desc: t.kpi1desc },
    { value: "+150%", label: t.kpi2label, desc: t.kpi2desc },
    { value: "Top 3", label: t.kpi3label, desc: t.kpi3desc },
    { value: "0.8s", label: t.kpi4label, desc: t.kpi4desc },
  ];

  const qualitative = [
    locale === "en" ? "Professional appearance" : "Professionelles Erscheinungsbild",
    locale === "en" ? "Easier appointment booking" : "Einfachere Terminbuchung",
    locale === "en" ? "Better customer communication" : "Bessere Kundenkommunikation",
    locale === "en" ? "Increased trust with new clients" : "Erhöhtes Vertrauen bei Neukunden",
  ];

  return (
    <div className="case-study-page">
      <div className="case-back-wrap">
        <Link href={`/${lang}/projekte`} className="legal-back">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.back}
        </Link>
      </div>

      <div className="case-hero">
        <FadeInSection>
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h1 className="case-hero-title">{t.title}</h1>
          <p className="case-hero-desc">{t.desc}</p>
          <div className="hero-badges">
            {["Next.js", "TailwindCSS", "Figma", "SEO", "Branding"].map((tag) => (
              <span key={tag} className="hero-badge">{tag}</span>
            ))}
          </div>
        </FadeInSection>
      </div>

      <section className="case-kpis">
        {kpis.map((kpi, i) => (
          <FadeInSection key={kpi.label} delay={i * 80}>
            <div className="case-kpi-card">
              <div className="case-kpi-value">{kpi.value}</div>
              <div className="case-kpi-label">{kpi.label}</div>
              <div className="case-kpi-desc">{kpi.desc}</div>
            </div>
          </FadeInSection>
        ))}
      </section>

      <section className="case-image-section">
        <FadeInSection>
          <div className="case-image-wrap">
            <Image
              src="/images/beauty-praxis-mockup.webp"
              alt="Zaira Beauty Studio Website Mockup"
              width={1200}
              height={800}
              className="case-main-image"
            />
          </div>
        </FadeInSection>
      </section>

      <section className="section-wrap">
        <div className="case-split">
          <FadeInSection>
            <div className="case-split-block">
              <span className="section-eyebrow">{t.problemEyebrow}</span>
              <h2 className="case-split-title">{t.problemTitle}</h2>
              <p className="case-split-intro">{t.problemIntro}</p>
              <ul className="case-list">
                {problemItems.map((item) => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-7" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>

          <FadeInSection delay={120}>
            <div className="case-split-block">
              <span className="section-eyebrow">{t.solutionEyebrow}</span>
              <h2 className="case-split-title">{t.solutionTitle}</h2>
              <p className="case-split-intro">{t.solutionIntro}</p>
              <ul className="case-list">
                {solutionItems.map((item) => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-7" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.processEyebrow}</span>
            <h2 className="section-title">{t.processTitle}</h2>
          </div>
        </FadeInSection>
        <div className="process-grid">
          {processSteps.map((step, i) => (
            <FadeInSection key={step.num} delay={i * 80}>
              <div className="process-step">
                <div className="process-num">{step.num}</div>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="section-wrap">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.techEyebrow}</span>
            <h2 className="section-title">{t.techTitle}</h2>
          </div>
        </FadeInSection>
        <div className="case-tech-grid">
          <FadeInSection>
            <div className="case-tech-card">
              <h3 className="case-tech-title">{t.frontendTitle}</h3>
              <ul className="case-tech-list">
                {frontend.map((item) => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-7" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="case-tech-card">
              <h3 className="case-tech-title">{t.featuresTitle}</h3>
              <ul className="case-tech-list">
                {features.map((item) => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-7" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.resultsEyebrow}</span>
            <h2 className="section-title">{t.resultsTitle}</h2>
          </div>
        </FadeInSection>
        <div className="case-results-grid">
          <FadeInSection>
            <div className="case-results-card">
              <h3 className="case-results-title">{t.quantTitle}</h3>
              <div className="case-results-rows">
                {[
                  [locale === "en" ? "Client contacts" : "Kundenkontakte", "+40%"],
                  [locale === "en" ? "Website visitors" : "Website-Besucher", "+150%"],
                  ["Google-Ranking", "Top 3"],
                  [locale === "en" ? "Load time" : "Ladezeit", "0.8s"],
                ].map(([label, val]) => (
                  <div key={label} className="case-results-row">
                    <span>{label}</span>
                    <span className="case-results-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="case-results-card">
              <h3 className="case-results-title">{t.qualTitle}</h3>
              <ul className="case-list" style={{ marginTop: "0.5rem" }}>
                {qualitative.map((item) => (
                  <li key={item}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7l4 4 6-7" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>

      <section className="section-wrap">
        <FadeInSection>
          <div className="case-testimonial">
            <div className="case-testimonial-quote">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="case-quote-icon">
                <path d="M6 20c0-4.4 2.8-8.2 7-10l1.5 2.2C11.2 13.5 9.8 15.5 9.5 18H13v8H6v-6zm14 0c0-4.4 2.8-8.2 7-10l1.5 2.2C25.2 13.5 23.8 15.5 23.5 18H27v8h-7v-6z" fill="#00ffe7" opacity="0.2" />
              </svg>
              <blockquote className="case-quote-text">{t.quote}</blockquote>
              <div className="case-quote-author">
                <div className="case-quote-avatar">Z</div>
                <div>
                  <div className="case-quote-name">{t.quoteName}</div>
                  <div className="case-quote-role">{t.quoteRole}</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
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
            <Link href={`/${lang}/leistungen`} className="cta-btn-secondary">{t.ctaSecondary}</Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
