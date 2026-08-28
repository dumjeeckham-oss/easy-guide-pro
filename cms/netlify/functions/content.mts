import { timingSafeEqual, createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

const CONTENT_KEY = "site-content";
const ALLOWED_KEYS = [
  "heroTitle", "heroSubtitle", "noticeTitle", "noticeBody", "section1Title",
  "voucherWarningsBody", "voucherTimeBody", "section2Title", "employmentDocumentsBody", "officeAddress",
  "section3Title", "section3Description", "section4Title", "section5Title", "toiletDescription", "memberTitle", "memberDescription",
  "communicationTitle", "communicationDescription", "footerTitle",
  "welfareStatusImage", "scheduleImage", "provisionRecordImage", "weeklyReportImage",
] as const;

const textEntry = (text: string, color: string, fontWeight: number, fontSize: number) => ({
  text, color, fontWeight, fontSize, imageUrl: "", imageAlt: "", displayMode: "text" as const,
});
const imageEntry = (alt: string) => ({
  text: alt, color: "#262626", fontWeight: 700, fontSize: 1, imageUrl: "", imageAlt: alt, displayMode: "image" as const,
});

const DEFAULT_CONTENT = {
  heroTitle: textEntry("활동지원사님의\n든든한 파트너", "#262626", 700, 3),
  heroSubtitle: textEntry("지금 당장 필요한 정보만\n알려드립니다.", "#262626", 700, 1.875),
  noticeTitle: textEntry("📢 이번주의 공지사항 살펴보기 (클릭하여 자세히 보기)", "#262626", 700, 1.25),
  noticeBody: textEntry("# 📌 최신 공지사항\n공지사항 내용을 확인하시려면 이 영역을 눌러주세요.\n! 👆 새 창에서 열립니다 (더 빠르고 안정적)", "#737373", 400, 1.125),
  section1Title: textEntry("지금 바로 확인해야 할 '결제/주의사항'", "#262626", 700, 2.25),
  voucherWarningsBody: textEntry("- 활동지원급여는 수급자 본인만을 위해 제공해야 함\n- 급여제공 시간에는 실제 서비스 제공 및 준비·마무리 시간이 포함됨\n- 실제 서비스가 제공되지 않는 단순 대기시간은 인정되지 않음\n! 개인정보 보호 : 업무상 알게 된 수급자의 개인정보에 관한 비밀 엄수\n! 이용자 부재 시 결제 및 바우처 카드 소지는 금지\n! 급여를 제공하지 않고 비용을 청구하는 행위는 부정결제로 금지", "#262626", 400, 1.125),
  voucherTimeBody: textEntry("# 1) 보건복지부 바우처시간\n해당 월에 사용하지 못한 시간은 당해년도까지 이월 가능합니다.\n! 년도가 바뀌면 남은 시간은 소멸됩니다.\n\n# 2) 시추가·도추가 지원 바우처\n보건복지부 시간을 모두 사용한 뒤 추가 시간을 사용할 수 있습니다.\n! 시추가·도추가는 이월되지 않습니다.", "#262626", 400, 1.125),
  section2Title: textEntry("활동지원사 기본 서류 및 행정 안내", "#262626", 700, 2.25),
  employmentDocumentsBody: textEntry("# 입사서류 안내\n- 폰 셀카사진(본인) 1장 - 명찰용\n- 주민등록등본 1부\n- 건강진단서 결과 1부\n- 통장사본 (농협) 1부\n- 장애인활동지원사 이수증 사본 1부\n- 경력증명서/재직증명서", "#262626", 400, 1.125),
  officeAddress: textEntry("부천시 원미로 97번길 31, 3층\n(원미동)", "#262626", 700, 1.5),
  section3Title: textEntry("비대면 서비스제공 보고", "#262626", 700, 2.25),
  section3Description: textEntry("이용자의 거동이 어려워 활동지원사가 이용자의 요청으로 잠시 이용자와 떨어져야 할 경우에는 반드시 사전에 아래 보고서를 작성하셔야 합니다.", "#737373", 400, 1.125),
  section4Title: textEntry("업무 서식 참조", "#262626", 700, 2.25),
  section5Title: textEntry("활동지원사 꿀팁", "#262626", 700, 2.25),
  toiletDescription: textEntry("공중화장실 지도입니다.\n지도를 손가락으로 넓혀서 내 인근의 화장실을 찾아보세요.", "#737373", 400, 1.125),
  memberTitle: textEntry("조합원 가입 안내", "#262626", 700, 2.25),
  memberDescription: textEntry("부천의료복지사회적협동조합의 조합원이 되어 함께해주세요!", "#737373", 600, 1.125),
  communicationTitle: textEntry("동백 소통채널", "#262626", 700, 2.25),
  communicationDescription: textEntry("카카오톡 채널을 통해 동백과 더 빠르게 소통할 수 있습니다.", "#737373", 600, 1.125),
  footerTitle: textEntry("문의사항이 있으시면 언제든지 전화주세요", "#ffffff", 700, 1.25),
  welfareStatusImage: imageEntry("동백센터 복지현황"),
  scheduleImage: imageEntry("급여제공 일정표"),
  provisionRecordImage: imageEntry("활동지원급여 제공기록지"),
  weeklyReportImage: imageEntry("주간 업무 보고"),
};

type ContentEntry = {
  text: string; color: string; fontWeight: number; fontSize: number;
  imageUrl: string; imageAlt: string; displayMode: "text" | "image" | "both";
};
type Content = Record<(typeof ALLOWED_KEYS)[number], ContentEntry>;

const json = (body: unknown, status = 200, publicRead = false) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    ...(publicRead ? { "Access-Control-Allow-Origin": "*" } : {}),
  },
});

