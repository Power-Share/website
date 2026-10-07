import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { useLanguage } from '../i18n/LanguageContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navLinks = [
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.community'), href: '#communities' },
    { label: t('nav.utilities'), href: '#utilities' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-navy/95 backdrop-blur-md shadow-sm'
          : 'bg-white/80 dark:bg-navy/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo className="text-navy dark:text-white" />

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-teal transition-colors"
            >
              {link.label}
            </a>
          ))}

          <ThemeToggle />

          <button
            onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
            className="text-xs font-bold border border-gray-300 dark:border-white/20 rounded-full px-3 py-1 text-gray-600 dark:text-gray-300 hover:border-teal hover:text-teal transition-colors"
          >
            {lang === 'en' ? 'DE' : 'EN'}
          </button>

          <a
            href="#contact"
            className="bg-teal text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors"
          >
            {t('nav.getStarted')}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
            className="text-xs font-bold border border-gray-300 dark:border-white/20 rounded-full px-2.5 py-1 text-gray-600 dark:text-gray-300"
          >
            {lang === 'en' ? 'DE' : 'EN'}
          </button>
          <button
            className="p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="text-navy dark:text-white" size={24} />
            ) : (
              <Menu className="text-navy dark:text-white" size={24} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-navy shadow-lg"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-navy dark:text-white font-medium text-lg"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-teal text-white px-5 py-3 rounded-full text-center font-semibold mt-2"
                onClick={() => setMobileOpen(false)}
              >
                {t('nav.getStarted')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
