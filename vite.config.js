// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 在 vercel dev 模式下，不需要代理配置
  // Vercel 会自动处理 /api 路由
});
