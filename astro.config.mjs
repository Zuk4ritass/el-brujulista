// @ts-check
import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';

/**
 * Las capturas privadas (public/privado/) solo se usan en tu PC con `npm run dev`.
 * Astro copia todo `public/` al build, así que las borramos de `dist/` al terminar:
 * nunca llegan a un despliegue aunque publiques el sitio.
 */
const sinPrivado = {
  name: 'sin-capturas-privadas',
  hooks: {
    /** @param {{ dir: URL }} opts */
    'astro:build:done': async ({ dir }) => {
      await rm(new URL('privado/', dir), { recursive: true, force: true });
    },
  },
};

// https://astro.build/config
export default defineConfig({
  integrations: [sinPrivado],
  // "Contribuir" se convirtió en "Sugiere una guía": los enlaces viejos siguen funcionando.
  redirects: {
    '/contribuir': '/sugerir',
  },
});
