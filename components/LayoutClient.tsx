'use client';
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from 'next/navigation';
import type { Dictionary, Locale } from '../lib/i18n';

type Props = {
  children: React.ReactNode;
  lang: Locale;
  dict: Dictionary;
};

function getOtherLang(lang: Locale): Locale {
  return lang === 'de' ? 'en' : 'de';
}

function switchLangPath(pathname: string, currentLang: Locale, targetLang: Locale): string {
  // /de/projekte → /en/projekte
  if (pathname.startsWith(`/${currentLang}/`)) {
    return `/${targetLang}/${pathname.slice(currentLang.length + 2)}`;
  }
  if (pathname === `/${currentLang}`) {
    return `/${targetLang}`;
  }
  return `/${targetLang}`;
}

export default function LayoutClient({ children, lang, dict }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const otherLang = getOtherLang(lang);
  const otherLangPath = switchLangPath(pathname ?? `/${lang}`, lang, otherLang);

  const navLinks = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/leistungen`, label: dict.nav.services },
    { href: '/muster', label: (<> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-2px', marginRight: 5 }}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>Designs</>), highlight: true },
    { href: `/${lang}/projekte`, label: dict.nav.projects },
    { href: `/${lang}/ueber-mich`, label: dict.nav.about },
    { href: `/${lang}/kontakt`, label: dict.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll-Progress-Linie: direkte Style-Mutation via rAF, kein Re-Render pro Scroll
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Spotlight + 3D-Tilt: Cursor-Position als CSS-Variablen auf der berührten Karte
  useEffect(() => {
    const SELECTOR = '.project-card, .skill-card, .testimonial-card, .pricing-card';
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(SELECTOR) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
      if (e.pointerType === 'mouse' && el.classList.contains('project-card')) {
        const relX = (e.clientX - r.left) / r.width - 0.5;
        const relY = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--ry', `${(relX * 7).toFixed(2)}deg`);
        el.style.setProperty('--rx', `${(-relY * 5).toFixed(2)}deg`);
      }
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.('.project-card') as HTMLElement | null;
      if (el && !el.contains(e.relatedTarget as Node | null)) {
        el.style.removeProperty('--rx');
        el.style.removeProperty('--ry');
      }
    };
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerout', onOut);
    };
  }, []);

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

  function isActive(href: string) {
    if (href === `/${lang}`) return pathname === `/${lang}`;
    if (href === '/muster') return pathname?.startsWith('/muster') ?? false;
    return pathname?.startsWith(href) ?? false;
  }

  return (
    <div className="site-shell min-h-screen bg-black">
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.95)' : 'rgba(0,0,0,0)',
          borderBottom: scrolled ? '1px solid #1a1a1a' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href={`/${lang}`} className="flex items-center" aria-label="BrandWerkX">
              <span style={{ display: 'inline-flex', alignItems: 'baseline', fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.03em', color: '#fff', lineHeight: 1 }}>
                <motion.span
                  initial={{ opacity: 0, scale: 0.4, y: 2 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block' }}
                >B</motion.span>
                {"randWerk".split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -7, filter: 'blur(3px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 0.32, ease: 'easeOut', delay: 0.42 + i * 0.055 }}
                    style={{ display: 'inline-block' }}
                  >{ch}</motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0, rotate: -35 }}
                  animate={{ opacity: 1, scale: [0, 1.25, 0.94, 1], rotate: [-35, 10, -2, 0] }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.95 }}
                  style={{ display: 'inline-block', color: '#00ffe7' }}
                >X</motion.span>
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((item) => (
                item.highlight ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-semibold transition-colors px-3 py-1 rounded-full border ${
                      isActive(item.href)
                        ? 'border-[#00ffe7] text-[#00ffe7] bg-[#00ffe7]/10'
                        : 'border-[#00ffe7]/40 text-[#00ffe7] hover:border-[#00ffe7] hover:bg-[#00ffe7]/10'
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-[#00ffe7]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}

              {/* Lang Toggle */}
              <Link
                href={otherLangPath}
                className="text-xs font-semibold px-2.5 py-1 rounded border border-[#333] text-gray-400 hover:text-[#00ffe7] hover:border-[#00ffe7] transition-colors tracking-wider"
                title={otherLang === 'en' ? 'Switch to English' : 'Auf Deutsch wechseln'}
              >
                {otherLang.toUpperCase()}
              </Link>

              <Link href={`/${lang}/kontakt`} className="cta-btn-primary" style={{ padding: '0.45em 1.2em', fontSize: '0.875rem' }}>
                {dict.nav.cta}
              </Link>
            </div>

            <button
              className="md:hidden p-2.5 text-gray-400 hover:text-white transition-colors"
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

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`md:hidden overflow-hidden overflow-y-auto transition-all duration-300 ${isMenuOpen ? 'max-h-[85vh]' : 'max-h-0'}`}
            style={{ background: '#0a0a0a' }}
          >
            <div className="py-4 space-y-1 border-t border-[#1a1a1a]">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    item.highlight
                      ? isActive(item.href)
                        ? 'text-[#00ffe7] bg-[#00ffe7]/10 font-semibold'
                        : 'text-[#00ffe7] hover:bg-[#00ffe7]/10 font-semibold'
                      : isActive(item.href)
                        ? 'text-[#00ffe7] bg-[#00ffe7]/8'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 pt-1 flex items-center gap-2">
                <Link
                  href={otherLangPath}
                  className="text-xs font-semibold px-3 py-2 rounded border border-[#333] text-gray-400 hover:text-[#00ffe7] hover:border-[#00ffe7] transition-colors tracking-wider"
                >
                  {otherLang.toUpperCase()}
                </Link>
              </div>
              <div className="px-4 pt-2">
                <Link href={`/${lang}/kontakt`} className="cta-btn-primary w-full justify-center">
                  {dict.nav.cta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        {children}
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/491728471641?text=Hallo%20Zaur%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Website."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp schreiben"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 999,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 28px rgba(37,211,102,0.6)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)';
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.466.661 4.876 1.917 6.992L2 30l7.244-1.889A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.84-1.604l-.418-.25-4.3 1.12 1.15-4.18-.274-.43A11.46 11.46 0 014.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.344-.172-2.035-1.003-2.35-1.118-.315-.115-.544-.172-.773.172-.229.344-.886 1.118-1.087 1.347-.2.229-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.713-2.037-1.913-2.381-.2-.344-.021-.53.15-.7.155-.154.344-.4.516-.6.172-.2.229-.344.344-.573.115-.229.057-.43-.029-.6-.086-.172-.773-1.864-1.059-2.552-.278-.668-.562-.578-.773-.588l-.658-.011c-.229 0-.6.086-.915.43-.315.344-1.2 1.175-1.2 2.867s1.228 3.326 1.4 3.555c.172.229 2.416 3.69 5.853 5.175.818.353 1.456.564 1.952.721.821.261 1.568.224 2.159.136.659-.099 2.035-.831 2.322-1.634.287-.803.287-1.491.2-1.634-.086-.143-.315-.229-.659-.4z"/>
        </svg>
      </a>

      <footer className="footer-shell">
        <div className="footer-glowline" />
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <Image src="/images/brandwerkxweiss.webp" alt="BrandWerkX" width={150} height={30} style={{ height: 30, width: 'auto' }} />
            <p className="footer-brand-tagline">
              {lang === 'de'
                ? 'Websites mit Substanz und Wirkung — Design, Entwicklung und SEO aus einer Hand.'
                : 'Websites with substance and impact — design, development and SEO from one hand.'}
            </p>
            <span className="footer-brand-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Geretsried · München &amp; Oberland
            </span>
          </div>

          {/* Navigation */}
          <div>
            <div className="footer-col-title">{lang === 'de' ? 'Navigation' : 'Navigate'}</div>
            <div className="footer-links">
              <Link href={`/${lang}`} className="footer-link">{dict.nav.home}</Link>
              <Link href={`/${lang}/leistungen`} className="footer-link">{dict.nav.services}</Link>
              <Link href="/muster" className="footer-link">Designs</Link>
              <Link href={`/${lang}/projekte`} className="footer-link">{dict.nav.projects}</Link>
              <Link href={`/${lang}/ueber-mich`} className="footer-link">{dict.nav.about}</Link>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <div className="footer-col-title">{dict.footer.contact}</div>
            <div className="footer-links">
              <Link href={`/${lang}/kontakt`} className="footer-link">
                {lang === 'de' ? 'Projekt anfragen' : 'Start a project'}
              </Link>
              <a href="mailto:brandwerkx@gmail.com" className="footer-link">brandwerkx@gmail.com</a>
              <a
                href="https://wa.me/491728471641?text=Hallo%20Zaur%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Website."
                target="_blank" rel="noopener noreferrer" className="footer-link"
              >
                WhatsApp
              </a>
              <a
                href="https://www.linkedin.com/in/zaur-hatuev"
                target="_blank" rel="noopener noreferrer" className="footer-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} BrandWerkX. {dict.footer.rights}
            {' · '}
            <Link href={`/${lang}/impressum`} className="footer-link" style={{ fontSize: 'inherit' }}>{dict.footer.impressum}</Link>
            {' · '}
            <Link href={`/${lang}/datenschutz`} className="footer-link" style={{ fontSize: 'inherit' }}>{dict.footer.datenschutz}</Link>
          </span>
          <span className="footer-bottom-made">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            {lang === 'de' ? 'Gebaut in Geretsried' : 'Built in Geretsried'}
          </span>
        </div>
      </footer>
    </div>
  );
}
