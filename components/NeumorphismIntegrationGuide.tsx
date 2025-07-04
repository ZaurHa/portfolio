'use client';

import { useState } from 'react';

export default function NeumorphismIntegrationGuide() {
  const [selectedVariant, setSelectedVariant] = useState('neumorph-classic');

  const integrationSteps = [
    {
      step: 1,
      title: "CSS-Variablen einbinden",
      description: "Fügen Sie die neumorphism-variants.css zu Ihrem Projekt hinzu",
      code: `import "./neumorphism-variants.css";`,
      type: "import"
    },
    {
      step: 2,
      title: "Container-Klasse hinzufügen",
      description: "Wählen Sie eine Neumorphism-Variante für Ihren Container",
      code: `<div className="neumorph-classic">
  <!-- Ihre Komponenten hier -->
</div>`,
      type: "jsx"
    },
    {
      step: 3,
      title: "Elemente stylen",
      description: "Verwenden Sie die vordefinierten Klassen für verschiedene Elemente",
      code: `<div className="card">Card-Inhalt</div>
<button className="neumorph-button">Button</button>
<input className="neumorph-input" placeholder="Input" />`,
      type: "jsx"
    },
    {
      step: 4,
      title: "Interaktivität hinzufügen",
      description: "Nutzen Sie Hover- und Active-States für bessere UX",
      code: `<div className="card neumorph-hover">
  Hover-Effekt
</div>`,
      type: "jsx"
    }
  ];

  const variants = [
    { name: 'Klassisch', class: 'neumorph-classic' },
    { name: 'Soft', class: 'neumorph-soft' },
    { name: 'Dark', class: 'neumorph-dark' },
    { name: 'Ocean', class: 'neumorph-ocean' },
    { name: 'Nature', class: 'neumorph-nature' },
    { name: 'Sunset', class: 'neumorph-sunset' },
    { name: 'Royal', class: 'neumorph-royal' }
  ];

  return (
    <div className={`min-h-screen p-8 transition-all duration-500 ${selectedVariant}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Neumorphism Integration Guide
          </h1>
          <p className="text-lg opacity-80 max-w-3xl mx-auto" style={{ color: 'var(--text)' }}>
            Schritt-für-Schritt Anleitung zur Integration von Neumorphism in Ihre bestehenden Projekte
          </p>
        </div>

        {/* Variant Selector */}
        <div className="mb-8 text-center">
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Variante auswählen:
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {variants.map((variant) => (
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

        {/* Integration Steps */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {integrationSteps.map((step) => (
              <div key={step.step} className="card p-6">
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ 
                      backgroundColor: 'var(--accent)',
                      color: '#ffffff'
                    }}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
                      {step.title}
                    </h3>
                    <p className="text-sm opacity-80 mb-4" style={{ color: 'var(--text)' }}>
                      {step.description}
                    </p>
                    <div className="neumorph-input p-4 font-mono text-sm">
                      <pre className="whitespace-pre-wrap">{step.code}</pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
              Live Preview
            </h3>
            
            <div className="card p-6">
              <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                Beispiel-Komponenten
              </h4>
              <div className="space-y-4">
                <div className="card p-4">
                  <p className="text-sm" style={{ color: 'var(--text)' }}>
                    Dies ist eine Beispiel-Card mit Neumorphism-Styling
                  </p>
                </div>
                
                <div className="space-y-2">
                  <button className="neumorph-button w-full">
                    Standard Button
                  </button>
                  <button 
                    className="neumorph-button w-full"
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: '#ffffff'
                    }}
                  >
                    Accent Button
                  </button>
                </div>
                
                <input 
                  type="text" 
                  className="neumorph-input w-full" 
                  placeholder="Beispiel Input-Feld"
                />
                
                <div className="neumorph-progress h-3">
                  <div 
                    className="neumorph-progress-fill h-full"
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
                Hover-Effekte
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="card p-4 neumorph-hover text-center">
                  <span className="text-2xl">🎨</span>
                  <p className="text-sm mt-2" style={{ color: 'var(--text)' }}>
                    Hover mich!
                  </p>
                </div>
                <div className="card p-4 neumorph-pulse text-center">
                  <span className="text-2xl">⚡</span>
                  <p className="text-sm mt-2" style={{ color: 'var(--text)' }}>
                    Pulsierend
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
            Best Practices & Tipps
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                ✅ Empfohlen
              </h3>
              <ul className="space-y-2 text-sm opacity-80" style={{ color: 'var(--text)' }}>
                <li>• Verwenden Sie konsistente Schatten-Größen</li>
                <li>• Halten Sie Kontraste lesbar</li>
                <li>• Nutzen Sie sanfte Übergänge (300ms)</li>
                <li>• Testen Sie auf verschiedenen Bildschirmgrößen</li>
                <li>• Kombinieren Sie mit CSS Custom Properties</li>
                <li>• Verwenden Sie semantische Klassennamen</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--accent)' }}>
                ❌ Vermeiden
              </h3>
              <ul className="space-y-2 text-sm opacity-80" style={{ color: 'var(--text)' }}>
                <li>• Zu starke Schatten (mehr als 12px)</li>
                <li>• Zu viele Neumorphism-Elemente auf einer Seite</li>
                <li>• Zu kleine Schriftgrößen</li>
                <li>• Komplexe Formen mit vielen Ecken</li>
                <li>• Fehlende Focus-States für Accessibility</li>
                <li>• Performance-kritische Animationen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-12">
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/neumorphism" 
              className="neumorph-button"
            >
              ← Zurück zu den Demos
            </a>
            <a 
              href="/portfolio-neumorphism" 
              className="neumorph-button"
              style={{
                backgroundColor: 'var(--accent)',
                color: '#ffffff'
              }}
            >
              Portfolio mit Neumorphism →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 