import { ElementType, ReactNode } from "react";
import DOMPurify from "dompurify";
import { useCmsContent } from "@/hooks/useCmsContent";
import { CmsContentKey } from "@/lib/cmsContent";

const SAFE_STYLE_VALUES: Record<string, RegExp> = {
  color: /^(#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([\d\s.,%]+\)|[a-z]{3,20})$/i,
  "background-color": /^(#[0-9a-f]{3,8}|(?:rgb|rgba|hsl|hsla)\([\d\s.,%]+\)|[a-z]{3,20})$/i,
  "font-weight": /^(normal|bold|[1-9]00)$/i,
  "font-size": /^\d+(?:\.\d+)?(?:rem|em|px|%)$/i,
  "margin-top": /^\d+(?:\.\d+)?(?:rem|em|px|%)$/i,
  "margin-bottom": /^\d+(?:\.\d+)?(?:rem|em|px|%)$/i,
  "padding-left": /^\d+(?:\.\d+)?(?:rem|em|px|%)$/i,
  "list-style-type": /^(disc|circle|square|decimal|none)$/i,
  "text-align": /^(left|center|right)$/i,
  "text-decoration": /^(underline|none|line-through)$/i,
};

const sanitizeInlineStyle = (style: string) => style
  .split(";")
  .map((declaration) => declaration.trim())
  .filter(Boolean)
  .map((declaration) => declaration.split(":", 2).map((part) => part.trim()))
  .filter(([property, value]) => SAFE_STYLE_VALUES[property.toLowerCase()]?.test(value))
  .map(([property, value]) => `${property.toLowerCase()}: ${value}`)
  .join("; ");

DOMPurify.addHook("uponSanitizeAttribute", (_node, data) => {
  if (data.attrName !== "style") return;
  const safeStyle = sanitizeInlineStyle(data.attrValue);
  if (safeStyle) data.attrValue = safeStyle;
  else data.keepAttr = false;
});

DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (!(node instanceof HTMLAnchorElement) || node.target !== "_blank") return;
  node.rel = "noopener noreferrer";
});

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
  const containsHtml = /<\/?[a-z][\s\S]*>/i.test(content.text);

  if (containsHtml) {
    const safeHtml = DOMPurify.sanitize(content.text, {
      ALLOWED_TAGS: ["p", "br", "strong", "b", "em", "i", "u", "s", "ul", "ol", "li", "h3", "h4", "blockquote", "a", "span"],
      ALLOWED_ATTR: ["href", "target", "rel", "style"],
    });
    return (
      <div
        className={`cms-rich-text ${className ?? ""}`}
        style={{ color: content.color, fontWeight: content.fontWeight, fontSize: `${content.fontSize}rem` }}
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    );
  }

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

  return <div className={`cms-rich-text ${className ?? ""}`} style={{ color: content.color, fontWeight: content.fontWeight, fontSize: `${content.fontSize}rem` }}>{items}</div>;
};
