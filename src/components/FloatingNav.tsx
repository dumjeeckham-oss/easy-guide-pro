import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useState } from "react";

const sections = [
  { id: "hero", title: "홈" },
  { id: "section1", title: "결제/주의사항" },
  { id: "section2", title: "기본 서류 안내" },
  { id: "section3", title: "특별 업무" },
  { id: "section4", title: "서식 참조" },
  { id: "section5", title: "꿀팁" },
];

export const FloatingNav = () => {
  const { isInstallable, isIOS, installApp } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleInstallClick = () => {
    if (isIOS) {
      setShowIOSGuide(!showIOSGuide);
    } else {
      installApp();
    }
  };

  return (
    <Card className="fixed top-2 right-2 md:top-4 md:right-4 w-auto p-2 shadow-lg z-50 bg-card/95 backdrop-blur-sm max-w-[280px]">
      <h3 className="text-sm font-bold mb-1 text-foreground px-2">빠른 이동</h3>
      <div className="flex flex-wrap gap-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            variant="ghost"
            size="sm"
            className="text-xs px-2 py-1 h-auto hover:bg-primary/10 hover:text-primary"
          >
            {section.title}
          </Button>
        ))}
        {isInstallable && (
          <Button
            onClick={handleInstallClick}
            variant="default"
            size="sm"
            className="text-xs px-2 py-1 h-auto flex items-center gap-1"
          >
            <Smartphone className="w-3 h-3" />
            바탕화면 바로가기
          </Button>
        )}
      </div>
      {showIOSGuide && isIOS && (
        <div className="mt-2 p-2 bg-primary/10 rounded text-xs space-y-1">
          <p className="font-bold">iPhone 설치 방법:</p>
          <p>1. 하단 공유 버튼 (□↑) 터치</p>
          <p>2. "홈 화면에 추가" 선택</p>
          <p>3. "추가" 버튼 터치</p>
        </div>
      )}
    </Card>
  );
};
