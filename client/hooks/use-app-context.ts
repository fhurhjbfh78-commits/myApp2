import { useContext } from "react";
import { AppContext } from "@/App";

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppContext provider");
  }
  return context;
}

export function useTranslation() {
  const { language } = useAppContext();
  return {
    language,
    t: (ar: string, en: string) => (language === "ar" ? ar : en),
  };
}
