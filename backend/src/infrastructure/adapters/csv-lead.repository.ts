import * as fs from 'fs';
import * as path from 'path';
import { Lead } from '../../domain/entities/lead.entity';
import { ILeadRepository } from '../../domain/repositories/lead.repository.interface';

/**
 * Adaptador pragmático para volcar registros a CSV/Excel sin requerir base de datos inicial.
 * Fácilmente intercambiable en el futuro por un Prisma / Supabase repository sin tocar el caso de uso.
 */
export class CsvLeadRepository implements ILeadRepository {
  private readonly filePath: string;

  constructor(filePath?: string) {
    this.filePath = filePath || path.resolve(process.cwd(), 'data', 'leads.csv');
    this.ensureHeader();
  }

  private ensureHeader(): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      const header = 'id,fullName,email,phone,interestType,message,createdAt\n';
      fs.writeFileSync(this.filePath, header, 'utf8');
    }
  }

  async save(lead: Lead): Promise<void> {
    const escapeCsv = (val?: string) => `"${(val || '').replace(/"/g, '""')}"`;
    const row = [
      lead.id,
      escapeCsv(lead.fullName),
      escapeCsv(lead.email),
      escapeCsv(lead.phone),
      lead.interestType,
      escapeCsv(lead.message),
      lead.createdAt.toISOString(),
    ].join(',') + '\n';

    fs.appendFileSync(this.filePath, row, 'utf8');
  }

  async findAll(): Promise<Lead[]> {
    if (!fs.existsSync(this.filePath)) return [];
    const content = fs.readFileSync(this.filePath, 'utf8');
    const lines = content.trim().split('\n').slice(1);
    return lines.map((line) => {
      const [id, fullName, email, phone, interestType, message, createdAt] = line.split(',');
      return {
        id,
        fullName: fullName?.replace(/"/g, '') || '',
        email: email?.replace(/"/g, '') || '',
        phone: phone?.replace(/"/g, '') || '',
        interestType: interestType as any,
        message: message?.replace(/"/g, '') || '',
        createdAt: new Date(createdAt),
      };
    });
  }
}
