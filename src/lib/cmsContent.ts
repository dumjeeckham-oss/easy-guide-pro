export type CmsTextStyle = {
  color: string;
  fontWeight: 400 | 600 | 700 | 800 | 900;
  fontSize: number;
};

export type CmsTextEntry = CmsTextStyle & {
  text: string;
};

export const defaultCmsContent = {
  heroTitle: { text: "활동지원사님의\n든든한 파트너", color: "#262626", fontWeight: 700, fontSize: 3 },
  heroSubtitle: { text: "지금 당장 필요한 정보만\n알려드립니다.", color: "#262626", fontWeight: 700, fontSize: 1.875 },
  noticeTitle: { text: "📢 이번주의 공지사항 살펴보기 (클릭하여 자세히 보기)", color: "#262626", fontWeight: 700, fontSize: 1.25 },
  section1Title: { text: "지금 바로 확인해야 할 '결제/주의사항'", color: "#262626", fontWeight: 700, fontSize: 2.25 },
  section2Title: { text: "활동지원사 기본 서류 및 행정 안내", color: "#262626", fontWeight: 700, fontSize: 2.25 },
  section3Title: { text: "비대면 서비스제공 보고", color: "#262626", fontWeight: 700, fontSize: 2.25 },
  section4Title: { text: "업무 서식 참조", color: "#262626", fontWeight: 700, fontSize: 2.25 },
  section5Title: { text: "활동지원사 꿀팁", color: "#262626", fontWeight: 700, fontSize: 2.25 },
  memberTitle: { text: "조합원 가입 안내", color: "#262626", fontWeight: 700, fontSize: 2.25 },
  memberDescription: { text: "부천의료복지사회적협동조합의 조합원이 되어 함께해주세요!", color: "#737373", fontWeight: 600, fontSize: 1.125 },
  communicationTitle: { text: "동백 소통채널", color: "#262626", fontWeight: 700, fontSize: 2.25 },
  communicationDescription: { text: "카카오톡 채널을 통해 동백과 더 빠르게 소통할 수 있습니다.", color: "#737373", fontWeight: 600, fontSize: 1.125 },
  footerTitle: { text: "문의사항이 있으시면 언제든지 전화주세요", color: "#ffffff", fontWeight: 700, fontSize: 1.25 },
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
      }];
    }),
  ) as CmsContent;
};
