/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'selector', // or 'media' or 'class
  theme: {
    duration: {
      fast: '1s',
      normal: '3s',
      slow: '5s',
    },
    extend: {
      text: {
        // TODO: add typography tokens
        base: '14px',
        scale: 1.2,
      },
      fontFamily: {
        sans: ['Kode Mono Variable', 'monospace'],
      },
      boxShadow: {
        one: '0px 0px 10px 6px rgba(14, 14, 15, 0.70)',
        url: '0px 0px 10px 6px rgba(55, 25, 126, 0.20)',
      },
    },
    darkMode: 'selector',
    colors: {
      background: '#131314',
      foreground: '#222224',
      primary: '#ffb938',
      matrix: 'rgb(3, 160, 98)',
      matrixThin: 'rgba(3, 160, 98, 0.40)',
      secondary: '#d1f7ff',
    },
  },
  plugins: [require('tailwindcss-animate')],
};
