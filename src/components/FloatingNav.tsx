import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const sections = [
  { id: "hero", title: "홈" },
  { id: "section1", title: "결제/주의사항" },
  { id: "section2", title: "기본 서류 안내" },
  { id: "section3", title: "특별 업무" },
  { id: "section4", title: "서식 다운로드" },
];

export const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-lg z-50 bg-primary hover:bg-primary/90"
        size="icon"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
      </Button>

      {/* Navigation Menu */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-72 p-4 shadow-xl z-50 bg-card">
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
      )}
    </>
  );
};
