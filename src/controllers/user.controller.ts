import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { validate } from 'joi';
import { User, IUser } from '../models/user';
import { userSchema } from '../validator/validator';
import { UserRole } from '../models/user-role';
import { UserTeam } from '../models/user-team';
import { db } from '../config/database';

export default class UserController {
    static createUser = async (req: Request, res: Response) => {
        let transaction: any;

        try {
            const { error, value } = validate(req.body, userSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            transaction = await db.transaction();

            const user: IUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                createdDate: new Date()
            }, { transaction: transaction });

            let userRoleArray = UserController.getUserRoleForBulkEntry(req.body.roleIds, user.id);
            await UserRole.bulkCreate(userRoleArray, { transaction: transaction });

            let userTeamArray = UserController.getUserTeamForBulkEntry(req.body.teamIds, user.id);
            await UserTeam.bulkCreate(userTeamArray, { transaction: transaction });

            await transaction.commit();

            res.send(user);
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }

            console.log(e);
            res.status(400).send(e);
        }
    }

    static getUser = async (req: Request, res: Response) => {
        try {
            const user = await User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).send('User not found!');
            }

            res.send(user);
        } catch (e) {
            res.status(400).send();
        }
    }

    static updateUser = async (req: Request, res: Response) => {
        let transaction: any;

        try {
            const { error, value } = validate(req.body, userSchema);
            if (error && error.details) {
                return res.status(400).send(error.details[0].message);
            }

            transaction = await db.transaction();

            await User.update({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                createdDate: new Date()
            }, {
                where: { id: req.params.id },
                transaction: transaction
            });

            // Delete user-role entries and insert new data
            UserRole.destroy({
                where: { userId: req.params.id },
                transaction: transaction
            });

            let userRoleArray = UserController.getUserRoleForBulkEntry(req.body.roleIds, parseInt(req.params.id));
            await UserRole.bulkCreate(userRoleArray, { transaction: transaction });

            // Delete user-team entries and insert new data
            UserTeam.destroy({
                where: { userId: req.params.id },
                transaction: transaction
            });

            let userTeamArray = UserController.getUserTeamForBulkEntry(req.body.teamIds, parseInt(req.params.id));
            await UserTeam.bulkCreate(userTeamArray, { transaction: transaction });

            await transaction.commit();

            res.send('User updated!');
        } catch (e) {
            if (transaction) {
                await transaction.rollback();
            }

            console.log(e);
            res.status(400).send(e);
        }
    }

    static searchUser = async (req: Request, res: Response) => {
        let where: any = {};
        try {
            if (req.body.name) {
                where.name = {
                    [Op.like]: '%' + req.body.name + '%'
                }
            }

            if (req.body.email) {
                where.email = {
                    [Op.like]: '%' + req.body.email + '%'
                }
            }

            if (req.body.phone) {
                where.phone = {
                    [Op.like]: '%' + req.body.phone + '%'
                }
            }

            const user = await User.findAll({
                where,
                offset: parseInt(req.body.offset) - 1,
                limit: parseInt(req.body.limit),
                attributes: ['name', 'email', 'phone']
            });

            if (!user) {
                return res.status(404).send('User not found!');
            }

            res.send(user);
        } catch (e) {
            res.status(400).send();
        }
    }

    private static getUserRoleForBulkEntry(roleIds: Array<number>, userId: number): object[] {
        let result: object[] = [];
        roleIds.forEach((id: number) => {
            result.push({
                roleId: id,
                userId: userId
            });
        });

        return result;
    }

    private static getUserTeamForBulkEntry(teamIds: Array<number>, userId: number): object[] {
        let result: object[] = [];
        teamIds.forEach((id: number) => {
            result.push({
                teamid: id,
                userId: userId
            });
        });

        return result;
    }
}