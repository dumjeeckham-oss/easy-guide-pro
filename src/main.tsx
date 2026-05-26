import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

// GitHub Pages SPA fallback: ?/path 를 실제 경로로 복원
if (window.location.search.startsWith("?/")) {
  const decodedPath = window.location.search.slice(2);
  const basePath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  const cleanPath = decodedPath ? `${basePath}/${decodedPath}` : `${basePath}/`;
  window.history.replaceState(null, "", `${cleanPath}${window.location.hash}`);
}

// 서비스 워커 등록 - 새 버전 감지 시 즉시 자동 새로고침
registerSW({
  onNeedRefresh() {
    // 새 버전이 있으면 즉시 업데이트 적용
    window.location.reload();
  },
  onOfflineReady() {},
  immediate: true,
});

createRoot(document.getElementById("root")!).render(<App />);
