import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/sections/HeroSection';
import { PillarsSection } from './components/sections/PillarsSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { StatsSection } from './components/sections/StatsSection';
import { CommunitySection } from './components/sections/CommunitySection';
import { UtilitiesSection } from './components/sections/UtilitiesSection';
import { CTASection } from './components/sections/CTASection';
import { Footer } from './components/Footer';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Impressum } from './pages/Impressum';

type Page = 'home' | 'privacy' | 'terms' | 'imprint';

const LEGAL_PAGES = new Set(['privacy', 'terms', 'imprint']);

function useHashRoute(): [Page, (p: Page) => void] {
  const getPage = (): Page => {
    const hash = window.location.hash.replace('#', '');
    if (LEGAL_PAGES.has(hash)) return hash as Page;
    return 'home';
  };

  const [page, setPageState] = useState<Page>(getPage);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (LEGAL_PAGES.has(hash)) {
        setPageState(hash as Page);
        window.scrollTo(0, 0);
      } else if (page !== 'home') {
        // Coming back from a legal page to home
        setPageState('home');
        // Let the browser handle the anchor scroll after re-render
        if (hash) {
          requestAnimationFrame(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
          });
        }
      }
      // If already on home and clicking an anchor like #how-it-works,
      // the browser handles scrolling natively — we do nothing.
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [page]);

  const setPage = (p: Page) => {
    window.location.hash = p === 'home' ? '' : p;
  };

  return [page, setPage];
}

function HomePage() {
  return (
    <main>
      <HeroSection />
      <PillarsSection />
      <HowItWorksSection />
      <StatsSection />
      <CommunitySection />
      <UtilitiesSection />
      <CTASection />
    </main>
  );
}

function App() {
  const [page] = useHashRoute();

  return (
    <>
      <Header />
      {page === 'home' && <HomePage />}
      {page === 'privacy' && <Privacy />}
      {page === 'terms' && <Terms />}
      {page === 'imprint' && <Impressum />}
      <Footer />
    </>
  );
}

export default App;
