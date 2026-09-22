export type ToolRoute = 'emergency' | 'process';
export type ToolTrafficLight = 'yes' | 'caution' | 'no';

/**
 * Metadatos de las dos rutas.
 *
 * El código —Ruta A / Ruta B— vive ACÁ y no en cada herramienta. Antes cada
 * una cargaba un rótulo propio que empezaba por «Ruta A —» o «Ruta B —», así
 * que al listar las cuatro de un camino el mismo código aparecía cuatro veces
 * seguidas: ruido puro, y cuatro lugares donde desincronizarlo.
 *
 * Los dos caminos son PARES: mismo peso, misma altura táctil. Se distinguen
 * por tono, nunca por tamaño.
 */
export interface CrisisRoute {
  id: ToolRoute;
  /** Código canónico del camino. */
  code: string;
  label: string;
  blurb: string;
  downloadUrl?: string;
  downloadLabel?: string;
}

export const CRISIS_ROUTES: CrisisRoute[] = [
  {
    id: 'emergency',
    code: 'Ruta A',
    label: 'Cuando ya pasó',
    blurb:
      'Materiales para las primeras horas y los primeros días. Se imprimen, se usan en el predio y no necesitan conexión.',
  },
  {
    id: 'process',
    code: 'Ruta B',
    label: 'Para construir',
    blurb:
      'Procesos sostenidos que convierten un problema del territorio en un proyecto escolar con resultado verificable.',
    downloadUrl: '/docs/herramientas/proceso-preparacion-educacion-sostenible.pdf',
    downloadLabel: 'Descargar proceso de preparación (PDF)',
  },
];

export interface CrisisTool {
  id: string;
  route: ToolRoute;
  title: string;
  subtitle: string;
  timeEstimate: string;
  targetAudience: string;
  description: string;
  format: string;
  downloadUrl?: string;
}

export const CANONICAL_CRISIS_TOOLS: CrisisTool[] = [
  {
    id: 'structural-evaluation',
    route: 'emergency',
    title: 'Evaluación de estructuras y riesgo',
    subtitle: '¿Se puede usar la escuela?',
    timeEstimate: '30–45 min en el predio',
    targetAudience: 'Directores y Docentes',
    description: 'Revisión rápida de aulas, agua, luz, baños, accesos y amenazas del entorno tras un sismo, inundación o emergencia.',
    format: 'Ficha imprimible de 2 páginas con semáforo (Sí / Cuidado / No)',
    downloadUrl: '/docs/herramientas/evaluacion-estructuras-riesgo.pdf',
  },
  {
    id: 'post-trauma-support',
    route: 'emergency',
    title: 'Apoyo socioemocional post-trauma',
    subtitle: 'Primer día de retorno escolar',
    timeEstimate: '10 min por rutina',
    targetAudience: 'Docentes y Orientadores',
    description: 'Guía práctica sobre qué decir, qué hacer en el aula y cuándo derivar a salud mental en los primeros días tras una crisis.',
    format: 'Rutinas pedagógicas de 10 minutos',
    downloadUrl: '/docs/herramientas/apoyo-socioemocional-post-trauma.pdf',
  },
  {
    id: 'violence-and-suicide-protocol',
    route: 'emergency',
    title: 'Violencia escolar y suicidio adolescente',
    subtitle: 'Protocolo de aviso temprano para las primeras horas',
    timeEstimate: 'Acción inmediata',
    targetAudience: 'Directivos, Docentes y Personal de Apoyo',
    description: 'Cómo detectar señales de alerta, a quién notificar en la red institucional y cómo registrar con estricto respeto y confidencialidad.',
    format: 'Cadena de aviso y registro en lenguaje escolar',
    downloadUrl: '/docs/herramientas/protocolo-violencia-suicidio-adolescente.pdf',
  },
  {
    id: 'emergency-curricula',
    route: 'emergency',
    title: 'Currículos de emergencia en desastres',
    subtitle: 'Aprender sin jornada normal ni internet',
    timeEstimate: '20–40 min por actividad',
    targetAudience: 'Docentes de todos los ciclos',
    description: 'Actividades modulares para continuar los procesos pedagógicos esenciales cuando no hay conectividad estable ni predio habilitado.',
    format: 'Cuadernillos descargables por ciclos y edades',
    downloadUrl: '/docs/herramientas/curriculos-emergencia-desastres.pdf',
  },
  {
    id: 'allies-network',
    route: 'process',
    title: 'Construir red de aliados en apoyo a proyectos',
    subtitle: 'Mesa intersectorial territorial',
    timeEstimate: 'Proceso continuo',
    targetAudience: 'Comunidades escolares y Rectores',
    description: 'Metodología para sentar a gobiernos locales, empresas, universidades, ONGs y escuelas con el fin de salir con acuerdos cortos y mapa de aliados.',
    format: 'Matriz de mapeo territorial y convenios',
  },
  {
    id: 'multidimensional-sustainability',
    route: 'process',
    title: 'Educación y Sostenibilidad Multidimensional',
    subtitle: 'Ambiente, personas y medios de vida',
    timeEstimate: 'Ciclo lectivo',
    targetAudience: 'Docentes de Ciencias y Proyectos',
    description: 'Enfoque integral que articula la biodiversidad y el cambio climático con la economía y el bienestar comunitario.',
    format: 'Guías de proyectos escolares integrados',
  },
  {
    id: 'local-innovation-entrepreneurship',
    route: 'process',
    title: 'Innovar y emprender en lo local',
    subtitle: 'Prototipos y oficios para problemas reales',
    timeEstimate: 'Proyectos semestrales',
    targetAudience: 'Estudiantes de secundaria y docentes',
    description: 'Desarrollo de soluciones tangibles y oficios digitales aplicados directamente a desafíos ambientales y sociales del territorio.',
    format: 'Metodología de prototipado rápido escolar',
  },
  {
    id: 'technology-heritage-alert',
    route: 'process',
    title: 'Tecnología y patrimonio ambiental',
    subtitle: 'Cartografía comunitaria y reporte ciudadano',
    timeEstimate: 'Mapeo participativo',
    targetAudience: 'Grupos juveniles y escuelas',
    description: 'Cartografía colaborativa para visibilizar la riqueza natural y alertar con seguridad sobre amenazas al patrimonio ecológico.',
    format: 'Ruta de monitoreo ciudadano y reporte seguro',
  }
];
