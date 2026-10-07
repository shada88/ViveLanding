'use client';

import React, { useId, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { KALEO_DATA } from '@/domain/entities/Kaleo';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './BancoVivoSection.module.css';

const GAINS = [
  {
    label: 'Acceso anticipado',
    body: 'Recibe antes que el público las guías del año, el mapa de experiencias de su tipo de evento y las alertas de prevención.',
  },
  {
    label: 'Voz en Kaleo a su elección',
    body: 'Testimonio acreditado o testimonio protegido. En ambos casos puede aceptar o reservar una conversación con otra escuela.',
  },
  {
    label: 'Crédito en acceso a mecanismos del banco',
    body: 'Si el relato entra a formar parte de un libro o serie, la escuela figura como comunidad de origen, con beneficios excepcionales en materiales de prevención Vivesperanza.',
  },
  {
    label: 'Estatus de escuela referente',
    body: 'En el mapa de capacidades queda marcada como escuela que ya atravesó ese evento y acepta acompañar a otra. Eso la vuelve nodo, no solo usuaria.',
  },
] as const;

/**
 * 02 — Banco Vivo.
 *
 * Formar parte es compartir lo vivido. El nombre de la sección no se repite
 * en este bloque: ya está en el encabezado y en la marca.
 */
export function BancoVivoSection() {
  const panelId = useId();
  const [benefitsOpen, setBenefitsOpen] = useState(false);

  return (
    <section id="banco-vivo" className="section" aria-labelledby="banco-vivo-titulo">
      <div className="shell">
        <div className={styles.heading}>
          <SectionIntro
            className={styles.intro}
            step="02"
            eyebrow="Banco Vivo"
            titleId="banco-vivo-titulo"
            title="Transformamos experiencias reales de emergencias y desastres en conocimiento útil para otras escuelas."
            lede="Una comunidad que ya vivió una emergencia comparte lo aprendido. Una escuela que enfrenta una situación similar encuentra orientación, experiencia y apoyo."
          />
          <Image
            src="/recursos/banco-vivo.png"
            alt="Banco Vivo. Infraestructura de experiencias de valor en emergencias y desastres."
            width={980}
            height={244}
            className={styles.mark}
          />
        </div>

        <div className={styles.block}>
          <h3 className={styles.blockTitle}>Cómo formar parte</h3>
          <Reveal id="compartir-experiencia" className={styles.path} index={0}>
            <p className={styles.pathKicker}>Comparte lo que viviste</p>
            <p className={styles.pathBody}>
              Tu experiencia tiene valor para otra escuela. Comparte lo ocurrido, las
              decisiones tomadas y los aprendizajes que quedaron. Con consentimiento y
              protección de la información, se convierte en conocimiento para otros.
            </p>
          </Reveal>
        </div>

        <div className={styles.benefits}>
          <Image
            src="/recursos/banco-vivo-simbolo.png"
            alt=""
            width={175}
            height={220}
            aria-hidden="true"
            className={styles.benefitsMark}
          />
          <h3 className={styles.benefitsTitle}>
            <button
              type="button"
              className={styles.benefitsTrigger}
              aria-expanded={benefitsOpen}
              aria-controls={panelId}
              onClick={() => setBenefitsOpen((open) => !open)}
            >
              <span>Beneficios para tu escuela</span>
              <ChevronDown
                size={18}
                aria-hidden="true"
                className={benefitsOpen ? styles.chevronOpen : styles.chevron}
              />
            </button>
          </h3>
          {!benefitsOpen && (
            <p className={styles.benefitsPreview}>
              Acceso anticipado, voz en Kaleo, crédito en el banco y estatus de escuela referente.
            </p>
          )}
          <div
            id={panelId}
            className={benefitsOpen ? `${styles.panel} ${styles.panelOpen}` : styles.panel}
            role="region"
            aria-label="Beneficios para tu escuela"
          >
            <ol className={styles.gains}>
              {GAINS.map((gain) => (
                <li key={gain.label} className={styles.gain}>
                  <p className={styles.gainLabel}>{gain.label}</p>
                  <p className={styles.gainBody}>{gain.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.close}>
          <a
            href={KALEO_DATA.appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--lg btn--primary"
          >
            <span>Compartir una experiencia</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            href="/docs/banco-vivo/documento-testimonio.docx"
            className="link-arrow"
            download
          >
            Documento legal
          </a>
        </div>

      </div>
    </section>
  );
}
