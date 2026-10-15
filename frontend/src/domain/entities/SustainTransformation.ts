/**
 * «Sostén la transformación».
 *
 * Biblioteca de recursos con propósito. No es un segundo catálogo: las
 * publicaciones se conocen en `#tienda` (`#pieza-…`), donde siguen la compra
 * y la reseña. El PDF es el único documento curricular con archivo propio.
 *
 * Los tres principios y la secuencia hacia la Ruta B son una lectura
 * editorial. El método oficial vive en `#metodo`.
 */

export const SUSTAIN_INTRO = {
  eyebrow: 'Sostén la transformación',
  title: 'Materiales para aprender. Recursos para transformar.',
  lede: 'Cada gran transformación comienza con una pregunta, una idea y las herramientas para convertirlas en acción. Explora materiales que pueden enriquecer el aprendizaje, apoyar a los docentes y ayudar a niñas, niños y jóvenes a construir soluciones para los desafíos de su escuela y su territorio.',
  guide:
    'No se trata solo de tener recursos. Se trata de ponerlos al servicio del aprendizaje y la transformación.',
} as const;

export const SUSTAIN_PRINCIPLES = [
  {
    id: 'aprender',
    title: 'Aprender',
    text: 'Recursos para despertar preguntas, desarrollar conocimientos y conectar el currículo con la realidad.',
  },
  {
    id: 'aplicar',
    title: 'Aplicar',
    text: 'Herramientas para llevar las ideas al aula, investigar desafíos y desarrollar proyectos educativos.',
  },
  {
    id: 'transformar',
    title: 'Transformar',
    text: 'Materiales que pueden apoyar iniciativas lideradas por estudiantes y fortalecer la relación entre escuela y territorio.',
  },
] as const;

export const CURRICULUM_DOCUMENT = {
  kicker: 'Documento curricular',
  title: 'Evento comunitario: sembrar, conservar y reutilizar',
  summary:
    'Procesos de educación para el desarrollo sostenible alrededor de un día de escuela abierta: siembra, conservación de alimentos y reutilización, con una mesa de aliados. No es una herramienta de prevención ni de respuesta ante una emergencia.',
  audience: 'Para una escuela o un grupo de escuelas que invita a su barrio.',
  href: '/docs/herramientas/proceso-preparacion-educacion-sostenible.pdf',
  action: 'Consultar material',
} as const;

/** Ids reales de `STORE_ITEMS`. El detalle y la consulta viven en la tienda. */
export const PRACTICE_RESOURCE_IDS = [
  'cocoperro',
  'libritos-esperanza',
  'peluches-voces',
] as const;

export const LIBRARY = {
  title: 'Materiales con propósito',
  lede: 'Una selección breve. Las publicaciones se consultan en la tienda, con su reseña y su vía de contacto. El documento curricular se lee aparte: no es un producto.',
} as const;

export const STARTING_POINTS = {
  title: '¿Qué necesitas poner en movimiento en tu escuela?',
  options: [
    {
      id: 'aprendizaje',
      title: 'Fortalecer el aprendizaje',
      text: 'Para docentes y directivos que buscan conectar el currículo con situaciones reales.',
      action: 'Ver las publicaciones',
      href: '#tienda',
    },
    {
      id: 'proyectos',
      title: 'Desarrollar proyectos escolares',
      text: 'Para comunidades educativas que quieren investigar un desafío y llevarlo a una jornada en el territorio.',
      action: 'Consultar el documento',
      href: CURRICULUM_DOCUMENT.href,
      external: true,
    },
    {
      id: 'riesgos',
      title: 'Prepararse ante riesgos',
      text: 'Para quienes necesitan orientación general de prevención y preparación. No sustituye a los servicios oficiales ni a una atención profesional.',
      action: 'Ir a la Ruta A',
      href: '#ruta-a',
      caution:
        'Ante una emergencia, prioriza la vida, sigue las indicaciones de las autoridades y activa los servicios oficiales de tu territorio.',
    },
  ],
} as const;

export const ROUTE_BRIDGE = {
  title: 'El recurso es el comienzo. La transformación ocurre cuando se pone en práctica.',
  body: 'La Ruta B conecta el aprendizaje con los desafíos del territorio. Los materiales pueden enriquecer ese proceso, mientras niñas, niños y jóvenes investigan, proponen soluciones y desarrollan proyectos con acompañamiento educativo.',
  note: 'Esta secuencia es una lectura del recorrido. No garantiza un resultado. El método de la Ruta B está en su sección.',
  steps: [
    'Explorar un recurso',
    'Identificar un desafío',
    'Aprender e investigar',
    'Diseñar una solución',
    'Compartir lo aprendido',
  ],
  primary: { label: 'Explorar la Ruta B', href: '#ruta-b' },
  secondary: { label: 'Conocer el método', href: '#metodo' },
} as const;

export const SUSTAIN_CLOSE = {
  title: 'El conocimiento cobra sentido cuando transforma la realidad.',
  body: 'Explora los materiales, encuentra el punto de partida que necesita tu comunidad educativa y convierte el aprendizaje en una oportunidad para actuar.',
  materials: { label: 'Explorar materiales', href: '#tienda' },
  route: { label: 'Conocer la Ruta B', href: '#ruta-b' },
} as const;
