/**
 * El ecosistema como RED, que es el concepto visual transversal de la landing.
 *
 * Las coordenadas `x` / `y` son porcentajes del contenedor. La capa SVG de
 * conexiones usa el mismo sistema (viewBox 0 0 100 100 con
 * `preserveAspectRatio="none"`), así los trazos y las piezas HTML coinciden
 * a cualquier ancho sin recalcular nada.
 *
 * El orden del arreglo ES la narrativa: personas → escuelas → conocimiento →
 * territorio → oportunidades → desarrollo → esperanza.
 */
export type EcosystemIcon =
  | 'Users'
  | 'School'
  | 'GraduationCap'
  | 'BookOpen'
  | 'MapPin'
  | 'Sprout'
  | 'Building2'
  | 'Sun';

export interface EcosystemNode {
  id: string;
  label: string;
  detail: string;
  icon: EcosystemIcon;
  x: number;
  y: number;
  /** Rol de participación vinculado en el formulario para conversión directa */
  roleId: 'escuelas' | 'aliados' | 'voluntarios' | 'donantes';
  actionLabel: string;
}

/** Centro de la composición radial. */
export const ECOSYSTEM_HUB = { x: 50, y: 50 } as const;

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'personas',
    label: 'Comunidad y Voluntarios',
    detail: 'Familias, voluntarios y jóvenes que se movilizan con su tiempo y talento por el territorio.',
    icon: 'Users',
    roleId: 'voluntarios',
    actionLabel: 'Quiero ser voluntario',
    x: 50,
    y: 8,
  },
  {
    id: 'escuelas',
    label: 'Escuelas',
    detail: 'El equipamiento público y corazón comunitario donde se activa el cambio local.',
    icon: 'School',
    roleId: 'escuelas',
    actionLabel: 'Inscribir mi escuela',
    x: 79,
    y: 21,
  },
  {
    id: 'docentes',
    label: 'Docentes',
    detail: 'Líderes pedagógicos que transforman las aulas y actúan en los primeros minutos de emergencia.',
    icon: 'GraduationCap',
    roleId: 'escuelas',
    actionLabel: 'Sumar mi institución',
    x: 92,
    y: 50,
  },
  {
    id: 'conocimiento',
    label: 'Conocimiento',
    detail: 'Protocolos de riesgo y guías de emergencia probados que se comparten en red.',
    icon: 'BookOpen',
    roleId: 'escuelas',
    actionLabel: 'Herramientas para escuelas',
    x: 79,
    y: 79,
  },
  {
    id: 'territorio',
    label: 'Territorio',
    detail: 'El barrio, el río y la comunidad: el aula viva donde se construyen soluciones reales.',
    icon: 'MapPin',
    roleId: 'voluntarios',
    actionLabel: 'Sumarme en territorio',
    x: 50,
    y: 92,
  },
  {
    id: 'oportunidades',
    label: 'Oportunidades',
    detail: 'Proyectos de desarrollo sostenible, arte ambiental y medios de vida juveniles.',
    icon: 'Sprout',
    roleId: 'aliados',
    actionLabel: 'Impulsar proyectos',
    x: 21,
    y: 79,
  },
  {
    id: 'instituciones',
    label: 'Aliados y Empresas',
    detail: 'Organizaciones públicas, privadas y cooperación internacional que impulsan capacidades.',
    icon: 'Building2',
    roleId: 'aliados',
    actionLabel: 'Sumar mi organización',
    x: 8,
    y: 50,
  },
  {
    id: 'esperanza',
    label: 'Impacto y Donaciones',
    detail: 'El resultado medible: escuelas preparadas, comunidades seguras y desarrollo local.',
    icon: 'Sun',
    roleId: 'donantes',
    actionLabel: 'Donar a la red',
    x: 21,
    y: 21,
  },
];
