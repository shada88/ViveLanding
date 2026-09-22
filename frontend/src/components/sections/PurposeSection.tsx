import React from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
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
 * 01 — Propósito. Quiénes somos y por qué existimos.
 *
 * Abre con el logotipo real de la marca en dorado sobre una declaración corta.
 * El logo no se recrea con texto ni se reemplaza por una inicial en un cuadrado
 * de color: es el archivo de marca, recoloreado en la capa de presentación.
 */
export function PurposeSection() {
  return (
    <section id="proposito" className="section" aria-labelledby="proposito-titulo">
      <div className="shell">
        <SectionIntro
          step="01"
          eyebrow="Propósito"
          titleId="proposito-titulo"
          title={
            <>
              No llegamos a la escuela a traer soluciones. Llegamos para que la escuela
              pueda producirlas.
            </>
          }
          lede="Vive con Esperanza es una fundación interamericana que trabaja con comunidades educativas del continente. Partimos de una convicción incómoda: casi todo lo que un territorio necesita para transformarse ya está adentro de sus escuelas. Lo que falta es método, herramientas y una red que no se apague cuando se apagan las cámaras."
        />

        <div className={styles.body}>
          <Reveal className={styles.statement} index={0}>
            <BrandLogo brand="vivesperanza" height={40} tone="gold" className={styles.mark} />
            <blockquote className={styles.quote}>
              La esperanza no es un discurso. Es infraestructura: alguien que sabe qué
              hacer, algo con qué hacerlo y alguien más al otro lado del teléfono.
            </blockquote>
            <cite className={styles.cite}>Principio fundacional</cite>
          </Reveal>

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
      </div>
    </section>
  );
}
