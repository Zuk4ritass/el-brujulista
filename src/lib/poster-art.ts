/**
 * Arte generado de los pósters (sin assets del juego), estilo caricatura:
 * colores planos, contorno de tinta grueso y garabatos de fondo.
 * Lo usan el póster y la miniatura de las sugerencias del buscador,
 * para que una guía se reconozca igual en todas partes.
 */

export type ArtCategory = 'quest' | 'dungeon' | 'ruta' | 'tip';

const INK = '#2b1a0e';
const CREAM = '#fffaf0';

export const THEMES: Record<ArtCategory, { bg: string; deco: string; fill: string }> = {
  quest: { bg: '#9b72d0', deco: '#b897e3', fill: '#ffd23f' },
  dungeon: { bg: '#e2574c', deco: '#ef7d72', fill: '#4a2a1a' },
  ruta: { bg: '#3fb3a3', deco: '#6fcfc1', fill: CREAM },
  tip: { bg: '#8cc63f', deco: '#a9db66', fill: '#ffd23f' },
};

/** Dibujo central de cada categoría (lienzo de 200×200). */
function glyph(cat: ArtCategory): string {
  const t = THEMES[cat];
  switch (cat) {
    case 'quest': // pergamino con check
      return `<path d="M58 46h84v108H58z" fill="${CREAM}"/><rect x="48" y="38" width="104" height="18" rx="9" fill="${t.fill}"/><rect x="48" y="146" width="104" height="18" rx="9" fill="${t.fill}"/><path d="M78 98l14 14 30-30"/><path d="M78 130h44" stroke-width="5"/>`;
    case 'dungeon': // puerta de piedra con antorchas
      return `<path d="M56 162V96a44 44 0 0 1 88 0v66z" fill="#b9a68c"/><path d="M72 162V100a28 28 0 0 1 56 0v62z" fill="${t.fill}"/><path d="M40 162h120"/><path d="M38 76v30M162 76v30"/><path d="M38 76c-8-8 0-20 0-20s8 12 0 20zM162 76c-8-8 0-20 0-20s8 12 0 20z" fill="#ffd23f"/>`;
    case 'ruta': // mapa con camino y X
      return `<path d="M34 56l44-14 44 14 44-14v104l-44 14-44-14-44 14z" fill="${CREAM}"/><path d="M78 42v104M122 56v104" stroke-width="4"/><path d="M52 128c18-10 28 4 44-6s18-30 42-24" stroke-dasharray="7 9" stroke-width="5"/><path d="M134 88l14 14M148 88l-14 14" stroke="#e2574c" stroke-width="7"/>`;
    case 'tip': // bombillo
      return `<path d="M100 34a42 42 0 0 0-25 76c6 5 9 12 9 18h32c0-6 3-13 9-18a42 42 0 0 0-25-76z" fill="${t.fill}"/><rect x="82" y="128" width="36" height="22" rx="6" fill="#b9a68c"/><path d="M90 66c-8 4-12 12-12 20" stroke-width="5"/><path d="M100 16v-6M152 36l6-6M48 36l-6-6M168 82h8M24 82h8" stroke-width="5"/>`;
  }
}

/** Garabatos de fondo (estrellitas y puntos), fijos por categoría para que no "salten". */
function deco(cat: ArtCategory): string {
  const c = THEMES[cat].deco;
  const star = (x: number, y: number, s: number) =>
    `<path d="M${x} ${y - s}l${s * 0.3} ${s * 0.7} ${s * 0.7} ${s * 0.3}-${s * 0.7} ${s * 0.3}-${s * 0.3} ${s * 0.7}-${s * 0.3}-${s * 0.7}-${s * 0.7}-${s * 0.3} ${s * 0.7}-${s * 0.3}z" fill="${c}"/>`;
  return [star(28, 30, 12), star(172, 168, 10), star(176, 30, 7), `<circle cx="24" cy="172" r="6" fill="${c}"/>`, `<circle cx="150" cy="18" r="4" fill="${c}"/>`].join('');
}

/**
 * Arte con un sprite del juego en vez del dibujo de la categoría: mismo fondo y garabatos,
 * el sprite centrado con una sombrita en el piso. `src` es una ruta propia del sitio (/sprites/...).
 */
export function posterSpriteHtml(cat: ArtCategory, src: string, compact = false): string {
  const t = THEMES[cat];
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
<rect width="200" height="200" fill="${t.bg}"/>
${compact ? '' : deco(cat)}
<ellipse cx="100" cy="168" rx="${compact ? 46 : 40}" ry="9" fill="${INK}" opacity=".18"/>
</svg><img class="poster__sprite${compact ? ' poster__sprite--compact' : ''}" src="${src}" alt="" loading="lazy" decoding="async">`;
}

/**
 * SVG completo del arte. `uid` se mantiene por compatibilidad (ya no hay degradados con id).
 * `compact` agranda el dibujo para miniaturas.
 */
export function posterSvg(cat: ArtCategory, _uid = '', compact = false): string {
  const t = THEMES[cat];
  const g = compact ? `transform="translate(100 100) scale(1.25) translate(-100 -100)"` : '';
  return `<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
<rect width="200" height="200" fill="${t.bg}"/>
${compact ? '' : deco(cat)}
<g class="poster__glyph" ${g} fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">${glyph(cat)}</g>
</svg>`;
}
