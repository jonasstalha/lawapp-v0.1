import { createContext, useContext } from 'react';
import { en } from '../i18n/en';

type TranslationContextType = {
  t: (key: string) => string;
  locale: string;
  setLocale: (locale: string) => void;
};

export const TranslationContext = createContext<TranslationContextType>({
  t: (key: string) => key,
  locale: 'en',
  setLocale: () => {},
});

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 