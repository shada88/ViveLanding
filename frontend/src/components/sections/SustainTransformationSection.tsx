import React from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { STORE_ITEMS, type StoreItem } from '@/domain/entities/StoreItem';
import {
  CURRICULUM_DOCUMENT,
  LIBRARY,
  PRACTICE_RESOURCE_IDS,
  ROUTE_BRIDGE,
  STARTING_POINTS,
  SUSTAIN_CLOSE,
  SUSTAIN_INTRO,
  SUSTAIN_PRINCIPLES,
} from '@/domain/entities/SustainTransformation';
import { SectionIntro } from './SectionIntro';
import styles from './SustainTransformationSection.module.css';

interface PracticeResource extends StoreItem {
  featuredImage: string;
}

const practiceResources: PracticeResource[] = PRACTICE_RESOURCE_IDS.flatMap((id) => {
  const item = STORE_ITEMS.find((entry) => entry.id === id);
  if (!item?.featuredImage) return [];
  return [{ ...item, featuredImage: item.featuredImage }];
});

function resourceUtility(item: StoreItem): string {
  if (item.bookDetail?.synopsis) return item.bookDetail.synopsis;
  const sentence = item.story.split('. ')[0] ?? item.story;
  return sentence.endsWith('.') ? sentence : `${sentence}.`;
}

/**
 * Biblioteca de recursos junto a la tienda. No repite la compra ni la reseña:
 * cada publicación enlaza a su ficha real (`#pieza-…`).
 */
export function SustainTransformationSection() {
  return (
    <section
      id="sosten"
      className={`section section--sunken transformation-resources ${styles.root}`}
      aria-labelledby="sosten-titulo"
    >
      <div className="shell">
        <SectionIntro
          className={styles.intro}
          eyebrow={SUSTAIN_INTRO.eyebrow}
          titleId="sosten-titulo"
          title={SUSTAIN_INTRO.title}
          lede={SUSTAIN_INTRO.lede}
        />
        <p className={styles.guide}>{SUSTAIN_INTRO.guide}</p>

        <ol className={styles.principles} aria-label="Del aprendizaje a la transformación">
          {SUSTAIN_PRINCIPLES.map((principle, index) => (
            <li key={principle.id} className={styles.principle}>
              <span className={styles.index} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.principleText}>{principle.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.library}>
          <h3 className={styles.blockTitle}>{LIBRARY.title}</h3>
          <p className={styles.blockLede}>{LIBRARY.lede}</p>

          <ul className={styles.gallery}>
            {practiceResources.map((item) => (
              <li key={item.id}>
                <article className={styles.piece}>
                  <div className={styles.frame}>
                    <Image
                      src={item.featuredImage}
                      alt={item.name}
                      fill
                      sizes="(max-width: 799px) 100vw, 360px"
                      className={styles.frameImage}
                    />
                  </div>
                  <p className={styles.kicker}>
                    {item.category === 'libros' ? 'Publicación' : 'Pieza para el aula'}
                  </p>
                  <h4 className={styles.pieceName}>{item.name}</h4>
                  <p className={styles.pieceKind}>{item.kind}</p>
                  <p className={styles.pieceBody}>{resourceUtility(item)}</p>
                  {item.bookDetail?.targetAge && (
                    <p className={styles.pieceFor}>{item.bookDetail.targetAge}</p>
                  )}
                  <a href={`#pieza-${item.id}`} className="link-arrow">
                    <span>Conocer el recurso</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </article>
              </li>
            ))}
          </ul>

          <article className={styles.document}>
            <div>
              <p className={styles.kicker}>{CURRICULUM_DOCUMENT.kicker}</p>
              <h4 className={styles.pieceName}>{CURRICULUM_DOCUMENT.title}</h4>
              <p className={styles.pieceBody}>{CURRICULUM_DOCUMENT.summary}</p>
              <p className={styles.pieceFor}>{CURRICULUM_DOCUMENT.audience}</p>
            </div>
            <a
              href={CURRICULUM_DOCUMENT.href}
              className={`btn btn--lg btn--outline ${styles.docAction}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{CURRICULUM_DOCUMENT.action}</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </article>
        </div>

        <div className={styles.starts}>
          <h3 className={styles.blockTitle}>{STARTING_POINTS.title}</h3>
          <ul className={styles.startList}>
            {STARTING_POINTS.options.map((option) => (
              <li key={option.id} className={styles.startItem}>
                <h4 className={styles.startTitle}>{option.title}</h4>
                <p className={styles.pieceBody}>{option.text}</p>
                {'caution' in option && option.caution && (
                  <p className={styles.caution}>{option.caution}</p>
                )}
                <a
                  href={option.href}
                  className="link-arrow"
                  {...('external' in option && option.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span>{option.action}</span>
                  {'external' in option && option.external ? (
                    <ArrowUpRight size={16} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={16} aria-hidden="true" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bridge}>
          <h3 className={styles.blockTitle}>{ROUTE_BRIDGE.title}</h3>
          <p className={styles.blockLede}>{ROUTE_BRIDGE.body}</p>
          <ol className={styles.flow}>
            {ROUTE_BRIDGE.steps.map((step, index) => (
              <li key={step} className={styles.flowStep}>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.flowText}>{step}</span>
              </li>
            ))}
          </ol>
          <p className={styles.note}>{ROUTE_BRIDGE.note}</p>
          <div className={styles.actions}>
            <a href={ROUTE_BRIDGE.primary.href} className="btn btn--lg btn--primary">
              <span>{ROUTE_BRIDGE.primary.label}</span>
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={ROUTE_BRIDGE.secondary.href} className="link-arrow">
              <span>{ROUTE_BRIDGE.secondary.label}</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.close}>
          <h3 className={styles.blockTitle}>{SUSTAIN_CLOSE.title}</h3>
          <p className={styles.blockLede}>{SUSTAIN_CLOSE.body}</p>
          <div className={styles.actions}>
            <a href={SUSTAIN_CLOSE.materials.href} className={`btn btn--lg btn--primary ${styles.closePrimary}`}>
              {SUSTAIN_CLOSE.materials.label}
            </a>
            <a href={SUSTAIN_CLOSE.route.href} className={`btn btn--lg btn--outline ${styles.closeSecondary}`}>
              {SUSTAIN_CLOSE.route.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
