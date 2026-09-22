import React from 'react';
import { ArrowUpRight, ShieldCheck, Siren, Sprout, type LucideIcon } from 'lucide-react';
import { KALEO_DATA, type KaleoPillar } from '@/domain/entities/Kaleo';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { FlowWaves } from '@/components/visuals/FlowWaves';
import styles from './KaleoShowcase.module.css';

const PILLAR_ICONS: Record<KaleoPillar['iconName'], LucideIcon> = {
  ShieldCheck,
  Siren,
  Sprout,
};

/**
 * 06 — Kaleo.
 *
 * La única sección que rompe visualmente con el resto, y lo hace a propósito:
 * Kaleo es un producto con identidad propia dentro del ecosistema, y presentarlo
 * con el mismo lenguaje que un programa lo volvería indistinguible de ellos.
 *
 * Las ONDAS viven exclusivamente acá. En el sistema de Vive con Esperanza la
 * onda está prohibida —la identidad se apoya en geometría, red y luz— pero
 * dentro de esta banda manda la identidad de Kaleo, donde la onda significa
 * información que fluye, comunicación y aprendizaje que se expande. Fuera de
 * esta sección no significa nada y vuelve a estar prohibida.
 *
 * La banda oscura abre y cierra en el fondo de la página: sin eso, el
 * degradado dejaría dos líneas rectas visibles contra las secciones vecinas.
 *
 * Es un componente de servidor: no hay estado ni evento. Todo el movimiento es
 * CSS, y por eso no cuesta un solo kilobyte de JavaScript.
 */
export function KaleoShowcase() {
  const { etymology, pillars, paths } = KALEO_DATA;

  return (
    <section
      id="kaleo"
      className={`section section--ink ${styles.section}`}
      aria-labelledby="kaleo-titulo"
    >
      <FlowWaves />

      <div className={`shell ${styles.inner}`}>
        <header className={styles.head}>
          <Reveal index={0}>
            <p className="eyebrow eyebrow--ink">
              <span className={styles.step}>06</span>
              Herramienta propia
            </p>
          </Reveal>

          <Reveal index={1} className={styles.logoRow}>
            {/* El logotipo real de Kaleo, servido desde su archivo. Va una sola
                vez en toda la página: es un PNG incrustado de 220 KB. */}
            <BrandLogo brand="kaleo" height={54} tone="on-ink" />
            <span className={styles.by}>{KALEO_DATA.byText}</span>
          </Reveal>

          <Reveal index={2}>
            <h2 id="kaleo-titulo" className={`h2 ${styles.title}`}>
              {KALEO_DATA.premise}
            </h2>
          </Reveal>

          <Reveal index={3}>
            <p className={`lede lede--ink ${styles.lede}`}>
              Hay personas que necesitan acompañamiento y hay psicólogos, docentes,
              voluntarios y organizaciones dispuestos a darlo. Kaleo coordina ese
              encuentro de punta a punta y no suelta el caso hasta que cierra.
            </p>
          </Reveal>
        </header>

        <Reveal className={styles.etymology}>
          <p className={styles.greek} lang="grc">
            {etymology.greek}
          </p>
          <p className={styles.translit}>
            <em>{etymology.transliteration}</em> — {etymology.verbs.join(' · ')}
          </p>
          <p className={styles.meaning}>{etymology.meaning}</p>
        </Reveal>

        <ol className={styles.pillars}>
          {pillars.map((pillar, i) => {
            const Icon = PILLAR_ICONS[pillar.iconName];
            return (
              <Reveal as="li" key={pillar.title} index={i} className={styles.pillar}>
                <span className={styles.pillarIcon}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className={`h3 ${styles.pillarTitle}`}>{pillar.title}</h3>
                <p className={styles.pillarAction}>{pillar.action}</p>
                <p className={styles.pillarBody}>{pillar.description}</p>
              </Reveal>
            );
          })}
        </ol>

        <Reveal className={styles.note}>
          <p>{KALEO_DATA.coreValue}</p>
        </Reveal>

        {/*
          Los dos caminos son PARES: mismo tamaño, mismo peso, misma altura
          táctil, y se distinguen solo por tono. Agrandar uno de los dos sería
          elegir por la persona en el momento exacto en que menos corresponde.
        */}
        <div className={styles.paths}>
          <Reveal index={0} className={styles.path}>
            <h3 className={`h3 ${styles.pathTitle}`}>{paths.needHelp.title}</h3>
            <p className={styles.pathBody}>{paths.needHelp.description}</p>
            <a
              href={paths.needHelp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--lg btn--primary btn--block"
            >
              <span>{paths.needHelp.ctaText}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal index={1} className={styles.path}>
            <h3 className={`h3 ${styles.pathTitle}`}>{paths.wantToHelp.title}</h3>
            <p className={styles.pathBody}>{paths.wantToHelp.description}</p>
            <a
              href={paths.wantToHelp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--lg btn--gold btn--block"
            >
              <span>{paths.wantToHelp.ctaText}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
