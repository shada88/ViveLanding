import React from 'react';
import {
  COMMITTEE_SECTION_DATA,
  FOUNDERS_LEADERSHIP,
  HISTORICAL_RECOGNITION,
} from '@/domain/entities/Institutional';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './OriginAndCommitteeSection.module.css';

/**
 * 10 — Comité y Liderazgo de la Fundación.
 *
 * Estructura clara de gobernanza, trayectoria e integrantes:
 * 1. Destacados y Liderazgo: Fernando Rafael García García (Fundador) y Rocío Galvis Guerrero.
 * 2. Personas Emblemáticas / Reconocimiento Histórico: Sonia Mora y Aurora Zegarra Huapaya.
 *
 * Libritos de Esperanza se desvincula de esta sección (vive en Tienda & Publicaciones).
 */
export function OriginAndCommitteeSection() {
  return (
    <section id="origen" className="section" aria-labelledby="origen-titulo">
      <div className="shell">
        <SectionIntro
          step={COMMITTEE_SECTION_DATA.step}
          eyebrow={COMMITTEE_SECTION_DATA.eyebrow}
          titleId="origen-titulo"
          title={COMMITTEE_SECTION_DATA.title}
          lede={COMMITTEE_SECTION_DATA.lede}
        />

        <div className={styles.sectionsContainer}>
          {/* ── 1. Destacados y Liderazgo Fundador ── */}
          <div className={styles.block}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>Destacados y Liderazgo</h3>
              <span className={styles.blockTag}>Fundación</span>
            </div>

            <div className={`${styles.cardsGrid} ${styles.cardsGridTwo}`}>
              {FOUNDERS_LEADERSHIP.map((leader, i) => (
                <Reveal as="article" key={leader.name} index={i} className={styles.card}>
                  <p className={styles.cardBadge}>{leader.badge}</p>
                  <h4 className={styles.cardName}>{leader.name}</h4>
                  <p className={styles.cardRole}>{leader.role}</p>
                  <p className={styles.cardBio}>{leader.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── 2. Personas Emblemáticas / Reconocimiento Histórico ── */}
          <div className={styles.block}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>Personas Emblemáticas / Reconocimiento Histórico</h3>
              <span className={styles.blockTag}>Legado Continental</span>
            </div>

            <div className={styles.cardsGrid}>
              {HISTORICAL_RECOGNITION.map((person, i) => (
                <Reveal
                  as="article"
                  key={person.name}
                  index={i}
                  className={`${styles.card} ${styles.cardHistorical}`}
                >
                  <p className={styles.cardBadge}>{person.badge}</p>
                  <h4 className={styles.cardName}>{person.name}</h4>
                  <p className={styles.cardRole}>{person.role}</p>
                  <p className={styles.cardBio}>{person.bio}</p>
                  {person.note && <p className={styles.historicalNote}>{person.note}</p>}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
