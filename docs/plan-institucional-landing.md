# Plan de Implementación: De Prototipo Visual a Producto Web Institucional
**Fundación Vive con Esperanza** (NIT: 900.250.330-2)  
**Fecha:** 22 de septiembre de 2026  
**Autor:** Senior Web Architect & Core Team  

---

## 1. Visión y Diagnóstico de Arquitectura

El sitio de **Fundación Vive con Esperanza** cuenta con una base visual y narrativa de altísima calidad (identidad de marca, tipografía editorial, paleta navy/oro/blanco, componentes de arquitectura limpia). Sin embargo, tras la auditoría técnica y de producto, se evidenciaron cuatro desajustes estructurales que separan el estado actual de un producto institucional continental listo para ministerios, donantes y escuelas:

1. **Scroll artificial y "efecto abismo"**:
   - Padding vertical desmedido (`--section-y: clamp(5rem, 2.5rem + 9vw, 11rem)` en 13 secciones seguidas genera más de 4.500 px solo de aire negro).
   - El componente `Reveal.tsx` oculta bloques enteros con `opacity: 0` hasta que penetran profundo en el viewport (`rootMargin` negativo), provocando pantallas negras que el usuario interpreta como roturas o maquetas vacías al scrollear.
   - `scroll-behavior: smooth` forzado a nivel `html` global secuestra la fluidez del desplazamiento nativo en distancias de más de 10.000 px.

2. **Navegación de documento vs. Navegación de producto**:
   - El header y el recorrido operan como el índice de un libro de 13 capítulos lineales, obligando al visitante a leer todo el manifiesto antes de encontrar una acción concreta.

3. **Embudo de conversión secuestrado**:
   - El formulario de registro (`ParticipateSection.tsx`) existe y es robusto (conectado con validación Zod a `/api/leads` y Google Sheets), pero está enterrado al final de 20.000 px y arranca en estado vacío (`roleId = null`), invisibilizando los campos de entrada.

4. **Cohesión de Dominio y Jerarquía de Programas**:
   - Necesidad de reflejar la estructura institucional real:
     - **Paraguas Institucional:** Fundación Vive con Esperanza (con personería y NIT).
     - **Iniciativas y Programas:** Kaleo (plataforma tecnológica de GRD), Rally Continental 2028 (con **Las Voces del Bosque** como sus mascotas/embajadores pedagógicos oficiales) y el libro **«Cocoperro y El Cordón Amarillo»**.
     - **Recursos y Tienda con Propósito:** Integración natural de las herramientas de crisis con la tienda (donde los peluches de Voces del Bosque financian la misión en las escuelas).

---

## 2. Mapa Conceptual y de Dominio (Information Architecture)

```
                            FUNDACIÓN VIVE CON ESPERANZA
                              (NIT: 900.250.330-2)
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
   1. PROPUESTA                   2. PROGRAMAS                   3. RECURSOS Y
   INSTITUCIONAL                  DEL ECOSISTEMA                 SOSTENIBILIDAD
        │                              │                              │
 ┌──────┴──────┐              ┌────────┼────────┐             ┌───────┴───────┐
 │             │              │        │        │             │               │
Hero:       Declaración     KALEO    RALLY    LIBRO:       Herramientas    Tienda con
Promesa     Interactiva    (Enlace   2028     Cocoperro    de Crisis       Propósito:
Central     (3 pilares +     GRD)      │      y Cordón     (4 Guías en     Kits + Peluches
            firma/PDF)                 │      Amarillo      PDF)           Voces del Bosque
                                       ↓
                                Voces del Bosque
                              (Aves / Mascotas del
                               Rally Continental)
                                       │
                                       ▼
                             4. ACCIÓN / CONVERSIÓN
                        (Formulario Multi-Rol / Modal)
                         ┌─────────────┬─────────────┐
                         ↓             ↓             ↓
                      Escuela       Aliado        Donante /
                                                Voluntario
```

---

## 3. Plan de Acción por Módulos y Capas Técnicas

