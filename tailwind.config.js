/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,js}',
    './index.html',
    './style.css',
    './node_modules/flowbite/**/*.js',
  ],
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
    },
    fontFamily: {
      rubik: 'rubik',
    },
  },
  plugins: [require('@tailwindcss/forms'), require('flowbite/plugin')],
};
