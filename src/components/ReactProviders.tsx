import { ThemeProvider } from './ThemeToggle';
import { LanguageProvider } from '../i18n/LanguageContext';
import type { ReactNode } from 'react';

export function ReactProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </ThemeProvider>
  );
}
