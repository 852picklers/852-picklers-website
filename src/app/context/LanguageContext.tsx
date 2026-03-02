"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Lang = "ZH" | "EN";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ZH"); // 預設語言

  // 網頁載入時，檢查之前有冇 Save 低語言偏好
  useEffect(() => {
    const saved = localStorage.getItem("picklers_lang") as Lang;
    if (saved) setLang(saved);
  }, []);

  const toggleLang = () => {
    setLang((prev) => {
      const newLang = prev === "EN" ? "ZH" : "EN";
      localStorage.setItem("picklers_lang", newLang); // Save 落瀏覽器
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// 寫一個 Custom Hook 方便其他 Component 呼叫
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage 必須在 LanguageProvider 內使用");
  }
  return context;
}