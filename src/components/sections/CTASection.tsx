import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24"
      style={{
        background: 'linear-gradient(135deg, #0ABAB5 0%, #089E9A 40%, #1A2332 100%)',
      }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-5xl font-bold text-white mb-4"
        >
          Ready to power share?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-white/80 text-lg mb-10"
        >
          Whether you're a homeowner, a community organizer, or a utility — let's talk.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-5 py-3 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:border-white"
          />
          <button
            type="submit"
            className="bg-white text-teal-dark px-8 py-3 rounded-full font-bold hover:bg-white/90 transition-colors"
          >
            Get Started
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <a
            href="#"
            className="text-white/60 hover:text-white text-sm underline underline-offset-4 transition-colors"
          >
            Or schedule a demo →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
