import { Request, Response } from 'express';
import { GetReport } from '../../application/usecases/get_report';
import { GetReportRepository } from '../repositories/get_report_repository';

export class GetReportController {
    async getPackage(req: Request, res: Response) {
        const repository = new GetReportRepository();
        const useCase = new GetReport(repository);
        try {
            const report = await useCase.execute();
            res.status(200).send(report);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).send({ message: 'Failed to retrieve data', error: error.message });
            } else {
                res.status(500).send({ message: 'An unexpected error occurred' });
            }
        }
    }
}
