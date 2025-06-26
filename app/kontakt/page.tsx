export default function Kontakt() {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="bg-black p-8 rounded-xl shadow-lg border border-[#23232a]">
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Kontakt</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Lassen Sie uns sprechen</h2>
            <p className="text-gray-400 mb-6">
              Ich freue mich darauf, von Ihnen zu hören! Ob Sie ein Projekt besprechen möchten, 
              Fragen zu meiner Arbeit haben oder einfach nur Hallo sagen wollen – ich bin für Sie da.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-400/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M0 3v18h24V3H0zm21.518 2L12 12.713 2.482 5h19.036zM2 19V7.183l10 8.104 10-8.104V19H2z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">E-Mail</p>
                  <p className="text-gray-400">deine@email.de</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-400/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">GitHub</p>
                  <p className="text-gray-400">github.com/username</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-400/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold">LinkedIn</p>
                  <p className="text-gray-400">linkedin.com/in/username</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-cyan-400/10 rounded-lg border border-cyan-400/20">
              <h3 className="text-cyan-400 font-semibold mb-2">Verfügbarkeit</h3>
              <p className="text-gray-400 text-sm">
                Ich bin derzeit für neue Projekte verfügbar und freue mich auf spannende Herausforderungen!
              </p>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Nachricht senden</h2>
            <form className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-300">Name *</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition" 
                  placeholder="Ihr Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-300">E-Mail *</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition" 
                  placeholder="ihre@email.de"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block mb-2 text-sm font-semibold text-gray-300">Betreff</label>
                <input 
                  id="subject" 
                  name="subject" 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition" 
                  placeholder="Projektanfrage, Frage, etc."
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-semibold text-gray-300">Nachricht *</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-[#23232a] text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition resize-none" 
                  placeholder="Erzählen Sie mir von Ihrem Projekt..."
                />
              </div>
              
              <button 
                type="submit" 
                className="mt-2 bg-cyan-400 text-black font-bold py-3 px-6 rounded-lg transition hover:bg-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#18181b]"
              >
                Nachricht senden
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 