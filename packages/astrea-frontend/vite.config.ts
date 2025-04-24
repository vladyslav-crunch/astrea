import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:8080/",
        },
        allowedHosts: ['4a0f-2a09-bac5-506c-280a-00-3fd-4a.ngrok-free.app'], // Add this line
    },
});
