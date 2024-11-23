import express from 'express';
import cors from 'cors';
import userRouter from './routes/user';
import experienciasRouter from './routes/experiencias';
import { run } from './database/mongo_conn';

const app = express();
app.use(express.json());
run();

// Configuración del middleware CORS
app.use(cors({
    origin: '*', // Permite solicitudes desde cualquier origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
}));

// Asegúrate de que las cabeceras necesarias estén siempre presentes
app.use((_req, res, next) => { // Reemplazamos req con _req
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Punto de prueba
const PORT = 3000;

app.get('/ping', (_req, res) => { // Reemplazamos req con _req
    console.log('ping recibido correctamente');
    res.send('pinged');
});

// Rutas
app.use('/api/user', userRouter);
app.use('/api/experiencias', experienciasRouter);

// Iniciar servidor
app.listen(PORT, () => {
    console.log('El servidor está escuchando en el puerto ' + PORT);
});
