import { Request, Response } from 'express';
import { Model, Op } from 'sequelize';
import { validate } from 'joi';
import { Team } from '../models/team';
import { teamSchema, searchRoleTeamSchema } from '../validator/validator';
import { User } from '../models/user';

export default class TeamController {
    static createTeam = async (req: Request, res: Response) => {
        try {
            const { error, value } = validate(req.body, teamSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            const team: Model = await Team.create({
                name: req.body.name,
                createdBy: req.body.createdBy,
                createdDate: new Date()
            });
            res.send(team);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    static getTeam = async (req: Request, res: Response) => {
        try {
            const team = await Team.findByPk(req.params.id, {
                attributes: ['name', 'createdDate', 'modifiedDate'],
                include: [{
                    model: User,
                    attributes: ['name', 'email', 'phone'],
                    as: 'CreatedBy'
                }, {
                    model: User,
                    attributes: ['name', 'email', 'phone'],
                    as: 'ModifiedBy'
                }]
            });

            if (!team) {
                return res.status(404).send('Team not found!');
            }

            res.send(team);
        } catch (e) {
            res.status(400).send();
        }
    }

    static updateTeam = async (req: Request, res: Response) => {
        try {
            const { error, value } = validate(req.body, teamSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            const role: Model = await Team.update({
                name: req.body.name,
                modifiedBy: req.body.modifiedBy,
                modifiedDate: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.send('Team updated!');
        } catch (e) {
            res.status(400).send(e);
        }
    }

    static searchTeam = async (req: Request, res: Response) => {
        try {
            const { error, value } = validate(req.body, searchRoleTeamSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            const team = await Team.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + req.body.name + '%'
                    }
                },
                offset: parseInt(req.body.offset) - 1,
                limit: parseInt(req.body.limit),
                attributes: ['name', 'createdDate', 'modifiedDate']
            });

            res.send(team);
        } catch (e) {
            res.status(400).send();
        }
    }
}