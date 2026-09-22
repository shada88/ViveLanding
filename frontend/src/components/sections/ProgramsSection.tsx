import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, BookOpen } from 'lucide-react';
import { CANONICAL_PROGRAMS } from '@/domain/entities/Program';
import { Reveal } from '@/components/motion/Reveal';
import { CordThread } from '@/components/visuals/CordThread';
import { SectionIntro } from './SectionIntro';
import styles from './ProgramsSection.module.css';

/** Ancla interna de los programas que ya tienen sección propia en la página. */
const INTERNAL_ANCHORS: Record<string, string> = {
  kaleo: '#kaleo',
  'rally-continental-2028': '#territorio',
};

const COCOPERRO_IMAGE = '/Video/Cocoperro_staring_closely_20260922164931.jpeg';

/**
 * 10 — Programas del ecosistema.
 *
 * Contenido canónico: Kaleo, Rally Continental 2028 y el libro «Cocoperro y El
 * Cordón Amarillo». Forest Lovers, ViveImpact y ACT fueron retirados del
 * ecosistema y no deben reaparecer acá ni en ningún otro lugar de la página.
 *
 * Los programas se parten por TONO, no por categoría:
 *
 * - El dorado —el libro— recibe el tratamiento editorial completo, porque esta
 *   es su única aparición en la página.
 * - Los azules —Kaleo y el Rally— ya tienen sección propia y acá aparecen como
 *   entradas breves que enlazan hacia ella. Repetir su contenido entero
 *   convertiría la sección en un índice redundante.
 *
 * El cordón dorado acompaña al bloque del libro y a nada más. Es el cordón DEL
 * LIBRO, no un símbolo del ecosistema ni un recurso que atraviese la landing:
 * por eso empieza y termina dentro de este bloque.
 */
export function ProgramsSection() {
  const book = CANONICAL_PROGRAMS.find((program) => program.tone === 'gold');
  const linked = CANONICAL_PROGRAMS.filter((program) => program.tone === 'blue');

  return (
    <section id="programas" className="section section--sunken" aria-labelledby="programas-titulo">
      <div className="shell">
        <SectionIntro
          step="10"
          eyebrow="Programas"
          titleId="programas-titulo"
          title="Una plataforma, una convocatoria y un libro"
          lede="No son campañas con fecha de cierre: son líneas de trabajo sostenidas, cada una con su material, su formación docente y su forma de medir si sirvió."
        />

        {book && (
          <div className={styles.featured}>
            <CordThread align="right" />

            <Reveal as="article" className={styles.program}>
              <div className={styles.programBody}>
                <p className={styles.badge}>
                  <BookOpen size={14} aria-hidden="true" />
                  {book.badge}
                </p>
                <h3 className={`h3 ${styles.programTitle}`}>{book.title}</h3>
                <p className={styles.tagline}>{book.tagline}</p>
                <p className={styles.description}>{book.description}</p>

                <ul className={styles.highlights}>
                  {book.highlights.map((highlight) => (
                    <li key={highlight} className={styles.highlight}>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {book.externalUrl && (
                  <a
                    href={book.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--gold"
                  >
                    <span>Conseguir el libro</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                )}
              </div>

              {/* Ilustración de Cocoperro, personaje principal del libro */}
              <div className={styles.programMedia}>
                <div className={styles.imageFrame}>
                  <Image
                    src={COCOPERRO_IMAGE}
                    alt="Ilustración de Cocoperro mirando de cerca, del libro Cocoperro y El Cordón Amarillo"
                    fill
                    sizes="(max-width: 899px) 90vw, 340px"
                    className={styles.image}
                  />
                  <span className={styles.imageRim} aria-hidden="true" />
                </div>
              </div>
            </Reveal>
          </div>
        )}

        <div className={styles.linked}>
          {linked.map((program, i) => {
            const anchor = INTERNAL_ANCHORS[program.id];
            return (
              <Reveal as="article" key={program.id} index={i} className={styles.linkedItem}>
                <div>
                  <h3 className={`h3 ${styles.linkedTitle}`}>{program.title}</h3>
                  <p className={styles.linkedTagline}>{program.tagline}</p>
                </div>

                <div className={styles.linkedActions}>
                  {anchor && (
                    <a href={anchor} className="link-arrow">
                      <span>Ver en esta página</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  )}
                  {program.externalUrl && (
                    <a
                      href={program.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow link-arrow--gold"
                    >
                      <span>Abrir plataforma</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
