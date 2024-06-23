import { Request, Response } from 'express';
import { GetReportUseCase } from '../../../application/usecases/getReportUseCase';
import { ReportRepository } from '../../repository/reportRepository';

export class ReportController {
    async getReport(req: Request, res: Response) {
        const repository = new ReportRepository();
        const useCase = new GetReportUseCase(repository);

        try {
            const report = await useCase.execute();
            if (report) {
                res.json(report);
            } else {
                res.status(404).json({ message: 'Reporte no encontrado' });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(500).json({ message: 'Error al obtener el reporte', error: error.message });
            } else {
                res.status(500).json({ message: 'Ocurrio un error' });
            }
        }
    }
}
