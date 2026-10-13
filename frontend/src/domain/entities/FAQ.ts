/**
 * Preguntas frecuentes — las dudas que frenan el último paso.
 *
 * Van DESPUÉS del formulario y no antes porque responden a quien ya dudó: el
 * que no duda se registró arriba y no tiene por qué atravesar cinco
 * desplegables para llegar al botón.
 *
 * Cada respuesta dice lo que la fundación NO hace con la misma claridad que lo
 * que sí hace. Prometer de más a una escuela en emergencia no es un error de
 * copy: es dejarla esperando una ayuda que nadie va a mandar.
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_INTRO = {
  eyebrow: 'Antes de dar el siguiente paso',
  title: 'Preguntas frecuentes',
} as const;

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'por-donde-empezar',
    question: '¿Por dónde debe empezar una escuela?',
    answer:
      'Si busca un proceso educativo sostenido, comience por la Ruta B. Si enfrenta una emergencia, consulte la Ruta A, priorice la seguridad y siga las instrucciones de las autoridades competentes.',
  },
  {
    id: 'kaleo-emergencia',
    question: '¿Kaleo es un servicio de emergencia?',
    answer:
      'No. Kaleo facilita orientación y exploración de opciones de acompañamiento según el contexto y la cobertura. No garantiza disponibilidad ni sustituye los servicios oficiales de emergencia, salud o protección.',
  },
  {
    id: 'banco-vivo-dinero',
    question: '¿Banco Vivo recibe donaciones de dinero?',
    answer:
      'No. Banco Vivo es una red para compartir experiencias escolares y ofrecer tiempo o conocimiento profesional voluntario; no es un mecanismo de recaudo financiero.',
  },
  {
    id: 'tienda-financia',
    question: '¿Comprar en la tienda financia una actividad específica?',
    answer:
      'La tienda y las publicaciones aportan ingresos complementarios a la misión. El uso concreto de esos ingresos se comunica de forma transparente según la operación real; no se promete que una compra financie una actividad determinada si eso no está documentado.',
  },
  {
    id: 'mis-datos',
    question: '¿Qué pasa con mis datos y cómo me contacta el equipo?',
    answer:
      'El formulario de registro guarda solo los datos que completas y el equipo los usa únicamente para responderte sobre el interés que elegiste. Si el registro no se guarda, la página te lo dice: nunca muestra «recibido» sin que haya llegado.',
  },
];

/** Nota de protección de menores. No se pliega dentro de un desplegable: se lee siempre. */
export const CHILD_SAFETY_NOTE = {
  title: 'Protección de niñas, niños y adolescentes',
  body: 'No envíes nombres, fotografías, datos de salud, ubicación precisa ni otra información sensible de menores a través de los formularios. Ante peligro inmediato, contacta a los servicios oficiales de emergencia de tu territorio.',
} as const;
