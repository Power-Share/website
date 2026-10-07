"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SNAP_TRANSITION = {
  duration: 0.3,
  ease: [0.16, 1, 0.3, 1] as const,
};

function useSnap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return { ref, inView };
}

/* ------------------------------------------------------------------ */
/*  1. HERO                                                           */
/* ------------------------------------------------------------------ */
function Hero() {
  const { ref, inView } = useSnap();

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col justify-center bg-white px-8 md:px-16 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={SNAP_TRANSITION}
      >
        <h1
          className="leading-[0.9] font-black uppercase text-black"
          style={{ fontSize: "clamp(64px, 10vw, 200px)" }}
        >
          POWER
          <br />
          SHARE
        </h1>
      </motion.div>

      {/* Thick horizontal rule */}
      <motion.div
        className="my-8 h-1 w-full bg-black"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ ...SNAP_TRANSITION, delay: 0.1 }}
        style={{ transformOrigin: "left" }}
      />

      <motion.p
        className="text-2xl font-thin tracking-tight text-black md:text-3xl"
        style={{ fontWeight: 100 }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ ...SNAP_TRANSITION, delay: 0.15 }}
      >
        Flexibility for the grid. Visibility for you.
      </motion.p>

      {/* Teal accent circle — right edge */}
      <motion.div
        className="absolute right-8 top-1/2 h-10 w-10 bg-teal md:right-16 lg:right-24"
        style={{ borderRadius: "50%" }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ ...SNAP_TRANSITION, delay: 0.2 }}
      />

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-8 md:left-16 lg:left-24">
        <span
          className="text-gray-400"
          style={{
            fontSize: "10px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          SCROLL ↓
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. MANIFESTO                                                      */
/* ------------------------------------------------------------------ */
function Manifesto() {
  const { ref, inView } = useSnap();

  return (
    <section
      ref={ref}
      className="bg-white px-8 py-32 md:px-16 lg:px-24"
    >
      <div className="flex flex-col gap-12 md:flex-row">
        {/* Left column — label */}
        <motion.div
          className="md:w-[30%]"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={SNAP_TRANSITION}
        >
          <span
            className="text-gray-400"
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            WHAT WE DO
          </span>
          <p
            className="mt-4 text-gray-200"
            style={{ fontSize: "120px", fontWeight: 100, lineHeight: 1 }}
          >
            01
          </p>
        </motion.div>

        {/* Right column — body text */}
        <motion.div
          className="md:w-[70%]"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ ...SNAP_TRANSITION, delay: 0.1 }}
        >
          <p
            className="text-black"
            style={{ fontSize: "clamp(20px, 2.4vw, 28px)", fontWeight: 300, lineHeight: 1.5 }}
          >
            We make energy{" "}
            <span className="text-teal" style={{ fontWeight: 300 }}>
              visible
            </span>
            . Every kilowatt your home generates, stores, or shares — tracked,
            optimized, and fairly valued. No black boxes. No wasted flexibility.
          </p>
        </motion.div>
      </div>

      {/* Thin divider */}
      <motion.div
        className="mt-32 h-px w-full bg-black"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ ...SNAP_TRANSITION, delay: 0.15 }}
        style={{ transformOrigin: "left" }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. NUMBERS                                                        */
/* ------------------------------------------------------------------ */
const METRICS = [
  { value: "2,847", label: "CONNECTED HOMES", teal: false },
  { value: "14.2", label: "MWH SHARED TODAY", teal: false },
  { value: "97%", label: "FORECAST ACCURACY", teal: true },
  { value: "€52K", label: "COMMUNITY EARNINGS", teal: false },
];

function Numbers() {
  const { ref, inView } = useSnap();

  return (
    <section
      ref={ref}
      className="bg-white px-8 py-32 md:px-16 lg:px-24"
    >
      <div className="grid grid-cols-2 md:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            className="flex flex-col items-start py-8 md:py-0"
            style={{
              borderLeft: i > 0 ? "1px solid black" : "none",
              paddingLeft: i > 0 ? "clamp(16px, 3vw, 40px)" : 0,
              paddingRight: "clamp(16px, 3vw, 40px)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...SNAP_TRANSITION, delay: i * 0.05 }}
          >
            <span
              className={m.teal ? "text-teal" : "text-black"}
              style={{
                fontSize: "clamp(48px, 6vw, 100px)",
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              {m.value}
            </span>
            <span
              className="mt-4 text-gray-400"
              style={{
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              {m.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. PROCESS                                                        */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    num: "01",
    name: "CONNECT",
    desc: "Link your inverter, battery, or smart meter in minutes. We handle the protocol layer.",
    teal: false,
  },
  {
    num: "02",
    name: "OBSERVE",
    desc: "Real-time dashboards show every watt — produced, consumed, stored, exported.",
    teal: false,
  },
  {
    num: "03",
    name: "OPTIMIZE",
    desc: "AI-driven scheduling shifts loads, charges batteries at cheapest hours, maximizes self-consumption.",
    teal: true,
  },
  {
    num: "04",
    name: "EARN",
    desc: "Sell your surplus flexibility into energy markets. You keep the revenue, we keep the lights on.",
    teal: false,
  },
];

function Process() {
  const { ref, inView } = useSnap();

  return (
    <section
      ref={ref}
      className="bg-white px-8 py-32 md:px-16 lg:px-24"
    >
      {STEPS.map((step, i) => (
        <motion.div
          key={step.num}
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ ...SNAP_TRANSITION, delay: i * 0.06 }}
        >
          {/* Top rule */}
          <div className="h-px w-full bg-black" />

          <div className="flex flex-col gap-4 py-10 md:flex-row md:items-baseline md:gap-12">
            {/* Step number */}
            <span
              className="text-gray-200"
              style={{ fontSize: "100px", fontWeight: 100, lineHeight: 1, minWidth: "140px" }}
            >
              {step.num}
            </span>

            {/* Step name */}
            <span
              className={step.teal ? "text-teal" : "text-black"}
              style={{
                fontSize: "24px",
                fontWeight: 800,
                textTransform: "uppercase" as const,
                letterSpacing: "0.05em",
                minWidth: "180px",
              }}
            >
              {step.name}
            </span>

            {/* Description */}
            <p
              className="max-w-xl text-gray-600"
              style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.6 }}
            >
              {step.desc}
            </p>
          </div>
        </motion.div>
      ))}
      {/* Final rule */}
      <div className="h-px w-full bg-black" />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. STATEMENT                                                      */
/* ------------------------------------------------------------------ */
function Statement() {
  const { ref, inView } = useSnap();

  return (
    <section
      ref={ref}
      className="flex flex-col items-center justify-center bg-black px-8 py-40 md:px-16 lg:px-24"
    >
      <motion.p
        className="max-w-4xl text-center text-white"
        style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.3 }}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={SNAP_TRANSITION}
      >
        Where communities meet, power is exchanged.
      </motion.p>

      <motion.div
        className="mt-10 h-px bg-teal"
        style={{ width: "120px" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ ...SNAP_TRANSITION, delay: 0.1 }}
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. CTA                                                            */
/* ------------------------------------------------------------------ */
function CTA() {
  const { ref, inView } = useSnap();

  return (
    <section
      ref={ref}
      className="bg-white px-8 py-32 md:px-16 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={SNAP_TRANSITION}
      >
        <h2
          className="leading-[0.9] font-black uppercase text-black"
          style={{ fontSize: "clamp(56px, 9vw, 180px)" }}
        >
          LET'S
          <br />
          TALK.
        </h2>
      </motion.div>

      <motion.div
        className="mt-12 flex items-stretch"
        style={{ maxWidth: "480px" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ ...SNAP_TRANSITION, delay: 0.1 }}
      >
        <input
          type="email"
          placeholder="your@email.com"
          className="flex-1 border-2 border-black bg-transparent px-4 py-3 text-black outline-none placeholder:text-gray-400"
          style={{
            borderRadius: 0,
            fontSize: "16px",
            fontWeight: 400,
          }}
        />
        <button
          className="flex w-14 items-center justify-center border-2 border-l-0 border-black bg-black text-white"
          style={{ borderRadius: 0, fontSize: "20px" }}
          aria-label="Submit"
        >
          →
        </button>
      </motion.div>

      <motion.p
        className="mt-6 text-gray-400"
        style={{
          fontSize: "11px",
          letterSpacing: "0.1em",
          fontWeight: 400,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ ...SNAP_TRANSITION, delay: 0.15 }}
      >
        Or write to hello@power-share.io
      </motion.p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FULL PAGE EXPORT                                                  */
/* ------------------------------------------------------------------ */
export function NeoSwissSite() {
  return (
    <div className="bg-white" style={{ cursor: "default" }}>
      <Hero />
      <Manifesto />
      <Numbers />
      <Process />
      <Statement />
      <CTA />
    </div>
  );
}

export default NeoSwissSite;
