/** Conecta una caja de búsqueda con el índice. Lo usan la portada y el catálogo. */
import { buildIndex, search, type SearchDoc } from './search';

export interface SearchUi {
  input: HTMLInputElement;
  /** Resultado actual: null = no hay búsqueda; si no, slugs ordenados por relevancia. */
  results(): string[] | null;
  setQuery(q: string): void;
}

export function initSearch(onChange: (slugs: string[] | null, query: string) => void): SearchUi | null {
  const form = document.querySelector<HTMLFormElement>('[data-search-form]');
  const input = form?.querySelector<HTMLInputElement>('[data-search-input]');
  const clear = form?.querySelector<HTMLButtonElement>('[data-search-clear]');
  const dataEl = document.querySelector<HTMLScriptElement>('[data-search-docs]');
  if (!form || !input || !clear || !dataEl) return null;

  const index = buildIndex(JSON.parse(dataEl.textContent || '[]') as SearchDoc[]);
  let current: string[] | null = null;

  const run = () => {
    const q = input.value;
    current = q.trim() ? search(index, q).map((r) => r.slug) : null;
    clear.hidden = !q;
    onChange(current, q.trim());
  };

  let t = 0;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = window.setTimeout(run, 80);
  });
  // Enter: no recarga la página, los resultados ya están en pantalla
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    run();
    input.blur();
  });
  clear.addEventListener('click', () => {
    input.value = '';
    run();
    input.focus();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && input.value) {
      input.value = '';
      run();
    }
  });

  return {
    input,
    results: () => current,
    setQuery(q: string) {
      input.value = q;
      run();
    },
  };
}
