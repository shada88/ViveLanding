import { Lead } from '../../domain/entities/lead.entity';
import { ILeadRepository } from '../../domain/repositories/lead.repository.interface';

export interface RegisterLeadInput {
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  profession?: string;
  country?: string;
  interestType: 'ESCUELA' | 'VOLUNTARIO' | 'DONANTE' | 'ALIADO' | 'INFORMACION';
  message?: string;
}

export class RegisterLeadUseCase {
  constructor(private readonly leadRepository: ILeadRepository) {}

  async execute(input: RegisterLeadInput): Promise<Lead> {
    const lead: Lead = {
      id: crypto.randomUUID(),
      fullName: input.fullName,
      email: input.email,
      phone: input.phone,
      organization: input.organization,
      profession: input.profession,
      country: input.country,
      interestType: input.interestType,
      message: input.message,
      createdAt: new Date(),
    };

    await this.leadRepository.save(lead);
    return lead;
  }
}
