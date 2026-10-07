/**
 * Avant-garde logo concepts for Power Share FlexCo.
 *
 * D: Shattered Bolt — the lightning bolt breaks into geometric shards
 *    radiating outward, no circles at all. Energy isn't contained, it's released.
 *
 * E: Interference Pattern — two wave sources creating a moiré-like
 *    interference pattern where they overlap. Physics made visual.
 *
 * F: Single Continuous Line — one unbroken stroke traces both circles
 *    AND the bolt. Minimal, elegant, implies infinite flow.
 */

/** Concept D: Shattered Bolt — energy breaking free */
export function LogoConceptD({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="dG1" x1="60" y1="30" x2="140" y2="170">
          <stop offset="0%" stopColor="#3DD4CF" />
          <stop offset="50%" stopColor="#0ABAB5" />
          <stop offset="100%" stopColor="#089E9A" />
        </linearGradient>
      </defs>

      {/* Central bolt — bold, angular */}
      <path d="M92 45 L115 45 L102 95 L120 95 L85 160 L95 115 L78 115Z" fill="#F5A623" />

      {/* Shards radiating outward — fragments of energy being shared */}
      {/* Top-left shards */}
      <polygon points="75,55 65,40 80,42" fill="url(#dG1)" opacity="0.9" />
      <polygon points="60,70 42,58 55,52" fill="url(#dG1)" opacity="0.7" />
      <polygon points="50,90 30,82 40,72" fill="url(#dG1)" opacity="0.5" />

      {/* Top-right shards */}
      <polygon points="125,55 135,38 140,52" fill="url(#dG1)" opacity="0.9" />
      <polygon points="140,72 158,56 155,70" fill="url(#dG1)" opacity="0.7" />
      <polygon points="148,92 168,80 162,95" fill="url(#dG1)" opacity="0.5" />

      {/* Bottom-left shards */}
      <polygon points="72,130 52,135 58,122" fill="url(#dG1)" opacity="0.7" />
      <polygon points="60,148 38,155 48,140" fill="url(#dG1)" opacity="0.5" />
      <polygon points="70,160 55,172 52,158" fill="url(#dG1)" opacity="0.35" />

      {/* Bottom-right shards */}
      <polygon points="118,135 138,128 132,142" fill="url(#dG1)" opacity="0.7" />
      <polygon points="132,152 152,148 145,160" fill="url(#dG1)" opacity="0.5" />
      <polygon points="125,168 140,175 148,162" fill="url(#dG1)" opacity="0.35" />

      {/* Tiny particles — energy dust */}
      <circle cx="35" cy="45" r="2" fill="#0ABAB5" opacity="0.4" />
      <circle cx="165" cy="45" r="2" fill="#3DD4CF" opacity="0.4" />
      <circle cx="28" cy="110" r="1.5" fill="#089E9A" opacity="0.3" />
      <circle cx="172" cy="110" r="1.5" fill="#3DD4CF" opacity="0.3" />
      <circle cx="42" cy="170" r="2" fill="#0ABAB5" opacity="0.3" />
      <circle cx="158" cy="170" r="2" fill="#3DD4CF" opacity="0.3" />
    </svg>
  );
}

/** Concept E: Interference — two wave sources, energy emerges where they meet */
export function LogoConceptE({ className = '' }: { className?: string }) {
  const arcs = (cx: number, dir: 'left' | 'right') => {
    const radii = [20, 35, 50, 65, 80, 95];
    const color = dir === 'left' ? '#089E9A' : '#3DD4CF';
    return radii.map((r, i) => (
      <circle
        key={`${dir}-${i}`}
        cx={cx}
        cy={100}
        r={r}
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        opacity={0.8 - i * 0.1}
      />
    ));
  };

  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <clipPath id="eFrame">
          <rect x="10" y="10" width="180" height="180" rx="90" />
        </clipPath>
        <mask id="eBoltMask">
          <rect width="200" height="200" fill="white" />
          <path d="M94 58 L110 58 L101 95 L116 95 L88 148 L96 110 L82 110Z" fill="black" />
        </mask>
      </defs>

      {/* Concentric arcs from two sources, clipped to circle */}
      <g clipPath="url(#eFrame)" mask="url(#eBoltMask)">
        {arcs(70, 'left')}
        {arcs(130, 'right')}
      </g>

      {/* The bolt — revealed by masking it OUT of the waves, then filling with amber */}
      <path d="M94 58 L110 58 L101 95 L116 95 L88 148 L96 110 L82 110Z" fill="#F5A623" />

      {/* Outer frame — subtle */}
      <circle cx="100" cy="100" r="90" stroke="#0ABAB5" strokeWidth="2" fill="none" opacity="0.3" />
    </svg>
  );
}

/** Concept F: One Line — a single continuous stroke draws the entire logo */
export function LogoConceptF({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="fLine" x1="10" y1="100" x2="190" y2="100">
          <stop offset="0%" stopColor="#089E9A" />
          <stop offset="35%" stopColor="#0ABAB5" />
          <stop offset="50%" stopColor="#F5A623" />
          <stop offset="65%" stopColor="#0ABAB5" />
          <stop offset="100%" stopColor="#3DD4CF" />
        </linearGradient>
      </defs>

      {/*
        One continuous path:
        Start at top of left circle →
        trace left circle clockwise →
        at the bottom crossing, sweep into the bolt shape →
        exit bolt at top →
        continue into right circle →
        trace right circle clockwise →
        arrive back where left and right meet
      */}
      <path
        d={`
          M 75 18
          A 68 68 0 1 0 75 182
          C 75 182, 85 170, 95 148
          L 105 100
          L 88 100
          L 112 52
          C 120 38, 125 22, 125 18
          A 68 68 0 1 1 125 182
          C 125 182, 115 170, 108 152
          L 95 100
          L 112 100
          L 88 148
          C 80 162, 75 178, 75 182
        `}
        stroke="url(#fLine)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Tiny energy spark at the center */}
      <circle cx="100" cy="100" r="3" fill="#F5A623" opacity="0.8" />
    </svg>
  );
}
