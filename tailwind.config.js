/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  colors: {
    'list': '#C7D2FE',
  },
  theme: {
    extend: {},
  },
  fontFamily: {
    'sans': ['Roboto', 'sans-serif'],
  },
  plugins: [],
};
