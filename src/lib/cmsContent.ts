export type CmsTextStyle = {
  color: string;
  fontWeight: 400 | 600 | 700 | 800 | 900;
  fontSize: number;
};

export type CmsTextEntry = CmsTextStyle & {
  text: string;
  imageUrl: string;
  imageAlt: string;
  displayMode: "text" | "image" | "both";
};

const textEntry = (text: string, color: string, fontWeight: CmsTextStyle["fontWeight"], fontSize: number): CmsTextEntry => ({
  text, color, fontWeight, fontSize, imageUrl: "", imageAlt: "", displayMode: "text",
});

const imageEntry = (alt: string): CmsTextEntry => ({
  text: alt, color: "#262626", fontWeight: 700, fontSize: 1, imageUrl: "", imageAlt: alt, displayMode: "image",
});

export const defaultCmsContent = {
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
} satisfies Record<string, CmsTextEntry>;

export type CmsContent = typeof defaultCmsContent;
export type CmsContentKey = keyof CmsContent;

export const CMS_API_URL = "https://easy-guide-pro-cms.netlify.app/api/content";

export const mergeCmsContent = (value: unknown): CmsContent => {
  if (!value || typeof value !== "object") return defaultCmsContent;

  return Object.fromEntries(
    Object.entries(defaultCmsContent).map(([key, fallback]) => {
      const candidate = (value as Record<string, unknown>)[key];
      if (!candidate || typeof candidate !== "object") return [key, fallback];

      const entry = candidate as Partial<CmsTextEntry>;
      return [key, {
        text: typeof entry.text === "string" ? entry.text : fallback.text,
        color: typeof entry.color === "string" ? entry.color : fallback.color,
        fontWeight: [400, 600, 700, 800, 900].includes(Number(entry.fontWeight))
          ? Number(entry.fontWeight) as CmsTextStyle["fontWeight"]
          : fallback.fontWeight,
        fontSize: typeof entry.fontSize === "number" && entry.fontSize >= 0.75 && entry.fontSize <= 4
          ? entry.fontSize
          : fallback.fontSize,
        imageUrl: typeof entry.imageUrl === "string" ? entry.imageUrl : fallback.imageUrl,
        imageAlt: typeof entry.imageAlt === "string" ? entry.imageAlt : fallback.imageAlt,
        displayMode: ["text", "image", "both"].includes(String(entry.displayMode))
          ? entry.displayMode as CmsTextEntry["displayMode"]
          : fallback.displayMode,
      }];
    }),
  ) as CmsContent;
};
