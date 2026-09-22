'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { STORE_WHATSAPP_URL } from '@/domain/entities/StoreItem';
import { BrandLogo } from './BrandLogo';
import styles from './Footer.module.css';

/**
 * Columnas del pie. El ecosistema lista EXACTAMENTE los tres programas
 * canónicos: Kaleo, Rally Continental 2028 y el libro «Cocoperro y El Cordón
 * Amarillo» — un solo título, nunca partido en dos entradas.
 *
 * Forest Lovers, ViveImpact y ACT fueron retirados y no deben reaparecer acá.
 * El pie es justo el lugar donde un programa dado de baja sobrevive años,
 * porque nadie lo revisa.
 */
const COLUMNS = [
  {
    title: 'Recorrido',
    links: [
      { label: 'Propósito', href: '#proposito' },
      { label: 'La Declaración', href: '#declaracion' },
      { label: 'Ecosistema', href: '#ecosistema' },
      { label: 'Herramientas', href: '#herramientas' },
      { label: 'Territorio', href: '#territorio' },
    ],
  },
  {
    title: 'Ecosistema',
    links: [
      { label: 'Kaleo', href: 'https://kaleo-sage.vercel.app/', external: true },
      { label: 'Rally Continental 2028', href: '#territorio' },
      { label: 'Cocoperro y El Cordón Amarillo', href: '#programas' },
      { label: 'Las Voces del Bosque', href: '#voces' },
    ],
  },
  {
    title: 'Vinculación',
    links: [
      { label: 'Preinscribir escuela', href: '#participar' },
      { label: 'Donar', href: '#participar' },
      { label: 'Tienda por WhatsApp', href: STORE_WHATSAPP_URL, external: true },
      { label: 'Socios', href: 'https://vivesperanza.org/partnership/', external: true },
      { label: 'Sala de prensa', href: 'https://vivesperanza.org/press/', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={`ambient ambient--deep ${styles.glow}`} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <div className={styles.identity}>
            <BrandLogo brand="vivesperanza" height={34} tone="light" />
            <p className={styles.blurb}>
              Organización interamericana que convierte las escuelas del continente en
              motores de desarrollo local, resiliencia y acción ambiental.
            </p>
            <p className={styles.credit}>
              Presidencia del Comité Internacional: Fernando García García
            </p>
          </div>

          <nav className={styles.columns} aria-label="Enlaces del pie de página">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul className={styles.list}>
                  {column.links.map((linkItem) => {
                    const external = 'external' in linkItem && linkItem.external;
                    return (
                      <li key={linkItem.label}>
                        <a
                          href={linkItem.href}
                          className={styles.link}
                          {...(external
                            ? { target: '_blank', rel: 'noopener noreferrer' }
                            : {})}
                        >
                          <span>{linkItem.label}</span>
                          {external && <ArrowUpRight size={13} aria-hidden="true" />}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>
            © {new Date().getFullYear()} Fundación Vive con Esperanza. En articulación
            intersectorial para las Américas.
          </p>

          <button
            type="button"
            className={styles.toTop}
            onClick={() =>
              window.scrollTo({
                top: 0,
                // `scroll-behavior: auto` cuando se pidió movimiento reducido: un
                // salto instantáneo es justamente lo que esa preferencia espera.
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              })
            }
          >
            <ArrowUp size={15} aria-hidden="true" />
            <span>Volver arriba</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
