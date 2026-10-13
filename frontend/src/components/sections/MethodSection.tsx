'use client';

import React, { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Eye,
  Megaphone,
  PackageCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { METHOD_INTRO, METHOD_STEPS, type MethodIcon } from '@/domain/entities/MethodStep';
import { selectParticipationRole } from '@/lib/participation';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './MethodSection.module.css';

const ICONS: Record<MethodIcon, LucideIcon> = { Eye, BookOpen, Wrench, Megaphone };

/**
 * 02 — El método, como simulador de cuatro pasos.
 *
 * El riel de pasos ES la red: cuatro nodos enlazados que se encienden a medida
 * que se avanza. No es un adorno de progreso, es el argumento del método —cada
 * paso se apoya en el anterior— dicho sin una palabra.
 *
 * Patrón de pestañas completo, el mismo de Las Voces del Bosque:
 * - Una sola parada de tabulación para el riel; las flechas recorren los pasos.
 * - Las flechas dan la vuelta y el foco sigue a la selección.
 * - Sin animación de entrada en el panel: cambiar de paso tiene que sentirse
 *   instantáneo. «Cero lag» es una decisión de diseño, no de rendimiento.
 */
export function MethodSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = METHOD_STEPS[activeIndex];
  const last = METHOD_STEPS.length - 1;
  const ActiveIcon = ICONS[active.icon];

  const focusTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusTab(activeIndex === last ? 0 : activeIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusTab(activeIndex === 0 ? last : activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(last);
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="metodo"
      className="section section--sunken"
      aria-labelledby="metodo-titulo"
    >
      <div className="shell">
        <SectionIntro
          step="02"
          eyebrow={METHOD_INTRO.eyebrow}
          titleId="metodo-titulo"
          title={METHOD_INTRO.title}
          lede={METHOD_INTRO.lede}
        />

        <Reveal className={styles.simulator}>
          <div
            className={styles.rail}
            role="tablist"
            aria-label="Pasos del método"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
            style={{ '--method-progress': activeIndex / last } as React.CSSProperties}
          >
            <span className={styles.railLine} aria-hidden="true" />
            {METHOD_STEPS.map((step, i) => {
              const Icon = ICONS[step.icon];
              const isActive = i === activeIndex;
              return (
                <button
                  key={step.id}
                  ref={(node) => {
                    tabRefs.current[i] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`metodo-tab-${step.id}`}
                  aria-controls="metodo-panel"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.node} ${isActive ? styles.nodeActive : ''} ${
                    i < activeIndex ? styles.nodeDone : ''
                  }`}
                  onClick={() => setActiveIndex(i)}
                >
                  <span className={styles.nodeDot}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className={styles.nodeLabel}>
                    <span className={styles.nodeNumber}>Paso {String(i + 1).padStart(2, '0')}</span>
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="metodo-panel"
            role="tabpanel"
            aria-labelledby={`metodo-tab-${active.id}`}
            tabIndex={0}
            className={styles.panel}
          >
            <div className={styles.panelCopy}>
              <p className={styles.panelStep}>
                <ActiveIcon size={16} aria-hidden="true" />
                Paso {activeIndex + 1} de {METHOD_STEPS.length}
              </p>
              <h3 className={`h3 ${styles.panelTitle}`}>{active.title}</h3>
              <p className={styles.panelBody}>{active.body}</p>
            </div>

            <div className={styles.product}>
              <p className={styles.productLabel}>
                <PackageCheck size={16} aria-hidden="true" />
                Producto de aprendizaje
              </p>
              <p className={styles.productTitle}>{active.product.title}</p>
              <p className={styles.productNote}>{active.product.note}</p>
            </div>

            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => setActiveIndex(activeIndex === 0 ? last : activeIndex - 1)}
                aria-label="Paso anterior"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Anterior</span>
              </button>
              {activeIndex === last ? (
                <a
                  href="#participar"
                  className="btn btn--primary"
                  onClick={() => selectParticipationRole('escuelas')}
                >
                  <span>Llevar el método a mi escuela</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={() => setActiveIndex(activeIndex + 1)}
                  aria-label="Paso siguiente"
                >
                  <span>Siguiente</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
