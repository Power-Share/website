"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingDown, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export function SavingsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { t } = useLanguage();

  return (
    <section id="savings" className="py-24 bg-white dark:bg-bg-primary" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-navy dark:text-white text-center mb-4"
        >
          {t('savings.title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-500 dark:text-gray-400 text-center mb-16 max-w-lg mx-auto"
        >
          {t('savings.subtitle')}
        </motion.p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
          {/* Without Power Share */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full md:w-80 bg-gray-50 dark:bg-navy border border-gray-200 dark:border-white/10 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center">
                <TrendingDown className="text-coral" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-navy dark:text-white">{t('savings.without.title')}</h3>
            </div>

            <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">{t('savings.without.monthlyBill')}</p>
            <p className="text-5xl font-bold text-coral mb-6">€187</p>

            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>{t('savings.without.gridImport')}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">420 kWh</span>
              </div>
              <div className="flex justify-between">
                <span>{t('savings.without.solarWasted')}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">38%</span>
              </div>
              <div className="flex justify-between">
                <span>{t('savings.without.flexRevenue')}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">€0</span>
              </div>
            </div>
          </motion.div>

          {/* Arrow connector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="flex-shrink-0"
          >
            <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center">
              <ArrowRight className="text-teal rotate-90 md:rotate-0" size={24} />
            </div>
          </motion.div>

          {/* With Power Share */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full md:w-80 bg-white dark:bg-navy-light border-2 border-teal rounded-2xl p-8 shadow-lg relative"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center">
                <CheckCircle className="text-green" size={22} />
              </div>
              <h3 className="text-lg font-semibold text-navy dark:text-white">{t('savings.with.title')}</h3>
            </div>

            <p className="text-sm text-gray-400 dark:text-gray-500 mb-1">{t('savings.with.monthlyBill')}</p>
            <p className="text-5xl font-bold text-green mb-6">€94</p>

            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex justify-between">
                <span>{t('savings.with.gridImport')}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">185 kWh</span>
              </div>
              <div className="flex justify-between">
                <span>{t('savings.with.selfConsumption')}</span>
                <span className="font-medium text-gray-700 dark:text-gray-300">89%</span>
              </div>
              <div className="flex justify-between">
                <span>{t('savings.with.flexRevenue')}</span>
                <span className="font-medium text-green">+€32</span>
              </div>
            </div>

            {/* Savings badge */}
            <div className="absolute -top-3 -right-3 bg-green text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
              {t('savings.badge')}
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-gray-400 dark:text-gray-500 mt-12"
        >
          {t('savings.disclaimer')}
        </motion.p>
      </div>
    </section>
  );
}
