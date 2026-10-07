import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { translations } from './translations';

export type Lang = 'en' | 'de';

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'de';
  const stored = localStorage.getItem('lang');
  if (stored === 'de' || stored === 'en') return stored;
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  return browserLang.startsWith('de') ? 'de' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  function t(key: string): string {
    return translations[lang][key] ?? key;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
