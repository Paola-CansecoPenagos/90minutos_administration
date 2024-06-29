import { Router } from 'express';
import { FetchPackageController } from '../controllers/fetch_package_controller';
import { GetReportController } from '../controllers/get_report_controller';

export const packageRoutes = Router();
const fetchController = new FetchPackageController();
const reportController = new GetReportController();

packageRoutes.get('/', (req, res) => fetchController.fetchPackage(req, res));
packageRoutes.get('/report', (req, res) => reportController.getPackage(req, res));
