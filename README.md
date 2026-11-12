# Guías Trefus

Sitio de guías paso a paso para **Trefus**, un servidor privado de Dofus basado en la 1.29 con contenido de versiones más nuevas. Funciona como una plataforma de streaming: cada guía es un póster, hay un buscador principal y una fila "Continúa donde quedaste". Por dentro, cada guía es un checklist corto, y el progreso se guarda en el navegador del jugador.

## Páginas

| Ruta | Qué es |
| --- | --- |
| `/` | Portada: guía destacada, buscador, fila "Continúa donde quedaste" y una fila por categoría. |
| `/guias/` | Catálogo completo en pósters, con buscador y filtros por nivel y categoría. Acepta `?q=`, `?nivel=` y `?categoria=`. |
| `/guias/<slug>/` | La guía: progreso, "Necesitas:", pasos y bugs conocidos. El contexto extra queda plegado. |
| `/sugerir/` | La gente propone ideas de guías por Discord. `/contribuir/` redirige aquí. |

## Buscador

- **Corre en el navegador:** el índice se genera al compilar.
- **Ignora tildes y mayúsculas:** "goloson" encuentra "Golosón".
- **Tolera errores de tipeo pequeños:** "frigots" encuentra "Frigost".
- **Busca en:** título, `tags`, resumen, requisitos, pasos, bugs y el texto del cuerpo.
- **Los apodos van en `tags`:** si la gente le dice a algo por otro nombre (FG, Frigost), agrégalo ahí.

> **Fansite no oficial.** No está afiliado a Ankama ni a Trefus. No aloja ni enlaza el cliente del juego, y no usa logos ni assets de Ankama: todas las ilustraciones son SVG propios.

## Stack

- [Astro](https://astro.build) 7, con salida 100 % estática.
- TypeScript estricto.
- Content Collections con esquema Zod (`src/content.config.ts`).
- CSS propio, sin Tailwind: son pocos componentes y un solo tema, así que con variables CSS basta.
- Sin backend: el progreso vive en `localStorage`, con un respaldo en memoria si no está disponible.

## Correr el proyecto

Requisitos: Node 22.12 o superior (está probado con Node 24).

```bash
npm install
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run check    # revisa tipos y valida el contenido
npm run build    # genera el sitio estático en dist/
npm run preview  # sirve dist/ para revisarlo antes de publicar
```

### Publicar gratis

El sitio es estático: cualquier hosting de archivos sirve.

- **Cloudflare Pages:** conecta el repo, con comando de build `npm run build` y carpeta de salida `dist`.
- **Vercel:** importa el repo. Detecta Astro solo y no hay que configurar nada.

## Estructura

```
src/
├── content.config.ts      # esquema de las guías (Zod)
├── content/guias/         # una guía = un archivo .md
├── components/            # pósters, filas, buscador, badge, checklist, héroe animado…
├── layouts/BaseLayout.astro
├── lib/                   # progreso (localStorage), buscador, helpers de guías
├── config.ts              # link de Discord
├── pages/                 # inicio, /guias/, /guias/[slug]/, /sugerir/, 404
└── styles/global.css      # tema retro: colores, botones, cintas, pergamino
```

## Agregar una guía nueva

1. Crea un archivo en `src/content/guias/`, por ejemplo `mi-guia.md`. Puedes copiar `llegar-a-fg.md` como plantilla.
2. Llena el frontmatter:

```yaml
---
title: Nombre de la guía
slug: mi-guia                 # kebab-case, único; será la URL /guias/mi-guia/
summary: Una o dos líneas de qué logra el jugador.
levelMin: 50                  # opcional mientras no lo sepas
levelMax: 80                  # opcional
category: quest               # quest | dungeon | ruta | tip
tags: [FG, Frigost]           # apodos y abreviaturas para el buscador
featured: false               # true = aparece en grande en la portada
# cover: ./portadas/mi-guia.jpg  # opcional; sin esto se genera un póster automático
requirements:
  - Lo que se necesita antes de empezar
steps:
  - id: hablar-con-npc        # opcional pero recomendado (ver abajo)
    title: Título corto del paso
    description: Qué hacer.
    map: Nombre del mapa      # opcional
    coords: "[x,y]"           # opcional (entre comillas)
    reward: Qué se obtiene    # opcional
    notes: Detalles extra     # opcional
knownBugs:
  - description: Qué falla
    workaround: Cómo evitarlo # opcional
verification:
  status: sin-verificar
---

Texto libre opcional con contexto extra (aparece en la sección "Contexto").
```

3. Corre `npm run check`. Si algo está mal (niveles invertidos, pasos repetidos, una guía verificada sin fecha), el error dice exactamente qué corregir.

### Portadas

Si no pones `cover`, el póster se genera solo, con colores y un dibujo según la categoría. Si algún día usas una imagen propia, guárdala junto a la guía (por ejemplo `src/content/guias/portadas/`) y ponla en `cover`. No uses arte, logos ni capturas de Ankama sin confirmar que lo permiten.

### Pasos cortos

La guía debe ir directo a la acción:
- **Un paso es una acción:** "Habla con X", "Ve a [x,y]".
- **`description`:** una o dos frases.
- **`map`, `coords` y `reward`:** se muestran como chips pequeños.
- **Explicaciones largas:** van en el cuerpo del `.md`, que aparece plegado como "Más contexto".

### Reglas de contenido

- **No inventes datos del juego.** Si no sabes algo, escribe `POR COMPLETAR`: el sitio lo resalta para que se note.
- **No copies texto** de otras guías o wikis. Escribe con tus palabras lo que comprobaste jugando.
- Las guías de prueba llevan `example: true`, que muestra la etiqueta EJEMPLO.

### Sobre el `id` de cada paso

El progreso del jugador se guarda por id de paso. Si un paso no tiene `id`, se usa uno generado a partir del título, y en ese caso **cambiar el título desmarca ese paso** para quien ya lo tenía hecho. Con un `id` fijo puedes renombrar, reordenar o insertar pasos sin afectar el progreso de nadie. No cambies un `id` una vez publicado.

## Discord para sugerencias

Pega el link de invitación en `src/config.ts`:

```ts
export const SITE = {
  discordUrl: 'https://discord.gg/tu-invitacion',
};
```

Mientras esté vacío, el botón muestra "Discord próximamente".

## Marcar una guía como verificada

Cuando hayas seguido la guía completa en Trefus y todo funcione:

```yaml
verification:
  status: verificado
  lastVerified: 2026-11-20   # fecha en que la comprobaste (AAAA-MM-DD)
  verifiedBy: Manuel
```

`lastVerified` y `verifiedBy` son obligatorios con `verificado`: si falta alguno, el build falla.

Si algo cambia en el servidor después, cambia el estado a `desactualizado` y conserva la fecha anterior. Cuando la vuelvas a comprobar, regresa a `verificado` con la fecha nueva.

| Estado | Cuándo usarlo |
| --- | --- |
| `sin-verificar` | Guía nueva, o escrita sin comprobar en el servidor. |
| `verificado` | La seguiste completa en Trefus y funciona. |
| `desactualizado` | Estaba verificada, pero algo cambió en el servidor. |
