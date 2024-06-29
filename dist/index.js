"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signale_1 = require("signale");
const report_routes_1 = require("./infrastructure/routes/report_routes"); // Asegúrate de que la ruta de importación sea correcta
const app = (0, express_1.default)();
const PORT = 3000;
const signale = new signale_1.Signale();
app.use(express_1.default.json()); // Middleware para parsear JSON
// Middleware de registro para ver las solicitudes que llegan
app.use((req, res, next) => {
    console.log(`Solicitud recibida para ${req.path}`);
    next();
});
app.use('/', report_routes_1.packageRoutes);
async function startServer() {
    const server = app.listen(PORT, () => {
        signale.success(`Servidor corriendo en http://localhost:${PORT}`);
    });
}
startServer();
