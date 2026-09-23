'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import styles from './Header.module.css';

/** Navegación de producto en escritorio: orientada a la acción y claridad de oferta. */
const NAV = [
  { href: '#ecosistema', label: 'Qué hacemos' },
  { href: '#programas', label: 'Programas' },
  { href: '#herramientas', label: 'Herramientas' },
  { href: '#declaracion', label: 'La Declaración' },
  { href: '#tienda', label: 'Tienda' },
] as const;

/** Menú móvil estructurado por categorías clave. */
const NAV_MOBILE = [
  { href: '#ecosistema', label: 'Qué hacemos (Ecosistema)' },
  { href: '#programas', label: 'Programas del Ecosistema' },
  { href: '#kaleo', label: 'Kaleo — Red de Alerta' },
  { href: '#voces', label: 'Las Voces del Bosque' },
  { href: '#herramientas', label: 'Herramientas de Crisis' },
  { href: '#declaracion', label: 'La Declaración' },
  { href: '#tienda', label: 'Tienda con Propósito' },
  { href: '#participar', label: 'Participar / Preinscribir' },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement | null>(null);

  // Estado "elevado" del header. Se lee con un `scroll` pasivo colapsado en un
  // cuadro y solo se escribe cuando el valor CAMBIA: un `setState` por evento
  // de scroll dispara un render por píxel recorrido.
  useEffect(() => {
    let ticking = false;

    const measure = () => {
      ticking = false;
      setLifted((current) => {
        const next = window.scrollY > 24;
        return next === current ? current : next;
      });
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    measure();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape cierra el menú y devuelve el foco al botón que lo abrió. Sin esto,
  // quien navega con teclado queda con el foco huérfano en un panel cerrado.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`${styles.header} ${lifted ? styles.lifted : ''}`}>
      <div className={`shell ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Vive con Esperanza — inicio">
          <BrandLogo brand="vivesperanza" height={30} tone="light" priority />
        </Link>

        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a href="#participar" className={`btn btn--primary ${styles.cta}`}>
            <span>Participar</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/*
        El panel se renderiza siempre y se oculta con `hidden`, no con un
        condicional de React. Así el `aria-controls` del botón apunta a un
        elemento que existe de verdad en el árbol, que es el requisito para que
        la relación se anuncie.
      */}
      <div id="menu-movil" className={styles.panel} hidden={!open}>
        <nav className={styles.panelNav} aria-label="Navegación completa">
          {NAV_MOBILE.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={styles.panelLink}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
