import React from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';
import { CHILD_SAFETY_NOTE, FAQ_INTRO, FAQ_ITEMS } from '@/domain/entities/FAQ';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './FAQSection.module.css';

/**
 * 09 — Preguntas frecuentes y seguridad.
 *
 * `details`/`summary` nativos: teclado, lector de pantalla y búsqueda del
 * navegador (Ctrl+F abre el desplegable que contiene la coincidencia) vienen
 * resueltos sin una línea de JavaScript. Por eso es un componente de servidor.
 *
 * La nota de protección de menores NO va dentro de un desplegable: lo que
 * protege a una niña no puede depender de que alguien haga clic.
 */
export function FAQSection() {
  return (
    <section id="preguntas" className="section" aria-labelledby="preguntas-titulo">
      <div className="shell">
        <div className={styles.layout}>
          <SectionIntro
            className={styles.intro}
            step="09"
            eyebrow={FAQ_INTRO.eyebrow}
            titleId="preguntas-titulo"
            title={FAQ_INTRO.title}
          />

          <div className={styles.main}>
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

            <Reveal className={styles.safety} as="div">
              <ShieldCheck size={22} aria-hidden="true" className={styles.safetyIcon} />
              <div>
                <h3 className={styles.safetyTitle}>{CHILD_SAFETY_NOTE.title}</h3>
                <p className={styles.safetyBody}>{CHILD_SAFETY_NOTE.body}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
