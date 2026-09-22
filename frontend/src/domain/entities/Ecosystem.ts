/**
 * El ecosistema como RED, que es el concepto visual transversal de la landing.
 *
 * Las coordenadas `x` / `y` son porcentajes del contenedor. La capa SVG de
 * conexiones usa el mismo sistema (viewBox 0 0 100 100 con
 * `preserveAspectRatio="none"`), así los trazos y las piezas HTML coinciden
 * a cualquier ancho sin recalcular nada.
 *
 * El orden del arreglo ES la narrativa: personas → escuelas → conocimiento →
 * territorio → oportunidades → desarrollo → esperanza. En móvil el radial
 * colapsa a una columna y ese orden es lo único que queda legible, así que no
 * se reordena por conveniencia visual.
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
}

/** Centro de la composición radial. */
export const ECOSYSTEM_HUB = { x: 50, y: 50 } as const;

export const ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: 'personas',
    label: 'Personas',
    detail: 'Niñas, niños y familias que sostienen la vida de un territorio.',
    icon: 'Users',
    x: 50,
    y: 8,
  },
  {
    id: 'escuelas',
    label: 'Escuelas',
    detail: 'El único equipamiento público que ya está en casi todos los barrios.',
    icon: 'School',
    x: 79,
    y: 21,
  },
  {
    id: 'docentes',
    label: 'Docentes',
    detail: 'Quienes conocen el contexto real y deciden en los primeros minutos.',
    icon: 'GraduationCap',
    x: 92,
    y: 50,
  },
  {
    id: 'conocimiento',
    label: 'Conocimiento',
    detail: 'Protocolos, fichas y métodos que dejan de depender de una sola persona.',
    icon: 'BookOpen',
    x: 79,
    y: 79,
  },
  {
    id: 'territorio',
    label: 'Territorio',
    detail: 'El barrio, el río, el bosque: el aula extendida donde se prueba todo.',
    icon: 'MapPin',
    x: 50,
    y: 92,
  },
  {
    id: 'oportunidades',
    label: 'Oportunidades',
    detail: 'Oficios, prototipos y proyectos que nacen de un problema local.',
    icon: 'Sprout',
    x: 21,
    y: 79,
  },
  {
    id: 'instituciones',
    label: 'Instituciones',
    detail: 'Gobiernos, universidades y empresas sentados en la misma mesa.',
    icon: 'Building2',
    x: 8,
    y: 50,
  },
  {
    id: 'esperanza',
    label: 'Esperanza',
    detail: 'No un discurso: el resultado medible de que lo anterior funcione.',
    icon: 'Sun',
    x: 21,
    y: 21,
  },
];
