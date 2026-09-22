export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  /**
   * Plantel, universidad u organización a la que pertenece el contacto.
   * El canal principal de captación es la preinscripción escolar: sin esto un
   * registro llega con un nombre propio y nada con qué ubicarlo.
   */
  organization?: string;
  /** Profesión u oficio. Solo lo declara el rol de profesionales y voluntarios. */
  profession?: string;
  country?: string;
  interestType: 'ESCUELA' | 'VOLUNTARIO' | 'DONANTE' | 'ALIADO' | 'INFORMACION';
  message?: string;
  createdAt: Date;
}
