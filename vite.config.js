import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
    }),
  ],
  base: "/", // Replace with your repository name
  build: {
    outDir: "dist", // Output directory
  },
});