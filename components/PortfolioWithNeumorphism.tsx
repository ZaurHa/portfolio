'use client';

import { useState } from 'react';
import Image from "next/image";

const projects = [
  {
    title: "Beauty Studio Demo",
    description: "Eine vollständige Beauty-Studio Website mit allen Services, Online-Buchung und modernem Design. Live-Demo verfügbar!",
    tech: ["Next.js", "React", "TailwindCSS", "TypeScript", "Framer Motion"],
    image: "/images/beauty-praxis-preview.svg",
    link: "/kosmetik",
    demo: true,
    featured: true,
  },
  {
    title: "E-Commerce Shop",
    description: "Ein performanter Online-Shop mit Warenkorb, Authentifizierung und Admin-Panel.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma"],
    image: "/images/ecommerce-preview.svg",
    link: "/projekte/ecommerce-shop",
  },
  {
    title: "Blog Plattform",
    description: "Eine skalierbare Blogging-Plattform mit Markdown-Support und SEO-Optimierung.",
    tech: ["Next.js", "MDX", "Vercel", "TailwindCSS"],
    image: "/images/blog-preview.svg",
    link: "/projekte/blog-plattform",
  },
  {
    title: "Dashboard App",
    description: "Ein interaktives Dashboard mit Datenvisualisierung und Echtzeit-Updates.",
    tech: ["React", "D3.js", "Node.js", "Socket.io"],
    image: "/images/dashboard-preview.svg",
    link: "/projekte/dashboard-app",
  },
];

const neumorphismVariants = [
  { name: 'Original', class: '' },
  { name: 'Klassisch', class: 'neumorph-classic' },
  { name: 'Soft', class: 'neumorph-soft' },
  { name: 'Dark', class: 'neumorph-dark' },
  { name: 'Ocean', class: 'neumorph-ocean' },
  { name: 'Nature', class: 'neumorph-nature' },
  { name: 'Sunset', class: 'neumorph-sunset' },
  { name: 'Royal', class: 'neumorph-royal' }
];

