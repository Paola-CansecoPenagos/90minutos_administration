import { GetReportRepository } from '../../infrastructure/repositories/get_report_repository';

export class GetReport {
    packageRepository: GetReportRepository;

    constructor(packageRepository: GetReportRepository) {
        this.packageRepository = packageRepository;
    }

    async execute() {
        return await this.packageRepository.getReport();
    }
}
