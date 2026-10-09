/**
 * Inhalte der Startseite (Design V3 "Dark Studio + Werkstatt").
 * Nur belegbare Fakten verwenden – Preise/Fristen wie auf /leistungen.
 */
import type { Locale } from './i18n';

export const PHONE_DISPLAY = '0172 8471641';
export const PHONE_TEL = '+491728471641';
export const WHATSAPP = 'https://wa.me/491728471641';
export const EMAIL = 'brandwerkx@gmail.com';

export interface HomeProject {
  slug: string;
  title: string;
  desc: string;
  tag: string;
  live?: boolean;
  image: string;
  /** Stumme Hero-Schleife der Live-Seite für die Kachel (läuft über dem Standbild) */
  video?: string;
  alt: string;
  bar: string;
  href: string;
  external?: boolean;
}

export interface HomePlan {
  code: string;
  name: string;
  desc: string;
  amount: string;
  unit: string;
  items: string[];
  cta: string;
  href: string;
  hot?: boolean;
}

export function getHomeContent(lang: Locale) {
  const de = lang === 'de';
  const p = `/${lang}`;

  // Reihenfolge = Showreel; die fünf Kacheln (t1–t5) zeigen nur Kundenprojekte aus `featuredSlugs`.
  const projects: HomeProject[] = [
    {
      slug: 'zaira',
      title: 'Zaira Beauty Face',
      desc: de ? 'Kosmetikstudio – neuer Markenauftritt und Website' : 'Beauty studio – new brand identity and website',
      tag: de ? 'Rebranding + Website' : 'Rebrand + website',
      live: true,
      image: '/images/beauty-praxis-mockup.webp',
      video: '/videos/zaira-hero.mp4',
      alt: de ? 'Startseite Zaira Beauty Face' : 'Zaira Beauty Face homepage',
      bar: 'zaira-beauty-face',
      href: `${p}/projekte/zaira-beauty`,
    },
    {
      slug: 'mrg',
      title: 'MRG Trans & Logistik',
      desc: de ? 'B2B-Logistik-Website' : 'B2B logistics website',
      tag: 'B2B',
      image: '/images/mrg-tlogistik-preview.webp',
      video: '/videos/mrg-hero.mp4',
      alt: de ? 'Startseite MRG Trans & Logistik GmbH' : 'MRG Trans & Logistik GmbH homepage',
      bar: 'mrg-logistik.de',
      href: 'https://mrg-logistik.de',
      external: true,
    },
    {
      slug: 'ip-logistik',
      title: 'IP Logistik',
      desc: de ? 'B2B-Website für Inhouse-Logistik im Werkvertrag' : 'B2B website for in-house logistics',
      tag: de ? 'Logistik · OWL' : 'Logistics · OWL',
      live: true,
      image: '/images/ip-logistik-preview.webp',
      video: '/videos/ip-logistik-hero.mp4',
      alt: de ? 'Startseite IP Logistik GmbH' : 'IP Logistik GmbH homepage',
      bar: 'ip-logistikgmbh.de',
      href: 'https://ip-logistikgmbh.de',
      external: true,
    },
    {
      slug: 'mh-logistik',
      title: 'MH Logistik',
      desc: de ? 'Personaldienstleister für Lager & Logistik' : 'Staffing for warehousing & logistics',
      tag: de ? 'Relaunch' : 'Relaunch',
      live: true,
      image: '/images/mh-logistik-preview.webp',
      alt: de ? 'Startseite MH Logistik GmbH' : 'MH Logistik GmbH homepage',
      bar: 'mh-logistikgmbh.de',
      href: 'https://mh-logistikgmbh.de',
      external: true,
    },
    {
      slug: 'dpfkat',
      title: 'SM Team · DPF & Kat',
      desc: de ? 'DPF-Reinigung mit Festpreis und echten Werkstatt-Videos' : 'DPF cleaning with fixed price and real workshop videos',
      tag: de ? 'Werkstatt · Geretsried' : 'Workshop · Geretsried',
      live: true,
      image: '/images/dpfkat-preview.webp',
      video: '/videos/dpfkat-hero.mp4',
      alt: de ? 'Startseite DPF & Kat Service von SM Team' : 'SM Team DPF & catalytic converter service homepage',
      bar: 'dpfkat.de',
      href: 'https://www.dpfkat.de',
      external: true,
    },
    {
      slug: 'sm-umzug',
      title: 'SM Team · Umzug',
      desc: de ? 'Umzug & Transport – echte Fotos, Anruf mit einem Tipp' : 'Moving & transport – real photos, one-tap calling',
      tag: de ? 'Umzug · Geretsried' : 'Moving · Geretsried',
      live: true,
      image: '/images/sm-umzug-preview.webp',
      video: '/videos/sm-umzug-hero.mp4',
      alt: de ? 'Startseite SM Team Umzug & Transport' : 'SM Team moving & transport homepage',
      bar: 'smdienstleistung.de',
      href: 'https://smdienstleistung.de',
      external: true,
    },
    {
      slug: 'mobilwerk',
      title: 'Mobilwerk',
      desc: de ? 'Transport & Umzug – eigener Betrieb' : 'Moving & transport – my own business',
      tag: de ? 'Eigener Betrieb' : 'Own business',
      image: '/images/mobilwerk-preview.webp',
      alt: de ? 'Startseite Mobilwerk Transport & Umzug' : 'Mobilwerk moving & transport homepage',
      bar: 'mobilwerk',
      href: 'https://mobilwerk.vercel.app',
      external: true,
    },
    {
      slug: 'serlo',
      title: 'Serlo',
      desc: de ? 'Eigene Social-App: Live, Shop, Community' : 'Own social app: live, shop, community',
      tag: de ? 'Im App Store' : 'On the App Store',
      live: true,
      image: '/images/serlo-preview.webp',
      alt: de ? 'Startseite der Social-App Serlo' : 'Serlo social app homepage',
      bar: 'serlo.ch',
      href: 'https://serlo.ch',
      external: true,
    },
    {
      slug: 'berkat',
      title: 'Berkat',
      desc: de ? 'Eigene App: Live-Auktionen – im geschlossenen Test' : 'Own app: live auctions – in closed beta',
      tag: 'Beta',
      image: '/images/berkat-preview.webp',
      alt: de ? 'Die Live-Auktions-App Berkat auf dem iPhone' : 'The live auction app Berkat on an iPhone',
      bar: 'berkat-live.pages.dev',
      href: 'https://berkat-live.pages.dev',
      external: true,
    },
    {
      slug: 'klempner',
      title: de ? 'Muster-Website Klempner' : 'Template website: plumber',
      desc: de ? 'Design wählen, Inhalte rein, fertig – ab 490 €' : 'Pick a design, add your content, done – from €490',
      tag: de ? '6 Designvarianten' : '6 design variants',
      image: '/images/klempner-preview.webp',
      alt: de ? 'Muster-Website für einen Klempnerbetrieb' : 'Template website for a plumbing business',
      bar: 'muster/klempner',
      href: '/muster/klempner',
    },
  ];
  const featuredSlugs = ['zaira', 'mrg', 'ip-logistik', 'dpfkat', 'sm-umzug'];
  const featured = projects.filter((x) => featuredSlugs.includes(x.slug));
  const projectCount = String(projects.length).padStart(2, '0');

  const plans: HomePlan[] = [
    {
      code: de ? 'A — Schnellstart' : 'A — Quick start',
      name: de ? 'Muster-Website' : 'Template website',
      desc: de ? 'Fertiges Design, angepasst an deinen Betrieb, deine Farben, dein Logo.' : 'A ready-made design, adapted to your business, colours and logo.',
      amount: '490',
      unit: de ? 'einmalig · 3–5 Werktage' : 'one-off · 3–5 working days',
      items: de
        ? ['Design aus der Vorlagen-Auswahl', 'Kontaktformular & SEO-Grundlagen', 'Domain & Hosting im 1. Jahr', '30 Tage Support nach Übergabe']
        : ['Design from the template range', 'Contact form & SEO basics', 'Domain & hosting in year one', '30 days of support after handover'],
      cta: de ? 'Design wählen' : 'Choose a design',
      href: '/muster',
    },
    {
      code: de ? 'B — Individuell' : 'B — Custom',
      name: de ? 'Custom-Website' : 'Custom website',
      desc: de ? 'Individuell für dich gestaltet – Aufbau, Look und Inhalte nach Maß.' : 'Designed just for you – structure, look and content made to measure.',
      amount: '990',
      unit: de ? 'einmalig · 7–14 Werktage' : 'one-off · 7–14 working days',
      items: de
        ? ['Eigenes Design statt Vorlage', 'SEO-optimiert, mobile-first', 'Domain & Hosting im 1. Jahr', '30 Tage Support nach Übergabe']
        : ['Your own design, not a template', 'SEO-optimised, mobile-first', 'Domain & hosting in year one', '30 days of support after handover'],
      cta: de ? 'Projekt starten' : 'Start a project',
      href: `${p}/kontakt?package=custom`,
      hot: true,
    },
    {
      code: de ? 'C — Laufend' : 'C — Ongoing',
      name: de ? 'SEO & Wartung' : 'SEO & care',
      desc: de ? 'Damit deine Seite gefunden wird, aktuell bleibt und sicher läuft.' : 'So your site gets found, stays current and runs securely.',
      amount: '99',
      unit: de ? 'pro Monat' : 'per month',
      items: de
        ? ['Suchmaschinen-Optimierung', 'Updates & Pflege', 'Ein fester Ansprechpartner']
        : ['Search engine optimisation', 'Updates & maintenance', 'One fixed point of contact'],
      cta: de ? 'Anfragen' : 'Enquire',
      href: `${p}/kontakt?package=seo`,
    },
  ];

  return {
    hero: {
      metaLeft: de ? 'Webdesign · Geretsried bei München' : 'Web design · Geretsried near Munich',
      metaRight: de ? 'Antwort meist in 24 h' : 'Reply usually within 24 h',
      l1: de ? 'Websites, die' : 'Websites that',
      accent: de ? 'Anfragen' : 'win',
      outline: de ? 'bringen.' : 'clients.',
      subPrice: de ? 'Festpreis ab 490 €' : 'Fixed price from €490',
      subPlace: de ? 'aus Geretsried für München & Oberland.' : 'from Geretsried for Munich & the Oberland.',
      lead: de
        ? 'Für Handwerker, Selbstständige und kleine Betriebe, die keine Zeit für Webdesign haben.'
        : 'For tradespeople, freelancers and small businesses with no time for web design.',
      leadStrong: de ? 'In 3–5 Werktagen online' : 'Online in 3–5 working days',
      leadTail: de ? ' – mit einem Ansprechpartner von Anfang bis Ende.' : ' – with one point of contact from start to finish.',
      ctaPrimary: de ? 'Kostenloses Erstgespräch' : 'Free initial call',
    },
    ticket: {
      title: de ? 'Arbeitsauftrag' : 'Work order',
      rows: [
        [de ? 'Leistung' : 'Service', de ? 'Muster-Website, an dich angepasst' : 'Template website, adapted to you'],
        [de ? 'Lieferzeit' : 'Delivery', de ? '3–5 Werktage' : '3–5 working days'],
        [de ? 'Ort' : 'Area', de ? 'Geretsried · München & Oberland · digital' : 'Geretsried · Munich & Oberland · remote'],
        [de ? 'Inklusive' : 'Included', de ? 'Domain & Hosting im 1. Jahr' : 'Domain & hosting in year one'],
        [de ? 'Antwort' : 'Reply', de ? 'meist innerhalb 24 h' : 'usually within 24 h'],
      ] as [string, string][],
      contactLabel: de ? 'Kontakt' : 'Contact',
      stampTop: de ? 'Festpreis' : 'Fixed price',
      stampFrom: de ? 'ab' : 'from',
      stampFoot: de ? 'Muster · Endpreis' : 'Template · final price',
    },
    reel: {
      label: de ? `Showreel · ${projectCount} Projekte` : `Showreel · ${projectCount} projects`,
      fields: de ? 'Logistik · Umzug · Werkstatt · Kosmetik · Apps' : 'Logistics · Moving · Workshop · Beauty · Apps',
    },
    projects: {
      num: de ? '01 / Projekte' : '01 / Projects',
      h1: de ? 'Echte Betriebe.' : 'Real businesses.',
      h2o: de ? 'Echte' : 'Real',
      h2: de ? 'Websites.' : 'websites.',
      text: de
        ? 'Vom Kosmetikstudio bis zur Spedition – jede Seite ist auf den Betrieb und seine Kunden zugeschnitten.'
        : 'From beauty studio to haulier – every site is built around the business and its customers.',
      all: de ? 'Alle Projekte' : 'All projects',
      items: featured,
      reel: projects,
    },
    pricing: {
      num: de ? '02 / Leistungen' : '02 / Services',
      h1: de ? 'Ein Festpreis.' : 'One fixed price.',
      hc: de ? 'Keine' : 'No',
      h2: de ? 'Überraschungen.' : 'surprises.',
      text: de
        ? 'Endpreise nach § 19 UStG – keine Umsatzsteuer obendrauf. Domain & Hosting im 1. Jahr inklusive.'
        : 'Final prices under § 19 UStG (German small business rule) – no VAT on top. Domain & hosting included in year one.',
      boardTitle: de ? 'Preistafel' : 'Price board',
      boardMeta: de ? 'Stand 2026 · Endpreise' : 'Valid 2026 · final prices',
      from: de ? 'ab' : 'from',
      popular: de ? 'Beliebt' : 'Popular',
      plans,
      extrasLabel: de ? 'Extras' : 'Extras',
      extras: (de
        ? [['Nur Wartung', 'ab 49 € / Monat'], ['Zusätzliche Seite', 'ab 99 €'], ['Speed-Optimierung', '199 € einmalig'], ['Google-Unternehmensprofil einrichten', '149 € einmalig']]
        : [['Maintenance only', 'from €49 / month'], ['Additional page', 'from €99'], ['Speed optimisation', '€199 one-off'], ['Google Business Profile setup', '€149 one-off']]) as [string, string][],
      foot: de
        ? ['Festpreis vorab', 'Keine USt (§ 19 UStG)', 'Domain & Hosting 1. Jahr', '30 Tage Support']
        : ['Fixed price upfront', 'No VAT (§ 19 UStG)', 'Domain & hosting year one', '30 days support'],
      details: de ? 'Alle Leistungen & Details' : 'All services & details',
    },
    process: {
      num: de ? '03 / Ablauf' : '03 / Process',
      h1: de ? 'Vier Schritte' : 'Four steps',
      h2: de ? 'bis' : 'to',
      h2o: de ? 'online.' : 'online.',
      text: de
        ? 'Du lieferst die Infos, ich den Rest. Die Zusammenarbeit läuft komplett digital.'
        : 'You send the info, I do the rest. We work together entirely online.',
      steps: (de
        ? [
            ['Design wählen', 'Vorlage aussuchen oder individuell starten – wir klären es im Erstgespräch.'],
            ['Infos senden', 'Logo, Texte, Farben – per Mail oder WhatsApp, ganz unkompliziert.'],
            ['Website live', 'Ich baue, du gibst frei. Muster-Website in 3–5 Werktagen.'],
            ['Übergabe & Support', 'Du bekommst alles übergeben – plus 30 Tage Support danach.'],
          ]
        : [
            ['Choose a design', 'Pick a template or start custom – we sort it out in the first call.'],
            ['Send your info', 'Logo, copy, colours – by email or WhatsApp, no fuss.'],
            ['Website live', 'I build, you approve. Template websites in 3–5 working days.'],
            ['Handover & support', 'You get everything handed over – plus 30 days of support.'],
          ]) as [string, string][],
    },
    about: {
      num: de ? '04 / Über mich' : '04 / About',
      caption: ['Zaur Hatuev', 'Geretsried'],
      big1: de ? 'Kein Agentur-Pingpong.' : 'No agency ping-pong.',
      bigEm: de ? 'Ein Ansprechpartner' : 'One point of contact',
      big2: de ? ' – vom ersten Anruf bis zur fertigen Seite.' : ' – from the first call to the finished site.',
      text: de
        ? 'Ich bin Zaur Hatuev, Webdesigner und Entwickler aus Geretsried. Ich baue Websites für Betriebe, die keine Zeit für Webdesign haben – und betreibe mit Mobilwerk selbst einen. Ich weiß also, worauf es ankommt: schnell online, gut gefunden werden, Anfragen bekommen.'
        : "I'm Zaur Hatuev, a web designer and developer from Geretsried. I build websites for businesses that have no time for web design – and run one myself, Mobilwerk. So I know what matters: online fast, easy to find, getting enquiries.",
      kv: (de
        ? [['Standort', 'Geretsried'], ['Servicegebiet', 'München & Oberland'], ['Zusammenarbeit', 'Digital']]
        : [['Based in', 'Geretsried'], ['Service area', 'Munich & Oberland'], ['Working', 'Remote']]) as [string, string][],
      more: de ? 'Mehr über mich' : 'More about me',
    },
    quotes: {
      num: de ? '05 / Kundenstimmen' : '05 / Testimonials',
      h1: de ? 'Was Kunden' : 'What clients',
      h2o: de ? 'sagen.' : 'say.',
      items: [
        {
          src: de ? '01 · Kosmetik' : '01 · Beauty',
          before: 'Zaur hat in ',
          mark: '5 Tagen',
          after: ' genau das geliefert, was ich wollte — und noch mehr. Die Website sieht professionell aus und kommt bei meinen Kunden super an.',
          who: 'Zaira K.',
          role: 'Inhaberin Zaira Beauty Face',
        },
        {
          src: de ? '02 · Logistik' : '02 · Logistics',
          before: 'Wir sind mit unserer neuen Website rundum zufrieden. BrandWerkX hat von der ersten Idee bis zum fertigen Ergebnis mitgedacht, war schnell erreichbar und alles zuverlässig umgesetzt. ',
          mark: 'Absolute Empfehlung.',
          after: '',
          who: 'MRG Trans & Logistik GmbH',
          role: '',
        },
      ],
    },
    faq: {
      num: '06 / FAQ',
      h1: de ? 'Kurz' : 'Quick',
      h2o: de ? 'gefragt.' : 'answers.',
      label: de ? 'Häufige Fragen' : 'Common questions',
      items: (de
        ? [
            ['Was kostet meine Website?', 'Eine Muster-Website gibt es ab 490 €, eine individuelle Custom-Website ab 990 €. Das sind Endpreise – als Kleinunternehmer nach § 19 UStG berechne ich keine Umsatzsteuer. Ab dem zweiten Jahr fallen für Domain und Hosting etwa 10–15 € im Monat an.'],
            ['Wie schnell ist meine Seite online?', 'Eine Muster-Website ist in 3–5 Werktagen fertig, eine Custom-Website in 7–14 Werktagen – gerechnet ab dem Tag, an dem Logo, Texte und Farben da sind.'],
            ['Brauche ich eine eigene Domain und Hosting?', 'Nein. Domain und Hosting sind im ersten Jahr inklusive. Darum kümmere ich mich.'],
            ['Was passiert nach der Übergabe?', 'Du bekommst 30 Tage Support. Danach kannst du Wartung ab 49 € oder SEO & Wartung ab 99 € im Monat dazubuchen – musst du aber nicht.'],
          ]
        : [
            ['What does my website cost?', 'A template website starts at €490, a custom website at €990. These are final prices – as a small business under § 19 UStG I charge no VAT.'],
            ['How fast will my site be online?', 'A template website is ready in 3–5 working days, a custom website in 7–14 working days – counted from the day logo, copy and colours are in.'],
            ['Do I need my own domain and hosting?', "No. Domain and hosting are included in the first year. I'll take care of it."],
            ['What happens after handover?', 'You get 30 days of support. After that you can add maintenance from €49 or SEO & care from €99 per month – but you don’t have to.'],
          ]) as [string, string][],
    },
    final: {
      num: de ? '07 / Kontakt' : '07 / Contact',
      meta: de ? 'Antwort meist innerhalb 24 h' : 'Reply usually within 24 h',
      ask: de ? 'Lass uns über deine Website reden.' : "Let's talk about your website.",
      cta: de ? 'Erstgespräch anfragen' : 'Request a call',
      place: de ? 'Geretsried · München & Oberland' : 'Geretsried · Munich & Oberland',
    },
  };
}

export type HomeContent = ReturnType<typeof getHomeContent>;
