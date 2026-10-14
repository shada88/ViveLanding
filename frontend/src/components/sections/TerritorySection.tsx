import React from 'react';
import Image from 'next/image';
import {
  AppWindow,
  ArrowRight,
  Camera,
  Clapperboard,
  FileText,
  type LucideIcon,
} from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { TERRITORY_NODES } from '@/domain/entities/Territory';
import styles from './TerritorySection.module.css';

interface CategoryItem {
  icon: LucideIcon;
  title: string;
  body?: string;
}

/** Categorías del Rally. Los íconos nombran el medio, no decoran el texto. */
const CATEGORIES: CategoryItem[] = [
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
    title: 'Aplicaciones tecnológicas de vanguardia',
  },
];

/**
 * Documento oficial de bases del Rally.
 *
 * Hoy NO hay un PDF publicado en el repositorio, y un botón de descarga que
 * lleva a un 404 destruye justo la confianza que esta sección construye. Mientras
 * sea `null`, el botón pide las bases por el formulario. Cuando exista el
 * archivo, se deja en `public/docs/rally/` y se pone su ruta acá: el botón pasa
 * solo a descarga directa.
 */
const RALLY_BASES_URL: string | null = null;

/**
 * 03 — Rally Continental 2028.
 *
 * El mapa NO es un dato geográfico: es el argumento de la sección. Un problema
 * que una escuela de Costa Rica resolvió sirve en Chile, y esa transferencia
 * es lo que el continente representa. La pieza visible es la ilustración
 * entregada: el continente con el perro y las aves. Los países siguen en
 * texto para quien no ve la imagen.
 *
 * El Rally Continental vive acá y no en Programas porque es la forma concreta
 * que toma esa conexión entre territorios. Separarlos dejaría al mapa sin
 * consecuencia y al Rally sin escala.
 */
export function TerritorySection() {
  return (
      <section id="rally" className="section" aria-labelledby="territorio-titulo">
        <div className="shell">
          <div className={styles.layout}>
            <div className={styles.copy}>
              <header className={styles.intro}>
                <Reveal index={0}>
                  <p className="eyebrow">
                    <span className={styles.step}>03</span>
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
                    La convocatoria insignia de Vivesperanza convierte el aula en un laboratorio
                    de desarrollo sostenible y gestión del riesgo de desastres, desarrollando
                    procesos de innovación y protección territorial apoyados con tecnologías
                    emergentes. Abierta a todo plantel del continente, público o privado. Una
                    iniciativa que históricamente ha contado con el apoyo de instituciones como
                    UNESCO, OEA, UNDRR y UNEP, así como ministerios de educación, ambiente y cultura
                    de todo el hemisferio.
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

                <div className="cta-row">
                  <a href="#participar" className="btn btn--lg btn--primary">
                    <span>Preinscribir mi escuela al Rally</span>
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                  {RALLY_BASES_URL ? (
                    <a href={RALLY_BASES_URL} className="btn btn--lg btn--outline" download>
                      <FileText size={18} aria-hidden="true" />
                      <span>Descargar las bases oficiales</span>
                    </a>
                  ) : (
                    <a href="#participar" className="btn btn--lg btn--outline">
                      <FileText size={18} aria-hidden="true" />
                      <span>Solicitar las bases oficiales</span>
                    </a>
                  )}
                </div>
              </Reveal>
            </div>

            <Reveal className={styles.map}>
              <div className={styles.mapStage}>
                <Image
                  src="/recursos/rally-mapa-brillo.png"
                  alt="Mapa de las Américas con un perro y varias aves"
                  width={810}
                  height={1358}
                  sizes="(min-width: 980px) 540px, 22rem"
                  quality={92}
                  className={styles.mapImage}
                />
                <p className="sr-only">
                  Territorios conectados por la red de la fundación:{' '}
                  {TERRITORY_NODES.map((node) => node.label).join(', ')}.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
  );
}
