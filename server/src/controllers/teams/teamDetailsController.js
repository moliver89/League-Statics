import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const teamDetailsController = async (req, res, next) => {
    try {
        let { teamId } = req.params;

        const pool = await getPool();

        const [team] = await pool.query(
            `
            SELECT 
                e.name,
                e.patrocinador,
                e.camisetaTitular,
                e.camisetaSuplente,
                e.categoria,
                e.foto
            FROM equipos e
            WHERE e.id = ?
            `,
            [teamId]
        );

        if (team.length < 1) {
            throw generateErrorUtil('No existe ese equipo', 404);
        }

        res.send({
            status: 'ok',
            data: {
                equipo: team[0],
            },
        });
    } catch (err) {
        next(err);
    }
};
export default teamDetailsController;
