/*import { connectDB } from '../config/mongo_config';

export class UpdateReportRepository {
  async updatePackageCounts(totalPackages: number, packagesByStatus: { [status: string]: number }): Promise<void> {
    const db = await connectDB();
    const reportCollection = db.collection('report');

    // Aquí asumimos que siempre trabajamos con un único documento que queremos actualizar.
    const updateResult = await reportCollection.updateOne(
      { reportId: "packageCounts" }, // Identificador único del documento
      { 
        $set: { 
          totalPackages: totalPackages, 
          packagesByStatus: packagesByStatus 
        }
      },
      { upsert: true } // Crea el documento si no existe
    );
    console.log(`Report updated, matched ${updateResult.matchedCount}, modified ${updateResult.modifiedCount}`);
  }
}
  */

import { connectDB } from '../config/mongo_config';

export class UpdateReportRepository {
  async updatePackageCounts(totalPackages: number, totalMemberships: number, packagesByStatus: { [status: string]: number }, membershipsByType: { [type: string]: number }, membershipsByStatus: { [status: string]: number }): Promise<void> {
    const db = await connectDB();
    const reportCollection = db.collection('report');

    const updateResult = await reportCollection.updateOne(
      { reportId: "packageCounts" }, // Identificador único del documento
      { 
        $set: { 
          totalPackages: totalPackages, 
          totalMemberships: totalMemberships,
          packagesByStatus: packagesByStatus,
          membershipsByType: membershipsByType,
          membershipsByStatus: membershipsByStatus
        }
      },
      { upsert: true } // Crea el documento si no existe
    );
    console.log(`Report updated, matched ${updateResult.matchedCount}, modified ${updateResult.modifiedCount}`);
  }
}
