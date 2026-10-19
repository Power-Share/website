import React from 'react';
import { ReactProviders } from './ReactProviders';
import { Header } from './Header';
import { Poella2 } from '../react-pages/Poella2';
import { Footer } from './Footer';

export function Poella2Page() {
  return (
    <ReactProviders>
      <Header />
      <Poella2 />
      <Footer />
    </ReactProviders>
  );
}
