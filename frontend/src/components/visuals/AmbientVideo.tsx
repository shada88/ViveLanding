'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import styles from './AmbientVideo.module.css';

interface AmbientVideoProps {
  src: string;
  /** Descripción para quien no puede ver el video. No es decorativo: cuenta algo. */
  description: string;
  /**
   * `organic` recorta el video en una forma irregular y lo trata como pieza
   * dentro de una composición. `backdrop` lo extiende como fondo de la sección
   * completa, detrás del contenido.
   */
  variant?: 'organic' | 'backdrop';
  className?: string;
}

/**
 * Video atmosférico — la paloma y el perro bajo la lluvia.
 *
 * Es una pieza NARRATIVA, no un reproductor: Esperanza es una paloma y
 * Cocoperro es un perro; los dos personajes centrales de la fundación
 * encontrándose bajo la lluvia es la escena fundacional entera en seis segundos.
 *
 * Reglas de carga, en orden de importancia:
 *
 * - **No se descarga hasta que hace falta.** El `src` se monta recién cuando
 *   el bloque se acerca a la pantalla. Un `<video>` con `src` en el HTML pide
 *   bytes durante la carga inicial aunque esté tres pantallas más abajo.
 * - **`preload="metadata"`, nunca `auto`.** Alcanza para tener un primer
 *   cuadro que mostrar; `auto` traería los 2,8 MB completos.
 * - **Se pausa al salir de pantalla.** Decodificar video que nadie ve es la
 *   forma más cara de gastar batería.
 * - **Con movimiento reducido no reproduce.** Queda el primer cuadro fijo: la
 *   escena sigue contándose, sin movimiento. Por eso `preload` sigue siendo
 *   `metadata` incluso ahí — sin metadatos no habría nada que mostrar.
 * - **`Save-Data` manda.** Si la persona pidió ahorrar datos, el video
 *   sencillamente no se carga.
 */
export function AmbientVideo({
  src,
  description,
  variant = 'organic',
  className = '',
}: AmbientVideoProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // `connection` no está en el tipado estándar de Navigator: es una API de
    // borrador. Se consulta con guardas en vez de ampliar el tipo global por
    // una sola lectura opcional.
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoRef.current?.pause();
          return;
        }

        setSource((current) => current ?? src);

        const video = videoRef.current;
        if (!video || reducedMotion) return;
        // `play()` devuelve una promesa que RECHAZA si el navegador bloquea la
        // reproducción. Sin el catch aparece un error no capturado en consola
        // por algo perfectamente esperable.
        void video.play().catch(() => undefined);
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [src, reducedMotion]);

  const isBackdrop = variant === 'backdrop';

  return (
    <div
      ref={hostRef}
      className={`${isBackdrop ? styles.backdrop : styles.host} ${className}`}
      // En modo fondo la pieza es puramente ambiental y no debe interceptar
      // nada: la descripción viaja igual en texto, más abajo.
      aria-hidden={isBackdrop ? true : undefined}
    >
      <div className={isBackdrop ? styles.bleed : styles.frame}>
        <video
          ref={videoRef}
          className={styles.video}
          src={source ?? undefined}
          muted
          loop
          playsInline
          // `disablePictureInPicture` y el menú contextual apagado: es
          // escenografía, no contenido que alguien quiera sacar de su marco.
          disablePictureInPicture
          controls={false}
          preload="metadata"
          aria-label={isBackdrop ? undefined : description}
        />
        {isBackdrop ? (
          <>
            <span className={styles.scrim} aria-hidden="true" />
            <span className={styles.scrimEdges} aria-hidden="true" />
          </>
        ) : (
          <>
            <span className={styles.veil} aria-hidden="true" />
            <span className={styles.rim} aria-hidden="true" />
          </>
        )}
      </div>
      {!isBackdrop && <p className="sr-only">{description}</p>}
    </div>
  );
}
