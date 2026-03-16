/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── FUERTE.DIGITAL brand: Black + Gold ──
        gold: {
          50:  '#fdfbf0',
          100: '#f9f3d0',
          200: '#f0e49a',
          300: '#e4ce5c',
          400: '#cfb630',
          500: '#b89c1a',
          600: '#8B7300',  // primary gold
          700: '#6e5c00',
          800: '#4f4200',
          900: '#302800',
          950: '#1a1600',
        },
        ink: {
          DEFAULT: '#000000',
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#d0d0d0',
          300: '#a8a8a8',
          400: '#737373',
          500: '#525252',
          600: '#333333',
          700: '#1a1a1a',
          800: '#111111',
          900: '#080808',
          950: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-gold':  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(139 115 0 / 0.08)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
        'grid-white': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(255 255 255 / 0.04)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
        'grid-gray':  "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(0 0 0 / 0.05)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease forwards',
        'fade-in':   'fadeIn 0.4s ease forwards',
        'float':     'float 4s ease-in-out infinite',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp:  { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
}
