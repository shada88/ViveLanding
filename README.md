# Fundación Vive con Esperanza — Landing Page & Core Platform

Repositorio oficial de la plataforma y landing page de la **Fundación Vive con Esperanza**.
Diseñado con una arquitectura modular, escalable y desacoplada, con el mismo stack de vanguardia de **Kaleo** pero adaptado a la identidad propia de la fundación.

---

## 🏛️ Filosofía y Arquitectura

1. **Diseño Visual con Sentido**: Sin adornos vacíos ni ondas decorativas innecesarias. La identidad visual se fundamenta en **Geometría, Personas, Luz e Impacto Social**. Especificado en [`+Spec/DESIGN.md`](`+Spec/DESIGN.md`) y consumido a través de tokens CSS en [`frontend/src/styles/tokens.css`](`frontend/src/styles/tokens.css`).
2. **Modo Oscuro como Primera Clase**: Paleta profunda de azul noche (`#050B14`) con acentos en azul cielo brillante (`#38BDF8`), verde esperanza (`#10B981`) y ámbar cálido (`#F59E0B`).
3. **Alta Cohesión y Bajo Acoplamiento**: Separación clara entre el dominio, casos de uso y la infraestructura (Clean / Hexagonal).
4. **Captura de Leads Pragmática**: Por ahora sin base de datos pesada requerida; el sistema está preparado para registrar interesados vía formulario nativo o embed y exportar ordenadamente a Excel/Google Sheets.

---

## 📁 Estructura del Monorepo

```text
ViveLanding/
├── .agents/                  # Skills y reglas locales para agentes de IA
│   └── skills/
│       ├── vive-design/      # Guía de tokens y diseño visual
│       └── clean-architecture/ # Principios de desacoplamiento y testing
├── +Spec/                    # Especificaciones formales del producto
│   ├── 00_OVERVIEW.md        # Resumen de arquitectura y roadmap
│   ├── DESIGN.md             # Sistema de diseño, tokens y contraste WCAG
│   └── leads-capture.spec.md # Especificación de captura de datos
├── frontend/                 # Next.js 14 (App Router) + TypeScript + CSS Tokens
│   ├── src/
│   │   ├── app/              # Rutas y API endpoints
│   │   ├── components/       # Componentes desacoplados (UI / secciones)
│   │   ├── lib/              # Configuración de cliente y utilidades
│   │   └── styles/           # tokens.css y estilos globales
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # Esqueleto backend desacoplado (Clean Architecture)
│   ├── src/
│   │   ├── domain/           # Entidades y contratos de repositorio
│   │   ├── application/      # Casos de uso (ej. RegisterLead)
│   │   └── infrastructure/   # Adaptadores (CSV/Excel, futuro DB)
│   ├── package.json
│   └── tsconfig.json
├── AGENTS.md                 # Instrucciones operativas para agentes
└── .gitignore
```

---

## 🚀 Inicio Rápido

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
```
