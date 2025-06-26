/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fffbe6',
          100: '#fff9cc',
          200: '#fff399',
          300: '#ffed66',
          400: '#ffe733',
          500: '#ffd700',
          600: '#e7bfa5',
          700: '#bfa76d',
          800: '#18181b',
          900: '#111111',
          950: '#000000',
        },
        secondary: {
          50: '#fdf6f2',
          100: '#faece0',
          200: '#f5d6c2',
          300: '#efbfa3',
          400: '#e7bfa5',
          500: '#bfa76d',
          600: '#a68c5c',
          700: '#8c734a',
          800: '#735a39',
          900: '#5a4228',
          950: '#3a2a18',
        },
        neutral: {
          50: '#fff',
          100: '#fefcf7',
          200: '#fdf8e8',
          300: '#fbf2d9',
          400: '#f8e8c0',
          500: '#f4dda0',
          600: '#f0d080',
          700: '#ecc260',
          800: '#e8b440',
          900: '#e4a620',
          950: '#e09800',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'cursive': ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      backdropBlur: {
        'custom': '20px',
      }
    },
  },
  plugins: [],
} 