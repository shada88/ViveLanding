import { Lead } from '../../domain/entities/lead.entity';
import { ILeadRepository } from '../../domain/repositories/lead.repository.interface';

export interface RegisterLeadInput {
  fullName: string;
  email: string;
  phone?: string;
  interestType: 'VOLUNTARIO' | 'DONANTE' | 'ALIADO' | 'INFORMACION';
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
      interestType: input.interestType,
      message: input.message,
      createdAt: new Date(),
    };

    await this.leadRepository.save(lead);
    return lead;
  }
}
