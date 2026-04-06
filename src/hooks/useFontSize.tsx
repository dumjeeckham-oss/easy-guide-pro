import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type FontSize = "small" | "medium" | "large";

const fontSizeMap: Record<FontSize, string> = {
  small: "1rem",    // 16px
  medium: "1.25rem", // 20px (default)
  large: "1.5rem",   // 24px
};

const FontSizeContext = createContext<{
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}>({ fontSize: "medium", setFontSize: () => {} });

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem("fontSize") as FontSize) || "medium";
  });

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.fontSize = fontSizeMap[fontSize];
  }, [fontSize]);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => useContext(FontSizeContext);
