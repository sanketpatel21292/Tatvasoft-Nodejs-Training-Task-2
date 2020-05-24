import { DataTypes, Model } from 'sequelize';
import { db } from '../config/database';
import { Role } from './role';
import { UserRole } from './user-role';

export class User extends Model { }

User.init({
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    phone: {
        type: DataTypes.STRING
    }
}, {
    sequelize: db,
    modelName: 'Users',
    timestamps: false
});

export interface IUser {
    id: number,
    name: string,
    email: string,
    phone: string
}
