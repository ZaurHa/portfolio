'use client';

import { useState } from 'react';

interface NeumorphismVariant {
  name: string;
  description: string;
  bgColor: string;
  cardColor: string;
  shadowLight: string;
  shadowDark: string;
  textColor: string;
  accentColor: string;
}

const neumorphismVariants: NeumorphismVariant[] = [
  {
    name: "Klassisch Grau",
    description: "Traditioneller Neumorphism mit Grautönen",
    bgColor: "#e0e0e0",
    cardColor: "#f0f0f0",
    shadowLight: "#ffffff",
    shadowDark: "#bebebe",
    textColor: "#333333",
    accentColor: "#4a9eff"
  },
  {
    name: "Soft Neumorphism",
    description: "Sanfte, moderne Variante",
    bgColor: "#f5f5f5",
    cardColor: "#ffffff",
    shadowLight: "#f8f8f8",
    shadowDark: "#e8e8e8",
    textColor: "#2d3748",
    accentColor: "#667eea"
  },
  {
    name: "Dark Neumorphism",
    description: "Elegante Dark Mode Variante",
    bgColor: "#2d2d2d",
    cardColor: "#3a3a3a",
    shadowLight: "#4a4a4a",
    shadowDark: "#1a1a1a",
    textColor: "#ffffff",
    accentColor: "#ff9900"
  },
  {
    name: "Pastell Rosa",
    description: "Sanfte, feminine Farbpalette",
    bgColor: "#fdf2f8",
    cardColor: "#ffffff",
    shadowLight: "#fce7f3",
    shadowDark: "#fbcfe8",
    textColor: "#831843",
    accentColor: "#ec4899"
  },
  {
    name: "Ocean Blue",
    description: "Beruhigende Blautöne",
    bgColor: "#f0f9ff",
    cardColor: "#ffffff",
    shadowLight: "#e0f2fe",
    shadowDark: "#bae6fd",
    textColor: "#0c4a6e",
    accentColor: "#0ea5e9"
  },
  {
    name: "Nature Green",
    description: "Organische, natürliche Farben",
    bgColor: "#f0fdf4",
    cardColor: "#ffffff",
    shadowLight: "#dcfce7",
    shadowDark: "#bbf7d0",
    textColor: "#14532d",
    accentColor: "#22c55e"
  },
  {
    name: "Sunset Orange",
    description: "Warme, energetische Farben",
    bgColor: "#fff7ed",
    cardColor: "#ffffff",
    shadowLight: "#fed7aa",
    shadowDark: "#fdba74",
    textColor: "#7c2d12",
    accentColor: "#f97316"
  },
  {
    name: "Royal Purple",
    description: "Luxuriöse, elegante Farben",
    bgColor: "#faf5ff",
    cardColor: "#ffffff",
    shadowLight: "#f3e8ff",
    shadowDark: "#e9d5ff",
    textColor: "#581c87",
    accentColor: "#a855f7"
  }
];

