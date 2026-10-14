'use client';

import React from 'react';
import { ArrowDown, ArrowUpRight, Check } from 'lucide-react';
import {
  ENTRY_PATHS,
  KALEO_STEP,
  PRACTICE,
  ROUTE_A,
  ROUTE_B,
  ROUTES_INTRO,
  type EntryPath,
  type RouteAction,
} from '@/domain/entities/Route';
import { Reveal } from '@/components/motion/Reveal';
import styles from './RoutesSection.module.css';

/**
 * Sección 1, inmediatamente después del hero.
 *
 * Tres niveles en el mismo bloque: elegir el camino, entender la Ruta B y la
 * Ruta A, y dar el siguiente paso. Las tarjetas no son enlaces: solo lo es
 * su botón.
 */
export function RoutesSection() {
  return (
    <section id="rutas" className={`section ${styles.homePathways}`} aria-labelledby="rutas-titulo">
      <div className="shell">
        <header className={styles.intro}>
          <Reveal index={0}>
            <p className="eyebrow">{ROUTES_INTRO.eyebrow}</p>
          </Reveal>
          <Reveal index={1}>
            <h2 id="rutas-titulo" className={`h2 ${styles.title}`}>
              {ROUTES_INTRO.title}
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className={`lede ${styles.lede}`}>{ROUTES_INTRO.lede}</p>
          </Reveal>
          <Reveal index={3}>
            <p className={styles.cue}>{ROUTES_INTRO.cue}</p>
          </Reveal>
        </header>

        <div className={styles.stage}>
          {ENTRY_PATHS.map((path, index) => (
            <Reveal
              as="article"
              key={path.id}
              index={index}
              className={`${styles.path} ${styles[path.id]}`}
            >
              <p className={styles.kicker}>{path.label}</p>
              <h3 className={`h3 ${styles.pathTitle}`}>{path.title}</h3>
              <p className={styles.summary}>{path.summary}</p>
              <div className={styles.actions}>
                <InPageLink action={path.primary} tone={path.id} />
              </div>
            </Reveal>
          ))}
        </div>

        <article id={ROUTE_B.id} className={styles.routeB} aria-labelledby="ruta-b-titulo">
          <div className={styles.routeLayout}>
            <div>
              <p className={styles.kicker}>{ROUTE_B.label}</p>
              <h3 id="ruta-b-titulo" className={`h3 ${styles.blockTitle}`}>
                {ROUTE_B.title}
              </h3>
              <p className={styles.blockSummary}>{ROUTE_B.summary}</p>
            </div>
            <ul className={styles.points}>
              {ROUTE_B.points.map((point) => (
                <li key={point} className={styles.point}>
                  <Check size={16} aria-hidden="true" className={styles.check} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.practice}>
            <p className={styles.kicker}>{PRACTICE.label}</p>
            <h3 className={`h3 ${styles.blockTitle}`}>{PRACTICE.title}</h3>
            <p className={styles.blockSummary}>{PRACTICE.summary}</p>
            <ol className={styles.steps}>
              {PRACTICE.steps.map((step, index) => (
                <li key={step} className={styles.step}>
                  <span className={styles.stepIndex} aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className={styles.practiceActions}>
              <a href={PRACTICE.primary.href} className="btn btn--lg btn--primary">
                <span>{PRACTICE.primary.label}</span>
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a
                href={PRACTICE.program.href}
                className="link-arrow"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{PRACTICE.program.label}</span>
                <ArrowUpRight size={16} aria-hidden="true" />
                <span className="sr-only">, se abre en una pestaña nueva</span>
              </a>
            </div>
            <p className={styles.note}>{PRACTICE.note}</p>
          </div>
        </article>

        <article id={ROUTE_A.id} className={styles.routeA} aria-labelledby="ruta-a-titulo">
          <div className={styles.routeLayout}>
            <div>
              <p className={`${styles.kicker} ${styles.kickerLive}`}>
                <LiveDot />
                {ROUTE_A.label}
              </p>
              <h3 id="ruta-a-titulo" className={`h3 ${styles.blockTitle}`}>
                {ROUTE_A.title}
              </h3>
              <p className={styles.blockSummary}>{ROUTE_A.summary}</p>
            </div>
            <ul className={styles.points}>
              {ROUTE_A.points.map((point) => (
                <li key={point} className={styles.point}>
                  <Check size={16} aria-hidden="true" className={styles.check} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.kaleo} aria-labelledby="kaleo-paso-titulo">
            <p className={styles.kicker}>{KALEO_STEP.label}</p>
            <h4 id="kaleo-paso-titulo" className={styles.kaleoTitle}>
              {KALEO_STEP.title}
            </h4>
            <p className={styles.blockSummary}>{KALEO_STEP.summary}</p>
            <div className={styles.practiceActions}>
              <ExternalLink action={KALEO_STEP.primary} />
            </div>
            <p className={styles.flow}>{KALEO_STEP.flow}</p>
            <p className={styles.safety}>{KALEO_STEP.safety}</p>
            <a href={KALEO_STEP.secondary.href} className="link-arrow">
              <span>{KALEO_STEP.secondary.label}</span>
              <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}

function InPageLink({ action, tone }: { action: RouteAction; tone: EntryPath['id'] }) {
  return (
    <a href={action.href} className={buttonClass(tone)}>
      {tone === 'emergency' && <LiveDot />}
      <span>{action.label}</span>
      <ArrowDown size={18} aria-hidden="true" />
    </a>
  );
}

function ExternalLink({ action }: { action: RouteAction }) {
  return (
    <a href={action.href} className="btn btn--lg btn--primary" target="_blank" rel="noopener noreferrer">
      <span>{action.label}</span>
      <ArrowUpRight size={18} aria-hidden="true" />
      <span className="sr-only">, se abre en una pestaña nueva</span>
    </a>
  );
}

/** Señal de la Ruta A. El texto ya nombra la ruta; el punto solo la marca. */
function LiveDot() {
  return <span className={styles.pulse} aria-hidden="true" />;
}

function buttonClass(id: EntryPath['id']): string {
  if (id === 'process') return 'btn btn--lg btn--gold';
  if (id === 'emergency') return 'btn btn--lg btn--primary';
  return 'btn btn--lg btn--outline';
}
