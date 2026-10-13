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
  /** Rol en una línea, para la barra de respaldo de la landing. */
  shortRole: string;
  category: 'founders' | 'historical';
  note?: string;
}

export const COMMITTEE_SECTION_DATA = {
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
    shortRole: 'Fundador',
    category: 'founders',
  },
  {
    name: 'Rocío Galvis Guerrero',
    role: 'Fundadora & Directora administrativa Institucional',
    bio: 'Administradora de Empresas con formación avanzada en Sostenibilidad, Calidad e Innovación Social. Parte fundamental del liderazgo de la fundación y referente en la articulación de proyectos de alto impacto humano, ambiental y formativo en comunidades educativas.',
    badge: 'Liderazgo Institucional',
    shortRole: 'Directora administrativa',
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
    shortRole: 'Ex-ministra de Educación de Costa Rica',
    category: 'historical',
    note: 'Reconocimiento a su contribución histórica (no forma parte directa del equipo activo actualmente).',
  },
  {
    name: 'Aurora Zegarra Huapaya',
    role: 'Ex-Directora de la Oficina de Defensa Nacional y Gestión del Riesgo de Desastres del Ministerio de Educación del Perú',
    bio: 'Maestra gerente y comunicadora de primer nivel en la gestión del riesgo de desastres a nivel internacional. Experta en desarrollo de estrategias y equipos humanos para la rehabilitación del servicio educativo en contextos de emergencias y desastres.',
    badge: 'Reconocimiento Histórico',
    shortRole: 'Ex-directora de Gestión del Riesgo, Ministerio de Educación del Perú',
    category: 'historical',
  },
];

/**
 * Identidad legal y respaldo histórico, para la cápsula de confianza de la
 * landing. Las instituciones son las que el Rally declara como apoyo histórico:
 * no se agregan nombres que no estén respaldados por la fundación.
 */
export const INSTITUTIONAL_IDENTITY = {
  legalName: 'Fundación Vive con Esperanza',
  nit: '900.250.330-2',
  scope:
    'Entidad sin ánimo de lucro para la Educación para el Desarrollo Sostenible (EDS) y la Gestión del Riesgo de Desastres (GRD) en las Américas.',
  historicalSupport: ['UNESCO', 'OEA', 'UNDRR', 'UNEP'],
} as const;
