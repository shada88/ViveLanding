export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  interestType: 'VOLUNTARIO' | 'DONANTE' | 'ALIADO' | 'INFORMACION';
  message?: string;
  createdAt: Date;
}
