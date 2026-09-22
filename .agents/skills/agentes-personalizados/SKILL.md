---
name: agentes-personalizados
description: >
  Guía completa para la creación, configuración y uso de Custom Agents (Agentes Personalizados)
  en Google Antigravity 2.0 y Antigravity CLI.
  Trigger: Cuando el usuario o el flujo requiera crear, configurar o invocar agentes personalizados (.agents/agents/).
license: Apache-2.0
metadata:
  author: gentleman-programming
  version: "1.0"
---

# Custom Agents (Agentes Personalizados) — Guía Definitiva

Los **Custom Agents** son configuraciones modulares basadas en archivos individuales que definen roles especializados con instrucciones, herramientas, modelos y políticas de ejecución delimitadas.

---

## 1. Fundamentos: ¿Por qué Custom Agents?

Los asistentes generales sufren de dos problemas críticos a escala:
1. **Falta de Especialización**: Requieren reexplicar directrices del proyecto en cada sesión.
2. **Context Window Bloat**: Saturar el prompt con guías, linters y reglas innecesarias agota la ventana de contexto y los tokens.

Los Custom Agents resuelven esto permitiendo aislar el rol exacto, restringir las herramientas (`tools`) y acotar las habilidades (`skills`) que cada agente necesita para su tarea específica.

---

## 2. Ubicación y Alcance (Scoping)

Los agentes se definen en un único archivo Markdown (`.md`) y se almacenan según su visibilidad:

| Ámbito | Ruta | Propósito |
| :--- | :--- | :--- |
| **Proyecto / Workspace** | `.agents/agents/<nombre-agente>.md` | Versionado en Git. Disponible de inmediato para todo el equipo del repositorio. |
| **Global / Máquina** | `~/.gemini/config/agents/<nombre-agente>.md` | Disponible para todas las sesiones y proyectos del usuario en la máquina. |

> **Regla de Oro**: Para herramientas y flujos propios del proyecto (como linters, migración, pruebas de ViveLanding), guardar **siempre** en `.agents/agents/`.

---

## 3. Anatomía del Archivo de Agente

Un Custom Agent se compone de dos partes fundamentales:
1. **Encabezado Frontmatter (YAML)**: Configuración operativa, modelo, permisos y herramientas.
2. **Cuerpo Markdown**: Se compila directamente como el **System Prompt** (instrucciones base) del agente.

```markdown
---
name: nombre-del-agente
description: Breve resumen de qué hace el agente y cuándo debe usarse.
model: flash
tools:
  - view_file
  - replace_file_content
  - run_command
skills:
  - skills/clean-architecture
mainAgent: true
subagent: true
permissionMode: acceptEdits
commandExecutionPolicy: auto
---

# Core Instructions
Acá se definen las instrucciones de sistema directas para este agente.
Sos un especialista en...
```

---

## 4. Campos del Frontmatter YAML

| Campo | Tipo | Obligatorio | Descripción |
| :--- | :---: | :---: | :--- |
| `name` | `string` | **Sí** | Identificador único del agente (letras minúsculas y guiones). |
| `description` | `string` | **Sí** | Propósito del agente. Utilizado por agentes coordinadores para delegación dinámica. |
| `model` | `string` | No | Modelo a emplear (ej. `flash`, `pro`). |
| `tools` | `list` | No | Lista explícita de nombres de herramientas disponibles. Evita sobrecarga y alucinaciones. |
| `skills` | `list` | No | Lista delimitada de skills específicas cargadas para este agente (ej. `skills/vive-design`). |
| `mainAgent` | `boolean` | No | Si es `true`, puede iniciarse directamente como sesión principal interactiva. |
| `subagent` | `boolean` | No | Si es `true`, puede ser invocado dinámicamente como subagente por un coordinador. |
| `permissionMode` | `string` | No | Nivel de permisos (ej. `acceptEdits`, `bypassPermissions`). |
| `commandExecutionPolicy` | `string` | No | Política de comandos (ej. `auto` para ejecutar tests/compilación sin pedir confirmación continua). |

---

## 5. Simetría de Ejecución: Main Agent vs. Subagent

A diferencia de otras plataformas donde los agentes personalizados solo actúan como subagentes subordinados, Antigravity soporta **simetría total**:

### A. Como Main Agent (`mainAgent: true`)
- **En Antigravity 2.0 GUI**: Se selecciona directamente en el menú desplegable de agentes.
- **En Antigravity CLI**: Se invoca con:
  ```bash
  agy --agent <nombre-agente>
  ```
El chat adopta las instrucciones centrales, modelo y herramientas de inmediato como sesión primaria.

### B. Como Subagente (`subagent: true`)
- Puede ser delegado de forma autónoma por un agente coordinador cuando una subtarea lo requiera, manteniendo limpio el hilo de conversación principal.

---

## 6. Políticas de Ejecución Segura (`commandExecutionPolicy: auto`)

Permite ejecutar comandos seguros de verificación de manera autónoma en segundo plano:
- Compilaciones, linters y suites de tests corren en segundo plano sin interrumpir al usuario con diálogos de confirmación continuos.
- Comandos destructivos o de alto riesgo (como borrado masivo de archivos) se mantienen estrictamente custodiados bajo confirmación manual.

---

## 7. Blueprint / Plantilla Recomendada

Guardar en `.agents/agents/code-reviewer.md`:

```markdown
---
name: code-reviewer
description: Revisor estricto de arquitectura limpia, tipado estricto y convenciones para ViveLanding.
model: flash
tools:
  - view_file
  - grep_search
  - list_dir
skills:
  - skills/clean-architecture
mainAgent: true
subagent: true
permissionMode: acceptEdits
commandExecutionPolicy: auto
---

# Instrucciones del Revisor

Sos un Senior Software Architect y Revisor Técnico de Código.
Tu objetivo es auditar cambios en el proyecto asegurando:
1. Respeto absoluto a la Arquitectura Limpia (el dominio no depende de infraestructura ni UI).
2. TypeScript estricto (prohibido 'any').
3. Cero hardcoding de colores (uso de tokens CSS).
4. Commits convencionales sin atribución de IA.

Sé conciso, directo y argumentá técnicamente cada señalamiento.
```

---

## 8. Comandos Útiles

```bash
# Iniciar sesión directamente con un Custom Agent desde la terminal
agy --agent <nombre-agente>

# Listar agentes disponibles en el proyecto o espacio global
agy --list-agents
```
