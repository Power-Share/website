import { useState } from 'react';

export type DesignVariant = 'current' | 'data-art' | 'neo-swiss';

const variants: { key: DesignVariant; label: string; desc: string }[] = [
  { key: 'current', label: 'Current', desc: 'Clean & corporate' },
  { key: 'data-art', label: 'Data as Art', desc: 'Generative & abstract' },
  { key: 'neo-swiss', label: 'Neo-Swiss', desc: 'Bold minimalism' },
];

export function useDesignVariant() {
  return useState<DesignVariant>('current');
}

export function DesignSwitcher({
  active,
  onChange,
}: {
  active: DesignVariant;
  onChange: (v: DesignVariant) => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-navy/95 backdrop-blur-md border border-white/10 rounded-full px-2 py-2 flex gap-1 shadow-2xl">
      {variants.map((v) => (
        <button
          key={v.key}
          onClick={() => onChange(v.key)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
            active === v.key
              ? 'bg-teal text-white'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
          title={v.desc}
        >
          {v.label}
        </button>
      ))}
    </div>
  );
}
