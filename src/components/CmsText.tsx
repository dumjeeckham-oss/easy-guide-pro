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
  const showText = content.displayMode !== "image" || !content.imageUrl;
  const showImage = content.displayMode !== "text" && content.imageUrl;

  return (
    <Component
      className={className}
      style={{ color: content.color, fontWeight: content.fontWeight, fontSize: `${content.fontSize}rem` }}
    >
      {showImage && <img src={content.imageUrl} alt={content.imageAlt || content.text} className="mx-auto max-h-72 max-w-full object-contain" />}
      {showText && content.text.split("\n").map((line, index) => (
        <span key={`${contentKey}-${index}`}>
          {(index > 0 || (showImage && content.displayMode === "both")) && <br />}
          {line}
        </span>
      ))}
    </Component>
  );
};

export const CmsImage = ({ contentKey, fallbackSrc, className }: {
  contentKey: CmsContentKey;
  fallbackSrc: string;
  className?: string;
}) => {
  const content = useCmsContent()[contentKey];
  return <img src={content.imageUrl || fallbackSrc} alt={content.imageAlt || content.text} className={className} />;
};
