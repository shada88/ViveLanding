# Registro de Cambio: Migración de Enlaces Institucionales a info.vivesperanza.org

- **Fecha:** 28 de septiembre de 2026
- **Tipo de Cambio:** Corrección y alineación de infraestructura (`fix` / `config`)
- **Estado:** Implementado y Verificado
- **Dominio Canónico:** `https://info.vivesperanza.org`

---

## 1. Contexto y Justificación

La Fundación Vive con Esperanza centraliza sus portales de servicios, contenidos de prensa, herramientas comunitarias y pasarela de recaudación bajo el subdominio `info.vivesperanza.org`.

La landing institucional (`ViveLanding`) contenía enlaces externos que apuntaban al dominio raíz `vivesperanza.org/...`. Este cambio actualiza todos los puntos de navegación saliente para asegurar la correcta redirección hacia las plataformas activas de la fundación.

---

## 2. Análisis Técnico de Infraestructura DNS

Previo a la modificación en código, se auditó la resolución DNS de los hosts objetivo:

| Host Evaluado | Tipo de Registro | Resultado | Estado Operativo |
| :--- | :---: | :---: | :---: |
| `info.vivesperanza.org` | `A` | `185.245.180.115` | **Activo / Resuelve correctamente** |
| `www.info.vivesperanza.org` | `A` / `CNAME` | `DNS_ERROR_RCODE_NAME_ERROR` | **Inexistente (NXDOMAIN)** |

### Criterio Técnico
El prefijo `www.` NO debe anteponerse al subdominio `info.`. Configurar `www.info.vivesperanza.org` provocaría un fallo de resolución de nombres (`ERR_NAME_NOT_RESOLVED`) en los navegadores de los usuarios. La URL base canónica es estrictamente `https://info.vivesperanza.org/`.

---

## 3. Matriz de Componentes y Enlaces Actualizados

| Componente / Entidad | Archivo | Destino Anterior | Destino Actualizado | Propósito |
| :--- | :--- | :--- | :--- | :--- |
| **Footer** | `frontend/src/components/layout/Footer.tsx` | `https://vivesperanza.org/tools/` | `https://info.vivesperanza.org/tools/` | Acceso al Portal de Herramientas comunitarias |
| **Footer** | `frontend/src/components/layout/Footer.tsx` | `https://vivesperanza.org/press/` | `https://info.vivesperanza.org/press/` | Sala de prensa oficial |
| **Footer** | `frontend/src/components/layout/Footer.tsx` | `https://vivesperanza.org/partnership/` | `https://info.vivesperanza.org/partnership/` | Portal de Alianzas y Socios institucionales |
| **StoreSection** | `frontend/src/components/sections/StoreSection.tsx` | `https://vivesperanza.org/press/` | `https://info.vivesperanza.org/press/` | Botón "Abrir sala de prensa" |
| **DeclarationSection** | `frontend/src/components/sections/DeclarationSection.tsx` | `https://vivesperanza.org/sign/` | `https://info.vivesperanza.org/sign/` | Lectura íntegra del documento fundacional |
| **Participation** (Entity) | `frontend/src/domain/entities/Participation.ts` | `https://vivesperanza.org/donate/` | `https://info.vivesperanza.org/donate/` | Pasarela de donación directa |
| **Declaration** (Entity) | `frontend/src/domain/entities/Declaration.ts` | `https://vivesperanza.org/sign/` | `https://info.vivesperanza.org/sign/` | Documentación institucional en código |

---

## 4. Control de Calidad y Verificación

Se ejecutó la suite de verificación estática del repositorio:

1. **Tokens CSS (`npm run check:tokens`)**:
   - 110 tokens definidos, 101 en uso activo.
   - 0 tokens huérfanos.
2. **Accesibilidad y Contraste (`npm run check:contrast`)**:
   - Todos los pares de color validados contra WCAG AA en tema claro y oscuro.
3. **Tipado Estricto TypeScript (`npx tsc --noEmit`)**:
   - Compilación estática exitosa con 0 errores de tipado.
4. **Regla de Entorno**:
   - No se ejecuta build local en cumplimiento de las directivas operativas del proyecto.
