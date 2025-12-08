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
    <Card className="fixed top-2 right-2 md:top-4 md:right-4 w-auto p-2 shadow-lg z-50 bg-card/95 backdrop-blur-sm">
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
      </div>
    </Card>
  );
};
