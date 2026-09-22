/**
 * Formas de participar y los datos que pide cada una.
 *
 * Los cuatro roles NO comparten formulario: a una escuela hay que preguntarle
 * el plantel y el país; a un profesional, su oficio; a una empresa, qué alianza
 * propone. Un único formulario genérico obliga a todos a completar campos que
 * no les corresponden, y eso es exactamente lo que hace que una persona
 * abandone a mitad de camino.
 *
 * Pero tampoco son cuatro formularios escritos a mano: son un ESQUEMA de
 * campos. Cuatro copias del mismo JSX se desincronizan en la primera
 * corrección —validación arreglada en tres de cuatro, un `autoComplete` que
 * falta en uno— y nadie lo nota hasta que alguien se queja.
 *
 * `name` no es libre: tiene que coincidir con el contrato de `/api/leads`.
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

export interface ParticipationRole {
  id: string;
  icon: 'School' | 'Heart' | 'Users' | 'Building2';
  /** Rótulo en el catálogo. */
  title: string;
  blurb: string;
  /** Encabezado del formulario, una vez elegido el rol. */
  formTitle: string;
  formLede: string;
  interestType: LeadInterest;
  fields: ParticipationField[];
  /** Qué pasa después de enviar. Concreto: nadie quiere "nos pondremos en contacto". */
  successNote: string;
  /**
   * Vía alternativa, cuando además del registro existe un canal que RESUELVE
   * la acción en el acto.
   *
   * Hoy solo la tiene el rol de donantes, y por un motivo concreto: la página
   * de donaciones de la fundación está activa y tiene pasarela de pago. Un
   * formulario captura un correo para escribir después; esa página cobra hoy.
   * Quitarla del todo cambiaría una donación efectiva por un contacto tibio.
   */
  secondaryAction?: { label: string; url: string; note: string };
}

/** Campos que se repiten con el mismo rótulo en varios roles. */
const EMAIL: ParticipationField = {
  name: 'email',
  label: 'Correo electrónico',
  type: 'email',
  required: true,
  placeholder: 'nombre@correo.com',
  autoComplete: 'email',
};

const COUNTRY: ParticipationField = {
  name: 'country',
  label: 'País o territorio',
  type: 'text',
  placeholder: 'Costa Rica, Colombia, México…',
  autoComplete: 'country-name',
};

