# Especificación — Captura y Gestión de Leads

## 1. Objetivo
Capturar registros de visitantes interesados (voluntarios, empresas aliadas, donantes o beneficiarios) desde la landing page sin requerir inicialmente una infraestructura de base de datos pesada.

## 2. Estrategia de Persistencia
- **Fase 1 (Actual - Rápida & Eficiente)**:
  - Formulario en frontend que envía datos a `/api/leads`.
  - El backend almacena los registros de forma atómica en un archivo estructurado local (`data/leads.csv` o `data/leads.xlsx`) y/o envía un Webhook directo a Google Sheets (mediante Apps Script o Webhook de Zapier/Make).
- **Fase 2 (Escalabilidad Futura)**:
  - Gracias a la arquitectura desacoplada (Clean Architecture), se sustituye la implementación del puerto `ILeadRepository` por un `PrismaLeadRepository` o `SupabaseLeadRepository` sin modificar la lógica del caso de uso.

## 3. Campos del Lead
```typescript
interface LeadData {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  interestType: 'VOLUNTARIO' | 'DONANTE' | 'ALIADO' | 'INFORMACION';
  message?: string;
  createdAt: string;
}
```
