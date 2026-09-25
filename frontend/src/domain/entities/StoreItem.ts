/**
 * Tienda con propósito y Publicaciones — Fundación Vive con Esperanza
 *
 * Catálogo unificado con subsección interactiva para Libros y Publicaciones:
 * - Cocoperro y El Cordón Amarillo
 * - Colección Libritos de Esperanza: Las Voces del Bosque
 * - Guías y manuales pedagógicos de gestión del riesgo
 * - Peluches pedagógicos
 * - Arte del Rally Continental
 */

export type StoreCategory = 'todos' | 'libros' | 'peluches' | 'arte';

export interface BookDetail {
  author: string;
  synopsis: string;
  review: string;
  highlights: string[];
  targetAge?: string;
  format?: string;
  externalUrl?: string;
  image: string;
}

export interface StoreItem {
  id: string;
  name: string;
  category: 'libros' | 'peluches' | 'arte';
  kind: string;
  story: string;
  funds: string;
  icon: 'BookOpen' | 'Palette' | 'Heart';
  featuredImage?: string;
  bookDetail?: BookDetail;
}

/** Línea de contacto de la tienda. Formato internacional, Colombia (+57). */
const STORE_PHONE = '573102528967';

const STORE_MESSAGE =
  'Hola, estoy interesado en los libros y productos de la tienda con propósito de Vive con Esperanza. ¿Podrían brindarme información y disponibilidad?';

