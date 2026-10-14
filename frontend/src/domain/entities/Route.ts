/**
 * Sección 1, justo después del hero.
 *
 * Orienta y deja elegir. No cataloga servicios ni promete resultados.
 * Los textos de cara al visitante están fijados: la sección los presenta,
 * no los reescribe.
 *
 * `#ruta-b` y `#ruta-a` viven en esta misma sección. La tienda, las alianzas
 * y Kaleo conservan los destinos que ya tenía la página.
 */

export interface RouteAction {
  label: string;
  href: string;
  external?: boolean;
}

export type EntryPathId = 'process' | 'emergency' | 'alliance';

export interface EntryPath {
  id: EntryPathId;
  label: string;
  title: string;
  summary: string;
  primary: RouteAction;
}

export const ROUTES_INTRO = {
  eyebrow: 'Empieza por lo que tu escuela necesita',
  title: 'Una escuela que aprende, se prepara y transforma su territorio',
  lede: 'Hay dos formas de empezar. Construye capacidades a lo largo del año o consulta herramientas iniciales si tu escuela afronta una emergencia. Ambas rutas ponen en el centro el bienestar y el potencial de niñas, niños y jóvenes.',
  cue: '¿Buscas transformación educativa a largo plazo? Empieza por la Ruta B. ¿Hay una emergencia activa? Ve directamente a la Ruta A.',
} as const;

export const ENTRY_PATHS: EntryPath[] = [
  {
    id: 'process',
    label: 'Para transformar',
    title: 'Ruta B',
    summary:
      'Diseña un proceso educativo sostenido con proyectos liderados por niñas, niños y jóvenes.',
    primary: { label: 'Conocer la Ruta B', href: '#ruta-b' },
  },
  {
    id: 'emergency',
    label: 'Para una emergencia',
    title: 'Ruta A → Kaleo',
    summary:
      'Consulta orientaciones iniciales y solicita orientación según el contexto y la cobertura.',
    primary: { label: 'Ir a la Ruta A', href: '#ruta-a' },
  },
  {
    id: 'alliance',
    label: 'Para contribuir',
    title: 'Alianzas y Banco Vivo',
    summary:
      'Comparte experiencia, ofrece tiempo profesional o explora una colaboración institucional.',
    primary: { label: 'Ver formas de colaborar', href: '#alianzas' },
  },
];

export const ROUTE_B = {
  id: 'ruta-b',
  label: 'Ruta B · Transformación continua',
  title: 'Convierte el aprendizaje en soluciones para tu territorio',
  summary:
    'Un proceso para que niñas, niños y jóvenes investiguen desafíos reales, diseñen soluciones y lideren proyectos que mejoren su escuela y su territorio. La malla curricular conecta el aprendizaje con la resiliencia, la innovación y la acción local.',
  points: [
    'Aprendizaje conectado con desafíos reales del territorio.',
    'Liderazgo juvenil, investigación y creación de soluciones.',
    'Resiliencia, acción ambiental y colaboración local.',
    'Malla curricular y recursos para llevar las ideas al aula.',
    'Una ruta para docentes, directivos y aliados que buscan continuidad.',
  ],
} as const;

/** Lectura visual del párrafo de la práctica. No son fases oficiales del programa. */
export const PRACTICE = {
  label: 'De la propuesta a la práctica',
  title: 'Lleva la propuesta del programa al aula',
  summary:
    'Sigue una secuencia clara: conoce la propuesta curricular, identifica el desafío de tu escuela y elige materiales que puedan enriquecer la experiencia de aula. La tienda ofrece recursos complementarios; no reemplaza el acompañamiento ni el proceso pedagógico de la Ruta B.',
  steps: [
    'Conocer la propuesta curricular',
    'Identificar un desafío de la escuela',
    'Explorar materiales complementarios',
    'Llevar ideas a la experiencia de aula',
  ],
  primary: { label: 'Explorar materiales curriculares', href: '#tienda' },
  program: {
    label: 'Consultar el programa para la malla curricular (PDF)',
    href: '/docs/herramientas/proceso-preparacion-educacion-sostenible.pdf',
  },
  note: 'Para escuelas, docentes y aliados que quieren desarrollar un proceso sostenido.',
} as const;

export const ROUTE_A = {
  id: 'ruta-a',
  label: 'Ruta A · Emergencia activa',
  title: 'Herramientas para actuar ante una emergencia escolar',
  summary:
    'Si tu comunidad educativa enfrenta una emergencia, empieza por los recursos de orientación disponibles. Prioriza la vida, sigue las indicaciones de las autoridades y activa los servicios oficiales cuando corresponda.',
  points: [
    'Orientaciones generales para identificar necesidades y riesgos.',
    'Recursos de orientación socioemocional.',
    'Materiales de prevención y preparación.',
    'Recursos descargables para consulta.',
  ],
} as const;

export const KALEO_STEP = {
  label: 'Siguiente paso recomendado',
  title: '¿Necesitas orientación para tu comunidad?',
  summary:
    'Kaleo es el siguiente paso de orientación, no una línea de respuesta inmediata. Describe la necesidad general de tu comunidad educativa para explorar opciones de acompañamiento y posibles conexiones con capacidades o recursos disponibles, según la cobertura y el contexto. No incluyas nombres ni datos sensibles de menores.',
  primary: {
    label: 'Solicitar orientación en Kaleo',
    href: 'https://kaleo-sage.vercel.app/inscripcion?via=ruta-a-emergencia',
    external: true,
  },
  flow: 'Ruta A: identificar la necesidad · Kaleo: solicitar orientación',
  safety:
    'Seguridad primero: esta ruta no es un servicio de respuesta inmediata y no garantiza disponibilidad de apoyo. No ingreses datos sensibles de menores. Ante peligro inmediato, contacta los servicios oficiales de emergencia y sigue las instrucciones de las autoridades; estos recursos no sustituyen la evaluación de profesionales competentes.',
  secondary: { label: 'Conocer cómo funciona Kaleo', href: '#kaleo' },
} as const;
