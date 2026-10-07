import { Header } from './components/Header';
import { HeroSection } from './components/sections/HeroSection';
import { PillarsSection } from './components/sections/PillarsSection';
import { StatsSection } from './components/sections/StatsSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { CommunitySection } from './components/sections/CommunitySection';
import { UtilitiesSection } from './components/sections/UtilitiesSection';
import { AboutSection } from './components/sections/AboutSection';
import { CTASection } from './components/sections/CTASection';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <StatsSection />
        <HowItWorksSection />
        <CommunitySection />
        <UtilitiesSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

export default App;
