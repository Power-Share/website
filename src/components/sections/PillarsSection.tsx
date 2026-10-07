import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Eye, Share2, Users } from 'lucide-react';

const pillars = [
  {
    icon: Eye,
    title: 'See Your Energy',
    description:
      'Real-time visualization of what your home generates, stores, and shares. No jargon, no hidden complexity.',
    color: 'border-amber',
    iconColor: 'text-amber',
  },
  {
    icon: Share2,
    title: 'Share Flexibility',
    description:
      'Your battery, heat pump, and EV charger are assets. Offer their flexibility to the grid and earn from it.',
    color: 'border-teal',
    iconColor: 'text-teal',
  },
  {
    icon: Users,
    title: 'Stronger Together',
    description:
      "Energy communities pool resources. When your neighbor's solar peaks while your battery has room, everyone benefits.",
    color: 'border-green',
    iconColor: 'text-green',
  },
];

export function PillarsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-24 bg-cloud" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-navy text-center mb-16"
        >
          Energy that works for you
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`bg-white rounded-2xl p-8 border-t-4 ${pillar.color} shadow-sm hover:shadow-md transition-shadow`}
            >
              <pillar.icon className={`${pillar.iconColor} mb-4`} size={32} />
              <h3 className="text-xl font-bold text-navy mb-3">{pillar.title}</h3>
              <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
