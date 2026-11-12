// Recorta del mapa del mundo una ventana alrededor de cada coordenada que usan las guías (`coords: "x, y"`)
// y la guarda en public/mapa/recortes/<x>_<y>.webp. Así el sitio no carga el mapa entero (10 MB).
// Origen: el mapa armado desde el cliente (fuera del repo). Corre solo antes de `npm run dev` y `npm run build`.
// Otro origen: MAPA_PNG="D:\ruta\mapa_0.png" npm run mapa
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import sharp from 'sharp';
import cfg from '../src/data/mapa.json' with { type: 'json' };

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const guidesDir = join(root, 'src', 'content', 'guias');
const outDir = join(root, 'public', 'mapa', 'recortes');
const src = process.env.MAPA_PNG ?? join(homedir(), 'Desktop', 'Sprites Trefus', 'Mapas', 'mapa_0.png');
const MAR = '#7f7f7f'; // gris del mar en el mapa del juego

const wanted = new Map();
for (const f of await readdir(guidesDir, { recursive: true })) {
  if (!/\.mdx?$/.test(f)) continue;
  const text = await readFile(join(guidesDir, f), 'utf8');
  for (const m of text.matchAll(/^\s*coords:\s*["']?\[?\s*(-?\d+)\s*,\s*(-?\d+)/gm)) {
    const x = Number(m[1]), y = Number(m[2]);
    wanted.set(`${x}_${y}`, { x, y });
  }
}

const todo = [...wanted].filter(([k]) => !existsSync(join(outDir, `${k}.webp`)));
if (todo.length && !existsSync(src)) {
  console.warn(`[mapa] No encontré ${src}; faltan recortes: ${todo.map(([k]) => k).join(', ')} (se verá el mini mapa sin fondo).`);
} else if (todo.length) {
  await mkdir(outDir, { recursive: true });
  const base = sharp(src);
  const { width: W, height: H } = await base.metadata();
  const cw = cfg.casillaAncho, ch = cfg.casillaAlto;
  const w = (cfg.ventanaX * 2 + 1) * cw, h = (cfg.ventanaY * 2 + 1) * ch;
  for (const [k, { x, y }] of todo) {
    // Esquina superior izquierda de la ventana en el mapa (puede caer fuera: se rellena con mar)
    const left = (x - cfg.ventanaX - cfg.origenX) * cw;
    const top = (y - cfg.ventanaY - cfg.origenY) * ch;
    const l = Math.max(0, left), t = Math.max(0, top);
    const r = Math.min(W, left + w), b = Math.min(H, top + h);
    const canvas = sharp({ create: { width: w, height: h, channels: 3, background: MAR } });
    const layers = [];
    if (r > l && b > t) {
      const piece = await sharp(src).extract({ left: l, top: t, width: r - l, height: b - t }).png().toBuffer();
      layers.push({ input: piece, left: l - left, top: t - top });
    }
    await canvas.composite(layers).webp({ quality: 78 }).toFile(join(outDir, `${k}.webp`));
  }
}
console.log(`[mapa] ${wanted.size} coordenadas en las guías, ${todo.length && existsSync(src) ? todo.length : 0} recortes nuevos.`);
