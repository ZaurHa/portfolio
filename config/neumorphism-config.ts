// Neumorphism Design System Konfiguration

export const NEUMORPHISM_CONFIG = {
  // Standard-Variante für das Portfolio
  DEFAULT_VARIANT: 'neumorph-black',
  
  // Verfügbare Varianten
  AVAILABLE_VARIANTS: [
    { 
      name: 'Black', 
      class: 'neumorph-black', 
      description: 'Sehr dunkles Schwarz-Grau, minimalistisch',
      preview: '⬛'
    }
  ],

  // Animation-Einstellungen
  ANIMATIONS: {
    TRANSITION_DURATION: '500ms',
    HOVER_SCALE: '1.02',
    ACTIVE_SCALE: '0.98',
    PULSE_DURATION: '2s'
  },

  // Schatten-Einstellungen
  SHADOWS: {
    CARD: {
      LIGHT: '8px 8px 16px',
      DARK: '-8px -8px 16px'
    },
    BUTTON: {
      LIGHT: '4px 4px 8px',
      DARK: '-4px -4px 8px'
    },
    INPUT: {
      LIGHT: 'inset 4px 4px 8px',
      DARK: 'inset -4px -4px 8px'
    }
  },

  // Responsive Breakpoints
  BREAKPOINTS: {
    MOBILE: '768px',
    TABLET: '1024px',
    DESKTOP: '1280px'
  },

  // LocalStorage Keys
  STORAGE_KEYS: {
    SELECTED_VARIANT: 'neumorph-variant',
    USER_PREFERENCES: 'neumorph-preferences'
  }
};

// Hilfsfunktionen
export const getVariantByName = (name: string) => {
  return NEUMORPHISM_CONFIG.AVAILABLE_VARIANTS.find(v => v.name === name);
};

export const getVariantByClass = (className: string) => {
  return NEUMORPHISM_CONFIG.AVAILABLE_VARIANTS.find(v => v.class === className);
};

export const saveUserPreference = (variant: string) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(NEUMORPHISM_CONFIG.STORAGE_KEYS.SELECTED_VARIANT, variant);
  }
};

export const getUserPreference = (): string => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(NEUMORPHISM_CONFIG.STORAGE_KEYS.SELECTED_VARIANT) || NEUMORPHISM_CONFIG.DEFAULT_VARIANT;
  }
  return NEUMORPHISM_CONFIG.DEFAULT_VARIANT;
};

// Theme-spezifische Konfigurationen
export const THEME_CONFIGS = {
  'neumorph-classic': {
    name: 'Klassisch',
    description: 'Traditioneller Neumorphism',
    category: 'neutral',
    tags: ['classic', 'professional', 'minimal']
  },
  'neumorph-soft': {
    name: 'Soft',
    description: 'Sanfte, moderne Variante',
    category: 'light',
    tags: ['soft', 'modern', 'clean']
  },
  'neumorph-dark': {
    name: 'Dark',
    description: 'Elegante Dark Mode Variante',
    category: 'dark',
    tags: ['dark', 'elegant', 'sophisticated']
  },
  'neumorph-ocean': {
    name: 'Ocean',
    description: 'Beruhigende Blautöne',
    category: 'cool',
    tags: ['ocean', 'calm', 'professional']
  },
  'neumorph-nature': {
    name: 'Nature',
    description: 'Organische Grüntöne',
    category: 'warm',
    tags: ['nature', 'organic', 'fresh']
  },
  'neumorph-sunset': {
    name: 'Sunset',
    description: 'Warme Orangetöne',
    category: 'warm',
    tags: ['sunset', 'warm', 'energetic']
  },
  'neumorph-royal': {
    name: 'Royal',
    description: 'Luxuriöse Lilatöne',
    category: 'luxury',
    tags: ['royal', 'luxury', 'premium']
  }
}; 