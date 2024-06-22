import { IReportRepository } from '../interfaces/IReportRepository';
import { Report } from '../../domain/models/report';

export class GetReportUseCase {
    constructor(private repo: IReportRepository) {}

    async execute(): Promise<Report | null> {
        return await this.repo.fetchReport();
    }
}
