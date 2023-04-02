/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{css,js}', './index.html', './style.css'],
  theme: {
    extend: {},
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    colors: {
      white: '#ffffff',
      'black-light': '#2b2b2b',
      'black-dark': '#000000',
      gray: '#969696',
      'red-light': '#f85149',
      'red-dark': '#da3633',
    },
    fontFamily: {
      rubik: 'rubik',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
