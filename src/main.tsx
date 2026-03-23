import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import App from "./App.tsx";
import "./index.css";

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
