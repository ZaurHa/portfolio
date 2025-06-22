'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Über mich', href: '/#about' },
  { name: 'Leistungen', href: '/#services' },
  { name: 'Preise', href: '/#pricing' },
]

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('Home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sectionElements = navLinks
        .map(link => {
            const id = link.href.split('/#')[1];
            if (!id) return null;
            return document.getElementById(id);
        })
        .filter((el): el is HTMLElement => el !== null);
      
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        sectionElements.push(contactElement);
      }

      let maxVisibleHeight = 0;
      let currentSectionId = 'home';

      if (window.scrollY < window.innerHeight / 2) {
        currentSectionId = 'home';
      } else {
        sectionElements.forEach(section => {
          const rect = section.getBoundingClientRect();
          const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

          if (visibleHeight > maxVisibleHeight) {
            maxVisibleHeight = visibleHeight;
            currentSectionId = section.id;
          }
        });
      }

      const navLink = navLinks.find(link => link.href.endsWith(currentSectionId));
      if (navLink) {
        setActiveLink(navLink.name);
      } else if (currentSectionId === 'contact') {
        setActiveLink('Kontakt');
      }
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const menuVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  }

  const navLinkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        ease: 'easeOut'
      }
    })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isOpen ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 relative w-[280px] md:w-[460px] h-[115px]" onClick={() => setIsOpen(false)}>
              <Image
                src="/images/logo.webp"
                alt="Zaira Beauty Logo"
                fill
                className="object-contain"
                sizes="460px"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.href} className={`text-neutral-300 hover:text-white transition-colors font-medium ${activeLink === link.name ? 'text-primary-400' : ''}`}>
                  {link.name}
                </Link>
              ))}
              <Link href="/#contact" className={`btn-primary-small ${activeLink === 'Kontakt' ? 'bg-primary-500 text-white' : ''}`}>
                Kontakt
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white z-50 relative">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-black/95 z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full">
              <nav className="flex flex-col items-center space-y-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    custom={i}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      className={`text-4xl font-light text-neutral-200 hover:text-white ${activeLink === link.name ? 'text-primary-400' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                    custom={navLinks.length}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Link href="/#contact" className={`btn-primary mt-8 ${activeLink === 'Kontakt' ? 'bg-primary-500 text-white' : ''}`} onClick={() => setIsOpen(false)}>
                        Kontakt & Anfrage
                    </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header 