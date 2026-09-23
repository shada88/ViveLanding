import React from 'react';
import { ArrowRight, Camera, Clapperboard, ShieldAlert } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { AmericasNetwork } from '@/components/visuals/AmericasNetwork';
import { SectionIntro } from './SectionIntro';
import styles from './TerritorySection.module.css';

/** Categorías del Rally. Los íconos nombran el medio, no decoran el texto. */
const CATEGORIES = [
  {
    icon: Camera,
    title: 'Fotografía ambiental',
    body: 'Documentar el patrimonio y la biodiversidad que solo conoce quien vive ahí.',
  },
  {
    icon: Clapperboard,
    title: 'Arte digital y cortometrajes',
    body: 'Narrativas audiovisuales hechas por jóvenes sobre su propio territorio.',
  },
  {
    icon: ShieldAlert,
    title: 'Proyectos de gestión del riesgo',
    body: 'Acciones concretas de mitigación en el predio escolar y en el barrio.',
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
            <SectionIntro
              step="07"
              eyebrow="Continental"
              titleId="territorio-titulo"
              title="Lo que funciona en un territorio no se queda allí"
              lede="Trabajamos de Canadá a la Patagonia. Cada protocolo que una comunidad educativa prueba y ajusta vuelve a la red corregido, y la siguiente escuela ya no empieza de cero."
              className={styles.intro}
            />

            <Reveal className={styles.rally}>
              {/* El logotipo ocupa el lugar del antiguo kicker de texto: ya dice
                  «Rally Continental 2028», y repetirlo debajo en mayúsculas era
                  decir dos veces lo mismo. El nombre no se pierde para quien no
                  ve la imagen — viaja en el `alt` del archivo de marca. */}
              <BrandLogo
                brand="rally"
                tone="as-is"
                height={160}
                className={styles.rallyLogo}
              />
              <h3 className={`h3 ${styles.rallyTitle}`}>
                Innovación para los territorios, escuela por escuela
              </h3>
              <p className={styles.rallyBody}>
                La convocatoria insignia de la fundación. Convierte el aula en un
                laboratorio de desarrollo sostenible tomando como punto de partida un
                problema real del barrio. Abierta a todo plantel del continente, público
                o privado, sin importar su presupuesto.
              </p>

              <ul className={styles.categories}>
                {CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title} className={styles.category}>
                      <Icon size={18} aria-hidden="true" className={styles.categoryIcon} />
                      <div>
                        <p className={styles.categoryTitle}>{item.title}</p>
                        <p className={styles.categoryBody}>{item.body}</p>
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
