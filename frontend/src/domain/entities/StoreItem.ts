/**
 * Tienda con propósito.
 *
 * No es un catálogo de comercio electrónico: cada pieza declara primero su
 * HISTORIA y su DESTINO —a qué se aplica lo recaudado— y recién después qué es.
 * Ese orden es el que comunica que el producto forma parte de algo mayor.
 *
 * Por eso no hay precio, carrito ni stock en el modelo: la venta se cierra por
 * conversación. Acá se cuenta por qué existe.
 */
export interface StoreItem {
  id: string;
  name: string;
  /** Qué es, en una línea. */
  kind: string;
  /** De dónde viene la pieza. */
  story: string;
  /** A qué se destina lo recaudado. Concreto, nunca "a la causa". */
  funds: string;
  icon: 'BookOpen' | 'Palette' | 'Heart';
}

/** Línea de contacto de la tienda. Formato internacional, Colombia (+57). */
const STORE_PHONE = '573102528967';

const STORE_MESSAGE =
  'Hola, estoy interesado en los productos de la tienda de Vive con Esperanza. ¿Pueden darme más información, por favor?';

/**
 * Canal de la tienda: WhatsApp, no una tienda en línea.
 *
 * `wa.me` y no `api.whatsapp.com`: es el formato que abre la aplicación
 * instalada en el teléfono y cae a WhatsApp Web en el escritorio, sin
 * intermediar una página de redirección.
 */
export const STORE_WHATSAPP_URL = `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(
  STORE_MESSAGE,
)}`;

/** Ficha del libro en su tienda. */
export const BOOK_URL =
  'https://www.amazon.com/dp/B0FFBGQ9FF#detailBullets_feature_div';

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'peluches-voces',
    name: 'Peluches Pedagógicos «Voces del Bosque»',
    kind: 'Edición artesanal de las 7 mascotas del Rally Continental 2028',
    story:
      'Las siete aves emblemáticas confeccionadas como compañeros de aprendizaje socioemocional y resiliencia para las aulas. Cada peluche encarna una lección de gestión del riesgo y cuidado territorial.',
    funds: 'Financia kits de emergencia escolar y material pedagógico para escuelas vulnerables.',
    icon: 'Heart',
  },
  {
    id: 'libritos',
    name: 'Colección Libritos de Esperanza',
    kind: 'Cuentos ilustrados y guías para el aula',
    story:
      'La historia que Rocío contaba en familia y terminó convertida en un movimiento continental. Esperanza, Silvio, Carla y toda la bandada llegan impresos, con la guía docente que convierte el relato en una clase.',
    funds: 'Financia la impresión de ejemplares para escuelas que no pueden comprarlos.',
    icon: 'BookOpen',
  },
  {
    id: 'arte',
    name: 'Arte del Rally Continental',
    kind: 'Obra digital y fotografía en edición limitada',
    story:
      'Piezas creadas por estudiantes y artistas aliados a partir de su propio territorio. Cada obra tiene nombre, escuela y país: no es decoración anónima, es el retrato de un lugar concreto.',
    funds: 'Financia la participación de escuelas rurales en el Rally Continental 2028.',
    icon: 'Palette',
  },
];
