import { Router } from 'express';
import { ReportController } from '../controllers/reportController';

export class ReportRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes() {
        const controller = new ReportController();
        this.router.get('/', controller.getReport.bind(controller));
    }
}
