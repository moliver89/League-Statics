import express from 'express';

import {
    newTeamController,
    listTeamsController,
    deleteTeamController,
    teamDetailsController,
} from '../controllers/teams/index.js';

const router = express.Router();
// Este post se realiza si lo llama el mismo endpoint con el mismo metodo
// En caso positivo va al archivo newTeamController y realiza su accion
router.post('/equipos/register', newTeamController);
router.get('/equipos', listTeamsController);
router.delete('/equipos/:name', deleteTeamController);
router.get('/equipos/:teamId', teamDetailsController);

export default router;
