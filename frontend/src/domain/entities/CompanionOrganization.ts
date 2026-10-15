/**
 * Organizaciones que han acompañado la misión. No afirma una alianza vigente:
 * es trayectoria, no un directorio de socios actuales.
 *
 * `logo` solo existe cuando el archivo es la marca oficial verificada. Si
 * falta, la interfaz muestra el nombre y no un emblema sustituto.
 */
export interface CompanionOrganization {
  id: string;
  name: string;
  logo?: string;
  width?: number;
  height?: number;
}

export const COMPANIONS_COPY = {
  title: 'Organizaciones que han acompañado nuestra misión',
  lede:
    'Una trayectoria construida junto a instituciones que contribuyen al aprendizaje, la cooperación, la sostenibilidad y el desarrollo de comunidades más resilientes.',
} as const;

export const COMPANION_ORGANIZATIONS: readonly CompanionOrganization[] = [
  {
    id: 'oea',
    name: 'Organización de los Estados Americanos (OEA)',
    logo: '/recursos/aliados/oea.png',
    width: 500,
    height: 500,
  },
  {
    id: 'unesco',
    name: 'UNESCO Santiago',
    logo: '/recursos/aliados/unesco.svg',
    width: 400,
    height: 100,
  },
  {
    id: 'pnuma',
    name: 'Programa de las Naciones Unidas para el Medio Ambiente (PNUMA)',
    logo: '/recursos/aliados/pnuma.svg',
    width: 482,
    height: 566,
  },
  {
    id: 'undrr',
    name: 'Oficina de las Naciones Unidas para la Reducción del Riesgo de Desastres (UNDRR)',
    logo: '/recursos/aliados/undrr.svg',
    width: 279,
    height: 91,
  },
  {
    id: 'mep',
    name: 'Ministerio de Educación Pública de Costa Rica',
    logo: '/recursos/aliados/mep-costa-rica.png',
    width: 1796,
    height: 1186,
  },
  {
    id: 'mined-sv',
    name: 'Ministerio de Educación de El Salvador',
    logo: '/recursos/aliados/mined-elsalvador.png',
    width: 1235,
    height: 500,
  },
  {
    id: 'comiunesco',
    name: 'Comiunesco Perú',
  },
  {
    id: 'minedu',
    name: 'Ministerio de Educación del Perú',
    logo: '/recursos/aliados/minedu-peru.svg',
    width: 2473,
    height: 500,
  },
  {
    id: 'mma-chile',
    name: 'Ministerio de Ambiente de Chile',
    logo: '/recursos/aliados/mma-chile.svg',
    width: 416,
    height: 377,
  },
  {
    id: 'cndu',
    name: 'Consejo Nacional de Discapacidad (CNDU), República Dominicana',
  },
  {
    id: 'carta',
    name: 'Carta de la Tierra',
  },
];
