const labels = {
  heroTitle: "첫 화면 큰 제목",
  heroSubtitle: "첫 화면 보조 제목",
  noticeTitle: "주간 공지사항 제목",
  noticeBody: "주간 공지사항 하위 내용",
  section1Title: "결제/주의사항 구역 제목",
  voucherWarningsBody: "바우처 결제 유의사항 하위 내용",
  voucherTimeBody: "바우처시간 안내 하위 내용",
  section2Title: "기본 서류 구역 제목",
  employmentDocumentsBody: "입사서류 하위 내용",
  officeAddress: "동백 사무실 주소",
  section3Title: "비대면 서비스 구역 제목",
  section3Description: "비대면 서비스 하위 설명",
  section4Title: "업무 서식 구역 제목",
  section5Title: "활동지원사 꿀팁 구역 제목",
  toiletDescription: "공중화장실 안내 하위 내용",
  memberTitle: "조합원 가입 제목",
  memberDescription: "조합원 가입 설명",
  communicationTitle: "소통채널 제목",
  communicationDescription: "소통채널 설명",
  footerTitle: "하단 문의 제목",
  welfareStatusImage: "복지현황 이미지",
  scheduleImage: "급여제공 일정표 이미지",
  provisionRecordImage: "활동지원급여 제공기록지 이미지",
  weeklyReportImage: "주간 업무 보고 이미지",
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
        <textarea name="text" maxlength="10000"></textarea>
        ${key.endsWith("Body") ? '<small class="format-help">줄 앞에 <b># </b>를 쓰면 소제목, <b>- </b>를 쓰면 글머리표, <b>! </b>를 쓰면 빨간 강조문이 됩니다.</small>' : ""}
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
      </div>
      <div class="media-box">
        <label>표시 방법
          <select name="displayMode">
            <option value="text">글자만</option>
            <option value="image">이미지만</option>
            <option value="both">이미지와 글자</option>
          </select>
        </label>
        <label>이미지 설명<input name="imageAlt" type="text" maxlength="150" placeholder="이미지 내용을 짧게 설명하세요" /></label>
        <label>이미지 선택<input name="imageFile" type="file" accept="image/png,image/jpeg,image/webp,image/gif" /></label>
        <button class="secondary upload-button" type="button">선택한 이미지 올리기</button>
        <input name="imageUrl" type="hidden" />
        <img class="image-preview" alt="" hidden />
        <small>JPG, PNG, WEBP, GIF · 최대 5MB</small>
      </div>`;
    card.querySelector('[name="text"]').value = entry.text;
    card.querySelector('[name="color"]').value = entry.color;
    card.querySelector('[name="fontWeight"]').value = String(entry.fontWeight);
    card.querySelector('[name="fontSize"]').value = String(entry.fontSize);
    card.querySelector('[name="displayMode"]').value = entry.displayMode ?? "text";
    card.querySelector('[name="imageAlt"]').value = entry.imageAlt ?? "";
    card.querySelector('[name="imageUrl"]').value = entry.imageUrl ?? "";
    const preview = card.querySelector(".image-preview");
    if (entry.imageUrl) {
      preview.src = entry.imageUrl;
      preview.alt = entry.imageAlt || labels[key] || key;
      preview.hidden = false;
    }
    return card;
  }));
};

fields.addEventListener("click", async (event) => {
  const button = event.target.closest(".upload-button");
  if (!button) return;
  const card = button.closest(".field-card");
  const file = card.querySelector('[name="imageFile"]').files[0];
  if (!file) return setStatus("먼저 이미지 파일을 선택해 주세요.", true);
  if (file.size > 5 * 1024 * 1024) return setStatus("이미지는 5MB 이하여야 합니다.", true);

  button.disabled = true;
  setStatus("이미지를 올리는 중…");
  try {
    const response = await fetch("/api/media", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${sessionStorage.getItem("cmsAdminToken") ?? ""}`,
        "Content-Type": file.type,
      },
      body: file,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "이미지를 올리지 못했습니다.");
    card.querySelector('[name="imageUrl"]').value = result.url;
    const preview = card.querySelector(".image-preview");
    preview.src = result.url;
    preview.alt = card.querySelector('[name="imageAlt"]').value || labels[card.dataset.key];
    preview.hidden = false;
    if (card.querySelector('[name="displayMode"]').value === "text") {
      card.querySelector('[name="displayMode"]').value = "image";
    }
    setStatus("이미지를 올렸습니다. 마지막으로 ‘모든 변경 저장’을 눌러 주세요.");
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "이미지를 올리지 못했습니다.", true);
  } finally {
    button.disabled = false;
  }
});

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
      imageUrl: card.querySelector('[name="imageUrl"]').value,
      imageAlt: card.querySelector('[name="imageAlt"]').value,
      displayMode: card.querySelector('[name="displayMode"]').value,
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
