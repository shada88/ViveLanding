import React from 'react';
import styles from './FlowWaves.module.css';

/**
 * Genera una onda sinusoidal periódica como path SVG.
 *
 * El período divide exacto el ancho del tile: así el tile duplicado empalma sin
 * costura y el desplazamiento puede reiniciarse sin salto visible. Si el
 * período dejara resto, la onda saltaría una vez por ciclo y se vería como un
 * tirón, no como una corriente.
 */
function wavePath(y: number, amplitude: number, period: number, width: number): string {
  const half = period / 2;
  let d = `M 0 ${y}`;
  for (let x = 0; x < width; x += period) {
    d += ` C ${x + half * 0.42} ${y - amplitude}, ${x + half * 0.58} ${y - amplitude}, ${x + half} ${y}`;
    d += ` C ${x + half * 1.42} ${y + amplitude}, ${x + half * 1.58} ${y + amplitude}, ${x + period} ${y}`;
  }
  return d;
}

const TILE = 1440;

/** Capa: y base, amplitud, período, grosor, opacidad, velocidad (s), trazo. */
const LAYERS = [
  { y: 300, amp: 62, period: 480, w: 1.4, o: 0.6, speed: 44, stroke: 'url(#vceFlowA)' },
  { y: 340, amp: 44, period: 360, w: 1.1, o: 0.45, speed: 62, stroke: 'url(#vceFlowB)' },
  { y: 262, amp: 78, period: 720, w: 1.8, o: 0.5, speed: 78, stroke: 'url(#vceFlowC)' },
  { y: 390, amp: 34, period: 288, w: 0.9, o: 0.32, speed: 54, stroke: 'url(#vceFlowB)' },
];

/**
 * Nodos luminosos sobre la corriente: personas conectadas por el flujo, no
 * adorno suelto. Se mantienen en los tercios exteriores para no leerse como un
 * signo de puntuación perdido junto al titular.
 */
const NODES = [
  { cx: 150, cy: 356, r: 5, delay: 0 },
  { cx: 318, cy: 470, r: 3.5, delay: 1.1 },
  { cx: 1128, cy: 452, r: 6, delay: 2.2 },
  { cx: 1302, cy: 344, r: 4, delay: 0.6 },
];

/**
 * Campo de ondas — el motivo visual propio de KALEO.
 *
 * Vive EXCLUSIVAMENTE dentro de la sección Kaleo y no aparece en ninguna otra
 * parte de la landing. Es una excepción deliberada a la regla de "cero ondas"
 * del sistema de Vive con Esperanza: dentro de su propia sección manda la
 * identidad de Kaleo, donde la onda significa información que fluye,
 * comunicación y aprendizaje que se expande. Fuera de ahí, no significa nada
 * y queda prohibida.
 *
 * Es puramente decorativo (`aria-hidden`) y no captura eventos de puntero.
 * La animación es un `transform: translate3d` sobre el grupo: propiedad
 * compuesta, sin recalcular layout en ningún cuadro.
 */
export function FlowWaves({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox={`0 0 ${TILE} 600`}
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="vceFlowA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--net-1)" stopOpacity="0" />
            <stop offset="28%" stopColor="var(--net-2)" stopOpacity="1" />
            <stop offset="68%" stopColor="var(--net-3)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--net-3)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vceFlowB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--net-3)" stopOpacity="0" />
            <stop offset="40%" stopColor="var(--net-3)" stopOpacity="0.9" />
            <stop offset="82%" stopColor="var(--net-4)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--net-4)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vceFlowC" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--net-1)" stopOpacity="0" />
            <stop offset="46%" stopColor="var(--net-1)" stopOpacity="0.75" />
            <stop offset="100%" stopColor="var(--net-2)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {LAYERS.map((layer, i) => (
          <g
            key={i}
            className={styles.layer}
            style={{ ['--dur' as string]: `${layer.speed}s`, opacity: layer.o }}
          >
            {/* Dos tiles contiguos: al desplazarse -TILE el segundo ocupa el
                lugar exacto del primero, y por eso el bucle no tiene salto. */}
            <path
              d={wavePath(layer.y, layer.amp, layer.period, TILE)}
              stroke={layer.stroke}
              strokeWidth={layer.w}
              fill="none"
            />
            <path
              d={wavePath(layer.y, layer.amp, layer.period, TILE)}
              stroke={layer.stroke}
              strokeWidth={layer.w}
              fill="none"
              transform={`translate(${TILE} 0)`}
            />
          </g>
        ))}

        {NODES.map((node, i) => (
          <circle
            key={i}
            className={styles.node}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            style={{ ['--delay' as string]: `${node.delay}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
