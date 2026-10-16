'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react';
import { RALLY_PHOTOS } from '@/domain/entities/RallyPhoto';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import styles from './RallyGallery.module.css';

/** Cada cuánto avanza el carrusel solo, en milisegundos. */
const AUTOPLAY_MS = 3200;

/**
 * 03 (cierre) — El archivo fotográfico del Rally, al pie de `TerritorySection`.
 *
 * Carrusel con `scroll-snap` nativo en vez de un riel animado por transform:
 * el desplazamiento táctil, la rueda y el teclado funcionan sin una línea de
 * JavaScript, y el autoavance solo llama a `scrollBy`.
 *
 * El autoavance se detiene cuando:
 *
 * - **El puntero está encima o el foco está dentro.** Nadie puede elegir una
 *   foto que se le escapa mientras apunta.
 * - **La persona lo pausa.** Contenido que se mueve solo más de cinco segundos
 *   necesita un control para detenerlo (WCAG 2.2.2).
 * - **No se ve** o hay `prefers-reduced-motion`.
 *
 * El popup es un `<dialog>` nativo con `showModal()`: atrapa el foco, cierra con
 * Escape y devuelve el foco a la miniatura que lo abrió, sin librería.
 */
export function RallyGallery() {
  const trackRef = useRef<HTMLUListElement | null>(null);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const [paused, setPaused] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const total = RALLY_PHOTOS.length;

  /** Desplaza el carrusel una foto; al llegar al final vuelve al principio. */
  const advance = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first.offsetWidth + gap;
    const maxScroll = track.scrollWidth - track.clientWidth;

    if (direction === 1 && track.scrollLeft >= maxScroll - 4) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && track.scrollLeft <= 4) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' });
    } else {
      track.scrollBy({ left: step * direction, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  const autoplay = !reducedMotion && !paused && !hovering && onScreen && openIndex === null;

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setInterval(() => {
      if (!document.hidden) advance(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [autoplay, advance]);

  // Abrir y cerrar el <dialog> sigue al estado, no al revés: así el cierre por
  // Escape (que el navegador hace solo) y el del botón pasan por el mismo lugar.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (openIndex !== null && !dialog.open) dialog.showModal();
    if (openIndex === null && dialog.open) dialog.close();

    // Un modal no bloquea el scroll del documento por sí solo.
    document.documentElement.style.overflow = openIndex !== null ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [openIndex]);

  const show = (delta: 1 | -1) =>
    setOpenIndex((current) => (current === null ? null : (current + delta + total) % total));

  const onDialogKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(-1);
    }
  };

  // Un clic sobre el propio <dialog> —no sobre su contenido— cae en el fondo.
  const onDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) setOpenIndex(null);
  };

  const current = openIndex === null ? null : RALLY_PHOTOS[openIndex];

  return (
    <div className={styles.gallery}>
      <div className={styles.head}>
        <div>
          <p className={styles.eyebrow}>Archivo del Rally</p>
          <h3 className={styles.title}>Así se vive el Rally en las escuelas</h3>
        </div>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            onClick={() => advance(-1)}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          {!reducedMotion ? (
            <button
              type="button"
              className={styles.control}
              onClick={() => setPaused((value) => !value)}
              aria-pressed={paused}
              aria-label={paused ? 'Reanudar el carrusel' : 'Pausar el carrusel'}
            >
              {paused ? (
                <Play size={16} aria-hidden="true" />
              ) : (
                <Pause size={16} aria-hidden="true" />
              )}
            </button>
          ) : null}
          <button
            type="button"
            className={styles.control}
            onClick={() => advance(1)}
            aria-label="Foto siguiente"
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        className={styles.track}
        aria-label="Fotografías de ediciones anteriores del Rally"
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
        onFocus={() => setHovering(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHovering(false);
        }}
      >
        {RALLY_PHOTOS.map((photo, i) => (
          <li key={photo.src} className={styles.slide}>
            <button
              type="button"
              className={styles.thumb}
              onClick={() => setOpenIndex(i)}
              aria-label={`Ampliar: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt=""
                fill
                sizes="(max-width: 599px) 78vw, 340px"
                loading="lazy"
                className={styles.thumbImage}
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        aria-label="Fotografía ampliada del Rally"
        onClose={() => setOpenIndex(null)}
        onClick={onDialogClick}
        onKeyDown={onDialogKeyDown}
      >
        {current ? (
          <figure className={styles.figure}>
            <div className={styles.frame}>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="92vw"
                className={styles.fullImage}
              />
            </div>
            <figcaption className={styles.caption}>
              {(openIndex ?? 0) + 1} / {total}
            </figcaption>
          </figure>
        ) : null}

        <button
          type="button"
          className={`${styles.control} ${styles.close}`}
          onClick={() => setOpenIndex(null)}
          aria-label="Cerrar la foto"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.control} ${styles.nav} ${styles.navPrev}`}
          onClick={() => show(-1)}
          aria-label="Foto anterior"
        >
          <ChevronLeft size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          className={`${styles.control} ${styles.nav} ${styles.navNext}`}
          onClick={() => show(1)}
          aria-label="Foto siguiente"
        >
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      </dialog>
    </div>
  );
}
