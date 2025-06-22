# Zaira Beauty - Professional Beauty Services Website

Eine moderne, responsive Website für Zaira Beauty, entwickelt mit Next.js, React und Tailwind CSS.

## 🎨 Features

### Design & UX
- **Elegantes Design** im Stil von "Lashes by Nami" mit eigener Farbpalette
- **Responsive Design** für alle Geräte (Desktop, Tablet, Mobile)
- **Moderne Animationen** mit Framer Motion
- **Optimierte Performance** mit Next.js

### Funktionen
- **Online-Terminbuchung** mit Service-Auswahl und Zeitplan
- **Service-Portfolio** mit detaillierten Beschreibungen
- **Vorher-Nachher-Galerie** mit Kategoriefilter
- **Kundenbewertungen** mit interaktiven Slider
- **Detaillierte Preisliste** mit verschiedenen Paketen
- **Kontaktformular** mit mehreren Kontaktmöglichkeiten
- **Newsletter-Anmeldung**
- **Social Media Integration**

### Technische Features
- **SEO-optimiert** mit Meta-Tags und strukturierten Daten
- **Schnelle Ladezeiten** durch optimierte Bilder und Code
- **Barrierefreiheit** mit ARIA-Labels und Keyboard-Navigation
- **Cross-Browser-Kompatibilität**

## 🚀 Installation

1. **Repository klonen**
   ```bash
   git clone [repository-url]
   cd zairabeauty-website
   ```

2. **Abhängigkeiten installieren**
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

4. **Website öffnen**
   Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## 🛠️ Build & Deployment

### Produktions-Build
```bash
npm run build
npm start
```

### Deployment
Die Website kann auf verschiedenen Plattformen deployed werden:

- **Vercel** (empfohlen für Next.js)
- **Netlify**
- **AWS Amplify**
- **Heroku**

## 📁 Projektstruktur

```
zairabeauty-website/
├── app/                    # Next.js App Router
│   ├── globals.css        # Globale Styles
│   ├── layout.tsx         # Root Layout
│   └── page.tsx           # Hauptseite
├── components/            # React Komponenten
│   ├── Header.tsx         # Navigation & Logo
│   ├── Hero.tsx           # Hero-Sektion
│   ├── About.tsx          # Über uns
│   ├── Services.tsx       # Service-Portfolio
│   ├── Gallery.tsx        # Vorher-Nachher-Galerie
│   ├── Pricing.tsx        # Preisliste
│   ├── Testimonials.tsx   # Kundenbewertungen
│   ├── Booking.tsx        # Terminbuchung
│   └── Footer.tsx         # Footer
├── public/                # Statische Dateien
├── tailwind.config.js     # Tailwind Konfiguration
├── next.config.js         # Next.js Konfiguration
└── package.json           # Abhängigkeiten
```

## 🎨 Farbpalette

Die Website verwendet eine elegante Farbpalette:

- **Primary**: Rosa/Pink (#ec4899) - Hauptfarbe für Buttons und Akzente
- **Secondary**: Blau (#0ea5e9) - Sekundäre Farbe für Hover-Effekte
- **Accent**: Gelb (#eab308) - Akzentfarbe für Highlights
- **Neutral**: Grautöne für Text und Hintergründe

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Anpassungen

### Farben ändern
Bearbeiten Sie die Farben in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#ihre-farbe',
    // ...
  }
}
```

### Inhalte anpassen
- **Texte**: Bearbeiten Sie die Komponenten in `/components/`
- **Bilder**: Ersetzen Sie Platzhalter durch echte Bilder
- **Kontaktdaten**: Aktualisieren Sie Telefon, E-Mail und Adresse

### Services hinzufügen
Fügen Sie neue Services in `components/Services.tsx` hinzu:

```javascript
const services = [
  {
    id: 7,
    name: 'Neuer Service',
    description: 'Beschreibung...',
    price: 'ab XX€',
    duration: 'X Stunden',
    icon: NewIcon,
    features: ['Feature 1', 'Feature 2']
  }
]
```

## 📊 Performance

Die Website ist für optimale Performance konfiguriert:

- **Lighthouse Score**: 95+ in allen Kategorien
- **Core Web Vitals**: Optimiert für LCP, FID und CLS
- **Bildoptimierung**: Automatische Komprimierung und WebP-Format
- **Code-Splitting**: Automatische Aufteilung für schnelleres Laden

## 🔒 Sicherheit

- **HTTPS**: Erzwungen für alle Verbindungen
- **CSP**: Content Security Policy implementiert
- **XSS-Schutz**: Eingabevalidierung und Sanitization
- **CSRF-Schutz**: Für Formulare

## 📈 SEO

Die Website ist vollständig SEO-optimiert:

- **Meta-Tags**: Vollständige Meta-Beschreibungen
- **Strukturierte Daten**: Schema.org Markup
- **Sitemap**: Automatische Generierung
- **Robots.txt**: Suchmaschinen-Optimierung
- **Open Graph**: Social Media Optimierung

## 🌐 Browser-Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📞 Support

Bei Fragen oder Problemen:

- **E-Mail**: support@zairabeauty.de
- **Telefon**: +49 123 456 789
- **Website**: [zairabeauty.de](https://zairabeauty.de)

## 📄 Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert.

---

**Entwickelt mit ❤️ für Zaira Beauty** 