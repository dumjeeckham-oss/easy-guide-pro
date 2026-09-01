import { FileText, ShoppingCart, AlertCircle, MapPin, Users, Lightbulb, Heart, MapPinned } from "lucide-react";
import { CanvaViewer } from "@/components/CanvaViewer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FloatingNav } from "@/components/FloatingNav";
import { CmsImage, CmsRichText, CmsText } from "@/components/CmsText";

import welfareStatusImg from "@/assets/welfare-status.png";
import scheduleImg from "@/assets/schedule.png";
import provisionRecordImg from "@/assets/provision-record.png";
import weeklyReportImg from "@/assets/weekly-report.png";
import dongbaekLogo from "@/assets/dongbaek-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNav />

      {/* Section 0: Hero Section */}
      <section id="hero" className="bg-background pt-36 md:pt-40 pb-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* 동백센터 로고 */}
          <div className="flex justify-center mb-6">
            <img src={`${dongbaekLogo}?v=20260827-2`} alt="동백 장애인활동지원센터 로고" className="h-24 md:h-32 w-auto" />
          </div>

          <CmsText contentKey="heroTitle" as="h1" className="leading-tight" />
          <CmsText contentKey="heroSubtitle" as="h2" className="leading-tight" />

          {/* Notice Banner */}
          <a
            href="https://feline-clarinet-1dd.notion.site/2c43f84ca160805ba164c94fb1642186"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Card className="bg-primary/10 border-4 border-primary overflow-hidden hover:bg-primary/20 active:bg-primary/30 transition-colors cursor-pointer shadow-xl">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-lg font-extrabold shadow-sm">
                    📢 공지사항
                  </span>
                </div>
                <CmsText contentKey="noticeTitle" as="p" className="text-center leading-tight" />
              </div>
              <div className="relative overflow-hidden border-t-4 border-primary/30 bg-card">
                <div className="p-5 md:p-6">
                  <CmsRichText contentKey="noticeBody" className="space-y-2" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent" />
              </div>
            </Card>
          </a>

          {/* 동백 홈페이지 바로가기 */}
          <a href="https://dong100.org" target="_blank" rel="noopener noreferrer" className="block">
            <Card className="bg-primary/10 border-2 border-primary/20 p-6 hover:bg-primary/20 transition-colors cursor-pointer rounded-lg shadow-sm">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌐</span>
                  <div className="text-left">
                    <p className="text-xl font-extrabold text-foreground">동백 홈페이지 바로가기</p>
                    <p className="text-sm text-muted-foreground font-semibold">dong100.org</p>
                  </div>
                </div>
                <span className="text-primary font-extrabold text-lg flex items-center gap-1">바로가기 ➔</span>
              </div>
            </Card>
          </a>

        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 1: Payment Guidelines */}
      <section id="section1" className="py-12 px-6 md:px-12 bg-muted">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center mb-8 flex items-center justify-center gap-3">
            <AlertCircle className="w-10 h-10 text-primary" />
            <CmsText contentKey="section1Title" />
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {/* 바우처 결제시 유의사항 */}
            <AccordionItem value="item-2" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                ⚠️ 바우처 결제시 유의사항
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed space-y-3 pt-4">
                <CmsRichText contentKey="voucherWarningsBody" className="space-y-3" />
                {/*
                <ul className="space-y-3 list-disc list-inside">
                  <li>활동지원급여는 수급자 본인만을 위해 제공해야 함</li>
                  <li>급여제공 시간은 활동지원사가 수급자의 가정에 도착했을 때부터 필요한 서비스를 제공하기 위한 준비, 서비스의 제공 및 마무리에 소요되는 총시간을 말함</li>
                  <li>수면시간 등 실제로 서비스 제공이 이뤄지지 않는 단순 대기시간에 대해서는 서비스 제공시간으로 인정되지 않음</li>
                  <li>활동지원사의 이동에 소요되는 교통비는 따로 산정하지 아니함</li>
                  <li className="font-bold text-destructive">개인정보 보호 : 업무상 알게 된 수급자의 개인정보에 관한 비밀 엄수 (성명, 주소, 연락처, 계좌정보, 고유식별정보, 민감정보, 바우처 정보 등…)</li>
                  <li>부적절한 급여 제공, 수급자 학대 등 불미스러운 사례 발생에 주의</li>
                  <li>활동지원사는 급여제공계획서에 명시된 내용과 시간에 따라 급여를 제공(지각, 조기종료금지)하여야 하고 수급자 동의 없이 급여의 내용이나 시간을 변경해서는 안됨</li>
                  <li className="font-bold text-destructive">고의로 15분씩 늦게(빨리) 결제하여 추가급여를 지급되도록 하여 이용자의 민원 발생 금지</li>
                  <li className="font-bold text-destructive">이용자의 부재시 결제는 부정</li>
                  <li className="font-bold text-destructive">수급자의 바우처 카드를 소지하는 행위는 사용하지 않았다 하더라도 금지행위에 해당함</li>
                  <li className="font-bold text-destructive">친분이 있는 장애인으로부터 바우처카드를 건네 받은 뒤 허위 결제 후 수당을 챙기는 경우 금지</li>
                  <li>활동지원인력의 개인활동에 이용자를 대동하는 것은 이용자와 합의 하였더라도 서비스제공으로 보지 않음</li>
                  <li>활동지원인력이 부득이한 사정으로 급여 제공을 중단하고자 할 경우에는 중단일 14일 이전에 이용자 및 활동지원기관에 통보하여야 함</li>
                  <li>특별한 사유 없이 사전 통보의무를 이행하지 않을 경우 활동지원기관으로부터 불이익을 받을 수 있음</li>
                  <li className="font-bold text-destructive">급여를 제공하지 아니하고 급여 제공 비용을 청구하는 행위는 부정결제로 금지함</li>
                  <li className="font-bold text-destructive">거짓 등 부정한 방법으로 고의로 실제 제공한 급여의 대가 이상으로 급여 제공비용을 청구하는 행위는 부정결제로 금지함</li>
                  <li>실제 서비스를 이용하는 수급자가 아닌 다른 수급자의 카드 또는 실제 서비스를 제공한 활동지원인력이 아닌 다른 활동지원인력의 카드로 결제한 경우는 부정결제로 금지함</li>
                  <li>수급자에게 지급된 활동지원급여 이용권을 그 목적 외의 용도로 사용하게 한 경우</li>
                  <li>영리를 목적으로 본인부담금을 면제하거나 할인하는 행위, 금품 등을 제공하는 등 수급자를 소개, 알선, 유인하는 행위 및 이를 조장하는 경우</li>
                  <li className="font-bold text-destructive">수급자의 신체에 폭행을 하거나 상해를 입히는 행위</li>
                  <li className="font-bold text-destructive">수급자에게 성적 수치심을 주는 성폭행 성희롱 행위</li>
                  <li>자신이 활동지원급여를 제공하는 수급자를 내다 버리거나 의식주를 포함한 보호 및 간병 등을 소홀히 하는 경우</li>
                  <li className="font-bold text-destructive">거짓이나 그 밖의 부정한 방법으로 활동지원급여비용을 받은 경우</li>
                </ul>
                */}
              </AccordionContent>
            </AccordionItem>

            {/* 바우처시간의 이해 */}
            <AccordionItem value="item-3" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                ⏰ 바우처시간의 이해
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed space-y-4 pt-4">
                <CmsRichText contentKey="voucherTimeBody" className="space-y-3" />
                {/*
                <div>
                  <p className="font-bold text-xl mb-2">1) 보건복지부 바우처시간</p>
                  <p className="mb-2">
                    보건복지부에서 나오는 바우처 급여시간이 해당월에 다 사용하지 못하고 남은 경우 당해년도 까지는 이월이 가능합니다.
                  </p>
                  <p className="mb-2">
                    그러나 년도가 바뀌면 이월이 불가하고 모두 소멸됩니다.
                  </p>
                  <p className="mb-4">
                    또한, 바우처 시간이 해당월의 시간 이상 남아있는 경우에도 더이상 시간이 생성되지 않고 해당월의 시간보다 적게 남아있어야 바우처 시간이 새로 생성됩니다.
                  </p>
                  
                  <Card className="bg-accent/10 p-4 space-y-3">
                    <p className="font-bold">한달 100시간 생성되는 이용자의 경우</p>
                    <div className="space-y-2">
                      <p><span className="font-bold">예시①</span> 1월 100시간 생성, 그러나 일부 사용하지 못하여서 50시간이 남은경우, 2월에 100시간 생성+이월 50시간으로 총 150시간 사용가능함.</p>
                      <p><span className="font-bold">예시②</span> 2월에 150시간에서 50시간 사용하고 100시간 남은경우, 3월에 본인부담금을 납부하여도 바우처 시간 생성되지 않음. 2월에 남은 100시간이 그대로 있음.</p>
                      <p><span className="font-bold text-destructive">예시③</span> 2023년 12월에 100시간 중 20시간 사용못하여 남음. 2024년 1월에 20시간 이월 안되고 소멸함! 그렇기에 1월 생성되는 100시간만 사용가능함.</p>
                    </div>
                  </Card>
                </div>

                <div>
                  <p className="font-bold text-xl mb-2">2) 시추가 도추가 지원 바우처</p>
                  <p className="mb-4">
                    보건복지부 바우처 시간을 다 사용하고도 시간이 모자른 경우 시추가 도추가를 받게 됩니다.
                  </p>
                  
                  <Card className="bg-destructive/10 border-2 border-destructive p-4 space-y-2">
                    <p className="font-bold text-destructive text-xl">!!주의!!</p>
                    <p className="font-bold">① 시추가, 도추가는 사용 못해도 이월되지 않음.</p>
                    <p className="font-bold">② 보건복지부 시간을 모두 사용해야지만 시추가 도추가 시간을 사용할 수 있음.</p>
                    <p className="font-bold">③ 보건복지부 시간이 1분이라도 남아있으면 시추가 도추가로 결제가 넘어가지 않음.</p>
                    <p className="mt-2">
                      그래서 매월 말 정도의 시기에는 시간배분을 잘 하셔서 보건복지부 시간을 다 사용하시고 추가시간을 사용하셔야 합니다.
                      시추가 도추가의 시간을 사용 못하시고 월이 넘어가게 되면 어차피 이월이 안되기에 소급결제도 불가하십니다.
                    </p>
                  </Card>
                </div>
                */}
              </AccordionContent>
            </AccordionItem>
            {/* 바우처 결제 방법 */}
            <AccordionItem value="item-voucher" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                💳 바우처 결제 방법
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Accordion type="single" collapsible className="space-y-4">
                  <AccordionItem value="item-6" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      📱 1. 서비스 바우처 결제하기 (스마트폰 바우처 결제)
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="aspect-video">
                        <iframe 
                          src="https://www.youtube.com/embed/nQ02mKJ1fxA" 
                          className="w-full h-full rounded-lg"
                          title="서비스 바우처 결제하기"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6-2" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      📱 2. 소급결제 하기 (스마트폰 바우처 결제)
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="aspect-video">
                        <iframe 
                          src="https://www.youtube.com/embed/Ti_qn1Lp2Yk" 
                          className="w-full h-full rounded-lg"
                          title="소급결제 하기"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6-3" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      📱 3. 서비스 바우처 결제 취소하기 (스마트폰 바우처 결제)
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="aspect-video">
                        <iframe 
                          src="https://www.youtube.com/embed/4WVuH4wuapY" 
                          className="w-full h-full rounded-lg"
                          title="서비스 바우처 결제 취소하기"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 2: Administrative Info */}
      <section id="section2" className="py-12 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center mb-8 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-primary" />
            <CmsText contentKey="section2Title" />
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {/* 입사서류 */}
            <AccordionItem value="item-1" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📋 입사서류
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed space-y-3 pt-4">
                <CmsRichText contentKey="employmentDocumentsBody" className="space-y-3" />
                {/* <p className="font-bold">안녕하세요~</p>
                <p className="font-bold">부천의료복지사회적협동조합 동백 장애인활동지원센터입니다^^</p>
                <p className="font-bold mb-4">입사서류 안내 드립니다!</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>폰 셀카사진(본인) 1장 - 명찰용</li>
                  <li>주민등록등본 1부</li>
                  <li>(정신질환,마약검사)건강진단서 결과 1부</li>
                  <li>통장사본 (농협) 1부</li>
                  <li>장애인활동지원사 이수증 사본 1부</li>
                  <li>(2017년 3월 이전의 이수증)현장 실습일지 중 1부</li>
                  <li>장애인활동지원기관의 경력증명서/재직증명서</li>
                  <li>장애인의 경우 장애인증명서 1부</li>
                   <li>피성년후견인, 피한정후견인 부존재 증명서  1부
                     <br />
                     <a href="https://egdrs.scourt.go.kr/" target="_blank" rel="noopener noreferrer" className="text-primary underline text-sm">
                       👉 인터넷 발급 바로가기 (대법원)
                     </a>
                   </li>
                  <li>피부양자 등록 원할 시: 피부양자대상자기준 가족관계증명서상세본</li>
                </ul> */}
              </AccordionContent>
            </AccordionItem>

            {/* 동백 사무실 주소 */}
            <AccordionItem value="item-4" className="bg-card rounded-lg px-6 border-2">
            <AccordionTrigger className="text-xl font-bold hover:text-primary">
              <div className="flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                동백 사무실 주소 (찾아오는 방법)
              </div>
            </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed pt-4 space-y-4">
                <Card className="bg-primary/10 p-6">
                  <CmsText contentKey="officeAddress" as="p" className="text-center" />
                </Card>
                <div className="flex flex-col gap-3">
                  <a 
                    href="https://map.kakao.com/link/search/경기도 부천시 원미로 97번길 31" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full text-xl py-6 bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/90 font-bold">
                      <MapPinned className="w-6 h-6 mr-2" />
                      카카오맵으로 길찾기
                    </Button>
                  </a>
                  <a 
                    href="https://map.naver.com/p/search/경기도 부천시 원미로 97번길 31" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full text-xl py-6 bg-[#03C75A] text-white hover:bg-[#03C75A]/90 font-bold">
                      <MapPinned className="w-6 h-6 mr-2" />
                      네이버맵으로 길찾기
                    </Button>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* 동백센터 복지현황 */}
            <AccordionItem value="item-5" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  동백센터 복지현황
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <CmsImage contentKey="welfareStatusImage" fallbackSrc={welfareStatusImg} className="w-full h-auto" />
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 3: Special Tasks */}
      <section id="section3" className="py-12 px-6 md:px-12 bg-muted">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center mb-4 flex items-center justify-center gap-3">
            <ShoppingCart className="w-10 h-10 text-primary" />
            <CmsText contentKey="section3Title" />
          </h2>
          <CmsText contentKey="section3Description" as="p" className="text-center mb-8" />

          <div className="flex justify-center">
            <Button
              size="lg"
              asChild
              className="h-auto py-8 px-12 text-xl font-bold flex flex-col gap-3 bg-primary hover:bg-primary/90"
            >
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeBFbqYVJ6CDtMLfeAoLQKRbaMKtQu6ZY7Zk3UZhvRBN6ptLg/viewform?pli=1" target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="w-10 h-10" />
                장보기 업무 보고서 작성하기
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 4: Forms */}
      <section id="section4" className="py-12 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center mb-4 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-primary" />
            <CmsText contentKey="section4Title" />
          </h2>

          <div className="flex justify-center mb-6">
            <Button
              size="lg"
              asChild
              className="h-auto py-5 px-10 text-xl font-extrabold flex items-center gap-3 bg-primary hover:bg-primary/90 shadow-md rounded-lg"
            >
              <a href="https://dong100.org/archive" target="_blank" rel="noopener noreferrer">
                <FileText className="w-6 h-6" />
                📥 서식 다운받기 (동백 홈페이지)
              </a>
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-7" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📅 일정표
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <CmsImage contentKey="scheduleImage" fallbackSrc={scheduleImg} className="w-full h-auto" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📋 제공기록지
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <CmsImage contentKey="provisionRecordImage" fallbackSrc={provisionRecordImg} className="w-full h-auto" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📝 주간 업무 보고
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <CmsImage contentKey="weeklyReportImage" fallbackSrc={weeklyReportImg} className="w-full h-auto" />
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 5: 활동지원사 꿀팁 */}
      <section id="section5" className="py-12 px-6 md:px-12 bg-muted">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center mb-8 flex items-center justify-center gap-3">
            <Lightbulb className="w-10 h-10 text-primary" />
            <CmsText contentKey="section5Title" />
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {/* 부천시 공중 화장실 찾아보기 */}
            <AccordionItem value="item-toilet" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                <div className="flex items-center gap-2">
                  <MapPinned className="w-6 h-6" />
                  부천시 공중 화장실 찾아보기
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed pt-4 space-y-4">
                <CmsText contentKey="toiletDescription" as="p" />
                <Button
                  size="lg"
                  asChild
                  className="w-full h-auto py-6 text-xl font-bold bg-primary hover:bg-primary/90"
                >
                  <a href="https://data.gg.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=GW6U772M6045H11Q799612585601&infSeq=2&order=&loc=#none" target="_blank" rel="noopener noreferrer">
                    🚻 공중화장실 지도 열기
                  </a>
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* 장애인 이용자의 건강관리 */}
            <AccordionItem value="item-health" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                <div className="flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  장애인 이용자의 건강관리
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <div className="grid gap-3">
                  <a href="https://youtu.be/y0PXvG2cjSk?feature=shared" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🍜 당뇨 관리중 라면 식사
                    </Button>
                  </a>
                  <a href="https://youtu.be/dba6c5_PmTM?feature=shared" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🍚 당뇨 관리중 탄수화물 식사지원
                    </Button>
                  </a>
                  <a href="https://youtu.be/pqGo3UgEGDY?feature=shared" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🥩 당뇨 관리중 육류 식사지원
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=yGOSBHOaRw0" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🍎 당뇨 관리중 과일 식사지원
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=fN73x0OG-b4" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🥛 당뇨 관리중 유제품 식사 지원
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=9QH_aoGbxyM" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🍪 당뇨 관리중 간식 지원
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=B0rSzf6H4y4" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🍞 당뇨 관리중 빵 지원
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=JziIKmwOhho" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🔢 당뇨 관리중 탄수화물 계산
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=Ai1xBUyaAts" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      💊 당뇨와 신장장애 관리하기
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=DJOlEkJDkOw" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🧂 신장장애 나트륨 관리하기
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/watch?v=9-fXcvM6NZU" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      📋 신장장애 식단 수칙
                    </Button>
                  </a>
                  <a href="https://www.youtube.com/shorts/uTO8QnQO_1c" target="_blank" rel="noopener noreferrer" className="block">
                    <Button variant="outline" className="w-full h-auto py-4 text-lg font-bold justify-start">
                      🥗 신장장애 채소 과일 지원하기
                    </Button>
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
            {/* 장애유형별 활동지원 제공방법 */}
            <AccordionItem value="item-disability-types" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                <div className="flex items-center gap-2">
                  📖 장애유형별 활동지원 제공방법
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Accordion type="single" collapsible className="space-y-3">
                  <AccordionItem value="disability-1" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      발달장애(지적, 자폐) 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCScYtDxM/VX1YGIG_vFauEnr8DG4OcQ/view?embed" title="발달장애(지적, 자폐) 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-2" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      정신장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCScYtDxM/VX1YGIG_vFauEnr8DG4OcQ/view?embed" title="정신장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-3" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      지체장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCSpy8fIY/PtWiFFWNNk8LRIRwTW8VBg/view?embed" title="지체장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-4" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      뇌병변장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCSj6jzOw/QpXG-5YXbAhlUDX2pTopmQ/view?embed" title="뇌병변장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-5" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      시각장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCTtEKMxc/tNusgKeBUjYOl-PeY9YMFA/view?embed" title="시각장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-6" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      청각장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCT4yYysQ/UPPXjDrkPGcFsn_3_qPE1w/view?embed" title="청각장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-7" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      신장장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCTxcZ3wI/o-WLzH2cNsHfJRuPH495pg/view?embed" title="신장장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-8" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      호흡기장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCT-8SzjY/Qqk48igABy-wqQRUFta1qA/view?embed" title="호흡기장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="disability-9" className="bg-muted rounded-lg px-4 border">
                    <AccordionTrigger className="text-lg font-bold hover:text-primary">
                      뇌전증장애 이해와 지원
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <CanvaViewer src="https://www.canva.com/design/DAHCT9foqOc/6SvtS33h-K5hUDtMWxzpDg/view?embed" title="뇌전증장애 이해와 지원" />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* 조합원 가입 섹션 */}
      <section className="py-12 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="mb-4 flex items-center justify-center gap-3">
            <Users className="w-10 h-10 text-primary" />
            <CmsText contentKey="memberTitle" />
          </h2>
          <CmsText contentKey="memberDescription" as="p" />
          <Button
            size="lg"
            asChild
            className="h-auto py-6 px-12 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <a href="https://bcmedcoop.limefriends.com/bbs/write.php?bo_table=join_coop&join_md=coop" target="_blank" rel="noopener noreferrer">
              🤝 조합원 가입하기
            </a>
          </Button>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* 동백 소통채널 섹션 */}
      <section className="py-12 px-6 md:px-12 bg-muted">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="mb-4 flex items-center justify-center gap-3">
            <span className="text-3xl">💬</span>
            <CmsText contentKey="communicationTitle" />
          </h2>
          <CmsText contentKey="communicationDescription" as="p" />
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Button
              size="lg"
              asChild
              className="w-full h-auto py-5 px-6 text-xl font-extrabold bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/85 border-none shadow-sm rounded-lg"
            >
              <a href="http://pf.kakao.com/_ppVdb" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                💛 카카오톡 채널 추가
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              className="w-full h-auto py-5 px-6 text-xl font-extrabold bg-[#FEE500] text-[#191919] hover:bg-[#FEE500]/85 border-none shadow-sm rounded-lg"
            >
              <a href="http://pf.kakao.com/_ppVdb/chat" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                💬 카카오톡 1:1 채팅
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-primary text-primary-foreground text-center">
        <CmsText contentKey="footerTitle" as="p" />
        <p className="text-2xl font-bold mt-4">
          📞 032-675-7517 (내선 2번)
        </p>
        <div className="mt-4 space-y-1 text-lg">
          <p>업무폰1 김세미: <a href="tel:010-3423-7517" className="underline">010-3423-7517</a></p>
          <p>업무폰2 최혜양: <a href="tel:010-9092-7517" className="underline">010-9092-7517</a></p>
          <p>업무폰3 조미경: <a href="tel:010-6670-7517" className="underline">010-6670-7517</a></p>
        </div>
        <p className="text-xl mt-3">
          ✉️ dong100center@naver.com
        </p>
        <p className="text-xl mt-2">
          팩스 : 032-675-7518
        </p>
        <p className="text-lg mt-4">
          부천의료복지사회적협동조합 동백 장애인활동지원센터
        </p>
      </footer>
    </div>
  );
};

export default Index;
