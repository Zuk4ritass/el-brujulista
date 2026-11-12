// @ts-check
import { defineConfig } from 'astro/config';
import { rm } from 'node:fs/promises';

/**
 * public/privado/ es material de trabajo solo local (ej. el mapa del mundo completo).
 * Astro copia todo `public/` al build, así que lo borramos de `dist/` al terminar: nunca se publica.
 * Las capturas de los pasos viven en public/capturas/ y SÍ se publican.
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
// En GitHub Pages el sitio vive en https://zuk4ritass.github.io/<repo>/: el workflow pasa SITE y BASE_PATH.
// En tu PC no se definen y el sitio queda en la raíz (localhost:4321/).
export default defineConfig({
  site: process.env.SITE || undefined,
  base: process.env.BASE_PATH || '/',
  integrations: [sinPrivado],
  // "Contribuir" se convirtió en "Sugiere una guía": los enlaces viejos siguen funcionando.
  redirects: {
    // El destino no recibe la base automáticamente: se la ponemos (en local queda '/sugerir').
    '/contribuir': `${(process.env.BASE_PATH || '').replace(/\/+$/, '')}/sugerir`,
  },
});
