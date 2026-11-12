/**
 * Buscador con sugerencias en desplegable (patrón "combobox" accesible).
 * - Escribir muestra hasta 6 guías; no cambia nada más de la página.
 * - Flechas ↑/↓ recorren, Enter abre la guía elegida (o la primera), Esc cierra.
 * - Clic o toque en una sugerencia lleva directo a la guía.
 */
import { buildIndex, normalize, search, type SearchDoc } from './search';
import { u } from './url';
import { posterSvg, posterSpriteHtml, type ArtCategory } from './poster-art';

const MAX = 6;
// Mismo texto que el sello de los pósters.
const STATUS: Record<string, string> = {
  verificado: '✓ Probada',
  'sin-verificar': 'Sin probar',
  desactualizado: '! Desactualizada',
};

export function initSuggest(form: HTMLFormElement): void {
  const input = form.querySelector<HTMLInputElement>('[data-search-input]')!;
  const clear = form.querySelector<HTMLButtonElement>('[data-search-clear]')!;
  const panel = form.querySelector<HTMLElement>('[data-suggest-panel]')!;
  const list = form.querySelector<HTMLUListElement>('[data-suggest-list]')!;
  const empty = form.querySelector<HTMLElement>('[data-suggest-empty]')!;
  const all = form.querySelector<HTMLAnchorElement>('[data-suggest-all]')!;
  const status = form.querySelector<HTMLElement>('[data-suggest-status]')!;
  const dataEl = document.querySelector<HTMLScriptElement>('[data-search-docs]')!;

  const docs = JSON.parse(dataEl.textContent || '[]') as SearchDoc[];
  const bySlug = new Map(docs.map((d) => [d.slug, d]));
  const index = buildIndex(docs);
  let options: HTMLLIElement[] = [];
  let active = -1;

  const open = (isOpen: boolean) => {
    panel.hidden = !isOpen;
    input.setAttribute('aria-expanded', String(isOpen));
    if (!isOpen) setActive(-1);
  };

  const setActive = (i: number) => {
    active = i;
    options.forEach((o, j) => o.setAttribute('aria-selected', String(j === i)));
    if (i >= 0) {
      input.setAttribute('aria-activedescendant', options[i].id);
      options[i].scrollIntoView({ block: 'nearest' });
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  };

  const go = (slug: string) => {
    window.location.href = u(`/guias/${slug}/`);
  };

  /** Resalta en el título las palabras que coinciden con lo escrito (sin importar tildes). */
  const highlight = (title: string, query: string) => {
    const words = normalize(query).split(' ').filter((w) => w.length >= 2);
    const frag = document.createDocumentFragment();
    // Recorremos el título palabra por palabra para conservar tildes y mayúsculas originales.
    for (const part of title.split(/(\s+)/)) {
      const n = normalize(part);
      const hit = n && words.some((w) => n.startsWith(w));
      if (hit) {
        const m = document.createElement('mark');
        m.textContent = part;
        frag.append(m);
      } else {
        frag.append(part);
      }
    }
    return frag;
  };

  const render = () => {
    const q = input.value.trim();
    clear.hidden = !input.value;
    if (!q) {
      list.replaceChildren();
      options = [];
      open(false);
      status.textContent = '';
      return;
    }
    const slugs = search(index, q)
      .slice(0, MAX)
      .map((r) => r.slug);

    options = slugs.map((slug, i) => {
      const d = bySlug.get(slug)!;
      const li = document.createElement('li');
      li.className = 'opt';
      li.id = `${list.id}-${i}`;
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
      li.dataset.slug = slug;

      // Miniatura: el mismo dibujo del póster
      const thumb = document.createElement('span');
      thumb.className = 'opt__thumb';
      thumb.setAttribute('aria-hidden', 'true');
      // posterSvg genera SVG propio (sin datos del usuario), es seguro como innerHTML
      // El sprite viene del índice generado en el build (rutas propias /sprites/...), no de lo que escribe el usuario.
      const cat = (d.meta?.key ?? 'ruta') as ArtCategory;
      const sprite = d.meta?.poster && /^(\/[\w-]+)?\/sprites\/[\w/-]+\.webp$/.test(d.meta.poster) ? d.meta.poster : '';
      thumb.innerHTML = sprite ? posterSpriteHtml(cat, sprite, true) : posterSvg(cat, '', true);
      const st = STATUS[d.meta?.status ?? ''];

      const text = document.createElement('span');
      text.className = 'opt__text';
      const t = document.createElement('span');
      t.className = 'opt__title';
      t.append(highlight(d.title, q));
      const meta = document.createElement('span');
      meta.className = 'opt__meta';
      const chips = [d.meta?.category, d.meta?.level, d.meta?.example && 'Ejemplo'].filter(Boolean) as string[];
      for (const c of chips) {
        const span = document.createElement('span');
        span.textContent = c;
        meta.append(span);
      }
      if (st) {
        const s2 = document.createElement('span');
        s2.className = `opt__st opt__st--${d.meta!.status}`;
        s2.textContent = st;
        meta.append(s2);
      }
      text.append(t, meta);
      li.append(thumb, text);

      // mousedown (no click) para que no se pierda el foco del input antes de navegar
      li.addEventListener('mousedown', (e) => {
        e.preventDefault();
        go(slug);
      });
      return li;
    });

    list.replaceChildren(...options);
    empty.hidden = options.length > 0;
    all.href = u(`/guias/?q=${encodeURIComponent(q)}`);
    status.textContent = options.length
      ? `${options.length} ${options.length === 1 ? 'sugerencia' : 'sugerencias'}. Usa las flechas para elegir.`
      : 'Sin sugerencias.';
    open(true);
    setActive(options.length ? 0 : -1);
  };

  let t = 0;
  input.addEventListener('input', () => {
    clearTimeout(t);
    t = window.setTimeout(render, 60);
  });
  input.addEventListener('focus', () => {
    if (input.value.trim()) render();
  });
  input.addEventListener('blur', () => {
    // Pequeña espera para permitir clic en "Ver todo" / "Sugiere esta guía"
    setTimeout(() => {
      if (!form.contains(document.activeElement)) open(false);
    }, 150);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' && options.length) {
      e.preventDefault();
      if (panel.hidden) open(true);
      setActive((active + 1) % options.length);
    } else if (e.key === 'ArrowUp' && options.length) {
      e.preventDefault();
      setActive(active <= 0 ? options.length - 1 : active - 1);
    } else if (e.key === 'Escape') {
      if (!panel.hidden) {
        e.preventDefault();
        open(false);
      } else if (input.value) {
        input.value = '';
        render();
      }
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    if (active >= 0 && options[active]) return go(options[active].dataset.slug!);
    // Sin sugerencias: ir al catálogo con la búsqueda.
    window.location.href = u(`/guias/?q=${encodeURIComponent(q)}`);
  });

  clear.addEventListener('click', () => {
    input.value = '';
    render();
    input.focus();
  });

  document.addEventListener('pointerdown', (e) => {
    if (!form.contains(e.target as Node)) open(false);
  });
}
