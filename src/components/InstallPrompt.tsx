import { Smartphone, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useState } from "react";

export const InstallPrompt = () => {
  const { isInstallable, isIOS, installApp } = usePWAInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  return (
    <Card className="bg-primary/10 border-2 border-primary p-6 relative">
      <button 
        onClick={() => setIsDismissed(true)}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
        aria-label="닫기"
      >
        <X className="w-6 h-6" />
      </button>
      
      <div className="flex items-start gap-4">
        <div className="bg-primary text-primary-foreground p-3 rounded-full shrink-0">
          <Smartphone className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <p className="text-xl font-bold text-foreground">
            📲 홈 화면에 바로가기 추가
          </p>
          <p className="text-lg text-muted-foreground">
            바탕화면에 추가하면 다음부터 인터넷 주소 없이 바로 열 수 있어요!
          </p>
          
          {isIOS ? (
            <div className="bg-card p-4 rounded-lg border space-y-2">
              <p className="font-bold text-foreground">iPhone/iPad 설치 방법:</p>
              <ol className="list-decimal list-inside space-y-1 text-lg">
                <li>하단의 <span className="font-bold">공유 버튼</span> (□↑) 터치</li>
                <li><span className="font-bold">"홈 화면에 추가"</span> 선택</li>
                <li><span className="font-bold">"추가"</span> 버튼 터치</li>
              </ol>
            </div>
          ) : (
            <Button 
              onClick={installApp}
              size="lg"
              className="w-full text-xl py-6 font-bold"
            >
              지금 바로가기 추가하기
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
