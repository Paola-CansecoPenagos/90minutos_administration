import { Router } from 'express';
import { FetchPackageController } from '../controllers/fetch_package_controller';
import { GetReportController } from '../controllers/get_report_controller';
import { GetGoogleSheetDataController } from '../controllers/getGoogleSheetDataController'; 

export const packageRoutes = Router();
const fetchController = new FetchPackageController();
const reportController = new GetReportController();
const googleSheetController = new GetGoogleSheetDataController();

packageRoutes.get('/', (req, res) => fetchController.fetchPackage(req, res));
packageRoutes.get('/report', (req, res) => reportController.getPackage(req, res));
packageRoutes.get('/sheets-data', (req, res) => googleSheetController.getSheetData(req, res));