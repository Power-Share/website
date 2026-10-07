import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Communities', href: '#communities' },
  { label: 'Utilities', href: '#utilities' },
  { label: 'About', href: '#about' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Logo className={scrolled ? 'text-navy' : 'text-white'} />

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-teal ${
                scrolled ? 'text-navy' : 'text-white/90'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-teal text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-dark transition-colors"
          >
            Get Started
          </a>
        </nav>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className={scrolled ? 'text-navy' : 'text-white'} size={24} />
          ) : (
            <Menu className={scrolled ? 'text-navy' : 'text-white'} size={24} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-navy font-medium text-lg"
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
                Get Started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
