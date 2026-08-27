import { timingSafeEqual, createHash } from "node:crypto";
import { getStore } from "@netlify/blobs";
import type { Config, Context } from "@netlify/functions";

const CONTENT_KEY = "site-content";
const ALLOWED_KEYS = [
  "heroTitle", "heroSubtitle", "noticeTitle", "section1Title", "section2Title",
  "section3Title", "section4Title", "section5Title", "memberTitle", "memberDescription",
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
  section1Title: textEntry("지금 바로 확인해야 할 '결제/주의사항'", "#262626", 700, 2.25),
  section2Title: textEntry("활동지원사 기본 서류 및 행정 안내", "#262626", 700, 2.25),
  section3Title: textEntry("비대면 서비스제공 보고", "#262626", 700, 2.25),
  section4Title: textEntry("업무 서식 참조", "#262626", 700, 2.25),
  section5Title: textEntry("활동지원사 꿀팁", "#262626", 700, 2.25),
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
    if (!entry || typeof entry.text !== "string" || entry.text.length > 300) return null;
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
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ?? "";
  if (!expectedHash || !token) return false;
  const provided = createHash("sha256").update(token).digest();
  const expected = Buffer.from(expectedHash, "hex");
  return provided.length === expected.length && timingSafeEqual(provided, expected);
};

export default async (request: Request, context: Context) => {
  const store = getStore({ name: "easy-guide-pro-content", consistency: "strong" });

  if (request.method === "GET") {
    const stored = await store.get(CONTENT_KEY, { type: "json" });
    return json(mergeStoredContent(stored), 200, true);
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
