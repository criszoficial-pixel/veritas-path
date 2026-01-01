import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Language, LanguageCode } from '@/types/language';
import { languages, defaultLanguage, isRtlLanguage } from '@/data/languages';

interface LanguageContextType {
  language: Language;
  languageCode: LanguageCode;
  setLanguageCode: (code: LanguageCode) => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'palabra-viva-language';

function detectBrowserLanguage(): LanguageCode {
  const browserLang = navigator.language.split('-')[0];
  if (browserLang in languages) {
    return browserLang as LanguageCode;
  }
  return defaultLanguage;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [languageCode, setLanguageCodeState] = useState<LanguageCode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored in languages) {
      return stored as LanguageCode;
    }
    return detectBrowserLanguage();
  });

  const setLanguageCode = (code: LanguageCode) => {
    setLanguageCodeState(code);
    localStorage.setItem(STORAGE_KEY, code);
  };

  const language = languages[languageCode];
  const isRtl = isRtlLanguage(languageCode);

  // Update document direction for RTL languages
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode;
  }, [isRtl, languageCode]);

  return (
    <LanguageContext.Provider value={{ language, languageCode, setLanguageCode, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
