/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        naslov: ["Vollkorn", "serif"],
        telo: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
