'use client';

import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import { AmbientVideo } from '@/components/visuals/AmbientVideo';
import styles from './HeroStory.module.css';

/**
 * Tres datos, no tres tarjetas. Son el sostén fáctico de la promesa del
 * titular: cuánto tarda la herramienta, dónde llega la red y con quién.
 */
const PROOF = [
  { value: '10–45 min', label: 'Lo que tarda una escuela en evaluar su predio y volver a abrir.' },
  { value: '14 países', label: 'Comunidades educativas enlazadas de Canadá a la Patagonia.' },
  { value: '3 fases', label: 'Prevenir, actuar y recuperar. Ningún caso queda abierto en silencio.' },
];

const HERO_VIDEO = '/Video/Dove_and_dog_in_rain_20260921145005.mp4';

/**
 * Hero — una declaración de propósito, no una interfaz.
 *
 * La escena de la paloma y el perro es el FONDO de la sección completa, no una
 * pieza recortada dentro de una columna. El motivo es puramente de encuadre: el
 * video está compuesto según la regla de los tercios, con la paloma en la
 * casilla 3 y el perro cruzando la 6 y la 9. Recortado en una forma orgánica
 * dentro de media columna, los dos personajes quedaban fuera del recorte — se
 * veía lluvia sobre azul y nada más.
 *
 * De ahí sale toda la composición: el peso narrativo del video vive a la
 * DERECHA, así que el texto ocupa el tercio izquierdo, donde el video es azul
 * plano. No es una decisión estética, es leer el material antes de encuadrarlo.
 *
 * El degradado de acento se usa UNA VEZ en toda la página y es acá. Dos líneas
 * con degradado lo convierten en decoración de bloque y le sacan todo el peso
 * a la frase que sostiene la marca.
 */
export function HeroStory() {
  return (
    <section className={styles.hero} aria-labelledby="hero-titulo">
      <AmbientVideo
        src={HERO_VIDEO}
        variant="backdrop"
        description="Una paloma y un perro se encuentran bajo la lluvia."
      />

      {/* La red va POR ENCIMA del video pero por debajo del texto: enlaza la
          escena con el resto de la página en vez de quedar tapada por ella. */}
      <ParticleNetwork density="soft" className={styles.net} />
      <span className={`ambient ambient--gold ${styles.glow}`} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="eyebrow">EDS / GRD para las Américas</p>

          <h1 id="hero-titulo" className={`display ${styles.title}`}>
            Convertimos escuelas en{' '}
            <span className="accent">motores de desarrollo local</span>
          </h1>

          <p className={`lede ${styles.lede}`}>
            La escuela ya está en el barrio, ya conoce a las familias y ya abre sus
            puertas todos los días. Nosotros le damos lo que le falta: herramientas,
            método y una red que la sostiene cuando algo pasa.
          </p>

          <div className={`cta-row ${styles.actions}`}>
            <a href="#ecosistema" className="btn btn--lg btn--primary">
              <span>Conocer el ecosistema</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href="#herramientas" className="btn btn--lg btn--outline">
              <span>Herramientas para mi escuela</span>
            </a>
          </div>
        </div>

        <div className={styles.proof}>
          {PROOF.map((item) => (
            <div key={item.value} className={styles.proofItem}>
              <span className="figure-value">{item.value}</span>
              <span className="figure-label">{item.label}</span>
            </div>
          ))}
        </div>

        <a href="#proposito" className={styles.scrollCue}>
          <ArrowDown size={16} aria-hidden="true" />
          <span>Por qué existimos</span>
        </a>
      </div>

      {/* La escena cuenta algo y su descripción no puede vivir solo en un
          atributo del video: como fondo, el elemento está marcado
          `aria-hidden`. Acá viaja en texto real para lectores de pantalla. */}
      <p className="sr-only">
        De fondo, una paloma blanca posada sobre la cabeza de un perro bajo la lluvia:
        Esperanza y Cocoperro, los dos personajes que dieron origen a la fundación.
      </p>
    </section>
  );
}
