"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from '../../i18n/LanguageContext';

function DashboardPreview() {
  const { t } = useLanguage();

  // SVG area chart data points (6am to 6pm, 13 hours)
  const chartWidth = 280;
  const chartHeight = 120;
  const hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  // Production curve (solar bell curve)
  const production = [0, 0.3, 1.2, 2.8, 3.8, 4.2, 4.5, 4.3, 3.6, 2.4, 1.1, 0.3, 0];
  // Consumption curve (more flat with morning/evening peaks)
  const consumption = [1.2, 1.8, 2.2, 1.6, 1.4, 1.5, 2.0, 1.8, 1.6, 2.0, 2.4, 2.8, 2.2];

  const maxVal = 5;
  const xScale = (i: number) => (i / (hours.length - 1)) * chartWidth;
  const yScale = (v: number) => chartHeight - (v / maxVal) * chartHeight;

  const productionPoints = production.map((v, i) => `${xScale(i)},${yScale(v)}`).join(" ");
  const consumptionPoints = consumption.map((v, i) => `${xScale(i)},${yScale(v)}`).join(" ");

  // Area fill path for production
  const productionAreaPath = `M0,${chartHeight} ` +
    production.map((v, i) => `L${xScale(i)},${yScale(v)}`).join(" ") +
    ` L${chartWidth},${chartHeight} Z`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 80, rotate: 4 }}
      animate={{ opacity: 1, x: 0, rotate: 2 }}
      transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-sm mx-auto lg:mx-0"
    >
      {/* Glow behind the card */}
      <div className="absolute -inset-4 bg-teal/10 rounded-3xl blur-2xl" />

      {/* Dashboard card */}
      <div className="relative bg-navy rounded-2xl shadow-2xl overflow-hidden p-5 text-white">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-wider">{t('hero.dashboard.yourHome')}</p>
            <p className="text-xs text-white/40 mt-0.5">Today, 14:32</p>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green animate-energy-pulse" />
            <span className="text-xs text-green font-medium">{t('hero.dashboard.live')}</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-navy-light rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] text-white/40 font-medium">{t('hero.dashboard.energyToday')}</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-amber rounded-full inline-block" />
                <span className="text-[9px] text-white/40">{t('hero.dashboard.production')}</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-0.5 bg-teal rounded-full inline-block" />
                <span className="text-[9px] text-white/40">{t('hero.dashboard.consumption')}</span>
              </span>
            </div>
          </div>

          <svg viewBox={`-10 -5 ${chartWidth + 20} ${chartHeight + 25}`} className="w-full">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1={0}
                y1={yScale(i + 1)}
                x2={chartWidth}
                y2={yScale(i + 1)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="0.5"
              />
            ))}

            {/* Production area fill */}
            <motion.path
              d={productionAreaPath}
              fill="url(#productionGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />

            {/* Production line */}
            <motion.polyline
              points={productionPoints}
              fill="none"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
            />

            {/* Consumption line */}
            <motion.polyline
              points={consumptionPoints}
              fill="none"
              stroke="#0ABAB5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="4 2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
            />

            {/* Gradient definition */}
            <defs>
              <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F5A623" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F5A623" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* X-axis labels */}
            {[0, 3, 6, 9, 12].map((i) => (
              <text
                key={i}
                x={xScale(i)}
                y={chartHeight + 14}
                textAnchor="middle"
                fill="rgba(255,255,255,0.3)"
                fontSize="8"
              >
                {hours[i]}:00
              </text>
            ))}
          </svg>
        </div>

        {/* Stat pills */}
        <motion.div
          className="grid grid-cols-3 gap-2 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="bg-navy-light rounded-lg px-2.5 py-2 text-center">
            <p className="text-[10px] text-white/40 mb-0.5">{t('hero.dashboard.generated')}</p>
            <p className="text-sm font-semibold text-amber">
              <span className="mr-0.5">☀</span>4.2 kWh
            </p>
          </div>
          <div className="bg-navy-light rounded-lg px-2.5 py-2 text-center">
            <p className="text-[10px] text-white/40 mb-0.5">{t('hero.dashboard.battery')}</p>
            <p className="text-sm font-semibold text-green">
              <span className="mr-0.5">🔋</span>87%
            </p>
          </div>
          <div className="bg-navy-light rounded-lg px-2.5 py-2 text-center">
            <p className="text-[10px] text-white/40 mb-0.5">{t('hero.dashboard.shared')}</p>
            <p className="text-sm font-semibold text-teal-light">
              <span className="mr-0.5">↗</span>1.8 kWh
            </p>
          </div>
        </motion.div>

        {/* Community rank */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <p className="text-[11px] text-white/30">
            {t('hero.dashboard.communityRank')} <span className="text-teal-light font-medium">#12</span> of 48 homes
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}


const partnerLogos = [
  "Wien Energie",
  "E-Control",
  "GridX",
  "Verbund",
];

export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative bg-white dark:bg-bg-primary overflow-hidden">
      {/* Main hero area */}
      <div className="relative min-h-screen flex items-center">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cloud/60 dark:bg-navy-light/30 hidden lg:block" />

        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left side — text content */}
            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal/10 text-teal text-sm font-medium">
                  {t('hero.badge')}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                {t('hero.title1')} <span className="text-teal">{t('hero.titleHighlight')}</span>.
                <br />
                {t('hero.title2')}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-5 text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t('hero.subtitle')}
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="mt-8 flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <a
                  href="#contact"
                  className="inline-flex items-center px-7 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors shadow-lg shadow-teal/20"
                >
                  {t('hero.cta1')}
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium hover:text-teal transition-colors group"
                >
                  {t('hero.cta2')}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </a>
              </motion.div>

            </div>

            {/* Right side — dashboard preview */}
            <div className="relative z-10 flex justify-center lg:justify-end">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>

      {/* Partner logos strip */}
      <div className="relative bg-gray-50 dark:bg-navy border-t border-gray-100 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="text-sm text-gray-400 dark:text-gray-500 mr-4">{t('hero.partners')}</span>
            {partnerLogos.map((name, i) => (
              <span key={name} className="flex items-center">
                {i > 0 && (
                  <span className="text-gray-300 dark:text-gray-600 mx-3 hidden sm:inline">
                    ·
                  </span>
                )}
                <span className="text-sm font-medium text-gray-400 dark:text-gray-500 tracking-wide">
                  {name}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
