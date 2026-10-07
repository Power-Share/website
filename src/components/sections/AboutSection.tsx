import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Leaf, Globe } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { t } = useLanguage();

  const values = [
    {
      icon: Shield,
      title: t('about.value1.title'),
      description: t('about.value1.desc'),
    },
    {
      icon: Leaf,
      title: t('about.value2.title'),
      description: t('about.value2.desc'),
    },
    {
      icon: Globe,
      title: t('about.value3.title'),
      description: t('about.value3.desc'),
    },
  ];

  return (
    <section id="about" className="py-24 bg-white dark:bg-bg-primary" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
                <val.icon className="text-teal" size={28} />
              </div>
              <h3 className="text-lg font-bold text-navy dark:text-white mb-2">{val.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
