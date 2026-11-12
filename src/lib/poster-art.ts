/**
 * Arte generado de los pósters (sin assets del juego).
 * Lo usan el póster grande y la miniatura de las sugerencias del buscador,
 * para que una guía se reconozca igual en todas partes.
 */

export type ArtCategory = 'quest' | 'dungeon' | 'ruta' | 'tip';

export const THEMES: Record<ArtCategory, { a: string; b: string; glow: string; accent: string }> = {
  quest: { a: '#3a1d5c', b: '#12081f', glow: '#f2c14e', accent: '#e9b949' },
  dungeon: { a: '#5c1414', b: '#140404', glow: '#ff6b3d', accent: '#ff8a5c' },
  ruta: { a: '#0f4a57', b: '#04161b', glow: '#7fe0d6', accent: '#8fe3d9' },
  tip: { a: '#2f5214', b: '#0b1604', glow: '#c5f06a', accent: '#b3dd5c' },
};

/** Dibujo central de cada categoría (en un lienzo de 200×300). */
function glyph(cat: ArtCategory): string {
  const t = THEMES[cat];
  switch (cat) {
    case 'quest':
      return `<path d="M60 50h80v120H60z" fill="${t.a}"/><path d="M52 44h96M52 176h96" stroke-width="10"/><path d="M78 90l14 14 30-30M78 136h44"/>`;
    case 'dungeon':
      return `<path d="M60 180V90a40 40 0 0 1 80 0v90z" fill="${t.b}"/><path d="M60 180h80M80 180v-60M100 180v-70M120 180v-60"/><path d="M44 70l12 18M156 70l-12 18"/>`;
    case 'ruta':
      return `<path d="M40 60l40-14 40 14 40-14v120l-40 14-40-14-40 14z" fill="${t.a}"/><path d="M80 46v120M120 60v120" stroke-opacity=".5"/><path d="M54 140c20-10 28 6 46-6s20-34 44-26" stroke-dasharray="6 8"/><path d="M138 96l12 12M150 96l-12 12"/>`;
    case 'tip':
      return `<path d="M100 40a40 40 0 0 0-24 72c6 5 8 12 8 18h32c0-6 2-13 8-18a40 40 0 0 0-24-72z" fill="${t.a}"/><path d="M86 146h28M90 160h20"/><path d="M100 18v-8M150 40l6-6M50 40l-6-6M172 88h8M20 88h8"/>`;
  }
}

/**
 * SVG completo del póster. `uid` debe ser único en la página (la misma guía puede
 * aparecer varias veces y los ids repetidos rompen los degradados).
 * `compact` simplifica el arte para miniaturas: el dibujo se ve más grande y opaco.
 */
export function posterSvg(cat: ArtCategory, uid: string, compact = false): string {
  const t = THEMES[cat];
  const glyphAttrs = compact
    ? `transform="translate(100 112) scale(1.35) translate(-100 -112)" opacity=".9" stroke-width="7"`
    : `opacity=".55" stroke-width="5"`;
  return `<svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
<defs>
<linearGradient id="${uid}-bg" x1="0" y1="0" x2=".4" y2="1"><stop offset="0" stop-color="${t.a}"/><stop offset="1" stop-color="${t.b}"/></linearGradient>
<radialGradient id="${uid}-glow" cx=".7" cy=".3" r=".6"><stop offset="0" stop-color="${t.glow}" stop-opacity=".55"/><stop offset="1" stop-color="${t.glow}" stop-opacity="0"/></radialGradient>
<pattern id="${uid}-pat" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><path d="M0 10h20" stroke="${t.accent}" stroke-opacity=".08" stroke-width="2"/></pattern>
</defs>
<rect width="200" height="300" fill="url(#${uid}-bg)"/>
<rect width="200" height="300" fill="url(#${uid}-pat)"/>
<rect width="200" height="300" fill="url(#${uid}-glow)"/>
<g class="poster__glyph" fill="none" stroke="${t.accent}" stroke-linecap="round" stroke-linejoin="round" ${glyphAttrs}>${glyph(cat)}</g>
${compact ? '' : `<path d="M8 8h184v284H8z" fill="none" stroke="${t.accent}" stroke-opacity=".35" stroke-width="2"/><path d="M14 14h172v272H14z" fill="none" stroke="${t.accent}" stroke-opacity=".15" stroke-width="1"/>`}
</svg>`;
}
