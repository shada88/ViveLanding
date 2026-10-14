'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown } from 'lucide-react';
import {
  COLLABORATION,
  ENTRY_PATHS,
  KALEO_STEP,
  PRACTICE,
  ROUTE_A,
  ROUTE_B,
  ROUTES_INTRO,
  type EntryPath,
  type RouteAction,
} from '@/domain/entities/Route';
import { BANCO_VIVO, BANCO_VIVO_GAINS } from '@/domain/entities/BancoVivo';
import { KALEO_DATA } from '@/domain/entities/Kaleo';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { Reveal } from '@/components/motion/Reveal';
import styles from './RoutesSection.module.css';

type PanelId = 'ruta-b' | 'ruta-a' | 'colaboraciones';

const PANEL_FROM_HASH: Record<string, PanelId> = {
  '#ruta-b': 'ruta-b',
  '#ruta-a': 'ruta-a',
  '#colaboraciones': 'colaboraciones',
  '#kaleo': 'colaboraciones',
  '#banco-vivo': 'colaboraciones',
};

/**
 * Sección 1, inmediatamente después del hero.
 *
 * Tres caminos y tres cuadros. Colaboraciones reúne lo que antes era la
 * sección Kaleo y Banco Vivo. Las tarjetas no son enlaces: solo lo es su botón.
 *
 * Cada cuadro es un desplegable. El título permanece visible. El detalle se
 * abre con el cuadro o con el botón de arriba, para que un ancla no llegue a
 * un panel cerrado.
 */
