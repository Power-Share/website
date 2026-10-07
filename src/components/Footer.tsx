import { useState } from 'react';
import { Logo } from './Logo';
import { Globe, Code, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

export function Footer() {
  const { t } = useLanguage();
  const [nlEmail, setNlEmail] = useState('');
  const [nlStatus, setNlStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  return (
    <footer className="bg-navy text-white/80">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <Logo variant="full" className="text-white mb-4" />
            <p className="text-sm text-white/60 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('footer.product')}</h4>
            <ul className="space-y-3">
              <li><a href="#how-it-works" className="text-sm hover:text-teal transition-colors">{t('footer.howItWorks')}</a></li>
              <li><a href="#communities" className="text-sm hover:text-teal transition-colors">{t('footer.forCommunities')}</a></li>
              <li><a href="#utilities" className="text-sm hover:text-teal transition-colors">{t('footer.forUtilities')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('footer.company')}</h4>
            <ul className="space-y-3">
              <li><a href="#contact" className="text-sm hover:text-teal transition-colors">{t('footer.contact')}</a></li>
              <li><a href="#imprint" className="text-sm hover:text-teal transition-colors">{t('footer.imprint')}</a></li>
              <li><a href="#privacy" className="text-sm hover:text-teal transition-colors">{t('footer.privacy')}</a></li>
              <li><a href="#terms" className="text-sm hover:text-teal transition-colors">{t('footer.terms')}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{t('footer.newsletter')}</h4>
            <p className="text-sm text-white/60 mb-3">{t('footer.newsletterDesc')}</p>
            {nlStatus === 'success' ? (
              <div className="flex items-center gap-2 text-green text-sm">
                <CheckCircle size={16} />
                <span>{t('footer.nlSuccess')}</span>
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={async (e) => {
                e.preventDefault();
                if (!nlEmail) return;
                setNlStatus('submitting');
                try {
                  if (FORM_ENDPOINT) {
                    await fetch(FORM_ENDPOINT, {
                      method: 'POST',
                      mode: 'no-cors',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ type: 'newsletter', email: nlEmail, source: 'website-footer' }),
                    });
                  }
                  setNlStatus('success');
                  setNlEmail('');
                } catch {
                  setNlStatus('error');
                }
              }}>
                <input
                  type="email"
                  required
                  value={nlEmail}
                  onChange={(e) => setNlEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-sm text-white placeholder-white/40 focus:outline-none focus:border-teal"
                />
                <button
                  type="submit"
                  disabled={nlStatus === 'submitting'}
                  className="bg-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-teal-dark transition-colors disabled:opacity-60 flex items-center gap-1"
                >
                  {nlStatus === 'submitting' ? <Loader2 className="animate-spin" size={14} /> : t('footer.join')}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <a href="https://power-share.io" className="text-white/40 hover:text-teal transition-colors" aria-label="Website"><Globe size={18} /></a>
            <a href="https://github.com/Power-Share" className="text-white/40 hover:text-teal transition-colors" aria-label="GitHub"><Code size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
