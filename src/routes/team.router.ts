import express, { Request, Response } from 'express';
import TeamController from '../controllers/team.controller';

const router = express.Router();

router.post('/', TeamController.createTeam);

router.get('/:id', TeamController.getTeam);

router.patch('/:id', TeamController.updateTeam);

router.post('/search', TeamController.searchTeam);

export = router;