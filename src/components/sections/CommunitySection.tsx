import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

function DashboardMockup() {
  return (
    <svg viewBox="0 0 480 320" fill="none" className="w-full rounded-2xl shadow-2xl">
      <rect width="480" height="320" rx="16" fill="#1A2332" />
      {/* Title bar */}
      <rect x="16" y="16" width="448" height="40" rx="8" fill="#243044" />
      <circle cx="36" cy="36" r="6" fill="#FF6B6B" />
      <circle cx="56" cy="36" r="6" fill="#F5A623" />
      <circle cx="76" cy="36" r="6" fill="#34C759" />
      <text x="240" y="41" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">Community Dashboard</text>

      {/* Stats row */}
      <rect x="16" y="72" width="140" height="64" rx="8" fill="#243044" />
      <text x="32" y="94" fill="#0ABAB5" fontSize="11">Generation</text>
      <text x="32" y="120" fill="white" fontSize="20" fontWeight="700">42.8 kWh</text>

      <rect x="170" y="72" width="140" height="64" rx="8" fill="#243044" />
      <text x="186" y="94" fill="#F5A623" fontSize="11">Self-consumption</text>
      <text x="186" y="120" fill="white" fontSize="20" fontWeight="700">87%</text>

      <rect x="324" y="72" width="140" height="64" rx="8" fill="#243044" />
      <text x="340" y="94" fill="#34C759" fontSize="11">Earnings today</text>
      <text x="340" y="120" fill="white" fontSize="20" fontWeight="700">€12.40</text>

      {/* Bar chart */}
      <rect x="16" y="152" width="280" height="152" rx="8" fill="#243044" />
      <text x="32" y="176" fill="white" fontSize="12" fontWeight="600">Community Energy Flow</text>
      {[80, 100, 60, 110, 90, 70, 95].map((h, i) => (
        <g key={i}>
          <rect x={36 + i * 36} y={280 - h} width="20" height={h} rx="4" fill="#0ABAB5" fillOpacity="0.7" />
          <rect x={36 + i * 36} y={280 - h * 0.6} width="20" height={h * 0.6} rx="4" fill="#0ABAB5" />
        </g>
      ))}

      {/* Pie chart */}
      <rect x="312" y="152" width="152" height="152" rx="8" fill="#243044" />
      <text x="328" y="176" fill="white" fontSize="12" fontWeight="600">Source Mix</text>
      <circle cx="388" cy="252" r="40" fill="none" stroke="#0ABAB5" strokeWidth="12" strokeDasharray="175 76" />
      <circle cx="388" cy="252" r="40" fill="none" stroke="#F5A623" strokeWidth="12" strokeDasharray="0 175 50 26" />
      <circle cx="388" cy="252" r="40" fill="none" stroke="#34C759" strokeWidth="12" strokeDasharray="0 225 26 0" />
    </svg>
  );
}

export function CommunitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const features = [
    t('community.feature1'),
    t('community.feature2'),
    t('community.feature3'),
    t('community.feature4'),
    t('community.feature5'),
    t('community.feature6'),
  ];

  return (
    <section id="communities" className="py-24 bg-cloud dark:bg-bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-navy dark:text-white text-center mb-4"
        >
          {t('community.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-center mb-16 max-w-lg mx-auto"
        >
          {t('community.subtitle')}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <ul className="space-y-4 mb-8">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-teal" size={14} />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="inline-flex bg-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-dark transition-colors"
            >
              {t('community.cta')}
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
