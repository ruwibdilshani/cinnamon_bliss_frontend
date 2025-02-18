/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      brown: {
        50: "#f5ebe0",
        100: "#eddcd2",
        200: "#e3bfae",
        300: "#c9a68d",
        400: "#b08968",
        500: "#8b5e3c",
        600: "#7a4e2a",
        700: "#633d1f",
        800: "#4e2d16",
        900: "#3b1d0f",
      },
    },
  },
  plugins: [],
}

