/**
 * Comité, Liderazgo y Reconocimiento Histórico — Fundación Vive con Esperanza
 *
 * Estructura de gobernanza y trayectoria:
 * 1. Destacados y Liderazgo: Fernando Rafael García García (Fundador) y Rocío Galvis Guerrero (Fundadora y directora administrativa).
 * 2. Personas Emblemáticas / Reconocimiento Histórico: Sonia Mora y Aurora Zegarra Huapaya.
 *
 * "Libritos de Esperanza" se desvincula por completo de esta área y vive en la Tienda & Publicaciones.
 */

export interface Leader {
  name: string;
  role: string;
  bio: string;
  badge: string;
  category: 'founders' | 'historical';
  note?: string;
}

export const COMMITTEE_SECTION_DATA = {
  step: '10',
  eyebrow: 'Gobernanza Institucional',
  title: 'Comité y Liderazgo de la Fundación',
  lede: 'Las personas que concibieron la misión y las figuras emblemáticas que han marcado nuestra historia continental.',
};

/** Destacados y Liderazgo */
export const FOUNDERS_LEADERSHIP: Leader[] = [
  {
    name: 'Fernando Rafael García García',
    role: 'Fundador de la Fundación Vive con Esperanza',
    bio: 'Psicólogo, escritor, cooperante internacional y gestor de proyectos de desarrollo, es gerente de organizaciones internacionales y Sostenibilidad. Visionario de la resiliencia escolar, ha liderado alianzas con autoridades en educación y medio ambiente en toda la región.',
    badge: 'Fundador',
    category: 'founders',
  },
  {
    name: 'Rocío Galvis Guerrero',
    role: 'Fundadora & Directora administrativa Institucional',
    bio: 'Administradora de Empresas con formación avanzada en Sostenibilidad, Calidad e Innovación Social. Parte fundamental del liderazgo de la fundación y referente en la articulación de proyectos de alto impacto humano, ambiental y formativo en comunidades educativas.',
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
  {
    name: 'Aurora Zegarra Huapaya',
    role: 'Ex-Directora de la Oficina de Defensa Nacional y Gestión del Riesgo de Desastres del Ministerio de Educación del Perú',
    bio: 'Maestra gerente y comunicadora de primer nivel en la gestión del riesgo de desastres a nivel internacional. Experta en desarrollo de estrategias y equipos humanos para la rehabilitación del servicio educativo en contextos de emergencias y desastres.',
    badge: 'Reconocimiento Histórico',
    category: 'historical',
  },
];
