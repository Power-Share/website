import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

function EnergyNetwork() {
  const houses = [
    { x: 150, y: 120 },
    { x: 380, y: 80 },
    { x: 600, y: 130 },
    { x: 250, y: 280 },
    { x: 500, y: 260 },
    { x: 720, y: 300 },
  ];

  const connections = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5],
  ];

  return (
    <svg
      viewBox="0 0 900 400"
      className="absolute inset-0 w-full h-full opacity-20"
      fill="none"
    >
      {connections.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={houses[a].x}
          y1={houses[a].y}
          x2={houses[b].x}
          y2={houses[b].y}
          stroke="#0ABAB5"
          strokeWidth="1.5"
          strokeDasharray="8 4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, strokeDashoffset: [0, -40] }}
          transition={{
            pathLength: { duration: 2, delay: i * 0.2 },
            strokeDashoffset: { duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.2 },
          }}
        />
      ))}
      {houses.map((h, i) => (
        <g key={i}>
          <motion.path
            d={`M${h.x - 14} ${h.y + 4} L${h.x} ${h.y - 12} L${h.x + 14} ${h.y + 4} L${h.x + 14} ${h.y + 16} L${h.x - 14} ${h.y + 16}Z`}
            stroke="#0ABAB5"
            strokeWidth="1.5"
            fill="#0ABAB5"
            fillOpacity="0.15"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
          />
          <motion.circle
            cx={h.x}
            cy={h.y + 2}
            r="3"
            fill="#0ABAB5"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ delay: 1 + i * 0.2, duration: 2, repeat: Infinity }}
          />
        </g>
      ))}
    </svg>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy overflow-hidden">
      <EnergyNetwork />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
        >
          Your energy.{' '}
          <span className="text-teal">Visible.</span>{' '}
          <span className="text-teal-light">Shared.</span>{' '}
          <span className="text-amber">Valued.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
        >
          Power Share FlexCo turns your home into an active participant in the
          energy transition. See what you generate, share your flexibility, earn
          from it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#how-it-works"
            className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:border-white/60 transition-colors"
          >
            See how it works
          </a>
          <a
            href="#contact"
            className="bg-teal text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-dark transition-colors"
          >
            Get Started
          </a>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="text-white/40" size={28} />
      </motion.div>
    </section>
  );
}