### Módulo A: Erradicación del Scroll Artificial y Optimización de Rendimiento
**Objetivo:** Reducir la altura percibida a menos de la mitad, eliminar pausas vacías y recuperar el control del desplazamiento.

1. **Tokens de Ritmo Vertical (`frontend/src/styles/tokens.css` y `landing.css`)**:
   - Modificar `--section-y` de `clamp(5rem, 2.5rem + 9vw, 11rem)` a `clamp(3.25rem, 2rem + 3.5vw, 5.5rem)`.
   - Auditar y eliminar cualquier `min-height: 100vh` en componentes interiores (excepto el Hero de impacto inicial).
   - La regla rectora: **El contenido determina la altura de la sección; la sección nunca fuerza una altura artificial.**

2. **Ajuste del Ciclo de Entrada (`frontend/src/components/motion/Reveal.tsx` y `globals.css`)**:
   - Cambiar `rootMargin: '0px 0px -8% 0px'` a `rootMargin: '0px 0px 60px 0px'` con `threshold: 0.05`.
   - Reducir el desplazamiento vertical `--reveal-shift` de 24px a 14px.
   - Con esto, el contenido ya está visible antes de que el usuario lo alcance, extinguiendo el "bloque negro".

3. **Comportamiento de Scroll (`frontend/src/styles/globals.css`)**:
   - Remover `scroll-behavior: smooth` del selector raíz `html`.
   - En su lugar, aplicar desplazamiento asistido por script solo a saltos específicos con detección de preferencia de movimiento reducido (`prefers-reduced-motion`).

4. **Optimización de Assets Pesados**:
   - `HeroStory.tsx`: verificar compresión de `AmbientVideo`, establecer `preload="metadata"` y poster optimizado en WebP.
   - `ForestVoicesSection.tsx`: agregar textos `alt` explícitos (`alt={`Retrato de ${bird.name}`}`) en las 7 miniaturas para cumplir con los validadores automatizados sin redundancia sonora.

---

### Módulo B: Arquitectura de Navegación y Jerarquía de CTAs (CRO)
**Objetivo:** Guiar al usuario con claridad en menos de 5 segundos, con rutas específicas para Escuelas y Donantes.

1. **Header Reestructurado (`frontend/src/components/layout/Header.tsx`)**:
   - Reemplazar el índice de 6 anclas extensas por una navegación de producto intuitiva:
     * **Qué hacemos** (`#ecosistema`)
     * **Programas** (`#programas` / `#kaleo`)
     * **Herramientas** (`#herramientas`)
     * **Declaración** (`#declaracion`)
     * **Recursos & Tienda** (`#tienda`)
   - **Botón Primario Destacado:** `Participar` (Abre el selector de roles o ejecuta scroll asistido al formulario).

2. **Jerarquía Visual de CTAs**:
   - **Hero (`HeroStory.tsx`)**:
     * Primario: *«Inscribir mi Escuela»* (lleva directamente al rol escuela en el formulario).
     * Secundario: *«Descargar Herramientas de Crisis»* (salto directo a los 4 PDFs).
     * Terciario: *«Conocer el Ecosistema»*.

3. **Conversión Ubicua (`ParticipateDialog` o Selector Rápido)**:
   - Crear un disparador accesible que permita abrir el formulario de `ParticipateSection` en formato modal/drawer desde el Header en cualquier punto de la página.
   - En la sección `ParticipateSection` en la home, presentar el rol "Escuela" pre-cargado o un selector visualmente destacado con tarjetas interactivas de rol inmediato.

---

### Módulo C: Reorganización de Contenido y Narrativa de Dominio

1. **La Declaración Vive con Esperanza (`DeclarationSection.tsx`)**:
   - Convertirla en una experiencia compacta e interactiva de 3 pilares clave (Liderazgo Escolar, Gestión del Riesgo EDS, Articulación Territorial).
   - Incluir botón secundario: *«Descargar Declaración Completa (PDF)»* y enlace para adherir / firmar en línea.

