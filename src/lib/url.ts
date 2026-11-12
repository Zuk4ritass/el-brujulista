/**
 * Rutas internas del sitio respetando la subcarpeta de publicación.
 * En GitHub Pages el sitio vive en https://<usuario>.github.io/<repo>/, así que "/guias/" debe ser "/<repo>/guias/".
 * En tu PC (npm run dev) la base es "/" y no cambia nada. Usar SIEMPRE u() para enlaces e imágenes propias.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** u('/guias/') → '/el-brujulista/guias/' en GitHub Pages, '/guias/' en local. */
export function u(path: string): string {
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}

/** Quita la base de un pathname (para comparar la ruta actual con '/guias', etc.). */
export function sinBase(pathname: string): string {
  return BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
}