export const STORE_WHATSAPP_URL = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
  STORE_MESSAGE,
)}`;

export const COCOPERRO_AMAZON_URL =
  'https://www.amazon.com/dp/B0FFBGQ9FF#detailBullets_feature_div';

export const STORE_CATEGORIES: { id: StoreCategory; label: string; count?: number }[] = [
  { id: 'todos', label: 'Todo el catálogo' },
  { id: 'libros', label: 'Libros y Publicaciones' },
  { id: 'peluches', label: 'Peluches Voces del Bosque' },
  { id: 'arte', label: 'Arte del Rally' },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'cocoperro',
    name: 'Cocoperro y El Cordón Amarillo',
    category: 'libros',
    kind: 'Cuento ilustrado & Educación socioemocional',
    story:
      'La historia de un perro sensible y valiente que acompaña a niñas, niños, familias y docentes a poner en palabras el dolor, el miedo, la pérdida y el renacer del afecto. Una obra imprescindible para aulas y hogares.',
    funds: 'Financia la entrega de ejemplares físicos y guías didácticas a escuelas rurales sin biblioteca.',
    icon: 'BookOpen',
    featuredImage: '/Video/Cocoperro_staring_closely_20260922164931.jpeg',
    bookDetail: {
      author: 'Rocío Galvis Guerrero & Fundación Vive con Esperanza',
      synopsis: 'El libro que enseña a nombrar el dolor sin vergüenza y a tejer redes afectivas de soporte.',
      review:
        'Cocoperro aborda las pérdidas humanas, materiales y emocionales desde la mirada de la infancia. Con un lenguaje cálido y sin eufemismos, abre un espacio seguro para que estudiantes y maestros elaboren el duelo y la adversidad a través del arte, el diálogo y canciones.',
      highlights: [
        'Cuento ilustrado de alta sensibilidad con guía docente incluida',
        'Herramienta de soporte socioemocional ante crisis y duelos colectivos',
        'Recomendado para planteles educativos, psicólogos y familias',
      ],
      targetAge: 'Educación inicial y primaria (6 a 12 años) y lectura compartida en familia',
      format: 'Tapa blanda / Edición ilustrada a color con guía pedagógica',
      externalUrl: COCOPERRO_AMAZON_URL,
      image: '/Video/Cocoperro_staring_closely_20260922164931.jpeg',
    },
  },
  {
    id: 'libritos-esperanza',
    name: 'Colección Libritos de Esperanza: Voces del Bosque',
    category: 'libros',
    kind: 'Serie de 7 cuentos temáticos de resiliencia escolar',
    story:
      'Las siete aves del bosque (Esperanza, Ojopelao, Saggy, Silvio, Carla, Lilo y Omar) cobran vida en una colección que transforma los protocolos de gestión del riesgo y cuidado ambiental en relatos entrañables para la escuela.',
    funds: 'Financia la impresión de lotes escolares y capacitaciones docentes en zonas de alta vulnerabilidad.',
    icon: 'BookOpen',
    featuredImage: '/img Pajaros/Esperanza.jpeg',
    bookDetail: {
      author: 'Fernando Galvis, Rocío Galvis Guerrero & Equipo Pedagógico',
      synopsis: 'Siete aventuras ilustradas donde cada personaje encarna un desafío ambiental y de protección civil.',
      review:
        'Esta colección conecta la lectura infantil con la acción territorial. Cada cuento guía a las niñas y niños a través de dilemas reales (cuidado del agua, energía limpia, reducción de residuos, soberanía alimentaria y mitigación del cambio climático), consolidando una cultura preventiva antes de las crisis.',
      highlights: [
        '7 volúmenes ilustrados con lenguaje escolar accesible',
        'Cada libro incluye taller pedagógico y ruta de acción escolar',
        'Material pedagógico oficial y complementario del Rally Continental 2028',
      ],
      targetAge: 'Infancia y juventud escolar (primaria y primeros grados de secundaria)',
      format: 'Colección modular ilustrada / Guía para docentes',
      image: '/img Pajaros/Esperanza.jpeg',
    },
  },
  {
    id: 'guia-riesgo-escolar',
    name: 'Guía Metodológica: Escuela Segura y Resiliente',
    category: 'libros',
    kind: 'Manual de protocolos y Plan Escolar de Gestión del Riesgo',
    story:
      'Instrumento técnico y práctico para directivos y maestros. Enseña a diseñar protocolos de contingencia, rutas de evacuación y comités escolares de emergencia sin requerir conectividad a internet ni presupuestos extraordinarios.',
    funds: 'Financia talleres presenciales de preparación ante desastres en comunidades apartadas.',
    icon: 'BookOpen',
    featuredImage: '/img Pajaros/Silvio.jpeg',
    bookDetail: {
      author: 'Comité Técnico Continental Vive con Esperanza',
      synopsis: 'Manual integral de prevención, respuesta y recuperación inmediata para planteles escolares.',
      review:
        'Desarrollado bajo los lineamientos de la UNESCO y la UNDRR, este manual traduce marcos normativos complejos en pasos operativos concretos que cualquier escuela puede implementar de inmediato con sus propios recursos.',
      highlights: [
        'Plantillas descargables y formatos listos para imprimir',
        'Matrices de riesgo escolar basadas en la experiencia comunitaria',
        'Metodología validada en escuelas públicas de 8 países de las Américas',
      ],
      targetAge: 'Directivos docentes, comités de gestión del riesgo y líderes comunitarios',
      format: 'Manual técnico encuadernado y digital interactivo',
      image: '/img Pajaros/Silvio.jpeg',
    },
  },
  {
    id: 'peluches-voces',
    name: 'Peluches Pedagógicos «Voces del Bosque»',
    category: 'peluches',
    kind: 'Edición artesanal de las 7 mascotas del Rally Continental 2028',
    story:
      'Las siete aves emblemáticas confeccionadas como compañeros de aprendizaje socioemocional y resiliencia para las aulas. Cada peluche encarna una lección de gestión del riesgo y cuidado territorial.',
    funds: 'Financia kits de emergencia escolar y material pedagógico para escuelas vulnerables.',
    icon: 'Heart',
    featuredImage: '/img Pajaros/felpa/Dove_plush_toy_smiling_20260922163219.png',
  },
  {
    id: 'arte-rally',
    name: 'Arte del Rally Continental',
    category: 'arte',
    kind: 'Obra digital y fotografía en edición limitada',
    story:
      'Piezas creadas por estudiantes y artistas aliados a partir de su propio territorio. Cada obra tiene nombre, escuela y país: no es decoración anónima, es el retrato de un lugar concreto.',
    funds: 'Financia la participación de escuelas rurales en el Rally Continental 2028.',
    icon: 'Palette',
    featuredImage: '/img Pajaros/felpa/Hummingbird_plushie_toy_20260922163346.png',
  },
];
