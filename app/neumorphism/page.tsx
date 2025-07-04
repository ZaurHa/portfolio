import Link from 'next/link';

export default function NeumorphismOverviewPage() {
  const demos = [
    {
      title: "Design Varianten",
      description: "8 verschiedene Neumorphism-Farbpaletten zum Ausprobieren",
      href: "/neumorphism-demo",
      icon: "🎨",
      features: ["8 Farbvarianten", "Interaktive Buttons", "Input-Felder", "Progress-Bars"]
    },
    {
      title: "Praktische Showcase",
      description: "Neumorphism in echten UI-Kontexten - Forms, Navigation, Data Display",
      href: "/neumorphism-showcase",
      icon: "🛠️",
      features: ["Dashboard Cards", "Contact Forms", "Navigation Menus", "Data Tables"]
    },
    {
      title: "Portfolio Integration",
      description: "Ihr Portfolio mit auswählbaren Neumorphism-Varianten",
      href: "/portfolio-neumorphism",
      icon: "💼",
      features: ["Live Style Switcher", "8 Varianten", "Responsive Design", "Interaktive Elemente"]
    },
    {
      title: "Integration Guide",
      description: "Schritt-für-Schritt Anleitung zur Integration in eigene Projekte",
      href: "/neumorphism-guide",
      icon: "📚",
      features: ["Code-Beispiele", "Best Practices", "Live Preview", "Tipps & Tricks"]
    }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Neumorphism Design System</h1>
          <p className="text-lg opacity-80 max-w-3xl mx-auto">
            Entdecken Sie verschiedene Neumorphism-Design-Varianten und deren praktische Anwendung. 
            Von klassischen Grautönen bis hin zu farbenfrohen Paletten - alles mit interaktiven Elementen.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {demos.map((demo, index) => (
            <Link key={index} href={demo.href}>
              <div className="neumorph-card-pro p-8 cursor-pointer transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{demo.icon}</div>
                <h2 className="text-2xl font-bold mb-3">{demo.title}</h2>
                <p className="text-sm opacity-80 mb-6">{demo.description}</p>
                
                <div className="space-y-2">
                  {demo.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-accent"></div>
                      <span className="text-sm opacity-80">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <span className="neumorph-button-pro inline-block">
                    Demo ansehen →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="neumorph-card-pro p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Was ist Neumorphism?</h2>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold mb-2">🎯 Design-Prinzip</h3>
                <p className="opacity-80">
                  Neumorphism kombiniert flache Design-Elemente mit subtilen Schatten, 
                  um eine sanfte 3D-Wirkung zu erzeugen.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🌈 Farbpaletten</h3>
                <p className="opacity-80">
                  Von klassischen Grautönen bis hin zu farbenfrohen Varianten - 
                  Neumorphism funktioniert mit jeder Farbpalette.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">⚡ Interaktivität</h3>
                <p className="opacity-80">
                  Elemente reagieren auf Benutzerinteraktionen durch 
                  Schatten-Inversion und sanfte Animationen.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <span className="neumorph-button-pro inline-block">
              ← Zurück zum Portfolio
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
} 