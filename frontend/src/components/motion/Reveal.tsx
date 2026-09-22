'use client';

import React, { useEffect, useRef, useState } from 'react';

type RevealTag = 'div' | 'section' | 'article' | 'li' | 'header' | 'figure' | 'p' | 'span';

interface RevealProps {
  children: React.ReactNode;
  /** Elemento a renderizar. El envoltorio no debe romper la semántica de la lista o el artículo que envuelve. */
  as?: RevealTag;
  /** Posición en el escalonado. El retardo lo calcula el CSS, no este componente. */
  index?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

/**
 * Aparición al entrar en pantalla — el ÚNICO mecanismo de entrada de la página.
 *
 * Tres decisiones que no son negociables:
 *
 * 1. **El estado oculto vive en CSS, no acá.** Este componente solo marca
 *    `data-reveal="is-visible"`. Si el JavaScript nunca corre, el selector
 *    `html.js [data-reveal]` tampoco existe y el contenido se ve entero.
 *    Es lo contrario de lo que hace framer-motion, que serializa
 *    `opacity: 0` como estilo inline en el HTML del servidor y deja la página
 *    invisible cuando el script no llega.
 *
 * 2. **`unobserve` apenas aparece.** Un observador por bloque que siga vivo
 *    toda la sesión es memoria y trabajo de layout regalados. El contenido no
 *    vuelve a esconderse al salir de pantalla: reaparecer al hacer scroll
 *    hacia arriba se lee como un fallo, no como diseño.
 *
 * 3. **`rootMargin` negativo abajo.** Dispara cuando el bloque entró de verdad
 *    —no cuando asomó un píxel—, así la animación acompaña a la lectura en vez
 *    de haber terminado antes de que el bloque sea visible.
 */
export function Reveal({
  children,
  as = 'div',
  index = 0,
  className,
  id,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Navegador sin IntersectionObserver: se muestra y listo. Degradar a
    // "invisible para siempre" sería peor que no animar.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return React.createElement(
    as,
    {
      ref,
      id,
      className,
      'data-reveal': visible ? 'is-visible' : '',
      style: { ...style, '--reveal-index': index } as React.CSSProperties,
    },
    children,
  );
}
