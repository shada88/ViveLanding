import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import { INSTITUTIONAL_IDENTITY } from '@/domain/entities/Institutional';
import { PurposeSection } from '@/components/sections/PurposeSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { DeclarationFullSection } from '@/components/sections/DeclarationFullSection';
import { GovernanceSection } from '@/components/sections/GovernanceSection';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description:
    'Historia, tesis territorial, Declaración Vivesperanza completa y gobernanza de la Fundación Vive con Esperanza: Educación para el Desarrollo Sostenible y Gestión del Riesgo en las Américas.',
  alternates: { canonical: '/sobre-nosotros' },
};

const ORIGIN_IMAGE = '/recursos/origen-cocoperro-esperanza-lluvia.jpg';

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
              <span className={styles.heroLine}>Educación que transforma.</span>{' '}
              <span className={`accent ${styles.heroLine}`}>Comunidades que avanzan.</span>
            </h1>
            <p className={`lede ${styles.heroLede}`}>
              Conoce nuestra historia, la tesis que orienta nuestro trabajo y nuestro compromiso con
              la Educación para el Desarrollo Sostenible (EDS) y la Gestión del Riesgo (GRD) en las
              Américas.
            </p>
            <p className={styles.legal}>{INSTITUTIONAL_IDENTITY.legalName}</p>
          </div>
        </section>

        {/* ── 01 · Historia de origen ──
            La foto vive en una forma orgánica que respira despacio. El recorte
            guarda la ciudad, el farol y, abajo a la derecha, al perro con la
            paloma: esa esquina es la menos redondeada para no cortarlos. */}
        <section id="origen" className="section" aria-labelledby="origen-titulo">
          <div className={`shell split split--lead ${styles.origin}`}>
            <Reveal className={styles.originMedia}>
              <div className={styles.originFrame}>
                <Image
                  src={ORIGIN_IMAGE}
                  alt="Una calle de ciudad bajo la lluvia. Junto a un farol encendido, un perro callejero sentado mira hacia arriba; una paloma blanca está posada sobre su cabeza."
                  fill
                  sizes="(min-width: 900px) 50vw, 100vw"
                  quality={80}
                  className={styles.originImage}
                />
                <span className={styles.originRim} aria-hidden="true" />
              </div>
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
                  Cocoperro es un perro callejero. Esperanza es una paloma blanca. Los dos se
                  encuentran bajo la lluvia, y esa escena —ella posada sobre su cabeza, los dos
                  sosteniéndose en medio de la tormenta— es el origen de la fundación.
                </p>
              </Reveal>
              <Reveal index={3}>
                <p className={styles.prose}>
                  De ahí nace el enfoque: niñas, niños y jóvenes no como receptores pasivos de la
                  ayuda, sino como los primeros reconstructores del tejido comunitario para
                  enfrentar los desafíos del presente y del futuro.
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
