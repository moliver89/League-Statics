import bcrypt from 'bcrypt';
//import crypto from 'crypto';

import getPool from '../../db/getPool.js';

import generateErrorUtil from '../../utils/generateErrorUtil.js';

const newUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        const pool = await getPool();

        const [users] = await pool.query(
            `
            SELECT id FROM users WHERE email = ?`,
            [email]
        );
        if (users.length > 0) {
            generateErrorUtil('Email no disponible', 403);
        }
        // Encriptamos la contraseña
        const hashedPass = await bcrypt.hash(password, 10);

        await pool.query(`INSERT INTO users(email, password) VALUES (?, ?)`, [
            email,
            hashedPass,
        ]);

        res.status(201).send({
            status: 'ok',
            message: 'Usuario creado',
        });
    } catch (err) {
        next(err);
    }
};
export default newUserController;
