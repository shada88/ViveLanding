# Registro de Cambio: Gobernanza Institucional, Enlace Directo a Kaleo y Actualización Gráfica

- **Fecha:** 28 de septiembre de 2026
- **Tipo de Cambio:** Alineación de gobernanza, navegación y activos gráficos (`feat` / `fix`)
- **Estado:** Implementado, Verificado y Desplegado

---

## 1. Contexto y Objetivos

Este cambio consolida tres requerimientos fundamentales de precisión institucional y experiencia de usuario (UX):

1. **Acceso directo de emergencia/acompañamiento a Kaleo desde el Header**: Inclusión de un botón principal destacado en azul (`btn--primary`) con el llamado a la acción *"Necesito ayuda"*, que conecta inmediatamente al usuario con la plataforma de respuesta escolar [`https://kaleo-sage.vercel.app/`](https://kaleo-sage.vercel.app/). El botón de *"Participar"* pasa a estilo secundario delineado (`btn--outline`).
2. **Corrección de Identidad y Autoría Institucional (Sección 09 - Gobernanza y Tienda)**: Corrección del nombre del Fundador de la Fundación Vive con Esperanza a **Fernando Rafael García García** (previamente figuraba erróneamente con el apellido materno de la co-lideresa institucional).
3. **Actualización de Activos Visuales**: Sustitución de la ilustración oficial del colibrí *Ojopelao* (`frontend/public/img Pajaros/Ojopelao.jpeg`), personaje emblemático y anfitrión del Rally Continental 2028.

---

## 2. Matriz de Cambios

| Componente / Módulo | Archivo | Modificación |
| :--- | :--- | :--- |
| **Header (UI)** | `frontend/src/components/layout/Header.tsx` | Botón destacado en azul `"Necesito ayuda"` hacia `KALEO_DATA.appUrl`, botón `"Participar"` como outline, y replicación en el cajón móvil (`#menu-movil`). |
| **Header (Estilos)** | `frontend/src/components/layout/Header.module.css` | Clases `.kaleoCta`, `.panelActions` y puntos de quiebre responsivos (680px y 460px). |
| **Gobernanza (Entidad)** | `frontend/src/domain/entities/Institutional.ts` | Nombre corregido: `Fernando Rafael García García`, rol: *Fundador de la Fundación Vive con Esperanza*. |
| **Sección Comité (UI)** | `frontend/src/components/sections/OriginAndCommitteeSection.tsx` | Comentario y trazabilidad corregidos con el nombre canónico del fundador. |
| **Catálogo Editorial (Entidad)** | `frontend/src/domain/entities/StoreItem.ts` | Autoría corregida en la Colección Libritos de Esperanza: *Fernando Rafael García García, Rocío Galvis Guerrero & Equipo Pedagógico*. |
| **Activos Gráficos** | `frontend/public/img Pajaros/Ojopelao.jpeg` | Nueva versión de la imagen del colibrí *Ojopelao* (434 KB). |

---

## 3. Verificaciones de Calidad

- **Tokens CSS**: 110 definidos / 101 usados / 0 huérfanos.
- **Accesibilidad / Contraste**: 100% conforme con WCAG AA en tema claro y oscuro.
- **Tipado TypeScript**: `npx tsc --noEmit` superado con 0 errores.
- **Regla del Proyecto**: Sin builds locales directos (`build` descartado por directiva operativa).
