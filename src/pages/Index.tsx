import { Phone, FileText, ShoppingCart, AlertCircle, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FloatingNav } from "@/components/FloatingNav";
import welfareStatusImg from "@/assets/welfare-status.png";
import scheduleImg from "@/assets/schedule.png";
import provisionRecordImg from "@/assets/provision-record.png";
import weeklyReportImg from "@/assets/weekly-report.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      <FloatingNav />

      {/* Section 0: Hero Section */}
      <section id="hero" className="bg-background py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Logo Placeholder - 사용자가 나중에 로고 이미지를 업로드할 수 있습니다 */}
          <div className="flex justify-center mb-6">
            <div className="w-48 h-48 bg-primary/10 rounded-full flex items-center justify-center">
              <p className="text-primary font-bold text-2xl">동백센터</p>
            </div>
          </div>

          <h1 className="text-foreground leading-tight text-4xl md:text-5xl font-bold">
            활동지원사님의<br />든든한 파트너
          </h1>
          <h2 className="text-foreground font-bold leading-tight text-2xl md:text-3xl">
            지금 당장 필요한 정보만<br />알려드립니다.
          </h2>

          {/* Emergency Contact */}
          <Card className="bg-primary text-primary-foreground p-8 shadow-lg">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Phone className="w-12 h-12" />
              <div className="text-left">
                <p className="text-2xl font-bold">긴급 문의</p>
                <p className="text-3xl font-bold mt-2">010-3123-4832</p>
              </div>
            </div>
          </Card>

          {/* Notice Banner */}
          <Card className="bg-accent/10 border-2 border-accent p-6">
            <p className="text-xl font-bold text-accent-foreground">
              📢 공지: 2024년 5월 급여 정산일 변경 안내
            </p>
          </Card>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 1: Payment Guidelines */}
      <section id="section1" className="py-12 px-6 md:px-12 bg-muted">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center text-foreground mb-8 flex items-center justify-center gap-3">
            <AlertCircle className="w-10 h-10 text-primary" />
            지금 바로 확인해야 할 '결제/주의사항'
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {/* 입사서류 */}
            <AccordionItem value="item-1" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📋 입사서류
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed space-y-3 pt-4">
                <p className="font-bold">안녕하세요~</p>
                <p className="font-bold">부천의료복지사회적협동조합 동백 장애인활동지원센터입니다^^</p>
                <p className="font-bold mb-4">입사서류 안내 드립니다!</p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>폰 셀카사진(본인) 1장 - 명찰용</li>
                  <li>주민등록등본 1부</li>
                  <li>마약검사 결과 1부</li>
                  <li>통장사본 (농협) 1부</li>
                  <li>장애인활동지원 이수증 사본 1부</li>
                  <li>경력증명서/재직증명서/실습일지 중 1부</li>
                  <li>장애인의 경우 장애인증명서 1부</li>
                  <li>피부양자 등록 원할 시: 피부양자대상자기준 가족관계증명서상세본</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            {/* 바우처 결제시 유의사항 */}
            <AccordionItem value="item-2" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                ⚠️ 바우처 결제시 유의사항
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed space-y-3 pt-4">
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
              </AccordionContent>
            </AccordionItem>

            {/* 바우처시간의 이해 */}
            <AccordionItem value="item-3" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                ⏰ 바우처시간의 이해
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed space-y-4 pt-4">
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
          <h2 className="text-center text-foreground mb-8 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-primary" />
            활동지원사 기본 서류 및 행정 안내
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            {/* 동백 사무실 주소 */}
            <AccordionItem value="item-4" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6" />
                  동백 사무실 주소
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-lg leading-relaxed pt-4">
                <Card className="bg-primary/10 p-6">
                  <p className="text-2xl font-bold text-center">
                    부천시 원미로 97번길 31, 3층<br />(원미동)
                  </p>
                </Card>
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
                  <img src={welfareStatusImg} alt="동백센터 복지현황" className="w-full h-auto" />
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
          <h2 className="text-center text-foreground mb-8 flex items-center justify-center gap-3">
            <ShoppingCart className="w-10 h-10 text-primary" />
            특별 상황 및 외부 보고/신청 바로가기
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <Button
              size="lg"
              asChild
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-primary hover:bg-primary/90"
            >
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeBFbqYVJ6CDtMLfeAoLQKRbaMKtQu6ZY7Zk3UZhvRBN6ptLg/viewform?pli=1" target="_blank" rel="noopener noreferrer">
                <ShoppingCart className="w-10 h-10" />
                장보기 업무 보고서 작성하기
              </a>
            </Button>

            <Button
              size="lg"
              asChild
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-primary hover:bg-primary/90"
            >
              <a href="https://bcmedcoop.org/bbs/board.php?bo_table=support5" target="_blank" rel="noopener noreferrer">
                <Users className="w-10 h-10" />
                활동지원사 구직 신청하기
              </a>
            </Button>
          </div>

          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="item-6" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                💳 바우처 결제 방법
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <iframe 
                    src="/documents/voucher-payment-method.pdf" 
                    className="w-full h-[600px]"
                    title="바우처 결제 방법"
                  />
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 4: Forms */}
      <section id="section4" className="py-12 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center text-foreground mb-8 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-primary" />
            업무 서식 참조
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-7" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📅 일정표
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <img src={scheduleImg} alt="급여제공 일정표" className="w-full h-auto" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📋 제공기록지
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <img src={provisionRecordImg} alt="활동지원급여 제공기록지" className="w-full h-auto" />
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="bg-card rounded-lg px-6 border-2">
              <AccordionTrigger className="text-xl font-bold hover:text-primary">
                📝 주간 업무 보고
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <Card className="bg-muted p-6">
                  <img src={weeklyReportImg} alt="주간 업무 보고" className="w-full h-auto" />
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-primary text-primary-foreground text-center">
        <p className="text-xl font-bold">
          문의사항이 있으시면 언제든지 전화주세요
        </p>
        <p className="text-2xl font-bold mt-4">
          📞 010-3123-4832
        </p>
        <p className="text-lg mt-4">
          부천의료복지사회적협동조합 동백 장애인활동지원센터
        </p>
      </footer>
    </div>
  );
};

export default Index;
