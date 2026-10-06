'use client';

import React, { useId, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import { toast } from 'sonner';
import {
  PARTICIPATION_ROLES,
  type LeadField,
  type ParticipationRole,
} from '@/domain/entities/Participation';
import { SectionIntro } from './SectionIntro';
import styles from './ParticipateSection.module.css';

type FormValues = Partial<Record<LeadField, string>>;

const rallyRole = PARTICIPATION_ROLES.find((item) => item.id === 'escuelas');
if (!rallyRole) {
  throw new Error('Falta el formulario de preinscripción al Rally Continental.');
}
const RALLY_ROLE: ParticipationRole = rallyRole;

/**
 * 11 — Preinscripción al Rally Continental.
 *
 * La sección ya no ofrece otros caminos. El único registro es el de la
 * escuela que quiere entrar a la convocatoria.
 */
export function ParticipateSection() {
  const groupId = useId();
  const [values, setValues] = useState<FormValues>({});
  const [sending, setSending] = useState(false);
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const update = (field: LeadField) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;

    const missing = RALLY_ROLE.fields.filter(
      (field) => field.required && !values[field.name]?.trim(),
    );
    if (missing.length > 0) {
      toast.error(`Falta completar: ${missing.map((field) => field.label).join(', ')}.`);
      return;
    }

    setSending(true);

    try {
      const payload: Record<string, string> = { interestType: RALLY_ROLE.interestType };
      for (const field of RALLY_ROLE.fields) {
        const value = values[field.name]?.trim();
        if (value) payload[field.name] = value;
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Respuesta ${response.status}`);

      setSentEmail(values.email?.trim() ?? '');
      setValues({});
      toast.success('Registro recibido', { description: RALLY_ROLE.successNote });
    } catch (error) {
      console.error('No se pudo registrar el contacto:', error);
      toast.error('No pudimos registrar tus datos', {
        description: 'Vuelve a intentarlo en unos minutos o escribe a la fundación.',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="participar" className="section section--sunken" aria-labelledby="participar-titulo">
      <div className="shell">
        <SectionIntro
          step="11"
          eyebrow="Participar"
          titleId="participar-titulo"
          title={RALLY_ROLE.formTitle}
          lede={RALLY_ROLE.formLede}
        />

        <div className={styles.formArea} aria-live="polite">
          {sentEmail !== null ? (
            <div className={styles.success} role="status">
              <CheckCircle2 size={40} aria-hidden="true" className={styles.successIcon} />
              <h3 className={styles.successTitle}>Registro recibido</h3>
              <p className={styles.successBody}>
                {RALLY_ROLE.successNote}
                {sentEmail && (
                  <>
                    {' '}
                    Te escribimos a <strong>{sentEmail}</strong>.
                  </>
                )}
              </p>
              <button type="button" className="btn btn--quiet" onClick={() => setSentEmail(null)}>
                Enviar otro registro
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={`${styles.formBlock} ${styles.form}`} noValidate>
              {RALLY_ROLE.fields.map((field) => {
                const fieldId = `${groupId}-${field.name}`;
                const shared = {
                  id: fieldId,
                  className: styles.input,
                  placeholder: field.placeholder,
                  autoComplete: field.autoComplete,
                  value: values[field.name] ?? '',
                  onChange: update(field.name),
                  required: field.required,
                };

                return (
                  <div
                    key={field.name}
                    className={`${styles.field} ${field.wide ? styles.fieldWide : ''}`}
                  >
                    <label htmlFor={fieldId} className={styles.label}>
                      {field.label}
                      {field.required && <span aria-hidden="true"> *</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea {...shared} rows={3} className={`${styles.input} ${styles.textarea}`} />
                    ) : (
                      <input
                        {...shared}
                        type={field.type}
                        inputMode={field.type === 'email' ? 'email' : undefined}
                      />
                    )}
                  </div>
                );
              })}

              <div className={styles.fieldWide}>
                <button
                  type="submit"
                  className="btn btn--lg btn--primary btn--block"
                  disabled={sending}
                >
                  <Send size={18} aria-hidden="true" />
                  <span>{sending ? 'Enviando…' : 'Enviar registro'}</span>
                </button>
                <p className={styles.formNote}>
                  Usamos estos datos solo para responderte sobre la preinscripción al Rally.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
