---
# Datos de Zukitas (2026-11-12, capturas del juego). Sprite de la Kama de hielo: objeto 11196 del cliente → 15/825.
title: "Kamas de hielo: cómo usarlas y obtenerlas"
slug: kamas-de-hielo
summary: Qué son, cómo conseguirlas y dónde gastarlas en recursos para los sets de Frigost 2 y Frigost 3.
tags: [kamas de hielo, Frigost, F2, F3, Alcaldesa Lario, sets, recursos]
category: tip
poster: "objetos/15/825" # Kama de hielo
requirements:
  - Haber llegado a Frigost (mira la guía «Llegar a Frigost»)
steps:
  - id: conseguir-kamas
    # Zukitas (2026-11-12): misiones y logros son caminos alternativos (uno u otro), no pasos seguidos.
    title: Consigue kamas de hielo
    description: "Hay dos formas de juntarlas. Usa la que te quede mejor, o las dos a la vez."
    notes: "Muchos logros son «Completa la misión: …»: cada misión de la isla que terminas te acerca también a un logro, y cobras las dos recompensas."
    opciones:
      # Dato de Zukitas: las misiones las dan distintos NPC de la isla; Albert Pess en [-50, -84], Valery Miza en [-46, -82]
      - title: Haz misiones de Frigost
        description: "Las misiones te las dan distintos NPC repartidos por la isla: habla con ellos para aceptarlas. Por ejemplo, en el burgo están Albert Pess [-50, -84] y Valery Miza [-46, -82]."
        map: Isla de Frigost (El burgo)
        coords: "-50, -84"
        capturas: [kamas-de-hielo-albert-pess.webp, kamas-de-hielo-valery-miza.webp]
        recompensas:
          - nombre: Kama de hielo
            sprite: "15/825"
      # Captura de Zukitas: ventana "Logros Trefus", categoría Ciudad de Frigost
      - title: Cumple logros de la isla
        description: "En la ventana «Logros Trefus» busca las categorías de Frigost (Isla de Frigost, Ciudad de Frigost, Dung Frigost III). Ejemplo: «Completa la misión: Un conde con mucho cuento» (nivel 100) da 10 kamas de hielo, 15.000 kamas y 500.000 de experiencia."
        capturas: [kamas-de-hielo-logros.webp]
        recompensas:
          - nombre: Kama de hielo
            cantidad: 10
            sprite: "15/825"
  - id: ir-con-la-alcaldesa
    title: Ve con la Alcaldesa Lario
    description: "Está en el burgo de la Isla de Frigost, en el mismo mapa del zaap. Háblale y abre su tienda."
    map: Isla de Frigost (El burgo)
    coords: "-48, -83"
    capturas: [kamas-de-hielo-alcaldesa.webp] # en public/capturas/
  - id: comprar-recursos
    title: Cambia tus kamas de hielo por recursos
    description: "En su tienda cada recurso tiene su precio en kamas de hielo (por ejemplo, Polvos glaciales cuesta 2 por unidad). Elige el que necesites y dale a «Comprar»."
    objetos:
      - nombre: Kama de hielo
        sprite: "15/825"
    notes: "Compra solo lo que te pida el set que vas a fabricar: estos recursos son para los sets de nivel alto de Frigost 2 (F2) y Frigost 3 (F3)."
    capturas: [kamas-de-hielo-tienda.webp]
verification:
  status: verificado
  lastVerified: 2026-11-12
  verifiedBy: Zukitas
---

Las **kamas de hielo** son la moneda local de Frigost. No sirven fuera de la isla: se usan para comprarle a la Alcaldesa Lario los recursos con los que se fabrican los sets de nivel alto de **Frigost 2 (F2)** y **Frigost 3 (F3)**.
