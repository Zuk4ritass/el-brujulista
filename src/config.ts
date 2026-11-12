/** Configuración general del sitio. */
export const SITE = {
  name: 'El Brujulista',
  tagline: 'Guías para Trefus',
  /**
   * Invitación al Discord donde la gente sugiere guías.
   * Mientras esté vacío, el botón aparece como "Discord próximamente".
   */
  discordUrl: '',
  /**
   * Mapa externo para "Ver en el mapa". Solo enlazamos (se abre en otra pestaña);
   * no copiamos sus imágenes. Para cambiar de mapa, cambia esta función.
   */
  mapUrl: (x: number, y: number) => `https://www.dofus-retro.co/es/?c=${x},${y}&z=4`,
};
