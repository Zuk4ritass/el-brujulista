import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { stepId } from './lib/slugify';

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const CATEGORIES = ['quest', 'dungeon', 'ruta', 'tip'] as const;
export const STATUSES = ['verificado', 'sin-verificar', 'desactualizado'] as const;

/**
 * Objeto que se usa o se gana en un paso. El nombre lo escribe Manuel tal cual sale en el juego.
 * `sprite` = "carpeta/archivo" dentro de Sprites Trefus/Objetos (PNG 4x), ej: "2/1" (sin .png).
 * `npm run sprites` copia al sitio solo los sprites usados (también corre solo antes de dev y build).
 */
const itemRef = z.object({
  nombre: z.string().min(1),
  cantidad: z.number().int().min(1).optional(),
  sprite: z
    .string()
    .regex(/^[\w-]+\/[\w-]+$/, 'sprite es "carpeta/archivo" sin extensión, ej: 2/1')
    .optional(),
});

/** Una de varias formas de hacer un paso ("una u otra"): se muestran lado a lado con "o" entre ellas. */
const opcion = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  map: z.string().optional(),
  coords: z.string().optional(),
  notes: z.string().optional(),
  objetos: z.array(itemRef).default([]),
  recompensas: z.array(itemRef).default([]),
  capturas: z.array(z.string().regex(/^[\w.-]+\.(png|jpe?g|webp)$/i, 'Solo el nombre del archivo, ej: mi-captura.png')).default([]),
});

const step = z.object({
  /** Opcional. Si no se pone, se deriva del título. Úsalo para que el progreso no se pierda al renombrar el paso. */
  id: z.string().regex(kebab, 'El id del paso debe ser kebab-case (ej: hablar-con-npc)').optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  map: z.string().optional(),
  coords: z.string().optional(),
  reward: z.string().optional(),
  notes: z.string().optional(),
  /** Lo que necesitas o debes usar en este paso (se muestra con su sprite). */
  objetos: z.array(itemRef).default([]),
  /** Lo que ganas en este paso. Puede convivir con `reward` (texto libre, ej. experiencia o kamas). */
  recompensas: z.array(itemRef).default([]),
  /** Capturas propias (nombres de archivo dentro de public/capturas/; se publican con el sitio). */
  capturas: z.array(z.string().regex(/^[\w.-]+\.(png|jpe?g|webp)$/i, 'Solo el nombre del archivo, ej: mi-captura.png')).default([]),
  /** Caminos alternativos para cumplir el paso (mínimo 2): el jugador elige uno. */
  opciones: z.array(opcion).min(2).optional(),
  /** Sub-pasos numerados como turnos de una pelea (Turno 1, Turno 2…), dentro de un solo paso. */
  turnos: z
    .array(z.object({ titulo: z.string().min(1), texto: z.string().min(1), nota: z.string().optional() }))
    .optional(),
  /** Personaje o monstruo del juego que acompaña el paso, sin fondo y sin texto (`nombre` es el texto alternativo de la imagen). */
  figura: z
    .object({
      sprite: z.string().regex(/^npcs\/[\w-]+$/, 'sprite es "npcs/archivo", sin extensión (archivo en public/sprites/npcs/)'),
      nombre: z.string().min(1),
    })
    .optional(),
});

const knownBug = z.object({
  description: z.string().min(1),
  workaround: z.string().optional(),
});

const verification = z
  .object({
    status: z.enum(STATUSES),
    lastVerified: z.coerce.date().optional(),
    verifiedBy: z.string().optional(),
  })
  .refine((v) => v.status !== 'verificado' || (v.lastVerified && v.verifiedBy), {
    message: 'Una guía "verificado" necesita lastVerified y verifiedBy.',
  });

const guias = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guias' }),
  schema: ({ image }) =>
    z
    .object({
      title: z.string().min(1),
      slug: z.string().regex(kebab, 'El slug debe ser kebab-case'),
      summary: z.string().min(1),
      /** Opcionales: si no se conocen todavía, la guía se muestra como "nivel POR COMPLETAR". */
      levelMin: z.number().int().min(1).max(200).optional(),
      levelMax: z.number().int().min(1).max(200).optional(),
      category: z.enum(CATEGORIES),
      /** true = guía de ejemplo, no es contenido real del juego. */
      example: z.boolean().default(false),
      /** Palabras extra para el buscador: apodos, abreviaturas (ej: FG, Frigost). */
      tags: z.array(z.string()).default([]),
      /** true = aparece en grande en la portada. Si ninguna lo tiene, se usa la primera guía real. */
      featured: z.boolean().default(false),
      /** Imagen de portada opcional (ruta relativa al .md). Sin ella se genera una automáticamente. */
      cover: image().optional(),
      /**
       * Sprite del juego para el póster, sobre el fondo de la categoría. Ruta dentro de public/sprites/ sin extensión:
       * "objetos/15/825" (objeto; lo copia `npm run sprites`) o "npcs/<gfx>" (NPC, archivo ya en public/sprites/npcs/).
       */
      poster: z
        .string()
        .regex(/^(objetos\/[\w-]+\/[\w-]+|npcs\/[\w-]+)$/, 'poster es "objetos/carpeta/archivo" o "npcs/archivo", sin extensión')
        .optional(),
      requirements: z.array(z.string()).default([]),
      /** Video tutorial opcional de YouTube, embebido al final de los pasos. `youtube` es el id (lo que va tras watch?v=). */
      video: z
        .object({
          youtube: z.string().regex(/^[\w-]{11}$/, 'youtube es el id de 11 caracteres del video'),
          titulo: z.string().min(1),
          autor: z.string().min(1),
        })
        .optional(),
      steps: z.array(step).min(1),
      knownBugs: z.array(knownBug).default([]),
      verification,
    })
    .refine((g) => g.levelMin === undefined || g.levelMax === undefined || g.levelMin <= g.levelMax, {
      message: 'levelMin no puede ser mayor que levelMax.',
      path: ['levelMin'],
    })
    .refine((g) => new Set(g.steps.map(stepId)).size === g.steps.length, {
      message: 'Hay pasos con el mismo id (o el mismo título). Dales un `id` distinto.',
      path: ['steps'],
    }),
});

export const collections = { guias };
