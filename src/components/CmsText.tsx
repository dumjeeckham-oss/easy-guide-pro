import { ElementType, ReactNode } from "react";
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

export const CmsRichText = ({ contentKey, className }: { contentKey: CmsContentKey; className?: string }) => {
  const content = useCmsContent()[contentKey];
  const lines = content.text.split("\n");
  const items: ReactNode[] = [];
  let list: string[] = [];

  const flushList = () => {
    if (!list.length) return;
    items.push(<ul key={`list-${items.length}`} className="space-y-2 list-disc list-inside">{list.map((line, index) => <li key={index}>{line}</li>)}</ul>);
    list = [];
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (line.startsWith("- ")) {
      list.push(line.slice(2));
      return;
    }
    flushList();
    if (!line) return;
    if (line.startsWith("# ")) items.push(<h3 key={`heading-${items.length}`} className="text-xl font-bold mt-4">{line.slice(2)}</h3>);
    else if (line.startsWith("! ")) items.push(<p key={`alert-${items.length}`} className="font-bold text-destructive">{line.slice(2)}</p>);
    else items.push(<p key={`paragraph-${items.length}`}>{line}</p>);
  });
  flushList();

  return <div className={className} style={{ color: content.color, fontWeight: content.fontWeight, fontSize: `${content.fontSize}rem` }}>{items}</div>;
};
