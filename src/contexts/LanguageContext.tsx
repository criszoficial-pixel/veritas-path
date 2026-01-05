import React, { createContext, useContext, ReactNode } from 'react';
import type { Language, LanguageCode } from '@/types/language';
import { languages } from '@/data/languages';

interface LanguageContextType {
  language: Language;
  languageCode: LanguageCode;
  setLanguageCode: (code: LanguageCode) => void;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Fixed to Spanish for v1
const FIXED_LANGUAGE: LanguageCode = 'es';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = languages[FIXED_LANGUAGE];

  // No-op setter for v1 (maintains interface for future multi-language support)
  const setLanguageCode = (_code: LanguageCode) => {
    // Reserved for future implementation
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      languageCode: FIXED_LANGUAGE, 
      setLanguageCode, 
      isRtl: false 
    }}>
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
