import jwt from 'jsonwebtoken';

import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserController = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            generateErrorUtil('Falta la cabecera de autorización', 401);
        }
        try {
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);
            req.user = tokenInfo;
        } catch (err) {
            console.error(err);
            generateErrorUtil('Token Invalido', 401);
        }
        // Almacenamos el objeto con la info(id, role) y se lo pasamos al siguiente Middleware
        next();
    } catch (err) {
        next(err);
    }
};

export default authUserController;
