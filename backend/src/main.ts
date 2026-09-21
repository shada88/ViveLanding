import express from 'express';
import cors from 'cors';
import { RegisterLeadUseCase } from './application/use-cases/register-lead.use-case';
import { CsvLeadRepository } from './infrastructure/adapters/csv-lead.repository';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Inyección de dependencias (Manual / Alta cohesión)
const leadRepository = new CsvLeadRepository();
const registerLeadUseCase = new RegisterLeadUseCase(leadRepository);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Vive con Esperanza Backend' });
});

app.post('/api/leads', async (req, res) => {
  try {
    const lead = await registerLeadUseCase.execute(req.body);
    res.status(201).json({ success: true, leadId: lead.id });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend de Fundación Vive con Esperanza escuchando en http://localhost:${port}`);
});
