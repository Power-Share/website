/**
 * Three logo concepts for Power Share FlexCo — render all three side by side for comparison.
 */

/** Concept A: PS Monogram with hidden lightning bolt in negative space */
export function LogoConceptA({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="cA1" x1="20" y1="20" x2="180" y2="180">
          <stop offset="0%" stopColor="#089E9A" />
          <stop offset="100%" stopColor="#3DD4CF" />
        </linearGradient>
      </defs>
      {/* P shape — left */}
      <path
        d="M40 160 L40 40 L90 40 C115 40, 130 55, 130 75 C130 95, 115 110, 90 110 L70 110"
        stroke="url(#cA1)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* S shape — right, interlocking */}
      <path
        d="M160 55 C160 55, 145 40, 120 40 C100 40, 85 50, 85 65 C85 80, 100 88, 115 92 C130 96, 145 104, 145 120 C145 138, 128 155, 105 155 C85 155, 70 145, 70 145"
        stroke="url(#cA1)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Lightning bolt — formed in the gap between P and S */}
      <path
        d="M105 72 L92 105 L108 100 L95 132"
        stroke="#F5A623"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Concept B: Share icon reimagined as energy nodes */
export function LogoConceptB({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="cB1" x1="30" y1="30" x2="170" y2="170">
          <stop offset="0%" stopColor="#089E9A" />
          <stop offset="100%" stopColor="#3DD4CF" />
        </linearGradient>
        <filter id="cBglow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines — the "share" arms */}
      <line x1="60" y1="100" x2="140" y2="52" stroke="url(#cB1)" strokeWidth="6" strokeLinecap="round" />
      <line x1="60" y1="100" x2="140" y2="148" stroke="url(#cB1)" strokeWidth="6" strokeLinecap="round" />

      {/* Source node — left (the sharer) — larger, with bolt */}
      <circle cx="60" cy="100" r="28" fill="#0ABAB5" opacity="0.15" />
      <circle cx="60" cy="100" r="20" fill="#0ABAB5" filter="url(#cBglow)" />
      {/* Lightning bolt inside source */}
      <path d="M56 92 L63 92 L59 100 L66 100 L55 112 L59 103 L53 103Z" fill="#1A2332" />

      {/* Receiver node — top right */}
      <circle cx="140" cy="52" r="18" fill="#0ABAB5" opacity="0.15" />
      <circle cx="140" cy="52" r="13" fill="#3DD4CF" />
      {/* Small bolt */}
      <path d="M137 46 L142 46 L140 52 L145 52 L137 59 L139 53 L135 53Z" fill="#1A2332" />

      {/* Receiver node — bottom right */}
      <circle cx="140" cy="148" r="18" fill="#0ABAB5" opacity="0.15" />
      <circle cx="140" cy="148" r="13" fill="#3DD4CF" />
      {/* Small bolt */}
      <path d="M137 142 L142 142 L140 148 L145 148 L137 155 L139 149 L135 149Z" fill="#1A2332" />

      {/* Flow arrows on the lines */}
      <path d="M98 72 L106 72 L102 78Z" fill="#0ABAB5" opacity="0.6" />
      <path d="M98 128 L106 128 L102 122Z" fill="#0ABAB5" opacity="0.6" />
    </svg>
  );
}

/** Concept C: Two overlapping circles (Venn) with lightning bolt at intersection */
export function LogoConceptC({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="cC1" x1="20" y1="40" x2="100" y2="160">
          <stop offset="0%" stopColor="#089E9A" />
          <stop offset="100%" stopColor="#0ABAB5" />
        </linearGradient>
        <linearGradient id="cC2" x1="100" y1="40" x2="180" y2="160">
          <stop offset="0%" stopColor="#0ABAB5" />
          <stop offset="100%" stopColor="#3DD4CF" />
        </linearGradient>
        <clipPath id="cCclipL">
          <circle cx="125" cy="100" r="60" />
        </clipPath>
        <clipPath id="cCclipR">
          <circle cx="75" cy="100" r="60" />
        </clipPath>
      </defs>

      {/* Left circle */}
      <circle cx="75" cy="100" r="60" stroke="url(#cC1)" strokeWidth="5" fill="#0ABAB5" fillOpacity="0.08" />

      {/* Right circle */}
      <circle cx="125" cy="100" r="60" stroke="url(#cC2)" strokeWidth="5" fill="#3DD4CF" fillOpacity="0.08" />

      {/* Intersection highlight */}
      {/* Left circle clipped to right circle area */}
      <g clipPath="url(#cCclipL)">
        <circle cx="75" cy="100" r="60" fill="#0ABAB5" fillOpacity="0.12" />
      </g>

      {/* Bold lightning bolt at the intersection center */}
      <path
        d="M94 75 L107 75 L99 97 L112 97 L90 130 L97 105 L85 105Z"
        fill="#F5A623"
      />

      {/* Two small arrows showing bidirectional flow */}
      <path d="M60 80 L52 85 L52 75Z" fill="#089E9A" opacity="0.6" />
      <path d="M140 120 L148 115 L148 125Z" fill="#3DD4CF" opacity="0.6" />
    </svg>
  );
}
