import Link from "next/link";
import Image from "next/image";
import WorkHero from "../../components/WorkHero";
import TickerMarquee from "../../components/TickerMarquee";
import ErrorBoundary from "../../components/ErrorBoundary";
import { AnimatedCounter, FadeInSection } from "../../components/HomeAnimations";
import { getDictionary, locales, type Locale } from "../../lib/i18n";
import type { Metadata } from "next";
import { pageMetadata } from "../../lib/seo";

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return lang === "en"
    ? pageMetadata({ lang, path: "", title: "Web Design Geretsried & Munich – Website from €490", description: "Get a website built from €490: web design from Geretsried (near Munich) for tradespeople and small businesses. Live in 5 days, SEO included.", absoluteTitle: true })
    : pageMetadata({ lang, path: "", title: "Webdesign Geretsried & München – Website ab 490 €", description: "Website erstellen lassen ab 490 €: Webdesign aus Geretsried für Handwerker und kleine Betriebe in München und dem Oberland. In 5 Tagen live, SEO inklusive.", absoluteTitle: true });
}

// SVG Icons (Lucide-style) — no emojis per UI UX Pro Max guidelines
const skillSVGs = [
  // Next.js / Zap
  <svg key="nextjs" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  // UI/UX / Layers
  <svg key="uiux" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  // Responsive / Monitor
  <svg key="responsive" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  // SEO / Search
  <svg key="seo" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  // TypeScript / Code
  <svg key="ts" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  // Backend / Database
  <svg key="backend" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>,
  // Performance / Activity
  <svg key="perf" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  // Consulting / Users
  <svg key="consulting" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
];
const skillDescs = [
  "App Router, SSR, ISR",
  "Figma, Prototyping",
  "Mobile-first",
  "Core Web Vitals",
  "Type-safe Code",
  "APIs, Databases",
  "Lighthouse 100",
  "Strategy & Support",
];
const skillNames = ["Next.js", "UI/UX Design", "Responsive", "SEO", "TypeScript", "Backend", "Performance", "Consulting"];

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale: Locale = isLocale(lang) ? lang : "de";
  const d = await getDictionary(locale);
  const t = d.home;
  const tp = d.projects;

  const stats = [
    { value: 3, suffix: "", label: t.statsProjects },
    { value: 490, suffix: "€", label: t.statsYears },
    { value: 0, suffix: "", label: t.statsSatisfaction },
    { value: 5, suffix: "", label: t.statsResults },
  ];

  const projects = [
    {
      title: locale === "de" ? "Serlo – Social-App mit Live & Shop" : "Serlo – Social App with Live & Shop",
      description: locale === "de"
        ? "Mein eigenes Produkt: Social-Media-Plattform mit Video-Feed, Live-Streaming, Geschenken und integriertem Shop. iOS-App im App Store + Web-App — Design, Entwicklung und Betrieb komplett aus einer Hand."
        : "My own product: a social media platform with video feed, live streaming, gifts and a built-in shop. iOS app on the App Store + web app — design, development and operations all from one hand.",
      category: locale === "de" ? "Eigenes Produkt · iOS + Web" : "Own Product · iOS + Web",
      tech: ["React Native", "Next.js", "Supabase", "LiveKit"],
      image: "/images/serlo-preview.png",
      link: "https://serlo.ch",
      label: locale === "de" ? "IM APP STORE" : "ON APP STORE",
      labelColor: "#00ffe7",
      results: locale === "de"
        ? ["Live im App Store", "Live-Streaming, Gifts & Shop", "Web-App auf serlo.ch"]
        : ["Live on the App Store", "Live streaming, gifts & shop", "Web app at serlo.ch"],
      year: "2026",
    },
    {
      title: tp.zairaTitle,
      description: tp.zairaDesc,
      category: tp.zairaCategory,
      tech: ["Next.js", "TailwindCSS", "Figma", "SEO"],
      image: "/images/beauty-praxis-mockup.webp",
      link: `/${lang}/projekte/zaira-beauty`,
      label: "TOP 3 · GOOGLE",
      labelColor: "#84ff7d",
      results: [tp.zairaResult1, tp.zairaResult2, tp.zairaResult3],
      year: "2024",
    },
    {
      title: locale === "de" ? "Mobilwerk – Transport & Umzug München" : "Mobilwerk – Moving & Transport Munich",
      description: locale === "de"
        ? "Moderne dunkle Firmen-Website für meinen eigenen Transport- & Umzugsbetrieb — klares Branding, Leistungsübersicht, Ablauf, Kontakt. Mit Next.js gebaut, schnell und mobil-optimiert."
        : "Modern dark company website for my own moving & transport business — clear branding, services, process, contact. Built with Next.js, fast and mobile-optimized.",
      category: locale === "de" ? "Firmen-Website · Transport" : "Company Website · Transport",
      tech: ["Next.js", "TypeScript", "TailwindCSS", "SEO"],
      image: "/images/mobilwerk-preview.png",
      link: "https://mobilwerk.vercel.app",
      label: "LIVE",
      labelColor: "#84cc16",
      results: locale === "de"
        ? ["Eigenes Branding & Logo", "Mobil-optimiert", "Live auf Vercel"]
        : ["Custom branding & logo", "Mobile-optimized", "Live on Vercel"],
      year: "2026",
    },
    {
      title: locale === "de" ? "MRG-Logistik – Werkvertrag & Lager" : "MRG-Logistik – Contract Logistics",
      description: locale === "de"
        ? "Professionelle B2B-Website für einen Logistik-Dienstleister (Lager, Kommissionierung, Werkvertrag) — dunkles Design, 3D-Illustration, klare Leistungsstruktur. Gebaut auf Cloudflare Workers."
        : "Professional B2B website for a logistics provider (warehousing, picking, contract work) — dark design, 3D illustration, clear service structure. Built on Cloudflare Workers.",
      category: locale === "de" ? "Firmen-Website · Logistik B2B" : "Company Website · Logistics B2B",
      tech: ["Cloudflare Workers", "TypeScript", "TailwindCSS", "SEO"],
      image: "/images/mrg-tlogistik-preview.png",
      link: "https://mrg-logistik.de",
      label: "LIVE",
      labelColor: "#f59e0b",
      results: locale === "de"
        ? ["B2B-Logistik-Branding", "3D-Illustration", "Live auf Cloudflare"]
        : ["B2B logistics branding", "3D illustration", "Live on Cloudflare"],
      year: "2026",
    },
    {
      title: locale === "de" ? "Klempner München – Muster-Website" : "Plumber Munich – Template Website",
      description: locale === "de"
        ? "Fertige Website-Designs speziell für Klempner und Sanitärbetriebe — 5 verschiedene Versionen zur Auswahl, SEO-optimiert für München."
        : "Ready-made website designs for plumbers and sanitation businesses — 5 versions to choose from, SEO-optimized for Munich.",
      category: locale === "de" ? "Muster-Website · Handwerk" : "Template Website · Trades",
      tech: ["HTML", "CSS", "SEO", "Mobile"],
      image: "/images/klempner-preview.png",
      link: "/muster/klempner",
      label: locale === "de" ? "LIVE DEMO" : "LIVE DEMO",
      labelColor: "#a78bfa",
      results: locale === "de"
        ? ["5 Designs zur Auswahl", "Fertig in 3–5 Tagen", "Ab 490€"]
        : ["5 designs to choose from", "Ready in 3–5 days", "From €490"],
      year: "2025",
    },
  ];

  const skills = skillNames.map((name, i) => ({
    icon: skillSVGs[i],
    name,
    desc: skillDescs[i],
  }));

  return (
    <>
      {/* HERO */}
      <section style={{ position: "relative", width: "100%", minHeight: "70vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", zIndex: 2 }}>
        <ErrorBoundary label="Globe Hero">
        <WorkHero
          eyebrow={t.heroEyebrow}
          line1={t.heroLine1}
          line2={t.heroLine2}
          line2Highlight={t.heroLine2Highlight}
          subline={t.heroSubline}
          ctaPrimary={t.heroCtaPrimary}
          ctaPrimaryHref={`/${lang}/kontakt`}
          ctaSecondary={t.heroCtaSecondary}
          ctaSecondaryHref={`/${lang}/projekte`}
          trustItems={locale === "de"
            ? ["Antwort in 24h", "Festpreis ab 490€", "Live in 5 Tagen"]
            : ["Reply within 24h", "Fixed price from €490", "Live in 5 days"]}
        />
        </ErrorBoundary>
      </section>

      {/* TICKER */}
      <TickerMarquee
        items={locale === "de"
          ? ["Webdesign", "*ab 490€", "Online-Shops", "SEO", "*in 5 Tagen live", "Landingpages", "Web-Apps", "*Geretsried & München", "Branding", "Wartung & Support"]
          : ["Web Design", "*from €490", "Online Shops", "SEO", "*live in 5 days", "Landing Pages", "Web Apps", "*Geretsried & Munich", "Branding", "Care & Support"]}
      />

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-inner">
          {stats.map((stat, i) => (
            <FadeInSection key={stat.label} delay={i * 100} className="stat-item">
              <div className="stat-number">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* PROJEKTE */}
      <section className="projects-section">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.projectsEyebrow}</span>
            <h2 className="section-title">{t.projectsTitle}</h2>
            <p className="section-subtitle">{t.projectsSubtitle}</p>
          </div>
        </FadeInSection>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <FadeInSection key={project.title} delay={i * 120}>
              <Link href={project.link} className="project-card">
                <div className="project-image-wrap">
                  <Image src={project.image} alt={project.title} className="project-image" width={800} height={500} />
                  <div className="project-image-overlay" />
                  <span className="project-label" style={{ borderColor: project.labelColor, color: project.labelColor }}>
                    {project.label}
                  </span>
                  <span className="project-year">{project.year}</span>
                </div>
                <div className="project-content">
                  <span className="project-category">{project.category}</span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  {project.results && (
                    <ul className="project-results">
                      {project.results.map((r) => (
                        <li key={r}>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M2 7l4 4 6-7" stroke="#00ffe7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {r}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="project-tech">
                    {project.tech.map((t) => (
                      <span key={t} className="tech-badge">{t}</span>
                    ))}
                  </div>
                  <div className="project-cta">
                    <span>{d.home.viewProject}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="skills-section">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.skillsEyebrow}</span>
            <h2 className="section-title">{t.skillsTitle}</h2>
          </div>
        </FadeInSection>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <FadeInSection key={skill.name} delay={i * 60}>
              <div className="skill-card">
                <span className="skill-icon" style={{ color: '#00ffe7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-desc">{skill.desc}</span>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.testimonialsEyebrow}</span>
            <h2 className="section-title">{t.testimonialsTitle}</h2>
          </div>
        </FadeInSection>
        <div className="testimonials-grid">
          {[
            { quote: t.t1quote, name: t.t1name, role: t.t1role, logo: null as string | null },
            { quote: t.t2quote, name: t.t2name, role: t.t2role, logo: "/images/mrg-logo.svg" },
          ].map((item, i) => (
            <FadeInSection key={item.name} delay={i * 100}>
              <div className="testimonial-card">
                {item.logo && (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={150}
                    height={72}
                    unoptimized
                    className="testimonial-logo"
                    style={{ height: 32, width: "auto" }}
                  />
                )}
                <div className="testimonial-stars">★★★★★</div>
                <p className="testimonial-quote">&ldquo;{item.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <span className="testimonial-name">{item.name}</span>
                  <span className="testimonial-role">{item.role}</span>
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <FadeInSection>
          <div className="cta-glow" />
          <span className="section-eyebrow">{t.ctaEyebrow}</span>
          <h2 className="cta-title">
            {t.ctaTitle}<br />
            <span className="cta-highlight">{t.ctaHighlight}</span>
          </h2>
          <p className="cta-desc">
            {t.ctaDesc.split("\n").map((line, i) => (
              <span key={i}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
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
    </>
  );
}
