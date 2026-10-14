import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AmbientVideo } from '@/components/visuals/AmbientVideo';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import styles from './HeroStory.module.css';

const HERO_VIDEO = '/Video/Dove_and_dog_in_rain_20260921145005.mp4';

/**
 * Hero de la portada, tomado del landing de referencia y compuesto a la
 * izquierda. La barra no muestra cifras de impacto: son las cuatro piezas
 * del modelo.
 *
 * La Ruta B y la Ruta A viven en la sección siguiente (`#ruta-b`, `#ruta-a`).
 */
const CHIPS = [
  'Aprendizaje aplicado',
  'Liderazgo juvenil',
  'Gestión del riesgo',
  'Trabajo en red',
] as const;

const INDICATORS = [
  { value: 'Ruta B', label: 'Transformación escolar continua' },
  { value: 'Ruta A', label: 'Orientación ante emergencias' },
  { value: 'Liderazgo', label: 'Niñas, niños y jóvenes al centro' },
  { value: 'En red', label: 'Escuelas, comunidades y aliados' },
] as const;

export function HeroStory() {
  return (
    <section className={styles.hero} aria-labelledby="hero-titulo">
      <AmbientVideo
        src={HERO_VIDEO}
        variant="backdrop"
        description="Una paloma y un perro se encuentran bajo la lluvia."
      />
      <ParticleNetwork density="soft" className={styles.net} />
      <span className={`ambient ambient--gold ${styles.glow}`} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Una ruta práctica para transformar la escuela</p>

          <h1 id="hero-titulo" className={`display ${styles.title}`}>
            Transforma tu escuela en un{' '}
            <span className={styles.titleAccent}>modelo de desarrollo local</span>
          </h1>

          <p className={`lede ${styles.lede}`}>
            Acompañamos a comunidades educativas para que niñas, niños y jóvenes
            investiguen desafíos reales, lideren soluciones locales y fortalezcan
            sus capacidades frente a los riesgos.
          </p>

          <div className={styles.actions}>
            <a href="#ruta-b" className="btn btn--lg btn--gold">
              <span>Explorar la Ruta B</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#alianzas" className="btn btn--lg btn--primary">
              <span>Construir una alianza</span>
            </a>
          </div>

          <p className={styles.emergency}>
            ¿Tu escuela afronta una emergencia?{' '}
            <a href="#ruta-a" className={styles.emergencyLink}>
              Ve a la Ruta A y conoce el siguiente paso con Kaleo
            </a>
            .
          </p>

          <ul className={styles.chips} aria-label="Enfoques del modelo">
            {CHIPS.map((chip) => (
              <li key={chip} className={styles.chip}>
                {chip}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bar} aria-label="Componentes del modelo">
          {INDICATORS.map((item) => (
            <div key={item.value} className={styles.item}>
              <p className={styles.value}>{item.value}</p>
              <p className={styles.label}>{item.label}</p>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          Un modelo que conecta aprendizaje escolar, liderazgo juvenil y
          colaboración intersectorial.
        </p>
      </div>

      <p className="sr-only">
        De fondo, una paloma blanca posada sobre la cabeza de un perro bajo la lluvia:
        Esperanza y Cocoperro, los dos personajes que dieron origen a la fundación.
      </p>
    </section>
  );
}
