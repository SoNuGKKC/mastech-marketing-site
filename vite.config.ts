import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "MAS TECH — AI Software Solutions",
        short_name: "MAS TECH",
        description: "Custom Hospital OS, Retail POS, School ERP, and AI Chatbots for Gujarat businesses.",
        theme_color: "#05070b",
        background_color: "#05070b",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/branding/mas-trishul-seal.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
  },
});
