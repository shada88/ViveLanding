'use client';

import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Building2,
  GraduationCap,
  Heart,
  MapPin,
  MousePointerClick,
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
  label: 'Una red viva de 8 piezas',
  detail:
    'Cada componente cumple un rol indispensable en el territorio. Toca o selecciona cualquier nodo para conocer cómo se conecta y sumarte directamente.',
  roleId: 'escuelas' as const,
  actionLabel: 'Quiero participar en la red',
};

/**
 * 04 — El ecosistema como RED.
 *
 * Acá el concepto transversal de la landing deja de ser fondo y pasa a ser
 * estructura: ocho nodos alrededor de un centro, todos conectados, sin un
 * intermediario que se interponga.
 *
 * Accesibilidad y CRO:
 * 1. Los nodos se activan con hover, click, Enter y Tab por igual.
 * 2. Cada nodo conecta de forma directa con la acción de participación
 *    específica de ese actor mediante `vce:select-role`.
 * 3. En móvil la espina vertical muestra la función y el botón de acción
 *    de cada uno sin ocultar nada tras una interacción forzada.
 */
export function EcosystemSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ECOSYSTEM_NODES.find((node) => node.id === activeId);
  const panel = active ?? DEFAULT_PANEL;

  const handleRoleSelect = (roleId: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('vce:select-role', { detail: roleId }));
    }
  };

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

        <div className={styles.instructionBanner}>
          <MousePointerClick size={16} aria-hidden="true" className={styles.instructionIcon} />
          <span>Toca o pasa el cursor sobre cada nodo para ver su función y sumarte a la red</span>
        </div>

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
              <a
                href="#participar"
                onClick={() => handleRoleSelect(panel.roleId)}
                className={styles.hubAction}
              >
                <span>{panel.actionLabel}</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
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
                  <a
                    href="#participar"
                    onClick={() => handleRoleSelect(node.roleId)}
                    className={styles.mobileAction}
                  >
                    <span>{node.actionLabel}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>

        <Reveal className={styles.quickRolesWrapper}>
          <h3 className={styles.quickRolesTitle}>¿Cómo quieres sumarte a la red?</h3>
          <p className={styles.quickRolesSub}>
            Selecciona tu perfil para ingresar directamente al formulario de vinculación con tu rol activo.
          </p>

          <div className={styles.quickRolesGrid}>
            <a
              href="#participar"
              onClick={() => handleRoleSelect('escuelas')}
              className={styles.quickRoleCard}
            >
              <span className={styles.quickRoleIcon}>
                <School size={22} aria-hidden="true" />
              </span>
              <div className={styles.quickRoleBody}>
                <span className={styles.quickRoleHeading}>Soy Escuela o Docente</span>
                <span className={styles.quickRoleText}>Preinscribir plantel educativo</span>
              </div>
              <ArrowRight size={16} aria-hidden="true" className={styles.quickRoleArrow} />
            </a>

            <a
              href="#participar"
              onClick={() => handleRoleSelect('aliados')}
              className={styles.quickRoleCard}
            >
              <span className={styles.quickRoleIcon}>
                <Building2 size={22} aria-hidden="true" />
              </span>
              <div className={styles.quickRoleBody}>
                <span className={styles.quickRoleHeading}>Empresa o Institución</span>
                <span className={styles.quickRoleText}>Proponer alianza o cooperación</span>
              </div>
              <ArrowRight size={16} aria-hidden="true" className={styles.quickRoleArrow} />
            </a>

            <a
              href="#participar"
              onClick={() => handleRoleSelect('voluntarios')}
              className={styles.quickRoleCard}
            >
              <span className={styles.quickRoleIcon}>
                <Users size={22} aria-hidden="true" />
              </span>
              <div className={styles.quickRoleBody}>
                <span className={styles.quickRoleHeading}>Voluntariado</span>
                <span className={styles.quickRoleText}>Aportar tiempo, oficio o ideas</span>
              </div>
              <ArrowRight size={16} aria-hidden="true" className={styles.quickRoleArrow} />
            </a>

            <a
              href="#participar"
              onClick={() => handleRoleSelect('donantes')}
              className={styles.quickRoleCard}
            >
              <span className={styles.quickRoleIcon}>
                <Heart size={22} aria-hidden="true" />
              </span>
              <div className={styles.quickRoleBody}>
                <span className={styles.quickRoleHeading}>Donante o Filantropía</span>
                <span className={styles.quickRoleText}>Financiar kits y escuelas en riesgo</span>
              </div>
              <ArrowRight size={16} aria-hidden="true" className={styles.quickRoleArrow} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
