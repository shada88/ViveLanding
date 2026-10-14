import { NextResponse } from 'next/server';
import { z } from 'zod';
import { leadSchema, type LeadInput } from '@/lib/leadSchema';

/**
 * Captura de contactos del formulario público.
 *
 * Un solo formulario con selector de interés —escuela, aliado, profesional
 * voluntario o donante—. Todo lo que no sea nombre, correo e interés es
 * opcional salvo dos reglas cruzadas del esquema: escuela y aliado declaran
 * institución; voluntario declara oficio.
 *
 * `ESCUELA` es un interés propio y no un `ALIADO` reetiquetado: una escuela
 * que se preinscribe al Rally no es lo mismo que una universidad que propone
 * un convenio, y meterlas en la misma bolsa vuelve inservible el registro.
 *
 * ── DESTINO DE LOS DATOS ───────────────────────────────────────────────────
 *
 * El registro se reenvía a `LEADS_WEBHOOK_URL`, que apunta a un Apps Script
 * publicado sobre una hoja de cálculo de Google. Los pasos para crearlo están
 * en `docs/leads-a-google-sheets.md`.
 *
 * **Esta ruta NO devuelve 201 salvo que el registro haya llegado de verdad.**
 * La versión anterior respondía «recibido» aunque no hubiera destino
 * configurado o el webhook fallara: la persona leía que se había anotado y del
 * otro lado no llegaba nada. Para una convocatoria escolar eso no es un error
 * de integración, es una escuela que se quedó afuera creyendo que se anotó.
 *
 * Un fallo ruidoso se arregla; uno silencioso se descubre meses después, sin
 * los datos.
 */
/*
 * El esquema vive en `src/lib/leadSchema.ts` y lo comparte con el formulario:
 * el cliente valida por cortesía y esta ruta revalida SIEMPRE, porque
 * cualquiera puede llamarla sin pasar por el formulario.
 */

/**
 * Tope de espera del webhook.
 *
 * Apps Script tarda típicamente entre 1 y 3 segundos. Diez es holgado y, sobre
 * todo, ACOTADO: sin el tope, un webhook colgado retiene la función hasta que
 * la plataforma la corta, y ahí la persona se come el error igual pero después
 * de treinta segundos mirando un botón que dice «Enviando…».
 */
const WEBHOOK_TIMEOUT_MS = 10_000;

export async function POST(request: Request) {
  let validatedData: LeadInput;

  try {
    validatedData = leadSchema.parse(await request.json());
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Cuerpo de la petición inválido' }, { status: 400 });
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;

  if (!webhookUrl) {
    // 503 y no 500: el servicio está bien, lo que falta es configuración. El
    // mensaje del log nombra la variable exacta para que quien despliegue no
    // tenga que leer el código para saber qué le falta.
    console.error(
      '[leads] LEADS_WEBHOOK_URL no está configurada: el registro NO se guardó. ' +
        'Ver docs/leads-a-google-sheets.md',
    );
    return NextResponse.json(
      { error: 'El destino de los registros no está configurado.' },
      { status: 503 },
    );
  }

  const leadRecord = {
    ...validatedData,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    // Secreto compartido opcional. La URL de un Apps Script publicado es
    // pública: sin esto, cualquiera que la descubra puede escribir en la hoja.
    ...(process.env.LEADS_WEBHOOK_SECRET
      ? { secret: process.env.LEADS_WEBHOOK_SECRET }
      : {}),
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadRecord),
      // Apps Script responde con un 302 hacia `script.googleusercontent.com`.
      // El POST ya se procesó antes del redirect; seguirlo solo recupera la
      // respuesta. Sin `follow` la petición quedaría en el 302 y parecería un
      // fallo cuando la fila ya se escribió.
      redirect: 'follow',
      signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
    });

    if (!response.ok) {
      throw new Error(`El webhook respondió ${response.status}`);
    }

    /*
     * El código de estado NO alcanza para saber si la fila se escribió.
     *
     * Apps Script responde SIEMPRE 200: no puede devolver otro estado desde
     * `doPost`. Un rechazo —secreto que no coincide, hoja inexistente, error
     * de ejecución— llega igual como 200, con `{"ok":false}` en el cuerpo.
     * Confiar solo en `response.ok` devolvía 201 sin que se hubiera guardado
     * nada, que es justamente el fallo silencioso que esta ruta existe para
     * impedir.
     */
    const body = await response.text();
    let acknowledged = false;

    try {
      acknowledged = JSON.parse(body)?.ok === true;
    } catch {
      // Cuerpo que no es JSON: casi siempre la página de error de Google
      // cuando la implementación no está publicada como «Cualquier usuario».
      throw new Error(`El webhook respondió algo que no es JSON: ${body.slice(0, 120)}`);
    }

    if (!acknowledged) {
      throw new Error(`El webhook rechazó el registro: ${body.slice(0, 200)}`);
    }

    return NextResponse.json({ success: true, leadId: leadRecord.id }, { status: 201 });
  } catch (error) {
    // El correo va al log para poder recuperar a mano un registro perdido: es
    // el único dato con el que se puede volver a contactar a esa persona.
    console.error(
      `[leads] No se pudo entregar el registro de ${leadRecord.email} (${leadRecord.interestType}):`,
      error,
    );
    return NextResponse.json(
      { error: 'No se pudo registrar el contacto.' },
      { status: 502 },
    );
  }
}
