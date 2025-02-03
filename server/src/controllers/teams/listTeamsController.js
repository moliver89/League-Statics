import getPool from '../../db/getPool.js';

const listTeamsController = async (req, res, next) => {
    try {
        let { keyword } = req.query;

        // Si "keyword" contiene un valor considerado falso por JS, asignamos un string vacío.
        keyword = keyword || '';

        // Obtenemos una conexión con la base de datos.
        const pool = await getPool();

        // Obtenemos los equipos.
        const [equipos] = await pool.query(
            `
                SELECT 
                    e.id,
                    e.name,
                    e.patrocinador,
                    e.camisetaTitular,
                    e.camisetaSuplente,
                    e.categoria,
                    e.foto
                FROM equipos e
                WHERE name LIKE ?
            `,
            [`%${keyword}%`]
        );

        res.send({
            status: 'ok',
            data: { equipos },
        });
    } catch (err) {
        next(err);
    }
};

export default listTeamsController;
