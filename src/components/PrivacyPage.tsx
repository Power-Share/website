import React from 'react';
import { ReactProviders } from './ReactProviders';
import { Header } from './Header';
import { Privacy } from '../react-pages/Privacy';
import { Footer } from './Footer';

export function PrivacyPage() {
  return (
    <ReactProviders>
      <Header />
      <Privacy />
      <Footer />
    </ReactProviders>
  );
}
