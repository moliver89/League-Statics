import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const getPrivateUserInfoController = async (req, res, next) => {
    try {
        const userId = req.user.id;
        console.log(req.user.role);
        const pool = await getPool();
        const [users] = await pool.query(
            `SELECT id, email, role FROM users WHERE id = ?`,
            [userId]
        );

        if (users.length < 1) {
            generateErrorUtil('El usuario no existe');
        }

        res.send({
            status: 'ok',
            data: {
                user: users[0],
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPrivateUserInfoController;
