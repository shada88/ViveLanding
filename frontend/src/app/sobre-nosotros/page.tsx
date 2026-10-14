import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';
import { AmbientVideo } from '@/components/visuals/AmbientVideo';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import { PurposeSection } from '@/components/sections/PurposeSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { DeclarationFullSection } from '@/components/sections/DeclarationFullSection';
import { GovernanceSection } from '@/components/sections/GovernanceSection';
import { INSTITUTIONAL_IDENTITY } from '@/domain/entities/Institutional';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'Historia, tesis territorial, Declaración Vivesperanza completa y gobernanza de la Fundación Vive con Esperanza: Educación para el Desarrollo Sostenible y Gestión del Riesgo en las Américas.',
  alternates: { canonical: '/sobre-nosotros' },
};

const ORIGIN_VIDEO = '/Video/Dove_and_dog_in_rain_20260921145005.mp4';

/**
 * La cadena que la red conecta. Es el motivo visual de todo el sitio dicho en
 * siete palabras: cada nodo habilita al siguiente y el último —esperanza— es
 * el único en dorado, porque es lo que vale.
 */
const NETWORK_CHAIN = [
  'Personas',
  'Escuelas',
  'Conocimiento',
  'Territorio',
  'Oportunidades',
  'Desarrollo',
  'Esperanza',
] as const;

/**
 * /sobre-nosotros — la profundidad institucional que la landing poda.
 *
 * La landing es un recorrido de conversión: cada bloque denso que se interpone
 * entre la persona y el registro le cuesta escuelas. Lo que la detenía —los
 * seis artículos completos, las biografías, el manifiesto— no se borró: se
 * mudó acá, donde quien quiere leerlo vino a hacerlo.
 *
 * Orden de la página, de lo humano a lo formal:
 *   Hero institucional · 01 Origen · 02 Tesis territorial (propósito y red)
 *   03 Declaración completa · 04 Gobernanza · Cierre de vuelta a la landing
 */
export default function AboutPage() {
  return (
    <>
      <Header />

      <main id="contenido">
        {/* ── Hero institucional ── */}
        <section className={`section ${styles.hero}`} aria-labelledby="sobre-titulo">
          <ParticleNetwork density="soft" className={styles.net} />
          <span className={`ambient ambient--blue ${styles.glow}`} aria-hidden="true" />

          <div className={`shell ${styles.heroInner}`}>
            <Link href="/" className={styles.back}>
              <ArrowLeft size={16} aria-hidden="true" />
              <span>Volver a la landing</span>
            </Link>

            <p className="eyebrow">Sobre Nosotros</p>
            <h1 id="sobre-titulo" className={`display ${styles.heroTitle}`}>
              Educación para el Desarrollo Sostenible (EDS) y Gestión del Riesgo (GRD){' '}
              <span className="accent">en las Américas</span>
            </h1>
            <p className={`lede ${styles.heroLede}`}>
              Convertimos escuelas en motores de desarrollo local. Esta es la historia, la tesis y
              el compromiso que sostienen ese trabajo.
            </p>
            <p className={styles.legal}>
              {INSTITUTIONAL_IDENTITY.legalName} · <strong>NIT {INSTITUTIONAL_IDENTITY.nit}</strong>
            </p>
          </div>
        </section>

        {/* ── 01 · Historia de origen ── */}
        <section id="origen" className="section" aria-labelledby="origen-titulo">
          <div className={`shell split split--lead ${styles.origin}`}>
            <Reveal className={styles.originMedia}>
              <AmbientVideo
                src={ORIGIN_VIDEO}
                description="Una paloma blanca posada sobre la cabeza de un perro bajo la lluvia: Esperanza y Cocoperro."
              />
            </Reveal>

            <div className={styles.originCopy}>
              <Reveal index={0}>
                <p className="eyebrow">
                  <span className={styles.step}>01</span>
                  Historia de origen
                </p>
              </Reveal>
              <Reveal index={1}>
                <h2 id="origen-titulo" className={`h2 ${styles.originTitle}`}>
                  Una paloma, un perro y la lluvia
                </h2>
              </Reveal>
              <Reveal index={2}>
                <p className={styles.prose}>
                  Esperanza es una paloma blanca. Cocoperro es un perro. Los dos se encuentran bajo
                  la lluvia, y esa escena —ella posada sobre su cabeza, los dos sosteniéndose en
                  medio de la tormenta— es el origen de la fundación.
                </p>
              </Reveal>
              <Reveal index={3}>
                <p className={styles.prose}>
                  De ahí nace el enfoque: niñas, niños y jóvenes no como receptores pasivos de la
                  ayuda, sino como los primeros reconstructores del tejido comunitario.
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 02 · Tesis territorial ── */}
        <section
          id="tesis"
          className={`section section--tight ${styles.thesis}`}
          aria-labelledby="tesis-titulo"
        >
          <div className="shell">
            <Reveal index={0}>
              <p className="eyebrow">
                <span className={styles.step}>02</span>
                Tesis territorial
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="tesis-titulo" className={styles.thesisTitle}>
                Los territorios no están vacíos: <span className="gold-text">están desconectados.</span>
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className={`lede ${styles.thesisLede}`}>
                Casi todo lo que un territorio necesita para transformarse ya está en sus escuelas,
                sus familias y sus instituciones. El trabajo de la fundación es tender la red que
                los conecta.
              </p>
            </Reveal>

            <Reveal className={styles.chainWrap}>
              <ol className={styles.chain} aria-label="El modelo de red de conexiones">
                {NETWORK_CHAIN.map((node, i) => (
                  <li
                    key={node}
                    className={`${styles.chainNode} ${
                      i === NETWORK_CHAIN.length - 1 ? styles.chainNodeGold : ''
                    }`}
                  >
                    <span className={styles.chainDot} aria-hidden="true" />
                    <span className={styles.chainLabel}>{node}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <PurposeSection />
        <EcosystemSection />

        {/* ── 03 · Declaración completa (incluye la firma en Change.org) ── */}
        <DeclarationFullSection step="03" />

        {/* ── 04 · Gobernanza y liderazgo ── */}
        <GovernanceSection step="04" />

        {/* ── Cierre: de vuelta al recorrido ── */}
        <section className="section section--sunken" aria-labelledby="cierre-titulo">
          <div className={`shell ${styles.close}`}>
            <Reveal index={0}>
              <h2 id="cierre-titulo" className={`h2 ${styles.closeTitle}`}>
                Del documento a la escuela
              </h2>
            </Reveal>
            <Reveal index={1}>
              <p className={`lede ${styles.closeLede}`}>
                La Declaración se cumple en el aula. Suma tu escuela u organización a la red, o
                empieza hoy por la Ruta B.
              </p>
            </Reveal>
            <Reveal index={2} className={`cta-row ${styles.closeActions}`}>
              <Link href="/#participar" className="btn btn--lg btn--primary">
                <span>Unirse a la red</span>
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/#ruta-b" className="btn btn--lg btn--outline">
                <span>Iniciar la Ruta B</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
