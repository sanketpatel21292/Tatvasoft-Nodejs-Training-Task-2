import { DataTypes, Model } from 'sequelize';
import { db } from '../config/database';
import { User } from './user';

export class Role extends Model { }

Role.init({
    name: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.INTEGER
    },
    modifiedBy: {
        type: DataTypes.INTEGER
    },
    createdDate: {
        type: DataTypes.DATE
    },
    modifiedDate: {
        type: DataTypes.DATE
    }
}, {
    sequelize: db,
    modelName: 'Roles',
    timestamps: false
});

Role.belongsTo(User, { foreignKey: 'createdBy', as: 'CreatedBy' });
Role.belongsTo(User, { foreignKey: 'modifiedBy', as: 'ModifiedBy' });