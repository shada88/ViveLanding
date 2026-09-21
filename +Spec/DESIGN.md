---
name: Vive con Esperanza Design System
version: '1.0'
implementation: frontend/src/styles/tokens.css
colors:
  # --- Superficies / Neutros (Modo Claro Auxiliar) ---
  surface: '#f8fafc'
  surface-container: '#edf2f7'
  surface-high: '#e2e8f0'
  surface-highest: '#cbd5e1'
  on-surface: '#091322'
  on-surface-variant: '#334155'
  on-surface-muted: '#64748b'
  outline: '#94a3b8'
  outline-variant: '#e2e8f0'
  background: '#f8fafc'
  on-background: '#091322'
  # --- Marca & Acentos ---
  primary: '#0284c7'
  on-primary: '#ffffff'
  primary-container: '#38bdf8'
  on-primary-container: '#032030'
  secondary: '#0369a1'
  on-secondary: '#ffffff'
  # --- Paleta Expandida Amigable (Esperanza y Calidez Humana) ---
  hope: '#10b981'
  on-hope: '#ffffff'
  hope-container: '#d1fae5'
  on-hope-container: '#064e3b'
  accent-warm: '#f59e0b'
  on-accent-warm: '#ffffff'
  accent-warm-container: '#fef3c7'
  on-accent-warm-container: '#78350f'
  # --- Vidrio y Elevación ---
  glass-bg: 'rgba(255, 255, 255, 0.85)'
  glass-border: 'rgba(255, 255, 255, 0.50)'
  glass-blur: 'saturate(180%) blur(16px)'
  ink: '#050b14'
  on-ink: '#f0f6fc'

colors-dark:
  # --- Superficies / Neutros (Modo Oscuro Principal — Azul Tirando a Negro) ---
  surface: '#050b14'
  surface-dim: '#03070d'
  surface-bright: '#132034'
  surface-lowest: '#02050a'
  surface-low: '#09111e'
  surface-container: '#0d1726'
  surface-high: '#142236'
  surface-highest: '#1d2f4a'
  on-surface: '#f0f6fc'
  on-surface-variant: '#94a3b8'
  on-surface-muted: '#64748b'
  outline: '#2a3f5f'
  outline-variant: '#16253b'
  background: '#040810'
  on-background: '#f0f6fc'
  # --- Marca & Acentos Luminosos ---
  primary: '#38bdf8'
  on-primary: '#021827'
  primary-container: '#0284c7'
  on-primary-container: '#e0f2fe'
  primary-soft: '#0b2742'
  secondary: '#7dd3fc'
  on-secondary: '#072b3d'
  secondary-container: '#0c4a6e'
  on-secondary-container: '#bae6fd'
  # --- Paleta Expandida Amigable ---
  hope: '#34d399'
  on-hope: '#022c22'
  hope-container: '#064e3b'
  on-hope-container: '#a7f3d0'
  hope-soft: '#062922'
  accent-warm: '#fbbf24'
  on-accent-warm: '#451a03'
  accent-warm-container: '#78350f'
  on-accent-warm-container: '#fde68a'
  accent-warm-soft: '#2e1c07'
  # --- Vidrio Oscuro ---
  glass-bg: 'rgba(13, 23, 38, 0.75)'
  glass-border: 'rgba(255, 255, 255, 0.08)'
  glass-blur: 'saturate(180%) blur(16px)'
  # --- Resplandores Sutiles (Reemplazo de Ondas) ---
  glow-blue: 'rgba(56, 189, 248, 0.15)'
  glow-hope: 'rgba(52, 211, 153, 0.12)'
  glow-warm: 'rgba(251, 191, 36, 0.10)'

typography:
  family: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
  display: '800 clamp(2.5rem, 1.5rem + 4vw, 4.25rem) / 1.08'
  h1: '700 clamp(2rem, 1.4rem + 2.5vw, 3.25rem) / 1.15'
  h2: '700 clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem) / 1.25'
  h3: '600 clamp(1.15rem, 1.05rem + 0.5vw, 1.5rem) / 1.35'
  body-xl: '400 clamp(1.05rem, 0.95rem + 0.4vw, 1.25rem) / 1.6'
  body-md: '400 1rem / 1.6'
  caption: '500 0.8125rem / 1.4'
---

# Sistema de Diseño — Fundación Vive con Esperanza

> **Fuente Única de Verdad.**
> Este documento especifica las directrices de identidad visual. Su implementación técnica directa reside en `frontend/src/styles/tokens.css`.

---

## 1. Los Tres Pilares de Identidad

A diferencia de otros sistemas que recurren a ondas y líneas fluidas abstractas, **Vive con Esperanza** fundamenta su impacto en una estructura nítida, sobria y humana:

| Pilar | Aplicación Práctica |
|---|---|
| **GEOMETRÍA Y ESTRUCTURA** | Malla limpia, tarjetas con esquinas redondeadas pero firmes (`border-radius: 12px` a `20px`), espaciado armónico sin saturación. |
| **PERSONAS Y CERCANÍA** | La fotografía, iconografía y narrativa ponen al ser humano en el centro. Colores cálidos de acento para invitar a la colaboración. |
| **LUZ EN LA OSCURIDAD** | La paleta oscura profunda (azul noche) representa la realidad desafiante; la luz de acento (azul cielo, verde esperanza, ámbar) simboliza la acción, el optimismo y la esperanza viva. |

> [!IMPORTANT]
> **Regla de Cero Ondas**: Quedan expresamente prohibidos los fondos con olas, curvas de Bezier ondulantes o gradientes desordenados. La profundidad se logra mediante capas de elevación de superficies (`surface-low` a `surface-highest`), bordes sutiles y tarjetas bien proporcionadas.

---

## 2. Paleta Cromática y Accesibilidad

1. **Base Oscura Principal**: Azul noche casi negro (`#050B14`). Evita el negro puro (`#000000`) para reducir la fatiga visual y permitir sombras de elevación.
2. **Acento Primario**: Azul Cielo Luminoso (`#38BDF8`). Contraste superior a 8:1 sobre el fondo, ideal para llamadas a la acción primarias.
3. **Verde Esperanza**: (`#34D399` en oscuro, `#10B981` en claro). Símbolo de vida, salud y transformación comunitaria.
4. **Ámbar Cálido**: (`#FBBF24` en oscuro, `#F59E0B` en claro). Brinda calidez humana, empatía y sensación de bienvenida.