const validateContent = (value: unknown): Content | null => {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  if (Object.keys(record).some((key) => !ALLOWED_KEYS.includes(key as typeof ALLOWED_KEYS[number]))) return null;

  const entries: Array<readonly [string, ContentEntry]> = [];
  for (const key of ALLOWED_KEYS) {
    const entry = record[key] as Partial<ContentEntry> | undefined;
    if (!entry || typeof entry.text !== "string" || entry.text.length > 10000) return null;
    if (typeof entry.color !== "string" || !/^#[0-9a-fA-F]{6}$/.test(entry.color)) return null;
    if (![400, 600, 700, 800, 900].includes(Number(entry.fontWeight))) return null;
    if (typeof entry.fontSize !== "number" || entry.fontSize < 0.75 || entry.fontSize > 4) return null;
    if (typeof entry.imageUrl !== "string" || entry.imageUrl.length > 500) return null;
    if (typeof entry.imageAlt !== "string" || entry.imageAlt.length > 150) return null;
    if (!["text", "image", "both"].includes(String(entry.displayMode))) return null;
    entries.push([key, entry as ContentEntry]);
  }

  return Object.fromEntries(entries) as Content;
};

const mergeStoredContent = (value: unknown): Content => {
  const record = value && typeof value === "object" ? value as Record<string, Partial<ContentEntry>> : {};
  return Object.fromEntries(ALLOWED_KEYS.map((key) => [
    key,
    { ...DEFAULT_CONTENT[key], ...(record[key] ?? {}) },
  ])) as Content;
};

const isAuthorized = (request: Request) => {
  const expectedHash = Netlify.env.get("CMS_ADMIN_TOKEN_HASH");
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ?? "";
  if (!expectedHash || !token) return false;
  const provided = createHash("sha256").update(token).digest();
  const expected = Buffer.from(expectedHash, "hex");
  return provided.length === expected.length && timingSafeEqual(provided, expected);
};

export default async (request: Request, context: Context) => {
  const store = getStore({ name: "easy-guide-pro-content", consistency: "strong" });

  if (request.method === "GET") {
    const verifiesAdminKey = new URL(request.url).searchParams.get("verify") === "1";
    if (verifiesAdminKey && !isAuthorized(request)) {
      return json({ error: "관리자 키가 올바르지 않습니다. 키 앞뒤의 공백도 확인해 주세요." }, 401);
    }
    const stored = await store.get(CONTENT_KEY, { type: "json" });
    return json(mergeStoredContent(stored), 200, !verifiesAdminKey);
  }

  if (request.method !== "PUT") return json({ error: "허용되지 않은 요청입니다." }, 405);
  if (!isAuthorized(request)) return json({ error: "관리자 키가 올바르지 않습니다." }, 401);

  try {
    const content = validateContent(await request.json());
    if (!content) return json({ error: "문구 또는 글자 스타일 값이 올바르지 않습니다." }, 400);
    const updatedAt = new Date().toISOString();
    await store.setJSON(CONTENT_KEY, content);
    console.log(JSON.stringify({ event: "cms_content_updated", requestId: context.requestId, updatedAt }));
    return json({ success: true, updatedAt });
  } catch (error) {
    console.error(JSON.stringify({ event: "cms_content_update_failed", requestId: context.requestId, error: String(error) }));
    return json({ error: "저장 중 오류가 발생했습니다." }, 500);
  }
};

export const config: Config = { path: "/api/content" };
