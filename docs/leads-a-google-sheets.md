# Los registros del formulario → Google Sheets

Todo lo que se envía desde la sección **Participar** de la landing termina en una
hoja de cálculo de Google. Este documento explica cómo dejarlo funcionando.

Tiempo estimado: **10 minutos**. No hace falta desplegar nada ni pagar nada.

---

## Cómo viaja un registro

```
Formulario de la landing
        │  POST /api/leads
        ▼
Ruta de Next  ──►  valida con Zod
        │          agrega id + fecha
        │  POST  LEADS_WEBHOOK_URL
        ▼
Apps Script publicado  ──►  agrega una fila
        ▼
   Hoja de cálculo
```

> [!IMPORTANT]
> **Si `LEADS_WEBHOOK_URL` no está configurada, la API responde 503 y el
> formulario le dice a la persona que no se pudo registrar.** Es deliberado.
> Antes respondía «recibido» sin guardar nada: la persona creía que se había
> anotado y del otro lado no llegaba nada. Un fallo ruidoso se arregla; uno
> silencioso se descubre meses después y sin los datos.

---

## Paso 1 — Crear la hoja

1. Nueva hoja de cálculo en [sheets.new](https://sheets.new).
2. Ponerle nombre, por ejemplo **Registros Vive con Esperanza**.
3. Renombrar la pestaña de abajo a **`Registros`** (respetando la mayúscula).

La fila de encabezados la escribe el script solo, la primera vez.

## Paso 2 — Pegar el script

En la hoja: **Extensiones → Apps Script**. Borrar lo que haya y pegar esto:

```javascript
/**
 * Recibe los registros del formulario de vivesperanza y los agrega a la hoja.
 *
 * El orden de COLUMNAS es el contrato con la ruta /api/leads del frontend.
 * Si allá se agrega un campo, se agrega ACÁ también — y al final del arreglo,
 * nunca en el medio: insertar una columna intermedia desplaza todo lo ya
 * escrito y desalinea el histórico entero.
 */
const NOMBRE_HOJA = 'Registros';

/**
 * Debe coincidir con LEADS_WEBHOOK_SECRET del frontend.
 * Dejar en '' desactiva la comprobación — solo para probar: la URL de un
 * Apps Script publicado es pública y sin secreto cualquiera puede escribir.
 */
const SECRETO = '';

const COLUMNAS = [
  'createdAt',
  'interestType',
  'fullName',
  'email',
  'phone',
  'organization',
  'profession',
  'country',
  'message',
  'id',
];

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return responder_({ ok: false, error: 'Petición sin cuerpo' });
    }

    const datos = JSON.parse(e.postData.contents);

    if (SECRETO && datos.secret !== SECRETO) {
      return responder_({ ok: false, error: 'No autorizado' });
    }

    const hoja = obtenerHoja_();
    hoja.appendRow(
      COLUMNAS.map(function (columna) {
        var valor = datos[columna];
        // Una comilla simple al inicio fuerza a Sheets a tratar el valor como
        // TEXTO. Sin esto, un mensaje que empiece con "=" o "+" se interpreta
        // como fórmula: se rompe la celda y, peor, es una vía de inyección.
        return valor === undefined || valor === null
          ? ''
          : /^[=+\-@]/.test(String(valor))
            ? "'" + valor
            : valor;
      }),
    );

    return responder_({ ok: true });
  } catch (error) {
    return responder_({ ok: false, error: String(error) });
  }
}

/** Salud del script: abrir la URL en el navegador debe responder ok. */
function doGet() {
  return responder_({ ok: true, servicio: 'registros-vivesperanza' });
}

function obtenerHoja_() {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  let hoja = libro.getSheetByName(NOMBRE_HOJA);

  if (!hoja) {
    hoja = libro.insertSheet(NOMBRE_HOJA);
  }

  // Encabezados la primera vez, y congelados para que sobrevivan al ordenar.
  if (hoja.getLastRow() === 0) {
    hoja.appendRow(COLUMNAS);
    hoja.setFrozenRows(1);
    hoja.getRange(1, 1, 1, COLUMNAS.length).setFontWeight('bold');
  }

  return hoja;
}

function responder_(cuerpo) {
  return ContentService.createTextOutput(JSON.stringify(cuerpo)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

Guardar con **Ctrl+S**.

## Paso 3 — Publicar el script

1. Botón **Implementar → Nueva implementación**.
2. Engranaje ⚙ → tipo **Aplicación web**.
3. Configurar:
   - **Ejecutar como**: `Yo`
   - **Quién tiene acceso**: `Cualquier usuario`
4. **Implementar**. Google pide autorización la primera vez: aceptar.
5. Copiar la **URL de la aplicación web** (termina en `/exec`).

> [!WARNING]
> Tiene que decir **`Cualquier usuario`**, no «Cualquier usuario con cuenta de
> Google». Con la segunda opción el servidor no puede autenticarse y todos los
> registros fallan con un 401.

## Paso 4 — Conectarlo a la landing

En `frontend/.env.local` (crearlo si no existe):

```bash
LEADS_WEBHOOK_URL="https://script.google.com/macros/s/AAAA.../exec"
LEADS_WEBHOOK_SECRET="una-cadena-larga-y-aleatoria"
```

Si se define `LEADS_WEBHOOK_SECRET`, hay que poner **el mismo valor** en la
constante `SECRETO` del script y volver a implementar.

En producción, las mismas dos variables se cargan en el panel del proveedor
(en Vercel: *Settings → Environment Variables*). **`.env.local` no se sube al
repositorio y no existe en producción.**

## Paso 5 — Probar

Con el servidor de desarrollo corriendo:

```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Prueba","email":"prueba@correo.com","interestType":"ESCUELA","organization":"Colegio de Prueba"}'
```

- **201** → aparece una fila nueva en la hoja. Listo.
- **503** → falta `LEADS_WEBHOOK_URL`. Reiniciar el servidor después de crear
  el `.env.local`: Next lee las variables al arrancar, no en caliente.
- **502** → la URL está mal, el script no se implementó, o el secreto no
  coincide. El detalle está en la consola del servidor.

---

## Si mañana hace falta algo más

Esta integración cubre lo que la fundación necesita hoy: que los registros
lleguen a una planilla que alguien pueda filtrar, ordenar y exportar.

Cuando se quede corta —cuando haya que buscar por país, cruzar con otra fuente
o dar acceso por roles— el cambio es **una sola función**: reemplazar el bloque
del `fetch` en `frontend/src/app/api/leads/route.ts` por una escritura a la
base de datos. Ni el formulario ni la validación ni el contrato se tocan.

### Sobre `backend/`

En el repositorio hay un servidor Express con arquitectura limpia que guarda
los registros en CSV. **Hoy no está conectado: el formulario no lo llama.**

No se eliminó porque es código válido y la decisión de descartarlo no es
técnica. Pero antes de usarlo hay que saber dos cosas:

1. **Escribe a disco.** En Vercel o cualquier entorno sin servidor el sistema
   de archivos es efímero: el CSV se pierde en cada despliegue. Necesitaría un
   host con disco persistente (Railway, Render, un VPS).
2. **`main.ts` no valida.** Pasa `req.body` directo al caso de uso. Antes de
   exponerlo habría que agregarle el mismo esquema Zod que usa el frontend.
