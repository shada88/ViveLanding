import * as fs from 'fs';
import * as path from 'path';
import { Lead } from '../../domain/entities/lead.entity';
import { ILeadRepository } from '../../domain/repositories/lead.repository.interface';

/** Orden de las columnas. Una sola fuente de verdad para escribir y para leer. */
const COLUMNS = [
  'id',
  'fullName',
  'email',
  'phone',
  'organization',
  'profession',
  'country',
  'interestType',
  'message',
  'createdAt',
] as const;

/**
 * Adaptador pragmático para volcar registros a CSV/Excel sin requerir base de
 * datos inicial. Intercambiable por un repositorio Prisma o Supabase sin tocar
 * el caso de uso.
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
      fs.writeFileSync(this.filePath, `${COLUMNS.join(',')}\n`, 'utf8');
    }
  }

  async save(lead: Lead): Promise<void> {
    const quote = (value?: string) => `"${(value || '').replace(/"/g, '""')}"`;
    const row =
      [
        lead.id,
        quote(lead.fullName),
        quote(lead.email),
        quote(lead.phone),
        quote(lead.organization),
        quote(lead.profession),
        quote(lead.country),
        lead.interestType,
        quote(lead.message),
        lead.createdAt.toISOString(),
      ].join(',') + '\n';

    fs.appendFileSync(this.filePath, row, 'utf8');
  }

  /**
   * Divide una línea CSV respetando las comillas.
   *
   * Reemplaza a un `line.split(',')` que partía cualquier campo con una coma
   * adentro y corría todas las columnas siguientes. El mensaje libre del
   * formulario casi siempre trae comas, así que no era un caso de borde: era
   * el caso normal.
   */
  private parseLine(line: string): string[] {
    const values: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];

      if (char === '"') {
        // Dos comillas seguidas dentro de un campo entrecomillado son una
        // comilla literal, no el cierre del campo.
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (char === ',' && !inQuotes) {
        values.push(current);
        current = '';
        continue;
      }

      current += char;
    }

    values.push(current);
    return values;
  }

  async findAll(): Promise<Lead[]> {
    if (!fs.existsSync(this.filePath)) return [];

    const content = fs.readFileSync(this.filePath, 'utf8').trim();
    if (!content) return [];

    return content
      .split('\n')
      .slice(1)
      .filter((line) => line.trim().length > 0)
      .map((line) => {
        const [
          id,
          fullName,
          email,
          phone,
          organization,
          profession,
          country,
          interestType,
          message,
          createdAt,
        ] = this.parseLine(line);

        return {
          id,
          fullName: fullName || '',
          email: email || '',
          phone: phone || undefined,
          organization: organization || undefined,
          profession: profession || undefined,
          country: country || undefined,
          interestType: interestType as Lead['interestType'],
          message: message || undefined,
          createdAt: new Date(createdAt),
        };
      });
  }
}
