import React from 'react';
import Image from 'next/image';

type BrandTone = 'light' | 'gold' | 'on-ink' | 'as-is';

interface BrandLogoProps {
  brand: 'vivesperanza' | 'kaleo';
  /** Alto renderizado en píxeles; el ancho lo deriva la proporción del archivo. */
  height?: number;
  tone?: BrandTone;
  priority?: boolean;
  className?: string;
}

/**
 * Logotipos institucionales, servidos desde los archivos reales de marca.
 *
 * Nunca se recrean con texto ni se sustituyen por una inicial en una caja de
 * color: un logotipo tipografiado a mano es una marca distinta.
 *
 * Dos particularidades de estos archivos que condicionan el componente:
 *
 * 1. `vivesperanza_logo.svg` trae sus trazos con `fill="#000000"` horneado.
 *    Sobre el fondo oscuro del producto sería invisible. Se recolorea con un
 *    filtro CSS (`.brand-mark--light` / `--gold` en `landing.css`), que es la
 *    capa de presentación — el archivo de marca no se toca.
 *
 * 2. `kaleo_logo.svg` es un PNG incrustado en base64 y pesa 220 KB. Al no
 *    tener `fill` que tocar, la única vía para llevarlo a blanco es el filtro
 *    de `.brand-mark--on-ink` — que opera sobre píxeles, no sobre trazos, y
 *    por eso también funciona con una imagen rasterizada. No debe usarse más
 *    de una vez por página y va siempre diferido, jamás con `priority`.
 *
 * `unoptimized` es obligatorio: el optimizador de imágenes de Next se niega a
 * procesar SVG salvo que se active `dangerouslyAllowSVG`, y habilitar la
 * ejecución de SVG arbitrarios para servir dos archivos propios es un cambio
 * de superficie de ataque que no compensa.
 */
const SOURCES = {
  vivesperanza: {
    src: '/vivesperanza_logo.svg',
    alt: 'Fundación Vive con Esperanza',
    ratio: 1488.896 / 235.52,
  },
  kaleo: {
    src: '/kaleo_logo.svg',
    alt: 'Kaleo',
    ratio: 795 / 240,
  },
} as const;

export function BrandLogo({
  brand,
  height = 34,
  tone = 'light',
  priority = false,
  className = '',
}: BrandLogoProps) {
  const source = SOURCES[brand];
  const toneClass =
    tone === 'light'
      ? 'brand-mark--light'
      : tone === 'gold'
        ? 'brand-mark--gold'
        : tone === 'on-ink'
          ? 'brand-mark--on-ink'
          : '';

  return (
    <Image
      src={source.src}
      alt={source.alt}
      width={Math.round(height * source.ratio)}
      height={height}
      priority={priority}
      unoptimized
      className={`brand-mark ${toneClass} ${className}`.trim()}
      style={{ height: `${height}px`, width: 'auto' }}
    />
  );
}
