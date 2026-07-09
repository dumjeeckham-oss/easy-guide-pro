import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// 서브도메인(support.dong100.org)은 루트(/) 경로를 사용하므로 base를 "/"로 설정합니다.
const appBase = "/"; 

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: appBase,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt"],
      manifest: {
        name: "동백 활동지원사 업무 도우미",
        short_name: "동백 도우미",
        description: "활동지원사님을 위한 가장 빠르고 쉬운 업무 안내",
        theme_color: "#E74C3C",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: appBase,
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
