import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  DECLARATION_ARTICLES,
  DECLARATION_SIGN_URL,
  DECLARATION_TITLE,
} from '@/domain/entities/Declaration';
import { Reveal } from '@/components/motion/Reveal';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { ParticleNetwork } from '@/components/visuals/ParticleNetwork';
import styles from './DeclarationSection.module.css';

/**
 * 03 — La Declaración Vive con Esperanza.
 *
 * Es un DOCUMENTO, y el diseño lo trata como tal: banda oscura, medida de
 * lectura corta, numeración grande en dorado y mucho aire entre artículos.
 * Nada de tarjetas ni de íconos decorativos — un documento institucional
 * troceado en tarjetas deja de leerse como documento.
 *
 * El texto NO se toca: viene entero del dominio, traducido del original en
 * inglés de vivesperanza.org/sign. El diseño aporta jerarquía y respiro, nada
 * más. Por eso tampoco hay resúmenes ni frases entresacadas.
 *
 * Composición: el encabezado queda FIJO a la izquierda mientras pasan los seis
 * artículos, y el llamado a firmar cierra la columna de lectura, después del
 * artículo 6. Ese orden no es estético: en un documento, la firma va al final
 * de lo que se firma. Ponerla antes —como estaba— obligaba a decidir sin haber
 * leído, y en una columna dejaba el botón por encima del texto.
 *
 * Es un componente de servidor. El único JavaScript de la sección es la red de
 * partículas del fondo, que acá significa lo mismo que en el resto de la
 * página: personas y territorios que se enlazan.
 */
export function DeclarationSection() {
  return (
    <section
      id="declaracion"
      className={`section section--ink ${styles.section}`}
      aria-labelledby="declaracion-titulo"
    >
      <ParticleNetwork density="soft" interactive={false} className={styles.net} />
      <span className={`ambient ambient--gold ${styles.glow}`} aria-hidden="true" />

      <div className={`shell ${styles.inner}`}>
        <div className={styles.layout}>
          <div className={styles.aside}>
            <Reveal index={0}>
              <p className="eyebrow eyebrow--ink">
                <span className={styles.step}>03</span>
                Documento fundacional
              </p>
            </Reveal>

            <Reveal index={1}>
              <h2 id="declaracion-titulo" className={styles.title}>
                {DECLARATION_TITLE}
              </h2>
            </Reveal>

            <Reveal index={2} className={styles.seal}>
              <BrandLogo brand="vivesperanza" height={30} tone="on-ink" />
              <p className={styles.sealNote}>
                Traducción del original en inglés publicado por la fundación.
              </p>
            </Reveal>
          </div>

          <div className={styles.main}>
            <ol className={styles.articles}>
              {DECLARATION_ARTICLES.map((article, i) => (
                <Reveal as="li" key={article.number} index={i % 3} className={styles.article}>
                  {/*
                    El número es decorativo para quien escucha: la lista ordenada
                    ya anuncia la posición, y leerlo de nuevo duplicaría el dato.
                  */}
                  <span className={styles.number} aria-hidden="true">
                    {String(article.number).padStart(2, '0')}
                  </span>

                  <div className={styles.articleBody}>
                    <h3 className={styles.articleTitle}>{article.title}</h3>
                    <p className={styles.articleText}>{article.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <Reveal className={styles.sign}>
              <p className={styles.signLead}>
                Esta declaración se sostiene con firmas. La petición está abierta.
              </p>
              <a
                href={DECLARATION_SIGN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--lg btn--gold"
              >
                <span>Firmar la Declaración</span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
