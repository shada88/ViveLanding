import type { ParticipationRoleId } from '@/domain/entities/Participation';

/**
 * Evento con el que una sección de la landing preselecciona el interés del
 * formulario de Participar sin recargar la página.
 *
 * Vive en `lib/` y no en el dominio porque toca `window`: el dominio describe
 * QUÉ intereses existen, no cómo se comunican los componentes del navegador.
 */
export const SELECT_ROLE_EVENT = 'vce:select-role';

export function selectParticipationRole(roleId: ParticipationRoleId): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SELECT_ROLE_EVENT, { detail: roleId }));
}
