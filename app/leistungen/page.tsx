import Link from "next/link";

const servicePackages = [
  {
    name: "Starter",
    price: "790€",
    description: "Perfekt für kleine Unternehmen und Startups",
    features: [
      "Responsive Landingpage",
      "Modernes Design",
      "Kontaktformular",
      "SEO-Grundlagen",
      "Mobile-optimiert",
      "1 Monat Support",
      "Hosting inklusive"
    ],
    popular: false,
    cta: "Starter wählen"
  },
  {
    name: "Business",
    price: "1.500€",
    description: "Ideal für etablierte Unternehmen",
    features: [
      "Multi-Page Website (bis 5 Seiten)",
      "Custom Design",
      "Kontaktformular + Terminbuchung",
      "SEO-Optimierung",
      "Google Analytics",
      "3 Monate Support",
      "Hosting + Domain",
      "Content-Management"
    ],
    popular: true,
    cta: "Business wählen"
  },
  {
    name: "Premium",
    price: "2.500€",
    description: "Für anspruchsvolle Projekte und Marken",
    features: [
      "Unbegrenzte Seiten",
      "Custom Branding",
      "3D-Animationen",
      "Erweiterte SEO",
      "Performance-Optimierung",
      "6 Monate Support",
      "Premium Hosting",
      "Schulung inklusive"
    ],
    popular: false,
    cta: "Premium wählen"
  }
];

const additionalServices = [
  {
    name: "UI/UX Design",
    price: "ab 300€",
    description: "Professionelle Designs mit Figma, von Wireframes bis zum finalen Design"
  },
  {
    name: "Branding & Logo",
    price: "ab 500€",
    description: "Komplettes Branding inklusive Logo, Farben, Typografie und Styleguide"
  },
  {
    name: "SEO-Optimierung",
    price: "ab 200€",
    description: "Technische SEO, Content-Optimierung und Google-Ranking-Verbesserung"
  },
  {
    name: "Wartung & Support",
    price: "ab 50€/Monat",
    description: "Regelmäßige Updates, Sicherheits-Checks und kleine Änderungen"
  }
];

export default function Leistungen() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-cyan-400">Meine Leistungen</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Transparente Preise für professionelle Webentwicklung. 
          Wählen Sie das Paket, das zu Ihrem Projekt passt.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="neumorph-badge bg-cyan-400/20 text-cyan-400">Transparente Preise</span>
          <span className="neumorph-badge bg-cyan-400/20 text-cyan-400">Keine versteckten Kosten</span>
          <span className="neumorph-badge bg-cyan-400/20 text-cyan-400">Flexible Anpassung</span>
        </div>
      </div>

      {/* Service-Pakete */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Service-Pakete</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {servicePackages.map((pkg, index) => (
            <div 
              key={pkg.name} 
              className={`neumorph-card p-8 relative ${pkg.popular ? 'ring-2 ring-cyan-400/50' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-cyan-400 text-black px-4 py-1 rounded-full text-sm font-bold">
                  EMPFOHLEN
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold text-cyan-400 mb-2">{pkg.price}</div>
                <p className="text-gray-400">{pkg.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-cyan-400 mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href={`/kontakt?package=${pkg.name.toLowerCase()}`}
                className="neumorph-button-primary w-full text-center py-3 font-semibold block"
              >
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Zusätzliche Services */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Zusätzliche Services</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {additionalServices.map((service, index) => (
            <div key={service.name} className="neumorph-card p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">{service.name}</h3>
                <span className="text-cyan-400 font-bold">{service.price}</span>
              </div>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Arbeitsweise */}
      <div className="neumorph-card p-8 mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center text-cyan-400">Meine Arbeitsweise</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-cyan-400">1</span>
            </div>
            <h3 className="font-bold text-white mb-2">Beratung</h3>
            <p className="text-sm text-gray-400">Kostenloses Erstgespräch, Anforderungsanalyse, Projektplanung</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-cyan-400">2</span>
            </div>
            <h3 className="font-bold text-white mb-2">Design</h3>
            <p className="text-sm text-gray-400">Wireframes, Design-Konzept, Kunden-Feedback, Finalisierung</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-cyan-400">3</span>
            </div>
            <h3 className="font-bold text-white mb-2">Entwicklung</h3>
            <p className="text-sm text-gray-400">Programmierung, Testing, Performance-Optimierung, Launch</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-cyan-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-cyan-400">4</span>
            </div>
            <h3 className="font-bold text-white mb-2">Support</h3>
            <p className="text-sm text-gray-400">Schulung, Wartung, Updates, kontinuierliche Betreuung</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-12 text-center text-cyan-400">Häufige Fragen</h2>
        <div className="space-y-6">
          <div className="neumorph-card p-6">
            <h3 className="text-xl font-bold text-white mb-3">Wie lange dauert ein Projekt?</h3>
            <p className="text-gray-300">
              Die Dauer hängt von der Komplexität ab. Eine Landingpage dauert 1-2 Wochen, 
              eine Multi-Page Website 3-4 Wochen. Ich kommuniziere immer realistische Zeitpläne.
            </p>
          </div>
          
          <div className="neumorph-card p-6">
            <h3 className="text-xl font-bold text-white mb-3">Kann ich mein Projekt anpassen?</h3>
            <p className="text-gray-300">
              Ja, alle Pakete sind flexibel anpassbar. Wir können Features hinzufügen oder entfernen, 
              um das perfekte Paket für Ihr Budget zu finden.
            </p>
          </div>
          
          <div className="neumorph-card p-6">
            <h3 className="text-xl font-bold text-white mb-3">Was ist nach dem Launch?</h3>
            <p className="text-gray-300">
              Nach dem Launch erhalten Sie eine Schulung, Dokumentation und Support. 
              Optional können Sie ein Wartungs-Paket buchen für regelmäßige Updates.
            </p>
          </div>
          
          <div className="neumorph-card p-6">
            <h3 className="text-xl font-bold text-white mb-3">Hosting und Domain inklusive?</h3>
            <p className="text-gray-300">
              Ja, alle Pakete beinhalten Hosting und Domain für das erste Jahr. 
              Danach können Sie diese selbst verwalten oder ich übernehme es weiterhin.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6 text-cyan-400">Bereit für Ihr Projekt?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Lassen Sie uns gemeinsam Ihr Projekt besprechen und das perfekte Paket für Sie finden.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/kontakt" className="neumorph-button-primary px-8 py-3 text-lg">
            Kostenlose Beratung
          </Link>
          <Link href="/projekte" className="neumorph-button px-8 py-3 text-lg">
            Projekte ansehen
          </Link>
        </div>
      </div>
    </div>
  );
}
