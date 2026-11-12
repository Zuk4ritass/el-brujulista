---
# Estrategia del jefe: video "COMO PASAR KRALAMAR GIGANTE, TREFUS RETRO... GUIA 2026" de Raymon Online
# (https://www.youtube.com/watch?v=Icg2_Zrc5OM, 2026-03-05), resumida con palabras propias. Pedido de Zukitas (2026-11-12).
# Acceso (llaves / llavero, Fongos) y 2 salas (Rey Stropajo + Kralamar): datos de Zukitas 2026-11-12 con captura del modo héroes. Nivel y recompensas: POR COMPLETAR. Sin probar en Trefus por Zukitas.
title: "Cómo pasar el Antro del Kralamar"
slug: antro-del-kralamar
summary: "Estrategia turno a turno para vencer al Kralamar gigante en 9 turnos, controlando sus tentáculos."
tags: [Kralamar gigante, Antro del Kralamar, Kralamar, dungeon, mazmorra, jefe, tentáculos]
category: dungeon
poster: "npcs/kralamar-arte" # Kralamar gigante: retrato oficial del cliente (clips/artworks/big/1635.swf)
requirements:
  - "Nivel recomendado: POR COMPLETAR"
  - "8 llaves, o el llavero"
  - "Un personaje que pueda cargar y lanzar (como el Pandawa), para mover los tentáculos"
  - "Poder atacar con los cuatro elementos: agua, fuego, tierra y aire"
  - "Invocaciones y hechizos para quitar PM"
steps:
  - id: conseguir-llaves
    title: Consigue las llaves
    description: "Para entrar necesitas 8 llaves, o usar el llavero. Una buena forma de juntarlas es pasar la dungeon de los Fongos o subir de nivel en los Fongos."
    figura: # Fongo: sprite 1641 del cliente (confirmado por Zukitas), renderizado en alta resolución
      sprite: "npcs/1641-hd"
      nombre: Fongo
  - id: entrar
    title: Entra con el llavero
    description: "En Trefus no hace falta ir hasta la entrada de la dungeon: entras con las llaves o con el llavero."
    notes: "¿No te deja entrar porque no tienes llaves? Primero escribe `.llavero` en el chat. Si sigue sin funcionar, abre el modo héroes y reinicia el llavero de cada personaje con el botón «Reset llavero heroe»."
    capturas: [antro-del-kralamar-llavero.webp]
  - id: sala-1
    # Zukitas (2026-11-12): en Trefus la dungeon tiene solo 2 salas (no 5 como en el juego original).
    title: "Sala 1: vence al Rey Stropajo"
    description: "En Trefus esta dungeon tiene solo 2 salas, no 5 como en el juego original. En la primera peleas contra el Rey Stropajo. Cuando le ganes, pasas a la segunda sala, la del Kralamar."
  - id: sala-2
    title: "Sala 2: vence al Kralamar gigante en 9 turnos"
    description: "La clave es golpear al Kralamar una vez por turno con cada elemento, en este orden: agua, fuego, tierra y aire. Cada golpe hace aparecer un tentáculo distinto en el turno siguiente: mantenlos lejos y sin PM hasta que en el turno 9 el Kralamar quede vulnerable."
    turnos:
      - titulo: "Colócate en línea con el Kralamar"
        texto: "Empiezas en estado pesado: no puedes saltar ni teletransportarte, pero sí moverte, cargar y lanzar. Ubícate en línea hacia el Kralamar para preparar los turnos siguientes."
      - titulo: "Golpéalo una vez con agua"
        texto: "Un solo ataque de agua lo pone en estado «ganas de paralizar». Ojo: cada ataque de un elemento hace que el Kralamar invoque un tentáculo en el turno siguiente, y ese tentáculo aplica el estado al golpear a alguien."
        nota: "El primer tentáculo (el cuaternario) paraliza: si te golpea, pierdes el turno."
      - titulo: "Aleja al tentáculo cuaternario y golpea con fuego"
        texto: "Aparece el tentáculo cuaternario. Cárgalo, lánzalo lejos del grupo y ponle una invocación al lado para mantenerlo apartado. En el mismo turno, golpea al Kralamar con fuego: entra en «ganas de maldecir»."
      - titulo: "Aleja al tentáculo terciario y golpea con tierra"
        texto: "Aparece el tentáculo terciario. Cárgalo y lánzalo lejos, igual que el anterior. Después golpea al Kralamar con tierra: entra en «ganas de envenenar»."
      - titulo: "Aleja al tentáculo secundario y golpea con aire"
        texto: "Aparece el tentáculo secundario. Aléjalo como a los otros. Luego golpea al Kralamar con aire, el último elemento: entra en «ganas de matar»."
      - titulo: "Controla al tentáculo primario"
        texto: "Aparece el tentáculo primario, que mata de un solo golpe. Cárgalo y colócalo de forma que le tape la visión al Kralamar y quede listo para ponerle una invocación enfrente. Quítales PM a todos los tentáculos que veas, sin olvidar al primario."
      - titulo: "Dale una invocación al primario"
        texto: "Pon una invocación frente al tentáculo primario: tiene que matar a alguien para que la estrategia siga, y es mejor que sea la invocación. Vuelve a quitarles PM a los tentáculos."
      - titulo: "Otra invocación y prepara el golpe final"
        texto: "Todos los tentáculos tienen que golpear una invocación, así que es clave que siga viva la primera que pusiste. Pon otra invocación frente al primario para que no mate a nadie del grupo. Después potencia a tu grupo y aplica todas las debilidades que puedas al Kralamar."
      - titulo: "Acaba con el Kralamar"
        texto: "En este turno el Kralamar deja de ser invulnerable. Atácalo con todo, aprovechando las mejoras y debilidades del turno anterior."
  - id: recompensas
    title: Recoge las recompensas
    description: "POR COMPLETAR (qué da y cómo se sale)"
verification:
  status: sin-verificar
---

La estrategia de la pelea viene del video [«Cómo pasar Kralamar gigante, Trefus Retro, guía 2026»](https://www.youtube.com/watch?v=Icg2_Zrc5OM) de **Raymon Online**. Míralo para ver dónde se para cada personaje en el mapa.

La clave es el orden de los elementos: **agua, fuego, tierra y aire**, un golpe por turno. Cada golpe hace aparecer un tentáculo distinto en el turno siguiente. Si los mantienes lejos y sin PM, en el turno 9 el Kralamar queda vulnerable.
