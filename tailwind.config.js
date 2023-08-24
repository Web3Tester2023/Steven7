/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'gilroy': ['Gilroy', 'sans-serif'],
        'gilroy-semi': ['Gilroy', 'sans-serif', '600'],
        'gilroy-bold': ['Gilroy', 'sans-serif', 'bold'],
      },
    },
  },
  plugins: [],
};