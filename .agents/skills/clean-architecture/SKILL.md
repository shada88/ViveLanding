---
name: clean-architecture
description: Reglas de arquitectura hexagonal, desacoplamiento y escalabilidad para ViveLanding
---

# Clean Architecture — Guía de Desacoplamiento

## Capas del Sistema

```
  [UI / Endpoints / Frameworks]  <--- Infrastructure
               │
               ▼
      [Casos de Uso]            <--- Application
               │
               ▼
   [Entidades / Interfaces]      <--- Domain (Núcleo Puro)
```

## Reglas Inquebrantables
1. **El Dominio es Agnóstico**: `src/domain` no importa nada de Express, Next.js, Prisma ni librerías de terceros.
2. **Inversión de Dependencias**: Los casos de uso dependen de interfaces de repositorio (puertos), nunca de implementaciones concretas.
3. **Adaptador para Excel/CSV**: Para la fase actual de landing, la persistencia de registros utiliza un adaptador a archivo o webhook, permitiendo migrar a PostgreSQL / Supabase en el futuro sin modificar ni una línea del caso de uso.
