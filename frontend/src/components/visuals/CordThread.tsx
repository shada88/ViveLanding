'use client';

import React, { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import styles from './CordThread.module.css';

interface CordThreadProps {
  /**
   * Dónde se ancla el cordón dentro de su contenedor.
   *
   * Es una prop y no una clase que se sobrescriba desde afuera: el posicionado
   * vive entero en este módulo. Dos selectores de una sola clase en archivos
   * CSS distintos pesan exactamente lo mismo, así que cuál gana depende del
   * orden en que el empaquetador los concatene — una apuesta, no una decisión.
   */
  align?: 'center' | 'right';
  /**
   * Puntos de anudado, como porcentaje del recorrido vertical.
   *
   * Los valores por defecto NO son estéticos: 26 %, 52 % y 78 % son
   * exactamente las alturas —260, 520 y 780 sobre 1000— donde el trazo vuelve
   * a cruzar el eje central del lienzo. Ahí, y solo ahí, el nudo cae sobre el
   * cordón. Cualquier otro valor lo deja flotando al lado.
   */
  knots?: number[];
  className?: string;
}

/**
 * Trazo serpenteante en un lienzo de 100 de ancho por 1000 de alto.
 * Se dibuja una sola vez a nivel de módulo: es una constante, no un cálculo
 * que deba repetirse en cada render.
 */
const CORD_PATH =
  'M 50 0 C 78 90, 22 170, 50 260 C 80 350, 18 430, 50 520 ' +
  'C 82 610, 20 690, 50 780 C 76 860, 26 930, 50 1000';

/**
 * El cordón amarillo del libro «Cocoperro y El Cordón Amarillo».
 *
 * Acompaña al bloque de ese libro y a nada más: NO es un símbolo del
 * ecosistema ni un recurso que atraviese la landing. Empieza y termina dentro
 * de su contenedor.
 *
 * Se DIBUJA a medida que la persona avanza en vez de estar ya dibujado, porque
 * el gesto de tender un cordón es lo único que lo distingue de una línea
 * decorativa.
 *
 * Implementación: `pathLength="1"` normaliza el largo del trazo a la unidad,
 * así el `stroke-dashoffset` se controla con un progreso de 0 a 1 sin tener
 * que medir el path con `getTotalLength()` ni recalcularlo cuando cambia el
 * ancho del contenedor.
 *
 * El progreso se lee en un `scroll` pasivo colapsado con `requestAnimationFrame`
 * —un cuadro, una lectura— y solo mientras la pieza está en pantalla. Leer
 * `getBoundingClientRect()` en cada evento de scroll es la forma clásica de
 * convertir un efecto bonito en un scroll a tirones.
 */
export function CordThread({
  knots = [26, 52, 78],
  align = 'center',
  className = '',
}: CordThreadProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (reducedMotion) {
      // Cordón entero y quieto: el símbolo se ve completo, sin recorrido.
      host.style.setProperty('--cord-progress', '1');
      return;
    }

    let ticking = false;
    let onScreen = true;

    const measure = () => {
      ticking = false;
      const rect = host.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      // 0 cuando el tope del bloque toca el borde inferior de la pantalla;
      // 1 cuando su base cruza el primer cuarto. El cordón termina de tenderse
      // ANTES de que la sección se vaya, no justo al salir.
      const span = rect.height + viewport * 0.75;
      const travelled = viewport - rect.top;
      const progress = Math.min(1, Math.max(0, travelled / span));
      host.style.setProperty('--cord-progress', progress.toFixed(4));
    };

    const onScroll = () => {
      if (ticking || !onScreen) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) onScroll();
      },
      { threshold: 0 },
    );
    observer.observe(host);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={hostRef}
      className={`${styles.host} ${align === 'right' ? styles.alignRight : ''} ${className}`}
      aria-hidden="true"
    >
      <svg
        className={styles.svg}
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        focusable="false"
      >
        {/* Estela tenue: el recorrido completo del cordón, siempre presente.
            Sin ella el trazo dorado parece flotar sin origen ni destino. */}
        <path
          className={styles.ghost}
          d={CORD_PATH}
          vectorEffect="non-scaling-stroke"
        />
        <path
          className={styles.cord}
          d={CORD_PATH}
          pathLength={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Los nudos son HTML y no SVG a propósito: con `preserveAspectRatio="none"`
          un círculo del SVG se deformaría en óvalo al estirarse el lienzo. */}
      {knots.map((top) => (
        <span key={top} className={styles.knot} style={{ top: `${top}%` }} />
      ))}
    </div>
  );
}
