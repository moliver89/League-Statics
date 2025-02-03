import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        const pool = await getPool();
        const [users] = await pool.query(
            `SELECT id, password FROM users WHERE email = ?`,
            [email]
        );

        if (users.length < 1) {
            generateErrorUtil('Email incorrecto', 401);
        }

        // Comprobamos contraseñas
        const validPass = await bcrypt.compare(password, users[0].password);

        if (!validPass) {
            generateErrorUtil('Contraseña incorrecta', 401);
        }
        // Objeto con la info que queremos almacenar
        const tokenInfo = {
            id: users[0].id,
            role: users[0].role,
        };
        // Creamos el token.
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '3d',
        });

        res.status(201).send({
            status: 'ok',
            message: 'Sesion iniciada',
            data: { token },
        });
    } catch (err) {
        next(err);
    }
};
export default loginUserController;