export default function PortfolioWithNeumorphism() {
  const [selectedVariant, setSelectedVariant] = useState('');

  return (
    <div className={`min-h-screen transition-all duration-500 ${selectedVariant}`}>
      <section>
        {/* Style Selector */}
        <div className="text-center mb-8 pt-8">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text, #f5f6fa)' }}>
            Design-Variante wählen:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {neumorphismVariants.map((variant) => (
              <button
                key={variant.class}
                onClick={() => setSelectedVariant(variant.class)}
                className={`neumorph-button px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedVariant === variant.class ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-12 text-center" style={{ color: 'var(--text, #f5f6fa)' }}>
          Meine Projekte
        </h1>

        {/* Demo Highlight Section */}
        <div className="mb-16 p-10 card flex flex-col items-center max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--accent, #ff9900)' }}>
              🚀 Live Demo verfügbar!
            </h2>
            <p className="opacity-80 max-w-2xl mx-auto" style={{ color: 'var(--text, #f5f6fa)' }}>
              Schauen Sie sich meine neueste Beauty-Studio Website an – eine vollständige Demo mit allen Features, die ich für Ihre Projekte umsetzen kann.
            </p>
          </div>
          <a 
            href="http://localhost:3001" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neumorph-button mt-4 flex items-center gap-2"
            style={{
              backgroundColor: 'var(--accent, #ff9900)',
              color: '#ffffff',
              boxShadow: '4px 4px 8px var(--shadow-dark, #101012), -4px -4px 8px var(--shadow-light, #23242a)'
            }}
          >
            <span>Live Demo öffnen</span>
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Projektkarten */}
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="grid gap-x-10 gap-y-12 py-12 mb-20 grid-cols-[repeat(auto-fit,minmax(340px,1fr))]">
            {projects.map((project) => (
              <div key={project.title} className="card flex flex-col h-full min-h-[400px] w-full mx-auto p-8 md:p-10 gap-y-6 rounded-3xl neumorph-hover">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="28" height="28" fill="none" stroke="var(--accent, #ff9900)" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <h2 className="text-2xl md:text-3xl font-semibold align-middle" style={{ color: 'var(--accent, #ff9900)' }}>
                      {project.title}
                    </h2>
                  </div>
                  <p className="mb-2 opacity-80 flex-1 text-base md:text-lg" style={{ color: 'var(--text, #f5f6fa)' }}>
                    {project.description}
                  </p>
                  <div className="mb-2 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="neumorph-badge text-xs md:text-sm xl:text-base px-3 py-1 md:px-4 md:py-1.5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-auto flex flex-col sm:flex-row gap-3 min-h-[48px]">
                  {project.demo ? (
                    <>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="neumorph-button flex-1 flex items-center justify-center gap-2 text-base md:text-lg px-4 py-2 md:px-6 md:py-2.5 min-h-[48px]"
                        style={{
                          backgroundColor: 'var(--accent, #ff9900)',
                          color: '#ffffff'
                        }}
                      >
                        <span>Live Demo</span>
                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>
                      <a 
                        href={project.link.replace('/kosmetik', '/projekte/beauty-praxis')} 
                        className="neumorph-button flex-1 flex items-center justify-center gap-2 text-base md:text-lg px-4 py-2 md:px-6 md:py-2.5 min-h-[48px]"
                      >
                        <span>Details</span>
                        <svg width="18" height="18" fill="none" stroke="var(--accent, #ff9900)" strokeWidth="2" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10"/>
                        </svg>
                      </a>
                    </>
                  ) : (
                    <a href={project.link} className="neumorph-button w-full flex items-center justify-center gap-2 text-base md:text-lg px-4 py-2 md:px-6 md:py-2.5 min-h-[48px] flex-1">
                      <span>Mehr erfahren</span>
                      <svg width="18" height="18" fill="none" stroke="var(--accent, #ff9900)" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills/Leistungen Section */}
        <h2 className="text-3xl font-bold mb-10 text-center" style={{ color: 'var(--accent, #ff9900)' }}>
          Meine Skills & Leistungen
        </h2>
        <div className="grid gap-10 mb-10 grid-cols-[repeat(auto-fit,minmax(320px,1fr))]">
          {[
            {
              icon: "💻",
              title: "Webentwicklung",
              description: "Moderne Websites & Webapps mit Next.js, React, TypeScript, TailwindCSS."
            },
            {
              icon: "🎨",
              title: "UI/UX Design",
              description: "Ästhetische, benutzerfreundliche Oberflächen – von der Idee bis zum Prototypen."
            },
            {
              icon: "🚀",
              title: "SEO & Performance",
              description: "Schnelle Ladezeiten, Google-Optimierung und Top-Core-Web-Vitals."
            },
            {
              icon: "🤝",
              title: "Beratung & Support",
              description: "Individuelle Beratung, transparente Kommunikation und zuverlässiger Support."
            }
          ].map((skill, index) => (
            <div key={index} className="card flex flex-col items-center text-center p-8 min-h-[260px] w-full mx-auto neumorph-hover">
              <span className="text-4xl mb-2">{skill.icon}</span>
              <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: 'var(--accent, #ff9900)' }}>
                {skill.title}
              </h3>
              <p className="opacity-80 text-base md:text-lg" style={{ color: 'var(--text, #f5f6fa)' }}>
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-8 mb-12">
          {["Next.js", "React", "TypeScript", "TailwindCSS", "Figma", "SEO", "Performance", "UI/UX", "Beratung"].map(skill => (
            <span key={skill} className="neumorph-badge">{skill}</span>
          ))}
        </div>

        <div className="text-center mt-8">
          <a 
            href="/kontakt" 
            className="neumorph-button"
            style={{
              backgroundColor: 'var(--accent, #ff9900)',
              color: '#ffffff',
              padding: '12px 24px',
              fontSize: '18px'
            }}
          >
            Projekt anfragen
          </a>
        </div>

        {/* Neumorphism Demo Link */}
        <div className="text-center mt-16">
          <div className="card p-6 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text, #f5f6fa)' }}>
              🎨 Neumorphism Design System
            </h3>
            <p className="text-sm opacity-80 mb-4" style={{ color: 'var(--text, #f5f6fa)' }}>
              Entdecken Sie alle verfügbaren Neumorphism-Varianten und deren praktische Anwendung.
            </p>
            <a 
              href="/neumorphism" 
              className="neumorph-button inline-block"
            >
              Alle Varianten ansehen →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 