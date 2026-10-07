interface LogoProps {
  className?: string;
  variant?: 'full' | 'mark';
}

export function Logo({ className = '', variant = 'full' }: LogoProps) {
  const mark = (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={variant === 'mark' ? className : ''}
      aria-label="Power Share FlexCo"
    >
      <defs>
        <linearGradient id="psL" x1="20" y1="40" x2="100" y2="160">
          <stop offset="0%" stopColor="#089E9A" />
          <stop offset="100%" stopColor="#0ABAB5" />
        </linearGradient>
        <linearGradient id="psR" x1="100" y1="40" x2="180" y2="160">
          <stop offset="0%" stopColor="#0ABAB5" />
          <stop offset="100%" stopColor="#3DD4CF" />
        </linearGradient>
        <clipPath id="psClip">
          <circle cx="125" cy="100" r="60" />
        </clipPath>
      </defs>

      {/* Left circle */}
      <circle cx="75" cy="100" r="60" stroke="url(#psL)" strokeWidth="5" fill="#0ABAB5" fillOpacity="0.08" />

      {/* Right circle */}
      <circle cx="125" cy="100" r="60" stroke="url(#psR)" strokeWidth="5" fill="#3DD4CF" fillOpacity="0.08" />

      {/* Intersection highlight */}
      <g clipPath="url(#psClip)">
        <circle cx="75" cy="100" r="60" fill="#0ABAB5" fillOpacity="0.12" />
      </g>

      {/* Lightning bolt at the intersection */}
      <path
        d="M94 75 L107 75 L99 97 L112 97 L90 130 L97 105 L85 105Z"
        fill="#F5A623"
      />

      {/* Bidirectional flow arrows */}
      <path d="M60 80 L52 85 L52 75Z" fill="#089E9A" opacity="0.6" />
      <path d="M140 120 L148 115 L148 125Z" fill="#3DD4CF" opacity="0.6" />
    </svg>
  );

  if (variant === 'mark') return mark;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-10 h-10 flex-shrink-0">{mark}</div>
      <div className="flex flex-col leading-tight">
        <span className="text-[17px] font-extrabold tracking-tight uppercase">
          Power Share
        </span>
        <span className="text-[10px] font-medium tracking-[0.25em] text-teal uppercase">
          FlexCo
        </span>
      </div>
    </div>
  );
}
