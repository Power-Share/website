import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const stats = [
  { value: 2400, suffix: '+', label: 'Homes Connected' },
  { value: 12.5, suffix: ' MWh', label: 'Shared Today', decimals: 1 },
  { value: 3.2, suffix: 't', label: 'CO₂ Avoided', decimals: 1 },
  { value: 47000, prefix: '€', label: 'Community Earnings' },
];

function CountUp({ target, decimals = 0, prefix = '', suffix = '' }: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.floor(value).toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="bg-teal py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                <CountUp
                  target={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-white/80 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
