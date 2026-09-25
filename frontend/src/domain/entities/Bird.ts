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
  /** Ruta pública del muñeco de felpa correspondiente. */
  plushImage: string;
}

export const FOREST_VOICES: Bird[] = [
  {
    id: 'ojopelao',
    name: 'Ojopelao',
    species: 'Colibrí (Trochilinae)',
    trait: 'Anfitrión de la competencia',
    teaches: 'A mirar de cerca, preguntar sin miedo y acoger a cada escuela participante.',
    lesson:
      'Se queda quieto en el aire para observar mejor cada detalle. Como anfitrión del Rally Continental, da la bienvenida a las escuelas de las Américas y enseña que la curiosidad es el punto de partida de toda transformación territorial.',
    image: '/img Pajaros/Ojopelao.jpeg',
    plushImage: '/img Pajaros/felpa/Hummingbird_plushie_toy_20260922163346.png',
  },
  {
    id: 'saggy',
    name: 'Saggy',
    species: 'Azulejo (Passerina Cyanea)',
    trait: 'Desafío del agua',
    teaches: 'La protección, el uso consciente y la regeneración de las cuencas hídricas escolares y comunitarias.',
    lesson:
      'Guía el desafío del agua en el Rally. Enseña que los ríos, cuencas y acueductos no son solo recursos: son la vida compartida del territorio, y protegerlos requiere unión comunitaria y lealtad.',
    image: '/img Pajaros/saggy.jpeg',
    plushImage: '/img Pajaros/felpa/Plush_blue_songbird_toy_20260922163204.png',
  },
  {
    id: 'omar',
    name: 'Omar',
    species: 'Canario (Serinus Canaria)',
    trait: 'Desafío de energía',
    teaches: 'La transición hacia energías limpias, eficiencia energética y uso responsable en el aula.',
    lesson:
      'Canta al amanecer para impulsar la energía del aula. Enseña a las comunidades que el sol, el viento y la eficiencia energética son el motor de un futuro escolar sostenible.',
    image: '/img Pajaros/Omar.jpeg',
    plushImage: '/img Pajaros/felpa/Yellow_canary_plushie_toy_20260922163152.png',
  },
  {
    id: 'carla',
    name: 'Carla',
    species: 'Cotorra (Amazona Auropalliata)',
    trait: 'Desafío gas carbónico (CO2) y ecosistemas',
    teaches: 'La medición y reducción de emisiones de CO2, reforestación nativa y restauración de ecosistemas.',
    lesson:
      'Alza la voz en el desafío del gas carbónico y los ecosistemas. Enseña a las escuelas a medir su huella, sembrar especies nativas y devolverle el respiro a la tierra.',
    image: '/img Pajaros/carla.jpeg',
    plushImage: '/img Pajaros/felpa/Plush_lovebird_toy_isolated_20260922163417.png',
  },
  {
    id: 'lilo',
    name: 'Lilo',
    species: 'Lorita (Amazona Amazónica)',
    trait: 'Desafío de alimentos',
    teaches: 'La soberanía alimentaria, creación de huertos escolares sostenibles y nutrición comunitaria.',
    lesson:
      'Encabeza con alegría el desafío de alimentos en el Rally. Convierte los patios escolares en huertos pedagógicos vivos, enseñando que sembrar y cultivar es aprender a cuidarnos entre todos.',
    image: '/img Pajaros/lilo.jpeg',
    plushImage: '/img Pajaros/felpa/Green_parakeet_plushie_toy_20260922163322.png',
  },
  {
    id: 'silvio',
    name: 'Silvio',
    species: 'Mochuelo (Glaucidium Brasilianum)',
    trait: 'Desafío de residuos',
    teaches: 'La economía circular, separación en la fuente y aprovechamiento integral de residuos.',
    lesson:
      'Observador atento de la noche, guía el desafío de residuos del Rally. Transforma lo que otros descartan en insumos para la ciencia, el compostaje y la creatividad escolar.',
    image: '/img Pajaros/Silvio.jpeg',
    plushImage: '/img Pajaros/felpa/buho.png',
  },
  {
    id: 'esperanza',
    name: 'Esperanza',
    species: 'Paloma mensajera (Columba Livia)',
    trait: 'Líder y Voz Guía de Esperanza',
    teaches: 'Que una voz compartida puede unir a las escuelas de todo el continente en resiliencia.',
    lesson:
      'La paloma que inspira el movimiento. Conecta a los seis guardianes de los desafíos con las niñas y niños de las Américas, recordándonos que la esperanza se construye con hechos colectivos.',
    image: '/img Pajaros/Esperanza.jpeg',
    plushImage: '/img Pajaros/felpa/Dove_plush_toy_smiling_20260922163219.png',
  },
];
