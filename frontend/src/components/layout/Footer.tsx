'use client';

import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { STORE_WHATSAPP_URL } from '@/domain/entities/StoreItem';
import { BrandLogo } from './BrandLogo';
import styles from './Footer.module.css';

/**
 * Columnas del pie institucional. El ecosistema lista EXACTAMENTE los tres programas
 * canónicos: Kaleo, Rally Continental 2028 y el libro «Cocoperro y El Cordón
 * Amarillo» — un solo título, nunca partido en dos entradas.
 *
 * Además incorpora canales oficiales verificados y vinculación activa.
 */
const COLUMNS = [
  {
    title: 'Recorrido',
    links: [
      { label: 'Elige tu ruta', href: '/#rutas' },
      { label: 'El método', href: '/#metodo' },
      { label: 'Alianzas', href: '/#alianzas' },
      { label: 'Preguntas frecuentes', href: '/#preguntas' },
      { label: 'Sobre Nosotros', href: '/sobre-nosotros' },
    ],
  },
  {
    title: 'Ecosistema',
    links: [
      { label: 'Kaleo — Plataforma', href: 'https://kaleo-sage.vercel.app/', external: true },
      { label: 'Banco Vivo', href: '/#banco-vivo' },
      { label: 'Rally Continental 2028', href: '/#rally' },
      { label: 'Cocoperro y El Cordón Amarillo', href: '/#tienda' },
      { label: 'Declaración Vivesperanza', href: '/sobre-nosotros#declaracion' },
    ],
  },
  {
    title: 'Canales Oficiales',
    links: [
      { label: 'Facebook', href: 'https://www.facebook.com/share/1BdTtNgTGA/', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/vivesperanzaoficial?stkn=MWx5eHhmbWxrcGdhYw==', external: true },
      { label: 'YouTube', href: 'https://www.youtube.com/@vivesperanzaoficial', external: true },
      { label: 'X (Twitter)', href: 'https://x.com/vivesperanzaofi', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vivesperanza/', external: true },
      { label: 'Portal Herramientas', href: 'https://info.vivesperanza.org/tools/', external: true },
    ],
  },
  {
    title: 'Vinculación',
    links: [
      { label: 'Unirse a la red', href: '/#participar' },
      { label: 'Donar a la causa', href: 'https://info.vivesperanza.org/donate/', external: true },
      { label: 'Tienda por WhatsApp', href: STORE_WHATSAPP_URL, external: true },
      { label: 'Sala de prensa', href: 'https://info.vivesperanza.org/press/', external: true },
      { label: 'Alianzas y Socios', href: 'https://info.vivesperanza.org/partnership/', external: true },
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
          <div className={styles.legalBlock}>
            <p className={styles.legal}>
              © {new Date().getFullYear()} Fundación Vive con Esperanza · <strong>NIT: 900.250.330-2</strong>
            </p>
            <p className={styles.legalSub}>
              Entidad sin ánimo de lucro registrada para la Educación para el Desarrollo Sostenible (EDS) y la Gestión del Riesgo de Desastres (GRD) en las Américas.
            </p>
          </div>

          <button
            type="button"
            className={styles.toTop}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                  ? 'auto'
                  : 'smooth',
              })
            }
          >
            <ArrowUp size={16} aria-hidden="true" />
            <span>Volver arriba</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
