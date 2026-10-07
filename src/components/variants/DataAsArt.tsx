"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Noise overlay — CSS grain texture                                  */
/* ------------------------------------------------------------------ */
const noiseStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  pointerEvents: "none",
  zIndex: 9999,
  opacity: 0.045,
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  backgroundRepeat: "repeat",
  backgroundSize: "128px 128px",
};

/* ------------------------------------------------------------------ */
/*  Animated sine-wave field (Hero background)                         */
/* ------------------------------------------------------------------ */
function SineWaveField() {
  const svgRef = useRef<SVGSVGElement>(null);
  const frameRef = useRef(0);
  const phaseRef = useRef(0);

  const draw = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;
    phaseRef.current += 0.008;
    const paths = svg.querySelectorAll<SVGPathElement>("path");
    const w = 1200;
    paths.forEach((p, i) => {
      const y0 = 40 + i * 28;
      const amp = 12 + Math.sin(phaseRef.current * 0.3 + i * 0.5) * 6;
      const freq = 0.005 + i * 0.0008;
      const offset = phaseRef.current + i * 0.7;
      let d = `M0 ${y0}`;
      for (let x = 0; x <= w; x += 4) {
        const y = y0 + Math.sin(x * freq + offset) * amp;
        d += ` L${x} ${y.toFixed(1)}`;
      }
      p.setAttribute("d", d);
    });
    frameRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [draw]);

  const waveCount = 14;
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 440"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.18 }}
    >
      {Array.from({ length: waveCount }).map((_, i) => (
        <path
          key={i}
          fill="none"
          stroke="#e5e5e5"
          strokeWidth={0.8}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Pulsing teal dot                                                   */
/* ------------------------------------------------------------------ */
function PulsingDot({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`rounded-full ${className}`}
      style={{
        width: 10,
        height: 10,
        backgroundColor: "#0ABAB5",
      }}
      animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Counting number                                                    */
/* ------------------------------------------------------------------ */
function CountUp({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2,
}: {
  end: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(eased * end);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  const formatted = decimals > 0
    ? value.toFixed(decimals)
    : Math.round(value).toLocaleString("en-US");

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Live Grid Visualization (dot matrix)                               */
/* ------------------------------------------------------------------ */
function DotGrid() {
  const cols = 20;
  const rows = 12;
  const spacing = 28;
  const frameRef = useRef(0);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let tick = 0;
    const animate = () => {
      tick += 0.02;
      const svg = svgRef.current;
      if (!svg) return;
      const circles = svg.querySelectorAll<SVGCircleElement>("circle");
      circles.forEach((c) => {
        const cx = parseFloat(c.getAttribute("data-col") || "0");
        const cy = parseFloat(c.getAttribute("data-row") || "0");
        const wave = Math.sin(cx * 0.4 + tick) * Math.cos(cy * 0.5 + tick * 0.7);
        if (wave > 0.6) {
          c.setAttribute("fill", "#0ABAB5");
          c.setAttribute("r", "3.5");
          c.setAttribute("opacity", "1");
        } else if (wave > 0.15) {
          c.setAttribute("fill", "#F5A623");
          c.setAttribute("r", "2.8");
          c.setAttribute("opacity", "0.85");
        } else {
          c.setAttribute("fill", "#333");
          c.setAttribute("r", "2");
          c.setAttribute("opacity", "0.5");
        }
      });
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <svg
      ref={svgRef}
      width={cols * spacing}
      height={rows * spacing}
      viewBox={`0 0 ${cols * spacing} ${rows * spacing}`}
      className="mx-auto"
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, col) => (
          <circle
            key={`${r}-${col}`}
            cx={col * spacing + spacing / 2}
            cy={r * spacing + spacing / 2}
            r={2}
            fill="#333"
            opacity={0.5}
            data-col={col}
            data-row={r}
          />
        ))
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data Readout — terminal style                                      */
/* ------------------------------------------------------------------ */
function DataReadout() {
  const lines = [
    { time: "14:32:07", text: "DISPATCH confirmed — 45.2 kW across 3 assets" },
    { time: "14:32:04", text: "FORECAST updated — 24h rolling, accuracy 97.3%" },
    { time: "14:31:58", text: "FLEXIBILITY pooled — community_vienna_12" },
    { time: "14:31:45", text: "REVENUE credited — €12.40 to 28 members" },
  ];

  return (
    <div className="font-mono text-sm leading-relaxed space-y-2">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          className="flex gap-3"
        >
          <span className="opacity-50 shrink-0">[{line.time}]</span>
          <span>{line.text}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ================================================================== */
/*  MAIN COMPONENT                                                     */
/* ================================================================== */
export function DataAsArtSite() {
  const [email, setEmail] = useState("");

  return (
    <div className="relative bg-[#0a0a0a] text-white min-h-screen selection:bg-teal/30">
      {/* Noise grain overlay */}
      <div style={noiseStyle} />

      {/* ---- HERO ---- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <SineWaveField />

        <div className="relative z-10 text-center px-4">
          <h1
            className="font-black tracking-tighter leading-none uppercase"
            style={{ fontSize: "clamp(3rem, 9vw, 10rem)" }}
          >
            POWER SHARE
          </h1>

          <p
            className="font-mono text-[#777] mt-6 text-xs tracking-[0.3em] uppercase"
          >
            energy telemetry / control systems / flexibility
          </p>

          <div className="mt-10 flex justify-center">
            <PulsingDot />
          </div>
        </div>
      </section>

      {/* ---- METRICS ---- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-x-12 gap-y-20">
          {[
            { end: 2847, label: "Homes Connected", prefix: "", suffix: "", decimals: 0 },
            { end: 14.2, label: "MWh Dispatched Today", prefix: "", suffix: "", decimals: 1 },
            { end: 97.3, label: "% Forecast Accuracy", prefix: "", suffix: "%", decimals: 1 },
            { end: 52, label: "Earnings This Month", prefix: "€", suffix: "K", decimals: 0 },
          ].map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-left"
            >
              <div
                className="font-black leading-none tracking-tight"
                style={{ fontSize: "clamp(3rem, 8vw, 120px)" }}
              >
                <CountUp
                  end={m.end}
                  prefix={m.prefix}
                  suffix={m.suffix}
                  decimals={m.decimals}
                />
              </div>
              <p className="font-mono text-xs text-[#666] mt-3 tracking-widest uppercase">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---- HOW IT WORKS ---- */}
      <section className="py-24 border-t border-[#1a1a1a]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-2 overflow-x-auto">
          {[
            { num: "01", label: "CONNECT" },
            { num: "02", label: "OBSERVE" },
            { num: "03", label: "OPTIMIZE" },
            { num: "04", label: "EARN" },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-2 shrink-0">
              {i > 0 && (
                <svg width="60" height="2" className="shrink-0 overflow-visible">
                  <line
                    x1="0"
                    y1="1"
                    x2="60"
                    y2="1"
                    stroke="#333"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-16"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </line>
                </svg>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="font-mono text-sm tracking-wider whitespace-nowrap"
              >
                <span className="text-teal mr-2">{step.num}</span>
                <span className="text-[#999]">{step.label}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- LIVE GRID VISUALIZATION ---- */}
      <section className="py-32 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto text-center">
          <DotGrid />
          <p className="font-mono text-xs text-[#555] mt-8 tracking-widest uppercase">
            Real-time community energy state
          </p>
        </div>
      </section>

      {/* ---- DATA READOUT ---- */}
      <section className="py-28 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-3xl mx-auto" style={{ color: "#0ABAB5" }}>
          <DataReadout />
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="py-32 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            Start sharing power.
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-12 flex items-stretch justify-center max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 bg-transparent border border-teal/60 px-4 py-3 font-mono text-sm text-white placeholder:text-[#555] outline-none focus:border-teal transition-colors"
              style={{ borderRadius: 0 }}
            />
            <button
              type="submit"
              className="border border-teal/60 border-l-0 px-5 py-3 font-mono text-lg text-teal hover:bg-teal/10 transition-colors cursor-pointer"
              style={{ borderRadius: 0 }}
            >
              &rarr;
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default DataAsArtSite;
