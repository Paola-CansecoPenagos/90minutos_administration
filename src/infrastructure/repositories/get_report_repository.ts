import { connectDB } from '../config/mongo_config';

export class GetReportRepository {
    async getReport() {
        const db = await connectDB();
        const reportCollection = db.collection('report');
        return await reportCollection.find({}).toArray();
    }
}
