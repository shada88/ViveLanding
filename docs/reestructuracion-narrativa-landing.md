# Documento Arquitectónico: Reestructuración Narrativa de la Landing Page

- **Rama:** `feature/reestructura-narrativa-landing`
- **Fecha:** 28 de septiembre de 2026
- **Tipo de Cambio:** Reorganización estructural de contenidos y experiencia de usuario (`refactor` / `feat`)
- **Estado:** Implementado, verificado y preparado para revisión / merge a `main`

---

## 1. Tesis y Enfoque Narrativo

El recorrido de la landing se reestructura en dos bloques temáticos complementarios:

1. **Bloque Operativo (Tangible): «Qué hacemos y qué entregamos» (Secciones 01 a 05)**
   - Prioriza la respuesta directa, las herramientas y las soluciones que una escuela, directivo o docente busca al llegar.
   - Pone de frente las plataformas activas: Kaleo, el Rally Continental 2028 con sus personajes pedagógicos, las herramientas de crisis descargables y la tienda con causa.
2. **Bloque Institucional (Estratégico): «Quiénes somos y cómo nos articulamos» (Secciones 06 a 10)**
   - Respalda y fundamenta por qué la fundación existe, el diagnóstico de desconexión territorial, la red de 8 actores, el manifiesto fundacional y el comité de liderazgo.
3. **Conversión y Cierre (Sección 11)**
   - Canaliza el interés generado hacia el formulario unificado de preinscripción y participación continental.

---

## 2. Nueva Secuencia Estructural

| N° | Sección | Componente | Ancla | Rol en el Embudo |
| :---: | :--- | :--- | :---: | :--- |
| **Hero** | Promesa Institucional | `HeroStory` | `#` | Entrada de impacto. Botón azul primario a Kaleo (*«Necesito ayuda»*) + Botón secundario a Participar. |
| **01** | **Kaleo (Respuesta Escolar)** | `KaleoShowcase` | `#kaleo` | Plataforma viva de activación ante incidentes o crisis en la escuela. |
| **02** | **Rally Continental 2028** | `TerritorySection` | `#territorio` | Convocatoria masiva interamericana de resiliencia escolar. |
| **03** | **Las Voces del Bosque** | `ForestVoicesSection` | `#voces` | Pedagogía e infancias: 7 aves embajadoras del Rally y peluches con causa. |
| **04** | **Herramientas de Crisis** | `CrisisToolsSection` | `#herramientas` | Protocolos e instrumentos escolares listos para descargar y operar. |
| **05** | **Tienda & Publicaciones** | `StoreSection` | `#tienda` | Libros, cuentos y piezas artesanales que financian la misión en territorio. |
| **06** | **Nuestro Propósito** | `PurposeSection` | `#proposito` | Manifiesto rector: la escuela no recibe soluciones, las produce. |
| **07** | **Punto de Partida** | `OpportunitySection` | `#oportunidad` | Diagnóstico: los territorios no están vacíos, están desconectados. |
| **08** | **Ecosistema de Articulación** | `EcosystemSection` | `#ecosistema` | Red sistémica de 8 actores territoriales cooperando. |
| **09** | **Declaración Vivesperanza** | `DeclarationSection` | `#declaracion` | Manifiesto fundacional y petición continental de adhesión. |
| **10** | **Comité y Liderazgo** | `OriginAndCommitteeSection` | `#origen` | Gobernanza, fundador Fernando Rafael García García, liderazgo y equipo. |
| **11** | **Participar** | `ParticipateSection` | `#participar` | Embudo de conversión segmentado por rol. |

---

## 3. Ajustes Específicos Realizados

1. **Ubicación del Botón de Asistencia (*Necesito ayuda*)**:
   - Reubicado en el **Hero principal** como botón de máxima jerarquía en azul (`btn btn--lg btn--primary`), redirigiendo a la plataforma central de Kaleo (`https://kaleo-sage.vercel.app/`).
   - El **Header** se mantiene sobrio y liviano con el botón primario de acción institucional (*«Participar»*).
2. **Título de la Declaración**:
   - Actualizado canónicamente a **«Declaración Vivesperanza»** en entidades de dominio (`Declaration.ts`), encabezados visuales y menús de navegación.
3. **Control Numérico de Pasos (`step`)**:
   - Alineados cronológicamente los indicadores `01` a `11` en cada componente y metadatos.
4. **Trazabilidad de Enlaces Internos**:
   - Menú de escritorio y móvil (`Header.tsx`) y pie de página (`Footer.tsx`) reordenados para coincidir con el flujo narrativo secuencial.

---

## 4. Verificaciones de Calidad

- **Tokens CSS**: 100% tokens validados con respaldo en variables.
- **Contraste WCAG AA**: Cumplimiento estricto en modo claro y oscuro.
- **TypeScript**: 0 errores de tipado estricto.
- **Directivas operativas**: Cero compilaciones locales directas (`build` omitido).
