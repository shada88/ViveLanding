'use client';

import React, { useId, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import {
  ALLIANCE_SECTORS,
  ALLIANCES_FOOTNOTE,
  ALLIANCES_INTRO,
} from '@/domain/entities/Alliance';
import { selectParticipationRole } from '@/lib/participation';
import { Reveal } from '@/components/motion/Reveal';
import { CompanionCarousel } from './CompanionCarousel';
import { SectionIntro } from './SectionIntro';
import styles from './AlliancesSection.module.css';

/**
 * 04 — Alianzas. «¿Mi organización cómo encaja acá?»
 *
 * Un acordeón y no cuatro tarjetas: la persona busca SU sector, no compara los
 * cuatro. Abierto de a uno, cada sector se lee completo sin competir con los
 * demás; cerrados, los cuatro rótulos caben en una pantalla.
 *
 * El primer sector arranca abierto para que la sección muestre de entrada qué
 * hay detrás de cada rótulo. Todos los CTA llevan al mismo formulario con el
 * interés de alianza ya elegido.
 */
export function AlliancesSection() {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(ALLIANCE_SECTORS[0].id);

  return (
    <section id="alianzas" className="section" aria-labelledby="alianzas-titulo">
      <div className="shell">
        <div className={styles.layout}>
          <SectionIntro
            className={styles.intro}
            step="04"
            eyebrow={ALLIANCES_INTRO.eyebrow}
            titleId="alianzas-titulo"
            title={ALLIANCES_INTRO.title}
            lede={ALLIANCES_INTRO.lede}
          />

          <Reveal className={styles.accordion}>
            {ALLIANCE_SECTORS.map((sector) => {
              const isOpen = openId === sector.id;
              const triggerId = `${baseId}-${sector.id}-boton`;
              const panelId = `${baseId}-${sector.id}-panel`;

              return (
                <div
                  key={sector.id}
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}
                >
                  <h3 className={styles.heading}>
                    <button
                      id={triggerId}
                      type="button"
                      className={styles.trigger}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenId(isOpen ? null : sector.id)}
                    >
                      <span className={styles.triggerCopy}>
                        <span className={styles.sector}>{sector.sector}</span>
                        <span className={styles.title}>{sector.title}</span>
                      </span>
                      <ChevronDown size={20} aria-hidden="true" className={styles.chevron} />
                    </button>
                  </h3>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className={styles.panel}
                    hidden={!isOpen}
                  >
                    <p className={styles.body}>{sector.body}</p>
                    <a
                      href="#participar"
                      className="link-arrow link-arrow--gold"
                      onClick={() => selectParticipationRole('aliados')}
                    >
                      <span>{sector.cta}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              );
            })}

            <p className={styles.footnote}>{ALLIANCES_FOOTNOTE}</p>
          </Reveal>
        </div>

        <CompanionCarousel />
      </div>
    </section>
  );
}
