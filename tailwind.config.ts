import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: {
      'none': '0',
      'sm': '0',
      '': '0',
      'md': '0',
      'lg': '0',
      'xl': '0',
      '2xl': '0',
      '3xl': '0',
      'full': '0',
    },
    extend: {
      colors: {
        primary: '#F472B6',
        pink: {
          '500': '#F472B6',
        },
      },
      animation: {
        flutter: 'flutter 0.3s ease-in-out infinite alternate',
      },
      keyframes: {
        flutter: {
          '0%, 100%': {
            transform: 'scaleY(1)',
            transformOrigin: 'center',
          },
          '50%': {
            transform: 'scaleY(0.95)',
            transformOrigin: 'center',
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config; 