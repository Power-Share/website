"use client";

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CheckCircle, Loader2 } from 'lucide-react';

// Set this to your deployed Google Apps Script URL
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');

    try {
      if (FORM_ENDPOINT) {
        await fetch(FORM_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, role, source: 'website' }),
        });
      }
      setStatus('success');
      setName('');
      setEmail('');
      setRole('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" ref={ref} className="py-24 bg-teal">
      <div className="max-w-2xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-white text-center mb-4"
        >
          {t('cta.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-white/90 text-center text-lg mb-12"
        >
          {t('cta.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white dark:bg-navy-light rounded-2xl shadow-xl p-8 md:p-10"
        >
          {status === 'success' ? (
            <div className="text-center py-8">
              <CheckCircle className="text-green mx-auto mb-4" size={48} />
              <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
                {t('cta.successTitle')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {t('cta.form.disclaimer')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('cta.form.name')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 text-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-navy focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('cta.form.email')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 text-navy dark:text-white placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-navy focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors"
                />
              </div>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal transition-colors bg-white dark:bg-navy appearance-none ${
                  role ? 'text-navy dark:text-white' : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                <option value="" disabled>{t('cta.form.role')}</option>
                <option value="homeowner">{t('cta.form.homeowner')}</option>
                <option value="renter">{t('cta.form.renter')}</option>
                <option value="organizer">{t('cta.form.organizer')}</option>
                <option value="utility">{t('cta.form.utility')}</option>
                <option value="curious">{t('cta.form.curious')}</option>
              </select>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-navy text-white font-semibold py-3.5 rounded-lg hover:bg-navy-light transition-colors text-base flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {status === 'submitting' && <Loader2 className="animate-spin" size={18} />}
                {t('cta.form.submit')}
              </button>

              {status === 'error' && (
                <p className="text-coral text-sm text-center">{t('cta.errorMsg')}</p>
              )}
            </form>
          )}

          {status !== 'success' && (
            <p className="text-gray-400 dark:text-gray-500 text-xs text-center mt-4">
              {t('cta.form.disclaimer')}
            </p>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white/60 text-sm text-center mt-8"
        >
          {t('cta.contact')}{' '}
          <a
            href="mailto:hello@power-share.io"
            className="underline underline-offset-2 hover:text-white transition-colors"
          >
            hello@power-share.io
          </a>
        </motion.p>
      </div>
    </section>
  );
}
