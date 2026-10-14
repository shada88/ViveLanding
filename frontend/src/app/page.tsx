import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroStory } from '@/components/sections/HeroStory';
import { RoutesSection } from '@/components/sections/RoutesSection';
import { CrisisToolsSection } from '@/components/sections/CrisisToolsSection';
import { MethodSection } from '@/components/sections/MethodSection';
import { TerritorySection } from '@/components/sections/TerritorySection';
import { KaleoBancoVivoSection } from '@/components/sections/KaleoBancoVivoSection';
import { AlliancesSection } from '@/components/sections/AlliancesSection';
import { StoreSection } from '@/components/sections/StoreSection';
import { DeclarationSection } from '@/components/sections/DeclarationSection';
import { OriginAndCommitteeSection } from '@/components/sections/OriginAndCommitteeSection';
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
 *   01  Rutas + Herramientas     ¿Por dónde empiezo según mi situación?
 *   02  El método                ¿Cómo funciona en la práctica en el aula?
 *   03  Rally 2028 + Voces       ¿Cuál es la convocatoria continental?
 *   04  Kaleo y Banco Vivo       ¿Cómo nos cuidamos entre escuelas?
 *   05  Alianzas                 ¿Mi organización cómo encaja acá?
 *   06  Tienda con causa         ¿Qué materiales puedo llevar al aula ya?
 *   07  Cápsula institucional    ¿Quién está detrás de todo esto?
 *   08  ¿Cómo puedo ser parte?   ¡Me interesa! ¿Cómo me sumo?  ← clímax
 *   09  Preguntas y seguridad    ¿Qué pasa con mis datos y la seguridad?
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="contenido">
        <HeroStory />
        <RoutesSection />
        <CrisisToolsSection />
        <MethodSection />
        <TerritorySection />
        <KaleoBancoVivoSection />
        <AlliancesSection />
        <StoreSection />
        <DeclarationSection />
        <OriginAndCommitteeSection />
        <ParticipateSection />
        <FAQSection />
      </main>

      <Footer />
    </>
  );
}