export const PARTICIPATION_ROLES: ParticipationRole[] = [
  {
    id: 'escuelas',
    icon: 'School',
    title: 'Escuelas',
    blurb:
      'Preinscribe tu institución al Rally Continental 2028 y accede a las herramientas y al acompañamiento.',
    formTitle: 'Preinscripción al Rally Continental 2028',
    formLede: 'Cuatro datos y una idea. El resto lo resolvemos por correo, sin trámites.',
    interestType: 'ESCUELA',
    successNote:
      'El equipo de enlace escolar revisa la postulación y envía el kit digital de preparación.',
    fields: [
      {
        name: 'organization',
        label: 'Nombre del plantel o escuela',
        type: 'text',
        required: true,
        placeholder: 'Colegio Interamericano San Martín',
        autoComplete: 'organization',
      },
      {
        name: 'fullName',
        label: 'Rector, rectora o coordinación',
        type: 'text',
        required: true,
        placeholder: 'Nombre completo',
        autoComplete: 'name',
      },
      { ...EMAIL, label: 'Correo institucional', placeholder: 'contacto@escuela.edu' },
      COUNTRY,
      {
        name: 'message',
        label: '¿En qué desafío les gustaría trabajar?',
        type: 'textarea',
        placeholder: 'El problema del barrio que quieren convertir en proyecto escolar.',
        wide: true,
      },
    ],
  },
  {
    id: 'donantes',
    icon: 'Heart',
    title: 'Donantes',
    blurb:
      'Apadrina una escuela o financia los kits de emergencia que salen el mismo día de la crisis.',
    formTitle: 'Quiero apoyar económicamente',
    formLede:
      'Cuéntanos qué te gustaría financiar y te enviamos el detalle de a dónde va cada aporte.',
    interestType: 'DONANTE',
    successNote:
      'Te enviamos el detalle de los programas, el destino de cada aporte y las vías de pago disponibles.',
    secondaryAction: {
      label: 'Donar ahora',
      url: 'https://vivesperanza.org/donate/',
      note: '¿Prefieres donar directamente? La pasarela de la fundación está activa.',
    },
    fields: [
      {
        name: 'fullName',
        label: 'Nombre completo',
        type: 'text',
        required: true,
        placeholder: 'Nombre y apellido',
        autoComplete: 'name',
      },
      EMAIL,
      {
        name: 'phone',
        label: 'Teléfono o WhatsApp',
        type: 'tel',
        placeholder: '+57 310 000 0000',
        autoComplete: 'tel',
      },
      {
        name: 'organization',
        label: 'Empresa u organización',
        type: 'text',
        placeholder: 'Si el aporte es institucional',
        autoComplete: 'organization',
      },
      {
        name: 'message',
        label: '¿Qué te gustaría apoyar?',
        type: 'textarea',
        placeholder: 'Apadrinar una escuela, kits de emergencia, impresión de libros…',
        wide: true,
      },
    ],
  },
  {
    id: 'voluntarios',
    icon: 'Users',
    title: 'Profesionales y voluntarios',
    blurb:
      'Psicólogos, educadores y otros oficios: suma tus capacidades a la red que coordina Kaleo.',
    formTitle: 'Sumarme a la red',
    formLede:
      'La red se activa cuando una escuela abre un caso. Necesitamos saber qué sabes hacer y desde dónde.',
    interestType: 'VOLUNTARIO',
    successNote:
      'Revisamos tu perfil y te contactamos para verificar credenciales antes de sumarte a la red.',
    fields: [
      {
        name: 'fullName',
        label: 'Nombre completo',
        type: 'text',
        required: true,
        placeholder: 'Nombre y apellido',
        autoComplete: 'name',
      },
      EMAIL,
      {
        name: 'profession',
        label: 'Profesión u oficio',
        type: 'text',
        required: true,
        placeholder: 'Psicología, docencia, ingeniería, oficios…',
        autoComplete: 'organization-title',
      },
      COUNTRY,
      {
        name: 'message',
        label: '¿Cómo te gustaría colaborar?',
        type: 'textarea',
        placeholder: 'Disponibilidad, experiencia previa, tipo de acompañamiento.',
        wide: true,
      },
    ],
  },
  {
    id: 'aliados',
    icon: 'Building2',
    title: 'Universidades y aliados',
    blurb:
      'Articulación con gobiernos, empresas y universidades, y presencia en los espacios de la OEA.',
    formTitle: 'Proponer una alianza',
    formLede:
      'Las alianzas se arman sobre algo concreto. Cuéntanos qué capacidad pone tu institución sobre la mesa.',
    interestType: 'ALIADO',
    successNote:
      'La coordinación de alianzas responde con una propuesta de agenda para una primera reunión.',
    fields: [
      {
        name: 'organization',
        label: 'Universidad u organización',
        type: 'text',
        required: true,
        placeholder: 'Nombre de la institución',
        autoComplete: 'organization',
      },
      {
        name: 'fullName',
        label: 'Persona de contacto',
        type: 'text',
        required: true,
        placeholder: 'Nombre completo',
        autoComplete: 'name',
      },
      { ...EMAIL, label: 'Correo institucional' },
      COUNTRY,
      {
        name: 'message',
        label: '¿Qué alianza proponen?',
        type: 'textarea',
        placeholder: 'Investigación, pasantías, financiamiento, infraestructura…',
        wide: true,
      },
    ],
  },
];
