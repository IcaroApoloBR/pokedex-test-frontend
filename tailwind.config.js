/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    darkMode: false,
    extend: {
      colors: {
        darkPrimary: "#121214",
        darkSecondary: "#424242",
        whitePrimary: "#fff",
        whiteSecondary: "#F7F6F3",
        colorPrimary: "#2a75bb",
        colorSecondary: "#3c5aa6",
        yellowPrimary: "#ffcb05",
        yellowSecondary: "#c7a008",
        redPrimary: "#FF0000",
        redSecondary: "#CC0000"
      },
      screens: {
        'mobile': { 'max': '425px' },
        'tablet': { 'max': '768px' },
        'notebook': { 'min': '1024px', 'max': '1440px' },
      },
      backgroundImage: {
        "hero-login":
          "url('/hero-login.jpg')",
        "pattern-home":
          "url('/bbq-pattern.png')",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}