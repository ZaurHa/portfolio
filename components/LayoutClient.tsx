'use client';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Footer from './Footer';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projekte", label: "Projekte" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <img 
                src="/images/brandwerkxweiss.webp" 
                alt="BrandWerkX" 
                className="h-8 w-auto"
              />
              <span className="text-white font-bold text-lg hidden sm:block">BrandWerkX</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href 
                      ? 'text-cyan-400' 
                      : 'text-gray-300 hover:text-cyan-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link 
                href="/kontakt" 
                className="neumorph-button-primary px-4 py-2 text-sm font-medium"
              >
                Projekt anfragen
              </Link>
            </div>

            <button
              className="nav-toggle md:hidden p-2 text-gray-300 hover:text-cyan-400 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu öffnen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className={`nav-menu md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="py-4 space-y-2 border-t border-gray-800">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === item.href 
                      ? 'text-cyan-400 bg-cyan-400/10' 
                      : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Link 
                  href="/kontakt" 
                  className="neumorph-button-primary w-full text-center px-4 py-2 text-sm font-medium block"
                >
                  Projekt anfragen
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <Footer />
    </div>
  );
} 