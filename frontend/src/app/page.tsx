import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroStory } from '@/components/sections/HeroStory';
import { PurposeSection } from '@/components/sections/PurposeSection';
import { OpportunitySection } from '@/components/sections/OpportunitySection';
import { DeclarationSection } from '@/components/sections/DeclarationSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { CrisisToolsSection } from '@/components/sections/CrisisToolsSection';
import { KaleoShowcase } from '@/components/sections/KaleoShowcase';
import { TerritorySection } from '@/components/sections/TerritorySection';
import { ForestVoicesSection } from '@/components/sections/ForestVoicesSection';
import { OriginAndCommitteeSection } from '@/components/sections/OriginAndCommitteeSection';
import { ProgramsSection } from '@/components/sections/ProgramsSection';
import { StoreSection } from '@/components/sections/StoreSection';
import { ParticipateSection } from '@/components/sections/ParticipateSection';

/**
 * El recorrido de la landing. El ORDEN es el contenido:
 *
 *   Hero       la promesa
 *   01–02      quiénes somos y desde dónde leemos el contexto
 *   03         la palabra propia de la fundación: la Declaración
 *   04         cómo se conecta todo — la red
 *   05–06      qué entregamos y qué lo coordina
 *   07–08      dónde llega y quiénes se lo enseñan a la infancia
 *   09–10      de dónde salió la historia y con qué programas se sostiene
 *   11–12      cómo financiarlo y cómo entrar
 *
 * No es una lista de bloques independientes: cada sección deja planteado lo
 * que resuelve la siguiente. Reordenarlas rompe la narrativa aunque ninguna
 * deje de funcionar por separado — y al hacerlo hay que renumerar el `step`
 * de cada `SectionIntro`, que es la brújula del recorrido.
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="contenido">
        <HeroStory />
        <PurposeSection />
        <OpportunitySection />
        <DeclarationSection />
        <EcosystemSection />
        <CrisisToolsSection />
        <KaleoShowcase />
        <TerritorySection />
        <ForestVoicesSection />
        <OriginAndCommitteeSection />
        <ProgramsSection />
        <StoreSection />
        <ParticipateSection />
      </main>

      <Footer />
    </>
  );
}
