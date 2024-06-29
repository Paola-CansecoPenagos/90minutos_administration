import axios from 'axios';
import { Signale } from 'signale';
import { UpdateReportRepository } from '../../infrastructure/repositories/update_report_repository';

// Definición de una interfaz para los paquetes, ajusta según tus datos reales.
interface Package {
    id: string;
    status: string;
}

// Definición para el acumulador en reduce.
interface PackageCounts {
    [status: string]: number;
}

export class UpdatePackageStatusService {
  private signale = new Signale();
  private updateReportRepository = new UpdateReportRepository();

  async updatePackageCounts() {
    try {
      const response = await axios.get('http://dev-90minutos-1292116088.us-east-2.elb.amazonaws.com/package/v1/get');
      const packages = response.data.data as Package[];

      const totalPackages = packages.length;
      const packagesByStatus = packages.reduce((acc: PackageCounts, pkg: Package) => {
        acc[pkg.status] = (acc[pkg.status] || 0) + 1;
        return acc;
      }, {});

      await this.updateReportRepository.updatePackageCounts(totalPackages, packagesByStatus);
      this.signale.success('Package counts updated successfully');
    } catch (error) {
      this.signale.error('Failed to update package counts:', error);
    }
  }
}
