import React from 'react';
import { CANONICAL_LEADERSHIP, ORIGIN_SAGA } from '@/domain/entities/Institutional';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './OriginAndCommitteeSection.module.css';

/**
 * 09 — El origen y quienes lo sostienen.
 *
 * Puente narrativo hacia ATRÁS: la sección anterior presentó a las siete aves
 * y esta cuenta de dónde salieron. El orden lo fijó el recorrido —Las Voces
 * del Bosque va inmediatamente después del Rally— así que el texto puente
 * cierra la historia en lugar de anunciarla. Si alguna vez se reordena y
 * Origen vuelve a quedar antes, hay que darlo vuelta otra vez: un puente que
 * apunta al lado equivocado desorienta más que no tener ninguno.
 *
 * Las personas del comité van con su nombre, su cargo y su trayectoria en
 * texto: es la sección que sostiene la credibilidad institucional de todo lo
 * anterior, y ahí las fotos de archivo restan en lugar de sumar.
 */
export function OriginAndCommitteeSection() {
  return (
    <section id="origen" className="section" aria-labelledby="origen-titulo">
      <div className="shell">
        <SectionIntro
          step="09"
          eyebrow="El origen"
          titleId="origen-titulo"
          title={ORIGIN_SAGA.title}
          lede={ORIGIN_SAGA.lead}
        />

        <div className={styles.layout}>
          <Reveal className={styles.narrative}>
            <p className={styles.narrativeBody}>{ORIGIN_SAGA.narrative}</p>
            <p className={styles.bridge}>
              De esa historia salieron las siete voces que hoy enseñan en las aulas del
              continente: Esperanza, Ojopelao, Silvio, Saggy, Lilo, Carla y Omar.
            </p>
          </Reveal>

          <div className={styles.committee}>
            <h3 className={styles.committeeTitle}>Comité y liderazgo</h3>

            <ul className={styles.people}>
              {CANONICAL_LEADERSHIP.map((leader, i) => (
                <Reveal as="li" key={leader.name} index={i} className={styles.person}>
                  <p className={styles.personBadge}>{leader.badge}</p>
                  <p className={styles.personName}>{leader.name}</p>
                  <p className={styles.personRole}>{leader.role}</p>
                  <p className={styles.personBio}>{leader.bio}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
