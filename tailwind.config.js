/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // These colors are from the branding bible - don't ask me 🤷‍♂️
        "red-primary": "#9A0000",
        "red-secondary": "#C80F14",
        "grey-primary": "#CCCCCC",
        "black-primary": "#1A1A1A",
        "off-black": "#333333",
        // actual app colors
        "red-warning": "#ef4444",
        "red-error": "#dc2626",
        "green-confirm": "#4ade80",
        "neutral-blue": "#38bdf8",
        dark: "#1A1A1A",
        light: "#F5F5F5",
      },
      fontFamily: {
        brand: ["Teko", "sans-serif"],
        body: ["Roboto", "sans-serif"],
      },
      screens: {
        xs: "475px",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
