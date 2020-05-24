import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { Model } from 'sequelize';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.post('/', UserController.createUser);

router.get('/:id', UserController.getUser);

router.patch('/:id', UserController.updateUser);

router.post('/search', UserController.searchUser);

export = router;