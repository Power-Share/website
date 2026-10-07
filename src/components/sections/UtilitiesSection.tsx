import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, Radio, CheckCircle, Layers } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

const codeSnippet = `{
  "dispatch_id": "dsp_7x9k2m",
  "status": "confirmed",
  "portfolio": "community_vienna_12",
  "flexibility_delivered": {
    "power_kw": 45.2,
    "duration_min": 30,
    "assets": ["bess_001", "hp_003", "ev_007"]
  },
  "forecast_accuracy": 0.97,
  "timestamp": "2026-10-07T14:30:00Z"
}`;

export function UtilitiesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const capabilities = [
    {
      icon: Clock,
      title: t('utilities.cap1.title'),
      description: t('utilities.cap1.desc'),
    },
    {
      icon: Radio,
      title: t('utilities.cap2.title'),
      description: t('utilities.cap2.desc'),
    },
    {
      icon: CheckCircle,
      title: t('utilities.cap3.title'),
      description: t('utilities.cap3.desc'),
    },
    {
      icon: Layers,
      title: t('utilities.cap4.title'),
      description: t('utilities.cap4.desc'),
    },
  ];

  return (
    <section id="utilities" className="py-24 bg-navy" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('utilities.title')}
          </h2>
          <p className="text-xl text-teal font-medium">
            {t('utilities.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="bg-navy-light border border-white/10 rounded-xl p-6 hover:border-teal/40 transition-colors"
            >
              <cap.icon className="text-teal mb-4" size={28} />
              <h3 className="text-white font-semibold mb-2">{cap.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="bg-navy-light rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-coral" />
            <div className="w-3 h-3 rounded-full bg-amber" />
            <div className="w-3 h-3 rounded-full bg-green" />
            <span className="text-white/40 text-sm ml-3 font-mono">dispatch_confirmation.json</span>
          </div>
          <pre className="p-6 text-sm text-teal-light font-mono overflow-x-auto">
            <code>{codeSnippet}</code>
          </pre>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#contact"
            className="inline-flex border-2 border-teal text-teal px-8 py-3 rounded-full font-semibold hover:bg-teal hover:text-white transition-colors"
          >
            {t('utilities.cta')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
