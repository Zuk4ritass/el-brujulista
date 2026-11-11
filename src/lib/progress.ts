/**
 * Progreso de una guía en el navegador.
 *
 * Se guarda en localStorage bajo `trefus:progreso:<slug>` como `{ v: 1, done: [ids de pasos] }`.
 * Si localStorage no está disponible (modo privado, bloqueado, cuota llena) se usa un
 * almacén en memoria: el checklist sigue funcionando, pero se pierde al cerrar la pestaña.
 */

const PREFIX = 'trefus:progreso:';
const VERSION = 1;

type Stored = { v: number; done: string[] };

const memory = new Map<string, string>();

function storageAvailable(): boolean {
  try {
    const k = `${PREFIX}__test__`;
    localStorage.setItem(k, '1');
    localStorage.removeItem(k);
    return true;
  } catch {
    return false;
  }
}

export const isPersistent = typeof window !== 'undefined' && storageAvailable();

function read(key: string): string | null {
  if (!isPersistent) return memory.get(key) ?? null;
  try {
    return localStorage.getItem(key);
  } catch {
    return memory.get(key) ?? null;
  }
}

function write(key: string, value: string | null): void {
  if (value === null) memory.delete(key);
  else memory.set(key, value);
  if (!isPersistent) return;
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* cuota llena u otro error: queda en memoria */
  }
}

export function progressKey(slug: string): string {
  return PREFIX + slug;
}

/** Ids de pasos completados. Datos corruptos o de otra versión se ignoran. */
export function loadProgress(slug: string): Set<string> {
  const raw = read(progressKey(slug));
  if (!raw) return new Set();
  try {
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (parsed.v === VERSION && Array.isArray(parsed.done)) {
      return new Set(parsed.done.filter((x): x is string => typeof x === 'string'));
    }
  } catch {
    /* JSON inválido */
  }
  return new Set();
}

export function saveProgress(slug: string, done: Set<string>): void {
  if (done.size === 0) {
    write(progressKey(slug), null);
    return;
  }
  const data: Stored = { v: VERSION, done: [...done] };
  write(progressKey(slug), JSON.stringify(data));
}

export function resetProgress(slug: string): void {
  write(progressKey(slug), null);
}
