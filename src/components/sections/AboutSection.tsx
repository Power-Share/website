import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Leaf, Globe } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Your data, your control',
    description: 'Transparent, auditable energy data. You decide what is shared, with whom, and on what terms.',
  },
  {
    icon: Leaf,
    title: 'Climate action at home',
    description: 'Every kilowatt-hour optimized is a step toward decarbonization. Your home becomes part of the solution.',
  },
  {
    icon: Globe,
    title: 'Open infrastructure',
    description: 'Built on open standards (IEC, MIOTY, Zigbee). No vendor lock-in, no walled gardens.',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            About Power Share FlexCo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg">
            We believe the energy transition happens at home. Power Share FlexCo builds the
            infrastructure that turns every household into an active participant — visible,
            connected, and fairly compensated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal/10 flex items-center justify-center mx-auto mb-4">
                <val.icon className="text-teal" size={28} />
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{val.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{val.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
