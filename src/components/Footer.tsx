import { Logo } from './Logo';
import { Globe, ExternalLink, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Logo variant="full" className="text-white mb-4" />
            <p className="text-sm text-white/60 leading-relaxed">
              Turning homes into active participants in the energy transition.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-sm hover:text-teal transition-colors">How It Works</a></li>
              <li><a href="#communities" className="text-sm hover:text-teal transition-colors">For Communities</a></li>
              <li><a href="#utilities" className="text-sm hover:text-teal transition-colors">For Utilities</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-sm hover:text-teal transition-colors">About</a></li>
              <li><a href="#contact" className="text-sm hover:text-teal transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm hover:text-teal transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-white/60 mb-3">Stay updated on energy community news.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal"
              />
              <button
                type="submit"
                className="bg-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-dark transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            &copy; 2026 Power Share FlexCo. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-white/40 hover:text-teal transition-colors">Privacy</a>
            <a href="#" className="text-sm text-white/40 hover:text-teal transition-colors">Terms</a>
            <a href="#" className="text-sm text-white/40 hover:text-teal transition-colors">Imprint</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 hover:text-teal transition-colors" aria-label="Website"><Globe size={18} /></a>
            <a href="#" className="text-white/40 hover:text-teal transition-colors" aria-label="LinkedIn"><ExternalLink size={18} /></a>
            <a href="#" className="text-white/40 hover:text-teal transition-colors" aria-label="Contact"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
