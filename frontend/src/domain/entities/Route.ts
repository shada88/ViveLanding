import type { ToolRoute } from './CrisisTool';
import { KALEO_DATA } from './Kaleo';

/**
 * Las dos puertas de entrada de la landing.
 *
 * Es la primera decisión que se le pide a la persona y por eso la única que
 * vale la pena hacer explícita: ¿busca un proceso para todo el año o atraviesa
 * una emergencia ahora? Todo lo demás se ordena detrás de esa respuesta.
 *
 * Las dos rutas son PARES. Mismo tamaño, misma altura táctil; se distinguen por
 * tono, nunca por peso. La Ruta B va primero porque es la vía programática
 * prioritaria, no porque la emergencia valga menos.
 *
 * El `id` reutiliza `ToolRoute` a propósito: el enlace de cada tarjeta abre el
 * desplegable homónimo de la sección Herramientas (`#ruta-process`,
 * `#ruta-emergency`). Si los ids divergieran, el enlace caería en el vacío sin
 * ningún error.
 */
export interface RouteAction {
  label: string;
  href: string;
  external?: boolean;
}

export interface SchoolRoute {
  id: ToolRoute;
  code: 'Ruta A' | 'Ruta B';
  /** Para quién es, dicho en tres palabras. */
  kicker: string;
  title: string;
  summary: string;
  /** Lo que la persona se lleva. Concreto, no aspiracional. */
  highlights: string[];
  primary: RouteAction;
  secondary: RouteAction;
  /** Solo la Ruta A: el límite de lo que la landing puede prometer en una emergencia. */
  safetyNote?: string;
}

export const ROUTES_INTRO = {
  eyebrow: 'Elige tu ruta',
  title: 'Empieza por lo que tu escuela necesita hoy',
  lede: 'Hay dos formas de empezar. Construye capacidades a lo largo del año o consulta herramientas iniciales si tu escuela afronta una emergencia. Ambas ponen en el centro el bienestar y el potencial de niñas, niños y jóvenes.',
} as const;

export const SCHOOL_ROUTES: SchoolRoute[] = [
  {
    id: 'process',
    code: 'Ruta B',
    kicker: 'Para transformar',
    title: 'Transformación escolar continua',
    summary:
      'Un proceso para que niñas, niños y jóvenes investiguen desafíos reales, diseñen soluciones y lideren proyectos que mejoren su escuela y su territorio.',
    highlights: [
      'Aprendizaje conectado con desafíos reales del territorio',
      'Liderazgo juvenil, investigación y creación de soluciones',
      'Malla curricular y recursos para llevar las ideas al aula',
    ],
    primary: { label: 'Explorar la Ruta B', href: '#ruta-process' },
    secondary: { label: 'Conversar sobre la Ruta B', href: '#participar' },
  },
  {
    id: 'emergency',
    code: 'Ruta A',
    kicker: 'Para una emergencia',
    title: 'Orientación ante emergencias',
    summary:
      'Si tu comunidad educativa enfrenta una emergencia, empieza por los recursos de orientación disponibles y da el siguiente paso con Kaleo.',
    highlights: [
      'Orientaciones para identificar necesidades y riesgos',
      'Recursos de apoyo socioemocional',
      'Instrumentos descargables que funcionan sin conexión',
    ],
    primary: { label: 'Ir a la Ruta A', href: '#ruta-emergency' },
    secondary: {
      label: 'Solicitar orientación en Kaleo',
      href: KALEO_DATA.paths.needHelp.url,
      external: true,
    },
    safetyNote:
      'No es un servicio de respuesta inmediata. Ante peligro inmediato, contacta a los servicios oficiales de emergencia y sigue las indicaciones de las autoridades.',
  },
];

/** Tercera puerta, deliberadamente menor: quien viene a aportar, no a pedir. */
export const CONTRIBUTE_LINK = {
  lead: '¿Vienes a contribuir?',
  label: 'Conoce las alianzas y Banco Vivo',
  href: '#alianzas',
} as const;
