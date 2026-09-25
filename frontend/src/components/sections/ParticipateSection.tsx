'use client';

import React, { useId, useRef, useState } from 'react';
import {
  ArrowDown,
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
  PARTICIPATION_ROLES,
  type LeadField,
  type ParticipationRole,
} from '@/domain/entities/Participation';
import { Reveal } from '@/components/motion/Reveal';
import { SectionIntro } from './SectionIntro';
import styles from './ParticipateSection.module.css';

const ROLE_ICONS: Record<ParticipationRole['icon'], LucideIcon> = {
  School,
  Heart,
  Users,
  Building2,
};

type FormValues = Partial<Record<LeadField, string>>;

/**
 * 12 — Participar.
 *
 * Cierre de conversión del recorrido. La versión anterior era un catálogo de
 * cuatro tarjetas que empujaban a cuatro páginas externas: tres de ellas solo
 * llevaban a un sitio distinto para volver a explicar lo mismo, y el registro
 * nunca llegaba a la fundación.
 *
 * Ahora la sección se resuelve entera acá: se elige un rol del catálogo y el
 * formulario de ESE rol aparece debajo, con sus campos y su copy. Los cuatro
 * envían al mismo endpoint con su propio `interestType`.
 *
 * Tres decisiones que sostienen el resto:
 *
 * 1. **Los formularios salen de un esquema, no de cuatro bloques de JSX.**
 *    Cuatro copias se desincronizan en la primera corrección y nadie lo nota.
 * 2. **La elección son radios nativos, no botones con ARIA.** Un grupo de
 *    radios trae gratis el recorrido con flechas, el anuncio de "opción 2 de
 *    4" y el comportamiento correcto dentro de un formulario. Reimplementar
 *    todo eso con `div`s y `aria-*` es trabajo extra para quedar peor.
 * 3. **Nada viene preseleccionado.** Elegir por la persona en la sección cuyo
 *    único propósito es que elija sería contradecirla en su propio terreno.
 */
