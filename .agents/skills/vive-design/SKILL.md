---
name: vive-design
description: Guía y directrices de diseño visual para la Fundación Vive con Esperanza
---

# Vive con Esperanza — Skill de Sistema de Diseño

Esta skill gobierna la implementación visual de todos los componentes de la Fundación Vive con Esperanza.

## 1. Identidad Visual
- **TEMA POR DEFECTO**: Modo Oscuro (`data-theme="dark"`).
- **FONDO**: Azul noche profundo tirando a negro (`--color-surface: #050B14`).
- **ACENTO PRINCIPAL**: Azul cielo eléctrico/luminoso (`--color-primary: #38BDF8`) para llamadas a la acción y foco.
- **PALETA EXPANDIDA AMIGABLE**:
  - Verde Esperanza (`--color-hope: #10B981`): para confianza, bienestar, salud comunitaria.
  - Ámbar Cálido (`--color-accent-warm: #F59E0B`): para calidez humana, empatía y voluntariado.
- **REGLA ESTRICTA**: NO usar ondas ni SVG curvados fluidos. El lenguaje es geométrico, estructurado, limpio y de alta legibilidad.

## 2. Reglas de Implementación en Frontend
1. Toda propiedad visual de color, radio, tipografía o elevación DEBE usar variables CSS (`var(--color-...)`).
2. Mantener contraste estricto WCAG AA (mínimo 4.5:1 en texto normal, 3:1 en texto grande).
3. Todas las secciones públicas deben incluir soporte de degradación graciosa (sin parpadeos de hidratación).
