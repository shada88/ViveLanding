/**
 * El registro único de la sección «¿Cómo puedo ser parte?».
 *
 * UN formulario, un selector de interés. Antes había cuatro formularios con
 * campos distintos y la persona tenía que adivinar cuál era el suyo antes de
 * poder escribir una sola letra; ahora elige qué quiere hacer y el mismo
 * formulario ajusta lo poco que cambia: el rótulo de la institución, qué campo
 * es obligatorio y la pregunta abierta del final.
 *
 * Lo que NO cambia entre intereses es el conjunto de campos. Eso es lo que
 * mantiene alineada la hoja de cálculo: una columna por campo, siempre la misma.
 *
 * `name` no es libre: tiene que coincidir con `src/lib/leadSchema.ts`.
 */
export type LeadInterest = 'ESCUELA' | 'DONANTE' | 'VOLUNTARIO' | 'ALIADO';

/** Campos aceptados por el endpoint de registro. */
export type LeadField =
  | 'fullName'
  | 'email'
  | 'phone'
  | 'organization'
  | 'profession'
  | 'country'
  | 'message';

/**
 * Identificadores heredados con los que otras secciones (el ecosistema, las
 * alianzas) piden abrir el formulario con un interés ya elegido.
 */
export type ParticipationRoleId = 'escuelas' | 'aliados' | 'voluntarios' | 'donantes';

export interface ParticipationField {
  name: LeadField;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  required?: boolean;
  placeholder?: string;
  /** Valor de `autocomplete`. Sin esto el navegador no puede autocompletar. */
  autoComplete?: string;
  /** Ocupa las dos columnas del formulario. */
  wide?: boolean;
}

export interface InterestOption {
  id: LeadInterest;
  roleId: ParticipationRoleId;
  icon: 'School' | 'Building2' | 'Users' | 'Heart';
  label: string;
  blurb: string;
  organization: { label: string; placeholder: string; required: boolean };
  profession: { label: string; placeholder: string; required: boolean };
  message: { label: string; placeholder: string };
  /** Qué pasa después de enviar. Concreto: nadie quiere "nos pondremos en contacto". */
  successNote: string;
  /**
   * Vía alternativa cuando existe un canal que RESUELVE la acción en el acto.
   * Hoy solo la tiene quien quiere donar: la pasarela de la fundación cobra
   * hoy; el formulario solo captura un correo para escribir después.
   */
  secondaryAction?: { label: string; url: string; note: string };
}

export const PARTICIPATE_INTRO = {
  eyebrow: '¿Cómo puedo ser parte?',
  title: 'Súmate a la red en un solo paso',
  lede: 'Escuela, organización aliada, profesional voluntario o donante: un mismo registro, un solo canal. Elige qué quieres hacer y completa lo mínimo; el resto lo conversamos por correo.',
} as const;

