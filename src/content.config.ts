import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { stepId } from './lib/slugify';

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const CATEGORIES = ['quest', 'dungeon', 'ruta', 'tip'] as const;
export const STATUSES = ['verificado', 'sin-verificar', 'desactualizado'] as const;

const step = z.object({
  /** Opcional. Si no se pone, se deriva del título. Úsalo para que el progreso no se pierda al renombrar el paso. */
  id: z.string().regex(kebab, 'El id del paso debe ser kebab-case (ej: hablar-con-npc)').optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  map: z.string().optional(),
  coords: z.string().optional(),
  reward: z.string().optional(),
  notes: z.string().optional(),
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
  schema: z
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
      requirements: z.array(z.string()).default([]),
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
