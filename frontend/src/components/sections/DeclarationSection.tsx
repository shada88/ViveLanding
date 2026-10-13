import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  DECLARATION_ARTICLES,
  DECLARATION_SIGN_URL,
  DECLARATION_TITLE,
} from '@/domain/entities/Declaration';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import styles from './DeclarationSection.module.css';

/**
 * 07 — Cápsula de la Declaración Vivesperanza.
 *
 * La landing NO es un repositorio de estatutos. Acá queda lo que sostiene la
 * confianza en diez segundos —la síntesis, el índice de los seis principios y
 * la firma— y el texto íntegro se traslada a `/sobre-nosotros#declaracion`,
 * donde quien quiere leerlo vino a hacerlo.
 *
 * El índice muestra SOLO los títulos, tal como los registra la fundación. Los
 * cuerpos no se resumen ni se parafrasean: el texto institucional no se toca;
 * si no cabe entero, se enlaza.
 *
 * Componente de servidor: no hay estado. La red de fondo es la única pieza
 * cliente y ya se aísla sola.
 */
export function DeclarationSection() {
  return (
    <section
      id="declaracion"
      className={`section section--ink ${styles.section}`}
      aria-labelledby="declaracion-titulo"
    >
      <ParticleNetwork density="soft" interactive={false} className={styles.net} />
      <span className={`ambient ambient--gold ${styles.glow}`} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <Reveal index={0}>
              <p className="eyebrow eyebrow--ink">
                <span className={styles.step}>07</span>
                Documento fundacional
              </p>
            </Reveal>

            <Reveal index={1}>
              <h2 id="declaracion-titulo" className={styles.title}>
                {DECLARATION_TITLE}
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className={styles.synthesis}>
                Seis principios rectores para salvaguardar el derecho de las nuevas
                generaciones a un futuro viable en las Américas. Se sostiene con firmas de todo
                el continente.
              </p>
            </Reveal>

            <Reveal index={3} className={styles.actions}>
              <a
                href={DECLARATION_SIGN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--lg btn--gold"
              >
                <span>Firmar la Declaración en Change.org</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Reveal>

            <Reveal index={4}>
              <p className={styles.bridge}>
                Lee los 6 artículos de la Declaración y nuestra historia en{' '}
                <Link href="/sobre-nosotros#declaracion" className={styles.bridgeLink}>
                  <span>Sobre Nosotros</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </p>
            </Reveal>
          </div>

          <Reveal className={styles.index}>
            <ol className={styles.articles} aria-label="Principios de la Declaración">
              {DECLARATION_ARTICLES.map((article) => (
                <li key={article.number} className={styles.article}>
                  <span className={styles.number} aria-hidden="true">
                    {String(article.number).padStart(2, '0')}
                  </span>
                  <span className={styles.articleTitle}>{article.title}</span>
                </li>
              ))}
            </ol>

            <div className={styles.seal}>
              <BrandLogo brand="vivesperanza" height={24} tone="on-ink" />
              <p className={styles.sealNote}>
                Traducción oficial del documento registrado por la fundación.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
