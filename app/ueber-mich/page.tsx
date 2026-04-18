import Link from "next/link";
import { FadeInSection } from "../../components/HomeAnimations";

const skills = [
  { name: "Next.js", level: 95 },
  { name: "React", level: 92 },
  { name: "TypeScript", level: 88 },
  { name: "TailwindCSS", level: 95 },
  { name: "Node.js", level: 80 },
  { name: "Figma", level: 85 },
  { name: "SEO", level: 82 },
  { name: "MongoDB", level: 75 },
];

const experience = [
  { icon: "💻", title: "Frontend Development", description: "Moderne, animierte Benutzeroberflächen mit React, Next.js und TailwindCSS — von der Idee bis zur Pixel-perfekten Umsetzung." },
  { icon: "⚙️", title: "Backend & APIs", description: "Robuste API-Entwicklung und Datenbankdesign mit Node.js, REST und modernen Hosting-Lösungen." },
  { icon: "🎨", title: "UI/UX Design", description: "Nutzerzentriertes Design mit Figma: Wireframes, Prototypen, Designsysteme — immer mit Fokus auf Konversion." },
  { icon: "🚀", title: "Performance & SEO", description: "Lighthouse-Scores optimieren, Core Web Vitals verbessern und Google-Rankings nachhaltig steigern." },
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
    href: "mailto:zaur@brandwerkx.de",
    icon: (
      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z" />
      </svg>
    ),
  },
];

export default function UeberMich() {
  return (
    <div className="ueber-mich-page">
      {/* Hero */}
      <section className="about-hero">
        <FadeInSection className="about-hero-inner">
          <div className="about-avatar-wrap">
            <div className="about-avatar">
              <span className="about-avatar-initials">ZH</span>
            </div>
            <div className="about-avatar-ring" />
          </div>
          <div className="about-hero-text">
            <span className="section-eyebrow">Über mich</span>
            <h1 className="about-name">Zaur Hatuev</h1>
            <p className="about-role">Full-Stack Webentwickler & UI/UX Designer</p>
            <p className="about-bio">
              Ich baue digitale Produkte, die nicht nur gut aussehen — sondern wirklich funktionieren.
              Mit über 8 Jahren Erfahrung in der Webentwicklung verbinde ich technisches Know-how
              mit einem Auge für Design und einem Verständnis für Geschäftsziele.
              Jedes Projekt bekommt von mir 100% Einsatz — vom ersten Konzept bis zum Launch.
            </p>
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

      {/* Skills */}
      <section className="section-wrap section-alt">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">Tech Stack</span>
            <h2 className="section-title">Technische Fähigkeiten</h2>
          </div>
        </FadeInSection>
        <div className="skills-bars">
          {skills.map((skill, i) => (
            <FadeInSection key={skill.name} delay={i * 60}>
              <div className="skill-bar-row">
                <div className="skill-bar-header">
                  <span className="skill-bar-name">{skill.name}</span>
                  <span className="skill-bar-pct">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="section-wrap">
        <FadeInSection>
          <div className="section-header">
            <span className="section-eyebrow">Expertise</span>
            <h2 className="section-title">Was ich mitbringe</h2>
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

      {/* CTA */}
      <section className="cta-section">
        <FadeInSection>
          <div className="cta-glow" />
          <span className="section-eyebrow">Zusammenarbeiten</span>
          <h2 className="cta-title">Lass uns etwas<br /><span className="cta-highlight">Großartiges bauen.</span></h2>
          <p className="cta-desc">Kostenlose Erstberatung — unverbindlich, direkt, ohne Vertriebsgespräch.</p>
          <div className="cta-buttons">
            <Link href="/kontakt" className="cta-btn-primary">
              Kontakt aufnehmen
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/leistungen" className="cta-btn-secondary">Preise ansehen</Link>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
}
