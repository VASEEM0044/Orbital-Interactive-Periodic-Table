import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  UI_TRANSLATIONS,
  LanguageMeta,
} from '../locales/translations';
import { getLocalizedElementName } from '../locales/elementNames';

interface LanguageContextType {
  currentLang: SupportedLanguage;
  currentMeta: LanguageMeta;
  languages: LanguageMeta[];
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: string, fallback?: string) => string;
  getElementName: (elementNumber: number, fallback: string) => string;
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('orbital_lang') as SupportedLanguage;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    }
    return 'en';
  });

  const currentMeta =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setCurrentLang(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('orbital_lang', lang);
    }
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = UI_TRANSLATIONS[currentLang];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = UI_TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const getElementName = (elementNumber: number, fallback: string): string => {
    return getLocalizedElementName(elementNumber, currentLang, fallback);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLang,
        currentMeta,
        languages: SUPPORTED_LANGUAGES,
        setLanguage: handleSetLanguage,
        t,
        getElementName,
        isRtl: currentMeta.dir === 'rtl',
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