export function ParticipateSection() {
  const groupId = useId();
  const [roleId, setRoleId] = useState<string | null>('escuelas');
  const [values, setValues] = useState<FormValues>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState<{ role: ParticipationRole; email: string } | null>(null);
  const formRef = useRef<HTMLDivElement | null>(null);

  const role = PARTICIPATION_ROLES.find((item) => item.id === roleId) ?? null;

  const chooseRole = (id: string) => {
    setRoleId(id);
    // Los campos no se arrastran entre roles: un "nombre del plantel" cargado
    // en el formulario de escuela no tiene sentido en el de donante, y dejarlo
    // ahí haría que alguien lo enviara sin querer.
    setValues({});
    setSent(null);

    // En móvil las cuatro opciones ocupan la pantalla entera: al elegir la
    // última, el formulario aparece fuera de vista y parece que no pasó nada.
    // El desplazamiento se pide en el cuadro siguiente, cuando el bloque ya
    // existe en el árbol, y se respeta la preferencia de movimiento reducido.
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'nearest',
      });
    });
  };

  React.useEffect(() => {
    const handleSelectRole = (event: Event) => {
      const customEvent = event as CustomEvent<string>;
      const targetRoleId = customEvent.detail;
      if (targetRoleId && PARTICIPATION_ROLES.some((r) => r.id === targetRoleId)) {
        chooseRole(targetRoleId);
      }
    };

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#participar-')) {
        const targetRoleId = hash.replace('#participar-', '');
        if (PARTICIPATION_ROLES.some((r) => r.id === targetRoleId)) {
          chooseRole(targetRoleId);
        }
      }
    };

    window.addEventListener('vce:select-role', handleSelectRole);
    window.addEventListener('hashchange', handleHash);
    handleHash();

    return () => {
      window.removeEventListener('vce:select-role', handleSelectRole);
      window.removeEventListener('hashchange', handleHash);
    };
  }, []);

  const update = (field: LeadField) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setValues((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!role || sending) return;

    const missing = role.fields.filter(
      (field) => field.required && !values[field.name]?.trim(),
    );
    if (missing.length > 0) {
      toast.error(`Falta completar: ${missing.map((f) => f.label).join(', ')}.`);
      return;
    }

    setSending(true);

    try {
      // Solo se envían los campos con contenido. Mandar cadenas vacías haría
      // que el esquema las valide como presentes y llenaría el registro de
      // columnas en blanco que parecen datos.
      const payload: Record<string, string> = { interestType: role.interestType };
      for (const field of role.fields) {
        const value = values[field.name]?.trim();
        if (value) payload[field.name] = value;
      }

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Respuesta ${response.status}`);

      setSent({ role, email: values.email?.trim() ?? '' });
      setValues({});
      toast.success('Registro recibido', { description: role.successNote });
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
          title="Elige por dónde entras"
          lede="En la resiliencia de un territorio no hay espectadores. Elige tu rol y te mostramos exactamente qué necesitamos saber de ti."
        />

        <fieldset className={styles.catalog}>
          <legend className="sr-only">Elige cómo quieres participar</legend>

          <div className={styles.doors}>
            {PARTICIPATION_ROLES.map((item, i) => {
              const Icon = ROLE_ICONS[item.icon];
              const inputId = `${groupId}-${item.id}`;
              const selected = roleId === item.id;

              return (
                <Reveal key={item.id} index={i} className={styles.doorWrap}>
                  <input
                    type="radio"
                    id={inputId}
                    name={`${groupId}-rol`}
                    className={`sr-only ${styles.radio}`}
                    checked={selected}
                    onChange={() => chooseRole(item.id)}
                  />
                  <label
                    htmlFor={inputId}
                    className={`${styles.door} ${selected ? styles.doorActive : ''}`}
                  >
                    <span className={styles.doorIcon}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <span className={`h3 ${styles.doorTitle}`}>{item.title}</span>
                    <span className={styles.doorBody}>{item.blurb}</span>
                    <span className={styles.doorPick} aria-hidden="true">
                      {selected ? 'Seleccionado' : 'Elegir'}
                    </span>
                  </label>
                </Reveal>
              );
            })}
          </div>
        </fieldset>

        {/*
          Región viva: el formulario aparece sin recargar nada. Sin esto, quien
          usa lector de pantalla elige un rol y no recibe ninguna señal de que
          debajo acaba de aparecer un formulario entero.
        */}
        <div ref={formRef} className={styles.formArea} aria-live="polite">
          {!role && (
            <p className={styles.hint}>
              <ArrowDown size={16} aria-hidden="true" />
              Elige una opción para ver su formulario.
            </p>
          )}

          {role && sent && (
            <div className={styles.success} role="status">
              <CheckCircle2 size={40} aria-hidden="true" className={styles.successIcon} />
              <h3 className={styles.successTitle}>Registro recibido</h3>
              <p className={styles.successBody}>
                {sent.role.successNote}
                {sent.email && (
                  <>
                    {' '}
                    Te escribimos a <strong>{sent.email}</strong>.
                  </>
                )}
              </p>
              <button type="button" className="btn btn--quiet" onClick={() => setSent(null)}>
                Enviar otro registro
              </button>
            </div>
          )}

          {role && !sent && (
            <div className={styles.formBlock}>
              <div className={styles.formHead}>
                <h3 className={`h3 ${styles.formTitle}`}>{role.formTitle}</h3>
                <p className={styles.formLede}>{role.formLede}</p>
              </div>

              {/*
                La `key` fuerza a React a montar un formulario NUEVO al cambiar
                de rol, en vez de reutilizar los campos del anterior. Sin esto
                el navegador conserva estados internos —validación, foco, valor
                autocompletado— de campos que ya no son los mismos.
              */}
              <form key={role.id} onSubmit={handleSubmit} className={styles.form} noValidate>
                {role.fields.map((field) => {
                  const fieldId = `${groupId}-${role.id}-${field.name}`;
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
                    Usamos estos datos solo para responderte sobre lo que elegiste.
                  </p>
                </div>
              </form>

              {/* Vía alternativa: solo aparece donde existe un canal que
                  resuelve la acción en el acto, no como segundo botón por
                  defecto. Dos llamados de igual peso no ayudan a decidir. */}
              {role.secondaryAction && (
                <div className={styles.secondary}>
                  <p className={styles.secondaryNote}>{role.secondaryAction.note}</p>
                  <a
                    href={role.secondaryAction.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow link-arrow--gold"
                  >
                    <span>{role.secondaryAction.label}</span>
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
