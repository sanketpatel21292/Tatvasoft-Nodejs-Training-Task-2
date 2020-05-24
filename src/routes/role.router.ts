import express, { Request, Response } from 'express';
import RoleController from '../controllers/role.controller';

const router = express.Router();

router.post('/', RoleController.createRole);

router.get('/:id', RoleController.getRole);

router.patch('/:id', RoleController.updateRole);

router.post('/search', RoleController.searchRole);

export = router;