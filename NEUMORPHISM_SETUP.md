# Neumorphism Design System - Setup & Konfiguration

## 🎨 Standard-Variante ändern

### Option 1: Über die Konfigurationsdatei (Empfohlen)

1. Öffnen Sie `config/neumorphism-config.ts`
2. Ändern Sie die `DEFAULT_VARIANT`:

```typescript
export const NEUMORPHISM_CONFIG = {
  // Standard-Variante für das Portfolio
  DEFAULT_VARIANT: 'neumorph-ocean', // Hier ändern!
  
  // Verfügbare Optionen:
  // 'neumorph-classic' - Klassischer Grau-Neumorphism
  // 'neumorph-soft' - Sanfte, moderne Variante
  // 'neumorph-dark' - Elegante Dark Mode Variante
  // 'neumorph-ocean' - Beruhigende Blautöne (Standard)
  // 'neumorph-nature' - Organische Grüntöne
  // 'neumorph-sunset' - Warme Orangetöne
  // 'neumorph-royal' - Luxuriöse Lilatöne
  // '' - Original Design
}
```

### Option 2: Direkt in der Komponente

1. Öffnen Sie `components/PortfolioWithDefaultNeumorphism.tsx`
2. Ändern Sie die `DEFAULT_VARIANT` Konstante:

```typescript
// Standard-Variante (kann hier geändert werden)
const DEFAULT_VARIANT = 'neumorph-ocean'; // Hier ändern!
```

## 🚀 Verfügbare Seiten

### Hauptseiten:
- `/` - Original Portfolio
- `/portfolio-default` - Portfolio mit Standard-Neumorphism (Ocean)
- `/portfolio-neumorphism` - Portfolio mit Style-Switcher

### Demo-Seiten:
- `/neumorphism` - Übersicht aller Demos
- `/neumorphism-demo` - 8 interaktive Farbvarianten
- `/neumorphism-showcase` - Praktische UI-Anwendungen
- `/neumorphism-guide` - Integrationsanleitung

## 🎯 Schnellstart

### 1. Standard-Variante festlegen:
```typescript
// In config/neumorphism-config.ts
DEFAULT_VARIANT: 'neumorph-royal' // Beispiel: Royal Purple
```

### 2. Portfolio mit Standard-Variante verwenden:
```typescript
// In app/page.tsx
import PortfolioWithDefaultNeumorphism from '../components/PortfolioWithDefaultNeumorphism';

export default function Home() {
  return <PortfolioWithDefaultNeumorphism />;
}
```

### 3. Style-Switcher aktivieren:
Der Style-Switcher ist bereits integriert und erscheint als 🎨 Button oben rechts.

## 🎨 Varianten-Übersicht

| Variante | Klasse | Beschreibung | Kategorie |
|----------|--------|--------------|-----------|
| Original | `''` | Ihr ursprüngliches Design | - |
| Klassisch | `neumorph-classic` | Traditioneller Neumorphism | neutral |
| Soft | `neumorph-soft` | Sanfte, moderne Variante | light |
| Dark | `neumorph-dark` | Elegante Dark Mode Variante | dark |
| Ocean | `neumorph-ocean` | Beruhigende Blautöne | cool |
| Nature | `neumorph-nature` | Organische Grüntöne | warm |
| Sunset | `neumorph-sunset` | Warme Orangetöne | warm |
| Royal | `neumorph-royal` | Luxuriöse Lilatöne | luxury |

## 🔧 Integration in eigene Projekte

### 1. CSS importieren:
```typescript
import "./neumorphism-variants.css";
```

### 2. Container-Klasse hinzufügen:
```jsx
<div className="neumorph-ocean">
  <div className="card">Ihr Inhalt</div>
  <button className="neumorph-button">Button</button>
  <input className="neumorph-input" placeholder="Input" />
</div>
```

### 3. Verfügbare CSS-Klassen:
- `.card` - Neumorphism Cards
- `.neumorph-button` - Buttons mit Neumorphism-Effekt
- `.neumorph-input` - Input-Felder mit Inset-Effekt
- `.neumorph-badge` - Badges/Labels
- `.neumorph-progress` - Progress-Bars
- `.neumorph-hover` - Hover-Effekte
- `.neumorph-pulse` - Pulsierende Animation

## 🎛️ Erweiterte Konfiguration

### Animationen anpassen:
```typescript
// In config/neumorphism-config.ts
ANIMATIONS: {
  TRANSITION_DURATION: '500ms',
  HOVER_SCALE: '1.02',
  ACTIVE_SCALE: '0.98',
  PULSE_DURATION: '2s'
}
```

### Schatten anpassen:
```typescript
SHADOWS: {
  CARD: {
    LIGHT: '8px 8px 16px',
    DARK: '-8px -8px 16px'
  },
  BUTTON: {
    LIGHT: '4px 4px 8px',
    DARK: '-4px -4px 8px'
  }
}
```

## 📱 Responsive Design

Das System ist vollständig responsive und passt sich automatisch an:
- **Mobile**: Reduzierte Schatten-Größen
- **Tablet**: Optimierte Touch-Targets
- **Desktop**: Vollständige Neumorphism-Effekte

## 🔄 Benutzer-Präferenzen

Das System speichert automatisch die Benutzerauswahl im localStorage:
- Variante wird beim nächsten Besuch wiederhergestellt
- Funktioniert seitenübergreifend
- Kann über `localStorage.clear()` zurückgesetzt werden

## 🎨 Custom Varianten erstellen

### 1. Neue CSS-Variante hinzufügen:
```css
/* In app/neumorphism-variants.css */
.neumorph-custom {
  --bg: #f0f0f0;
  --card: #ffffff;
  --shadow-light: #e0e0e0;
  --shadow-dark: #d0d0d0;
  --text: #333333;
  --accent: #ff6b6b;
}
```

### 2. Konfiguration erweitern:
```typescript
// In config/neumorphism-config.ts
AVAILABLE_VARIANTS: [
  // ... bestehende Varianten
  { 
    name: 'Custom', 
    class: 'neumorph-custom', 
    description: 'Ihre eigene Variante',
    preview: '✨'
  }
]
```

## 🚀 Performance-Tipps

- Verwenden Sie `transform` statt `box-shadow` für Animationen
- Nutzen Sie `will-change: transform` für bessere Performance
- Vermeiden Sie zu viele Neumorphism-Elemente auf einer Seite
- Testen Sie auf verschiedenen Geräten

## 🎯 Best Practices

### ✅ Empfohlen:
- Konsistente Schatten-Größen verwenden
- Lesbare Kontraste beibehalten
- Sanfte Übergänge (300-500ms)
- Semantische Klassennamen

### ❌ Vermeiden:
- Zu starke Schatten (>12px)
- Zu viele Neumorphism-Elemente
- Zu kleine Schriftgrößen
- Performance-kritische Animationen

## 🔗 Nützliche Links

- **Demo**: `http://localhost:3002/neumorphism`
- **Portfolio**: `http://localhost:3002/portfolio-default`
- **Guide**: `http://localhost:3002/neumorphism-guide`
- **Showcase**: `http://localhost:3002/neumorphism-showcase`

---

**Viel Spaß mit Ihrem neuen Neumorphism Design System! 🎨✨** 