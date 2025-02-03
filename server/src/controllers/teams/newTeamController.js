import getPool from '../../db/getPool.js';
import savePhotoUtils from '../../utils/savePhotoUtils.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
// Esta funcion era app.post. Se guarda en una variable que luego exportaremos
const newTeamController = async (req, res, next) => {
    try {
        const { name, sponsor, home, away, cat } = req.body;

        const foto = req.files?.photo;

        if (!name || !sponsor || !home || !away || !cat) {
            generateErrorUtil('Faltan campos', 400);
        }
        const pool = await getPool();
        // Guardamos la foto.
        const photoName = await savePhotoUtils(foto, 100);
        // Obtenemos la tabla donde queremos insertar el nuevo dato(equipo en este caso)
        await pool.query(
            `INSERT INTO equipos(name, patrocinador, camisetaTitular, camisetaSuplente, categoria, foto) VALUES(?, ?, ?, ?, ?, ?)`,
            [name, sponsor, home, away, cat, photoName]
        );

        res.status(201).send({
            status: 'ok',
            message: 'Equipo creado',
            data: {
                photoName,
            },
        });
    } catch (err) {
        next(err);
    }
};
//Exportamos la funcion
export default newTeamController;
