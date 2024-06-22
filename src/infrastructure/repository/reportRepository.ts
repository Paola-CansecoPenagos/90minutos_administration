import { IReportRepository } from '../../application/interfaces/IReportRepository';
import { Report } from '../../domain/models/report';
import axios from 'axios';

export class ReportRepository implements IReportRepository {
    private commentsApiUrl = 'http://external-api.com/comments';
    private earningsApiUrl = 'http://external-api.com/earnings';
    private packagesApiUrl = 'http://external-api.com/packages';

    async fetchReport(): Promise<Report | null> {
        try {
            const commentsData = await this.fetchData(this.commentsApiUrl);
            const earningsData = await this.fetchData(this.earningsApiUrl);
            const packagesData = await this.fetchData(this.packagesApiUrl);

            return new Report(
                commentsData.totalComments,
                commentsData.monthlyComments,
                earningsData.totalEarnings,
                earningsData.monthlyMemberships,
                packagesData.packagesByStatus,
                packagesData.monthlyPackageStatus,
                packagesData.totalPackages
            );
        } catch (error) {
            console.error('Failed to fetch report data:', error);
            return null;
        }
    }

    private async fetchData(url: string) {
        const response = await axios.get(url);
        return response.data;
    }
}
