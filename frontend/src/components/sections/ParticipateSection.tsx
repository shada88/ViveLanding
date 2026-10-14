'use client';

import React, { useEffect, useId, useState } from 'react';
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Heart,
  School,
  Send,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  DEFAULT_INTEREST,
  INTEREST_OPTIONS,
  PARTICIPATE_INTRO,
  fieldsFor,
  interestFromRole,
  type InterestOption,
  type LeadField,
  type LeadInterest,
} from '@/domain/entities/Participation';
import { leadSchema } from '@/lib/leadSchema';
import { SELECT_ROLE_EVENT } from '@/lib/participation';
import { SectionIntro } from './SectionIntro';
import styles from './ParticipateSection.module.css';

type FormValues = Partial<Record<LeadField, string>>;
type FieldErrors = Partial<Record<LeadField, string>>;

const ICONS: Record<InterestOption['icon'], LucideIcon> = { School, Building2, Users, Heart };

function optionFor(interest: LeadInterest): InterestOption {
  return INTEREST_OPTIONS.find((option) => option.id === interest) ?? INTEREST_OPTIONS[0];
}

/**
 * 07 — ¿Cómo puedo ser parte? El clímax del embudo.
 *
 * UN formulario con selector de interés, conectado a `/api/leads`. Lo que
 * cambia al elegir interés es mínimo —rótulos, qué campo es obligatorio, la
 * pregunta final—, y por eso los valores escritos SE CONSERVAN al cambiar de
 * opción: quien completó nombre y correo y después se dio cuenta de que es
 * aliado y no escuela no tiene por qué volver a escribirlos.
 *
 * Validación en dos capas con el MISMO esquema (`lib/leadSchema.ts`): acá,
 * para señalar el campo exacto antes de enviar; en el servidor, porque la
 * validación del cliente es cortesía y no seguridad.
 *
 * El interés llega preseleccionado por dos vías:
 * - `vce:select-role`, desde otra sección de la landing, sin recargar.
 * - `?interes=` en la URL, desde `/sobre-nosotros`, donde el evento no llega.
 */
export function ParticipateSection() {
  const groupId = useId();
  const [interest, setInterest] = useState<LeadInterest>(DEFAULT_INTEREST);
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sentEmail, setSentEmail] = useState<string | null>(null);

  const option = optionFor(interest);
  const fields = fieldsFor(option);

  useEffect(() => {
    const fromUrl = interestFromRole(new URLSearchParams(window.location.search).get('interes') ?? '');
    if (fromUrl) setInterest(fromUrl);

    const onSelect = (event: Event) => {
      const roleId = (event as CustomEvent<unknown>).detail;
      const next = typeof roleId === 'string' ? interestFromRole(roleId) : null;
      if (!next) return;
      setInterest(next);
      setSentEmail(null);
    };

    window.addEventListener(SELECT_ROLE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_ROLE_EVENT, onSelect);
  }, []);

  const chooseInterest = (next: LeadInterest) => {
    setInterest(next);
    // Los errores pueden dejar de aplicar: «organización obligatoria» no vale
    // para quien pasó de escuela a voluntario.
    setErrors({});
  };

  const update = (field: LeadField) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const payload: Record<string, string> = { interestType: interest };
    for (const field of fields) {
      const value = values[field.name]?.trim();
      if (value) payload[field.name] = value;
    }

    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const name = issue.path[0];
        if (typeof name === 'string' && !(name in next)) next[name as LeadField] = issue.message;
      }
      setErrors(next);

      // El foco va al primer campo con error, en el orden visual del formulario:
      // un mensaje de error que nadie ve es igual a no tenerlo.
      const first = fields.find((field) => next[field.name]);
      if (first) document.getElementById(`${groupId}-${first.name}`)?.focus();
      return;
    }

    setSending(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) throw new Error(`Respuesta ${response.status}`);

      setSentEmail(parsed.data.email);
      setValues({});
      setErrors({});
      toast.success('Registro recibido', { description: option.successNote });
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
          step="07"
          eyebrow={PARTICIPATE_INTRO.eyebrow}
          titleId="participar-titulo"
          title={PARTICIPATE_INTRO.title}
          lede={PARTICIPATE_INTRO.lede}
        />

        <div className={styles.formArea} aria-live="polite">
          {sentEmail !== null ? (
            <div className={styles.success} role="status">
              <CheckCircle2 size={40} aria-hidden="true" className={styles.successIcon} />
              <h3 className={styles.successTitle}>Registro recibido</h3>
              <p className={styles.successBody}>
                {option.successNote}
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
              <fieldset className={`${styles.fieldWide} ${styles.interests}`}>
                <legend className={styles.legend}>¿Qué quieres hacer?</legend>
                <div className={styles.interestGrid}>
                  {INTEREST_OPTIONS.map((item) => {
                    const Icon = ICONS[item.icon];
                    const checked = item.id === interest;
                    return (
                      <label
                        key={item.id}
                        className={`${styles.interest} ${checked ? styles.interestActive : ''}`}
                      >
                        <input
                          type="radio"
                          name={`${groupId}-interes`}
                          value={item.id}
                          checked={checked}
                          onChange={() => chooseInterest(item.id)}
                          className={styles.interestInput}
                        />
                        <span className={styles.interestIcon}>
                          <Icon size={18} aria-hidden="true" />
                        </span>
                        <span className={styles.interestCopy}>
                          <span className={styles.interestLabel}>{item.label}</span>
                          <span className={styles.interestBlurb}>{item.blurb}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              {fields.map((field) => {
                const fieldId = `${groupId}-${field.name}`;
                const errorId = `${fieldId}-error`;
                const error = errors[field.name];
                const shared = {
                  id: fieldId,
                  name: field.name,
                  placeholder: field.placeholder,
                  autoComplete: field.autoComplete,
                  value: values[field.name] ?? '',
                  onChange: update(field.name),
                  required: field.required,
                  'aria-invalid': error ? true : undefined,
                  'aria-describedby': error ? errorId : undefined,
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
                        className={styles.input}
                        inputMode={field.type === 'email' ? 'email' : undefined}
                      />
                    )}

                    {error && (
                      <p id={errorId} className={styles.error}>
                        {error}
                      </p>
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
                  Usamos estos datos solo para responderte sobre el interés que elegiste. No
                  incluyas información sensible de niñas, niños o adolescentes.
                </p>

                {option.secondaryAction && (
                  <p className={styles.secondary}>
                    {option.secondaryAction.note}{' '}
                    <a
                      href={option.secondaryAction.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow link-arrow--gold"
                    >
                      <span>{option.secondaryAction.label}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
