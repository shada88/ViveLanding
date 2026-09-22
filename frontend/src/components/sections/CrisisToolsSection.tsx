'use client';

import React, { useState } from 'react';
import { Clock, Users, FileText, Download } from 'lucide-react';
import {
  CANONICAL_CRISIS_TOOLS,
  CRISIS_ROUTES,
  type ToolRoute,
} from '@/domain/entities/CrisisTool';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './CrisisToolsSection.module.css';

/**
 * 05 — Herramientas.
 *
 * No es una grilla de tarjetas descargables: es un índice editorial. Cada
 * herramienta se lee como una entrada de catálogo —qué resuelve, en cuánto
 * tiempo, para quién y en qué formato— porque quien llega acá suele estar
 * decidiendo bajo presión y necesita descartar rápido.
 *
 * Dos decisiones que vienen de mirar la sección funcionando:
 *
 * 1. **El código de ruta aparece UNA vez**, como título del panel, y no como
 *    rótulo repetido sobre cada herramienta. Con cuatro entradas por camino,
 *    el mismo «Ruta A» se leía cuatro veces seguidas sin aportar nada.
 * 2. **Las entradas no tienen estado de hover.** No son enlaces ni botones:
 *    no llevan a ningún lado. Un realce al pasar el cursor promete una
 *    interacción que no existe, y si además desplaza el texto, lo que produce
 *    es que la línea que estabas leyendo se te mueva.
 *
 * Los dos caminos son PARES: mismo tamaño, mismo peso, misma altura táctil.
 * Se distinguen por tono, no por jerarquía. Agrandar uno sería elegir por la
 * escuela, y la escuela sabe mejor que nosotros en cuál de los dos está.
 */
export function CrisisToolsSection() {
  const [route, setRoute] = useState<ToolRoute>('emergency');
  const tools = CANONICAL_CRISIS_TOOLS.filter((tool) => tool.route === route);
  const activeRoute = CRISIS_ROUTES.find((item) => item.id === route);

  return (
    <section id="herramientas" className="section" aria-labelledby="herramientas-titulo">
      <div className="shell">
        <SectionIntro
          step="05"
          eyebrow="Herramientas"
          titleId="herramientas-titulo"
          title="Lo que una escuela necesita tener listo antes de necesitarlo"
          lede="Ocho instrumentos de aplicación directa, escritos en lenguaje escolar y pensados para funcionar sin internet, sin especialistas en el predio y sin presupuesto previo."
        />

        <div className={styles.routes} role="tablist" aria-label="Tipo de herramienta">
          {CRISIS_ROUTES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`ruta-${item.id}`}
              aria-selected={route === item.id}
              aria-controls={`panel-${item.id}`}
              className={`${styles.route} ${route === item.id ? styles.routeActive : ''}`}
              onClick={() => setRoute(item.id)}
            >
              <span className={styles.routeLabel}>{item.label}</span>
              <span className={styles.routeBlurb}>{item.blurb}</span>
            </button>
          ))}
        </div>

        <div
          className={styles.panel}
          role="tabpanel"
          id={`panel-${route}`}
          aria-labelledby={`ruta-${route}`}
        >
          {/* El código del camino, una sola vez y como encabezado del panel. */}
          <h3 className={styles.panelTitle}>{activeRoute?.code}</h3>

          <div className={styles.list}>
            {/* La `key` incluye la ruta a propósito: al cambiar de camino React
                desmonta y vuelve a montar la lista, y la entrada escalonada
                vuelve a correr. Sin eso el panel cambiaría de golpe, sin gesto. */}
            {tools.map((tool, i) => (
              <Reveal
                as="article"
                key={`${route}-${tool.id}`}
                index={i}
                className={styles.tool}
              >
                <h4 className={`h3 ${styles.toolTitle}`}>{tool.title}</h4>
                <p className={styles.toolSubtitle}>{tool.subtitle}</p>
                <p className={styles.toolBody}>{tool.description}</p>

                <dl className={styles.meta}>
                  <div className={styles.metaItem}>
                    <dt className="sr-only">Tiempo estimado</dt>
                    <dd className={styles.metaValue}>
                      <Clock size={14} aria-hidden="true" />
                      {tool.timeEstimate}
                    </dd>
                  </div>
                  <div className={styles.metaItem}>
                    <dt className="sr-only">Destinatarios</dt>
                    <dd className={styles.metaValue}>
                      <Users size={14} aria-hidden="true" />
                      {tool.targetAudience}
                    </dd>
                  </div>
                  <div className={styles.metaItem}>
                    <dt className="sr-only">Formato</dt>
                    <dd className={styles.metaValue}>
                      <FileText size={14} aria-hidden="true" />
                      {tool.format}
                    </dd>
                  </div>
                </dl>

                {tool.downloadUrl && (
                  <div className={styles.toolAction}>
                    <a
                      href={tool.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className={styles.downloadButton}
                      aria-label={`Descargar ficha en PDF: ${tool.title}`}
                    >
                      <Download size={14} aria-hidden="true" />
                      <span>Descargar ficha (PDF)</span>
                    </a>
                  </div>
                )}
              </Reveal>
            ))}
          </div>

          {activeRoute?.downloadUrl && (
            <Reveal className={styles.routeDownloadBlock}>
              <div className={styles.routeDownloadContent}>
                <span className={styles.routeDownloadBadge}>Guía metodológica descargable</span>
                <h4 className={`h3 ${styles.routeDownloadTitle}`}>
                  Proceso de preparación para educación sostenible
                </h4>
                <p className={styles.routeDownloadDescription}>
                  Guía completa de trabajo que articula territorio, oficios, innovación y red de
                  aliados para implementar los procesos en tu comunidad escolar.
                </p>
              </div>
              <a
                href={activeRoute.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`btn btn--gold ${styles.routeDownloadBtn}`}
              >
                <Download size={16} aria-hidden="true" />
                <span>{activeRoute.downloadLabel || 'Descargar proceso (PDF)'}</span>
              </a>
            </Reveal>
          )}
        </div>

        <Reveal className={styles.footnote}>
          <p>
            {activeRoute?.blurb} ¿Necesitas acompañamiento para aplicarlas?{' '}
            <a href="#kaleo" className="link-arrow link-arrow--gold">
              Eso lo coordina Kaleo
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
