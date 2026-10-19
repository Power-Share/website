import React from 'react';
import { ReactProviders } from './ReactProviders';
import { Header } from './Header';
import { Geraete } from '../react-pages/Geraete';
import { Footer } from './Footer';

export function GeraetePage() {
  return (
    <ReactProviders>
      <Header />
      <Geraete />
      <Footer />
    </ReactProviders>
  );
}
