'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { FOREST_VOICES } from '@/domain/entities/Bird';
import { Reveal } from '@/components/motion/Reveal';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import { SectionIntro } from './SectionIntro';
import styles from './ForestVoicesSection.module.css';

/**
 * 08 — Las Voces del Bosque.
 *
 * Un catálogo exploratorio de personajes, no una galería de imágenes. La
 * diferencia está en que acá cada ave declara QUÉ ENSEÑA: la imagen es la
 * puerta, el aprendizaje es el contenido.
 *
 * Patrón de pestañas completo, y no un carrusel de miniaturas con `:hover`:
 *
 * - **Tabulación con una sola parada.** Las siete miniaturas ocupan UN lugar en
 *   el orden de tabulación —`tabIndex` -1 en las inactivas— y se recorren con
 *   las flechas. Siete paradas de tabulación para elegir un personaje es un
 *   laberinto para quien navega con teclado.
 * - **Las flechas dan la vuelta.** Al llegar a Omar, la derecha vuelve a
 *   Esperanza: un catálogo circular no tiene por qué tener un final duro.
 * - **El foco sigue a la selección.** Al mover con flechas se enfoca la nueva
 *   miniatura, o el teclado quedaría operando sobre algo que ya no está activo.
 *
 * Las imágenes pesan alrededor de 500 KB cada una. Solo la primera se carga
 * con prioridad; las otras seis son diferidas. Cargar las siete de entrada
 * serían 3,4 MB por una sección que quizá nadie abra.
 */
export function ForestVoicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = FOREST_VOICES[activeIndex];

  const focusTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const last = FOREST_VOICES.length - 1;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        focusTab(activeIndex === last ? 0 : activeIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        focusTab(activeIndex === 0 ? last : activeIndex - 1);
        break;
      case 'Home':
        event.preventDefault();
        focusTab(0);
        break;
      case 'End':
        event.preventDefault();
        focusTab(last);
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="voces"
      className={`section section--ink ${styles.section}`}
      aria-labelledby="voces-titulo"
    >
      <ParticleNetwork density="soft" interactive={false} />
      <span className={`ambient ambient--gold ${styles.glow}`} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <SectionIntro
          step="08"
          eyebrow="Las Voces del Bosque"
          titleId="voces-titulo"
          tone="ink"
          title="Siete aves que le enseñan a la infancia lo que cuesta explicar"
          lede="Cuando el bosque de Esperanza fue destruido, sus amigos salieron a buscarla. Cada uno aprendió algo en ese viaje, y eso es exactamente lo que hoy enseñan en las aulas."
        />

        <Reveal className={styles.catalog}>
          {/* ── Escenario: el personaje activo ── */}
          <div
            className={styles.stage}
            id={`voz-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`voz-tab-${active.id}`}
            tabIndex={0}
          >
            <div className={styles.stageVisual}>
              <div className={styles.portrait}>
                {FOREST_VOICES.map((bird, i) => (
                  // Las siete imágenes se montan y se superponen con opacidad en
                  // lugar de intercambiarse: así el cambio es un fundido y no un
                  // hueco en blanco mientras el navegador decodifica la nueva.
                  <Image
                    key={bird.id}
                    src={bird.image}
                    alt={`${bird.name}, ${bird.species}`}
                    fill
                    sizes="(max-width: 899px) 90vw, 420px"
                    priority={i === 0}
                    loading={i === 0 ? undefined : 'lazy'}
                    className={`${styles.portraitImage} ${
                      i === activeIndex ? styles.portraitActive : ''
                    }`}
                  />
                ))}
                <span className={styles.portraitRim} aria-hidden="true" />
              </div>

              {/* Muñeco de felpa que acompaña al ave seleccionada, ubicado al lado exterior del círculo */}
              <aside
                className={styles.plushWrapper}
                aria-label={`Muñeco de felpa de ${active.name}`}
              >
                <div className={styles.plushContainer}>
                  {FOREST_VOICES.map((bird, i) => (
                    <Image
                      key={`plush-${bird.id}`}
                      src={bird.plushImage}
                      alt={`Muñeco de felpa de ${bird.name}`}
                      fill
                      sizes="130px"
                      loading={i === 0 ? undefined : 'lazy'}
                      className={`${styles.plushImage} ${
                        i === activeIndex ? styles.plushActive : ''
                      }`}
                    />
                  ))}
                </div>
                <span className={styles.plushTag}>Edición de felpa</span>
              </aside>
            </div>

            <div className={styles.details}>
              <p className={styles.species}>{active.species}</p>
              <h3 className={styles.name}>{active.name}</h3>
              <p className={styles.trait}>{active.trait}</p>

              <p className={styles.teachesLabel}>Qué enseña</p>
              <p className={styles.teaches}>{active.teaches}</p>

              <p className={styles.lesson}>{active.lesson}</p>
            </div>
          </div>

          {/* ── Bandada: las siete miniaturas ── */}
          <div
            className={styles.flock}
            role="tablist"
            aria-label="Personajes de Las Voces del Bosque"
            aria-orientation="horizontal"
            onKeyDown={onKeyDown}
          >
            {FOREST_VOICES.map((bird, i) => (
              <button
                key={bird.id}
                ref={(node) => {
                  tabRefs.current[i] = node;
                }}
                type="button"
                role="tab"
                id={`voz-tab-${bird.id}`}
                aria-controls={`voz-panel-${bird.id}`}
                aria-selected={i === activeIndex}
                tabIndex={i === activeIndex ? 0 : -1}
                className={`${styles.thumb} ${i === activeIndex ? styles.thumbActive : ''}`}
                onClick={() => setActiveIndex(i)}
              >
                <span className={styles.thumbImage}>
                  <Image
                    src={bird.image}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="88px"
                    loading="lazy"
                  />
                </span>
                <span className={styles.thumbName}>{bird.name}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
