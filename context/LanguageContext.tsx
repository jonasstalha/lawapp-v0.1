import React, { createContext, useContext, useState } from 'react';
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { translations } from '@/translations';

// Define available languages
export const LANGUAGES = ['en', 'ar', 'fr'] as const;
export type Language = typeof LANGUAGES[number];

const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

interface LanguageContextType {
  locale: Language;
  setLocale: (locale: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Language>((i18n.locale.split('-')[0] as Language) || 'en');

  const handleSetLocale = (newLocale: Language) => {
    setLocale(newLocale);
    i18n.locale = newLocale;
  };

  const t = (key: string) => i18n.t(key);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext); 