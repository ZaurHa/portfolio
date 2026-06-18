import Link from "next/link";
import { FadeInSection } from "../../../components/HomeAnimations";
import { getDictionary, type Locale } from "../../../lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isDE = lang !== "en";
  return isDE ? {
    title: "Über mich – Zaur Hatuev | Webentwickler München",
    description: "Zaur Hatuev – Freelance Webentwickler & UI/UX Designer aus München. 8+ Jahre Erfahrung mit Next.js, React, TypeScript und Figma. Projekte für kleine Unternehmen und Startups.",
    keywords: ["Zaur Hatuev", "Webentwickler München", "Freelancer München", "Full-Stack Entwickler", "UI/UX Designer München", "Next.js Entwickler"],
    alternates: { canonical: "https://brandwerkx.de/de/ueber-mich" },
    openGraph: { title: "Über mich – Zaur Hatuev | Webentwickler München", description: "Freelance Webentwickler & UI/UX Designer aus München. 8+ Jahre Erfahrung.", url: "https://brandwerkx.de/de/ueber-mich" },
  } : {
    title: "About – Zaur Hatuev | Web Developer München",
    description: "Zaur Hatuev – Freelance web developer & UI/UX designer based in München. 8+ years experience with Next.js, React and TypeScript.",
    keywords: ["Zaur Hatuev", "web developer München", "freelancer München", "Next.js developer"],
    alternates: { canonical: "https://brandwerkx.de/en/ueber-mich" },
    openGraph: { title: "About – Zaur Hatuev | Web Developer München", description: "Freelance web developer & UI/UX designer based in München.", url: "https://brandwerkx.de/en/ueber-mich" },
  };
}

const skills = [
  "Next.js", "React", "TypeScript", "TailwindCSS",
  "Figma", "SEO", "Vercel", "Git",
  "Webdesign", "Performance", "AI Tools", "Responsive Design",
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/ZaurHa",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/zaur-hatuev-8559b91a1/",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "E-Mail",
    href: "mailto:brandwerkx@gmail.com",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z" />
      </svg>
    ),
  },
];

export default async function UeberMich({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const d = await getDictionary(locale);
  const t = d.about;

  const expIcons = [
    // Code / Monitor
    <svg key="code" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    // Settings / Gear
    <svg key="gear" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    // Pen / Design
    <svg key="pen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
    // Rocket / Launch
    <svg key="rocket" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
  ];

  const experience = [
    { icon: expIcons[0], title: t.exp1title, description: t.exp1desc },
    { icon: expIcons[1], title: t.exp2title, description: t.exp2desc },
    { icon: expIcons[2], title: t.exp3title, description: t.exp3desc },
    { icon: expIcons[3], title: t.exp4title, description: t.exp4desc },
  ];

  return (
    <div className="ueber-mich-page">
      <section className="about-hero">
        <FadeInSection className="about-hero-inner">
          <div className="about-avatar-wrap">
            <div className="about-avatar">
              <span className="about-avatar-initials">ZH</span>
            </div>
            <div className="about-avatar-ring" />
          </div>
          <div className="about-hero-text">
            <span className="section-eyebrow">{t.eyebrow}</span>
            <h1 className="about-name">{t.name}</h1>
            <p className="about-role">{t.role}</p>
            <p className="about-bio">{t.bio}</p>
            <div className="about-socials">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="about-social-link">
                  {s.icon}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.skillsEyebrow}</span>
            <h2 className="section-title">{t.skillsTitle}</h2>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div className="skills-tags">
            {skills.map((skill) => (
              <span key={skill} className="skill-tag">{skill}</span>
            ))}
          </div>
        </FadeInSection>
      </section>

      <section className="section-wrap">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">{t.expertiseEyebrow}</span>
            <h2 className="section-title">{t.expertiseTitle}</h2>
          </div>
        </FadeInSection>
        <div className="expertise-grid">
          {experience.map((exp, i) => (
            <FadeInSection key={exp.title} delay={i * 80}>
              <div className="expertise-card">
                <span className="expertise-icon">{exp.icon}</span>
                <h3 className="expertise-title">{exp.title}</h3>
                <p className="expertise-desc">{exp.description}</p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <FadeInSection>
          <div className="cta-glow" />
          <span className="section-eyebrow">{t.ctaEyebrow}</span>
          <h2 className="cta-title">{t.ctaTitle}<br /><span className="cta-highlight">{t.ctaHighlight}</span></h2>
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
