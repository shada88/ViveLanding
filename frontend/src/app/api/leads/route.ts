import { NextResponse } from 'next/server';
import { z } from 'zod';

const leadSchema = z.object({
  fullName: z.string().min(2, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  interestType: z.enum(['VOLUNTARIO', 'DONANTE', 'ALIADO', 'INFORMACION']),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    const leadRecord = {
      ...validatedData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    // Si existe Webhook a Google Sheets / Excel, lo disparamos de forma desacoplada
    if (process.env.LEADS_WEBHOOK_URL) {
      await fetch(process.env.LEADS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadRecord),
      }).catch((err) => console.error('Error enviando a webhook:', err));
    }

    return NextResponse.json({ success: true, leadId: leadRecord.id }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
