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
        # Capturas de Zukitas (2026-11-15): entrada del castillo de Kontatrás [-47, -97], varios NPC con «!» verde
        description: "Las misiones te las dan distintos NPC repartidos por la isla: habla con ellos para aceptarlas. Los que tienen misión llevan un «!» verde encima. En el burgo están Albert Pess [-50, -84] y Valery Miza [-46, -82]. En la entrada del castillo de Kontatrás [-47, -97] hay varios más, como Valero Yizo y Arktos Vigía del Hielo."
        lugares:
          - map: Isla de Frigost (El burgo)
            coords: "-50, -84"
          - map: Isla de Frigost (Entrada del castillo de Kontatrás)
            coords: "-47, -97"
        capturas:
          [
            kamas-de-hielo-albert-pess.webp,
            kamas-de-hielo-valery-miza.webp,
            kamas-de-hielo-kontatras-valero-yizo.webp,
            kamas-de-hielo-kontatras-arktos.webp,
            kamas-de-hielo-kontatras-castillo.webp,
          ]
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
  # Zukitas (2026-11-15): los pasos «ir a la tienda» y «comprar» eran lo mismo; quedan en uno.
  # En Kontatrás [-47, -97] también se abre la tienda «Alcaldesa Lario». Zukitas: burgo = recursos F2, Kontatrás = recursos F3.
  - id: comprar-recursos
    title: Cambia tus kamas de hielo por recursos
    description: "Hay dos tiendas: una vende recursos para los objetos de Frigost 2 (F2) y la otra para los de Frigost 3 (F3). En la tienda, cada recurso tiene su precio en kamas de hielo: elige el que necesites y dale a «Comprar»."
    objetos:
      - nombre: Kama de hielo
        sprite: "15/825"
    opciones:
      - title: "Para objetos de F2: la Alcaldesa Lario, en el burgo"
        description: "Está en el burgo de la Isla de Frigost, en el mismo mapa del zaap. Háblale y abre su tienda: vende los recursos para los objetos de F2. Por ejemplo, Polvos glaciales cuesta 2 por unidad."
        map: Isla de Frigost (El burgo)
        coords: "-48, -83"
        capturas: [kamas-de-hielo-alcaldesa.webp, kamas-de-hielo-tienda.webp] # en public/capturas/
      - title: "Para objetos de F3: la tienda de la entrada del castillo de Kontatrás"
        description: "Vende los recursos para los objetos de F3, como Tuerca nueva, Raíz cristalizada, Ojo de cristal o Cremallera, a 120 cada uno. La tienda se abre con el nombre «Alcaldesa Lario»."
        map: Isla de Frigost (Entrada del castillo de Kontatrás)
        coords: "-47, -97"
        capturas: [kamas-de-hielo-kontatras-tienda.webp]
    notes: "Compra solo lo que te pida el set que vas a fabricar, en la tienda de su zona: F2 en el burgo, F3 en Kontatrás."
verification:
  status: verificado
  lastVerified: 2026-11-12
  verifiedBy: Zukitas
---

Las **kamas de hielo** son la moneda local de Frigost. No sirven fuera de la isla: se usan para comprarle a la Alcaldesa Lario los recursos con los que se fabrican los sets de nivel alto de **Frigost 2 (F2)** y **Frigost 3 (F3)**.
