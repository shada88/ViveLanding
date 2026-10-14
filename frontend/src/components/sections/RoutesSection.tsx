'use client';

import React from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ShieldAlert } from 'lucide-react';
import {
  CONTRIBUTE_LINK,
  ROUTES_INTRO,
  SCHOOL_ROUTES,
  type RouteAction,
} from '@/domain/entities/Route';
import { selectParticipationRole } from '@/lib/participation';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './RoutesSection.module.css';

/**
 * 01 — Elige tu ruta.
 *
 * La auto-segmentación del recorrido: la persona responde «¿qué necesito hoy?»
 * y la página deja de hablarle a todos para hablarle a ella.
 *
 * Esta sección DECIDE, no detalla. El índice completo de instrumentos de cada
 * ruta vive en Herramientas, justo debajo; el enlace principal de cada panel
 * abre ese desplegable por su ancla (`#ruta-process`, `#ruta-emergency`).
 * Repetir acá los ocho instrumentos convertiría la decisión en una lectura.
 */
export function RoutesSection() {
  return (
    <section id="rutas" className="section" aria-labelledby="rutas-titulo">
      <div className="shell">
        <SectionIntro
          step="01"
          eyebrow={ROUTES_INTRO.eyebrow}
          titleId="rutas-titulo"
          title={ROUTES_INTRO.title}
          lede={ROUTES_INTRO.lede}
        />

        {/* Pares: mismo tamaño y misma altura táctil. Se distinguen por tono. */}
        <div className={styles.routes}>
          {SCHOOL_ROUTES.map((route, i) => (
            <Reveal
              as="article"
              key={route.id}
              index={i}
              className={`${styles.route} ${route.id === 'process' ? styles.routeLead : ''}`}
            >
              <p className={styles.kicker}>
                <span className={styles.code}>{route.code}</span>
                {route.kicker}
              </p>
              <h3 className={`h3 ${styles.title}`}>{route.title}</h3>
              <p className={styles.summary}>{route.summary}</p>

              <ul className={styles.highlights}>
                {route.highlights.map((item) => (
                  <li key={item} className={styles.highlight}>
                    <Check size={16} aria-hidden="true" className={styles.check} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {route.safetyNote && (
                <p className={styles.safety}>
                  <ShieldAlert size={16} aria-hidden="true" className={styles.safetyIcon} />
                  <span>{route.safetyNote}</span>
                </p>
              )}

              <div className={styles.actions}>
                <a
                  href={route.primary.href}
                  className={`btn btn--lg btn--block ${
                    route.id === 'process' ? 'btn--primary' : 'btn--outline'
                  }`}
                >
                  <span>{route.primary.label}</span>
                  <ArrowDown size={18} aria-hidden="true" />
                </a>
                <SecondaryLink action={route.secondary} />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className={styles.contribute}>
          <p>
            {CONTRIBUTE_LINK.lead}{' '}
            <a href={CONTRIBUTE_LINK.href} className="link-arrow link-arrow--gold">
              <span>{CONTRIBUTE_LINK.label}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function SecondaryLink({ action }: { action: RouteAction }) {
  if (action.external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className="link-arrow"
      >
        <span>{action.label}</span>
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    );
  }

  // Conversar sobre la Ruta B es, en la práctica, registrarse como escuela.
  return (
    <a
      href={action.href}
      className="link-arrow"
      onClick={() => selectParticipationRole('escuelas')}
    >
      <span>{action.label}</span>
      <ArrowRight size={16} aria-hidden="true" />
    </a>
  );
}
