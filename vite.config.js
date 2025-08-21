// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        // 关键：把 /api 前缀去掉，转发为 /xxx
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});