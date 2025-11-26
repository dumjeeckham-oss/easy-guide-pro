import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sections = [
  { id: "hero", title: "홈" },
  { id: "section1", title: "결제/주의사항" },
  { id: "section2", title: "기본 서류 안내" },
  { id: "section3", title: "특별 업무" },
  { id: "section4", title: "서식 참조" },
];

export const FloatingNav = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <Card className="fixed top-6 right-6 w-64 p-4 shadow-xl z-50 bg-card/95 backdrop-blur-sm">
      <h3 className="text-xl font-bold mb-4 text-foreground">빠른 이동</h3>
      <div className="space-y-2">
        {sections.map((section) => (
          <Button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            variant="ghost"
            className="w-full justify-start text-lg hover:bg-primary/10 hover:text-primary"
          >
            {section.title}
          </Button>
        ))}
      </div>
    </Card>
  );
};
