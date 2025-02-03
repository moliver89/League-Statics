import express from 'express';

import {
    newUserController,
    loginUserController,
    getPrivateUserInfoController,
} from '../controllers/users/index.js';
import authUserController from '../middlewares/authUserController.js';

const router = express.Router();

router.post('/users/register', newUserController);
router.post('/users/login', loginUserController);
router.get('/users', authUserController, getPrivateUserInfoController);
export default router;
