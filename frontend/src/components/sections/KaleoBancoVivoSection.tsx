'use client';

import React, { useId, useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  ChevronDown,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sprout,
  type LucideIcon,
} from 'lucide-react';
import { KALEO_DATA, type KaleoPillar } from '@/domain/entities/Kaleo';
import { BANCO_VIVO, BANCO_VIVO_GAINS } from '@/domain/entities/BancoVivo';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { FlowWaves } from '@/components/visuals/FlowWaves';
import styles from './KaleoBancoVivoSection.module.css';

const PILLAR_ICONS: Record<KaleoPillar['iconName'], LucideIcon> = {
  ShieldCheck,
  Siren,
  Sprout,
};

/**
 * 04 — Kaleo y Banco Vivo: la red de apoyo mutuo.
 *
 * Dos productos, UNA pregunta: «¿cómo nos cuidamos entre escuelas?». Quien
 * llega puede estar de cualquiera de los dos lados —tiene algo para dar o
 * necesita apoyo— y por eso las dos columnas son PARES: mismo tamaño, misma
 * altura táctil, distinguidas solo por tono. Agrandar una sería elegir por la
 * persona en el momento en que menos corresponde.
 *
 * Las ONDAS de `FlowWaves` viven en esta banda y solo acá: es la excepción
 * registrada en AGENTS.md. Kaleo tiene identidad propia y la onda es su motivo
 * —información que fluye, aprendizaje que se expande—; Banco Vivo comparte la
 * banda porque es justamente lo que fluye por esa red. Fuera de esta sección la
 * onda sigue prohibida.
 *
 * El logotipo de Kaleo aparece UNA vez en toda la página: es un PNG incrustado
 * de 220 KB.
 */
export function KaleoBancoVivoSection() {
  const gainsId = useId();
  const [gainsOpen, setGainsOpen] = useState(false);
  const { pillars, paths } = KALEO_DATA;

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
              <span className={styles.step}>04</span>
              Compartir · Conectar · Acompañar
            </p>
          </Reveal>

          <Reveal index={1}>
            <h2 id="kaleo-titulo" className={`h2 ${styles.title}`}>
              Una red para compartir lo que ayuda y encontrar apoyo cuando hace falta
            </h2>
          </Reveal>

          <Reveal index={2}>
            <p className={`lede lede--ink ${styles.lede}`}>
              Si llegaste desde la Ruta A, este es el siguiente paso. Kaleo ayuda a explorar
              opciones de acompañamiento y conexión con recursos disponibles; Banco Vivo
              completa la red con experiencias escolares y tiempo profesional voluntario.
            </p>
          </Reveal>
        </header>

        <div className={styles.columns}>
          {/* ── 1 · Quiero contribuir: Banco Vivo ── */}
          <Reveal as="article" index={0} className={styles.column} id="banco-vivo">
            <p className={styles.kicker}>1 · Quiero contribuir</p>
            <Image
              src={BANCO_VIVO.logo}
              alt={BANCO_VIVO.logoAlt}
              width={980}
              height={244}
              className={styles.bancoMark}
            />
            <p className={styles.body}>
              <strong>Directivos y docentes:</strong> comparte una experiencia útil al enfrentar
              una emergencia escolar para que otras escuelas puedan aprender.{' '}
              <strong>Profesionales:</strong> ofrece tiempo y conocimiento para acompañar a
              comunidades educativas.
            </p>

            <div className={styles.gains}>
              <h3 className={styles.gainsTitle}>
                <button
                  type="button"
                  className={styles.gainsTrigger}
                  aria-expanded={gainsOpen}
                  aria-controls={gainsId}
                  onClick={() => setGainsOpen((open) => !open)}
                >
                  <span>Beneficios para tu escuela</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`${styles.chevron} ${gainsOpen ? styles.chevronOpen : ''}`}
                  />
                </button>
              </h3>
              <div
                id={gainsId}
                role="region"
                aria-label="Beneficios para tu escuela"
                className={`${styles.gainsPanel} ${gainsOpen ? styles.gainsPanelOpen : ''}`}
              >
                <ol className={styles.gainsList}>
                  {BANCO_VIVO_GAINS.map((gain) => (
                    <li key={gain.label} className={styles.gain}>
                      <p className={styles.gainLabel}>{gain.label}</p>
                      <p className={styles.gainBody}>{gain.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className={styles.actions}>
              <a
                href={paths.wantToHelp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--lg btn--gold btn--block"
              >
                <span>Compartir una experiencia o mi tiempo</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href={BANCO_VIVO.legalDocument} className={styles.legalLink} download>
                <FileText size={16} aria-hidden="true" />
                <span>Documento legal del testimonio</span>
              </a>
            </div>
          </Reveal>

          {/* ── 2 · Necesito apoyo: Kaleo ── */}
          <Reveal as="article" index={1} className={styles.column}>
            <p className={styles.kicker}>2 · Necesito orientación</p>
            <div className={styles.kaleoRow}>
              <a
                href={KALEO_DATA.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.brandLink}
                title="Abrir la plataforma Kaleo"
              >
                <BrandLogo brand="kaleo" height={44} tone="on-ink" />
              </a>
              <span className={styles.by}>{KALEO_DATA.byText}</span>
            </div>
            <p className={styles.body}>
              ¿Tu escuela o comunidad enfrenta una emergencia o un desastre? Solicita
              orientación para identificar posibles pasos y conectar con capacidades o
              recursos disponibles según el contexto.
            </p>

            <ol className={styles.pillars}>
              {pillars.map((pillar) => {
                const Icon = PILLAR_ICONS[pillar.iconName];
                return (
                  <li key={pillar.title} className={styles.pillar}>
                    <span className={styles.pillarIcon}>
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className={styles.pillarCopy}>
                      <span className={styles.pillarTitle}>{pillar.title}</span>
                      <span className={styles.pillarBody}>{pillar.description}</span>
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className={styles.actions}>
              <a
                href={paths.needHelp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--lg btn--primary btn--block"
              >
                <span>Solicitar orientación y acompañamiento</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a
                href={KALEO_DATA.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.legalLink}
              >
                <span>Acceder a la plataforma Kaleo</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className={styles.note}>
          <p>{KALEO_DATA.coreValue}</p>
        </Reveal>

        <Reveal className={styles.disclaimer}>
          <ShieldAlert size={18} aria-hidden="true" className={styles.disclaimerIcon} />
          <p>
            {BANCO_VIVO.disclaimer} Kaleo facilita orientación y conexión según la cobertura y
            los recursos disponibles: no sustituye los servicios oficiales de emergencia, salud o
            protección. Si existe peligro inmediato, contacta a los servicios de emergencia de tu
            territorio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
