/**
 * Archivo fotográfico de ediciones anteriores del Rally.
 *
 * Los archivos viven en `public/recursos/…/Photos Rally` ya revisados: todos son
 * del Rally. Los duplicados exactos (mismo hash, distinto nombre) se dejaron
 * afuera: en un carrusel automático una foto repetida se lee como error.
 */
export interface RallyPhoto {
  /** Ruta pública ya codificada: varios nombres traen espacios y paréntesis. */
  src: string;
  alt: string;
}

const FOLDER = '/recursos/Photos Rally/Photos Rally';

const FILES: readonly string[] = [
  '9-mayo(1).jpg',
  '17.png',
  '18-sep-2017-banner-unisdr.png',
  '19.png',
  '20.png',
  '33.png',
  '34.png',
  '35.png',
  '36.png',
  '37.png',
  '38.png',
  '39.png',
  '40.png',
  '41.png',
  '42.png',
  '43.png',
  '44.png',
  '45.png',
  '46.png',
  '47.png',
  '48.png',
  '49.png',
  '50.png',
  '51.png',
  '52.png',
  '13147337_705340936274108_4336728270405568824_o.jpg',
  '13987821_1017498578357176_1829617875_o.jpg',
  '20160930_120952.jpg',
  '20747999_978110205663845_3427140781046714905_o.png',
  '21199618_978109388997260_4027697445222938925_o.jpg',
  'BvWGakeIMAAGED0.png',
  'BwTETUoIMAAyI-w.png',
  'ByA4lIXIAAAVQhu.png',
  'CARTA A LA TIERRA 096.JPG',
  'CY7rfJ9WkAAVsCY.png',
  'Cw7KGpjWIAAE1SQ.jpg',
  'IMG_3898.JPG',
  'IMG_9841.JPG',
  'IMG_20160712_093101.jpg',
  'IMG_20160812_104905 (1).jpg',
  'Ojopelao pintura.png',
  'image1 (1).JPG',
  'maxresdefault (1)(1).jpg',
  'maxresdefault(1).jpg',
  'metro4-030916_EH996329_MG118509992(1).jpg',
  'niños pintando.jpg',
  'ojopelao colegio.png',
];

export const RALLY_PHOTOS: readonly RallyPhoto[] = FILES.map((file, i) => ({
  src: encodeURI(`${FOLDER}/${file}`),
  alt: `Rally Continental, ediciones anteriores — fotografía ${i + 1} de ${FILES.length}`,
}));
