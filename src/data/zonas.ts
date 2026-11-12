/**
 * Zonas del mapa del mundo, registradas por Manuel jugando en Trefus.
 *
 * REGLA: solo zonas comprobadas en el juego. Nada de memoria ni copiado de otras webs.
 * Si no sabes un borde exacto, no la agregues todavía: el mini mapa mostrará "Zona: POR COMPLETAR".
 *
 * Coordenadas como las muestra el juego: x crece hacia el este (derecha), y crece hacia el sur (abajo).
 * Una zona es un rectángulo de casillas, de la esquina `desde` a la esquina `hasta` (ambas incluidas).
 * Si una zona tiene forma irregular, regístrala en varios rectángulos con el mismo nombre.
 * Si dos zonas se pisan, gana la que está más abajo en la lista.
 *
 * Ejemplo (NO es un dato real, solo muestra el formato):
 *   { nombre: 'Nombre de la zona', desde: [0, -5], hasta: [6, 0], terreno: 'pasto' },
 */

export type Terreno = 'pasto' | 'bosque' | 'arena' | 'roca' | 'nieve' | 'agua' | 'ciudad' | 'pantano';

export interface Zona {
  nombre: string;
  desde: [number, number];
  hasta: [number, number];
  terreno: Terreno;
}

export const ZONAS: Zona[] = [
  // Agrega aquí las zonas que vayas comprobando.
  // Confirmado por Manuel (captura del juego): [4, -19] es Ciudad de Astrub. Bordes de la ciudad: POR COMPLETAR.
  { nombre: 'Ciudad de Astrub', desde: [4, -19], hasta: [4, -19], terreno: 'ciudad' },
];
