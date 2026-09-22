/**
 * Programas del ecosistema Vive con Esperanza.
 *
 * Reemplaza al antiguo `Project.ts`. El término del dominio es PROGRAMA:
 * una línea de trabajo sostenida con metodología propia, no un proyecto con
 * fecha de cierre.
 *
 * Forest Lovers, ViveImpact y ACT fueron retirados del ecosistema y no deben
 * reaparecer en textos, arreglos, navegación ni contenido oculto.
 *
 * Nota de nomenclatura, dos veces corregida:
 *
 * 1. Se escribe CORDÓN, nunca «hilo». Un hilo se corta; un cordón sostiene.
 * 2. **«Cocoperro y El Cordón Amarillo» es UN LIBRO**, con un solo título. No
 *    son dos programas, y El Cordón Amarillo no es un símbolo del ecosistema
 *    ni un recurso transversal: es parte del relato de ese libro. Si vuelve a
 *    aparecer partido en dos entradas, está mal.
 */
export type ProgramCategory = 'tecnologia' | 'territorio' | 'infancia';

export interface Program {
  id: string;
  title: string;
  tagline: string;
  category: ProgramCategory;
  /** Rótulo corto para listas y navegación. */
  shortLabel: string;
  description: string;
  highlights: string[];
  externalUrl?: string;
  badge: string;
  /** Tono visual del programa dentro de la sección. */
  tone: 'blue' | 'gold';
}

export const CANONICAL_PROGRAMS: Program[] = [
  {
    id: 'kaleo',
    title: 'Kaleo',
    shortLabel: 'Kaleo',
    tagline: 'El orquestador que hace que la ayuda llegue',
    category: 'tecnologia',
    description:
      'Plataforma propia que conecta a quien necesita acompañamiento con psicólogos, docentes, voluntarios y organizaciones. Las escuelas gestionan sus incidentes en tres fases: prevenir, actuar y recuperar.',
    highlights: [
      'Del griego καλέω (kaléō): una llamada al encuentro',
      'No da la ayuda: coordina para que llegue, con seguimiento de punta a punta',
      'El criterio y el vínculo siguen siendo humanos, siempre',
    ],
    externalUrl: 'https://kaleo-sage.vercel.app/',
    badge: 'Herramienta central',
    tone: 'blue',
  },
  {
    id: 'rally-continental-2028',
    title: 'Rally Continental 2028',
    shortLabel: 'Rally 2028',
    tagline: 'Innovación para los territorios, escuela por escuela',
    category: 'territorio',
    description:
      'La convocatoria insignia de la fundación. Moviliza escuelas públicas y privadas de las Américas para convertir el aula en un laboratorio de desarrollo sostenible y gestión del riesgo, con el problema real del barrio como punto de partida.',
    highlights: [
      'Fotografía ambiental, arte digital, cortometrajes y proyectos en territorio',
      'Articulación con ministerios de educación, la OEA y comités de expertos',
      'Abierta a todo plantel del continente, sin importar su presupuesto',
    ],
    badge: 'Movimiento continental',
    tone: 'blue',
  },
  {
    id: 'cocoperro-cordon-amarillo',
    title: 'Cocoperro y El Cordón Amarillo',
    shortLabel: 'Cocoperro y El Cordón Amarillo',
    tagline: 'El libro que ayuda a nombrar el dolor sin vergüenza',
    category: 'infancia',
    description:
      'Cocoperro es un perro sensible y valiente, y su historia acompaña a niños, docentes y familias a poner en palabras el duelo, el miedo y la pérdida. Trabaja con arte, relatos y canciones, en un lenguaje que la infancia entiende sin necesidad de traducción.',
    highlights: [
      'Cuento ilustrado con guía docente para llevarlo al aula',
      'Educación socioemocional aplicada: duelo, miedo y pérdida',
      'Puente de diálogo entre generaciones que no sabían cómo empezar',
    ],
    externalUrl: 'https://www.amazon.com/dp/B0FFBGQ9FF#detailBullets_feature_div',
    badge: 'Libro ilustrado',
    tone: 'gold',
  },
];
