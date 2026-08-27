const labels = {
  heroTitle: "첫 화면 큰 제목",
  heroSubtitle: "첫 화면 보조 제목",
  noticeTitle: "주간 공지사항 제목",
  section1Title: "결제/주의사항 구역 제목",
  section2Title: "기본 서류 구역 제목",
  section3Title: "비대면 서비스 구역 제목",
  section4Title: "업무 서식 구역 제목",
  section5Title: "활동지원사 꿀팁 구역 제목",
  memberTitle: "조합원 가입 제목",
  memberDescription: "조합원 가입 설명",
  communicationTitle: "소통채널 제목",
  communicationDescription: "소통채널 설명",
  footerTitle: "하단 문의 제목",
};

const loginCard = document.querySelector("#login-card");
const tokenInput = document.querySelector("#admin-token");
const unlockButton = document.querySelector("#unlock-button");
const lockButton = document.querySelector("#lock-button");
const editor = document.querySelector("#editor");
const fields = document.querySelector("#fields");
const status = document.querySelector("#status");
const saveButton = document.querySelector("#save-button");

let content = null;

const setStatus = (message, isError = false) => {
  status.textContent = message;
  status.style.color = isError ? "#b42318" : "#376343";
};

const renderFields = () => {
  fields.replaceChildren(...Object.entries(content).map(([key, entry]) => {
    const card = document.createElement("section");
    card.className = "field-card";
    card.dataset.key = key;
    card.innerHTML = `
      <h2>${labels[key] ?? key}</h2>
      <label>
        <span class="sr-only">문구 내용</span>
        <textarea name="text" maxlength="300"></textarea>
      </label>
      <div class="style-grid">
        <label>글자색<input name="color" type="color" /></label>
        <label>굵기
          <select name="fontWeight">
            <option value="400">보통</option>
            <option value="600">약간 굵게</option>
            <option value="700">굵게</option>
            <option value="800">매우 굵게</option>
            <option value="900">가장 굵게</option>
          </select>
        </label>
        <label>크기 (rem)<input name="fontSize" type="number" min="0.75" max="4" step="0.125" /></label>
      </div>`;
    card.querySelector('[name="text"]').value = entry.text;
    card.querySelector('[name="color"]').value = entry.color;
    card.querySelector('[name="fontWeight"]').value = String(entry.fontWeight);
    card.querySelector('[name="fontSize"]').value = String(entry.fontSize);
    return card;
  }));
};

const loadEditor = async () => {
  unlockButton.disabled = true;
  try {
    const response = await fetch("/api/content", { cache: "no-store" });
    if (!response.ok) throw new Error("콘텐츠를 불러오지 못했습니다.");
    content = await response.json();
    sessionStorage.setItem("cmsAdminToken", tokenInput.value);
    renderFields();
    loginCard.hidden = true;
    editor.hidden = false;
    setStatus("편집할 준비가 되었습니다.");
  } catch (error) {
    alert(error instanceof Error ? error.message : "콘텐츠를 불러오지 못했습니다.");
  } finally {
    unlockButton.disabled = false;
  }
};

unlockButton.addEventListener("click", loadEditor);
tokenInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loadEditor();
});

lockButton.addEventListener("click", () => {
  sessionStorage.removeItem("cmsAdminToken");
  tokenInput.value = "";
  editor.hidden = true;
  loginCard.hidden = false;
  content = null;
});

editor.addEventListener("submit", async (event) => {
  event.preventDefault();
  saveButton.disabled = true;
  setStatus("저장 중…");

  const nextContent = Object.fromEntries([...fields.querySelectorAll(".field-card")].map((card) => [
    card.dataset.key,
    {
      text: card.querySelector('[name="text"]').value,
      color: card.querySelector('[name="color"]').value,
      fontWeight: Number(card.querySelector('[name="fontWeight"]').value),
      fontSize: Number(card.querySelector('[name="fontSize"]').value),
    },
  ]));

  try {
    const response = await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("cmsAdminToken") ?? ""}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextContent),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "저장하지 못했습니다.");
    content = nextContent;
    setStatus(`저장 완료 · ${new Date(result.updatedAt).toLocaleString("ko-KR")}`);
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "저장하지 못했습니다.", true);
  } finally {
    saveButton.disabled = false;
  }
});

const savedToken = sessionStorage.getItem("cmsAdminToken");
if (savedToken) tokenInput.value = savedToken;
