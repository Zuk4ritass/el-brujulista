import type { CollectionEntry } from 'astro:content';

export type Guia = CollectionEntry<'guias'>;
export type Category = Guia['data']['category'];
export type Status = Guia['data']['verification']['status'];

export const CATEGORY_LABELS: Record<Category, string> = {
  quest: 'Quest',
  dungeon: 'Dungeon',
  ruta: 'Ruta',
  tip: 'Tip',
};

export const STATUS_LABELS: Record<Status, string> = {
  verificado: 'Verificado',
  'sin-verificar': 'Sin verificar',
  desactualizado: 'Desactualizado',
};

/** Rangos del filtro de nivel. Una guía entra si su rango se cruza con el elegido. */
export const LEVEL_RANGES = [
  { value: '1-50', label: 'Nivel 1 – 50', min: 1, max: 50 },
  { value: '51-100', label: 'Nivel 51 – 100', min: 51, max: 100 },
  { value: '101-150', label: 'Nivel 101 – 150', min: 101, max: 150 },
  { value: '151-200', label: 'Nivel 151 – 200', min: 151, max: 200 },
] as const;

export function levelLabel(g: Guia['data']): string {
  const { levelMin: min, levelMax: max } = g;
  if (min === undefined && max === undefined) return 'Nivel POR COMPLETAR';
  if (min !== undefined && max !== undefined) return min === max ? `Nivel ${min}` : `Nivel ${min} – ${max}`;
  return min !== undefined ? `Nivel ${min}+` : `Hasta nivel ${max}`;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** Orden del listado: guías reales antes que ejemplos, luego por nivel mínimo y título. */
export function sortGuides(guias: Guia[]): Guia[] {
  return [...guias].sort(
    (a, b) =>
      Number(a.data.example) - Number(b.data.example) ||
      (a.data.levelMin ?? 0) - (b.data.levelMin ?? 0) ||
      a.data.title.localeCompare(b.data.title, 'es'),
  );
}
