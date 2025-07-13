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
        allowedHosts: ['b28e8c26361d.ngrok-free.app'], // Add this line
    },
});
