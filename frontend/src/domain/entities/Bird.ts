/**
 * Las Voces del Bosque — los personajes de la Colección Libritos de Esperanza.
 *
 * Cada ave enseña una cosa concreta a los niños. No son mascotas decorativas:
 * son el vehículo pedagógico de la fundación, y por eso cada una declara
 * explícitamente QUÉ enseña y QUÉ aprendizaje deja.
 *
 * Las imágenes viven en `public/img Pajaros/`. Ojo con el nombre de la carpeta:
 * lleva ESPACIO y P mayúscula. Next codifica la URL, pero cualquier `fetch` o
 * `<img src>` escrito a mano necesita `%20`.
 */
export interface Bird {
  id: string;
  /** Nombre propio del personaje. */
  name: string;
  /** Especie real del ave. */
  species: string;
  /** Rasgo que encarna, en dos o tres palabras. */
  trait: string;
  /** Qué le enseña a quien la escucha. */
  teaches: string;
  /** El aprendizaje, dicho como lo diría el personaje. */
  lesson: string;
  /** Ruta pública de la ilustración. */
  image: string;
}

export const FOREST_VOICES: Bird[] = [
  {
    id: 'esperanza',
    name: 'Esperanza',
    species: 'Paloma mensajera',
    trait: 'Voz y liderazgo',
    teaches: 'Que una voz sola puede empezar a reparar un bosque entero.',
    lesson:
      'Perdió su bosque y a sus padres, Pepe y Maye. En vez de callarse, aprendió a hablar con los seres humanos. Desde entonces enseña que contar lo que pasó es el primer acto de reparación.',
    image: '/img Pajaros/Esperanza.jpeg',
  },
  {
    id: 'ojopelao',
    name: 'Ojopelao',
    species: 'Colibrí',
    trait: 'Agilidad y curiosidad',
    teaches: 'A mirar de cerca, preguntar sin miedo y no dar nada por obvio.',
    lesson:
      'Se queda quieto en el aire para observar mejor. Enseña que la curiosidad no es distracción: es la forma más honesta de entender un territorio.',
    image: '/img Pajaros/Ojopelao.jpeg',
  },
  {
    id: 'silvio',
    name: 'Silvio',
    species: 'Búho',
    trait: 'Sabiduría y calma',
    teaches: 'A esperar antes de reaccionar cuando todo alrededor se acelera.',
    lesson:
      'Ve en la oscuridad porque aprendió a no temerle. Enseña que la calma no es lentitud: es lo que permite decidir bien cuando hay una emergencia.',
    image: '/img Pajaros/Silvio.jpeg',
  },
  {
    id: 'saggy',
    name: 'Saggy',
    species: 'Azulejo',
    trait: 'Lealtad y compañerismo',
    teaches: 'Que nadie atraviesa una adversidad solo si hay una bandada.',
    lesson:
      'Fue el primero en salir a buscar a Esperanza y el último en dejar de buscar. Enseña que acompañar también es una forma de actuar.',
    image: '/img Pajaros/saggy.jpeg',
  },
  {
    id: 'lilo',
    name: 'Lilo',
    species: 'Perico',
    trait: 'Alegría y perseverancia',
    teaches: 'Que la alegría sostenida en el tiempo es una forma de resistencia.',
    lesson:
      'Hace reír incluso en el viaje más largo. Enseña que cuidar el ánimo del grupo es un trabajo tan real como cargar el agua.',
    image: '/img Pajaros/lilo.jpeg',
  },
  {
    id: 'carla',
    name: 'Carla',
    species: 'Lora',
    trait: 'Comunicación y alerta',
    teaches: 'A avisar a tiempo y a decir las cosas con las palabras justas.',
    lesson:
      'Repite lo que escucha hasta que alguien la entiende. Enseña que un aviso temprano, dicho con claridad, salva más que un rescate tardío.',
    image: '/img Pajaros/carla.jpeg',
  },
  {
    id: 'omar',
    name: 'Omar',
    species: 'Canario',
    trait: 'Música y esperanza',
    teaches: 'Que el arte también reconstruye lo que un desastre se llevó.',
    lesson:
      'Canta al amanecer aunque el bosque siga herido. Enseña que la belleza no es un lujo posterior a la reconstrucción: es parte de ella.',
    image: '/img Pajaros/Omar.jpeg',
  },
];
