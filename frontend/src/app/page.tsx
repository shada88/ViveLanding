import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroStory } from '@/components/sections/HeroStory';
import { KaleoShowcase } from '@/components/sections/KaleoShowcase';
import { TerritorySection } from '@/components/sections/TerritorySection';
import { ForestVoicesSection } from '@/components/sections/ForestVoicesSection';
import { CrisisToolsSection } from '@/components/sections/CrisisToolsSection';
import { StoreSection } from '@/components/sections/StoreSection';
import { PurposeSection } from '@/components/sections/PurposeSection';
import { OpportunitySection } from '@/components/sections/OpportunitySection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { DeclarationSection } from '@/components/sections/DeclarationSection';
import { OriginAndCommitteeSection } from '@/components/sections/OriginAndCommitteeSection';
import { ParticipateSection } from '@/components/sections/ParticipateSection';

/**
 * El recorrido de la landing. Dos bloques narrativos complementarios:
 *
 *   Hero       La promesa: «Convertimos escuelas en motores de desarrollo local»
 *
 *   PARTE 1 — QUÉ HACEMOS Y ENTREGAMOS (Programas, herramientas e impacto tangible)
 *   01         Kaleo — Plataforma viva de respuesta y acompañamiento escolar
 *   02         Rally Continental 2028 — Convocatoria y movilización escolar
 *   03         Las Voces del Bosque — Pedagogía e infancias (mascotas oficiales del Rally)
 *   04         Herramientas de Crisis — Protocolos e instrumentos de aplicación directa
 *   05         Tienda & Publicaciones — Libros y piezas que financian la misión en territorio
 *
 *   PARTE 2 — QUIÉNES SOMOS Y CÓMO NOS ARTICULAMOS (Fundamento, gobernanza y manifiesto)
 *   06         Nuestro Propósito — La misión institucional en el aula
 *   07         Punto de Partida — La brecha territorial y el diagnóstico de capacidades
 *   08         Ecosistema de Articulación — La red de 8 actores conectados
 *   09         Declaración Vivesperanza — Documento fundacional y petición continental
 *   10         Comité y Liderazgo — Fundadores, trayectoria histórica y equipo activo
 *   11         Participar — Preinscripción de escuelas, voluntariado, donantes y alianzas
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="contenido">
        <HeroStory />
        <KaleoShowcase />
        <TerritorySection />
        <ForestVoicesSection />
        <CrisisToolsSection />
        <StoreSection />
        <PurposeSection />
        <OpportunitySection />
        <EcosystemSection />
        <DeclarationSection />
        <OriginAndCommitteeSection />
        <ParticipateSection />
      </main>

      <Footer />
    </>
  );
}
