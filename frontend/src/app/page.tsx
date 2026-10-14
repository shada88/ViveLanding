import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroStory } from '@/components/sections/HeroStory';
import { RoutesSection } from '@/components/sections/RoutesSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { TerritorySection } from '@/components/sections/TerritorySection';
import { AlliancesSection } from '@/components/sections/AlliancesSection';
import { StoreSection } from '@/components/sections/StoreSection';
import { DeclarationSection } from '@/components/sections/DeclarationSection';
import { ParticipateSection } from '@/components/sections/ParticipateSection';
import { FAQSection } from '@/components/sections/FAQSection';

/**
 * La landing como RUTA CLARA HACIA LA CONVERSIÓN.
 *
 * No es un repositorio de estatutos: cada acto responde una pregunta concreta
 * de la persona y la deja un paso más cerca del registro. Toda la profundidad
 * documental —los seis artículos, las biografías, el manifiesto— vive en
 * `/sobre-nosotros`; acá quedan cápsulas de confianza con un puente visible.
 *
 *   00  Hero                     ¿De qué se trata y qué me ofrecen?
 *   01  Rutas                    ¿Por dónde empiezo? Incluye Colaboraciones
 *                                (Kaleo y Banco Vivo), en un desplegable.
 *   02  El método                ¿Cómo funciona en la práctica en el aula?
 *   03  Rally 2028               ¿Cuál es la convocatoria continental?
 *   04  Alianzas                 ¿Mi organización cómo encaja acá?
 *   05  Sostén / tienda          ¿Qué material complementa el desafío, con precio de referencia?
 *   06  Declaración              ¿Cuál es el documento que sostiene la misión?
 *   07  ¿Cómo puedo ser parte?   ¡Me interesa! ¿Cómo me sumo?  ← clímax
 *   08  Preguntas y seguridad    ¿Qué pasa con mis datos y la seguridad?
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="contenido">
        <HeroStory />
        <RoutesSection />
        <MethodSection />
        <TerritorySection />
        <AlliancesSection />
        <StoreSection />
        <DeclarationSection />
        <ParticipateSection />
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}
