import React from 'react';
import { ArrowUpRight, BookOpen, Mic, Newspaper, MessageCircle, Palette, type LucideIcon } from 'lucide-react';
import { STORE_ITEMS, STORE_WHATSAPP_URL, type StoreItem } from '@/domain/entities/StoreItem';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './StoreSection.module.css';

const ITEM_ICONS: Record<StoreItem['icon'], LucideIcon> = {
  BookOpen,
  Palette,
};

/**
 * 11 — Tienda con propósito.
 *
 * Lo que la distingue de un comercio electrónico no es la estética: es el
 * ORDEN de la información. Primero de dónde viene la pieza, después a qué se
 * destina lo recaudado, y recién al final qué es. Un catálogo hace exactamente
 * lo contrario, y por eso un catálogo nunca comunica pertenencia a algo mayor.
 *
 * No hay precios, ni carrito, ni botón de "agregar": la venta se cierra por
 * conversación, en WhatsApp. Traer aquí media experiencia de compra daría lo
 * peor de los dos mundos — la fricción del comercio sin la confianza del trato
 * directo.
 *
 * La sala de prensa viaja al pie de esta sección y no en una columna propia:
 * es material de consulta para periodistas, no una puerta de conversión, y
 * dedicarle media pantalla sería darle un peso que no tiene.
 */
export function StoreSection() {
  return (
    <section id="tienda" className="section" aria-labelledby="tienda-titulo">
      <div className="shell">
        <SectionIntro
          step="11"
          eyebrow="Tienda"
          titleId="tienda-titulo"
          title="Cada pieza financia algo que se puede nombrar"
          lede="No vendemos merchandising. Vendemos objetos que salieron del trabajo en territorio y que devuelven al territorio un resultado concreto: una impresión, un kit, un pasaje."
        />

        <div className={styles.items}>
          {STORE_ITEMS.map((item, i) => {
            const Icon = ITEM_ICONS[item.icon];
            return (
              <Reveal as="article" key={item.id} index={i} className={styles.item}>
                <span className={styles.itemIcon}>
                  <Icon size={22} aria-hidden="true" />
                </span>

                <h3 className={`h3 ${styles.itemName}`}>{item.name}</h3>
                <p className={styles.itemKind}>{item.kind}</p>
                <p className={styles.itemStory}>{item.story}</p>

                <p className={styles.itemFunds}>
                  <span className={styles.fundsLabel}>Financia</span>
                  {item.funds}
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal className={styles.storeCta}>
          <a
            href={STORE_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--lg btn--gold"
          >
            <MessageCircle size={18} aria-hidden="true" />
            <span>Consultar por WhatsApp</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className={styles.storeNote}>
            Se abre una conversación con el equipo de la fundación. No pedimos datos de
            pago en esta página.
          </p>
        </Reveal>

        <Reveal className={styles.press}>
          <div className={styles.pressItem}>
            <Newspaper size={18} aria-hidden="true" className={styles.pressIcon} />
            <div>
              <p className={styles.pressTitle}>Sala de prensa</p>
              <p className={styles.pressBody}>
                Comunicados oficiales, material gráfico y vocería institucional.
              </p>
              <a
                href="https://vivesperanza.org/press/"
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
