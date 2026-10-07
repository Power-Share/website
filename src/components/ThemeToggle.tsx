import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative flex items-center w-14 h-7 rounded-full bg-gray-200 dark:bg-navy-light transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal"
    >
      <span
        className={`absolute flex items-center justify-center w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
          isDark ? 'translate-x-7.5' : 'translate-x-1'
        }`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-navy" />
        ) : (
          <Sun className="w-3 h-3 text-amber" />
        )}
      </span>
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2">
        <Sun className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-40 text-gray-400' : 'opacity-0'}`} />
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2">
        <Moon className={`w-3 h-3 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-40 text-gray-400'}`} />
      </span>
    </button>
  );
}
