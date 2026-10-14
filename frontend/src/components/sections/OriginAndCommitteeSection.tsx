import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  FOUNDERS_LEADERSHIP,
  HISTORICAL_RECOGNITION,
  INSTITUTIONAL_IDENTITY,
} from '@/domain/entities/Institutional';
import { Reveal } from '@/components/motion/Reveal';
import styles from './OriginAndCommitteeSection.module.css';

/**
 * 07 — Cápsula de confianza: quién está detrás.
 *
 * Una BARRA de respaldo, no cuatro tarjetas biográficas. Quien está a punto de
 * registrarse necesita saber que hay una institución real —nombre legal, NIT,
 * personas con cargo— y no leer cuatro biografías. Las biografías completas
 * viven en `/sobre-nosotros#equipo`.
 *
 * Los nombres van separados por filetes, sin cajas: es una línea de firmas, no
 * un catálogo de perfiles.
 */
export function OriginAndCommitteeSection() {
  const people = [...FOUNDERS_LEADERSHIP, ...HISTORICAL_RECOGNITION];

  return (
    <section id="respaldo" className="section section--tight" aria-labelledby="respaldo-titulo">
      <div className="shell">
        <div className={styles.bar}>
          <Reveal className={styles.identity}>
            <p className="eyebrow">Quién está detrás</p>
            <h2 id="respaldo-titulo" className={styles.title}>
              {INSTITUTIONAL_IDENTITY.legalName}
            </h2>
            <p className={styles.legal}>
              NIT {INSTITUTIONAL_IDENTITY.nit} · {INSTITUTIONAL_IDENTITY.scope}
            </p>
          </Reveal>

          <Reveal className={styles.governance}>
            <h3 className={styles.label}>Gobernanza y reconocimientos históricos</h3>
            <ul className={styles.people}>
              {people.map((person) => (
                <li key={person.name} className={styles.person}>
                  <span className={styles.name}>{person.name}</span>
                  <span className={styles.role}>{person.shortRole}</span>
                </li>
              ))}
            </ul>

            <p className={styles.support}>
              <span className={styles.label}>Apoyo histórico al Rally</span>
              <span className={styles.supportList}>
                {INSTITUTIONAL_IDENTITY.historicalSupport.join(' · ')}
              </span>
            </p>

            <Link href="/sobre-nosotros#equipo" className="link-arrow link-arrow--gold">
              <span>Ver los perfiles completos en Sobre Nosotros</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
