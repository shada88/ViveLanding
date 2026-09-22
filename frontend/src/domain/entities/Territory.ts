/**
 * Representación conceptual del continente americano.
 *
 * NO es un mapa técnico ni pretende serlo: es una silueta de baja resolución
 * cuyo trabajo es sostener la idea de "conexión entre territorios". Por eso los
 * trazos son poligonales y no curvas interpoladas — un contorno facetado se lee
 * como decisión de diseño; un contorno curvo mal trazado se lee como un mapa
 * equivocado.
 *
 * Sistema de coordenadas del lienzo: viewBox "0 0 100 145".
 * Se derivó de coordenadas geográficas reales con:
 *   x = (lon + 170) / 140 * 100     y = (75 - lat) / 131 * 140
 * Cualquier punto nuevo tiene que pasar por esa misma conversión; agregar uno
 * "a ojo" desalinea el nodo respecto de la silueta.
 */

export const TERRITORY_VIEWBOX = '0 0 100 145';

/** Norteamérica, Centroamérica y el istmo hasta Panamá. */
export const NORTH_AMERICA_PATH =
  'M 1.4 9.6 L 10 4.3 L 32 5.3 L 53.6 16 L 78.6 21.4 L 83.6 28.9 L 75.7 33.1 ' +
  'L 68.6 37.4 L 66 46 L 64.3 53.4 L 60 50 L 57 49.2 L 58.6 57.7 L 61.4 62 ' +
  'L 60.7 66.3 L 61.4 69.5 L 65 70.5 L 63.5 68 L 58 63 L 53 59 L 46.4 58.8 ' +
  'L 39.3 46 L 34.3 40.6 L 32.9 28.9 L 27 21.4 L 21.4 16 L 5.7 18.2 Z';

/** Sudamérica. */
export const SOUTH_AMERICA_PATH =
  'M 67.9 67.3 L 77.1 68.4 L 82.1 73.7 L 85.7 80.2 L 96.4 86.6 L 93.6 96.2 ' +
  'L 90.7 104.7 L 82.9 117.6 L 80 120.8 L 75 131.5 L 73.6 139 L 67.9 133.6 ' +
  'L 69.3 119.7 L 71.4 101.5 L 66.4 93 L 63.6 82.3 L 66.4 75.9 Z';

export interface TerritoryNode {
  id: string;
  label: string;
  x: number;
  y: number;
  /** Los nodos destacados reciben halo y entran primero en la animación. */
  anchor?: boolean;
}

export const TERRITORY_NODES: TerritoryNode[] = [
  { id: 'ca', label: 'Canadá', x: 45.7, y: 20.3 },
  { id: 'us', label: 'Estados Unidos', x: 51.4, y: 38.5, anchor: true },
  { id: 'mx', label: 'México', x: 48.6, y: 55.6, anchor: true },
  { id: 'gt', label: 'Guatemala', x: 56.8, y: 63.6 },
  { id: 'do', label: 'El Caribe', x: 71.4, y: 59.9 },
  { id: 'cr', label: 'Costa Rica', x: 61.4, y: 69.6, anchor: true },
  { id: 'co', label: 'Colombia', x: 68.6, y: 75.2, anchor: true },
  { id: 'ec', label: 'Ecuador', x: 65.4, y: 82 },
  { id: 'pe', label: 'Perú', x: 67.9, y: 89.9 },
  { id: 'bo', label: 'Bolivia', x: 75.7, y: 97.8 },
  { id: 'br', label: 'Brasil', x: 85, y: 95.1, anchor: true },
  { id: 'cl', label: 'Chile', x: 70.7, y: 115.9 },
  { id: 'ar', label: 'Argentina', x: 75.7, y: 117.1, anchor: true },
];

/**
 * Conexiones entre territorios. No son rutas aéreas ni fronteras: representan
 * el vínculo entre comunidades educativas que trabajan el mismo problema desde
 * países distintos.
 */
export const TERRITORY_LINKS: ReadonlyArray<readonly [string, string]> = [
  ['ca', 'us'],
  ['us', 'mx'],
  ['mx', 'gt'],
  ['gt', 'cr'],
  ['cr', 'co'],
  ['co', 'ec'],
  ['ec', 'pe'],
  ['pe', 'bo'],
  ['bo', 'br'],
  ['pe', 'cl'],
  ['cl', 'ar'],
  ['ar', 'br'],
  ['co', 'do'],
  ['do', 'mx'],
  ['co', 'br'],
];
