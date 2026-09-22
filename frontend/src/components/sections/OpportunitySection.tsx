import React from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './OpportunitySection.module.css';

/**
 * Reencuadres. Cada uno toma una lectura habitual del contexto escolar y la
 * devuelve como capacidad instalada.
 *
 * Decisión de comunicación: NO se enuncia la carencia. La columna izquierda
 * dice lo que la escuela YA tiene; la derecha, qué se abre a partir de eso.
 * Abrir con la falta pone a la comunidad educativa en el lugar de problema, y
 * nadie construye desarrollo local desde ahí.
 */
const REFRAMES = [
  {
    asset: 'La escuela abre todos los días',
    unlock:
      'Es el único equipamiento público presente en casi todos los barrios del continente. Cuando hay una emergencia, ya está ahí: no hay que desplegar nada.',
  },
  {
    asset: 'El docente conoce el contexto real',
    unlock:
      'Sabe qué familia se inunda, qué calle se corta y qué chico dejó de venir. Esa lectura no la reemplaza ningún sistema: hay que darle herramientas y respaldo.',
  },
  {
    asset: 'Los estudiantes ya tienen el problema enfrente',
    unlock:
      'El río contaminado, el talud que cede, el residuo sin destino. Convertido en proyecto escolar, ese problema deja de ser un tema de clase y pasa a ser un prototipo, un oficio y una oportunidad.',
  },
];

/**
 * 02 — El contexto, leído como oportunidad.
 *
 * Va sobre la banda hundida: un cambio de superficie marca el cambio de
 * capítulo mejor que un separador, y el degradado abre y cierra en el fondo de
 * la página para no dejar costura contra las secciones vecinas.
 */
export function OpportunitySection() {
  return (
    <section
      id="oportunidad"
      className="section section--sunken"
      aria-labelledby="oportunidad-titulo"
    >
      <div className="shell">
        <SectionIntro
          step="02"
          eyebrow="Punto de partida"
          titleId="oportunidad-titulo"
          title="Los territorios no están vacíos. Están desconectados."
          lede="Donde muchos diagnostican carencia, nosotros encontramos capacidad instalada sin articular. Esa diferencia de lectura define todo lo que hacemos después."
        />

        <ul className={styles.list}>
          {REFRAMES.map((item, i) => (
            <Reveal as="li" key={item.asset} index={i} className={styles.row}>
              <p className={styles.asset}>{item.asset}</p>
              {/* Conector dorado: el gesto de unir dos lados, que es lo que
                  hace toda la fila. El dorado marca valor, no decoración. */}
              <span className={styles.connector} aria-hidden="true" />
              <p className={styles.unlock}>{item.unlock}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
