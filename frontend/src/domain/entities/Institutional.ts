export interface Leader {
  name: string;
  role: string;
  bio: string;
  badge: string;
}

export const CANONICAL_LEADERSHIP: Leader[] = [
  {
    name: 'Fernando García García',
    role: 'Miembro Fundador & Presidente del Comité Internacional',
    bio: 'Psicólogo con posgrados en Cooperación Internacional y Gestión de Proyectos de Desarrollo. Creador de la Colección Libritos de Esperanza y director del Rally Continental. Lidera alianzas estratégicas con la OEA, UNDRR, PNUMA y ministerios de educación en toda la región.',
    badge: 'Liderazgo & Cooperación'
  },
  {
    name: 'Rocío Galvis Guerrero',
    role: 'Miembro Fundadora & Ex-Directora Ejecutiva',
    bio: 'Administradora de Empresas con formación avanzada en Sostenibilidad y Responsabilidad Social. Narradora original de la saga de Esperanza y referente en la articulación de proyectos de impacto humano y ambiental.',
    badge: 'Gestión & Sostenibilidad'
  },
  {
    name: 'Sonia Mora Escalante',
    role: 'Líder del Comité Internacional & Ex-Ministra de Educación',
    bio: 'Ex-Ministra de Educación de Costa Rica. Ha liderado la vinculación intergubernamental del Comité del Premio Vive con Esperanza para empoderar a los planteles escolares como agentes de cambio continental.',
    badge: 'Comité Internacional'
  }
];

export const ORIGIN_SAGA = {
  title: 'El Origen: La Colección Libritos de Esperanza',
  lead: 'La fundación nació de una historia contada en familia que se transformó en un movimiento continental.',
  narrative: 'Esperanza es una paloma valiente cuyo bosque fue destruido por la acción humana. Separada de sus padres (Pepe y Maye), sus amigos aves —Ojopelao el colibrí, Saggy el azulejo, Silvio el búho, Lilo el perico, Carla la lora y Omar el canario— emprenden su búsqueda y descubren asombrados que Esperanza llegó a la ciudad y puede comunicarse con los seres humanos. A través de esa voz, enseña a los niños la sabiduría de la naturaleza, convirtiéndolos en líderes capaces de convivir en armonía, afrontar adversidades y reparar el daño ambiental.',
  birds: [
    { name: 'Esperanza', species: 'Paloma mensajera', role: 'Voz y liderazgo' },
    { name: 'Ojopelao', species: 'Colibrí', role: 'Agilidad y curiosidad' },
    { name: 'Silvio', species: 'Búho', role: 'Sabiduría y calma' },
    { name: 'Saggy', species: 'Azulejo', role: 'Lealtad y compañerismo' },
    { name: 'Lilo', species: 'Perico', role: 'Alegría y perseverancia' },
    { name: 'Carla', species: 'Lora', role: 'Comunicación y alerta' },
    { name: 'Omar', species: 'Canario', role: 'Música y esperanza' }
  ]
};
