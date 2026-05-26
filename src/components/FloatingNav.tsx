import { Button } from "@/components/ui/button";
import { Smartphone, RefreshCw, Type } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useFontSize } from "@/hooks/useFontSize";
import { useState } from "react";
import dongbaekLogo from "@/assets/dongbaek-logo.png";

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
  const { fontSize, setFontSize } = useFontSize();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  const fontSizeLabels = { small: "작게", medium: "보통", large: "크게" } as const;
  const fontSizeOrder: Array<"small" | "medium" | "large"> = ["small", "medium", "large"];

  const cycleFontSize = () => {
    const currentIndex = fontSizeOrder.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % fontSizeOrder.length;
    setFontSize(fontSizeOrder[nextIndex]);
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      // 135px offset for the fixed header
      const headerOffset = 135;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleInstallClick = () => {
    if (isIOS) {
      setShowIOSGuide(!showIOSGuide);
    } else {
      installApp();
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col items-center gap-3">
        {/* Top row: Logo and Utilities */}
        <div className="w-full flex items-center justify-between gap-4">
          {/* Clickable Logo */}
          <button 
            onClick={scrollToTop} 
            className="flex items-center gap-2 hover:opacity-85 transition-opacity focus:outline-none"
            aria-label="홈으로 스크롤"
          >
            <img 
              src={dongbaekLogo} 
              alt="동백 장애인활동지원센터 로고" 
              className="h-10 md:h-12 w-auto object-contain" 
            />
          </button>

          {/* Quick utility actions */}
          <div className="flex items-center gap-1.5">
            <Button
              onClick={cycleFontSize}
              variant="outline"
              size="sm"
              className="text-xs px-2 py-1 h-8 flex items-center gap-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-bold"
            >
              <Type className="w-3.5 h-3.5" />
              <span>{fontSizeLabels[fontSize]}보기</span>
            </Button>
            
            <Button
              onClick={handleRefresh}
              variant="outline"
              size="sm"
              className="text-xs px-2 py-1 h-8 flex items-center gap-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">새 버전 업데이트</span>
              <span className="sm:hidden">업데이트</span>
            </Button>

            {isInstallable && (
              <Button
                onClick={handleInstallClick}
                variant="default"
                size="sm"
                className="text-xs px-2 py-1 h-8 flex items-center gap-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">바로가기 추가</span>
                <span className="sm:hidden">설치</span>
              </Button>
            )}
          </div>
        </div>

        {/* Bottom row: Quick Nav Menu */}
        <div className="w-full border-t border-border/60 pt-2">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-1.5 pb-1">
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                variant="ghost"
                size="sm"
                className="text-sm font-extrabold px-3 py-1.5 h-auto whitespace-nowrap text-foreground/80 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 transition-colors"
              >
                {section.title}
              </Button>
            ))}
          </div>
        </div>
        
        {showIOSGuide && isIOS && (
          <div className="w-full mt-1 p-2 bg-primary/10 rounded text-xs space-y-1 text-left">
            <p className="font-bold">iPhone 설치 방법:</p>
            <p>1. 하단 공유 버튼 (□↑) 터치</p>
            <p>2. "홈 화면에 추가" 선택</p>
            <p>3. "추가" 버튼 터치</p>
          </div>
        )}
      </div>
    </header>
  );
};
