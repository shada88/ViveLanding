import { z } from 'zod';

/**
 * Contrato ÚNICO del registro de la sección Participar.
 *
 * Vive fuera de la ruta porque lo usan dos lados: el formulario valida con él
 * antes de enviar y `/api/leads` vuelve a validar al recibir. Dos esquemas
 * escritos a mano se desincronizan en la primera corrección —el cliente acepta
 * algo que el servidor rechaza— y la persona ve un error genérico después de
 * haber completado todo bien.
 *
 * El servidor SIEMPRE revalida: la validación del cliente es cortesía, no
 * seguridad. Cualquiera puede llamar a la ruta sin pasar por el formulario.
 *
 * Al agregar un campo hay que tocar también el arreglo `COLUMNAS` del Apps
 * Script (al final, nunca en el medio) y `domain/entities/Participation.ts`.
 */
export const LEAD_INTERESTS = ['ESCUELA', 'VOLUNTARIO', 'DONANTE', 'ALIADO', 'INFORMACION'] as const;

const optionalText = z.string().trim().max(2000).optional();

export const leadSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Escribe tu nombre completo.'),
    email: z.string().trim().email('Revisa el correo: no parece válido.'),
    phone: optionalText,
    organization: optionalText,
    profession: optionalText,
    country: optionalText,
    interestType: z.enum(LEAD_INTERESTS),
    message: optionalText,
  })
  .superRefine((lead, ctx) => {
    // Una escuela o una alianza sin nombre de institución es un registro que
    // no se puede responder: no hay a quién escribirle «su escuela».
    if ((lead.interestType === 'ESCUELA' || lead.interestType === 'ALIADO') && !lead.organization) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['organization'],
        message: 'Indica el nombre de la escuela u organización.',
      });
    }

    // La red de voluntariado se arma por oficio: sin él no hay a qué caso sumarte.
    if (lead.interestType === 'VOLUNTARIO' && !lead.profession) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['profession'],
        message: 'Cuéntanos tu profesión u oficio.',
      });
    }
  });

export type LeadInput = z.infer<typeof leadSchema>;
