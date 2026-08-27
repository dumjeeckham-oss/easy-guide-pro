import { ElementType } from "react";
import { useCmsContent } from "@/hooks/useCmsContent";
import { CmsContentKey } from "@/lib/cmsContent";

type CmsTextProps = {
  contentKey: CmsContentKey;
  as?: ElementType;
  className?: string;
};

export const CmsText = ({ contentKey, as: Component = "span", className }: CmsTextProps) => {
  const content = useCmsContent()[contentKey];

  return (
    <Component
      className={className}
      style={{ color: content.color, fontWeight: content.fontWeight, fontSize: `${content.fontSize}rem` }}
    >
      {content.text.split("\n").map((line, index) => (
        <span key={`${contentKey}-${index}`}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </Component>
  );
};
