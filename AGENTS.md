# Reglas Operativas para Agentes — Fundación Vive con Esperanza

Este archivo establece los principios no negociables de ingeniería y diseño para cualquier agente que opere en este repositorio.

## 1. Principios de Arquitectura
- **CONCEPTOS > CÓDIGO**: Nunca escribas código sin comprender los fundamentos de dominio.
- **ALTA COHESIÓN Y BAJO ACOPLAMIENTO**: El dominio nunca debe depender de frameworks, librerías UI ni de la base de datos.
- **ZERO HARDCODING**: Prohibido usar colores hex o valores mágicos sueltos en componentes. Todo valor de color, espaciado, radio o sombra DEBE provenir de los tokens CSS definidos en [`+Spec/DESIGN.md`](`+Spec/DESIGN.md`) e implementados en [`frontend/src/styles/tokens.css`](`frontend/src/styles/tokens.css`).
- **LA RED ES EL CONCEPTO**: El motivo visual transversal es una red de conexiones — partículas que aparecen, se enlazan y se disuelven. Significa personas → escuelas → conocimiento → territorio → oportunidades → desarrollo → esperanza. Toda animación, línea o partícula debe tener función narrativa; nada se agrega porque "se ve tecnológico".
- **NADA DE ONDAS — con UNA excepción registrada**: La estética de Vive con Esperanza NO utiliza ondas ni trazados curvos fluidos. Se apoya en geometría limpia, red de conexiones, luz focalizada y composición editorial.
  - **Excepción**: la sección Kaleo (`KaleoShowcase`) SÍ usa ondas, mediante [`FlowWaves`](frontend/src/components/visuals/FlowWaves.tsx). Kaleo es un producto con identidad propia y la onda es su motivo canónico —ver `Kaleo/frontend/src/components/landing/flow-field.tsx`—, donde significa información que fluye, comunicación y aprendizaje que se expande. **Dentro de esa banda manda la identidad de Kaleo. Fuera de ella, la onda sigue prohibida.**
- **EL DORADO ES ACENTO, NUNCA DOMINANTE**: Paleta rectora negro (profundidad) · azul (confianza y futuro) · dorado (valor) · blanco (claridad). El dorado marca lo que vale: un número, un símbolo, un estado activo. Si el dorado ocupa superficie, está mal usado.
- **MENOS INTERFAZ, MÁS EXPERIENCIA**: Prohibidas las grillas de tarjetas repetidas, los bloques cuadrados uniformes y las superficies con sombra usadas como contenedor por defecto. La jerarquía se construye con aire, filetes y tipografía. Una tarjeta genérica repetida veinte veces es lo que convierte una landing en un panel de control.
- **SIN COSTURAS ENTRE SECCIONES**: Todo degradado de sección abre y cierra en `--color-background`. La luz ambiente vive a nivel de sección o de página, nunca confinada dentro de un hijo. Prohibidos los `border-top` sólidos de borde a borde entre bandas.

