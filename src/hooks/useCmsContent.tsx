import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { CMS_API_URL, CmsContent, defaultCmsContent, mergeCmsContent } from "@/lib/cmsContent";

const CmsContentContext = createContext<CmsContent>(defaultCmsContent);

export const CmsContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<CmsContent>(defaultCmsContent);

  useEffect(() => {
    const controller = new AbortController();

    fetch(CMS_API_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`CMS request failed: ${response.status}`);
        return response.json();
      })
      .then((value) => setContent(mergeCmsContent(value)))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.warn("CMS 설정을 불러오지 못해 기본 문구를 표시합니다.");
      });

    return () => controller.abort();
  }, []);

  return <CmsContentContext.Provider value={content}>{children}</CmsContentContext.Provider>;
};

export const useCmsContent = () => useContext(CmsContentContext);
