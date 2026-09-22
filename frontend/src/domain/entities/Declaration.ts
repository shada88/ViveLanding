/**
 * La Declaración Vive con Esperanza.
 *
 * Fuente del texto: https://vivesperanza.org/sign/ — el original está en
 * inglés y esto es su traducción al español. Esa URL NO se exporta: es la
 * procedencia del texto, no un destino al que mandar a nadie. La firma se
 * recoge en `DECLARATION_SIGN_URL`.
 *
 * TEXTO INSTITUCIONAL: no se edita, no se resume y no se "mejora". La
 * traducción sigue al original artículo por artículo y frase por frase; si el
 * original cambia, se vuelve a traducir entero, no se parchea un párrafo. Lo
 * único que aporta el diseño es jerarquía y aire — la palabra es de la
 * fundación, no de la landing.
 */
export interface DeclarationArticle {
  /** Número del artículo en el documento original. */
  number: number;
  title: string;
  body: string;
}

export const DECLARATION_TITLE = 'La Declaración Vive con Esperanza';

/**
 * Petición pública donde se firma la Declaración.
 *
 * Es change.org, NO la página de la fundación: `vivesperanza.org/sign/` es
 * donde vive el texto, pero la firma se recoge acá. Los parámetros de
 * seguimiento vienen del enlace oficial de la campaña y se conservan tal cual
 * — recortarlos rompe la atribución de quién trajo cada firma.
 */
export const DECLARATION_SIGN_URL =
  'https://www.change.org/p/let-s-make-a-truly-education-for-sustainable-development-and-disaster-risk-management' +
  '?recruiter=1364747927' +
  '&recruited_by_id=62791b30-e408-11ef-88b2-4f03bc6d6fbd' +
  '&utm_source=share_petition' +
  '&utm_campaign=share_for_starters_page' +
  '&utm_medium=copylink';

export const DECLARATION_ARTICLES: DeclarationArticle[] = [
  {
    number: 1,
    title: 'Liderazgo juvenil: un derecho fundamental y una responsabilidad continental',
    body: 'Nosotros, los pueblos de las Américas, declaramos que las nuevas generaciones tienen el derecho fundamental a un futuro viable, que la sociedad debe garantizar mediante una educación de calidad, la conexión con el medio ambiente y la participación activa en la gestión del riesgo de desastres. Es responsabilidad de todos asegurar que los jóvenes cuenten con las condiciones y el impulso necesarios para comprender su entorno, reconocer su potencial y liderar el desarrollo de sus propias comunidades.',
  },
  {
    number: 2,
    title: 'Educación transformadora para un futuro sostenible',
    body: 'Un nuevo enfoque de la educación debe empoderar a los jóvenes hacia la sostenibilidad ambiental y la resiliencia, incluso en medio de desastres activos, favoreciendo su rehabilitación y promoviendo el aprendizaje experiencial. Esto incluye el desarrollo de sus capacidades, la protección de los recursos naturales y la gestión del riesgo de desastres en sus territorios.',
  },
  {
    number: 3,
    title: 'Arte, cultura y tecnología: instrumentos de innovación e identidad',
    body: 'El uso de tecnologías emergentes, combinado con la integración del arte y la cultura, es clave para fortalecer la identidad de los jóvenes y potenciar su capacidad de desarrollar medios de vida para sus familias. Esta conexión con su territorio genera conciencia sobre la naturaleza, sus particularidades territoriales y los riesgos asociados, al tiempo que impulsa oportunidades de desarrollo para las escuelas y las comunidades.',
  },
  {
    number: 4,
    title: 'Articulación intersectorial: integrar capacidades',
    body: 'Es indispensable actuar de manera intersectorial, combinando los esfuerzos de los gobiernos (integrando autoridades nacionales y locales de educación, cultura, ambiente, salud, justicia, etc.), las empresas, las universidades y las organizaciones civiles, para crear acciones coherentes, estructuradas y de impacto para el desarrollo territorial.',
  },
  {
    number: 5,
    title: 'Marcos legales claros y control de amenazas emergentes',
    body: 'Los marcos legales claros son cruciales para respaldar los derechos de las nuevas generaciones y asegurar la implementación efectiva de mecanismos de control de amenazas emergentes, protegiendo su patrimonio ambiental y garantizando su uso efectivo.',
  },
  {
    number: 6,
    title: 'Nuestro compromiso compartido',
    body: 'Junto con Vive con Esperanza, reafirmamos nuestra dedicación a impulsar estas prioridades por el derecho de las nuevas generaciones a un futuro viable. Esto requiere un compromiso compartido, libre de intereses políticos o ideológicos. Tal compromiso con el futuro exige decisiones responsables que garanticen un entorno sano, resiliente y sostenible, rechazando toda forma de instrumentalización de los derechos consagrados en la Declaración Universal de Derechos Humanos y la Convención sobre los Derechos del Niño.',
  },
];
