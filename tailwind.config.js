/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mas: {
          bg: "#05070b",
          card: "#10131b",
          text: "#f9fafb",
          muted: "#9ca3af",
          primary: "#ff8a2a",
          accent: "#00b8ff",
          line: "rgba(148, 163, 184, 0.18)",
          gold: "#d4b86a",
          goldMuted: "#c6a24a",
        },
      },
      fontFamily: {
        playfair: ['"Playfair Display"', "Georgia", "Times New Roman", "serif"],
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "Noto Sans",
          "sans-serif",
        ],
      },
      boxShadow: {
        mas: "0 18px 40px rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [],
};
