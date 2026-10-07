import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Share2, Users } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function PillarsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Eye,
      title: t('pillars.see.title'),
      description: t('pillars.see.desc'),
      color: 'border-amber',
      iconColor: 'text-amber',
    },
    {
      icon: Share2,
      title: t('pillars.share.title'),
      description: t('pillars.share.desc'),
      color: 'border-teal',
      iconColor: 'text-teal',
    },
    {
      icon: Users,
      title: t('pillars.together.title'),
      description: t('pillars.together.desc'),
      color: 'border-green',
      iconColor: 'text-green',
    },
  ];

  return (
    <section className="py-24 bg-cloud dark:bg-bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-navy dark:text-white text-center mb-16"
        >
          {t('pillars.title')}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`bg-white dark:bg-navy-light rounded-2xl p-8 border-t-4 ${pillar.color} shadow-sm hover:shadow-md transition-shadow`}
            >
              <pillar.icon className={`${pillar.iconColor} mb-4`} size={32} />
              <h3 className="text-xl font-bold text-navy dark:text-white mb-3">{pillar.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