2. **Integración Rally Continental 2028 y Voces del Bosque (`ForestVoicesSection.tsx` & `ProgramsSection.tsx`)**:
   - Redactar y explicitar la relación canónica: *«Las Voces del Bosque: Mascotas y Embajadores del Rally Continental 2028»*.
   - Conectar pedagógicamente las 7 aves (Turpial, Cóndor, Colibrí, etc.) con los desafíos ambientales del Rally.

3. **Tienda con Propósito y Recursos (`StoreSection.tsx`)**:
   - Incorporar como artículo estelar los **Peluches Pedagógicos de Voces del Bosque**: cada muñeco de felpa financia kits escolares y guías de emergencia para escuelas vulnerables.
   - Enlace directo a WhatsApp con mensaje pre-armado por producto.

4. **Grafo del Ecosistema Interactivo (`EcosystemSection.tsx`)**:
   - Agregar señales de interacción ("affordance") claras: badge *«Explorar componente»*, pulso sutil sobre el nodo activo y tarjeta de explicación central bien contrastada.

---

### Módulo D: Legitimidad Institucional, Redes y SEO Técnico

1. **Footer Enriquecido (`frontend/src/components/layout/Footer.tsx`)**:
   - Identificación legal explícita: **NIT: 900.250.330-2** · Personería Jurídica sin ánimo de lucro.
   - Presidencia del Comité Internacional: Fernando García García.
   - Enlaces oficiales a redes sociales extraídos y verificados:
     * Facebook: `https://www.facebook.com/fundacionviveconesperanza`
     * YouTube: Canal Oficial Vive con Esperanza
     * LinkedIn e Instagram institucional.
     * Enlaces de transparencia, sala de prensa y socios.

2. **SEO y Metadatos de Producción (`frontend/src/app/layout.tsx`)**:
   - Definir `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://vivesperanza.org')`.
   - Incorporar OpenGraph tags completos con `og:image` de alta resolución (1200x630px).
   - Twitter Card `summary_large_image`.
   - Etiqueta canónica (`alternates: { canonical: '/' }`).
   - Inyección de datos estructurados Schema.org (`Organization`) con NIT, logo, URL y perfiles sociales.

---

## 4. Fases de Ejecución Proyectadas

| Fase | Tareas Principales | Archivos Involucrados | Criterio de Aceptación |
| :--- | :--- | :--- | :--- |
| **Fase 1** | Ajuste de variables de ritmo vertical, márgenes de Reveal y scroll natural. | `tokens.css`, `landing.css`, `globals.css`, `Reveal.tsx` | Cero pantallas negras al scrollear; altura reducida visiblemente. |
| **Fase 2** | Rediseño de navegación, jerarquía de CTAs y acceso ágil a Participar. | `Header.tsx`, `HeroStory.tsx`, `ParticipateSection.tsx` | Usuario puede acceder a preinscripción en 1 click desde cualquier posición. |
| **Fase 3** | Vinculación Rally 2028 + Voces del Bosque + Peluches en Tienda. | `ForestVoicesSection.tsx`, `ProgramsSection.tsx`, `StoreSection.tsx`, `StoreItem.ts` | Queda claro el rol de las aves como embajadoras del Rally y su enlace a la tienda. |
| **Fase 4** | Declaración compacta interactiva + ficha descargable. | `DeclarationSection.tsx` | La declaración se comprende en 45s con opción a leer el texto íntegro. |
| **Fase 5** | SEO técnico, metadatos OG, redes sociales y NIT en Footer. | `layout.tsx`, `Footer.tsx` | Schema.org válido; compartir en redes muestra imagen y textos nítidos; NIT visible. |

---

## 5. Verificación y Control de Calidad

- **Verificador de Tokens y Contraste**: `cd frontend && npm run check:tokens && npm run check:contrast`.
- **Tipado TypeScript**: `npx tsc --noEmit` en frontend y backend (sin errores).
- **Core Web Vitals & Rendimiento**: Validación de LCP (Hero video/imagen), CLS (0 layout shifts) y a11y (Lighthouse > 95).
- **Regla del Proyecto**: NUNCA ejecutar `npm run build` durante el desarrollo activo.
