import getPool from '../../db/getPool.js';

// Importamos la funcion que genera un Error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deleteTeamController = async (req, res, next) => {
    try {
        const { name } = req.params;

        const pool = await getPool();

        const [equipos] = await pool.query(
            `SELECT * FROM equipos WHERE name LIKE ?`,
            [`${name}`] //El nombre tiene que ser exacto. SQL no distingue mayusculas de minusculas
        ); //por lo que lo eliminara escrito de ambas maneras
        console.log(equipos);
        if (equipos.length < 1) {
            generateErrorUtil('Entrada no encontrada', 404);
        }

        await pool.query(`DELETE FROM equipos WHERE name LIKE ?`, [
            `%${name}%`,
        ]);

        res.send({
            status: 'ok',
            message: 'Equipo eliminado de la base de datos.',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteTeamController;
