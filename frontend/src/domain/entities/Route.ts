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

import { CANONICAL_CRISIS_TOOLS, type CrisisTool } from './CrisisTool';
import { KALEO_DATA } from './Kaleo';

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
    title: 'Colaboraciones',
    summary:
      'Comparte experiencia, ofrece tiempo profesional o explora una colaboración institucional.',
    primary: { label: 'Ver formas de colaborar', href: '#colaboraciones' },
  },
];

/**
 * La antigua sección 2, dentro de la sección 1. Kaleo ya no vive acá: es el
 * siguiente paso de la Ruta A. Colaboraciones queda para Banco Vivo y para el
 * puente hacia las alianzas institucionales.
 */
export const COLLABORATION = {
  id: 'colaboraciones',
  label: 'Colaboraciones',
  title: 'Una red para compartir lo que ayuda y encontrar apoyo cuando hace falta',
  summary:
    'Banco Vivo reúne experiencias escolares en emergencias y tiempo profesional voluntario para que otras escuelas puedan aprender y recibir acompañamiento.',
  contributeLabel: 'Quiero contribuir',
  gainsLabel: 'Beneficios para tu escuela',
  shareLabel: 'Compartir una experiencia o mi tiempo',
  legalLabel: 'Documento legal del testimonio',
  alliancesLabel: 'Explorar una colaboración institucional',
  contributeBody: {
    schools:
      'comparte una experiencia útil al enfrentar una emergencia escolar para que otras escuelas puedan aprender.',
    professionals: 'ofrece tiempo y conocimiento para acompañar a comunidades educativas.',
  },
} as const;

export const ROUTE_B = {
  id: 'ruta-b',
  label: 'Ruta B · Transformación continua',
  title: 'Convierte el aprendizaje en soluciones para tu territorio',
  summary:
    'Un proceso para que niñas, niños y jóvenes investiguen desafíos reales, diseñen soluciones y lideren proyectos que mejoren su escuela y su territorio.',
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
  galleryLabel: 'Herramientas de la Ruta A',
  openLabel: 'Abrir el PDF',
  downloadLabel: 'Descargar',
} as const;

/**
 * Una herramienta de la Ruta A con archivo publicado. `point` es la
 * orientación que resuelve: es el titular de su tarjeta en la galería.
 */
export type RouteResource = CrisisTool & { downloadUrl: string; point: string };

/**
 * Las cuatro orientaciones de la Ruta A, cada una con su PDF. Si un id deja de
 * existir o pierde su archivo, falla al cargar el módulo en vez de mostrar una
 * tarjeta vacía.
 */
const ROUTE_A_TOOLS = [
  { point: 'Orientaciones generales para identificar necesidades y riesgos', toolId: 'structural-evaluation' },
  { point: 'Recursos de orientación socioemocional', toolId: 'post-trauma-support' },
  { point: 'Materiales de prevención y preparación', toolId: 'violence-and-suicide-protocol' },
  { point: 'Recursos descargables para consulta', toolId: 'emergency-curricula' },
] as const;

export const ROUTE_A_RESOURCES: RouteResource[] = ROUTE_A_TOOLS.map(({ point, toolId }) => {
  const tool = CANONICAL_CRISIS_TOOLS.find((candidate) => candidate.id === toolId);
  if (!tool?.downloadUrl) throw new Error(`Ruta A: la herramienta «${toolId}» no tiene PDF publicado.`);
  return { ...tool, downloadUrl: tool.downloadUrl, point };
});

/**
 * Kaleo dentro de la Ruta A. A la vista queda lo que hace falta para actuar:
 * qué es, las dos puertas y el aviso de seguridad. El cómo funciona (premisa,
 * pilares) va plegado en `more`: es apoyo, no un paso.
 *
 * Cada idea se dice UNA vez: los datos de menores y los servicios oficiales
 * viven solo en `safety`; la cobertura, solo en `summary`.
 */
export const KALEO_STEP = {
  label: 'Siguiente paso recomendado',
  title: '¿Necesitas orientación para tu comunidad?',
  summary:
    'Describe la necesidad general de tu comunidad educativa y explora opciones de acompañamiento y conexiones con capacidades o recursos disponibles, según la cobertura y el contexto.',
  request: {
    label: 'Solicitar orientación y acompañamiento',
    href: 'https://kaleo-sage.vercel.app/inscripcion?via=ruta-a-emergencia',
    external: true,
  },
  platform: {
    label: 'Acceder a la plataforma Kaleo',
    href: KALEO_DATA.appUrl,
    external: true,
  },
  more: 'Cómo funciona Kaleo',
  safety:
    'Seguridad primero: no ingreses nombres ni datos sensibles de menores. Kaleo no es una línea de respuesta inmediata ni sustituye los servicios oficiales de emergencia, salud o protección. Ante peligro inmediato, contacta los servicios oficiales de tu territorio y sigue las instrucciones de las autoridades.',
} as const;
