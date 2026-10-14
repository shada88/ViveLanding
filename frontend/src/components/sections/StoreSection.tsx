import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Mic, Newspaper } from 'lucide-react';
import {
  STORE_INTRO,
  STORE_MISSION,
  STORE_OFFERS,
  type StoreActionTone,
} from '@/domain/entities/StoreItem';
import { Reveal } from '@/components/motion/Reveal';
import styles from './StoreSection.module.css';

const ACTION_TONE: Record<StoreActionTone, string> = {
  gold: 'btn--gold',
  primary: 'btn--primary',
  outline: 'btn--outline',
};

/**
 * 05 — Sostén la transformación (`#tienda`).
 *
 * La Ruta B sigue siendo la vía programática. Los tres materiales son
 * complementarios y sus precios son referencias, no tarifas confirmadas.
 * Cada consulta abre WhatsApp con el texto listo; no envía el mensaje.
 */
export function StoreSection() {
  return (
    <section
      id="tienda"
      className={`section ${styles.root}`}
      aria-labelledby="tienda-titulo"
    >
      <div id="programas" aria-hidden="true" className={styles.anchor} />
      <div id="sosten" aria-hidden="true" className={styles.anchor} />

      <div className="shell">
        <header className={styles.header}>
          <Reveal index={0}>
            <p className="eyebrow">{STORE_INTRO.eyebrow}</p>
          </Reveal>
          <Reveal index={1}>
            <h2 id="tienda-titulo" className={`h2 ${styles.title}`}>
              {STORE_INTRO.titleLead}{' '}
              <span className={styles.titleRest}>{STORE_INTRO.titleRest}</span>
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className={`lede ${styles.lede}`}>{STORE_INTRO.lede}</p>
          </Reveal>
        </header>

        <div className={styles.mission}>
          <div className={styles.support}>
            <article className={styles.priority}>
              <p className={styles.priorityMark}>{STORE_MISSION.priority.label}</p>
              <h4 className={styles.priorityTitle}>{STORE_MISSION.priority.title}</h4>
              <p className={styles.wayText}>{STORE_MISSION.priority.text}</p>
              <p className={styles.priorityNote}>{STORE_MISSION.priority.note}</p>
              <a href={STORE_MISSION.priority.href} className="link-arrow">
                <span>{STORE_MISSION.priority.action}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>

            <ul className={styles.complements}>
              {STORE_MISSION.complements.map((way) => (
                <li key={way.id} className={styles.complement}>
                  <h4 className={styles.complementTitle}>{way.title}</h4>
                  <p className={styles.wayText}>{way.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className={styles.catalog}>
          {STORE_OFFERS.map((offer) => (
            <li key={offer.id} className={styles.cardItem}>
              <article id={`pieza-${offer.id}`} className={styles.card}>
                <figure className={styles.figure}>
                  <div className={styles.visual}>
                    <Image
                      src={offer.image}
                      alt={offer.imageAlt}
                      fill
                      sizes="(max-width: 739px) 100vw, (max-width: 1179px) 50vw, 380px"
                      className={styles.visualImage}
                    />
                  </div>
                </figure>

                <div className={styles.cardBody}>
                  <div className={styles.identity}>
                    <p className={styles.category}>{offer.categoryLabel}</p>
                    <p className={styles.descriptor}>{offer.descriptor}</p>
                    <p className={styles.kind}>{offer.kind}</p>
                    <h3 className={styles.productName}>{offer.name}</h3>
                  </div>

                  <p className={styles.description}>{offer.description}</p>
                  <p className={styles.useful}>
                    <span className={styles.usefulLabel}>Útil para: </span>
                    {offer.usefulFor}
                  </p>

                  <div className={styles.foot}>
                    <p className={styles.price}>
                      <span className={styles.priceAmount}>{offer.priceAmount}</span>
                      <span> · precio de referencia</span>
                    </p>
                    <div className={styles.actions}>
                      {offer.actions.map((action) => (
                        <a
                          key={action.label}
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`btn ${styles.action} ${ACTION_TONE[action.tone]}`}
                        >
                          <span className={styles.actionLabel}>{action.label}</span>
                          <ArrowUpRight size={16} aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <hr className="hairline" />

        <Reveal className={styles.press}>
          <div className={styles.pressItem}>
            <Newspaper size={18} aria-hidden="true" className={styles.pressIcon} />
            <div>
              <p className={styles.pressTitle}>Sala de prensa</p>
              <p className={styles.pressBody}>
                Comunicados oficiales, material gráfico y vocería institucional.
              </p>
              <a
                href="https://info.vivesperanza.org/press/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow"
              >
                <span>Abrir sala de prensa</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className={styles.pressItem}>
            <Mic size={18} aria-hidden="true" className={styles.pressIcon} />
            <div>
              <p className={styles.pressTitle}>VPodcast</p>
              <p className={styles.pressBody}>
                Conversaciones sobre gestión del riesgo, infancias y territorio.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
