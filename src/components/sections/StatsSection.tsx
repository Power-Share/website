import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { Clock, Cpu, Eye, MapPin } from 'lucide-react';

export function StatsSection() {
  const { t } = useLanguage();

  const usps = [
    { icon: MapPin, title: t('stats.local.title'), desc: t('stats.local.desc') },
    { icon: Clock, title: t('stats.fast.title'), desc: t('stats.fast.desc') },
    { icon: Cpu, title: t('stats.smart.title'), desc: t('stats.smart.desc') },
    { icon: Eye, title: t('stats.transparent.title'), desc: t('stats.transparent.desc') },
  ];

  return (
    <section className="bg-teal py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {usps.map((usp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <usp.icon className="w-8 h-8 text-white mx-auto mb-3" strokeWidth={1.5} />
              <div className="text-lg md:text-xl font-bold text-white mb-1">
                {usp.title}
              </div>
              <div className="text-white/80 text-sm font-medium">{usp.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
