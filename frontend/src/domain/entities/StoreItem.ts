/**
 * Tienda con propósito y Publicaciones — Fundación Vive con Esperanza
 *
 * Catálogo de tres piezas pares:
 * - Cocoperro y El Cordón Amarillo
 * - Colección Libritos de Esperanza: Voces del Bosque
 * - Peluches pedagógicos «Voces del Bosque»
 */

export type StoreCategory = 'todos' | 'libros' | 'peluches';

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
  category: 'libros' | 'peluches';
  kind: string;
  story: string;
  funds: string;
  icon: 'BookOpen' | 'Heart';
  featuredImage?: string;
  imagePosition?: string;
  hasSchoolProgram?: boolean;
  schoolProgram?: string;
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
    hasSchoolProgram: true,
    schoolProgram:
      'Cuenta con un programa pedagógico estructurado para impactar a las escuelas y formar a las nuevas generaciones en resiliencia socioemocional, elaboración del duelo y empatía comunitaria.',
    bookDetail: {
      author: 'Rocío Galvis Guerrero & Fundación Vive con Esperanza',
      synopsis: 'El libro que enseña a nombrar el dolor sin vergüenza y a tejer redes afectivas de soporte.',
      review:
        'Cocoperro aborda las pérdidas humanas, materiales y emocionales desde la mirada de la infancia. Con un lenguaje cálido y sin eufemismos, abre un espacio seguro para que estudiantes y maestros elaboren el duelo y la adversidad a través del arte, el diálogo y canciones. Se complementa con talleres escolares que transforman el aula en un refugio emocional.',
      highlights: [
        'Programa pedagógico para escuelas: talleres de aula y orientación socioemocional',
        'Cuento ilustrado de alta sensibilidad con guía docente incluida',
        'Herramienta de soporte para nuevas generaciones ante crisis y duelos colectivos',
        'Recomendado para directivos, psicólogos, docentes y familias',
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
    featuredImage: '/recursos/libritos de esperanza.jpg',
    hasSchoolProgram: true,
    schoolProgram:
      'Dispone de un programa de impacto escolar continental diseñado para involucrar a las nuevas generaciones en la gestión del riesgo de desastres, la acción climática y la transformación territorial.',
    bookDetail: {
      author: 'Fernando Rafael García García, Rocío Galvis Guerrero & Equipo Pedagógico',
      synopsis: 'Siete aventuras ilustradas donde cada personaje encarna un desafío ambiental y de protección civil.',
      review:
        'Esta colección conecta la lectura infantil con la acción territorial directa. Respaldada por un programa pedagógico integral para escuelas, cada volumen guía a las niñas y niños a través de dilemas reales (cuidado del agua, energía limpia, reducción de residuos, soberanía alimentaria y mitigación del cambio climático), sembrando en las nuevas generaciones la capacidad de liderar sus territorios.',
      highlights: [
        'Programa escolar de impacto continental con talleres docentes y proyectos estudiantiles',
        '7 volúmenes ilustrados con lenguaje escolar accesible y dinámico',
        'Cada libro incluye taller pedagógico y ruta de acción escolar',
        'Material pedagógico oficial y complementario del Rally Continental 2028',
      ],
      targetAge: 'Infancia y juventud escolar (primaria y primeros grados de secundaria)',
      format: 'Colección modular ilustrada / Guía para docentes',
      image: '/recursos/libritos de esperanza.jpg',
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
    featuredImage: '/img Pajaros/felpa/catalogo.jpeg',
  },
];
