import express from 'express';
import { Signale } from "signale";
import { packageRoutes } from './infrastructure/routes/report_routes'; // Asegúrate de que la ruta de importación sea correcta

const app = express();
const PORT = 3000;
const signale = new Signale();

app.use(express.json()); // Middleware para parsear JSON

// Middleware de registro para ver las solicitudes que llegan
app.use((req, res, next) => {
    console.log(`Solicitud recibida para ${req.path}`);
    next();
});


app.use('/', packageRoutes);

async function startServer() {
    const server = app.listen(PORT, () => {
        signale.success(`Servidor corriendo en http://localhost:${PORT}`);
    });
}

startServer();
