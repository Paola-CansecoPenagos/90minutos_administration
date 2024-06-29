import axios from 'axios';
import { PackageRepository } from '../../infrastructure/repositories/fetch_package_repository';
import { Report } from '../../domain/entities/report';

export class FetchPackage {
    packageRepository: PackageRepository;

    constructor(packageRepository: PackageRepository) {
        this.packageRepository = packageRepository;
    }

    async execute() {
        const response = await axios.get('http://dev-90minutos-1292116088.us-east-2.elb.amazonaws.com/package/v1/get/');
        const packages = response.data.data;
        const totalPackages = packages.length;
        const packagesByStatus = packages.reduce((acc: { [key: string]: number }, pkg: any) => {
            acc[pkg.status] = (acc[pkg.status] || 0) + 1;
            return acc;
        }, {});

        // Crear una nueva instancia de Report
        const report = new Report(totalPackages, packagesByStatus);

        // Guardar el reporte utilizando el repositorio
        await this.packageRepository.savePackageReport(report.totalPackages, report.packagesByStatus);
    }
}