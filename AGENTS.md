# Reglas Operativas para Agentes — Fundación Vive con Esperanza

Este archivo establece los principios no negociables de ingeniería y diseño para cualquier agente que opere en este repositorio.

## 1. Principios de Arquitectura
- **CONCEPTOS > CÓDIGO**: Nunca escribas código sin comprender los fundamentos de dominio.
- **ALTA COHESIÓN Y BAJO ACOPLAMIENTO**: El dominio nunca debe depender de frameworks, librerías UI ni de la base de datos.
- **ZERO HARDCODING**: Prohibido usar colores hex o valores mágicos sueltos en componentes. Todo valor de color, espaciado, radio o sombra DEBE provenir de los tokens CSS definidos en [`+Spec/DESIGN.md`](`+Spec/DESIGN.md`) e implementados en [`frontend/src/styles/tokens.css`](`frontend/src/styles/tokens.css`).
- **NADA DE ONDAS**: La estética de Vive con Esperanza NO utiliza ondas ni trazados curvos fluidos. Se apoya en geometría limpia, tarjetas elevadas, resplandores sutiles y cuadrícula organizada.

## 2. Convenciones de Código y Commits
- **Conventional Commits**: Usa prefijos estándar (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- **Cero Atribución de IA**: NUNCA agregues "Co-Authored-By" ni firmas de asistentes en commits o comentarios.
- **TypeScript Estricto**: Cero tipos `any`. Tipado explícito de interfaces y DTOs con Zod donde aplique.

## 3. Skills del Repositorio
Antes de diseñar o implementar vistas, consulta la skill local en `.agents/skills/vive-design/SKILL.md`.
