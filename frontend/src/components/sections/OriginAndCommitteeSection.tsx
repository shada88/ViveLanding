import React from 'react';
import {
  ACTIVE_COMMITTEE,
  COMMITTEE_SECTION_DATA,
  FOUNDERS_LEADERSHIP,
  HISTORICAL_RECOGNITION,
} from '@/domain/entities/Institutional';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './OriginAndCommitteeSection.module.css';

/**
 * 09 — Comité y Liderazgo de la Fundación.
 *
 * Estructura clara de gobernanza, trayectoria e integrantes:
 * 1. Destacados y Liderazgo: Fernando Galvis (Fundador) y Rocío Galvis Guerrero.
 * 2. Personas Emblemáticas / Reconocimiento Histórico: Sonia Mora (explicando
 *    su impacto y especificando que ya no forma parte directa actualmente).
 * 3. Integrantes Actuales: Equipo y comités que coordinan el trabajo en terreno hoy.
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

          {/* ── 3. Integrantes Actuales: Equipo / Comité Activo ── */}
          <div className={styles.block}>
            <div className={styles.blockHeader}>
              <h3 className={styles.blockTitle}>Integrantes Actuales del Comité</h3>
              <span className={styles.blockTag}>En Territorio</span>
            </div>

            <div className={`${styles.cardsGrid} ${styles.cardsGridThree}`}>
              {ACTIVE_COMMITTEE.map((member, i) => (
                <Reveal as="article" key={member.name} index={i} className={styles.card}>
                  <p className={`${styles.cardBadge} ${styles.cardBadgeActive}`}>
                    {member.badge}
                  </p>
                  <h4 className={styles.cardName}>{member.name}</h4>
                  <p className={styles.cardRole}>{member.role}</p>
                  <p className={styles.cardBio}>{member.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
