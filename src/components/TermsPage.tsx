import React from 'react';
import { ReactProviders } from './ReactProviders';
import { Header } from './Header';
import { Terms } from '../react-pages/Terms';
import { Footer } from './Footer';

export function TermsPage() {
  return (
    <ReactProviders>
      <Header />
      <Terms />
      <Footer />
    </ReactProviders>
  );
}
