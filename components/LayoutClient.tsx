'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from './Footer';

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projekte", label: "Projekte" },
  { href: "/ueber-mich", label: "Über mich" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-12 h-20 neumorph-card z-50" style={{ borderRadius: 16, background: 'var(--neumorph-card)', boxShadow: '8px 8px 24px var(--neumorph-shadow-dark), -8px -8px 24px var(--neumorph-shadow-light)' }}>
        <div className="flex items-center gap-4 md:gap-6">
          <img src="/images/brandwerkxweiss.webp" alt="Logo" style={{ width: 200, height: 200, objectFit: 'contain', display: 'block' }} />
        </div>
        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-4 text-lg items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="neumorph-button px-6 py-2 font-semibold">
              {link.label}
            </Link>
          ))}
        </div>
        {/* Hamburger Icon */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 neumorph-button"
          aria-label="Menü öffnen"
          onClick={() => setMobileOpen(true)}
        >
          <span className="block w-6 h-0.5 bg-[#b0b0b0] mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-[#b0b0b0] mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-[#b0b0b0] rounded"></span>
        </button>
        {/* Mobile Overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
            <div className="neumorph-card p-8 flex flex-col gap-6 items-center" style={{ borderRadius: 16, minWidth: 220, boxShadow: '8px 8px 24px var(--neumorph-shadow-dark), -8px -8px 24px var(--neumorph-shadow-light)' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="neumorph-button w-full text-center text-lg py-3 font-semibold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                className="neumorph-button w-full mt-4 text-[#e0e6f0]"
                onClick={() => setMobileOpen(false)}
                aria-label="Menü schließen"
              >
                Schließen
              </button>
            </div>
          </div>
        )}
      </nav>
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
} 