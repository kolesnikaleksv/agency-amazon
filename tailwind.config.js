/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-gray': '#D1DADD',
        'gray': '#878B8F',
        'dark-gray': '#00000080',
        'light-yellow': '#D2E051',
        'green': '#8BC34A',
        'dark-green': '#2C3C44',
        'yellow': '#D2E051',
        'red': '#E7344C'
      },
      boxShadow: {
        'light': '2px 2px 5px 0px rgba(0, 0, 0, 0.37)',
        'middle': '2px 2px 5px 2px rgba(0, 0, 0, 0.37)',
        'sidebar': '0px 18px 17px 2px rgba(0, 0, 0, 0.37)',
        'header': '0px -5px 59px -10px rgba(0, 0, 0, 0.37)',
        'filter': 'inset -3px 7px 18px -8px rgba(0, 0, 0, 0.2)',
        'filter-hover': 'inset -6px 7px 33px -8px rgba(0, 0, 0, 0.2)'
      },
    },
  },
  plugins: [],
}

