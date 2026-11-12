/**
 * Mapa del mundo de Manuel (imagen privada en public/privado/mapa/, fuera de git y del build).
 * Se usa de fondo en el mini mapa SOLO en tu PC (`npm run dev`).
 *
 * Para alinear las coordenadas, abre http://localhost:4321/calibrar/ , haz clic en dos casillas
 * lejanas cuya coordenada conozcas del juego, y pega aquí la línea que te da la página.
 * Mientras `puntos` esté vacío, el mini mapa usa el dibujo propio.
 */

export interface PuntoCalibrado {
  /** Píxel del centro de la casilla en la imagen original. */
  px: number;
  py: number;
  /** Coordenada del juego de esa casilla. */
  x: number;
  y: number;
}

export interface MapaFondo {
  imagen: string; // ruta pública
  ancho: number; // píxeles de la imagen original
  alto: number;
  puntos: PuntoCalibrado[];
}

export const MAPA: MapaFondo = {
  imagen: '/privado/mapa/mundo.webp',
  ancho: 2000,
  alto: 1533,
  puntos: [],
};

/** Escala (píxeles por casilla) y origen, o null si falta calibrar. */
export function calibracion(m: MapaFondo) {
  if (m.puntos.length < 2) return null;
  const [a, b] = m.puntos;
  if (a.x === b.x || a.y === b.y) return null; // hacen falta casillas distintas en x y en y
  const sx = (b.px - a.px) / (b.x - a.x);
  const sy = (b.py - a.py) / (b.y - a.y);
  /** Centro en la imagen (px) de la casilla [x, y]. */
  const centro = (x: number, y: number) => ({ px: a.px + (x - a.x) * sx, py: a.py + (y - a.y) * sy });
  return { sx, sy, centro };
}
