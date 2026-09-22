'use client';

import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Preferencia de movimiento reducido, reactiva a los cambios del sistema.
 *
 * Arranca en `false` a propósito: durante el render del servidor no existe
 * `matchMedia`, y asumir `true` haría que todo el mundo viera la versión
 * congelada en el primer pintado. El efecto corrige en el cliente antes de que
 * cualquier animación llegue a ser perceptible.
 *
 * Es la única fuente de verdad para el JavaScript. El CSS tiene su propia
 * media query; las dos capas tienen que decir lo mismo.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    setReduced(media.matches);

    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
