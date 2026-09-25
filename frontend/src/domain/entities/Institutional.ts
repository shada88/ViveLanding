/**
 * Comité, Liderazgo y Reconocimiento Histórico — Fundación Vive con Esperanza
 *
 * Estructura de gobernanza y trayectoria:
 * 1. Destacados y Liderazgo: Fernando Galvis (Fundador) y Rocío Galvis Guerrero (Esposa del fundador y parte del liderazgo).
 * 2. Personas Emblemáticas / Reconocimiento Histórico: Sonia Mora (Trayectoria e impacto histórico, no forma parte directa actualmente).
 * 3. Integrantes Actuales: Equipo y comité activo en territorio.
 *
 * "Libritos de Esperanza" se desvincula por completo de esta área y vive en la Tienda & Publicaciones.
 */

export interface Leader {
  name: string;
  role: string;
  bio: string;
  badge: string;
  category: 'founders' | 'historical' | 'active';
  note?: string;
}

export const COMMITTEE_SECTION_DATA = {
  step: '09',
  eyebrow: 'Gobernanza Institucional',
  title: 'Comité y Liderazgo de la Fundación',
  lede: 'Las personas que concibieron la misión, las figuras emblemáticas que han marcado nuestra historia continental y el equipo que hoy impulsa el trabajo en cada territorio.',
};

/** Destacados y Liderazgo */
export const FOUNDERS_LEADERSHIP: Leader[] = [
  {
    name: 'Fernando Galvis',
    role: 'Fundador de la Fundación Vive con Esperanza',
    bio: 'Psicólogo con posgrados en Cooperación Internacional y Gestión de Proyectos de Desarrollo. Visionario de la resiliencia escolar y director del Rally Continental. Ha liderado alianzas estratégicas con la OEA, UNDRR, PNUMA y ministerios de educación en toda la región para transformar las aulas en motores de desarrollo local.',
    badge: 'Fundador',
    category: 'founders',
  },
  {
    name: 'Rocío Galvis Guerrero',
    role: 'Esposa del Fundador & Liderazgo Institucional',
    bio: 'Administradora de Empresas con formación avanzada en Sostenibilidad y Responsabilidad Social. Parte fundamental del liderazgo de la fundación y referente en la articulación de proyectos de alto impacto humano, ambiental y formativo en comunidades educativas.',
    badge: 'Liderazgo Institucional',
    category: 'founders',
  },
];

/** Personas Emblemáticas / Reconocimiento Histórico */
export const HISTORICAL_RECOGNITION: Leader[] = [
  {
    name: 'Sonia Mora Escalante',
    role: 'Ex-Ministra de Educación de Costa Rica',
    bio: 'Destacada por su trayectoria e invaluable impacto histórico dentro de las actividades y el posicionamiento continental de la fundación. Lideró la vinculación intergubernamental del Comité del Premio Vive con Esperanza para empoderar a los planteles escolares de las Américas.',
    badge: 'Reconocimiento Histórico',
    category: 'historical',
    note: 'Reconocimiento a su contribución histórica (no forma parte directa del equipo activo actualmente).',
  },
];

/** Integrantes Actuales: Equipo y Comité Activo */
export const ACTIVE_COMMITTEE: Leader[] = [
  {
    name: 'Coordinación Territorial & Enlace Escolar',
    role: 'Gestión en Terreno y Red de Escuelas',
    bio: 'Acompañamiento directo a directivos y docentes en la adopción de herramientas de crisis y proyectos de sostenibilidad local.',
    badge: 'Comité Activo',
    category: 'active',
  },
  {
    name: 'Comité de Tecnología & Plataforma Kaleo',
    role: 'Sistemas y Coordinación Humanitaria',
    bio: 'Despliegue, soporte continuo y optimización operativa de la red de respuesta y resiliencia escolar Kaleo.',
    badge: 'Comité Activo',
    category: 'active',
  },
  {
    name: 'Comité Pedagógico Rally Continental',
    role: 'Educación para el Desarrollo Sostenible (EDS) y GRD',
    bio: 'Diseño de rúbricas, desafíos ambientales de Las Voces del Bosque y evaluación de iniciativas estudiantiles a nivel continental.',
    badge: 'Comité Activo',
    category: 'active',
  },
];
