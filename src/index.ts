// Autor: Ing. Rodrigo Cova

// src/index.ts

import 'dotenv/config'; // Cargar variables de entorno desde .env
import express from 'express';
import cors from 'cors';
//import helmet from 'helmet'; // Para seguridad
//import morgan from 'morgan'; // Para logging
import { pacientesRouter } from './routers/pacientes.routers';

const app = express();
// Usa el puerto del .env o el 3000 por defecto
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(helmet());
//app.use(morgan('dev')); // Logging en desarrollo  


// Ruta de ejemplo
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('¡Servidor funcionando con TypeScript y todas las dependencias! 🚀');
});

// Rutas
app.use('/api/pacientes', pacientesRouter);


// Listener en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});