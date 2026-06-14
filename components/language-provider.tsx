"use client";

import { Check, ChevronDown, Globe2 } from "lucide-react";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Language = "en" | "km";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  text: (english: string, khmer: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const languageStorageKey = "kmd-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(languageStorageKey);
    const preferred = saved === "km" || saved === "en" ? saved : navigator.language.toLowerCase().startsWith("km") ? "km" : "en";
    setLanguageState(preferred);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage: (nextLanguage) => {
      setLanguageState(nextLanguage);
      window.localStorage.setItem(languageStorageKey, nextLanguage);
    },
    text: (english, khmer) => language === "km" ? khmer : english
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function LanguageSwitcher({ variant = "menu" }: { variant?: "menu" | "panel" }) {
  const { language, setLanguage, text } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const choose = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    setOpen(false);
  };

  if (variant === "panel") {
    return (
      <div className="language-panel" aria-label={text("Choose language", "ជ្រើសរើសភាសា")}>
        <div className="language-panel-label"><Globe2 /><span><strong>{text("Language", "ភាសា")}</strong><small>{text("Choose your preferred language", "ជ្រើសរើសភាសាដែលអ្នកពេញចិត្ត")}</small></span></div>
        <div className="language-panel-options">
          <button aria-pressed={language === "en"} className={language === "en" ? "is-active" : ""} onClick={() => choose("en")} type="button"><span><strong>English</strong><small>EN</small></span>{language === "en" ? <Check /> : null}</button>
          <button aria-pressed={language === "km"} className={language === "km" ? "is-active" : ""} onClick={() => choose("km")} type="button"><span><strong>ខ្មែរ</strong><small>KM</small></span>{language === "km" ? <Check /> : null}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="language-menu" ref={containerRef}>
      <button aria-expanded={open} aria-haspopup="menu" aria-label={text("Change language", "ប្តូរភាសា")} className="language-menu-trigger" onClick={() => setOpen((current) => !current)} title={text("Language", "ភាសា")} type="button">
        <Globe2 />
        <span>{language === "km" ? "ខ្មែរ" : "EN"}</span>
        <ChevronDown className={open ? "is-open" : ""} />
      </button>
      {open ? (
        <div className="language-menu-popover" role="menu">
          <p>{text("Choose language", "ជ្រើសរើសភាសា")}</p>
          <button className={language === "en" ? "is-active" : ""} onClick={() => choose("en")} role="menuitem" type="button"><span><strong>English</strong><small>EN</small></span>{language === "en" ? <Check /> : null}</button>
          <button className={language === "km" ? "is-active" : ""} onClick={() => choose("km")} role="menuitem" type="button"><span><strong>ខ្មែរ</strong><small>KM</small></span>{language === "km" ? <Check /> : null}</button>
        </div>
      ) : null}
    </div>
  );
}
