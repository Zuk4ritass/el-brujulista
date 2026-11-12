---
# Guía piloto. Datos de juego aportados y verificados por Manuel (capturas y recorrido en Trefus, 2026-11-12).
title: Llegar a Frigost
slug: llegar-a-fg
summary: Del Portal Transportador de Astrub al barco del Capitán Ardier, y en Frigost guarda el zaap para volver rápido.
tags: [FG, Frigost, zaap, barco]
featured: true
# Manuel lo probó (2026-11-12): en Trefus se empieza en nivel 40 y ya se puede ir; no pide recursos (en Dofus pedía 50+).
levelMin: 40
category: ruta
poster: "npcs/14289" # Capitán Ardier (sprite 14289 del cliente)
requirements:
  - "Nada: desde el nivel 40 (con el que empiezas en Trefus) ya puedes ir, sin recursos"
steps:
  - id: paso-1
    # Datos de Manuel (captura del juego): Portal Transportador en Astrub [4, -19]
    title: Ve al Portal Transportador
    # Parte 2 (captura de Manuel): en el diálogo del portal se elige "¡Quiero viajar a Frigost!"
    # Dato de Manuel (2026-11-12): el comando .start lleva a la zona principal, donde están varios NPC
    description: "Escribe `.start` en el chat para ir a la zona principal del juego, donde están varios NPC. Ahí busca el Portal Transportador, háblale y elige «¡Quiero viajar a Frigost!». Te lleva al muelle del barco que va a Frigost."
    map: Astrub (Ciudad de Astrub)
    coords: "4, -19"
    capturas: [llegar-a-fg-portal-npc.webp, llegar-a-fg-portal.webp] # en public/capturas/
  - id: hablar-con-el-capitan
    # Datos de Manuel (capturas del juego, 2026-11-12): muelle en Llanura de Cania (Bahía de Cania) [-33, -15]
    title: Habla con el Capitán Ardier
    description: "En el muelle, háblale al Capitán Ardier (está junto a su barco, El Sanguinario) y elige «Desplazarse hasta Frigost»."
    map: Llanura de Cania (Bahía de Cania)
    coords: "-33, -15"
    capturas: [llegar-a-fg-capitan.webp, llegar-a-fg-capitan-dialogo.webp]
    # Manuel (2026-11-12): en Trefus hay escenas extra con el capitán; no son relevantes
    notes: "En Trefus el capitán te cuenta algunas escenas por el camino: solo dale a «Continuar» hasta llegar a Frigost."
  - id: guardar-zaap
    # Dato de Manuel (2026-11-12): zaap de Frigost en [-48, -83]
    title: Guarda el zaap de Frigost
    description: "Ya en Frigost, camina hasta el zaap y guárdalo. Así la próxima vez llegas directo por zaap, sin barco."
    map: Frigost
    coords: "-48, -83"
    reward: Zaap de Frigost guardado
# Manuel recorrió la ruta en Trefus el 2026-11-12: sin bugs conocidos.
verification:
  status: verificado
  lastVerified: 2026-11-12
  verifiedBy: Zukitas
---
