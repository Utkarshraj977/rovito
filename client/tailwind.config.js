/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          DEFAULT: '#0A2D5E', // royal blue (brand primary)
          dark: '#071C3E',
          light: '#123B78',
        },
        maple: {
          DEFAULT: '#D6001C', // accent red (brand accent)
        },
        ivory: {
          DEFAULT: '#FAF7F0',
          deep: '#F1EBDC',
        },
        gold: '#B08D4F',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Jost"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      boxShadow: {
        sm: '0 2px 10px rgba(10,45,94,.08)',
        md: '0 14px 40px rgba(10,45,94,.14)',
        lg: '0 24px 70px rgba(7,28,62,.28)',
      },
      borderRadius: {
        md: '14px',
        lg: '26px',
      },
      keyframes: {
        heroZoom: {
          from: { transform: 'scale(1.06)' },
          to: { transform: 'scale(1)' },
        },
      },
      animation: {
        heroZoom: 'heroZoom 16s ease-out forwards',
      },
    },
  },
  plugins: [],
};