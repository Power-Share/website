import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, BarChart3, Share2, Wallet } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Zap,
    title: 'Connect',
    description:
      'Pair your devices via MIOTY or Zigbee. No Wi-Fi dependency — works in basements, rural areas, and industrial sites. One gateway covers an entire neighborhood.',
    color: 'text-amber',
    bg: 'bg-amber/10',
  },
  {
    num: '02',
    icon: BarChart3,
    title: 'See',
    description:
      'Watch your energy generation, storage, and consumption in real time through your personal dashboard. Understand your home\'s energy story at a glance.',
    color: 'text-teal',
    bg: 'bg-teal/10',
  },
  {
    num: '03',
    icon: Share2,
    title: 'Share',
    description:
      'Your flexibility is pooled with your community automatically. Power Share optimizes across every home — PV, batteries, heat pumps, EV chargers.',
    color: 'text-green',
    bg: 'bg-green/10',
  },
  {
    num: '04',
    icon: Wallet,
    title: 'Earn',
    description:
      'Revenue from grid services flows back to you and your community. Track your earnings daily and see how your flexibility creates value.',
    color: 'text-coral',
    bg: 'bg-coral/10',
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="how-it-works" className="py-24 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-navy text-center mb-4"
        >
          Four steps to power sharing
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-center mb-16 max-w-lg mx-auto"
        >
          From device to community to grid — in minutes, not months.
        </motion.p>

        <div className="space-y-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-shrink-0 relative">
                <span className="text-8xl font-black text-teal/10 absolute -top-6 -left-4 select-none">
                  {step.num}
                </span>
                <div className={`w-20 h-20 rounded-2xl ${step.bg} flex items-center justify-center relative`}>
                  <step.icon className={step.color} size={36} />
                </div>
              </div>
              <div className={`text-center md:text-left ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                <h3 className="text-2xl font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-md">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
