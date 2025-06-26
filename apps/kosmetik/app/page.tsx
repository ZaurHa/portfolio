'use client'

import React, { useEffect, useRef, useState } from 'react'
import { FaLeaf, FaRegSmile, FaMagic } from 'react-icons/fa'
import Image from 'next/image'

export default function Home() {
  const observerRefs = useRef<(HTMLElement | null)[]>([]);

  // Testimonials Carousel State
  const testimonials = [
    {
      name: 'Sarah M.',
      avatar: 'S',
      text: 'Die Lashlifting-Behandlung war fantastisch! Meine Wimpern sehen natürlich und wunderschön aus. Sehr professionell und entspannend.'
    },
    {
      name: 'Lisa K.',
      avatar: 'L',
      text: 'Endlich habe ich meine Akne-Probleme in den Griff bekommen. Die Behandlung war sanft und die Ergebnisse sind unglaublich!'
    },
    {
      name: 'Maria T.',
      avatar: 'M',
      text: 'Das Anti-Aging-Paket hat meine Haut verjüngt. Ich fühle mich 10 Jahre jünger! Sehr zu empfehlen.'
    }
  ];
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const nextTestimonial = () => setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addObserverRef = (el: HTMLElement | null) => {
    if (el && !observerRefs.current.includes(el)) {
      observerRefs.current.push(el);
    }
  };

  // Galerie-Slider State
  const galleryImages = [
    {
      src: '/images/work1.webp',
      title: 'Lashlifting & Browlifting',
      desc: 'Natürlich schöne Wimpern und Augenbrauen'
    },
    {
      src: '/images/work2.webp',
      title: 'Anti-Aging Behandlung',
      desc: 'Verjüngende Gesichtsbehandlungen'
    },
    {
      src: '/images/termin.webp',
      title: 'Unser Studio',
      desc: 'Moderne und luxuriöse Atmosphäre'
    },
    {
      src: '/images/über_mich.webp',
      title: 'Über uns',
      desc: 'Das Team hinter Zaira Beauty'
    }
  ];
  const [galleryIndex, setGalleryIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const nextGallery = () => setGalleryIndex((galleryIndex + 1) % galleryImages.length);
  const prevGallery = () => setGalleryIndex((galleryIndex - 1 + galleryImages.length) % galleryImages.length);

  // Scroll-to-Top-Button State
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center px-4 md:px-0 bg-black">
      {/* HERO SECTION */}
      <section className="w-full flex flex-col items-center justify-center min-h-screen pt-24 md:pt-0 text-center relative overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/termin.webp" 
            alt="Beauty Studio Background" 
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <img src="/images/logo1.webp" alt="Zaira Beauty Logo" className="w-40 h-40 md:w-56 md:h-56 mb-8 mt-4" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 tracking-tight leading-tight text-white animate-fade-in">
            Schönheit, die bleibt.<br />
            <span className="roségold-gradient">Dein Luxus-Kosmetikstudio für Haut, Wimpern & mehr</span>
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-neutral-200 max-w-3xl mx-auto mb-12 font-light animate-fade-in-delay">
            Exklusive Behandlungen in moderner, luxuriöser Atmosphäre. Schönheit, die du fühlst.
          </p>
          <a href="#about" className="ghost-btn btn-roségold inline-block mt-4 animate-fade-in-delay-2 hover:btn-roségold-animate">
            Mehr erfahren
          </a>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white-30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white-60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      {/* Wellen-Transition */}
      <div className="w-full overflow-hidden -mt-2" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="url(#wave-gradient)" />
          <defs>
            <linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e0aaff" />
              <stop offset="1" stopColor="#ffd6c0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ABOUT/USP SECTION */}
      <section id="about" className="w-full max-w-6xl mx-auto mt-40 mb-40 px-4">
        <div className="text-center mb-20 scroll-reveal" ref={addObserverRef}>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Über Zaira Beauty</h2>
          <p className="text-xl text-neutral-300 max-w-4xl mx-auto leading-relaxed">
            Willkommen bei <span className="text-pink-300 font-semibold">Zaira Beauty</span> – Ihr Studio für moderne, effektive und luxuriöse Beauty-Treatments. 
            Wir verbinden höchste Qualität mit persönlicher Beratung und Wohlfühlatmosphäre.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-10">
          <div className="card-outline bg-black p-10 text-center group hover:scale-102 transition-transform duration-100 hover:border-pink-300/50 scroll-reveal" ref={addObserverRef}>
            <div className="w-20 h-20 bg-pink-300/10 border border-pink-300/30 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">✨</span>
            </div>
            <h3 className="text-2xl font-serif mb-6">Premium Qualität</h3>
            <p className="text-neutral-300 leading-relaxed">Wir verwenden ausschließlich hochwertige Produkte und modernste Technologien für optimale Ergebnisse.</p>
          </div>
          
          <div className="card-outline bg-black p-10 text-center group hover:scale-102 transition-transform duration-100 hover:border-pink-300/50 scroll-reveal" ref={addObserverRef}>
            <div className="w-20 h-20 bg-pink-300/10 border border-pink-300/30 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">💎</span>
            </div>
            <h3 className="text-2xl font-serif mb-6">Persönliche Beratung</h3>
            <p className="text-neutral-300 leading-relaxed">Jede Behandlung wird individuell auf Ihre Bedürfnisse abgestimmt. Wir nehmen uns Zeit für Sie.</p>
          </div>
          
          <div className="card-outline bg-black p-10 text-center group hover:scale-102 transition-transform duration-100 hover:border-pink-300/50 scroll-reveal" ref={addObserverRef}>
            <div className="w-20 h-20 bg-pink-300/10 border border-pink-300/30 mx-auto mb-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🌟</span>
            </div>
            <h3 className="text-2xl font-serif mb-6">Luxuriöse Atmosphäre</h3>
            <p className="text-neutral-300 leading-relaxed">Entspannen Sie in unserem stilvollen Studio mit modernem Design und entspannender Musik.</p>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION (Carousel) */}
      <section id="reviews" className="w-full max-w-6xl mx-auto mb-40 px-4 scroll-reveal" ref={addObserverRef}>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 roségold-gradient">Das sagen unsere Kundinnen</h2>
          <p className="text-xl text-neutral-300">Echte Bewertungen von zufriedenen Kundinnen</p>
        </div>
        <div className="relative max-w-xl mx-auto">
          <div className="card-outline bg-black p-10 group glass-card flex flex-col items-center transition-transform duration-100">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-pink-300/20 rounded-full flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 text-2xl font-bold text-pink-300">
                {testimonials[testimonialIndex].avatar}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{testimonials[testimonialIndex].name}</h4>
                <div className="flex text-yellow-400 text-base">★★★★★</div>
              </div>
            </div>
            <p className="text-neutral-300 italic leading-relaxed text-center">"{testimonials[testimonialIndex].text}"</p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={prevTestimonial} className="ghost-btn btn-roségold px-4 py-2">‹</button>
            <button onClick={nextTestimonial} className="ghost-btn btn-roségold px-4 py-2">›</button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <span key={i} className={`w-3 h-3 rounded-full ${i === testimonialIndex ? 'bg-pink-300' : 'bg-white-20'}`}></span>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY SECTION (Slider) */}
      <section id="gallery" className="w-full max-w-6xl mx-auto mb-40 px-4 scroll-reveal" ref={addObserverRef} data-slider="true">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 roségold-gradient">Unsere Arbeit</h2>
          <p className="text-xl text-neutral-300">Beweise unserer Expertise</p>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="card-outline bg-black glass-card p-6 flex flex-col items-center transition-transform duration-100">
            <div className="relative w-full h-72 mb-6">
              <Image 
                src={galleryImages[galleryIndex].src}
                alt={galleryImages[galleryIndex].title}
                fill
                className="object-cover rounded-none"
                priority={galleryIndex === 0}
              />
            </div>
            <h4 className="font-serif text-xl mb-3 roségold-gradient">{galleryImages[galleryIndex].title}</h4>
            <p className="text-neutral-400">{galleryImages[galleryIndex].desc}</p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button onClick={prevGallery} className="ghost-btn btn-roségold px-4 py-2">‹</button>
            <button onClick={nextGallery} className="ghost-btn btn-roségold px-4 py-2">›</button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            {galleryImages.map((_, i) => (
              <span key={i} className={`w-3 h-3 rounded-full ${i === galleryIndex ? 'bg-pink-300' : 'bg-white-20'}`}></span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="w-full max-w-6xl mx-auto mb-40 px-4">
        <div className="text-center mb-20 scroll-reveal" ref={addObserverRef}>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Unsere Leistungen</h2>
          <p className="text-xl text-neutral-300">Professionelle Beauty-Treatments für jeden Bedarf</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="card-outline bg-black p-10 group hover:scale-102 transition-transform duration-100 hover:border-pink-300/50 scroll-reveal" ref={addObserverRef}>
            <h3 className="text-3xl font-serif mb-8 text-pink-300">Gesichtsbehandlungen</h3>
            <ul className="space-y-4 text-neutral-300">
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Anti-Aging Behandlungen</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Akne-Behandlung</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Pigmentflecken-Behandlung</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Clear Intimpeel</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">BB Glow Treatment</span>
              </li>
            </ul>
          </div>
          
          <div className="card-outline bg-black p-10 group hover:scale-102 transition-transform duration-100 hover:border-pink-300/50 scroll-reveal" ref={addObserverRef}>
            <h3 className="text-3xl font-serif mb-8 text-pink-300">Spezialbehandlungen</h3>
            <ul className="space-y-4 text-neutral-300">
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Lashlifting & Browlifting</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Dauerhafte Haarentfernung</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Schröpftherapie</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Dehnungsstreifen-Behandlung</span>
              </li>
              <li className="flex items-center group/item">
                <span className="w-3 h-3 bg-pink-300 mr-4 group-hover/item:scale-125 transition-transform duration-200"></span>
                <span className="text-lg">Zahnbleaching</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* DEALS SECTION */}
      <section id="deals" className="w-full max-w-4xl mx-auto mb-40 px-4">
        <div className="text-center mb-20 scroll-reveal" ref={addObserverRef}>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Aktuelle Angebote</h2>
          <p className="text-xl text-neutral-300">Sichern Sie sich unsere Specials</p>
        </div>
        
        <div className="space-y-10">
          <div className="card-outline bg-black p-10 border-pink-300/50 group hover:scale-102 transition-transform duration-100 hover:border-pink-300 scroll-reveal" ref={addObserverRef}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-serif text-pink-300">Neukunden-Rabatt</h3>
              <span className="bg-pink-300 text-black px-4 py-2 text-lg font-bold group-hover:scale-110 transition-transform duration-300">-20%</span>
            </div>
            <p className="text-neutral-300 mb-6 text-lg leading-relaxed">Erhalten Sie 20% Rabatt auf Ihre erste Behandlung bei uns!</p>
            <a href="#contact" className="ghost-btn inline-block hover:scale-105 transition-transform duration-300">Jetzt buchen</a>
          </div>
          
          <div className="card-outline bg-black p-10 border-pink-300/50 group hover:scale-102 transition-transform duration-100 hover:border-pink-300 scroll-reveal" ref={addObserverRef}>
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-serif text-pink-300">Paket-Angebot</h3>
              <span className="bg-pink-300 text-black px-4 py-2 text-lg font-bold group-hover:scale-110 transition-transform duration-300">-15%</span>
            </div>
            <p className="text-neutral-300 mb-6 text-lg leading-relaxed">Buchen Sie 3 Behandlungen und sparen Sie 15% auf das Gesamtpaket.</p>
            <a href="#contact" className="ghost-btn inline-block hover:scale-105 transition-transform duration-300">Mehr erfahren</a>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="w-full max-w-4xl mx-auto mb-40 px-4">
        <div className="text-center mb-20 scroll-reveal" ref={addObserverRef}>
          <h2 className="text-4xl md:text-5xl font-serif mb-8">Kontakt</h2>
          <p className="text-xl text-neutral-300">Vereinbaren Sie Ihren Termin</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="card-outline bg-black p-10 group hover:scale-102 transition-transform duration-100 hover:border-pink-300/50 scroll-reveal" ref={addObserverRef}>
            <h3 className="text-2xl font-serif mb-8 text-pink-300">Kontaktdaten</h3>
            <div className="space-y-6 text-neutral-300">
              <div className="flex items-center group/item">
                <span className="w-8 h-8 bg-pink-300/20 mr-6 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">📍</span>
                <div>
                  <p className="font-semibold text-lg">Adresse</p>
                  <p className="text-lg">Musterstraße 123<br />12345 Musterstadt</p>
                </div>
              </div>
              <div className="flex items-center group/item">
                <span className="w-8 h-8 bg-pink-300/20 mr-6 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">📞</span>
                <div>
                  <p className="font-semibold text-lg">Telefon</p>
                  <p className="text-lg">+49 123 456789</p>
                </div>
              </div>
              <div className="flex items-center group/item">
                <span className="w-8 h-8 bg-pink-300/20 mr-6 flex items-center justify-center group-hover/item:scale-110 transition-transform duration-300">✉️</span>
                <div>
                  <p className="font-semibold text-lg">E-Mail</p>
                  <p className="text-lg">info@zaira-beauty.de</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card-outline bg-black p-10 group hover:scale-102 transition-transform duration-100 hover:border-pink-300/50 scroll-reveal" ref={addObserverRef}>
            <h3 className="text-2xl font-serif mb-8 text-pink-300">Öffnungszeiten</h3>
            <div className="space-y-4 text-neutral-300 mb-8">
              <div className="flex justify-between text-lg">
                <span>Montag - Freitag</span>
                <span>09:00 - 19:00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Samstag</span>
                <span>10:00 - 16:00</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Sonntag</span>
                <span>Geschlossen</span>
              </div>
            </div>
            <a href="tel:+49123456789" className="ghost-btn w-full text-center block hover:scale-105 transition-transform duration-300">Jetzt anrufen</a>
          </div>
        </div>
        <div className="glass-card mt-12 overflow-hidden">
          <iframe
            title="Zaira Beauty Studio Standort"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2429.442964479836!2d13.404954!3d52.520006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e3b0b0b0b0%3A0x0!2sBerlin!5e0!3m2!1sde!2sde!4v1680000000000!5m2!1sde!2sde"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-72 border-0 rounded-none"
          ></iframe>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="team" className="w-full max-w-4xl mx-auto mb-40 px-4 scroll-reveal" ref={addObserverRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 roségold-gradient">Unser Team</h2>
          <p className="text-xl text-neutral-300 mb-10">Lerne die Menschen hinter Zaira Beauty kennen</p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="glass-card p-8 flex flex-col items-center w-full md:w-1/2">
            <img src="/images/logo1.webp" alt="Zaira" className="w-32 h-32 rounded-full mb-6 border-roségold" />
            <h3 className="text-2xl font-serif mb-2 roségold-gradient">Zaira</h3>
            <p className="text-neutral-300 text-center">Inhaberin &amp; Beauty-Expertin mit 10 Jahren Erfahrung. Spezialistin für moderne Kosmetik und individuelle Beratung.</p>
          </div>
          <div className="glass-card p-8 flex flex-col items-center w-full md:w-1/2">
            <img src="/images/über_mich.webp" alt="Teammitglied" className="w-32 h-32 rounded-full mb-6 border-roségold" />
            <h3 className="text-2xl font-serif mb-2 roségold-gradient">Mitarbeiterin</h3>
            <p className="text-neutral-300 text-center">Expertin für Wimpern, Haut und Wohlfühlmomente. Leidenschaft für Schönheit und Service.</p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="w-full max-w-3xl mx-auto mb-40 px-4 scroll-reveal" ref={addObserverRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 roségold-gradient">Häufige Fragen</h2>
          <p className="text-xl text-neutral-300 mb-10">Alles, was du wissen möchtest</p>
        </div>
        <div className="glass-card divide-y divide-white-10">
          <details className="p-6 group" open>
            <summary className="cursor-pointer text-lg font-semibold roségold-gradient">Wie kann ich einen Termin buchen?</summary>
            <p className="mt-3 text-neutral-300">Ganz einfach über unser Kontaktformular, telefonisch oder per Instagram DM.</p>
          </details>
          <details className="p-6 group">
            <summary className="cursor-pointer text-lg font-semibold roségold-gradient">Welche Produkte werden verwendet?</summary>
            <p className="mt-3 text-neutral-300">Wir setzen auf hochwertige, geprüfte Markenprodukte – vegan &amp; tierversuchsfrei.</p>
          </details>
          <details className="p-6 group">
            <summary className="cursor-pointer text-lg font-semibold roségold-gradient">Wie kurzfristig bekomme ich einen Termin?</summary>
            <p className="mt-3 text-neutral-300">Oft noch in derselben Woche – einfach anfragen!</p>
          </details>
        </div>
      </section>

      {/* INSTAGRAM FEED SECTION */}
      <section id="instagram" className="w-full max-w-5xl mx-auto mb-40 px-4 scroll-reveal" ref={addObserverRef}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 roségold-gradient">Instagram</h2>
          <p className="text-xl text-neutral-300 mb-10">Folge uns für mehr Eindrücke</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card aspect-square overflow-hidden"><img src="/images/work1.webp" alt="Insta1" className="w-full h-full object-cover" /></div>
          <div className="glass-card aspect-square overflow-hidden"><img src="/images/work2.webp" alt="Insta2" className="w-full h-full object-cover" /></div>
          <div className="glass-card aspect-square overflow-hidden"><img src="/images/termin.webp" alt="Insta3" className="w-full h-full object-cover" /></div>
          <div className="glass-card aspect-square overflow-hidden"><img src="/images/über_mich.webp" alt="Insta4" className="w-full h-full object-cover" /></div>
        </div>
      </section>

      {/* Sticky Contact Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <a href="#contact" className="bg-pink-300 text-black px-6 py-4 rounded-none font-bold text-lg shadow-lg hover:scale-110 transition-all duration-300 hover:bg-pink-400">
          Termin buchen
        </a>
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-pink-300 to-[#ffd6c0] text-black px-5 py-4 rounded-full shadow-lg border-2 border-white-30 hover:scale-110 transition-all duration-300"
          aria-label="Nach oben scrollen"
        >
          ↑
        </button>
      )}
    </main>
  );
} 