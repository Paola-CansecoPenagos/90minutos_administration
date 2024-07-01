import express from 'express';
import { Signale } from "signale";
import { packageRoutes } from './infrastructure/routes/report_routes'; 
import './scheduled_tasks/update_package_cron';
import { initGetAllPackagesRequest } from './administration_managament/infraestructure/Dependencies';

const app = express();
const PORT = 3000;
const signale = new Signale();

app.use(express.json()); // Middleware para parsear JSON

// Middleware de registro para ver las solicitudes que llegan
app.use((req, res, next) => {
    console.log(`Solicitud recibida ${req.path}`);
    next();
});


app.use('/', packageRoutes);

async function startServer() {
    const server = app.listen(PORT, () => {
        signale.success(`Servidor corriendo en http://localhost:${PORT}`);
        initGetAllPackagesRequest(); 
    });
}

startServer();
