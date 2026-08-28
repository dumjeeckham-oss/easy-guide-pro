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
  noticeBody: textEntry("# 📌 최신 공지사항\n공지사항 내용을 확인하시려면 이 영역을 눌러주세요.\n! 👆 새 창에서 열립니다 (더 빠르고 안정적)", "#737373", 400, 1.125),
  section1Title: textEntry("지금 바로 확인해야 할 '결제/주의사항'", "#262626", 700, 2.25),
  voucherWarningsBody: textEntry(`- 활동지원급여는 수급자 본인만을 위해 제공해야 함
- 급여제공 시간은 활동지원사가 수급자의 가정에 도착했을 때부터 필요한 서비스를 제공하기 위한 준비, 서비스의 제공 및 마무리에 소요되는 총시간을 말함
- 수면시간 등 실제로 서비스 제공이 이뤄지지 않는 단순 대기시간에 대해서는 서비스 제공시간으로 인정되지 않음
- 활동지원사의 이동에 소요되는 교통비는 따로 산정하지 아니함
! 개인정보 보호 : 업무상 알게 된 수급자의 개인정보에 관한 비밀 엄수
- 부적절한 급여 제공, 수급자 학대 등 불미스러운 사례 발생에 주의
! 이용자의 부재시 결제 및 바우처 카드 소지는 금지
- 활동지원인력이 부득이한 사정으로 급여 제공을 중단하고자 할 경우에는 중단일 14일 이전에 이용자 및 활동지원기관에 통보하여야 함
! 급여를 제공하지 않고 비용을 청구하거나 실제 제공한 급여 이상을 청구하는 행위는 부정결제로 금지
! 수급자에게 폭행·상해를 입히거나 성적 수치심을 주는 행위는 금지
- 이용자를 내다 버리거나 의식주를 포함한 보호 및 간병 등을 소홀히 하는 경우 금지`, "#262626", 400, 1.125),
  voucherTimeBody: textEntry(`# 1) 보건복지부 바우처시간
보건복지부에서 나오는 바우처 급여시간이 해당월에 다 사용하지 못하고 남은 경우 당해년도까지 이월이 가능합니다.
그러나 년도가 바뀌면 이월이 불가하고 모두 소멸됩니다.
또한 바우처 시간이 해당월의 시간 이상 남아있는 경우에는 새 시간이 생성되지 않습니다.

# 한달 100시간 생성되는 이용자의 경우
- 예시① 1월에 50시간이 남으면 2월 생성 100시간과 합쳐 총 150시간 사용 가능
- 예시② 2월 말 100시간이 남으면 3월에 새 시간이 생성되지 않음
! 예시③ 전년도 12월 잔여 시간은 다음 해 1월로 이월되지 않고 소멸

# 2) 시추가·도추가 지원 바우처
보건복지부 바우처 시간을 모두 사용하고도 시간이 부족한 경우 시추가·도추가를 받게 됩니다.
! 시추가·도추가는 사용하지 못해도 이월되지 않습니다.
! 보건복지부 시간을 모두 사용해야 시추가·도추가 시간을 사용할 수 있습니다.
! 보건복지부 시간이 1분이라도 남아 있으면 추가 시간으로 결제가 넘어가지 않습니다.`, "#262626", 400, 1.125),
  section2Title: textEntry("활동지원사 기본 서류 및 행정 안내", "#262626", 700, 2.25),
  employmentDocumentsBody: textEntry(`# 안녕하세요~
부천의료복지사회적협동조합 동백 장애인활동지원센터입니다^^
입사서류 안내 드립니다!

- 폰 셀카사진(본인) 1장 - 명찰용
- 주민등록등본 1부
- (정신질환, 마약검사) 건강진단서 결과 1부
- 통장사본 (농협) 1부
- 장애인활동지원사 이수증 사본 1부
- (2017년 3월 이전의 이수증) 현장 실습일지 중 1부
- 장애인활동지원기관의 경력증명서/재직증명서
- 장애인의 경우 장애인증명서 1부
- 피성년후견인, 피한정후견인 부존재 증명서 1부
- 피부양자 등록 원할 시: 피부양자대상자기준 가족관계증명서상세본`, "#262626", 400, 1.125),
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
