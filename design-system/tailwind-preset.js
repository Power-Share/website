/**
 * Power Share FlexCo — Tailwind CSS Preset
 *
 * Usage in your tailwind.config.ts:
 *   import psPreset from '../design-system/tailwind-preset'
 *   export default { presets: [psPreset], ... }
 */
export default {
  theme: {
    extend: {
      colors: {
        teal:         { DEFAULT: '#0ABAB5', light: '#3DD4CF', dark: '#089E9A' },
        amber:        { DEFAULT: '#F5A623', light: '#FFBF4A' },
        navy:         { DEFAULT: '#1A2332', light: '#243044' },
        cloud:        '#F8FAFB',
        green:        '#34C759',
        coral:        '#FF6B6B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'card': '1rem',
        'button': '9999px',
      },
      boxShadow: {
        'glow-teal': '0 8px 24px rgba(10,186,181,0.2)',
      },
    },
  },
};
