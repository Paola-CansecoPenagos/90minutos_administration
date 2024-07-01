import { connectDB } from '../config/mongo_config';
import { Report } from '../../domain/entities/report';

export class PackageRepository {
/*  async savePackageReport(totalPackages: number, packagesByStatus: { [key: string]: number }) {
    const db = await connectDB();
    const reportCollection = db.collection('report');
    await reportCollection.insertOne({ totalPackages, packagesByStatus });
  }*/
    async savePackageReport(report: Report) {
      const db = await connectDB();
      const reportCollection = db.collection('report');
  
      // Crear un objeto con la estructura adecuada para MongoDB
      const reportData = {
        totalPackages: report.totalPackages,
        packagesByStatus: report.packagesByStatus,
        totalMemberships: report.totalMemberships,
        membershipsByType: report.membershipsByType,
        membershipsByStatus: report.membershipsByStatus
      };
  
      // Insertar el reporte completo en la colección de MongoDB
      await reportCollection.insertOne(reportData);
      console.log('Report saved successfully');
    }
}