export const INTEREST_OPTIONS: InterestOption[] = [
  {
    id: 'ESCUELA',
    roleId: 'escuelas',
    icon: 'School',
    label: 'Mi escuela quiere participar',
    blurb: 'Ruta B, Rally Continental 2028 y herramientas para el aula.',
    organization: {
      label: 'Nombre de la escuela',
      placeholder: 'Colegio Interamericano San Martín',
      required: true,
    },
    profession: { label: 'Cargo', placeholder: 'Rectoría, coordinación, docente…', required: false },
    message: {
      label: '¿En qué desafío les gustaría trabajar?',
      placeholder: 'El problema del barrio que quieren convertir en proyecto escolar.',
    },
    successNote:
      'El equipo de enlace escolar revisa el registro y te escribe con los siguientes pasos de la Ruta B y del Rally.',
  },
  {
    id: 'ALIADO',
    roleId: 'aliados',
    icon: 'Building2',
    label: 'Mi organización quiere aliarse',
    blurb: 'Sector público, privado, universidades o cooperación internacional.',
    organization: {
      label: 'Organización o institución',
      placeholder: 'Nombre de la institución',
      required: true,
    },
    profession: { label: 'Cargo', placeholder: 'Dirección, alianzas, RSE…', required: false },
    message: {
      label: '¿Qué capacidad pone tu organización sobre la mesa?',
      placeholder: 'Investigación, financiación de proyectos, voluntariado corporativo, cooperación técnica…',
    },
    successNote:
      'La coordinación de alianzas responde con una propuesta de agenda para una primera reunión.',
  },
  {
    id: 'VOLUNTARIO',
    roleId: 'voluntarios',
    icon: 'Users',
    label: 'Quiero aportar mi tiempo',
    blurb: 'Profesionales y voluntarios para Banco Vivo y la red de Kaleo.',
    organization: {
      label: 'Organización (opcional)',
      placeholder: 'Si participas desde una institución',
      required: false,
    },
    profession: {
      label: 'Profesión u oficio',
      placeholder: 'Psicología, docencia, ingeniería, oficios…',
      required: true,
    },
    message: {
      label: '¿Cómo te gustaría colaborar?',
      placeholder: 'Disponibilidad, experiencia previa, tipo de acompañamiento.',
    },
    successNote:
      'Revisamos tu perfil y te contactamos para verificar credenciales antes de sumarte a la red.',
  },
  {
    id: 'DONANTE',
    roleId: 'donantes',
    icon: 'Heart',
    label: 'Quiero apoyar económicamente',
    blurb: 'Apadrinar una escuela o financiar materiales para el aula.',
    organization: {
      label: 'Empresa u organización (opcional)',
      placeholder: 'Si el aporte es institucional',
      required: false,
    },
    profession: { label: 'Cargo (opcional)', placeholder: '', required: false },
    message: {
      label: '¿Qué te gustaría apoyar?',
      placeholder: 'Apadrinar una escuela, impresión de libros, materiales de la Ruta B…',
    },
    successNote:
      'Te enviamos el detalle de los programas, el destino de cada aporte y las vías de pago disponibles.',
    secondaryAction: {
      label: 'Donar ahora',
      url: 'https://info.vivesperanza.org/donate/',
      note: '¿Prefieres donar directamente? La pasarela de la fundación está activa.',
    },
  },
];

export const DEFAULT_INTEREST: LeadInterest = 'ESCUELA';

/**
 * El conjunto de campos, igual para todos los intereses. Solo cambian rótulos
 * y obligatoriedad de `organization` y `profession`.
 */
export function fieldsFor(option: InterestOption): ParticipationField[] {
  return [
    {
      name: 'organization',
      label: option.organization.label,
      type: 'text',
      required: option.organization.required,
      placeholder: option.organization.placeholder,
      autoComplete: 'organization',
    },
    {
      name: 'fullName',
      label: 'Nombre completo',
      type: 'text',
      required: true,
      placeholder: 'Nombre y apellido',
      autoComplete: 'name',
    },
    {
      name: 'email',
      label: 'Correo electrónico',
      type: 'email',
      required: true,
      placeholder: 'nombre@correo.com',
      autoComplete: 'email',
    },
    {
      name: 'profession',
      label: option.profession.label,
      type: 'text',
      required: option.profession.required,
      placeholder: option.profession.placeholder,
      autoComplete: 'organization-title',
    },
    {
      name: 'country',
      label: 'País o territorio',
      type: 'text',
      placeholder: 'Costa Rica, Colombia, México…',
      autoComplete: 'country-name',
    },
    {
      name: 'phone',
      label: 'Teléfono o WhatsApp (opcional)',
      type: 'tel',
      placeholder: '+57 310 000 0000',
      autoComplete: 'tel',
    },
    {
      name: 'message',
      label: option.message.label,
      type: 'textarea',
      placeholder: option.message.placeholder,
      wide: true,
    },
  ];
}

export function interestFromRole(roleId: string): LeadInterest | null {
  return INTEREST_OPTIONS.find((option) => option.roleId === roleId)?.id ?? null;
}

/**
 * Enlace al formulario con un interés ya elegido, válido desde CUALQUIER
 * página. En la landing el formulario también escucha `vce:select-role`, que
 * evita recargar; desde `/sobre-nosotros` el evento no llega a nadie y el
 * parámetro de la URL es lo único que sobrevive a la navegación.
 */
export function participateHref(roleId: ParticipationRoleId): string {
  return `/?interes=${roleId}#participar`;
}

