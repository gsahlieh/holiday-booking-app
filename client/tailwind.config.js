/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "trav": "url(/src/assets/travel.jpeg)"
      }
    },
  },
  plugins: [],
}