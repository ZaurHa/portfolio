import Image from "next/image";
import Link from "next/link";

export default function ZairaBeautyCaseStudy() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-6">
          <Link href="/projekte" className="text-[#0d9488] hover:text-[#0d9488] mb-4 inline-block">
            ← Zurück zu allen Projekten
          </Link>
        </div>
        <h1 className="text-5xl font-bold mb-6 text-[#0d9488]">Zaira Beauty Studio</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Komplette Website und Branding für ein erfolgreiches Kosmetikstudio. 
          Von der ersten Idee bis zur Umsetzung mit messbaren Erfolgen.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="neumorph-badge bg-[#0d9488]/20 text-[#0d9488]">Next.js</span>
          <span className="neumorph-badge bg-[#0d9488]/20 text-[#0d9488]">TailwindCSS</span>
          <span className="neumorph-badge bg-[#0d9488]/20 text-[#0d9488]">Figma</span>
          <span className="neumorph-badge bg-[#0d9488]/20 text-[#0d9488]">SEO</span>
          <span className="neumorph-badge bg-[#0d9488]/20 text-[#0d9488]">Branding</span>
        </div>
      </div>

      {/* Projekt-Übersicht */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="neumorph-card p-6 text-center">
          <div className="text-3xl font-bold text-[#0d9488] mb-2">40%</div>
          <div className="text-gray-300">Mehr Kundenkontakte</div>
        </div>
        <div className="neumorph-card p-6 text-center">
          <div className="text-3xl font-bold text-[#0d9488] mb-2">3</div>
          <div className="text-gray-300">Monate Projektlaufzeit</div>
        </div>
        <div className="neumorph-card p-6 text-center">
          <div className="text-3xl font-bold text-[#0d9488] mb-2">100%</div>
          <div className="text-gray-300">Kundenzufriedenheit</div>
        </div>
      </div>

      {/* Hauptbild */}
      <div className="neumorph-card p-8 mb-16">
        <Image
          src="/images/beauty-praxis-mockup.webp"
          alt="Zaira Beauty Studio Website Mockup"
          width={1200}
          height={800}
          className="w-full rounded-lg"
        />
      </div>

      {/* Projekt-Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#0d9488]">Die Herausforderung</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Das Zaira Beauty Studio war ein etabliertes Kosmetikstudio mit treuen Kunden, 
              aber ohne professionelle Online-Präsenz. Die Inhaberin wollte:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Eine moderne, vertrauensvolle Website</li>
              <li>• Ein einheitliches Branding</li>
              <li>• Mehr Online-Sichtbarkeit</li>
              <li>• Einfache Terminbuchung</li>
              <li>• Professionelle Darstellung der Services</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#0d9488]">Die Lösung</h2>
          <div className="space-y-4 text-gray-300">
            <p>
              Ich entwickelte eine umfassende Lösung, die alle Anforderungen erfüllte:
            </p>
            <ul className="space-y-2 ml-4">
              <li>• Responsive Website mit modernem Design</li>
              <li>• Komplettes Branding (Logo, Farben, Typografie)</li>
              <li>• SEO-Optimierung für lokale Suche</li>
              <li>• Kontaktformular mit Terminbuchung</li>
              <li>• Service-Übersicht mit Preisen</li>
              <li>• Galerie mit Vorher-Nachher-Bildern</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Design-Prozess */}
      <div className="neumorph-card p-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[#0d9488] text-center">Design-Prozess</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#0d9488]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-[#0d9488]">1</span>
            </div>
            <h3 className="font-bold text-white mb-2">Research</h3>
            <p className="text-sm text-gray-400">Marktanalyse, Zielgruppen-Research, Wettbewerbsanalyse</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#0d9488]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-[#0d9488]">2</span>
            </div>
            <h3 className="font-bold text-white mb-2">Konzept</h3>
            <p className="text-sm text-gray-400">Branding-Konzept, Wireframes, Design-System</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#0d9488]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-[#0d9488]">3</span>
            </div>
            <h3 className="font-bold text-white mb-2">Design</h3>
            <p className="text-sm text-gray-400">UI/UX Design, Prototyping, Kunden-Feedback</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-[#0d9488]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-[#0d9488]">4</span>
            </div>
            <h3 className="font-bold text-white mb-2">Umsetzung</h3>
            <p className="text-sm text-gray-400">Entwicklung, Testing, Launch, Support</p>
          </div>
        </div>
      </div>

      {/* Technische Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div className="neumorph-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-[#0d9488]">Frontend</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>Next.js 14</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>React 18</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>TailwindCSS</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>Framer Motion</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>Responsive Design</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
          </div>
        </div>

        <div className="neumorph-card p-8">
          <h3 className="text-2xl font-bold mb-6 text-[#0d9488]">Features</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between">
              <span>SEO-Optimierung</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>Kontaktformular</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>Service-Galerie</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>Preisübersicht</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
            <div className="flex justify-between">
              <span>Mobile-First</span>
              <span className="text-[#0d9488]">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ergebnisse */}
      <div className="neumorph-card p-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[#0d9488] text-center">Ergebnisse & Erfolge</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quantitative Erfolge</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between items-center">
                <span>Kundenkontakte</span>
                <span className="text-[#0d9488] font-bold">+40%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Website-Besucher</span>
                <span className="text-[#0d9488] font-bold">+150%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Google-Ranking</span>
                <span className="text-[#0d9488] font-bold">Top 3</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Ladezeit</span>
                <span className="text-[#0d9488] font-bold">0.8s</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Qualitative Verbesserungen</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-[#0d9488]">✓</span>
                <span>Professionelles Erscheinungsbild</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0d9488]">✓</span>
                <span>Einfachere Terminbuchung</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0d9488]">✓</span>
                <span>Bessere Kundenkommunikation</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#0d9488]">✓</span>
                <span>Erhöhtes Vertrauen bei Neukunden</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kunden-Feedback */}
      <div className="neumorph-card p-8 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-[#0d9488] text-center">Kunden-Feedback</h2>
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <blockquote className="text-xl text-gray-300 italic mb-6 max-w-3xl mx-auto">
            "Zaur hat nicht nur eine wunderschöne Website für mich erstellt, sondern auch 
            wertvolle Tipps gegeben, wie ich meine Reichweite steigern kann. Die Ergebnisse 
            sprechen für sich - ich habe deutlich mehr Kundenkontakte!"
          </blockquote>
          <div className="text-white font-semibold">- Zaira, Inhaberin Zaira Beauty Studio</div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-[#0d9488]">Ihr nächstes Projekt?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Lassen Sie uns gemeinsam Ihr Projekt zum Erfolg führen. 
          Von der ersten Idee bis zur Umsetzung.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/kontakt" className="neumorph-button-primary px-8 py-3 text-lg">
            Projekt anfragen
          </Link>
          <Link href="/projekte" className="neumorph-button px-8 py-3 text-lg">
            Weitere Projekte
          </Link>
        </div>
      </div>
    </div>
  );
} 