export default function NeumorphismDemo() {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const currentVariant = neumorphismVariants[selectedVariant];

  const cardStyle = {
    backgroundColor: currentVariant.cardColor,
    boxShadow: isPressed 
      ? `inset 8px 8px 16px ${currentVariant.shadowDark}, inset -8px -8px 16px ${currentVariant.shadowLight}`
      : `8px 8px 16px ${currentVariant.shadowDark}, -8px -8px 16px ${currentVariant.shadowLight}`,
    color: currentVariant.textColor,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const buttonStyle = {
    backgroundColor: currentVariant.cardColor,
    boxShadow: `4px 4px 8px ${currentVariant.shadowDark}, -4px -4px 8px ${currentVariant.shadowLight}`,
    color: currentVariant.textColor,
    border: 'none',
    borderRadius: '12px',
    padding: '12px 24px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontSize: '14px',
    fontWeight: '600'
  };

  const inputStyle = {
    backgroundColor: currentVariant.cardColor,
    boxShadow: `inset 4px 4px 8px ${currentVariant.shadowDark}, inset -4px -4px 8px ${currentVariant.shadowLight}`,
    color: currentVariant.textColor,
    border: 'none',
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '16px',
    outline: 'none',
    width: '100%',
    maxWidth: '300px'
  };

  return (
    <div 
      className="p-8 rounded-3xl transition-all duration-500"
      style={{ backgroundColor: currentVariant.bgColor }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: currentVariant.textColor }}>
          Neumorphism Design Varianten
        </h2>
        
        {/* Variant Selector */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {neumorphismVariants.map((variant, index) => (
              <button
                key={index}
                onClick={() => setSelectedVariant(index)}
                className={`p-4 rounded-xl font-medium transition-all duration-300 ${
                  selectedVariant === index ? 'scale-105' : 'hover:scale-102'
                }`}
                style={{
                  backgroundColor: variant.cardColor,
                  boxShadow: selectedVariant === index
                    ? `8px 8px 16px ${variant.shadowDark}, -8px -8px 16px ${variant.shadowLight}`
                    : `4px 4px 8px ${variant.shadowDark}, -4px -4px 8px ${variant.shadowLight}`,
                  color: variant.textColor
                }}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Variant Info */}
        <div 
          className="mb-8 p-6 rounded-2xl"
          style={cardStyle}
        >
          <h3 className="text-xl font-bold mb-2">{currentVariant.name}</h3>
          <p className="text-sm opacity-80">{currentVariant.description}</p>
        </div>

        {/* Interactive Elements Demo */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Buttons Demo */}
          <div 
            className="p-6 rounded-2xl"
            style={cardStyle}
          >
            <h4 className="text-lg font-semibold mb-4">Buttons</h4>
            <div className="space-y-4">
              <button
                style={buttonStyle}
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
              >
                Press Me
              </button>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: currentVariant.accentColor,
                  color: '#ffffff',
                  boxShadow: `4px 4px 8px ${currentVariant.shadowDark}`
                }}
              >
                Accent Button
              </button>
            </div>
          </div>

          {/* Input Demo */}
          <div 
            className="p-6 rounded-2xl"
            style={cardStyle}
          >
            <h4 className="text-lg font-semibold mb-4">Input Field</h4>
            <input
              type="text"
              placeholder="Type something..."
              style={inputStyle}
            />
          </div>

          {/* Cards Demo */}
          <div 
            className="p-6 rounded-2xl"
            style={cardStyle}
          >
            <h4 className="text-lg font-semibold mb-4">Cards</h4>
            <div className="space-y-4">
              <div 
                className="p-4 rounded-xl"
                style={{
                  backgroundColor: currentVariant.cardColor,
                  boxShadow: `6px 6px 12px ${currentVariant.shadowDark}, -6px -6px 12px ${currentVariant.shadowLight}`
                }}
              >
                <div className="w-8 h-8 rounded-full mb-2" style={{ backgroundColor: currentVariant.accentColor }}></div>
                <h5 className="font-semibold mb-1">Card Title</h5>
                <p className="text-sm opacity-70">This is a sample card with neumorphism styling.</p>
              </div>
            </div>
          </div>

          {/* Progress Demo */}
          <div 
            className="p-6 rounded-2xl"
            style={cardStyle}
          >
            <h4 className="text-lg font-semibold mb-4">Progress Bar</h4>
            <div 
              className="w-full h-4 rounded-full mb-2"
              style={{
                backgroundColor: currentVariant.cardColor,
                boxShadow: `inset 2px 2px 4px ${currentVariant.shadowDark}, inset -2px -2px 4px ${currentVariant.shadowLight}`
              }}
            >
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: '75%',
                  background: `linear-gradient(90deg, ${currentVariant.accentColor}, ${currentVariant.accentColor}dd)`,
                  boxShadow: `2px 2px 4px ${currentVariant.shadowDark}`
                }}
              ></div>
            </div>
            <p className="text-sm opacity-70">75% Complete</p>
          </div>
        </div>

        {/* Color Palette */}
        <div 
          className="mt-8 p-6 rounded-2xl"
          style={cardStyle}
        >
          <h4 className="text-lg font-semibold mb-4">Color Palette</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg mx-auto mb-2"
                style={{ backgroundColor: currentVariant.bgColor }}
              ></div>
              <p className="text-xs">Background</p>
            </div>
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg mx-auto mb-2"
                style={{ backgroundColor: currentVariant.cardColor }}
              ></div>
              <p className="text-xs">Card</p>
            </div>
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg mx-auto mb-2"
                style={{ backgroundColor: currentVariant.accentColor }}
              ></div>
              <p className="text-xs">Accent</p>
            </div>
            <div className="text-center">
              <div 
                className="w-12 h-12 rounded-lg mx-auto mb-2 border-2"
                style={{ 
                  backgroundColor: currentVariant.shadowLight,
                  borderColor: currentVariant.shadowDark
                }}
              ></div>
              <p className="text-xs">Shadows</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 