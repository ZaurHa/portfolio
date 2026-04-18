import Link from "next/link";
import Image from "next/image";
import { FadeInSection } from "../../../components/HomeAnimations";
import { getDictionary, type Locale } from "../../../lib/i18n";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isDE = lang !== "en";
  return isDE ? {
    title: "Portfolio – Webdesign Projekte München | BrandWerkX",
    description: "Webdesign-Projekte von Zaur Hatuev: Kosmetikstudio-Website mit 40% mehr Kundenkontakten. Moderne Websites, Landingpages und Webanwendungen aus München.",
    keywords: ["Webdesign Portfolio München", "Website Case Study", "Webentwickler Referenzen", "Next.js Projekte", "Zaira Beauty Studio"],
    alternates: { canonical: "https://brandwerkx.de/de/projekte" },
    openGraph: { title: "Portfolio – Webdesign Projekte München | BrandWerkX", description: "Webdesign-Projekte mit messbaren Ergebnissen aus München.", url: "https://brandwerkx.de/de/projekte" },
  } : {
    title: "Portfolio – Web Design Projects München | BrandWerkX",
    description: "Web design projects by Zaur Hatuev: beauty studio website with 40% more customer inquiries. Modern websites from München.",
    keywords: ["web design portfolio München", "website case study", "Next.js projects"],
    alternates: { canonical: "https://brandwerkx.de/en/projekte" },
    openGraph: { title: "Portfolio – Web Design Projects München | BrandWerkX", description: "Web design projects with measurable results from München.", url: "https://brandwerkx.de/en/projekte" },
  };
}

export default async function Projekte({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "de") as Locale;
  const d = await getDictionary(locale);
  const t = d.projects;

  const projects = [
    {
      title: t.zairaTitle,
      category: t.zairaCategory,
      year: "2024",
      description: t.zairaDesc,
      tech: ["Next.js", "TailwindCSS", "Figma", "SEO"],
      image: "/images/beauty-praxis-mockup.webp",
      link: `/${lang}/projekte/zaira-beauty`,
      label: t.labelFeatured,
      labelColor: "#00ffe7",
      results: [t.zairaResult1, t.zairaResult2, t.zairaResult3],
      status: "live",
    },
  ];

  const stats = [
    { value: "1", label: t.statsProjects },
    { value: "2024–", label: t.statsSince },
    { value: "100%", label: t.statsSatisfaction },
  ];

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
      <div className="page-hero">
        <FadeInSection>
          <span className="section-eyebrow">{t.eyebrow}</span>
          <h1 className="page-hero-title">{t.title}</h1>
          <p className="page-hero-desc">{t.subtitle}</p>
        </FadeInSection>
      </div>

      <div className="stats-section" style={{ borderTop: "1px solid #111", borderBottom: "1px solid #111" }}>
        <div className="stats-inner" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
          {stats.map((s, i) => (
            <FadeInSection key={s.label} delay={i * 100} className="stat-item">
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </FadeInSection>
          ))}
        </div>
      </div>

      <section className="projects-section">
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
                  {"results" in project && project.results && (
                    <ul className="project-results">
                      {(project.results as string[]).map((r) => (
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
                    <span>
                      {project.status === "demo" ? t.viewDemo : project.status === "wip" ? t.viewMore : t.viewCase}
                    </span>
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

      <section className="cta-section">
        <FadeInSection>
          <div className="cta-glow" />
          <span className="section-eyebrow">{t.ctaEyebrow}</span>
          <h2 className="cta-title">
            {t.ctaTitle}<br />
            <span className="cta-highlight">{t.ctaHighlight}</span>
          </h2>
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
