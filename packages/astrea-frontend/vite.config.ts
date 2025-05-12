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
        allowedHosts: ['3827-2a09-bac5-506b-137-00-1f-a3.ngrok-free.app'], // Add this line
    },
});
