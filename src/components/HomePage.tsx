import React from 'react';
import { ReactProviders } from './ReactProviders';
import { Header } from './Header';
import { HeroSection } from './sections/HeroSection';
import { PillarsSection } from './sections/PillarsSection';
import { HowItWorksSection } from './sections/HowItWorksSection';
import { StatsSection } from './sections/StatsSection';
import { CommunitySection } from './sections/CommunitySection';
import { UtilitiesSection } from './sections/UtilitiesSection';
import { CTASection } from './sections/CTASection';
import { Footer } from './Footer';

export function HomePage() {
  return (
    <ReactProviders>
      <Header />
      <main>
        <HeroSection />
        <PillarsSection />
        <HowItWorksSection />
        <StatsSection />
        <CommunitySection />
        <UtilitiesSection />
        <CTASection />
      </main>
      <Footer />
    </ReactProviders>
  );
}
