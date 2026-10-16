import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  integrations: [react()],
  output: 'static',
  telemetry: false,
  vite: {
    plugins: [tailwindcss()],
  },
});
