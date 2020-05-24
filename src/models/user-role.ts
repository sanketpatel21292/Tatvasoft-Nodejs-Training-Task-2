import { DataTypes, Model } from 'sequelize';
import { db } from '../config/database';
import { User } from './user';

export class UserRole extends Model { }

UserRole.init({
    userId: {
        type: DataTypes.INTEGER
    },
    roleId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize: db,
    modelName: 'UserRoles',
    timestamps: false
});
