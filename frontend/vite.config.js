// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Dev server (when you run `vite` or `npm run dev` locally)
  server: {
    host: true,                 // listen on 0.0.0.0
    port: 3000,
    allowedHosts: ["nossalista.plets.win"], // allow your public hostname
    proxy: {
      // dev-only proxy: /api -> backend container
      "/api": {
        target: "http://movie-backend:5000",
        changeOrigin: true,
      },
    },
  },

  // Production preview server (what your Docker image runs with `vite preview`)
  preview: {
    host: true,                 // listen on 0.0.0.0
    port: 3000,
    // allow Cloudflare Tunnel hostname
    allowedHosts: ["nossalista.plets.win"],
  },
});
