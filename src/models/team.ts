import { DataTypes, Model } from 'sequelize';
import { db } from '../config/database';
import { User } from './user';

export class Team extends Model { }

Team.init({
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
    modelName: 'Teams',
    timestamps: false
});

Team.belongsTo(User, { foreignKey: 'createdBy', as: 'CreatedBy' });
Team.belongsTo(User, { foreignKey: 'modifiedBy', as: 'ModifiedBy' });