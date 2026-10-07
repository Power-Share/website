"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    initials: 'MK',
    name: 'Maria K.',
    location: 'Wien, 22. Bezirk',
    quote:
      "I had no idea how much solar energy I was wasting until Power Share showed me. Now my battery and my neighbor's EV charger work together \u2014 I've cut my bill by 40%.",
    color: 'bg-teal',
  },
  {
    initials: 'TH',
    name: 'Thomas H.',
    location: 'Graz, Andritz',
    quote:
      'The setup took 15 minutes. The app shows everything in real time \u2014 when I\'m generating, when I\'m sharing, what I earn. It just works.',
    color: 'bg-amber',
  },
  {
    initials: 'SB',
    name: 'Sarah B.',
    location: 'Linz, Urfahr',
    quote:
      "Our whole street is on Power Share now. We've become an actual energy community \u2014 sharing surplus solar in summer and coordinating heat pumps in winter.",
    color: 'bg-coral',
  },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="testimonials" className="py-24 bg-cloud" ref={ref}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-navy text-center mb-16"
        >
          What our members say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.initials}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
              className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center"
            >
              {/* Avatar */}
              <div
                className={`w-14 h-14 ${t.color} rounded-full flex items-center justify-center mb-4`}
              >
                <span className="text-white font-bold text-lg">{t.initials}</span>
              </div>

              {/* Name & location */}
              <p className="font-semibold text-navy">{t.name}</p>
              <p className="text-sm text-gray-400 mb-4">{t.location}</p>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={16}
                    className="text-amber fill-amber"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 italic leading-relaxed text-sm">
                &ldquo;{t.quote}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-14"
        >
          <p className="text-gray-500 mb-2">
            Join households across Austria already sharing power
          </p>
          <a
            href="#cta"
            className="text-teal font-semibold hover:text-teal-dark transition-colors"
          >
            Get started &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
