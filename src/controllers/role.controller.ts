import { Request, Response } from 'express';
import { Model, Op } from 'sequelize';
import { validate } from 'joi';
import { Role } from '../models/role';
import { roleSchema, searchRoleTeamSchema } from '../validator/validator';
import { User } from '../models/user';

export default class RoleController {
    static createRole = async (req: Request, res: Response) => {
        try {
            const { error, value } = validate(req.body, roleSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            const role: Model = await Role.create({
                name: req.body.name,
                createdBy: req.body.createdBy,
                createdDate: new Date()
            });
            res.send(role);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    static getRole = async (req: Request, res: Response) => {
        try {
            const role = await Role.findByPk(req.params.id, {
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

            if (!role) {
                return res.status(404).send('Role not found!');
            }

            res.send(role);
        } catch (e) {
            res.status(400).send();
        }
    }

    static updateRole = async (req: Request, res: Response) => {
        try {
            const { error, value } = validate(req.body, roleSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            const role: Model = await Role.update({
                name: req.body.name,
                modifiedBy: req.body.modifiedBy,
                modifiedDate: new Date()
            }, {
                where: {
                    id: req.params.id
                }
            });
            res.send('Role updated!');
        } catch (e) {
            res.status(400).send(e);
        }
    }

    static searchRole = async (req: Request, res: Response) => {
        try {
            const { error, value } = validate(req.body, searchRoleTeamSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            const role = await Role.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + req.body.name + '%'
                    }
                },
                offset: parseInt(req.body.offset) - 1,
                limit: parseInt(req.body.limit),
                attributes: ['name', 'createdDate', 'modifiedDate']
            });

            res.send(role);
        } catch (e) {
            res.status(400).send();
        }
    }
}