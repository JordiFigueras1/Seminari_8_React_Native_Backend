"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const experiencias_1 = __importDefault(require("./routes/experiencias"));
const mongo_conn_1 = require("./database/mongo_conn");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, mongo_conn_1.run)();
// Configuración del middleware CORS
app.use((0, cors_1.default)({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));
// Asegúrate de que las cabeceras necesarias estén siempre presentes
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
// Punto de prueba
const PORT = 3000;
app.get('/ping', (_req, res) => {
    console.log('ping recibido correctamente');
    res.send('pinged');
});
// Rutas
app.use('/api/user', user_1.default);
app.use('/api/experiencias', experiencias_1.default);
// Iniciar servidor
app.listen(PORT, () => {
    console.log('El servidor está escuchando en el puerto ' + PORT);
});
