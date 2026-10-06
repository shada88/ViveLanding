import React from 'react';
import { AppWindow, ArrowRight, Camera, Clapperboard } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { AmericasNetwork } from '@/components/visuals/AmericasNetwork';
import styles from './TerritorySection.module.css';

/** Categorías del Rally. Los íconos nombran el medio, no decoran el texto. */
const CATEGORIES = [
  {
    icon: Camera,
    title: 'Fotografía y arte digital',
  },
  {
    icon: Clapperboard,
    title: 'Música y Cortometraje',
  },
  {
    icon: AppWindow,
    title: 'Aplicaciones tecnológicas con tecnologías emergentes',
  },
];

/**
 * 07 — Territorio y alcance continental.
 *
 * El mapa NO es un dato geográfico: es el argumento de la sección. Un problema
 * que una escuela de Costa Rica resolvió sirve en Chile, y esa transferencia
 * es lo único que las líneas entre nodos representan.
 *
 * El Rally Continental vive acá y no en Programas porque es la forma concreta
 * que toma esa conexión entre territorios. Separarlos dejaría al mapa sin
 * consecuencia y al Rally sin escala.
 */
export function TerritorySection() {
  return (
    <section id="territorio" className="section" aria-labelledby="territorio-titulo">
      <div className="shell">
        <div className={styles.layout}>
          <div className={styles.copy}>
            <header className={styles.intro}>
              <Reveal index={0}>
                <p className="eyebrow">
                  <span className={styles.step}>05</span>
                  Convocatoria Continental
                </p>
              </Reveal>

              <Reveal index={1} className={styles.logoTitleWrapper}>
                {/* El logotipo ampliado funciona directamente como el título principal de la sección */}
                <BrandLogo
                  brand="rally"
                  tone="as-is"
                  height={240}
                  className={styles.rallyMainLogo}
                />
                <h2 id="territorio-titulo" className="sr-only">
                  Rally Continental 2028: Innovación para los territorios, escuela por escuela
                </h2>
              </Reveal>

              <Reveal index={2}>
                <h3 className={`h3 ${styles.rallyTitle}`}>
                  Innovación para los territorios, escuela por escuela
                </h3>
              </Reveal>

              <Reveal index={3}>
                <p className={`lede ${styles.rallyBody}`}>
                  La convocatoria insignia de la Vivesperanza convierte el aula en un laboratorio
                  de desarrollo sostenible y gestión del riesgo de desastres, desarrollando
                  procesos de innovación y protección territorial apoyados con tecnologías
                  emergentes. Abierta a todo plantel del continente, público o privado. Una
                  iniciativa que históricamente ha contado con el apoyo de instituciones como
                  UNESCO, OEA, UNDRR y UNEP, así como ministerios de educación, ambiente y
                  cultura de todo el hemisferio.
                </p>
              </Reveal>
            </header>

            <Reveal className={styles.rally}>

              <ul className={styles.categories}>
                {CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className={styles.category}>
                      <Icon size={18} aria-hidden="true" className={styles.categoryIcon} />
                      <div>
                        <p className={styles.categoryTitle}>{item.title}</p>
                        {item.body ? <p className={styles.categoryBody}>{item.body}</p> : null}
                      </div>
                    </li>
                  );
                })}
              </ul>

              <a href="#participar" className="btn btn--lg btn--primary">
                <span>Preinscribir mi escuela</span>
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <Reveal className={styles.map}>
            <AmericasNetwork />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
