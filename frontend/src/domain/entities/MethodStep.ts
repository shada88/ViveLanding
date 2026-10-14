/**
 * El método de la Ruta B en cuatro pasos.
 *
 * Cada paso declara un PRODUCTO de aprendizaje: algo que el equipo escolar
 * tiene en la mano al terminar. Un método sin entregable es una intención, y
 * una docente no puede llevar una intención al aula el lunes.
 *
 * Las salvedades de cada producto no son letra chica: un prototipo escolar
 * no reemplaza a una autoridad competente y presentar un proyecto no certifica
 * a nadie para responder emergencias. Decirlo es parte del método.
 */
export type MethodIcon = 'Eye' | 'BookOpen' | 'Wrench' | 'Megaphone';

export interface MethodStep {
  id: string;
  /** Rótulo corto de la pestaña. */
  label: string;
  icon: MethodIcon;
  title: string;
  body: string;
  product: {
    title: string;
    note: string;
  };
}

export const METHOD_INTRO = {
  eyebrow: 'El método',
  title: 'El joven no es el beneficiario. Es el protagonista.',
  lede: 'Cómo el proceso pedagógico convierte los desafíos del territorio en proyectos reales con impacto escolar. Recorre los cuatro pasos.',
} as const;

export const METHOD_STEPS: MethodStep[] = [
  {
    id: 'observar',
    label: 'Observar',
    icon: 'Eye',
    title: 'Comprender el territorio y sus riesgos',
    body: 'Los estudiantes mapean junto con sus docentes las vulnerabilidades, amenazas ambientales y necesidades de su comunidad inmediata.',
    product: {
      title: 'Mapa comunitario de riesgos y recursos',
      note: 'Un insumo de aprendizaje para conversar con docentes y, cuando corresponda, con las autoridades competentes.',
    },
  },
  {
    id: 'investigar',
    label: 'Investigar',
    icon: 'BookOpen',
    title: 'Documentar y cruzar materias',
    body: 'El problema identificado se aborda en el aula integrando ciencias, matemáticas, tecnología y ciencias sociales.',
    product: {
      title: 'Proyecto integrador de malla curricular',
      note: 'Una propuesta para conectar distintas áreas de aprendizaje con un desafío del entorno escolar.',
    },
  },
  {
    id: 'prototipar',
    label: 'Prototipar',
    icon: 'Wrench',
    title: 'Prototipar la solución local',
    body: 'Diseño de proyectos de ahorro de agua, reforestación, alertas tempranas o apoyo socioemocional entre pares.',
    product: {
      title: 'Solución tangible o dispositivo ambiental',
      note: 'Un prototipo o una campaña que debe revisarse con docentes y actores competentes antes de implementarse.',
    },
  },
  {
    id: 'liderar',
    label: 'Liderar y medir',
    icon: 'Megaphone',
    title: 'Implementar y documentar',
    body: 'Los jóvenes presentan la solución, documentan resultados y reflexionan sobre lo aprendido, siempre con acompañamiento adulto y según las normas de la institución.',
    product: {
      title: 'Presentación del proyecto y aprendizajes',
      note: 'La participación no equivale a una certificación oficial para responder a emergencias.',
    },
  },
];
