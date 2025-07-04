import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), tailwindcss(), svgr()],
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080/",
        },
        allowedHosts: ['0ae9-2a09-bac5-5069-137-00-1f-b1.ngrok-free.app'], // Add this line
    },
});
