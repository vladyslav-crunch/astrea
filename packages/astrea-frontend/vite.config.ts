import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080/",
        },
        allowedHosts: ['3827-2a09-bac5-506b-137-00-1f-a3.ngrok-free.app'], // Add this line
    },
});
