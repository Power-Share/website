import { ReactProviders } from './ReactProviders';
import { Header } from './Header';
import { Poella } from '../react-pages/Poella';
import { Footer } from './Footer';

export function PoellaPage() {
  return (
    <ReactProviders>
      <Header />
      <Poella />
      <Footer />
    </ReactProviders>
  );
}
