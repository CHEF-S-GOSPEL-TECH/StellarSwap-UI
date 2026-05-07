/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // StellarSwap brand palette — adjust as design evolves
        brand: {
          DEFAULT: "#7C3AED", // primary purple
          dark: "#5B21B6",
          light: "#A78BFA",
        },
        surface: {
          DEFAULT: "#0F0F1A",
          card: "#1A1A2E",
          border: "#2D2D4E",
        },
      },
    },
  },
  plugins: [],
};
