/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // ── bonuskarte.digital Brand (Brand Book v1.0) ──
        amber: {
          DEFAULT: '#F25C24',
          light:   '#f47a4a',
          dark:    '#c94b1c',
          // Orange als Schrift auf hellem Grund (5,2:1 auf paper, 5,8:1 auf weiß) –
          // #F25C24 selbst nur für Flächen und Schrift auf dunklem Grund
          text:    '#B23F12',
        },
        // ── Blog-Palette: coolors.co/f25c24-2f4858-33658a-86bbd8-f6ae2d (09.10.2026) ──
        'charcoal-blue':  '#2F4858',
        'baltic-blue':    '#33658A',
        'sky-reflection': '#86BBD8',
        'honey-bronze':   '#F6AE2D',
        ink: {
          DEFAULT: '#1A1410',
          50:  '#f5f4f3',
          100: '#e8e6e3',
          200: '#cbc7c0',
          300: '#a09990',
          400: '#736960',
          500: '#524841',
          600: '#3a3229',
          700: '#2a231b',
          800: '#1A1410',
          900: '#0d0a07',
          950: '#060402',
        },
        paper: {
          DEFAULT: '#F6F1E8',
          dark:    '#ede6d8',
        },
      },
      fontFamily: {
        sans:    ['Geist', 'system-ui', 'sans-serif'],
        display: ['Geist', 'system-ui', 'sans-serif'],
        mono:    ['Geist Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-amber': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(242 92 36 / 0.08)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
        'grid-ink':   "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(26 20 16 / 0.06)'%3e%3cpath d='M0 .5H39.5V40'/%3e%3c/svg%3e\")",
        'grid-paper': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' width='40' height='40' fill='none' stroke='rgb(246 241 232 / 0.04)'%3e%3c/svg%3e\")",
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.4s ease forwards',
        'float':      'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'blink':      'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(24px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        float:  { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        blink:  { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [],
}
