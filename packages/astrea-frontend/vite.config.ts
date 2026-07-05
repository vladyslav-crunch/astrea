import path from "path";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react() as unknown as PluginOption,
    tailwindcss() as unknown as PluginOption,
    svgr() as unknown as PluginOption,
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["b28e8c26361d.ngrok-free.app"],
  },
});
