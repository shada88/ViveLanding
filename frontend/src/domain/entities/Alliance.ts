/**
 * Los cuatro sectores con los que se articula una alianza.
 *
 * Responden UNA pregunta: «¿mi organización cómo encaja acá?». Por eso cada
 * sector nombra qué aporta y no qué recibe: una empresa que lee «impulsa una
 * escuela» se ve en el rol; una que lee «beneficios para tu marca» se ve en un
 * catálogo.
 *
 * Todos desembocan en el mismo formulario con el interés `ALIADO` ya elegido:
 * cuatro formularios para cuatro sectores serían cuatro lugares donde perder
 * un contacto.
 */
export interface AllianceSector {
  id: string;
  /** Rótulo del sector, en versalitas. */
  sector: string;
  title: string;
  body: string;
  cta: string;
}

export const ALLIANCES_INTRO = {
  eyebrow: 'La escuela no transforma sola',
  title: '¿Qué podemos construir juntos?',
  lede: 'Conecta las capacidades de tu organización con escuelas donde niñas, niños y jóvenes lideran soluciones para su territorio. Elige tu sector para conocer cómo aportar.',
} as const;

export const ALLIANCE_SECTORS: AllianceSector[] = [
  {
    id: 'publico',
    sector: 'Sector público',
    title: 'Gobiernos y entidades públicas',
    body: 'Articulemos educación, protección, gestión del riesgo y planes territoriales para fortalecer las capacidades de las comunidades educativas.',
    cta: 'Articular una alianza pública',
  },
  {
    id: 'privado',
    sector: 'Sector privado',
    title: 'Empresas y fundaciones empresariales',
    body: 'Impulsa la transformación escolar mediante apoyo a la Ruta B, recursos, capacidades técnicas, financiación de proyectos o voluntariado corporativo.',
    cta: 'Impulsar una escuela',
  },
  {
    id: 'conocimiento',
    sector: 'Conocimiento e innovación',
    title: 'Universidades y centros de conocimiento',
    body: 'Pon el conocimiento en acción con investigación aplicada, mentoría, evaluación de resultados y acompañamiento especializado.',
    cta: 'Poner conocimiento en acción',
  },
  {
    id: 'internacional',
    sector: 'Cooperación internacional',
    title: 'Organizaciones internacionales',
    body: 'Exploremos cooperación técnica, intercambio de buenas prácticas y alianzas programáticas en educación, protección de la niñez y gestión del riesgo.',
    cta: 'Explorar una alianza internacional',
  },
];

export const ALLIANCES_FOOTNOTE =
  'Cada alianza se define según las necesidades del territorio, las capacidades disponibles y los compromisos acordados.';
