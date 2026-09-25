'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  BookOpen,
  Heart,
  MessageCircle,
  Mic,
  Newspaper,
  Palette,
  X,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import {
  STORE_CATEGORIES,
  STORE_ITEMS,
  STORE_WHATSAPP_URL,
  type StoreCategory,
  type StoreItem,
} from '@/domain/entities/StoreItem';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './StoreSection.module.css';

const ITEM_ICONS: Record<StoreItem['icon'], LucideIcon> = {
  BookOpen,
  Palette,
  Heart,
};

/**
 * 10 — Tienda con Propósito y Publicaciones (Unificación Punto 10).
 *
 * Integra todos los materiales de lectura (Cocoperro y El Cordón Amarillo,
 * Colección Libritos de Esperanza y guías pedagógicas) junto con los peluches
 * pedagógicos y el arte del Rally.
 *
 * Ofrece navegación interactiva por categorías y una ventana de detalle/reseña
 * pedagógica para explorar cada libro en profundidad.
 */
export function StoreSection() {
  const [activeCategory, setActiveCategory] = useState<StoreCategory>('todos');
  const [selectedBook, setSelectedBook] = useState<StoreItem | null>(null);

  const filteredItems =
    activeCategory === 'todos'
      ? STORE_ITEMS
      : STORE_ITEMS.filter((item) => item.category === activeCategory);

  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedBook(null);
      }
    };
    if (selectedBook) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBook]);

  return (
    <section id="tienda" className="section" aria-labelledby="tienda-titulo">
      {/* Ancla para enlaces previos a #programas para no romper navegación */}
      <div id="programas" aria-hidden="true" style={{ position: 'relative', top: '-6rem' }} />

      <div className="shell">
        <SectionIntro
          step="10"
          eyebrow="Tienda con Propósito & Publicaciones"
          titleId="tienda-titulo"
          title="Libros, Materiales y Piezas con Causa"
          lede="Cada libro, guía pedagógica y pieza artesanal financia directamente el acompañamiento en escuelas, la impresión de materiales didácticos y la preparación ante emergencias."
        />

        {/* ── Barra de Categorías / Filtros interactivos ── */}
        <div className={styles.categoryBar} role="tablist" aria-label="Categorías de la tienda">
          {STORE_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'todos'
                ? STORE_ITEMS.length
                : STORE_ITEMS.filter((item) => item.category === cat.id).length;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.categoryBtn} ${isActive ? styles.categoryBtnActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.label}</span>
                <span className={styles.categoryBadge}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* ── Cuadrícula de Piezas y Libros ── */}
        <div className={styles.items}>
          {filteredItems.map((item, i) => {
            const Icon = ITEM_ICONS[item.icon];
            const isBook = item.category === 'libros';

            return (
              <Reveal as="article" key={item.id} index={i} className={styles.item}>
                <div className={styles.itemHeader}>
                  <span className={styles.itemIcon}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span
                    className={`${styles.itemBadge} ${isBook ? styles.itemBadgeGold : ''}`}
                  >
                    {isBook ? 'Libro / Publicación' : item.category === 'peluches' ? 'Peluche' : 'Arte'}
                  </span>
                </div>

                {item.featuredImage && (
                  <div className={styles.imageFrame}>
                    <Image
                      src={item.featuredImage}
                      alt={item.name}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 1040px) 50vw, 380px"
                      className={styles.itemImage}
                    />
                  </div>
                )}

                <h3 className={`h3 ${styles.itemName}`}>{item.name}</h3>
                <p className={styles.itemKind}>{item.kind}</p>
                <p className={styles.itemStory}>{item.story}</p>

                <p className={styles.itemFunds}>
                  <span className={styles.fundsLabel}>Financia</span>
                  {item.funds}
                </p>

                <div className={styles.actionsRow}>
                  {isBook && item.bookDetail && (
                    <button
                      type="button"
                      className={styles.btnReview}
                      onClick={() => setSelectedBook(item)}
                    >
                      <Sparkles size={16} aria-hidden="true" />
                      <span>Ver reseña y detalles pedagógicos</span>
                    </button>
                  )}

                  <a
                    href={
                      item.bookDetail?.externalUrl
                        ? item.bookDetail.externalUrl
                        : STORE_WHATSAPP_URL
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--sm btn--gold"
                  >
                    <span>
                      {item.bookDetail?.externalUrl ? 'Adquirir en Amazon' : 'Consultar por WhatsApp'}
                    </span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>
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
            <span>Consultar catálogo completo por WhatsApp</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <p className={styles.storeNote}>
            Atención directa con el equipo de la fundación para pedidos institucionales,
            envío de ejemplares a escuelas o donaciones con causa.
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

      {/* ── Modal Interactivo de Reseña y Detalles de Libro ── */}
      {selectedBook && selectedBook.bookDetail && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedBook(null)}
          role="presentation"
        >
          <div
            className={styles.modalContent}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-book-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setSelectedBook(null)}
              aria-label="Cerrar detalles del libro"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className={styles.modalGrid}>
              <div className={styles.modalCoverFrame}>
                <Image
                  src={selectedBook.bookDetail.image}
                  alt={`Portada de ${selectedBook.name}`}
                  fill
                  sizes="180px"
                  className={styles.modalCoverImage}
                />
              </div>

              <div>
                <header className={styles.modalHeader}>
                  <p className={styles.modalAuthor}>{selectedBook.bookDetail.author}</p>
                  <h3 id="modal-book-title" className={styles.modalTitle}>
                    {selectedBook.name}
                  </h3>
                  <p className={styles.modalSynopsis}>{selectedBook.bookDetail.synopsis}</p>
                </header>

                <div className={styles.modalMetaPills}>
                  {selectedBook.bookDetail.targetAge && (
                    <span className={styles.metaPill}>
                      Dirigido a: {selectedBook.bookDetail.targetAge}
                    </span>
                  )}
                  {selectedBook.bookDetail.format && (
                    <span className={styles.metaPill}>
                      Formato: {selectedBook.bookDetail.format}
                    </span>
                  )}
                </div>

                <p className={styles.modalSectionTitle}>Reseña Pedagógica & Enfoque</p>
                <p className={styles.modalReviewText}>{selectedBook.bookDetail.review}</p>

                <p className={styles.modalSectionTitle}>Aspectos Clave para el Aula</p>
                <ul className={styles.modalHighlightsList}>
                  {selectedBook.bookDetail.highlights.map((point) => (
                    <li key={point} className={styles.modalHighlightItem}>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className={styles.modalFunds}>
                  <p className={styles.modalFundsLabel}>Destino Social de la Adquisición</p>
                  <p className={styles.modalFundsText}>{selectedBook.funds}</p>
                </div>

                <div className={styles.modalActions}>
                  {selectedBook.bookDetail.externalUrl && (
                    <a
                      href={selectedBook.bookDetail.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--lg btn--gold"
                    >
                      <span>Adquirir en Amazon</span>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}

                  <a
                    href={`https://wa.me/573102528967?text=${encodeURIComponent(
                      `Hola, quisiera solicitar información y ejemplares del libro "${selectedBook.name}".`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--lg btn--primary"
                  >
                    <MessageCircle size={18} aria-hidden="true" />
                    <span>Solicitar ejemplares por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
