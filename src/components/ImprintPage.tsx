import { ReactProviders } from './ReactProviders';
import { Header } from './Header';
import { Impressum } from '../react-pages/Impressum';
import { Footer } from './Footer';

export function ImprintPage() {
  return (
    <ReactProviders>
      <Header />
      <Impressum />
      <Footer />
    </ReactProviders>
  );
}
