import { Report } from '../../domain/models/report';

export interface IReportRepository {
    fetchReport(): Promise<Report | null>;
}
