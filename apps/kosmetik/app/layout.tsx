'use client';

import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(typeof window !== 'undefined' && window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.body.classList.remove('dark', 'light');
      document.body.classList.add(theme);
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <html lang="de">
      <head>
        <title>Zaira Beauty - Demo Beauty Studio</title>
        <meta name="description" content="Demo Beauty-Studio Website - Dies ist ein Beispielprojekt für Beauty-Websites" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Zaira Beauty - Demo Beauty Studio" />
        <meta property="og:description" content="Demo Beauty-Studio Website - Dies ist ein Beispielprojekt für Beauty-Websites" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/logo1.webp" />
        <link rel="icon" href="/images/logo1.webp" />
      </head>
      <body className={`font-sans min-h-screen flex ${theme}`}>
        {/* Demo Banner */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-3 px-4 shadow-lg fixed top-0 left-0 right-0 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
            <span className="text-lg">🎨</span>
            <p className="text-sm font-medium">
              <strong>Demo-Projekt:</strong> Dies ist ein Beispiel für eine Beauty-Studio Website. 
              Kein echtes Studio - nur zur Demonstration meiner Webentwicklungs-Fähigkeiten.
            </p>
            <span className="text-lg">💻</span>
          </div>
        </div>
        
        {/* Dark/Light-Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed top-20 right-6 z-50 bg-black/60 dark:bg-white/80 text-white dark:text-black rounded-full p-3 shadow-lg border border-white-200 hover:scale-110 transition-all duration-300"
          aria-label="Theme wechseln"
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
        
        {/* Sidebar Navigation */}
        <nav className="hidden md:flex flex-col justify-between items-center w-48 min-h-screen border-r border-white-200 py-10 px-4 fixed left-0 top-16 z-40 bg-black">
          <div className="flex flex-col items-center gap-8 w-full">
            <Link href="/" className="text-2xl font-serif font-bold tracking-widest mb-12 text-white hover:text-pink-300 transition">
              <img src="/images/logo1.webp" alt="Zaira Beauty Logo" className="h-12 w-auto mb-6" />
            </Link>
            <div className="flex flex-col gap-6 w-full">
              <NavLink href="#about">ABOUT US</NavLink>
              <NavLink href="#reviews">REVIEWS</NavLink>
              <NavLink href="#gallery">GALLERY</NavLink>
              <NavLink href="#services">SERVICES</NavLink>
              <NavLink href="#deals">DEALS</NavLink>
              <NavLink href="#contact">CONTACTS</NavLink>
            </div>
          </div>
        </nav>
        
        {/* Mobile Topbar */}
        <nav className="md:hidden flex items-center justify-between w-full px-6 py-4 border-b border-white-200 bg-black fixed top-16 left-0 z-50">
          <Link href="/" className="text-xl font-serif font-bold tracking-widest text-white">
            <img src="/images/logo1.webp" alt="Zaira Beauty Logo" className="h-10 w-auto" />
          </Link>
          
          {/* Burger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </nav>
        
        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 bg-black/90 z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-serif font-bold tracking-widest text-white mb-4">ZAIRA BEAUTY</h2>
              <p className="text-neutral-300">Exklusive Beauty-Behandlungen</p>
            </div>
            
            <div className="flex flex-col items-center space-y-6">
              <MobileNavLink href="#about" onClick={() => setIsMobileMenuOpen(false)}>ABOUT US</MobileNavLink>
              <MobileNavLink href="#reviews" onClick={() => setIsMobileMenuOpen(false)}>REVIEWS</MobileNavLink>
              <MobileNavLink href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>GALLERY</MobileNavLink>
              <MobileNavLink href="#services" onClick={() => setIsMobileMenuOpen(false)}>SERVICES</MobileNavLink>
              <MobileNavLink href="#deals" onClick={() => setIsMobileMenuOpen(false)}>DEALS</MobileNavLink>
              <MobileNavLink href="#contact" onClick={() => setIsMobileMenuOpen(false)}>CONTACTS</MobileNavLink>
            </div>
            
            <div className="mt-12">
              <a 
                href="#contact" 
                className="ghost-btn inline-block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Termin buchen
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 md:ml-48 w-full min-h-screen pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="block py-2 px-4 border-l-2 border-transparent hover:border-pink-300 hover:text-pink-300 transition font-medium tracking-wide text-white text-base"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block py-3 px-6 text-xl font-medium tracking-wide text-white hover:text-pink-300 transition border-b border-white-300 hover:border-pink-300/30"
    >
      {children}
    </a>
  );
} 