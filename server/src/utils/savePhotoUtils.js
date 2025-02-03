import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import generateErrorUtil from './generateErrorUtil.js';
import crypto from 'crypto';

const savePhotoUtils = async (img) => {
    try {
        const uploadsPath = path.join(process.cwd(), process.env.UPLOADS_DIR);

        try {
            // Comprobamos si existe el directorio de subida de archivos.
            await fs.access(uploadsPath);
        } catch {
            // Si access lanza un error, creamos la carpeta.
            await fs.mkdir(uploadsPath);
        }
        // Creamos el nombre de la imagen
        const imgName = `${crypto.randomUUID()}.jpg`;
        // Creamos la ruta hasta uploads con el nombre de la imagen.
        const imgPath = path.join(uploadsPath, imgName);
        //Guardamos la imagen en uploads
        await img.mv(imgPath);
        // Retornamos el nombre de la foto.
        return imgName;
    } catch (err) {
        console.error(err);
        generateErrorUtil('Error al guardar el archivo en disco');
    }
};

export default savePhotoUtils;