export function RoutesSection() {
  const routeBRef = useRef<HTMLDetailsElement>(null);
  const routeARef = useRef<HTMLDetailsElement>(null);
  const collaborationRef = useRef<HTMLDetailsElement>(null);

  const openPanel = (id: PanelId) => {
    const target =
      id === 'ruta-b' ? routeBRef.current : id === 'ruta-a' ? routeARef.current : collaborationRef.current;
    if (target) target.open = true;
  };

  useEffect(() => {
    const openFromHash = () => {
      const panel = PANEL_FROM_HASH[window.location.hash];
      if (panel) openPanel(panel);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

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
                <InPageLink
                  action={path.primary}
                  tone={path.id}
                  onOpen={
                    path.primary.href === '#ruta-b' ||
                    path.primary.href === '#ruta-a' ||
                    path.primary.href === '#colaboraciones'
                      ? () => openPanel(path.primary.href.slice(1) as PanelId)
                      : undefined
                  }
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.presentation}>
          <article id={ROUTE_B.id} className={styles.routeB} aria-labelledby="ruta-b-titulo">
            <details ref={routeBRef} className={styles.disclosure}>
              <summary className={styles.disclosureSummary}>
                <span className={styles.summaryCopy}>
                  <span className={styles.kicker}>{ROUTE_B.label}</span>
                  <h3 id="ruta-b-titulo" className={`h3 ${styles.blockTitle}`}>
                    {ROUTE_B.title}
                  </h3>
                  <span className={styles.blockSummary}>{ROUTE_B.summary}</span>
                </span>
                <RouteSketch
                  src="/recursos/ruta-b-perro-paloma.png"
                  width={740}
                  height={901}
                  sizes="136px"
                  alt="Perro sentado con una paloma sobre la cabeza"
                />
                <ChevronDown size={22} aria-hidden="true" className={styles.chevron} />
              </summary>
              <div className={styles.disclosureBody}>
                <BeatList
                  id="ruta-b-puntos"
                  items={ROUTE_B.points}
                  mode="points"
                  listLabel="Puntos de la Ruta B"
                  previousLabel="Anterior en los puntos de la Ruta B"
                  nextLabel="Siguiente en los puntos de la Ruta B"
                />
                <div className={styles.practice}>
                  <p className={styles.kicker}>{PRACTICE.label}</p>
                  <h3 id="ruta-b-practica" className={`h3 ${styles.blockTitle}`}>
                    {PRACTICE.title}
                  </h3>
                  <p className={styles.blockSummary}>{PRACTICE.summary}</p>
                  <BeatList
                    id="ruta-b-pasos"
                    items={PRACTICE.steps}
                    mode="steps"
                    listLabel="Pasos de la práctica"
                    previousLabel="Paso anterior de la práctica"
                    nextLabel="Paso siguiente de la práctica"
                  />
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
              </div>
            </details>
          </article>

          <article id={ROUTE_A.id} className={styles.routeA} aria-labelledby="ruta-a-titulo">
            <details ref={routeARef} className={styles.disclosure}>
              <summary className={styles.disclosureSummary}>
                <span className={styles.summaryCopy}>
                  <span className={`${styles.kicker} ${styles.kickerLive}`}>
                    <LiveDot />
                    {ROUTE_A.label}
                  </span>
                  <h3 id="ruta-a-titulo" className={`h3 ${styles.blockTitle}`}>
                    {ROUTE_A.title}
                  </h3>
                  <span className={styles.blockSummary}>{ROUTE_A.summary}</span>
                </span>
                <RouteSketch
                  src="/recursos/ruta-a-perro-paloma.png"
                  width={1109}
                  height={602}
                  sizes="288px"
                  alt="Perro recostado junto a una paloma"
                />
                <ChevronDown size={22} aria-hidden="true" className={styles.chevron} />
              </summary>
              <div className={styles.disclosureBody}>
                <BeatList
                  id="ruta-a-puntos"
                  items={ROUTE_A.points}
                  mode="points"
                  listLabel="Orientaciones de la Ruta A"
                  previousLabel="Anterior en la Ruta A"
                  nextLabel="Siguiente en la Ruta A"
                />
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
              </div>
            </details>
          </article>

          <article
            id={COLLABORATION.id}
            className={styles.collaboration}
            aria-labelledby="colaboraciones-titulo"
          >
            <div id="kaleo" className={styles.anchorAlias} />
            <div id="banco-vivo" className={styles.anchorAlias} />
            <details ref={collaborationRef} className={styles.disclosure}>
              <summary className={styles.disclosureSummary}>
                <span className={styles.summaryCopy}>
                  <span className={styles.kicker}>{COLLABORATION.label}</span>
                  <h3 id="colaboraciones-titulo" className={`h3 ${styles.blockTitle}`}>
                    {COLLABORATION.title}
                  </h3>
                  <span className={styles.blockSummary}>{COLLABORATION.summary}</span>
                </span>
                <RouteSketch
                  src="/recursos/colaboraciones-perro-paloma.png"
                  width={926}
                  height={896}
                  sizes="(min-width: 980px) 184px, 144px"
                  alt="Perro de pie y una paloma en vuelo"
                />
                <ChevronDown size={22} aria-hidden="true" className={styles.chevron} />
              </summary>
              <div className={styles.disclosureBody}>
                <div className={styles.ways}>
                  <div className={styles.way}>
                    <p className={styles.kicker}>{COLLABORATION.contributeLabel}</p>
                    <Image
                      src={BANCO_VIVO.logo}
                      alt={BANCO_VIVO.logoAlt}
                      width={980}
                      height={244}
                      className={styles.bancoMark}
                    />
                    <p className={styles.wayBody}>
                      <strong>Directivos y docentes:</strong> {COLLABORATION.contributeBody.schools}{' '}
                      <strong>Profesionales:</strong> {COLLABORATION.contributeBody.professionals}
                    </p>
                    <p className={styles.wayLabel}>{COLLABORATION.gainsLabel}</p>
                    <ul className={styles.gainList}>
                      {BANCO_VIVO_GAINS.map((gain) => (
                        <li key={gain.label} className={styles.gain}>
                          <p className={styles.gainLabel}>{gain.label}</p>
                          <p className={styles.gainBody}>{gain.body}</p>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.practiceActions}>
                      <a
                        href={KALEO_DATA.paths.wantToHelp.url}
                        className="btn btn--lg btn--gold"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{COLLABORATION.shareLabel}</span>
                        <ArrowUpRight size={18} aria-hidden="true" />
                        <span className="sr-only">, se abre en una pestaña nueva</span>
                      </a>
                      <a href={BANCO_VIVO.legalDocument} className="link-arrow" download>
                        <span>{COLLABORATION.legalLabel}</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </a>
                    </div>
                  </div>

                  <div className={styles.way}>
                    <p className={styles.kicker}>{COLLABORATION.orientLabel}</p>
                    <div className={styles.kaleoRow}>
                      <a
                        href={KALEO_DATA.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.brandLink}
                      >
                        <BrandLogo brand="kaleo" height={44} tone="on-ink" />
                        <span className="sr-only">, se abre en una pestaña nueva</span>
                      </a>
                      <span className={styles.by}>{KALEO_DATA.byText}</span>
                    </div>
                    <p className={styles.wayBody}>{COLLABORATION.orientBody}</p>
                    <ul className={styles.pillarList}>
                      {KALEO_DATA.pillars.map((pillar) => (
                        <li key={pillar.title} className={styles.pillarItem}>
                          <span className={styles.pillarTitle}>{pillar.title}</span>
                          <span className={styles.pillarBody}>{pillar.description}</span>
                        </li>
                      ))}
                    </ul>
                    <div className={styles.practiceActions}>
                      <a
                        href={KALEO_DATA.paths.needHelp.url}
                        className="btn btn--lg btn--primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{COLLABORATION.requestLabel}</span>
                        <ArrowUpRight size={18} aria-hidden="true" />
                        <span className="sr-only">, se abre en una pestaña nueva</span>
                      </a>
                      <a
                        href={KALEO_DATA.appUrl}
                        className="link-arrow"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>{COLLABORATION.platformLabel}</span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                        <span className="sr-only">, se abre en una pestaña nueva</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className={styles.collabClose}>
                  <p className={styles.note}>{KALEO_DATA.coreValue}</p>
                  <p className={styles.safety}>
                    {BANCO_VIVO.disclaimer} {COLLABORATION.kaleoLimit}
                  </p>
                  <a href="#alianzas" className="link-arrow">
                    <span>{COLLABORATION.alliancesLabel}</span>
                    <ArrowDown size={16} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </details>
          </article>
        </div>
      </div>
    </section>
  );
}

/**
 * Recorrido de un cuadro.
 *
 * No es un grupo de pestañas: cada ítem sigue en la página. Una sola parada
 * de tabulación; las flechas mueven el nodo activo y el foco lo sigue.
 * Anterior y Siguiente dan la vuelta, sin anunciar un protocolo cerrado.
 */
function RouteSketch({
  src,
  width,
  height,
  sizes,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  sizes: string;
  alt: string;
}) {
  return (
    <span className={styles.sketch}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        quality={90}
        className={styles.sketchImage}
      />
    </span>
  );
}

function BeatList({
  id,
  items,
  mode,
  listLabel,
  previousLabel,
  nextLabel,
}: {
  id: string;
  items: readonly string[];
  mode: 'steps' | 'points';
  listLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState('');
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const last = items.length - 1;

  const select = (next: number, moveFocus: boolean) => {
    const resolved = (next + items.length) % items.length;
    setIndex(resolved);
    setLive(`${resolved + 1} de ${items.length}. ${items[resolved]}`);
    if (moveFocus) refs.current[resolved]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        select(index + 1, true);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        select(index - 1, true);
        break;
      case 'Home':
        event.preventDefault();
        select(0, true);
        break;
      case 'End':
        event.preventDefault();
        select(last, true);
        break;
      default:
        break;
    }
  };

  const status = mode === 'steps' ? `Paso ${index + 1} de ${items.length}` : `${index + 1} de ${items.length}`;
  const progress = last === 0 ? 0 : index / last;
  const ListTag = mode === 'steps' ? 'ol' : 'ul';
  const list = (
      <ListTag
        id={id}
        className={mode === 'steps' ? styles.steps : styles.points}
        aria-label={listLabel}
        onKeyDown={onKeyDown}
      >
        {items.map((item, itemIndex) => {
          const isCurrent = itemIndex === index;
          return (
            <li key={item} className={mode === 'steps' ? styles.step : styles.point}>
              <button
                ref={(node) => {
                  refs.current[itemIndex] = node;
                }}
                type="button"
                className={mode === 'steps' ? styles.stepBtn : styles.pointBtn}
                aria-current={isCurrent ? (mode === 'steps' ? 'step' : 'true') : undefined}
                tabIndex={isCurrent ? 0 : -1}
                onClick={() => select(itemIndex, false)}
              >
                {mode === 'steps' ? (
                  <span className={styles.stepIndex} aria-hidden="true">
                    {itemIndex + 1}
                  </span>
                ) : (
                  <Check size={16} aria-hidden="true" className={styles.check} />
                )}
                <span className={mode === 'steps' ? styles.stepLabel : undefined}>{item}</span>
              </button>
            </li>
          );
        })}
      </ListTag>
    );

  return (
    <div className={styles.beat}>
      <div className={styles.deckBar}>
        <p className={styles.deckStatus}>
          {mode === 'points' && (
            <span className={styles.deckNodes} aria-hidden="true">
              {items.map((item, itemIndex) => (
                <span
                  key={item}
                  className={itemIndex === index ? styles.deckNodeOn : styles.deckNode}
                />
              ))}
            </span>
          )}
          {status}
        </p>
        <div className={styles.deckNav}>
          <button
            type="button"
            className={styles.deckBtn}
            aria-controls={id}
            aria-label={previousLabel}
            onClick={() => select(index - 1, false)}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Anterior</span>
          </button>
          <button
            type="button"
            className={styles.deckBtn}
            aria-controls={id}
            aria-label={nextLabel}
            onClick={() => select(index + 1, false)}
          >
            <span>Siguiente</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {live}
      </p>
      {mode === 'steps' ? (
        <div className={styles.stepsWrap}>
          <span className={styles.stepTrack} aria-hidden="true">
            <span className={styles.stepFill} style={{ width: `${progress * 100}%` }} />
          </span>
          {list}
        </div>
      ) : (
        list
      )}
    </div>
  );
}

function InPageLink({
  action,
  tone,
  onOpen,
}: {
  action: RouteAction;
  tone: EntryPath['id'];
  onOpen?: () => void;
}) {
  return (
    <a href={action.href} className={buttonClass(tone)} onClick={onOpen}>
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
