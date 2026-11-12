// Copia al sitio solo los sprites que usan las guías (campo `sprite: "carpeta/archivo"` en objetos y recompensas, y `poster: "objetos/..."`).
// Origen: la carpeta de sprites extraídos del cliente (1,8 GB, fuera del repo). Destino: public/sprites/objetos/,
// convertidos a WebP de 128 px máx. Corre solo antes de `npm run dev` y `npm run build`.
// Otra carpeta de origen: SPRITES_DIR="D:\otra\ruta" npm run sprites
import { readdir, readFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const guidesDir = join(root, 'src', 'content', 'guias');
const outDir = join(root, 'public', 'sprites', 'objetos');
const srcDir = process.env.SPRITES_DIR ?? join(homedir(), 'Desktop', 'Sprites Trefus', 'Objetos (PNG 4x)');

const wanted = new Set();
for (const f of await readdir(guidesDir, { recursive: true })) {
  if (!/\.mdx?$/.test(f)) continue;
  const text = await readFile(join(guidesDir, f), 'utf8');
  for (const m of text.matchAll(/^\s*-?\s*sprite:\s*["']?([\w-]+\/[\w-]+)["']?/gm)) wanted.add(m[1]);
  // Póster con sprite de objeto: poster: "objetos/carpeta/archivo"
  for (const m of text.matchAll(/^\s*poster:\s*["']?objetos\/([\w-]+\/[\w-]+)["']?/gm)) wanted.add(m[1]);
}

const haveSource = existsSync(srcDir);
let copied = 0;
const missing = [];
for (const id of wanted) {
  const dst = join(outDir, `${id}.webp`);
  const src = join(srcDir, `${id}.png`);
  if (!haveSource || !existsSync(src)) {
    if (!existsSync(dst)) missing.push(id);
    continue;
  }
  if (existsSync(dst) && (await stat(dst)).mtimeMs >= (await stat(src)).mtimeMs) continue;
  await mkdir(dirname(dst), { recursive: true });
  await sharp(src).resize(128, 128, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 88 }).toFile(dst);
  copied++;
}

console.log(`[sprites] ${wanted.size} usados en las guías, ${copied} copiados ahora.`);
if (!haveSource) console.log(`[sprites] No encontré la carpeta de origen (${srcDir}); uso los que ya están en public/.`);
if (missing.length) console.warn(`[sprites] Faltan (se verá una bolsita "?" en su lugar): ${missing.join(', ')}`);

// ---------- Personajes (NPC) ----------
// `poster: "npcs/<número>"` → copia ese personaje desde "Personajes (PNG 4x)" (catálogo con números en
// "Personajes - Catálogo") a public/sprites/npcs/<número>.webp, recortado y de 320 px de alto.
// Otra carpeta de origen: NPCS_DIR="D:\otra\ruta" npm run sprites
const npcOut = join(root, 'public', 'sprites', 'npcs');
const npcSrc = process.env.NPCS_DIR ?? join(homedir(), 'Desktop', 'Sprites Trefus', 'Personajes (PNG 4x)');
const npcs = new Set();
for (const f of await readdir(guidesDir, { recursive: true })) {
  if (!/\.mdx?$/.test(f)) continue;
  const text = await readFile(join(guidesDir, f), 'utf8');
  for (const m of text.matchAll(/^\s*poster:\s*["']?npcs\/([\w-]+)["']?/gm)) npcs.add(m[1]);
}
let npcCopied = 0;
const npcMissing = [];
for (const id of npcs) {
  const dst = join(npcOut, `${id}.webp`);
  const src = join(npcSrc, `${id}.png`);
  if (!existsSync(src)) {
    if (!existsSync(dst)) npcMissing.push(id);
    continue;
  }
  if (existsSync(dst) && (await stat(dst)).mtimeMs >= (await stat(src)).mtimeMs) continue;
  await mkdir(npcOut, { recursive: true });
  await sharp(src).trim().resize({ height: 320, withoutEnlargement: true }).webp({ quality: 88 }).toFile(dst);
  npcCopied++;
}
console.log(`[sprites] ${npcs.size} personajes en pósters, ${npcCopied} copiados ahora.`);
if (npcMissing.length) console.warn(`[sprites] Faltan personajes (se verá el dibujo de la categoría): ${npcMissing.join(', ')}`);

// ---------- Escena del inicio (hero) ----------
// Personajes fijos de la portada (src/components/HeroEscena.astro), a su tamaño original y recortados.
const HERO = ['80', '90', '71', '100', '3229', '3222', '3221'];
const heroOut = join(root, 'public', 'sprites', 'hero');
let heroCopied = 0;
for (const id of HERO) {
  const dst = join(heroOut, `${id}.webp`);
  const src = join(npcSrc, `${id}.png`);
  if (!existsSync(src)) continue;
  if (existsSync(dst) && (await stat(dst)).mtimeMs >= (await stat(src)).mtimeMs) continue;
  await mkdir(heroOut, { recursive: true });
  await sharp(src).trim().webp({ quality: 90 }).toFile(dst);
  heroCopied++;
}
if (heroCopied) console.log(`[sprites] Escena del inicio: ${heroCopied} personajes copiados.`);
