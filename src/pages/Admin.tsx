import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Admin = () => (
  <main className="min-h-screen bg-background px-6 py-12">
    <Card className="mx-auto max-w-xl space-y-6 p-8 text-center">
      <h1 className="text-3xl font-bold">화면 문구 관리자</h1>
      <p className="text-lg text-muted-foreground">
        주요 문구의 내용, 글자색, 굵기와 크기는 별도의 안전한 관리자 화면에서 수정합니다.
      </p>
      <Button asChild size="lg" className="h-auto py-5 text-lg font-bold">
        <a href="https://easy-guide-pro-cms.netlify.app/" target="_blank" rel="noopener noreferrer">
          관리자 편집 화면 열기
          <ExternalLink className="ml-2 h-5 w-5" />
        </a>
      </Button>
      <a href="/" className="block text-base font-bold text-primary underline">업무 도우미로 돌아가기</a>
    </Card>
  </main>
);

export default Admin;
