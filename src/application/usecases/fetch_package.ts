/*import axios from 'axios';
import { PackageRepository } from '../../infrastructure/repositories/fetch_package_repository';
import { Report } from '../../domain/entities/report';

function normalizePackageStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
        'En ruta': 'EnRuta',
        'En oficina': 'EnOficina',
        'Re-programado': 'Reprogramado'
    };
    return statusMap[status] || status;
}

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
            const normalizedStatus = normalizePackageStatus(pkg.status);
            acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
            return acc;
        }, {});

        // Crear una nueva instancia de Report
        const report = new Report(totalPackages, packagesByStatus);

        // Guardar el reporte utilizando el repositorio
        await this.packageRepository.savePackageReport(report.totalPackages, report.packagesByStatus);
    }
}
*/

import axios from 'axios';
import { PackageRepository } from '../../infrastructure/repositories/fetch_package_repository';
import { Report } from '../../domain/entities/report';

function normalizePackageStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
        'En ruta': 'EnRuta',
        'En oficina': 'EnOficina',
        'Re-programado': 'Reprogramado'
    };
    return statusMap[status] || status;
}

export class FetchPackage {
    packageRepository: PackageRepository;

    constructor(packageRepository: PackageRepository) {
        this.packageRepository = packageRepository;
    }

    async execute() {
        const [packageResponse, membershipResponse] = await Promise.all([
            axios.get('http://dev-90minutos-1292116088.us-east-2.elb.amazonaws.com/package/v1/get/'),
            axios.get('http://127.0.0.1:5000/api/data')
        ]);

        const packages = packageResponse.data.data;
        const memberships = membershipResponse.data.data;

        const totalPackages = packages.length;
        const packagesByStatus = packages.reduce((acc: { [key: string]: number }, pkg: any) => {
            const normalizedStatus = normalizePackageStatus(pkg.status);
            acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
            return acc;
        }, {});

        const totalMemberships = memberships.length;
        const membershipsByType = memberships.reduce((acc: { [key: string]: number }, mem: any) => {
            const type = mem.membershipName || "Unknown";
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});

        const membershipsByStatus = memberships.reduce((acc: { [key: string]: number }, mem: any) => {
            const status = mem.status;
            acc[status] = (acc[status] || 0) + 1;
            return acc;
        }, {});

        // Crear una nueva instancia de Report con los datos adicionales
        const report = new Report(
            totalPackages, 
            packagesByStatus, 
            totalMemberships, 
            membershipsByType, 
            membershipsByStatus
        );

        // Guardar el reporte utilizando el repositorio
        await this.packageRepository.savePackageReport(report);
    }
}
