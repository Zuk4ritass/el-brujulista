/** Convierte un texto en un id kebab-case estable (sin tildes ni símbolos). */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Id de un paso: el `id` explícito si existe; si no, derivado del título. */
export function stepId(step: { id?: string; title: string }): string {
  return step.id ?? slugify(step.title);
}
