import { IReportRepository } from '../../application/interfaces/IReportRepository';
import { Report } from '../../domain/models/report';
import axios from 'axios';

export class ReportRepository implements IReportRepository {
    private commentsApiUrl = 'http://'; //endpoint para los comentarios
    private earningsApiUrl = 'http://'; //endpoint para las ganancias/membresias
    private packagesApiUrl = 'http://'; //endpoint para los paquetes

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
            console.error('No se pudieron recuperar los datos del reporte:', error);
            return null;
        }
    }

    private async fetchData(url: string) {
        const response = await axios.get(url);
        return response.data;
    }
}
