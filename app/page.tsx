import Image from "next/image";
import Link from "next/link";
import GlobeHero from "../components/GlobeHero";

const projects = [
  {
    title: "Zaira Beauty Studio",
    description: "Komplette Website + Branding für erfolgreiches Kosmetikstudio. 40% mehr Kundenkontakte in 3 Monaten.",
    tech: ["Next.js", "TailwindCSS", "Figma", "SEO"],
    image: "/images/beauty-praxis-mockup.webp",
    link: "/projekte/zaira-beauty",
    featured: true,
    results: ["40% mehr Kundenkontakte", "Branding komplett erstellt", "SEO-Optimierung"]
  },
  {
    title: "Kleinanzeigen Plattform",
    description: "Full-Stack Entwicklung einer Kleinanzeigen-Plattform (in Entwicklung). Backend mit Produktverwaltung.",
    tech: ["Next.js", "TypeScript", "Database", "API"],
    image: "/images/kleinanzeigen-preview.svg",
    link: "/projekte/kleinanzeigen-platform",
    featured: false,
    status: "In Entwicklung"
  },
  {
    title: "Music Player Demo",
    description: "Interaktiver Musik-Player mit 3D-Animationen und moderner UX. Technische Demo für Premium-Projekte.",
    tech: ["React", "Three.js", "Web Audio API"],
    image: "/images/music-player-preview.svg",
    link: "/music-player-demo",
    featured: false,
    demo: true
  }
];

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section style={{ position: 'relative', width: '100%', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 2 }}>
        {/* Zaur Hatuev Text oben links */}
        {/*
        <div style={{ position: 'absolute', left: '2.5rem', top: '2.5rem', zIndex: 110, color: '#fff', fontSize: '0.95rem', fontFamily: 'Inter, Segoe UI, Arial, sans-serif', opacity: 0.88, lineHeight: 1.4, maxWidth: '28vw', pointerEvents: 'none', letterSpacing: '0.01em', textShadow: '0 2px 8px #0007' }}>
          <div style={{ fontWeight: 600 }}>„Zaur Hatuev – Design mit Substanz und Wirkung.“</div>
          <div style={{ fontWeight: 400, fontSize: '0.89rem', opacity: 0.85 }}>Freiberuflicher Webdesigner & Markenstratege</div>
        </div>
        */}
        <GlobeHero>
          ICH GESTALTE DIGITALE ERLEBNISSE, DIE MARKEN SICHTBAR MACHEN
        </GlobeHero>
      </section>

      {/* Projekte-Section */}
      <section className="bg-[#050505] neumorph-black min-h-screen py-8">
        <h1 className="text-4xl font-bold mb-12 text-center text-[#e0e6f0]">Meine Projekte</h1>
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div key={project.title} className={`neumorph-card flex flex-col overflow-hidden min-h-[320px] ${project.featured ? 'ring-2 ring-cyan-400/50' : ''}`} style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.9), 0 12px 24px rgba(0,0,0,0.7), 0 6px 12px rgba(0,0,0,0.5)' }}>
                <div className="relative w-full h-56 overflow-hidden mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                    style={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                  />
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/60 to-transparent" />
                  {project.featured && (
                    <div className="absolute top-3 left-3 bg-cyan-400 text-black px-2 py-1 rounded text-xs font-bold">
                      FEATURED
                    </div>
                  )}
                  {project.status && (
                    <div className="absolute top-3 right-3 bg-orange-400 text-black px-2 py-1 rounded text-xs font-bold">
                      {project.status}
                    </div>
                  )}
                  {project.demo && (
                    <div className="absolute top-3 right-3 bg-purple-400 text-black px-2 py-1 rounded text-xs font-bold">
                      DEMO
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col items-center text-center px-4 pb-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#e0e6f0]">{project.title}</h3>
                  <p className="text-[#b0b0b0] mb-3">{project.description}</p>
                  {project.results && (
                    <div className="mb-3 text-xs text-cyan-300">
                      {project.results.map((result, idx) => (
                        <div key={idx} className="mb-1">✓ {result}</div>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mb-3 flex-wrap justify-center">
                    {project.tech.map((t) => (
                      <span key={t} className="neumorph-badge">{t}</span>
                    ))}
                  </div>
                  <a href={project.link} className="neumorph-button px-6 py-2 w-full">
                    {project.demo ? 'Demo ansehen' : 'Projekt ansehen'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills/Leistungen Section */}
        <section className="neumorph-black py-16 px-4 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-10 text-center text-[#e0e6f0]">Meine Skills & Leistungen</h2>
          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            <div className="neumorph-card flex flex-col items-center text-center min-h-[260px] w-full mx-auto" style={{ maxWidth: 370 }}>
              <span className="text-4xl mb-2">💻</span>
              <h3 className="text-2xl font-bold mb-2 text-[#e0e6f0]">Webentwicklung</h3>
              <p className="text-lg text-[#b0b0b0]">Moderne Websites & Webapps mit Next.js, React, TypeScript, TailwindCSS.</p>
            </div>
            <div className="neumorph-card flex flex-col items-center text-center min-h-[260px] w-full mx-auto" style={{ maxWidth: 370 }}>
              <span className="text-4xl mb-2">🎨</span>
              <h3 className="text-2xl font-bold mb-2 text-[#e0e6f0]">UI/UX Design</h3>
              <p className="text-lg text-[#b0b0b0]">Ästhetische, benutzerfreundliche Oberflächen – von der Idee bis zum Prototypen.</p>
            </div>
            <div className="neumorph-card flex flex-col items-center text-center min-h-[260px] w-full mx-auto" style={{ maxWidth: 370 }}>
              <span className="text-4xl mb-2">🚀</span>
              <h3 className="text-2xl font-bold mb-2 text-[#e0e6f0]">SEO & Performance</h3>
              <p className="text-lg text-[#b0b0b0]">Schnelle Ladezeiten, Google-Optimierung und Top-Core-Web-Vitals.</p>
            </div>
            <div className="neumorph-card flex flex-col items-center text-center min-h-[260px] w-full mx-auto" style={{ maxWidth: 370 }}>
              <span className="text-4xl mb-2">🤝</span>
              <h3 className="text-2xl font-bold mb-2 text-[#e0e6f0]">Beratung & Support</h3>
              <p className="text-lg text-[#b0b0b0]">Individuelle Beratung, transparente Kommunikation und zuverlässiger Support.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-8 mb-12">
            {["Next.js", "React", "TypeScript", "TailwindCSS", "Figma", "SEO", "Performance", "UI/UX", "Beratung"].map(skill => (
              <span key={skill} className="neumorph-badge">{skill}</span>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/kontakt" className="neumorph-button">
              Projekt anfragen
            </a>
          </div>
        </section>
      </section>
    </>
  );
}
