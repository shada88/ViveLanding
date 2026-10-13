/**
 * Banco Vivo — experiencias reales de emergencias convertidas en conocimiento
 * para otras escuelas.
 *
 * Moviliza conocimiento y tiempo voluntario. NO es una plataforma de recaudo:
 * la frase de `disclaimer` existe para que nadie lea «banco» como «donación».
 */
export interface BancoVivoGain {
  label: string;
  body: string;
}

export const BANCO_VIVO = {
  logo: '/recursos/banco-vivo.png',
  logoAlt: 'Banco Vivo. Infraestructura de experiencias de valor en emergencias y desastres.',
  symbol: '/recursos/banco-vivo-simbolo.png',
  legalDocument: '/docs/banco-vivo/documento-testimonio.docx',
  disclaimer:
    'Banco Vivo moviliza conocimiento y tiempo voluntario; no es una plataforma de integración financiera ni de recaudo.',
} as const;

export const BANCO_VIVO_GAINS: BancoVivoGain[] = [
  {
    label: 'Acceso anticipado',
    body: 'Recibe antes que el público las guías del año, el mapa de experiencias de su tipo de evento y las alertas de prevención.',
  },
  {
    label: 'Voz en Kaleo a su elección',
    body: 'Testimonio acreditado o testimonio protegido. En ambos casos puede aceptar o reservar una conversación con otra escuela.',
  },
  {
    label: 'Crédito en acceso a mecanismos del banco',
    body: 'Si el relato entra a formar parte de un libro o serie, la escuela figura como comunidad de origen, con beneficios excepcionales en materiales de prevención Vivesperanza.',
  },
  {
    label: 'Estatus de escuela referente',
    body: 'En el mapa de capacidades queda marcada como escuela que ya atravesó ese evento y acepta acompañar a otra. Eso la vuelve nodo, no solo usuaria.',
  },
];
