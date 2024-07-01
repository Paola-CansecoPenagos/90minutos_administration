/*import axios from 'axios';
import { Signale } from 'signale';
import { UpdateReportRepository } from '../../infrastructure/repositories/update_report_repository';
import { GetAllPackagesResponse } from '../../administration_managament/infraestructure/services/GetAllPackagesResponse';

interface Package {
  id: string;
  status: string;
}

interface PackageCounts {
  [status: string]: number;
}

function normalizePackageStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
        'En ruta': 'EnRuta',
        'En oficina': 'EnOficina',
        'Re-programado': 'Reprogramado'
    };
    return statusMap[status] || status; // Retorna el estado transformado o el original si no necesita transformación.
}

export class UpdatePackageStatusService {
    private signale = new Signale();
    private updateReportRepository = new UpdateReportRepository();
    private getAllPackagesResponse = new GetAllPackagesResponse();

    async updatePackageCounts() {
        try {
            const response = await axios.get('http://dev-90minutos-1292116088.us-east-2.elb.amazonaws.com/package/v1/get');
            const packages = response.data.data as Package[];

            const totalPackages = packages.length;
            const packagesByStatus = packages.reduce((acc: PackageCounts, pkg: Package) => {
                const normalizedStatus = normalizePackageStatus(pkg.status);
                acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
                return acc;
            }, {});

            await this.updateReportRepository.updatePackageCounts(totalPackages, packagesByStatus);
            await this.getAllPackagesResponse.sendMessage({ totalPackages, packagesByStatus });
            this.signale.success('Package counts updated and message sent successfully');
        } catch (error) {
            this.signale.error('Failed to update package counts and send message:', error);
        }
    }
}
*/

// src\application\services\update_package_status.ts
import axios from 'axios';
import { Signale } from 'signale';
import { UpdateReportRepository } from '../../infrastructure/repositories/update_report_repository';
import { GetAllPackagesResponse } from '../../administration_managament/infraestructure/services/GetAllPackagesResponse';

interface Package {
  id: string;
  status: string;
}

interface PackageCounts {
  [status: string]: number;
}

interface Membership {
  membershipName: string;
  status: string;
  amount: number;
}

function normalizePackageStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
        'En ruta': 'EnRuta',
        'En oficina': 'EnOficina',
        'Re-programado': 'Reprogramado'
    };
    return statusMap[status] || status;
}

export class UpdatePackageStatusService {
    private signale = new Signale();
    private updateReportRepository = new UpdateReportRepository();
    private getAllPackagesResponse = new GetAllPackagesResponse();

    async updatePackageCounts() {
        try {
            const [packageResponse, membershipResponse] = await Promise.all([
                axios.get('http://dev-90minutos-1292116088.us-east-2.elb.amazonaws.com/package/v1/get'),
                axios.get('http://127.0.0.1:5000/api/data')
            ]);

            const packages = packageResponse.data.data as Package[];
            const memberships = membershipResponse.data.data as Membership[];

            const totalPackages = packages.length;
            const packagesByStatus = packages.reduce((acc: PackageCounts, pkg: Package) => {
                const normalizedStatus = normalizePackageStatus(pkg.status);
                acc[normalizedStatus] = (acc[normalizedStatus] || 0) + 1;
                return acc;
            }, {});

            const totalMemberships = memberships.length;
            const membershipsByType = memberships.reduce((acc: { [type: string]: number }, mem: Membership) => {
                acc[mem.membershipName] = (acc[mem.membershipName] || 0) + 1;
                return acc;
            }, {});

            const membershipsByStatus = memberships.reduce((acc: { [status: string]: number }, mem: Membership) => {
                acc[mem.status] = (acc[mem.status] || 0) + 1;
                return acc;
            }, {});

            await this.updateReportRepository.updatePackageCounts(totalPackages, totalMemberships, packagesByStatus, membershipsByType, membershipsByStatus);
            await this.getAllPackagesResponse.sendMessage({ totalPackages, totalMemberships, packagesByStatus, membershipsByType, membershipsByStatus });
            this.signale.success('Package and membership counts updated and message sent successfully');
        } catch (error) {
            this.signale.error('Failed to update counts and send message:', error);
        }
    }
}