## 2. Convenciones de Código y Commits
- **Conventional Commits**: Usa prefijos estándar (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- **Cero Atribución de IA**: NUNCA agregues "Co-Authored-By" ni firmas de asistentes en commits o comentarios.
- **TypeScript Estricto**: Cero tipos `any`. Tipado explícito de interfaces y DTOs con Zod donde aplique.

## 3. Skills del Repositorio
- **Diseño Visual**: Consulta [`.agents/skills/vive-design/SKILL.md`](.agents/skills/vive-design/SKILL.md).
- **Arquitectura Limpia**: Consulta [`.agents/skills/clean-architecture/SKILL.md`](.agents/skills/clean-architecture/SKILL.md).
- **Agentes Personalizados**: Consulta [`.agents/skills/agentes-personalizados/SKILL.md`](.agents/skills/agentes-personalizados/SKILL.md) para crear o modificar agentes en `.agents/agents/`.

## 3.1 Verificadores

```bash
# Todo junto: tokens + contraste + tipado.
cd frontend && npm run check

# Por separado:
npm run check:tokens    # tokens usados pero NUNCA definidos. Rompen en silencio:
                        # el navegador descarta la declaración y la propiedad cae
                        # a su valor heredado, sin ningún error en consola.
npm run check:contrast  # pares de color del sistema contra WCAG AA.
npx tsc --noEmit        # tipado. Nunca correr build: regla del proyecto.

cd backend && npx tsc --noEmit
```

> Al agregar o cambiar un color del sistema, **agregá el par a `scripts/check-contrast.cjs`**. Un token nuevo sin par verificado es un fallo de accesibilidad esperando a que alguien lo use.

## 3.1.1 Destino de los datos del formulario

Los registros de la sección **Participar** viajan así:

```
Formulario → POST /api/leads (Next, valida con Zod) → LEADS_WEBHOOK_URL → Apps Script → Google Sheets
```

Guía completa de configuración: [`docs/leads-a-google-sheets.md`](docs/leads-a-google-sheets.md).

- **La ruta NO devuelve 201 salvo que el registro haya llegado de verdad.** Sin `LEADS_WEBHOOK_URL` responde **503**; si el webhook falla, **502**. Es deliberado y no se debe "arreglar" devolviendo 201: la versión anterior decía «recibido» sin guardar nada, y para una convocatoria escolar eso es una escuela que se quedó afuera creyendo que se anotó.
- Cuando la entrega falla, el **correo y el tipo de interés quedan en el log**: es lo único con lo que se puede recuperar a mano ese contacto.
- Al agregar un campo al formulario hay que tocar TRES lugares: el esquema Zod de `frontend/src/app/api/leads/route.ts`, el arreglo `COLUMNAS` del Apps Script (**al final, nunca en el medio** — insertar una columna intermedia desalinea todo el histórico) y `domain/entities/Participation.ts`.

### `backend/` está desconectado

Hay un servidor Express con arquitectura limpia que guarda en CSV. **El formulario no lo llama.** No se eliminó porque es código válido, pero antes de usarlo: escribe a disco (el CSV se pierde en cualquier entorno sin servidor) y `main.ts` pasa `req.body` al caso de uso **sin validar**.

## 3.2 Contenido canónico (NO negociable)

- **Mensaje principal, textual**: «Convertimos escuelas en motores de desarrollo local».
- **Programas del ecosistema**: Kaleo, Rally Continental 2028 y el libro «Cocoperro y El Cordón Amarillo». **Forest Lovers, ViveImpact y ACT fueron retirados** y no deben reaparecer en textos, arreglos, navegación ni contenido oculto.
- **«Cocoperro y El Cordón Amarillo» es UN LIBRO**, con un solo título. No son dos programas, y El Cordón Amarillo **no es un símbolo del ecosistema** ni un recurso transversal de la landing: es parte del relato de ese libro. El cordón como elemento gráfico acompaña únicamente al bloque del libro.
- Se escribe **CORDÓN**, nunca «hilo»: un hilo se corta, un cordón sostiene.
- **Copy en español neutro, nunca voseo** («elige», no «elegí»; «necesitas», no «necesitás»). El público es continental.
- **Los logotipos se usan desde sus archivos** (`public/vivesperanza_logo.svg`, `public/kaleo_logo.svg`), jamás recreados con texto ni sustituidos por una inicial en una caja de color.
  - `vivesperanza_logo.svg` trae `fill="#000000"` horneado: se recolorea con las clases `.brand-mark--light` / `.brand-mark--gold` de `landing.css`, nunca editando el archivo de marca.
  - `kaleo_logo.svg` es un PNG incrustado de 220 KB: **una sola aparición por página** y siempre diferido.

---

## 4. Sistema Multiagente (High Cohesion + Low Coupling)

El proyecto cuenta con un equipo de **4 Custom Agents especializados** ubicados en `.agents/agents/`, diseñados con contratos explícitos y simetría de ejecución:

| Agente | Archivo | Rol Primario | Misión Central |
| :--- | :--- | :--- | :--- |
| **VCE Orchestrator** | [`.agents/agents/vce-orchestrator.md`](.agents/agents/vce-orchestrator.md) | Chief Product Architect & Tech Lead | Mantiene la visión global, gestiona el backlog, coordina dependencias y valida la calidad final. |
| **VCE Research Intelligence** | [`.agents/agents/vce-research-intelligence.md`](.agents/agents/vce-research-intelligence.md) | Lead Researcher & Discovery Specialist | Descubre y estructura evidencia empírica, benchmarking, ecosistema institucional y análisis de brechas. |
| **VCE Brand & Business Strategist** | [`.agents/agents/vce-brand-strategist.md`](.agents/agents/vce-brand-strategist.md) | Brand, Domain & Content Strategist | Modela el dominio funcional de la fundación, define narrativa, arquitectura de contenidos y funnels de conversión. |
| **VCE Engineering Architect** | [`.agents/agents/vce-engineering-architect.md`](.agents/agents/vce-engineering-architect.md) | Principal Frontend & Software Architect | Construye interfaces robustas bajo Clean Architecture, tokens CSS estrictos, a11y WCAG AA y Core Web Vitals. |

### Matriz de Responsabilidades y Autoridad

| Área | VCE Orchestrator | VCE Research Intelligence | VCE Brand & Business | VCE Engineering Architect |
| :--- | :---: | :---: | :---: | :---: |
| **Arquitectura Global / Roadmap** | **PRINCIPAL (N1)** | Aporta | Aporta | Aporta |
| **Investigación y Evidencia** | Supervisa | **PRINCIPAL (N3)** | Consulta | Consulta |
| **Branding y Mensajería** | Valida | Aporta evidencia | **PRINCIPAL (N2)** | Implementa |
| **Modelo de Negocio y Dominio** | Integra | Investiga | **PRINCIPAL (N2)** | Consulta |
| **UX y Contenidos** | Supervisa | Releva patrones | **Define objetivos** | Implementa interacción |
| **Frontend y Arquitectura Técnica**| Supervisa | No | No | **PRINCIPAL (N4)** |
| **Design System Técnico** | Valida | No | Define dirección visual | **PRINCIPAL (N4)** |
| **Gestión de Tareas y Quality Gate**| **PRINCIPAL (N1)** | Ejecuta delegadas | Ejecuta delegadas | Ejecuta delegadas |

---

## 5. Protocolo de Comunicación y Handoffs

Ningún agente se comunica de forma ambigua. Toda delegación debe contener:
- **`TASK`**: Qué se necesita con exactitud.
- **`CONTEXT`**: Por qué se necesita y qué objetivo global persigue.
- **`INPUTS`**: Insumos y archivos de entrada.
- **`CONSTRAINTS`**: Restricciones técnicas, de diseño o de dominio.
- **`EXPECTED OUTPUT`**: Estructura del entregable esperado.
- **`ACCEPTANCE CRITERIA`**: Condiciones medibles para dar la tarea por aceptada.

---

## 6. Clasificación de Decisiones y Confianza

- **Categorías obligatorias**: `[FACT]`, `[ASSUMPTION]`, `[HYPOTHESIS]`, `[DECISION]`, `[CONSTRAINT]`, `[RISK]`, `[OPEN QUESTION]`.
- **Nivel de Confianza**: `High`, `Medium`, `Low` (especialmente para hallazgos del Researcher).

