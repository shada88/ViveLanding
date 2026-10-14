import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_INTRO, FAQ_ITEMS } from '@/domain/entities/FAQ';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './FAQSection.module.css';

/**
 * 08 — Preguntas frecuentes.
 *
 * `details`/`summary` nativos: teclado, lector de pantalla y búsqueda del
 * navegador (Ctrl+F abre el desplegable que contiene la coincidencia) vienen
 * resueltos sin una línea de JavaScript. Por eso es un componente de servidor.
 */
export function FAQSection() {
  return (
    <section
      id="preguntas"
      className={`section ${styles.section}`}
      aria-labelledby="preguntas-titulo"
    >
      <div className="shell">
        <SectionIntro
          step="08"
          eyebrow={FAQ_INTRO.eyebrow}
          titleId="preguntas-titulo"
          title={FAQ_INTRO.title}
          lede={FAQ_INTRO.lede}
        />

        <Reveal className={styles.list}>
          {FAQ_ITEMS.map((item) => (
            <details key={item.id} id={`pregunta-${item.id}`} className={styles.item}>
              <summary className={styles.summary}>
                <span className={styles.question}>{item.question}</span>
                <ChevronDown size={20} aria-hidden="true" className={styles.chevron} />
              </summary>
              <p className={styles.answer}>{item.answer}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
