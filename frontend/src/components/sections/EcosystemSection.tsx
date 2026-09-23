'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Building2,
  GraduationCap,
  MapPin,
  School,
  Sprout,
  Sun,
  Users,
  type LucideIcon,
} from 'lucide-react';
import {
  ECOSYSTEM_HUB,
  ECOSYSTEM_NODES,
  type EcosystemIcon,
} from '@/domain/entities/Ecosystem';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './EcosystemSection.module.css';

const ICONS: Record<EcosystemIcon, LucideIcon> = {
  Users,
  School,
  GraduationCap,
  BookOpen,
  MapPin,
  Sprout,
  Building2,
  Sun,
};

/**
 * Curva del nodo al centro, combada hacia afuera para que los ocho trazos no
 * se superpongan en un manojo recto. El punto de control se desplaza
 * perpendicular al segmento: eso, y nada más, es lo que produce el arco.
 */
function link(x: number, y: number): string {
  const mx = (x + ECOSYSTEM_HUB.x) / 2;
  const my = (y + ECOSYSTEM_HUB.y) / 2;
  const dx = ECOSYSTEM_HUB.x - x;
  const dy = ECOSYSTEM_HUB.y - y;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * 6;
  const cy = my + (dx / len) * 6;
  return `M ${x} ${y} Q ${cx} ${cy} ${ECOSYSTEM_HUB.x} ${ECOSYSTEM_HUB.y}`;
}

const DEFAULT_PANEL = {
  label: 'Explora los 8 componentes',
  detail:
    'Ocho piezas clave que ya existen en el territorio. Toca o pasa el cursor sobre cualquiera de los nodos para conocer qué función cumple en la red.',
};

/**
 * 04 — El ecosistema como RED.
 *
 * Acá el concepto transversal de la landing deja de ser fondo y pasa a ser
 * estructura: ocho nodos alrededor de un centro, todos conectados, sin un
 * intermediario que se interponga.
 *
 * Tres decisiones de accesibilidad que condicionan el diseño:
 *
 * 1. **Los nodos son botones, no cosas con `:hover`.** Contenido que solo
 *    aparece al pasar el mouse no existe en un teléfono ni para quien navega
 *    con teclado. Acá se activa con click, con Enter y con Tab por igual.
 * 2. **`onFocus` activa igual que el click.** Tabular por la red cuenta la
 *    misma historia que recorrerla con el puntero.
 * 3. **El panel central es `aria-live="polite"`.** El texto cambia sin
 *    recargar nada; sin la región viva, un lector de pantalla no se enteraría
 *    de que algo cambió.
 *
 * Por debajo de 900 px el radial colapsa a una columna con espina vertical y
 * el detalle de cada nodo se muestra SIEMPRE: mismo significado, sin texto
 * ilegible, sin desborde y sin depender de una interacción.
 */
export function EcosystemSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ECOSYSTEM_NODES.find((node) => node.id === activeId);
  const panel = active ?? DEFAULT_PANEL;

  return (
    <section id="ecosistema" className="section" aria-labelledby="ecosistema-titulo">
      <div className="shell">
        <SectionIntro
          step="04"
          eyebrow="El ecosistema de articulación"
          titleId="ecosistema-titulo"
          align="center"
          title="Personas, escuelas, conocimiento y territorio. Conectados."
          lede="Ocho actores territoriales enlazados para resolver en red. Pasa el cursor o selecciona cada componente para descubrir su rol dentro del modelo."
        />

        <Reveal className={styles.graph}>
          <svg
            className={styles.links}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            {ECOSYSTEM_NODES.map((node, i) => (
              <g key={node.id}>
                <path
                  d={link(node.x, node.y)}
                  className={styles.linkBase}
                  vectorEffect="non-scaling-stroke"
                />
                {/* Pulso que viaja por la línea: el enlace en movimiento, no un
                    trazo inerte. `--i` escalona los ocho pulsos. */}
                <path
                  d={link(node.x, node.y)}
                  className={`${styles.linkPulse} ${
                    activeId === node.id ? styles.linkActive : ''
                  }`}
                  vectorEffect="non-scaling-stroke"
                  style={{ ['--i' as string]: i }}
                />
              </g>
            ))}
          </svg>

          <div
            className={styles.hub}
            style={{ left: `${ECOSYSTEM_HUB.x}%`, top: `${ECOSYSTEM_HUB.y}%` }}
          >
            <span className={styles.hubRing} aria-hidden="true" />
            <div className={styles.hubBody} aria-live="polite">
              <p className={styles.hubLabel}>{panel.label}</p>
              <p className={styles.hubDetail}>{panel.detail}</p>
            </div>
          </div>

          <ul className={styles.nodes}>
            {ECOSYSTEM_NODES.map((node) => {
              const Icon = ICONS[node.icon];
              const isActive = activeId === node.id;

              return (
                <li
                  key={node.id}
                  className={styles.nodeSlot}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <button
                    type="button"
                    className={`${styles.node} ${isActive ? styles.nodeActive : ''}`}
                    onClick={() => setActiveId(isActive ? null : node.id)}
                    onMouseEnter={() => setActiveId(node.id)}
                    onFocus={() => setActiveId(node.id)}
                    aria-pressed={isActive}
                  >
                    <span className={styles.nodeIcon}>
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <span className={styles.nodeLabel}>{node.label}</span>
                  </button>
                  <p className={styles.nodeDetail}>{node.detail}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
