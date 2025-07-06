"use client";

import { useState } from 'react';

export default function Kontakt() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', project: '', budget: '', message: '' });
      } else {
        console.error('API-Fehler:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Netzwerk-Fehler:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-cyan-400">Projekt anfragen</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Bereit für Ihr nächstes Projekt? Lassen Sie uns gemeinsam etwas Großartiges schaffen.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Kontaktformular */}
        <div className="neumorph-card p-8">
          <h2 className="text-2xl font-bold mb-6 text-cyan-400">Kontaktformular</h2>
          
          {submitStatus === 'success' && (
            <div className="mb-6 p-4 bg-green-900/50 border border-green-400 rounded-lg text-green-300">
              ✓ Nachricht erfolgreich gesendet! Ich melde mich innerhalb von 24 Stunden.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-400 rounded-lg text-red-300">
              ✗ Fehler beim Senden. Bitte versuchen Sie es erneut oder kontaktieren Sie mich direkt.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cyan-300 mb-2 font-medium">Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="neumorph-input w-full px-4 py-3" 
                  placeholder="Ihr Name" 
                />
              </div>
              <div>
                <label className="block text-cyan-300 mb-2 font-medium">E-Mail *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="neumorph-input w-full px-4 py-3" 
                  placeholder="ihre@email.de" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-cyan-300 mb-2 font-medium">Unternehmen</label>
              <input 
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="neumorph-input w-full px-4 py-3" 
                placeholder="Ihr Unternehmen (optional)" 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cyan-300 mb-2 font-medium">Projekttyp</label>
                <select 
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                  className="neumorph-input w-full px-4 py-3"
                >
                  <option value="">Bitte wählen</option>
                  <option value="website">Website / Landingpage</option>
                  <option value="webapp">Web-Anwendung</option>
                  <option value="design">UI/UX Design</option>
                  <option value="branding">Branding / Logo</option>
                  <option value="consulting">Beratung</option>
                  <option value="other">Sonstiges</option>
                </select>
              </div>
              <div>
                <label className="block text-cyan-300 mb-2 font-medium">Budget-Rahmen</label>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="neumorph-input w-full px-4 py-3"
                >
                  <option value="">Bitte wählen</option>
                  <option value="500-1000">500€ - 1.000€</option>
                  <option value="1000-2500">1.000€ - 2.500€</option>
                  <option value="2500-5000">2.500€ - 5.000€</option>
                  <option value="5000+">5.000€+</option>
                  <option value="discuss">Offen für Diskussion</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-cyan-300 mb-2 font-medium">Projektbeschreibung *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="neumorph-input w-full px-4 py-3 min-h-[120px]" 
                placeholder="Beschreiben Sie Ihr Projekt, Ziele und Anforderungen..." 
              />
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="neumorph-button-primary w-full px-6 py-3 font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Wird gesendet...' : 'Projekt anfragen'}
            </button>
          </form>
        </div>

        {/* Kontaktinformationen */}
        <div className="space-y-6">
          <div className="neumorph-card p-8">
            <h2 className="text-2xl font-bold mb-6 text-cyan-400">Direkter Kontakt</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">E-Mail</div>
                              <a href="mailto:brandwerkx@gmail.com" className="text-cyan-400 hover:text-cyan-300">
              brandwerkx@gmail.com
            </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-400/20 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">GitHub</div>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">
                    github.com/yourusername
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="neumorph-card p-8">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Antwortzeit</h3>
            <p className="text-gray-300 mb-4">
              Ich antworte normalerweise innerhalb von 24 Stunden auf alle Anfragen.
            </p>
            <div className="text-sm text-gray-400">
              <div>✓ Mo-Fr: 9:00 - 18:00 Uhr</div>
              <div>✓ Wochenende: Nach Vereinbarung</div>
            </div>
          </div>

          <div className="neumorph-card p-8">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">Nächste Schritte</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Kontaktanfrage besprechen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>Projektanforderungen definieren</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">3.</span>
                <span>Angebot und Zeitplan erstellen</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">4.</span>
                <span>Projektstart vereinbaren</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 