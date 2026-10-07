"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Smartphone, BarChart3, Coins } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { t } = useLanguage();

  const steps = [
    {
      num: 1,
      icon: Smartphone,
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
      circleColor: 'bg-teal',
    },
    {
      num: 2,
      icon: BarChart3,
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
      circleColor: 'bg-amber',
    },
    {
      num: 3,
      icon: Coins,
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
      circleColor: 'bg-green',
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-bg-primary" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-navy dark:text-white text-center mb-4"
        >
          {t('howItWorks.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-500 dark:text-gray-400 text-center mb-20 max-w-lg mx-auto"
        >
          {t('howItWorks.subtitle')}
        </motion.p>

        {/* Timeline */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className="flex flex-col md:flex-row items-center flex-1">
              {/* Step */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
                className="flex flex-col items-center text-center max-w-[260px]"
              >
                {/* Icon circle with badge */}
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 rounded-full ${step.circleColor} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="text-white" size={32} strokeWidth={1.8} />
                  </div>
                  {/* Number badge */}
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center shadow-md ring-2 ring-white dark:ring-bg-primary">
                    {step.num}
                  </span>
                </div>

                {/* Text */}
                <h3 className="text-xl font-bold text-navy dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>

              {/* Connector line */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.4 }}
                  className="flex items-center justify-center"
                >
                  {/* Vertical dashed line on mobile */}
                  <div className="md:hidden w-px h-10 border-l-2 border-dashed border-gray-300 dark:border-gray-600 my-2" />
                  {/* Horizontal dashed line on desktop */}
                  <div className="hidden md:block w-full min-w-[40px] h-px border-t-2 border-dashed border-gray-300 dark:border-gray-600 mt-10 mx-4 flex-1" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* CTA link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="text-teal font-semibold hover:text-teal-dark transition-colors text-lg"
          >
            {t('howItWorks.cta')} &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
