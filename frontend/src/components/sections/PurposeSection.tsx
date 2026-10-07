import React from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './PurposeSection.module.css';

/**
 * Los tres verbos de la fundación. No son servicios de un catálogo: son las
 * tres cosas que hace, dichas en el orden en que ocurren.
 */
const VERBS = [
  {
    verb: 'Preparamos',
    body: 'Antes de que pase algo. Protocolos, fichas y rutinas que dejan a la escuela con una respuesta escrita y ensayada, no con una improvisación.',
  },
  {
    verb: 'Conectamos',
    body: 'Cuando pasa. Una red verificada de profesionales, organizaciones e instituciones que responde con nombres y tiempos, no con buenas intenciones.',
  },
  {
    verb: 'Sostenemos',
    body: 'Después. Acompañamiento hasta el cierre real del caso y proyectos que convierten lo aprendido en una oportunidad para el territorio.',
  },
];

/**
 * 08 — Propósito. Quiénes somos y por qué existimos.
 *
 * Los tres verbos siguen al texto de la sección, en una sola columna.
 */
export function PurposeSection() {
  return (
    <section id="proposito" className="section" aria-labelledby="proposito-titulo">
      <div className="shell">
        <SectionIntro
          step="08"
          eyebrow="Propósito Institucional"
          titleId="proposito-titulo"
          title={
            <>
              No llegamos a la escuela a traer soluciones. Llegamos para que la escuela
              pueda producirlas.
            </>
          }
          lede="Partimos de una convicción incómoda: casi todo lo que un territorio necesita para transformarse ya está adentro de sus escuelas. Lo que falta es método, herramientas y una red que no se apague cuando se apagan las cámaras."
        />

        <ol className={styles.verbs}>
            {VERBS.map((item, i) => (
              <Reveal as="li" key={item.verb} index={i} className={styles.verbItem}>
                <span className={styles.verbIndex} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className={`h3 ${styles.verbTitle}`}>{item.verb}</h3>
                <p className={styles.verbBody}>{item.body}</p>
              </Reveal>
            ))}
        </ol>
      </div>
    </section>
  );
}
