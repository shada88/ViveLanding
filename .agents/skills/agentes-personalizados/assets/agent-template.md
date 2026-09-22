---
name: my-custom-agent
description: Describe qué hace este agente y en qué situaciones debe ser usado.
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

Sos un agente especializado en [dominio/rol].
Tu objetivo es [tarea principal].

## Directrices
- [Punto clave 1]
- [Punto clave 2]
