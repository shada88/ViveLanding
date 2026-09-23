'use client';

import React, { useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import {
  DECLARATION_ARTICLES,
  DECLARATION_SIGN_URL,
  DECLARATION_TITLE,
} from '@/domain/entities/Declaration';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import styles from './DeclarationSection.module.css';

const FULL_DECLARATION_URL = 'https://vivesperanza.org/sign/';

/**
 * 03 — La Declaración Vive con Esperanza.
 *
 * Presentación interactiva y condensada del documento fundacional:
 * seis compromisos rectores navegables en un solo cuadro de lectura ágil.
 * Mantiene la sobriedad editorial de la fundación y permite acceder al
 * documento íntegro o sumar la firma en la petición continental.
 */
export function DeclarationSection() {
  const [activeNumber, setActiveNumber] = useState(1);
  const activeArticle =
    DECLARATION_ARTICLES.find((a) => a.number === activeNumber) ?? DECLARATION_ARTICLES[0];

  const handlePrev = () => {
    setActiveNumber((cur) => (cur > 1 ? cur - 1 : DECLARATION_ARTICLES.length));
  };

  const handleNext = () => {
    setActiveNumber((cur) => (cur < DECLARATION_ARTICLES.length ? cur + 1 : 1));
  };

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
          <div className={styles.aside}>
            <Reveal index={0}>
              <p className="eyebrow eyebrow--ink">
                <span className={styles.step}>03</span>
                Documento fundacional
              </p>
            </Reveal>

            <Reveal index={1}>
              <h2 id="declaracion-titulo" className={styles.title}>
                {DECLARATION_TITLE}
              </h2>
            </Reveal>

            <Reveal index={2}>
              <p className={styles.introNote}>
                Seis compromisos rectores para salvaguardar el derecho de las nuevas generaciones a un futuro viable. Selecciona cada artículo para explorar su principio:
              </p>
            </Reveal>

            <div className={styles.tabList} role="tablist" aria-label="Artículos de la Declaración">
              {DECLARATION_ARTICLES.map((article) => {
                const isSelected = article.number === activeNumber;
                return (
                  <button
                    key={article.number}
                    type="button"
                    role="tab"
                    id={`tab-articulo-${article.number}`}
                    aria-selected={isSelected}
                    aria-controls="panel-articulo"
                    className={`${styles.tabItem} ${isSelected ? styles.tabItemActive : ''}`}
                    onClick={() => setActiveNumber(article.number)}
                  >
                    <span className={styles.tabNumber}>
                      {String(article.number).padStart(2, '0')}
                    </span>
                    <span className={styles.tabTitle}>{article.title}</span>
                  </button>
                );
              })}
            </div>

            <div className={styles.seal}>
              <BrandLogo brand="vivesperanza" height={28} tone="on-ink" />
              <p className={styles.sealNote}>
                Traducción oficial del documento registrado por la fundación.
              </p>
            </div>
          </div>

          <div className={styles.main}>
            <div
              id="panel-articulo"
              role="tabpanel"
              aria-labelledby={`tab-articulo-${activeArticle.number}`}
              className={styles.activeCard}
            >
              <div className={styles.cardHeader}>
                <span className={styles.number} aria-hidden="true">
                  {String(activeArticle.number).padStart(2, '0')}
                </span>
                <span className={styles.cardCounter}>
                  Artículo {activeArticle.number} de {DECLARATION_ARTICLES.length}
                </span>
              </div>

              <h3 className={styles.articleTitle}>{activeArticle.title}</h3>
              <p className={styles.articleText}>{activeArticle.body}</p>

              <div className={styles.navRow}>
                <button
                  type="button"
                  onClick={handlePrev}
                  className={styles.navBtn}
                  aria-label="Artículo anterior"
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                  <span>Anterior</span>
                </button>
                <div className={styles.dots} aria-hidden="true">
                  {DECLARATION_ARTICLES.map((a) => (
                    <span
                      key={a.number}
                      className={`${styles.dot} ${a.number === activeNumber ? styles.dotActive : ''}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  className={styles.navBtn}
                  aria-label="Artículo siguiente"
                >
                  <span>Siguiente</span>
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className={styles.sign}>
              <p className={styles.signLead}>
                Esta declaración se sostiene con firmas de toda América. La petición continental está abierta.
              </p>
              <div className={styles.signActions}>
                <a
                  href={DECLARATION_SIGN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--lg btn--gold"
                >
                  <span>Firmar la Declaración</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
                <a
                  href={FULL_DECLARATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.btnFullDoc}
                >
                  <FileText size={18} aria-hidden="true" />
                  <span>Leer texto íntegro</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
