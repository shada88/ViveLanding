export interface KaleoPillar {
  title: string;
  action: string;
  description: string;
  iconName: 'ShieldCheck' | 'Siren' | 'Sprout';
}

export interface KaleoNode {
  label: string;
  role: 'care' | 'help' | 'hub';
  icon: string;
}

export const KALEO_DATA = {
  name: 'Kaleo',
  tagline: 'Orquestador de ayuda humanitaria y resiliencia escolar',
  appUrl: 'https://kaleo-sage.vercel.app/',
  byText: 'powered by Vivesperanza',
  etymology: {
    greek: 'καλέω',
    transliteration: 'kaléō',
    verbs: ['llamar', 'invitar', 'convocar'],
    meaning: 'Una invitación a no atravesar las dificultades en soledad. Kaleo no habla por la persona: convoca y sostiene el encuentro.'
  },
  premise: 'Hacemos que la ayuda llegue',
  coreValue: 'La herramienta trabaja y coordina lo administrativo. El criterio y el vínculo siguen siendo humanos, siempre.',
  pillars: [
    {
      title: 'Prevenir',
      action: 'Protocolos antes de la crisis',
      description: 'La escuela define contactos, protocolos de riesgo y redes de apoyo antes de que ocurra una emergencia.',
      iconName: 'ShieldCheck'
    },
    {
      title: 'Actuar',
      action: 'Convocatoria y tiempos claros',
      description: 'Cuando se declara un incidente, Kaleo convoca a la red verificada y asigna responsables con tiempos determinados.',
      iconName: 'Siren'
    },
    {
      title: 'Recuperar',
      action: 'Seguimiento y cierre humano',
      description: 'Cada caso tiene trazabilidad de punta a punta hasta su resolución. Nada queda abierto en silencio.',
      iconName: 'Sprout'
    }
  ] as KaleoPillar[],
  paths: {
    needHelp: {
      title: 'Necesito acompañamiento',
      description: 'Para personas o escuelas pasando por una situación difícil. Corto, confidencial y revisado por una persona del equipo.',
      ctaText: 'Solicitar Acompañamiento en Kaleo',
      url: 'https://kaleo-sage.vercel.app/inscripcion?via=necesito'
    },
    wantToHelp: {
      title: 'Quiero ayudar',
      description: 'Para psicólogos, profesionales, voluntarios y organizaciones que desean poner sus capacidades al servicio de quien lo necesita.',
      ctaText: 'Sumarme a la Red Kaleo',
      url: 'https://kaleo-sage.vercel.app/inscripcion?via=ayudar'
    }
  }
};
