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
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { DeclarationSection } from '@/components/sections/DeclarationSection';
import { OriginAndCommitteeSection } from '@/components/sections/OriginAndCommitteeSection';
import { BancoVivoSection } from '@/components/sections/BancoVivoSection';
import { ParticipateSection } from '@/components/sections/ParticipateSection';

/**
 * El recorrido de la landing. Dos bloques narrativos complementarios:
 *
 *   Hero       La promesa: «Convertimos escuelas en motores de desarrollo local»
 *
 *   PARTE 1 — QUÉ HACEMOS Y ENTREGAMOS (Programas, herramientas e impacto tangible)
 *   01         Kaleo — Plataforma viva de respuesta y acompañamiento escolar
 *   02         Banco Vivo — Experiencias reales convertidas en conocimiento para otras escuelas
 *   03         Herramientas de Crisis — Protocolos e instrumentos de aplicación directa
 *   04         Tienda & Publicaciones — Libros y piezas que financian la misión en territorio
 *   05         Rally Continental 2028 — Convocatoria y movilización escolar
 *   06         Las Voces del Bosque — Pedagogía e infancias (mascotas oficiales del Rally)
 *
 *   PARTE 2 — QUIÉNES SOMOS Y CÓMO NOS ARTICULAMOS (Fundamento, gobernanza y manifiesto)
 *   07         Declaración Vivesperanza — Documento fundacional y petición continental
 *   08         Nuestro Propósito — La misión institucional en el aula
 *   09         Ecosistema de Articulación — La red de 8 actores conectados
 *   10         Comité y Liderazgo — Fundadores, trayectoria histórica y equipo activo
 *   11         Participar — Preinscripción al Rally Continental 2028
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="contenido">
        <HeroStory />
        <KaleoShowcase />
        <BancoVivoSection />
        <CrisisToolsSection />
        <StoreSection />
        <TerritorySection />
        <ForestVoicesSection />
        <DeclarationSection />
        <PurposeSection />
        <EcosystemSection />
        <OriginAndCommitteeSection />
        <ParticipateSection />
      </main>

      <Footer />
    </>
  );
}
