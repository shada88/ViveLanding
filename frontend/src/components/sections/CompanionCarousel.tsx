'use client';

import React, { useEffect, useId, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  COMPANION_ORGANIZATIONS,
  COMPANIONS_COPY,
} from '@/domain/entities/CompanionOrganization';
import styles from './CompanionCarousel.module.css';

const STEP_MS = 4800;

function stepSize(track: HTMLElement): number {
  const item = track.querySelector<HTMLElement>('[data-item]');
  if (!item) return track.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(track).columnGap || '0');
  return item.getBoundingClientRect().width + (Number.isFinite(gap) ? gap : 0);
}

/**
 * Carrusel de la sección 4, debajo de los cuatro sectores. El desplazamiento
 * solo avanza si nadie está encima o dentro del bloque, y no arranca cuando
 * el sistema pide menos movimiento.
 */
export function CompanionCarousel() {
  const titleId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const reduce = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      reduce.current = media.matches;
    };
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  const advance = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const behavior: ScrollBehavior = reduce.current ? 'auto' : 'smooth';
    const next = track.scrollLeft + stepSize(track) * direction;
    if (direction === 1 && next >= max - 2) {
      track.scrollTo({ left: 0, behavior });
      return;
    }
    if (direction === -1 && track.scrollLeft <= 2) {
      track.scrollTo({ left: max, behavior });
      return;
    }
    track.scrollBy({ left: stepSize(track) * direction, behavior });
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (paused.current || reduce.current || document.hidden) return;
      advance(1);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, []);

  const hold = () => {
    paused.current = true;
  };

  const release = (next: EventTarget | null) => {
    const root = rootRef.current;
    if (root && next instanceof Node && root.contains(next)) return;
    paused.current = false;
  };

  return (
    <div
      ref={rootRef}
      className={styles.companions}
      aria-labelledby={titleId}
      onPointerEnter={hold}
      onPointerLeave={(event) => release(event.relatedTarget)}
      onFocusCapture={hold}
      onBlurCapture={(event) => release(event.relatedTarget)}
    >
      <div className={styles.head}>
        <div className={styles.copy}>
          <h3 id={titleId} className={styles.title}>
            {COMPANIONS_COPY.title}
          </h3>
          <p className={styles.lede}>{COMPANIONS_COPY.lede}</p>
        </div>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="Ver organizaciones anteriores"
            onClick={() => advance(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="Ver organizaciones siguientes"
            onClick={() => advance(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className={styles.track}
        tabIndex={0}
        aria-label="Logotipos de las organizaciones"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            advance(1);
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            advance(-1);
          }
        }}
      >
        {COMPANION_ORGANIZATIONS.map((organization) => (
          <li key={organization.id} className={styles.item} data-item>
            <div className={styles.plate}>
              {organization.logo ? (
                <img
                  src={organization.logo}
                  alt={organization.name}
                  width={organization.width}
                  height={organization.height}
                  className={styles.logo}
                  draggable={false}
                />
              ) : (
                <p className={styles.pending}>{organization.name}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
