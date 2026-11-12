/**
 * Buscador del sitio. Corre en el navegador, sin servidor.
 *
 * - Ignora tildes, mayúsculas y signos: "goloson" = "Golosón" = "GOLOSÓN".
 * - Tolera errores de tipeo pequeños: "golozon" encuentra "golosón".
 * - Pondera por dónde aparece la palabra: título > tags > resumen > pasos.
 */

export interface SearchDoc {
  slug: string;
  title: string;
  tags: string;
  summary: string;
  content: string;
  /** Datos para mostrar en sugerencias (no se usan para buscar). */
  meta?: { key: string; category: string; level: string; status: string; example: boolean };
}

const WEIGHTS = { title: 10, tags: 8, summary: 4, content: 2 } as const;
type Field = keyof typeof WEIGHTS;

/** Quita tildes, pasa a minúsculas y deja solo letras/números separados por espacios. */
export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text).split(' ').filter(Boolean);
}

/** Distancia de edición con transposiciones (Damerau-Levenshtein restringida). Corta temprano si pasa de `max`. */
function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev2: number[] = [];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v;
      rowMin = Math.min(rowMin, v);
    }
    if (rowMin > max) return max + 1;
    prev2.splice(0, prev2.length, ...prev);
    prev = cur;
  }
  return prev[b.length];
}

/** Errores permitidos según el largo de la palabra buscada. */
function allowedTypos(len: number): number {
  if (len >= 8) return 2;
  if (len >= 4) return 1;
  return 0;
}

/** Qué tan bien coincide una palabra buscada con una palabra del documento (0 = nada, 1 = exacta). */
function matchToken(q: string, word: string): number {
  if (word === q) return 1;
  if (word.startsWith(q)) return q.length >= 2 ? 0.85 : 0; // mientras escribes: "golo" → "goloson"
  if (q.length >= 3 && word.includes(q)) return 0.6;
  const max = allowedTypos(q.length);
  if (max === 0) return 0;
  // Compara también contra el prefijo, para tolerar errores mientras se escribe.
  const target = word.length > q.length + max ? word.slice(0, q.length) : word;
  const d = editDistance(q, target, max);
  return d <= max ? 0.7 - d * 0.15 : 0;
}

interface IndexedDoc {
  slug: string;
  fields: Record<Field, string[]>;
}

export function buildIndex(docs: SearchDoc[]): IndexedDoc[] {
  return docs.map((d) => ({
    slug: d.slug,
    fields: {
      title: tokens(d.title),
      tags: tokens(d.tags),
      summary: tokens(d.summary),
      content: [...new Set(tokens(d.content))],
    },
  }));
}

/**
 * Devuelve los slugs que coinciden, ordenados por relevancia.
 * Todas las palabras de la búsqueda deben aparecer en algún campo (búsqueda "Y").
 */
export function search(index: IndexedDoc[], query: string): { slug: string; score: number }[] {
  const qs = tokens(query);
  if (qs.length === 0) return [];
  const results: { slug: string; score: number }[] = [];

  for (const doc of index) {
    let total = 0;
    let allFound = true;
    for (const q of qs) {
      let best = 0;
      for (const field of Object.keys(WEIGHTS) as Field[]) {
        for (const word of doc.fields[field]) {
          const m = matchToken(q, word);
          if (m > 0) best = Math.max(best, m * WEIGHTS[field]);
        }
      }
      if (best === 0) {
        allFound = false;
        break;
      }
      total += best;
    }
    if (allFound) results.push({ slug: doc.slug, score: total });
  }
  return results.sort((a, b) => b.score - a.score);
}
