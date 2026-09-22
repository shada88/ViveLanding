import React from 'react';
import {
  NORTH_AMERICA_PATH,
  SOUTH_AMERICA_PATH,
  TERRITORY_LINKS,
  TERRITORY_NODES,
  TERRITORY_VIEWBOX,
} from '@/domain/entities/Territory';
import styles from './AmericasNetwork.module.css';

const NODE_BY_ID = new Map(TERRITORY_NODES.map((node) => [node.id, node]));

/**
 * El continente americano como RED, no como mapa.
 *
 * Elección deliberada: silueta poligonal de baja resolución en vez de un
 * contorno cartográfico. Un mapa técnico invita a buscarle la frontera exacta
 * y a discutirla; una silueta declara que lo que importa son los VÍNCULOS
 * entre territorios, que es el único contenido real de esta pieza.
 *
 * Es un componente de servidor: no hay estado, no hay evento, no hay motivo
 * para mandar JavaScript al navegador por esto.
 *
 * Accesibilidad: el SVG es decorativo y la lista de territorios viaja en texto
 * real, oculta visualmente. Un lector de pantalla recibe los países; no recibe
 * "gráfico".
 */
export function AmericasNetwork({ className = '' }: { className?: string }) {
  return (
    <div className={`${styles.wrap} ${className}`}>
      <svg
        className={styles.svg}
        viewBox={TERRITORY_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="vceLandFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--net-1)" stopOpacity="0.16" />
            <stop offset="55%" stopColor="var(--net-2)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="var(--net-4)" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        <g className={styles.land}>
          <path d={NORTH_AMERICA_PATH} />
          <path d={SOUTH_AMERICA_PATH} />
        </g>

        <g className={styles.links}>
          {TERRITORY_LINKS.map(([from, to], i) => {
            const a = NODE_BY_ID.get(from);
            const b = NODE_BY_ID.get(to);
            if (!a || !b) return null;
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                vectorEffect="non-scaling-stroke"
                style={{ ['--i' as string]: i }}
              />
            );
          })}
        </g>

        <g>
          {TERRITORY_NODES.map((node, i) => (
            <g key={node.id} style={{ ['--delay' as string]: `${i * 0.28}s` }}>
              {node.anchor && (
                <circle className={styles.halo} cx={node.x} cy={node.y} r={2.6} />
              )}
              <circle
                className={node.anchor ? styles.nodeAnchor : styles.node}
                cx={node.x}
                cy={node.y}
                r={node.anchor ? 1.5 : 0.95}
              />
            </g>
          ))}
        </g>
      </svg>

      <p className="sr-only">
        Territorios conectados por la red de la fundación:{' '}
        {TERRITORY_NODES.map((node) => node.label).join(', ')}.
      </p>
    </div>
  );
}
