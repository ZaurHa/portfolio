'use client';

import { useState } from 'react';

interface ShowcaseItem {
  title: string;
  description: string;
  icon: string;
  variant: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    title: "Dashboard Cards",
    description: "Perfekt für KPI-Anzeigen und Statistiken",
    icon: "📊",
    variant: "neumorph-classic"
  },
  {
    title: "Form Elements",
    description: "Elegante Eingabefelder und Buttons",
    icon: "✏️",
    variant: "neumorph-soft"
  },
  {
    title: "Navigation",
    description: "Moderne Menü- und Sidebar-Elemente",
    icon: "🧭",
    variant: "neumorph-dark"
  },
  {
    title: "Product Cards",
    description: "Attraktive Produktdarstellung",
    icon: "🛍️",
    variant: "neumorph-pink"
  },
  {
    title: "Progress Indicators",
    description: "Visuelle Fortschrittsanzeigen",
    icon: "📈",
    variant: "neumorph-ocean"
  },
  {
    title: "Status Badges",
    description: "Informative Status- und Label-Elemente",
    icon: "🏷️",
    variant: "neumorph-nature"
  },
  {
    title: "Modal Windows",
    description: "Elegante Dialog- und Popup-Fenster",
    icon: "🪟",
    variant: "neumorph-sunset"
  },
  {
    title: "Settings Panel",
    description: "Benutzerfreundliche Einstellungsbereiche",
    icon: "⚙️",
    variant: "neumorph-royal"
  }
];

export default function NeumorphismShowcase() {
  const [selectedVariant, setSelectedVariant] = useState('neumorph-classic');
  const [activeTab, setActiveTab] = useState('cards');

  const variants = [
    { name: 'Klassisch', class: 'neumorph-classic' },
    { name: 'Soft', class: 'neumorph-soft' },
    { name: 'Dark', class: 'neumorph-dark' },
    { name: 'Pink', class: 'neumorph-pink' },
    { name: 'Ocean', class: 'neumorph-ocean' },
    { name: 'Nature', class: 'neumorph-nature' },
    { name: 'Sunset', class: 'neumorph-sunset' },
    { name: 'Royal', class: 'neumorph-royal' }
  ];

  return (
    <div className={`min-h-screen p-8 transition-all duration-500 ${selectedVariant}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text)' }}>
            Neumorphism Showcase
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: 'var(--text)' }}>
            Entdecken Sie, wie Neumorphism in verschiedenen UI-Kontexten eingesetzt werden kann
          </p>
        </div>

        {/* Variant Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            {variants.map((variant) => (
              <button
                key={variant.class}
                onClick={() => setSelectedVariant(variant.class)}
                className={`neumorph-button px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedVariant === variant.class ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex justify-center space-x-4">
            {[
              { id: 'cards', label: 'Cards & Components' },
              { id: 'forms', label: 'Forms & Inputs' },
              { id: 'navigation', label: 'Navigation' },
              { id: 'data', label: 'Data Display' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`neumorph-button px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id ? 'scale-105' : 'hover:scale-102'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Showcase Items */}
          <div className="space-y-6">
            {showcaseItems.map((item, index) => (
              <div key={index} className="card p-6 neumorph-hover">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text)' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm opacity-80" style={{ color: 'var(--text)' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Interactive Demo */}
          <div className="space-y-6">
            {activeTab === 'cards' && (
              <>
                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                    KPI Card
                  </h3>
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--accent)' }}>
                    2,847
                  </div>
                  <p className="text-sm opacity-80" style={{ color: 'var(--text)' }}>
                    +12.5% from last month
                  </p>
                </div>

                <div className="card p-6">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
                    Progress Overview
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm" style={{ color: 'var(--text)' }}>Task Completion</span>
                        <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>75%</span>
                      </div>
                      <div className="neumorph-progress h-3">
                        <div 
                          className="neumorph-progress-fill h-full"
                          style={{ width: '75%' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm" style={{ color: 'var(--text)' }}>Project Progress</span>
                        <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>60%</span>
                      </div>
                      <div className="neumorph-progress h-3">
                        <div 
                          className="neumorph-progress-fill h-full"
                          style={{ width: '60%' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'forms' && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text)' }}>
                  Contact Form
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Name
                    </label>
                    <input
                      type="text"
                      className="neumorph-input w-full"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      className="neumorph-input w-full"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
                      Message
                    </label>
                    <textarea
                      className="neumorph-input w-full h-24 resize-none"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button className="neumorph-button w-full">
                    Send Message
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'navigation' && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text)' }}>
                  Navigation Menu
                </h3>
                <div className="space-y-3">
                  {['Dashboard', 'Projects', 'Analytics', 'Settings', 'Profile'].map((item, index) => (
                    <button
                      key={index}
                      className={`neumorph-button w-full text-left ${
                        index === 0 ? 'scale-105' : ''
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="card p-6">
                <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--text)' }}>
                  Data Table
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Project Alpha', status: 'Active', progress: '85%' },
                    { name: 'Project Beta', status: 'Pending', progress: '45%' },
                    { name: 'Project Gamma', status: 'Completed', progress: '100%' }
                  ].map((row, index) => (
                    <div key={index} className="neumorph-button w-full text-left flex justify-between items-center">
                      <span>{row.name}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm opacity-80">{row.progress}</span>
                        <span 
                          className="text-xs px-2 py-1 rounded-full"
                          style={{ 
                            backgroundColor: row.status === 'Active' ? 'var(--accent)' : 
                                         row.status === 'Completed' ? '#22c55e' : '#fbbf24',
                            color: '#ffffff'
                          }}
                        >
                          {row.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="card p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text)' }}>
              Neumorphism Best Practices
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm opacity-80" style={{ color: 'var(--text)' }}>
              <div>
                <h4 className="font-semibold mb-2">✅ Do's</h4>
                <ul className="space-y-1">
                  <li>• Verwenden Sie subtile Schatten</li>
                  <li>• Halten Sie Kontraste niedrig</li>
                  <li>• Nutzen Sie sanfte Übergänge</li>
                  <li>• Testen Sie auf verschiedenen Geräten</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">❌ Don'ts</h4>
                <ul className="space-y-1">
                  <li>• Vermeiden Sie zu starke Schatten</li>
                  <li>• Keine zu vielen Elemente</li>
                  <li>• Nicht zu kleine Schrift</li>
                  <li>• Keine zu komplexen Formen</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 