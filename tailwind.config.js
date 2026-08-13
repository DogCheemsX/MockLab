/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand palette — edit these to re-theme the whole app
        slate: {
          950: '#0f172a', // deep slate background
          900: '#141d33',
          800: '#1e293b', // card surface
          700: '#334155', // borders
          400: '#94a3b8', // muted text
        },
        emerald: {
          DEFAULT: '#10b981',
          500: '#10b981',
          400: '#34d399',
          600: '#059669',
        },
        indigo: {
          DEFAULT: '#6366f1',
          500: '#6366f1',
          400: '#818cf8',
          600: '#4f46e5',
        },
        amber: {
          500: '#f59e0b',
        },
        rose: {
          500: '#f43f5e',
        },
      },
      fontFamily: {
        display: ['"Manrope"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(16,185,129,0.15), 0 8px 24px -8px rgba(16,185,129,0.35)',
      },
    },
  },
  plugins: [],
}
