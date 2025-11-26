import { Phone, FileText, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-background py-12 px-6 md:px-12">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-foreground leading-tight">
            헤매지 마세요!
          </h1>
          <h2 className="text-foreground font-bold leading-tight">
            활동지원사님을 위한<br />
            가장 빠르고 쉬운 업무 도우미
          </h2>
          
          {/* Emergency Contact */}
          <Card className="bg-destructive text-destructive-foreground p-8 shadow-lg">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Phone className="w-12 h-12" />
              <div className="text-left">
                <p className="text-2xl font-bold">긴급 연락처</p>
                <p className="text-3xl font-bold mt-2">010-1234-5678</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 1: Payment Guidelines */}
      <section className="py-12 px-6 md:px-12 bg-muted">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center text-foreground mb-8">
            결제 및 업무 안내
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Button 
              size="lg" 
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-primary hover:bg-primary/90"
            >
              <AlertCircle className="w-10 h-10" />
              결제 시 유의사항
            </Button>
            <Button 
              size="lg" 
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-primary hover:bg-primary/90"
            >
              <FileText className="w-10 h-10" />
              업무 보고 양식
            </Button>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 2: Important Notice */}
      <section className="py-12 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto">
          <Card className="bg-accent text-accent-foreground p-8">
            <h3 className="text-center mb-6">
              필독! 중요 공지사항
            </h3>
            <ul className="space-y-4 text-xl">
              <li className="flex items-start gap-4">
                <span className="font-bold min-w-[2rem]">1.</span>
                <span>업무 시작 전 반드시 수급자님께 인사드리세요</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold min-w-[2rem]">2.</span>
                <span>모든 활동은 반드시 사진과 함께 보고해주세요</span>
              </li>
              <li className="flex items-start gap-4">
                <span className="font-bold min-w-[2rem]">3.</span>
                <span>영수증은 원본을 꼭 보관해주세요</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 3: Shopping Report */}
      <section className="py-12 px-6 md:px-12 bg-muted">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center text-foreground mb-8">
            장보기 보고
          </h2>
          <Button 
            size="lg" 
            className="w-full h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-primary hover:bg-primary/90"
          >
            <ShoppingCart className="w-10 h-10" />
            장보기 보고하기
          </Button>
          <Card className="p-6 bg-background">
            <p className="text-xl leading-relaxed">
              <span className="font-bold">장보기 후</span> 반드시 영수증 사진과 함께 보고해주세요. 
              위 버튼을 누르면 쉽게 보고할 수 있습니다.
            </p>
          </Card>
        </div>
      </section>

      {/* Separator */}
      <div className="h-2 bg-separator" />

      {/* Section 4: Forms Download */}
      <section className="py-12 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-center text-foreground mb-8">
            서식 다운로드
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Button 
              size="lg" 
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <FileText className="w-10 h-10" />
              활동보고서
            </Button>
            <Button 
              size="lg" 
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <FileText className="w-10 h-10" />
              비용청구서
            </Button>
            <Button 
              size="lg" 
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <FileText className="w-10 h-10" />
              출퇴근 기록부
            </Button>
            <Button 
              size="lg" 
              className="h-auto py-8 text-xl font-bold flex flex-col gap-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground"
            >
              <FileText className="w-10 h-10" />
              기타 양식
            </Button>
          </div>
        </div>
      </section>

      {/* Footer with Contact */}
      <footer className="py-8 px-6 bg-foreground text-background text-center">
        <p className="text-xl font-bold">
          문의사항이 있으시면 언제든지 전화주세요
        </p>
        <p className="text-2xl font-bold mt-4">
          📞 010-1234-5678
        </p>
      </footer>
    </div>
  );
};

export default Index;
