// Importamos los datos de .env
import 'dotenv/config';
// Importamos las dependencias
import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
// Importamos las rutas
import teamRoutes from './src/routes/teamRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
// Importamos las variables de entorno necesarias
const { PORT, UPLOADS_DIR } = process.env;

const app = express();
// Middleware que evita problemas de conexion entre cliente y servidor.
app.use(cors());
// Middleware que indica a Express cuál es el directorio de ficheros estáticos.
app.use(express.static(UPLOADS_DIR));
// Middleware que permite leer un body en formato JSON
app.use(express.json());
// Middleware que me permite leer un body en formato form-data(archivos)
app.use(fileUpload());
// Ingresa a la carpeta routes donde esta el index con
// las rutas a los controladores Middleware
app.use('/api', teamRoutes);
app.use('/api', userRoutes);

//Middleware manejo de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});
//Middleware de ruta no encontrada
app.use((req, res) => {
    res.send('Ruta no encontrada');
});
//Middleware que escucha el servidor dado
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${process.env.PORT}`);
});
