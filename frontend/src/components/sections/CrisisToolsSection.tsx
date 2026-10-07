'use client';

import React, { useEffect } from 'react';
import { ChevronDown, Clock, Download, FileText, Star, Users } from 'lucide-react';
import {
  CANONICAL_CRISIS_TOOLS,
  CRISIS_ROUTES,
  type CrisisRoute,
} from '@/domain/entities/CrisisTool';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './CrisisToolsSection.module.css';

/**
 * 03 — Herramientas.
 *
 * Cada ruta es un desplegable. Cerrada, se lee el nombre y para qué sirve.
 * Abierta, muestra el índice de instrumentos de ese camino. Las dos empiezan
 * cerradas y se abren por separado: la escuela elige si mira una o las dos.
 *
 * El código de la ruta vive en el título del desplegable, no repetido sobre
 * cada instrumento. Las entradas del índice no tienen hover: no son enlaces.
 */
export function CrisisToolsSection() {
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      const route = document.getElementById(id);
      if (route instanceof HTMLDetailsElement) route.open = true;
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  return (
    <section id="herramientas" className="section" aria-labelledby="herramientas-titulo">
      <div className="shell">
        <SectionIntro
          step="03"
          eyebrow="Herramientas"
          titleId="herramientas-titulo"
          title="Acceso universal para escuelas antes, durante y después de la crisis"
          lede="Instrumentos de aplicación directa, en lenguaje escolar y pensados incluso para funcionar sin internet."
        />

        <div className={styles.routes}>
          {CRISIS_ROUTES.map((item) => (
            <RouteDisclosure key={item.id} route={item} />
          ))}
        </div>

        <Reveal className={styles.footnote}>
          <p>
            ¿Necesitas acompañamiento para aplicarlas?{' '}
            <a href="#kaleo" className="link-arrow link-arrow--gold">
              Eso lo coordina Kaleo
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

const FRONTS = [
  {
    title: 'Proteger el territorio',
    body: 'Promueven educación ambiental, prevención y acciones concretas de cuidado del entorno.',
  },
  {
    title: 'Proteger la vida',
    body: 'Acompañan la prevención de autoagresión, detectan señales de alerta y activan la cadena de aviso. No reemplazan al profesional: conectan a quien necesita ayuda con quien puede brindarla.',
  },
  {
    title: 'Prevenir la violencia',
    body: 'Promueven convivencia, identificación temprana de riesgos y organización comunitaria antes de que el conflicto escale.',
  },
] as const;

const RESPONSE_VERBS = ['Observar', 'Alertar', 'Acompañar', 'Conectar', 'Movilizar'] as const;

function FirstRespondersSheet() {
  return (
    <article className={styles.sheet}>
      <h4 className={styles.sheetTitle}>Estudiantes como primeros respondedores</h4>
      <p className={styles.sheetDeck}>
        Jóvenes de últimos grados que convierten la escuela en una primera línea de protección
      </p>
      <p className={styles.sheetLead}>Son parte de la respuesta ante las crisis.</p>
      <p className={styles.sheetIntro}>
        Estudiantes de 10.º y 11.º reciben formación práctica para actuar como primeros
        respondedores escolares en tres frentes esenciales:
      </p>

      <ol className={styles.fronts}>
        {FRONTS.map((front) => (
          <li key={front.title} className={styles.front}>
            <h5 className={styles.frontTitle}>{front.title}</h5>
            <p className={styles.frontBody}>{front.body}</p>
          </li>
        ))}
      </ol>

      <div className={styles.agents}>
        <h5 className={styles.agentsTitle}>Estudiantes como agentes de respuesta</h5>
        <p className={styles.sheetIntro}>Cada joven aprende a</p>
        <ul className={styles.verbs}>
          {RESPONSE_VERBS.map((verb) => (
            <li key={verb}>{verb}</li>
          ))}
        </ul>
        <p className={styles.sheetBody}>
          El programa integra el servicio social estudiantil con un entregable real para la
          escuela, articulado con docentes, familias, orientadores y la red Kaleo.
        </p>
        <p className={styles.sheetBody}>
          La Fundación Vivesperanza certifica el servicio social realizado, reconociendo la
          participación, formación y aporte concreto de cada estudiante a su comunidad
          educativa.
        </p>
        <p className={styles.sheetClose}>
          Ayudamos a preparar una nueva generación para cuidar su comunidad.
        </p>
      </div>
    </article>
  );
}

function GoldStars() {
  return (
    <span className={styles.stars} aria-hidden="true">
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} size={12} strokeWidth={1.25} />
      ))}
    </span>
  );
}

function RouteDisclosure({ route }: { route: CrisisRoute }) {
  const tools = CANONICAL_CRISIS_TOOLS.filter((tool) => tool.route === route.id);

  return (
    <details
      id={`ruta-${route.id}`}
      className={route.id === 'process' ? `${styles.route} ${styles.routeFeature}` : styles.route}
    >
      <summary className={styles.summary}>
        <span className={styles.routeCopy}>
          {route.id === 'process' && (
            <span className={styles.signalRow}>
              <span className={styles.signal}>
                <span className={styles.signalMark} aria-hidden="true" />
                Primeros respondedores
              </span>
              <GoldStars />
            </span>
          )}
          <h3 className={styles.routeLabel}>{route.label}</h3>
          <span className={styles.routeBlurb}>{route.blurb}</span>
        </span>
        <ChevronDown
          size={route.id === 'process' ? 22 : 18}
          aria-hidden="true"
          className={styles.chevron}
        />
      </summary>

      <div className={styles.panel} id={`panel-${route.id}`}>
        {route.id === 'process' && (
          <>
            <FirstRespondersSheet />
            <div className={styles.routeActions}>
              <button type="button" className="btn btn--lg btn--primary">
                Solicita subvención ahora
              </button>
              <button type="button" className="btn btn--lg btn--outline">
                Materiales de malla curricular
              </button>
            </div>
          </>
        )}

        <div className={styles.list}>
          {tools.map((tool, i) => (
            <Reveal as="article" key={tool.id} index={i} className={styles.tool}>
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
      </div>
    </details>
  );
}
