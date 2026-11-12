// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // "Contribuir" se convirtió en "Sugiere una guía": los enlaces viejos siguen funcionando.
  redirects: {
    '/contribuir': '/sugerir',
  },
});
