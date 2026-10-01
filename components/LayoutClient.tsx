'use client';
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from 'next/navigation';
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
  // Landingpages unter /de/webdesign gibt es nur auf Deutsch → Startseite der Zielsprache
  if (pathname.startsWith(`/${currentLang}/webdesign`)) return `/${targetLang}`;
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
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const otherLang = getOtherLang(lang);
  const otherLangPath = switchLangPath(pathname ?? `/${lang}`, lang, otherLang);

  const navLinks = [
    { href: `/${lang}`, text: dict.nav.home },
    { href: `/${lang}/leistungen`, text: dict.nav.services },
    { href: '/muster', text: 'Designs' },
    { href: `/${lang}/projekte`, text: dict.nav.projects },
    { href: `/${lang}/ueber-mich`, text: dict.nav.about },
    { href: `/${lang}/kontakt`, text: dict.nav.contact },
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

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;
      if (burgerRef.current?.contains(target)) return;
      if (menuRef.current && !menuRef.current.contains(target)) {
        setIsMenuOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        burgerRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    // Fokus ins Menü setzen
    menuRef.current?.querySelector<HTMLElement>('a')?.focus();
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Geschlossenes Menü inert setzen (nicht fokussierbar, für Screenreader verborgen)
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (isMenuOpen) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [isMenuOpen]);

  function isActive(href: string) {
    if (href === `/${lang}`) return pathname === `/${lang}`;
    if (href === '/muster') return pathname?.startsWith('/muster') ?? false;
    return pathname?.startsWith(href) ?? false;
  }

  const year = new Date().getFullYear();

  return (
    <div className="site-shell min-h-screen">
      <a href="#main" className="v3-skip">{lang === 'de' ? 'Zum Inhalt springen' : 'Skip to content'}</a>
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <header className={`v3-nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="v3-wrap v3-nav-row">
          <Link href={`/${lang}`} className="v3-logo" aria-label="BrandWerkX">
            <span className="logo-b">B</span>
            {"randWerk".split("").map((ch, i) => (
              <span key={i} className="logo-ch" style={{ animationDelay: `${0.42 + i * 0.055}s` }}>{ch}</span>
            ))}
            <span className="logo-x">X</span>
          </Link>

          <nav aria-label={lang === 'de' ? 'Hauptnavigation' : 'Main navigation'} className="v3-nav-links">
            {navLinks.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'is-active' : undefined}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.text}
              </Link>
            ))}
          </nav>

          <div className="v3-nav-right">
            <Link href={otherLangPath} className="v3-lang" title={otherLang === 'en' ? 'Switch to English' : 'Auf Deutsch wechseln'}>
              {otherLang.toUpperCase()}
            </Link>
            <Link href={`/${lang}/kontakt`} className="v3-btn v3-btn-accent v3-nav-cta">
              {dict.nav.cta} <span className="arr" aria-hidden="true">→</span>
            </Link>
            <button
              ref={burgerRef}
              aria-controls="site-menu"
              className="v3-burger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? (lang === 'de' ? 'Menü schließen' : 'Close menu') : (lang === 'de' ? 'Menü öffnen' : 'Open menu')}
              aria-expanded={isMenuOpen}
            >
              <span /><span />
            </button>
          </div>
        </div>

        <div
          ref={menuRef}
          id="site-menu"
          className={`v3-menu${isMenuOpen ? ' is-open' : ''}`}
        >
          <div className="v3-wrap">
            {navLinks.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className={isActive(item.href) ? 'is-active' : undefined}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="v3-mono">{String(i + 1).padStart(2, '0')}</span>{item.text}
              </Link>
            ))}
            <div className="v3-menu-foot">
              <a href="tel:+491728471641" className="v3-btn v3-btn-accent">0172 8471641</a>
              <Link href={otherLangPath} className="v3-btn v3-btn-ghost">{otherLang.toUpperCase()}</Link>
            </div>
          </div>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        {children}
      </main>

      {/* WhatsApp */}
      <a
        href="https://wa.me/491728471641?text=Hallo%20Zaur%2C%20ich%20interessiere%20mich%20f%C3%BCr%20eine%20Website."
        target="_blank"
        rel="noopener noreferrer"
        aria-label={lang === 'de' ? 'WhatsApp schreiben' : 'Message on WhatsApp'}
        className="v3-wa"
      >
        <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.466.661 4.876 1.917 6.992L2 30l7.244-1.889A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm0 25.5a11.44 11.44 0 01-5.84-1.604l-.418-.25-4.3 1.12 1.15-4.18-.274-.43A11.46 11.46 0 014.5 16C4.5 9.596 9.596 4.5 16 4.5S27.5 9.596 27.5 16 22.404 27.5 16 27.5zm6.29-8.61c-.344-.172-2.035-1.003-2.35-1.118-.315-.115-.544-.172-.773.172-.229.344-.886 1.118-1.087 1.347-.2.229-.4.258-.744.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.713-2.037-1.913-2.381-.2-.344-.021-.53.15-.7.155-.154.344-.4.516-.6.172-.2.229-.344.344-.573.115-.229.057-.43-.029-.6-.086-.172-.773-1.864-1.059-2.552-.278-.668-.562-.578-.773-.588l-.658-.011c-.229 0-.6.086-.915.43-.315.344-1.2 1.175-1.2 2.867s1.228 3.326 1.4 3.555c.172.229 2.416 3.69 5.853 5.175.818.353 1.456.564 1.952.721.821.261 1.568.224 2.159.136.659-.099 2.035-.831 2.322-1.634.287-.803.287-1.491.2-1.634-.086-.143-.315-.229-.659-.4z"/>
        </svg>
      </a>

      <footer className="v3-footer">
        <div className="v3-wrap">
          <div className="v3-foot">
            <div>
              <span className="v3-foot-logo">BrandWerk<span>X</span></span>
              <p>
                {lang === 'de'
                  ? 'Websites für Handwerker, Selbstständige und kleine Betriebe. Festpreis ab 490 €.'
                  : 'Websites for tradespeople, freelancers and small businesses. Fixed price from €490.'}
              </p>
            </div>
            <div>
              <p className="v3-foot-h">{lang === 'de' ? 'Seiten' : 'Pages'}</p>
              <ul>
                {navLinks.map((item) => (
                  <li key={item.href}><Link href={item.href}>{item.text}</Link></li>
                ))}
                {lang === 'de' && <li><Link href="/de/webdesign">Webdesign-Themen</Link></li>}
              </ul>
            </div>
            <div>
              <p className="v3-foot-h">{dict.footer.contact}</p>
              <ul>
                <li><a href="tel:+491728471641">0172 8471641</a></li>
                <li><a href="mailto:brandwerkx@gmail.com">brandwerkx@gmail.com</a></li>
                <li><a href="https://wa.me/491728471641" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
                <li><a href="https://www.linkedin.com/in/zaur-hatuev-8559b91a1/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
            <div>
              <p className="v3-foot-h">{lang === 'de' ? 'Standort' : 'Location'}</p>
              <ul>
                {lang === 'de' ? (
                  <>
                    <li><Link href="/de/webdesign/geretsried">Webdesign Geretsried</Link></li>
                    <li><Link href="/de/webdesign/oberland">Wolfratshausen &amp; Bad Tölz</Link></li>
                    <li><Link href="/de/webdesign/muenchen">Webdesign München</Link></li>
                  </>
                ) : (
                  <>
                    <li>Geretsried</li>
                    <li>Munich &amp; Oberland</li>
                  </>
                )}
                <li><Link href={`/${lang}/impressum`}>{dict.footer.impressum}</Link></li>
                <li><Link href={`/${lang}/datenschutz`}>{dict.footer.datenschutz}</Link></li>
              </ul>
            </div>
          </div>
          <div className="v3-copy v3-mono">
            <span>© {year} BrandWerkX · Zaur Hatuev</span>
            <span>{lang === 'de' ? 'Gebaut in Geretsried' : 'Built in Geretsried'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
