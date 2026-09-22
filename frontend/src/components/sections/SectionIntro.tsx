import React from 'react';
import { Reveal } from '@/components/motion/Reveal';
import styles from './SectionIntro.module.css';

interface SectionIntroProps {
  /** Número del capítulo en el recorrido. Es narrativa, no ornamento. */
  step?: string;
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Sobre la banda oscura los tonos de texto cambian. */
  tone?: 'default' | 'ink';
  align?: 'start' | 'center';
  /** Id del encabezado, para enlazarlo desde `aria-labelledby`. */
  titleId?: string;
  className?: string;
}

/**
 * Encabezado de sección — eyebrow, titular y bajada.
 *
 * Existe porque la misma estructura aparece en ocho secciones: repetirla a
 * mano garantiza que en la tercera alguien cambie un tamaño y el ritmo se
 * rompa. El escalonado de entrada también queda resuelto acá de una sola forma.
 *
 * El `step` numerado no es decoración: la landing es un recorrido y el número
 * le dice a la persona en qué parte de la historia está.
 */
export function SectionIntro({
  step,
  eyebrow,
  title,
  lede,
  tone = 'default',
  align = 'start',
  titleId,
  className = '',
}: SectionIntroProps) {
  return (
    <div
      className={`${styles.intro} ${align === 'center' ? styles.center : ''} ${className}`}
    >
      <Reveal index={0}>
        <p className={`eyebrow ${tone === 'ink' ? 'eyebrow--ink' : ''}`}>
          {step && <span className={styles.step}>{step}</span>}
          {eyebrow}
        </p>
      </Reveal>

      <Reveal index={1}>
        <h2 id={titleId} className={`h2 ${styles.title}`}>
          {title}
        </h2>
      </Reveal>

      {lede && (
        <Reveal index={2}>
          <p className={`lede ${tone === 'ink' ? 'lede--ink' : ''} ${styles.lede}`}>
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  );
}
