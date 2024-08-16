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
      backgroundImage: {
        crest: "url('/public/undername_market_logo.png')",
        'night-sky': 'linear-gradient(90deg, #01012b, #000000)',
        'night-sky-thin':
          'linear-gradient(90deg, rgba(1, 1, 43, 0.6), rgba(0, 0, 0, 0.6))',
      },
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
      primaryThin: 'rgba(255, 255, 0, 0.40)',
      matrix: 'rgb(3, 160, 98)',
      matrixThin: 'rgba(3, 160, 98, 0.40)',
      secondary: '#d1f7ff',
      black: 'black',
      white: 'white',
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
