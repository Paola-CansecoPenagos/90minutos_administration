import { connectDB } from '../config/mongo_config';

export class PackageRepository {
  async savePackageReport(totalPackages: number, packagesByStatus: { [key: string]: number }) {
    const db = await connectDB();
    const reportCollection = db.collection('report');
    await reportCollection.insertOne({ totalPackages, packagesByStatus });
  }
}
